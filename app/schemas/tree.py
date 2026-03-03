import uuid
from typing import Literal

from pydantic import BaseModel

from app.schemas.achievement import CategoryOut


class GroupInfo(BaseModel):
    id: uuid.UUID
    title: str

    model_config = {"from_attributes": True}


class UserInfo(BaseModel):
    id: uuid.UUID
    display_name: str


class AchievementNode(BaseModel):
    id: uuid.UUID
    code: str
    title: str
    description: str
    category_code: str | None
    rarity: str
    repeatable: bool
    max_level: int | None
    icon: str | None
    sort_order: int
    points: int | None


class EdgeOut(BaseModel):
    from_code: str
    to_code: str
    min_level: int


class UserStateValue(BaseModel):
    status: Literal["LOCKED", "AVAILABLE", "ACHIEVED"]
    level: int
    achieved_at: str | None


class TreeResponse(BaseModel):
    group: GroupInfo
    user: UserInfo
    categories: list[CategoryOut]
    achievements: list[AchievementNode]
    edges: list[EdgeOut]
    user_state: dict[str, UserStateValue]  # keyed by achievement code


class MemberOut(BaseModel):
    user_id: uuid.UUID
    display_name: str
    role: str


class MembersResponse(BaseModel):
    members: list[MemberOut]


class AggregateStateValue(BaseModel):
    achieved_count: int
    available_count: int
    locked_count: int
    total: int


class AggregateTreeResponse(BaseModel):
    group: GroupInfo
    categories: list[CategoryOut]
    achievements: list[AchievementNode]
    edges: list[EdgeOut]
    aggregate_state: dict[str, AggregateStateValue]  # keyed by achievement code


class GroupDirectoryItem(BaseModel):
    id: uuid.UUID
    title: str
    member_count: int
