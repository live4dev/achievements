"""Safe admin operations with validation and cycle detection."""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import Achievement, AchievementPrerequisite, Category
from app.repos.admin_repo import (
    add_prerequisite,
    check_cycle,
    create_achievement,
    create_category,
    deactivate_achievement,
    get_achievement_by_code,
    get_category_by_code,
    remove_prerequisite,
    update_achievement,
    update_category,
)


class AdminError(Exception):
    pass


# ---------------------------------------------------------------------------
# Categories
# ---------------------------------------------------------------------------


async def create_category_safe(
    session: AsyncSession,
    code: str,
    name: str,
    description: str | None,
) -> Category:
    existing = await get_category_by_code(session, code)
    if existing:
        raise AdminError(f"Категория с кодом «{code}» уже существует.")
    cat = await create_category(session, code, name, description or None)
    await session.commit()
    return cat


async def update_category_safe(
    session: AsyncSession,
    cat_id: uuid.UUID,
    field: str,
    value: str,
) -> Category:
    cat = await update_category(session, cat_id, **{field: value or None})
    await session.commit()
    return cat


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


async def create_achievement_safe(
    session: AsyncSession, wizard: dict
) -> Achievement:
    code = wizard["code"]
    existing = await get_achievement_by_code(session, code)
    if existing:
        raise AdminError(f"Ачивка с кодом «{code}» уже существует.")
    ach = await create_achievement(
        session,
        code=code,
        title=wizard["title"],
        description=wizard["description"],
        category_id=uuid.UUID(wizard["category_id"]),
        rarity=wizard["rarity"],
        repeatable=wizard.get("repeatable", False),
        max_level=wizard.get("max_level"),
        icon=wizard.get("icon"),
        points=wizard.get("points"),
        sort_order=0,
    )
    await session.commit()
    return ach


async def update_achievement_safe(
    session: AsyncSession,
    ach_id: uuid.UUID,
    field: str,
    value: str | None,
) -> Achievement:
    parsed: object = value
    if field in ("points", "sort_order", "max_level"):
        if not value:
            parsed = None
        else:
            try:
                parsed = int(value)
            except ValueError:
                raise AdminError("Введите целое число.")
    elif field == "icon":
        parsed = value or None
    elif field == "category_id":
        try:
            parsed = uuid.UUID(str(value))
        except ValueError:
            raise AdminError("Неверный ID категории.")
    ach = await update_achievement(session, ach_id, **{field: parsed})
    await session.commit()
    return ach


async def deactivate_achievement_safe(
    session: AsyncSession, ach_id: uuid.UUID
) -> Achievement:
    ach = await deactivate_achievement(session, ach_id)
    await session.commit()
    return ach


# ---------------------------------------------------------------------------
# Prerequisites
# ---------------------------------------------------------------------------


async def toggle_prerequisite_safe(
    session: AsyncSession, ach_id: uuid.UUID, prereq_id: uuid.UUID
) -> bool:
    """Toggle prereq. Returns True if added, False if removed.
    Raises AdminError on cycle detection."""
    existing = await session.get(AchievementPrerequisite, (ach_id, prereq_id))
    if existing:
        await remove_prerequisite(session, ach_id, prereq_id)
        await session.commit()
        return False
    if await check_cycle(session, ach_id, prereq_id):
        raise AdminError("Добавление создаст цикл зависимостей!")
    await add_prerequisite(session, ach_id, prereq_id)
    await session.commit()
    return True
