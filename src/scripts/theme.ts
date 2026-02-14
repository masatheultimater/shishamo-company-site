/**
 * Theme Toggle Functionality
 * Supports light, dark, and system preference modes
 */

const THEME_KEY = 'theme-preference';

type ThemePreference = 'light' | 'dark' | 'system';
type EffectiveTheme = 'light' | 'dark';

function getThemePreference(): ThemePreference {
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return 'system';
}

function getEffectiveTheme(preference: ThemePreference): EffectiveTheme {
  if (preference === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  return preference;
}

function applyTheme(preference: ThemePreference): void {
  const effective = getEffectiveTheme(preference);
  document.documentElement.setAttribute('data-theme', effective);
  updateToggleIcons(effective);
}

function updateToggleIcons(effectiveTheme: EffectiveTheme): void {
  document.querySelectorAll('.theme-toggle').forEach(toggle => {
    const lightIcon = toggle.querySelector<HTMLElement>('.theme-icon--light');
    const darkIcon = toggle.querySelector<HTMLElement>('.theme-icon--dark');

    if (lightIcon && darkIcon) {
      if (effectiveTheme === 'dark') {
        lightIcon.style.opacity = '0';
        lightIcon.style.transform = 'scale(0.8)';
        darkIcon.style.opacity = '1';
        darkIcon.style.transform = 'scale(1)';
      } else {
        lightIcon.style.opacity = '1';
        lightIcon.style.transform = 'scale(1)';
        darkIcon.style.opacity = '0';
        darkIcon.style.transform = 'scale(0.8)';
      }
    }
  });
}

function toggleTheme(): void {
  const current = getThemePreference();
  const effectiveCurrent = getEffectiveTheme(current);

  const newTheme: ThemePreference = effectiveCurrent === 'dark' ? 'light' : 'dark';

  localStorage.setItem(THEME_KEY, newTheme);
  applyTheme(newTheme);
}

function initTheme(): void {
  const preference = getThemePreference();
  applyTheme(preference);

  document.querySelectorAll('.theme-toggle').forEach(toggle => {
    toggle.addEventListener('click', toggleTheme);
  });

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (getThemePreference() === 'system') {
      const effective: EffectiveTheme = e.matches ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', effective);
      updateToggleIcons(effective);
    }
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
}
