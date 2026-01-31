# ししゃも（吉川昌宏）サービスサイト 技術構成

## 技術スタック一覧

| カテゴリ | 技術 | 用途 |
|---------|------|------|
| **フレームワーク** | Astro | 静的サイト生成（SSG） |
| **スタイリング** | Tailwind CSS / Vanilla CSS | デザイン実装 |
| **CMS** | microCMS | ブログ・お知らせ管理 |
| **ホスティング** | Cloudflare Pages | サイト配信・CDN |
| **DNS** | Cloudflare | ドメイン管理・DNS |
| **メール転送** | Cloudflare Email Routing | info@shishamo-company.com → Gmail転送 |
| **フォーム送信** | Formspree / Resend | お問い合わせメール送信 |
| **フォント** | Google Fonts | Noto Sans JP, Space Grotesk |
| **アイコン** | 絵文字 / Lucide | UI装飾 |

---

## ネットワーク構成図

```
┌─────────────────────────────────────────────────────────────────────┐
│                           インターネット                              │
└─────────────────────────────────────────────────────────────────────┘
                                    │
                                    ▼
┌─────────────────────────────────────────────────────────────────────┐
│                        Cloudflare (CDN/DNS)                         │
│  ┌─────────────────────────────────────────────────────────────┐   │
│  │  DNS: shishamo-company.com                                           │   │
│  │  ├── A/AAAA → Cloudflare Pages                              │   │
│  │  └── MX → Cloudflare Email Routing                          │   │
│  └─────────────────────────────────────────────────────────────┘   │
│                                                                     │
│  ┌─────────────────────┐    ┌─────────────────────┐                │
│  │  Cloudflare Pages   │    │  Email Routing      │                │
│  │  (静的サイト配信)    │    │  info@shishamo-company.com  │                │
│  │  - HTML/CSS/JS      │    │        ↓            │                │
│  │  - 画像アセット      │    │  転送先:            │                │
│  │  - 自動HTTPS        │    │  masatheultimater   │                │
│  │  - 自動デプロイ      │    │  @gmail.com        │                │
│  └─────────────────────┘    └─────────────────────┘                │
└─────────────────────────────────────────────────────────────────────┘
         │                              
         │ ビルド時にAPI取得                    
         ▼                              
┌─────────────────────┐    ┌─────────────────────┐
│     microCMS        │    │     Formspree       │
│  (ヘッドレスCMS)     │    │  (フォーム処理)      │
│  - ブログ記事        │    │  - お問い合わせ受信   │
│  - お知らせ          │    │  - メール送信        │
│  - 実績紹介          │    │        ↓            │
└─────────────────────┘    │  masatheultimater   │
                           │  @gmail.com         │
                           └─────────────────────┘
```

---

## データフロー

### 1. サイト閲覧時
```
ユーザー → Cloudflare CDN → 静的HTML/CSS/JS（キャッシュ配信）
```

### 2. お問い合わせ送信時
```
ユーザー → フォーム送信 → Formspree → メール → masatheultimater@gmail.com
```

### 3. ブログ更新時
```
管理者 → microCMS管理画面で記事作成 
      → Webhook → Cloudflare Pages再ビルド 
      → 新しい静的ページ生成・配信
```

### 4. メール受信時（info@shishamo-company.com宛）
```
送信者 → info@shishamo-company.com → Cloudflare Email Routing → masatheultimater@gmail.com
```

---

## 各サービスの役割詳細

### Astro（フレームワーク）
- **選定理由**: 高速な静的サイト生成、コンテンツ重視のサイトに最適
- **特徴**: 
  - ゼロJavaScript（必要な部分だけハイドレーション）
  - Island Architecture
  - 優れたDX（開発者体験）
- **使用機能**:
  - 静的ページ生成
  - コンポーネント化（.astroファイル）
  - microCMS連携

### Cloudflare Pages（ホスティング）
- **選定理由**: 無料、高速、GitHub連携、Astro公式サポート
- **特徴**:
  - グローバルCDN（日本含む300+拠点）
  - 自動HTTPS
  - GitHubプッシュで自動デプロイ
  - プレビューURL（PRごと）
- **無料枠**: 無制限ビルド、500回/月デプロイ

### Cloudflare Email Routing（メール転送）
- **選定理由**: 無料、Cloudflare DNS利用なら設定簡単
- **設定**:
  ```
  info@shishamo-company.com → masatheultimater@gmail.com
  ```
- **注意**: 受信専用（送信にはGmail「別のアドレスから送信」設定が必要）

### microCMS（ヘッドレスCMS）
- **選定理由**: 日本製、日本語UI、無料枠十分、Astro連携実績多
- **使用用途**:
  - ブログ記事
  - お知らせ
  - （将来）実績紹介
- **無料枠**: 3 API、10,000リクエスト/月

### Formspree（フォーム処理）
- **選定理由**: 最も簡単、バックエンド不要
- **無料枠**: 50件/月
- **代替案**: Cloudflare Functions + Resend

---

## セキュリティ

| 項目 | 対策 |
|------|------|
| HTTPS | Cloudflare自動（Let's Encrypt） |
| DDoS | Cloudflare標準保護 |
| フォームスパム | Formspreeのスパムフィルタ + reCAPTCHA（任意） |
| メールスパム | Cloudflare Email Routing標準フィルタ |

---

## パフォーマンス

| 指標 | 目標値 | 実現方法 |
|------|--------|----------|
| First Contentful Paint | < 1.5s | 静的配信、CDN |
| Largest Contentful Paint | < 2.5s | 画像最適化、フォント最適化 |
| Total Blocking Time | < 200ms | ゼロJS（Astro） |
| Cumulative Layout Shift | < 0.1 | フォントswap、画像サイズ指定 |

---

## 費用

| サービス | 月額費用 | 備考 |
|----------|----------|------|
| Cloudflare Pages | ¥0 | 無料プラン |
| Cloudflare DNS | ¥0 | 無料 |
| Cloudflare Email Routing | ¥0 | 無料 |
| microCMS | ¥0 | Hobbyプラン |
| Formspree | ¥0 | 無料プラン（50件/月） |
| **ドメイン（shishamo-company.com）** | **約¥1,500/年** | 取得・更新費用 |
| **合計** | **約¥125/月** | ドメイン代のみ |

---

## 将来の拡張

### フェーズ2（必要に応じて）
- [ ] Google Analytics 4（アクセス解析）
- [ ] Cloudflare Web Analytics（プライバシー重視なら）
- [ ] OGP画像自動生成（@vercel/og または satori）

### フェーズ3（ビジネス拡大時）
- [ ] 予約システム（Calendly連携）
- [ ] 顧客管理（Notion / Airtable）
- [ ] ニュースレター（Resend / ConvertKit）

---

## ドメイン・メール設定手順（参考）

### 1. ドメイン取得
```
shishamo-company.com を取得（お名前.com、Google Domains等）
```

### 2. Cloudflareにドメイン追加
```
Cloudflare → Add site → shishamo-company.com
ネームサーバーをCloudflareに変更
```

### 3. Cloudflare Pagesにカスタムドメイン設定
```
Pages → プロジェクト → Custom domains → shishamo-company.com
```

### 4. Email Routing設定
```
Cloudflare → Email → Email Routing
Create address: info@shishamo-company.com
Destination: masatheultimater@gmail.com
```

### 5. Gmailで送信設定（任意）
```
Gmail → 設定 → アカウントとインポート
→ 他のメールアドレスを追加: info@shishamo-company.com
→ SMTPサーバー設定（Gmail or 外部SMTP）
```
