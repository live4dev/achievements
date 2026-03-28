"""Admin panel handlers: CRUD for categories, achievements, and prerequisites."""

import logging
import uuid

from sqlalchemy.orm import selectinload
from telegram import Update
from telegram.ext import (
    CallbackQueryHandler,
    CommandHandler,
    ContextTypes,
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
    MAIN_MENU,
)
from app.core.database import async_session_factory
from app.models.orm import Achievement, AchievementPrerequisite, Category
from app.repos.achievement_repo import get_all_categories
from app.repos.admin_repo import get_all_achievements
from app.services.admin_service import (
    AdminError,
    create_achievement_safe,
    create_category_safe,
    deactivate_achievement_safe,
    toggle_prerequisite_safe,
    update_achievement_safe,
    update_category_safe,
)

logger = logging.getLogger(__name__)

RARITY_LABELS = {
    "COMMON": "Обычная",
    "UNCOMMON": "Необычная",
    "RARE": "Редкая",
    "EPIC": "Эпическая",
    "LEGENDARY": "Легендарная",
}


# ---------------------------------------------------------------------------
# Entry point (called from MAIN_MENU state via lazy import)
# ---------------------------------------------------------------------------


async def admin_panel_entry(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.edit_message_text(
        "⚙️ <b>Управление ачивками</b>\n\nВыберите раздел:",
        reply_markup=kb.admin_panel_kb(),
        parse_mode="HTML",
    )
    return ADMIN_PANEL


# ---------------------------------------------------------------------------
# ADMIN_PANEL state — hub
# ---------------------------------------------------------------------------


async def admin_panel_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data == "adm_cat_list":
        return await _show_cat_list(update, context)
    if data == "adm_ach_list":
        return await _show_ach_list(update, context)
    if data == "back:menu":
        from app.bot.handlers.private_chat import _show_main_menu
        return await _show_main_menu(update, context)

    return ADMIN_PANEL


# ---------------------------------------------------------------------------
# Category helpers
# ---------------------------------------------------------------------------


async def _show_cat_list(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    async with async_session_factory() as session:
        cats = await get_all_categories(session)
    query = update.callback_query
    await query.edit_message_text(
        "📁 <b>Категории</b>\n\nВыберите категорию для редактирования:",
        reply_markup=kb.admin_cat_list_kb(cats),
        parse_mode="HTML",
    )
    return ADMIN_CAT_LIST


# ---------------------------------------------------------------------------
# ADMIN_CAT_LIST state — category list / detail
# ---------------------------------------------------------------------------


async def admin_cat_list_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data == "adm_cat_list":
        return await _show_cat_list(update, context)

    if data == "adm_panel":
        await query.edit_message_text(
            "⚙️ <b>Управление ачивками</b>\n\nВыберите раздел:",
            reply_markup=kb.admin_panel_kb(),
            parse_mode="HTML",
        )
        return ADMIN_PANEL

    if data == "adm_cat_new":
        context.user_data["admin_cat_field"] = "new_code"
        await query.edit_message_text("Введите код новой категории (лат. буквы/цифры/_):")
        return ADMIN_CAT_INPUT

    if data.startswith("adm_cat:"):
        cat_id = uuid.UUID(data.split(":", 1)[1])
        context.user_data["admin_cat_id"] = str(cat_id)
        async with async_session_factory() as session:
            cat = await session.get(Category, cat_id)
        if not cat:
            await query.answer("Категория не найдена.", show_alert=True)
            return await _show_cat_list(update, context)
        text = (
            f"📁 <b>{cat.name}</b>\n"
            f"Код: <code>{cat.code}</code>\n"
            f"Описание: {cat.description or '—'}"
        )
        await query.edit_message_text(
            text, reply_markup=kb.admin_cat_edit_kb(cat_id), parse_mode="HTML"
        )
        return ADMIN_CAT_LIST

    if data.startswith("adm_ce:"):
        # adm_ce:{cat_id}:{field}
        parts = data.split(":")
        cat_id = uuid.UUID(parts[1])
        field = parts[2]  # "name" or "desc"
        context.user_data["admin_cat_id"] = str(cat_id)
        context.user_data["admin_cat_field"] = field
        field_label = {"name": "название", "desc": "описание"}.get(field, field)
        await query.edit_message_text(f"Введите новое {field_label}:")
        return ADMIN_CAT_INPUT

    return ADMIN_CAT_LIST


# ---------------------------------------------------------------------------
# ADMIN_CAT_INPUT state — text input for category fields
# ---------------------------------------------------------------------------


async def admin_cat_input_msg(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return await _handle_cat_input(update, context, update.message.text.strip())


async def admin_cat_skip(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return await _handle_cat_input(update, context, "")


async def _handle_cat_input(
    update: Update, context: ContextTypes.DEFAULT_TYPE, text: str
) -> int:
    field = context.user_data.get("admin_cat_field", "")

    if field == "new_code":
        context.user_data["admin_cat_new_code"] = text
        context.user_data["admin_cat_field"] = "new_name"
        await update.message.reply_text("Введите название категории:")
        return ADMIN_CAT_INPUT

    if field == "new_name":
        context.user_data["admin_cat_new_name"] = text
        context.user_data["admin_cat_field"] = "new_desc"
        await update.message.reply_text("Введите описание (или /skip для пропуска):")
        return ADMIN_CAT_INPUT

    if field == "new_desc":
        code = context.user_data.pop("admin_cat_new_code", "")
        name = context.user_data.pop("admin_cat_new_name", "")
        try:
            async with async_session_factory() as session:
                cat = await create_category_safe(session, code, name, text or None)
            context.user_data["admin_cat_id"] = str(cat.id)
            await update.message.reply_text(
                f"✅ Категория <b>{cat.name}</b> создана!",
                reply_markup=kb.admin_cat_edit_kb(cat.id),
                parse_mode="HTML",
            )
        except AdminError as e:
            await update.message.reply_text(f"❌ {e}")
        return ADMIN_CAT_LIST

    # Editing existing category field
    cat_id = uuid.UUID(context.user_data.get("admin_cat_id", ""))
    db_field = {"name": "name", "desc": "description"}.get(field, field)
    try:
        async with async_session_factory() as session:
            cat = await update_category_safe(session, cat_id, db_field, text)
        await update.message.reply_text(
            f"✅ Сохранено!\n\n📁 <b>{cat.name}</b>\n"
            f"Код: <code>{cat.code}</code>\nОписание: {cat.description or '—'}",
            reply_markup=kb.admin_cat_edit_kb(cat.id),
            parse_mode="HTML",
        )
        context.user_data["admin_cat_id"] = str(cat.id)
    except Exception as e:
        await update.message.reply_text(f"❌ {e}")
    return ADMIN_CAT_LIST


# ---------------------------------------------------------------------------
# Achievement helpers
# ---------------------------------------------------------------------------


async def _show_ach_list(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    async with async_session_factory() as session:
        achs = await get_all_achievements(session)
    query = update.callback_query
    await query.edit_message_text(
        "🏆 <b>Ачивки</b>\n\nВыберите ачивку для редактирования:",
        reply_markup=kb.admin_ach_list_kb(achs),
        parse_mode="HTML",
    )
    return ADMIN_ACH_LIST


async def _build_ach_detail_text(ach: Achievement) -> str:
    rarity_emoji = kb.RARITY_EMOJI.get(ach.rarity, "")
    rarity_label = RARITY_LABELS.get(ach.rarity, ach.rarity)
    icon_part = f"{ach.icon} " if ach.icon else ""
    rep_text = "Да" if ach.repeatable else "Нет"
    if ach.repeatable and ach.max_level:
        rep_text += f" (макс. {ach.max_level})"
    cat_name = ach.category.name if ach.category else "—"
    prereqs_text = "Нет"
    if ach.prerequisites:
        titles = [
            f"{p.prereq_achievement.title} (ур.{p.min_level}+)"
            for p in ach.prerequisites
            if p.prereq_achievement
        ]
        if titles:
            prereqs_text = ", ".join(titles)
    status_label = "✅ Активна" if ach.is_active else "❌ Неактивна"
    auto_grant_line = "⚡ Да" if ach.auto_grant else "Нет"
    return (
        f"🏆 {icon_part}<b>{ach.title}</b>\n"
        f"Код: <code>{ach.code}</code>\n"
        f"Категория: {cat_name}\n"
        f"Редкость: {rarity_emoji} {rarity_label}\n"
        f"Очки: {ach.points or '—'}\n"
        f"Иконка: {ach.icon or '—'}\n"
        f"Повторяемая: {rep_text}\n"
        f"Статус: {status_label}\n"
        f"Авто-выдача: {auto_grant_line}\n"
        f"Пресреквизиты: {prereqs_text}"
    )


async def _show_ach_detail(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    ach_id = uuid.UUID(context.user_data["admin_ach_id"])
    query = update.callback_query
    from sqlalchemy import select as sa_select
    async with async_session_factory() as session:
        result = await session.execute(
            sa_select(Achievement)
            .options(
                selectinload(Achievement.category),
                selectinload(Achievement.prerequisites).selectinload(
                    AchievementPrerequisite.prereq_achievement
                ),
            )
            .where(Achievement.id == ach_id)
        )
        ach = result.scalar_one_or_none()
    if not ach:
        await query.answer("Ачивка не найдена.", show_alert=True)
        return await _show_ach_list(update, context)
    text = await _build_ach_detail_text(ach)
    await query.edit_message_text(
        text,
        reply_markup=kb.admin_ach_detail_kb(ach_id, ach.is_active, ach.auto_grant),
        parse_mode="HTML",
    )
    return ADMIN_ACH_DETAIL


# ---------------------------------------------------------------------------
# ADMIN_ACH_LIST state
# ---------------------------------------------------------------------------


async def admin_ach_list_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data == "adm_ach_list":
        return await _show_ach_list(update, context)

    if data == "adm_panel":
        await query.edit_message_text(
            "⚙️ <b>Управление ачивками</b>\n\nВыберите раздел:",
            reply_markup=kb.admin_panel_kb(),
            parse_mode="HTML",
        )
        return ADMIN_PANEL

    if data == "adm_ach_new":
        context.user_data["admin_wizard"] = {}
        context.user_data["admin_wizard_step"] = 0
        await query.edit_message_text(
            "🧙 <b>Создание ачивки</b>\n\n"
            "Шаг 1/8: Введите уникальный код (лат. буквы, цифры и _):",
            parse_mode="HTML",
        )
        return ADMIN_ACH_WIZARD

    if data.startswith("adm_ach:"):
        ach_id = uuid.UUID(data.split(":", 1)[1])
        context.user_data["admin_ach_id"] = str(ach_id)
        return await _show_ach_detail(update, context)

    return ADMIN_ACH_LIST


# ---------------------------------------------------------------------------
# ADMIN_ACH_DETAIL state — field editing (inline + text prompt)
# ---------------------------------------------------------------------------


async def admin_ach_detail_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data == "adm_ach_list":
        return await _show_ach_list(update, context)

    if data == "adm_ach_back_detail":
        return await _show_ach_detail(update, context)

    if data == "adm_prereqs":
        return await _show_prereqs(update, context)

    if data.startswith("adm_deact:"):
        ach_id = uuid.UUID(data.split(":", 1)[1])
        async with async_session_factory() as session:
            await deactivate_achievement_safe(session, ach_id)
        await query.answer("Ачивка деактивирована.", show_alert=True)
        return await _show_ach_list(update, context)

    if data.startswith("adm_toggle_autogrant:"):
        ach_id = uuid.UUID(data.split(":", 1)[1])
        context.user_data["admin_ach_id"] = str(ach_id)
        try:
            async with async_session_factory() as session:
                ach = await session.get(Achievement, ach_id)
                if not ach:
                    await query.answer("Ачивка не найдена.", show_alert=True)
                    return ADMIN_ACH_DETAIL
                await update_achievement_safe(session, ach_id, "auto_grant", not ach.auto_grant)
        except AdminError as e:
            await query.answer(str(e), show_alert=True)
            return ADMIN_ACH_DETAIL
        return await _show_ach_detail(update, context)

    # Inline field selection
    if data == "adm_af:rarity":
        await query.edit_message_text(
            "Выберите редкость:", reply_markup=kb.admin_rarity_edit_kb()
        )
        return ADMIN_ACH_DETAIL

    if data == "adm_af:category":
        async with async_session_factory() as session:
            cats = await get_all_categories(session)
        await query.edit_message_text(
            "Выберите категорию:", reply_markup=kb.admin_cat_select_kb(cats)
        )
        return ADMIN_ACH_DETAIL

    if data.startswith("adm_set_rar:"):
        rarity = data.split(":", 1)[1]
        ach_id = uuid.UUID(context.user_data["admin_ach_id"])
        try:
            async with async_session_factory() as session:
                await update_achievement_safe(session, ach_id, "rarity", rarity)
        except AdminError as e:
            await query.answer(str(e), show_alert=True)
            return ADMIN_ACH_DETAIL
        return await _show_ach_detail(update, context)

    if data.startswith("adm_set_cat:"):
        cat_id = data.split(":", 1)[1]
        ach_id = uuid.UUID(context.user_data["admin_ach_id"])
        try:
            async with async_session_factory() as session:
                await update_achievement_safe(session, ach_id, "category_id", cat_id)
        except AdminError as e:
            await query.answer(str(e), show_alert=True)
            return ADMIN_ACH_DETAIL
        return await _show_ach_detail(update, context)

    # Text fields — prompt and switch to input state
    text_field_map = {
        "adm_af:title": ("title", "новое название"),
        "adm_af:desc": ("description", "новое описание"),
        "adm_af:icon": ("icon", "иконку (emoji) или /skip для очистки"),
        "adm_af:points": ("points", "очки (число) или /skip для сброса"),
    }
    if data in text_field_map:
        field, prompt = text_field_map[data]
        context.user_data["admin_ach_field"] = field
        await query.edit_message_text(f"Введите {prompt}:")
        return ADMIN_ACH_INPUT

    return ADMIN_ACH_DETAIL


# ---------------------------------------------------------------------------
# ADMIN_ACH_INPUT state — text input for achievement fields
# ---------------------------------------------------------------------------


async def admin_ach_input_msg(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return await _handle_ach_input(update, context, update.message.text.strip())


async def admin_ach_skip(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    return await _handle_ach_input(update, context, "")


async def _handle_ach_input(
    update: Update, context: ContextTypes.DEFAULT_TYPE, text: str
) -> int:
    field = context.user_data.get("admin_ach_field", "")
    ach_id = uuid.UUID(context.user_data["admin_ach_id"])
    try:
        async with async_session_factory() as session:
            await update_achievement_safe(session, ach_id, field, text or None)
        await update.message.reply_text("✅ Сохранено.")
    except AdminError as e:
        await update.message.reply_text(f"❌ {e}")
        return ADMIN_ACH_INPUT
    # Show updated detail — simulate a callback query context via a dummy message reply
    # We need to send a new message with the detail and return ADMIN_ACH_DETAIL
    from sqlalchemy import select as sa_select
    async with async_session_factory() as session:
        result = await session.execute(
            sa_select(Achievement)
            .options(
                selectinload(Achievement.category),
                selectinload(Achievement.prerequisites).selectinload(
                    AchievementPrerequisite.prereq_achievement
                ),
            )
            .where(Achievement.id == ach_id)
        )
        ach = result.scalar_one_or_none()
    if ach:
        text_out = await _build_ach_detail_text(ach)
        await update.message.reply_text(
            text_out,
            reply_markup=kb.admin_ach_detail_kb(ach_id, ach.is_active),
            parse_mode="HTML",
        )
    return ADMIN_ACH_DETAIL


# ---------------------------------------------------------------------------
# ADMIN_ACH_WIZARD state — step-by-step achievement creation
# ---------------------------------------------------------------------------


async def admin_ach_wizard_msg(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    step = context.user_data.get("admin_wizard_step", 0)
    wizard = context.user_data.setdefault("admin_wizard", {})
    text = update.message.text.strip()

    # Steps requiring inline keyboard — ignore text input with hint
    if step in (3, 4, 7):
        await update.message.reply_text("Используйте кнопки для выбора.")
        return ADMIN_ACH_WIZARD

    if step == 0:  # code
        wizard["code"] = text
        context.user_data["admin_wizard_step"] = 1
        await update.message.reply_text("Шаг 2/8: Введите название ачивки:")
        return ADMIN_ACH_WIZARD

    if step == 1:  # title
        wizard["title"] = text
        context.user_data["admin_wizard_step"] = 2
        await update.message.reply_text("Шаг 3/8: Введите описание:")
        return ADMIN_ACH_WIZARD

    if step == 2:  # description
        wizard["description"] = text
        context.user_data["admin_wizard_step"] = 3
        async with async_session_factory() as session:
            cats = await get_all_categories(session)
        await update.message.reply_text(
            "Шаг 4/8: Выберите категорию:",
            reply_markup=kb.admin_wizard_cat_kb(cats),
        )
        return ADMIN_ACH_WIZARD

    if step == 5:  # icon
        wizard["icon"] = text or None
        context.user_data["admin_wizard_step"] = 6
        await update.message.reply_text("Шаг 7/8: Введите очки (число) или /skip:")
        return ADMIN_ACH_WIZARD

    if step == 6:  # points
        try:
            wizard["points"] = int(text)
        except ValueError:
            await update.message.reply_text("❌ Введите целое число или /skip:")
            return ADMIN_ACH_WIZARD
        context.user_data["admin_wizard_step"] = 7
        await update.message.reply_text(
            "Шаг 8/8: Ачивка повторяемая?",
            reply_markup=kb.admin_wizard_repeatable_kb(),
        )
        return ADMIN_ACH_WIZARD

    if step == 8:  # max_level
        try:
            wizard["max_level"] = int(text)
        except ValueError:
            await update.message.reply_text("❌ Введите целое число или /skip для без ограничений:")
            return ADMIN_ACH_WIZARD
        return await _wizard_show_preview_msg(update.message, context)

    return ADMIN_ACH_WIZARD


async def admin_wizard_skip(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    step = context.user_data.get("admin_wizard_step", 0)
    wizard = context.user_data.setdefault("admin_wizard", {})

    if step == 5:  # skip icon
        wizard["icon"] = None
        context.user_data["admin_wizard_step"] = 6
        await update.message.reply_text("Шаг 7/8: Введите очки (число) или /skip:")
        return ADMIN_ACH_WIZARD

    if step == 6:  # skip points
        wizard["points"] = None
        context.user_data["admin_wizard_step"] = 7
        await update.message.reply_text(
            "Шаг 8/8: Ачивка повторяемая?",
            reply_markup=kb.admin_wizard_repeatable_kb(),
        )
        return ADMIN_ACH_WIZARD

    if step == 8:  # skip max_level (unlimited)
        wizard["max_level"] = None
        return await _wizard_show_preview_msg(update.message, context)

    await update.message.reply_text("Пропустить этот шаг нельзя.")
    return ADMIN_ACH_WIZARD


async def admin_ach_wizard_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data
    wizard = context.user_data.setdefault("admin_wizard", {})

    if data == "adm_w_cancel":
        context.user_data.pop("admin_wizard", None)
        context.user_data.pop("admin_wizard_step", None)
        async with async_session_factory() as session:
            achs = await get_all_achievements(session)
        await query.edit_message_text(
            "🏆 <b>Ачивки</b>\n\nСоздание отменено.",
            reply_markup=kb.admin_ach_list_kb(achs),
            parse_mode="HTML",
        )
        return ADMIN_ACH_LIST

    if data.startswith("adm_w_cat:"):
        cat_id = data.split(":", 1)[1]
        wizard["category_id"] = cat_id
        context.user_data["admin_wizard_step"] = 4
        await query.edit_message_text(
            "Шаг 5/8: Выберите редкость:",
            reply_markup=kb.admin_wizard_rarity_kb(),
        )
        return ADMIN_ACH_WIZARD

    if data.startswith("adm_w_rarity:"):
        rarity = data.split(":", 1)[1]
        wizard["rarity"] = rarity
        context.user_data["admin_wizard_step"] = 5
        await query.edit_message_text("Шаг 6/8: Введите иконку (emoji) или /skip:")
        return ADMIN_ACH_WIZARD

    if data.startswith("adm_w_rep:"):
        rep = data.split(":", 1)[1] == "yes"
        wizard["repeatable"] = rep
        if rep:
            context.user_data["admin_wizard_step"] = 8
            await query.edit_message_text(
                "Введите максимальный уровень (число) или /skip для без ограничений:"
            )
        else:
            wizard["max_level"] = None
            return await _wizard_show_preview_cb(query, context)
        return ADMIN_ACH_WIZARD

    if data == "adm_w_confirm":
        return await _wizard_save_cb(query, context)

    return ADMIN_ACH_WIZARD


async def _wizard_preview_text(wizard: dict) -> str:
    async with async_session_factory() as session:
        cat = await session.get(Category, uuid.UUID(wizard["category_id"]))
    cat_name = cat.name if cat else "?"
    rarity_label = RARITY_LABELS.get(wizard["rarity"], wizard["rarity"])
    rarity_emoji = kb.RARITY_EMOJI.get(wizard["rarity"], "")
    icon_part = f"{wizard['icon']} " if wizard.get("icon") else ""
    rep = "Да" if wizard.get("repeatable") else "Нет"
    max_l = wizard.get("max_level")
    if wizard.get("repeatable") and max_l:
        rep += f" (макс. {max_l})"
    return (
        f"📋 <b>Предварительный просмотр</b>\n\n"
        f"Код: <code>{wizard['code']}</code>\n"
        f"Название: {icon_part}<b>{wizard['title']}</b>\n"
        f"Описание: {wizard['description']}\n"
        f"Категория: {cat_name}\n"
        f"Редкость: {rarity_emoji} {rarity_label}\n"
        f"Очки: {wizard.get('points') or '—'}\n"
        f"Повторяемая: {rep}"
    )


async def _wizard_show_preview_msg(message, context: ContextTypes.DEFAULT_TYPE) -> int:
    wizard = context.user_data.get("admin_wizard", {})
    text = await _wizard_preview_text(wizard)
    await message.reply_text(text, reply_markup=kb.wizard_confirm_kb(), parse_mode="HTML")
    return ADMIN_ACH_WIZARD


async def _wizard_show_preview_cb(query, context: ContextTypes.DEFAULT_TYPE) -> int:
    wizard = context.user_data.get("admin_wizard", {})
    text = await _wizard_preview_text(wizard)
    await query.edit_message_text(text, reply_markup=kb.wizard_confirm_kb(), parse_mode="HTML")
    return ADMIN_ACH_WIZARD


async def _wizard_save_cb(query, context: ContextTypes.DEFAULT_TYPE) -> int:
    wizard = context.user_data.get("admin_wizard", {})
    try:
        async with async_session_factory() as session:
            ach = await create_achievement_safe(session, wizard)
        context.user_data.pop("admin_wizard", None)
        context.user_data.pop("admin_wizard_step", None)
        context.user_data["admin_ach_id"] = str(ach.id)
        await query.answer("✅ Ачивка создана!", show_alert=True)
        # Load full ach and show detail
        from sqlalchemy import select as sa_select
        async with async_session_factory() as session:
            result = await session.execute(
                sa_select(Achievement)
                .options(
                    selectinload(Achievement.category),
                    selectinload(Achievement.prerequisites).selectinload(
                        AchievementPrerequisite.prereq_achievement
                    ),
                )
                .where(Achievement.id == ach.id)
            )
            full_ach = result.scalar_one_or_none()
        text = await _build_ach_detail_text(full_ach)
        await query.edit_message_text(
            text,
            reply_markup=kb.admin_ach_detail_kb(ach.id, ach.is_active),
            parse_mode="HTML",
        )
        return ADMIN_ACH_DETAIL
    except AdminError as e:
        await query.answer(str(e), show_alert=True)
        return ADMIN_ACH_WIZARD


# ---------------------------------------------------------------------------
# ADMIN_ACH_PREREQS state — toggle prerequisites
# ---------------------------------------------------------------------------


async def _show_prereqs(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    ach_id = uuid.UUID(context.user_data["admin_ach_id"])
    query = update.callback_query
    from sqlalchemy import select as sa_select
    async with async_session_factory() as session:
        result = await session.execute(
            sa_select(Achievement)
            .options(selectinload(Achievement.prerequisites))
            .where(Achievement.id == ach_id)
        )
        ach = result.scalar_one_or_none()
        all_achs = await get_all_achievements(session)

    prereq_ids = {p.prereq_achievement_id for p in ach.prerequisites} if ach else set()
    others = [a for a in all_achs if a.id != ach_id and a.is_active]
    ach_title = ach.title if ach else "?"

    await query.edit_message_text(
        f"🔗 <b>Пресреквизиты: {ach_title}</b>\n\n"
        "Выберите ачивки, которые нужно выполнить для разблокировки:",
        reply_markup=kb.admin_prereqs_kb(ach_id, others, prereq_ids),
        parse_mode="HTML",
    )
    return ADMIN_ACH_PREREQS


async def admin_ach_prereqs_cb(update: Update, context: ContextTypes.DEFAULT_TYPE) -> int:
    query = update.callback_query
    await query.answer()
    data = query.data

    if data.startswith("adm_tp:"):
        prereq_id = uuid.UUID(data.split(":", 1)[1])
        ach_id = uuid.UUID(context.user_data["admin_ach_id"])
        try:
            async with async_session_factory() as session:
                added = await toggle_prerequisite_safe(session, ach_id, prereq_id)
            await query.answer("✅ Добавлен" if added else "Удалён")
        except AdminError as e:
            await query.answer(str(e), show_alert=True)
            return ADMIN_ACH_PREREQS
        return await _show_prereqs(update, context)

    if data.startswith("adm_ach:"):
        ach_id = uuid.UUID(data.split(":", 1)[1])
        context.user_data["admin_ach_id"] = str(ach_id)
        return await _show_ach_detail(update, context)

    return ADMIN_ACH_PREREQS


# ---------------------------------------------------------------------------
# Handler lists (imported by private_chat.py)
# ---------------------------------------------------------------------------


ADMIN_PANEL_HANDLERS = [CallbackQueryHandler(admin_panel_cb)]
ADMIN_CAT_LIST_HANDLERS = [CallbackQueryHandler(admin_cat_list_cb)]
ADMIN_CAT_INPUT_HANDLERS = [
    CommandHandler("skip", admin_cat_skip),
    MessageHandler(filters.TEXT & ~filters.COMMAND, admin_cat_input_msg),
]
ADMIN_ACH_LIST_HANDLERS = [CallbackQueryHandler(admin_ach_list_cb)]
ADMIN_ACH_DETAIL_HANDLERS = [CallbackQueryHandler(admin_ach_detail_cb)]
ADMIN_ACH_INPUT_HANDLERS = [
    CommandHandler("skip", admin_ach_skip),
    MessageHandler(filters.TEXT & ~filters.COMMAND, admin_ach_input_msg),
]
ADMIN_ACH_WIZARD_HANDLERS = [
    CommandHandler("skip", admin_wizard_skip),
    CallbackQueryHandler(admin_ach_wizard_cb),
    MessageHandler(filters.TEXT & ~filters.COMMAND, admin_ach_wizard_msg),
]
ADMIN_ACH_PREREQS_HANDLERS = [CallbackQueryHandler(admin_ach_prereqs_cb)]
