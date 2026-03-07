#!/usr/bin/env python3
"""
Generate a valid Telegram WebApp initData string for local testing.

Usage:
    python scripts/gen_init_data.py

Then use the printed string in:
    curl -X POST http://localhost:8000/api/auth \\
      -H "Content-Type: application/json" \\
      -d '{"init_data": "<paste here>"}'
"""

import hashlib
import hmac
import json
import sys
import time
import urllib.parse

sys.path.insert(0, ".")
from app.core.config import settings

user = {"id": 12345, "first_name": "Dev", "username": "dev_user", "language_code": "ru"}
params = {
    "user": json.dumps(user, separators=(",", ":")),
    "auth_date": str(int(time.time())),
    "chat_type": "sender",
}
data_check = "\n".join(f"{k}={v}" for k, v in sorted(params.items()))
secret = hmac.new(b"WebAppData", settings.BOT_TOKEN.encode(), hashlib.sha256).digest()
h = hmac.new(secret, data_check.encode(), hashlib.sha256).hexdigest()
params["hash"] = h

print(urllib.parse.urlencode(params))
