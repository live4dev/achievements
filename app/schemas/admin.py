import uuid

from pydantic import BaseModel


# ── Categories ────────────────────────────────────────────────

class CategoryCreate(BaseModel):
    code: str
    name: str
    description: str | None = None
    icon: str | None = None


class CategoryUpdate(BaseModel):
    name: str | None = None
    description: str | None = None
    icon: str | None = None


class CategoryAdminOut(BaseModel):
    id: uuid.UUID
    code: str
    name: str
    description: str | None
    icon: str | None = None

    model_config = {"from_attributes": True}


# ── Achievements ──────────────────────────────────────────────

class AchievementCreate(BaseModel):
    code: str
    title: str
    description: str
    category_code: str
    rarity: str
    repeatable: bool = False
    max_level: int | None = None
    cooldown_hours: int | None = None
    icon: str | None = None
    points: int | None = None
    sort_order: int = 0
    auto_grant: bool = False
    burnable: bool = False
    required_count: int | None = None
    period_days: int | None = None


class AchievementUpdate(BaseModel):
    title: str | None = None
    description: str | None = None
    category_code: str | None = None
    rarity: str | None = None
    repeatable: bool | None = None
    max_level: int | None = None
    cooldown_hours: int | None = None
    icon: str | None = None
    points: int | None = None
    sort_order: int | None = None
    is_active: bool | None = None
    auto_grant: bool | None = None
    burnable: bool | None = None
    required_count: int | None = None
    period_days: int | None = None


class PrereqOut(BaseModel):
    prereq_code: str
    prereq_title: str
    min_level: int


class AchievementAdminOut(BaseModel):
    id: uuid.UUID
    code: str
    title: str
    description: str
    category_code: str | None
    rarity: str
    repeatable: bool
    max_level: int | None
    cooldown_hours: int | None = None
    icon: str | None
    points: int | None
    sort_order: int
    is_active: bool
    auto_grant: bool = False
    burnable: bool = False
    required_count: int | None = None
    period_days: int | None = None
    prerequisites: list[PrereqOut] = []

    model_config = {"from_attributes": True}


# ── Prerequisites ─────────────────────────────────────────────

class PrerequisiteAdd(BaseModel):
    prereq_code: str
    min_level: int = 1
