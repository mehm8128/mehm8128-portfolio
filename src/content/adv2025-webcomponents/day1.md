---
title: OpenUI Design System
publishedDate: "2025-12-01"
---

今日はOpenUI Design Systemを紹介します。

## OpenUI Design System とは

OpenUI Design Systemは去年末にリポジトリが誕生した、OpenUIが管理するGlobal Design Systemです。現在準備中のプロジェクトであり、後述するRFCが立っているのみでコンポーネントなどはまだ実際には作られていません。

https://github.com/openui/design-system

Global Design Systemとは、Brad Frostの記事やPodcastで登場した概念です。
組織が管理していたりOSSとして提供されている既存のデザインシステムは、どうしても自分たちのサービスやプロダクト、個人の好みに合わせたものになっていて、同じような実装がデザインシステムごとに繰り返されてしまっています。そこで、その重複を全てGlobal Design Systemとして吸収するものがGlobal Design Systemとして提案されています。

TODO: もうちょっとちゃんと記事読んで説明直す

この説明によく使われるものとして以下の図があります。

TODO: 図を入れる。altも考える

組織やOSSとしてのデザインシステムと、HTMLの隙間を埋めるものがGlobal Design Systemです。これはアクセシビリティや国際化、セキュリティ、その他様々なものを考慮して作られます。今回のアドベントカレンダーの前半のテーマであるWeb Componentsで作られることが想定されているので、組織やOSSとして提供するデザインシステムを実装する上で、Webの標準を用いて、Webフレームワークに依らず、低レベルなものとして利用可能になります。

詳しくはBrad Frostの以下の記事をご覧ください。

- [A Global Design System | Brad Frost](https://bradfrost.com/blog/post/a-global-design-system/)
- [What’s Next for a Global Design System | Brad Frost](https://bradfrost.com/blog/post/whats-next-for-a-global-design-system/)

日本語で解説されているものもあります。

- [🎄Open UI Advent Calendar: Day 23 / Global Design System Part1 | @sakupi01.com](https://blog.sakupi01.com/dev/articles/2024-openui-advent-23)
- [🎄Open UI Advent Calendar: Day 24 / Global Design System Part2 | @sakupi01.com](https://blog.sakupi01.com/dev/articles/2024-openui-advent-24)
- [Web Components 元年 v6](https://sakupi01.github.io/slides/ja/2025_02_27_web-components-v6/#16)
- [そのUIコンポーネント、これから先も使えますか？―Headless UI,Open UI,グローバルデザインシステム｜sakito](https://note.com/sakit0/n/n027982208ff0)

## 現在出ているRFC

既にコンポーネントのRFCのPRが3つ提出されています。
書かれていることを見ていきましょう。

### Badge コンポーネント

https://github.com/openui/design-system/pull/9

1つ目のRFCとして提出されているものです。
[OpenUIで他のUIライブラリを調査している結果](https://open-ui.org/research/component-matrix/)を見ながら作成されたようです。

使用例やモチベーションや説明されたあと、詳細なAPIが書かれています。
Web Componentsで作られることが想定されているので、プロパティとイベントに加えてスロットに入れることのできる内容も記載があります。
[`::part()`](https://developer.mozilla.org/ja/docs/Web/CSS/::part)で用いられるIDや、[`::state()`](https://developer.mozilla.org/ja/docs/Web/CSS/:state)で用いられる状態も、存在する場合はドキュメント化される必要がありますが、今回はまだ書かれていない（もしくは書く必要がない）ようです。

また、スタイリングはデザイントークンを用いて行われます。コンポーネント内部でデザイントークンを用いてつけられたデフォルトのスタイルを、RFCに書かれているようなCSSカスタムプロパティを設定することで上書きできるようになっています。
[コメント](https://github.com/openui/design-system/pull/9#discussion_r2011062136)で指摘がありますが、現在プロパティの項目に書かれているものの一部はスタイルを制御するものであるため、CSSカスタムプロパティに置き換えられる可能性がありそうです。

その下には、コンポーネントの動作やアクセシビリティ上の考慮事項、ユースケースなどが書かれています。

ここまではデザインシステムやUIライブラリのドキュメントでも見るようなものです。
さらにその下に進むと、欠点や代替案、未解決の問題など、そもそもこのコンポーネントを追加するべきかどうかというRFCっぽい情報、ドキュメントの構成などが書かれています。Badgeのような今では当たり前にUIライブラリに存在しているようなコンポーネントでも、細かい考慮事項などが考えられていて面白いので、読んでみるのをおすすめします。
例えば僕が特に気になったのは、色のみのステータスインジケーター（例えばオンラインを緑、オフラインを灰色で示すようなもの）としてBadgeを扱ってしまうと色に依存したUIになってしまい、WCAG 2.2のSuccess Criterion 1.4.1 Use of Colorに違反してしまいます。これはDrawbacksの2つ目のAccessibility concernsという項目で挙げられています。

### Switch コンポーネント

https://github.com/openui/design-system/pull/11

2つ目のRFCであるSwitchコンポーネントです。
スタイリングする際などにコンポーネントのパーツの名称が複雑なので、Anatomyによって分かりやすくなっています。

### Progress コンポーネント

https://github.com/openui/design-system/pull/10

後述のMVPリストに載っていないので状況が不明ですが、PRが出ています。
上の2つと違い、コメント欄にCodePenのサンプルへのリンクがあるので実際の動作を見てみたい人は確認をしてみてください。

## 今後の展望

いくつか今後動きそうなissueが立っています。

- [MVP (Minimum Viable Product) list of components](https://github.com/openui/design-system/issues/2)
- [Browser Supports](https://github.com/openui/design-system/issues/5)
- [Design Tokens](https://github.com/openui/design-system/issues/14)
- [Styles Normalization](https://github.com/openui/design-system/issues/12)
- [MCP](https://github.com/openui/design-system/issues/20)

## まとめ
