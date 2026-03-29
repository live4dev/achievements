"""
Integration tests for the claim service layer.

Covers:
  - submit_claim:  all validation guards + happy path
  - approve_claim: admin rights check, outcomes, auto-grant cascade
  - reject_claim:  admin check, happy path
  - cancel_claim:  ownership, status guard, happy path
"""

from datetime import datetime, timedelta, timezone

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.claim_service import ClaimError, approve_claim, cancel_claim, reject_claim, submit_claim
from tests.conftest import (
    make_achievement,
    make_category,
    make_claim,
    make_group,
    make_gua,
    make_member,
    make_prerequisite,
    make_user,
)


# ===========================================================================
# submit_claim
# ===========================================================================


class TestSubmitClaim:
    async def test_success(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s1")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=1)
        await make_member(session, group.id, user.id)

        claim = await submit_claim(session, group.id, user.id, ach.id, evidence={"note": "done"})

        assert claim.status == "SUBMITTED"
        assert claim.achievement_id == ach.id
        assert claim.evidence == {"note": "done"}

    async def test_member_not_in_group_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s2")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=2)
        # No GroupMember row

        with pytest.raises(ClaimError, match="активным участником"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_member_not_active_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s3")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=3)
        await make_member(session, group.id, user.id, status="LEFT")

        with pytest.raises(ClaimError, match="активным участником"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_duplicate_submitted_claim_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s4")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=4)
        await make_member(session, group.id, user.id)

        await submit_claim(session, group.id, user.id, ach.id)

        with pytest.raises(ClaimError, match="уже подана"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_achievement_not_found_raises(self, session: AsyncSession):
        import uuid

        group = await make_group(session)
        user = await make_user(session, tg_user_id=5)
        await make_member(session, group.id, user.id)

        with pytest.raises(ClaimError, match="не найдена"):
            await submit_claim(session, group.id, user.id, uuid.uuid4())

    async def test_inactive_achievement_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s6", is_active=False)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=6)
        await make_member(session, group.id, user.id)

        with pytest.raises(ClaimError, match="неактивна"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_locked_achievement_raises(self, session: AsyncSession):
        """Achievement with unmet prerequisite → LOCKED → ClaimError."""
        cat = await make_category(session)
        prereq_ach = await make_achievement(session, cat.id, code="prereq")
        ach = await make_achievement(session, cat.id, code="s7")
        await make_prerequisite(session, ach.id, prereq_ach.id, min_level=1)

        group = await make_group(session)
        user = await make_user(session, tg_user_id=7)
        await make_member(session, group.id, user.id)

        with pytest.raises(ClaimError, match="заблокирована"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_already_achieved_non_repeatable_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s8", repeatable=False)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=8)
        await make_member(session, group.id, user.id)
        await make_gua(session, group.id, user.id, ach.id, status="ACHIEVED", level=1)

        with pytest.raises(ClaimError, match="уже получена"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_cooldown_active_repeatable_raises(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s9", repeatable=True, cooldown_hours=24
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=9)
        await make_member(session, group.id, user.id)
        await make_gua(session, group.id, user.id, ach.id, status="ACHIEVED", level=1)

        # Seed an approved claim reviewed "just now"
        recent_claim = await make_claim(
            session, group.id, user.id, ach.id,
            status="APPROVED",
            reviewed_at=datetime.now(tz=timezone.utc) - timedelta(hours=1),
        )

        with pytest.raises(ClaimError, match="перезарядке"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_cooldown_expired_repeatable_succeeds(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s10", repeatable=True, cooldown_hours=24
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=10)
        await make_member(session, group.id, user.id)
        await make_gua(session, group.id, user.id, ach.id, status="ACHIEVED", level=1)

        # Last approval was 25 hours ago — cooldown has passed
        await make_claim(
            session, group.id, user.id, ach.id,
            status="APPROVED",
            reviewed_at=datetime.now(tz=timezone.utc) - timedelta(hours=25),
        )

        claim = await submit_claim(session, group.id, user.id, ach.id)
        assert claim.status == "SUBMITTED"

    async def test_burnable_cooldown_active_after_grant_raises(self, session: AsyncSession):
        """Admin-granted burnable: cooldown via gua.achieved_at fallback blocks re-claim."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s11",
            burnable=True, required_count=2, period_days=7, cooldown_hours=48,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=11)
        await make_member(session, group.id, user.id)

        # GUA in achieved state with no claim record (e.g. admin-granted),
        # achieved recently — cooldown should still block via achieved_at fallback.
        recent_achieved = datetime.now(tz=timezone.utc) - timedelta(hours=1)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="ACHIEVED", level=1, achieved_at=recent_achieved, period_start=None,
        )

        with pytest.raises(ClaimError, match="перезарядке"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_burnable_cooldown_within_period_raises(self, session: AsyncSession):
        """Within an active burnable period, cooldown between claims must be enforced."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s13",
            burnable=True, required_count=5, period_days=30, cooldown_hours=24,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=13)
        await make_member(session, group.id, user.id)

        # Active period started, first claim was approved 1 hour ago
        period_start = datetime.now(tz=timezone.utc) - timedelta(days=1)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="AVAILABLE", level=0, burnable_progress=1, period_start=period_start,
        )
        await make_claim(
            session, group.id, user.id, ach.id,
            status="APPROVED",
            reviewed_at=datetime.now(tz=timezone.utc) - timedelta(hours=1),
        )

        with pytest.raises(ClaimError, match="перезарядке"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_burnable_cooldown_within_period_expired_succeeds(self, session: AsyncSession):
        """Within an active burnable period, a claim is allowed once cooldown has passed."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s14",
            burnable=True, required_count=5, period_days=30, cooldown_hours=24,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=14)
        await make_member(session, group.id, user.id)

        period_start = datetime.now(tz=timezone.utc) - timedelta(days=3)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="AVAILABLE", level=0, burnable_progress=1, period_start=period_start,
        )
        await make_claim(
            session, group.id, user.id, ach.id,
            status="APPROVED",
            reviewed_at=datetime.now(tz=timezone.utc) - timedelta(hours=25),
        )

        claim = await submit_claim(session, group.id, user.id, ach.id)
        assert claim.status == "SUBMITTED"

    async def test_burnable_cooldown_after_claim_grant_raises(self, session: AsyncSession):
        """Post-grant cooldown is enforced when the grant happened via claim flow."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s15",
            burnable=True, required_count=2, period_days=7, cooldown_hours=48,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=15)
        await make_member(session, group.id, user.id)

        # GUA granted recently, period closed
        recent_granted = datetime.now(tz=timezone.utc) - timedelta(hours=2)
        await make_gua(
            session, group.id, user.id, ach.id,
            status="ACHIEVED", level=1, achieved_at=recent_granted, period_start=None,
        )
        # Approved claim that triggered the grant
        await make_claim(
            session, group.id, user.id, ach.id,
            status="APPROVED",
            reviewed_at=recent_granted,
        )

        with pytest.raises(ClaimError, match="перезарядке"):
            await submit_claim(session, group.id, user.id, ach.id)

    async def test_burnable_no_cooldown_on_first_ever_claim(self, session: AsyncSession):
        """No cooldown when submitting the very first claim for a burnable achievement."""
        cat = await make_category(session)
        ach = await make_achievement(
            session, cat.id, code="s16",
            burnable=True, required_count=3, period_days=14, cooldown_hours=24,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=16)
        await make_member(session, group.id, user.id)
        # No GUA, no prior claims

        claim = await submit_claim(session, group.id, user.id, ach.id)
        assert claim.status == "SUBMITTED"

    async def test_no_evidence_defaults_to_empty_dict(self, session: AsyncSession):
        cat = await make_category(session)
        ach = await make_achievement(session, cat.id, code="s12")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=12)
        await make_member(session, group.id, user.id)

        claim = await submit_claim(session, group.id, user.id, ach.id)
        assert claim.evidence == {}


# ===========================================================================
# approve_claim
# ===========================================================================


class TestApproveClaim:
    async def _setup(self, session, tg_user_id=100, code="ap1"):
        cat = await make_category(session, code=f"cat_{code}")
        ach = await make_achievement(session, cat.id, code=code)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=tg_user_id)
        admin = await make_user(session, tg_user_id=tg_user_id + 1000)
        await make_member(session, group.id, user.id, role="MEMBER")
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id)
        return group, user, admin, ach, claim

    async def test_approve_claim_sets_status_approved(self, session: AsyncSession):
        group, user, admin, ach, claim = await self._setup(session, tg_user_id=100, code="ap1")

        result = await approve_claim(session, claim.id, admin.id)

        assert result["claim"].status == "APPROVED"
        assert result["claim"].reviewed_by_user_id == admin.id
        assert result["level"] == 1

    async def test_approve_creates_gua(self, session: AsyncSession):
        from app.repos.achievement_repo import get_gua

        group, user, admin, ach, claim = await self._setup(session, tg_user_id=101, code="ap2")

        await approve_claim(session, claim.id, admin.id)

        gua = await get_gua(session, group.id, user.id, ach.id)
        assert gua is not None
        assert gua.status == "ACHIEVED"
        assert gua.level == 1

    async def test_approve_nonexistent_claim_raises(self, session: AsyncSession):
        import uuid

        group = await make_group(session)
        admin = await make_user(session, tg_user_id=199)
        await make_member(session, group.id, admin.id, role="ADMIN")

        with pytest.raises(ClaimError, match="не найдена"):
            await approve_claim(session, uuid.uuid4(), admin.id)

    async def test_approve_already_processed_claim_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_ap4")
        ach = await make_achievement(session, cat.id, code="ap4")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=103)
        admin = await make_user(session, tg_user_id=1103)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id, status="APPROVED")

        with pytest.raises(ClaimError, match="уже обработана"):
            await approve_claim(session, claim.id, admin.id)

    async def test_approve_by_non_admin_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_ap5")
        ach = await make_achievement(session, cat.id, code="ap5")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=104)
        non_admin = await make_user(session, tg_user_id=1104)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, non_admin.id, role="MEMBER")
        claim = await make_claim(session, group.id, user.id, ach.id)

        with pytest.raises(ClaimError, match="нет прав администратора"):
            await approve_claim(session, claim.id, non_admin.id)

    async def test_approve_by_user_not_in_group_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_ap6")
        ach = await make_achievement(session, cat.id, code="ap6")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=105)
        outsider = await make_user(session, tg_user_id=1105)
        await make_member(session, group.id, user.id)
        claim = await make_claim(session, group.id, user.id, ach.id)

        with pytest.raises(ClaimError, match="нет прав администратора"):
            await approve_claim(session, claim.id, outsider.id)

    async def test_approve_returns_auto_granted_list(self, session: AsyncSession):
        """Auto-grant achievement fires when its prerequisite is satisfied after approval."""
        cat = await make_category(session, code="cat_ag")
        # Manual achievement
        manual_ach = await make_achievement(session, cat.id, code="manual_ag")
        # Auto-grant achievement requiring the manual one
        auto_ach = await make_achievement(session, cat.id, code="auto_ag", auto_grant=True)
        await make_prerequisite(session, auto_ach.id, manual_ach.id, min_level=1)

        group = await make_group(session)
        user = await make_user(session, tg_user_id=200)
        admin = await make_user(session, tg_user_id=2001)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, manual_ach.id)

        result = await approve_claim(session, claim.id, admin.id)

        auto_codes = [ag["achievement"].code for ag in result["auto_granted"]]
        assert "auto_ag" in auto_codes

    async def test_approve_burnable_progress_outcome(self, session: AsyncSession):
        cat = await make_category(session, code="cat_bp")
        ach = await make_achievement(
            session, cat.id, code="burn_ap",
            burnable=True, required_count=3, period_days=7,
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=300)
        admin = await make_user(session, tg_user_id=3001)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id)

        result = await approve_claim(session, claim.id, admin.id)

        assert result["burnable_outcome"] == "PROGRESS"
        assert result["burnable_progress"] == 1
        assert result["burnable_required"] == 3


