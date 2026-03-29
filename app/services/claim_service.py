import logging
import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import AchievementClaim, Group, User, Achievement
from app.repos.achievement_repo import (
    compute_achievement_status,
    get_achievement_by_id,
    get_all_active_achievements,
    get_user_guas,
    upsert_gua_approved,
)
from app.repos.claim_repo import (
    add_event,
    create_claim,
    get_claim_by_id,
    get_last_approved_claim,
    get_submitted_claim,
)
from app.repos.group_repo import get_member

logger = logging.getLogger(__name__)


class ClaimError(Exception):
    pass


async def submit_claim(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    evidence: dict | None = None,
) -> AchievementClaim:
    # 1. Check member is ACTIVE
    member = await get_member(session, group_id, user_id)
    if not member or member.status != "ACTIVE":
        raise ClaimError("Вы не являетесь активным участником этой группы.")

    # 2. Check no duplicate SUBMITTED claim
    existing = await get_submitted_claim(session, group_id, user_id, achievement_id)
    if existing:
        raise ClaimError("Заявка на эту ачивку уже подана и ожидает рассмотрения.")

    # 3. Check achievement exists and is available
    achievement = await get_achievement_by_id(session, achievement_id)
    if not achievement or not achievement.is_active:
        raise ClaimError("Ачивка не найдена или неактивна.")

    guas = await get_user_guas(session, group_id, user_id)
    achieved_map = {
        g.achievement_id: g.level for g in guas if g.status == "ACHIEVED"
    }
    gua_map = {g.achievement_id: g for g in guas}
    status = compute_achievement_status(achievement, gua_map.get(achievement_id), achieved_map)
    if status == "LOCKED":
        raise ClaimError("Ачивка ещё заблокирована: не выполнены необходимые условия.")
    if status == "ACHIEVED" and not achievement.repeatable and not achievement.burnable:
        raise ClaimError("Ачивка уже получена и не является повторяемой.")
    if achievement.repeatable and achievement.cooldown_hours:
        last = await get_last_approved_claim(session, group_id, user_id, achievement_id)
        if last and last.reviewed_at:
            available_at = last.reviewed_at + timedelta(hours=achievement.cooldown_hours)
            if datetime.now(tz=timezone.utc) < available_at:
                raise ClaimError(
                    f"Ачивка на перезарядке до {available_at.strftime('%d.%m %H:%M')} UTC."
                )
    if achievement.burnable and achievement.cooldown_hours:
        gua_for_cd = gua_map.get(achievement_id)
        if gua_for_cd and gua_for_cd.achieved_at and gua_for_cd.period_start is None:
            available_at = gua_for_cd.achieved_at + timedelta(hours=achievement.cooldown_hours)
            if datetime.now(tz=timezone.utc) < available_at:
                raise ClaimError(
                    f"Ачивка на перезарядке до {available_at.strftime('%d.%m %H:%M')} UTC."
                )

    # 4. Create claim
    claim = await create_claim(
        session, group_id, user_id, achievement_id, evidence or {}
    )
    await add_event(
        session,
        group_id=group_id,
        user_id=user_id,
        achievement_id=achievement_id,
        event_type="CLAIM_SUBMITTED",
        payload={"claim_id": str(claim.id)},
    )
    await session.commit()
    await session.refresh(claim)
    logger.info("Claim submitted: %s by user %s", claim.id, user_id)
    return claim


async def _process_auto_grants(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
) -> list[dict]:
    """
    Award all auto_grant achievements whose prerequisites are now satisfied.
    Loops until no new grants fire (supports chained cascades).
    Returns list of dicts: [{"achievement": ach, "level": int}, ...]
    """
    granted: list[dict] = []
    newly_granted_ids: set[uuid.UUID] = set()

    while True:
        all_achievements = await get_all_active_achievements(session)
        auto_grant_achs = [a for a in all_achievements if a.auto_grant]
        if not auto_grant_achs:
            break

        guas = await get_user_guas(session, group_id, user_id)
        achieved_map: dict[uuid.UUID, int] = {
            g.achievement_id: g.level
            for g in guas
            if g.status == "ACHIEVED"
        }
        gua_map = {g.achievement_id: g for g in guas}

        new_this_round = []
        for ach in auto_grant_achs:
            if ach.id in newly_granted_ids:
                continue
            status = compute_achievement_status(ach, gua_map.get(ach.id), achieved_map)
            if status == "AVAILABLE":
                new_this_round.append(ach)

        if not new_this_round:
            break

        for ach in new_this_round:
            gua, _ = await upsert_gua_approved(session, group_id, user_id, ach)
            await add_event(
                session,
                group_id=group_id,
                user_id=user_id,
                achievement_id=ach.id,
                event_type="ADMIN_GRANTED",
                payload={"reason": "auto_grant", "level": gua.level},
            )
            granted.append({"achievement": ach, "level": gua.level})
            newly_granted_ids.add(ach.id)

    return granted


