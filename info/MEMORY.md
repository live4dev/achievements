# Family Achievements — Project Memory

## Stack
- Python 3.12, FastAPI + Uvicorn, python-telegram-bot v21, SQLAlchemy 2.0 async, Alembic, PostgreSQL 15, Docker Compose

## Layout
```
app/
  core/        config.py, database.py, logging_config.py
  models/      orm.py  (all SQLAlchemy models)
  schemas/     achievement.py, claim.py, group.py  (Pydantic)
  repos/       user_repo, group_repo, achievement_repo, claim_repo
  services/    achievement_service, claim_service
  bot/         application.py + handlers/(group_chat, private_chat) + keyboards.py
  api/         app.py + routers/achievements.py
  seed/        achievements.yaml + import_achievements.py
alembic/       env.py, versions/001_initial.py
main.py        asyncio.run — bot + uvicorn share one event loop
```

## Key design decisions
- Status computed lazily: `compute_achievement_status()` in `achievement_repo.py` — no background jobs.
- Approve flow: DB transaction in service → bot handler sends Telegram notifications after commit.
- Bot state: `context.user_data` holds `group_id`, `user_id`, `is_admin`, temporary claim flow keys.
- ConversationHandler states: SELECT_GROUP, MAIN_MENU, AWAIT_EVIDENCE, ADMIN_REJECT_INPUT.
- Seed import: `python -m app.seed.import_achievements`; does topo-sort to detect cycles before writing.

## Run locally
```bash
cp .env.example .env  # fill BOT_TOKEN
docker compose up -d postgres
alembic upgrade head
python -m app.seed.import_achievements
python main.py
```

## API endpoints
- GET /api/groups → list[GroupDirectoryItem] (id, title, member_count)
- GET /api/groups/{group_id}/users/{user_id}/tree → TreeResponse (graph format: nodes+edges+user_state dict)
- GET /api/groups/{group_id}/users/{user_id}/achievements?status=... → list[AchievementTreeNode] (bot/old API)
- GET /api/groups/{group_id}/categories → list[CategoryOut]
- GET /api/groups/{group_id}/members → MembersResponse
- GET /api/groups/{group_id}/tree/aggregate → AggregateTreeResponse

## Architecture
- Full C4 description (context, containers, components, data model, key flows): see memory/architecture.md

## Schemas
- app/schemas/tree.py — TreeResponse, AggregateTreeResponse, MembersResponse, GroupInfo, UserInfo, AchievementNode, EdgeOut, UserStateValue, AggregateStateValue, MemberOut

## Frontend (vanilla JS, no build)
- frontend/ served as StaticFiles by FastAPI (app/api/app.py)
- Cytoscape.js + cytoscape-dagre from CDN (jsDelivr)
- frontend/js/: api.js, graph.js, filters.js, detail.js, app.js, directory.js
- URL params: ?group=UUID &user=UUID &mode=participant|aggregate &focus=code
- frontend/directory.html — каталог групп + участников, ведёт на /?group=&user=
- Open http://localhost:8000 to use, http://localhost:8000/directory.html for group browser
