"""Shared ConversationHandler state constants."""

(
    SELECT_GROUP,        # 0 – pick a group
    MAIN_MENU,           # 1 – main menu (callback routing)
    AWAIT_EVIDENCE,      # 2 – user typing claim evidence
    ADMIN_REJECT_INPUT,  # 3 – admin typing rejection reason
    ADMIN_PANEL,         # 4 – admin hub: Categories / Achievements
    ADMIN_CAT_LIST,      # 5 – category list / detail (callback routing)
    ADMIN_CAT_INPUT,     # 6 – text input for category field
    ADMIN_ACH_LIST,      # 7 – achievement list (callback routing)
    ADMIN_ACH_DETAIL,    # 8 – achievement detail / inline field edit
    ADMIN_ACH_INPUT,     # 9 – text input for achievement field
    ADMIN_ACH_WIZARD,    # 10 – step-by-step new achievement creation
    ADMIN_ACH_PREREQS,   # 11 – prerequisite toggle
) = range(12)
