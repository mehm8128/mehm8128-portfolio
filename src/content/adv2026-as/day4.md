---
title: "ASのためにできること"
publishedDate: "2026-10-04"
draft: true
---

こんにちは、mehm8128です。

今回は、ASのために**あなたが**できることを紹介します。

これまでに紹介してきたような、UA・AT間での互換性の問題に遭遇した場合、もしくは遭遇していなくてもなんらかの形でそのような問題の解決に貢献したいと考えている場合、これから紹介するような方法で貢献することができます。

## UA・ATのベンダーに不具合報告・修正PRを作成

これが最も直接的な方法です。
ブラウザ側の問題であればブラウザエンジンに、スクリーンリーダー側の問題であればスクリーンリーダーに不具合報告を行ったり、OSSであれば修正PRを作成したりすることで直接解決することができます。

具体的に窓口を紹介します。

### ブラウザエンジン

- Chromium
  -
- WebKit
  -
- Gecko
  -

### スクリーンリーダー

- NVDA
- VoiceOver
- PC Talker

注意点として、ASの問題は、UAの問題なのかATの問題なのかの切り分けが難しいことがあります。
UAの役割は、HTMLを正しく解釈し、Accessibility APIとして情報を公開するところまでです。
ATの役割は、Accessibility APIで公開された情報を受け取り、ユーザーが理解可能な形で示すところです。

そもそもHTMLを解釈できていなかったり、解釈していてもAccessibility APIとして情報を公開していなければUAの問題ということになります。例えば、ARIA属性が付与されている要素をブラウザのdevtoolsで確認したときに、そのARIA属性の情報がAccessibilityのタブに表示されていなければ、適切にHTMLを解釈できていないのでブラウザ側の問題である可能性が高くなります。また、同じスクリーンリーダーで確認したときに、あるブラウザでは正常に情報を読み取れるけど他のブラウザでは上手く読み取れないという場合は、ブラウザがスクリーンリーダーに対して情報を正しく公開できていない可能性が高く、これもブラウザ側の問題と考えられます。
逆に、ブラウザのdevtoolsでは属性値を確認できるけどスクリーンリーダーがそれを読み上げてくれない場合や、同じブラウザで確認してもスクリーンリーダーによって情報を読み上げたり読み上げてくれなかったりする場合は、スクリーンリーダー側の問題であると考えられます。

また、一見不具合のように感じても、実はそういう挙動になっている背景がある意図的な挙動である場合もあります。
例えば、Safariにおいて`list-style: none`が付与された`<ul>`や`<ol>`が`list` roleになっていないのは、不具合ではなくてWebKit側の意図している挙動です。

