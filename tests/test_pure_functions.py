"""
Unit tests for pure / near-pure functions that need no database.

Covers:
  - achievement_repo.compute_achievement_status
  - achievement_repo._is_period_expired
  - achievement_service._build_edges
  - achievement_service._to_ach_node
  - achievement_service._RARITY_SORT ordering
"""

import uuid
from datetime import datetime, timedelta, timezone

import pytest

from app.models.orm import Achievement, AchievementPrerequisite, GroupUserAchievement
from app.repos.achievement_repo import _is_period_expired, compute_achievement_status
from app.services.achievement_service import _RARITY_SORT, _build_edges, _to_ach_node


# ---------------------------------------------------------------------------
# Helpers to build ORM objects in-memory (no DB session required)
# ---------------------------------------------------------------------------


def _ach(
    *,
    is_active: bool = True,
    repeatable: bool = False,
    burnable: bool = False,
    max_level: int | None = None,
    period_days: int | None = None,
    prerequisites: list | None = None,
    code: str = "ach",
    category_id: uuid.UUID | None = None,
) -> Achievement:
    a = Achievement(
        id=uuid.uuid4(),
        code=code,
        title="T",
        description="D",
        category_id=category_id or uuid.uuid4(),
        rarity="COMMON",
        repeatable=repeatable,
        burnable=burnable,
        max_level=max_level,
        period_days=period_days,
        is_active=is_active,
        sort_order=0,
        auto_grant=False,
        cooldown_hours=None,
        required_count=None,
    )
    # Override the ORM list so the relationship appears populated
    a.__dict__["prerequisites"] = prerequisites or []
    return a


def _prereq(prereq_achievement_id: uuid.UUID, min_level: int = 1) -> AchievementPrerequisite:
    p = AchievementPrerequisite(
        achievement_id=uuid.uuid4(),
        prereq_achievement_id=prereq_achievement_id,
        min_level=min_level,
    )
    return p


def _gua(
    status: str = "AVAILABLE",
    level: int = 0,
    period_start: datetime | None = None,
    burnable_progress: int = 0,
    achieved_at: datetime | None = None,
) -> GroupUserAchievement:
    g = GroupUserAchievement(
        group_id=uuid.uuid4(),
        user_id=uuid.uuid4(),
        achievement_id=uuid.uuid4(),
        status=status,
        level=level,
        period_start=period_start,
        burnable_progress=burnable_progress,
        achieved_at=achieved_at,
    )
    return g


NOW = datetime(2024, 1, 15, 12, 0, tzinfo=timezone.utc)


# ===========================================================================
# compute_achievement_status
# ===========================================================================


