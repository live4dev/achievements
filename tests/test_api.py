"""
HTTP integration tests for the FastAPI achievement endpoints.

Strategy:
  - Each test gets a fresh in-memory SQLite DB via the `client` fixture.
  - Auth is handled with real JWT tokens (JWT_SECRET from settings is predictable).
  - get_session dependency is overridden to use the test DB.
"""

import uuid
from datetime import datetime, timezone

import pytest
import pytest_asyncio
from httpx import ASGITransport, AsyncClient
from sqlalchemy import event
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine

from app.api.app import create_fastapi_app
from app.core.config import settings
from app.core.database import get_session
from app.core.security import create_access_token
from app.models.orm import Base
from tests.conftest import (
    make_achievement,
    make_category,
    make_claim,
    make_group,
    make_gua,
    make_member,
    make_user,
)


# ---------------------------------------------------------------------------
# Per-test client fixture with overridden DB session
# ---------------------------------------------------------------------------


@pytest_asyncio.fixture
async def client_and_session():
    """Yields (AsyncClient, AsyncSession) backed by a fresh in-memory DB."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)

    @event.listens_for(engine.sync_engine, "connect")
    def _pragma(dbapi_conn, _):
        cur = dbapi_conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        cur.close()

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

    # Shared session so tests can inspect DB state after API calls
    shared_session = factory()

    async def override_get_session():
        yield shared_session

    app = create_fastapi_app()
    app.dependency_overrides[get_session] = override_get_session

    # Force auth checks on regardless of .env SKIP_AUTH setting
    original_skip_auth = settings.SKIP_AUTH
    settings.SKIP_AUTH = False

    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        yield ac, shared_session

    settings.SKIP_AUTH = original_skip_auth
    await shared_session.close()
    await engine.dispose()


def _auth_headers(tg_user_id: int) -> dict:
    token = create_access_token(tg_user_id)
    return {"Authorization": f"Bearer {token}"}


# ===========================================================================
# GET /api/groups
# ===========================================================================


class TestListGroups:
    async def test_returns_empty_list_when_no_groups(self, client_and_session):
        client, session = client_and_session
        user = await make_user(session, tg_user_id=1)
        await session.flush()

        resp = await client.get("/api/groups", headers=_auth_headers(1))
        assert resp.status_code == 200
        assert resp.json() == []

    async def test_returns_group_with_member_count(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session, title="Family")
        u1 = await make_user(session, tg_user_id=2, first_name="A")
        u2 = await make_user(session, tg_user_id=3, first_name="B")
        await make_member(session, group.id, u1.id)
        await make_member(session, group.id, u2.id)
        await session.flush()

        resp = await client.get("/api/groups", headers=_auth_headers(2))
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) == 1
        assert data[0]["title"] == "Family"
        assert data[0]["member_count"] == 2

    async def test_requires_auth(self, client_and_session):
        client, _ = client_and_session
        resp = await client.get("/api/groups")
        # No auth header → 401
        assert resp.status_code == 401


# ===========================================================================
# GET /api/groups/{group_id}/users/{user_id}/tree
# ===========================================================================


class TestAchievementTree:
    async def test_returns_tree_response(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="tree_c")
        await make_achievement(session, cat.id, code="t1")
        group = await make_group(session, title="TreeGroup")
        user = await make_user(session, tg_user_id=10, first_name="Tom")
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.get(f"/api/groups/{group.id}/users/{user.id}/tree")
        assert resp.status_code == 200
        body = resp.json()
        assert body["group"]["title"] == "TreeGroup"
        assert body["user"]["display_name"] == "Tom"
        assert len(body["achievements"]) == 1
        assert "t1" in body["user_state"]

    async def test_404_on_unknown_group(self, client_and_session):
        client, session = client_and_session
        user = await make_user(session, tg_user_id=11)
        await session.flush()

        resp = await client.get(f"/api/groups/{uuid.uuid4()}/users/{user.id}/tree")
        assert resp.status_code == 404

    async def test_404_on_unknown_user(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        await session.flush()

        resp = await client.get(f"/api/groups/{group.id}/users/{uuid.uuid4()}/tree")
        assert resp.status_code == 404


# ===========================================================================
# GET /api/groups/{group_id}/users/{user_id}/achievements
# ===========================================================================


class TestUserAchievements:
    async def test_returns_all_achievements_without_filter(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="ua_c")
        await make_achievement(session, cat.id, code="ua1")
        await make_achievement(session, cat.id, code="ua2")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=20)
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.get(f"/api/groups/{group.id}/users/{user.id}/achievements")
        assert resp.status_code == 200
        assert len(resp.json()) == 2

    async def test_filter_by_available(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="ua_c2")
        ach1 = await make_achievement(session, cat.id, code="ua_av")
        ach2 = await make_achievement(session, cat.id, code="ua_ac")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=21)
        await make_member(session, group.id, user.id)
        now = datetime.now(tz=timezone.utc)
        await make_gua(session, group.id, user.id, ach2.id, status="ACHIEVED", level=1, achieved_at=now)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/users/{user.id}/achievements?status=AVAILABLE"
        )
        assert resp.status_code == 200
        codes = [a["achievement"]["code"] for a in resp.json()]
        assert "ua_av" in codes
        assert "ua_ac" not in codes

    async def test_invalid_status_returns_422(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        user = await make_user(session, tg_user_id=22)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/users/{user.id}/achievements?status=BOGUS"
        )
        assert resp.status_code == 422


# ===========================================================================
# GET /api/groups/{group_id}/categories
# ===========================================================================


class TestGroupCategories:
    async def test_returns_categories(self, client_and_session):
        client, session = client_and_session
        await make_category(session, code="cat_api1", name="Cat1")
        await make_category(session, code="cat_api2", name="Cat2")
        group = await make_group(session)
        await session.flush()

        resp = await client.get(f"/api/groups/{group.id}/categories")
        assert resp.status_code == 200
        names = {c["name"] for c in resp.json()}
        assert "Cat1" in names
        assert "Cat2" in names

    async def test_404_on_unknown_group(self, client_and_session):
        client, _ = client_and_session
        resp = await client.get(f"/api/groups/{uuid.uuid4()}/categories")
        assert resp.status_code == 404


# ===========================================================================
# GET /api/groups/{group_id}/members
# ===========================================================================


class TestGroupMembers:
    async def test_returns_active_members(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        u1 = await make_user(session, tg_user_id=30, first_name="Alpha")
        u2 = await make_user(session, tg_user_id=31, first_name="Beta")
        u3 = await make_user(session, tg_user_id=32, first_name="Gone")
        await make_member(session, group.id, u1.id)
        await make_member(session, group.id, u2.id)
        await make_member(session, group.id, u3.id, status="BANNED")
        await session.flush()

        resp = await client.get(f"/api/groups/{group.id}/members")
        assert resp.status_code == 200
        names = {m["display_name"] for m in resp.json()["members"]}
        assert "Alpha" in names
        assert "Beta" in names
        assert "Gone" not in names

    async def test_404_on_unknown_group(self, client_and_session):
        client, _ = client_and_session
        resp = await client.get(f"/api/groups/{uuid.uuid4()}/members")
        assert resp.status_code == 404


# ===========================================================================
# GET /api/groups/{group_id}/tree/aggregate
# ===========================================================================


class TestAggregateTree:
    async def test_aggregate_response_structure(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="agg_api")
        await make_achievement(session, cat.id, code="agg_a1")
        group = await make_group(session, title="AggAPI")
        user = await make_user(session, tg_user_id=40)
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/tree/aggregate",
            headers=_auth_headers(40),
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["group"]["title"] == "AggAPI"
        assert "agg_a1" in body["aggregate_state"]

    async def test_404_on_unknown_group(self, client_and_session):
        client, session = client_and_session
        user = await make_user(session, tg_user_id=41)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{uuid.uuid4()}/tree/aggregate",
            headers=_auth_headers(41),
        )
        assert resp.status_code == 404


# ===========================================================================
# POST /api/groups/{group_id}/claims
# ===========================================================================


class TestCreateClaim:
    async def test_create_claim_returns_201(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="claim_c")
        ach = await make_achievement(session, cat.id, code="claim_a1")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=50, first_name="Claimant")
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.post(
            f"/api/groups/{group.id}/claims",
            json={"achievement_code": "claim_a1", "evidence_text": "I did it"},
            headers=_auth_headers(50),
        )
        assert resp.status_code == 201
        body = resp.json()
        assert body["achievement_code"] == "claim_a1"
        assert body["status"] == "SUBMITTED"

    async def test_create_claim_404_on_unknown_group(self, client_and_session):
        client, session = client_and_session
        user = await make_user(session, tg_user_id=51)
        await session.flush()

        resp = await client.post(
            f"/api/groups/{uuid.uuid4()}/claims",
            json={"achievement_code": "nonexistent"},
            headers=_auth_headers(51),
        )
        assert resp.status_code == 404

    async def test_create_claim_404_on_unknown_achievement(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        user = await make_user(session, tg_user_id=52)
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.post(
            f"/api/groups/{group.id}/claims",
            json={"achievement_code": "no_such_code"},
            headers=_auth_headers(52),
        )
        assert resp.status_code == 404

    async def test_create_claim_400_on_duplicate(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="dup_c")
        ach = await make_achievement(session, cat.id, code="dup_a")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=53)
        await make_member(session, group.id, user.id)
        await session.flush()

        await client.post(
            f"/api/groups/{group.id}/claims",
            json={"achievement_code": "dup_a"},
            headers=_auth_headers(53),
        )
        resp = await client.post(
            f"/api/groups/{group.id}/claims",
            json={"achievement_code": "dup_a"},
            headers=_auth_headers(53),
        )
        assert resp.status_code == 400

    async def test_create_claim_requires_auth(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        await session.flush()

        resp = await client.post(
            f"/api/groups/{group.id}/claims",
            json={"achievement_code": "any"},
        )
        assert resp.status_code == 401


# ===========================================================================
# DELETE /api/groups/{group_id}/claims/{claim_id}
# ===========================================================================


class TestDeleteClaim:
    async def test_cancel_own_claim_returns_204(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="del_c")
        ach = await make_achievement(session, cat.id, code="del_a")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=60)
        await make_member(session, group.id, user.id)
        claim = await make_claim(session, group.id, user.id, ach.id)
        await session.flush()

        resp = await client.delete(
            f"/api/groups/{group.id}/claims/{claim.id}",
            headers=_auth_headers(60),
        )
        assert resp.status_code == 204

    async def test_cancel_other_users_claim_returns_400(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="del_c2")
        ach = await make_achievement(session, cat.id, code="del_a2")
        group = await make_group(session)
        owner = await make_user(session, tg_user_id=61)
        thief = await make_user(session, tg_user_id=62)
        await make_member(session, group.id, owner.id)
        await make_member(session, group.id, thief.id)
        claim = await make_claim(session, group.id, owner.id, ach.id)
        await session.flush()

        resp = await client.delete(
            f"/api/groups/{group.id}/claims/{claim.id}",
            headers=_auth_headers(62),
        )
        assert resp.status_code == 400

    async def test_cancel_nonexistent_claim_returns_400(self, client_and_session):
        client, session = client_and_session
        user = await make_user(session, tg_user_id=63)
        group = await make_group(session)
        await session.flush()

        resp = await client.delete(
            f"/api/groups/{group.id}/claims/{uuid.uuid4()}",
            headers=_auth_headers(63),
        )
        assert resp.status_code == 400


# ===========================================================================
# GET /api/groups/{group_id}/users/me/tree
# ===========================================================================


class TestMyTree:
    async def test_my_tree_returns_own_tree(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="me_cat")
        await make_achievement(session, cat.id, code="me_a1")
        group = await make_group(session, title="MyGroup")
        user = await make_user(session, tg_user_id=70, first_name="Me")
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/users/me/tree",
            headers=_auth_headers(70),
        )
        assert resp.status_code == 200
        body = resp.json()
        assert body["user"]["display_name"] == "Me"
        assert "me_a1" in body["user_state"]

    async def test_my_tree_404_when_user_not_registered(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        await session.flush()

        # tg_user_id=999 has no User row
        resp = await client.get(
            f"/api/groups/{group.id}/users/me/tree",
            headers=_auth_headers(999),
        )
        assert resp.status_code == 404


# ===========================================================================
# GET /api/groups/{group_id}/claims/me
# ===========================================================================


class TestMyClaims:
    async def test_my_claims_returns_submitted_claims(self, client_and_session):
        client, session = client_and_session
        cat = await make_category(session, code="mc_cat")
        ach = await make_achievement(session, cat.id, code="mc_a1")
        group = await make_group(session)
        user = await make_user(session, tg_user_id=80)
        await make_member(session, group.id, user.id)
        await make_claim(session, group.id, user.id, ach.id, status="SUBMITTED")
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/claims/me",
            headers=_auth_headers(80),
        )
        assert resp.status_code == 200
        data = resp.json()
        assert len(data) == 1
        assert data[0]["achievement_code"] == "mc_a1"
        assert data[0]["status"] == "SUBMITTED"

    async def test_my_claims_empty_for_new_user(self, client_and_session):
        client, session = client_and_session
        group = await make_group(session)
        user = await make_user(session, tg_user_id=81)
        await make_member(session, group.id, user.id)
        await session.flush()

        resp = await client.get(
            f"/api/groups/{group.id}/claims/me",
            headers=_auth_headers(81),
        )
        assert resp.status_code == 200
        assert resp.json() == []