ref: ["Fixing" Lists | scottohara.me](https://www.scottohara.me/blog/2019/01/12/lists-and-safari.html)

このような仕様化されていないブラウザのヒューリスティックは本当はあまり良くないのですが、このようになっている経緯があるので、不具合として報告しても直されることはないということに注意が必要です（ただし、この場合は`<nav>`要素というコンテキストにおける例外のように、適切な例外を追加したい、という要望であれば通る可能性はあります）。

## WPTへのissue・テストケース作成

他の手段として、[WPT](https://github.com/web-platform-tests/wpt)へのissue・テストケース作成が挙げられます。
WPTはブラウザが直接参照しているテストスイートであるため、貢献することによる影響は大きいです。

後述しますが、「こういうテストケースがあった方がいいのではないか」というようなissueを作成したり、実際にテストケースを作成してPRを提出することで、ブラウザが参照し、[web-platform-tests dashboard](https://wpt.fyi/results/?label=master&label=experimental&aligned)で各ブラウザのテスト通過状況が確認できるようになります。

このテストケースを基に、前のセクションで述べたような方法でブラウザ側にissueやPRを提出することで、より根拠を持って提出することができるという側面もあります。

WPTの中でも、主にアクセシビリティに関係あるのは以下のディレクトリです。

- [accessibility](https://wpt.fyi/results/accessibility?label=master&label=experimental&aligned)
- [acc-name](https://wpt.fyi/results/accname?label=master&label=experimental&aligned)
- [dpub-aam](https://wpt.fyi/results/dpub-aam?label=master&label=experimental&aligned)
- [core-aam](https://wpt.fyi/results/core-aam?label=master&label=experimental&aligned)
- [html-aam](https://wpt.fyi/results/html-aam?label=master&label=experimental&aligned)
- [svg-aam](https://wpt.fyi/results/svg-aam?label=master&label=experimental&aligned)
- [wai-aria](https://wpt.fyi/results/wai-aria?label=master&label=experimental&aligned)

これらについては、6日目に深堀りする予定です。

## a11ysupport.ioやWAICのAS情報などへの情報提供・テストケース作成

これは比較的間接的な方法になりますが、開発者への情報提供として2日目に挙げたようなデータベースへの貢献も考えられます。
a11ysupport.ioはテスト結果とテストケースの作成のどちらも募集しています。WAICのAS情報は、現状テスト結果のみ募集しています。
ARIA-ATについては、ARIA-AT CGのメンバーにならなければ直接の貢献は難しいようです（[Running a Test Plan · w3c-cg/aria-at Wiki](https://github.com/w3c-cg/aria-at/wiki/Running-a-Test-Plan)）。ただし、CGなのでW3C会員でなくとも参加は可能になっています。

a11ysupport.ioについては[Contributing | Accessibility Support](https://a11ysupport.io/contribute)を参照、WAICのAS情報については[アクセシビリティ サポーテッド（AS）情報 | ウェブアクセシビリティ基盤委員会（WAIC）](https://waic.jp/guideline/as/)の「検証作業に対するご協力のお願い」のセクションを参照していただくか、定期的に開催している[アクセシビリティ サポーテッド（AS）テスト体験会](https://waic.connpass.com/)にご参加ください。

## 実際にやってみた

以前、実際にいくつか貢献をしたことがあるので紹介します。

### AX: Interactive elements containing the `<svg>` element which is named by `<title>` element doesn't have accessible name

ASの問題に対して、WPTにテストケースを作成してPRを提出し、マージされた後にそれを根拠としてWebKitにBugを提出したところ、WebKitの中の人がPRを作成してくれて修正されたという例です。順を追って説明します。

今回問題となっていたのは、インタラクティブ要素内の`<svg>`要素が`<title>`要素を持つ場合に、WebKitにおいて`<title>`要素の中身がインタラクティブ要素のaccessible nameとして考慮されないという不具合でした。
これは、[アイコンボタンのアクセシブルな名前はボタンが持つべきかアイコンが持つべきか](https://zenn.dev/moneyforward/articles/20231120-icon-button-accessible-name#3.-%3Csvg%3E%E8%A6%81%E7%B4%A0%E3%81%ABrole%3D%22img%22%E3%82%92%E4%BB%98%E4%B8%8E%E3%81%97%E3%80%81%3Csvg%3E%E8%A6%81%E7%B4%A0%E5%86%85%E3%81%AB%3Ctitle%3E%E8%A6%81%E7%B4%A0%E3%82%92%E5%85%A5%E3%82%8C%E3%81%A6%E4%BB%A3%E6%9B%BF%E3%83%86%E3%82%AD%E3%82%B9%E3%83%88%E3%82%92%E8%A8%AD%E5%AE%9A%E3%81%99%E3%82%8B) の記事にて挙げられている問題です。

また、[<svg>ではaltが使えないからaria-labelはロジックをすっ飛ばしている - 水底の血](https://momdo.hatenablog.jp/entry/20250510/1746858580)にも同様の話が書かれています。
この話の基となった記事を執筆した[yuheiyさん](https://x.com/_yuheiy)が、WPTに対して[[html-aam] Tests needed for `svg > title` when placed inside interactive elements · Issue #52459 · web-platform-tests/wpt](https://github.com/web-platform-tests/wpt/issues/52459)というissueを作成していました。
このissueに対して、僕が[Add tests for interactive element labels named by svg title elements by mehm8128 · Pull Request #56902 · web-platform-tests/wpt](https://github.com/web-platform-tests/wpt/pull/56902)というPRを作成したという流れになっています。

その後、さらに僕がそのテストケースを参照しながら、[309958 – AX: Interactive elements containing the `<svg>` element which is named by `<title>` element doesn't have accessible name](https://bugs.webkit.org/show_bug.cgi?id=309958)というBugを報告したところ、[AX: Interactive elements containing the `<svg>` element which is named by `<title>` element doesn't have accessible name by Ahmad-S792 · Pull Request #64593 · WebKit/WebKit](https://github.com/WebKit/WebKit/pull/64593)にてAppleのエンジニアが修正してくれました。

この修正は、[Release Notes for Safari Technology Preview 244 | WebKit](https://webkit.org/blog/17962/release-notes-for-safari-technology-preview-244/)に記載されています。

これによってaccessible nameが付与されない問題は解決される一方で、[インラインSVGの代替テキストはどうするべきか – TAKLOG](https://www.tak-dcxi.com/article/how-to-handle-alt-text-for-inline-svg/)で解説されているように、`<title>`要素にホバーした際にツールチップが表示されたり、`<title>`要素の中身が機械翻訳されない問題などは残っています。そのため、必要に応じて`aria-label`や`aria-labelledby`を使うことも検討できるでしょう。

この問題は以前から度々話題になることがあって認識していたのですが、「title要素でSVGにaccessible nameをつける方法はASでないので、別の方法を使う」というHACKが広まって本来どうあるべきかということが知られていないのは良くないと思い、今回の件をきっかけとしてWPTのテストケース作成やWebKitへのBug報告を進めていきました。

### fix: announce all content inside `role="alert"`

こちらはNVDAにPRを送った件です。

以前[Accessibility APIでブラウザから情報を取得してみる - mehm8128のWeblog](https://portfolio.hm8128.me/blog/ia2/#nvda%E3%81%AE%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E7%B5%8C%E7%94%B1%E3%81%A7%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E5%BE%97%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)などでNVDAの中身自体は読んだことがあったものの、実際にコードを書いたり貢献したりするところまではできていなかったので、何かASに関連するissueがないかと漁っていました。そこで[NVDA does not announce contents of div with role="alert" containing a list · Issue #14990 · nvaccess/nvda](https://github.com/nvaccess/nvda/issues/14990)というissueを見つけ、比較的簡単に修正できそうだったのでやってみました。

このissueは、`role="alert"`をつけた要素が表示されたときに、今までは`FOCUSABLE`な要素しか読み上げられていなかったのですが、リスト関連のroleや見出し、paragraph roleなども読み上げるようにしてほしいという内容でした（よって、タイトルは"**all** content"になっているけど、実は"all"ではない）。

[fix: announce all content inside `role="alert"` by mehm8128 · Pull Request #20056 · nvaccess/nvda](https://github.com/nvaccess/nvda/pull/20056)というPRを作成し、無事マージされました。

経緯や実装が複雑そうで、結局完全には理解できないままなんとかマージまで持っていったのですが、「`role="alert"`なのだから表示されたら中身が読み上げられるはずなのに、読み上げられないものがある」という問題を部分的に改善できました。2026.3で入る予定らしいので、リリースまではもう少しかかりそうです。

## まとめ

ASに関する問題は、暫定的なhackyな対応で解決できても、他に同じ状況で困る人がいるかも知れません。例えば記事などでその知見を公開していたとしても、その記事までたどり着ける人はほんの一握りかもしれないし、そもそも問題が発生していることに気づかない開発者も多いはずです。

Webアクセシビリティをやっている人たちは「自分たちのプロダクトがアクセシブルであれば良い」のさらに先の、「社会をアクセシブルにしたい」というところまで気持ちのある人が多いと思っています。
それを実現するためには、より根本的なところから対処していく必要があります。そのために、今回紹介したようなブラウザやスクリーンリーダーなどに直接貢献していくような方法を採れる人が増えれば良いなと考えています。

それではまた明日。
