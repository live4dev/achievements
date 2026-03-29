
"""
Integration tests for the achievement service layer.

Covers:
  - get_user_achievement_tree        (status, burnable fields, period expiry)
  - get_user_achievements_by_status  (filter + rarity sort)
  - get_group_members_list           (display name logic)
  - get_group_aggregate_tree         (per-achievement counts)
  - _build_edges / graph shape via get_user_tree_graph
"""

from datetime import datetime, timedelta, timezone

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.achievement_service import (
    get_group_aggregate_tree,
    get_group_members_list,
    get_user_achievement_tree,
    get_user_achievements_by_status,
    get_user_tree_graph,
)
from tests.conftest import (
    make_achievement,
    make_category,
    make_group,
    make_gua,
    make_member,
    make_prerequisite,
    make_user,
)


# ===========================================================================
# get_user_achievement_tree
# ===========================================================================


class TestGetUserAchievementTree:
    async def test_empty_returns_empty_list(self, session: AsyncSession):
        group = await make_group(session)
        user = await make_user(session, tg_user_id=1)
        nodes = await get_user_achievement_tree(session, group.id, user.id)
        assert nodes == []

    async def test_inactive_achievement_not_included(self, session: AsyncSession):
        cat = await make_category(session)
        await make_achievement(session, cat.id, code="inactive", is_active=False)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=2)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        assert all(n.achievement.code != "inactive" for n in nodes)
        assert len(nodes) == 0

    async def test_available_achievement_has_correct_status(self, session: AsyncSession):
        cat = await make_category(session)
        await make_achievement(session, cat.id, code="avail")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=3)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        assert len(nodes) == 1
        assert nodes[0].user_state.status == "AVAILABLE"
        assert nodes[0].user_state.level == 0

    async def test_achieved_achievement_shows_achieved_status(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="done")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=4)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, ach.id, status="ACHIEVED", level=2, achieved_at=now)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        assert nodes[0].user_state.status == "ACHIEVED"
        assert nodes[0].user_state.level == 2
        assert nodes[0].user_state.achieved_at is not None

    async def test_locked_when_prereq_not_met(self, session: AsyncSession):
        cat = await make_category(session)
        prereq = await make_achievement(session, cat.id, code="prereq_srv")
        child = await make_achievement(session, cat.id, code="child_srv")
        await make_prerequisite(session, child.id, prereq.id, min_level=1)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=5)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        child_node = next(n for n in nodes if n.achievement.code == "child_srv")
        assert child_node.user_state.status == "LOCKED"

    async def test_unlocked_when_prereq_met(self, session: AsyncSession):
        cat = await make_category(session)
        prereq = await make_achievement(session, cat.id, code="prereq2")
        child = await make_achievement(session, cat.id, code="child2")
        await make_prerequisite(session, child.id, prereq.id, min_level=1)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=6)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, prereq.id, status="ACHIEVED", level=1, achieved_at=now)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        child_node = next(n for n in nodes if n.achievement.code == "child2")
        assert child_node.user_state.status == "AVAILABLE"

    async def test_burnable_progress_and_period_expiry_exposed(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn_tree",
            burnable=True, required_count=5, period_days=7,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=7)
        period_start = datetime.now(tz=timezone.utc) - timedelta(days=2)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="AVAILABLE", burnable_progress=3, period_start=period_start,
        )

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        state = nodes[0].user_state
        assert state.burnable_progress == 3
        assert state.period_expires_at is not None

    async def test_burnable_expired_period_clears_expiry(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn_exp",
            burnable=True, required_count=5, period_days=7,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=8)
        old_start = datetime.now(tz=timezone.utc) - timedelta(days=10)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="AVAILABLE", burnable_progress=2, period_start=old_start,
        )

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        state = nodes[0].user_state
        assert state.period_expires_at is None  # expired period → None

    async def test_category_name_and_icon_populated(self, session: AsyncSession):
        from app.models.orm import Category
        cat = await make_category(session, code="special", name="Special")
        # Add icon directly
        cat.icon = "⭐"
        await session.flush()
        await make_achievement(session, cat.id, code="cat_test")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=9)

        nodes = await get_user_achievement_tree(session, group.id, user.id)
        assert nodes[0].achievement.category_name == "Special"
        assert nodes[0].achievement.category_icon == "⭐"


# ===========================================================================
# get_user_achievements_by_status
# ===========================================================================


