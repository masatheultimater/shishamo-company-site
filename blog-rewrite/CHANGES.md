# Blog Rewrite Changes Summary

## All 20 Articles — Common Changes

### Added
- **「この記事でわかること」** section (3 bullet points after opening hook) — 19 articles
  - `about.html` is exempt (self-introduction, not informational)
- **「まとめ」** section (3 concise bullet lines before CTA) — 19 articles
  - `about.html` is exempt

### Fixed Language
- **「すべき」removed** from 5 articles (titles and body text):
  - `invoice-transition-2026-oct`: 確認すべき → 確認しておきたい
  - `denchoho-checklist-sme`: やるべき → やっておきたい
  - `subsidy-list-2026`: 知っておくべき → 知っておきたい
  - `ai-tools-comparison-2026`: 入れるべき → 最初に入れたい
  - `about`: 可視化すべき → 可視化する
- **「伴走」removed** from `kpi-dashboard-guide` → 「一緒に進める」
- **「一気通貫」removed** from `dx-subsidy-guide-2026`, `subsidy-list-2026` → 「まとめて対応」
- **「本稿」removed** from `excel-dependency-escape-guide` → 「この記事」

### CTA Improvements
- Each article's CTA now connects naturally to its specific content
- Removed templated feel while keeping "無料で相談する" button

---

## Article-Specific Changes

### Major Rewrite
- **`customer-data-sales-growth-sme`** — Complete tone overhaul
  - Before: Academic/whitepaper style, third-person, fabricated company examples (A社B社C社)
  - After: Conversational, reader-directed, practical examples
  - Size: 14.9KB → 10.5KB (removed bloat)

### Significant Changes
- **`about`** — "大切にしていること" section rewritten
  - Removed: "わかりやすい言葉で話します" / "一緒に、隣で考えます" / "パートナーとして、同じ船に乗ります" (consultant clichés)
  - Added: "わからないことは「わからない」と言います" / "「正解」を押し付けません" / "成果が出なければ、はっきり伝えます" (honest, direct)
- **`excel-dependency-escape-guide`** — Added missing CTA section, fixed academic tone ("本稿")

### Near-Duplicate Articles (Differentiated)
- **`digital-ai-subsidy-guide-2026`** — Focused on: "なぜ検索で見つからないのか" (入門向け)
- **`dx-subsidy-guide-2026`** — Focused on: "具体的な申請手順と活用法" (実践向け)

### Minor Tweaks (17 articles)
All other articles: added structural sections (この記事でわかること / まとめ), fixed specific word choices, improved CTA naturalness.

---

## How to Apply

1. Open microCMS dashboard
2. For each article, click "Edit"
3. Switch to HTML editor mode (リッチエディタ → HTML)
4. Replace the content with the corresponding file from this directory
5. Preview and publish

**Important**: These files contain only the article body HTML. Title, excerpt, category, and tags should be reviewed separately in microCMS fields.

### Title Changes (update in microCMS title field)
- `invoice-transition-2026-oct`: 確認**すべき** → 確認**しておきたい**
- `denchoho-checklist-sme`: **やるべき**こと → **やっておきたい**こと
- `subsidy-list-2026`: 知って**おくべき** → 知って**おきたい**
- `ai-tools-comparison-2026`: 入れ**るべき** → 最初に入れ**たい**
