---
title: "`nameFrom: heading`とsectionheader/sectionfooterについて"
publishedDate: "Jul 21 2025"
---

> [!warn]
> この記事は他サイトから移行したものです。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今回は、W3C で進行中の `nameFrom: heading` 及び、`sectionheader` role と `sectionfooter` role について、まとめます。

## nameFrom: heading

まずは `nameFrom: heading` から見ていきます。

### `nameFrom` 復習

`nameFrom`とは、WAI-ARIA role がそれぞれ持っている、何を基にして accessible name を計算するかというプロパティです。
author、contents、prohibited の 3 種類があり、例えば button role であれば author と contents を持っているので、aria-label など明示的なマークアップによって指定されていればそれを accessible name として採用し、それらがなければ子要素のテキストから計算されて採用されます。
詳しくは過去の記事や accname-1.2 などを参照してください。

https://zenn.dev/mehm8128/articles/accessible-name-and-description-computation-1-2#add-name-from-prohibited
https://www.w3.org/TR/accname-1.2/#mapping_additional_nd

### `nameFrom: heading` とは

では `nameFrom: heading` に入ります。`nameFrom: heading` を持つ role の要素は、子孫の heading role の要素から accessible name を計算することができます。具体的には、以下のような感じです。

```html
<article>
  <h1>記事のタイトル</h1>
  <p>記事の内容</p>
</article>
```

今回の変更では article role が `nameFrom: heading` を持つようになるため、`<article>` 要素のこの場合 `<article>` 要素の accessible name は「記事のタイトル」となります。つまり、今までは以下のように `aria-labelledby` などを用いて見出しを紐づけなければ accessible name を付けられなかったのが、自動で計算されるようになります。

```html
<article aria-labelledby="heading-id">
  <h1 id="heading-id">記事のタイトル</h1>
  <p>記事の内容</p>
</article>
```

W3C に出ている issue や PR はこちらです。
https://github.com/w3c/accname/issues/138
https://github.com/w3c/aria/pull/1860

