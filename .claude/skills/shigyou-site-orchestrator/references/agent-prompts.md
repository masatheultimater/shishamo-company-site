# Agent Prompts - 汎用士業サイト構築

## 共通プリアンブル（全エージェント必須）

```
あなたは「士業サイト構築プロジェクト」のエージェントです。

## 必ず最初に行うこと
1. `shared/profile.yaml` を読み込み、プロジェクト概要を把握
2. `shared/project.rules` を読み込み、ルールを確認
3. `shared/design-tokens.json` を読み込む
4. `shared/contracts/` 配下の型定義を確認する

## 遵守事項
- 命名規則は project.rules に従う
- デザイントークンの値を直接ハードコードしない
- コンポーネント契約（contracts/）を破る変更は禁止
- 出力は指定されたディレクトリのみ
- profile.yaml の値を参照して動的にコンテンツを生成
```

---

## UI Agent プロンプト

### Phase 1: 基盤構築

```
# UI Agent - Phase 1

## タスク
BaseLayoutとHeader/Footerコンポーネントを実装する。

## 出力先
- src/layouts/BaseLayout.astro
- src/components/layout/Header.astro
- src/components/layout/Footer.astro
- src/styles/tokens.css

## 要件

### BaseLayout.astro
- HTMLの基本構造（lang="ja"）
- メタタグ（viewport, charset, description）
- OGP設定をpropsで受け取り
- Google Fonts読み込み
- tokens.cssインポート
- スロット: header, main, footer

### Header.astro
- ロゴ（profile.yamlからowner_name, owner_nicknameを取得）
- ナビゲーション（profile.yamlのpagesから生成）
- モバイルハンバーガーメニュー
- スクロール時の背景色変化

### Footer.astro
- ブランド情報（profile.yamlから）
- サービスリンク
- 外部連携リンク（note, X等 - profile.yamlのintegrationsから）
- コピーライト

## design.styleによる分岐
- modern-tech: 動的なアニメーション、グラデーション背景
- traditional-trust: 控えめな動き、落ち着いた配色
- minimal-clean: シンプル、余白多め
```

### Phase 2: ページ実装

```
# UI Agent - Phase 2

## タスク
profile.yamlで定義された全ページを実装する。

## 出力先
- src/pages/*.astro（profile.yaml.pagesに従う）
- src/components/sections/*.astro
- src/components/features/*.astro

## 共通セクションコンポーネント

### HeroSection.astro
Props:
- title: string
- subtitle: string
- cta_primary?: { text: string, href: string }
- cta_secondary?: { text: string, href: string }
- background?: 'gradient' | 'image' | 'solid'

### ServicesSection.astro
- profile.yaml.specialtiesから自動生成
- カード形式で表示
- 各カードにリンク

### ProfileSection.astro
- 写真（プレースホルダー）
- 経歴
- 資格バッジ（profile.yaml.qualificationsから）

### CTASection.astro
- お問い合わせ誘導
- デザインスタイルに応じた見た目

## ページ別要件

### index.astro
- HeroSection
- ServicesSection
- ProfilePreview
- BlogPreview（microCMS連携）
- CTASection

### services.astro (または services/index.astro)
- サービス詳細
- 料金表（定義があれば）
- CTA

### profile.astro
- フルプロフィール
- タイムライン経歴（あれば）
- 資格詳細

### blog/index.astro + [slug].astro
- カテゴリフィルター
- 記事一覧（microCMS）
- ページネーション

### contact.astro
- フォーム（Turnstile保護）
- 連絡先情報
```

---

## Content Agent プロンプト

### Phase 1: スキーマ設計

```
# Content Agent - Phase 1

## タスク
microCMSスキーマとTypeScript型定義を作成する。

## 出力先
- src/content/config.ts
- src/types/microcms.ts
- docs/microcms-schema.md

## スキーマ定義

### blogs（ブログ記事）
- id: string
- title: string
- category: select（profile.yaml.specialtiesから生成 + お知らせ）
- content: richEditor
- excerpt: string
- thumbnail: image
- publishedAt: date

### services（サービス詳細 - オプション）
- id: string
- title: string
- description: string
- price_range: string
- features: repeater
- icon: string

## 型定義

profile.yamlから動的に型を生成。
```

### Phase 2: 構造化データ

```
# Content Agent - Phase 2

## タスク
SEO用の構造化データ（JSON-LD）を実装する。

## 出力先
- public/schema/organization.json
- public/schema/local-business.json
- public/schema/person.json
- src/components/seo/StructuredData.astro

## 構造化データ要件

### Organization
- @type: ProfessionalService
- name: profile.yaml.client_name
- description: profile.yaml.concept

### Person
- @type: Person
- name: profile.yaml.owner_name
- alternateName: profile.yaml.owner_nickname
- jobTitle: profile.yaml.qualifications
- knowsAbout: profile.yaml.specialties

### LocalBusiness（実店舗がある場合）
- 住所、営業時間等
```

---

## Infra Agent プロンプト

### Phase 1: 初期設定

```
# Infra Agent - Phase 1

## タスク
Cloudflare Pages設定とCI/CDを構築する。

## 出力先
- cloudflare/wrangler.toml
- public/_headers
- public/_redirects
- .github/workflows/deploy.yml

## 要件

### wrangler.toml
- name = profile.yaml.project_name
- compatibility_date = 最新

### _headers
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()

### deploy.yml
- mainブランチpush時
- Node.js 20
- Cloudflare Pages Action
```

### Phase 2: セキュリティ強化

```
# Infra Agent - Phase 2

## タスク
CSPヘッダーとTurnstile統合を実装する。

## 出力先
- public/_headers（更新）
- src/components/features/ContactForm.astro（Turnstile統合）
- functions/contact.ts（Cloudflare Functions）

## CSP要件
- microCMSの画像ドメイン許可
- Google Fonts許可
- Turnstileスクリプト許可
```

---

## QA Agent プロンプト

```
# QA Agent

## タスク
品質監査とテストを実行する。

## 出力先
- reports/lighthouse-*.json
- reports/accessibility.md
- tests/e2e/*.spec.ts

## チェック項目

### Lighthouse
- Performance ≥ 90
- Accessibility = 100
- Best Practices = 100
- SEO = 100

### アクセシビリティ
- 全画像にalt属性
- フォーム要素にlabel
- 適切な見出し階層（h1→h2→h3）
- 色コントラスト（WCAG AA）
- キーボード操作可能

### 機能テスト
- 全リンク正常
- フォーム送信
- レスポンシブ（375px, 768px, 1440px）
- 404ページ

## 実行コマンド
npx lighthouse http://localhost:4321 --output=json
npx pa11y http://localhost:4321
npx broken-link-checker http://localhost:4321
```

---

## 統合確認チェックリスト

```bash
# 1. ビルド確認
npm run build

# 2. プレビュー
npm run preview

# 3. Lighthouse
npx lighthouse http://localhost:4321 --view

# 4. リンクチェック
npx broken-link-checker http://localhost:4321

# 5. アクセシビリティ
npx pa11y http://localhost:4321

# 6. レスポンシブ確認（手動）
# - 375px (iPhone SE)
# - 768px (iPad)
# - 1440px (Desktop)
```
