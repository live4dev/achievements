import hashlib
import hmac
import json
import time
from urllib.parse import parse_qsl

import jwt

from app.core.config import settings


def verify_init_data(init_data: str) -> dict:
    """Verify Telegram WebApp initData HMAC signature. Returns user dict."""
    params = dict(parse_qsl(init_data, keep_blank_values=True))
    received_hash = params.pop("hash", None)
    if not received_hash:
        raise ValueError("missing hash")

    data_check = "\n".join(f"{k}={v}" for k, v in sorted(params.items()))
    secret = hmac.new(b"WebAppData", settings.BOT_TOKEN.encode(), hashlib.sha256).digest()
    expected = hmac.new(secret, data_check.encode(), hashlib.sha256).hexdigest()

    if not hmac.compare_digest(expected, received_hash):
        raise ValueError("invalid hash")

    auth_date = int(params.get("auth_date", 0))
    if time.time() - auth_date > 86400:
        raise ValueError("initData expired")

    return json.loads(params["user"])


def create_access_token(tg_user_id: int) -> str:
    payload = {"sub": str(tg_user_id), "exp": int(time.time()) + settings.JWT_EXPIRE_SECONDS}
    return jwt.encode(payload, settings.JWT_SECRET, algorithm="HS256")


def decode_access_token(token: str) -> int:
    payload = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
    return int(payload["sub"])
