"""
Seed / import achievements and categories from YAML.

Usage:
    python -m app.seed.import_achievements
    python -m app.seed.import_achievements --file path/to/custom.yaml
"""

import argparse
import asyncio
import logging
import os
import sys
from pathlib import Path

import yaml
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

# Make sure the project root is on sys.path when run as __main__
sys.path.insert(0, str(Path(__file__).resolve().parents[2]))

from app.core.database import async_session_factory  # noqa: E402
from app.core.logging_config import setup_logging  # noqa: E402
from app.models.orm import Achievement, AchievementPrerequisite, Category  # noqa: E402

logger = logging.getLogger(__name__)

DEFAULT_YAML = Path(__file__).parent / "achievements.yaml"


# ---------------------------------------------------------------------------
# Topology check (detect cycles)
# ---------------------------------------------------------------------------


def _topo_sort(nodes: list[str], edges: dict[str, list[str]]) -> list[str]:
    """
    Kahn's algorithm.  Raises ValueError if a cycle is detected.
    nodes  – list of achievement codes
    edges  – {code: [prereq_codes]}
    Returns topologically sorted list.
    """
    in_degree: dict[str, int] = {n: 0 for n in nodes}
    dependents: dict[str, list[str]] = {n: [] for n in nodes}

    for node, prereqs in edges.items():
        for p in prereqs:
            in_degree[node] += 1
            dependents[p].append(node)

    queue = [n for n in nodes if in_degree[n] == 0]
    result = []
    while queue:
        n = queue.pop()
        result.append(n)
        for dep in dependents[n]:
            in_degree[dep] -= 1
            if in_degree[dep] == 0:
                queue.append(dep)

    if len(result) != len(nodes):
        cycle_nodes = [n for n in nodes if n not in result]
        raise ValueError(f"Cycle detected among achievements: {cycle_nodes}")

    return result


# ---------------------------------------------------------------------------
# Main import logic
# ---------------------------------------------------------------------------


async def _import(session: AsyncSession, data: dict) -> None:
    # ── Categories ──────────────────────────────────────────────────────────
    cat_by_code: dict[str, Category] = {}
    for c in data.get("categories", []):
        result = await session.execute(
            select(Category).where(Category.code == c["code"])
        )
        cat = result.scalar_one_or_none()
        if cat is None:
            cat = Category(code=c["code"], name=c["name"])
            session.add(cat)
        cat.name = c["name"]
        cat.description = c.get("description")
        cat.icon = c.get("icon")
        await session.flush()
        cat_by_code[cat.code] = cat

    logger.info("Categories upserted: %d", len(cat_by_code))

    # ── Achievements (first pass: upsert without prerequisites) ─────────────
    ach_by_code: dict[str, Achievement] = {}
    raw_achivements = data.get("achievements", [])

    # Topology check
    codes = [a["code"] for a in raw_achivements]
    edges: dict[str, list[str]] = {}
    for a in raw_achivements:
        edges[a["code"]] = [p["code"] for p in a.get("prerequisites", [])]
    _topo_sort(codes, edges)  # raises if cycle

    for a in raw_achivements:
        result = await session.execute(
            select(Achievement).where(Achievement.code == a["code"])
        )
        ach = result.scalar_one_or_none()
        cat = cat_by_code.get(a["category"])
        if cat is None:
            raise ValueError(f"Category '{a['category']}' not found for achievement '{a['code']}'")

        if ach is None:
            ach = Achievement(code=a["code"], category_id=cat.id)
            session.add(ach)

        ach.title = a["title"]
        ach.description = a["description"]
        ach.category_id = cat.id
        ach.rarity = a["rarity"]
        ach.repeatable = a.get("repeatable", False)
        ach.max_level = a.get("max_level")
        ach.cooldown_hours = a.get("cooldown_hours")
        ach.icon = a.get("icon")
        ach.points = a.get("points")
        ach.is_active = a.get("is_active", True)
        ach.sort_order = a.get("sort_order", 0)
        ach.auto_grant = a.get("auto_grant", False)
        ach.burnable = a.get("burnable", False)
        ach.required_count = a.get("required_count")
        ach.period_days = a.get("period_days")

        await session.flush()
        ach_by_code[ach.code] = ach

    logger.info("Achievements upserted: %d", len(ach_by_code))

    # ── Prerequisites (second pass) ─────────────────────────────────────────
    prereq_count = 0
    for a in raw_achivements:
        ach = ach_by_code[a["code"]]
        for p in a.get("prerequisites", []):
            prereq_ach = ach_by_code.get(p["code"])
            if prereq_ach is None:
                raise ValueError(
                    f"Prerequisite code '{p['code']}' not found "
                    f"(referenced by '{a['code']}')"
                )
            result = await session.execute(
                select(AchievementPrerequisite).where(
                    AchievementPrerequisite.achievement_id == ach.id,
                    AchievementPrerequisite.prereq_achievement_id == prereq_ach.id,
                )
            )
            existing = result.scalar_one_or_none()
            if existing is None:
                existing = AchievementPrerequisite(
                    achievement_id=ach.id,
                    prereq_achievement_id=prereq_ach.id,
                    min_level=p.get("min_level", 1),
                )
                session.add(existing)
            else:
                existing.min_level = p.get("min_level", 1)
            prereq_count += 1

    await session.flush()
    logger.info("Prerequisites upserted: %d", prereq_count)


async def run(yaml_path: Path) -> None:
    setup_logging(debug=False)
    logger.info("Loading %s", yaml_path)

    with open(yaml_path, encoding="utf-8") as f:
        data = yaml.safe_load(f)

    async with async_session_factory() as session:
        async with session.begin():
            await _import(session, data)

    logger.info("✅ Import complete.")


def main() -> None:
    parser = argparse.ArgumentParser(description="Import achievements from YAML")
    parser.add_argument(
        "--file",
        default=str(DEFAULT_YAML),
        help="Path to YAML file (default: app/seed/achievements.yaml)",
    )
    args = parser.parse_args()
    asyncio.run(run(Path(args.file)))


if __name__ == "__main__":
    main()
