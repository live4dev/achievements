from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.core.config import settings
from app.core.security import create_access_token, verify_init_data

router = APIRouter(prefix="/api", tags=["auth"])


class AuthRequest(BaseModel):
    init_data: str
    dev_user_id: int | None = None  # only honoured when SKIP_AUTH=True


class AuthResponse(BaseModel):
    token: str
    user_id: int


@router.post("/auth", response_model=AuthResponse)
async def auth(body: AuthRequest):
    if settings.SKIP_AUTH:
        uid = body.dev_user_id or 0
        return AuthResponse(token=create_access_token(uid), user_id=uid)
    try:
        user = verify_init_data(body.init_data)
    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))
    return AuthResponse(token=create_access_token(user["id"]), user_id=user["id"])
