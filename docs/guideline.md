# サイトデザインガイドライン

このサイトは以下に整理しているガイドラインによってテーマを決めています。テーマを変更する際はコンセプトからブレないように変更し、それ以外の箇所を適宜修正してください。

## コンセプト

- 想定読者: 他社の Web フロントエンドエンジニア
- キーワード: シンプル / 堅実 / 誠実
- サイト構成: 3 ページ
  - Home: 自己紹介 + ブログ記事へのリンクは表示しない
  - Blog List: ブログ記事一覧ページ
  - Blog: 記事本文ページ
- ポートフォリオ作品紹介: **不要**

---

## カラーパレット

- `--color-bg`: #FFFFFF （ベース背景）
- `--color-surface`: #F9FAFB （セクション背景）
- `--color-text`: #111827 （本文・見出し）
- `--color-muted`: #6B7280 （日付やメタ情報などの補助テキスト）
- `--color-accent`: #2563EB （リンク・ボタン）
- `--color-accent-hover`: #1E40AF （リンク・ボタンのホバー時）
- `--color-border`: #E5E7EB （境界線や仕切り）

---

## フォント

- 見出し: Inter Bold（英語）
- 本文: Noto Sans JP Regular（日本語）
- コード: JetBrains Mono Regular

---

## レイアウト

- コンテンツ幅: 52.5rem（= 840px 基準）
- フォントサイズ:
  - 本文: 1.125rem（18px 相当）
  - h1: 2rem（32px 相当）
  - h2: 1.5rem（24px 相当）
  - h3: 1.25rem（20px 相当）
- 行間: 1.75
- セクション間余白: 5rem（80px 相当）
- 段落間余白: 1em

---

## コンポーネント

### ナビゲーション

- ヘッダーメニュー（英語表記）: `Home | Blog | About`

### ボタン

- 角丸: 0.375rem（6px 相当）
- 背景色: `--color-accent`
- ホバー背景色: `--color-accent-hover`
- パディング: 0.75rem 1.25rem
- フォント: Inter SemiBold（英語）

### リンク

- 通常: `--color-accent`、下線なし
- ホバー: 下線を表示（参考: [Improving hyperlink accessibility and readability](https://uxdesign.cc/improving-hyperlink-accessibility-and-readability-7f14ba4cb6c2)）
- フォーカス: 下線 + アウトライン（アクセシブル対応）

### ブログタグ

- 背景: `--color-surface`
- パディング: 0.25rem 0.625rem
- 角丸: 0.75rem（12px 相当）
- フォントサイズ: 0.875rem（14px 相当）

---

## アニメーション

- ページロード時: フェードイン（0.3s）
- カード hover: 拡大（scale 1.02）+ 影を強調（0.2s）
- リンク hover: 下線がスライド表示（0.2s）

---

## ページ構成

### Home

- 自己紹介（見出しは英語、本文は日本語）

### Blog List

- 記事一覧（タイトルは英語＋日本語のミックス可）
- 日付やタグ（タグは英語）

### Blog

- 記事本文ページ
- タイトルは英語＋日本語のミックス可
- タグは英語、本文は日本語

### Footer

- SNS リンク（英語表記）:
  - GitHub
  - X
  - Bluesky
  - Mastodon
  - sizu.me
  - Zenn
