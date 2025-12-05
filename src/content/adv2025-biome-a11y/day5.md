---
title: "useAriaPropsForRole, useAriaPropsSupportedByRole"
publishedDate: "Dec 5 2025"
---

今日はroleとaria-属性の話です。

https://biomejs.dev/ja/linter/rules/use-aria-props-for-role/

https://biomejs.dev/ja/linter/rules/use-aria-props-supported-by-role/

## なにこれ

`useAriaPropsForRole`はroleが必須のaria-属性を持っていなかったらエラーを出すルール、`useAriaPropsSupportedByRole`はroleがサポートしていないaria-属性を持っていたらエラーを出すルールです。

roleとaria-属性の対応はWAI-ARIAのドキュメントに記載があります。

https://www.w3.org/TR/wai-aria/#roles

Biomeはpackages/aria-dataにJSONでARIAに関する情報を持っていて、これを参照してエラーを出すかどうかを決めています。

https://github.com/biomejs/biome/tree/main/packages/aria-data

前者のルールについては特に言うことはないので、後者に注目します。

ドキュメントだと、`<a>`要素（link role）は`aria-checked`をサポートしていない、というようなエラーが紹介されています。
こんなミスをする人は多分あんまりいないと思いますが、これはどうでしょう。

```html
<div aria-label="なんかいい感じのラベル">なんかいい感じのコンテンツ</div>

<span aria-label="スクリーンリーダーに読ませたいテキスト！">
  スクリーンリーダーに読ませると変な読み方されそうなテキスト
</span>
```

これはかなりやりがちなやつだと思うのですが、これもエラーになります。`<div>`も`<span>`もデフォルトでgeneric roleを持っているので、以下のドキュメントを参照すれば分かるように、`aria-label`は許可されていません（もちろん`aria-labelledby`も）。

https://www.w3.org/TR/wai-aria/#generic

ちなみに、Name Fromという表記があると思いますが、これはauthorだったら`aria-label`などでaccessible nameをつけることができ、contentsだったらその子要素によってaccessible nameがつき、prohibitedだったらaccessible nameをつけることができません。今回はprohibitedです。他のroleだと、例えばbutton roleはauthor and contentsだったりします。

[Name Fromにheadingが追加されようとしている話](https://zenn.dev/mehm8128/articles/namefrom-heading)や、[tooltip roleのName Fromが変わる話](https://zenn.dev/cybozu_frontend/articles/web_standards_trends_202511#change-tooltip-to-name-prohibited)も過去に書いているので、気になる人は読んでください。

話を戻して、`<div>`で囲っているコンテンツに名前をつけたいときはいい感じのロールをつけてからにしましょう。

```html
<div role="いい感じのロール！" aria-label="なんかいい感じのラベル">
  なんかいい感じのコンテンツ
</div>
```

書いておいてあれですが、後者の`<span>`はちょっと状況によって諸説あるので、roleとか考える前に本当にスクリーンリーダーだけ別の読ませ方をしたいのかとか考えた方がいいです、多分。

もちろん、その目的に対応するセマンティックなHTML要素がある場合は`<div>`にroleをつけるのではなく、セマンティックなHTML要素を使います。それが`useSemanticElements`のルールです（ここで記事ネタが1日分消える）。

```html
<なんかいい感じのHTMLタグ名 aria-label="なんかいい感じのラベル">
  なんかいい感じのコンテンツ
</なんかいい感じのHTMLタグ名>
```

https://biomejs.dev/ja/linter/rules/use-semantic-elements/

「ARIAの第一のルール」を知っていますか。それは、ARIAを使わないことです。ARIAを使わず、できるだけネイティブのセマンティックなHTML要素・属性を使いましょう。

https://www.w3.org/TR/using-aria/#rule1

このルールを守れるようになるためには（というかHTMLを正しく扱えるようになるためには）、Biomeのルールを守るだけでなく、できるだけ多くHTML要素・属性について知っていて、必要なときに適切に利用できるようにしておく必要があります。例えば僕は少し前まで[`<mark>`要素](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/mark)を知らなかったのですが、業務で登場する機会があって知りました（結局そのケースでは子要素として`<div>`などphrasing content以外の要素を入れたかったので使えませんでした）。

とりあえず「HTML Tags Memory Test」でHTML要素を114個何も見ずに言えるようになるのがいいのかもしれません（？）。

https://codepen.io/plfstr/full/zYqQeRw

あと、「HTML解体新書」もアクセシビリティ界隈で有名な2人が書いていて良いらしいのですが、僕は読めてないです。2022年発売の本なので、もしかしたら新しい要素や属性が入っていないということがあるかもしれません。

https://www.borndigital.co.jp/book/25999/

少し前に、こんな記事がありました。W3Cが管理しているNu HTML Checkerで色んなWebサイトをチェックしたところ、エラーが1つもないサイトが1つもなかったとのことです。

https://meiert.com/blog/html-conformance-2025/

CSSまで見てしまっていたり、集計方法やエラーの内容などがちょっと怪しい部分もあるかもしれませんが、例えば1番上に書かれている[WikiPedia](https://www.wikipedia.org/)を見てみます。

CSSのエラーを無視して少し下にいくと、ちょうど上で書いた、generic roleの`<div>`に`aria-label`をつけてしまっているエラーが出ていました。

> The aria-label attribute must not be specified on any div element unless the element has a role value other than caption, code, deletion, emphasis, generic, insertion, paragraph, presentation, strong, subscript, or superscript.

2番目にあった[Youtube](https://www.youtube.com/)では、IDが重複しているというエラーがありました。

> Duplicate ID menu.

HTMLは意外と正しく書かれていないもののようです。こういったCheckerやBiomeなどのlinterを使いつつ、それで検知できないもの・バッドプラクティスもあるので気をつけたいです。

## まとめ

HTMLを正しく書けることはWebフロントエンドで基本中の基本なので、ちゃんと知識を持って正しく書けるようにしていきたいですね。
