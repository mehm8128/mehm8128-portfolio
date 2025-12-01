---
title: "noDistractingElements"
publishedDate: "Dec 2 2025"
---

初日は最近自分がportした`noDistractingElements`です。

https://biomejs.dev/ja/linter/rules/no-distracting-elements/

https://github.com/biomejs/biome/pull/8287

## distractingな要素とは

前にZennで書いた記事の最初の2つの、[`<marquee>`](https://zenn.dev/cybozu_frontend/articles/deprecated-html-and-aria#%3Cmarquee%3E)要素と[`<blink>`](https://zenn.dev/cybozu_frontend/articles/deprecated-html-and-aria#%3Cblink%3E)要素が対象で、これを使うと警告が出るようなlintルールになっています。

https://zenn.dev/cybozu_frontend/articles/deprecated-html-and-aria

読んでくださいといえばそれで終わりなのですが、せっかくなので解説します。

WCAG2.2の達成基準2.2.2に、「一時停止、停止、非表示（レベルA）」があります。

https://waic.jp/translations/WCAG22/Understanding/pause-stop-hide.html

これは、自動で動き続けるようなコンテンツは利用者の注意を過剰に引いてしまうことがあり、特に認知障害及び注意欠陥障害のある人がWebサイト上のコンテンツに集中できなくなってしまうのでやめましょうというものです。
例えば株式相場表示機や電車の電光掲示板のように文字列が横に流れていくもの、その他動き続けるアニメーションなどが対象です。
よくあるものだと、カルーセルなどが代表的な例です。カルーセルが自動で動く場合、必ず後述の方法で一時停止できるボタンを用意しましょう。

それを踏まえて、今回の`<marquee>`要素及び`<blink>`要素はどちらも自動で動き続けるものなので、禁止されています。
`<marquee>`は電車の電光掲示板やニュースバナーのようにテキストを横に流すことができる要素（MDNの例を見ると、もっと柔軟に色んなアニメーションを実現できそう）、`<blink>`はテキストを点滅させることができる要素です。上記のZennの記事で、前者はMDN、後者はUDNへのリンクから例を見ることができます。

具体的に、点滅やちらつき、フラッシュなどに対する症状や てんかん について具体的に書かれているMDNのページがあります。僕はまだ読んでません。

https://developer.mozilla.org/en-US/docs/Web/Accessibility/Guides/Seizure_disorders

ちなみに、フラッシュや てんかん については2.2.2ではなくて、[達成基準 2.3.1 3 回の閃光、又は閾値以下](https://waic.jp/translations/WCAG22/Understanding/three-flashes-or-below-threshold.html)やその上位の達成基準である[達成基準 2.3.2 3 回の閃光](https://waic.jp/translations/WCAG22/Understanding/three-flashes.html)に記載があるようです。

## 対処法

`<marquee>`や`<blink>`ではなくて独自実装でこういった自動で動き続けるようなコンテンツを配置したい場合は、主に以下の3つの方法のどれかを取ると、達成基準を満たすことができます。
これらの方法は[WCAGのUnderstandingでテクニックとして紹介されている](https://waic.jp/translations/WCAG22/Understanding/pause-stop-hide.html#techniques)ので、詳しく知りたい人はそちらを参照してください。

### 1. 5秒以内に止める

5秒以内に止めれば達成基準的には問題ありません。持続的に動いていると、いつまで経ってもそのコンテンツに注意を取られてしまうので問題になります。

### 2. ボタンで一時停止できるようにする

例えばニュースバナーでテキストを横に流し続けている場合、近くにそれを一時停止・再開できるボタンを配置していれば問題ありません。
Zennの記事でも載せていた駒瑠市のページの、問題がないバージョンを見てみると分かりやすいです。
「こんにちは！ 駒瑠市の地球温暖化防止課のこまるだよ！」という表示の横に一時停止ボタンがあり、クリックするとテキストの再生が止まります。カルーセルも同様です。

https://a11yc.com/city-komaru/practice/

ただし、あまり遠くに配置しているとどのボタンで止められるのかが分かりづらいので、近くに配置しましょう。
[Trusted Tester](https://zenn.dev/mehm8128/articles/trusted-tester)では、ページの最初もしくは前後3要素以内にそのようなコントロールがあるかどうかを確認することになっています。

https://github.com/Section508Coordinators/TrustedTester5.1/blob/main/Documents/Trusted%20Tester%20Test%20Process%20v5.1.3.pdf

> Determine if there is an evident mechanism for the user to pause, stop, or hide the content within the first three elements that the user would encounter OR within three elements before/after the moving/blinking/scrolling content.

### 3. `prefers-reduced-motion`を使う

[`prefers-reduced-motion`](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-motion)は、ユーザーが端末の設定でアニメーションを無効化している場合にCSSを条件分岐させることができるメディアクエリです。
これを用いて、アニメーションを無効化していないときのみ自動再生させる、といった分岐をしておけば、前述のような障害を持っているなどの理由で、自分でアニメーションを無効化しているユーザーには自動再生させずに表示することができます。ただし、必ずしもそういうユーザーが全員アニメーションを無効化するような設定を知っていて設定しているとは限らないので注意が必要です。

## A way to make autoplay respect prefers-reduced-motion

WHATWGで、`<video>`要素の`autoplay`属性が`prefers-reduced-motion`の設定を考慮するべきではないかという議論が進行中です。
現状はユーザーが端末でアニメーションを無効化するような設定をしていても、`<video autoplay>`は自動再生されてしまうが、その設定を考慮するような値を`autoplay`に追加したり、もしくは、デフォルトで考慮するようにして「無効化されていたとしても自動再生する」という値を`autoplay`に追加するような案も出ています。
これは[View Transition](https://developer.mozilla.org/ja/docs/Web/API/View_Transition_API)についても似たようなものが議論されていたようです。

https://github.com/whatwg/html/issues/11605

https://github.com/w3c/csswg-drafts/issues/10267

ちなみに、このサイトでも使っているAstroでは、View Transitionの設定をするのに`<ViewTransition>`コンポーネントを置くのですが、これは`prefers-reduced-motion`を考慮して自動でアニメーションのオン・オフを切り替えてくれます。

https://docs.astro.build/en/guides/view-transitions/#prefers-reduced-motion

## まとめ

自動で流れ続けるものは止められるようにしましょう。
