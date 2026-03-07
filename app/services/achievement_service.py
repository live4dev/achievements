import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import Achievement, GroupUserAchievement
from app.repos.achievement_repo import (
    compute_achievement_status,
    get_all_active_achievements,
    get_all_categories,
    get_all_group_guas,
    get_user_guas,
)
from app.repos.group_repo import get_group_members
from app.schemas.achievement import AchievementTreeNode, AchievementOut, CategoryOut, PrerequisiteOut, UserAchievementState
from app.schemas.tree import (
    AchievementNode,
    AggregateStateValue,
    AggregateTreeResponse,
    EdgeOut,
    GroupInfo,
    MemberOut,
    MembersResponse,
    TreeResponse,
    UserInfo,
    UserStateValue,
)


async def get_user_achievement_tree(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
) -> list[AchievementTreeNode]:
    """
    Returns all active achievements enriched with the user's current
    status in the given group. Status is computed lazily from prereqs.
    """
    achievements = await get_all_active_achievements(session)
    guas = await get_user_guas(session, group_id, user_id)

    gua_map: dict[uuid.UUID, GroupUserAchievement] = {
        g.achievement_id: g for g in guas
    }
    # Build achieved-level map for quick prereq lookups
    achieved_map: dict[uuid.UUID, int] = {
        aid: g.level for aid, g in gua_map.items() if g.status == "ACHIEVED"
    }

    nodes: list[AchievementTreeNode] = []
    for ach in achievements:
        gua = gua_map.get(ach.id)
        status = compute_achievement_status(ach, gua, achieved_map)

        user_state = UserAchievementState(
            level=gua.level if gua else 0,
            status=status,
            achieved_at=gua.achieved_at.isoformat() if (gua and gua.achieved_at) else None,
        )
        ach_out = AchievementOut.model_validate(ach)
        ach_out.category_name = ach.category.name if ach.category else None
        nodes.append(
            AchievementTreeNode(
                achievement=ach_out,
                prerequisites=[
                    PrerequisiteOut.model_validate(p) for p in ach.prerequisites
                ],
                user_state=user_state,
            )
        )
    return nodes


_RARITY_SORT = {"LEGENDARY": 0, "EPIC": 1, "RARE": 2, "UNCOMMON": 3, "COMMON": 4}


async def get_user_achievements_by_status(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    status_filter: str | None = None,
) -> list[AchievementTreeNode]:
    nodes = await get_user_achievement_tree(session, group_id, user_id)
    if status_filter:
        nodes = [n for n in nodes if n.user_state.status == status_filter.upper()]
    # Sort: category name → rarity (LEGENDARY first) → sort_order
    nodes.sort(key=lambda n: (
        n.achievement.category_name or "",
        _RARITY_SORT.get(n.achievement.rarity, 99),
        n.achievement.sort_order,
    ))
    return nodes


# ---------------------------------------------------------------------------
# Graph-friendly tree endpoints
# ---------------------------------------------------------------------------

def _to_ach_node(ach: Achievement) -> AchievementNode:
    return AchievementNode(
        id=ach.id,
        code=ach.code,
        title=ach.title,
        description=ach.description,
        category_code=ach.category.code if ach.category else None,
        rarity=ach.rarity,
        repeatable=ach.repeatable,
        max_level=ach.max_level,
        icon=ach.icon,
        sort_order=ach.sort_order,
        points=ach.points,
    )


def _build_edges(achievements: list[Achievement]) -> list[EdgeOut]:
    edges: list[EdgeOut] = []
    code_map = {a.id: a.code for a in achievements}
    for ach in achievements:
        for prereq in ach.prerequisites:
            from_code = code_map.get(prereq.prereq_achievement_id)
            if from_code:
                edges.append(EdgeOut(
                    from_code=from_code,
                    to_code=ach.code,
                    min_level=prereq.min_level,
                ))
    return edges


async def get_user_tree_graph(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    group_title: str,
    user_display_name: str,
) -> TreeResponse:
    achievements = await get_all_active_achievements(session)
    guas = await get_user_guas(session, group_id, user_id)
    categories = await get_all_categories(session)

    gua_map: dict[uuid.UUID, GroupUserAchievement] = {g.achievement_id: g for g in guas}
    achieved_map: dict[uuid.UUID, int] = {
        aid: g.level for aid, g in gua_map.items() if g.status == "ACHIEVED"
    }

    user_state: dict[str, UserStateValue] = {}
    for ach in achievements:
        gua = gua_map.get(ach.id)
        status = compute_achievement_status(ach, gua, achieved_map)
        user_state[ach.code] = UserStateValue(
            status=status,
            level=gua.level if gua else 0,
            achieved_at=gua.achieved_at.isoformat() if (gua and gua.achieved_at) else None,
        )

    return TreeResponse(
        group=GroupInfo(id=group_id, title=group_title),
        user=UserInfo(id=user_id, display_name=user_display_name),
        categories=[CategoryOut.model_validate(c) for c in categories],
        achievements=[_to_ach_node(a) for a in achievements],
        edges=_build_edges(achievements),
        user_state=user_state,
    )


async def get_group_members_list(
    session: AsyncSession,
    group_id: uuid.UUID,
) -> MembersResponse:
    members = await get_group_members(session, group_id)
    result = []
    for m in members:
        u = m.user
        display_name = u.first_name or u.username or str(u.tg_user_id)
        result.append(MemberOut(user_id=u.id, display_name=display_name, role=m.role))
    return MembersResponse(members=result)


async def get_group_aggregate_tree(
    session: AsyncSession,
    group_id: uuid.UUID,
    group_title: str,
) -> AggregateTreeResponse:
    achievements = await get_all_active_achievements(session)
    categories = await get_all_categories(session)
    members = await get_group_members(session, group_id)
    all_guas = await get_all_group_guas(session, group_id)

    # Group GUAs by user_id
    guas_by_user: dict[uuid.UUID, list[GroupUserAchievement]] = {}
    for g in all_guas:
        guas_by_user.setdefault(g.user_id, []).append(g)

    member_ids = [m.user_id for m in members]
    total = len(member_ids)
    member_display: dict[uuid.UUID, str] = {
        m.user_id: (m.user.first_name or m.user.username or str(m.user.tg_user_id))
        for m in members
    }

    aggregate_state: dict[str, AggregateStateValue] = {}
    for ach in achievements:
        achieved = 0
        available = 0
        locked = 0
        achieved_by: list[str] = []
        for uid in member_ids:
            user_guas = guas_by_user.get(uid, [])
            gua_map = {g.achievement_id: g for g in user_guas}
            achieved_map = {
                aid: g.level for aid, g in gua_map.items() if g.status == "ACHIEVED"
            }
            gua = gua_map.get(ach.id)
            status = compute_achievement_status(ach, gua, achieved_map)
            if status == "ACHIEVED":
                achieved += 1
                achieved_by.append(member_display[uid])
            elif status == "AVAILABLE":
                available += 1
            else:
                locked += 1
        aggregate_state[ach.code] = AggregateStateValue(
            achieved_count=achieved,
            available_count=available,
            locked_count=locked,
            total=total,
            achieved_by=achieved_by,
        )

    return AggregateTreeResponse(
        group=GroupInfo(id=group_id, title=group_title),
        categories=[CategoryOut.model_validate(c) for c in categories],
        achievements=[_to_ach_node(a) for a in achievements],
        edges=_build_edges(achievements),
        aggregate_state=aggregate_state,
    )
