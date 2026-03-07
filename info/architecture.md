# Architecture — Family Achievements (C4)

## Level 1 — System Context

Actors:
- Участник (семья) — Telegram + браузер: подаёт заявки, смотрит прогресс
- Администратор — Telegram + браузер: одобряет/отклоняет заявки, регистрирует группу, управляет ачивками через веб-админку
- Telegram Bot API (внешний) — long-polling / webhook, доставка updates

## Level 2 — Containers (Docker Compose)

| Container | Технологии | Роль |
|-----------|------------|------|
| `api` | FastAPI, Uvicorn, SQLAlchemy async | REST API + раздача фронтенда на :8000 |
| `bot` | python-telegram-bot v21, long-polling | Telegram-интерфейс |
| `frontend` | Vanilla JS, Telegram WebApp SDK (статика внутри api) | Mobile SPA поверх StaticFiles |
| `db` | SQLite (dev) / PostgreSQL 15 (prod) | Единое хранилище |

## Level 3 — Components

### api container
```
app/api/app.py                  — FastAPI factory, routers + StaticFiles
app/api/routers/achievements.py — публичные REST endpoints:
    GET /api/groups
    GET /api/groups/{id}/members
    GET /api/groups/{id}/users/{uid}/tree
    GET /api/groups/{id}/tree/aggregate
    GET /api/groups/{id}/categories
app/api/routers/auth.py         — POST /api/auth  (Telegram initData → JWT)
app/api/routers/admin.py        — /api/admin/* (только для ADMIN_IDS):
    GET  /api/admin/categories
    POST /api/admin/categories
    PATCH /api/admin/categories/{code}
    GET  /api/admin/achievements
    POST /api/admin/achievements
    PATCH /api/admin/achievements/{code}
    DELETE /api/admin/achievements/{code}
    POST /api/admin/achievements/{code}/prerequisites
    DELETE /api/admin/achievements/{code}/prerequisites/{prereq_code}
app/core/security.py            — JWT: create_access_token, decode_access_token, verify_init_data
app/services/achievement_service.py — get_user_tree_graph, get_group_aggregate_tree
app/services/claim_service.py       — submit_claim, approve_claim, reject_claim
app/services/admin_service.py       — CRUD категорий и ачивок, toggle prerequisite с cycle detection
app/repos/
    group_repo.py       — CRUD групп и участников
    user_repo.py        — upsert_user
    achievement_repo.py — compute_achievement_status (ленивый расчёт, без фоновых задач)
    claim_repo.py       — заявки
    admin_repo.py       — CRUD ачивок/категорий, add/remove/check_cycle для пресреквизитов
app/models/orm.py       — все SQLAlchemy ORM-модели
```

### bot container
```
app/bot/application.py          — сборка PTB Application
app/bot/keyboards.py            — InlineKeyboardMarkup builder (иконки категорий)
app/bot/states.py               — константы состояний ConversationHandler (0–11)
app/bot/handlers/group_chat.py  — команды в групповом чате:
    /register → создаёт Group + первый ADMIN
    /join     → добавляет MEMBER
    /members  → список участников
    /web      → ссылки на веб-интерфейс
    /achievements → каталог достижений (с иконками категорий)
    /progress → прогресс участников с датой получения
    /grant    → выдать ачивку участнику (только admin, inline-кнопки)
app/bot/handlers/private_chat.py — ConversationHandler в личке (states 0–3):
    0 SELECT_GROUP       — выбор группы
    1 MAIN_MENU          — главное меню (просмотр ачивок, подача заявки)
    2 AWAIT_EVIDENCE     — ввод доказательства → submit_claim
    3 ADMIN_REJECT_INPUT — ввод причины отклонения → reject_claim
app/bot/handlers/admin_panel.py — admin ConversationHandler (states 4–11):
    4  ADMIN_PANEL       — хаб: Категории / Ачивки
    5  ADMIN_CAT_LIST    — список/деталь категории
    6  ADMIN_CAT_INPUT   — ввод текстового поля категории
    7  ADMIN_ACH_LIST    — список ачивок
    8  ADMIN_ACH_DETAIL  — деталь ачивки / inline-редактирование поля
    9  ADMIN_ACH_INPUT   — ввод текстового поля ачивки
    10 ADMIN_ACH_WIZARD  — мастер создания ачивки шаг за шагом
    11 ADMIN_ACH_PREREQS — toggle пресреквизитов с DFS cycle detection
    (управление ачивками через бота УДАЛЕНО — теперь только через веб-админку)
```

### frontend
```
frontend/index.html     — Mobile SPA (Telegram WebApp, hash-routing)
frontend/style.css      — стили
frontend/js/
    app.js  — роутер + все экраны:
        #/                          → список групп
        #/group/{id}                → ачивки группы (по категориям, с прогрессом)
        #/admin                     → хаб веб-админки (только для ADMIN_IDS)
        #/admin/categories          → список категорий
        #/admin/categories/new      → создать категорию
        #/admin/categories/:code    → редактировать категорию
        #/admin/achievements        → список ачивок
        #/admin/achievements/new    → создать ачивку
        #/admin/achievements/:code  → редактировать ачивку + пресреквизиты
    api.js  — fetch-обёртки к REST API + auth (Bearer JWT)
```

## Level 4 — Data Model

```
users ──< group_members >── groups
                                │
                    categories ─┤
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

**Подача заявки (через бота):**
Участник (Telegram) → private_chat ConversationHandler → claim_service.submit_claim() → DB
                                                        → send_message(admin.tg_user_id)

**Одобрение (через бота):**
Admin (Telegram) → private_chat ConversationHandler → claim_service.approve_claim() → DB
                                                     → send_message(user.tg_user_id)
                                                     → send_message(group.chat_id)

**Выдача ачивки напрямую (группа):**
Admin (Telegram) → /grant → grant_command → выбор участника → выбор ачивки → grant_callback → DB

**CRUD ачивок/категорий (веб-админка):**
Admin (WebApp) → POST /api/auth (initData) → JWT
              → /api/admin/* (Bearer JWT) → admin_service → admin_repo → DB

**Просмотр в браузере (участник):**
WebApp → #/group/{id} → GET /api/groups/{id}/members
       → GET /api/groups/{id}/users/{uid}/achievements → achievement_repo.compute_achievement_status()
       ← JSON список ачивок по категориям
