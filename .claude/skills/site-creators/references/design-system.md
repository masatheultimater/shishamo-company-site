# デザインシステム - 士業サイト汎用版

## デザインスタイル別ガイドライン

### 1. modern-tech（モダン・テック）

IT系、コンサル、若手専門家向け。

```css
/* カラーパレット */
--primary: #2563EB;       /* 鮮やかなブルー */
--primary-dark: #1D4ED8;
--secondary: #F59E0B;     /* アンバー */
--accent: #10B981;        /* エメラルド */
--dark: #1E293B;          /* スレート */
--light: #F8FAFC;

/* フォント */
--font-display: 'Space Grotesk', 'Noto Sans JP', sans-serif;
--font-body: 'Noto Sans JP', sans-serif;

/* 特徴 */
- グラデーション背景
- スクロールアニメーション
- ホバーエフェクト（scale, shadow）
- 角丸大きめ（12px-16px）
- カード型レイアウト
```

#### アニメーション

```css
/* フェードイン */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* ホバー */
.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-xl);
}

/* ヒーロー背景 */
.hero-bg {
  background: linear-gradient(135deg, var(--light) 0%, #EFF6FF 100%);
}
```

---

### 2. traditional-trust（トラディショナル・信頼）

弁護士、税理士、シニア専門家向け。

```css
/* カラーパレット */
--primary: #1a365d;       /* ネイビー */
--primary-dark: #0f2644;
--secondary: #b8860b;     /* ゴールド */
--accent: #2c5282;        /* ライトネイビー */
--dark: #2d3748;
--light: #faf9f7;         /* クリーム */

/* フォント */
--font-display: 'Noto Serif JP', serif;  /* 明朝体 */
--font-body: 'Noto Sans JP', sans-serif;

/* 特徴 */
- ソリッドカラー背景
- 控えめなトランジション
- ボーダー使い（ゴールド）
- 角丸小さめ（4px-6px）
- 余白で格式を表現
```

#### アクセント

```css
/* ゴールドボーダー */
.section-title::after {
  content: '';
  display: block;
  width: 60px;
  height: 2px;
  background: var(--secondary);
  margin-top: 1rem;
}

/* 資格バッジ */
.badge {
  border: 1px solid var(--secondary);
  color: var(--secondary);
  padding: 0.25rem 0.75rem;
  font-size: 0.8rem;
}
```

---

### 3. minimal-clean（ミニマル・クリーン）

デザイナー、クリエイター、洗練されたイメージ向け。

```css
/* カラーパレット */
--primary: #18181B;       /* ほぼ黒 */
--secondary: #71717A;     /* グレー */
--accent: #F4F4F5;        /* ライトグレー */
--dark: #09090B;
--light: #FFFFFF;

/* フォント */
--font-display: 'DM Sans', 'Noto Sans JP', sans-serif;
--font-body: 'Noto Sans JP', sans-serif;

/* 特徴 */
- 白ベース
- 余白たっぷり
- 細いライン
- モノトーン
- タイポグラフィ重視
```

#### レイアウト

```css
/* 余白 */
--space-section: 8rem;
--container-max: 900px;  /* 狭め */

/* 見出し */
h1 {
  font-size: 4rem;
  font-weight: 300;
  letter-spacing: -0.02em;
}
```

---

## 共通コンポーネントスタイル

### ボタン

```css
/* Primary */
.btn-primary {
  background: var(--primary);
  color: white;
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
  font-weight: 600;
  transition: all 0.2s;
}

.btn-primary:hover {
  background: var(--primary-dark);
  transform: translateY(-2px);
}

/* Secondary */
.btn-secondary {
  background: transparent;
  border: 2px solid var(--gray-300);
  color: var(--dark);
  padding: 1rem 2rem;
  border-radius: var(--radius-md);
}

.btn-secondary:hover {
  border-color: var(--primary);
  color: var(--primary);
}
```

### カード

```css
.card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 2rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--gray-200);
  transition: all 0.3s;
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-lg);
  border-color: var(--primary);
}
```

### フォーム

```css
.input {
  width: 100%;
  padding: 0.875rem 1rem;
  border: 2px solid var(--gray-200);
  border-radius: var(--radius-md);
  font-size: 1rem;
  transition: border-color 0.2s;
}

.input:focus {
  outline: none;
  border-color: var(--primary);
}

.label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.9rem;
}
```

---

## レスポンシブブレークポイント

```css
/* Mobile First */
--bp-sm: 640px;   /* Small phones → Large phones */
--bp-md: 768px;   /* Phones → Tablets */
--bp-lg: 1024px;  /* Tablets → Laptops */
--bp-xl: 1280px;  /* Laptops → Desktops */

/* 使用例 */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

---

## アイコンガイドライン

### 推奨アイコンセット

- **Lucide Icons**: モダン・クリーン
- **Heroicons**: 汎用的
- **Phosphor Icons**: バリエーション豊富

### 使用方法

```astro
---
// Astroでの使用例（インラインSVG推奨）
---
<svg
  xmlns="http://www.w3.org/2000/svg"
  width="24"
  height="24"
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width="2"
  stroke-linecap="round"
  stroke-linejoin="round"
>
  <!-- SVGパス -->
</svg>
```

### サービスアイコンマッピング

| サービス | アイコン案 |
|---------|-----------|
| DX推進 | 🚀 / rocket |
| 生成AI | 🤖 / bot |
| データ分析 | 📊 / chart |
| Web構築 | 🌐 / globe |
| 記帳代行 | 📝 / file-text |
| 経営診断 | 🎯 / target |
| 補助金 | 💰 / coins |

---

## アクセシビリティ基準

### 色コントラスト（WCAG AA）

- 通常テキスト: 4.5:1 以上
- 大きいテキスト（18px bold / 24px）: 3:1 以上
- UIコンポーネント: 3:1 以上

### 推奨組み合わせ

| 背景 | テキスト | コントラスト比 |
|-----|---------|---------------|
| #FFFFFF | #1E293B | 14.4:1 ✓ |
| #2563EB | #FFFFFF | 4.54:1 ✓ |
| #F59E0B | #1E293B | 5.8:1 ✓ |
| #10B981 | #FFFFFF | 3.03:1 ✓（大テキストのみ） |

### フォーカス状態

```css
*:focus-visible {
  outline: 2px solid var(--primary);
  outline-offset: 2px;
}
```
