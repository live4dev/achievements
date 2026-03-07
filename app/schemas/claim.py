import uuid
from datetime import datetime

from pydantic import BaseModel


class ClaimOut(BaseModel):
    id: uuid.UUID
    group_id: uuid.UUID
    user_id: uuid.UUID
    achievement_id: uuid.UUID
    status: str
    evidence: dict
    comment: str | None
    submitted_at: datetime
    reviewed_at: datetime | None

    model_config = {"from_attributes": True}


class ClaimCreate(BaseModel):
    achievement_id: uuid.UUID
    evidence: dict = {}


class WebClaimCreate(BaseModel):
    achievement_code: str
    evidence_text: str | None = None


class WebClaimOut(BaseModel):
    id: uuid.UUID
    achievement_code: str
    achievement_title: str
    status: str
    submitted_at: str
    comment: str | None = None
