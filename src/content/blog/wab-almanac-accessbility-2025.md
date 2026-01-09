---
title: "Web Almanacから見る2025年のWebアクセシビリティ"
publishedDate: "Jan 15 2026"
---

https://almanac.httparchive.org/ja/2025/accessibility

## 簡単な説明

数値はどこまで信じられる？
全部のデータへのリンク

## コントラスト比

変化なしで低い
頑張りましょう
デザインとか場合によってはブランディングデザインの再検討から始めないとなので、シフトレフトが必要だし、かなり大変そう？

contrast-color
APCAどうなる？

## prefers-系

reduced-motionは変化なし
CSSカルーセル

forced-colorsは増えてるけど、使うことが必ずしもいいとは言えないのでなんとも

https://www.mitsue.co.jp/knowledge/blog/frontend/202405/17_1401.html
https://zenn.dev/schktjm/articles/c4239989992d1a

## フォーカスインジケーター

outline: 0の利用が増えて、focus-visibleの利用も増えてる
2024年も同じような感じだった
reset CSSが普及している？reset CSSによってはoutline: 0にするものがあるので
focus-visibleでちゃんと制御できるのであれば問題ないが、漏れがないように気をつける必要はある

## HTML要素

main要素の合計使用率が低いのはなんで？
見出しはoutline algorithmが削除されたので、ちょっとは改善される可能性がありそう

https://sakupi01.github.io/slides/ja/2025_04_28_the_outline_algorithm_utopia/
https://blog.w0s.jp/entry/732

## alt

Xの話
NVDA2026.1でAIによる説明が搭載されるけど、画像で伝えたいことを一番分かっているのは画像を載せる人なので～的な話
ただ、AIによる提案とかはアリかも

AIについては後ろの方に書いてあるので読んでください

## ARIA

全体的に増えてる
UIライブラリの普及によって全体的に増えてる説？
複雑なUIを使うサイトが増えている？
書いてあるとおり、ARIAの第一のルールを意識しながら気を付けて使う必要はある

BaseUI, WebAwesome, Angular Aria

role="button"は、前述のtabindexがついていない割合とかも見たかった

live region->aria notifyに注目していく

## オーバーレイ

増えてる
A11yEdge CGに期待？

> Data shows about 2% of desktop sites use such accessibility apps. Rates are even lower rates among the highest-traffic sites, at 0.2% among the top 1,000. This pattern shows that overlays are mostly adopted by lower-traffic sites and remain a controversial and imperfect solution.

大きい企業がちゃんと対応する余裕があってオーバーレイを使わない選択をする知識もある、というのもあるけど、アクセシブルではないのでユーザーが増えていない、というのもあるはず

> 6.  User Preferences Will Matter More Than Page-Level Settings

https://webaim.org/blog/2026-predictions/

## 国ごとのやつ

欧州アクセシビリティ法の影響はまだあまりない。今後少しずつ増えていくと考えられる
日本も前回から順位的にはあんまり変わってないけど、去年障害者差別解消法が改正されたこともあり、今後どのくらい増えていくか期待できそう？
TLD別で日本の色が出てなくてバグってる。数値的には80.76らしい
政府のはちょっと濃くなった。デジタル庁の影響？

いくつか法改正の影響が出ている地域がある？ちゃんと読む

## CMS

色のコントラスト、リンクの命名、見出しの構造、画像の説明

上位のCMSは、テンプレート化などを使ってユーザーが指定する部分を制限し、アクセシビリティを保証できるようにしている。らしい

## まとめ

https://vale.rocks/posts/accessibility-importance

どこかにAIのセクション追記する
