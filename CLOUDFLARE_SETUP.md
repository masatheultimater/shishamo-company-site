# Cloudflare設定手順（shishamo-company.com）

## 全体の流れ

```
1. Cloudflareアカウント作成
2. Cloudflareにドメイン追加
3. お名前.comでネームサーバー変更
4. Cloudflare Pagesでサイトデプロイ
5. カスタムドメイン設定
6. Email Routing設定
```

---

## Step 1: Cloudflareアカウント作成

1. https://dash.cloudflare.com/sign-up にアクセス
2. メールアドレス・パスワードで登録
3. メール認証

---

## Step 2: Cloudflareにドメイン追加

1. Cloudflareダッシュボード → **「Add a Site」**
2. `shishamo-company.com` を入力
3. **Free**プランを選択 → Continue
4. DNSレコードのスキャン（自動）→ Continue
5. **ネームサーバーが表示される**（2つ）
   ```
   例:
   alice.ns.cloudflare.com
   bob.ns.cloudflare.com
   ```
   → これをメモ！

---

## Step 3: お名前.comでネームサーバー変更

### お名前.com管理画面で操作

1. https://navi.onamae.com/ にログイン
2. **ドメイン** → **ドメイン機能一覧**
3. **ネームサーバーの変更** をクリック
4. `shishamo-company.com` を選択
5. **他のネームサーバーを利用** タブを選択
6. Cloudflareのネームサーバーを入力：
   ```
   ネームサーバー1: alice.ns.cloudflare.com
   ネームサーバー2: bob.ns.cloudflare.com
   ```
7. **確認** → **設定する**

### 反映待ち
- 通常: 数分〜数時間
- 最大: 24〜48時間
- Cloudflareダッシュボードで確認（緑のチェックマークが付く）

---

## Step 4: Cloudflare Pagesでサイトデプロイ

### GitHubリポジトリ連携

1. Cloudflareダッシュボード → **Workers & Pages**
2. **Create** → **Pages** → **Connect to Git**
3. **GitHub**を選択 → 認証
4. `shishamo-site` リポジトリを選択
5. ビルド設定:
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   ```
6. **Environment variables**（必要に応じて）:
   ```
   MICROCMS_API_KEY: xxxxxxx
   MICROCMS_SERVICE_DOMAIN: xxxxxxx
   ```
7. **Save and Deploy**

### 初回デプロイ後のURL
```
https://shishamo-site.pages.dev
```
（仮のURLで動作確認できる）

---

## Step 5: カスタムドメイン設定

1. Cloudflare Pages → `shishamo-site` プロジェクト
2. **Custom domains** タブ
3. **Set up a custom domain**
4. `shishamo-company.com` を入力
5. **Activate domain**

### www も設定する場合
同様に `www.shishamo-company.com` も追加

### DNS設定（自動 or 手動）
Cloudflare DNSを使っていれば自動設定される。
手動の場合:
```
Type: CNAME
Name: @
Target: shishamo-site.pages.dev
```

---

## Step 6: Email Routing設定

### info@shishamo-company.com → Gmail転送

1. Cloudflareダッシュボード → `shishamo-company.com`
2. 左メニュー → **Email** → **Email Routing**
3. **Enable Email Routing** をクリック
4. DNSレコードの追加を確認 → **Add records and enable**
5. **Routing rules** → **Create address**
   ```
   Custom address: info
   Action: Send to an email
   Destination: masatheultimater@gmail.com
   ```
6. **Save**

### 転送先メールの認証
- Cloudflareから確認メールが `masatheultimater@gmail.com` に届く
- メール内のリンクをクリックして認証

### 動作確認
- 別のメールから `info@shishamo-company.com` にテスト送信
- Gmailに届くか確認

---

## Step 7: Gmailから info@ で送信できるようにする（任意）

受信だけでなく、`info@shishamo-company.com` として返信したい場合：

### 方法A: Gmail「別のアドレスから送信」（無料）

1. Gmail → ⚙️設定 → **すべての設定を表示**
2. **アカウントとインポート** タブ
3. 「他のメールアドレスを追加」
4. 名前: `吉川昌宏` / メール: `info@shishamo-company.com`
5. 「エイリアスとして扱う」にチェック
6. SMTPサーバー設定:
   - Gmail SMTP使用の場合:
     ```
     SMTPサーバー: smtp.gmail.com
     ポート: 587
     ユーザー名: masatheultimater@gmail.com
     パスワード: Googleアプリパスワード
     ```

### 方法B: Resend/Mailgun等の外部SMTP（より本格的）

後で必要になったら設定。

---

## 完成後の構成

```
┌─────────────────────────────────────────────────┐
│           shishamo-company.com                  │
│                                                 │
│  Web:   https://shishamo-company.com            │
│         → Cloudflare Pages                      │
│                                                 │
│  Email: info@shishamo-company.com               │
│         → masatheultimater@gmail.com            │
└─────────────────────────────────────────────────┘
```

---

## チェックリスト

- [ ] Cloudflareアカウント作成
- [ ] ドメイン追加（shishamo-company.com）
- [ ] お名前.comでネームサーバー変更
- [ ] ネームサーバー反映確認（Cloudflareで緑チェック）
- [ ] GitHubリポジトリ作成（shishamo-site）
- [ ] Cloudflare Pages連携
- [ ] カスタムドメイン設定
- [ ] HTTPS有効確認
- [ ] Email Routing設定
- [ ] 転送先メール認証
- [ ] テストメール送信確認

---

## トラブルシューティング

### ネームサーバー変更が反映されない
- 24時間待つ
- `dig shishamo-company.com NS` で確認

### Pagesビルドが失敗する
- ビルドログ確認
- Node.jsバージョン指定（環境変数 `NODE_VERSION=18`）

### メールが届かない
- DNSレコード確認（MX, TXT）
- 転送先メール認証済みか確認
- 迷惑メールフォルダ確認
