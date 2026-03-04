"""
Full private-chat ConversationHandler.

States
------
SELECT_GROUP       – user picks a group
MAIN_MENU          – main menu shown (waits for callback)
AWAIT_EVIDENCE     – waiting for the user to type evidence text
ADMIN_REJECT_INPUT – waiting for admin to type rejection reason
ADMIN_PANEL+       – admin panel states (see app/bot/states.py)
"""

import logging
import uuid

from telegram import Update
from telegram.ext import (
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
    ConversationHandler,
    MessageHandler,
    filters,
)

from app.bot import keyboards as kb
from app.bot.states import (
    ADMIN_ACH_DETAIL,
    ADMIN_ACH_INPUT,
    ADMIN_ACH_LIST,
    ADMIN_ACH_PREREQS,
    ADMIN_ACH_WIZARD,
    ADMIN_CAT_INPUT,
    ADMIN_CAT_LIST,
    ADMIN_PANEL,
    AWAIT_EVIDENCE,
    ADMIN_REJECT_INPUT,
    MAIN_MENU,
    SELECT_GROUP,
)
from app.core.database import async_session_factory
from app.repos.achievement_repo import get_achievement_by_id
from app.repos.claim_repo import (
    get_claim_by_id,
    get_group_submitted_claims,
    get_user_claims,
)
from app.repos.group_repo import get_member, get_user_groups, upsert_member
from app.repos.user_repo import upsert_user
from app.services.achievement_service import get_user_achievements_by_status
from app.services.claim_service import (
    ClaimError,
    approve_claim,
    cancel_claim,
    reject_claim,
    submit_claim,
)

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

RARITY_LABEL = {
    "COMMON": "Обычная",
    "UNCOMMON": "Необычная",
    "RARE": "Редкая",
    "EPIC": "Эпическая",
    "LEGENDARY": "Легендарная",
}


def _group_by_category(nodes: list) -> list[tuple[str, int]]:
    cats: dict[str, int] = {}
    for n in nodes:
        name = n.achievement.category_name or "Прочее"
        cats[name] = cats.get(name, 0) + 1
    return list(cats.items())


def _user_display(user) -> str:
    if user.first_name:
        name = user.first_name
        if user.last_name:
            name += f" {user.last_name}"
        return name
    return user.username or str(user.tg_user_id)


