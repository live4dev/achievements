"""Safe admin operations with validation and cycle detection."""

import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import Achievement, AchievementPrerequisite, Category, User
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


# ---------------------------------------------------------------------------
# Grant achievement
# ---------------------------------------------------------------------------


async def grant_achievement_safe(
    session: AsyncSession,
    group_id: uuid.UUID,
    target_user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    admin_user_id: uuid.UUID,
) -> dict:
    """Directly grant an achievement to a group member, bypassing the claim flow.

    Returns {"achievement": Achievement, "user": User, "level": int}.
    Raises AdminError on any validation failure.
    """
    from app.repos.achievement_repo import get_achievement_by_id, get_gua, upsert_gua_approved
    from app.repos.claim_repo import add_event
    from app.repos.group_repo import get_member

    admin_member = await get_member(session, group_id, admin_user_id)
    if not admin_member or admin_member.role != "ADMIN" or admin_member.status != "ACTIVE":
        raise AdminError("У вас нет прав администратора в этой группе.")

    target_member = await get_member(session, group_id, target_user_id)
    if not target_member or target_member.status != "ACTIVE":
        raise AdminError("Пользователь не является активным участником группы.")

    achievement = await get_achievement_by_id(session, achievement_id)
    if not achievement or not achievement.is_active:
        raise AdminError("Ачивка не найдена или неактивна.")

    gua = await get_gua(session, group_id, target_user_id, achievement_id)
    if gua and gua.status == "ACHIEVED":
        if not achievement.repeatable:
            raise AdminError(f"Участник уже получил ачивку «{achievement.title}».")
        if achievement.max_level is not None and gua.level >= achievement.max_level:
            raise AdminError(
                f"Участник уже достиг максимального уровня (ур.{gua.level}) "
                f"ачивки «{achievement.title}»."
            )

    new_gua = await upsert_gua_approved(session, group_id, target_user_id, achievement)
    await add_event(
        session,
        group_id=group_id,
        user_id=target_user_id,
        achievement_id=achievement_id,
        event_type="ADMIN_GRANTED",
        payload={"admin_user_id": str(admin_user_id), "level": new_gua.level},
    )
    await session.commit()

    user = await session.get(User, target_user_id)
    return {"achievement": achievement, "user": user, "level": new_gua.level}


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
