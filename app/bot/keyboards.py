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
