import uuid
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_session
from app.repos.group_repo import get_all_groups_with_member_count, get_group_by_id
from app.repos.user_repo import get_user_by_id
from app.repos.achievement_repo import get_all_categories
from app.schemas.achievement import AchievementTreeNode, CategoryOut
from app.schemas.tree import AggregateTreeResponse, GroupDirectoryItem, MembersResponse, TreeResponse
from app.services.achievement_service import (
    get_group_aggregate_tree,
    get_group_members_list,
    get_user_achievements_by_status,
    get_user_tree_graph,
)

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


@router.get("/groups", response_model=list[GroupDirectoryItem])
async def list_groups(session: SessionDep):
    """Returns all groups with their active member count."""
    rows = await get_all_groups_with_member_count(session)
    return [
        GroupDirectoryItem(id=group.id, title=group.title, member_count=count)
        for group, count in rows
    ]


@router.get(
    "/groups/{group_id}/users/{user_id}/tree",
    response_model=TreeResponse,
)
async def achievement_tree(
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    session: SessionDep,
):
    """
    Graph-friendly achievement tree for a user: nodes, edges, and user state
    keyed by achievement code. Used by the web UI.
    """
    group, user = await _validate_group_user(session, group_id, user_id)
    display_name = user.first_name or user.username or str(user.tg_user_id)
    return await get_user_tree_graph(
        session, group_id, user_id, group.title, display_name
    )


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


@router.get(
    "/groups/{group_id}/members",
    response_model=MembersResponse,
)
async def group_members(
    group_id: uuid.UUID,
    session: SessionDep,
):
    """Returns all active members of a group."""
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return await get_group_members_list(session, group_id)


@router.get(
    "/groups/{group_id}/tree/aggregate",
    response_model=AggregateTreeResponse,
)
async def aggregate_tree(
    group_id: uuid.UUID,
    session: SessionDep,
):
    """
    Achievement tree with aggregated progress counts across all group members.
    """
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return await get_group_aggregate_tree(session, group_id, group.title)
