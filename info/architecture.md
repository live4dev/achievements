# Architecture — Family Achievements (C4)

## Level 1 — System Context

Actors:
- Участник (семья) — Telegram + браузер: подаёт заявки, смотрит прогресс
- Администратор — Telegram + браузер: одобряет/отклоняет заявки, регистрирует группу
- Telegram Bot API (внешний) — long-polling / webhook, доставка updates

## Level 2 — Containers (Docker Compose)

| Container | Команда | Технологии | Роль |
|-----------|---------|------------|------|
| `api` | `alembic upgrade head && python web.py` | FastAPI, Uvicorn, SQLAlchemy async | REST API + раздача фронтенда на :8000 |
| `bot` | `python bot.py` | python-telegram-bot v21, long-polling | Telegram-интерфейс |
| `frontend` | (статика внутри api) | Vanilla JS, Cytoscape.js | SPA поверх StaticFiles |
| `db` | — | SQLite (dev) / PostgreSQL 15 (prod) | Единое хранилище |

bot зависит от api (depends_on). Оба читают БД напрямую через SQLAlchemy.

## Level 3 — Components

### api container
```
app/api/app.py              — FastAPI factory, router + StaticFiles
app/api/routers/achievements.py — REST endpoints:
    GET /api/groups
    GET /api/groups/{id}/members
    GET /api/groups/{id}/users/{uid}/tree
    GET /api/groups/{id}/tree/aggregate
    GET /api/groups/{id}/categories
app/services/achievement_service.py — get_user_tree_graph, get_group_aggregate_tree
app/services/claim_service.py       — submit_claim, approve_claim, reject_claim
app/repos/
    group_repo.py       — CRUD групп и участников
    user_repo.py        — upsert_user
    achievement_repo.py — compute_achievement_status (ленивый расчёт, без фоновых задач)
    claim_repo.py       — заявки
app/models/orm.py       — все SQLAlchemy ORM-модели
```

### bot container
```
app/bot/application.py          — сборка PTB Application
app/bot/keyboards.py            — InlineKeyboardMarkup builder
app/bot/handlers/group_chat.py  — команды в групповом чате:
    /register → создаёт Group + первый ADMIN
    /join     → добавляет MEMBER
    /members  → список участников
    /web      → ссылки на веб-интерфейс
    /achievements → каталог достижений
app/bot/handlers/private_chat.py — ConversationHandler в личке:
    ConversationHandler states: SELECT_GROUP, MAIN_MENU, AWAIT_EVIDENCE, ADMIN_REJECT_INPUT
    /start → выбор группы → MAIN_MENU
    MAIN_MENU → просмотр ачивок, подача заявки (AWAIT_EVIDENCE)
    AWAIT_EVIDENCE → ввод доказательства → submit_claim
    ADMIN_REJECT_INPUT → ввод причины → reject_claim
```

### frontend
```
frontend/index.html     — SPA оболочка (URL-param routing: ?group=&user=&mode=&focus=)
frontend/directory.html — каталог групп → участники
frontend/style.css      — dark-theme, CSS variables
frontend/js/
    app.js          — оркестратор: URL-params, state, навигация
    api.js          — fetch-обёртки (fetchTree, fetchMembers, fetchAggregate)
    graph.js        — Cytoscape.js: рендер нод, рёбер, стилей
    filters.js      — фильтрация по категории / редкости / статусу
    detail.js       — правая панель: детали ачивки
    directory.js    — загрузка групп, участников, навигация
```

## Level 4 — Data Model

```
users ──< group_members >── groups
                                │
                    achievements >─< achievement_prerequisites (DAG)
                                │
            group_user_achievements   ← прогресс (LOCKED/AVAILABLE/ACHIEVED)
                                │
                    achievement_claims   ← заявки (SUBMITTED→APPROVED/REJECTED)
                                │
                    achievement_events  ← audit log
```

## Ключевые потоки

**Подача заявки:**
Участник (Telegram) → bot → claim_service.submit_claim() → DB
                          → send_message(admin.tg_user_id)

**Одобрение:**
Admin (Telegram) → bot → claim_service.approve_claim() → DB
                       → send_message(user.tg_user_id)
                       → send_message(group.chat_id)

**Просмотр в браузере:**
Браузер → GET /api/groups/{id}/users/{uid}/tree
        → achievement_service.get_user_tree_graph()
        → achievement_repo.compute_achievement_status() ← lazy, без фоновых задач
        ← JSON (nodes + edges + user_state)
        → Cytoscape.js рендер
