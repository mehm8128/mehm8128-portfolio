---
title: "Linkについて"
publishedDate: "Dec 3 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 3 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。

今日は Link について書いていきます。

https://react-spectrum.adobe.com/react-aria/useLink.html

## `useLink`とは

リンクを作るための hook です。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Link(props) {
  let ref = React.useRef(null);
  let { linkProps } = useLink(props, ref);

  return (
    <a {...linkProps} ref={ref} style={{ color: "var(--blue)" }}>
      {props.children}
    </a>
  );
}
```

## 本題

APG はこちらです。

https://www.w3.org/WAI/ARIA/apg/patterns/link/

### リンクを disabled にする方法

`useLink`内部で昨日紹介した`usePress`を利用しているのですが、`useLink`に`isDisabled`を渡すと`usePress`内で`e.preventDefault()`してくれて、ナビゲーションが発火しないようになります。
これによって disabled が実現されています。

https://github.com/adobe/react-spectrum/blob/12920fc91afa90d54ae769db45a1cff4b823e1bb/packages/%40react-aria/interactions/src/usePress.ts#L334-L336

### client side navigation

`useLink`を用いると、例えば Next.js の`router.push()`などの client side navigation が `a` タグをクリックしたときに実行されるようになります。つまり、Next.js の`Link`コンポーネントのような動きをすることになります。

こちらのページに詳細が書かれています。
https://react-spectrum.adobe.com/react-aria/routing.html

実現方法としては上記のページに書かれているような方法で`RouterProvider`の`navigate`props に`router.push`などのナビゲーション関数を登録すると、`useLink`内部で以下のように`RouterProvider`の context から`router`を取得しています（この`useRouter`は React Aria 独自のものです）。

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/%40react-aria/link/src/useLink.ts#L65

そして、`useLink`の `linkProps` を渡した要素の`onClick`で`e.preventDefault()`して、`router.open()`（`navigate`関数の発火などが含まれているメソッド）が実行され、無事 client side navigation が実現されています。

https://github.com/adobe/react-spectrum/blob/12920fc91afa90d54ae769db45a1cff4b823e1bb/packages/%40react-aria/link/src/useLink.ts#L92-L93

https://github.com/adobe/react-spectrum/blob/12920fc91afa90d54ae769db45a1cff4b823e1bb/packages/%40react-aria/utils/src/openLink.tsx#L45-L53

### `useLink`で足りないもの

色々と面倒を見てくれる`useLink`ですが、どうしても実現できないものもあります。
以下のリンクの「note」を見てください。

https://www.w3.org/WAI/ARIA/apg/patterns/link/

> Authors are strongly encouraged to use a native host language link element, such as an HTML \<A> element with an href attribute. As with other WAI-ARIA widget roles, applying the link role to an element will not cause browsers to enhance the element with standard link behaviors, such as navigation to the link target or context menu actions. When using the link role, providing these features of the element is the author's responsibility.

`a` タグのリンクを使うとき、ブラウザはいくつか便利機能を提供してくれています。
例えば Chrome の場合、リンクにホバーしたとき、左下に小さく URL が表示されます。また、リンクの上で右クリックしたときのコンテキストメニューに「新しいタブで開く」などの項目があったり、中クリックしても新しいタブでリンク先のページを開くことができたりします。
しかし、`span`タグでリンクを実装して`useLink`を利用した場合、`a`タグではないため、ブラウザはこれらの機能を提供してくれません。

以下のページの Example では、リンクが`a`タグ以外のタグで実装されています。上で挙げた機能が提供されていないことを確認してみてください。

https://www.w3.org/WAI/ARIA/apg/patterns/link/examples/link/#ex_label

よって、リンクはできるだけ`a`タグで実装するのが好ましいです。

## リンクがドラッグできないバグ

こんな issue がありました。
https://github.com/adobe/react-spectrum/issues/6618

普通`a`タグは`draggable="false"`がついていない限りドラッグすることができて、ブラウザ上部に持っていくことで別タブで開いたり、テキスト入力欄に持っていくと URL をそのままペースト（？）できたりするのですが、`useLink`を使っているとなぜかドラッグできなくなってしまうというバグらしいです。

そこで僕が調査して、一応修正 PR を出すところまでいったのですがまだ見てもらえていません。直ってはいるけど修正のしかたに自信がないので、レビューとかもらえると助かります。
原因としては`usePress`で`e.preventDefault()`したくないところでもされてしまっていたので、そこをいい感じに直しました。

https://github.com/adobe/react-spectrum/pull/7448

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、 Text Field についての記事です。お楽しみにー
