export const getTheme = () => {
  const hour = new Date().getHours();
  return hour >= 8 && hour < 20 ? 'day' : 'night';
};

export const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  const metaTheme = document.getElementById('theme-color-meta');
  if (metaTheme) {
    metaTheme.setAttribute('content', theme === 'day' ? '#f8fafc' : '#1e293b');
  }
};
