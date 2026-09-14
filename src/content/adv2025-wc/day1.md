---
title: イントロダクション
publishedDate: "2025-12-01"
---

## 概要

色々あって2025年当時はお蔵入りになっていたのですが、2026年9月に一部WIPだった部分を調整して復活させたものです。
25記事分はないのと、十分精査できていないのですが、ある程度参考になると思います（TODOなど残しています）。

## Web Components

昨年のアドベントカレンダーではReact Ariaをアクセシビリティの観点で見ていきました。WebサービスやWebサイトにおいてアクセシビリティを確保する上で、このようなライブラリや、これにUIなどの要素が加わったデザインシステムが重要な役割を果たします。日本だとfreeeやSmartHRなどの企業だったり、デジタル庁もデザインシステムを公開しています。しかし、多くのデザインシステムのコンポーネントはReactなどライブラリ・フレームワーク固有のものになってしまっていて、それを別のライブラリ・フレームワークを用いたプロジェクトで使おうとすると手間がかかってしまいます。

そこで、Web ComponentsというWebが標準で提供する機能を使うことで、ライブラリ・フレームワークに依存しないコンポーネントを作成することができるようになります。これにより、ライブラリ・フレームワークを用いることによるパフォーマンス的な懸念や相互運用性の問題を排除することができます。
実際、[Salesforce Lightning Design System](https://www.lightningdesignsystem.com/2e1ef8501/p/85bd85-lightning-design-system-2)や[Spectrum Web Components](https://opensource.adobe.com/spectrum-web-components/)などのデザインシステムではWeb Componentsが利用されていたり、[OpenUI Design System](https://github.com/openui/design-system)でもWeb Componentsを用いたデザインシステムの構築が検討されています。

ただ、現状Web Componentsは、一般的なWeb開発者がReactなどのライブラリ・フレームワークと同じような開発体験で触ることができるかというとそんなことは無く、まだ様々な辛さを抱えています。
そこで、今回のアドベントカレンダーではWeb Componentsが抱えているアクセシビリティ上の問題点を見ていき、今までいくつかの辛さがどのように解決されてきたのか・現在存在する辛さがどのように解決されようとしているのかを紹介します。

## 書かないこと

- Web Componentsの基本知識
- Web ComponentsのCSS関連の話
  - [🎨 CSS Advent Calendar: Day 16 / Hard Core Scoping of Standard | @sakupi01.com](https://blog.sakupi01.com/dev/articles/2025-css-advent-16/) をご覧ください
- UIに関係のないWeb標準
