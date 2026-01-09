---
title: "Buttonについて"
publishedDate: "Dec 2 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 2 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。

それでは今日は Button について書いていきます。

https://react-spectrum.adobe.com/react-aria/useButton.html

## `useButton` とは

ボタンを作るための hook で、マウスやタッチ、キーボードによるインタラクションをサポートします。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Button(props) {
  let ref = useRef<HTMLButtonElement | null>(null);
  let { buttonProps } = useButton(props, ref);
  let { children } = props;

  return (
    <button {...buttonProps} ref={ref}>
      {children}
    </button>
  );
}
```

## 本題

APG はこちらです。

https://www.w3.org/WAI/ARIA/apg/patterns/button/

### `usePress`について

`useButton`で利用されている`usePress`hook では様々な a11y 対応がされていて、ブログ記事にまとめられています。
https://react-spectrum.adobe.com/blog/building-a-button-part-1.html

簡単に概要をまとめます。

主にタッチデバイスへの対応の話が書かれていて、マウスでできる操作がタッチイベントだと難しかったり、`:active`や`:hover`の動作がユーザーの期待と一致しない場合があって UX が悪くなりがちだったりといった問題が挙げられています。

そこで React Aria では [Pointer Events API](https://developer.mozilla.org/ja/docs/Web/API/Pointer_events) が利用されています。この API はマウス、タッチ、ペンによる操作に対応していて、[`pointerType`](https://developer.mozilla.org/ja/docs/Web/API/PointerEvent/pointerType)プロパティによってどの機器によってイベントが発火されたのかも知ることができます。
`usePress`ではこれを用いて上記の問題の解決や、その他タッチキャンセルやテキスト選択、キーボード操作時にキーを押しっぱなしにすることによるイベントの複数発火防止などにも対応しています。`usePress`は`useButton`以外にもいくつかの hooks で用いられています。

実装を読みたい人はこちらから。実装を読むとかいうタイトルのアドベントカレンダーですが、僕はほんのちょっとしか読んでいません（読んだ部分については明日書きます）。

https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/interactions/src/usePress.ts

関連して、ホバーについては別の記事と、これを簡潔にまとめたまっつーさんの記事が参考になります。後者の記事には Pointer Events API のサンプルコードもあります。

https://react-spectrum.adobe.com/blog/building-a-button-part-2.html

https://zenn.dev/cybozu_frontend/articles/hover-style-on-supported-devices

### `isPending`について

こちらは hooks にはないのですが、React Aria Components に含まれている props です。
データの送信中などにボタンを一時的に pending にしておくことができます。
`isPending={true}`のときはボタンに`aria-disabled="true"`がつきます。また、即座に ProgressBar（`role="progressbar"`のもの）をアクセシビリティツリーに含める必要があります。

[https://react-spectrum.adobe.com/react-aria/Button.html#accessibility](https://react-spectrum.adobe.com/react-aria/Button.html#accessibility)

`progressbar`role はデフォルトでライブリージョンのように振る舞うので、`isPending`になった瞬間に ProgressBar のラベルが読み上げられます。

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions#roles_with_implicit_live_region_attributes

と思っていたのですが、読み上げられなさそうで React Aria では手動で読み上げが実装されていました...。

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/react-aria-components/src/Button.tsx#L150-L158

ローディング状態になったときに if 文の 1 つ目のブロックが実行され、ローディング状態が解除されたときに`else if`のブロックが実行されます。
`announce`関数では`LiveAnnouncer`という独自のオブジェクトが利用されていて、visually hidden な`div`要素を用意しておいて、そこに`aria-live`などをつけた要素を入れておきます。さらにその中に読み上げさせたいテキストを`div`要素で追加する、もしくは`aria-labelledby`でテキストを指定したければ、`aria-labelledby`でテキストへの参照をつけた`img`role（おそらく`aria-labelledby`がつけられる role ならなんでも OK）の`div`要素を追加する、という実装になっています。

https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/live-announcer/src/LiveAnnouncer.tsx

実際にレンダリングされる HTML を見た方が分かりやすいと思うので、大体こんな感じのコードです。
実際の HTML が見たい方はドキュメントのデモとか開発用 Storybook とかで HTML 内を`data-live-announcer`で検索かけると出てきます。

```html
<div data-live-announcer="true" style="visually hiddenにするstyle">
  <div role="log" aria-live="assertive" aria-relevant="additions">
    <!--`announce`関数発火時にここに要素が追加される-->
  </div>
  <div role="log" aria-live="polite" aria-relevant="additions">
    <!--例えばこんな感じ-->
    <div>読み上げたいテキスト</div>
    <!--もしくはこう-->
    <div role="img" aria-labelledby="読み上げたいテキストの要素のid"></div>
  </div>
</div>
```

ちなみに`aria-`について補足しておくと、[`aria-live`](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Attributes/aria-live)は要素が更新されたときにスクリーンリーダーに読み上げさせるためのもので、値として、指定していないときと同じ`off`、更新されたらすぐに通知する`assertive`、他の読み上げが終わってから通知する`polite`を指定できます。今回は`assertive`が指定されています。
[`aria-relevant="additions"`](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-relevant)は要素が追加されたとき通知することを表し、他には要素が削除されたときに通知する`removals`などがあります。今回は`aria-rive`や`aria-relevant`をつけている`div`タグの中に、読み上げさせたいタイミングで読み上げテキストを含む要素を一時的に追加するような運用をしているので`additions`が指定されています。

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、 Link についての記事です。お楽しみにー
