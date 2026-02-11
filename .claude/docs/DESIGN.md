# Design Decisions

## Architecture

### CSS Token System (v2 — 2026-02-12)

**Dark-first semantic tokens** with 5 layers:

1. **Raw Palette** — Immutable color values (`--palette-gray-950`, `--palette-blue-500`, etc.)
2. **Theme-Independent** — Typography, spacing, radius, animations
3. **Semantic Tokens** — Dark-first defaults in `:root` (`--color-bg`, `--color-text`, etc.)
4. **Light Overrides** — `[data-theme="light"]` remaps semantic tokens
5. **Animations** — Keyframes (morph, float)

No component uses raw palette directly except for "always-same" colors:
- `--palette-white` for text on dark/accent backgrounds
- `--palette-gray-900` for text on light backgrounds

### CSS Files

| File | Scope |
|------|-------|
| `tokens.css` | Raw palette + semantic tokens + light overrides + animations |
| `reset.css` | Box model reset, body defaults, focus-visible, sr-only |
| `components.css` | Shared components: buttons, badges, cards, section headers, page headers, CTAs |
| `home.css` | Homepage-specific sections |
| `service-detail.css` | Service detail page (`--sd-*` vars) |
| `blog.css` | Blog index/detail + rich content |
| `forms.css` | Form fields, checkboxes, selects |

### No Dark Mode Overrides in Page CSS

All dark/light adaptation happens at the token level. Page CSS uses only semantic tokens
(`--color-bg`, `--color-text`, etc.) which automatically resolve per theme.

Exception: `Header.astro` theme toggle icons use `[data-theme="dark"]` for show/hide.

### Icon System

- **Lucide Icons** (`@lucide/astro`) for UI icons
- **Custom SVGs** preserved for: Logo, brand icons (X/Twitter, Facebook), animated thanks checkmark

## Key Decisions Log

| Date | Decision | Rationale | Decided By |
|------|----------|-----------|------------|
| 2026-02-12 | Dark-first token system | Eliminates semantic inversion where `--dark` becomes light in dark mode | User + Claude |
| 2026-02-12 | Remove background images from page headers | Semantic bg + glow pseudo-element adapts to both themes without overlays | Claude |
| 2026-02-12 | `--palette-*` for always-same colors | Immutable palette tokens for text on accent/dark backgrounds | Claude |
| 2026-02-12 | CTA dark variant uses `--gradient-semantic-cta` | Blue gradient in light, dark gradient in dark — both support white text | Claude |
| 2026-02-12 | Glass-morphism for header/nav | `backdrop-filter: blur(12px)` + transparent bg with `@supports` fallback | Claude |
| 2026-02-12 | Lucide icons replace inline SVGs | Consistent, accessible, tree-shakeable icon library | User + Claude |
