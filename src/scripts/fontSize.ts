/**
 * Font Size Adjustment Functionality
 * Supports 4 levels: small (default), medium, large, xlarge
 * Mirrors theme.ts pattern with localStorage persistence
 */

const FONT_SIZE_KEY = 'font-size-preference';

type FontSizeLevel = 'small' | 'medium' | 'large' | 'xlarge';

const SIZE_MAP: Record<FontSizeLevel, number> = {
  small: 16,
  medium: 18,
  large: 20,
  xlarge: 22,
};

function getFontSizePreference(): FontSizeLevel {
  const stored = localStorage.getItem(FONT_SIZE_KEY);
  if (stored === 'medium' || stored === 'large' || stored === 'xlarge') {
    return stored;
  }
  return 'small';
}

function applyFontSize(level: FontSizeLevel): void {
  document.documentElement.setAttribute('data-font-size', level);
  document.documentElement.style.fontSize = SIZE_MAP[level] + 'px';
  updateButtonStates(level);
}

function updateButtonStates(level: FontSizeLevel): void {
  document.querySelectorAll<HTMLButtonElement>('.font-size-btn').forEach(btn => {
    const btnLevel = btn.getAttribute('data-font-size-level');
    const isActive = btnLevel === level;
    btn.setAttribute('aria-pressed', String(isActive));
    btn.classList.toggle('font-size-btn--active', isActive);
  });
}

function setFontSize(level: FontSizeLevel): void {
  localStorage.setItem(FONT_SIZE_KEY, level);
  applyFontSize(level);
}

function initFontSize(): void {
  const preference = getFontSizePreference();
  applyFontSize(preference);

  document.querySelectorAll<HTMLButtonElement>('.font-size-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const level = btn.getAttribute('data-font-size-level') as FontSizeLevel | null;
      if (level && level in SIZE_MAP) {
        setFontSize(level);
      }
    });
  });
}

// Auto-initialize when DOM is ready
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initFontSize);
  } else {
    initFontSize();
  }
}
