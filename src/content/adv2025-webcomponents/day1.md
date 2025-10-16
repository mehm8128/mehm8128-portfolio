---
title: isの課題と代替案 - カスタム組み込み要素
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

これらを踏まえて、様々な代替案が検討されてきました。今回は1つ紹介します。

### Custom Attributes

[Custom Property + 0 or more Custom Attributes => Custom Enhancement · Issue #1000 · WICG/webcomponents](https://github.com/WICG/webcomponents/issues/1000)や[lume/custom-attributes: Define custom attributes that provide mixins for HTML elements](https://github.com/lume/custom-attributes)、[lume/element-behaviors: An entity-component system for HTML elements.](https://github.com/lume/element-behaviors)を基にして[TPAC2023のbreakouts](https://github.com/w3c/tpac2023-breakouts/issues/44)で議論された代替案です。その後、以下のissueでさらに話し合われました。

https://github.com/WICG/webcomponents/issues/1029

Custom Attributesとは、カスタム要素と同じようにカスタマイズされたHTML属性をclassを用いて作成する機能です。これをHTML要素やカスタム要素に適用し、独自の動作を当てることができるようになるというものです。
例えば以下の例だと、`Attribute`classを拡張して`ListAttribute`というカスタム属性を作成し、`<input>`要素で利用できるようにしています。

```js
class ListAttribute extends Attribute {
  ownerElement; // element this is attached to
  value; // current value

  connectedCallback() {
    /* ... */
  }

  disconnectedCallback() {
    /* ... */
  }

  // Called whenever the attribute's value changes
  changedCallback() {
    /* ... */
  }

  static dataType = AttributeType.IDREF;

  // Optional default value
  static defaultValue = null;
}

HTMLInputElement.attributeRegistry.define("ac-list", ListAttribute);
```

今までの`is`ではHTML要素を拡張してカスタム要素を作成し、カスタム要素に対して動作を割り当て、それを`is`属性に与えてしました。しかしそうではなく、HTML要素の`attributeRegistry`にカスタム属性を追加し、カスタム属性を通して動作を割り当てることができるようにするという提案です。

ユースケースとして

- Popover APIやInvoker Commandsのエミュレート
- `<time>`に`format`属性をつけ、指定したフォーマットで表示されるようにする
- `<p loading-placeholder="3 sentences">`のようなスケルトン表示
- `<audio start-at="0:05">`のような再生開始時刻の指定

## まとめ

次回はこのような案を踏まえて有力な代替案の1つとなっていた、ElementInternals.typeについて紹介します。

## 追加の参考文献　

- https://eisenbergeffect.medium.com/2023-state-of-web-components-c8feb21d4f16#a31c
