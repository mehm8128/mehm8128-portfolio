---
title: "2026年前期のアクセシビリティ系OSS活動まとめ"
publishedDate: "July 8 2026"
---

> [!info]
> この記事は、[CYBOZU SUMMER BLOG FES '26](https://summer-blog-fes.cybozu.io/2026/)の記事です。

こんにちは、フロントエンドエンジニアのmehm8128です。
最近以下のような、AIによるアクセシブルでないコードの負の学習サイクルが問題視されています。

1. AIがアクセシブルでないコードを学習する
2. アクセシビリティにあまり詳しくない人が、AIを使ってアクセシブルでないコードを書く
3. それによってアクセシブルでないコードを学習したAIが、さらにアクセシブルでないコードを書くようになっていく

関連した話が、先日のCA11Y #4でも話されていました。
[AI はアクセシビリティを向上させられるのだろうか? (2026-06-20 @ ca11y) | PPTX](https://www.slideshare.net/slideshow/ai-2026-06-20-ca11y/288153806)

これを改善するための一つの手段として、僕はBiome、Oxlintのようなlinterや、axe-coreのようなアクセシビリティチェッカーへのcontributionを行っています。

このようなツールで分析できる観点は限られていますが、アクセシビリティにあまり詳しくない人は考慮できていなかったポイントを知って改善することができ、詳しい人でも見逃しを防ぐことができます。

関連して以下の記事もご覧ください。

https://note.com/ebaryo43/n/nc3b75af818a4

それぞれのツールへのcontributionの詳細を紹介していきます。

## Oxlint

ESLintのRust移植であるOxlintに、10件ほどPRを出しました。
Oxlintでは、いくつかのESLintのプラグインにあるルールをRustで実装しており、移植用のissueが作成されます。そこに未実装のルールがリストアップされるので、自由に実装してPRを作成できます。
例えばアクセシビリティのルールは、以下のissueでeslint-plugin-jsx-a11yから移植していました。

https://github.com/oxc-project/oxc/issues/1141

eslint-plugin-jsx-a11yは既に全てのルールが実装済みですが、アクセシビリティ以外だと例えば[eslint-plugin-jsdoc](https://github.com/oxc-project/oxc/issues/1170)や[eslint-plugin-n](https://github.com/oxc-project/oxc/issues/493)のようなプラグインは、まだ未実装のルールが多くあります。


僕はこの移植自体の作業を3件、既存のルールで修正が必要そうな箇所の修正を7件、PRとして提出しました。それぞれ軽く紹介します。

### 移植作業

移植自体の作業をしたPRは以下の3つです。

- [feat(linter): implement aria/proptypes by mehm8128 #17253](https://github.com/oxc-project/oxc/pull/17253)
- [feat(linter): implement interactive-supports-focus #21767](https://github.com/oxc-project/oxc/pull/21767)
- [feat(linter): implement aria/proptypes #17253](https://github.com/oxc-project/oxc/pull/17253)

実は前にBiomeでも同じような移植作業を行っていたことがあったので、実装方法自体はあまり変わらず、そこまで詰まることなく実装できました。

https://github.com/biomejs/biome/pulls?q=is%3Apr+is%3Amerged+author%3Amehm8128

Biomeと違う点として、ESLintプラグインの元ルールに実装されているテストケースをそのまま取ってきて、基本的に全て通過するようにしてPRを提出する必要があります。Biomeでは、必ずしも元ルールから取ってくる必要はなくて自分で一から書くこともできました。他に、アクセシビリティルール用の汎用utilメソッドの差異についてはBiomeとOxlintの大きく違う点です。

### 既存ルールの修正

こちらの方がたくさんあります。主なものを挙げますが、他に軽微な修正やリファクタPRをいくつか出しています。

- [feat(linter): extends `no-redundant-roles` and `prefer-tag-over-role` support roles #22069](https://github.com/oxc-project/oxc/pull/22069)
- [fix(linter): fix role-has-required-aria-props #22097](https://github.com/oxc-project/oxc/pull/22097)
- [fix(linter): add more expression support for iframe-has-title #22460](https://github.com/oxc-project/oxc/pull/22460)
- [fix(linter): allow dialogs and popovers for no_autofocus #22289](https://github.com/oxc-project/oxc/pull/22289)

issueに挙げられていたものの修正や、自分で立てたissueの修正をしています。移植系のルールということで様々な人がPRを作成しているということもあり、考慮漏れが多くあったり、ESLintの元ルールのテストケースが不足していて、網羅するべきARIA属性やロールが網羅できていないということがあったりしていたようです。

そのため、AIを使って以下の手順でOxlintとESLintの差異をまとめてもらい、必要に応じてissue化しました。

1. アクセシビリティのlintエラーが検出されるようなplaygroundを作る
2. OxlintとESLintでそれぞれアクセシビリティのルールを全て有効にする
3. OxlintではエラーになるけどESLintではエラーにならないもの、もしくはその逆を洗い出してMDにまとめる

自分ですぐに直せるものは上記のようなPRを作り、issue化だけして寝たものは、朝起きたら他の人がPRを作ってくれていたことがありました。

- [linter: `no-autofocus` — `autoFocus={false}` should not be flagged #21912](https://github.com/oxc-project/oxc/issues/21912)
- [linter: `media-has-caption` — Rule fires twice for the same violation #21911](https://github.com/oxc-project/oxc/issues/21911)
- [linter: `prefer-tag-over-role` — Missing support for several roles #21910](https://github.com/oxc-project/oxc/issues/21910)

このようにAIを使ってplaygroundで差異を検知する方法は、全部を完全に検知できるわけではないですが、ESLintのルールのOxlintへの移植作業や、Oxlintを使い始めるときにESLintからのmigrationの動作確認にも使えると思います。

### utilメソッドの差異について

前述したBiomeとOxlintのutilメソッドの話です。
これらのlinterでは、ロールや`aria-`属性を扱うためにutilメソッドを共通化して持っており、色んなルールで再利用可能にしています。
Biomeでは一部をARIAの仕様書から自動生成しているのですが、Oxlintでは全て手動で参照してハードコーディングしています。それに加え、Biomeではロールに対して利用可能な`aria-`属性の値を比較的厳密に条件分岐して計算しているのですが、Oxlintではまだそこまでできておらず、差分が生じています。

[Biomeのutilメソッド](https://github.com/biomejs/biome/blob/main/crates/biome_aria_metadata/src/lib.rs)
[Oxlintのutilメソッド](https://github.com/mehm8128/oxc/blob/main/crates/oxc_linter/src/utils/react.rs)

僕のPRでは特にこのutilメソッドを修正することが多かったのですが、仕様書を照らし合わせる作業が多く、条件分岐が発生する箇所はある程度妥協している部分もあります。
また、元となっているESLintプラグインではARIAの情報を取得する[A11yance/aria-query](https://github.com/A11yance/aria-query)に加えて、[A11yance/axobject-query](https://github.com/A11yance/axobject-query)も参照してロールに関する計算を行っています。これは仕様書には存在しない、Chromeの内部実装におけるロールの情報を取ってきているライブラリで、果たしてこれをどれだけ信用していいのかという問題もあります（READMEにあるChromiumのリンクは切れています）。前述のように、基本的には元ルールのテストが通るように実装しなければならないので、これに依存していると辛いです。

複数ライブラリ間でロールや`aria-`属性に関する情報を再実装しなくて済むように個人的に気になっているのが、[w3c/ariaのリポジトリ](https://github.com/w3c/aria)に含まれている[`roleInfo.js`](https://github.com/w3c/aria/blob/main/common/script/roleInfo.js)です。
これは同じディレクトリの`aria.js`などのスクリプトを用いて、ロールの情報をJSオブジェクトとして仕様書から自動生成して定義しているファイルです。linterで必要になる情報を全て含んでいるわけではないですが、仕様書のリポジトリに含まれているということで信頼できる情報となっています。
HTML要素とARIAロールとの関係や、ロールがabstractロールかどうか、`aria-`属性がどのような形式の値を取るか（[aria/proptypesの実装](https://github.com/oxc-project/oxc/pull/17253)で追加したようなマッピング）、あたりは含まれていないようです。

関連して個人的に[mehm8128/eslint-plugin-a11y-experimental](https://github.com/mehm8128/eslint-plugin-a11y-experimental)という、aria-actionsやfocusgroupなど比較的新しいWeb技術についてのアクセシビリティに関するESLintルールを含んだ試験的なプラグインをAIを用いて作っています。このプラグインでは`roleInfo.js`を使うようにしており、例えば祖先に`widget`ロールを含むロールをインタラクティブなロールとして扱うような処理などを`roleInfo.js`の`parentRoles`を参照して実装しています。

## axe-core

axe-coreは[Axe Devtools](https://chromewebstore.google.com/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)や[Lighthouse](https://developer.chrome.com/docs/lighthouse/overview)、[`@storybook/addon-a11y`](https://storybook.js.org/addons/@storybook/addon-a11y)、[nuxt/a11y](https://github.com/nuxt/a11y)などの内部で利用されている、アクセシビリティチェックツールです。BiomeやOxlintとは違い、実際にWeb上に表示されているDOMの状態をチェックできます。

linterとは少し違って今まで触れたことがなかったので、比較的簡単そうなものを探して2つほど試しにPRを出してみました。

https://github.com/dequelabs/axe-core/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+is%3Aclosed

issueは眺めるだけでも学びになりそうなものがたくさんありました。最近話題の[HTML in Canvasサポートの議論](https://github.com/dequelabs/axe-core/issues/5117)などもあるようです。他には、最近の傾向としてElementInternalsのサポートに関するissueが多く動いている印象です。

また、Xで「Axe Devtoolsのチェック結果が、前まで日本語だったのに英語になってしまった」という投稿を見たのでissueを立てたところ、3週間ほどで直してもらえました。Axe Devtools自体のコードは非公開なのですが、issueのテンプレートの"Product"の欄で"axe Extension"を選べばOKでした。

https://x.com/38_mot/status/2047601644821700695?s=20

https://github.com/dequelabs/axe-core/issues/5095

## おまけ1: NVDA

Windows向けスクリーンリーダーであるNVDAにも、1つバグ修正PRを出しました。

https://github.com/nvaccess/nvda/pull/20056

普段動作確認などで使っているスクリーンリーダーなので、仕組みを知っておきたくてやってみました。
以前[`nameFrom: heading`とsectionheader/sectionfooterについて](https://portfolio.hm8128.me/blog/namefrom-heading/#sectionheader-role-%E3%81%A8-sectionfooter-role)や[Accessibility APIでブラウザから情報を取得してみる](https://portfolio.hm8128.me/blog/ia2/#nvda%E3%81%AE%E3%82%A2%E3%83%89%E3%82%AA%E3%83%B3%E7%B5%8C%E7%94%B1%E3%81%A7%E3%82%A2%E3%82%AF%E3%82%BB%E3%82%B7%E3%83%93%E3%83%AA%E3%83%86%E3%82%A3%E6%83%85%E5%A0%B1%E3%82%92%E5%8F%96%E5%BE%97%E3%81%97%E3%81%A6%E3%81%BF%E3%82%8B)で内部実装を少し読んだので、修正が必要な箇所を見つけるのにはそこまで時間がかかりませんでした。

[ウェブアクセシビリティ基盤委員会（WAIC）にてサイボウズメンバーはこんな活動をしています - Cybozu Inside Out](https://blog.cybozu.io/entry/2026/04/28/170000)で書いたような、スクリーンリーダーのWeb技術に対するサポート状況を改善するために、NVDAに直接貢献するという方法は有効だと思うので、今後も少しずつ貢献していきたいです。

## おまけ2: Storybook

Storybookでは現状、`<html>`要素の`lang`属性が固定で`en`になっており、書き換えるには`document.documentElement.setAttribute("lang", "ja")`のように後からJSで上書きしなければなりません。
デジタル庁のStorybookの例: [design-system-example-components-react/.storybook/preview-head.html · digital-go-jp/design-system-example-components-react](https://github.com/digital-go-jp/design-system-example-components-react/blob/0a5511c22f36e2164a3260ab0b29173d124de170/.storybook/preview-head.html#L34)

公式にオプションがないので、この方法を知らないと諦めてしまったり、そもそも`lang`属性をStorybook上の言語に合わせないといけないことを見逃してしまったりという問題があります。さらに、JSを用いる方法を使ったとしても、`word-break`や`hyphens`など`lang`属性の値によって挙動が変わるCSSは[issueのコメントで述べられている](https://github.com/storybookjs/storybook/issues/11706#issuecomment-3414498265)ように、HTMLの初回読み込み時の`lang`属性しか見ないので後からJSで上書きしても効かないという問題を抱えているようです。

そこで公式で`lang`属性を変更できるようなオプションを生やそうとしたのが以下のPRです。

https://github.com/storybookjs/storybook/pull/34501

元々koba04さんが[feat: support to change the lang attribute in a preview HTML by koba04 · Pull Request #15541](https://github.com/storybookjs/storybook/pull/15541)にて環境変数で設定できるようにしたPRを作成したところ、オプションで変更できるようにしてほしいというレビューをもらってPRがcloseされ、4年ほど経過していたので、その方針で自分で実装してみました。

最初はこのまま進みそうだったのですが、より細かく`lang`属性を制御したいという話になり、僕のPRを参考にしてメンテナーの方に別でPRを作ってもらう方針になりました。

https://github.com/storybookjs/storybook/pull/35207

TODO: 進んだら追記

## まとめ
