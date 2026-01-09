---
title: "aria-label、ボタン/リンクに付けるか？アイコンに付けるか？"
publishedDate: "May 05 2025"
---

> [!warn]
> この記事は他サイトから移行したものです。

こんにちは、[最近社会人になった](https://x.com/mehm8128/status/1906999436989137088) フロントエンドエンジニアの mehm8128 です。
最近のおすすめ技術書は [Effective TypeScript](https://www.oreilly.co.jp/books/9784814401093/) です。
今回はずっと気になってることを書きます。ちょっと書いてから気づいたのですが、以下の記事に僕が書きたいことのほぼ全てが書かれていたので、そっちの方が気になるという方は僕の記事は読まなくて OK です。

https://zenn.dev/moneyforward/articles/20231120-icon-button-accessible-name

## aria-label、ボタン/リンクに付けるか？アイコンに付けるか？

例えば以下のようなアイコンリンク/アイコンボタンがあり、`aria-label` を用いて accessible name を付けなければならないとき、`<button>` 要素 / `<a>` 要素か `<svg>` 要素のどちらに `aria-label` を付けますか？

```tsx
function IconButton() {
  return (
    <button>
      <svg
      // なんか色々
      >
        {/** なんかアイコンっぽいHTMLたち */}
      </svg>
    </button>
  );
}

function IconLink() {
  return (
    <a href="https://example.com">
      <svg
      // なんか色々
      >
        {/** なんかアイコンっぽいHTMLたち */}
      </svg>
    </a>
  );
}
```

今回はそういう話です。

## 前提

例えば `<svg>` 要素の最初の子要素に `<title>` 属性で accessible name を入れるやり方とか、Visually Hidden で `<button>` 要素や `<a>` 要素の子要素にテキストを入れるやり方とか、そもそもアイコンと一緒に可視テキストを表示させた方がいいとかというのは、今回は考えないことにします。今回はそれらを使わずに `aria-label` で accessible name を付けなければならないときにどうするかという話でお願いします。

## アイコンに付ける派

僕はこっち派でした。今までどっちが良いか分からなかったのでなんとなくでこっちにしていましたが、今回ちょっと考えてみたらこっちの方が良さそうな理由がいくつか出てきたので、順番に書いていきます。

### アイコンの代替テキストを付けているという認識

例えば `<svg>` ではなくて、`<img>` 要素でアイコンを表示しているときには、`<img>` 要素側に `alt` 属性として accessible name を付けます。「前提」セクションで書いたような、`<svg>` の子要素として `<title>` 属性で accessible name を付ける方法も、`<svg>` 要素側に付けています。これらは「アイコンが表現しているものを表す代替テキスト」として accessible name を提供していて、それを `<a>` 要素や `<button>` 要素が参照している形です。`<a>` 要素や `<button>` 要素側にこのようなテキストを付けるのは若干不自然なので、`<svg>` 要素側に付けるのが自然だと考えます。また、最初に挙げた記事でも書かれているように、一貫性を持たせるという意味でも `<img>` 要素 の `alt` 属性などの方式に合わせて、`<svg>`要素側に付けるのがよさそうです。

### アイコン＋文字列のとき

例えば以下のような場合です。

```tsx
function IconLink() {
  return (
    <a href="https://example.com">
      これはサンプルリンクです。
      <svg
        // なんか色々
        aria-label="別タブで開きます。"
      >
        {/** なんかアイコンっぽいHTMLたち */}
      </svg>
    </a>
  );
}
```

アイコンリンクの話をしてるのにちょっと違うじゃんって言われそうですが。このような場合、`<a>` 要素に `aria-label` で「別タブで開きます。」を付けてしまうと、「これはサンプルリンクです。」が読み上げられなくなってしまうので、上記のサンプルコードのように `<svg>` 側に付けるのが適切だと思います。
このことから、一貫性を持たせるためにも、文字列がないときにも `<svg>` 側に付けるのがいいのかなと思いました。

## ボタン/リンクに付ける派

ボタン/リンクに付ける派の人たちは、「ボタン/リンクの accessible name なんだから、ボタン/リンクに直接付けるべき」と考えてるのだと勝手に思っています。

また、「前提」セクションで挙げた、Visually Hidden を使った accessible name の付け方は、どちらかというとこちらの派閥に近いと思います。

## いくつか他サイトの例を拾ってみる

### React Ariaの場合

https://react-spectrum.adobe.com/react-aria/index.html

右上の GitHub と npm のリンクに着目すると、どうやら `<a>` 要素に `title` 属性で accessible name を付けているようです。
`title` 属性と `aria-label` 属性の使い分けもあまり分かっていないのですが、使えるときは基本 `title` 属性を優先して使ってしまって問題ないのでしょうか。ブラウザによっては駄目だったような気もする。誰か教えてください。

![React Aria の公式サイトの SNS アイコンと、その部分のマークアップのスクリーンショット。`title="GitHub"` というように accessible name が指定されている。](./images/aria-label-target/react-aria-markup.png)

### デジタル庁の場合

https://www.digital.go.jp/

ページ下部の X などのロゴに着目します。
こちらは新しいパターンで、`<svg>` 要素を囲っている `<span>` 要素に `aria-label` が付けられています。どちらかというと `<svg>` 要素に付けていると見ることができるでしょう。

![デジタル庁の公式サイトの SNS アイコンと、その部分のマークアップのスクリーンショット。`aria-label="X"` という指定が、`<a>` 要素と `<svg>` 要素の間に `<span>` 要素で挟まれている。](./images/aria-label-target/digital-agency-markup.png)

### MDN

MDN の `aria-label` のページを見てみます。

https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-label

サンプルコードでは、`<button>` 要素側に `aria-label` が付けられていました。

また、ページ下部の左側に SNS のアイコンがありますが、Visually Hidden 方式でした。
![MDN にある SNS アイコンのマークアップのスクリーンショット。`MDN on Bluesky` という文字列が、`class="visually-hidden` を付けられた `<span>` 要素の中に入っている。](./images/aria-label-target/mdn-markup.png)

MDN といえば、[最近 `aria-` 属性のページがたくさん日本語訳されたとか](https://sizu.me/mehm8128/posts/hcs4hw1k3atb)。

### APG

例えばカルーセルのサンプルを見てみます。

https://www.w3.org/WAI/ARIA/apg/patterns/carousel/examples/carousel-1-prev-next/

一時停止ボタンや、次/前のスライドに移動するためのボタンで、`<button>` 要素側に `aria-label` が付けられていました。

### SmartHRの場合

https://smarthr.jp/

React Aria と同じく、`<a>` 要素に `title` 属性でした。

### freeeの場合

https://www.freee.co.jp/

`<img>` 要素でアイコンを表示していたので、`alt` 属性での指定でした。

## まとめ

個人的にも、最初に引用した Zenn の記事的にも、`<svg>` 要素側に付けた方がよさそうという意見なのですが、実際のサイトを見てみると `<a>` 要素や `<button>` 要素に付けられている例が多かったです。
意見などお待ちしています。
