"""Admin CRUD operations: categories, achievements, prerequisites."""

import uuid

from sqlalchemy import delete, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.orm import Achievement, AchievementPrerequisite, Category


# ---------------------------------------------------------------------------
# Categories
# ---------------------------------------------------------------------------


async def get_category_by_code(session: AsyncSession, code: str) -> Category | None:
    result = await session.execute(select(Category).where(Category.code == code))
    return result.scalar_one_or_none()


async def create_category(
    session: AsyncSession,
    code: str,
    name: str,
    description: str | None,
) -> Category:
    cat = Category(code=code, name=name, description=description)
    session.add(cat)
    await session.flush()
    return cat


async def update_category(
    session: AsyncSession, cat_id: uuid.UUID, **fields
) -> Category:
    cat = await session.get(Category, cat_id)
    for k, v in fields.items():
        setattr(cat, k, v)
    await session.flush()
    return cat


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


async def get_achievement_by_code(
    session: AsyncSession, code: str
) -> Achievement | None:
    result = await session.execute(
        select(Achievement).where(Achievement.code == code)
    )
    return result.scalar_one_or_none()


async def get_all_achievements(session: AsyncSession) -> list[Achievement]:
    result = await session.execute(
        select(Achievement)
        .options(
            selectinload(Achievement.prerequisites),
            selectinload(Achievement.category),
        )
        .order_by(Achievement.sort_order, Achievement.title)
    )
    return list(result.scalars().all())


async def create_achievement(
    session: AsyncSession,
    code: str,
    title: str,
    description: str,
    category_id: uuid.UUID,
    rarity: str,
    repeatable: bool,
    max_level: int | None,
    icon: str | None,
    points: int | None,
    sort_order: int = 0,
) -> Achievement:
    ach = Achievement(
        code=code,
        title=title,
        description=description,
        category_id=category_id,
        rarity=rarity,
        repeatable=repeatable,
        max_level=max_level,
        icon=icon,
        points=points,
        sort_order=sort_order,
    )
    session.add(ach)
    await session.flush()
    return ach


async def update_achievement(
    session: AsyncSession, ach_id: uuid.UUID, **fields
) -> Achievement:
    ach = await session.get(Achievement, ach_id)
    for k, v in fields.items():
        setattr(ach, k, v)
    await session.flush()
    return ach


async def deactivate_achievement(
    session: AsyncSession, ach_id: uuid.UUID
) -> Achievement:
    return await update_achievement(session, ach_id, is_active=False)


# ---------------------------------------------------------------------------
# Prerequisites
# ---------------------------------------------------------------------------


async def add_prerequisite(
    session: AsyncSession,
    ach_id: uuid.UUID,
    prereq_id: uuid.UUID,
    min_level: int = 1,
) -> AchievementPrerequisite:
    prereq = AchievementPrerequisite(
        achievement_id=ach_id,
        prereq_achievement_id=prereq_id,
        min_level=min_level,
    )
    session.add(prereq)
    await session.flush()
    return prereq


async def remove_prerequisite(
    session: AsyncSession, ach_id: uuid.UUID, prereq_id: uuid.UUID
) -> None:
    await session.execute(
        delete(AchievementPrerequisite).where(
            AchievementPrerequisite.achievement_id == ach_id,
            AchievementPrerequisite.prereq_achievement_id == prereq_id,
        )
    )


async def check_cycle(
    session: AsyncSession, ach_id: uuid.UUID, new_prereq_id: uuid.UUID
) -> bool:
    """Returns True if adding new_prereq_id as prereq of ach_id would create a cycle."""
    visited: set[uuid.UUID] = set()
    queue: list[uuid.UUID] = [new_prereq_id]
    while queue:
        current = queue.pop()
        if current == ach_id:
            return True
        if current in visited:
            continue
        visited.add(current)
        result = await session.execute(
            select(AchievementPrerequisite.prereq_achievement_id).where(
                AchievementPrerequisite.achievement_id == current
            )
        )
        for pid in result.scalars().all():
            if pid not in visited:
                queue.append(pid)
    return False
