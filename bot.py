"""
Entry point: Telegram-бот только (без веб-сервера).

Запуск:
    python bot.py
"""

from app.bot.application import create_application
from app.core.config import settings
from app.core.logging_config import setup_logging


def main() -> None:
    setup_logging(settings.DEBUG)
    bot_app = create_application()
    # run_polling() создаёт event loop, обрабатывает SIGINT/SIGTERM и корректно завершается
    bot_app.run_polling(drop_pending_updates=True)


if __name__ == "__main__":
    main()
