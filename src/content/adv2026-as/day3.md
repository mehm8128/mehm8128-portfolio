---
title: "ASでないWeb技術の例"
publishedDate: "2026-10-03"
draft: true
---

こんにちは、mehm8128です。

今回は、実際にASでないWeb技術の具体例を3つ紹介していきます。

## ライブリージョン

まずは[ライブリージョン](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Guides/Live_regions)です。

これについては、以前Browser and UIでymrlさんが発表したスライドが参考になります。

https://ymrl.github.io/live_region_basics/

ライブリージョンは`aria-live`、`aria-atomic`、`aria-relevant`、`aria-busy`の4つの属性や、これらの属性が暗黙的に設定される`alert`、`log`、`status`roleなどを使って実装します。
しかし、これらの属性に従ってDOMの変更を検知し、その変更内容をAccessibility APIを通じて伝達するのは複雑で、伝達するテキストの内容が仕様で明確に定義されているわけでもないので解釈の余地もあります。
そのため、ブラウザやブラウザが露出したAccessibility APIの情報を取得するスクリーンリーダーによって、異なる挙動を示すことがあります。

ymrlさんのスライドを見ても分かるように、実際にスクリーンリーダーによって挙動が異なり、同じNVDAでもChromeとFirefoxで挙動が異なっています。

ちなみに、スクリーンリーダー実装者の参考になるように、MDNには[ARIA Screen Reader Implementors Guide - ARIA | MDN](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Screen_Reader_Implementors)というページがあるようです。

そして、この問題を少しでも解決するために最近導入されたのが、ARIA Notifyです。

