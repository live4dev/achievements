import uuid
from typing import Literal

from pydantic import BaseModel


class CategoryOut(BaseModel):
    id: uuid.UUID
    code: str
    name: str
    description: str | None
    icon: str | None = None
    parent_id: uuid.UUID | None

    model_config = {"from_attributes": True}


class AchievementOut(BaseModel):
    id: uuid.UUID
    code: str
    title: str
    description: str
    category_id: uuid.UUID
    category_name: str | None = None
    category_icon: str | None = None
    rarity: str
    repeatable: bool
    max_level: int | None
    icon: str | None
    points: int | None
    is_active: bool
    sort_order: int
    auto_grant: bool = False
    burnable: bool = False
    required_count: int | None = None
    period_days: int | None = None

    model_config = {"from_attributes": True}


class PrerequisiteOut(BaseModel):
    prereq_achievement_id: uuid.UUID
    min_level: int

    model_config = {"from_attributes": True}


class UserAchievementState(BaseModel):
    level: int
    status: Literal["LOCKED", "AVAILABLE", "ACHIEVED"]
    achieved_at: str | None
    burnable_progress: int = 0
    period_expires_at: str | None = None


class AchievementTreeNode(BaseModel):
    achievement: AchievementOut
    prerequisites: list[PrerequisiteOut]
    user_state: UserAchievementState
