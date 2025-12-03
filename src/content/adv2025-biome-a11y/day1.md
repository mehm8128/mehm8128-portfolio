---
title: "イントロダクション"
publishedDate: "Dec 1 2025"
---

元々Web Componentsで書こうと思っていたのにTPACに行ったらWeb Componentsで出す気がなくなってしまい、WCAGとかWAI-ARIAとかのアクセシビリティ系のドキュメントで書こうと思ったけどあんまりやる気が出ず、結局今年のテーマは「Biomeのlintルールから見るアクセシビリティ」になりました。

## Biomeのlintルールから何を見るのか

テーマを思いついたきっかけがBiomeだったのと、ちょっと目を引くような単語を入れようと思ったというだけなので別にBiomeじゃなくてもいいのですが、世の中にはいくつかのアクセシビリティのlintルールがあります。

[jsx-eslint/eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)があり、それがRustに移植されて[Oxlint](https://oxc.rs/docs/guide/usage/linter/rules.html)や[Biome](https://biomejs.dev/linter/javascript/rules/#a11y)に入っています。その他[YozhikM/stylelint-a11y](https://github.com/YozhikM/stylelint-a11y)というのもあったりします。[Markuplint](https://markuplint.dev/ja/docs/rules#accessibility)にもいくつかアクセシビリティのルールがあります（アクセシビリティのところにないルールもアクセシビリティ関係あったりする）。

こういったルールはプロジェクトで最初から入れておくことで、アクセシビリティに詳しくない人たちがいるチームでも強制的に一定のアクセシビリティを保つことができたり、正しいマークアップをすることができたりします。

以下の記事もおすすめです。

https://note.com/ebaryo43/n/nc3b75af818a4

今回のadvでは、これらのルールの中からいくつかピックアップして深ぼっていきます。

ただし、これを思いついたのが12/1ということで、進捗が0文字なので、しばらく更新がないと思ったら急に放出されたりするかもしれません。

思いついたきっかけとしては、BiomeでJSX用に実装されているアクセシビリティのlintルールたちをHTML用にportするというissueが最近立っていて、自分が1つコントリビュートしたことです。他にもいくつかやってみようと思っているので、興味のある人はやってみるといいかもしれません。

https://github.com/biomejs/biome/issues/8155

Oxlintの方もまだいくつか実装が残っているようです。

https://github.com/oxc-project/oxc/issues/1141

書く内容としては各ルールに関連するWCAGの話だったり、それについて知ってることを雑に書き散らしたり、lintルール自体がどうやって実装されているのかを読んでいったりします。例えばroleとaria-属性の関係性などのデータはある程度外部データを取得して利用していたり、既存のルールでも「この場合はこうなるべき」みたいなissueが立って議論が終わっていないものがあったりします。そこらへんを深ぼっていこうかなと思っています。
Biomeで足りなくなったら上で挙げた他のlinterやプラグインも見ていきます。

おわり。
あ、今回から自分のブログで出すことにしたので、「明日の担当はmehm8128さんです、お楽しみ！」とかもやりません。
