---
title: "【番外編】テストについて"
publishedDate: "Dec 14 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 14 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は ~~枠稼ぎ~~番外編として、React Aria で行われているテストについて書いていきます。

## React Aria に導入されているテスト

React Aria では主に 3 種類のテストが導入されています。
1 つ目は Storybook です。
開発中に使うのはもちろん、おそらく Chromatic も利用されています。CI で回しているようなコードが見当たらなかったのですが、Chromatic 用の Storybook が別で用意されているのでおそらく使われています。また、[@storybook/addon-a11y](https://www.npmjs.com/package/@storybook/addon-a11y)も導入されています。
2 つ目は Testing Library & Jest です。
今回はこちらをメインに紹介していきます。
3 つ目は手動試験です。
以下のページで説明されているように、様々な デバイス・ブラウザ及びスクリーンリーダーで試験が行われています。

https://react-spectrum.adobe.com/react-aria/accessibility.html#testing

時々 issue や PR などで`audit`という言葉を見かけますが、おそらくこの手動試験がその一部として行われているのではないかなと思っています（説明されているページは見つけられませんでした）。

## Testing Library & Jest

これまでのアドベントカレンダーで紹介してきたいくつかの hook を例に取りながら、どんなテストが書かれているのか見ていこうと思います。

まずは`useLink`からです。
https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/link/test/useLink.test.js

`handles defaults`のテストでは`role`や`tabIndex`が明示的に渡されていないことと、`onKeyDown`に関数が与えられていることをテストしています。
次の`handles custom element type`のテストでは、`elementType: 'div'`で`useLink`を使用したときに`role`として`link`が明示的に渡されることや`tabIndex`が`0`で渡されることがテストされています。また、`handles isDisabled`のテストでは`aria-hidden`の値もチェックされています。
このように、最低限の a11y が保証されているかどうかを hook の返り値で 1 つずつ確認しています。

次に、`useDisclosure`を見てみます。
https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/disclosure/test/useDisclosure.test.ts

こちらはインタラクションによる状態変化があります。

以下の 2 つのテストでは、マウスとキーボードでそれぞれ操作したときに、`useDisclosureState`から返る`state.isExpanded`が`true`かどうかを確かめています。
https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-aria/disclosure/test/useDisclosure.test.ts#L50-L78

他にも id の紐づけが適切にされているかどうかを確認しているテストもあります。
https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-aria/disclosure/test/useDisclosure.test.ts#L94-L104

昨日の記事で紹介した`hidden="until-found"`関連のテストもあります。
https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-aria/disclosure/test/useDisclosure.test.ts#L106-L141

このように、hooks が提供したい機能が必要最低限提供されているかどうかが、Testing Library & Jest のテストによって保証されています。

### Playwright の Aria snapshots

React Aria では使われていないですが、関連事項としてついでに紹介します。

Aria snapshots とは Playwright 1.49 で新しく追加された機能です。
https://playwright.dev/docs/aria-snapshots

アクセシビリティツリーを yaml 形式でスナップショットとして保存しておき、それを次回テスト時に再度アクセシビリティツリーを yaml 形式にしたものと比較してスナップショットテストを行うことができます。
比較元となる yaml は自分で書いておくことも可能で、書き方によっては部分マッチや正規表現によるマッチなどより柔軟なスナップショットテストを行うことができるようになっています。

azukiazusa さんの記事も参考になります。
https://azukiazusa.dev/blog/playwright-aria-snapshot/

これを用いて例えば先ほど紹介した`useLink`の`handles isDisabled`のテストの一部がこのように書けるはずです（未検証）。

先ほどのテストコード
https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-aria/link/test/useLink.test.js#L36-L42

Aria snapshots のコード例

```ts
await expect(page).toMatchAriaSnapshot(`
  - link "Test Link" [disabled="true"]
`);
```

React Aria の hooks のような低レイヤーなものにはあまり使えなさそうですが、デザインシステムなどではいちいち role や ARIA attributes を確認するテストを書かなくてよくなるので、効率化ができそうです。

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、Color Picker についての記事です。お楽しみにー
