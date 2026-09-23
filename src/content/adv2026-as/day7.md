---
title: "WCAG3 Accessibility Support Sets"
publishedDate: "2026-10-07"
draft: true
---

こんにちは、mehm8128です。

今回はWCAG3で検討されているAccessibility Support Setsという概念を紹介します。

## WCAG3を改めて軽くおさらい

スケジュール感とか、WCAG2からの大きい変更点とか
誰かの記事引用したりする

## Accessibility Support Sets

WCAG2ではどう扱われているかの復習から（前の記事で書いてたら引用でOK）

WCAG3が"silver"という呼称で検討されていた時代に、Accessibility supported Subgroupというものがありました。そこで今回紹介するAccessibility Support Setsに繋がるような検討が行われており、今の議論に発展しています。
日本人からは、現在もWCAG3の策定に関わっている植木真さんがファシリテーターとして参加していたようです。

https://github.com/w3c/silver/wiki/Accessibility-supported-Subgroup

そこで作成されていた2つのスライドから、詳細を見ていきます。

### Accessibility supported Subgroup_23rd Aug 2022

https://docs.google.com/presentation/d/1Oo7A6B44guvYaBkaFSBVaeSW1qCAglReaYqxSSsksNw/edit

これは2022年のTPACで用いられたスライドです。

WCAG2までのASのユースケースを整理して、WCAG3でそもそもASという概念を残すかどうかが議論されていました。

植木さんが参加されていたこともあり、ユースケースの1つ目として日本の事例が挙げられています。
日本では80%程度のスクリーンリーダーユーザーがPC Talkerを用いており、これは日本固有のスクリーンリーダーです。
TODO: 注釈: スライドでは80%以上となっているが、1日目に見たように最新のデータでは74%程度になっている

そしてPC Talkerは、JAWSやNVDAといった海外のスクリーンリーダーと比べてHTMLやARIAのサポート状況がよくありません。そのため、WAICで作成しているAS情報などを参照してPC Talkerのサポート状況を確認し、WCAG（JIS）に適合しているかどうかを確認する必要があります。
TODO: 「適合」でいいのか確認。準拠？

他のユースケースも含めて、以下のGoogle Docsに詳細が記載されています。

https://docs.google.com/document/d/1XxzwsgWZSDh2EDqTag-nYfrqAT3b6Glpu8DGbVpTd9M/edit

