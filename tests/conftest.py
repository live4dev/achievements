"""
Shared fixtures and data-builder helpers for the test suite.

Each test gets a fresh SQLite in-memory database so tests are fully
isolated even when the service layer calls session.commit().
"""

import uuid
from datetime import datetime, timezone

import pytest_asyncio
from sqlalchemy import event
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from app.models.orm import (
    Achievement,
    AchievementClaim,
    AchievementPrerequisite,
    Base,
    Category,
    Group,
    GroupMember,
    GroupUserAchievement,
    User,
)


# ---------------------------------------------------------------------------
# Core DB fixture — one fresh in-memory SQLite per test function
# ---------------------------------------------------------------------------


@pytest_asyncio.fixture
async def session() -> AsyncSession:
    """Yield a single AsyncSession backed by a fresh in-memory SQLite DB."""
    engine = create_async_engine("sqlite+aiosqlite:///:memory:", echo=False)

    @event.listens_for(engine.sync_engine, "connect")
    def _set_pragma(dbapi_conn, _):
        cur = dbapi_conn.cursor()
        cur.execute("PRAGMA foreign_keys=ON")
        cur.close()

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    factory = async_sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)
    async with factory() as sess:
        yield sess

    await engine.dispose()


# ---------------------------------------------------------------------------
# Data-builder helpers (plain async functions, not fixtures)
# ---------------------------------------------------------------------------


async def make_user(
    session: AsyncSession,
    tg_user_id: int = 1001,
    first_name: str = "Alice",
    username: str | None = None,
) -> User:
    user = User(tg_user_id=tg_user_id, first_name=first_name, username=username)
    session.add(user)
    await session.flush()
    return user


async def make_group(session: AsyncSession, title: str = "Test Group") -> Group:
    group = Group(title=title, settings={})
    session.add(group)
    await session.flush()
    return group


async def make_category(
    session: AsyncSession,
    code: str = "general",
    name: str = "General",
) -> Category:
    cat = Category(code=code, name=name)
    session.add(cat)
    await session.flush()
    return cat


async def make_achievement(
    session: AsyncSession,
    category_id: uuid.UUID,
    code: str = "ach1",
    title: str = "Test Achievement",
    rarity: str = "COMMON",
    repeatable: bool = False,
    max_level: int | None = None,
    cooldown_hours: int | None = None,
    auto_grant: bool = False,
    burnable: bool = False,
    required_count: int | None = None,
    period_days: int | None = None,
    is_active: bool = True,
    sort_order: int = 0,
) -> Achievement:
    ach = Achievement(
        code=code,
        title=title,
        description=f"Description for {title}",
        category_id=category_id,
        rarity=rarity,
        repeatable=repeatable,
        max_level=max_level,
        cooldown_hours=cooldown_hours,
        auto_grant=auto_grant,
        burnable=burnable,
        required_count=required_count,
        period_days=period_days,
        is_active=is_active,
        sort_order=sort_order,
    )
    session.add(ach)
    await session.flush()
    return ach


async def make_member(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    role: str = "MEMBER",
    status: str = "ACTIVE",
) -> GroupMember:
    member = GroupMember(group_id=group_id, user_id=user_id, role=role, status=status)
    session.add(member)
    await session.flush()
    return member


async def make_gua(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    status: str = "AVAILABLE",
    level: int = 0,
    achieved_at: datetime | None = None,
    burnable_progress: int = 0,
    period_start: datetime | None = None,
) -> GroupUserAchievement:
    gua = GroupUserAchievement(
        group_id=group_id,
        user_id=user_id,
        achievement_id=achievement_id,
        status=status,
        level=level,
        achieved_at=achieved_at,
        burnable_progress=burnable_progress,
        period_start=period_start,
    )
    session.add(gua)
    await session.flush()
    return gua


async def make_claim(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    achievement_id: uuid.UUID,
    status: str = "SUBMITTED",
    reviewed_at: datetime | None = None,
    reviewed_by_user_id: uuid.UUID | None = None,
) -> AchievementClaim:
    claim = AchievementClaim(
        group_id=group_id,
        user_id=user_id,
        achievement_id=achievement_id,
        status=status,
        evidence={},
        reviewed_at=reviewed_at,
        reviewed_by_user_id=reviewed_by_user_id,
    )
    session.add(claim)
    await session.flush()
    return claim


async def make_prerequisite(
    session: AsyncSession,
    achievement_id: uuid.UUID,
    prereq_achievement_id: uuid.UUID,
    min_level: int = 1,
) -> AchievementPrerequisite:
    prereq = AchievementPrerequisite(
        achievement_id=achievement_id,
        prereq_achievement_id=prereq_achievement_id,
        min_level=min_level,
    )
    session.add(prereq)
    await session.flush()
    return prereq
