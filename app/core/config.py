from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql+asyncpg://achievements:achievements@localhost:5432/achievements"
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
