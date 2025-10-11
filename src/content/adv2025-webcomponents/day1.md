---
title: Reference Target - Cross-root ARIA Delegation/Reflection, exportid
publishedDate: "2025-12-01"
---

今回は前回紹介した問題に対しての解決策として提案されたCross-root ARIA Delegation/Reflection及びexportidを紹介します。

DelegationとReflection、exportidでそれぞれ別のproposalになっているので、順番に紹介していきます。

## Cross-root ARIA Delegation

https://github.com/leobalter/cross-root-aria-delegation/blob/main/explainer.md

この提案では最初に、要素の参照で問題となるパターンを3パターンに分けています。

- 1. Shadow DOMの中から外を参照する場合
- 2. Shadow DOMの外から中を参照する場合
- 3. 両方が組み合わさった場合

これは前回紹介した図で分かりやすく3パターン紹介されていました。
Cross-root ARIA Delegationでは特に1を解決し、2は次に紹介するCross-root ARIA Reflection、3はこの2つの組み合わせでおそらく解決できるとしています。

先日紹介した`delegatesFocus`と同様に、属性をdelegateすることができるようにするものです。
例えばDeclarative Shadow DOMの場合、以下のサンプルコードのように、カスタム属性に`aria-label`と`aria-describedby`を渡し、`<template>`に`shadowrootdelegatesariaattributes="aria-label aria-describedby"`としてdelegateすることを示します。そしてその内部の`<input>`で`delegatedariaattributes="aria-label aria-describedby"`のようにしてdelegateさせたい属性を指定することで、`<input>`に`aria-label`と`aria-describedby`の値を与えることができるという仕組みです。

```html
<span id="foo">Description!</span>
<x-foo aria-label="Hello!" aria-describedby="foo">
  <template
    shadowroot="closed"
    shadowrootdelegatesariaattributes="aria-label aria-describedby"
  >
    <input id="input" delegatedariaattributes="aria-label aria-describedby" />
    <span delegatedariaattributes="aria-label">Another target</span>
  </template>
</x-foo>
```

この提案では、複数の要素に同じ名前で別の値を持つ属性をつけたい場合に対応できません。例えば以下のような場合です。
この場合に、`label1`と`input1`、`label2`と`input2`をそれぞれ紐づけるということができないのです。

```html
<span id="label1">Label one</span>
<span id="label2">Label two</span>
<x-input>
  <template shadowroot="closed">
    <input aria-labelledby="input1" />
    <input aria-labelledby="input2" />
  </template>
</x-input>
```

