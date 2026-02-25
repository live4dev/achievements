"""
Entry point: FastAPI + uvicorn only (без бота).

Запуск:
    python web.py
    # или через uvicorn напрямую:
    uvicorn app.api.app:fastapi_app --host 0.0.0.0 --port 8000
"""

import uvicorn

from app.api.app import fastapi_app
from app.core.config import settings
from app.core.logging_config import setup_logging


def main() -> None:
    setup_logging(settings.DEBUG)
    uvicorn.run(
        fastapi_app,
        host=settings.API_HOST,
        port=settings.API_PORT,
        log_level="debug" if settings.DEBUG else "info",
    )


if __name__ == "__main__":
    main()