元々は、`<article>` 要素を [VoiceOver の rotor 機能](https://support.apple.com/ja-jp/guide/voiceover/mchlp2719/mac) で順に読み上げていったときに、見出しが accessible name として紐づけられていないと「記事」「記事」「記事」のようにしか読み上げられず、中身を確認するのが大変だったという背景があり、今回の `nameFrom: heading` が提案されました。

自動で acccessible name をつけるようにすると、意図しない計算のしかたがされてしまったり、パフォーマンス的に問題が発生したりする可能性が議論されましたが、既存の `<table>` 要素に対する `<caption>` 要素が自動で accessible name をつけているという事実が挙げられたり、その後の議論で後述のように計算方法を議論したりすることで一段落しました。また、`nameFrom: contents` と同様、`nameFrom: author` の方が優先度高く計算されます。

また、どの role に `nameFrom: heading` をつけるかという議論もありましたが、最終的に以下の 3 つに付与されることになりました。

- alertdialog
- article
- dialog

complementary role と region role についても検討されていましたが、`<aside>` 要素が場合によって complementary role である場合と、より一般的な region などの role である場合があるので、一旦削除されて別で議論されることになりました。

https://www.w3.org/TR/wai-aria-1.2/#complementary

また、form role についても検討されていましたが、全ての form role に accessible name が必要なわけではないことから削除されました。

### DFS vs IDDFS

子孫の heading role から accessible name を計算する方法について、Depth-First Search (DFS) と Iterative Deepening Depth-First Search (IDDFS) の 2 通りの案が出ていて議論になりました。

以下の HTML があったときに、DFS だと深さ優先探索なので「見出し 1」が accessible name になりますが、IDDFS だと幅優先探索のような順序になり、「見出し 2」が accsible name になります。

```html
<article>
  <div>
    <h1>見出し1</h1>
  </div>
  <h2>見出し2</h2>
</article>
```

このとき、直感的には「見出し 1」が accessible name になってほしいのですが、パフォーマンスの観点だと IDDFS の方が効率的ということで、議論になっていました。
結果、パフォーマンスの考慮に入れつつではありますが、DFS の方を採用することになりました。
以下の PR や issue で議論されていました。

https://github.com/w3c/aria/pull/1018
https://github.com/w3c/accname/issues/182
https://www.w3.org/2024/03/07-aria-minutes.html#t06

具体的にどのような HTML でどの accessible name が取得できるかは、以下の wpt のテストケースで確認できます。
https://github.com/web-platform-tests/wpt/pull/50507

### 実装状況

WebKit では既に実装が完了しているので、見てみます。

https://webkit.org/b/257186
https://github.com/WebKit/WebKit/pull/43080

`Source/WebCore/accessibility/AccessibilityNodeObject.cpp`が本質部分です。
https://github.com/WebKit/WebKit/pull/43080/files#diff-42aca3f63fec39c596806d35d905f1850bf09a4331a00845d755a4eac3bfcb2a

cpp ほとんど書いたことないなりに読み解いたのでコメントつけてみました。

```cpp
if (accessibleNameDerivesFromHeading()) { // nameFrom: heading を持つロールかの確認
      CheckedPtr cache = axObjectCache();
      if (auto* containerNode = dynamicDowncast<ContainerNode>(node); containerNode && cache) { // node を ContainerNode として cast する
          for (auto& element : descendantsOfType<Element>(*containerNode)) { // containerNode の子孫要素を element として、for で回す
              if (auto* descendantObject = cache->getOrCreate(element); descendantObject && descendantObject->isHeading()) { // element を変換して descendantObject にし、それが heading role であるか確認
                  TextUnderElementMode mode;
                  mode.includeFocusableContent = true;
                  String nameFromHeading = descendantObject->textUnderElement(mode); // descendantObject のテキストを取得
                  if (!nameFromHeading.isEmpty()) // テキストが空でない場合
                      textOrder.append(AccessibilityText(nameFromHeading, AccessibilityTextSource::Heading)); accessible name として追加
              }
          }
      }
  }
```

おそらく `descendantsOfType` で上の要素から順番に見ていくようになっているので DFS pre-order traversal になっているということなのだと思いますが、その実装箇所を見つけられませんでした。

## sectionheader role と sectionfooter role

次は sectionheader role と sectionfooter role について見ていきます。

今まで `<header>` 要素及び `<footer>` 要素は、`<body>` の子要素などで使う場合には banner role 及び contentinfo role になっていましたが、`<article>` や `<aside>`、`<nav>`、`<section>`、`<main>` 要素の子孫である場合には、それらの role が割り当てられず、generic role になってしまっていました。しかし、せっかくセマンティックなマークアップをしているので、そのような場合にもスクリーンリーダーに対して role を公開するべきではないかという提案から、今回新しく sectionheader role と sectionfooter role が追加されました。

以下、HTML のコード例です。これをそのまま`index.html`などで保存すれば Chrome で確認できます。

sectionheader role になる例

```html
<article>
  <header>記事のタイトル</header>
  <p>記事の内容</p>
</article>
```

banner role になる例

```html
<body>
  <header>サイトのタイトル</header>
  <p>サイトの内容</p>
</body>
```

banner role や contentinfo role ではなくて新しく別のロールを設ける理由の記述は見つけられませんでした~~が、おそらく landmark role として公開したくないからだと思われます~~。単純に、body 直下のグローバルなヘッダー・フッターと、それ以外の、article などに対するローカルなヘッダー・フッターを別のセマンティクスとして扱いたいから、というアドバイスをいただきました（それはそうでした）。

issue と PR はこちらです。
https://github.com/w3c/aria/issues/1915
https://github.com/w3c/aria/pull/1931

関連 issue・PR はここらへん。

https://github.com/w3c/html-aam/issues/585
https://github.com/w3c/aria/pull/2543
https://github.com/w3c/aria/pull/2551

元 issue で挙げられている `hgroup` の話については、この記事の話だと思われます。
https://blog.w0s.jp/entry/682

また、今は `<main>` など上で挙げた HTML 要素の子孫である場合の話でしたが、それらの要素に相当する role の要素の子孫である場合にどうなるかという議論が別で行われています。

https://github.com/w3c/html-aam/issues/586

### 実装

WebKit と Blink で既に実装されています。
また、スクリーンリーダーへの修正もあったので、NVDA を見ていきます。

#### WebKit

https://bugs.webkit.org/show_bug.cgi?id=273325
https://github.com/WebKit/WebKit/pull/46361

`Source/WebCore/accessibility/AccessibilityNodeObject.cpp` が本質部分です。

header では `AccessibilityRole::Generic` が `AccessibilityRole::SectionHeader` になり、footer では `AccessibilityRole::Footer` が `AccessibilityRole::SectionFooter` になっています。footer が元々 `AccessibilityRole::Footer` だったのは、[コメントに貼られている読み上げの問題](https://bugs.webkit.org/show_bug.cgi?id=190138) への対応で内部の role を用意する必要が出てきたようです。
ちなみに、471 行目で「**Footer** elements should be role="banner"」と書いてあるのはおそらく「**Header** elements should be role="banner"」のミスなので、注意が必要です。

#### Blink

https://issues.chromium.org/issues/337094897
https://chromium-review.googlesource.com/5709272

多分本質部分は `third_party/blink/renderer/modules/accessibility/ax_object.cc` です。

`kHeaderAsNonLandmark` が `kSectionHeader` に、`kFooterAsNonLandmark` が`kSectionFooter` になっています。

### NVDA

今回の変更に伴い、NVDA で sectionheader role や sectionfooter role が "grouping" と読み上げられていたのが、banner role や contentinfo role のときと同じように "header"、"footer" と読み上げられるように修正されました。

**が、上手く動かなかったようで一旦 PR が Close されてしまいました。**

https://github.com/nvaccess/nvda/issues/18186
https://github.com/nvaccess/nvda/pull/18217

~~実装量は少ないですが、`"container-tag" not in obj.IA2Attributes` の部分が分からなかったので少し調べてみました。~~

~~`"container-tag"` について、`"container"` という文字列は `PRESCAT_LAYOUT="container"` として定義されている箇所があります。
https://github.com/nvaccess/nvda/blob/13cb733684960127c58c33a013abbb2d1b88bb8c/source/textInfos/\_\_init\_\_.py#L61-L62~~

~~また、`getPresentationCategory` という関数で `role == controlTypes.Role.LANDMARK or self.get("landmark")` のときに `PRESCAT_LAYOUT` を返すような実装になっています。~~
~~https://github.com/nvaccess/nvda/blob/13cb733684960127c58c33a013abbb2d1b88bb8c/source/textInfos/\_\_init\_\_.py#L144-L152~~

~~よって、`container` ではないとき（≒landmark ではないとき）に、`Groupbox` を `remove` しているという解釈に至ったのですが、`container-tag`ではなくて `container` を見ていることや、`obj.IA2Attributes` の実態が分かっていないことなどから本当のところは分かりません（NVDA のコード内で他に`container-tag`がありませんでした）。知っている方は教えていただきたいです。~~

ちなみに、過去に aria-errormessage の読み上げをサポートしたときの PR を読んでみたときのスクラップもあります。
https://zenn.dev/mehm8128/scraps/b04c726be1feb1

## まとめ

W3C のリポジトリは最近まで全然追っていなかったのですが、最近は a11y 関連のリポジトリを watch し、GitHub の通知欄を埋めています。
今後も a11y 関連の話題に着目していきたいと思います。
