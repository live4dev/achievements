"""Add cooldown_hours to achievements

Revision ID: 004
Revises: 003
Create Date: 2026-03-07 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "004"
down_revision: Union[str, None] = "003"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("achievements") as batch_op:
        batch_op.add_column(sa.Column("cooldown_hours", sa.Integer(), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table("achievements") as batch_op:
        batch_op.drop_column("cooldown_hours")
