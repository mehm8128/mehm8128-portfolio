---
title: Reference Target - Cross-root ARIA Reference Target Phase1
publishedDate: "2025-12-01"
---

今回はついにCross-root ARIA Reference Targetを見ていきます。

## Cross-root ARIA Reference Target

Cross-root ARIA Reference Targetは、前回見たような提案を基にして作られ、現在最も有力な解決策となっているものです。
2023年TPACのbreakoutsの段階では、まだexportidsの案が最も有力で、Chromiumでプロトタイプも作られていたようです。

[RFC: Exporting IDs from shadow roots for cross-root ARIA by behowell · Pull Request #204 · WICG/aom](https://github.com/WICG/aom/pull/204)
[Intent to Prototype: ExportID for cross ShadowRoot ARIA](https://groups.google.com/a/chromium.org/g/blink-dev/c/CEdbbQXPIRk)

しかし、その後Reference Targetの提案が出され、こちらが有力視されるようになりました。
[RFC: Reference Target for Cross-root ARIA by behowell · Pull Request #207 · WICG/aom](https://github.com/WICG/aom/pull/207)

既にChromium系では`Experimental Web Platform features`のフラグ付きでいくつかの機能が利用可能になっています。

https://wpt.fyi/results/shadow-dom/reference-target/tentative?label=experimental&label=master&aligned

また、Mozillaでは最近position: positiveになり、それを受けてWebkitでも再検討する流れになりそうです。
[Reference Target for Cross-Root ARIA · Issue #1035 · mozilla/standards-positions](https://github.com/mozilla/standards-positions/issues/1035)
[Reference Target for Cross-Root ARIA · Issue #356 · WebKit/standards-positions](https://github.com/WebKit/standards-positions/issues/356)

Tracking Issueはこちら。
[Reference Target Tracking Issue · Issue #1086 · WICG/webcomponents](https://github.com/WICG/webcomponents/issues/1086)

この提案では以下の目標とするもの・目標としないものが設定されています。

### 目標とするもの

- Shadow DOMの**外**から**中**へ参照するための方法を定義し、Web Componentを、対象の要素をラップしたものとして機能するようにする（Phase1）
- Shadow root内の特定の要素へのきめ細かい参照を作成できるようにする（Phase2）
- 上記2つを検討するに実現、シリアル化可能、closedとopenの両方に対応、Shadow DOMのカプセル化の保持を必須要件とする

### 目標としないもの

- semantic-delegateの提案で出てきたような、Shadow hostに指定した`role`や`aria-label`を転送すること
  - あくまで"Reference Target"であるため、IDREF以外の属性は含んでいません
- form-associatedをいい感じにするやつ？TODO
- Shadow DOMの**中**から**外**へ参照するシリアル化可能な方法
  - つまり、IDL属性リフレクションを宣言的に使う方法

## Phase1

提案は大きくPhase1とPhase2に分かれています。最も単純で議論も進んでいるケースをPhase1としてまず実現した上で、Phase2に取り組むために分割されています。

Phase1では、Web ComponentがShadow DOMの外の要素からIDREFで参照されたときに、その内部の要素への参照を返すことができるようにします。
例えば、以下のような形になります。

```
<label for="consent">I consent to cookies</label>
<sp-checkbox id="consent">
  <template shadowRootMode="open"
            shadowRootReferenceTarget="input">
    #shadow-root
    | <input id="input" type="checkbox" checked="checked">
    | <span id="box"></span>
  </template>
</sp-checkbox>
```

この場合、`<label>`から`<sp-checkbox>`を参照していますが、`shadowRootReferenceTarget="input`により、Shadow DOM内の`id="input"`を持つ`<input>`要素を参照することができます。
つまり、`<sp-checkbox>`を「`<input type="checkbox">`を拡張したもの」として、扱うことができます。これをexplainerでは"enclosing elements"や"This allows host element to substitute for an enclosed element"などと表現しています。また、前回紹介したsemantic-delegateで"wrapping"として表現されていたものも同様の状態を表しています。

これはUIコンポーネントライブラリやデザインシステムなど、アトミックなWeb Componentsを作るときによく現れるパターンです。

これは`for`や`aria-labelledby`に限らずIDREFであれば全て有効で、比較的最近の属性である`popovertarget`や`anchor`、`commandfor`、`interestfor`なども対応しています（これらの属性はアドベントカレンダーの後半で紹介予定です）。また、`for`属性を使わずに`<label>`の子要素として`<fancy-input>`のようなものを入れたときでも動くようになっています。

```html
<script>
  customElements.define(
    "fancy-input",
    class FancyInput extends HTMLElement {
      constructor() {
        super();
        this.shadowRoot_ = this.attachShadow({
          mode: "closed",
          referenceTarget: "real-input",
        });
        this.shadowRoot_.innerHTML = `<input id="real-input" />`;
      }
    }
  );
</script>

<label>
  Fancy input
  <fancy-input></fancy-input>
</label>
```

## Phase2

Phase1ではWeb Componentsを、1つの要素を"enclose"しているものと捉え、Shadow DOMの内部の1つの要素のみ参照できるようにしていました。
しかし、それでは不十分なケースがあるので、主に参照する要素以外の要素も参照できるようにPhase2がありまうｓ．

`shadowRootReferenceTargetMap="aria-attr: inner-id"`で、この属性から参照されたらこの要素を参照する、というマッピングができる

```html
<input
  role="combobox"
  type="text"
  aria-controls="animals"
  aria-activedescendant="animals"
/>
<animals-listbox id="animals">
  <template
    shadowrootmode="open"
    shadowRootReferenceTargetMap="aria-controls: listbox,
                                  aria-activedescendant: opt1"
  >
    <div role="listbox" id="listbox">
      <div role="option" id="opt1">Otter</div>
      <div role="option" id="opt2">Opossum</div>
      <div role="option" id="opt3">Ocelot</div>
    </div>
  </template>
</animals-listbox>
```

`shadowRootReferenceTargetMap`に`属性名: inner-id`の形式で指定することで、その属性から参照されたときに、Shadow DOMの内部にある`inner-id`の要素を参照することができます。
この例だと`<input>`の`aria-controls`からは`role="listbox`の`<div>`、`aria-activedescendant`からは`role="option"`の`Otter`オプションの`<div>`を参照することができます。

Phase1の`shadowrootreferencetarget`と一緒に使うこともできます。

```html
<input
  role="combobox"
  aria-controls="fancy-listbox"
  aria-activedescendant="fancy-listbox"
/>
<fancy-listbox id="fancy-listbox">
  <template
    shadowrootmode="open"
    shadowrootreferencetarget="real-listbox"
    shadowrootreferencetargetmap="aria-activedescendant: option-2"
  >
    <div id="real-listbox" role="listbox">
      <div id="option-1" role="option">Option 1</div>
      <div id="option-2" role="option">Option 2</div>
    </div>
  </template>
</fancy-listbox>
```

この場合、`aria-activedescendant`から参照されたときは`option-2`を参照しますが、それ以外の全ての属性から参照されたときは`real-listbox`を参照します。つまり、`shadowrootreferencetarget`がフォールバック的に働くのです。

また、`aria-lablledby`や`aria-describedby`などでは複数要素からaccessible nameやaccessible descriptionとなるテキストを取得したいことがあります。
その場合、以下のようにスペース区切りでIDを指定すると複数の要素を参照することができます。

```html
<input aria-describedby="description-with-tooltip" />
<!--
  The resulting description text is: 
  "Inline description text. Tooltip with more information."
-->
<description-with-tooltip id="description-with-tooltip">
  <template
    shadowrootmode="closed"
    shadowrootreferencetargetmap="aria-describedby: message tooltip"
  >
    <div>
      <span id="message">Inline description text.</span>
      <button onmouseover="showTooltip()" onmouseout="hideTooltip()">
        More Info
      </button>
      <div id="tooltip" role="tooltip" style="display: none">
        Tooltip with more information.
      </div>
    </div>
  </template>
</description-with-tooltip>
```

## まとめ
