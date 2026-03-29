"""
Integration tests for admin_service and supporting admin_repo functions.

Covers:
  - create_category_safe      (duplicate guard)
  - update_category_safe
  - create_achievement_safe   (duplicate guard)
  - update_achievement_safe   (type coercion, validation)
  - deactivate_achievement_safe
  - grant_achievement_safe    (admin check, target check, achievement check, levels)
  - toggle_prerequisite_safe  (add, remove, cycle detection)
  - admin_repo.check_cycle
  - user_repo functions
  - group_repo extras
"""

import uuid

import pytest
from sqlalchemy.ext.asyncio import AsyncSession

from app.services.admin_service import (
    AdminError,
    create_achievement_safe,
    create_category_safe,
    deactivate_achievement_safe,
    grant_achievement_safe,
    toggle_prerequisite_safe,
    update_achievement_safe,
    update_category_safe,
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
# create_category_safe
# ===========================================================================


class TestCreateCategorySafe:
    async def test_creates_category_successfully(self, session: AsyncSession):
        cat = await create_category_safe(session, code="cc1", name="CC1", description="desc")
        assert cat.code == "cc1"
        assert cat.name == "CC1"

    async def test_duplicate_code_raises(self, session: AsyncSession):
        await create_category_safe(session, code="cc_dup", name="A", description=None)

        with pytest.raises(AdminError, match="уже существует"):
            await create_category_safe(session, code="cc_dup", name="B", description=None)


# ===========================================================================
# update_category_safe
# ===========================================================================


class TestUpdateCategorySafe:
    async def test_updates_field(self, session: AsyncSession):
        cat = await make_category(session, code="upcat1", name="OldName")
        updated = await update_category_safe(session, cat.id, "name", "NewName")
        assert updated.name == "NewName"


# ===========================================================================
# create_achievement_safe
# ===========================================================================


class TestCreateAchievementSafe:
    async def test_creates_achievement(self, session: AsyncSession):
        cat = await make_category(session, code="adm_c1")
        wizard = {
            "code": "adm_a1",
            "title": "Admin Ach",
            "description": "desc",
            "category_id": str(cat.id),
            "rarity": "RARE",
        }
        ach = await create_achievement_safe(session, wizard)
        assert ach.code == "adm_a1"
        assert ach.rarity == "RARE"

    async def test_duplicate_code_raises(self, session: AsyncSession):
        cat = await make_category(session, code="adm_c2")
        wizard = {
            "code": "adm_dup",
            "title": "T",
            "description": "D",
            "category_id": str(cat.id),
            "rarity": "COMMON",
        }
        await create_achievement_safe(session, wizard)

        with pytest.raises(AdminError, match="уже существует"):
            await create_achievement_safe(session, wizard)


# ===========================================================================
# update_achievement_safe
# ===========================================================================


class TestUpdateAchievementSafe:
    async def test_updates_title(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c")
        ach = await make_achievement(session, cat.id, code="upach1")

        updated = await update_achievement_safe(session, ach.id, "title", "New Title")
        assert updated.title == "New Title"

    async def test_updates_points_as_int(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c2")
        ach = await make_achievement(session, cat.id, code="upach2")

        updated = await update_achievement_safe(session, ach.id, "points", "150")
        assert updated.points == 150

    async def test_clears_points_when_empty_string(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c3")
        ach = await make_achievement(session, cat.id, code="upach3")

        updated = await update_achievement_safe(session, ach.id, "points", "")
        assert updated.points is None

    async def test_invalid_points_raises(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c4")
        ach = await make_achievement(session, cat.id, code="upach4")

        with pytest.raises(AdminError, match="целое число"):
            await update_achievement_safe(session, ach.id, "points", "abc")

    async def test_updates_category_id(self, session: AsyncSession):
        cat_old = await make_category(session, code="old_cat_u")
        cat_new = await make_category(session, code="new_cat_u")
        ach = await make_achievement(session, cat_old.id, code="upach5")

        updated = await update_achievement_safe(session, ach.id, "category_id", str(cat_new.id))
        assert updated.category_id == cat_new.id

    async def test_invalid_category_id_raises(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c6")
        ach = await make_achievement(session, cat.id, code="upach6")

        with pytest.raises(AdminError, match="Неверный ID"):
            await update_achievement_safe(session, ach.id, "category_id", "not-a-uuid")

    async def test_clears_icon_when_empty(self, session: AsyncSession):
        cat = await make_category(session, code="upach_c7")
        ach = await make_achievement(session, cat.id, code="upach7")

        updated = await update_achievement_safe(session, ach.id, "icon", "")
        assert updated.icon is None


# ===========================================================================
# deactivate_achievement_safe
# ===========================================================================


class TestDeactivateAchievementSafe:
    async def test_deactivates_achievement(self, session: AsyncSession):
        cat = await make_category(session, code="deact_c")
        ach = await make_achievement(session, cat.id, code="deact1", is_active=True)

        result = await deactivate_achievement_safe(session, ach.id)
        assert result.is_active is False


# ===========================================================================
# grant_achievement_safe
# ===========================================================================


class TestGrantAchievementSafe:
    async def _setup(self, session, code_suffix=""):
        cat = await make_category(session, code=f"grant_c{code_suffix}")
        ach = await make_achievement(session, cat.id, code=f"grant_a{code_suffix}")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=int(f"9{code_suffix or '0'}"))
        admin = await make_user(session, tg_user_id=int(f"99{code_suffix or '0'}"))
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        return group, user, admin, ach

    async def test_grant_standard_achievement(self, session: AsyncSession):
        group, user, admin, ach = await self._setup(session, "1")

        result = await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)

        assert result["level"] == 1
        assert result["achievement"].id == ach.id

    async def test_grant_by_non_admin_raises(self, session: AsyncSession):
        group, user, admin, ach = await self._setup(session, "2")
        # Use user (MEMBER) as the granting admin
        with pytest.raises(AdminError, match="нет прав администратора"):
            await grant_achievement_safe(session, group.id, user.id, ach.id, user.id)

    async def test_grant_to_non_member_raises(self, session: AsyncSession):
        group, user, admin, ach = await self._setup(session, "3")
        outsider = await make_user(session, tg_user_id=8883)

        with pytest.raises(AdminError, match="активным участником"):
            await grant_achievement_safe(session, group.id, outsider.id, ach.id, admin.id)

    async def test_grant_inactive_achievement_raises(self, session: AsyncSession):
        cat = await make_category(session, code="grant_c4i")
        ach = await make_achievement(session, cat.id, code="grant_a4i", is_active=False)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=8884)
        admin = await make_user(session, tg_user_id=9984)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")

        with pytest.raises(AdminError, match="не найдена"):
            await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)

    async def test_grant_already_achieved_non_repeatable_raises(self, session: AsyncSession):
        from datetime import datetime, timezone

        group, user, admin, ach = await self._setup(session, "5")
        await make_gua(
            session, group.id, user.id, ach.id,
            status="ACHIEVED", level=1, achieved_at=datetime.now(tz=timezone.utc),
        )

        with pytest.raises(AdminError, match="уже получил"):
            await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)

    async def test_grant_repeatable_increments_level(self, session: AsyncSession):
        cat = await make_category(session, code="grant_c6")
        ach = await make_achievement(session, cat.id, code="grant_a6", repeatable=True)
        group = await make_group(session)
        user = await make_user(session, tg_user_id=8886)
        admin = await make_user(session, tg_user_id=9986)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")

        result1 = await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)
        assert result1["level"] == 1
        result2 = await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)
        assert result2["level"] == 2

    async def test_grant_at_max_level_raises(self, session: AsyncSession):
        from datetime import datetime, timezone

        cat = await make_category(session, code="grant_c7")
        ach = await make_achievement(
            session, cat.id, code="grant_a7", repeatable=True, max_level=2
        )
        group = await make_group(session)
        user = await make_user(session, tg_user_id=8887)
        admin = await make_user(session, tg_user_id=9987)
        await make_member(session, group.id, user.id)
        await make_member(session, group.id, admin.id, role="ADMIN")
        await make_gua(
            session, group.id, user.id, ach.id,
            status="ACHIEVED", level=2, achieved_at=datetime.now(tz=timezone.utc),
        )

        with pytest.raises(AdminError, match="максимального уровня"):
            await grant_achievement_safe(session, group.id, user.id, ach.id, admin.id)