class TestGetUserAchievementsByStatus:
    async def test_filter_available_only(self, session: AsyncSession):
        cat = await make_category(session, code="filt_cat")
        await make_achievement(session, cat.id, code="avail_f")
        ach2 = await make_achievement(session, cat.id, code="achvd_f")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=20)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, ach2.id, status="ACHIEVED", level=1, achieved_at=now)

        nodes = await get_user_achievements_by_status(session, group.id, user.id, "AVAILABLE")
        codes = {n.achievement.code for n in nodes}
        assert "avail_f" in codes
        assert "achvd_f" not in codes

    async def test_filter_achieved_only(self, session: AsyncSession):
        cat = await make_category(session, code="filt_cat2")
        await make_achievement(session, cat.id, code="avail_f2")
        ach2 = await make_achievement(session, cat.id, code="achvd_f2")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=21)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, ach2.id, status="ACHIEVED", level=1, achieved_at=now)

        nodes = await get_user_achievements_by_status(session, group.id, user.id, "ACHIEVED")
        codes = {n.achievement.code for n in nodes}
        assert "achvd_f2" in codes
        assert "avail_f2" not in codes

    async def test_no_filter_returns_all(self, session: AsyncSession):
        cat = await make_category(session, code="filt_cat3")
        await make_achievement(session, cat.id, code="a1_all")
        await make_achievement(session, cat.id, code="a2_all")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=22)

        nodes = await get_user_achievements_by_status(session, group.id, user.id)
        assert len(nodes) == 2

    async def test_rarity_sort_within_same_category(self, session: AsyncSession):
        """LEGENDARY should appear before COMMON within the same category."""
        cat = await make_category(session, code="sort_cat")
        await make_achievement(session, cat.id, code="common_s", rarity="COMMON")
        await make_achievement(session, cat.id, code="legendary_s", rarity="LEGENDARY")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=23)

        nodes = await get_user_achievements_by_status(session, group.id, user.id)
        codes = [n.achievement.code for n in nodes]
        assert codes.index("legendary_s") < codes.index("common_s")


# ===========================================================================
# get_group_members_list
# ===========================================================================


class TestGetGroupMembersList:
    async def test_returns_active_members(self, session: AsyncSession):
        group = await make_group(session)
        u1 = await make_user(session, tg_user_id=30, first_name="Bob")
        u2 = await make_user(session, tg_user_id=31, first_name="Carol")
        u3 = await make_user(session, tg_user_id=32, first_name="Dave")
        await make_member(session, group.id, u1.id)
        await make_member(session, group.id, u2.id)
        await make_member(session, group.id, u3.id, status="LEFT")

        result = await get_group_members_list(session, group.id)
        ids = {m.user_id for m in result.members}
        assert u1.id in ids
        assert u2.id in ids
        assert u3.id not in ids

    async def test_display_name_first_name_preferred(self, session: AsyncSession):
        group = await make_group(session)
        user = await make_user(session, tg_user_id=33, first_name="Alice", username="alice99")
        await make_member(session, group.id, user.id)

        result = await get_group_members_list(session, group.id)
        assert result.members[0].display_name == "Alice"

    async def test_display_name_falls_back_to_username(self, session: AsyncSession):
        group = await make_group(session)
        user = await make_user(session, tg_user_id=34, first_name=None, username="bob_tg")
        await make_member(session, group.id, user.id)

        result = await get_group_members_list(session, group.id)
        assert result.members[0].display_name == "bob_tg"

    async def test_display_name_falls_back_to_tg_id(self, session: AsyncSession):
        group = await make_group(session)
        user = await make_user(session, tg_user_id=35, first_name=None, username=None)
        await make_member(session, group.id, user.id)

        result = await get_group_members_list(session, group.id)
        assert result.members[0].display_name == "35"

    async def test_empty_group_returns_empty(self, session: AsyncSession):
        group = await make_group(session)
        result = await get_group_members_list(session, group.id)
        assert result.members == []


# ===========================================================================
# get_user_tree_graph
# ===========================================================================


