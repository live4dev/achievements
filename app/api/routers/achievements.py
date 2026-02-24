import uuid
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_session
from app.repos.group_repo import get_group_by_id
from app.repos.user_repo import get_user_by_id
from app.repos.achievement_repo import get_all_categories
from app.schemas.achievement import AchievementTreeNode, CategoryOut
from app.services.achievement_service import get_user_achievements_by_status

router = APIRouter(prefix="/api", tags=["achievements"])

SessionDep = Annotated[AsyncSession, Depends(get_session)]


async def _validate_group_user(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
):
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    user = await get_user_by_id(session, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return group, user


@router.get(
    "/groups/{group_id}/users/{user_id}/tree",
    response_model=list[AchievementTreeNode],
)
async def achievement_tree(
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    session: SessionDep,
):
    """
    Full achievement tree for a user in a group with dependency graph
    and current user state (LOCKED / AVAILABLE / ACHIEVED).
    """
    await _validate_group_user(session, group_id, user_id)
    return await get_user_achievements_by_status(session, group_id, user_id)


@router.get(
    "/groups/{group_id}/users/{user_id}/achievements",
    response_model=list[AchievementTreeNode],
)
async def user_achievements(
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    session: SessionDep,
    status: Literal["AVAILABLE", "ACHIEVED", "LOCKED"] | None = None,
):
    """
    Filtered list of achievements for a user in a group.
    """
    await _validate_group_user(session, group_id, user_id)
    return await get_user_achievements_by_status(session, group_id, user_id, status)


@router.get(
    "/groups/{group_id}/categories",
    response_model=list[CategoryOut],
)
async def group_categories(
    group_id: uuid.UUID,
    session: SessionDep,
):
    """Returns all achievement categories."""
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return await get_all_categories(session)
