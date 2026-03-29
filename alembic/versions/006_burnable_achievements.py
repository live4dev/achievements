"""Burnable achievements support

Revision ID: 006
Revises: 005
Create Date: 2026-03-28 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "006"
down_revision: Union[str, None] = "005"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

_NEW_EVENT_TYPES = (
    "event_type IN ("
    "'CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED',"
    "'LEVEL_INCREMENT','ADMIN_GRANTED','BURNABLE_PROGRESS','BURNABLE_RESET'"
    ")"
)

_OLD_EVENT_TYPES = (
    "event_type IN ("
    "'CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED',"
    "'LEVEL_INCREMENT','ADMIN_GRANTED'"
    ")"
)


def _existing_columns(table: str) -> set[str]:
    bind = op.get_bind()
    inspector = sa.inspect(bind)
    return {col["name"] for col in inspector.get_columns(table)}


def upgrade() -> None:
    # ── achievements ──────────────────────────────────────────────────────────
    ach_cols = _existing_columns("achievements")
    if "burnable" not in ach_cols:
        op.add_column(
            "achievements",
            sa.Column("burnable", sa.Boolean(), nullable=False, server_default=sa.false()),
        )
    if "required_count" not in ach_cols:
        op.add_column(
            "achievements",
            sa.Column("required_count", sa.Integer(), nullable=True),
        )
    if "period_days" not in ach_cols:
        op.add_column(
            "achievements",
            sa.Column("period_days", sa.Integer(), nullable=True),
        )

    # ── group_user_achievements ───────────────────────────────────────────────
    gua_cols = _existing_columns("group_user_achievements")
    if "burnable_progress" not in gua_cols:
        op.add_column(
            "group_user_achievements",
            sa.Column(
                "burnable_progress", sa.Integer(), nullable=False, server_default=sa.text("0")
            ),
        )
    if "period_start" not in gua_cols:
        op.add_column(
            "group_user_achievements",
            sa.Column("period_start", sa.DateTime(timezone=True), nullable=True),
        )

    # ── achievement_events: extend allowed event_type values ──────────────────
    with op.batch_alter_table("achievement_events") as batch_op:
        batch_op.drop_constraint("ck_event_type", type_="check")
        batch_op.create_check_constraint("ck_event_type", _NEW_EVENT_TYPES)


def downgrade() -> None:
    # Restore narrow event type constraint
    with op.batch_alter_table("achievement_events") as batch_op:
        batch_op.drop_constraint("ck_event_type", type_="check")
        batch_op.create_check_constraint("ck_event_type", _OLD_EVENT_TYPES)

    op.drop_column("group_user_achievements", "period_start")
    op.drop_column("group_user_achievements", "burnable_progress")

    op.drop_column("achievements", "period_days")
    op.drop_column("achievements", "required_count")
    op.drop_column("achievements", "burnable")
