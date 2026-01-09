---
title: "ComboBoxについて"
publishedDate: "Dec 20 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 20 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は ComboBox について書いていきます。

https://react-spectrum.adobe.com/react-aria/useComboBox.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function ComboBox(props) {
  // Setup filter function and state.
  let { contains } = useFilter({ sensitivity: "base" });
  let state = useComboBoxState({ ...props, defaultFilter: contains });

  // Setup refs and get props for child elements.
  let buttonRef = React.useRef(null);
  let inputRef = React.useRef(null);
  let listBoxRef = React.useRef(null);
  let popoverRef = React.useRef(null);

  let { buttonProps, inputProps, listBoxProps, labelProps } = useComboBox(
    {
      ...props,
      inputRef,
      buttonRef,
      listBoxRef,
      popoverRef,
    },
    state
  );

  return (
    <div style={{ display: "inline-flex", flexDirection: "column" }}>
      <label {...labelProps}>{props.label}</label>
      <div>
        <input
          {...inputProps}
          ref={inputRef}
          style={{
            height: 24,
            boxSizing: "border-box",
            marginRight: 0,
            fontSize: 16,
          }}
        />
        <Button
          {...buttonProps}
          buttonRef={buttonRef}
          style={{
            height: 24,
            marginLeft: 0,
          }}
        >
          <span aria-hidden="true" style={{ padding: "0 2px" }}>
            ▼
          </span>
        </Button>
        {state.isOpen && (
          <Popover
            state={state}
            triggerRef={inputRef}
            popoverRef={popoverRef}
            isNonModal
            placement="bottom start"
          >
            <ListBox {...listBoxProps} listBoxRef={listBoxRef} state={state} />
          </Popover>
        )}
      </div>
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/combobox/

### ブログ記事

ComboBox の a11y 対応について、公式がブログ記事を出しています。
https://react-spectrum.adobe.com/blog/building-a-combobox.html

記事では React portals のフォーカス順の話やスクリーンリーダー間の読み上げの差異、デバイス間の動作の差異などについて述べられています。最初の 2 つについて軽く解説します。

### React portals

[前回と前々回解説した Focus Management API の RFC](https://portfolio.hm8128.me/adv2024-reactaria/day17#react-portals) でも述べられていたようなフォーカス順の話です。
ComboBox が開いている間はこのコンポーネント以外のところにスクリーンリーダーがアクセスできないように（≒ フォーカスできないように）、残りの全ての要素に`aria-hidden`をつけています。また、その間に新しい DOM が生成されたときも`MutationObserver`で監視して、新たに`aria-hidden`をつけるようにしているらしいです。

ちなみに、これだと重いので`startTransition`を用いてパフォーマンス改善をするというテクニックがあるらしいです。
https://x.com/javascripter/status/1867513567156805906

Dialog についての記事で説明したように、Dialog の場合は Safari のバグが直れば代わりに`aria-modal="true"`をつけられるらしいのですが、今回の場合は`dialog`role を使っているわけではないので置き換えられなさそうです。
https://portfolio.hm8128.me/adv2024-reactaria/day8#%E3%83%A2%E3%83%BC%E3%83%80%E3%83%AB%E5%8C%96

> `aria-modal` プロパティを `role="dialog"` の要素に適用すると、ダイアログ外のコンテンツが不活性であることを支援技術に知らせるために、背景で aria-hidden を使用する技術に置き換わります。

https://developer.mozilla.org/ja/docs/Web/API/Element/ariaModal

また、以下のような issue も発見したので、いつか`inert`などを用いて改善されるかもしれません。

https://github.com/adobe/react-spectrum/issues/7377

#### スクリーンリーダー間差異

NVDA と Voice Over における読み上げの問題があったので、その改善方法について述べられていました。

##### NVDA

元々 ComboBox が開かれるたびに最初のオプションのフォーカスするようにしていたのですが、文字の削除やカーソル移動時に読み上げが行われなかったので、入力された文字が変更されたりカーソルが移動したりするたびに毎回フォーカスをクリアするようにしたらしいです。

##### Voice Over

とにかく読み上げがされず、自前で`LiveAnnoucer`を作成して読み上げが行われるようにしたという話が書かれています。
例えば`group`role 内のオプションラベルや利用可能なオプションの数の読み上げ、選択中のオプションにフォーカスしたときに現在選択中という情報などが読み上げられていなかったらしいです。
`LiveAnnouncer`については 2 日目の記事で解説したので、そちらをご覧ください。

https://portfolio.hm8128.me/adv2024-reactaria/day2#ispending%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6

ちなみに、読み上げメッセージについては簡潔になるように配慮されているらしいです。

読み上げの実装はここらへんです。
https://github.com/adobe/react-spectrum/blob/326f48154e301edab425c8198c5c3af72422462b/packages/%40react-aria/combobox/src/useComboBox.ts#L275-L337

### キーボード操作

前に`useListBox`や`useComboBox`を用いたときのメニューでのフォーカス移動の挙動と、`useMenu`を用いたときの挙動が異なっていて気になって調査したことがあるので、紹介しておきます。
https://portfolio.hm8128.me/blog/react-aria-combobox

### Customizable Select Element

React Aria とは直接関係ないですが、ComboBox に関係あるので取り上げてみます。
saku さんの 1 人アドベントカレンダーで、Customizable Select Element についての話がたくさん書かれています。簡単に言うと現在の`select`要素はそのままだとスタイルを当てるのが難しいので、スタイルを当てやすいように改良されようとしていて、その背景についてまとめられています。これを使えるようになれば、「アクセシブルで見た目がいい感じのセレクトボックスを使いたいけどライブラリ使ったり自作したりするほどでもない」みたいなときに便利だと思います。

https://adventar.org/calendars/10293

現在 Chrome Canary の v130 以上で Experimental Web Platform features のフラグを有効化（`chrome://flags/#enable-experimental-web-platform-features`）すると、Customizable Select Element の動作を確認できます。
11 日目の記事に CodePen のデモがあります。

https://blog.sakupi01.com/dev/articles/2024-openui-advent-11

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、番外編 i18n についての記事です。お楽しみにー
