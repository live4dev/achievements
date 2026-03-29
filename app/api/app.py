from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.api.routers.achievements import router as achievements_router
from app.api.routers.admin import router as admin_router
from app.api.routers.auth import router as auth_router
from app.core.config import APP_VERSION, settings

_FRONTEND_DIR = Path(__file__).resolve().parents[2] / "frontend"
_DIAGRAM_DIR = Path(__file__).resolve().parents[2] / "frontend" / "likec4_diagram"


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: nothing extra needed (DB engine is created lazily)
    yield
    # Shutdown


def create_fastapi_app() -> FastAPI:
    app = FastAPI(
        title="Family Achievements API",
        version=APP_VERSION,
        lifespan=lifespan,
    )
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(auth_router)
    app.include_router(achievements_router)
    app.include_router(admin_router)

    # Serve LikeC4 architecture diagram viewer
    if _DIAGRAM_DIR.exists():
        app.mount("/diagram", StaticFiles(directory=str(_DIAGRAM_DIR), html=True), name="diagram")

    # Serve frontend static files (must be mounted last)
    if _FRONTEND_DIR.exists():
        app.mount("/", StaticFiles(directory=str(_FRONTEND_DIR), html=True), name="frontend")

    return app


fastapi_app = create_fastapi_app()
