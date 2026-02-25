"""
Truncate database tables.

Usage:
    python -m app.seed.clean_db              # interactive prompt
    python -m app.seed.clean_db --seed       # categories + achievements + prerequisites
    python -m app.seed.clean_db --users      # users, groups, members, claims, events, progress
    python -m app.seed.clean_db --all        # everything
    python -m app.seed.clean_db --all --yes  # skip confirmation
"""

import argparse
import asyncio
import logging
import sys
from pathlib import Path

from sqlalchemy import text
from sqlalchemy.ext.asyncio import AsyncSession

sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from app.core.database import async_session_factory  # noqa: E402
from app.core.logging_config import setup_logging  # noqa: E402

logger = logging.getLogger(__name__)

# Tables in safe truncation order (children before parents)
SEED_TABLES = [
    "achievement_prerequisites",
    "achievements",
    "categories",
]

USER_TABLES = [
    "achievement_events",
    "achievement_claims",
    "group_user_achievements",
    "group_members",
    "groups",
    "users",
]

ALL_TABLES = USER_TABLES + SEED_TABLES


async def _truncate(session: AsyncSession, tables: list[str]) -> None:
    for table in tables:
        await session.execute(text(f"DELETE FROM {table}"))
        logger.info("Cleared: %s", table)


async def run(tables: list[str]) -> None:
    setup_logging(debug=False)
    async with async_session_factory() as session:
        async with session.begin():
            await _truncate(session, tables)
    logger.info("✅ Done. Truncated %d table(s).", len(tables))


def _confirm(tables: list[str]) -> bool:
    print("Tables to be truncated:")
    for t in tables:
        print(f"  - {t}")
    answer = input("Proceed? [y/N] ").strip().lower()
    return answer == "y"


def main() -> None:
    parser = argparse.ArgumentParser(description="Truncate database tables")
    group = parser.add_mutually_exclusive_group()
    group.add_argument("--seed", action="store_true", help="Truncate seed data (categories + achievements)")
    group.add_argument("--users", action="store_true", help="Truncate user/group/claim data")
    group.add_argument("--all", dest="all_", action="store_true", help="Truncate all tables")
    parser.add_argument("--yes", "-y", action="store_true", help="Skip confirmation prompt")
    args = parser.parse_args()

    if args.seed:
        tables = SEED_TABLES
    elif args.users:
        tables = USER_TABLES
    elif args.all_:
        tables = ALL_TABLES
    else:
        parser.print_help()
        sys.exit(0)

    if not args.yes and not _confirm(tables):
        print("Aborted.")
        sys.exit(0)

    asyncio.run(run(tables))


if __name__ == "__main__":
    main()
