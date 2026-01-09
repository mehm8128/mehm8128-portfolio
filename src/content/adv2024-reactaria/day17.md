---
title: "【番外編】Focus Management APIについて（概要編）"
publishedDate: "Dec 17 2024"
---

> [!warn]
> この記事は他サイトから移行したものです。

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 17 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Focus Management API の概要について書いていきます。

## Focus Management API とは

Focus Management API とは、こちらの React の RFC で提案されている API です。提案者の方が React Spectrum のメンテナーということと、React Aria で同様の API が実装されていることから、今回紹介することにしました。

https://github.com/reactjs/rfcs/pull/109

RFC 自体はここから見ることができます。

[https://github.com/devongovett/rfcs-1/blob/patch-1/text/2019-focus-management.md](https://github.com/devongovett/rfcs-1/blob/patch-1/text/2019-focus-management.md)

簡単に言うと、`FocusScope`コンポーネントと`FocusManager`という API を `react-dom` にビルトインで導入したいという提案です。
[React の `createPortal`](https://ja.react.dev/reference/react-dom/createPortal)が抱えている問題の改善や、その他フォーカス制御をいい感じにしたいというのが主な目的です。

まだ`react-dom`には入っていないのですが、前述のように`FocusScope`も`FocusManager`も React Aria には導入済みです（ただ、a hacky DOM-based implementation らしいです）。詳細は明日の記事で紹介します。

https://react-spectrum.adobe.com/react-aria/FocusScope.html

## 現状の辛さ

`Challenges`のセクションに、現状フォーカス制御をすることの辛さが語られています。観点ごとに整理して見ていきます。

### Focus containment

宣言的な React で、命令的な処理を書くことになる ref（`useRef`）を使うのはエスケープハッチとされています。特にフォーカス制御などで ref を使わざるを得ないときがありますが、ref は React っぽくないのであまり使いたくないとのことです。
ref を使う場面の例として、例えばダイアログやその他ポップアップで、フォーカスが外に出てしまわないようにしたいことがあります。これを Focus containment を呼んでいます。ダイアログ内の最後の要素にフォーカスしている状態で Tab キーを押したら、ダイアログ内の一番上の要素にフォーカスが戻るようにしたりといったものです。これは現状、手動で命令的にフォーカスを制御しなければ実装できません。

### Restoring focus

現状フォーカスを移動するとき、前にどの要素がフォーカスを持っていたかを記憶しておくには上記の ref などを用いて手動で管理しておくしかありません。前にフォーカスしていた要素を記憶していたい場面の例を 2 つ紹介します。

リストとかグリッドといった UI パターン（参考: [GridList について - React Aria の実装読むぞ](https://portfolio.hm8128.me/adv2024-reactaria/day10#%E3%83%87%E3%83%BC%E3%82%BF%E3%82%B0%E3%83%AA%E3%83%83%E3%83%89)）では、一度 Tab キーでフォーカスしたらその後の、その UI の中でのフォーカス移動は矢印キーで移動したいです。なぜなら、見たいわけではないグリッドにフォーカスしたときに、そこから抜け出して次のコンテンツに進むために何回も Tab キーを押さなければならないからです。
そのために [Roving tab index パターン](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex)が上記の動作を実現する 1 つの手段ではありますが、一度フォーカスが外れてまた戻ってきたときに、前にフォーカスされていた要素にフォーカスを復元するにはそれを記憶しておかないといけません。

また、ダイアログが閉じたときに、ダイアログを開く前にフォーカスしていた要素（ダイアログのトリガーボタンなど）にフォーカスを戻したいこともあります（参考: [Popover と Dialog について - React Aria の実装読むぞ](hhttps://portfolio.hm8128.me/adv2024-reactaria/day8#%E9%96%89%E3%81%98%E3%81%9F%E3%81%A8%E3%81%8D%E3%81%AB%E3%83%95%E3%82%A9%E3%83%BC%E3%82%AB%E3%82%B9%E3%81%99%E3%82%8B%E8%A6%81%E7%B4%A0)）。

このように、前にフォーカスしていた要素に再度フォーカスを復元したいような場合に、ある領域の中で最後にフォーカスしていた要素を記憶しておく必要があります。

### React portals

[React portals](https://ja.react.dev/reference/react-dom/createPortal) を利用したときは実際の DOM の順番が React tree（ソースコード上のツリー）と異なるので、フォーカス順についても開発者の意図しない動作をしてしまうことがあります。
RFC に書かれているソースコードの例をそのまま取ってきます。

```tsx
function App() {
  return (
    <div>
      <input placeholder="input 1" />
      <Portal>
        <input placeholder="input 2" />
      </Portal>
      <input placeholder="input 3" />
    </div>
  );
}
```

`Portal`コンポーネントは、`createPoratl`を用いて子要素を`document.body`に配置させるようなものだと想定しています。
この場合、フォーカス順が`input 1`→`input2`→`input3`ではなくて、`input 1`→`input3`→`input2`となります。これは分かりづらいので、React tree の順にフォーカスされるようにしてほしいということが提案されています。実はイベントバブリングは React tree の通りに行われるらしいです。つまり、`input 2`で発生したイベントはその親要素である`div`タグにバブリングされる、ということです。

## 解決方法

上記の辛さを踏まえて、`Detailed design` のセクションでは今回の提案でどのように問題を解決していくかが述べられています。

### 言葉の定義

Definitions のセクションで用語の定義がされています。[Radio と Checkbox について - React Aria の実装読むぞ](https://portfolio.hm8128.me/adv2024-reactaria/day6#treewalker-api)でも出てきましたが一応確認します。

focusable: デフォルトでフォーカス可能な`input`や`button`要素に加えて、`tabindex`属性がついている要素
tabbable: デフォルトでフォーカス可能な`input`や`button`要素に加えて、値が 0 以上の`tabindex`属性がついている要素（つまり、Tab キーでフォーカスできないマイナスの`tabindex`を持つ要素は含まない）

### FocusScope

React root に暗黙の`FocusScope`を用意しておき、`FocusScope`はその中にあるフォーカス可能要素で順序付きリストを作成します。Tab キーを押したときに、この順序通りにフォーカスが移動していきます。
各`FocusScope`はその中で最後にフォーカスされた要素を記憶しておき、他の`FocusScope`からフォーカスが移動してきたときにその位置にフォーカスを戻すことができるようにします。また、現在フォーカスされている要素を持っている`FocusScope`がアンマウントした場合、その`FocusScope`外の最後にフォーカスを持っていた要素にフォーカスが移動します。

さらに、`FocusScope`は Focus containment にも用いることができます。`contain`prop を渡した場合、`FocusScope`内のフォーカス可能要素の中でフォーカスがループします。そして、`autoFocus`prop を渡すと`FocusScope`内で最初のフォーカス可能要素に自動でフォーカスします。

### FocusManager

矢印キーを押したときのフォーカス移動など、Programmatically にフォーカスを移動するための API で、next, previous, first, last の focusable 及び tabbable な要素への移動をサポートしています。特定の要素へのフォーカスは引き続き React の`ref`を使うのがよさそうとのことです。

## その他

残りのセクションでは、具体的な実装方針や使用例がソースコードとともに紹介されています。

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、 番外編 Focus Management API について（実装編）の記事です。お楽しみにー
