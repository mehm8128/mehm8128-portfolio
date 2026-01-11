---
title: "Web Almanacから見る2025年のWebアクセシビリティ"
publishedDate: "Jan 15 2026"
---

## Web Almanacとは

HTTP ArchiveによるWeb Almanacの2025年版が公開されました。
これはHTTP Archiveが毎月約1700万のサイトをクロールして収集しているデータです。HTML要素やCSSプロパティの使用状況はもちろん、Lighthouseの実行結果などもデータに含まれており、これを基に、BigQueryによる解析をしたレポートが公開されています。

https://almanac.httparchive.org/ja/2025/accessibility

様々な領域のレポートが公開されていますが、この記事では特にアクセシビリティの章にフォーカスして見ていきます。

収集方法についての詳細はこちらをご覧ください。

https://almanac.httparchive.org/en/2025/methodology

また去年のアクセシビリティの章について、ミツエーリンクスから公開されています。併せてご覧ください。

https://accessibility-2025-dot-webalmanac.uk.r.appspot.com/en/2025/methodology

## コントラスト比

数値としては29%から30%になっていて、去年からほとんど変化なしのようです。

小さなサイトの場合は比較的すぐに変更を入れやすいですが、大きなサイトの場合はサイト全体のブランドカラーから考え直したりする手間がかかる場合があるので、なかなかすぐに改善するのは難しい部分なのかもしれません。

ただ、どこかで基準値を決めて満たしているor満たしていないの2値で測っているので、例えば4.45:1でギリギリAAを満たしていないけどそこまで問題ない場合などを考えると、許容値を少し緩めたら結果が大きく変わる可能性はあるかもしれません。

