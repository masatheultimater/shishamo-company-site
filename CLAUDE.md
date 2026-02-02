# ししゃも（吉川昌宏）サービスサイト構築

## プロジェクト概要
中小企業の伴走パートナー「ししゃも｜吉川昌宏」のサービスサイトを構築する。

## ワイヤーフレーム
`/wireframe/` ディレクトリにHTML形式のワイヤーフレームがある。
これを参照して実装すること。デザイン・レイアウト・文言はワイヤーフレームに従う。

## 技術スタック
- **フレームワーク**: Astro（静的サイト生成）
- **CMS**: microCMS（ブログ・お知らせ用、後で連携）
- **ホスティング**: Cloudflare Pages
- **スタイリング**: Tailwind CSS または ワイヤーフレームのCSSをそのまま使用
- **フォント**: 日本語: Zen Maru Gothic + 英字: Source Sans 3

## ページ構成
1. **index.html** → `/` トップページ
2. **services.html** → `/services/` サービス一覧
3. **profile.html** → `/profile/` プロフィール
4. **contact.html** → `/contact/` お問い合わせ
5. **services/dx-consulting.html** → `/services/dx-consulting/` サービス詳細

## デザイン仕様
### カラーパレット
```
Primary:    #2563EB (青)
Primary Dark: #1D4ED8
Secondary:  #F59E0B (オレンジ)
Accent:     #10B981 (緑)
Dark:       #1E293B
Light:      #F8FAFC
Gray:       #64748B
```

### 特徴的なUI要素
- ロゴのswimアニメーション（魚が泳ぐ）
- morphing blob（背景の有機的な形）
- floatアニメーション（アイコンがふわふわ）
- グラデーション多用
- ホバーで上に浮くカード

## 実装の優先順位
1. Astroプロジェクト初期化
2. 共通レイアウト（ヘッダー、フッター、モバイルメニュー）
3. トップページ
4. サービス一覧ページ
5. プロフィールページ
6. お問い合わせページ（フォームはFormspree等で）
7. サービス詳細ページ

## お問い合わせフォーム

### 送信先
**masatheultimater@gmail.com** に届くようにする

### 推奨実装: Formspree（無料枠あり）

1. https://formspree.io/ でアカウント作成
2. 新しいフォームを作成 → エンドポイントURL取得
3. フォームのaction属性に設定

```html
<form action="https://formspree.io/f/xxxxx" method="POST">
  <input type="text" name="name" required>
  <input type="email" name="email" required>
  <select name="category" required>
    <option value="dx">DX推進・IT戦略について</option>
    <option value="ai">生成AI導入について</option>
    <!-- ... -->
  </select>
  <textarea name="message" required></textarea>
  <input type="hidden" name="_subject" value="【ししゃも】お問い合わせ">
  <button type="submit">送信する</button>
</form>
```

### 代替案: Cloudflare Workers + Resend

Cloudflare Pagesを使う場合はこちらも可。

```
/functions/api/contact.js
```

```javascript
// Resend APIでメール送信
export async function onRequestPost({ request, env }) {
  const data = await request.formData();
  
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'noreply@shishamo-company.com',
      to: 'masatheultimater@gmail.com',
      subject: '【ししゃも】お問い合わせ',
      html: `
        <p>名前: ${data.get('name')}</p>
        <p>メール: ${data.get('email')}</p>
        <p>カテゴリ: ${data.get('category')}</p>
        <p>内容: ${data.get('message')}</p>
      `,
    }),
  });
  
  return Response.redirect('/contact/thanks', 303);
}
```

### フォーム項目（必須）
- 名前 (name) *
- 会社名 (company)
- メールアドレス (email) *
- 電話番号 (phone)
- 相談内容カテゴリ (category) *
- 詳細 (message) *
- プライバシーポリシー同意 (privacy) *

### 送信後の動作
- 送信完了ページ `/contact/thanks/` にリダイレクト
- または同ページ内で「送信完了しました」メッセージ表示

## SEO要件
- 各ページにmeta description設定
- OGP画像設定
- 構造化データ（LocalBusiness）

## 注意事項
- レスポンシブ対応必須（1024px, 768px, 480pxブレークポイント）
- ハンバーガーメニューは動作すること
- 画像は絵文字で代用OK（後で差し替え）
- アニメーションはワイヤーフレームのCSSを参考に

## コマンド例
```bash
# Astro初期化
npm create astro@latest

# 開発サーバー
npm run dev

# ビルド
npm run build
```
