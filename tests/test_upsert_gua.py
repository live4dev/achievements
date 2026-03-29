"""
Integration tests for achievement_repo.upsert_gua_approved.

Tests every outcome path:
  GRANTED  — standard first approval, repeatable, or burnable completion
  PROGRESS — burnable approval that increments progress but doesn't complete the period
  RESET    — burnable approval after the period has expired
"""

from datetime import datetime, timedelta, timezone

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.repos.achievement_repo import get_gua, upsert_gua_approved
from tests.conftest import make_achievement, make_category, make_group, make_gua, make_user

NOW = datetime(2024, 6, 1, 12, 0, tzinfo=timezone.utc)


# ---------------------------------------------------------------------------
# Standard (non-repeatable, non-burnable) achievements
# ---------------------------------------------------------------------------


class TestUpsertGuaStandard:
    async def test_first_approval_creates_achieved_gua(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="std1")
        group = await make_group(session)
        user = await make_user(session)

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "GRANTED"
        assert gua.status == "ACHIEVED"
        assert gua.level == 1
        assert gua.achieved_at is not None

    async def test_second_approval_non_repeatable_stays_level_1(self, session: AsyncSession):
        """Non-repeatable achievement: re-approving keeps level=1, status=ACHIEVED."""
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="std2", repeatable=False)
        group = await make_group(session)
        user = await make_user(session)

        # First approval
        await upsert_gua_approved(session, group.id, user.id, ach)
        # Second approval (e.g., admin mistake)
        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "GRANTED"
        assert gua.level == 1
        assert gua.status == "ACHIEVED"


# ---------------------------------------------------------------------------
# Repeatable achievements
# ---------------------------------------------------------------------------


class TestUpsertGuaRepeatable:
    async def test_first_approval_grants_level_1(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="rep1", repeatable=True)
        group = await make_group(session)
        user = await make_user(session)

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "GRANTED"
        assert gua.level == 1
        assert gua.status == "ACHIEVED"

    async def test_subsequent_approvals_increment_level(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="rep2", repeatable=True)
        group = await make_group(session)
        user = await make_user(session)

        for expected_level in range(1, 4):
            gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)
            assert outcome == "GRANTED"
            assert gua.level == expected_level
            assert gua.status == "ACHIEVED"

    async def test_repeatable_with_max_level_increments_until_cap(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="rep3", repeatable=True, max_level=3)
        group = await make_group(session)
        user = await make_user(session)

        # Approve 3 times — each should increment level
        for expected in range(1, 4):
            gua, _ = await upsert_gua_approved(session, group.id, user.id, ach)
            assert gua.level == expected

    async def test_repeatable_achieved_at_set_on_first_approval(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="rep4", repeatable=True)
        group = await make_group(session)
        user = await make_user(session)

        gua1, _ = await upsert_gua_approved(session, group.id, user.id, ach)
        first_achieved_at = gua1.achieved_at
        assert first_achieved_at is not None

        # Second approval — achieved_at should not change (already set)
        gua2, _ = await upsert_gua_approved(session, group.id, user.id, ach)
        assert gua2.achieved_at == first_achieved_at


# ---------------------------------------------------------------------------
# Burnable achievements
# ---------------------------------------------------------------------------


class TestUpsertGuaBurnable:
    async def test_first_approval_starts_progress(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn1", burnable=True, required_count=3, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "PROGRESS"
        assert gua.burnable_progress == 1
        assert gua.level == 0
        assert gua.status == "AVAILABLE"
        assert gua.period_start is not None

    async def test_progress_increments_before_required_count(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn2", burnable=True, required_count=3, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        await upsert_gua_approved(session, group.id, user.id, ach)  # progress=1
        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)  # progress=2

        assert outcome == "PROGRESS"
        assert gua.burnable_progress == 2
        assert gua.level == 0

    async def test_reaching_required_count_grants_achievement(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn3", burnable=True, required_count=3, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        await upsert_gua_approved(session, group.id, user.id, ach)  # progress=1
        await upsert_gua_approved(session, group.id, user.id, ach)  # progress=2
        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)  # grants!

        assert outcome == "GRANTED"
        assert gua.level == 1
        assert gua.status == "ACHIEVED"
        assert gua.burnable_progress == 0
        assert gua.period_start is None
        assert gua.achieved_at is not None

    async def test_expired_period_resets_progress(self, session: AsyncSession):
        """Approving after period expiry resets progress and returns RESET."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn4", burnable=True, required_count=5, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        # Seed an existing GUA with an expired period
        old_start = datetime.now(tz=timezone.utc) - timedelta(days=10)
        await make_gua(
            session,
            group.id,
            user.id,
            ach.id,
            status="AVAILABLE",
            level=0,
            burnable_progress=3,
            period_start=old_start,
        )

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "RESET"
        assert gua.burnable_progress == 1  # reset to 1 (counts current approval)
        assert gua.level == 0

    async def test_null_period_start_treated_as_expired(self, session: AsyncSession):
        """A GUA with period_start=None is treated like an expired period."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn5", burnable=True, required_count=5, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        await make_gua(
            session, group.id, user.id, ach.id,
            status="AVAILABLE", burnable_progress=2, period_start=None,
        )

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)

        assert outcome == "RESET"
        assert gua.burnable_progress == 1

    async def test_second_period_increments_level(self, session: AsyncSession):
        """Completing a second burnable period → level=2."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="burn6", burnable=True, required_count=2, period_days=7
        )
        group = await make_group(session)
        user = await make_user(session)

        # Complete first period
        await upsert_gua_approved(session, group.id, user.id, ach)  # progress=1
        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)  # granted
        assert outcome == "GRANTED"
        assert gua.level == 1

        # Start second period (period_start is now None after grant)
        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)
        assert outcome == "RESET"  # no active period → reset/start new
        assert gua.burnable_progress == 1

        gua, outcome = await upsert_gua_approved(session, group.id, user.id, ach)
        assert outcome == "GRANTED"
        assert gua.level == 2
