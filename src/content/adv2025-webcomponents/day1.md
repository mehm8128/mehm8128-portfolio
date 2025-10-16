---
title: BehavesLikeとButton Activation Behaviors - カスタム組み込み要素
publishedDate: "2025-12-01"
---

今回はElementInternals.typeに続く案であるBehavesLikeとButton Activation Behaviorsを紹介します。

## ElementInternals.typeの問題点

## BehavesLike

この時点のexplainerはこちらです。
https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/4adf38ed104f551748ccdc5bec84d49541e693a2/ElementInternalsType/explainer.md

https://github.com/MicrosoftEdge/MSEdgeExplainers/pull/1130

ElementInternals.type では以下の問題がありました。

- `type`として指定できるものに、`button`や`label`などのHTMLタグ名と、`submit`や`reset`など`<button>`の`type`属性の値が混ざっていた
- `attachInternals()`した後に設定され、いつどこで設定されるのかが明確でなかった
- 値を1回しか設定できないのに、命令的なのが分かりづらい

これらを改善するために、ElementInternalsを使う形式ではなく、`static behavesLike = 'button'`という静的プロパティに値を指定することで追加する機能を指定できるようになりました。また、一旦HTMLタグ名に限定し、今回の提案には`button`と`label`だけが含まれました。
例えば`behavesLike`の値として`button`を指定すると、`elementInternals.buttonMixin.disabled`や`elementInternals.buttonMixin.popoverTargetElement`などのプロパティにアクセス・更新できるようになります。
`label`も同様で、`elementInternals.labelMixin.htmlFor`などにアクセスできます。

```js
class CustomButton extends HTMLElement {
  static behavesLike = "button";

  constructor() {
    super();
    this.internals_ = this.attachInternals();
  }

  get popoverTargetElement() {
    return this.internals_.buttonMixin?.popoverTargetElement ?? null;
  }

  set popoverTargetElement(element) {
    if (this.internals_.buttonMixin) {
      this.internals_.buttonMixin.popoverTargetElement = element;
    }
  }
}
customElements.define("custom-button", CustomButton);
```

```html
<custom-button popovertarget="my-popover">Open popover</custom-button>
<div id="my-popover" popover>This is popover content.</div>
```

## Activation Behaviors

最新のexplainerでメインで扱われているものです。
https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/ElementInternalsType/explainer.md

BehavesLikeと同じく静的プロパティですが、機能ごとにプロパティが分かれています。例えば`<button>`の機能を追加したければ`static buttonActivationBehaviors = true`のように設定します。

```js
class CustomButton extends HTMLElement {
  static buttonActivationBehaviors = true;
}
customElements.define("custom-button", CustomButton);
```

```html
<custom-button commandfor="my-popover" command="toggle-popover">
  Toggle the popover
</custom-button>
<div id="my-popover" popover>
  <p>This popover is controlled by the custom button!</p>
</div>
```

`buttonActivationBehaviors`が`true`になっている場合、現段階では`commandfor`と`command`のみサポートされます。今後`type="submit"`、`type="reset"`をサポート予定とのことです。
また、暗黙的に`role="button"`となり、フォーカス可能になりますが、フォームとの関連付けは行われません。これは[9月に行われたARIA WGでの議論](https://github.com/w3c/aria/issues/2637#issuecomment-3335328264)の結果を踏まえたものです。

## まとめ
