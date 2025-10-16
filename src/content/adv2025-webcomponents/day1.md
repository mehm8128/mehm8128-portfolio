---
title: ElementInternals.type - カスタム組み込み要素
publishedDate: "2025-12-01"
---

今回はElementInternals.typeを紹介します。

## ElementInternals.typeとは

ElementInternals.typeは、以前紹介したElementInternalsに`type`プロパティを生やし、その`type`が持つ動作をカスタム要素に追加できるようにするものです。

https://github.com/whatwg/html/issues/11061

### explainer

explainerはこちらです。

https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/cc33ef36e04c2e6c6c4c37ce54a2e01a9c1696e2/ElementInternalsType/explainer.md

そもそも組み込みカスタム要素の主なモチベーションとしては、`<button>`の`type="submit"`や`type="reset"`、`popovertarget`などの新しい機能、`<label>`の`for`属性など、HTML要素特有の動作をカスタム要素でも使いたいというものでした。
そこで、前回のカスタム属性でも提案されていたように、特定のHTML要素を拡張する形ではなく、ElementInterenalsにカスタム要素に後から動作を付け加える形のAPIが提案されました。それが`ElementInternals.type`です。

`ElementInternals.type`に以下のような値を指定すると、カスタム要素にそれらの動作を追加できるようになります。

- `button`: `<button type="button">`のような動作。例えば`disabled`や`popoptarget`、`commandfor`など
- `submit`: `<button type="submit">`のような動作
- `reset`: `<button type="reset">`のような動作
- `label`: `<label>`のような動作。例えば`<input>`との紐づけなど

具体的には以下のようなコードになります。

```js
class CustomButton extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals_ = this.attachInternals();
    this.internals_.type = "button";
  }
}

customElements.define("custom-button", CustomButton);
```

これで、以下のようにしてカスタム要素で`popovertarget`属性が利用可能になります。ちなみに、動作が加わるだけで見た目は変化しません。

```html
<custom-button popovertarget="my-popover">Open popover</custom-button>
<div id="my-popover" popover>This is popover content.</div>
```

より細かく機能を分けて、追加たい機能だけを追加して組み合わせられるようにする案もありましたが、組み合わせによって矛盾が発生するおそれや、`popovertarget`は追加するけど`disabled`や`tabindex`を追加しないボタンなどが作成可能になり、UXやアクセシビリティ上の問題が発生する可能性があります。よって、`submit`や`button`のような単位で提供されることになりました。

https://github.com/whatwg/html/issues/11061#issuecomment-2675779659

OpenUIでは全体的に賛成が得られていました。
https://github.com/openui/open-ui/issues/1088

また、今年の6月にはChromiumでIntent to Prototypeとなり、いくつかの機能は最新のChrome CanaryでExperimental Web Platform featuresのフラグつきで動作を確認することができます。

https://groups.google.com/a/chromium.org/g/blink-dev/c/6srW418CDgs/m/HWEB0fS5AQAJ
https://chromestatus.com/feature/5111079237320704?gate=5098147896098816
https://issues.chromium.org/issues/422947646

確認はこのコメントに貼られているJSFiddleで確認することができます（Chrome Canary 143時点）。
https://github.com/openui/open-ui/issues/1291#issuecomment-3357785110

しかし、現在は`ElementInternals.type`よりも有力な案が現れ、上のコメントにも書かれているように、`ElementInternals.type`が置き換えられる予定です。

## まとめ

明日はその新しい案について見ていきます。
