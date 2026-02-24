"""Initial schema

Revision ID: 001
Revises:
Create Date: 2024-01-01 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "001"
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    # ── users ──────────────────────────────────────────────────────────────
    op.create_table(
        "users",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("tg_user_id", sa.BigInteger(), nullable=False),
        sa.Column("username", sa.Text(), nullable=True),
        sa.Column("first_name", sa.Text(), nullable=True),
        sa.Column("last_name", sa.Text(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("tg_user_id"),
    )

    # ── groups ─────────────────────────────────────────────────────────────
    op.create_table(
        "groups",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("telegram_chat_id", sa.BigInteger(), nullable=True),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column(
            "settings",
            sa.JSON(),
            server_default=sa.text("'{}'"),
            nullable=False,
        ),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("telegram_chat_id"),
    )

    # ── group_members ──────────────────────────────────────────────────────
    op.create_table(
        "group_members",
        sa.Column("group_id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("role", sa.String(length=20), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column(
            "joined_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.CheckConstraint("role IN ('ADMIN','MEMBER')", name="ck_gm_role"),
        sa.CheckConstraint("status IN ('ACTIVE','LEFT','BANNED')", name="ck_gm_status"),
        sa.ForeignKeyConstraint(["group_id"], ["groups.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("group_id", "user_id"),
    )

    # ── categories ─────────────────────────────────────────────────────────
    op.create_table(
        "categories",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("code", sa.Text(), nullable=False),
        sa.Column("name", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("parent_id", sa.Uuid(), nullable=True),
        sa.ForeignKeyConstraint(["parent_id"], ["categories.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("code"),
    )

    # ── achievements ───────────────────────────────────────────────────────
    op.create_table(
        "achievements",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("code", sa.Text(), nullable=False),
        sa.Column("title", sa.Text(), nullable=False),
        sa.Column("description", sa.Text(), nullable=False),
        sa.Column("category_id", sa.Uuid(), nullable=False),
        sa.Column("rarity", sa.String(length=20), nullable=False),
        sa.Column("repeatable", sa.Boolean(), nullable=False),
        sa.Column("max_level", sa.Integer(), nullable=True),
        sa.Column("icon", sa.Text(), nullable=True),
        sa.Column("points", sa.Integer(), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False),
        sa.Column("sort_order", sa.Integer(), nullable=False),
        sa.CheckConstraint(
            "rarity IN ('COMMON','UNCOMMON','RARE','EPIC','LEGENDARY')",
            name="ck_ach_rarity",
        ),
        sa.ForeignKeyConstraint(["category_id"], ["categories.id"]),
        sa.PrimaryKeyConstraint("id"),
        sa.UniqueConstraint("code"),
    )

    # ── achievement_prerequisites ───────────────────────────────────────────
    op.create_table(
        "achievement_prerequisites",
        sa.Column("achievement_id", sa.Uuid(), nullable=False),
        sa.Column("prereq_achievement_id", sa.Uuid(), nullable=False),
        sa.Column("min_level", sa.Integer(), nullable=False, server_default="1"),
        sa.CheckConstraint(
            "achievement_id != prereq_achievement_id", name="ck_prereq_no_self"
        ),
        sa.ForeignKeyConstraint(
            ["achievement_id"], ["achievements.id"], ondelete="CASCADE"
        ),
        sa.ForeignKeyConstraint(
            ["prereq_achievement_id"], ["achievements.id"], ondelete="CASCADE"
        ),
        sa.PrimaryKeyConstraint("achievement_id", "prereq_achievement_id"),
    )
    op.create_index(
        "ix_prereq_achievement_id",
        "achievement_prerequisites",
        ["achievement_id"],
    )

    # ── group_user_achievements ─────────────────────────────────────────────
    op.create_table(
        "group_user_achievements",
        sa.Column("group_id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("achievement_id", sa.Uuid(), nullable=False),
        sa.Column("level", sa.Integer(), nullable=False, server_default="0"),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column("achieved_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column(
            "updated_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "status IN ('LOCKED','AVAILABLE','ACHIEVED')", name="ck_gua_status"
        ),
        sa.ForeignKeyConstraint(["achievement_id"], ["achievements.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["group_id"], ["groups.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("group_id", "user_id", "achievement_id"),
    )
    op.create_index(
        "ix_gua_group_user_status",
        "group_user_achievements",
        ["group_id", "user_id", "status"],
    )

    # ── achievement_claims ──────────────────────────────────────────────────
    op.create_table(
        "achievement_claims",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("group_id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("achievement_id", sa.Uuid(), nullable=False),
        sa.Column("status", sa.String(length=20), nullable=False),
        sa.Column(
            "evidence",
            sa.JSON(),
            server_default=sa.text("'{}'"),
            nullable=False,
        ),
        sa.Column("comment", sa.Text(), nullable=True),
        sa.Column(
            "submitted_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.Column("reviewed_at", sa.DateTime(timezone=True), nullable=True),
        sa.Column("reviewed_by_user_id", sa.Uuid(), nullable=True),
        sa.CheckConstraint(
            "status IN ('SUBMITTED','APPROVED','REJECTED','CANCELED')",
            name="ck_claim_status",
        ),
        sa.ForeignKeyConstraint(["achievement_id"], ["achievements.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["group_id"], ["groups.id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["reviewed_by_user_id"], ["users.id"]),
        sa.ForeignKeyConstraint(["user_id"], ["users.id"], ondelete="CASCADE"),
        sa.PrimaryKeyConstraint("id"),
    )
    op.create_index(
        "ix_claim_group_status_submitted",
        "achievement_claims",
        ["group_id", "status", "submitted_at"],
    )

    # ── achievement_events ──────────────────────────────────────────────────
    op.create_table(
        "achievement_events",
        sa.Column("id", sa.Uuid(), nullable=False),
        sa.Column("group_id", sa.Uuid(), nullable=False),
        sa.Column("user_id", sa.Uuid(), nullable=False),
        sa.Column("achievement_id", sa.Uuid(), nullable=False),
        sa.Column("event_type", sa.String(length=50), nullable=False),
        sa.Column(
            "payload",
            sa.JSON(),
            server_default=sa.text("'{}'"),
            nullable=False,
        ),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("CURRENT_TIMESTAMP"),
            nullable=False,
        ),
        sa.CheckConstraint(
            "event_type IN ('CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED','LEVEL_INCREMENT')",
            name="ck_event_type",
        ),
        sa.PrimaryKeyConstraint("id"),
    )


def downgrade() -> None:
    op.drop_table("achievement_events")
    op.drop_index("ix_claim_group_status_submitted", table_name="achievement_claims")
    op.drop_table("achievement_claims")
    op.drop_index("ix_gua_group_user_status", table_name="group_user_achievements")
    op.drop_table("group_user_achievements")
    op.drop_index("ix_prereq_achievement_id", table_name="achievement_prerequisites")
    op.drop_table("achievement_prerequisites")
    op.drop_table("achievements")
    op.drop_table("categories")
    op.drop_table("group_members")
    op.drop_table("groups")
    op.drop_table("users")