async def approve_claim(
    session: AsyncSession,
    claim_id: uuid.UUID,
    admin_user_id: uuid.UUID,
) -> dict:
    """
    Returns dict with keys: claim, group, user, achievement
    for building notifications.
    """
    claim = await get_claim_by_id(session, claim_id)
    if not claim:
        raise ClaimError("Заявка не найдена.")
    if claim.status != "SUBMITTED":
        raise ClaimError(f"Заявка уже обработана (статус: {claim.status}).")

    # Check admin rights
    member = await get_member(session, claim.group_id, admin_user_id)
    if not member or member.role != "ADMIN" or member.status != "ACTIVE":
        raise ClaimError("У вас нет прав администратора в этой группе.")

    achievement = await get_achievement_by_id(session, claim.achievement_id)

    now = datetime.now(tz=timezone.utc)
    claim.status = "APPROVED"
    claim.reviewed_at = now
    claim.reviewed_by_user_id = admin_user_id

    gua, outcome = await upsert_gua_approved(session, claim.group_id, claim.user_id, achievement)

    if achievement.burnable and outcome == "PROGRESS":
        await add_event(
            session,
            group_id=claim.group_id,
            user_id=claim.user_id,
            achievement_id=claim.achievement_id,
            event_type="BURNABLE_PROGRESS",
            payload={
                "claim_id": str(claim.id),
                "progress": gua.burnable_progress,
                "required": achievement.required_count,
            },
        )
    elif achievement.burnable and outcome == "RESET":
        await add_event(
            session,
            group_id=claim.group_id,
            user_id=claim.user_id,
            achievement_id=claim.achievement_id,
            event_type="BURNABLE_RESET",
            payload={"claim_id": str(claim.id)},
        )
        await add_event(
            session,
            group_id=claim.group_id,
            user_id=claim.user_id,
            achievement_id=claim.achievement_id,
            event_type="BURNABLE_PROGRESS",
            payload={
                "claim_id": str(claim.id),
                "progress": gua.burnable_progress,
                "required": achievement.required_count,
            },
        )
    else:
        await add_event(
            session,
            group_id=claim.group_id,
            user_id=claim.user_id,
            achievement_id=claim.achievement_id,
            event_type="CLAIM_APPROVED",
            payload={"claim_id": str(claim.id), "level": gua.level},
        )

    auto_granted = await _process_auto_grants(session, claim.group_id, claim.user_id)

    await session.commit()
    await session.refresh(claim)
    logger.info("Claim approved: %s by admin %s", claim_id, admin_user_id)

    return {
        "claim": claim,
        "group": claim.group,
        "user": claim.user,
        "achievement": claim.achievement,
        "level": gua.level,
        "auto_granted": auto_granted,
        "burnable_outcome": outcome if achievement.burnable else None,
        "burnable_progress": gua.burnable_progress if achievement.burnable else None,
        "burnable_required": achievement.required_count if achievement.burnable else None,
    }


async def reject_claim(
    session: AsyncSession,
    claim_id: uuid.UUID,
    admin_user_id: uuid.UUID,
    comment: str | None = None,
) -> AchievementClaim:
    claim = await get_claim_by_id(session, claim_id)
    if not claim:
        raise ClaimError("Заявка не найдена.")
    if claim.status != "SUBMITTED":
        raise ClaimError(f"Заявка уже обработана (статус: {claim.status}).")

    member = await get_member(session, claim.group_id, admin_user_id)
    if not member or member.role != "ADMIN" or member.status != "ACTIVE":
        raise ClaimError("У вас нет прав администратора в этой группе.")

    now = datetime.now(tz=timezone.utc)
    claim.status = "REJECTED"
    claim.reviewed_at = now
    claim.reviewed_by_user_id = admin_user_id
    claim.comment = comment

    await add_event(
        session,
        group_id=claim.group_id,
        user_id=claim.user_id,
        achievement_id=claim.achievement_id,
        event_type="CLAIM_REJECTED",
        payload={"claim_id": str(claim.id), "comment": comment or ""},
    )
    await session.commit()
    await session.refresh(claim)
    logger.info("Claim rejected: %s by admin %s", claim_id, admin_user_id)
    return claim


async def cancel_claim(
    session: AsyncSession,
    claim_id: uuid.UUID,
    user_id: uuid.UUID,
) -> AchievementClaim:
    claim = await get_claim_by_id(session, claim_id)
    if not claim:
        raise ClaimError("Заявка не найдена.")
    if claim.user_id != user_id:
        raise ClaimError("Это не ваша заявка.")
    if claim.status != "SUBMITTED":
        raise ClaimError("Можно отменить только заявку в статусе SUBMITTED.")

    claim.status = "CANCELED"
    await session.commit()
    return claim
