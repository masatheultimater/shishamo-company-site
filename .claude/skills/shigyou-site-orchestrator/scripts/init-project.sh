#!/bin/bash
# init-project.sh
# 士業サイトプロジェクト初期化スクリプト（汎用版）
# Usage: ./init-project.sh <profile.yaml>

set -e

PROFILE_FILE="${1:-project-profile.yaml}"
SKILL_DIR="$(dirname "$0")/.."

if [ ! -f "$PROFILE_FILE" ]; then
  echo "❌ Profile file not found: $PROFILE_FILE"
  echo "Usage: $0 <profile.yaml>"
  exit 1
fi

# プロファイルからプロジェクト名を取得（シンプルなgrep）
PROJECT_NAME=$(grep '^project_name:' "$PROFILE_FILE" | cut -d' ' -f2)
DOMAIN=$(grep '^domain:' "$PROFILE_FILE" | cut -d' ' -f2)
PRIMARY_COLOR=$(grep 'primary:' "$PROFILE_FILE" | head -1 | sed 's/.*"\(#[^"]*\)".*/\1/')
SECONDARY_COLOR=$(grep 'secondary:' "$PROFILE_FILE" | head -1 | sed 's/.*"\(#[^"]*\)".*/\1/')
ACCENT_COLOR=$(grep 'accent:' "$PROFILE_FILE" | head -1 | sed 's/.*"\(#[^"]*\)".*/\1/')
DARK_COLOR=$(grep 'dark:' "$PROFILE_FILE" | head -1 | sed 's/.*"\(#[^"]*\)".*/\1/')
LIGHT_COLOR=$(grep 'light:' "$PROFILE_FILE" | head -1 | sed 's/.*"\(#[^"]*\)".*/\1/')

echo "🚀 Initializing project: $PROJECT_NAME"
echo "   Domain: $DOMAIN"
echo "   Primary: $PRIMARY_COLOR"

# 1. Astroプロジェクト作成
echo ""
echo "📦 Creating Astro project..."
npm create astro@latest "$PROJECT_NAME" -- --template minimal --install --git --typescript strict

cd "$PROJECT_NAME"

# 2. 依存関係追加
echo ""
echo "📦 Installing dependencies..."
npm install microcms-js-sdk
npm install -D @astrojs/sitemap @astrojs/cloudflare

# 3. ディレクトリ構造作成
echo ""
echo "📁 Creating directory structure..."
mkdir -p shared/contracts
mkdir -p src/components/{common,sections,features,layout}
mkdir -p src/layouts
mkdir -p src/content
mkdir -p src/styles
mkdir -p src/types
mkdir -p public/schema
mkdir -p public/images
mkdir -p cloudflare
mkdir -p tests
mkdir -p reports
mkdir -p docs

# 4. プロファイルをsharedにコピー
echo ""
echo "📋 Setting up shared context..."
cp "../$PROFILE_FILE" shared/profile.yaml

# 5. project.rules作成
cat > shared/project.rules << EOF
# Project Rules
# Auto-generated from profile

## プロジェクト基本情報
project_name: $PROJECT_NAME
domain: $DOMAIN
tech_stack:
  framework: astro
  cms: microcms
  hosting: cloudflare-pages

## 命名規則
naming:
  components: PascalCase
  files: kebab-case
  css_vars: kebab-case
  branches: feature/agent-task

## ディレクトリ構造
directories:
  components:
    common: 汎用UI（Button, Card, Badge）
    sections: ページセクション（Hero, Services, CTA）
    features: 機能コンポーネント（ContactForm, BlogCard）
    layout: レイアウト部品（Header, Footer, Nav）
  pages: ルーティング対応ページ
  content: CMS連携コンテンツ定義
  styles: グローバルスタイル

## 品質基準
quality:
  lighthouse:
    performance: 90
    accessibility: 100
    best_practices: 100
    seo: 100
  typescript: strict
  wcag: 2.1-AA

## 禁止事項
forbidden:
  - any型の使用
  - インラインスタイル（scopedスタイル推奨）
  - ハードコードされた色・フォントサイズ
  - alt属性のない画像
  - labelのないフォーム要素
EOF

# 6. design-tokens.json作成
cat > shared/design-tokens.json << EOF
{
  "colors": {
    "primary": "${PRIMARY_COLOR:-#2563EB}",
    "primary-dark": "${PRIMARY_COLOR_DARK:-#1D4ED8}",
    "secondary": "${SECONDARY_COLOR:-#F59E0B}",
    "accent": "${ACCENT_COLOR:-#10B981}",
    "dark": "${DARK_COLOR:-#1E293B}",
    "light": "${LIGHT_COLOR:-#F8FAFC}",
    "gray": {
      "50": "#F8FAFC",
      "100": "#F1F5F9",
      "200": "#E2E8F0",
      "300": "#CBD5E1",
      "400": "#94A3B8",
      "500": "#64748B",
      "600": "#475569",
      "700": "#334155",
      "800": "#1E293B"
    }
  },
  "typography": {
    "fontFamily": {
      "display": "'Space Grotesk', 'Noto Sans JP', sans-serif",
      "body": "'Noto Sans JP', sans-serif"
    },
    "fontSize": {
      "xs": "0.75rem",
      "sm": "0.875rem",
      "base": "1rem",
      "lg": "1.125rem",
      "xl": "1.25rem",
      "2xl": "1.5rem",
      "3xl": "2rem",
      "4xl": "2.5rem",
      "5xl": "3.5rem"
    }
  },
  "spacing": {
    "section": "6rem",
    "container": "1200px"
  },
  "shadows": {
    "sm": "0 1px 2px rgba(0,0,0,0.05)",
    "md": "0 4px 6px -1px rgba(0,0,0,0.1)",
    "lg": "0 10px 15px -3px rgba(0,0,0,0.1)",
    "xl": "0 20px 25px -5px rgba(0,0,0,0.1)"
  },
  "radii": {
    "sm": "4px",
    "md": "8px",
    "lg": "12px",
    "xl": "16px"
  }
}
EOF

