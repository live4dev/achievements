"""Inline keyboard builders for the bot."""

from telegram import InlineKeyboardButton, InlineKeyboardMarkup

from app.models.orm import Achievement, AchievementClaim, Group, GroupMember


RARITY_EMOJI = {
    "COMMON": "⬜",
    "UNCOMMON": "🟩",
    "RARE": "🟦",
    "EPIC": "🟪",
    "LEGENDARY": "🟨",
}


def group_list_kb(groups_with_members: list[tuple[Group, GroupMember]]) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton(g.title, callback_data=f"group:{g.id}")]
        for g, _ in groups_with_members
    ]
    return InlineKeyboardMarkup(buttons)


def main_menu_kb(is_admin: bool) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton("✅ Доступные", callback_data="menu:available")],
        [InlineKeyboardButton("🏆 Полученные", callback_data="menu:achieved")],
        [InlineKeyboardButton("🔒 Заблокированные", callback_data="menu:locked")],
        [InlineKeyboardButton("📩 Мои заявки", callback_data="menu:claims")],
    ]
    if is_admin:
        buttons.append(
            [InlineKeyboardButton("🧾 Заявки на подтверждение", callback_data="menu:admin_claims")]
        )
        buttons.append(
            [InlineKeyboardButton("⚙️ Управление ачивками", callback_data="menu:admin_panel")]
        )
    buttons.append([InlineKeyboardButton("🔄 Сменить группу", callback_data="menu:change_group")])
    buttons.append([InlineKeyboardButton("🚪 Покинуть группу", callback_data="menu:leave_group")])
    return InlineKeyboardMarkup(buttons)


def category_list_kb(
    categories: list[tuple[str, int]],  # (category_name, count)
    back_cb: str,
) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton(f"{name}  ({count})", callback_data=f"cat:{name}")]
        for name, count in categories
    ]
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data=back_cb)])
    return InlineKeyboardMarkup(buttons)


def achievement_list_kb(
    nodes: list,  # list[AchievementTreeNode]
    back_cb: str,
) -> InlineKeyboardMarkup:
    buttons = []
    current_category: str | None = None

    for node in nodes:
        ach = node.achievement
        cat = ach.category_name or "Прочее"

        # Category separator row
        if cat != current_category:
            current_category = cat
            buttons.append([
                InlineKeyboardButton(f"— {cat} —", callback_data="noop")
            ])

        rarity_emoji = RARITY_EMOJI.get(ach.rarity, "")
        icon = f"{ach.icon} " if ach.icon else ""
        label = f"{rarity_emoji} {icon}{ach.title}"
        buttons.append([InlineKeyboardButton(label, callback_data=f"ach:{ach.id}")])

    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data=back_cb)])
    return InlineKeyboardMarkup(buttons)


def achievement_detail_kb(
    achievement_id: str,
    can_claim: bool,
    back_cb: str,
) -> InlineKeyboardMarkup:
    buttons = []
    if can_claim:
        buttons.append(
            [InlineKeyboardButton("📩 Заявиться", callback_data=f"do_claim:{achievement_id}")]
        )
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data=back_cb)])
    return InlineKeyboardMarkup(buttons)


def my_claim_list_kb(claims: list[AchievementClaim]) -> InlineKeyboardMarkup:
    buttons = []
    for c in claims:
        status_emoji = {"SUBMITTED": "⏳", "APPROVED": "✅", "REJECTED": "❌", "CANCELED": "🚫"}.get(
            c.status, "?"
        )
        label = f"{status_emoji} {c.achievement.title}"
        buttons.append([InlineKeyboardButton(label, callback_data=f"myclaim:{c.id}")])
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data="back:menu")])
    return InlineKeyboardMarkup(buttons)


def my_claim_detail_kb(claim: AchievementClaim) -> InlineKeyboardMarkup:
    buttons = []
    if claim.status == "SUBMITTED":
        buttons.append(
            [InlineKeyboardButton("🚫 Отменить заявку", callback_data=f"cancel_claim:{claim.id}")]
        )
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data="menu:claims")])
    return InlineKeyboardMarkup(buttons)


def admin_claim_list_kb(claims: list[AchievementClaim]) -> InlineKeyboardMarkup:
    buttons = []
    for c in claims:
        user = c.user
        name = user.first_name or user.username or str(user.tg_user_id)
        label = f"👤 {name} → {c.achievement.title}"
        buttons.append([InlineKeyboardButton(label, callback_data=f"adm_claim:{c.id}")])
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data="back:menu")])
    return InlineKeyboardMarkup(buttons)


def admin_claim_detail_kb(claim_id: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup(
        [
            [
                InlineKeyboardButton("✅ Подтвердить", callback_data=f"approve:{claim_id}"),
                InlineKeyboardButton("❌ Отклонить", callback_data=f"reject:{claim_id}"),
            ],
            [InlineKeyboardButton("◀️ Назад", callback_data="menu:admin_claims")],
        ]
    )


def confirm_leave_kb(group_id: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("✅ Да, покинуть", callback_data=f"leave_confirm:{group_id}")],
        [InlineKeyboardButton("◀️ Отмена", callback_data="back:menu")],
    ])


def back_kb(cb: str) -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([[InlineKeyboardButton("◀️ Назад", callback_data=cb)]])


# ---------------------------------------------------------------------------
# Admin panel keyboards
# ---------------------------------------------------------------------------


def admin_panel_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [InlineKeyboardButton("📁 Категории", callback_data="adm_cat_list")],
        [InlineKeyboardButton("🏆 Ачивки", callback_data="adm_ach_list")],
        [InlineKeyboardButton("◀️ Назад", callback_data="back:menu")],
    ])


