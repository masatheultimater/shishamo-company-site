# shishamo-company-site

Astro static site for ししゃもカンパニー (shishamo-company.com).
IT, accounting, and management consulting for Japanese SMBs.

## Quick Reference

- **Build:** `npm run build`
- **Lint:** `npm run lint` / `npm run lint:fix`
- **Format:** `npm run format` / `npm run format:check`
- **Deploy:** Git push → GitHub Actions → Cloudflare Pages

## Rules

All development rules are in `.claude/rules/`:

- `core.md` — coding principles, Astro patterns, CSS tokens, security, content integrity
- `seo.md` — technical SEO, content SEO, performance, checklists
- `workflow.md` — investigation protocol, build gates, agent delegation

## Architecture

See `.claude/docs/DESIGN.md` for detailed design decisions.

## Orchestra

- Orchestrator: Claude Code (main)
- Analyst: Codex CLI (gpt-5.4-codex)
- Researcher: Gemini CLI (gemini-3-pro-preview)
