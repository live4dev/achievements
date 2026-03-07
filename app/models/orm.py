import uuid
from datetime import datetime

from sqlalchemy import (
    BigInteger,
    Boolean,
    CheckConstraint,
    DateTime,
    ForeignKey,
    Index,
    Integer,
    JSON,
    String,
    Text,
    Uuid,
    func,
)
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, relationship


def _uuid() -> uuid.UUID:
    return uuid.uuid4()


class Base(DeclarativeBase):
    pass


# ---------------------------------------------------------------------------
# Users
# ---------------------------------------------------------------------------


class User(Base):
    __tablename__ = "users"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    tg_user_id: Mapped[int] = mapped_column(BigInteger, unique=True, nullable=False)
    username: Mapped[str | None] = mapped_column(Text, nullable=True)
    first_name: Mapped[str | None] = mapped_column(Text, nullable=True)
    last_name: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    group_memberships: Mapped[list["GroupMember"]] = relationship(back_populates="user")
    claims: Mapped[list["AchievementClaim"]] = relationship(
        foreign_keys="AchievementClaim.user_id", back_populates="user"
    )


# ---------------------------------------------------------------------------
# Groups
# ---------------------------------------------------------------------------


class Group(Base):
    __tablename__ = "groups"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    title: Mapped[str] = mapped_column(Text, nullable=False)
    telegram_chat_id: Mapped[int | None] = mapped_column(
        BigInteger, unique=True, nullable=True
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    settings: Mapped[dict] = mapped_column(
        JSON, nullable=False, server_default="{}"
    )

    members: Mapped[list["GroupMember"]] = relationship(back_populates="group")
    user_achievements: Mapped[list["GroupUserAchievement"]] = relationship(
        back_populates="group"
    )
    claims: Mapped[list["AchievementClaim"]] = relationship(back_populates="group")


class GroupMember(Base):
    __tablename__ = "group_members"
    __table_args__ = (
        CheckConstraint("role IN ('ADMIN','MEMBER')", name="ck_gm_role"),
        CheckConstraint("status IN ('ACTIVE','LEFT','BANNED')", name="ck_gm_status"),
    )

    group_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("groups.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    role: Mapped[str] = mapped_column(String(20), nullable=False)
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="ACTIVE")
    joined_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    group: Mapped["Group"] = relationship(back_populates="members")
    user: Mapped["User"] = relationship(back_populates="group_memberships")


# ---------------------------------------------------------------------------
# Categories
# ---------------------------------------------------------------------------


class Category(Base):
    __tablename__ = "categories"

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    code: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    name: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    icon: Mapped[str | None] = mapped_column(Text, nullable=True)
    parent_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("categories.id"), nullable=True
    )

    parent: Mapped["Category | None"] = relationship(
        back_populates="children", remote_side="Category.id"
    )
    children: Mapped[list["Category"]] = relationship(back_populates="parent")
    achievements: Mapped[list["Achievement"]] = relationship(back_populates="category")


# ---------------------------------------------------------------------------
# Achievements
# ---------------------------------------------------------------------------


class Achievement(Base):
    __tablename__ = "achievements"
    __table_args__ = (
        CheckConstraint(
            "rarity IN ('COMMON','UNCOMMON','RARE','EPIC','LEGENDARY')",
            name="ck_ach_rarity",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    code: Mapped[str] = mapped_column(Text, unique=True, nullable=False)
    title: Mapped[str] = mapped_column(Text, nullable=False)
    description: Mapped[str] = mapped_column(Text, nullable=False)
    category_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("categories.id"), nullable=False
    )
    rarity: Mapped[str] = mapped_column(String(20), nullable=False)
    repeatable: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    max_level: Mapped[int | None] = mapped_column(Integer, nullable=True)
    icon: Mapped[str | None] = mapped_column(Text, nullable=True)
    points: Mapped[int | None] = mapped_column(Integer, nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)
    sort_order: Mapped[int] = mapped_column(Integer, nullable=False, default=0)

    category: Mapped["Category"] = relationship(back_populates="achievements")
    prerequisites: Mapped[list["AchievementPrerequisite"]] = relationship(
        foreign_keys="AchievementPrerequisite.achievement_id",
        back_populates="achievement",
        lazy="selectin",
    )
    required_by: Mapped[list["AchievementPrerequisite"]] = relationship(
        foreign_keys="AchievementPrerequisite.prereq_achievement_id",
        back_populates="prereq_achievement",
    )


class AchievementPrerequisite(Base):
    __tablename__ = "achievement_prerequisites"
    __table_args__ = (
        CheckConstraint(
            "achievement_id != prereq_achievement_id", name="ck_prereq_no_self"
        ),
        Index("ix_prereq_achievement_id", "achievement_id"),
    )

    achievement_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("achievements.id", ondelete="CASCADE"),
        primary_key=True,
    )
    prereq_achievement_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("achievements.id", ondelete="CASCADE"),
        primary_key=True,
    )
    min_level: Mapped[int] = mapped_column(Integer, nullable=False, default=1)

    achievement: Mapped["Achievement"] = relationship(
        foreign_keys=[achievement_id], back_populates="prerequisites"
    )
    prereq_achievement: Mapped["Achievement"] = relationship(
        foreign_keys=[prereq_achievement_id], back_populates="required_by"
    )


