---
title: "Reference Target イントロダクション"
publishedDate: "2025-12-01"
---

> [!note]
> この記事は [Web Components a11y 1 人 Advent Calendar - Qiita Advent Calendar 2025](https://qiita.com/advent-calendar/2025/web-components-a11y) の n 日目の記事です。

今日から 6 日間は、Reference Target について紹介します。

## アクセシビリティ上の問題点

Shadow DOMのカプセル化によるアクセシビリティ上の問題点が、以下の記事で解説されています。これを1つずつ追っていきます。

https://alice.pages.igalia.com/blog/how-shadow-dom-and-accessibility-are-in-conflict/

例えば`<input>`と`<label>`を使って入力欄とそのラベルを紐づけるとき、`<label>`の中に`<input>`をネストするか、`<label>`の`for`属性を用いて`<input>`のIDを参照します。これによって、`<label>`をクリックしたときに`<input>`にフォーカスが当たったり、`<label>`内のテキストが`<input>`のaccessible nameになったりと、アクセシビリティ上・ユーザビリティ上の様々なメリットがあります。

しかし、ここにShadowDOMが関係してくると問題が発生します。

TODO: 後でhtmlにする。フォーマットが崩れるのでしていない

```
<label for="name">名前</label>
<custom-input>
  #shadowRoot
  | <input type="text" id="name" />
</custom-input>
```

この場合、`<custom-input>`内の`<input>`はShadow DOMによってカプセル化されています。これをShadow DOM外の`<label>`から参照することはできないのです。

記事内では似たような例として、コンボボックスの例が紹介されています。

```
<custom-autocomplete>
  #shadowRoot
  | <input id="innerInput" role="combobox" aria-autocomplete="list"
  |        aria-expanded="true" aria-controls="autocompleteOptions"
  |        aria-activedescendant="?????">
  | <div role="listbox" id="autocompleteOptions">
  |   <slot>
  |     <!-- author-provided options will be slotted in here -->
  |   </slot>
  | </div>
  #/shadowRoot
  <custom-option id="opt1">Cassowary</custom-option>
  <custom-option id="opt2">Currawong</custom-option>
  <custom-option id="opt3">Emu</custom-option>
  <custom-option id="opt4">Ibis</custom-option>
  <custom-option id="opt5">Magpie</custom-option>
</custom-autocomplete>
```

Shadow DOM内の`<aria-activedescendant>`が、Shadow DOM外の`<custom-option>`を参照できないのです。
ただし、この場合は`<label>`の例とは違ってShadow DOMの**中**から**外**を参照したいので、比較的最近追加された`ariaActiveDescendantElement`プロパティを使って、`innerInput.ariaActiveDescendantElement = slot.assignedNodes()[2]`のような形で`<custom-autocomplete>`のslotに割り当てられた要素（この場合、`<custom-option>`）を直接`aria-activeDescendant`が参照する要素として指定できます。

しかし、この方法はJSを用いた命令的な方法であることや、Shadow DOMの**外**から**中**を参照したいときに使えないこと、それによって`<custom-option>`たちがShadow DOMの中に入ってしまったら使えない方法であることから、部分的な解決法でしかありません。

Shadow DOMは実装をカプセル化し、隠蔽することでWeb Componentsのユーザーにとっては扱いやすくなるし、I/Fが変わっていなければ内部を自由に変えられるという意味で開発者にとっても大きなメリットがあります。しかし、実装上は隠蔽されているものの、ページの訪問者にとってはもちろん認識できるものであるため、Shadow DOMのカプセル化とページのセマンティクスが矛盾し、アクセシビリティとも矛盾していると述べられています。

また、[後日紹介するproposalのBackgroundセクション](https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md#background)では、要素同士の関係がどのようなときに参照できてどのようなときに参照できないのかが図で分かりやすくまとめられています。

画像貼る
alt: アクセシブル版は上のリンクより、proposalの"Detailed description of diagram"をご覧ください。

## 解決策

ではどのような解決策が提案されてきたのでしょうか。今後5回に渡り紹介していきますが、今回はそれら＋αを簡単に紹介します。

### 1. IDL属性リフレクション

先ほど紹介した、`element.ariaActiveDescendantElement`のような形で直接参照する属性を指定できるようにするものです。
これはShadow DOMの**内部**から**外部**を参照できるようにしましたが、その逆はできなかったり、JSを用いた命令的な方法であることから部分的な解決策となっています。

記事ではまだ一部のブラウザでしかサポートされていないと書かれていますが、今年から利用できるようになったブラウザが多く、主要ブラウザの最新バージョンでは利用可能になっています。

https://caniuse.com/?search=ariaActiveDescendantElement%20

### 2. IDL属性リフレクションでopenなShadowDOMの内部の要素を参照できるようにする

https://gist.github.com/nolanlawson/4fe8b5d672cda3bcc4daf58079145202

1のIDL属性リフレクションで、openなShadow DOMの**外**から**中**を参照できるようにしたいという提案です。

しかし、Shadow DOMのカプセル化が大きく失われてしまう可能性や、closedなShadow DOMでは使えないという問題、宣言的に使えないという問題などがあります。

### その他

他にexportidsやCross-root ARIA delegation/reflection、Cross-root ARIA Reference Targetなど様々な提案がされています。明日以降、これらを紹介していきます。

## デザインシステムでの実装

Web Componentsを利用したデザインシステムはいくつか公開されています。その1つであるSpectrum Web Componentsで、このようなShadow DOMを跨いだ参照の問題が現状どのように解決されているのかを見てみます。

最初に見た`<label>`と`<input>`の例を、`<sp-field-label>`と`<sp-textfield>`コンポーネントで確認します。

https://opensource.adobe.com/spectrum-web-components/components/field-label/

DOMは大体以下のようになっています。

```
<sp-field-label for="email">
  #shadow-root
  | <label>
  |   <slot></slot>
  | </label>
  Email address
  </sp-field-label>
  <sp-textfield id="email" type="text">
  #shadow-root
  | <div>
  |   <input aria-label="Email address">
  | </div>
  </sp-textfield>
```

`email`というIDを通して`<sp-field-label>`と`<sp-textfield>`が紐づけられています。しかし、よく見てみると分かるように、`<label>`に`for`属性が渡されていなかったり、`<input>`に`aria-label`が指定されていたりして、普段`<label>`と`<input>`を紐づけるようなときの書き方はされていません。

これは現状このDOM構造ではShadow DOMを超えての参照が不可能なことから、`<sp-field-label>`で無理やり紐づけされているのです。
これにより、フォーカス制御やaccessible nameの付与などがJSを利用して無理やり行われています。

https://github.com/adobe/spectrum-web-components/blob/main/packages/field-label/src/FieldLabel.ts

## まとめ

明日以降はいよいよ具体的にproposalを見てどのような解決策が提案されているかを紹介していきます。

## その他参考文献

- [Shadow DOM and accessibility: the trouble with ARIA | Read the Tea Leaves](https://nolanlawson.com/2022/11/28/shadow-dom-and-accessibility-the-trouble-with-aria/)