# ===========================================================================
# toggle_prerequisite_safe
# ===========================================================================


class TestTogglePrerequisiteSafe:
    async def test_adds_prerequisite(self, session: AsyncSession):
        cat = await make_category(session, code="tog_c1")
        parent = await make_achievement(session, cat.id, code="tog_p1")
        child = await make_achievement(session, cat.id, code="tog_c1_a")

        added = await toggle_prerequisite_safe(session, child.id, parent.id)
        assert added is True

    async def test_removes_existing_prerequisite(self, session: AsyncSession):
        cat = await make_category(session, code="tog_c2")
        parent = await make_achievement(session, cat.id, code="tog_p2")
        child = await make_achievement(session, cat.id, code="tog_c2_a")
        await make_prerequisite(session, child.id, parent.id)

        removed = await toggle_prerequisite_safe(session, child.id, parent.id)
        assert removed is False

    async def test_cycle_detection_raises(self, session: AsyncSession):
        """A → B → C; adding C→A would create a cycle."""
        cat = await make_category(session, code="tog_c3")
        a = await make_achievement(session, cat.id, code="tog_a")
        b = await make_achievement(session, cat.id, code="tog_b")
        c = await make_achievement(session, cat.id, code="tog_c")

        # B requires A; C requires B
        await toggle_prerequisite_safe(session, b.id, a.id)
        await toggle_prerequisite_safe(session, c.id, b.id)

        # Now try to make A require C → would create A→B→C→A cycle
        with pytest.raises(AdminError, match="цикл"):
            await toggle_prerequisite_safe(session, a.id, c.id)


# ===========================================================================
# admin_repo.check_cycle (direct unit)
# ===========================================================================


