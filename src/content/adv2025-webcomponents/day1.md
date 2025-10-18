---
title: イントロダクション
publishedDate: "2025-12-01"
---

去年に引き続き、25日間1人アドベントカレンダーを行います。今年は前後半に分かれていて、前半は「Web Components アクセシビリティ」、後半は「今さら聞けないWeb標準 アクセシビリティ」というテーマで記事を投稿していきます。
今日は概要や具体的なトピック、書くこと書かないことについて簡単に紹介します。
なお、去年の1人アドベントカレンダー「React Aria の実装読むぞ」は、以下のリンクからご覧ください。

https://qiita.com/advent-calendar/2024/react-aria

会社の先輩方の1人アドベントカレンダーはこちらです。

https://blog.sakupi01.com/dev/articles/2025-css-advent-0

## 概要

### Web Components アクセシビリティ

昨年のアドベントカレンダーではReact Ariaをアクセシビリティの観点で見ていきました。WebサービスやWebサイトにおいてアクセシビリティを確保する上で、このようなライブラリや、これにUIなどの要素が加わったデザインシステムが重要な役割を果たします。日本だとfreeeやSmartHRなどの企業だったり、デジタル庁もデザインシステムを公開しています。しかし、多くのデザインシステムのコンポーネントはReactなどライブラリ・フレームワーク固有のものになってしまっていて、それを別のライブラリ・フレームワークを用いたプロジェクトで使おうとすると手間がかかってしまいます。

そこで、Web ComponentsというWebが標準で提供する機能を使うことで、ライブラリ・フレームワークに依存しないコンポーネントを作成することができるようになります。これにより、ライブラリ・フレームワークを用いることによるパフォーマンス的な懸念や相互運用性の問題を排除することができます。
実際、[Salesforce Lightning Design System](https://www.lightningdesignsystem.com/2e1ef8501/p/85bd85-lightning-design-system-2)や[Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)などのデザインシステムではWeb Componentsが利用されていたり、[OpenUI Design System](https://github.com/openui/design-system)でもWeb Componentsを用いたデザインシステムの構築が検討されています。

ただ、現状Web Componentsは、一般的なWeb開発者がReactなどのライブラリ・フレームワークと同じような開発体験で触ることができるかというとそんなことは無く、まだ様々な辛さを抱えています。
そこで、今回のアドベントカレンダーではWeb Componentsが抱えているアクセシビリティ上の問題点を見ていき、今までいくつかの辛さがどのように解決されてきたのか・現在存在する辛さがどのように解決されようとしているのかを紹介します。

### 今さら聞けないWeb標準 アクセシビリティ

https://developer.chrome.com/blog/new-in-web-ui-io-2025-recap?hl=ja

上記のGoogle I/Oの記事で分かるように、2025年前半だけでUIに関する様々な機能がWeb標準で提供・強化されています。後半にもこれらが改善されたり、Aria NotifyがChromeでShipされたり、Scoped FocusgroupがBlinkでIntent to Prototypeになったりと、多くの動きがありました。
今さら聞けないこれらの機能を、年末の2週間で特にアクセシビリティに着目しつつ一気にキャッチアップし、来年のアップデートに備えようというものです。

月ごとの細かいアップデート情報はWeb 標準動向をご覧ください。

https://zenn.dev/cybozu_frontend/articles/web_standards_monthly_202509

## 具体的なトピック

毎日のトピックは以下のように進んでいく予定です。順番など前後する可能性があります。

### Web Components アクセシビリティ

- Form-associated、ElementInternals
- Customized Build-in Elements
- フォーカス制御
- Cross-root ARIA Reference Target
- OpenUI Design System
- TPAC参加報告

などなど

### 今さら聞けないWeb標準 アクセシビリティ

- Popover API & Anchor Positioning
- Invoker Commands
- Customizable Select Elements
- Interest Invokers
- Scoped Focusgroup
- カルーセル周りのアップデート
- TPAC参加報告

などなど

## 書くことと書かないこと

### 書くこと

- アクセシビリティに関係すること
- 現在の議論の紹介・将来どうなっていきそうか
- 今年入ったWeb標準の機能の基本情報

### 書かないこと

- Web Componentsの基本知識
- Web ComponentsのCSS関連の話
  - [🎨 CSS Advent Calendar: Day 16 / Hard Core Scoping of Standard | @sakupi01.com](https://blog.sakupi01.com/dev/articles/2025-css-advent-16/) をご覧ください
- UIに関係のないWeb標準
- 25日目の記事
  - 今年から原義アドベントカレンダーに則り、24日制でいきます

## まとめ
