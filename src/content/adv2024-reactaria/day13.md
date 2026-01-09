---
title: "Disclosureについて"
publishedDate: "Dec 13 2024"
---

> [!warn]
> この記事は他サイトから移行したものです。

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 13 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Disclosure について書いていきます。

最初にちょっと記事書いていたときはまだ本番環境のドキュメントに存在していなくて、`http://localhost:1234/react-aria/useDisclosure.html`を貼ろうとしていたのですが、11 月のリリースで入ったようなので見れるようになっていました。

https://react-spectrum.adobe.com/react-aria/useDisclosure.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Disclosure(props) {
  let state = useDisclosureState(props);
  let panelRef = React.useRef<HTMLDivElement | null>(null);
  let triggerRef = React.useRef<HTMLButtonElement | null>(null);
  let { buttonProps: triggerProps, panelProps } = useDisclosure(
    props,
    state,
    panelRef
  );
  let { buttonProps } = useButton(triggerProps, triggerRef);
  let { isFocusVisible, focusProps } = useFocusRing();

  return (
    <div className="disclosure">
      <h3>
        <button
          className="trigger"
          ref={triggerRef}
          {...mergeProps(buttonProps, focusProps)}
          style={{ outline: isFocusVisible ? "2px solid dodgerblue" : "none" }}
        >
          <svg viewBox="0 0 24 24">
            <path d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
          {props.title}
        </button>
      </h3>
      <div className="panel" ref={panelRef} {...panelProps}>
        <p>{props.children}</p>
      </div>
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/

### `group`role と`aria-`属性

ボタンとパネルを結びつけたり、現在 disclosure が開いているかどうかを表したりするために、いくつかの`aria-`属性が用いられています。

https://github.com/adobe/react-spectrum/blob/3f44370de69e48ee56cbf2bbd8664cee8294e9fe/packages/%40react-aria/disclosure/src/useDisclosure.ts#L95-L98

https://github.com/adobe/react-spectrum/blob/3f44370de69e48ee56cbf2bbd8664cee8294e9fe/packages/%40react-aria/disclosure/src/useDisclosure.ts#L111-L114

`aria-expanded`の boolean で現在開いているかどうかの状態を表し、`aria-controls`でパネル（コンテンツ）と結びつけています。

また、非表示のときは`aria-hidden`や`hidden`属性がついています。

https://github.com/adobe/react-spectrum/blob/3f44370de69e48ee56cbf2bbd8664cee8294e9fe/packages/%40react-aria/disclosure/src/useDisclosure.ts#L116-L117

`group`role が用いられているのは、`detail`要素の暗黙の ARIA role が`group`role だからです。

https://w3c.github.io/html-aria/#el-details

### hidden="until-found"

`hidden="until-found"`がつけられています。

https://github.com/adobe/react-spectrum/blob/3f44370de69e48ee56cbf2bbd8664cee8294e9fe/packages/%40react-aria/disclosure/src/useDisclosure.ts#L71-L84

詳しい説明は MDN に任せるのですが、disclosure が閉じている状態でもページ内検索などでは disclosure 内のコンテンツがヒットするようにし、その結果コンテンツまでスクロールされたら`hidden`属性を外してコンテンツを表示するようにする、というものです。

https://developer.mozilla.org/ja/docs/Web/HTML/Global_attributes/hidden#hidden_until_found_%E7%8A%B6%E6%85%8B

ページ内検索やフラグメントナビゲーション（URL の後ろに`#`をつけるやつ）で対象のコンテンツを表示しようとしたときに[`beforematch`](https://developer.mozilla.org/ja/docs/Web/API/Element/beforematch_event)イベントが発火され、それを購読して以下のコードの箇所で処理を行っています。

https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-aria/disclosure/src/useDisclosure.ts#L55-L69

なお、React 側がまだ対応していないので先ほどのコードのように`useLayoutEffect`内で無理やり属性をつけていたり、Firefox と Safari がまだ`beforematch`サポートしていないので対応しているブラウザのみで処理を行うようなロジックになっています。
https://github.com/facebook/react/pull/24741
https://caniuse.com/mdn-html_global_attributes_hidden_until-found_value
https://caniuse.com/mdn-api_element_beforematch_event

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、番外編 テストについての記事です。お楽しみにー
