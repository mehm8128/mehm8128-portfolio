---
title: フォーカス制御
publishedDate: "2025-12-01"
---

今回はフォーカス制御について2つの提案を紹介します。

## `delegatesFocus`

https://github.com/WICG/webcomponents/issues/150
https://github.com/WICG/webcomponents/issues/126

当時、Shadow DOM内の要素にフォーカスを当てることはできたものの、Tabキーで順にフォーカスを移動させると、一度Shadow hostにもフォーカスを当てる必要がありました。
そこで、Shadow DOM内の要素にフォーカスを自然に移動させられるようにしたいという提案がありました。
例えば`<input type="date">`のような複数フォーカス可能なパーツを持つUIが1つのShadow DOMの中にある場合に、Light DOMにあるときのようなフォーカスの挙動を再現したいというものです。
具体的には以下のような挙動です。

- 前の要素からTabを押した場合は「年」の入力欄にフォーカスする
- 後ろの要素Shift+Tabを押した場合は「日」の入力欄にフォーカスする
- 「年」からShift+Tabを押した場合は前の要素にフォーカスを移動する
- 「日」からTabを押した場合は後ろの要素にフォーカスを移動する

explainerでは以下のような図で説明されています。
TODO: 図を載せる

順方向では1→2→A→B→3、逆方向では3→B→A→2→1と、毎回Shadow hostである2にフォーカスを経由してしまっていました。

そこで、`delegatesFocus`というプロパティが提案されました。

https://developer.mozilla.org/ja/docs/Web/API/ShadowRoot/delegatesFocus

以下のproposalに詳細な解説があります。

https://github.com/WICG/webcomponents/blob/gh-pages/proposals/ShadowRoot-delegatesFocus-Proposal.md
https://github.com/TakayoshiKochi/tabindex-focus-navigation-explainer/blob/master/TabindexFocusNavigationExplainer.md

`delegatesFocus`を`true`にすることで、Shadow hostへのフォーカスをShadow DOM内の要素にdelegateすることができます。これはTabキーによるフォーカス以外に、`focus()`メソッドや`autofocus`属性、マウスクリックへの応答などもサポートされています。

explainerには`focusable`や`setForceFocusable`などを用いてネイティブ要素のような柔軟なフォーカス動作を実現するような提案も含まれています。例えば`<a>`要素が`href`属性を持つときはフォーカス可能で、持たないときはフォーカス不可能、のようなものです。
これを考慮すると複雑になるため、この段階では省略されて別で検討されることになりました。

## Default focus behaviors for custom elements

上で省略された、ネイティブ要素のような柔軟なフォーカス動作を実現するものが、新しく別のissueで提案されています。
例えば`href`属性を持つ`<a>`要素や`<button>`、`<input>`、`<select>`、最初の子として`<details>`要素を持つ`<summary>`要素などです。

https://github.com/WICG/webcomponents/issues/762

古い情報ですが以下のテーブルにまとめられているように、同じ状態の要素でもブラウザ間でフォーカスの挙動が異なります。

https://allyjs.io/data-tables/focusable.html

この差異を再現したまま、特定の要素のフォーカスの挙動を模倣できるようにする方法が議論されています。

議論の途中で公開されたproposalでは、ElementInternalsのmatchFocusBehaviorOfにCSSセレクタで要素を指定してその要素のフォーカスの挙動を再現できるようにする方法や、フォーカスの挙動を「text entry」「clickable」などのカテゴリーに分類してそのカテゴリーを指定できるようにする方法、ElementInternalsにデフォルトのフォーカス挙動をtabindexを同じような形式で指定できるようにする方法などが提案されています。

https://github.com/WICG/webcomponents/blob/gh-pages/proposals/custom-element-default-focus.md

しかし現在議論されている、カスタム組み込み要素で`buttonActivationBehaviors`などをプロパティを`true`に設定するとフォーカスの挙動が`<button>`要素など対応する要素とおなじになるので、一部の要素のフォーカスの挙動についてはこれでサポートされる流れになると思います。

## まとめ