def admin_cat_list_kb(cats: list) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton(c.name, callback_data=f"adm_cat:{c.id}")]
        for c in cats
    ]
    buttons.append([InlineKeyboardButton("➕ Создать категорию", callback_data="adm_cat_new")])
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data="adm_panel")])
    return InlineKeyboardMarkup(buttons)


def admin_cat_edit_kb(cat_id) -> InlineKeyboardMarkup:
    cid = str(cat_id)
    return InlineKeyboardMarkup([
        [
            InlineKeyboardButton("✏️ Название", callback_data=f"adm_ce:{cid}:name"),
            InlineKeyboardButton("✏️ Описание", callback_data=f"adm_ce:{cid}:desc"),
        ],
        [InlineKeyboardButton("◀️ К списку", callback_data="adm_cat_list")],
    ])


def admin_ach_list_kb(achievements: list) -> InlineKeyboardMarkup:
    buttons = []
    for a in achievements:
        emoji = RARITY_EMOJI.get(a.rarity, "")
        status = "" if a.is_active else " ❌"
        label = f"{emoji} {a.title}{status}"
        buttons.append([InlineKeyboardButton(label, callback_data=f"adm_ach:{a.id}")])
    buttons.append([InlineKeyboardButton("➕ Создать ачивку", callback_data="adm_ach_new")])
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data="adm_panel")])
    return InlineKeyboardMarkup(buttons)


def admin_ach_detail_kb(ach_id, is_active: bool = True) -> InlineKeyboardMarkup:
    aid = str(ach_id)
    buttons = [
        [
            InlineKeyboardButton("✏️ Название", callback_data="adm_af:title"),
            InlineKeyboardButton("✏️ Описание", callback_data="adm_af:desc"),
        ],
        [
            InlineKeyboardButton("📁 Категория", callback_data="adm_af:category"),
            InlineKeyboardButton("⭐ Редкость", callback_data="adm_af:rarity"),
        ],
        [
            InlineKeyboardButton("🖼 Иконка", callback_data="adm_af:icon"),
            InlineKeyboardButton("💎 Очки", callback_data="adm_af:points"),
        ],
        [InlineKeyboardButton("🔗 Пресреквизиты", callback_data="adm_prereqs")],
    ]
    if is_active:
        buttons.append([InlineKeyboardButton("🗑 Деактивировать", callback_data=f"adm_deact:{aid}")])
    buttons.append([InlineKeyboardButton("◀️ Список", callback_data="adm_ach_list")])
    return InlineKeyboardMarkup(buttons)


def admin_rarity_edit_kb() -> InlineKeyboardMarkup:
    rarities = [
        ("⬜ Обычная", "COMMON"),
        ("🟩 Необычная", "UNCOMMON"),
        ("🟦 Редкая", "RARE"),
        ("🟪 Эпическая", "EPIC"),
        ("🟨 Легендарная", "LEGENDARY"),
    ]
    buttons = [[InlineKeyboardButton(label, callback_data=f"adm_set_rar:{r}")] for label, r in rarities]
    buttons.append([InlineKeyboardButton("◀️ Отмена", callback_data="adm_ach_back_detail")])
    return InlineKeyboardMarkup(buttons)


def admin_cat_select_kb(cats: list) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton(c.name, callback_data=f"adm_set_cat:{c.id}")]
        for c in cats
    ]
    buttons.append([InlineKeyboardButton("◀️ Отмена", callback_data="adm_ach_back_detail")])
    return InlineKeyboardMarkup(buttons)


def admin_prereqs_kb(ach_id, achievements: list, prereq_ids: set) -> InlineKeyboardMarkup:
    aid = str(ach_id)
    buttons = []
    for a in achievements:
        mark = "✅" if a.id in prereq_ids else "⬜"
        label = f"{mark} {a.title}"
        buttons.append([InlineKeyboardButton(label, callback_data=f"adm_tp:{a.id}")])
    buttons.append([InlineKeyboardButton("◀️ Назад", callback_data=f"adm_ach:{aid}")])
    return InlineKeyboardMarkup(buttons)


def admin_wizard_cat_kb(cats: list) -> InlineKeyboardMarkup:
    buttons = [
        [InlineKeyboardButton(c.name, callback_data=f"adm_w_cat:{c.id}")]
        for c in cats
    ]
    buttons.append([InlineKeyboardButton("❌ Отмена", callback_data="adm_w_cancel")])
    return InlineKeyboardMarkup(buttons)


def admin_wizard_rarity_kb() -> InlineKeyboardMarkup:
    rarities = [
        ("⬜ Обычная", "COMMON"),
        ("🟩 Необычная", "UNCOMMON"),
        ("🟦 Редкая", "RARE"),
        ("🟪 Эпическая", "EPIC"),
        ("🟨 Легендарная", "LEGENDARY"),
    ]
    buttons = [
        [InlineKeyboardButton(label, callback_data=f"adm_w_rarity:{r}")]
        for label, r in rarities
    ]
    buttons.append([InlineKeyboardButton("❌ Отмена", callback_data="adm_w_cancel")])
    return InlineKeyboardMarkup(buttons)


def admin_wizard_repeatable_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [
            InlineKeyboardButton("✅ Да", callback_data="adm_w_rep:yes"),
            InlineKeyboardButton("❌ Нет", callback_data="adm_w_rep:no"),
        ],
        [InlineKeyboardButton("❌ Отмена", callback_data="adm_w_cancel")],
    ])


def wizard_confirm_kb() -> InlineKeyboardMarkup:
    return InlineKeyboardMarkup([
        [
            InlineKeyboardButton("✅ Сохранить", callback_data="adm_w_confirm"),
            InlineKeyboardButton("❌ Отмена", callback_data="adm_w_cancel"),
        ]
    ])
