import uuid
from datetime import datetime, timedelta, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.orm import (
    Achievement,
    AchievementPrerequisite,
    Category,
    GroupUserAchievement,
)


def _is_period_expired(
    gua: GroupUserAchievement,
    achievement: Achievement,
    now: datetime,
) -> bool:
    """Returns True if the burnable period window has elapsed."""
    if not achievement.burnable or gua is None or gua.period_start is None:
        return False
    period_start = gua.period_start
    # Normalize naive datetimes (e.g. from SQLite) to UTC-aware for comparison.
    if period_start.tzinfo is None:
        period_start = period_start.replace(tzinfo=timezone.utc)
    return now >= period_start + timedelta(days=achievement.period_days)


async def get_achievement_by_id(
    session: AsyncSession, achievement_id: uuid.UUID
) -> Achievement | None:
    # Use SELECT instead of session.get so that selectinload is always applied,
    # even when the object is already present in the identity map.
    result = await session.execute(
        select(Achievement)
        .options(selectinload(Achievement.prerequisites))
        .where(Achievement.id == achievement_id)
    )
    return result.scalar_one_or_none()


async def get_all_active_achievements(
    session: AsyncSession,
) -> list[Achievement]:
    result = await session.execute(
        select(Achievement)
        .options(selectinload(Achievement.prerequisites), selectinload(Achievement.category))
        .where(Achievement.is_active == True)  # noqa: E712
        .order_by(Achievement.sort_order, Achievement.title)
    )
    return result.scalars().all()


async def get_all_categories(session: AsyncSession) -> list[Category]:
    result = await session.execute(select(Category).order_by(Category.name))
    return result.scalars().all()


async def get_gua(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
) -> GroupUserAchievement | None:
    return await session.get(GroupUserAchievement, (group_id, user_id, achievement_id))


async def get_user_guas(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
) -> list[GroupUserAchievement]:
    result = await session.execute(
        select(GroupUserAchievement)
        .where(
            GroupUserAchievement.group_id == group_id,
            GroupUserAchievement.user_id == user_id,
        )
    )
    return result.scalars().all()


async def get_all_group_guas(
    session: AsyncSession,
    group_id: uuid.UUID,
) -> list[GroupUserAchievement]:
    result = await session.execute(
        select(GroupUserAchievement).where(GroupUserAchievement.group_id == group_id)
    )
    return result.scalars().all()


async def upsert_gua_approved(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement: Achievement,
) -> tuple[GroupUserAchievement, str]:
    """
    Returns (gua, outcome) where outcome is one of:
      "GRANTED"  — achievement level incremented (standard / repeatable / burnable completion)
      "PROGRESS" — burnable progress incremented, not yet complete
      "RESET"    — burnable period expired; progress reset and new period started
    """
    gua = await get_gua(session, group_id, user_id, achievement.id)
    now = datetime.now(tz=timezone.utc)
    outcome = "GRANTED"

    if gua is None:
        if achievement.burnable:
            # First-ever approval: start period, don't grant yet
            gua = GroupUserAchievement(
                group_id=group_id,
                user_id=user_id,
                achievement_id=achievement.id,
                level=0,
                status="AVAILABLE",
                achieved_at=None,
                burnable_progress=1,
                period_start=now,
            )
            outcome = "PROGRESS"
        else:
            gua = GroupUserAchievement(
                group_id=group_id,
                user_id=user_id,
                achievement_id=achievement.id,
                level=1,
                status="ACHIEVED",
                achieved_at=now,
            )
        session.add(gua)
    elif achievement.burnable:
        if _is_period_expired(gua, achievement, now) or gua.period_start is None:
            # Stale or no period — reset and start fresh
            gua.burnable_progress = 1
            gua.period_start = now
            gua.status = "AVAILABLE"
            outcome = "RESET"
        else:
            gua.burnable_progress += 1
            if gua.burnable_progress >= achievement.required_count:
                # Period completed — grant the achievement
                gua.level += 1
                gua.status = "ACHIEVED"
                gua.achieved_at = now
                gua.burnable_progress = 0
                gua.period_start = None
                outcome = "GRANTED"
            else:
                gua.status = "AVAILABLE"
                outcome = "PROGRESS"
    else:
        if achievement.repeatable:
            gua.level += 1
            if gua.achieved_at is None:
                gua.achieved_at = now
        else:
            gua.level = 1
            gua.achieved_at = now
        gua.status = "ACHIEVED"

    await session.flush()
    return gua, outcome


def compute_achievement_status(
    achievement: Achievement,
    gua: GroupUserAchievement | None,
    achieved_ids: dict[uuid.UUID, int],  # achievement_id → level
) -> str:
    """
    Compute LOCKED / AVAILABLE / ACHIEVED for one achievement given
    the user's achieved map {achievement_id: level}.
    """
    if not achievement.is_active:
        return "LOCKED"

    # Check prerequisites
    for prereq in achievement.prerequisites:
        user_level = achieved_ids.get(prereq.prereq_achievement_id, 0)
        if user_level < prereq.min_level:
            return "LOCKED"

    # Burnables are always AVAILABLE once prereqs are met — period reset is lazy
    if achievement.burnable:
        return "AVAILABLE"

    # Check exhaustion for non-burnable achievements
    if gua and gua.status == "ACHIEVED":
        if not achievement.repeatable:
            return "ACHIEVED"
        if achievement.max_level is not None and gua.level >= achievement.max_level:
            return "ACHIEVED"

    return "AVAILABLE"
