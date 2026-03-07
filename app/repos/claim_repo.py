import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.orm import AchievementClaim, AchievementEvent


async def get_last_approved_claim(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
) -> AchievementClaim | None:
    """Returns the most recent APPROVED claim for a user+achievement in a group."""
    result = await session.execute(
        select(AchievementClaim)
        .where(
            AchievementClaim.group_id == group_id,
            AchievementClaim.user_id == user_id,
            AchievementClaim.achievement_id == achievement_id,
            AchievementClaim.status == "APPROVED",
        )
        .order_by(AchievementClaim.reviewed_at.desc())
        .limit(1)
    )
    return result.scalar_one_or_none()


async def get_last_approved_claims_batch(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
) -> dict[uuid.UUID, datetime]:
    """Returns {achievement_id: reviewed_at} for the latest APPROVED claim per achievement."""
    result = await session.execute(
        select(AchievementClaim.achievement_id, AchievementClaim.reviewed_at)
        .where(
            AchievementClaim.group_id == group_id,
            AchievementClaim.user_id == user_id,
            AchievementClaim.status == "APPROVED",
        )
        .order_by(AchievementClaim.achievement_id, AchievementClaim.reviewed_at.desc())
    )
    rows = result.all()
    # Keep only the latest per achievement_id (rows are ordered desc within each achievement)
    seen: dict[uuid.UUID, datetime] = {}
    for achievement_id, reviewed_at in rows:
        if achievement_id not in seen and reviewed_at is not None:
            seen[achievement_id] = reviewed_at
    return seen


async def get_claim_by_id(
    session: AsyncSession, claim_id: uuid.UUID
) -> AchievementClaim | None:
    return await session.get(
        AchievementClaim,
        claim_id,
        options=[
            selectinload(AchievementClaim.achievement),
            selectinload(AchievementClaim.user),
            selectinload(AchievementClaim.group),
        ],
    )


async def get_submitted_claim(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
) -> AchievementClaim | None:
    result = await session.execute(
        select(AchievementClaim).where(
            AchievementClaim.group_id == group_id,
            AchievementClaim.user_id == user_id,
            AchievementClaim.achievement_id == achievement_id,
            AchievementClaim.status == "SUBMITTED",
        )
    )
    return result.scalar_one_or_none()


async def get_group_submitted_claims(
    session: AsyncSession, group_id: uuid.UUID
) -> list[AchievementClaim]:
    result = await session.execute(
        select(AchievementClaim)
        .options(
            selectinload(AchievementClaim.achievement),
            selectinload(AchievementClaim.user),
        )
        .where(
            AchievementClaim.group_id == group_id,
            AchievementClaim.status == "SUBMITTED",
        )
        .order_by(AchievementClaim.submitted_at)
    )
    return result.scalars().all()


async def get_user_claims(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
) -> list[AchievementClaim]:
    result = await session.execute(
        select(AchievementClaim)
        .options(selectinload(AchievementClaim.achievement))
        .where(
            AchievementClaim.group_id == group_id,
            AchievementClaim.user_id == user_id,
        )
        .order_by(AchievementClaim.submitted_at.desc())
    )
    return result.scalars().all()


async def create_claim(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    evidence: dict,
) -> AchievementClaim:
    claim = AchievementClaim(
        group_id=group_id,
        user_id=user_id,
        achievement_id=achievement_id,
        status="SUBMITTED",
        evidence=evidence,
    )
    session.add(claim)
    await session.flush()
    return claim


async def add_event(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    event_type: str,
    payload: dict,
) -> AchievementEvent:
    event = AchievementEvent(
        group_id=group_id,
        user_id=user_id,
        achievement_id=achievement_id,
        event_type=event_type,
        payload=payload,
    )
    session.add(event)
    await session.flush()
    return event
