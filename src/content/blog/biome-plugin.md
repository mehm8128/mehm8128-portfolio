---
title: "BiomeのPluginについて"
publishedDate: "Feb 02 2025"
---

> [!warn]
> この記事は他サイトから移行したものです。

こんにちは、mehm8128 です。
最近、[Roadmap 2025 and Biome 2.0 | Biome](https://biomejs.dev/ja/blog/roadmap-2025/)が公開されました。
その中でも一番気になっているのはやはりプラグイン機能です。そこで、RFC を簡単にまとめて寄り道などしながら、Biome のプラグインについて理解している範囲で紹介します。
間違いなどありましたらコメント欄にて教えていただけると助かります。

## Biome のプラグイン

そもそも Biome のプラグインとは、ESLint のプラグイン機能のように、Biome 自体が提供している lint ルール以外にもユーザーが独自のルールを作成できるようにするものです（format に関してもサポートされる可能性があります）。
RFC は以下の discussion で提案されています。
https://github.com/biomejs/biome/discussions/1762

issue はこちら。
https://github.com/biomejs/biome/issues/2463

Biome のプラグインには主に GritQL というクエリ言語が利用されます。これについて、次のセクションから見ていきます。

## GritQL

GritQL とは、クエリを用いてマッチするソースコードを取得したり、マッチしたソースコードに対して変換処理を施したりすることができるツールです。

https://docs.grit.io/

例えば RFC に書かれている例だと、以下のようなクエリです。

```js
`$path && $path()` => `$path?.()`
```

このクエリを`foo.bar && foo.bar()`というソースコードに適用すると、`foo.bar?.()`に変換することができます。また、単純な文字列を見てマッチさせるのではなく、AST に基づいてマッチさせているため、シングルクォートかダブルクォートかを考慮せずにマッチさせることや、トリビアを無視してマッチさせることもできます。

なぜ GritQL が選ばれたのかという点については、「Alternatives Considered」のセクションに他の言語との比較が書かれているので気になる人は読んでみてください。

### 文法

RFC で紹介されている、[`noImplicitBoolean`](https://biomejs.dev/ja/linter/rules/no-implicit-boolean/)のルールを GritQL で書いた例に基づいて、GritQL の文法を軽く解説してみます。
チュートリアルも適宜参照してください。

https://docs.grit.io/tutorials/gritql

一応先に説明しておくと、`noImplicitBoolean`は`<input disabled />`を`<input disabled={true} />`に直すようなルールです。

```js
or {
    `<$component $attrs />`,
    `<$component $attrs>$...</$component>`
} where {
    $attrs <: some $attr => diagnostic(
      message = "Use explicit boolean values for boolean JSX props.",
      fixer = `$attr={true}`,
      fixerDescription = "Add explicit `true` literal for this attribute",
      category = "quickFix",
      applicability = "always"
    ) where $attr <: r"[\w-]+"
}
```

外側の枠から説明します。`where`は SQL のように、マッチさせる条件を追加してフィルタリングさせることができます。
今回の例だと`or`の中に子要素を持つ`component`と持たない`component`が指定されているので、そのどちらかにマッチしたとき、`where`の条件でより細かいフィルタリングを行ったり、前の例で出てきた`=>`を用いて変換処理を施すことができます。

次に`where`の中身です。
`$attrs`で取得したものの中で`where $attr <: r"[\w-]+"`なものを`$attr`とし、それに対して`diagnostic`を適用します。`r""`は正規表現です。今回の正規表現に`=`は含まれないので、属性値を含まなかったら、つまり`implicit boolean`を含んでいたら`diagnostic`を適用します。
`some`は`$attr`のどれか 1 つでも条件にマッチしているかどうかを見るので、これが真だと今回のクエリ全体も真になり、今回のルールがマッチするということになります。

ちなみに構文はここらへんにまとまっています。
https://docs.grit.io/language/syntax

`diagnostic`は独自で定義するものなので、`diagnostic`の変換部分（`$attr={true}`に変換する部分）のみ抜き出すと以下のようになります。

```js
`<$component $attrs />` where {
    $attrs <: some $attr => `$attr={true}` where {
            $attr <: r"[\w-]+"
        }
}
```

これを https://app.grit.io/studio で以下の JSX に対して施すと、2 つ目の`disabled`が`disabled={true}`に変換されることが確認できます（言語は JavaScript/TypeScript のままでいけます）。

```jsx
<input disabled={true} disabled />
```

今回は紹介していないですが、AST を見たマッチング処理も行うことができるので、柔軟なマッチングが可能なようです。
https://docs.grit.io/language/patterns#syntax-tree-ast-nodes

### biome search

Biome には（experimental ではありますが）既に GritQL でコードを検索できるコマンドがあります。v1.9 で追加された`biome search`コマンドです。
[CLI | Biome -- biome search](https://biomejs.dev/reference/cli/#biome-search)
[Blog | Biome -- Search command](https://biomejs.dev/blog/#search-command)

例えば以下のような JS のコードに対して、上のブログ記事で紹介されているコマンドを少し変えたコマンドを叩いてみます。

```js
console.log("aaa");
console.warn("bbb");
```

```
npx biome search '`console.$method($args)` where { !$method <: or {`log`, `info`} }'
```

`!`をつけたので、`$method`が`log`もしくは`info`でないものが取れるはずです。
手元の適当なプロジェクトのコードに適当に追加して叩いた結果が以下です。

```bash
npx biome search '`console.$method($args)` where {!$method <: or {`log`, `info`}}'
src/app/_component/Component.tsx:7:2 search ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

  7 │   console.warn('bbb')

Searched 8 files in 9ms. Found 1 match.
```

無事、`console.warn`だけ取得できました。

まだ rewrites ができないので auto-fix はできないのですが、決めたルールに違反するコードを検出し、エラーを吐かせるだけならある程度試すことができるようになっています。

## JS/TS plugins

今まで GritQL を見てきましたが、そうは言っても今まで ESLint の独自ルールを JavaScript で書いてきたユーザーにとっては JavaScript で書きたいという人も多いと思います。
パフォーマンス上の懸念点が大きいことから、GritQL での実装を優先的に行ってほしいということや、人気のあるようなルールはプラグインではなくて本体に統合する可能性があるということを示しつつ、JavaScript/TypeScript を用いた独自ルールの作成方法も提案されています。

例として挙げられているコードをほぼそのまま掲載します。

```js
import Biome, { transform, into } from "$biome-plugin";

Biome.traversal.onEnter({ kind: "JsxAttribute" }, (attr) => {
  if (attr.initializer == null) {
    Biome.linter.reportDiagnostic({
      message: "Use explicit boolean values for boolean JSX props.",
      fixer: () => transform(attr, into`${attr}={true}`),
      fixerDescription: "Add explicit `true` literal for this attribute",
      category: "quickFix",
      applicability: "always",
    });
  }
});
```

これは先ほどの`noImplicitBoolean`ルールを JS で書いたものです。
`attr.initializer`が`null`な`JsxAttribute`を取得し、`transform`を用いて変換しています。
この`transform`関数がポイントで、変換処理をこの関数に渡すことで、変換処理自体は Rust 側で行うことができるとのことです。

また、JS を使いつつ、GritQL を用いてマッチングするような、より柔軟な例も提示されています。

```js
import Biome, { grit, transform, into } from "$biome-plugin";

Biome.traversal.onQuery(
  grit`if ($cond) { $consequent } else { $alternative }`,
  {
    where: {
      alternative: grit`if ($cond2) { $consequent2 } else { $alternative2 }`,
    },
  },
  (node, { cond, cond2, consequent, consequent2, alternative2 }) => {
    transform(
      node,
      into`if (${cond}) {
      ${consequent}
    } else if (${cond2}) {
      ${consequent2}
    } else {
      ${alternative}
    }`
    );
  }
);
```

`grit`関数で GritQL のクエリを指定し、それを JS 側で用いているので、JS で行いたい処理がある場合に JS の利点と GritQL の利点を両方残しながらマッチング・変換処理を行うことができます。

### formatter

GritQL の formatter の開発が進んでいます。これはおそらく、前述の GritQL と JS のハイブリッドパターンを記述するときにクエリ部分もフォーマットできると便利だから進められているのかな、と考えています。

https://github.com/biomejs/biome/issues/2476

## まとめ

実はエンジンの話も書いてあったのですが詳しくないのでスルーしました。
より詳しく知りたい人は RFC を読んでみたり、Discord 上でも議論が行われているので覗いてみるといいかもしれません（チャンネル名などは RFC 内で紹介されています）。
