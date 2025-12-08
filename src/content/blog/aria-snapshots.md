---
title: "アクセシビリティツリーの写真の撮り方"
publishedDate: "Nov 20 2025"
---

こんにちは。個人ブログだけどアドベントカレンダーなので一応自己紹介をしておきます。フロントエンドエンジニアのmehm8128です。

今回はアクセシビリティツリーの写真の撮り方を解説します。

## アクセシビリティツリーの写真の撮り方

数カ月前に、PlaywrightでAria Snapshotsという機能が入りました。これは、アクセシビリティツリー（以降ax tree）をyamlに変換してスナップショットテストを行うことができるものです。今までDOMのスナップショットテストはJestなどのテストツールで行うことができましたが、ax treeのスナップショットテストを行うことのできるものはなかったと思います。

https://playwright.dev/docs/aria-snapshots

また、[Playwright MCP](https://github.com/microsoft/playwright-mcp)でも内部ではこのax treeのyaml形式を扱っているらしいです。

Aria Snapshotsには、普段testing-libraryやplaywrightで`expect()`などを用いるアサーションテストや、これまでのDOMのスナップショットテストと比べて、いくつかのメリットがあります。

1. テストしたい項目を1つ1つ考えて、コードに落とし込む必要がない

testing-libraryでテストしたい場合は、例えばReact Ariaでは、[去年の記事](https://zenn.dev/mehm8128/articles/adv2024-react-aria-test)で書いたように、「このロールがついている」「tabIndexが0である」「aria-disabledがついている」というようなテストを1つ1つ書いていく必要があります。また、「aria-labelledbyにちゃんとこのIDが指定されている」のようなテストもありました。
しかし、Aria Snapshotsでは、テスト対象のコンポーネントに対してax treeという形でスナップショットを撮り、前回分と比較するだけで済むようになります。

2. 抽象化されることで余計な差分が検出されない

DOMのスナップショットテストだと、例えばちょっとDOM構造を変えたとか、CSSの修正・リファクタのためにclassNameを変えたとかでもすぐに差分が検出されてしまいます。また、`<a>`要素のリンクを変えた、というだけでも差分が検出されてしまいます。
しかし、ax treeというレベルまで抽象化され、roleとaccessible nameとARIA state（とその他いくつかの情報）だけになることで、ユーザーの体験に直接影響しない余計な差分が検出されずに済みます。
さらに、その分スナップショットの文字数も減るので、差分が検出されたときの確認も楽になります。

1つ目についてはもう少し詳細に前述の公式ドキュメントに記載があるので、読んでみてください。

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
ax treeのオブジェクトを内部では`AriaNode`という型で扱っているので、内部で扱うax treeのオブジェクトのことを今後`AriaNode`と呼びます。

### isomorphic

これは、yaml to `AriaNode`を行うファイルです。
`toMatchAriaSnapshot()`に渡された文字列や、ファイルから読み込んだyamlを比較用に`AriaNode`に変換します。

### ariasnapshot.ts / generateAriaTree()

`ariasnapshot.ts`は、DOMを`AriaNode`に変換し、それをさらにyamlに変換する処理が一通り書かれたファイルです。
`generateAriaTree()`では、DOM to `AriaNode`の部分を行います。

### ariasnapshot.ts / renderAriaTree()

`renderAriaTree()`は、`AriaNode`をyamlに変換する関数です。

### `matchesExpectAriaTemplate`

`AriaNode`を比較する関数です。
内部で`generateAriaTree`で対象のDOMをAriaTreeに変換し、それと渡されたyamlを`AriaNode`に変換したものを、`matchesNodeDeep`関数で比較します（ただし、コード見れば分かるように、後者の型は`AriaNode`とは微妙に違う`AriaTemplateNode`という型のようです）。

## まとめ

Playwrightだけでなく、testing-libraryなどでもできるようにしてほしいです。
