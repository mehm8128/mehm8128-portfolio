---
title: "noAutoFocus"
publishedDate: "Dec 3 2025"
---

今日は`noAutoFocus`です。

https://biomejs.dev/ja/linter/rules/no-autofocus/

## なにこれ

`autofocus`というグローバル属性を禁止するルールです。
ただし、`<dialog>`要素の中の要素と、`popover`属性がついている要素の中の要素には許可されています。

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/autofocus

ページが読み込まれたときに`autofocus`がついている要素があれば、その要素にフォーカスが当たります。ただし、`<dialog>`要素の中の要素と、`popover`属性がついている要素の中の要素は、それらが表示されたときにフォーカスが当たります（[ref: HTML Standard - The autofocus attribute](https://html.spec.whatwg.org/multipage/interaction.html#attr-fe-autofocus)）。

例えば[Googleのトップページ](https://google.com)を開いたとき、検索欄に自動でフォーカスが当たります。これはdevtoolsを見てみるとわかりますが、`<textarea>`要素に`autofocus`属性が付与されていることによる挙動です。
Googleのトップページにアクセスした人のほとんどは検索欄にて検索をしたいという前提でこれは付与されているし、実際そうだと思います。しかし、このようにほとんどの人が利用するわけではないインタラクティブ要素に自動でフォーカスを当てる場合、ユーザーの予期しない挙動になってしまいます。

最初にスクリーンリーダーユーザーに絞って考えていきます。スクリーンリーダーユーザーは普通、ページの上から順番に読み上げを聞き、必要に応じてランドマークにジャンプしたりしてWebページを閲覧します（と思っています。違ったら教えてください）。しかし、ページにアクセスしたタイミングで`autofocus`属性のついた要素が存在していて、そこにジャンプしてしまったら、必要なコンテキストを飛ばして読み上げられてしまうことになり、混乱を招きます。

スクリーンリーダーユーザーではないユーザーについても考えてみます。MDNに書いてある通りなのですが、`autofocus`でフォーカスが当たった要素がビューポート外にある場合に、その要素が見えるようになる位置まで自動でスクロールされてしまう可能性があります。また、モバイルで利用している場合、入力欄にフォーカスすると仮想キーボードが表示されるので、Webページにアクセスした瞬間に仮想キーボードが表示されてしまい、ページの中身も分からないまま何かを入力させられるような体験になる可能性もあります。特にモバイルだと画面が小さいので、最初から仮想キーボードが表示されてしまうのは体験がかなり悪くなると思います。

また、`<dialog>`要素や`popover`属性のついた要素の中の要素については、ページが読み込まれたときではなく、`showModal()`メソッドや`showPopover()`メソッドなどによって表示されたタイミングでフォーカスが当たります。
`<dialog>`要素のMDNに`autofocus`について言及があります。`autofocus`を指定した要素がないときは、最初のフォーカス可能な要素にフォーカスが自動で当たります。それを別の要素にフォーカスが当たるようにしたいとき、`autofocus`属性を使います。

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/dialog#%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3

このパターンについては最初に言及したように、Biomeのルール的にも許容されています。
ダイアログの初期フォーカス要素については以前WHATWGで議論があったようで、まとめられた記事があります。

https://zenn.dev/yusukehirao/articles/e5df3d60c99e91

https://github.com/whatwg/html/pull/8199

また、ダイアログを開いたとき（及び閉じたとき）にどの要素にフォーカスを当てるかについてはAPGにいくつかの例が書かれています。

https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

## WCAGの達成基準

WCAGの達成基準でいうと、[達成基準 2.4.3 フォーカス順序](https://waic.jp/translations/WCAG22/Understanding/focus-order.html)と[達成基準 3.2.1 フォーカス時](https://waic.jp/translations/WCAG22/Understanding/on-focus.html)が主に該当すると考えられます。

誤りなく簡潔に説明するのは難しいので、各ページを読んでください。達成基準やそれに関するテクニック内で具体的に`autofocus`についての言及があるわけではなさそうですが、特に今回は前者の達成基準が関連していそうです。

## `autofocus`を使わないフォーカス制御

`autofocus`は基本的にページを読み込んだタイミングの話なので、Webアプリケーションではあまり使う機会がないかもしれません。
しかし、[`HTMLElement.focus()`](https://developer.mozilla.org/ja/docs/Web/API/HTMLElement/focus)などを利用してフォーカス制御をする場合も、フォーカスを強制的に移動させることに変わりはないので注意して使う必要があります。

## その他のネタ

WindowsなのでSafariで今直っているか分からないのですが、`<input>`要素にautofocusしたときにカーソルがどこに当たるかが、ブラウザ間で異なるというissueがありました。

https://github.com/whatwg/html/issues/2698

基本的には入力欄の先頭にカーソルが当たるのですが、2019年時点でSafariだけ入力欄のテキストを全て選択していたようです（[selectionStartについて](https://developer.mozilla.org/ja/docs/Web/API/HTMLInputElement/selectionStart)）。

## まとめ

フォーカス制御はちゃんと考えて行いましょう。

## その他参考リンク

- [Accessibility Tips: Be Cautious When Using Autofocus](https://www.boia.org/blog/accessibility-tips-be-cautious-when-using-autofocus)
- [dialog要素を使用したモーダルウィンドウの実装例 – TAKLOG](https://www.tak-dcxi.com/article/implementation-example-of-a-modal-created-using-the-dialog-element)
- [dialog initial focus, a proposal · whatwg/html Wiki](https://github.com/whatwg/html/wiki/dialog--initial-focus,-a-proposal)