- [命令的な ARIA ライブリージョン：ARIA Notifyの紹介 - mehm8128のWeblog](https://portfolio.hm8128.me/blog/aria-notify-introduction/)
- [ARIA Notifyについて - Speaker Deck](https://speakerdeck.com/ryokatsuse/aria-notifynituite)

ユーザーが何かアクションを起こした結果のフィードバックとして情報を伝達したいときに、隠れたHTML要素にHTML要素を配置して、ライブリージョンを用いて伝達するようなHACKが使われることがあります。
しかしこれは表示が変化したDOMの内容を伝えるという本来のライブリージョンの用途とは、異なる使われ方です。このような用途ではARIA Notifyの命令的なAPIを用いるべきです。

ただ、本来の用途であれば引き続きライブリージョンを使うのが自然なので、利用するときはサポートしているUA・ATで動作確認が必須です。

## `<dialog>`要素とSafari+VoiceOver

次に、`<dialog>`要素とSafari+VoiceOverの環境において、フォーカス制御が上手く動かなかったり、パフォーマンスが低下したりするという不具合の話です。
これは、以下のしゃもさんの記事で紹介されていました。

https://qiita.com/shamokit/items/7620c361aa39aad41fc3

複数事象紹介されているのと、手元にMacがなくて動作確認できていないので個々の具体的な内容については取り上げませんが、これらはASの問題とみなせるでしょう。
仕様通りに実装していても、実は特定の環境で動いていないということがある良い例です。ライブリージョンの件と同様に、サポートしているUA・ATでの動作確認が必須であることを改めて確認できます。

こういう問題に遭遇したときにどう対応するべきか、悩むところです。
記事では、MacのSafariに対してだけ色々とhackyな方法を駆使してworkaroundを実装していました。アクセシブルなプロダクトを提供するためには、どうしてもこのように暫定措置を施すか、Safari+VoiceOver自体をサポート外としてしまうくらいしか思いつきません。しかし視野を広げてみたときに、暫定措置をするにしても気になる点が考えられます。

1つは、その問題に気づき、原因まで突き止めてworkaroundを入れられる人がいるプロダクトでしか暫定措置を入れられないということです。当たり前と言えば当たり前なのですが、WebKit自体に修正が入らない限り、自分のプロダクトで対応しても他のプロダクトでは同じ不具合は発生したままの状態です。今回のようにブログ記事として発信しても、該当する挙動が発生しうるプロダクトを作っている人全員が見ているわけではないので同じような対処法を見つけられない可能性があります。また、そもそもこのような挙動をしていることに気づかない人も多くいます。

もう1つは、WebKit側で修正が入ったとしても、その修正が適用されるのは基本的に（backportされない限り）最新版のブラウザのみです。よって、例えば会社のBaselineの基準としてWidely Availableを採用している場合は、同じ基準にするのであれば修正が入ってから2年半待たないと暫定措置を外すことができないということです。

僕が持っている1つの策は、React Ariaのようなライブラリを使ってしまうということです。次のセクションで紹介していきます。

## React Aria

React AriaはAdobeが公開しているライブラリです。React Ariaには様々なUIコンポーネントを作るためのhooksが含まれており、それを使って独自のUIを組み立てることもできるし、React Ariaを使って構築されたReact Aria ComponentsやReact SpectrumなどのUIライブラリを使うこともできます。

React Ariaには、ブラウザやスクリーンリーダーの組み合わせによっては上手く動かないときがある問題に対処するための様々なworkaroundが組み込まれています。
例えば前のセクションで紹介していたダイアログのUIだと、`useDialog`というダイアログを作るためのhooksがあり、そのの中にいくつかworkaroundが含まれています。

https://github.com/adobe/react-spectrum/blob/f1cee837470dbb95fa8d7fcd931f32ff69ebdfbf/packages/react-aria/src/dialog/useDialog.ts#L69-L82
https://github.com/adobe/react-spectrum/blob/f1cee837470dbb95fa8d7fcd931f32ff69ebdfbf/packages/react-aria/src/dialog/useDialog.ts#L116-L120

今回の記事で紹介されていたような問題へのworkaroundは含まれていないようですが、同じようにフォーカス制御周りの問題に対処していることがコード内のコメントから分かります。

他にも、ARIA系で大きいものだと以下のような問題が対処されています。

- `aria-errormessage`が一部のスクリーンリーダーでサポートされていないので、代わりに`aria-describedby`を利用
  - https://github.com/adobe/react-spectrum/blob/f1cee837470dbb95fa8d7fcd931f32ff69ebdfbf/packages/react-aria/src/label/useField.ts#L55-L56
- `aria-sort`がTalkbackでサポートされていないので、代わりに`ari-describedby`を利用
  - https://github.com/adobe/react-spectrum/blob/f1cee837470dbb95fa8d7fcd931f32ff69ebdfbf/packages/react-aria/src/table/useTableColumnHeader.ts#L101
- VoiceOverが`aria-activedescendant`の値の変更を適切に読み上げない
  - https://github.com/adobe/react-spectrum/blob/f1cee837470dbb95fa8d7fcd931f32ff69ebdfbf/packages/react-aria/src/combobox/useComboBox.ts#L394-L397

このようにReact Ariaでは、ライブラリの内部でブラウザやスクリーンリーダー間の互換性の問題を吸収しようとしています。もちろん十分に対応できていない部分もありますが、WebKitなどのブラウザエンジンと比べるとコントリビューションも行いやすくなっています。
また、ブラウザエンジン側で修正するのと比べると、修正がリリースされて取り込めばすぐに、ユーザーが使っているブラウザのバージョンに関係なく、全ユーザーに届けられるというメリットがあります。そして、自分のプロダクト側でworkaroundを入れるのと比べると、ライブラリを使っている開発者全員にworkaroundを届けることができるので、より多くの開発者にメリットがあります。

もちろんブラウザエンジン側にも素早く修正が入るのがベストです。しかし、それが全ユーザーに届くまでのタイムラグやコントリビューションの難易度などを考えると、こういったライブラリ側で環境間の差異を吸収してくれているようなライブラリにコントリビュートするというのも、アクセシビリティに貢献する一つの手だと考えています。

## まとめ

それではまた明日。
