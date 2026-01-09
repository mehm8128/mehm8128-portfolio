---
title: "Tabについて"
publishedDate: "Dec 16 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 16 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Tab について書いていきます。

https://react-spectrum.adobe.com/react-aria/useTabList.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Tabs(props) {
  let state = useTabListState(props);
  let ref = React.useRef(null);
  let { tabListProps } = useTabList(props, state, ref);
  return (
    <div className={`tabs ${props.orientation || ""}`}>
      <div {...tabListProps} ref={ref}>
        {[...state.collection].map((item) => (
          <Tab key={item.key} item={item} state={state} />
        ))}
      </div>
      <TabPanel key={state.selectedItem?.key} state={state} />
    </div>
  );
}

function Tab({ item, state }) {
  let { key, rendered } = item;
  let ref = React.useRef(null);
  let { tabProps } = useTab({ key }, state, ref);
  return (
    <div {...tabProps} ref={ref}>
      {rendered}
    </div>
  );
}

function TabPanel({ state, ...props }) {
  let ref = React.useRef(null);
  let { tabPanelProps } = useTabPanel(props, state, ref);
  return (
    <div {...tabPanelProps} ref={ref}>
      {state.selectedItem?.props.children}
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/tabpanel/

### role と`aria-`属性

1 つ 1 つのタブボタンは`tab`role、それらを囲っているものが`tablist`role、タブ選択時にコンテンツが表示される領域が`tabpanel`role です。
全ての`tab`role にはそれぞれに対応する`tabpanel`の id を`aria-controls`に指定し、さらにアクティブな`tab`role には`aria-selected="true"`をつけます。

### キーボード操作

Tab キーで現在アクティブなタブにフォーカスが当たり、矢印キーでタブの移動ができます。

また、タブにフォーカスが当たっているときに Tab キーを押した場合、タブパネルがその中に Tab キーによってフォーカス可能な要素を含んでいればその要素にフォーカスが当たります。Tab キーによってフォーカス可能な要素を含んでいなければタブパネル自体が`tabindex="0"`になってタブパネル全体にフォーカスが当たります。

https://github.com/adobe/react-spectrum/blob/b3a4d6c1134aae882aa1dcfce64efba1d8f4308d/packages/%40react-aria/tabs/src/useTabPanel.ts#L31-L34

（注意: `tabbale`、`tabbing`は Tab キーでフォーカスできる、Tab キーを押す、などの意味で、`tab`はタブコンポーネントを意味しています）

### タブの配置方向

縦に配置する場合と、左右反対に配置するパターンがあります。

縦に配置する場合は`aria-orientation="vertical"`をつけ、上下矢印キーでタブを移動できるようにします。
また、右から左に読む言語を利用している場合、最初のタブが一番右、最後のタブが一番左に配置されるようにする必要があり、さらにキーボード操作も左右逆にします。ドキュメントのデモ部分で devtools から`dir="ltr"`を`dir="rtl"`にすると体験できます。

### Pointer Cancellation

過去に こんな issue がありました。

https://github.com/adobe/react-spectrum/issues/4336

WCAG の [Success Criterion 2.5.2 Pointer Cancellation](https://www.w3.org/TR/WCAG22/#pointer-cancellation)に準拠せず、pointerdown のタイミングでしかタブの選択ができなかった時期があったようです。今回のケースは 4 つ挙げられているパターンのうちの「Abort or Undo」に当たると思います。
そこで、[useTab: adds support for shouldSelectOnPressUp #4342](https://github.com/adobe/react-spectrum/pull/4342)で`shouldSelectOnPressUp`props がサポートされ、間違えてタブをクリック（pointerdown）してしまったときでも pointerup する前にタブからカーソルを移動すればタブの選択をキャンセルすることができるようになりました。

### aria-controlsについて

最初に述べた`aria-controls`について、コントロールする側とされる側の要素を紐づけるために付与するべきなのは分かっているのですが、スクリーンリーダーでの読み上げに特に影響しているわけではなさそうで、サービスの利用者目線で具体的に何かメリットがあるのか気になっていました。そこで、1 つ記事を見つけたので共有します。

https://www.makethingsaccessible.com/guides/aria-controls-vs-aria-owns/

`aria-controls`と`aria-owns`の違いを説明する記事なのですが、[So, how are they different?](https://www.makethingsaccessible.com/guides/aria-controls-vs-aria-owns/#so-how-are-they-different)で`aria-controls`について説明されています。特に「Does ARIA Controls have good support?」のセクションでスクリーンリーダーなどのサポート状況について述べられていて、[Accessibility Support](https://a11ysupport.io/tech/aria/aria-controls_attribute)を確認すると JAWS というスクリーンリーダーでのみ`aria-controls`に対してなんらかのサポートを行っていることが説明されています。とはいえアクセシビリティツリーには`aria-controls`の値が公開されているので、今後他のスクリーンリーダーでもサポートされる可能性はあり、そのときのためにつけておくのがよさそうということらしいです。
W3C や NVDA のリポジトリで、`aria-controls`に対してどのようなサポートをするべきか議論されているような issue も見つけたので読んでみるといいかもしれません。

https://github.com/w3c/aria/issues/995
https://github.com/nvaccess/nvda/issues/8983

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、番外編 Focus Management API について（概要編）の記事です。お楽しみにー
