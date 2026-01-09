---
title: "アクセシビリティツリーの写真の撮り方"
publishedDate: "Dec 19 2025"
---

> [!note]
> この記事は[木Advent Calendar 2025](https://adventar.org/calendars/12007)の19日目の記事です。

こんにちは。個人ブログだけどアドベントカレンダーなので一応自己紹介をしておきます。フロントエンドエンジニアのmehm8128です。

今回はアクセシビリティツリーの写真の撮り方を解説します。

## アクセシビリティツリーの写真の撮り方

数ヶ月前に、PlaywrightにAria Snapshotsという機能が入りました。これは、アクセシビリティツリー（以降ax tree）をyamlに変換してスナップショットテストを行うことができるものです。今までDOMのスナップショットテストはJestなどのテストツールで行うことができましたが、ax treeのスナップショットテストを行うことのできるものは普及していなかったと思います。

https://playwright.dev/docs/aria-snapshots

また、[Playwright MCP](https://github.com/microsoft/playwright-mcp)でも内部ではこのax treeのyaml形式を扱っているらしいです。

Aria Snapshotsには、普段testing-libraryやPlaywrightで`expect()`などを用いるアサーションテストや、これまでのDOMのスナップショットテストと比べて、いくつかのメリットがあります。

### テストしたい項目を1つ1つ考えて、コードに落とし込む必要がない

testing-libraryでアサーションテストをする場合は、例えばReact Ariaでは[去年の記事](https://portfolio.hm8128.me/adv2024-reactaria/day14)で書いたように、「このロールがついている」「tabIndexが0である」「aria-disabledがついている」というようなテストを1つ1つ書いていく必要があります。また、「aria-labelledbyにちゃんとこのIDが指定されている」のようなテストもありました。
しかし、Aria Snapshotsでは、テスト対象のコンポーネントに対してax treeという形でスナップショットを撮り、前回分と比較するだけで済むようになります。
もちろんこれによるデメリットもいくつかあります。アサーションテストとスナップショットテストの比較については、もう少し詳細に公式ドキュメントに記載があるので、読んでみてください。

[Assertion testing vs Snapshot testing](https://playwright.dev/docs/aria-snapshots#assertion-testing-vs-snapshot-testing)

### 抽象化されることで余計な差分が検出されない

DOMのスナップショットテストだと、例えばちょっとDOM構造を変えたとか、CSSの修正・リファクタのためにclassNameを変えたとか、`<a>`要素のリンクを変えた、というだけでも差分が検出されてしまいます。
しかし、ax treeというレベルまで抽象化され、roleとaccessible nameとARIA states（とその他いくつかの情報）だけになることで、ユーザーの体験に直接影響しない余計な差分が検出されずに済みます。
さらに、その分スナップショットの文字数も減るので、差分が検出されたときの確認も楽になります。

ただ、今回はメリットを確認するのはそこまで重要ではありません。写真の撮り方を見ていきます。

## 写真の撮り方

写真の撮り方、つまりPlaywrightが実際にどのような方法でax treeのスナップショットを作成しているのかを見ていきます。

まず、テストするときのスナップショットの撮り方は2パターンあります。

1. 渡すテンプレート文字列と実際のDOMを比較するパターン。

```ts
await expect(page).toMatchAriaSnapshot(`
  - link "Test Link" [disabled="true"]
`);
```

2. 保存しているyamlと実際のDOMを比較するパターン。

```ts
await expect(page).toMatchAriaSnapshot({
  name: "main.aria.yaml",
});
```

どちらの場合も、まず実際のDOMをax treeオブジェクトに変換します。そして、`toMatchAriaSnapshot()`に渡される文字列のyamlもしくは保存しているyamlをax treeオブジェクトに変換し、ax treeオブジェクト同士で比較を行っています。

実装の詳細を見ていきます。
ax treeのオブジェクトを内部では[`AriaNode`](https://github.com/microsoft/playwright/blob/1513578204d1e8ff283883d568ba9551b5820df1/packages/injected/src/ariaSnapshot.ts#L27-L37)という型で扱っているので、内部で扱うax treeのオブジェクトのことを今後`AriaNode`と呼びます。

### isomorphic

https://github.com/microsoft/playwright/blob/84fa54f342dffa56e43c540fb19b25d2e5baa451/packages/playwright-core/src/utils/isomorphic/ariaSnapshot.ts

これは、yaml to `AriaNode`を行うファイルです。
`toMatchAriaSnapshot()`に渡された文字列や、ファイルから読み込んだyamlを比較用に`AriaNode`に変換します。

パーサーでひたすらパースするだけなので、特に言うことはありません。

### ariasnapshot.ts / generateAriaTree()

https://github.com/microsoft/playwright/blob/1513578204d1e8ff283883d568ba9551b5820df1/packages/injected/src/ariaSnapshot.ts#L103

`ariasnapshot.ts`は、DOMを`AriaNode`に変換し、それをさらにyamlに変換する処理が一通り書かれたファイルです。
`generateAriaTree()`では、DOM to `AriaNode`の部分を行います。

主に`visit()`を用いてDOMを走査し、順番に`AriaNode`に変換していきます。[`toAriaNode()`](https://github.com/microsoft/playwright/blob/1513578204d1e8ff283883d568ba9551b5820df1/packages/injected/src/ariaSnapshot.ts#L241)という関数で、`Element`型のノードから様々な情報を抽出し、`AriaNode`に変換します。その後、それを`processElement()`という関数でさらに疑似要素やslotからテキストを抽出したり、URLやplaceholderなどを抽出したりして`AriaNode`に情報を追加します。

`toAriaNode()`をもう少し見ていきます。
この関数では、主にaccessible nameやrole、ARIA statesなどの計算・取得をしていて、それらの情報を`AriaNode`としてオブジェクトに詰め込んだものをreturnします。
これらの計算処理は、[過去に書いた記事](https://portfolio.hm8128.me/blog/query-by-role)で軽く紹介している`getByRole`などで行われている計算処理と同じ関数が用いられています。具体的には[`roleUtils.ts`](https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleUtils.ts)というファイルの[getAriaRole()](https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleUtils.ts#L242-L252)や[getElementAccessibleName()](https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleUtils.ts#L460-L484)、[getAriaSelected()](https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleUtils.ts#L949-L957)などです。

Testing Libraryだとここらへんの処理は、記事で紹介している[aria-query](https://github.com/A11yance/aria-query)や[dom-accessibility-api](https://github.com/eps1lon/dom-accessibility-api)のような外部ライブラリを用いて実行しているのですが、Playwrightでは全部自前実装しています。ただ、W3Cの[wai-aria](https://www.w3.org/TR/wai-aria-1.2/)や[html-aam](https://www.w3.org/TR/html-aam-1.0/)、[acc-name](https://www.w3.org/TR/accname-1.2/)などの仕様書へのリンクがたくさん貼られているので、だいぶ読みやすいです。

### ariasnapshot.ts / renderAriaTree()

https://github.com/microsoft/playwright/blob/1513578204d1e8ff283883d568ba9551b5820df1/packages/injected/src/ariaSnapshot.ts#L589

`renderAriaTree()`は、`AriaNode`をyamlに変換する関数です。

ひたすら文字列にしていきます。

### matchesExpectAriaTemplate()

https://github.com/microsoft/playwright/blob/1513578204d1e8ff283883d568ba9551b5820df1/packages/injected/src/ariaSnapshot.ts#L411

`AriaNode`を比較する関数です。
内部で`generateAriaTree()`で対象のDOMをAriaTreeに変換し、それと渡されたyamlとを`AriaNode`に変換したものを、`matchesNodeDeep()`関数で比較します（ただし、コード見れば分かるように、後者の型は`AriaNode`とは微妙に違う`AriaTemplateNode`という型のようです）。
メインの処理は`matchesNode()`にあります。

## まとめ

そんなに深堀りせずに概要をざっくり見てきました。気になる人はもう少しコードを読んでみたり、自分で実装してみたりしてください。Playwrightでだけ実現できるようなものでもない気がしているので、Playwrightだけでなくtesting-libraryなどでもできるようになってほしいです。

また、ax treeについてもっと知りたい方は、最近以下のブログで何記事か公開されている関連記事を読むといいかもしれません。

https://www.maxdesign.com.au/articles/axtree.html