class TestComputeAchievementStatus:
    def test_inactive_returns_locked(self):
        ach = _ach(is_active=False)
        assert compute_achievement_status(ach, None, {}) == "LOCKED"

    def test_active_no_prerequisites_no_gua_returns_available(self):
        ach = _ach()
        assert compute_achievement_status(ach, None, {}) == "AVAILABLE"

    def test_prerequisite_not_met_returns_locked(self):
        prereq_id = uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(prereq_id, min_level=1)])
        # user has not achieved the prereq at all
        assert compute_achievement_status(ach, None, {}) == "LOCKED"

    def test_prerequisite_level_too_low_returns_locked(self):
        prereq_id = uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(prereq_id, min_level=3)])
        # user has level 2, needs level 3
        assert compute_achievement_status(ach, None, {prereq_id: 2}) == "LOCKED"

    def test_prerequisite_exactly_met_returns_available(self):
        prereq_id = uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(prereq_id, min_level=2)])
        assert compute_achievement_status(ach, None, {prereq_id: 2}) == "AVAILABLE"

    def test_prerequisite_exceeded_returns_available(self):
        prereq_id = uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(prereq_id, min_level=1)])
        assert compute_achievement_status(ach, None, {prereq_id: 5}) == "AVAILABLE"

    def test_multiple_prerequisites_all_met(self):
        p1, p2 = uuid.uuid4(), uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(p1), _prereq(p2)])
        assert compute_achievement_status(ach, None, {p1: 1, p2: 2}) == "AVAILABLE"

    def test_multiple_prerequisites_one_missing(self):
        p1, p2 = uuid.uuid4(), uuid.uuid4()
        ach = _ach(prerequisites=[_prereq(p1), _prereq(p2)])
        assert compute_achievement_status(ach, None, {p1: 1}) == "LOCKED"

    # Burnable achievements ──────────────────────────────────────────────────

    def test_burnable_prereqs_met_always_available(self):
        ach = _ach(burnable=True)
        # Even if gua.status == "ACHIEVED", burnable → always AVAILABLE
        gua = _gua(status="ACHIEVED", level=3)
        assert compute_achievement_status(ach, gua, {}) == "AVAILABLE"

    def test_burnable_with_unmet_prereq_returns_locked(self):
        prereq_id = uuid.uuid4()
        ach = _ach(burnable=True, prerequisites=[_prereq(prereq_id)])
        assert compute_achievement_status(ach, None, {}) == "LOCKED"

    # Non-repeatable ─────────────────────────────────────────────────────────

    def test_non_repeatable_achieved_returns_achieved(self):
        ach = _ach(repeatable=False)
        gua = _gua(status="ACHIEVED", level=1)
        assert compute_achievement_status(ach, gua, {}) == "ACHIEVED"

    def test_non_repeatable_gua_available_returns_available(self):
        ach = _ach(repeatable=False)
        gua = _gua(status="AVAILABLE", level=0)
        assert compute_achievement_status(ach, gua, {}) == "AVAILABLE"

    # Repeatable ─────────────────────────────────────────────────────────────

    def test_repeatable_no_max_level_achieved_returns_available(self):
        ach = _ach(repeatable=True, max_level=None)
        gua = _gua(status="ACHIEVED", level=10)
        assert compute_achievement_status(ach, gua, {}) == "AVAILABLE"

    def test_repeatable_below_max_level_returns_available(self):
        ach = _ach(repeatable=True, max_level=5)
        gua = _gua(status="ACHIEVED", level=3)
        assert compute_achievement_status(ach, gua, {}) == "AVAILABLE"

    def test_repeatable_at_max_level_returns_achieved(self):
        ach = _ach(repeatable=True, max_level=5)
        gua = _gua(status="ACHIEVED", level=5)
        assert compute_achievement_status(ach, gua, {}) == "ACHIEVED"

    def test_repeatable_above_max_level_returns_achieved(self):
        ach = _ach(repeatable=True, max_level=5)
        gua = _gua(status="ACHIEVED", level=6)
        assert compute_achievement_status(ach, gua, {}) == "ACHIEVED"

    def test_repeatable_level_one_no_max_returns_available(self):
        ach = _ach(repeatable=True, max_level=None)
        gua = _gua(status="ACHIEVED", level=1)
        assert compute_achievement_status(ach, gua, {}) == "AVAILABLE"


# ===========================================================================
# _is_period_expired
# ===========================================================================


class TestIsPeriodExpired:
    def test_non_burnable_returns_false(self):
        ach = _ach(burnable=False, period_days=7)
        gua = _gua(period_start=NOW - timedelta(days=10))
        assert _is_period_expired(gua, ach, NOW) is False

    def test_gua_none_returns_false(self):
        ach = _ach(burnable=True, period_days=7)
        assert _is_period_expired(None, ach, NOW) is False

    def test_period_start_none_returns_false(self):
        ach = _ach(burnable=True, period_days=7)
        gua = _gua(period_start=None)
        assert _is_period_expired(gua, ach, NOW) is False

    def test_within_period_returns_false(self):
        ach = _ach(burnable=True, period_days=7)
        gua = _gua(period_start=NOW - timedelta(days=3))
        assert _is_period_expired(gua, ach, NOW) is False

    def test_exactly_at_boundary_returns_true(self):
        ach = _ach(burnable=True, period_days=7)
        gua = _gua(period_start=NOW - timedelta(days=7))
        assert _is_period_expired(gua, ach, NOW) is True

    def test_past_period_returns_true(self):
        ach = _ach(burnable=True, period_days=7)
        gua = _gua(period_start=NOW - timedelta(days=10))
        assert _is_period_expired(gua, ach, NOW) is True

    def test_one_second_before_expiry_returns_false(self):
        ach = _ach(burnable=True, period_days=7)
        period_start = NOW - timedelta(days=7) + timedelta(seconds=1)
        gua = _gua(period_start=period_start)
        assert _is_period_expired(gua, ach, NOW) is False


# ===========================================================================
# _build_edges
# ===========================================================================


