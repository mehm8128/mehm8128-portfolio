---
title: "WCAG3 Accessibility Support Sets"
publishedDate: "2026-10-07"
draft: false
---

こんにちは、mehm8128です。

今回はWCAG3で検討されているAccessibility Support Setsという概念を紹介します。

## WCAG3を改めて軽くおさらい

WCAG3は、WCAG2の次のバージョンとして検討・策定が進められているWCAGのバージョンです。
WCAG2から構成や概念が大きく変わる予定で、一通り完成するまでまだ数年かかる見込みとのことでした。
詳細は以下のリンクを参照してください。

[WCAG 3 Introduction | Web Accessibility Initiative (WAI) | W3C](https://www.w3.org/WAI/standards-guidelines/wcag/wcag3-intro/)

## Accessibility Support Sets

WCAG2において"Accessibility Supported"は、1日目に見たように[適合を理解する | WAI | W3C](https://waic.jp/translations/WCAG22/Understanding/conformance#accessibility-support)で定義されています。
しかし以下のような記述があるように、厳密な定義については各地域や組織に委ねられています。

> WCAG ワーキンググループ及び W3C は、ウェブ技術がアクセシビリティ サポーテッドであるとみなすために、どれだけ多くの、あるいはどの支援技術がそのウェブ技術をサポートしていなければならないということについては特に定めない。

そこでWCAG3の策定に当たり、ASの概念についてWCAG2から再検討されています。

WCAG3が"silver"という呼称で検討されていた時代に、Accessibility supported Subgroupというものがありました。そのSubgroupで今回紹介するAccessibility Support Setsに繋がるような検討が行われており、今の議論に発展しています。
日本人からは、現在もWCAG3の策定に関わっている[植木真さん](https://x.com/makoto_ueki)がファシリテーターとして参加していました。

https://github.com/w3c/silver/wiki/Accessibility-supported-Subgroup

過去に作成されていた2つのスライドから、詳細を見ていきます。

### Accessibility supported Subgroup_23rd Aug 2022

https://docs.google.com/presentation/d/1Oo7A6B44guvYaBkaFSBVaeSW1qCAglReaYqxSSsksNw/edit

[AGWG Teleconference -- 07 Mar 2023](https://www.w3.org/2023/03/07-ag-minutes.html#item04)

これは2022年のTPACで用いられたスライド及びminutesです。

WCAG2までのASという概念のユースケースを整理して、WCAG3でそもそもASという概念を残すかどうかが議論されていました。

植木さんが参加されていたこともあり、ユースケースの1つ目として日本の事例が挙げられています。
日本では74%程度のスクリーンリーダーユーザーがPC Talkerを用いており、これは日本固有のスクリーンリーダーです[^1]。

そしてPC Talkerは、JAWSやNVDAといった海外のスクリーンリーダーと比べてHTMLやARIAのサポート状況がよくありません。そのため、WAICで作成しているAS情報などを参照してPC Talkerのサポート状況を確認し、WCAG（JIS）に適合しているかどうかを確認する必要があります。

他のユースケースも含めて、以下のGoogle Docsに詳細が記載されています。

https://docs.google.com/document/d/1XxzwsgWZSDh2EDqTag-nYfrqAT3b6Glpu8DGbVpTd9M/edit

6番目のユースケースである"Accessibility Support Database"についてだけ軽く触れておきます。
これは2014年まで活動が行われていた[WAI-ACT Project (IST 287725)](https://www.w3.org/WAI/ACT/)というプロジェクトで開発されていたデータベースで、AS情報をデータベースとして管理しようという試みでした。しかし、メンテナンスの問題によって実運用には至りませんでした。

スライド上のリンクを踏んでもエラーのページに飛ばされますが、Google Docsに記載されているリンクだと[[Draft] Analysis for "Accessibility Support Database"](https://www.w3.org/WAI/ACT/asd)にアクセスし、詳細を確認できます。

ソースコードとしては、以下の2つのリポジトリが存在していたようです。併せてご覧ください。

- [w3c/wai-axsdb-services: Accessibility Support Database](https://github.com/w3c/wai-axsdb-services)
- [w3c/wai-axsdb-web: Web Component of the Accessibility Support Database](https://github.com/w3c/wai-axsdb-web)

このスライドでは、ASという概念を残すことのメリットとデメリットを提示して、今後採れる方針についていくつか案が挙げられて終了していました。

次に、その半年後のスライドを見ていきます。

### Accessibility Supported Presentation (March 2023)

https://docs.google.com/presentation/d/1VBat4Vg8hmCzXrUnyRvZv4CQexouGUcyqEocF3Ynv_Q/edit

「WindowsではNVDA、iOSではVoiceOverを"Baseline"とする。」というアイディアをベースとして、議論が行われました。これらのスクリーンリーダーは無料で多くの言語で利用可能であり、PC Talkerの利用率が最も多い日本でも日本語で利用できるので、"Baseline"と定義できるのではないかという仮説です。

この説を基に、WAICのWG2及びPC Talkerのベンダー（高知システム開発）と行ったやり取りの紹介が行われました。

WAICとは「PC Talkerを無視できるかどうか」というやり取りが行われましたが、「PC Talkerで利用可能であること」を必要条件にしている公共団体のWebサイトが多いということから難しく、Baselineが策定されたとしても、ASテスト・AS情報の作成やテストは引き続き行うことになるだろう、という結論になっていました。

関連して、以下のような問題が出てきました。

- ASテストを行う側
  - 公式のASテストスイートがなく、一から作るのが大変
  - ASであるかどうかを判断する基準がない
- スクリーンリーダーベンダー
  - Web技術に対する公式のサンプルコードがない
  - Web技術をどのようにサポートするべきかという情報がない

そこで、「AGWGがASテストスイートを提供すればいいのではないか」という解決策が提案されました。AGWGから公式のASテストスイートが提供されれば、上記の問題を解決できると考えられています。

そして後日、テストスイートの件とは別で、Accessibility Support Setsの話が上がっていました。

- [Accessibility Supported · w3c/wcag3 · Discussion #53](https://github.com/w3c/wcag3/discussions/53)
- [Default accessibility support set · w3c/wcag3 · Discussion #277](https://github.com/w3c/wcag3/discussions/277)
- [Defining Accessibility Support Sets · w3c/wcag3 · Discussion #621](https://github.com/w3c/wcag3/discussions/621)

これは、「**この環境（ユーザーエージェントや支援技術の組み合わせ）では、ASであることを保証する**」という環境の集合（Set）を定義する概念です。
例えばaxe-coreでは、[axe-core/doc/accessibility-supported.md](https://github.com/dequelabs/axe-core/blob/develop/doc/accessibility-supported.md)でaxe-coreに含まれるルールの内容がASであることを保証している環境を定義しています。
イメージとしては、プロダクトのサポートブラウザという概念を、ブラウザだけでなく支援技術にも拡大したような概念となっています。

そのようなSetを定義しておき、WCAGのテクニックを作るときにそのSetの範囲で動くことを動作確認できていれば、「このAccessibility Support Setsの中ではWCAGのテクニックは全てASです」と言うことができるようになります。
そのようなSetを"**Default** Accessibility Support Sets"と呼んでおり、どう定義するかが現在議論中です。

"Default"のSetができたところで、PC Talkerのような国に固有のスクリーンリーダーはおそらく含まれません。そこで、先ほど紹介した公式で提供することが検討されているASテストスイートを用いてそれぞれの国が追加でテストすることで、"Default"を拡張した国独自のAccessibility Support Setsを作ることができます。
これにより、"Default Accessibility Support Sets"に含まれる環境はAGWGがテストし、国に固有の環境はAGWGが提供するテストスイートを使ってテストするという体制になります。そうなるとメンテナンスの問題は軽減され、PC Talkerのようなスクリーンリーダーも、より公式な方法でテストできるようになります。

議論の経過とともに大きく方向性が変わっているので、もしかしたら僕の理解が少し古い知識かもしれません。興味のある人は、改めて一次ソースを確認してみてください。

## これらの動向を踏まえたWAICの今後

現在WAICのWG2は、WCAGのテクニックを基にしてASテストケースの作成及びそのテスト結果の公開をしています。
しかし、Accessibility Support Setsが上記のような内容で実現されたらこれは変わることになります。

まず、テストケースの作成自体はAGWG側で行われるので、不要になります。
ただし、今回の記事やAGWGでの議論では分かりやすいようにPC Talkerのみを例として挙げていましたが、日本には他にも日本固有のスクリーンリーダーがあったり、点字ディスプレイなどもあります。
AGWG側では当然テストケースは英語で作成されることになるので、そういった様々な環境に対して追加でテストできるように、日本語に翻訳する作業が必要になります。

これは必ずしもWG2の作業になるとは限りません。現在WCAGやそのテクニック、APGなどの翻訳作業を担っているのはWG4なので、その知見を活かせるというメリットを考慮してASのテストスイートの翻訳もWG4が行うことになる可能性もあります。

また、テスト結果がどこにまとめられるのかは現状不明瞭です。
以前はテスト結果をAGWG側に還元し、それを参考情報としてWCAGに載せてもらう手段を用意するというような記述を見かけたのですが、どうなるか分かりません。
もしそのように還元するような仕組みができるのであれば、WAICはAGWGと日本人のテスターとの仲介役になることも検討できます。還元するような仕組みがないのであれば、日本人がテストした結果を取りまとめ、現在行っているようにテスト結果を公開していくこともできると思います。

いずれにしても、今後もWCAG3の動向を追いながら、WAICとしてできることを模索していきたいと思います。

## まとめ

それではまた明日。

[^1]: スライド内では80%以上と紹介されていますが、1日目で紹介した最新の調査データでは74%程度となっています。
