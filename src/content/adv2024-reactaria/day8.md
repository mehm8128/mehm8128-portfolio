---
title: "PopoverとDialogについて"
publishedDate: "Dec 8 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 8 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Popover と Dialog について書いていきます。

https://react-spectrum.adobe.com/react-aria/usePopover.html
https://react-spectrum.adobe.com/react-aria/useDialog.html

## `usePopover`と`useDialog` とは

ポップオーバーやダイアログを作るための hooks です。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Popover({ children, state, offset = 8, ...props }: PopoverProps) {
  let popoverRef = React.useRef(null);
  let { popoverProps, underlayProps, arrowProps, placement } = usePopover(
    {
      ...props,
      offset,
      popoverRef,
    },
    state
  );

  return (
    <Overlay>
      <div {...underlayProps} className="underlay" />
      <div {...popoverProps} ref={popoverRef} className="popover">
        <svg
          {...arrowProps}
          className="arrow"
          data-placement={placement}
          viewBox="0 0 12 12"
        >
          <path d="M0 0 L6 6 L12 0" />
        </svg>
        <DismissButton onDismiss={state.close} />
        {children}
        <DismissButton onDismiss={state.close} />
      </div>
    </Overlay>
  );
}
```

```tsx
function Dialog({ title, children, ...props }: DialogProps) {
  let ref = React.useRef(null);
  let { dialogProps, titleProps } = useDialog(props, ref);

  return (
    <div {...dialogProps} ref={ref} style={{ padding: 30 }}>
      {title && (
        <h3 {...titleProps} style={{ marginTop: 0 }}>
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/

### ダイアログを開いたときに最初にフォーカスする要素

APG の 1 つ目の Note の 1 に書いてあることを要約します。
基本的にダイアログ内の最初のフォーカス可能要素にフォーカスされますが、以下のような場合には例外となります。

- リスト、表、複数の段落など複雑なものの場合、先頭に`tabindex="-1"`な要素を追加してそこに最初にフォーカスする
- 最初のインタラクティブ要素にフォーカスするとダイアログがスクロールされてしまう場合は、`tabindex="-1"`な要素を追加してそこに最初にフォーカスする
- ダイアログ内に破壊的なアクションボタンが含まれている場合、最も破壊的でないボタンにフォーカスを設定する
- 情報を提供したり処理を続行したりするインタラクションボタンに限られている場合、「OK」など最もよく使われるボタンにフォーカスする

### 閉じたときにフォーカスする要素

APG の 1 つ目の Note の 2 に書いてあることを要約します。
基本的にはダイアログを開くトリガーとなったボタンにフォーカスを戻しますが、以下の場合にはワークフロー上の別の要素にフォーカスするとよいです。

- トリガーボタンが消えたとき
- トリガーボタンをすぐに再度押す可能性がほとんどないときや、ダイアログ内のタスクを完了すると次のステップに進む場合

例えば grid で行を追加するボタンを押し、ダイアログで追加する行数を入力するような場合には、行を追加するボタンにフォーカスを戻すのではなく、追加された行の最初のセルにフォーカスするようにするとよいです。

### モーダル化

React Aria のポップオーバーで特徴的なのはこれです。
ダイアログがモーダルになっているのは自然なのですが、ポップオーバーでもモーダルなのはあまり見たことがありませんでした。ポップオーバーを開くとポップオーバー外の要素へのインタラクションができなくなり、背景のスクロールもできなくなります。最近気づいたのですが、Notion のポップオーバーはこれですね。
これは意図せずポップオーバーが閉じてしまったりポップオーバー外の要素にアクセスしてしまったりするのを防いでいます。
その他詳細な理由がこの discussion で述べられています。

https://github.com/adobe/react-spectrum/discussions/3802

また、モーダルにするときは`aria-modal="true"`にするとよいのですが、Safari でフォーカス制御が上手くいかないことがあることから、React Aria では代わりに外側の要素に`aria-hidden="true"`をつけています。

https://github.com/adobe/react-spectrum/blob/10a43de887ffc28913c770a33573aebf3df786fc/packages/%40react-aria/dialog/src/useDialog.ts#L66-L70

### VoiceOver on Chrome のバグ

VoiceOver で以下の 2 つのパターンでダイアログ（ポップオーバー）が閉じてしまうというバグがありました。

- [別タブに移動して戻ってきたとき](https://github.com/adobe/react-spectrum/issues/4130)
- [DatePicker でショートカットキーでフォーカスを移動したとき](https://github.com/adobe/react-spectrum/issues/4922)

これらは VoiceOver on Chrome のバグとして報告されました。

https://issues.chromium.org/issues/40069860

その上で、React Aria でも workaround な対応がされたので、それを見ていきます。

https://github.com/adobe/react-spectrum/pull/4931

`e.relatedTarget`とは、今回は`onBlur`イベントを見ているので、`e.target`がフォーカスを失う要素を表しているのに対して、`e.relatedTarget`は逆にこのタイミングで新たにフォーカスを受け取る要素を表します。

https://developer.mozilla.org/ja/docs/Web/API/MouseEvent/relatedTarget

試したい人は以下のような HTML で、`aaa`ボタンから`bbb`にフォーカスを移動すると、`e.target`が`aaa`ボタン、`e.relatedTarget`が`bbb`ボタンになることが確認できます。

```html
<button id="button">aaa</button>
<button>bbb</button>

<script>
  const ele = document.getElementById("button");
  ele.addEventListener("blur", (e) => console.log(e.target, e.relatedTarget));
</script>
```

修正 PR では条件式が変更されただけなのですが、if 文が`true`になる条件をまとめました。

| 条件式                                                               | 修正前 | 修正後 |
| -------------------------------------------------------------------- | ------ | ------ |
| `e.relatedTarget` = truthy & `isElementInChildOfActiveScope` = true  | true   | true   |
| `e.relatedTarget` = truthy & `isElementInChildOfActiveScope` = false | false  | false  |
| `e.relatedTarget` = falsy & `isElementInChildOfActiveScope` = true   | false  | true   |
| `e.relatedTarget` = falsy & `isElementInChildOfActiveScope` = false  | false  | true   |

よって、`e.relatedTarget`が falsy (`null`) になるときにも結果が`true`になって、ダイアログ（ポップオーバー）が閉じられないようになったことが分かります。

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、 Listbox についての記事です。お楽しみにー