6番目のユースケースである"Accessibility Support Database"についてだけ軽く触れておきます。
これは2014年まで活動が行われていた[WAI-ACT Project (IST 287725)](https://www.w3.org/WAI/ACT/)というプロジェクトで開発されていたデータベースで、AS情報をデータベースとして管理しようという試みでした。しかし、メンテナンスの問題によって実運用には至らなかったようです。

スライド上のリンクを踏んでもエラーのページに飛ばされますが、Google Docsに記載されているリンクだと[[Draft] Analysis for "Accessibility Support Database"](https://www.w3.org/WAI/ACT/asd)にアクセスし、詳細を確認できます。

ソースコードとしては、以下の2つのリポジトリが存在していたようです。併せてご覧ください。

- [w3c/wai-axsdb-services: Accessibility Support Database](https://github.com/w3c/wai-axsdb-services)
- [w3c/wai-axsdb-web: Web Component of the Accessibility Support Database](https://github.com/w3c/wai-axsdb-web)

このスライドでは、メリットとデメリットを提示して、今後採れる方針についていくつか案が挙げられて終了していました。

この日のminutes: [AGWG Teleconference -- 23 Aug 2022](https://www.w3.org/2022/08/23-ag-minutes.html#item02)

次に、その半年後のスライドを見ていきます。

https://docs.google.com/presentation/d/1VBat4Vg8hmCzXrUnyRvZv4CQexouGUcyqEocF3Ynv_Q/edit

「WindowsではNVDA、iOSではVoiceOverを"Baseline"とする。」というアイディアをベースとして、議論が行われました。これらのスクリーンリーダーは無料で多くの言語で利用可能であり、PC Talkerの利用率が最も多い日本でも利用することは可能なので、"Baseline"と定義できるのではないかという仮説です。

この説を基に、WAICのWG2及びPC Talkerのベンダー（高知システム開発）と行ったやり取りの紹介が行われました。

WAICとは「PC Talkerを無視できるかどうか」というやり取りが行われましたが、「PC Talkerで利用可能であること」を必要条件にしている公共団体のWebサイトが多いということから難しく、Baselineが策定されたとしても、ASテスト・AS情報の作成やテストは引き続き行うことになるだろう、という結論になっていたようです。

関連して、以下のような問題が出てきました。

- ASテストを行う側
  - 公式のASテストスイートがなく、一から作るのが大変
  - ASであるかどうかを判断する基準がない
- スクリーンリーダーベンダー
  - Web技術に対する公式のサンプルコードがない
  - Web技術をどのようにサポートするべきかという情報がない

そこで、「AGWGがASテストスイートを提供すればいいのではないか」という解決策が提案されました。
AGWGから公式のASテストスイートが提供されれば、上記の問題を解決できると考えられています。

この日のminutes: [AGWG Teleconference -- 07 Mar 2023](https://www.w3.org/2023/03/07-ag-minutes.html#item04)

そして後日、テストスイートの件とは別で、Accessibility Support Setsの話が上がっていました。
これは、「この環境（UAやATの組み合わせ）では、ASであることを保証する」という環境の集合（Set）を定義する概念です。
例えばaxe-coreでは[axe-core/doc/accessibility-supported.md](https://github.com/dequelabs/axe-core/blob/develop/doc/accessibility-supported.md)で、axe-coreに含まれるルールの内容がASである環境を定義しています。
イメージとしては、プロダクトのサポートブラウザという概念を、ブラウザだけでなくATにも拡大したような概念となっています。

そのようなSetを定義しておけば、WCAGのテクニックを作るときにそのSetの範囲で動くことを動作確認できていれば、「このAccessibility Support Setsの中ではWCAGのテクニックは全てASです」と言うことができるようになります。
そのようなSetを、"**Default** Accessibility Support Sets"と呼んでおり、現在どう定義するか議論中となっています。

"Default"のSetができたところで、PC Talkerのような国に固有のスクリーンリーダーはおそらく含まれません。そこで、それぞれの国が先ほど紹介したテストスイートを用いて追加でテストすることで、"Default"を拡張した国独自のAccessibility Support Setsを作ることができます。
これにより、"Default Accessibility Support Sets"に含まれる環境はAGWGがテストし、国に固有の環境はAGWGが提供するテストスイートを使ってテストするという体制になり、メンテナンスの問題が軽減され、PC Talkerのようなスクリーンリーダーも、より公式な方法でテストすることができるようになります。

関連したDiscussion

- [Accessibility Supported · w3c/wcag3 · Discussion #53](https://github.com/w3c/wcag3/discussions/53)
- [Default accessibility support set · w3c/wcag3 · Discussion #277](https://github.com/w3c/wcag3/discussions/277)
- [Defining Accessibility Support Sets · w3c/wcag3 · Discussion #621](https://github.com/w3c/wcag3/discussions/621)

議論の経過とともに、大きく方向性が変わっているので、もしかしたら僕の理解が少し古い知識かもしれません。興味のある人は、改めて一次ソースを確認してみてください。

### これらの動向を踏まえたWAICの今後

現在WAICは、WCAGのテクニックを基にしてASテストケースの作成及びそのテスト結果の公開を行っています。
しかし、Accessibility Support Setsが上記のような内容で実現されたらこれは変わることになります。

まず、テストケースの作成自体はAGWG側で行われるので、不要になります。
ただし、AGWG側では当然英語で開発されることになるので、これを日本語に翻訳する作業が必要になります。今回の記事やAGWGでの議論では分かりやすいようにPC Talkerのみを例として挙げていましたが、日本には他にも日本固有のスクリーンリーダーがあったり、点字ディスプレイなどもあります。
そういった様々な環境に対して追加でテストできるように、翻訳作業が必要になります。

これは必ずしもWAICのWG2の作業になるとは限りません。現在WCAGやそのテクニック、APGなどの翻訳作業を担っているのはWG4なので、その知見を活かせるというメリットを考慮してASのテストスイートの翻訳もWG4が行うことになるかもしれません。

また、テスト結果がどこにまとめられるのかは現状不明瞭です。
以前はテスト結果をAGWG側に還元し、それを参考情報として載せてもらう手段を用意するというような記述を見かけたのですが、どうなるか分かりません。
もしそのように還元するような仕組みができるのであれば、WAICはAGWGと日本人のテスターとの仲介役になることができるかもしれません。還元するような仕組みがないのであれば、日本人がテストした結果を取りまとめ、現在行っているようにテスト結果の公開を行っていくこともできると思います。

いずれにしても、今後もWCAG3の動向を追いながら、WAICとしてできることを模索していきたいと思います。

## まとめ

それではまた明日。
