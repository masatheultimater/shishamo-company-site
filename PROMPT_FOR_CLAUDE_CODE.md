# Claude Codeへの初回プロンプト（コピペ用）

以下をClaude Codeのチャットに貼り付けて開始：

---

## プロンプト（短縮版）

```
このプロジェクトの `/wireframe/` にあるHTMLワイヤーフレームを参照して、
Astroでサービスサイトを構築してください。

CLAUDE.mdに詳細な仕様があります。まず読んでから作業を開始してください。

優先順位：
1. Astroプロジェクト初期化
2. 共通レイアウト作成
3. トップページ実装
4. 他ページを順次実装

ワイヤーフレームのデザイン・文言・アニメーションを忠実に再現してください。
```

---

## プロンプト（詳細版）

```
# サービスサイト構築依頼

## 概要
中小企業の伴走パートナー「ししゃも｜吉川昌宏」のサービスサイトをAstroで構築してください。

## 参照ファイル
- `/wireframe/` - HTMLワイヤーフレーム（デザイン・文言の参考）
- `/CLAUDE.md` - 詳細仕様書

## 技術スタック
- Astro（静的サイト生成）
- Tailwind CSS または 既存CSSの移植
- Cloudflare Pages対応

## 作業手順
1. まずCLAUDE.mdを読む
2. wireframe/index.htmlを確認
3. Astroプロジェクト初期化（npm create astro@latest）
4. 共通レイアウト（Layout.astro）作成
   - ヘッダー（ナビゲーション、ロゴ）
   - フッター
   - モバイルメニュー（ハンバーガー）
5. 各ページを順次実装
   - src/pages/index.astro
   - src/pages/services/index.astro
   - src/pages/profile.astro
   - src/pages/contact.astro
   - src/pages/services/dx-consulting.astro

## 重要な要件
- ワイヤーフレームのアニメーション（swim, morph, float）を再現
- レスポンシブ対応（1024px, 768px, 480px）
- ハンバーガーメニューが動作すること

開始してください。
```

---

## 進め方のコツ

1. **最初に全体像を把握させる**
   - 「まずCLAUDE.mdとwireframeを読んで、構成を理解してください」

2. **段階的に依頼する**
   - 「まずAstro初期化と共通レイアウトを作ってください」
   - 「次にトップページを実装してください」
   - 「サービス一覧を追加してください」

3. **確認しながら進める**
   - 各ページ完成後に `npm run dev` で確認
   - 問題があればその場で修正依頼

4. **修正依頼の仕方**
   - 「ヘッダーのアニメーションがワイヤーフレームと違います。wireframe/index.htmlのswimアニメーションを参照して修正してください」
