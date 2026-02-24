"""Bot Application factory."""

import logging

from telegram import Update
from telegram.ext import Application, ApplicationBuilder, CommandHandler, ContextTypes, filters

from app.bot.handlers.group_chat import join_group, list_achievements, list_members, register_group
from app.bot.handlers.private_chat import build_private_conversation
from app.core.config import settings

logger = logging.getLogger(__name__)


async def ping(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    await update.message.reply_text("pong")


async def help_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    text = (
        "<b>Family Achievements Bot</b>\n\n"
        "<b>В личном чате:</b>\n"
        "/start — открыть главное меню\n\n"
        "<b>В групповом чате:</b>\n"
        "/register — зарегистрировать группу (только для администраторов)\n"
        "/join — вступить в группу как участник\n"
        "/members — список участников группы\n"
        "/achievements — каталог всех достижений\n\n"
        "<b>Везде:</b>\n"
        "/ping — проверить работу бота\n"
        "/help — показать это сообщение"
    )
    await update.message.reply_text(text, parse_mode="HTML")


def create_application() -> Application:
    app = (
        ApplicationBuilder()
        .token(settings.BOT_TOKEN)
        .build()
    )

    # /ping and /help — work everywhere
    app.add_handler(CommandHandler("ping", ping))
    app.add_handler(CommandHandler("help", help_command))

    # Group-chat handlers
    app.add_handler(
        CommandHandler(
            "register",
            register_group,
            filters=filters.ChatType.GROUPS,
        )
    )
    app.add_handler(
        CommandHandler(
            "join",
            join_group,
            filters=filters.ChatType.GROUPS,
        )
    )
    app.add_handler(
        CommandHandler(
            "members",
            list_members,
            filters=filters.ChatType.GROUPS,
        )
    )
    app.add_handler(
        CommandHandler(
            "achievements",
            list_achievements,
            filters=filters.ChatType.GROUPS,
        )
    )

    # Private-chat conversation
    app.add_handler(build_private_conversation())

    logger.info("Bot application created.")
    return app
