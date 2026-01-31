---
name: shigyou-site-orchestrator
description: 士業・専門家向けWebサイトをAstro + microCMS + Cloudflareで構築するための汎用エージェントオーケストレーター。複数のClaude Codeエージェントを統合管理し、高品質なサイトを効率的に構築する。プロジェクト初期化時にプロファイル設定を行うことで、任意の士業・専門家サイトに対応。
---

# 士業サイト オーケストレーター（汎用版）

## 概要

士業・専門家（税理士、行政書士、診断士、弁護士、ITコンサル等）向けのWebサイトを、複数のClaude Codeエージェントで並列構築するためのオーケストレーションスキル。

### 主な特徴

- **汎用性**: プロファイル設定を変えるだけで任意のプロジェクトに対応
- **並列化**: 4エージェント（UI/Content/Infra/QA）の同時実行で効率化
- **品質保証**: 共有コンテキストで一貫性を担保
- **モダン構成**: Astro + microCMS + Cloudflare Pages

## 技術スタック

```yaml
framework: Astro 4.x
cms: microCMS (Headless CMS)
hosting: Cloudflare Pages
form: Cloudflare Turnstile
style: CSS Modules / scoped CSS
typescript: strict mode
```

## クイックスタート

### Step 1: プロジェクトプロファイル作成

```bash
# プロファイルファイルを作成
cat > project-profile.yaml << 'EOF'
# === プロジェクト基本情報 ===
project_name: shishamo-site
domain: yoshikawa-masahiro.com
client_name: 吉川昌宏事務所
owner_name: 吉川昌宏
owner_nickname: ししゃも

# === 資格・専門性 ===
qualifications:
  - 中小企業診断士
  - ITストラテジスト
  - E資格（JDLA Deep Learning）
  - データベーススペシャリスト
  - 税理士（取得予定）

specialties:
  - DX推進
  - 生成AI導入支援
  - データ分析
  - Web構築
  - 経営診断
  - 記帳代行

# === ブランディング ===
tagline: "中小企業の挑戦を後押しする"
concept: "IT × 経営 × 財務で、ビジネスを加速"

# === デザイン方向性 ===
design:
  style: modern-tech  # modern-tech / traditional-trust / minimal-clean
  primary_color: "#2563EB"
  secondary_color: "#F59E0B"
  accent_color: "#10B981"
  
# === サイト構成 ===
pages:
  - slug: index
    title: トップ
  - slug: services
    title: サービス
  - slug: profile
    title: プロフィール
  - slug: blog
    title: ブログ
  - slug: contact
    title: お問い合わせ

# === 外部連携 ===
integrations:
  note: true
  x_twitter: true
  wiki: true
EOF
```

### Step 2: プロジェクト初期化

```bash
bash /path/to/skill/scripts/init-project.sh project-profile.yaml
cd $(grep 'project_name:' project-profile.yaml | cut -d' ' -f2)
```

### Step 3: 並列エージェント実行

```bash
# Terminal 1 - UI Agent
claude "shared/を読み込み、BaseLayout, Header, Footerを実装"

# Terminal 2 - Content Agent
claude "shared/を読み込み、microCMSスキーマを設計"

# Terminal 3 - Infra Agent
claude "shared/を読み込み、Cloudflare設定を構築"

# Terminal 4 - QA Agent
claude "Lighthouseベースラインを計測"
```

## オーケストレーション原則

### 1. 共有コンテキストファースト

全エージェントは作業開始前に `shared/` を読み込む:

```
shared/
├── project.rules        # プロジェクトルール（命名規則・品質基準）
├── design-tokens.json   # カラー・タイポグラフィ・スペーシング
├── profile.yaml         # プロジェクトプロファイル
└── contracts/
    ├── components.ts    # コンポーネントインターフェース
    └── api.ts           # CMS型定義
```

### 2. タスク依存関係（DAG）

```
[Phase 0: 準備] ─────────────────────────────
└── Orchestrator: プロファイルから共有コンテキスト生成

[Phase 1: 基盤] ← 4エージェント並列 ────────
├── UI Agent: BaseLayout + Header/Footer
├── Content Agent: CMSスキーマ設計
├── Infra Agent: Cloudflare初期設定
└── QA Agent: Lighthouseベースライン

[Phase 2: 実装] ← 部分並列 ─────────────────
├── UI Agent: 全ページ実装
├── Content Agent: 構造化データ（JSON-LD）
└── Infra Agent: セキュリティヘッダー・CSP

[Phase 3: 統合] ─────────────────────────────
└── QA Agent: 全体検証 → デプロイ準備
```

### 3. エージェント役割

| Agent | 責務 | 出力先 |
|-------|------|--------|
| **UI** | Astroコンポーネント・ページ | `src/components/`, `src/layouts/`, `src/pages/` |
| **Content** | CMSスキーマ・SEO・構造化データ | `src/content/`, `public/schema/` |
| **Infra** | ホスティング・CI/CD・セキュリティ | `cloudflare/`, `.github/`, `public/_headers` |
| **QA** | テスト・品質監査 | `tests/`, `reports/` |

## 品質基準

```yaml
lighthouse:
  performance: 90
  accessibility: 100
  best-practices: 100
  seo: 100

security:
  headers:
    - Content-Security-Policy
    - X-Frame-Options
    - X-Content-Type-Options
    - Strict-Transport-Security
  form: Cloudflare Turnstile

code:
  typescript: strict
  formatting: prettier
  linting: eslint
```

## プロジェクト別カスタマイズポイント

### 1. デザインスタイル

| スタイル | 特徴 | 向いている人 |
|---------|------|-------------|
| `modern-tech` | モダン、テック感、動きあり | IT系、コンサル、若手 |
| `traditional-trust` | 格式、信頼感、落ち着き | 弁護士、税理士、シニア |
| `minimal-clean` | シンプル、余白、洗練 | デザイナー、クリエイター |

### 2. 外部連携オプション

- **note連携**: RSS取得してブログに表示
- **X(Twitter)連携**: 最新投稿の埋め込み
- **Wiki連携**: 知識ベースへのリンク

## 参照ドキュメント

- `references/agent-prompts.md` - 各エージェント用プロンプトテンプレート
- `references/design-system.md` - デザインシステム詳細
- `references/seo-checklist.md` - SEOチェックリスト
- `templates/` - プロファイルテンプレート集
- `scripts/` - 自動化スクリプト