class TestGetUserTreeGraph:
    async def test_graph_structure(self, session: AsyncSession):
        cat = await make_category(session, code="graph_cat")
        parent = await make_achievement(session, cat.id, code="g_parent")
        child = await make_achievement(session, cat.id, code="g_child")
        await make_prerequisite(session, child.id, parent.id, min_level=1)
        group = await make_group(session, title="Graph Group")
        user = await make_user(session, tg_user_id=40, first_name="Eve")
        await make_member(session, group.id, user.id)

        resp = await get_user_tree_graph(session, group.id, user.id, "Graph Group", "Eve")

        assert resp.group.title == "Graph Group"
        assert resp.user.display_name == "Eve"
        assert len(resp.achievements) == 2
        assert len(resp.edges) == 1
        assert resp.edges[0].from_code == "g_parent"
        assert resp.edges[0].to_code == "g_child"

    async def test_user_state_keyed_by_code(self, session: AsyncSession):
        cat = await make_category(session, code="us_cat")
        ach = await make_achievement(session, cat.id, code="us_ach")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=41)

        resp = await get_user_tree_graph(session, group.id, user.id, "G", "U")
        assert "us_ach" in resp.user_state
        assert resp.user_state["us_ach"].status == "AVAILABLE"

    async def test_cooldown_until_populated_when_active(self, session: AsyncSession):
        cat = await make_category(session, code="cd_cat")
        ach = await make_achievement(
            session, cat.id, code="cd_ach", repeatable=True, cooldown_hours=24
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=42)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, ach.id, status="ACHIEVED", level=1, achieved_at=now)

        # Seed an approved claim reviewed just 1 hour ago (cooldown = 24h)
        from tests.conftest import make_claim
        from app.models.orm import AchievementClaim

        recent_claim = AchievementClaim(
            group_id=group.id,
            user_id=user.id,
            achievement_id=ach.id,
            status="APPROVED",
            evidence={},
            reviewed_at=datetime.now(tz=timezone.utc) - timedelta(hours=1),
        )
        session.add(recent_claim)
        await session.flush()

        resp = await get_user_tree_graph(session, group.id, user.id, "G", "U")
        assert resp.user_state["cd_ach"].cooldown_until is not None


# ===========================================================================
# get_group_aggregate_tree
# ===========================================================================


class TestGetGroupAggregateTree:
    async def test_aggregate_counts(self, session: AsyncSession):
        cat = await make_category(session, code="agg_cat")
        ach = await make_achievement(session, cat.id, code="agg1")
        group = await make_group(session, title="Agg Group")

        u1 = await make_user(session, tg_user_id=50, first_name="U1")
        u2 = await make_user(session, tg_user_id=51, first_name="U2")
        u3 = await make_user(session, tg_user_id=52, first_name="U3")
        await make_member(session, group.id, u1.id)
        await make_member(session, group.id, u2.id)
        await make_member(session, group.id, u3.id)

        now = datetime.now(tz=timezone.utc)
        # u1 has achieved it; u2 and u3 have not
        await make_gua(session, group.id, u1.id, ach.id, status="ACHIEVED", level=1, achieved_at=now)

        resp = await get_group_aggregate_tree(session, group.id, "Agg Group")

        state = resp.aggregate_state["agg1"]
        assert state.achieved_count == 1
        assert state.available_count == 2
        assert state.locked_count == 0
        assert state.total == 3

    async def test_achieved_by_contains_display_names(self, session: AsyncSession):
        cat = await make_category(session, code="agg_cat2")
        ach = await make_achievement(session, cat.id, code="agg2")
        group = await make_group(session, title="Agg2")

        u1 = await make_user(session, tg_user_id=53, first_name="Zara")
        await make_member(session, group.id, u1.id)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, u1.id, ach.id, status="ACHIEVED", level=1, achieved_at=now)

        resp = await get_group_aggregate_tree(session, group.id, "Agg2")
        assert "Zara" in resp.aggregate_state["agg2"].achieved_by

    async def test_group_with_no_members(self, session: AsyncSession):
        cat = await make_category(session, code="agg_cat3")
        await make_achievement(session, cat.id, code="agg3")
        group = await make_group(session, title="Empty")

        resp = await get_group_aggregate_tree(session, group.id, "Empty")
        state = resp.aggregate_state["agg3"]
        assert state.achieved_count == 0
        assert state.total == 0

    async def test_graph_edges_in_aggregate_response(self, session: AsyncSession):
        cat = await make_category(session, code="agg_cat4")
        parent = await make_achievement(session, cat.id, code="agg_parent")
        child = await make_achievement(session, cat.id, code="agg_child")
        await make_prerequisite(session, child.id, parent.id, min_level=1)
        group = await make_group(session, title="AggEdge")

        resp = await get_group_aggregate_tree(session, group.id, "AggEdge")
        assert len(resp.edges) == 1
        assert resp.edges[0].from_code == "agg_parent"
        assert resp.edges[0].to_code == "agg_child"
