---
title: Reference Target - Cross-root ARIA Reference Target 比較と課題
publishedDate: "2025-12-01"
---

## 現状の課題

### スコープとする属性

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/8
https://github.com/WICG/webcomponents/issues/1091

IDREFを全部対応してるとした方が説明も簡単だし、後から追加するとbreaking changeになってしまう可能性がある

よって、このissueで範囲を明確にしたい

- itemref
  - explainerに載ってないけど多分うまくいく
  - そもそもこの機能を実装しているブラウザがないため、技術的にはサポートしてるけど機能することを確認はできないという感じ
  - 実装しているブラウザがないのはwptにないから？
- headers on td & tr
  - explainerにあるけどwptがない
  - 単純に忘れてるだけ、と思いきや、現状ax nameに反映されないため、wptが書けないらしい
- aria-owns
  - 一番実装が複雑で、現状もかなり重厚にwptが書かれているらしい
  - ユースケースに作業量が見合わないという懸念がある

### event

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/9
https://github.com/WICG/webcomponents/issues/1098

reference targetを使ってcommandforもしくはpopovertargetでtoggleイベントを発火した場合、発火元のボタンにtoggleイベントが伝わらない

TODO: 例をもう少しちゃんと紹介

Toggleイベントにsourceプロパティを追加し、これを用いてShadowRootの親を取得するアルゴリズムを変更した

### Phase2の用例

https://github.com/WICG/webcomponents/issues/1111

Phase2を本当に実装する必要があるのかどうか、ユースケースを募集しているissueです．

aria-activedescendantと、複数の要素からaria-lablledbyを作るやつ以外になにかないか

explainerでは3つの案が書かれているように、shadowRootReferenceTargetMapで確定ではなくまだ検討中っぽい

郵便番号フォームや開始日・終了日が一緒になってるdate pickerなどが挙げられているが、これはどちらかというとボトルネック効果。代替案が出されている

explainerの代替案2つ

- 代替案１：「個々のユースケースを個別に扱う」
  https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md#addressing-individual-use-cases-separately
- 代替案２：exportid
  - ボトルネック効果の影響を受けない。issueの一番下でも微妙に違うけど同じようなpartを使う案が出ている

## まとめ

Web Componentsが市民権を得るための重要なピースのうちの1つなので、今後に期待です
