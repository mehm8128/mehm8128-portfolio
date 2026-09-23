---
title: "Accessibility Testing for WPT Interop"
publishedDate: "2026-10-06"
draft: true
---

こんにちは、mehm8128です。

今回はAccessibility Testing for WPT Interopについて、大きく2つのプロジェクトを紹介していきます。

## Accessibility Testing for WPT Interopとは

web-platform-tests/interop-accessibilityのリポジトリで行われている、WPTにおいてアクセシビリティの相互運用性のテストに関する取り組みのことです。

https://github.com/web-platform-tests/interop-accessibility

Accessibility Testingは、Interopの"Active Investigations"として採用されており、例えば2026年だと[Interop 2026 Dashboard](https://wpt.fyi/interop-2026)の右下に記載されています。
活動内容は上記リポジトリのissueで管理されており、2026年だと[Interop 2026 Accessibility Investigation · Issue #202 · web-platform-tests/interop-accessibility](https://github.com/web-platform-tests/interop-accessibility/issues/202)にまとめられています。
"Interop 2026 Accessibility Investigation, Ongoing Scoring Criteria"として全体に占めるそれぞれの活動の割合がまとめられているので、比重の大きいものを見るのが分かりやすいです。

今回はこの中でも45%を占める"GetAccessibilityProperties"と、40%を占める"Acacia AAM test exploration"を順番に見ていきます。

全体像については以下のwikiから確認できるようです。

https://github.com/web-platform-tests/interop-accessibility/wiki/Accessibility-Interop-Project-Overview-and-Contribution-Guidelines

## Support for testing additional accessibility properties beyond name and role

WPTにおいて今までアクセシビリティのテストは、主にroleとaccessible name、accessible descriptionという主要なプロパティしか確認することができていませんでした。
例えば4日目に紹介した僕が作成したテストケースは、accessible nameをテストするものでした: [Add tests for interactive element labels named by svg title elements by mehm8128 · Pull Request #56902 · web-platform-tests/wpt](https://github.com/web-platform-tests/wpt/pull/56902)

しかし、相互運用性を保証するためには`aria-expanded`などその他のARIA属性もテストする必要があります。
そこで、そういった様々な属性値を取得してテスト可能にするプロジェクトが動いています。

今年の3月に[Support for testing additional accessibility properties beyond name and role. by jcsteh · Pull Request #55784 · web-platform-tests/wpt](https://github.com/web-platform-tests/wpt/pull/55784)がマージされてWPT側の実装は完了したようです。しかし、前のセクションで紹介したマイルストーンを見てもらっても分かるように、"Implementations"に各ブラウザエンジンの名前が記載されています。WPTだけでなく、ブラウザエンジン側のソースコードも修正する必要があるのです。

深くは調べきれていないのですが、それ以外にもいくつか追加で対応する必要があるものがあるらしく、全てが完了するまでは至っていないようです。

## Create new test type for accessibility API testing (Acacia)

こちらはWPTで、Accessibility APIをテストできるようにするプロジェクトです。Acaciaという名前がつけられており、[2025年のTPACでも進捗の共有がありました](https://notes.igalia.com/p/ggryaQuLq#/)。

Accessibility APIについては5日目の図を見てもらえれば分かるのですが、ブラウザなどのUAからスクリーンリーダーなどのATに対して情報を渡すときのインターフェースです。
前のセクションで紹介したようなテストは、ブラウザがHTMLを解析して「この要素はこういう属性を持つ」ということを**理解しているかどうか**をテストするものでしたが、Acaciaでテストするのは「この要素はこういう属性を持つ」ということを**Accessibility APIとして露出しているかどうか**をテストするものです。
これはレイヤーが異なっているので、どちらも必要なテストになっています。そして、HTML要素・属性とAccessibility APIのマッピングは[core-aam](https://w3c.github.io/core-aam/)や[html-aam](https://www.w3.org/TR/html-aam-1.0/)で確認できます。

WPT側の実装自体は[Create new test type `aamtest` for accessibility API testing by spectranaut · Pull Request #57696 · web-platform-tests/wpt](https://github.com/web-platform-tests/wpt/pull/57696)にて完了しているのですが、こちらもどうやら他にやることがいくつか残っているようです。

ちなみに、これによって取得できるようになるAAMの相互運用性データは5日目に紹介したACDで収集され、利用可能になる想定です。

## まとめ

どちらのプロジェクトも、完了したらアクセシビリティの相互運用性の基礎となる重要なテストスイートの作成に役立ちます。基盤の構築が完了したらテストスイートを増やしていく作業になることが考えられます。もちろんAIによる高速化もできますが、自分たちも貢献できるチャンスがあるかもしれないので、動向を逐次追っていきたいです。

それではまた明日。
