---
title: "RadioとCheckboxについて"
publishedDate: "Dec 6 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 6 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Radio と Checkbox について書いていきます。そろそろしんどいです。

https://react-spectrum.adobe.com/react-aria/useRadioGroup.html
https://react-spectrum.adobe.com/react-aria/useCheckbox.html
https://react-spectrum.adobe.com/react-aria/useCheckboxGroup.html

## `useRadioGroup`と`useCheckbox` とは

ラジオボタンやチェックボックス、またそれらのグループを作るための hooks です。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
let RadioContext = React.createContext(null);

function RadioGroup(props) {
  let { children, label, description, errorMessage } = props;
  let state = useRadioGroupState(props);
  let { radioGroupProps, labelProps, descriptionProps, errorMessageProps } =
    useRadioGroup(props, state);

  return (
    <div {...radioGroupProps}>
      <span {...labelProps}>{label}</span>
      <RadioContext.Provider value={state}>{children}</RadioContext.Provider>
      {description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {description}
        </div>
      )}
      {errorMessage && state.isInvalid && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {errorMessage}
        </div>
      )}
    </div>
  );
}

function Radio(props) {
  let { children } = props;
  let state = React.useContext(RadioContext);
  let ref = React.useRef(null);
  let { inputProps } = useRadio(props, state, ref);

  return (
    <label style={{ display: "block" }}>
      <input {...inputProps} ref={ref} />
      {children}
    </label>
  );
}
```

## 本題

APG はこちらです。

https://www.w3.org/WAI/ARIA/apg/patterns/radio/
https://www.w3.org/WAI/ARIA/apg/patterns/checkbox/

### styling

スタイリングしやすいように、visually hidden で`input`要素を隠します。
[VisuallyHidden](https://react-spectrum.adobe.com/react-aria/VisuallyHidden.html) コンポーネントがあるので、これで`input`要素を wrap するだけで OK です。

### Tab フォーカス

ラジオグループの場合、Tab フォーカスはグループの中で選択されているラジオボタンか、選択されているラジオボタンがなければ最後にフォーカスされたラジオボタンにあたり、それ以外は Tab ではなくて矢印キーで移動します。

ただ、APG には選択されているラジオボタンがなければ、グループ内の最初のラジオボタンにフォーカスされることが多いと書いてありました。

> If none of the radio buttons are checked, focus is set on the first radio button in the group.

https://github.com/adobe/react-spectrum/blob/10a43de887ffc28913c770a33573aebf3df786fc/packages/%40react-aria/radio/src/useRadio.ts#L83-L93

### 2 種類のフォーカス移動

APG の例では 2 種類の方法でグループ内のラジオボタンのフォーカスを移動する方法が紹介されています。

1 つは`tabindex`を変化させる方法です。これは React Aria で用いられている方法です。選択されている要素を`tabindex="0"`にし、選択されていない要素を`tabindex="-1"`にします。矢印キーが押されるたびにこれを変化させていくことで、選択されている要素にフォーカスを当てていくことができます。この方法を`Roving tab index`と呼びます。

https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio/

こちらはついさっき見つけたページなのでページ全体を読めているわけではないですが、
参考になりそうなので貼っておきます。
https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex

もう 1 つの方法は、`aria-activedescendant`を用いる方法です。フォーカスは常に`group`role（ラジオなら`radiogroup`role）を持つ要素に当てておき、そのグループ内でアクティブな要素（選択されているラジオボタン）の id を`aria-activedescendant`に渡すことで、アクティブな要素をスクリーンリーダーが読み上げてくれます。

https://www.w3.org/WAI/ARIA/apg/patterns/radio/examples/radio-activedescendant/

### TreeWalker API

矢印キーが押されたときに次にフォーカスするべき要素を特定するために、`getFocusableTreeWalker`関数が用いられています。

https://github.com/adobe/react-spectrum/blob/10a43de887ffc28913c770a33573aebf3df786fc/packages/%40react-aria/radio/src/useRadioGroup.ts#L104-L124

https://github.com/adobe/react-spectrum/blob/10a43de887ffc28913c770a33573aebf3df786fc/packages/%40react-aria/focus/src/FocusScope.tsx#L744-L774

`getFocusableTreeWalker` について簡単に説明していきます。
この関数では、HTML のノードを探索するために利用できる `TreeWalker` という API が使われています。

https://developer.mozilla.org/ja/docs/Web/API/TreeWalker

`Document.createTreeWalker`関数で`walker`を作成します。第一引数にルートの要素、第二引数にどのような種類のノードを探索するか（`whatToShow`）というフラグを組み合わせたビットマスクを指定します。ビットマスクなので、例えば`Element`ノードと`Comment`ノードをどちらも探索したい場合は`NodeFilter.SHOW_ELEMENT + NodeFilter.SHOW_COMMENT`を指定すればよいです。
そして第三引数には、第二引数で指定したノードを探索していく中でさらにどういう条件を満たすノードを含み、どういう条件を満たすノードを含まないのかを指定する `acceptNode`という callback 関数を指定します。各ノードに対して`NodeFilter.FILTER_ACCEPT`を return するとこのノードを含み、`NodeFilter.FILTER_REJECT`を返すとこのノードとそのサブツリーの全てのノードを含まず、`NodeFilter.FILTER_SKIP`を返すとこのノードのみを含まないでサブツリーは探索を続けます。

今回の場合、`onKeyDown`が発火したタイミングで次にフォーカス可能なラジオボタンを探すのか、前のフォーカス可能なラジオボタンを探すのかを判定し、`walker.nextNode()`や`walker.previousNode()`、もしくは`walker.firstChild()`や`walker.lastChild()`などを呼んでいます。このタイミングで先ほどの`acceptNode`関数を発火し、探索していきます。今回はフォーカス可能なノードを探すので`selector`を以下のように定義し、`(node as Element).matches(selector)`でフォーカス可能かどうかを判定しています。

```ts
let selector = opts?.tabbable
  ? TABBABLE_ELEMENT_SELECTOR
  : FOCUSABLE_ELEMENT_SELECTOR;
```

ちなみに`focusable`は`tabindex="0"`などのノードはもちろん、`tabindex="-1"`で programmatically にフォーカス可能なノードも含み、`tabbable`は`tabindex="-1"`は含まず、Tab キーによってフォーカス可能なノードのみを表します。

これを用いて「一番下のラジオボタンにフォーカスされているときに下矢印キーが押されたら一番上のラジオボタンにフォーカスする」などといった動作が実現されています。

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、 Tooltip についての記事です。お楽しみにー
