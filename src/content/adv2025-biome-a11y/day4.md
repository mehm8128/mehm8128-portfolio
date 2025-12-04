---
title: "noRedundantAlt"
publishedDate: "Dec 4 2025"
---

今日は`noRedundantAlt`です。
やっぱりストックがないとしんどいし、ネタも2週間くらいで尽きそうです。

https://biomejs.dev/linter/rules/no-redundant-alt/

## なにこれ

冗長なaltはやめてねというルールです。具体的には「image」、「picture」、「photo」という単語が入っているときにエラーにするようです。
ただ、「写真」であるということを伝えたい場合には入れても問題ありません。[似たような話を太田さんが最近ツイートしていました](https://x.com/bakera/status/1996138419488194821?s=20)。また、元となったルールのドキュメントにリンクがある[WebAIMのページ](https://webaim.org/techniques/alttext/)にも記載があります。

> If the fact that an image is a photograph or illustration, etc. is important content, it may be useful to include this in alternative text.

なんで`aria-hidden`がついてたら常にpassするのかは分かりません。

最近Xのaltの話をよく見かけます。画像の投稿時にaltがついていなかったらツイートできないようにする設定もあるのですが、なぜかいつの間にかオフに戻っているので、外で写真撮ってすぐ投稿するときとかは自分もつけるのを忘れがちです。
altはまだまだXだと誤った使い方をする人がたくさんいるし、そもそもつけない人もたくさんいるので、もっと正しい使い方が広まってほしいです。たまに出る話ではありますが、やっぱり「Alt」というボタンをクリックしたら誰でも手軽にaltを見られるようになってるのがよくないので、ボタンを消してスクリーンリーダーからのみアクセスできるようにしてほしいですね。

https://x.com/nyabi_baby/status/1994975599409111040?s=20

bskyでも話が出ていたのですが、写真を撮ってすぐに共有するというSNSの性質上、altをちゃんと考えて入力する時間をなかなか取ることが難しいという点はあると思います。

https://bsky.app/profile/momdo.bsky.social/post/3lzbd5vww7225

あと、mixi2は10月末についにaltをつけられるようになりました。

https://x.com/mixi2_official/status/1983821185377788375?s=20

今年はこんな記事もありました。

https://note.com/debugon/n/ne7045920b2f9

普段目で画像を見ている自分たちは、音声だけで情報を取得しないといけなくなったときに実際どのくらいの情報が分かれば十分なのか、いまいち想像できていません。画像のaltだけでなく、「スクリーンリーダーでこのくらい情報が得られれば十分」というのはやはり普段から使っている人に聞かないと分からないです。

今までは[アドオン](https://github.com/cartertemm/AI-content-describer)を入れればNVDAでもAIに画像を要約させて読み上げさせることができましたが、2026.1からは公式で画像のAI要約機能が入る予定です。
とはいえ、アルファ版を前に試したときは英語のみサポート＆説明が抽象的&簡潔すぎて情報としてさすがに足りなさすぎたので、どのような状態でリリースされるのかは気になります。

https://groups.google.com/a/nvaccess.org/g/nvda-users/c/Th41cGvjsPI

https://github.com/nvaccess/nvda/pull/18475

ただ、AIが要約できるようになるとはいえ、添付されている画像の意図を真に理解しているのはその画像を添付した本人だけなので、利用者に対して正しく意図を伝えるには、やはり人間が適切なaltを書ける必要があります。

あと、今年はこれが面白かったです。

https://sizu.me/mehm8128/posts/sreub2fk7s9b

https://note.com/9999damage/n/ne2575c0b4142

https://sizu.me/mehm8128/posts/2rs2ut3s69wt

漫画をアクセシブルにする話です。セリフと情景描写を分けて、情景描写はalt、セリフはnoteの本文に書く、とか色々考えていたっぽいのですが、やっぱりなかなか難しそうでした。sizu.meにも書いたのですが、同じコマのセリフと情景描写はやっぱり行ったりきたりせずに読みたいのとか、今のままだとどうしても小説とあまり変わらないような情景描写のされ方になってしまっているのとか、まだまだ考えることはありそうです。

TPACでWCAGのbreakoutsをしていた村田真さんも最近、漫画のアクセシビリティの記事を出していました。興味のある人は読んでみてください。

https://note.com/don_quijote/n/n361944a16033

## まとめ

redundant関係なくaltの話になりました。
ちなみに今回のアドベントカレンダーでは、できるだけ画像を使わないことにしています。
