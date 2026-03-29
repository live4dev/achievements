"""
Entry point: runs FastAPI (uvicorn) + Telegram bot in the same event loop.
"""

import asyncio
import logging

import uvicorn

from app.api.app import fastapi_app
from app.bot.application import create_application
from app.core.config import APP_VERSION, settings
from app.core.logging_config import setup_logging


async def main() -> None:
    setup_logging(settings.DEBUG)
    logger = logging.getLogger(__name__)

    # ── Uvicorn server (non-blocking) ────────────────────────────────────────
    uv_config = uvicorn.Config(
        fastapi_app,
        host=settings.API_HOST,
        port=settings.API_PORT,
        log_level="debug" if settings.DEBUG else "info",
    )
    uv_server = uvicorn.Server(uv_config)

    # ── Telegram bot ─────────────────────────────────────────────────────────
    bot_app = create_application()

    logger.info("Starting bot + API on %s:%s", settings.API_HOST, settings.API_PORT)

    async with bot_app:
        await bot_app.start()
        await bot_app.updater.start_polling(drop_pending_updates=True)

        for admin_id in settings.ADMIN_IDS:
            try:
                await bot_app.bot.send_message(
                    chat_id=admin_id,
                    text=f"Bot started. Version: <code>{APP_VERSION}</code>",
                    parse_mode="HTML",
                )
            except Exception:
                logger.warning("Could not notify admin %s on startup", admin_id)

        try:
            await uv_server.serve()  # blocks until shutdown
        finally:
            await bot_app.updater.stop()
            await bot_app.stop()


if __name__ == "__main__":
    asyncio.run(main())
