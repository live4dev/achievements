import uuid
from datetime import datetime, timezone

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.orm import (
    Achievement,
    AchievementPrerequisite,
    Category,
    GroupUserAchievement,
)


async def get_achievement_by_id(
    session: AsyncSession, achievement_id: uuid.UUID
) -> Achievement | None:
    return await session.get(Achievement, achievement_id, options=[selectinload(Achievement.prerequisites)])


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


async def upsert_gua_approved(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement: Achievement,
) -> GroupUserAchievement:
    gua = await get_gua(session, group_id, user_id, achievement.id)
    now = datetime.now(tz=timezone.utc)

    if gua is None:
        gua = GroupUserAchievement(
            group_id=group_id,
            user_id=user_id,
            achievement_id=achievement.id,
            level=1,
            status="ACHIEVED",
            achieved_at=now,
        )
        session.add(gua)
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
    return gua


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

    # Check exhaustion
    if gua and gua.status == "ACHIEVED":
        if not achievement.repeatable:
            return "ACHIEVED"
        if achievement.max_level is not None and gua.level >= achievement.max_level:
            return "ACHIEVED"

    return "AVAILABLE"
