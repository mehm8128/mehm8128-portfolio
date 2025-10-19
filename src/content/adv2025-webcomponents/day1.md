---
title: "ElementtInternals"
publishedDate: "2025-12-01"
---

## ElementInternals とは

ElementInternalsとは、カスタム要素が標準のHTML要素と同じようにフォームを構成する要素として機能できるようにするためのものです。

https://developer.mozilla.org/ja/docs/Web/API/ElementInternals

`formAssociated`というstaticプロパティを`true`で設定することでそれを囲う`<form>`と関連づけることができ、フォーム送信時にフォーム検証ができるようになります。他にもARIA属性をつけられるようになったり、カスタムstateを設定してstateに応じたスタイリングができるようになったり、後日紹介する`ElementInternals.type`が検討されていたりします。

https://webkit.org/blog/13711/elementinternals-and-form-associated-custom-elements/
https://web.dev/articles/more-capable-form-controls?hl=ja#defining_a_form-associated_custom_element

これらの機能をもう少し詳しく説明していきます。

## できること

### バリデーション

https://developer.mozilla.org/ja/docs/Web/API/ElementInternals#%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89

TODO: light domでも中にあるinputはバリデーションされない？

ARIAのやつと同様に、カスタム要素を1つのHTML要素として見るときの話かも

### state

https://developer.mozilla.org/ja/docs/Web/API/ElementInternals/states

カスタム要素単位で、stateをKVストアの形で持つことができるCustomStateSetを扱うことができます。

```js
set checked(flag) {
  if (flag) {
    this._internals.states.add('--checked');
  } else {
    this._internals.states.delete('--checked');
  }
}
```

これをCSSの`:state(<identifier>)`のidentifierとして用いることで、カスタム要素を状態に応じてスタイリングすることができます。

```css
labeled-checkbox {
  border: dashed red;
}
labeled-checkbox:state(--checked) {
  border: solid;
}
```

### ARIA

https://developer.mozilla.org/ja/docs/Web/API/ElementInternals#aria_%E3%81%8B%E3%82%89%E5%8F%96%E3%82%8A%E8%BE%BC%E3%81%BE%E3%82%8C%E3%81%9F%E3%82%A4%E3%83%B3%E3%82%B9%E3%82%BF%E3%83%B3%E3%82%B9%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3

今までの問題点:

- setAttributeはアップグレードされたときに実行されるので、カスタム要素にユーザーがHTMLで指定した属性を上書きしてしまう
- setAttributeした属性が後から上書きされてさらに消されたとき、デフォルト値が消えてしまう

https://github.com/sakupi01/sakupi01.com/blob/main/apps/studio.sakupi01.com/whatwg/element-internals/index.html

例
https://wicg.github.io/aom/explainer.html#use-case-1-setting-non-reflected-default-accessibility-properties-for-web-components

子要素がどうとかではなくて、カスタム要素自体を1つのHTML要素として扱うときの話
→カスタム組み込み要素も同じ感じのイメージかも

```html
<script>
  class CustomTabList extends HTMLElement {
    constructor() {
      super();
      this._internals = this.attachInternals();
      this._internals.role = "tablist";
      this._internals.ariaOrientation = "horizontal";
    }
  }

  customElements.define("custom-tablist", CustomTabList);

  class CustomTab extends HTMLElement {
    constructor() {
      super();
      this._internals = this.attachInternals();
      this._internals.role = "tab";
      this._internals.ariaSelected = false;
    }
  }

  customElements.define("custom-tab", CustomTab);
</script>

<custom-tablist aria-orientation="vertical" class="vertical-tablist">
  <custom-tab aria-selected="true">Tab 1</custom-tab>
  <custom-tab>Tab 2</custom-tab>
  <custom-tab>Tab 3</custom-tab>
</custom-tablist>
```

## 宣言的・シリアル化可能な方法

今見てきた方法は全てJSを用いた命令的にElementInternalsを設定する方法でした。
しかし、JSが読み込まれていないタイミング・環境でも利用可能にしたかったり、SSRやSEOの文脈でもメリットがあることから、宣言的・シリアル化可能な方法が求められます。
これはShadow DOMの宣言でも同じことが求められて[Declarative Shadow DOM](https://zenn.dev/cybozu_frontend/articles/web-standardized-component-in-server-and-client)が誕生しました。カスタム要素の定義でも同様で、現在[DeclarativeなCustom Elementsの定義方法](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/Declarative-Custom-Elements-Strawman.md)が検討されています。

https://github.com/WICG/webcomponents/issues/972

## まとめ
