/**
 * Homepage Structured Data
 * Phase 1: 8 sections — HERO, Insight, Problems, Changes, Spiral, About, CTA, Blog
 *
 * Text-only sections (insight, spiral, about, CTA) are hardcoded in the template.
 * This file holds structured data that benefits from type safety.
 */

export interface ProblemItem {
  text: string;
  guideTopic: string;
  /** Phase 2: /guide/{topic}/. Until then: temporary blog/service link */
  guideLink: string;
}

export interface ChangeItem {
  before: string;
  after: string;
  method: string;
  /** Set to false when replaced with real client data */
  isPlaceholder: boolean;
}

/** Section 3: Checkbox-style problem items → guide links */
export const problemItems: ProblemItem[] = [
  {
    text: '独立したけど、HPも名刺もまだない',
    guideTopic: '業務効率化',
    guideLink: '/guide/efficiency/',
  },
  {
    text: 'デジタル化したいけど、何から手をつければいいかわからない',
    guideTopic: '業務効率化',
    guideLink: '/guide/efficiency/',
  },
  {
    text: '数字の管理がどんぶり勘定のまま',
    guideTopic: 'データ活用',
    guideLink: '/guide/data/',
  },
  {
    text: '業務が属人化して、自分が倒れたら回らない',
    guideTopic: '業務効率化',
    guideLink: '/guide/efficiency/',
  },
  {
    text: 'ITツールを入れたけど、誰も使いこなせていない',
    guideTopic: '業務効率化',
    guideLink: '/guide/efficiency/',
  },
  {
    text: '補助金・助成金を使いたいけど、申請が難しそう',
    guideTopic: '補助金活用',
    guideLink: '/guide/subsidy/',
  },
  {
    text: '事業承継を考え始めたけど、何を準備すればいいのかわからない',
    guideTopic: '経営整理',
    guideLink: '/guide/management/',
  },
];

/** Section 4: Changes that happened (placeholder until real client data) */
export const changeItems: ChangeItem[] = [
  {
    before: '経理に月10時間',
    after: '2時間に',
    method: '会計ソフトの仕組み化',
    isPlaceholder: true,
  },
  {
    before: '補助金の存在を知らなかった',
    after: '4/5補助で導入',
    method: '制度の活用',
    isPlaceholder: true,
  },
  {
    before: '顧客データが放置されていた',
    after: '新しい売上につながった',
    method: 'データの活用',
    isPlaceholder: true,
  },
];

/**
 * Evergreen blog post slugs for homepage curation.
 * These posts are shown first in the homepage blog section.
 * Fallback: if none are found in microCMS, show latest 3 posts.
 */
export const evergreenBlogSlugs: string[] = ['dx-start-sme-30'];