# ===========================================================================
# reject_claim
# ===========================================================================


class TestRejectClaim:
    async def test_reject_sets_status_rejected(self, session: AsyncSession):
        cat = await make_category(session, code="cat_r1")
        ach = await make_achievement(session, cat.id, code="r1")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=400)
        admin = await make_user(session, tg_user_id=4001)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id)

        rejected = await reject_claim(session, claim.id, admin.id, comment="Not valid")

        assert rejected.status == "REJECTED"
        assert rejected.comment == "Not valid"
        assert rejected.reviewed_by_user_id == admin.id

    async def test_reject_without_comment(self, session: AsyncSession):
        cat = await make_category(session, code="cat_r2")
        ach = await make_achievement(session, cat.id, code="r2")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=401)
        admin = await make_user(session, tg_user_id=4011)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id)

        rejected = await reject_claim(session, claim.id, admin.id)
        assert rejected.status == "REJECTED"
        assert rejected.comment is None

    async def test_reject_nonexistent_claim_raises(self, session: AsyncSession):
        import uuid

        group = await make_group(session)
        admin = await make_user(session, tg_user_id=499)
        await make_member(session, group.id, admin.id, role="ADMIN")

        with pytest.raises(ClaimError, match="не найдена"):
            await reject_claim(session, uuid.uuid4(), admin.id)

    async def test_reject_already_rejected_claim_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_r3")
        ach = await make_achievement(session, cat.id, code="r3")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=402)
        admin = await make_user(session, tg_user_id=4021)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        claim = await make_claim(session, group.id, user.id, ach.id, status="REJECTED")

        with pytest.raises(ClaimError, match="уже обработана"):
            await reject_claim(session, claim.id, admin.id)

    async def test_reject_by_non_admin_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_r4")
        ach = await make_achievement(session, cat.id, code="r4")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=403)
        non_admin = await make_user(session, tg_user_id=4031)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, non_admin.id, role="MEMBER")
        claim = await make_claim(session, group.id, user.id, ach.id)

        with pytest.raises(ClaimError, match="нет прав администратора"):
            await reject_claim(session, claim.id, non_admin.id)