class TestCheckCycle:
    async def test_no_cycle_returns_false(self, session: AsyncSession):
        from app.repos.admin_repo import check_cycle

        cat = await make_category(session, code="cy_c1")
        a = await make_achievement(session, cat.id, code="cy_a")
        b = await make_achievement(session, cat.id, code="cy_b")

        assert await check_cycle(session, a.id, b.id) is False

    async def test_direct_cycle_returns_true(self, session: AsyncSession):
        """Adding B→A as prereq when A already requires B would be a cycle."""
        from app.repos.admin_repo import check_cycle

        cat = await make_category(session, code="cy_c2")
        a = await make_achievement(session, cat.id, code="cy2_a")
        b = await make_achievement(session, cat.id, code="cy2_b")
        await make_prerequisite(session, b.id, a.id)  # B requires A

        # Now check if adding A requires B (ach_id=A, new_prereq_id=B) would cycle
        assert await check_cycle(session, a.id, b.id) is True

    async def test_indirect_cycle_returns_true(self, session: AsyncSession):
        from app.repos.admin_repo import check_cycle

        cat = await make_category(session, code="cy_c3")
        a = await make_achievement(session, cat.id, code="cy3_a")
        b = await make_achievement(session, cat.id, code="cy3_b")
        c = await make_achievement(session, cat.id, code="cy3_c")
        await make_prerequisite(session, b.id, a.id)  # B requires A
        await make_prerequisite(session, c.id, b.id)  # C requires B

        # A→C would create A→B→C→A cycle
        assert await check_cycle(session, a.id, c.id) is True


# ===========================================================================
# user_repo
# ===========================================================================


class TestUserRepo:
    async def test_upsert_creates_user(self, session: AsyncSession):
        from app.repos.user_repo import upsert_user

        user = await upsert_user(session, tg_user_id=5001, username="alice", first_name="Alice", last_name=None)
        assert user.tg_user_id == 5001
        assert user.username == "alice"

    async def test_upsert_updates_existing_user(self, session: AsyncSession):
        from app.repos.user_repo import upsert_user

        await upsert_user(session, tg_user_id=5002, username="old", first_name="Old", last_name=None)
        updated = await upsert_user(session, tg_user_id=5002, username="new", first_name="New", last_name=None)
        assert updated.username == "new"
        assert updated.first_name == "New"

    async def test_get_user_by_tg_id_returns_none_for_unknown(self, session: AsyncSession):
        from app.repos.user_repo import get_user_by_tg_id

        result = await get_user_by_tg_id(session, 99999)
        assert result is None

    async def test_get_user_by_id(self, session: AsyncSession):
        from app.repos.user_repo import get_user_by_id

        user = await make_user(session, tg_user_id=5003)
        found = await get_user_by_id(session, user.id)
        assert found is not None
        assert found.id == user.id


# ===========================================================================
# group_repo extras
# ===========================================================================


class TestGroupRepoExtras:
    async def test_get_group_by_chat_id(self, session: AsyncSession):
        from app.repos.group_repo import get_group_by_chat_id, upsert_group_by_chat_id

        group = await upsert_group_by_chat_id(session, telegram_chat_id=-1001, title="TG Group")
        found = await get_group_by_chat_id(session, -1001)
        assert found is not None
        assert found.id == group.id

    async def test_upsert_group_updates_existing(self, session: AsyncSession):
        from app.repos.group_repo import upsert_group_by_chat_id

        await upsert_group_by_chat_id(session, telegram_chat_id=-1002, title="Old")
        updated = await upsert_group_by_chat_id(session, telegram_chat_id=-1002, title="New")
        assert updated.title == "New"

    async def test_get_user_groups_returns_active_memberships(self, session: AsyncSession):
        from app.repos.group_repo import get_user_groups

        group1 = await make_group(session, title="G1")
        group2 = await make_group(session, title="G2")
        user = await make_user(session, tg_user_id=6001)
        await make_member(session, group1.id, user.id)
        await make_member(session, group2.id, user.id, status="LEFT")

        pairs = await get_user_groups(session, user.id)
        group_ids = {g.id for g, _ in pairs}
        assert group1.id in group_ids
        assert group2.id not in group_ids

    async def test_get_group_admins(self, session: AsyncSession):
        from app.repos.group_repo import get_group_admins

        group = await make_group(session)
        admin = await make_user(session, tg_user_id=6002)
        member = await make_user(session, tg_user_id=6003)
        await make_member(session, group.id, admin.id, role="ADMIN")
        await make_member(session, group.id, member.id, role="MEMBER")

        admins = await get_group_admins(session, group.id)
        admin_ids = {u.id for u in admins}
        assert admin.id in admin_ids
        assert member.id not in admin_ids

    async def test_upsert_member_updates_role(self, session: AsyncSession):
        from app.repos.group_repo import upsert_member

        group = await make_group(session)
        user = await make_user(session, tg_user_id=6004)
        await make_member(session, group.id, user.id, role="MEMBER")

        updated = await upsert_member(session, group.id, user.id, role="ADMIN")
        assert updated.role == "ADMIN"