[APCA](https://lydesign.jp/n/ndc6de5db7178#52cc9538-f7ab-4b9e-81cb-92cb145f50d6)についてはWCAG3の文脈で検討・議論されているはずですが、なかなか進んでいないイメージです。

また、2025年にはFirefox及びSafariで[`contrast-color()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/contrast-color)が利用可能になりました。基準を満たすコントラスト比の文字色・背景色の組をサイト制作者側で決めなければならない部分が少しだけ減ることが期待されます。

https://webkit.org/blog/16929/contrast-color/

## prefers-系のメディアクエリ

`prefers-reduced-motion`は49%から51%になっていて、去年からほとんど変化なしのようです。

注意するべきは、おそらくこれは「メディアクエリが使われているかどうか」の2値で数値が決まっているという点で、「51%のサイトで適切に`prefers-reduced-motion`が使われている」ということではないということです。つまり、1箇所でも使われていれば使われている判定になるので、全ての動くコンテンツで使われていない可能性があるということです。
逆に、自動で動くコンテンツは必ずしも`prefers-reduced-motion`だけで対応しないといけないものではなくて、近くに一時停止ボタンを置いておくことで対応可能なケースもあります。またカルーセルなどは特に、そもそも自動再生の仕組みを組み込まないのがアクセシブルなサイトに繋がります（例：[デジタル庁のカルーセル](https://design.digital.go.jp/dads/components/carousel/)）。

また、強制カラーモードに対応するための`prefers-forced-colors`の割合が増えているのは、`-ms-high-contrast`からの移行が反映されていると分析されています。ただ、`prefers-forced-colors`がどうしても細かい調整を行わなければならない場合にのみ最小限の使用をするのが望ましいため、注意が必要です。

[MDN](https://developer.mozilla.org/ja/docs/Web/CSS/Reference/At-rules/@media/forced-colors)にも記載があります。

> 一般的に、ウェブ制作者は forced-colors メディア特性を使用して、この機能が有効になっているユーザー向けに個別のデザインを作成することはすべきではありません。この機能は、既定の強制カラーの適用ではページの一部がうまく機能しない場合に、使いやすさや読みやすさを向上させるための細かい調整を行うことを目的としています。

## フォーカスインジケーター

`:focus outline: 0`の使用率が増えて、`:focus`及び`:focus-visible`の割合が増えています。本文にもあるように、これは独自のフォーカススタイルを適用しているサイトが増えていることを示していると考えられます。
しかし、例えばライトモードとダークモードの両方に対応していない場合や、対応が漏れている要素がある場合などが発生することを考えると、ブラウザデフォルトのスタイルを使用するのが無難でしょう。

また、リセットCSSを使う場合も注意が必要です。例えば[elad2412/the-new-css-reset](https://github.com/elad2412/the-new-css-reset)のようなリセットCSSではフォーカスインジケーターも含めてリセットしてしまうので、個別に`:focus`を設定する必要があります。READMEにも記載がありますが、見落としがちだと思います。
ちなみにこのサイトでは、kiso.cssを使ってみています。このリセットCSSではフォーカスインジケーターまでは削除していないので、ブラウザデフォルトのスタイルが適用されています。

https://www.tak-dcxi.com/article/introduce-kiso-css/

## 画像の代替テキスト

代替テキストの8.5%が、拡張子で終わっている、つまり画像のファイル名そのままになってしまっているとのことです。これはSNSなどのUGCの画像やCMSなどで発生することが多いです。
また、全体の50%は10文字未満及び空の代替テキストとのことです。もちろんそれが適切な場合もありますが、10文字未満だと「Alt text」や「画像」、前述のファイル名などになっていたり、その他簡潔すぎるテキストになっているケースが多くあると考えられます。実際、今年1年を通して話題をよく目にしたXの代替テキストも、何も設定していないと「Image」という代替テキストが付与されます。

また、NVDA 2026.1でAIによる画像説明機能が搭載されます。

https://groups.google.com/a/nvaccess.org/g/nvda-users/c/Th41cGvjsPI

以前アルファ版を試したときは英語のみ対応＆説明が抽象的すぎてまだあまり使える状態ではなかったのですが、どの程度精度が上がっているか期待です。

ただし、画像の意図を最も正確に伝えられるのはその画像を選んだ人間自身なので、本当は人間がちゃんと代替テキストをつけられるのがベストです。

AIについてはレポート本文の後半に記載があるので、興味のある人は読んでみるといいかもしれません。

## ARIA

ARIAの利用がロール、プロパティともに全体的に増えているようです。
サイト制作者の意識が高まっているということもあると思いますが、個人的にはUIライブラリの普及や、UIライブラリ自体のアクセシビリティが改善されていることが影響しているのではないかと考えています。特に最近はAIの影響でshadcn/uiの利用が増えているらしいと聞くので、こういったUIライブラリをベースとして最初からアクセシブルなコンポーネントを利用してサイト制作ができていることにより、ARIAの利用が増えているのではないかと考えています。

他にも、最近[Angular Aria](https://angular.dev/guide/aria/overview)が登場したり、[Base UI](https://base-ui.com/)のメジャーバージョンがリリースされたりしました。特にBase UIについては[shadcn/uiの内部で利用するライブラリとしてRadix UIの代わりに選択できるようになった](https://x.com/shadcn/status/1999530411181875667?s=20)こともあり、前述の通りAIとの協調が期待できます。

ただし本文にもあるように、ARIAの第一のルールに沿って、ネイティブ要素やネイティブの属性で対応できるものはARIAではなくてそちらを利用することが望ましいので、こちらも最低限の使用を意識する必要があります。ESLintのeslint-plugin-jsx-a11yプラグインや、そのルールをportしたBiomeやOxlintなどの利用によって開発中に気づくことが可能になるので、導入を検討するのがいいかもしれません。

ライブリージョンやvisually hiddenについては、[ARIA Notify](https://developer.mozilla.org/en-US/docs/Web/API/Document/ariaNotify)との関係やその動向に注目していきたいです。

https://portfolio.hm8128.me/blog/aria-notify-introduction

## アクセシビリティオーバーレイ

ほんの少しですが、使用率が増えたようです。

アクセス数が少ないサイトで、アクセシビリティオーバーレイが多く採用されているとのことです。
これは、大きなサイトを作る制作者がアクセシビリティオーバーレイを使わないという選択をできるというのが主な要因だとは考えられますが、逆に、アクセシビリティオーバーレイを使った不完全対応がアクセシブルでないサイトを生み出している影響で、そのサイトの再アクセス率が低く、アクセス数が少なくなっているということも考えられると思います。

[User preferenceのセクション](https://almanac.httparchive.org/ja/2025/accessibility#user-preference)や、
[WebAIM: 2026 Predictions: The Next Big Shifts in Web Accessibility](https://webaim.org/blog/2026-predictions/)の

> User Preferences Will Matter More Than Page-Level Settings

という記述、[Accessibility at the Edge Community Groupの動き](https://portfolio.hm8128.me/blog/tpac2025/#dynamic-accessibility-remediation-a-report-from-the-accessibility-at-the-edge-community-group)からも、今後個人の特性に合わせてWebサイトの表示方法を調整できるようにする動きがより拡大していくと考えられますが、適切な方法でパーソナライゼーションを進めることが求められます。

## 国ごとの統計

2025年は、6/28に欧州アクセシビリティ法は完全施行されました。

https://www.mitsue.co.jp/knowledge/column/20250708.html

しかし、まだ半年しか経っていないのでこの影響がそのまま反映されるということはあまりなく、来年の結果に期待することになりそうです。

関連して、9月にはISO/IEC 40500がWCAG2.2を採用する形で改定される動きもありました。

https://www.iso.org/standard/91029.html

法律で言うと日本では2024年の4/1から改正障害者差別解消法が施行されました。[Webアクセシビリティについては「合理的配慮」ではなくて「環境の整備」の面が強い](https://note.com/ymrl/n/n6f3670b369a9)ことから直接的な影響はないですが、アクセシビリティ全般への関心が高まっていく中で少しずつ改善されることが期待されます。

そして「Map of the accessibility of global government websites.」の地図では[去年](https://almanac.httparchive.org/ja/2024/accessibility#%E6%94%BF%E5%BA%9C)と比べて微妙に色が濃くなっています。数値としては85%から87%に上がっています（地図右上の「View data」からスプレッドシートに飛んで確認できます）。
これはデジタル庁の影響が大きいのではないかと考えています。
ウェブアクセシビリティ導入ガイドブックが継続的に更新されていたり、デザインシステムも更新が続けられています。ちなみに、前述のカルーセルコンポーネントは2025年12月に公開されたものです。

https://www.digital.go.jp/resources/introduction-to-web-accessibility-guidebook

https://www.digital.go.jp/policies/servicedesign/designsystem

また、その他関連文書も含め、10月に[デジタル社会推進標準ガイドライン](https://www.digital.go.jp/resources/standard_guidelines)に追加されたようです。

https://waic.jp/news/ciaj-column-26/

この流れで、デジタル庁のサイトに限らず他の公的機関のWebサイトも、アクセシブルになってほしいと思います。

## まとめ

2025年はやはりAIの話題が多かったのが印象的な年でした。
デザイン面や実装面ではもちろん、アクセシビリティチェックの面でもAI活用の話題がありました。

一例として伊原さんのイベントを載せておきます。

https://cssnite.doorkeeper.jp/events/182232

TODO: なんかいい感じのまとめ