class TestBuildEdges:
    def test_empty_list_returns_no_edges(self):
        assert _build_edges([]) == []

    def test_achievement_with_no_prerequisites(self):
        ach = _ach(code="solo")
        ach.__dict__["prerequisites"] = []
        assert _build_edges([ach]) == []

    def test_single_prerequisite_edge(self):
        parent = _ach(code="parent")
        parent.__dict__["prerequisites"] = []
        child = _ach(code="child")
        prereq = AchievementPrerequisite(
            achievement_id=child.id,
            prereq_achievement_id=parent.id,
            min_level=1,
        )
        child.__dict__["prerequisites"] = [prereq]
        edges = _build_edges([parent, child])
        assert len(edges) == 1
        assert edges[0].from_code == "parent"
        assert edges[0].to_code == "child"
        assert edges[0].min_level == 1

    def test_multiple_prerequisites_for_one_achievement(self):
        p1 = _ach(code="p1")
        p1.__dict__["prerequisites"] = []
        p2 = _ach(code="p2")
        p2.__dict__["prerequisites"] = []
        child = _ach(code="child")
        child.__dict__["prerequisites"] = [
            AchievementPrerequisite(
                achievement_id=child.id,
                prereq_achievement_id=p1.id,
                min_level=1,
            ),
            AchievementPrerequisite(
                achievement_id=child.id,
                prereq_achievement_id=p2.id,
                min_level=2,
            ),
        ]
        edges = _build_edges([p1, p2, child])
        codes = {(e.from_code, e.to_code, e.min_level) for e in edges}
        assert ("p1", "child", 1) in codes
        assert ("p2", "child", 2) in codes

    def test_prerequisite_not_in_list_is_skipped(self):
        """Edge is only built when the prereq achievement is in the provided list."""
        unknown_id = uuid.uuid4()
        child = _ach(code="child")
        child.__dict__["prerequisites"] = [
            AchievementPrerequisite(
                achievement_id=child.id,
                prereq_achievement_id=unknown_id,
                min_level=1,
            )
        ]
        # The prerequisite achievement is NOT in the list → edge skipped
        assert _build_edges([child]) == []


# ===========================================================================
# _to_ach_node
# ===========================================================================


class TestToAchNode:
    def test_maps_basic_fields(self):
        ach = _ach(code="hero", is_active=True, repeatable=True, max_level=3)
        ach.title = "Hero"
        ach.description = "Be a hero"
        ach.rarity = "EPIC"
        ach.sort_order = 5
        ach.points = 100
        ach.icon = "🏆"
        ach.auto_grant = False
        ach.burnable = False
        ach.required_count = None
        ach.period_days = None
        ach.category = None  # no category → category_code=None

        node = _to_ach_node(ach)

        assert node.id == ach.id
        assert node.code == "hero"
        assert node.title == "Hero"
        assert node.description == "Be a hero"
        assert node.rarity == "EPIC"
        assert node.repeatable is True
        assert node.max_level == 3
        assert node.sort_order == 5
        assert node.points == 100
        assert node.icon == "🏆"
        assert node.category_code is None

    def test_category_code_populated_when_category_present(self):
        from app.models.orm import Category

        ach = _ach(code="cat_ach")
        cat = Category(id=uuid.uuid4(), code="sports", name="Sports")
        ach.category = cat

        node = _to_ach_node(ach)
        assert node.category_code == "sports"


# ===========================================================================
# _RARITY_SORT ordering
# ===========================================================================


class TestRaritySort:
    def test_legendary_sorts_before_common(self):
        assert _RARITY_SORT["LEGENDARY"] < _RARITY_SORT["COMMON"]

    def test_epic_before_rare(self):
        assert _RARITY_SORT["EPIC"] < _RARITY_SORT["RARE"]

    def test_full_order(self):
        order = ["LEGENDARY", "EPIC", "RARE", "UNCOMMON", "COMMON"]
        values = [_RARITY_SORT[r] for r in order]
        assert values == sorted(values)

    def test_unknown_rarity_uses_fallback(self):
        """get() with default 99 handles unknown rarities without KeyError."""
        fallback = _RARITY_SORT.get("MYTHIC", 99)
        assert fallback == 99
        # Unknown rarity should sort after COMMON
        assert fallback > _RARITY_SORT["COMMON"]