ただし、[前回紹介した記事の"Limitations of these APIs"のセクション](https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/#limitations-of-these-apis)で触れられていたように、カスタム要素はある程度「アトミックに」設計されることが多いため、そもそも1つのカスタム要素の中に`<input>`が複数入ることが少なく、大きな問題にならない可能性があります。

## Cross-root ARIA Reflection

https://github.com/Westbrook/cross-root-aria-reflection/blob/main/cross-root-aria-reflection.md

今度はShadow DOMの外から中を参照する場合です。
以下のような形で、`<template>`に`shadowrootreflectsariaattributes="aria-controls aria-activedescendant"`を付与して`aria-controls`と`aria-activedescendant`から参照される場合に、それぞれ内部の`reflectedariaattributes="aria-controls"`と`reflectedariaattributes="aria-activedescendant"`をつけた要素を参照するということを示します。
これによって`<span>`の`aria-controls`は`<ul>`を参照し、`aria-activedescendant`は`Item 2`の`<li>`を参照します。

```html
<span aria-controls="foo" aria-activedescendant="foo">Description</span>
<x-foo id="foo">
  <template
    shadowroot="open"
    shadowrootreflectsariaattributes="aria-controls aria-activedescendant"
  >
    <ul reflectedariaattributes="aria-controls">
      <li>Item 1</li>
      <li reflectedariaattributes="aria-activedescendant">Item 2</li>
      <li>Item 3</li>
    </ul>
  </template>
</x-foo>
```

## semantic-delegate

さらにもう1つ、semantic-delegateという提案があります。

https://github.com/alice/aom/blob/gh-pages/semantic-delegate.md

これは組み込みの`<input>`などの要素をラップして、独自の機能を追加したコンポーネントを作るときのことを考えています。

例えば以下のような、`<input>`に`<span>`を1つ加えた`<fancy-input>`のようなものです。
このような場合、`<fancy-input>`は基本的に`<input>`と同じようなI/Fになっていてほしいのです。

```
<fancy-input>
  #shadowRoot
  | <input>
  | <span>Fancy!</span>
  /#shadowRoot
</fancy-input>
```

それを実現するのがここで提案されている`shadowrootsemanticdelegate`です。
`<input>`につけたidを`shadowrootsemanticdelegate`に指定することで、`<input>`に渡せる属性を`<fancy-input>`に渡し、それはそのまま内部の`<input>`に渡されるというものです。

```html
<label for="fancy">Your name:</label>
<fancy-input id="fancy" aria-describedby="hint">
  <template shadowrootmode="open" shadowrootsemanticdelegate="actualinput">
    <input id="actualinput" />
    <span>Fancy!</span>
  </template>
</fancy-input>
<span id="hint">This can be any name you would like to be addressed as.</span>
```

こうすることで、`<input>`の`id`を`<label>`から参照することもできれば、`<span id="hint">`の`id`を`<input>`から参照することもできるようになっています。

## exportid

https://github.com/WICG/aom/blob/gh-pages/exportid-explainer.md

これは、`exportid`というbool値でShadow DOM内の要素の`id`をエクスポートし、`for="hostid::id(childid)`という形式でShadow DOMの外からその要素を参照できるようにするという提案です。

```
<label for="security::id(real-input)">What was the name of your first pet?</label>
<x-input id="security">
  #shadowRoot
  | <input id="real-input" exportid />
</x-input>
```

Shadow rootがネストされてる場合は、以前紹介した`exportparts`と同様に`forwardids="id"`でフォワードすることができます。

```
<label for="airports::id(real-input)">Destination:</label>
<x-combobox id="airports">
  #shadowRoot
  | <x-input id="textbox" forwardids="real-input">
  |   #shadowRoot
  |   | <input id="real-input" exportid />
  | </x-input>
  | <x-listbox></x-listbox>
</x-combobox>
```

この方法ではShadow DOMの外から中への参照のみが可能ですが、中から外へ参照する方法として`useids`が提案されています。

Shadow hostで`useids="inner-id: outer-idref"`として内部の要素のidと外部の要素のidを指定し、内部で`aria-describedby=":host::id(inner-id)`のように書くことで内部からCSSセレクタのような形で外部の要素を参照することができます。

```
<x-input-with-hint id="name" useids="hint: name-hint">
  #shadowRoot
  | <input aria-describedby=":host::id(hint)" id="real-input" exportid>
</x-input-with-hint>
<span id="name-hint">Your name can be in any language.</span>
```

Cross-root ARIA Delegate/Reflectと同様に、先ほどの`exportid`と組み合わせることで、カスタム要素が兄弟関係にあるときも互いに参照することができます。

```
<x-label useids="label-for: gender::id(real-input)">
  #shadowRoot
  | <label for=":host::id(label-for)">Gender</label>
</x-label>
<x-input id="gender">
  #shadowRoot
  | <input id="real-input" exportid />
</x-input>
```

また、Shadow DOMのカプセル化を維持したいという文脈で`getElementById`や`querySelector`を使ったときの動作についても記載されています。
`null`を返すか、もしくは`getElementById`の場合はretargetアルゴリズムを使用して、ターゲット要素のShadow hostを返すという案も挙げられています。

## 問題点

感じた問題点：内部実装（どの id があるか）を知る必要がある。既存の属性の仕様を変更する必要がある（`inner-id: outer-idref`みたいなのをサポートする必要があるので）

reject された理由
複雑＆Reference Target が出てきたのでいらなくなった
https://groups.google.com/a/chromium.org/g/blink-dev/c/CEdbbQXPIRk

## まとめ

このようにいくつかの新しい属性を駆使してShadow DOMの中と外の要素の紐づけする提案がされてきました。
次回はついにCross-root ARIA Reference Targetの提案を見ていきます。
