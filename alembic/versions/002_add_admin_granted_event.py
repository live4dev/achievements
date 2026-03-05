"""Add ADMIN_GRANTED to ck_event_type constraint

Revision ID: 002
Revises: 001
Create Date: 2026-03-05 00:00:00.000000

"""
from typing import Sequence, Union

from alembic import op

revision: str = "002"
down_revision: Union[str, None] = "001"
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    with op.batch_alter_table("achievement_events", recreate="always") as batch_op:
        batch_op.drop_constraint("ck_event_type", type_="check")
        batch_op.create_check_constraint(
            "ck_event_type",
            "event_type IN ('CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED','LEVEL_INCREMENT','ADMIN_GRANTED')",
        )


def downgrade() -> None:
    with op.batch_alter_table("achievement_events", recreate="always") as batch_op:
        batch_op.drop_constraint("ck_event_type", type_="check")
        batch_op.create_check_constraint(
            "ck_event_type",
            "event_type IN ('CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED','LEVEL_INCREMENT')",
        )
