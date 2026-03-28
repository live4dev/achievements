// ── Telegram WebApp ───────────────────────────────────────────
const tg = window.Telegram?.WebApp;
tg?.ready();
tg?.expand();

// ── Auth state ────────────────────────────────────────────────
let _isAdmin = false;
