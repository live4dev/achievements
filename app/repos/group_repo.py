import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.orm import Group, GroupMember, User


async def get_group_by_id(session: AsyncSession, group_id: uuid.UUID) -> Group | None:
    return await session.get(Group, group_id)


async def get_group_by_chat_id(
    session: AsyncSession, telegram_chat_id: int
) -> Group | None:
    result = await session.execute(
        select(Group).where(Group.telegram_chat_id == telegram_chat_id)
    )
    return result.scalar_one_or_none()


async def create_group(
    session: AsyncSession, title: str, telegram_chat_id: int | None = None
) -> Group:
    group = Group(title=title, telegram_chat_id=telegram_chat_id)
    session.add(group)
    await session.flush()
    return group


async def upsert_group_by_chat_id(
    session: AsyncSession, telegram_chat_id: int, title: str
) -> Group:
    group = await get_group_by_chat_id(session, telegram_chat_id)
    if group is None:
        group = await create_group(session, title, telegram_chat_id)
    else:
        group.title = title
    await session.flush()
    return group


async def get_member(
    session: AsyncSession, group_id: uuid.UUID, user_id: uuid.UUID
) -> GroupMember | None:
    return await session.get(GroupMember, (group_id, user_id))


async def upsert_member(
    session: AsyncSession,
    group_id: uuid.UUID,
    user_id: uuid.UUID,
    role: str,
    status: str = "ACTIVE",
) -> GroupMember:
    member = await get_member(session, group_id, user_id)
    if member is None:
        member = GroupMember(
            group_id=group_id, user_id=user_id, role=role, status=status
        )
        session.add(member)
    else:
        member.role = role
        member.status = status
    await session.flush()
    return member


async def get_user_groups(
    session: AsyncSession, user_id: uuid.UUID
) -> list[tuple[Group, GroupMember]]:
    """Returns list of (Group, GroupMember) for ACTIVE memberships."""
    result = await session.execute(
        select(Group, GroupMember)
        .join(GroupMember, GroupMember.group_id == Group.id)
        .where(GroupMember.user_id == user_id, GroupMember.status == "ACTIVE")
        .order_by(Group.created_at)
    )
    return result.all()


async def get_group_members(
    session: AsyncSession, group_id: uuid.UUID
) -> list[GroupMember]:
    """Returns all ACTIVE GroupMember rows with user eagerly loaded."""
    from sqlalchemy.orm import selectinload

    result = await session.execute(
        select(GroupMember)
        .options(selectinload(GroupMember.user))
        .where(GroupMember.group_id == group_id, GroupMember.status == "ACTIVE")
        .order_by(GroupMember.role.desc(), GroupMember.joined_at)
    )
    return result.scalars().all()


async def get_group_admins(
    session: AsyncSession, group_id: uuid.UUID
) -> list[User]:
    result = await session.execute(
        select(User)
        .join(GroupMember, GroupMember.user_id == User.id)
        .where(
            GroupMember.group_id == group_id,
            GroupMember.role == "ADMIN",
            GroupMember.status == "ACTIVE",
        )
    )
    return result.scalars().all()
