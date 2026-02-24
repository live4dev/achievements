import uuid

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.orm import User


async def get_user_by_tg_id(session: AsyncSession, tg_user_id: int) -> User | None:
    result = await session.execute(
        select(User).where(User.tg_user_id == tg_user_id)
    )
    return result.scalar_one_or_none()


async def get_user_by_id(session: AsyncSession, user_id: uuid.UUID) -> User | None:
    return await session.get(User, user_id)


async def upsert_user(
    session: AsyncSession,
    tg_user_id: int,
    username: str | None,
    first_name: str | None,
    last_name: str | None,
) -> User:
    user = await get_user_by_tg_id(session, tg_user_id)
    if user is None:
        user = User(
            tg_user_id=tg_user_id,
            username=username,
            first_name=first_name,
            last_name=last_name,
        )
        session.add(user)
    else:
        user.username = username
        user.first_name = first_name
        user.last_name = last_name
    await session.flush()
    return user
