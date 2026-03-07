import uuid
from typing import Annotated, Literal

from fastapi import APIRouter, Depends, HTTPException, Security
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.config import settings
from app.core.database import get_session
from app.core.security import decode_access_token
from app.repos.achievement_repo import get_all_categories
from app.repos.admin_repo import get_achievement_by_code
from app.repos.claim_repo import get_user_claims
from app.repos.group_repo import get_all_groups_with_member_count, get_group_by_id
from app.repos.user_repo import get_user_by_id, get_user_by_tg_id
from app.schemas.achievement import AchievementTreeNode, CategoryOut
from app.schemas.claim import WebClaimCreate, WebClaimOut
from app.schemas.tree import AggregateTreeResponse, GroupDirectoryItem, MembersResponse, TreeResponse
from app.services.achievement_service import (
    get_group_aggregate_tree,
    get_group_members_list,
    get_user_achievements_by_status,
    get_user_tree_graph,
)
from app.services.claim_service import ClaimError, cancel_claim, submit_claim

router = APIRouter(prefix="/api", tags=["achievements"])

SessionDep = Annotated[AsyncSession, Depends(get_session)]

_bearer = HTTPBearer(auto_error=False)


def _get_current_user_id(
    creds: HTTPAuthorizationCredentials | None = Security(_bearer),
) -> int:
    if settings.SKIP_AUTH:
        return 0
    if not creds:
        raise HTTPException(status_code=401, detail="Not authenticated")
    try:
        return decode_access_token(creds.credentials)
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid token")


CurrentUser = Annotated[int, Depends(_get_current_user_id)]


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


async def _resolve_me(session: AsyncSession, tg_user_id: int):
    """Resolve JWT tg_user_id → User ORM object."""
    user = await get_user_by_tg_id(session, tg_user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not registered")
    return user


def _claim_to_out(claim) -> WebClaimOut:
    return WebClaimOut(
        id=claim.id,
        achievement_code=claim.achievement.code,
        achievement_title=claim.achievement.title,
        status=claim.status,
        submitted_at=claim.submitted_at.isoformat(),
        comment=claim.comment,
    )


@router.get("/groups", response_model=list[GroupDirectoryItem])
async def list_groups(session: SessionDep, _: CurrentUser):
    """Returns all groups with their active member count."""
    rows = await get_all_groups_with_member_count(session)
    return [
        GroupDirectoryItem(id=group.id, title=group.title, member_count=count)
        for group, count in rows
    ]


# ── Personal (me) endpoints — must be before /{user_id} routes ────────────────

@router.get(
    "/groups/{group_id}/users/me/tree",
    response_model=TreeResponse,
)
async def my_achievement_tree(
    group_id: uuid.UUID,
    session: SessionDep,
    tg_id: CurrentUser,
):
    """Achievement tree for the authenticated user."""
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    user = await _resolve_me(session, tg_id)
    display_name = user.first_name or user.username or str(user.tg_user_id)
    return await get_user_tree_graph(session, group_id, user.id, group.title, display_name)


@router.get(
    "/groups/{group_id}/claims/me",
    response_model=list[WebClaimOut],
)
async def my_claims(
    group_id: uuid.UUID,
    session: SessionDep,
    tg_id: CurrentUser,
):
    """All claims of the authenticated user in this group."""
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    user = await _resolve_me(session, tg_id)
    claims = await get_user_claims(session, group_id, user.id)
    return [_claim_to_out(c) for c in claims]


@router.post(
    "/groups/{group_id}/claims",
    response_model=WebClaimOut,
    status_code=201,
)
async def create_claim(
    group_id: uuid.UUID,
    body: WebClaimCreate,
    session: SessionDep,
    tg_id: CurrentUser,
):
    """Submit a claim for an achievement."""
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    user = await _resolve_me(session, tg_id)
    ach = await get_achievement_by_code(session, body.achievement_code)
    if not ach:
        raise HTTPException(status_code=404, detail="Achievement not found")
    evidence = {"text": body.evidence_text} if body.evidence_text else {}
    try:
        claim = await submit_claim(session, group_id, user.id, ach.id, evidence)
    except ClaimError as e:
        raise HTTPException(status_code=400, detail=str(e))
    return WebClaimOut(
        id=claim.id,
        achievement_code=ach.code,
        achievement_title=ach.title,
        status=claim.status,
        submitted_at=claim.submitted_at.isoformat(),
        comment=claim.comment,
    )


@router.delete(
    "/groups/{group_id}/claims/{claim_id}",
    status_code=204,
)
async def delete_claim(
    group_id: uuid.UUID,
    claim_id: uuid.UUID,
    session: SessionDep,
    tg_id: CurrentUser,
):
    """Cancel a pending claim."""
    user = await _resolve_me(session, tg_id)
    try:
        await cancel_claim(session, claim_id, user.id)
    except ClaimError as e:
        raise HTTPException(status_code=400, detail=str(e))


# ── Parameterized user endpoints ──────────────────────────────────────────────

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
    _: CurrentUser,
):
    """
    Achievement tree with aggregated progress counts across all group members.
    """
    group = await get_group_by_id(session, group_id)
    if not group:
        raise HTTPException(status_code=404, detail="Group not found")
    return await get_group_aggregate_tree(session, group_id, group.title)
