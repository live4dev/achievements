"""Handlers for group/supergroup chats (e.g. /register, /join)."""

import logging

from telegram import Update
from telegram.constants import ChatMemberStatus, ChatType
from telegram.ext import ContextTypes

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.database import async_session_factory
from app.models.orm import Achievement, GroupMember, GroupUserAchievement
from app.repos.achievement_repo import get_all_active_achievements
from app.repos.group_repo import get_group_by_chat_id, get_group_members, upsert_group_by_chat_id, upsert_member
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


async def join_group(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /join — adds the command sender as a MEMBER of the registered group.
    Works in group and supergroup chats only.
    """
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text(
            "Эта команда работает только в групповых чатах."
        )
        return

    async with async_session_factory() as session:
        group = await get_group_by_chat_id(session, chat.id)
        if not group:
            await update.message.reply_text(
                "Эта группа ещё не зарегистрирована.\n"
                "Попросите администратора выполнить /register."
            )
            return

        tg_user = update.effective_user
        user = await upsert_user(
            session,
            tg_user_id=tg_user.id,
            username=tg_user.username,
            first_name=tg_user.first_name,
            last_name=tg_user.last_name,
        )

        from app.repos.group_repo import get_member
        existing = await get_member(session, group.id, user.id)
        if existing and existing.status == "ACTIVE":
            await update.message.reply_text(
                f"Вы уже участник группы <b>{group.title}</b>.",
                parse_mode="HTML",
            )
            return

        await upsert_member(
            session,
            group_id=group.id,
            user_id=user.id,
            role=existing.role if existing else "MEMBER",
            status="ACTIVE",
        )
        await session.commit()

    name = tg_user.first_name or tg_user.username or str(tg_user.id)
    await update.message.reply_text(
        f"✅ <b>{name}</b> теперь участник группы <b>{group.title}</b>!\n"
        "Напишите боту в личку /start чтобы открыть меню ачивок.",
        parse_mode="HTML",
    )
    logger.info("User %s joined group %s (chat_id=%s)", tg_user.id, group.title, chat.id)


async def list_members(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /members — показывает список участников зарегистрированной группы.
    """
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text("Эта команда работает только в групповых чатах.")
        return

    async with async_session_factory() as session:
        group = await get_group_by_chat_id(session, chat.id)
        if not group:
            await update.message.reply_text(
                "Эта группа ещё не зарегистрирована.\n"
                "Попросите администратора выполнить /register."
            )
            return

        members = await get_group_members(session, group.id)

    if not members:
        await update.message.reply_text("В группе пока нет участников.")
        return

    lines = [f"👥 <b>Участники группы «{group.title}»</b>\n"]
    admins = [m for m in members if m.role == "ADMIN"]
    regular = [m for m in members if m.role != "ADMIN"]

    def _name(m) -> str:
        u = m.user
        name = u.first_name or ""
        if u.last_name:
            name += f" {u.last_name}"
        if not name.strip():
            name = u.username or str(u.tg_user_id)
        return name.strip()

    if admins:
        lines.append("👑 <b>Администраторы:</b>")
        for m in admins:
            lines.append(f"  • {_name(m)}")

    if regular:
        lines.append("\n👤 <b>Участники:</b>")
        for m in regular:
            lines.append(f"  • {_name(m)}")

    lines.append(f"\nВсего: {len(members)}")

    await update.message.reply_text("\n".join(lines), parse_mode="HTML")


async def web_links(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /web — отправляет ссылки на веб-интерфейс для группы и каждого участника.
    """
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text("Эта команда работает только в групповых чатах.")
        return

    async with async_session_factory() as session:
        group = await get_group_by_chat_id(session, chat.id)
        if not group:
            await update.message.reply_text(
                "Эта группа ещё не зарегистрирована.\n"
                "Попросите администратора выполнить /register."
            )
            return
        members = await get_group_members(session, group.id)

    base = settings.WEB_URL.rstrip("/")
    group_url = f"{base}/?group={group.id}&mode=aggregate"

    lines = [
        f'🌐 <b>Веб-интерфейс достижений</b> — «{group.title}»\n',
        f'📊 <a href="{group_url}">Дерево группы (агрегат)</a>\n',
    ]

    if members:
        lines.append("👤 <b>Прогресс участников:</b>")
        for m in members:
            u = m.user
            name = u.first_name or u.username or str(u.tg_user_id)
            user_url = f"{base}/?group={group.id}&user={u.id}&mode=participant"
            role_mark = " 👑" if m.role == "ADMIN" else ""
            lines.append(f'  • <a href="{user_url}">{name}</a>{role_mark}')

    await update.message.reply_text(
        "\n".join(lines),
        parse_mode="HTML",
        disable_web_page_preview=True,
    )


RARITY_EMOJI = {
    "COMMON": "⚪",
    "UNCOMMON": "🟢",
    "RARE": "🔵",
    "EPIC": "🟣",
    "LEGENDARY": "🟡",
}

RARITY_LABEL = {
    "COMMON": "Обычная",
    "UNCOMMON": "Необычная",
    "RARE": "Редкая",
    "EPIC": "Эпическая",
    "LEGENDARY": "Легендарная",
}

# Порядок сортировки: от легендарной к обычной
_RARITY_SORT = {"LEGENDARY": 0, "EPIC": 1, "RARE": 2, "UNCOMMON": 3, "COMMON": 4}


async def list_achievements(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /achievements — каталог всех достижений, сгруппированных по категориям.
    """
    async with async_session_factory() as session:
        achievements = await get_all_active_achievements(session)

    if not achievements:
        await update.message.reply_text("Достижений пока нет.")
        return

    # Группируем по категории, сохраняя порядок первого появления
    by_category: dict[str, list] = {}
    for ach in achievements:
        cat_name = ach.category.name if ach.category else "Без категории"
        by_category.setdefault(cat_name, []).append(ach)

    # Сортируем категории по наивысшей редкости внутри них
    sorted_categories = sorted(
        by_category.items(),
        key=lambda kv: min(_RARITY_SORT.get(a.rarity, 99) for a in kv[1]),
    )

    lines = ["🏆 <b>Каталог достижений</b>\n"]
    for cat_name, achs in sorted_categories:
        # Внутри категории: по редкости (LEGENDARY → COMMON), затем по sort_order
        sorted_achs = sorted(achs, key=lambda a: (_RARITY_SORT.get(a.rarity, 99), a.sort_order))
        lines.append(f"<b>— {cat_name} —</b>")
        for ach in sorted_achs:
            rarity_emoji = RARITY_EMOJI.get(ach.rarity, "")
            icon = f"{ach.icon}" if ach.icon else ""
            pts = f" {ach.points}⭐" if ach.points else ""
            repeat = " ♻️" if ach.repeatable else ""
            lines.append(f"  {rarity_emoji} {icon} <b>{ach.title}</b>{pts}{repeat}")
        lines.append("")

    lines.append(
        "<i>Редкость: ⚪Обычная 🟢Необычная 🔵Редкая 🟣Эпическая 🟡Легендарная</i>\n"
        "<i>♻️ — повторяемое · ⭐ — очки</i>\n"
        "Подробнее — /start в личку боту."
    )

    await update.message.reply_text("\n".join(lines), parse_mode="HTML")


_PLACE_EMOJI = {1: "🥇", 2: "🥈", 3: "🥉"}


async def group_progress(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """
    /progress — достижения каждого участника, упорядоченные по времени получения.
    """
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text("Эта команда работает только в групповых чатах.")
        return

    async with async_session_factory() as session:
        group = await get_group_by_chat_id(session, chat.id)
        if not group:
            await update.message.reply_text(
                "Эта группа ещё не зарегистрирована.\n"
                "Попросите администратора выполнить /register."
            )
            return

        members_res = await session.execute(
            select(GroupMember)
            .options(selectinload(GroupMember.user))
            .where(GroupMember.group_id == group.id, GroupMember.status == "ACTIVE")
            .order_by(GroupMember.joined_at)
        )
        members = members_res.scalars().all()

        if not members:
            await update.message.reply_text("В группе пока нет участников.")
            return

        guas_res = await session.execute(
            select(GroupUserAchievement)
            .options(
                selectinload(GroupUserAchievement.achievement).selectinload(Achievement.category),
            )
            .where(
                GroupUserAchievement.group_id == group.id,
                GroupUserAchievement.status == "ACHIEVED",
            )
            .order_by(GroupUserAchievement.achieved_at.desc())
        )
        guas = guas_res.scalars().all()

    by_user: dict = {}
    for gua in guas:
        by_user.setdefault(gua.user_id, []).append(gua)

    def _name(member: GroupMember) -> str:
        u = member.user
        name = (u.first_name or "").strip()
        if u.last_name:
            name = f"{name} {u.last_name}".strip()
        return name or u.username or str(u.tg_user_id)

    def _ach_word(n: int) -> str:
        if 11 <= n % 100 <= 19:
            return "ачивок"
        r = n % 10
        if r == 1:
            return "ачивка"
        if 2 <= r <= 4:
            return "ачивки"
        return "ачивок"

    def _member_sort_key(m: GroupMember):
        user_guas = by_user.get(m.user_id, [])
        pts = sum(g.achievement.points or 0 for g in user_guas)
        return (-len(user_guas), -pts)

    sorted_members = sorted(members, key=_member_sort_key)
    total_achieved = sum(len(v) for v in by_user.values())

    lines = [f"🏆 <b>Прогресс участников — «{group.title}»</b>\n"]

    for place, member in enumerate(sorted_members, start=1):
        user_guas = by_user.get(member.user_id, [])
        count = len(user_guas)
        pts = sum(g.achievement.points or 0 for g in user_guas)
        role_mark = " 👑" if member.role == "ADMIN" else ""
        place_emoji = _PLACE_EMOJI.get(place, f"{place}.")
        pts_text = f" · {pts}⭐" if pts else ""

        lines.append(
            f"{place_emoji} <b>{_name(member)}</b>{role_mark}"
            f" — {count} {_ach_word(count)}{pts_text}"
        )

        if not user_guas:
            lines.append("  <i>нет достижений</i>")
        else:
            for gua in user_guas:  # newest first
                ach = gua.achievement
                emoji = RARITY_EMOJI.get(ach.rarity, "")
                icon = f"{ach.icon} " if ach.icon else ""
                level_text = f" ур.{gua.level}" if ach.repeatable else ""
                ts = gua.achieved_at.strftime("%d.%m.%Y %H:%M") if gua.achieved_at else "—"
                lines.append(f"  {emoji} {icon}<b>{ach.title}</b>{level_text}  <i>{ts}</i>")

        lines.append("")

    lines.append(f"<i>Всего ачивок получено: {total_achieved}</i>")

    text = "\n".join(lines)
    if len(text) > 4000:
        text = text[:3980] + "\n\n<i>… список обрезан</i>"

    await update.message.reply_text(text, parse_mode="HTML")
