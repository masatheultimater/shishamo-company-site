# 改善提案リスト

**作成日**: 2026-01-31
**対象サイト**: ししゃも｜吉川昌宏 サービスサイト

---

## 1. HTML品質

### 1.1 セマンティックHTMLの改善

#### 現状の問題

1. **ランドマーク不足**
   - `<main>` 要素が使用されていない
   - `<section>` に適切なaria-labelがない

**改善案** (Layout.astro):
```html
<body>
  <header class="header" role="banner">...</header>
  <main id="main-content">
    <slot />
  </main>
  <footer class="footer" role="contentinfo">...</footer>
</body>
```

2. **スキップリンクの追加**

**改善案** (Layout.astro):
```html
<body>
  <a href="#main-content" class="skip-link">メインコンテンツへスキップ</a>
  <!-- ... -->
</body>
```

```css
.skip-link {
  position: absolute;
  top: -100%;
  left: 0;
  z-index: 1000;
  padding: 1rem;
  background: var(--primary);
  color: white;
}
.skip-link:focus {
  top: 0;
}
```

### 1.2 不要な要素・コメント

**発見事項**: コードは比較的クリーンですが、以下を確認してください。

- [ ] コメントアウトされたコードがないか確認
- [ ] 開発用のconsole.logがないか確認（JavaScriptに含まれていない - OK）

### 1.3 フッターの構造改善

**現状**:
```html
<div class="footer-links">
  <h4>サービス</h4>
```

**改善案**:
```html
<nav class="footer-links" aria-labelledby="footer-services-heading">
  <h2 id="footer-services-heading" class="footer-heading">サービス</h2>
```

---

## 2. アクセシビリティ

### 2.1 フォームの改善 (contact/index.astro)

**現状**:
```html
<label>お名前<span class="required">*</span></label>
<input type="text" name="name" required>
```

**改善案**:
```html
<div class="form-group">
  <label for="contact-name">
    お名前
    <span class="required" aria-hidden="true">*</span>
    <span class="sr-only">（必須）</span>
  </label>
  <input
    type="text"
    id="contact-name"
    name="name"
    required
    aria-required="true"
    placeholder="山田 太郎"
  >
</div>
```

スクリーンリーダー用の非表示テキスト:
```css
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}
```

### 2.2 モバイルメニューの改善

**現状**:
```javascript
mobileMenuBtn.textContent = mobileNav?.classList.contains('active') ? '×' : '☰';
```

**改善案**:
```javascript
function toggleMenu() {
  const isExpanded = mobileNav?.classList.toggle('active');
  if (mobileMenuBtn) {
    mobileMenuBtn.textContent = isExpanded ? '×' : '☰';
    mobileMenuBtn.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  }
}
```

### 2.3 リンクの改善

**「詳しく見る」リンク**:
```html
<!-- 現状 -->
<a href="/services/#dx" class="category-link">詳しく見る →</a>

<!-- 改善案 -->
<a href="/services/#dx" class="category-link" aria-label="DX・IT戦略について詳しく見る">
  詳しく見る <span aria-hidden="true">→</span>
</a>
```

### 2.4 フォーカス表示の強化

**追加すべきCSS** (global.css):
```css
/* カスタムフォーカス表示 */
:focus {
  outline: none;
}

:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
  border-radius: 4px;
}

/* ボタン・リンク用 */
.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 3px solid var(--secondary);
  outline-offset: 3px;
}
```

---

## 3. レスポンシブ表示の確認ポイント

### 3.1 ブレークポイント

| ブレークポイント | 対応状況 | 確認ポイント |
|-----------------|----------|-------------|
| 1024px | PASS | タブレット横向き |
| 768px | PASS | タブレット縦向き |
| 480px | PASS | スマートフォン |

### 3.2 確認が必要な要素

#### ヘッダー・ナビゲーション
- [ ] モバイルメニューの開閉動作
- [ ] タップターゲットのサイズ（最低44x44px推奨）
- [ ] ロゴテキストの省略表示（480px以下）

#### フォーム（お問い合わせ）
- [ ] 入力欄のフォントサイズ（16px以上でiOSズーム回避）
  - 現状: `font-size: 16px; /* Prevent iOS zoom */` - OK
- [ ] セレクトボックスの操作性
- [ ] 送信ボタンの幅（100%で十分なタップ領域）

#### コンテンツレイアウト
- [ ] サービスカードの折り返し
- [ ] タイムライン表示の見やすさ
- [ ] 価格表示のレイアウト崩れ

### 3.3 テスト推奨デバイス