async def _show_main_menu(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    group_id: uuid.UUID = context.user_data["group_id"]
    user_id: uuid.UUID = context.user_data["user_id"]

    async with async_session_factory() as session:
        member = await get_member(session, group_id, user_id)

    is_admin = member and member.role == "ADMIN"
    context.user_data["is_admin"] = is_admin

    group_title = context.user_data.get("group_title", "группе")
    text = f"🏠 Главное меню\nГруппа: <b>{group_title}</b>"
    markup = kb.main_menu_kb(is_admin)

    msg = update.callback_query or update.message
    if update.callback_query:
        await update.callback_query.answer()
        try:
            await update.callback_query.edit_message_text(text, reply_markup=markup, parse_mode="HTML")
        except Exception:
            await update.callback_query.message.reply_text(text, reply_markup=markup, parse_mode="HTML")
    else:
        await update.message.reply_text(text, reply_markup=markup, parse_mode="HTML")

    return MAIN_MENU


# ---------------------------------------------------------------------------
# /start
# ---------------------------------------------------------------------------


async def start(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    tg_user = update.effective_user

    async with async_session_factory() as session:
        user = await upsert_user(
            session,
            tg_user_id=tg_user.id,
            username=tg_user.username,
            first_name=tg_user.first_name,
            last_name=tg_user.last_name,
        )
        await session.commit()
        context.user_data["user_id"] = user.id
        context.user_data["tg_user_id"] = tg_user.id

        groups = await get_user_groups(session, user.id)

    if not groups:
        await update.message.reply_text(
            "👋 Привет! Вы пока не состоите ни в одной группе.\n"
            "Попросите администратора добавить вас в группу (/register в общем чате)."
        )
        return ConversationHandler.END

    if len(groups) == 1:
        group, member = groups[0]
        context.user_data["group_id"] = group.id
        context.user_data["group_title"] = group.title
        return await _show_main_menu(update, context)

    # Multiple groups — ask to choose
    await update.message.reply_text(
        "Выберите группу:",
        reply_markup=kb.group_list_kb(groups),
    )
    return SELECT_GROUP


# ---------------------------------------------------------------------------
# SELECT_GROUP state
# ---------------------------------------------------------------------------


async def select_group_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    group_id_str = query.data.split(":", 1)[1]
    group_id = uuid.UUID(group_id_str)

    async with async_session_factory() as session:
        from app.repos.group_repo import get_group_by_id
        group = await get_group_by_id(session, group_id)

    if not group:
        await query.message.reply_text("Группа не найдена.")
        return ConversationHandler.END

    context.user_data["group_id"] = group.id
    context.user_data["group_title"] = group.title
    return await _show_main_menu(update, context)


# ---------------------------------------------------------------------------
# MAIN_MENU state — callback routing
# ---------------------------------------------------------------------------


async def menu_callback(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data == "menu:change_group":
        user_id: uuid.UUID = context.user_data["user_id"]
        async with async_session_factory() as session:
            groups = await get_user_groups(session, user_id)
        if len(groups) == 1:
            return await _show_main_menu(update, context)
        await query.edit_message_text(
            "Выберите группу:", reply_markup=kb.group_list_kb(groups)
        )
        return SELECT_GROUP

    if data == "menu:leave_group":
        group_id: uuid.UUID = context.user_data["group_id"]
        group_title = context.user_data.get("group_title", "группу")
        await query.edit_message_text(
            f"Вы уверены, что хотите покинуть группу <b>{group_title}</b>?\n"
            "После этого вы не сможете управлять ачивками в ней.",
            reply_markup=kb.confirm_leave_kb(str(group_id)),
            parse_mode="HTML",
        )
        return MAIN_MENU

    if data.startswith("leave_confirm:"):
        group_id = uuid.UUID(data.split(":", 1)[1])
        user_id: uuid.UUID = context.user_data["user_id"]
        async with async_session_factory() as session:
            member = await get_member(session, group_id, user_id)
            if member:
                await upsert_member(
                    session,
                    group_id=group_id,
                    user_id=user_id,
                    role=member.role,
                    status="LEFT",
                )
                await session.commit()
        context.user_data.pop("group_id", None)
        context.user_data.pop("group_title", None)

        async with async_session_factory() as session:
            groups = await get_user_groups(session, user_id)

        if not groups:
            await query.edit_message_text("Вы покинули группу. Больше нет доступных групп.")
            return ConversationHandler.END

        if len(groups) == 1:
            group, _ = groups[0]
            context.user_data["group_id"] = group.id
            context.user_data["group_title"] = group.title
            return await _show_main_menu(update, context)

        await query.edit_message_text(
            "Вы покинули группу. Выберите другую:",
            reply_markup=kb.group_list_kb(groups),
        )
        return SELECT_GROUP

    if data == "back:menu":
        return await _show_main_menu(update, context)

    if data == "back:categories":
        status = context.user_data.get("list_status", "AVAILABLE")
        label_map = {
            "AVAILABLE": "✅ Доступные ачивки",
            "ACHIEVED": "🏆 Полученные ачивки",
            "LOCKED": "🔒 Заблокированные ачивки",
        }
        group_id: uuid.UUID = context.user_data["group_id"]
        user_id: uuid.UUID = context.user_data["user_id"]
        async with async_session_factory() as session:
            nodes = await get_user_achievements_by_status(session, group_id, user_id, status)
        cats = _group_by_category(nodes)
        await query.edit_message_text(
            f"{label_map.get(status, 'Ачивки')}\n\nВыберите категорию:",
            reply_markup=kb.category_list_kb(cats, back_cb="back:menu"),
        )
        return MAIN_MENU

    if data.startswith("cat:"):
        category_name = data[4:]
        context.user_data["list_category"] = category_name
        status = context.user_data.get("list_status", "AVAILABLE")
        group_id: uuid.UUID = context.user_data["group_id"]
        user_id: uuid.UUID = context.user_data["user_id"]
        async with async_session_factory() as session:
            nodes = await get_user_achievements_by_status(session, group_id, user_id, status)
        nodes = [n for n in nodes if (n.achievement.category_name or "Прочее") == category_name]
        if not nodes:
            await query.edit_message_text(
                f"В категории «{category_name}» нет ачивок.",
                reply_markup=kb.back_kb("back:categories"),
            )
        else:
            await query.edit_message_text(
                f"📂 {category_name}\n\nВыберите ачивку:",
                reply_markup=kb.achievement_list_kb(nodes, back_cb="back:categories"),
            )
        return MAIN_MENU

    if data in ("menu:available", "menu:achieved", "menu:locked"):
        status_map = {
            "menu:available": "AVAILABLE",
            "menu:achieved": "ACHIEVED",
            "menu:locked": "LOCKED",
        }
        label_map = {
            "menu:available": "✅ Доступные ачивки",
            "menu:achieved": "🏆 Полученные ачивки",
            "menu:locked": "🔒 Заблокированные ачивки",
        }
        status = status_map[data]
        context.user_data["list_status"] = status

        group_id: uuid.UUID = context.user_data["group_id"]
        user_id: uuid.UUID = context.user_data["user_id"]

        async with async_session_factory() as session:
            nodes = await get_user_achievements_by_status(
                session, group_id, user_id, status
            )

        if not nodes:
            await query.edit_message_text(
                f"{label_map[data]}\n\nПусто.",
                reply_markup=kb.back_kb("back:menu"),
            )
        else:
            cats = _group_by_category(nodes)
            await query.edit_message_text(
                f"{label_map[data]}\n\nВыберите категорию:",
                reply_markup=kb.category_list_kb(cats, back_cb="back:menu"),
            )
        return MAIN_MENU

    if data == "menu:claims":
        group_id = context.user_data["group_id"]
        user_id = context.user_data["user_id"]
        async with async_session_factory() as session:
            claims = await get_user_claims(session, group_id, user_id)
        if not claims:
            await query.edit_message_text(
                "📩 Мои заявки\n\nЗаявок пока нет.",
                reply_markup=kb.back_kb("back:menu"),
            )
        else:
            await query.edit_message_text(
                "📩 Мои заявки:",
                reply_markup=kb.my_claim_list_kb(claims),
            )
        return MAIN_MENU

    if data == "menu:admin_claims":
        if not context.user_data.get("is_admin"):
            await query.answer("Нет доступа.", show_alert=True)
            return MAIN_MENU
        group_id = context.user_data["group_id"]
        async with async_session_factory() as session:
            claims = await get_group_submitted_claims(session, group_id)
        if not claims:
            await query.edit_message_text(
                "🧾 Заявки на подтверждение\n\nОчередь пуста.",
                reply_markup=kb.back_kb("back:menu"),
            )
        else:
            await query.edit_message_text(
                "🧾 Заявки на подтверждение:",
                reply_markup=kb.admin_claim_list_kb(claims),
            )
        return MAIN_MENU

    if data == "menu:admin_panel":
        if not context.user_data.get("is_admin"):
            await query.answer("Нет доступа.", show_alert=True)
            return MAIN_MENU
        from app.bot.handlers.admin_panel import admin_panel_entry
        return await admin_panel_entry(update, context)

    # ---- achievement detail ------------------------------------------------
    if data.startswith("ach:"):
        ach_id = uuid.UUID(data.split(":", 1)[1])
        group_id = context.user_data["group_id"]
        user_id = context.user_data["user_id"]

        async with async_session_factory() as session:
            nodes = await get_user_achievements_by_status(session, group_id, user_id)
        node = next((n for n in nodes if n.achievement.id == ach_id), None)
        if not node:
            await query.answer("Ачивка не найдена.", show_alert=True)
            return MAIN_MENU

        ach = node.achievement
        state = node.user_state
        prereqs_text = ""
        if node.prerequisites:
            prereq_titles = []
            async with async_session_factory() as session:
                for p in node.prerequisites:
                    pa = await get_achievement_by_id(session, p.prereq_achievement_id)
                    if pa:
                        prereq_titles.append(f"  • {pa.title} (ур. {p.min_level}+)")
            prereqs_text = "\n<b>Требования:</b>\n" + "\n".join(prereq_titles)

        level_text = ""
        if ach.repeatable:
            max_txt = f"/{ach.max_level}" if ach.max_level else ""
            level_text = f"\n<b>Уровень:</b> {state.level}{max_txt}"

        points_text = f"\n<b>Очки:</b> {ach.points}" if ach.points else ""

        text = (
            f"{kb.RARITY_EMOJI.get(ach.rarity, '')} <b>{ach.title}</b>\n"
            f"<i>{RARITY_LABEL.get(ach.rarity, ach.rarity)}</i>\n\n"
            f"{ach.description}"
            f"{level_text}"
            f"{points_text}"
            f"{prereqs_text}"
        )

        context.user_data["viewing_ach_id"] = str(ach_id)
        list_category = context.user_data.get("list_category")
        if list_category:
            back_cb = f"cat:{list_category}"
        else:
            list_status = context.user_data.get("list_status", "AVAILABLE")
            back_cb = f"menu:{list_status.lower()}"

        await query.edit_message_text(
            text,
            reply_markup=kb.achievement_detail_kb(
                str(ach_id),
                can_claim=(state.status == "AVAILABLE"),
                back_cb=back_cb,
            ),
            parse_mode="HTML",
        )
        return MAIN_MENU

    # ---- do_claim: ask for evidence ----------------------------------------
    if data.startswith("do_claim:"):
        ach_id = data.split(":", 1)[1]
        context.user_data["claiming_ach_id"] = ach_id
        await query.edit_message_text(
            "Опишите доказательство выполнения ачивки\n"
            "(фото, текст, ссылка — одним сообщением).\n\n"
            "Или отправьте /skip чтобы заявиться без описания.",
        )
        return AWAIT_EVIDENCE

    # ---- my claim detail ---------------------------------------------------
    if data.startswith("myclaim:"):
        claim_id = uuid.UUID(data.split(":", 1)[1])
        async with async_session_factory() as session:
            claim = await get_claim_by_id(session, claim_id)
        if not claim:
            await query.answer("Заявка не найдена.", show_alert=True)
            return MAIN_MENU

        status_label = {
            "SUBMITTED": "⏳ Ожидает",
            "APPROVED": "✅ Подтверждена",
            "REJECTED": "❌ Отклонена",
            "CANCELED": "🚫 Отменена",
        }.get(claim.status, claim.status)

        text = (
            f"📩 <b>{claim.achievement.title}</b>\n"
            f"Статус: {status_label}\n"
            f"Подана: {claim.submitted_at.strftime('%d.%m.%Y %H:%M')}\n"
        )
        if claim.comment:
            text += f"Комментарий: {claim.comment}\n"

        await query.edit_message_text(
            text,
            reply_markup=kb.my_claim_detail_kb(claim),
            parse_mode="HTML",
        )
        return MAIN_MENU

    # ---- cancel claim ------------------------------------------------------
    if data.startswith("cancel_claim:"):
        claim_id = uuid.UUID(data.split(":", 1)[1])
        user_id = context.user_data["user_id"]
        try:
            async with async_session_factory() as session:
                await cancel_claim(session, claim_id, user_id)
            await query.answer("Заявка отменена.", show_alert=True)
        except ClaimError as e:
            await query.answer(str(e), show_alert=True)
        return await _show_main_menu(update, context)

    # ---- admin claim detail ------------------------------------------------
    if data.startswith("adm_claim:"):
        claim_id = uuid.UUID(data.split(":", 1)[1])
        async with async_session_factory() as session:
            claim = await get_claim_by_id(session, claim_id)
        if not claim:
            await query.answer("Заявка не найдена.", show_alert=True)
            return MAIN_MENU

        user = claim.user
        name = _user_display(user)
        evidence_text = ""
        if claim.evidence and claim.evidence.get("text"):
            evidence_text = f"\nДоказательство: {claim.evidence['text']}"

        text = (
            f"🧾 <b>Заявка</b>\n"
            f"Участник: {name}\n"
            f"Ачивка: <b>{claim.achievement.title}</b>\n"
            f"Подана: {claim.submitted_at.strftime('%d.%m.%Y %H:%M')}"
            f"{evidence_text}"
        )
        context.user_data["admin_claim_id"] = str(claim_id)
        await query.edit_message_text(
            text,
            reply_markup=kb.admin_claim_detail_kb(str(claim_id)),
            parse_mode="HTML",
        )
        return MAIN_MENU

    # ---- approve -----------------------------------------------------------
    if data.startswith("approve:"):
        claim_id = uuid.UUID(data.split(":", 1)[1])
        admin_user_id = context.user_data["user_id"]
        try:
            async with async_session_factory() as session:
                result = await approve_claim(session, claim_id, admin_user_id)

            claim = result["claim"]
            ach = result["achievement"]
            user = result["user"]
            group = result["group"]
            level = result["level"]

            # Notify the claimant in their DM
            level_text = f" (уровень {level})" if ach.repeatable else ""
            try:
                await context.bot.send_message(
                    chat_id=user.tg_user_id,
                    text=(
                        f"🎉 Ваша заявка на ачивку <b>{ach.title}</b> подтверждена{level_text}!\n"
                        f"Поздравляем!"
                    ),
                    parse_mode="HTML",
                )
            except Exception as e:
                logger.warning("Could not DM user %s: %s", user.tg_user_id, e)

            # Notify the group chat
            if group.telegram_chat_id:
                try:
                    mention = f"@{user.username}" if user.username else f"<b>{_user_display(user)}</b>"
                    icon_part = f"{ach.icon} " if ach.icon else ""
                    if ach.repeatable:
                        max_txt = f"/{ach.max_level}" if ach.max_level else ""
                        progress_part = f" — уровень {level}{max_txt}"
                    else:
                        progress_part = ""
                    await context.bot.send_message(
                        chat_id=group.telegram_chat_id,
                        text=(
                            f"🏆 {mention} получил(а) ачивку "
                            f"«<b>{ach.title}</b>» {icon_part}({ach.rarity}){progress_part}!"
                        ),
                        parse_mode="HTML",
                    )
                except Exception as e:
                    logger.warning("Could not notify group chat: %s", e)

            await query.answer("✅ Заявка подтверждена!", show_alert=True)
        except ClaimError as e:
            await query.answer(str(e), show_alert=True)
        return await _show_main_menu(update, context)

    # ---- reject (ask for reason) -------------------------------------------
    if data.startswith("reject:"):
        claim_id = data.split(":", 1)[1]
        context.user_data["rejecting_claim_id"] = claim_id
        await query.edit_message_text(
            "Введите причину отклонения (или /skip чтобы отклонить без комментария):"
        )
        return ADMIN_REJECT_INPUT

    # ---- select_group callback in MAIN_MENU (change group) -----------------
    if data.startswith("group:"):
        return await select_group_cb(update, context)

    await query.answer()
    return MAIN_MENU


# ---------------------------------------------------------------------------
# AWAIT_EVIDENCE state
# ---------------------------------------------------------------------------


async def receive_evidence(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    text = update.message.text
    return await _do_submit_claim(update, context, evidence={"text": text})


async def skip_evidence(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return await _do_submit_claim(update, context, evidence={})


async def _do_submit_claim(
    update: Update, context: ContextTypes.DEFAULT_TYPE, evidence: dict
) -> int:
    ach_id = uuid.UUID(context.user_data["claiming_ach_id"])
    group_id: uuid.UUID = context.user_data["group_id"]
    user_id: uuid.UUID = context.user_data["user_id"]

    try:
        async with async_session_factory() as session:
            claim = await submit_claim(session, group_id, user_id, ach_id, evidence)

        # Notify admins in the group that a new claim arrived
        async with async_session_factory() as session:
            from app.repos.group_repo import get_group_admins, get_group_by_id
            group = await get_group_by_id(session, group_id)
            admins = await get_group_admins(session, group_id)
            ach = await get_achievement_by_id(session, ach_id)

        tg_user = update.effective_user
        name = tg_user.first_name or tg_user.username or str(tg_user.id)
        mention = f"@{tg_user.username}" if tg_user.username else f"<b>{name}</b>"
        icon_part = f"{ach.icon} " if ach.icon else ""
        evidence_preview = ""
        if evidence and evidence.get("text"):
            preview = evidence["text"][:200]
            evidence_preview = f"\n📝 <i>{preview}</i>"
        for admin in admins:
            if admin.tg_user_id == tg_user.id:
                continue  # skip self-notification if admin claims
            try:
                await context.bot.send_message(
                    chat_id=admin.tg_user_id,
                    text=(
                        f"📩 <b>Новая заявка</b>\n\n"
                        f"👤 {mention}\n"
                        f"🏆 {icon_part}<b>{ach.title}</b> ({ach.rarity})"
                        f"{evidence_preview}\n\n"
                        f"Откройте «Заявки на подтверждение» в боте."
                    ),
                    parse_mode="HTML",
                )
            except Exception as e:
                logger.warning("Could not notify admin %s: %s", admin.tg_user_id, e)

        await update.message.reply_text(
            f"✅ Заявка на <b>{ach.title}</b> отправлена администратору!",
            parse_mode="HTML",
        )
    except ClaimError as e:
        await update.message.reply_text(f"❌ {e}")

    context.user_data.pop("claiming_ach_id", None)
    return await _show_main_menu(update, context)


# ---------------------------------------------------------------------------
# ADMIN_REJECT_INPUT state
# ---------------------------------------------------------------------------


async def receive_reject_reason(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    reason = update.message.text
    return await _do_reject_claim(update, context, comment=reason)


async def skip_reject_reason(
    update: Update, context: ContextTypes.DEFAULT_TYPE
) -> int:
    return await _do_reject_claim(update, context, comment=None)


async def _do_reject_claim(
    update: Update, context: ContextTypes.DEFAULT_TYPE, comment: str | None
) -> int:
    claim_id = uuid.UUID(context.user_data["rejecting_claim_id"])
    admin_user_id = context.user_data["user_id"]

    try:
        async with async_session_factory() as session:
            claim = await reject_claim(session, claim_id, admin_user_id, comment)

        # Notify the claimant
        async with async_session_factory() as session:
            full_claim = await get_claim_by_id(session, claim_id)

        try:
            reason_text = f"\nПричина: {comment}" if comment else ""
            await context.bot.send_message(
                chat_id=full_claim.user.tg_user_id,
                text=(
                    f"❌ Ваша заявка на ачивку <b>{full_claim.achievement.title}</b> отклонена."
                    f"{reason_text}"
                ),
                parse_mode="HTML",
            )
        except Exception as e:
            logger.warning("Could not DM user: %s", e)

        await update.message.reply_text("Заявка отклонена.")
    except ClaimError as e:
        await update.message.reply_text(f"❌ {e}")

    context.user_data.pop("rejecting_claim_id", None)
    return await _show_main_menu(update, context)


# ---------------------------------------------------------------------------
# ConversationHandler builder
# ---------------------------------------------------------------------------


def build_private_conversation() -> ConversationHandler:
    from app.bot.handlers.admin_panel import (
        ADMIN_ACH_DETAIL_HANDLERS,
        ADMIN_ACH_INPUT_HANDLERS,
        ADMIN_ACH_LIST_HANDLERS,
        ADMIN_ACH_PREREQS_HANDLERS,
        ADMIN_ACH_WIZARD_HANDLERS,
        ADMIN_CAT_INPUT_HANDLERS,
        ADMIN_CAT_LIST_HANDLERS,
        ADMIN_PANEL_HANDLERS,
    )

    return ConversationHandler(
        entry_points=[CommandHandler("start", start)],
        states={
            SELECT_GROUP: [
                CallbackQueryHandler(select_group_cb, pattern=r"^group:"),
            ],
            MAIN_MENU: [
                CallbackQueryHandler(menu_callback),
            ],
            AWAIT_EVIDENCE: [
                CommandHandler("skip", skip_evidence),
                MessageHandler(filters.TEXT & ~filters.COMMAND, receive_evidence),
            ],
            ADMIN_REJECT_INPUT: [
                CommandHandler("skip", skip_reject_reason),
                MessageHandler(filters.TEXT & ~filters.COMMAND, receive_reject_reason),
            ],
            ADMIN_PANEL: ADMIN_PANEL_HANDLERS,
            ADMIN_CAT_LIST: ADMIN_CAT_LIST_HANDLERS,
            ADMIN_CAT_INPUT: ADMIN_CAT_INPUT_HANDLERS,
            ADMIN_ACH_LIST: ADMIN_ACH_LIST_HANDLERS,
            ADMIN_ACH_DETAIL: ADMIN_ACH_DETAIL_HANDLERS,
            ADMIN_ACH_INPUT: ADMIN_ACH_INPUT_HANDLERS,
            ADMIN_ACH_WIZARD: ADMIN_ACH_WIZARD_HANDLERS,
            ADMIN_ACH_PREREQS: ADMIN_ACH_PREREQS_HANDLERS,
        },
        fallbacks=[CommandHandler("start", start)],
        per_chat=True,
        per_user=True,
    )
