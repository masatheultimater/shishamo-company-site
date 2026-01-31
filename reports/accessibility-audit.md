# アクセシビリティ監査レポート

**監査日**: 2026-01-31
**対象サイト**: ししゃも｜吉川昌宏 サービスサイト
**監査方法**: コードレビューベース

---

## 1. 総合評価

| カテゴリ | 評価 | 詳細 |
|---------|------|------|
| 画像のalt属性 | - | 現状画像なし（絵文字で代用） |
| フォームのlabel | PASS | 適切に設定済み |
| 見出し階層 | WARNING | 一部改善の余地あり |
| リンクテキスト | WARNING | 改善が必要な箇所あり |
| キーボード操作 | PASS | 基本的に対応 |
| 色コントラスト | PASS | WCAG AA準拠の配色 |
| lang属性 | PASS | html要素にlang="ja"設定済み |

---

## 2. 詳細な監査結果

### 2.1 画像のalt属性

**ステータス**: 該当なし（現状）

現在のサイトでは実画像を使用しておらず、絵文字で代用しています。
将来画像を追加する際は、以下を確認してください：

- [ ] すべての`<img>`要素にalt属性を設定
- [ ] 装飾目的の画像には`alt=""`（空）を設定
- [ ] 意味のある画像には適切な説明文を設定

### 2.2 フォームのラベル

**ステータス**: PASS

`/contact/index.astro` のフォーム要素は適切にラベル付けされています。

```html
<!-- 良い例（現状） -->
<label>お名前<span class="required">*</span></label>
<input type="text" name="name" required placeholder="山田 太郎">
```

**問題点**:
- labelとinputが`for`/`id`属性で明示的に紐付けられていない

**改善提案**:
```html
<label for="name">お名前<span class="required">*</span></label>
<input type="text" id="name" name="name" required placeholder="山田 太郎">
```

### 2.3 見出し階層

**ステータス**: WARNING

#### 問題箇所

1. **Layout.astro (フッター)**
   - `<h4>` が `<h1>` の後に使われており、`<h2>`, `<h3>` をスキップしている

   ```html
   <div class="footer-links">
     <h4>サービス</h4>  <!-- h2またはh3が望ましい -->
   ```

2. **index.astro**
   - セクション内で`<h3>`が直接使われ、`<h2>`の子要素としての階層が不明確な箇所あり

3. **profile.astro**
   - 資格セクションで`<h4>`が使用されているが、親の`<h2>`との関係が明確

#### 各ページの見出し構造

| ページ | 見出し構造 | 評価 |
|--------|-----------|------|
| index.astro | h1 > h2 > h3 | OK |
| services/index.astro | h1 > h2 > h3 | OK |
| profile.astro | h1 > h2 > h3 > h4 | OK |
| contact/index.astro | h1 > h2 > h3 | OK |
| contact/thanks.astro | h1 > h3 | WARNING (h2スキップ) |
| services/dx-consulting.astro | h1 > h2 > h3 | OK |

### 2.4 リンクテキスト

**ステータス**: WARNING

#### 問題のあるリンク

1. **「詳しく見る」リンク（複数箇所）**
   ```html
   <a href="/services/#dx" class="category-link">詳しく見る →</a>
   ```
   - スクリーンリーダーでは文脈がわからない
   - 改善案: `aria-label="DX・IT戦略について詳しく見る"`を追加

2. **ソーシャルリンク（Layout.astro）**
   ```html
   <a href="#" title="X (Twitter)">𝕏</a>
   <a href="#" title="note">n</a>
   ```
   - title属性は補助的、aria-labelを追加すべき
   - 改善案: `aria-label="X (Twitter)へのリンク"`

3. **「#」リンク（プレースホルダー）**
   - 複数箇所で`href="#"`が使用されている
   - 本番前に実際のURLに置き換えが必要

### 2.5 キーボード操作

**ステータス**: PASS（一部注意）

- フォーカス可能な要素（リンク、ボタン、フォーム）は標準のHTML要素を使用
- カスタムのフォーカススタイルは未設定（ブラウザデフォルトに依存）

**改善提案**:
```css
/* フォーカス時の視認性向上 */
:focus-visible {
  outline: 3px solid var(--primary);
  outline-offset: 2px;
}
```

### 2.6 モバイルメニュー

**ステータス**: WARNING

```html
<button class="mobile-menu-btn" aria-label="メニュー" id="mobileMenuBtn">☰</button>
```

**良い点**:
- aria-label属性が設定されている

**改善が必要**:
- `aria-expanded`属性でメニューの開閉状態を示すべき
- メニュー開閉時のフォーカス管理

**改善案**:
```html
<button
  class="mobile-menu-btn"
  aria-label="メニュー"
  aria-expanded="false"
  aria-controls="mobileNav"
  id="mobileMenuBtn">☰</button>
```

---

## 3. WCAG 2.1 準拠チェックリスト

### Level A（必須）

| 項目 | ステータス | 備考 |
|------|----------|------|
| 1.1.1 非テキストコンテンツ | N/A | 画像未使用 |
| 1.3.1 情報と関係性 | PASS | セマンティックHTML使用 |
| 1.4.1 色の使用 | PASS | 色だけに依存していない |
| 2.1.1 キーボード | PASS | 標準HTML要素使用 |
| 2.4.1 ブロックスキップ | WARNING | スキップリンク未実装 |
| 2.4.2 ページタイトル | PASS | 各ページに設定済み |
| 3.1.1 ページの言語 | PASS | lang="ja"設定済み |
| 4.1.1 構文解析 | PASS | 有効なHTML |
| 4.1.2 名前・役割・値 | WARNING | 一部aria属性追加推奨 |

### Level AA（推奨）

| 項目 | ステータス | 備考 |
|------|----------|------|
| 1.4.3 コントラスト（最低限） | PASS | 十分なコントラスト |
| 1.4.4 テキストのサイズ変更 | PASS | 相対単位使用 |
| 2.4.6 見出しとラベル | WARNING | 一部改善必要 |
| 2.4.7 フォーカスの可視化 | WARNING | カスタムスタイル推奨 |

---

## 4. 優先度別の改善項目

### 高優先度（本番公開前に対応）

1. フォーム要素のid/for属性の紐付け
2. 「#」リンクを実際のURLに置き換え
3. モバイルメニューのaria-expanded属性追加

### 中優先度（早期に対応）

1. スキップリンクの実装
2. フォーカス時のカスタムスタイル追加
3. 「詳しく見る」リンクにaria-label追加
4. フッターの見出し階層見直し

### 低優先度（改善推奨）

1. thanks.astroの見出し階層修正
2. ソーシャルリンクのaria-label追加
3. 各セクションのlandmarkロール追加

---

## 5. 参考リソース

- [WCAG 2.1 ガイドライン（日本語）](https://waic.jp/docs/WCAG21/)
- [axe DevTools](https://www.deque.com/axe/) - ブラウザでのアクセシビリティテスト
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - パフォーマンス・アクセシビリティ監査
