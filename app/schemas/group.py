import uuid
from datetime import datetime

from pydantic import BaseModel


class GroupOut(BaseModel):
    id: uuid.UUID
    title: str
    telegram_chat_id: int | None
    created_at: datetime

    model_config = {"from_attributes": True}


class GroupMemberOut(BaseModel):
    group_id: uuid.UUID
    user_id: uuid.UUID
    role: str
    status: str
    joined_at: datetime

    model_config = {"from_attributes": True}
