---
title: `is`の課題 - カスタム組み込み要素
publishedDate: "2025-12-01"
---

今回から3回に渡り、カスタム組み込み要素（customized built-in elements）について書いていきます。

## カスタム組み込み要素とは

https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Global_attributes/is

一部ブラウザで`is`属性を用いて、標準のHTML要素を拡張したカスタム要素を作ることができる機能です。

例えば以下のようにJSとHTMLを書くと、`word-count`というカスタム組み込み要素を定義して利用することができます。

```js
// HTMLParagraphElementをextendsすることに注意
class WordCount extends HTMLParagraphElement {
  constructor() {
    super();

    // いろんな処理
  }
}

customElements.define("word-count", WordCount, { extends: "p" });
```

```html
<p is="word-count"></p>
```

こうすることで、`<p>`要素の動作やセマンティクスを継承しながらカスタム要素を作成することができます。
他の要素だと例えば`<button>`であれば`type="submit"`や`type="reset"`などの機能を使うことができたり、比較的新しい機能である`popovertarget`や`commandfor`、`interestfor`などの属性をカスタム要素に対して指定できるようになります。また、`<label>`の`for`属性なども同様です。
今までも1つ1つ明示的に属性の同期処理などをJSで書けば可能でしたが、カスタム組み込み要素では拡張している要素の動作やセマンティクスを全て一括で継承できるところがポイントです。

また、この書き方であればJSを読み込んでいないときでも`is`属性を無視すれば処理を追加していないただの拡張元の標準HTML要素として扱うことができるという点もメリットの1つとして挙げられています。

読む
https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Type-Extensions.md

## `is`を用いたカスタム組み込み要素の問題点

`is`を用いたカスタム組み込み要素にはいくつか問題点があり、Webkitではopposedなpositionが取られてきています。
主に以下の問題点が挙げられます。

- shadow tree が attach できなかった
- `HTMLHeadingElement`が全部の level をまとめていたり、`<input>`の type を指定できない
- 3 回同じようなことを書く必要がある
- https://github.com/WICG/webcomponents/issues/509#issuecomment-222860736
  - local name はカスタム要素の名前？
- https://github.com/WICG/webcomponents/issues/509#issuecomment-230700060
  - 親クラスに機能が追加されたときに、サブクラスでもサポートしないといけなくなる
- `<custom-element>`の場合と`<a is="custom-element">`の場合が混在して読みづらい

https://github.com/WebKit/standards-positions/issues/97
https://github.com/w3c/tpac2023-breakouts/issues/44
https://bugs.webkit.org/show_bug.cgi

これらを踏まえて、様々な代替案が検討されてきました。いくつか紹介します。

### custom attributes

https://github.com/w3c/tpac2023-breakouts/issues/44
で代替案として提案された

1000 番を基にして ↑ で話し合われ、1029 が誕生

https://eisenbergeffect.medium.com/2023-state-of-web-components-c8feb21d4f16#a31c
https://github.com/WICG/webcomponents/issues/1000
https://github.com/WICG/webcomponents/issues/1029

https://github.com/lume/custom-attributes

カスタム要素みたいな感じでカスタム属性を作って、それを HTML 要素やカスタム要素に適用することで好きな動作を当てることができる
現状まだ要素に対して属性を当てる方法がないので、popovertarget とか commandfor とかもその属性を当てられるようにする（MyInput.attributeRegistry.define()みたいに？）

`HTMLElement.attributeRegistry.define("sc-list", ListAttribute)`みたいに custom attributes を追加するため、`HTMLElement`自体に追加してどの要素でも使えるようにすることもできるし、特定の HTML 要素や、カスタム要素に限定して使えるようにすることもできる

[element-behaviors](https://github.com/lume/element-behaviors) では has に behavior の id を渡せるようにしていたけど、カスタム属性ではそれぞれ属性として渡せるようになっている

ユースケースとして

- Popover API や Invokers 機能をつける
  - 上で書いてるように、用意してある custom attributes を登録する感じ？
- `<time>`に`format`属性をつけてそのフォーマットで表示されるように
- `<p loading-placeholder="3 sentences">`のスケルトン表示
- `<audio start-at="0:05">`の開始時刻指定

#### custom enhancement

`customEnhancement.define()`で定義して、HTML 要素につけると enhance した機能が付与される
`allowedCSSMatches`などでつけられる要素を制限可能

https://github.com/WICG/webcomponents/issues/1000

## まとめ

次回はこれらを踏まえて有力な代替案の1つとなっていた、ElementInternals.typeについて紹介します。
