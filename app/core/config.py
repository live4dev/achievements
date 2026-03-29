import subprocess

from pydantic_settings import BaseSettings, SettingsConfigDict


def _get_version() -> str:
    try:
        return subprocess.check_output(
            ["git", "describe", "--tags", "--always", "--dirty"],
            stderr=subprocess.DEVNULL,
        ).decode().strip()
    except Exception:
        return "unknown"


APP_VERSION = _get_version()


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "sqlite+aiosqlite:///./achievements.db"
    BOT_TOKEN: str = ""
    DEBUG: bool = False
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000
    WEB_URL: str = "http://localhost:8000"
    JWT_SECRET: str = "change-me-in-production"
    JWT_EXPIRE_SECONDS: int = 86400
    SKIP_AUTH: bool = False
    ADMIN_IDS: list[int] = []


settings = Settings()
