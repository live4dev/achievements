async function route() {
  try {
    await ensureAuth();
    _isAdmin = isAdminUser();
  } catch (_) { _isAdmin = false; }

  const hash = location.hash || '#/';

  let m;
  if ((m = hash.match(/^#\/group\/([^/]+)\/me$/))) return showMyPage(m[1]);
  if ((m = hash.match(/^#\/group\/([^/]+)$/))) return showGroup(m[1]);
  if (hash === '#/admin') return showAdminHome();
  if (hash === '#/admin/categories') return showAdminCategories();
  if (hash === '#/admin/categories/new') return showAdminCategoryForm(null);
  if ((m = hash.match(/^#\/admin\/categories\/([^/]+)$/))) return showAdminCategoryForm(m[1]);
  if (hash === '#/admin/achievements') return showAdminAchievements();
  if (hash === '#/admin/achievements/new') return showAdminAchievementForm(null);
  if ((m = hash.match(/^#\/admin\/achievements\/([^/]+)$/))) return showAdminAchievementForm(m[1]);
  showGroups();
}

window.addEventListener('hashchange', route);
window.addEventListener('load', route);
