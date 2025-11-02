---
title: Reference Target - Cross-root ARIA Reference Target 比較と課題
publishedDate: "2025-12-01"
---

## 現状の課題

Reference Targetについて、現在議論されているものの中から主なものを3つ紹介します。

### スコープとする属性

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/8
https://github.com/WICG/webcomponents/issues/1091

値としてIDREFを持つ属性を全て対応するのが単純明快だし、後から追加するとなると互換性の問題が発生する可能性があります。しかし、今回スコープとするのが難しそうな属性がいくつか挙げられ、このissueでスコープを明確にしようとされています。

1. itemref
TODO: 簡単な説明
https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/itemref

explainerには記載がないのですが、おそらく上手く動くはずとのことです。
しかし、この属性の機能自体をサポートしているブラウザがまだないため、技術的にはサポートできるけど機能することを確認はできないという状態になりそうです。
ちなみに、実装しているブラウザがないのはwptが存在していないことから分かります？TODO: 確認

2. td と tr の headers

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/td#headers

explainerには記載があるのですが、wptがないとのことです。

accessible nameやroleに反映されないため、wptを書くことができないとのことでした。
よって、itemrefと同じく、技術的にはサポートできるけど確認ができないという状態になりそうです。

3. aria-owns

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-owns

explainerには記載があるのですが、コメント欄にて追加で懸念点として挙げられている属性です。
aria-owns自体の実装がとても複雑で、現状もかなり重厚にwptが書かれている状態らしいです。
ユースケースに作業量が見合わない懸念があり、今回Reference Targetでサポートするかどうか議論されています。

### event

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/9
https://github.com/WICG/webcomponents/issues/1098

reference targetを使ってcommandforもしくはpopovertargetでtoggleイベントを発火した場合、発火元のボタンにtoggleイベントが伝わらない

TODO: 例をもう少しちゃんと紹介

Toggleイベントにsourceプロパティを追加し、これを用いてShadowRootの親を取得するアルゴリズムを変更した

### Phase2の用例

https://github.com/WICG/webcomponents/issues/1111

Phase2のshadowrootreferencetaregetmapを本当に実装する必要があるのかどうか、既にexplainerに記載のあるaria-activedescendantと、複数の要素からaria-lablledbyを構成する例以外のユースケースを募集しているissueです。

explainerでは3つの案が書かれているように、Phase2のより細かいハンドリングを行えるようにするという目標に対する手段は、shadowRootReferenceTargetMapで確定ではなく、まだ検討する余地があるようです。

コメント欄では郵便番号フォームや、開始日・終了日が1つのコンポーネントになってるdate pickerなどが挙げられているが、これはどちらかというとボトルネック効果のようです。issueの作成者であるAliceによって、それらの場合の代替案が提示されています。

explainerの代替案2つ

- 代替案１：「個々のユースケースを個別に扱う」
  https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md#addressing-individual-use-cases-separately
- 代替案２：exportid
  - ボトルネック効果の影響を受けない。issueの一番下でも微妙に違うけど同じようなpartを使う案が出ている

## まとめ

Web Componentsが市民権を得るための重要なピースのうちの1つなので、今後に期待したいです。