# ===========================================================================
# cancel_claim
# ===========================================================================


class TestCancelClaim:
    async def test_cancel_sets_status_canceled(self, session: AsyncSession):
        cat = await make_category(session, code="cat_c1")
        ach = await make_achievement(session, cat.id, code="c1")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=500)
        await make_member(session, group.id, user.id)
        claim = await make_claim(session, group.id, user.id, ach.id)

        canceled = await cancel_claim(session, claim.id, user.id)

        assert canceled.status == "CANCELED"

    async def test_cancel_nonexistent_claim_raises(self, session: AsyncSession):
        import uuid

        user = await make_user(session, tg_user_id=599)

        with pytest.raises(ClaimError, match="не найдена"):
            await cancel_claim(session, uuid.uuid4(), user.id)

    async def test_cancel_another_users_claim_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_c2")
        ach = await make_achievement(session, cat.id, code="c2")
        group = await make_group(session)
        owner = await make_user(session, tg_user_id=501)
        other = await make_user(session, tg_user_id=502)
        await make_member(session, group.id, owner.id)
        claim = await make_claim(session, group.id, owner.id, ach.id)

        with pytest.raises(ClaimError, match="не ваша"):
            await cancel_claim(session, claim.id, other.id)

    async def test_cancel_already_approved_claim_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_c3")
        ach = await make_achievement(session, cat.id, code="c3")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=503)
        await make_member(session, group.id, user.id)
        claim = await make_claim(session, group.id, user.id, ach.id, status="APPROVED")

        with pytest.raises(ClaimError, match="SUBMITTED"):
            await cancel_claim(session, claim.id, user.id)

    async def test_cancel_rejected_claim_raises(self, session: AsyncSession):
        cat = await make_category(session, code="cat_c4")
        ach = await make_achievement(session, cat.id, code="c4")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=504)
        await make_member(session, group.id, user.id)
        claim = await make_claim(session, group.id, user.id, ach.id, status="REJECTED")

        with pytest.raises(ClaimError, match="SUBMITTED"):
            await cancel_claim(session, claim.id, user.id)
