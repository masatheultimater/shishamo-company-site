# Refactoring Patterns

## Dark Mode CSS Deduplication (Applied 2026-02-07)

### Problem
Every component had duplicated dark mode CSS:
```css
[data-theme="dark"] .foo { color: red; }
@media (prefers-color-scheme: dark) {
  html:not([data-theme="light"]) .foo { color: red; }
}
```
This caused ~800 lines of pure duplication.

### Root Cause
`theme.ts` removed `data-theme` for system preference, requiring CSS media queries as fallback.

### Solution
1. Inline head script always sets `data-theme` (even for system preference detection)
2. `theme.ts` always sets `data-theme` via `getEffectiveTheme()`
3. System preference change listener updates `data-theme`
4. Only `[data-theme="dark"]` selectors needed in CSS

### Result
- Removed all `@media (prefers-color-scheme: dark)` from CSS
- ~800 lines deleted across 8 files
- No FOUC (inline script runs before render)
- System preference changes still work via JS listener