# ---------------------------------------------------------------------------
# Group-User-Achievement progress
# ---------------------------------------------------------------------------


class GroupUserAchievement(Base):
    __tablename__ = "group_user_achievements"
    __table_args__ = (
        CheckConstraint(
            "status IN ('LOCKED','AVAILABLE','ACHIEVED')", name="ck_gua_status"
        ),
        Index("ix_gua_group_user_status", "group_id", "user_id", "status"),
    )

    group_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("groups.id", ondelete="CASCADE"), primary_key=True
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("users.id", ondelete="CASCADE"), primary_key=True
    )
    achievement_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("achievements.id", ondelete="CASCADE"),
        primary_key=True,
    )
    level: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[str] = mapped_column(String(20), nullable=False)
    achieved_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now(),
        onupdate=func.now(),
        nullable=False,
    )

    group: Mapped["Group"] = relationship(back_populates="user_achievements")
    user: Mapped["User"] = relationship()
    achievement: Mapped["Achievement"] = relationship()


# ---------------------------------------------------------------------------
# Claims
# ---------------------------------------------------------------------------


class AchievementClaim(Base):
    __tablename__ = "achievement_claims"
    __table_args__ = (
        CheckConstraint(
            "status IN ('SUBMITTED','APPROVED','REJECTED','CANCELED')",
            name="ck_claim_status",
        ),
        Index("ix_claim_group_status_submitted", "group_id", "status", "submitted_at"),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    group_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("groups.id", ondelete="CASCADE"), nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, ForeignKey("users.id", ondelete="CASCADE"), nullable=False
    )
    achievement_id: Mapped[uuid.UUID] = mapped_column(
        Uuid,
        ForeignKey("achievements.id", ondelete="CASCADE"),
        nullable=False,
    )
    status: Mapped[str] = mapped_column(String(20), nullable=False, default="SUBMITTED")
    evidence: Mapped[dict] = mapped_column(JSON, nullable=False, server_default="{}")
    comment: Mapped[str | None] = mapped_column(Text, nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
    reviewed_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    reviewed_by_user_id: Mapped[uuid.UUID | None] = mapped_column(
        Uuid, ForeignKey("users.id"), nullable=True
    )

    group: Mapped["Group"] = relationship(back_populates="claims")
    user: Mapped["User"] = relationship(
        foreign_keys=[user_id], back_populates="claims"
    )
    achievement: Mapped["Achievement"] = relationship()
    reviewed_by: Mapped["User | None"] = relationship(
        foreign_keys=[reviewed_by_user_id]
    )


# ---------------------------------------------------------------------------
# Events (audit log)
# ---------------------------------------------------------------------------


class AchievementEvent(Base):
    __tablename__ = "achievement_events"
    __table_args__ = (
        CheckConstraint(
            "event_type IN ('CLAIM_SUBMITTED','CLAIM_APPROVED','CLAIM_REJECTED','LEVEL_INCREMENT','ADMIN_GRANTED')",
            name="ck_event_type",
        ),
    )

    id: Mapped[uuid.UUID] = mapped_column(
        Uuid, primary_key=True, default=_uuid
    )
    group_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, nullable=False
    )
    user_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, nullable=False
    )
    achievement_id: Mapped[uuid.UUID] = mapped_column(
        Uuid, nullable=False
    )
    event_type: Mapped[str] = mapped_column(String(50), nullable=False)
    payload: Mapped[dict] = mapped_column(JSON, nullable=False, server_default="{}")
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )
