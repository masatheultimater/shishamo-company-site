# サイト全体設計書 — shishamo-company.com

## このドキュメントの位置づけ

- `site-design-spec.md` — トップページ改修の詳細指示（Phase 1）
- **`site-architecture.md`（このファイル）** — サイト全体の再構築設計（Phase 1〜4）

Phase 1（トップページ）の詳細は `site-design-spec.md` を参照。
このファイルはサイト全体の骨格と、Phase 2以降の具体的な実装指示を記述する。

---

## 1. 現在のサイト構成（as-is）

### ページ一覧

```
/                    — トップページ（index.astro）
/services/           — サービス一覧（services/index.astro）
/services/[id]/      — サービス詳細（services/[id].astro）
/profile/            — プロフィール（profile.astro）
/blog/               — ブログ一覧（blog/index.astro）
/blog/[slug]/        — ブログ記事（blog/[slug].astro）
/blog/category/[id]/ — カテゴリ別一覧
/blog/tag/[id]/      — タグ別一覧
/blog/rss.xml        — RSSフィード
/contact/            — お問い合わせ（contact/index.astro）
/contact/quote/      — お見積り（contact/quote.astro）
/contact/thanks/     — 送信完了
/diagnostic/         — 簡易経営診断（diagnostic/index.astro）
/faq/                — よくある質問（faq/index.astro）
/privacy-policy/     — プライバシーポリシー
/terms/              — 利用規約
/analytics-optout/   — アナリティクスオプトアウト
```

### ナビゲーション（siteConfig.ts）

```
ホーム / サービス / プロフィール / ブログ / [無料相談ボタン]
```

### 技術スタック

- Astro（静的サイト生成）
- microCMS（ブログCMS）
- Cloudflare Pages（ホスティング）
- TypeScript strict mode
- CSS変数ベースのデザイントークン（tokens.css）
- ダークモード対応（data-theme="light"）
- astro-icon + @iconify-json/ri（Remix Icon）
- Formspree（フォーム）

---

## 2. 変更後のサイト構成（to-be）

### 新規ページ

```
/guide/              — 経営強化ガイド 全体像（★ 新設）
/guide/tax/          — 困りごと別ガイド：制度対応（★ 新設）
/guide/data/         — 困りごと別ガイド：データ活用（★ 新設）
/guide/efficiency/   — 困りごと別ガイド：業務効率化（★ 新設）
/guide/management/   — 困りごと別ガイド：経営整理（★ 新設）
/guide/subsidy/      — 困りごと別ガイド：補助金活用（★ 新設）
/cases/              — 事例一覧（★ 新設）
/cases/[slug]/       — 個別事例（★ 新設）
```

### 変更ページ

```
/                    — トップページ（Phase 1で改修。site-design-spec.md参照）
/services/           — サービスページ（Phase 3でリポジショニング）
/blog/               — ブログ一覧（Phase 2で強化）
/blog/[slug]/        — ブログ記事（Phase 2で仕組み埋め込み）
```

### 変更なしページ

```
/profile/            — 維持
/contact/            — 維持
/diagnostic/         — 維持（困りごとセクション内からリンク）
/faq/                — 維持
/privacy-policy/     — 維持
/terms/              — 維持
```

### ナビゲーション変更

現在：

```typescript
// src/lib/siteConfig.ts
export const navigationItems: NavigationItem[] = [
  { slug: 'home', title: 'ホーム', href: '/' },
  { slug: 'services', title: 'サービス', href: '/services/' },
  { slug: 'profile', title: 'プロフィール', href: '/profile/' },
  { slug: 'blog', title: 'ブログ', href: '/blog/' },
];
```

変更後（Phase 2、ガイドページ完成時に実施）：

```typescript
export const navigationItems: NavigationItem[] = [
  { slug: 'home', title: 'ホーム', href: '/' },
  { slug: 'guide', title: 'ガイド', href: '/guide/' },
  { slug: 'services', title: 'サービス', href: '/services/' },
  { slug: 'blog', title: 'ブログ', href: '/blog/' },
];
```

**変更点：**

- 4項目を維持（モバイル軽量化）
- `guide` を追加、`profile` をナビから外す
- Profile はプロフィールカード（トップページ）+ フッターから誘導
- Cases（事例）はナビに入れない — 文脈リンクで誘導。実績が増えたらナビ昇格を検討
- Header.astroの `currentPage` 型に `'guide'` を追加
- footerInfoLinksにガイドを追加

---

## 3. 新規ページ詳細

### 3-1. 経営強化ガイド（/guide/）

**役割：** 困りごと別ガイドへのハブ。螺旋の全体像を体験できる場所。

**構成：**

```
1. 導入 — 「経営は繰り返しで強くなる」を短く
2. 螺旋図解 — 知る→決める→変わるの図（SVGまたはCSS）
3. 各フェーズの説明（短く）
   - 知る：自社の現在地を把握する
   - 決める：会社の軸を定める
   - 変わる：仕組みで実行する
4. 困りごと別ガイドへのリンク5つ
5. かんたん診断へのリンク（/diagnostic/）
6. CTA（軽量）
```

**実装：** `src/pages/guide/index.astro` として作成。Astro静的ページ。microCMS不要。

**スタイル：** `src/styles/guide.css` を新規作成。既存のデザイントークンを使用。

**SEO：**

- title: 「経営強化ガイド｜ししゃもカンパニー」（50-60字以内）
- description: 困りごと別に読む順序がわかるガイド。知る→決める→変わるの繰り返しで会社を強くする。
- JSON-LD: WebPage
- Breadcrumb: ホーム > ガイド
- Sitemap priority: 0.8
- OGP画像: 共通OGP（専用画像は後日検討）

### 3-2. 困りごと別ガイド（/guide/[topic]/）

5本のガイドページ。それぞれ既存のブログ記事群への「道筋」を示す。

| パス               | テーマ                   | 案内する記事群                                             |
| ------------------ | ------------------------ | ---------------------------------------------------------- |
| /guide/tax/        | 制度が変わって困ったら   | invoice系、3割特例、シミュレーション、届出、会計ソフト設定 |
| /guide/data/       | 会社を数字で見たい       | DB思考、KPI、MF BI、顧客データ、データ活用ガイド           |
| /guide/efficiency/ | 業務をもっと楽にしたい   | Excel脱却、ノーコード、AI系、会計ソフト導入                |
| /guide/management/ | 経営の方向性を整理したい | トリプルクライシス、経営課題3ステップ、値付け戦略          |
| /guide/subsidy/    | 補助金を使いたい         | DX補助金、持続化補助金、インボイス×補助金、カレンダー      |

**各ガイドページの構成：**

```
1. テーマの説明（2〜3行）
2. 「この順番で読むとわかりやすい」→ 記事を道筋で並べる
   - 各記事のタイトル＋1行要約＋リンク
3. 関連する事例があればリンク
4. CTA（軽量）
```

**実装：** データファイル + 動的ルート（`guide/[topic].astro`）
`src/data/guides.ts` にガイドデータを定義：

```typescript
export interface GuideData {
  slug: string;
  title: string;
  description: string;
  steps: {
    articleSlug: string;
    title: string;
    summary: string;
  }[];
}
```

**SEO（各ガイドページ）：**

- title: 「{テーマ}ガイド｜ししゃもカンパニー」
- description: テーマに応じた固有の説明文
- JSON-LD: WebPage
- Breadcrumb: ホーム > ガイド > {テーマ}
- Sitemap priority: 0.7
- OGP画像: 共通OGP

**ガイドとカテゴリページの関係性：** 併存。ガイド＝読む順序のある道筋（/guide/[topic]/）、カテゴリ＝分類ラベル（/blog/category/[slug]/）。役割が異なるため両方維持。ガイドは「この順番で読むとわかりやすい」、カテゴリは「このジャンルの記事一覧」。

### 3-3. 事例ページ（/cases/）

**役割：** 「この螺旋を回すと、こうなれる」の証拠。

**最初のフェーズ：** 匿名・パターンベースの事例2〜3件。実際のクライアント事例が出てきたら順次置き換え。差し替え漏れ防止のため、各事例データに `isPlaceholder: true` フラグを設定。

**事例一覧ページ（/cases/）の構成：**

```
1. 導入 — 「一緒に考えて動いた結果、こういう変化が起きた会社があります。」
2. 事例カード（2〜3件）
   - 業種・困りごと（タグ）
   - Before → After の1行サマリー
   - → 詳細を見る
3. CTA（軽量）
```

**個別事例ページ（/cases/[slug]/）の構成：**

```
1. 業種・規模・匿名タグ
2. 困りごと（Before）
3. 何をしたか（経緯）
4. どう変わったか（After）
5. その先の展開（次のループへ）
6. 関連するガイド・記事へのリンク
7. CTA — 「似た状況の方はご相談ください」
```

**実装：**

- 当面は `src/data/cases.ts` にデータ定義＋ `src/pages/cases/` に静的ページ
- 将来microCMSに移行する可能性あり

**注意：** 事例ページの構造は裏で「知る→決める→変わる」に対応しているが、そのフェーズ名は表に出さない。「困りごと → やったこと → 変化」のストーリーとして自然に読ませる。

**SEO（事例ページ）：**

- title（一覧）: 「事例紹介｜ししゃもカンパニー」
- title（個別）: 「{業種}の{困りごと}を解決した事例｜ししゃもカンパニー」
- JSON-LD: WebPage（一覧）, Article（個別）
- Breadcrumb: ホーム > 事例 > {事例名}
- Sitemap priority: 0.7
- OGP画像: 共通OGP

---

## 4. 既存ページの変更

### 4-1. ブログ記事ページ（/blog/[slug]/）

3つの仕組みを埋め込む（ツールチップは独立フェーズに分離）。

**① 「次に読む」案内**

- 記事末尾に「この先の道筋」を表示
- フェーズ名は出さない。「この記事を読んだ方はこちらも」の形
- microCMSのブログスキーマに `relatedSlugs`（テキストリスト）フィールドを追加
  - 手動で関連記事のslugを設定
  - 未設定の場合は同カテゴリの最新記事をフォールバック表示
- 実装ファイル：`src/components/ui/NextRead.astro`

**② 最終更新日表示**

- 記事冒頭に「最終更新：○年○月○日」
- microCMSの `updatedAt` フィールドを使用（既存）
- `<time>` タグで表示、schema.orgの `dateModified` も設定
- 実装箇所：`src/pages/blog/[slug].astro` の記事ヘッダー部分

**③ phaseフィールド（管理用）**

- microCMSのブログスキーマに `phase` フィールド追加
  - セレクト：know / decide / change / trigger
  - 管理用。読者には表示しない
  - コンテンツバランスの可視化に使用

**④ concernTags（困りごとタグ）**

- microCMSのブログスキーマに `concernTags` フィールド追加
  - マルチセレクト：tax / data / efficiency / management / subsidy
  - 記事が扱う「困りごと」を1〜3個選択
  - ガイドページとの紐付けに使用（ガイド側のarticle listの自動生成に活用可能）
  - ブログ一覧でのフィルタリングにも使用

**独立フェーズに分離：ツールチップ（用語辞書）**

- HTML内の用語スキャン＋ラップ処理は脆い実装
- microCMSに用語辞書APIを新設する運用コストも高い
- relatedSlugs + updatedAt の方がSEO即効性がある
- Phase 2より後の独立フェーズで実装判断

### 4-2. ブログ一覧ページ（/blog/）

- 記事3〜4件ごとにガイドへの誘導バナーを差し込む
  - 「どの記事から読めばいい？→ ガイドを見る」
- concernTagsによるフィルタリングUI追加（タブまたはピルUI）
- 実装：`src/pages/blog/index.astro` + `src/styles/blog.css`

### 4-3. サービスページ（/services/）

現在：サービスカテゴリ別の一覧。

変更後：困りごと起点のメニューに再構成。

- 「こんなことで困っていたら → こういうサポートができます」の形
- フェーズ名は使わない
- 各サービスから関連事例へのリンクを追加
- 「一度きりではなく、繰り返し一緒に良くしていくスタンス」を伝えるセクション追加

実装：`src/pages/services/index.astro` + `src/data/services.ts` の修正。
サービス詳細ページ（/services/[id]/）は当面維持。

---

## 5. microCMSスキーマ変更

### 既存API変更：ブログ（blogs）

```
追加フィールド:
  - relatedSlugs: テキストリスト（関連記事のslug）
  - phase: セレクト（know / decide / change / trigger）
    ※ 管理用。読者には表示しない
```

```
  - concernTags: マルチセレクト（tax / data / efficiency / management / subsidy）
    ※ ガイドとの紐付け＋ブログフィルタに使用
```

### 保留

```
- glossary API（用語辞書）: ツールチップ独立フェーズ時に判断
```

---

## 6. siteConfig.ts の変更

```typescript
// siteBranding の concept は維持（HEROを変更しないため）
// export const siteBranding = { concept: '踏み出す人の、すぐ横にいる。' };

// concernTags のラベルとアイコンを追加
export const concernTagLabels: Record<ConcernTag, string> = {
  tax: '制度対応',
  data: 'データ活用',
  efficiency: '業務効率化',
  management: '経営整理',
  subsidy: '補助金活用',
};

export const concernTagIcons: Record<ConcernTag, string> = {
  tax: 'ri:file-list-3-line',
  data: 'ri:bar-chart-box-line',
  efficiency: 'ri:speed-line',
  management: 'ri:compass-3-line',
  subsidy: 'ri:money-cny-circle-line',
};
```

---

## 7. 実装ロードマップ

### Phase 1: トップページ改修

**詳細：** `site-design-spec.md` を参照

主な作業：

1. セクション構成を8セクションに変更
2. 「見えてきたこと」セクション追加
3. 困りごとチェックボックスのリンク先変更
4. 「実際に起きた変化」セクション追加
5. 「螺旋」セクション追加
6. ABOUT統合セクション作成
7. CTA軽量化
8. BLOG：エバーグリーン記事固定
9. 旧セクション削除

### Phase 2: ブログ強化＋ガイドページ

主な作業：

1. microCMSスキーマ変更（relatedSlugs, phase, concernTags追加）
2. 既存全記事にphase・relatedSlugs・concernTagsを設定
3. ブログ記事ページに仕組み実装（次に読む、更新日）
4. ブログ一覧ページにガイド誘導バナー＋concernTagsフィルタ追加
5. ガイド全体像ページ作成（/guide/）
6. 困りごと別ガイド5本作成（/guide/[topic]/）
7. ナビゲーション更新（siteConfig.ts + Header.astro — ガイド追加、プロフィール削除）
8. シミュレーター実装（CSS + vanilla JS。ガイド /guide/tax/ 内に配置）

**シミュレーター注意事項：**

- React不使用。CSS + vanilla JS で実装
- 2割特例は2026年10月で終了 → 時限コンテンツ
- 2026年10月以降の差し替え計画を事前に決めておく

触るファイル：

```
src/lib/siteConfig.ts           — ナビ変更
src/lib/microcms.ts             — 型定義追加
src/components/layout/Header.astro — currentPage型拡張（'guide'追加）
src/components/layout/MobileNav.astro — 同上
src/components/ui/NextRead.astro — 新規作成
src/pages/blog/[slug].astro      — 仕組み2つ埋め込み
src/pages/blog/index.astro       — ガイド誘導バナー追加
src/styles/blog.css              — スタイル追加
src/pages/guide/index.astro      — 新規作成
src/pages/guide/[topic].astro    — 新規作成
src/data/guides.ts               — 新規作成
src/styles/guide.css             — 新規作成
shared/contracts/api.ts          — Phase型追加
```

### Phase 3: 事例＋サービス再設計＋新規記事

主な作業：

1. 事例ページ作成（/cases/、/cases/[slug]/）
2. 事例データ作成（匿名2〜3件、`isPlaceholder: true`）
3. サービスページのリポジショニング
4. 新規ブログ記事：会計ソフト消費税設定ガイド
5. 新規ブログ記事：取引先棚卸しガイド
6. 新規ブログ記事：届出×補助金カレンダー

触るファイル：

```
src/pages/cases/index.astro      — 新規作成
src/pages/cases/[slug].astro     — 新規作成
src/data/cases.ts                — 新規作成
src/styles/cases.css             — 新規作成
src/pages/services/index.astro   — リポジショニング
src/data/services.ts             — 構造変更
```

### Phase 4: 計測・改善・拡張

**期間：** 継続

主な作業：

1. GA4で遷移率・回遊率を計測
2. 離脱が多いページから優先改善
3. 事例の追加・実名化（`isPlaceholder` フラグで管理）
4. 「決める」フェーズの記事を優先的に追加
5. カレンダー記事の定期更新
6. ガイドページの記事追加（新記事が増えるたびに）

### 独立フェーズ（時期未定）: ツールチップ（用語辞書）

- microCMSに用語辞書API新設
- ビルド時に記事HTML内の用語をスキャン＋ラップ
- 実装の脆さと運用コストを踏まえ、他の施策の効果を見てから判断
- 実装する場合：`src/components/ui/Tooltip.astro` + `src/lib/glossary.ts`

---

## 8. 遷移マップ（全サイト）

すべてナビバーではなく文脈の中のリンクで実現する。

### 記事ページからの遷移

| 遷移元            | 遷移先                               | トリガー |
| ----------------- | ------------------------------------ | -------- |
| 記事 → 記事       | 本文中の「次の疑問」リンク、NextRead |
| 記事 → ガイド     | 末尾の「このテーマをもっと →」       |
| 記事 → 事例       | 「この問題を解決した会社 →」         |
| 記事 → 問い合わせ | 末尾CTA（軽量）                      |

### トップページからの遷移

| 遷移元                | 遷移先                                             | トリガー |
| --------------------- | -------------------------------------------------- | -------- |
| トップ → ガイド       | 困りごとチェックボックスのリンク                   |
| トップ → ガイド全体像 | 螺旋セクション内の文脈リンク                       |
| トップ → 診断         | 困りごとセクション内のリンク                       |
| トップ → 事例         | 「実際に起きた変化」の「事例をもっと見る →」       |
| トップ → プロフィール | プロフィールカード「くわしいプロフィールを見る →」 |
| トップ → 問い合わせ   | CTA「まず話してみる」                              |

### ガイドからの遷移

| 遷移元                        | 遷移先                     | トリガー |
| ----------------------------- | -------------------------- | -------- |
| ガイド全体像 → 困りごとガイド | 各テーマのリンク           |
| ガイド全体像 → 診断           | 「わからない方は診断 →」   |
| 困りごとガイド → 記事         | 道筋上の記事リンク         |
| 困りごとガイド → 事例         | 「この道筋を歩いた会社 →」 |
| 困りごとガイド → 問い合わせ   | CTA（軽量）                |

### ブログ一覧からの遷移

| 遷移元        | 遷移先             | トリガー |
| ------------- | ------------------ | -------- |
| 一覧 → 記事   | 記事カードクリック |
| 一覧 → ガイド | 途中の誘導バナー   |

### 事例からの遷移

| 遷移元            | 遷移先                     | トリガー |
| ----------------- | -------------------------- | -------- |
| 事例 → 問い合わせ | 「似た状況で相談したい →」 |
| 事例 → ガイド     | 関連するガイドリンク       |
| 事例 → 記事       | 関連する記事リンク         |

---

## 9. 裏の骨格（記事フェーズ分類）

全ブログ記事を以下の4分類で管理する。microCMSの `phase` フィールドに設定。読者には見せない。

### 知る（know）

- data-utilization-honest-guide-sme
- sales-data-analysis-for-sme
- kpi-dashboard-guide
- （MF BI記事は未公開）
- database-thinking-for-sme

### 決める（decide）

- management-issues-5-steps
- management-triple-crisis-2026
- simplified-vs-standard-tax-simulation-2026
- freee-vs-moneyforward
- 取引先棚卸し（新規予定）
- 値付け戦略（新規予定）

### 変わる（change）

- excel-dependency-escape-guide
- nocode-automation-guide-sme
- 会計ソフト消費税設定ガイド（新規予定）
- ai-tools-comparison-2026
- chatgpt-prompts-for-sme
- （shotgun-prompts記事は未公開）
- ai-adoption-pitfalls-sme

### 外部環境トリガー（trigger）

- invoice-transition-2026-oct
- invoice-3wari-corporation-not-eligible
- denshicho-checklist-sme
- dx-subsidy-guide-2026
- subsidy-application-guide
- it-subsidy-business-plan-guide
- invoice-accounting-software-subsidy-2026
- freee-website-case-study
- 持続化補助金（新規予定）
- カレンダー（新規予定）
- セキュリティ入門（新規予定）

### バランス状況

- 知る：5本
- 決める：4本 ← 薄い。優先的に強化
- 変わる：7本
- トリガー：11本 ← 十分

---

## 10. ディレクトリ構造（to-be差分）

