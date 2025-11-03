---
title: Quiet UI
publishedDate: "2025-12-01"
---

今回は9月にリリースされたQuiet UIを紹介します。

## Quiet UIとは

https://quietui.org/

Quiet UIとは、Web ComponentsベースのUIコンポーネントライブラリです。
同じくWeb ComponentsベースのコンポーネントライブラリであるWeb Awesomeと同じ作者が作っているものです。しかし、安定したコンポーネントを提供しようとしているWeb Awesomeとは対象的に、作者の趣味・興味・新しいアイディアを色々取り入れたものになっています。ElementInternalsによるフォーム検証やPopover APIなど、まだNewly Availableな機能がPolyfillとともに利用されているようです。下に紹介するブログ記事でも紹介があるように、`color-mix()`とOKLCHを用いたカラーパレットの生成なども行われています。
つまり、新しい機能やアイディアを試す研究室・遊び場のような形になっており、良さそうなものはWeb Awesome側に採用されたりすることもあるようです。

https://www.abeautifulsite.net/posts/quietui-my-creative-outlet/

https://daverupert.com/2025/10/quiet-ui/

次のセクションでも紹介するように、ユニークなコンポーネントたちが開発されており、他のUIコンポーネントライブラリではあまり見ないような、"playground"という単語が適しているライブラリになっています。

## ユニークなコンポーネントたち

- コンポーネントの説明
- 実装で面白いところあれば
- アクセシビリティの観点

### Comparison

https://quietui.org/docs/components/comparison

ChromaticなどVRTの差分表示で見るようなUIです。
ドラッグ可能なバーを左右に移動させることで、左右の画像の表示割合を操作することができます。

コードはここです
https://github.com/quietui/quiet/blob/next/src/components/comparison/comparison.ts

ドキュメントの最下部にAPIが書かれています。
`start`と`end`のslotに、左右に表示するDOMを入れるようになっていたり、`dragging`などのcustom stateが定義されていたり、`divider`や`handle`などのCSS partsが提供されていてスタイルを当てられるようになっていたりします。

スライダーなので、APGの[Slider Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/slider/)に従って`role="slider"`の要素に`aria-valuenow`や`aria-valuemin`、`aria-orientation`などがつけられていたり、矢印キーによる操作ができるようになっています。

### Joystick, Slide Activator, Flip Card

面白い動きシリーズです。

https://quietui.org/docs/components/joystick

https://quietui.org/docs/components/slide-activator

https://quietui.org/docs/components/flip-card

### Dropdown

https://quietui.org/docs/components/dropdown

https://github.com/quietui/quiet/blob/next/src/components/dropdown/dropdown.ts

Popover APIを使っている例です。`role="menu"`の要素に`popover="manual"`をつけて、`showMenu`関数内で`showPopover()`しています。
Baseline: Limited availabilityであるAnchor Positioningはまだ利用していないようです。

### Passcode

https://quietui.org/docs/components/passcode

`ElementInternals.setValidity`を用いてバリデーションをしている例です。

https://github.com/quietui/quiet/blob/next/src/components/passcode/passcode.ts#L330

少し上の方を見ると、`requestSubmit`や`setFormValue`なども使われています。

ARIA系のElementInternalsはQuiet UI内のどこでも利用されていないようで、Litの`firstUpdated`関数内で`setAttribute`することでShadow hostに属性を設定しているようです。

## まとめ
