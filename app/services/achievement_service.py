import uuid

from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import Achievement, GroupUserAchievement
from app.repos.achievement_repo import (
    compute_achievement_status,
    get_all_active_achievements,
    get_user_guas,
)
from app.schemas.achievement import AchievementTreeNode, AchievementOut, PrerequisiteOut, UserAchievementState


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
        nodes.append(
            AchievementTreeNode(
                achievement=AchievementOut.model_validate(ach),
                prerequisites=[
                    PrerequisiteOut.model_validate(p) for p in ach.prerequisites
                ],
                user_state=user_state,
            )
        )
    return nodes


async def get_user_achievements_by_status(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    status_filter: str | None = None,
) -> list[AchievementTreeNode]:
    nodes = await get_user_achievement_tree(session, group_id, user_id)
    if status_filter:
        nodes = [n for n in nodes if n.user_state.status == status_filter.upper()]
    return nodes
