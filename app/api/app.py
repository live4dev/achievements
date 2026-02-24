from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routers.achievements import router as achievements_router
from app.core.config import settings


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
    return app


fastapi_app = create_fastapi_app()
