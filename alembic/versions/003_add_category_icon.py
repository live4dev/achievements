"""Add icon column to categories

Revision ID: 003
Revises: 002
Create Date: 2026-03-07 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "003"
down_revision: Union[str, None] = "002"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("categories") as batch_op:
        batch_op.add_column(sa.Column("icon", sa.Text(), nullable=True))


def downgrade() -> None:
    with op.batch_alter_table("categories") as batch_op:
        batch_op.drop_column("icon")