# 7. contracts作成
cat > shared/contracts/components.ts << 'EOF'
// Component Contracts
// 各コンポーネントのProps型定義

export interface HeroSectionProps {
  title: string;
  subtitle?: string;
  ctaPrimary?: { text: string; href: string };
  ctaSecondary?: { text: string; href: string };
}

export interface ServiceCardProps {
  id: string;
  name: string;
  icon: string;
  description: string;
  priceMin?: number;
  priceMax?: number;
  priceUnit?: string;
  tags?: string[];
}

export interface ProfileSectionProps {
  name: string;
  nickname?: string;
  tagline: string;
  bio: string;
  qualifications: string[];
  stats?: { label: string; value: string | number }[];
}

export interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  category?: string;
  thumbnail?: { url: string };
}

export interface CTASectionProps {
  title: string;
  description?: string;
  buttonText: string;
  buttonHref: string;
}
EOF

cat > shared/contracts/api.ts << 'EOF'
// API Type Definitions
// microCMS等のAPI型定義

export interface MicroCMSImage {
  url: string;
  width: number;
  height: number;
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  thumbnail?: MicroCMSImage;
  publishedAt: string;
  updatedAt: string;
}

export interface BlogListResponse {
  contents: BlogPost[];
  totalCount: number;
  offset: number;
  limit: number;
}
EOF

# 8. tokens.css作成
cat > src/styles/tokens.css << EOF
/* Design Tokens - Auto-generated */
:root {
  /* Colors */
  --color-primary: ${PRIMARY_COLOR:-#2563EB};
  --color-primary-dark: ${PRIMARY_COLOR_DARK:-#1D4ED8};
  --color-secondary: ${SECONDARY_COLOR:-#F59E0B};
  --color-accent: ${ACCENT_COLOR:-#10B981};
  --color-dark: ${DARK_COLOR:-#1E293B};
  --color-light: ${LIGHT_COLOR:-#F8FAFC};
  
  --color-gray-50: #F8FAFC;
  --color-gray-100: #F1F5F9;
  --color-gray-200: #E2E8F0;
  --color-gray-300: #CBD5E1;
  --color-gray-400: #94A3B8;
  --color-gray-500: #64748B;
  --color-gray-600: #475569;
  --color-gray-700: #334155;
  --color-gray-800: #1E293B;
  
  /* Typography */
  --font-display: 'Space Grotesk', 'Noto Sans JP', sans-serif;
  --font-body: 'Noto Sans JP', sans-serif;
  
  /* Spacing */
  --space-section: 6rem;
  --container-max: 1200px;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.1);
  --shadow-lg: 0 10px 15px -3px rgba(0,0,0,0.1);
  --shadow-xl: 0 20px 25px -5px rgba(0,0,0,0.1);
  
  /* Radii */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  
  /* Transitions */
  --transition-base: 0.3s ease;
}
EOF

# 9. global.css作成
cat > src/styles/global.css << 'EOF'
@import './tokens.css';

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  color: var(--color-dark);
  line-height: 1.7;
  background: var(--color-light);
}

h1, h2, h3, h4 {
  font-family: var(--font-display);
  line-height: 1.3;
}

a {
  color: inherit;
  text-decoration: none;
}

img {
  max-width: 100%;
  height: auto;
}

/* Focus states for accessibility */
*:focus-visible {
  outline: 2px solid var(--color-primary);
  outline-offset: 2px;
}
EOF

# 10. .env.example作成
cat > .env.example << 'EOF'
MICROCMS_SERVICE_DOMAIN=your-service-domain
MICROCMS_API_KEY=your-api-key
TURNSTILE_SITE_KEY=your-site-key
TURNSTILE_SECRET_KEY=your-secret-key
EOF

# 11. _headers作成
cat > public/_headers << 'EOF'
/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=()
EOF

# 12. astro.config.mjs更新
cat > astro.config.mjs << EOF
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  site: 'https://${DOMAIN}',
  output: 'static',
  adapter: cloudflare(),
  integrations: [sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
        '@components': '/src/components',
        '@layouts': '/src/layouts',
        '@styles': '/src/styles',
      }
    }
  }
});
EOF

echo ""
echo "✅ Project initialized successfully!"
echo ""
echo "📁 Structure:"
echo "   $PROJECT_NAME/"
echo "   ├── shared/           # 共有コンテキスト（全エージェント参照）"
echo "   │   ├── profile.yaml  # プロジェクトプロファイル"
echo "   │   ├── project.rules # 命名規則・品質基準"
echo "   │   ├── design-tokens.json"
echo "   │   └── contracts/    # 型定義"
echo "   ├── src/components/   # UI Agent担当"
echo "   ├── src/content/      # Content Agent担当"
echo "   ├── cloudflare/       # Infra Agent担当"
echo "   └── tests/            # QA Agent担当"
echo ""
echo "🎯 Next steps:"
echo "   1. cd $PROJECT_NAME"
echo "   2. cp .env.example .env  # 環境変数設定"
echo "   3. 各エージェントでタスク実行"
echo ""
echo "📌 Agent commands:"
echo '   claude "shared/を読み込み、BaseLayoutとHeader/Footerを実装"'
