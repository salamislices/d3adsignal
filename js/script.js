/* Basic JS for the foundation: accessible nav toggle, theme toggle, small helpers */
document.addEventListener('DOMContentLoaded', () => {
  // Nav toggle
  const navToggle = document.querySelector('.nav-toggle');
  const navList = document.getElementById('primary-menu');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!isOpen));
      const newState = !isOpen;
      navList.setAttribute('data-open', String(newState));
    });
  }

  // Theme toggle (persist in localStorage)
  const themeToggle = document.getElementById('theme-toggle');
  const root = document.documentElement;
  const THEME_KEY = 'site-theme';

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      themeToggle.textContent = '☀️';
      themeToggle.setAttribute('aria-pressed', 'true');
    } else {
      root.removeAttribute('data-theme');
      themeToggle.textContent = '🌙';
      themeToggle.setAttribute('aria-pressed', 'false');
    }
  }

  // initialize theme from localStorage or OS preference
  const stored = localStorage.getItem(THEME_KEY);
  if (stored) {
    applyTheme(stored);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    applyTheme(prefersDark ? 'dark' : 'light');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // Fill copyright year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Simple form submit handler (prevent default for demo)
  const form = document.querySelector('.form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // In a real site you'd validate and send to server here.
      alert('Thanks — form submission handled by JavaScript (demo).');
      form.reset();
    });
  }
});
