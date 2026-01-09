---
title: "query-by-role というライブラリを作った"
publishedDate: "Jun 02 2025"
---

> [!warn]
> この記事は他サイトから移行したものです。

こんにちは、フロントエンドエンジニアの mehm8128 です。最近やってることは sizu.me とか Bluesky とかに書いてます。
今回は、タイトルの通りライブラリを作ってみたので紹介します。

## query-by-role とは

フロントエンドエンジニアならきっと使ったことがあるであろう、[Testing Library](https://testing-library.com/) や [Playwright](https://playwright.dev/) などでよく出てくる、あれです。`getByRole` と `queryByRole` がありますが、どちらに近いとか考えずに、クエリする感じが出ている query-by-role としました。汎用的すぎるので SWR みたいに、略して qbr とかにしてもよかったと後悔してます。
https://testing-library.com/docs/queries/byrole/

`getByRole` や `queryByRole` は、Testing Library や Playwright で使えますが、機能開発などで使うようにはなっていない（はず）です。しかし、Chrome 拡張機能開発で DOM 要素を取得したいときに欲しいと思うことがあったり、過去にも何かのタイミングで欲しいと思うタイミングがあったような気がしたので、テストの文脈以外でも使えるように `getByRole` や `queryByRole` のようなものをミニマルな形で自作してみました（実はもうあるよとかあれば教えてください）。

## インストール

npm が好きな方はこちらから。
https://www.npmjs.com/package/query-by-role

JSR が好きな方はこちらから。
https://jsr.io/@mehm8128/query-by-role

GitHub が好きな方はこちらから。
https://github.com/mehm8128/query-by-role

## 使い方

こんな感じで、`window` から `createTargetWindow` で `TargetWindow` インスタンスを作り、`targetWindow.queryByRole()` を使うことができます。ライブラリとか作ったことがないので、どういうインターフェースがいいのか分からなくて雰囲気で作ってます。class とか使ったことないし。
クエリした結果は `QueryResult` インスタンスで返却され、`.all()` や `.first()`、`.nth(3)` などで欲しい形で要素を取得することができます。

```ts
const targetWindow = createTargetWindow(window);
const buttonRoleElements = targetWindow.queryByRole("button", {
  name: "Click!",
  pressed: true,
});
console.log(buttonRoleElements.all()); // -> [button]
```

ちなみに、`queryByRole()` の第二引数に渡す `options` はまだいくつか未対応のものがあり、これから実装をしたり、修正したりする必要のあるものがあります。

## 内部実装

では内部実装を見ていきます。
最初に、Testing Library と Playwright の実装を見に行きました。それぞれ簡単にまとめます。

### Testing Library

Testing Library の方は、会社の先輩である mugi さんが過去に書いていたので、それを読んで使われているライブラリなどを把握し、実際のソースコードの方は自分でもちゃんと読んで中身を把握しました。

https://zenn.dev/mugi/scraps/6c9d0310ff77ef

本質部分はここらへんと、
https://github.com/testing-library/dom-testing-library/blob/ab9c3aeee4358cc856c14dbaec8ffc4db8f5ee76/src/queries/role.ts#L186-L304

このファイルです。
https://github.com/testing-library/dom-testing-library/blob/ab9c3aeee4358cc856c14dbaec8ffc4db8f5ee76/src/role-helpers.js

1 つ目のファイルの return 文で、`querySelectorAll(role)`で該当 role の要素を全て取得し、filter していきます。filter は [`dom-accessibility-api`](https://github.com/eps1lon/dom-accessibility-api) の `computeAccessibleName` を使って accessible name をチェックしたり、2 つ目に挙げたファイルに本質実装がある `computeAriaSelected` などで `aria-*` 属性をチェックしたりしています。また、return 文の少し上では、[`aria-query`](https://www.npmjs.com/package/aria-query) を用いて、該当の `aria-*` 属性を使用するべきではない role だった場合にエラーを吐くような実装になっています。

https://github.com/testing-library/dom-testing-library/blob/ab9c3aeee4358cc856c14dbaec8ffc4db8f5ee76/src/queries/role.ts#L67C3-L175C4

### Playwright

Playwright の方は自分で読みに行きました。探し方が下手で時間がかかってしまいました。`getByRole` とかで検索かけないで、最初から `aria-なんとか` でコード内検索かけてたら多分もっと速く本質部分に辿り着けたと思います。
https://zenn.dev/mehm8128/scraps/ea88d49579b535

本質部分はここらへんと、
https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleSelectorEngine.ts#L130-L180

このファイルです。
https://github.com/microsoft/playwright/blob/e58f076d426d8d2a70b4b6cf4010d3343116e950/packages/injected/src/roleUtils.ts

先ほどと同じように、今度は `querySelectorAll(*)` で全部マッチさせ、そこから filter していっています。今回はライブラリを使っていないので、`roleUtils.ts` がかなり長くなっています（1000 行ある...）。
これを参考にして実装すると途中で [WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/) や [HTML Accessibility API Mappings 1.0](https://www.w3.org/TR/html-aam-1.0/) とにらめっこする時間が始まるのですが、そこは頑張ります。

### `aria-query` と `dom-accessibility-api` について

もう少し解説します。
`aria-query` は、[WAI-ARIA 1.2](https://www.w3.org/TR/wai-aria-1.2/#roles) に基づいて role や `aria-*` 属性に関する情報を提供してくれるライブラリです。README にあるように、`roles.get(role)` で role に許可されている `aria-*` 属性を提供したり、role から HTML 要素のタグ名、もしくはその逆へのマッピングも提供しています。

`dom-accessibility-api` は、[Accessible Name and Description Computation 1.2](https://www.w3.org/TR/accname-1.2/) に基づいて、`computeAccessibleName` や`computeAccessibleDescription` といった、accessible name や accessible description を計算してくれる関数を提供しています。

Accessible Name and Description Computation 1.2 の 1.1 からの変更点についてはこちら。
https://zenn.dev/mehm8128/articles/accessible-name-and-description-computation-1-2

どちらも最終更新が半年以上前なのが少し気になりますが、今回はこれらのライブラリを利用して query-by-role を実装しました。

### 実装内容

一応 GitHub を再掲します。
https://github.com/mehm8128/query-by-role

基本的に、上記 2 つのライブラリを使いながら Testing Library と Playwright の良いとこ取りをして、できるだけ簡単に実装しています。

role から `querySelectorAll` するのはここらへん。
https://github.com/mehm8128/query-by-role/blob/8f6e1c6b7bff10ec85e3f9ef5502a992f8f1992d/src/window.ts#L21-L38

ここで、各 `aria-*` 属性の filter をしています。
https://github.com/mehm8128/query-by-role/blob/main/src/queryByRole.ts

本質部分はここらへん。`aria-query` や `dom-accessibility-api` を使っていい感じにしています。
https://github.com/mehm8128/query-by-role/blob/main/src/getAriaAttributes.ts

テストは Vitest で気持ち程度に書いています。
https://github.com/mehm8128/query-by-role/blob/main/src/getAriaAtributes.test.ts
https://github.com/mehm8128/query-by-role/blob/main/src/window.test.ts

npm に publish する用のビルドには、[tsup](https://tsup.egoist.dev/) を使っています。前に何かで雑に使ったときに楽だった記憶があるので選びました。そんなにでかいライブラリにはならないので、バンドルサイズとかも気にしていません。

JSR への publish は初めてでしたが、これまた会社の先輩の、Kesin さんの記事を参考にして手動で publish するところまでやりました。npm とバージョン揃うようにするのとか自動化とかは、やる気が出たらやります。
https://zenn.dev/kesin11/articles/20240530_publish_jsr

## まとめ

いかがでしたか？
需要があるのか怪しいし、まだ全然整備できていないですが、なんかいい感じにしていきます。
もし需要があれば、 Issue でも Pull Request でもお待ちしています。
