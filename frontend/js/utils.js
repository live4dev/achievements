function esc(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function plural(n, one, few, many) {
  const mod10 = n % 10, mod100 = n % 100;
  if (mod100 >= 11 && mod100 <= 19) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}

function memberWord(n) {
  return `${n} ${plural(n, 'участник', 'участника', 'участников')}`;
}

function render(html) {
  document.getElementById('app').innerHTML = html;
}

function spinner() {
  render('<div class="spinner-wrap"><div class="spinner"></div></div>');
}

function showError(msg, onRetry) {
  render(`
    <div class="error-wrap">
      <div class="empty__icon">⚠️</div>
      <p>${esc(msg)}</p>
      <button class="btn-retry" id="btn-retry">Повторить</button>
    </div>
  `);
  document.getElementById('btn-retry').onclick = onRetry;
}
