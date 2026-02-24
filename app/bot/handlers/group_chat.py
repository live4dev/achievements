"""Handlers for group/supergroup chats (e.g. /register)."""

import logging

from telegram import Update
from telegram.constants import ChatMemberStatus, ChatType
from telegram.ext import ContextTypes

from app.core.database import async_session_factory
from app.repos.group_repo import upsert_group_by_chat_id, upsert_member
from app.repos.user_repo import upsert_user

logger = logging.getLogger(__name__)


async def register_group(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /register — registers the current group chat and promotes the
    command sender to ADMIN in the achievements system.
    """
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text(
            "Эта команда работает только в групповых чатах."
        )
        return

    tg_user = update.effective_user
    # Verify that the sender is a Telegram admin of this chat
    member_status = await context.bot.get_chat_member(chat.id, tg_user.id)
    if member_status.status not in (
        ChatMemberStatus.ADMINISTRATOR,
        ChatMemberStatus.OWNER,
    ):
        await update.message.reply_text(
            "Только администраторы чата могут зарегистрировать группу."
        )
        return

    async with async_session_factory() as session:
        user = await upsert_user(
            session,
            tg_user_id=tg_user.id,
            username=tg_user.username,
            first_name=tg_user.first_name,
            last_name=tg_user.last_name,
        )
        group = await upsert_group_by_chat_id(
            session,
            telegram_chat_id=chat.id,
            title=chat.title or f"Группа {chat.id}",
        )
        await upsert_member(
            session,
            group_id=group.id,
            user_id=user.id,
            role="ADMIN",
            status="ACTIVE",
        )
        await session.commit()

    await update.message.reply_text(
        f'✅ Группа "<b>{group.title}</b>" зарегистрирована!\n\n'
        "Напишите боту в личку, чтобы управлять ачивками.",
        parse_mode="HTML",
    )
    logger.info(
        "Group registered: %s (chat_id=%s) by user %s", group.title, chat.id, tg_user.id
    )
