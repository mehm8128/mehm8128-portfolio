---
title: "Toastについて"
publishedDate: "Dec 11 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 11 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Toast について書いていきます。

https://react-spectrum.adobe.com/react-aria/useToast.html

## `useToast`とは

トーストを表示するための hook です。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function ToastProvider({ children, ...props }) {
  let state = useToastState({
    maxVisibleToasts: 5,
  });

  return (
    <>
      {children(state)}
      {state.visibleToasts.length > 0 && (
        <ToastRegion {...props} state={state} />
      )}
    </>
  );
}

function ToastRegion<T extends React.ReactNode>({
  state,
  ...props
}: ToastRegionProps<T>) {
  let ref = React.useRef(null);
  let { regionProps } = useToastRegion(props, state, ref);

  return (
    <div {...regionProps} ref={ref} className="toast-region">
      {state.visibleToasts.map((toast) => (
        <Toast key={toast.key} toast={toast} state={state} />
      ))}
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/alert/

### role について

React Aria ではどんなトーストでも`alert`role になり、さらにそれを`alertdialog`のコンテナーで囲うような形になっているのですが、これは実装がよくないと思っています。
以下の画像が、ドキュメントのページでトーストを表示したときの DOM の画像です。

![一番外側の`role="alertdialog"`がついた`div`要素の中に、`role="alert"`の`div`要素と、`button`要素が入っている](./images/toast-role.png)

MDN の`alertdialog`のページでは以下のような記載があります。

> alertdialog ロールは、ユーザーの即時の注意を要する緊急情報をユーザーに通知するために使用されます。

> その緊急性のために、アラートダイアログは常にモーダルでなければなりません。

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/alertdialog_role

また、WAI-ARIA にも同様のことが書かれています。

> Content authors SHOULD make alert dialogs modal by ensuring that, while the alertdialog is shown, keyboard and mouse interactions only operate within the dialog.

https://www.w3.org/TR/wai-aria-1.1/#alertdialog

MDN を見ると`alert`role も同様に、緊急度の高い場合のみ使うべきということが書かれています。

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/alert_role

しかし、`useToast`で表示するようなトーストは必ずしも緊急を要する情報であることは想定されていないですし、少なくともドキュメントのページのデモではモーダルにもなっていません。よって、代わりに`status`role を利用するべきだと考えています。

Chakra-UI で用いられている zag-ui だとここで role が`status`になっています。
https://github.com/chakra-ui/zag/blob/main/packages/machines/toast/src/toast.connect.ts#L59

Vercel のデザインシステムも、このページでトーストを表示してみると`status`role であることが分かります。

https://vercel.com/geist/toast

他にも調べたのがちょっと前なのでどのデザインシステムだったか忘れてしまったのですが、error toast だけ`alert`role、それ以外は`status`role、と分けているデザインシステムもありました。

ここらへんの PR が部分的に関係していそうなのですが、~~時間がなくて~~調査しきれませんでした。

https://github.com/adobe/react-spectrum/pull/6011

https://github.com/adobe/react-spectrum/pull/6223

### live region

`alert`role を使うと、暗黙的に`aria-live="assertive"`がつくので更新が通知されます。`polite`とは違い、現在のタスクを中断してでも緊急で情報を伝えてきます。

### キーボード操作

`useToastRegion`でトースト全体のコンテナーに`region`role をつけて landmark にしていて、そこで使っている`useLandmark`によって`F6`でトーストにフォーカスできるようになっています。

https://github.com/adobe/react-spectrum/blob/8228e4efd9be99973058a1f90fc7f7377e673f78/packages/%40react-aria/toast/src/useToastRegion.ts#L30-L33

`F6`がどこからきているのか分からなかったのですが、discussion にありました。

https://github.com/adobe/react-spectrum/discussions/6686

`F6`を用いてこのような操作ができることってスクリーンリーダー利用者や日常的にキーボード操作をする人たちの間では有名なんですかね。

### フォーカス操作

状況に応じて色々フォーカスを操作しているので、簡単にまとめます。

フォーカスしているトーストが消えたら（消されたら）、その次のトーストか、なければ前のトーストにフォーカスが移動します。

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/%40react-aria/toast/src/useToastRegion.ts#L41

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/%40react-aria/toast/src/useToastRegion.ts#L71-L104

また、トーストが 1 つもなくなったら`F6`を用いて移動してきたときの、元々フォーカスしていた要素にフォーカスを戻します。
数日後の記事で紹介する（本当は今日紹介する予定だったけど延期にした）`FocusScope`の focus restore が効かないからここで実装してい ~~るとのことなのですが、なんで効かないのか分かりませんでした...。まだ`FocusScope`の実装を読めていないので、読んだら分かるかもです。~~ ます。追記: 読みました。
`FocusScope`は mount するタイミングでフォーカスされている要素を`document.activeElement`で取得するので、`useToastRegion`を使っているコンポーネント（`ToastRegion`）が mount するタイミングでしかフォーカスの復元先を更新しません。つまり、一回`ToastRegion`に入って再度元の場所に戻り、別の要素から`F6`キーで入ったとしても`ToastRegion`が mount したタイミングでフォーカスされていた要素が記憶されている状態のままということです。よって、`lastFocused`を別で保持しておき、unmount するタイミングでそちらにフォーカスを戻すようにしています。

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/%40react-aria/toast/src/useToastRegion.ts#L118-L132

ちなみに`lastFocused`は`useFocusWithin`で、この前紹介した`e.relatedTarget`を用いて取得しています。

https://github.com/adobe/react-spectrum/blob/b0f15697245de74ebc99ab3d687f5eb3733d3a34/packages/%40react-aria/toast/src/useToastRegion.ts#L106-L116

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、 Menu についての記事です。お楽しみにー
