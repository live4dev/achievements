"""Admin REST API — categories, achievements, prerequisites.

Access: only users whose Telegram ID is in settings.ADMIN_IDS.
"""

import uuid
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_session
from app.core.security import decode_access_token
from app.models.orm import Achievement, AchievementPrerequisite, Category
from app.repos.admin_repo import (
    add_prerequisite,
    check_cycle,
    create_achievement,
    create_category,
    deactivate_achievement,
    get_achievement_by_code,
    get_all_achievements,
    get_category_by_code,
    remove_prerequisite,
    update_achievement,
    update_category,
)
from app.schemas.admin import (
    AchievementAdminOut,
    AchievementCreate,
    AchievementUpdate,
    CategoryAdminOut,
    CategoryCreate,
    CategoryUpdate,
    PrereqOut,
    PrerequisiteAdd,
)

router = APIRouter(prefix="/api/admin", tags=["admin"])

_bearer = HTTPBearer(auto_error=False)
SessionDep = Annotated[AsyncSession, Depends(get_session)]


def _require_admin(
    creds: HTTPAuthorizationCredentials | None = Security(_bearer),
) -> int:
    if settings.SKIP_AUTH:
        uid = 0
        if uid not in settings.ADMIN_IDS and settings.ADMIN_IDS:
            raise HTTPException(status_code=403, detail="Not an admin")
        return uid
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        uid = decode_access_token(creds.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")
    if uid not in settings.ADMIN_IDS:
        raise HTTPException(status_code=403, detail="Not an admin")
    return uid


AdminUser = Annotated[int, Depends(_require_admin)]


# ── helpers ───────────────────────────────────────────────────────────────────

async def _ach_to_out(session: AsyncSession, ach: Achievement) -> AchievementAdminOut:
    """Convert ORM Achievement to AchievementAdminOut, loading prereqs."""
    prereqs_result = await session.execute(
        select(AchievementPrerequisite, Achievement)
        .join(Achievement, Achievement.id == AchievementPrerequisite.prereq_achievement_id)
        .where(AchievementPrerequisite.achievement_id == ach.id)
    )
    prereqs = [
        PrereqOut(prereq_code=a.code, prereq_title=a.title, min_level=p.min_level)
        for p, a in prereqs_result.all()
    ]
    cat_code: str | None = None
    if ach.category_id:
        cat = await session.get(Category, ach.category_id)
        cat_code = cat.code if cat else None
    return AchievementAdminOut(
        id=ach.id,
        code=ach.code,
        title=ach.title,
        description=ach.description,
        category_code=cat_code,
        rarity=ach.rarity,
        repeatable=ach.repeatable,
        max_level=ach.max_level,
        icon=ach.icon,
        points=ach.points,
        sort_order=ach.sort_order,
        is_active=ach.is_active,
        prerequisites=prereqs,
    )


# ── Categories ────────────────────────────────────────────────────────────────

@router.get("/categories", response_model=list[CategoryAdminOut])
async def list_categories(session: SessionDep, _: AdminUser):
    result = await session.execute(select(Category).order_by(Category.name))
    return list(result.scalars().all())


@router.post("/categories", response_model=CategoryAdminOut, status_code=201)
async def create_category_endpoint(body: CategoryCreate, session: SessionDep, _: AdminUser):
    existing = await get_category_by_code(session, body.code)
    if existing:
        raise HTTPException(400, detail=f"Категория с кодом «{body.code}» уже существует")
    cat = await create_category(session, body.code, body.name, body.description, body.icon)
    await session.commit()
    await session.refresh(cat)
    return cat


@router.patch("/categories/{code}", response_model=CategoryAdminOut)
async def update_category_endpoint(code: str, body: CategoryUpdate, session: SessionDep, _: AdminUser):
    cat = await get_category_by_code(session, code)
    if not cat:
        raise HTTPException(404, detail="Категория не найдена")
    fields = body.model_dump(exclude_none=True)
    if fields:
        cat = await update_category(session, cat.id, **fields)
        await session.commit()
        await session.refresh(cat)
    return cat


# ── Achievements ──────────────────────────────────────────────────────────────

@router.get("/achievements", response_model=list[AchievementAdminOut])
async def list_achievements(session: SessionDep, _: AdminUser):
    achs = await get_all_achievements(session)
    return [await _ach_to_out(session, a) for a in achs]


@router.post("/achievements", response_model=AchievementAdminOut, status_code=201)
async def create_achievement_endpoint(body: AchievementCreate, session: SessionDep, _: AdminUser):
    if await get_achievement_by_code(session, body.code):
        raise HTTPException(400, detail=f"Ачивка с кодом «{body.code}» уже существует")
    cat = await get_category_by_code(session, body.category_code)
    if not cat:
        raise HTTPException(400, detail=f"Категория «{body.category_code}» не найдена")
    ach = await create_achievement(
        session,
        code=body.code,
        title=body.title,
        description=body.description,
        category_id=cat.id,
        rarity=body.rarity,
        repeatable=body.repeatable,
        max_level=body.max_level,
        icon=body.icon,
        points=body.points,
        sort_order=body.sort_order,
    )
    await session.commit()
    await session.refresh(ach)
    return await _ach_to_out(session, ach)


@router.patch("/achievements/{code}", response_model=AchievementAdminOut)
async def update_achievement_endpoint(code: str, body: AchievementUpdate, session: SessionDep, _: AdminUser):
    ach = await get_achievement_by_code(session, code)
    if not ach:
        raise HTTPException(404, detail="Ачивка не найдена")
    fields = body.model_dump(exclude_none=True)
    if "category_code" in fields:
        cat = await get_category_by_code(session, fields.pop("category_code"))
        if not cat:
            raise HTTPException(400, detail="Категория не найдена")
        fields["category_id"] = cat.id
    if fields:
        ach = await update_achievement(session, ach.id, **fields)
        await session.commit()
        await session.refresh(ach)
    return await _ach_to_out(session, ach)


@router.delete("/achievements/{code}", status_code=204)
async def deactivate_achievement_endpoint(code: str, session: SessionDep, _: AdminUser):
    ach = await get_achievement_by_code(session, code)
    if not ach:
        raise HTTPException(404, detail="Ачивка не найдена")
    await deactivate_achievement(session, ach.id)
    await session.commit()


# ── Prerequisites ─────────────────────────────────────────────────────────────

@router.post("/achievements/{code}/prerequisites")
async def add_prerequisite_endpoint(
    code: str, body: PrerequisiteAdd, session: SessionDep, _: AdminUser
):
    ach = await get_achievement_by_code(session, code)
    if not ach:
        raise HTTPException(404, detail="Ачивка не найдена")
    prereq = await get_achievement_by_code(session, body.prereq_code)
    if not prereq:
        raise HTTPException(404, detail=f"Пресквизит «{body.prereq_code}» не найден")
    if ach.id == prereq.id:
        raise HTTPException(400, detail="Ачивка не может быть пресквизитом самой себя")
    existing = await session.get(AchievementPrerequisite, (ach.id, prereq.id))
    if existing:
        raise HTTPException(400, detail="Такой пресквизит уже добавлен")
    if await check_cycle(session, ach.id, prereq.id):
        raise HTTPException(400, detail="Добавление создаст цикл зависимостей")
    await add_prerequisite(session, ach.id, prereq.id, body.min_level)
    await session.commit()
    return {"added": True, "prereq_code": prereq.code, "prereq_title": prereq.title, "min_level": body.min_level}


@router.delete("/achievements/{code}/prerequisites/{prereq_code}", status_code=204)
async def remove_prerequisite_endpoint(
    code: str, prereq_code: str, session: SessionDep, _: AdminUser
):
    ach = await get_achievement_by_code(session, code)
    prereq = await get_achievement_by_code(session, prereq_code)
    if not ach or not prereq:
        raise HTTPException(404, detail="Ачивка не найдена")
    await remove_prerequisite(session, ach.id, prereq.id)
    await session.commit()
