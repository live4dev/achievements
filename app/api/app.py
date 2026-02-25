from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routers.achievements import router as achievements_router
from app.core.config import settings

_FRONTEND_DIR = Path(__file__).resolve().parents[2] / "frontend"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: nothing extra needed (DB engine is created lazily)
    yield
    # Shutdown


def create_fastapi_app() -> FastAPI:
    app = FastAPI(
        title="Family Achievements API",
        version="1.0.0",
        lifespan=lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(achievements_router)

    # Serve frontend static files (must be mounted last)
    if _FRONTEND_DIR.exists():
        app.mount("/", StaticFiles(directory=str(_FRONTEND_DIR), html=True), name="frontend")

    return app


fastapi_app = create_fastapi_app()
