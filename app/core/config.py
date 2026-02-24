from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    DATABASE_URL: str = "postgresql+asyncpg://achievements:achievements@localhost:5432/achievements"
    BOT_TOKEN: str = ""
    DEBUG: bool = False
    API_HOST: str = "0.0.0.0"
    API_PORT: int = 8000


settings = Settings()
