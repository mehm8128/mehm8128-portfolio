---
title: "アクセシビリティに取り組む意味"
publishedDate: "Dec 17 2025"
---

> [!note]
> この記事は[アクセシビリティ Advent Calendar 2025](https://adventar.org/calendars/11364)の17日目の記事です。

こんにちは、個人ブログだけどアドベントカレンダーなので一応自己紹介をしておきます。フロントエンドエンジニアのmehm8128です。

真面目な話は苦手なのですが年末ということで、最近考えている「アクセシビリティに取り組む意味」について書きます。読み終わったら全部忘れてください。

## アクセシビリティに興味をもったきっかけ

僕がアクセシビリティに興味を持ったきっかけは、大学3年生のときに[Webアプリケーションアクセシビリティ](https://gihyo.jp/book/2023/978-4-297-13366-5)が発売されたことです。アクセシビリティ界隈でも有名な伊原さんやymrlさん、ますぴーさん、弊社の小林さんが執筆された著書です。フロントエンドエンジニア（を志望する者）として、「a11y」という単語は技術記事でたまに見ていたのですが、それがなんなのかという知識はほとんどありませんでした。しかしきっと将来的に必要になってくるだろうと思い、読むことを決めました。読んでみると、そもそも「アクセシビリティ」とはなんなのかというところから、具体的な実装のサンプルまで丁寧に書かれていて、今まで見ていたのとは新しい世界に踏み込んだ感じがして興味を持ち始めました。

もちろんそのきっかけから、新しいことへの興味や「自分たちが作っているサービスをより多くの人に使ってもらえるようになる」「その上でユーザビリティの向上へも繋がる」など、様々な理由やアクセシビリティに取り組むことへのメリットを意識してアクセシビリティのキャッチアップや普段の開発への実践を行っていました。
しかし最近、それだけではありきたりだし他人の言葉を借りているだけという気持ちが出てきて、自分のアクセシビリティへの興味のもっと根本的な理由を探っていました。

まず最初に他の方々のツイートや発表内容から、他の方々のアクセシビリティへの理念や取り組む理由を挙げてみます。

## 他の方々のアクセシビリティへの理念

ymrlさんのMTDDC Meetup TOKYO 2025での発表資料と、その発表の後に投稿されたツイートです。

https://docs.google.com/presentation/d/1l6pznNkfzXrtIM8DadlgCQTHVmM7GOLTFwkL8IY8eaQ/edit?slide=id.p#slide=id.p

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">Webアクセシビリティに取り組む究極的な目標は、インターネットとWebが拡げてきた世界をさらに拡げることでもあるんじゃないかと思っていて、今日の登壇にはそういう話を入れてみた。それが普遍的絶対的な目標であるとか言うつもりもないし、儲かる話でもないけど、個人として取り組むには充分な理由。</p>&mdash; ymrl (@ymrl) <a href="https://twitter.com/ymrl/status/1994659189315321903?ref_src=twsrc%5Etfw">November 29, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

発表スライドでは

> - Webは既に社会のインフラであり、そこでの障壁を減らしていく責任がある
> - Webのアクセシビリティが高まることで、可能性を広げられる
>   - 使いたいけど使えなくて困っている人がいるかもしれない
>   - 思いもよらぬかたちで、思いもよらぬ人が使ってくれるかもしれない
> - アクセシビリティはインターネットやWebのフロンティアのうちのひとつ
>   - インターネットとWebのおかげで、日本各地や海外とやり取りできる
>   - コミュニティもビジネスも、もっと広げていくことができる

とあり、ツイートにもあるようにアクセシビリティを「インターネットとWebが拡げてきた世界をさらに拡げること」と意味づけています。

また、アクセシビリティカンファレンス福岡では[yoccoさん](https://x.com/yocco405)と[宮本さん](https://x.com/38_mot)の発表で、アクセシビリティの定義・理念の話がありました。

yoccoさんはアクセシビリティを「みんなで一緒に使ったり楽しんだりできるために必要なもの」と定義し、宮本さんは「人々の成長のきっかけになり、社会が豊かになることに貢献する」を理念としているとのことでした。

> [!warn]
> ※スライドや録画がまだ公開されておらず、メモも取っていなかったため、[アクセシビリティカンファレンス福岡2025 2025年12月11日](https://note.com/hokorin/n/nf77bfc4e11f1)にある言葉を引用させていただいています。

宮本さんの発表中のツイートでは、前述のymrlさんの内容に関連するようなものがありました。

<blockquote class="twitter-tweet"><p lang="ja" dir="ltr">アクシブルなウェブとそうでないウェブがあるわけではなく、ウェブは本来アクセシブルだか、それをいつのまにか削いでしまっている<a href="https://twitter.com/hashtag/fukuoka_a11yconf?src=hash&amp;ref_src=twsrc%5Etfw">#fukuoka_a11yconf</a></p>&mdash; 金 成奎 (@seikei_kin) <a href="https://twitter.com/seikei_kin/status/1997204174711488704?ref_src=twsrc%5Etfw">December 6, 2025</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>

少し前の記事ですが、[emimさん](https://x.com/emim)の記事も見ていきます。

https://emiemihuimei.hatenablog.com/entry/2021/04/27/222623

> あらゆるところで引用されつくされたものではあるが、Webの父Tim Berners-Leeが、こんな言葉を[残している。](https://www.w3.org/mission/accessibility/)
>
> > The power of the Web is in its universality.
> > Access by everyone regardless of disability is an essential aspect.
>
> 日本語訳としては「Webの力はその普遍性にある。障害の有無に関わらず、誰もがアクセスできることが重要である」。
> 雑にまとめると「どんな状況でもアクセス可能であるものこそ、Web」ということが言われていて、Webの世界にハマるきっかけこそがこの言葉だった。
> この情報への「アクセス」を実現させる（Ability）ことこそがWebであり、その仕組みの骨子こそがWebアクセシビリティである。

後ほど再度引用するのですが、Tim Berners-Lee氏の言葉を引用し、WebアクセシビリティをWebの普遍性を実現させる仕組みの格子として捉えています。

## それらを踏まえて

まず、前述のTim Berners-Lee氏の言葉を改めて引用します。

> The power of the Web is in its universality. Access by everyone regardless of disability is an essential aspect.

- [Accessibility | Our mission | W3C](https://www.w3.org/mission/accessibility/)
- [World Wide Web Consortium Launches International Program Office for Web Accessibility Initiative | 1997 | Press releases | W3C](https://www.w3.org/press-releases/1997/ipo-announce/)
- [Introduction to Web Accessibility | Web Accessibility Initiative (WAI) | W3C](https://www.w3.org/WAI/fundamentals/accessibility-intro/)

また、[W3Cのvision](https://www.w3.org/mission/)には以下のような記述があります。

> To achieve our vision to make the web work — for everyone, we uphold the following core values:
>
> - The web is for all humanity.
> - The web is designed for the good of its users.
> - The web must be safe for its users.
> - There is one interoperable world-wide web.

様々なWebの仕様を策定しているW3Cが宣言しているということで、Webが「普遍的で、誰でもアクセスできるものであるべき」という一面を持っていて、それに向かって仕様策定が行われていると考えられます。

Webは本来、現実世界と比べてアクセシブルなものです。自分の考えや持っている情報をWebにアップロードするだけで、全世界に公開することができます。このブログ記事も、Webがなければ原稿用紙に書き、それをわざわざ伝えたい人の人数分コピーして、伝えたい人一人ひとりに郵送したり手渡ししたりしなければならなかったかもしれません。しかし、Webのおかげで`git push`するだけで全世界に公開することができています。また、Webに限らずITツールは全てそうですが、紙だとOCRなどで文字を読み取らなければ音声に変換できず、直接目から情報を得られない状況で情報を得ることが難しいです。一方、Webの場合は文字が電子情報としてデータになっているので、そのまま音声として読み上げさせることができます。

思い返してみると、世界中のコンテンツにアクセスできたり、遠く離れた知らない人とコミュニケーションを取れるというのが魅力の一つだと思ってインターネットを利用してきました。やや現代的ですがXやYoutube、オンラインゲームなどはその代表例です。
そう考えたときに、自分はそのような全人類の利益・幸福のためのWebを文字通り「全人類」がアクセスできるようにするために、少しずつでもできることをしていきたいです。そしてWebだけに留まらず、最終的には物理的な現実世界全てが全人類にとってアクセシブルになれば良いと思います。

## まとめ

アクセシビリティの活動をもっとやっていきたいと思いつつ、なんとなく興味の赴くままに色々してきた1年でしたが、改めてアクセシビリティに取り組む意味を考えてみる機会になりました。これを基に、来年の活動方針をさらに考えていきたいです。

## その他参考文献

- [アクセシビリティはウェブの「標準品質」 | Accessible & Usable](https://accessible-usable.net/2010/02/entry_100214.html)
- [アクセシビリティについて | ヘルプ | ミツエーリンクス](https://www.mitsue.co.jp/help/accessibility.html)
- [Webアクセシビリティとは？｜基礎知識｜エー イレブン ワイ［WebA11y.jp］](https://weba11y.jp/basics/accessibility/accessibility_index/)
- [Web技術の歴史 | UNISYS TECHNOLOGY REVIEW](https://www.biprogy.com/pdf/11001.pdf)
- [Web とは何か | blog.jxck.io](https://blog.jxck.io/entries/2025-11-19/web.html)
