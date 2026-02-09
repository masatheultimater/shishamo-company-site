# Project Memory - shishamo-company-site

## Tech Stack
- Astro (static site generator), TypeScript, plain CSS
- Design tokens: `shared/design-tokens.json` → `src/styles/tokens.css`
- Theme: `data-theme` attribute on `<html>`, managed by `src/scripts/theme.ts`

## Key Architecture Decisions
- **Dark mode**: `data-theme` is ALWAYS set (light/dark) by inline head script. No `@media (prefers-color-scheme: dark)` CSS blocks needed. System preference detected via JS.
- **Site config**: Centralized in `src/lib/siteConfig.ts` - use `siteMetadata.siteUrl` instead of hardcoding URLs
- **Dynamic routes**: Service detail pages use `src/pages/services/[id].astro` (not individual files)

## Known Issues (Not Yet Fixed)
- `.btn-primary` defined in 4 places with conflicting styles (global.css, home.css, CTASection, quote.astro)
- Profile data exists in 3 places: `shared/profile.yaml`, `src/data/profile.yaml`, `siteConfig.ts`
- Twitter handle inconsistency: `shishamoex09` (Header/Footer) vs `shishamo_tax` (schema/meta)
- `profile.astro` is 1100+ lines - should be broken into smaller components
- Hardcoded colors in `home.css` why-me section (`#1a202c`, `#63b3ed`, etc.)

## Refactoring Patterns
- See `patterns.md` for dark mode refactoring approach