1. **iPhone SE** (375px) - 最小スマートフォン
2. **iPhone 14** (390px) - 標準スマートフォン
3. **iPad** (768px/1024px) - タブレット
4. **Desktop** (1280px+) - デスクトップ

---

## 4. パフォーマンス改善

### 4.1 CSS最適化

#### 不要なCSSの候補

現状のCSSは比較的最適化されていますが、以下を確認してください：

1. **未使用のアニメーション**
   - `pulse-glow` - プロフィールページでのみ使用
   - ページ単位でのCSS分割を検討

2. **重複定義の可能性**
   - グラデーション定義が複数箇所で同じ値
   - CSS変数でさらに共通化可能

#### 改善案: グラデーション変数化
```css
:root {
  --gradient-primary: linear-gradient(135deg, var(--primary), var(--primary-dark));
  --gradient-accent: linear-gradient(135deg, var(--primary), var(--accent));
  --gradient-highlight: linear-gradient(90deg, var(--primary), var(--accent), var(--secondary));
}
```

### 4.2 画像最適化の準備

将来画像を追加する際の推奨事項：

1. **フォーマット**
   - WebP形式を優先（fallbackにJPG/PNG）
   - SVGはロゴ・アイコン用

2. **サイズ**
   - デスクトップ用: 最大1920px幅
   - モバイル用: 750px幅（Retina対応）
   - サムネイル: 400px幅

3. **Astroでの実装**
   ```astro
   ---
   import { Image } from 'astro:assets';
   import profileImage from '../assets/profile.webp';
   ---
   <Image
     src={profileImage}
     alt="吉川昌宏のプロフィール写真"
     width={400}
     height={400}
     loading="lazy"
   />
   ```

### 4.3 フォント最適化

**現状**:
```html
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;900&family=Space+Grotesk:wght@500;700&display=swap" rel="stylesheet">
```

**改善案**:
1. `font-display: swap`は設定済み - OK
2. preconnectも設定済み - OK
3. 使用フォントウェイトの精査
   - Noto Sans JP: 400, 500, 700, 900 → 本当にすべて必要か確認
   - 900は見出しのみに限定的に使用

---

## 5. SEO改善

### 5.1 構造化データの追加

**推奨**: LocalBusiness + Person スキーマ

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "name": "ししゃも｜吉川昌宏",
  "description": "中小企業向けコンサルタント。DX推進・生成AI導入・データ活用・経営支援をサポート。",
  "url": "https://yoshikawa-masahiro.com",
  "founder": {
    "@type": "Person",
    "name": "吉川昌宏",
    "jobTitle": ["中小企業診断士", "ITストラテジスト"]
  },
  "areaServed": {
    "@type": "Country",
    "name": "Japan"
  },
  "serviceType": [
    "DX推進コンサルティング",
    "生成AI導入支援",
    "経営データ分析",
    "記帳代行"
  ]
}
</script>
```

### 5.2 OGP画像の設定

**現状**: OGP画像が未設定

**必要な対応**:
1. 1200x630pxのOGP画像を作成
2. Layout.astroに追加：
```html
<meta property="og:image" content="https://yoshikawa-masahiro.com/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="https://yoshikawa-masahiro.com/og-image.png">
```

---

## 6. 優先度別タスクリスト

### 高優先度（本番公開前）

- [ ] フォームのlabel/input紐付け（id/for属性）
- [ ] プレースホルダーリンク（#）の置き換え
- [ ] モバイルメニューのaria-expanded属性
- [ ] OGP画像の設定
- [ ] Formspreeエンドポイントの確認

### 中優先度（公開後1週間以内）

- [ ] main要素の追加
- [ ] スキップリンクの実装
- [ ] フォーカス表示のカスタマイズ
- [ ] 構造化データの追加
- [ ] 「詳しく見る」リンクのaria-label

### 低優先度（継続的改善）

- [ ] フッターの見出し階層修正
- [ ] CSS変数のさらなる共通化
- [ ] フォントウェイトの精査
- [ ] プライバシーポリシーページの作成

---

## 7. テストチェックリスト

### 公開前テスト

- [ ] 全ページがエラーなく表示される
- [ ] すべてのリンクが正しく動作する
- [ ] お問い合わせフォームが送信できる
- [ ] モバイルでの表示が崩れない
- [ ] Chrome、Safari、Firefoxで確認

### アクセシビリティテスト

- [ ] キーボードのみで全機能が操作可能
- [ ] axe DevToolsでエラーがない
- [ ] Lighthouseアクセシビリティスコア100

### パフォーマンステスト

- [ ] Lighthouse Performance 90以上
- [ ] First Contentful Paint 1.5秒以内
- [ ] モバイルでの読み込み3秒以内
