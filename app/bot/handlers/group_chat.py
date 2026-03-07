"""Handlers for group/supergroup chats (e.g. /register, /join)."""

import logging

from telegram import Update
from telegram.constants import ChatMemberStatus, ChatType
from telegram.ext import ContextTypes

from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.core.config import settings
from app.core.database import async_session_factory
from app.models.orm import Achievement, GroupMember, GroupUserAchievement, User
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
    /web — отправляет ссылку на веб-интерфейс достижений группы.
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

    base = settings.WEB_URL.rstrip("/")
    group_url = f"{base}/#/group/{group.id}"

    await update.message.reply_text(
        f'🌐 <b>Достижения группы «{group.title}»</b>\n\n'
        f'<a href="{group_url}">Открыть</a>',
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


# ---------------------------------------------------------------------------
# /grant — admin grants achievement to a member in group chat
# ---------------------------------------------------------------------------


def _grant_state_key(chat_id: int, admin_tg_id: int) -> str:
    return f"grnt:{chat_id}:{admin_tg_id}"


def _member_display_name(m: GroupMember) -> str:
    u = m.user
    name = (u.first_name or "").strip()
    if u.last_name:
        name = f"{name} {u.last_name}".strip()
    return name or u.username or str(u.tg_user_id)


async def _show_ach_selection_new_msg(
    update: Update,
    context: ContextTypes.DEFAULT_TYPE,
    state_key: str,
) -> None:
    """Load achievements and send a new message with the achievement keyboard."""
    from app.bot.keyboards import grant_ach_kb
    state = context.bot_data[state_key]
    async with async_session_factory() as session:
        achievements = await get_all_active_achievements(session)
    state["achievements"] = [(str(a.id), a.title, a.rarity) for a in achievements]
    target_name = state["target_name"]
    ach_list = [(i, t, r) for i, (_, t, r) in enumerate(state["achievements"])]
    await update.message.reply_text(
        f"Выбери ачивку для <b>{target_name}</b>:",
        parse_mode="HTML",
        reply_markup=grant_ach_kb(ach_list),
    )


async def _show_ach_selection_edit_msg(
    query,
    context: ContextTypes.DEFAULT_TYPE,
    state_key: str,
) -> None:
    """Load achievements and edit the current message with the achievement keyboard."""
    from app.bot.keyboards import grant_ach_kb
    state = context.bot_data[state_key]
    async with async_session_factory() as session:
        achievements = await get_all_active_achievements(session)
    state["achievements"] = [(str(a.id), a.title, a.rarity) for a in achievements]
    target_name = state["target_name"]
    ach_list = [(i, t, r) for i, (_, t, r) in enumerate(state["achievements"])]
    await query.edit_message_text(
        f"Выбери ачивку для <b>{target_name}</b>:",
        parse_mode="HTML",
        reply_markup=grant_ach_kb(ach_list),
    )


async def _do_grant(query, context: ContextTypes.DEFAULT_TYPE, state_key: str) -> None:
    """Execute the grant and send notifications."""
    import uuid
    from app.services.admin_service import AdminError, grant_achievement_safe
    state = context.bot_data.pop(state_key, {})

    if not state:
        await query.edit_message_text("Сессия истекла. Используйте /grant заново.")
        return

    async with async_session_factory() as session:
        try:
            result = await grant_achievement_safe(
                session,
                group_id=uuid.UUID(state["group_id"]),
                target_user_id=uuid.UUID(state["target_user_id"]),
                achievement_id=uuid.UUID(state["ach_id"]),
                admin_user_id=uuid.UUID(state["admin_user_id"]),
            )
        except AdminError as e:
            await query.edit_message_text(f"❌ {e}")
            return

    ach = result["achievement"]
    user = result["user"]
    level = result["level"]
    emoji = RARITY_EMOJI.get(ach.rarity, "")
    icon = f"{ach.icon} " if ach.icon else ""
    level_text = f" (ур.{level})" if ach.repeatable else ""
    name = (user.first_name or "").strip() or user.username or str(user.tg_user_id)

    await query.edit_message_text(
        f"✅ {emoji} {icon}<b>{ach.title}</b>{level_text} выдана <b>{name}</b>!",
        parse_mode="HTML",
    )

    try:
        await context.bot.send_message(
            user.tg_user_id,
            f"🎉 Вам выдана ачивка {icon}{emoji} <b>{ach.title}</b>{level_text}!",
            parse_mode="HTML",
        )
    except Exception:
        pass


async def grant_command(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """/grant — admin manually grants an achievement to a group member."""
    from app.bot.keyboards import grant_member_kb
    chat = update.effective_chat
    if chat.type not in (ChatType.GROUP, ChatType.SUPERGROUP):
        await update.message.reply_text("Эта команда работает только в групповых чатах.")
        return

    tg_admin = update.effective_user

    async with async_session_factory() as session:
        group = await get_group_by_chat_id(session, chat.id)
        if not group:
            await update.message.reply_text(
                "Эта группа ещё не зарегистрирована.\n"
                "Попросите администратора выполнить /register."
            )
            return

        admin_user_row = await session.execute(
            select(User).where(User.tg_user_id == tg_admin.id)
        )
        admin_user = admin_user_row.scalar_one_or_none()
        if not admin_user:
            await update.message.reply_text("Вы не зарегистрированы в системе. Выполните /join.")
            return

        from app.repos.group_repo import get_member
        admin_member = await get_member(session, group.id, admin_user.id)
        if not admin_member or admin_member.role != "ADMIN" or admin_member.status != "ACTIVE":
            await update.message.reply_text("Только администраторы могут выдавать ачивки.")
            return

        members = await get_group_members(session, group.id)

    # Exclude the admin themselves from the target list
    eligible = [m for m in members if m.user_id != admin_user.id]
    if not eligible:
        await update.message.reply_text("В группе нет других участников.")
        return

    state_key = _grant_state_key(chat.id, tg_admin.id)
    context.bot_data[state_key] = {
        "group_id": str(group.id),
        "admin_user_id": str(admin_user.id),
        "members": [(str(m.user_id), _member_display_name(m)) for m in eligible],
    }

    # If replying to a message, use that user as the target
    if update.message.reply_to_message and update.message.reply_to_message.from_user:
        target_tg_id = update.message.reply_to_message.from_user.id
        target_m = next((m for m in eligible if m.user.tg_user_id == target_tg_id), None)
        if not target_m:
            await update.message.reply_text(
                "Этот пользователь не является участником группы."
            )
            context.bot_data.pop(state_key, None)
            return
        context.bot_data[state_key]["target_user_id"] = str(target_m.user_id)
        context.bot_data[state_key]["target_name"] = _member_display_name(target_m)
        await _show_ach_selection_new_msg(update, context, state_key)
    else:
        member_list = [(i, name) for i, (_, name) in enumerate(context.bot_data[state_key]["members"])]
        await update.message.reply_text(
            "Выбери участника для выдачи ачивки:",
            reply_markup=grant_member_kb(member_list),
        )


async def grant_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> None:
    """Handles all grnt_* callbacks for the /grant flow."""
    from app.bot.keyboards import grant_confirm_kb
    query = update.callback_query
    await query.answer()

    chat = update.effective_chat
    tg_admin = update.effective_user
    state_key = _grant_state_key(chat.id, tg_admin.id)
    state = context.bot_data.get(state_key)

    if not state:
        await query.edit_message_text("Сессия истекла. Используйте /grant заново.")
        return

    data = query.data

    if data.startswith("grnt_u:"):
        idx = int(data.split(":")[1])
        uid, name = state["members"][idx]
        state["target_user_id"] = uid
        state["target_name"] = name
        await _show_ach_selection_edit_msg(query, context, state_key)

    elif data.startswith("grnt_a:"):
        idx = int(data.split(":")[1])
        ach_id, ach_title, ach_rarity = state["achievements"][idx]
        state["ach_id"] = ach_id
        state["ach_title"] = ach_title
        target_name = state["target_name"]
        emoji = RARITY_EMOJI.get(ach_rarity, "")
        await query.edit_message_text(
            f"Выдать {emoji} <b>{ach_title}</b> участнику <b>{target_name}</b>?",
            parse_mode="HTML",
            reply_markup=grant_confirm_kb(),
        )

    elif data == "grnt_ok":
        await _do_grant(query, context, state_key)

    elif data == "grnt_no":
        context.bot_data.pop(state_key, None)
        await query.edit_message_text("❌ Отменено.")
