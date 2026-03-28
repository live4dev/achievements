"""Add auto_grant to achievements

Revision ID: 005
Revises: 004
Create Date: 2026-03-28 00:00:00.000000

"""
from typing import Sequence, Union

import sqlalchemy as sa
from alembic import op

revision: str = "005"
down_revision: Union[str, None] = "004"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("achievements") as batch_op:
        batch_op.add_column(
            sa.Column("auto_grant", sa.Boolean(), nullable=False, server_default=sa.false())
        )


def downgrade() -> None:
    with op.batch_alter_table("achievements") as batch_op:
        batch_op.drop_column("auto_grant")