```
src/
├── components/
│   └── ui/
│       └── NextRead.astro       ★ 新規（Phase 2）
├── data/
│   ├── guides.ts                ★ 新規（Phase 2）
│   ├── cases.ts                 ★ 新規（Phase 3）
│   └── homepage.ts              ← 変更（Phase 1）
├── lib/
│   ├── siteConfig.ts            ← 変更（Phase 2: ナビ）
│   └── microcms.ts              ← 変更（Phase 2: 型追加）
├── pages/
│   ├── index.astro              ← 変更（Phase 1）
│   ├── guide/
│   │   ├── index.astro          ★ 新規（Phase 2）
│   │   └── [topic].astro        ★ 新規（Phase 2）
│   ├── cases/
│   │   ├── index.astro          ★ 新規（Phase 3）
│   │   └── [slug].astro         ★ 新規（Phase 3）
│   ├── blog/
│   │   ├── index.astro          ← 変更（Phase 2: バナー追加）
│   │   └── [slug].astro         ← 変更（Phase 2: 仕組み2つ）
│   └── services/
│       └── index.astro          ← 変更（Phase 3）
├── styles/
│   ├── guide.css                ★ 新規（Phase 2）
│   ├── cases.css                ★ 新規（Phase 3）
│   ├── home.css                 ← 変更（Phase 1）
│   └── blog.css                 ← 変更（Phase 2）
└── shared/
    └── contracts/
        └── api.ts               ← 変更（Phase 2: Phase型）
```

---

## 11. やらないこと（全Phase通じて）

- デザイントークン（tokens.css）の変更
- レイアウト（Layout.astro）の大幅変更
- ヘッダー・フッターのデザイン変更（リンク追加のみ）
- 既存ブログ記事の本文内容修正
- ダークモードの廃止や変更
- フォント変更
- microCMSからの移行
- Cloudflare Pagesからの移行
- React/Astro islands の導入（全てCSS + vanilla JSで実装）

---

## 12. 品質基準（既存のproject.rulesに準拠）

- Lighthouse Performance ≥ 90
- Lighthouse Accessibility: 100
- Lighthouse SEO: 100
- TypeScript strict mode
- 新規ページにもStructuredData（JSON-LD）を設定
- 新規ページにもBreadcrumbを設定
- 新規CSSは既存のデザイントークンのみ使用
- コミット規約に従う

---

## 13. 保留事項一覧

Phase 2実装前に決定が必要な項目：

| 項目                                 | 判断時期          | 選択肢                                                   |
| ------------------------------------ | ----------------- | -------------------------------------------------------- |
| ~~ガイド vs カテゴリページの関係性~~ | ~~Phase 2前~~     | **決定：併存**（ガイド＝道筋、カテゴリ＝分類）           |
| ~~concernTags の要否~~               | ~~Phase 2前~~     | **決定：導入**（tax/data/efficiency/management/subsidy） |
| 事例ナビ昇格                         | Phase 3後         | 実績数次第でナビに追加                                   |
| ツールチップ実装                     | Phase 2効果測定後 | 実装 / 見送り                                            |

---

## 14. 方針決定ログ（2026-03-10）

議論の結果、以下の方針を確定：

| #   | 決定事項                                                                  | 結果                                               |
| --- | ------------------------------------------------------------------------- | -------------------------------------------------- |
| 1   | シミュレーター: React → CSS + vanilla JS、トップから外してガイド/ブログへ | 採用                                               |
| 2   | 「見えてきたこと」にリンク追加                                            | 却下（誘導感が出る）                               |
| 3   | 「実際に起きた変化」: 架空OK、実績で差替え明記                            | 採用                                               |
| 4   | ガイド vs カテゴリの関係性明記                                            | **併存**（ガイド＝道筋、カテゴリ＝分類）           |
| 5   | ナビ: Home, Guide, Services, Blog の4項目                                 | 採用                                               |
| 6   | concernTags の再検討                                                      | **導入**（tax/data/efficiency/management/subsidy） |
| 7   | ツールチップをPhase 2から独立フェーズに分離                               | 採用                                               |
| 8   | 設計書にSEO項目追加                                                       | 採用                                               |
| 9   | アイコン名: ri:money-cny-circle-line（Remix Icon準拠）                    | 採用                                               |
| 10  | HERO: 「すぐ横にいる」現状維持、じいちゃんはABOUTで                       | 採用                                               |
| 11  | 困りごと: チェックボックス維持、CTA接続なし、ガイドへリンク               | 採用                                               |
| 12  | やること → 螺旋: テキスト＋図、フレームワーク名出さない                   | 採用                                               |
| 13  | ABOUT: 原案ベース、旧セクション4つを統合                                  | 採用                                               |
| 14  | 入口B/C: 独立セクションではなく文脈に溶かす                               | 採用                                               |
| 15  | CTA: 1行＋ボタンの軽量版                                                  | 採用                                               |
| 16  | BLOG: エバーグリーン記事固定、一番下                                      | 採用                                               |
