---
title: "MarkuplintのPretendersと、jsx-a11yのconfigの話"
publishedDate: "Oct 9 2026"
---

今回はMarkuplintのPretenders機能と、それをESLintやOxlintのjsx-a11yのconfigでも利用可能にしてみた話です。

## MarkuplintのPretenders

[Markuplint](https://markuplint.dev/ja/)は[ゆうてんさん](https://x.com/cloud10designs)が開発している、マークアップ用のlinterです。
基本的なlintルールに加えて、HTML要素の親子関係が仕様に沿っているかどうかを検知できたり、セレクタを用いて細かくルールを制御したりすることが可能になっています。

Markuplintの設定の1つに、Pretendersという機能があります。

https://markuplint.dev/ja/docs/guides/beyond-html#pretenders

例えばReactで開発しているときに、以下のようなコードがあるとします。

```jsx
// List.jsx
function List({ children }) {
  return <ul>{children}</ul>;
}

// ListItem.jsx
function ListItem({ children }) {
  return <li>{children}</li>;
}

// Page.jsx
function Page() {
  return (
    <List>
      <ListItem>aaa</ListItem>
      <ListItem>bbb</ListItem>
      <ListItem>ccc</ListItem>
      <button>buttonだよ！</button>
    </List>
  );
}
```

このとき、`<ul>`要素の子として`<button>`要素が含まれることはHTML要素として許可されていません[^1]。ただ、何も設定をしていないとファイルを跨いでHTML要素の親子関係をチェックすることは困難です。

ここでPretenders機能が役に立ちます。以下のような設定をしてコンポーネントとそのコンポーネントのトップレベルで使われているHTML要素のマッピングを行うことで、上記のコードのような、他のファイルに配置されているコンポーネントとの親子関係もチェックできるようになります。

```json
{
  "pretenders": [
    {
      "selector": "List",
      "as": "ul"
    },
    {
      "selector": "ListItem",
      "as": "li"
    }
  ]
}
```

あるコンポーネントが、まるでそのHTML要素であるかのように振る舞うことから「Pretenders（偽装）」という機能の名前になっています。

このような機能は[eslint-plugin-jsx-a11y](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)にもあります。

[READMEのConfigurations](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#configurations)にあるように`components`プロパティを設定すると、[Component Mapping](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y#component-mapping)を定義できます。

```json
{
  "settings": {
    "jsx-a11y": {
      "polymorphicPropName": "as",
      "components": {
        "CityInput": "input",
        "CustomButton": "button",
        "MyButton": "button",
        "RoundButton": "button"
      },
      "attributes": {
        "for": ["htmlFor", "for"]
      }
    }
  }
}
```

これによってPretenders機能と同様に、コンポーネントとHTML要素のマッピングをできるようになっています。
これはOxlintに移植された際にも引き継がれており、[settings.jsx-a11y.components](https://oxc.rs/docs/guide/usage/linter/config-file-reference.html#settings-jsx-a11y-components)という設定項目で定義できます。

しかし、これではプロジェクト内の全てのコンポーネントとHTML要素のマッピングを手で書かないといけないという問題がありました。
Markuplintではこの手間を減らすため、「[動的スキャン](https://markuplint.dev/ja/docs/guides/beyond-html#pretenders-scan)」が（まだexperimentalですが）用意されています。
以下のように動的スキャンの対象にするディレクトリを記載することで、その中のコンポーネントとHTML要素のマッピングを自動で構成し、lint時に考慮してくれます。

```json
{
  "pretenders": {
    "scan": [
      {
        "files": "./src/components/**/*.tsx"
      }
    ]
  }
}
```

個人的に、HTML要素の親子関係のミスは開発の中でもある程度頻発しているイメージがあります。[axe](https://www.deque.com/axe/)や[Nu HTML Checker](https://validator.nu/)などを使って実ブラウザで確認可能ではあるのですが、実行するタイミングのDOM状態しかチェックできなかったり、実際にブラウザで確認するまで分からないというトレードオフがあります。そのため、静的にある程度網羅的に確認できて、さらに手動マッピングが不要になったのはとても便利です。

## jsx-a11yでも使いたい

※この記事では、eslint-plugin-jsx-a11yやそれをフォークしてflatConfig対応などのメンテが行われてる[eslint-plugin-jsx-a11y-x](https://github.com/eslint-community/eslint-plugin-jsx-a11y-x)、及びOxlintに移植された[jsx-a11yプラグインのルールたち](https://oxc.rs/docs/guide/usage/linter/rules.html?sort=name&dir=asc&scope=jsx_a11y)をまとめて「jsx-a11y」と呼びます。

こんな便利な機能は、jsx-a11yでも使いたくなります。
そこで、この動的スキャンの結果をjsx-a11yの`components`プロパティのフォーマットに自動で変換し、設定できるようなツールを作ってみました。

https://github.com/mehm8128/markuplint-pretenders-to-jsx-a11y-configs

コードはほとんどAIに書いてもらいました。
例えばOxlintで`jsx-a11y`のプラグインを入れていると、以下のように設定して動くようになっています。

```ts
// oxlint.config.ts
import { defineConfig } from "oxlint";

import { scanForJsxA11y } from "markuplint-pretenders-to-jsx-a11y-configs";

const { settings } = await scanForJsxA11y({
  files: ["src/components/**/*.tsx"],
});

export default defineConfig({
  plugins: ["react", "jsx-a11y"],
  rules: {
    "jsx-a11y/anchor-is-valid": "error",
    "jsx-a11y/control-has-associated-label": "error",
  },
  settings,
});
```

今回作ったツールから`scanForJsxA11y`という関数をimportし、`files`のパスを指定して実行すると、そのファイルたちをスキャンして`settings`を作ってくれるようになっています。

内部的には、Markuplintのパッケージである[`@markuplint/pretenders`](https://www.npmjs.com/package/@markuplint/pretenders)からimportした`scan`関数を使ってスキャンしています。

その他細かい使い方や制約などはREADMEに（AIが）書いているので、読んでみてください。[Biomeの設定](https://biomejs.dev/reference/configuration/)にはマッピングを設定するオプションが見当たらなかったので、Biomeは対応していません。

また、この`@markuplint/pretenders`を使って動的スキャン結果を出力する方法は、社内デザインシステムなどでも利用可能です。
普通に動的スキャンを使うと`node_modules`内のビルド済み成果物を参照するのは難しかったり、できたとしてもアップデートするまで結果が変わらないのに毎回スキャンするという無駄が発生します。そのため、社内デザインシステムなど外部パッケージに含まれているコンポーネントのマッピングを動的スキャンで生成する代わりに、`@markuplint/pretenders`を使ってデザインシステム側で動的スキャンした結果の出力ファイル（`pretenders.json`）をコンポーネントたちと一緒に配布することで、デザインシステムを使う側がそれを[`pretenders.data`](https://markuplint.dev/ja/docs/configuration/properties#pretenders/data)に渡すことができます。

さらに`pretenders.json`を本ツールの`convertPretendersToJsxA11ySettings`を通すことでjsx-a11yの設定形式に変換できるため、以下のようにアプリケーション側の動的スキャン結果とデザインシステム側の動的スキャン結果をマージすることで、両方のマッピングを登録できます。

```ts
import { defineConfig } from "oxlint";
import {
  convertPretendersToJsxA11ySettings,
  scanForJsxA11y,
} from "markuplint-pretenders-to-jsx-a11y-configs";
import pretenders from "design-system/pretenders.json" with { type: "json" };

const designSystem =
  convertPretendersToJsxA11ySettings(pretenders).settings["jsx-a11y"]
    .components;
const app = (await scanForJsxA11y({ files: ["src/components/**/*.tsx"] }))
  .settings["jsx-a11y"].components;

// コンポーネント名の重複があると上書きされてしまうので、検知用の警告
const conflicts = Object.keys(app).filter(
  (k) => k in designSystem && designSystem[k] !== app[k],
);
if (conflicts.length) console.warn("pretenders conflicts:", conflicts);

export default defineConfig({
  plugins: ["react", "jsx-a11y"],
  rules: {/* ... */},
  settings: { "jsx-a11y": { components: { ...designSystem, ...app } } },
});
```

ちなみに、Markuplintとjsx-a11yを併用可能なのは、Markuplintの公式FAQでも言及されています。

https://markuplint.dev/ja/docs/guides/faq#htmlhint%E3%82%84eslint-plugin-jsx-a11y%E3%81%A8%E4%BD%95%E3%81%8C%E9%81%95%E3%81%86%E3%81%AE

## まとめ

Pretendersの動的スキャンはまだexperimentalですが、とても有用なものなので積極的に使っていきたいです。

[^1]: [MDNの`<ul>`要素のページで](https://developer.mozilla.org/ja/docs/Web/HTML/Reference/Elements/ul#%E6%8A%80%E8%A1%93%E7%9A%84%E6%A6%82%E8%A6%81)、「許可されている内容: 0個以上の `<li>`, `<script>`, `<template>` 要素。」という記載がある。
