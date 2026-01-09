---
title: "命令的な ARIA ライブリージョン：ARIA Notifyの紹介"
publishedDate: "Jul 30 2025"
---

> [!warn]
> この記事は他サイトから移行したものです。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今回は新しく検討されている ARIA Notify API について紹介します。

https://blogs.windows.com/msedgedev/2025/05/05/creating-a-more-accessible-web-with-aria-notify/

## ARIA Notify とは

ARIA Notify とは、既存の ARIA ライブリージョンにおける問題点を基に検討されている、新しい API です。`document.ariaNotify()` のように命令的に呼び出すことで、スクリーンリーダーや点字ディスプレイなどの支援技術に情報を伝えることができます。
ただし、既存のライブリージョンを完全に置き換えるものではありません。本来の目的で利用されているライブリージョンはそのままで良く、意図しない用いられ方をしてしまっている部分で、より正確に支援技術に情報を通知するための API となっています。
現在は仕様の議論段階で、最低限の機能が入った API が Edge では 136 以降の Origin Trial もしくは feature flag を有効化した状態、Chrome では 140 以降で feature flag を有効化した状態で利用可能です。

以下が explainer で、本記事ではこれを上から順に追っていきます。

https://github.com/MicrosoftEdge/MSEdgeExplainers/blob/main/Accessibility/AriaNotify/explainer.md

## 背景

背景として、ライブリージョンにおける問題点が挙げられています。
ライブリージョンについては以下のページにまとまっています。

https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Guides/Live_regions

- スクリーンリーダーやブラウザによって、挙動やアウトプットが大きく異なり、一貫性がなかった
  - そもそも DOM が更新されたときに、それがちゃんとブラウザからスクリーンリーダーに伝わるかどうかなど
  - DOM が複雑だと、通知するテキストの計算方法に一貫性がなかったり
- `aria-live` の `assertive` と `polite` の挙動が明確に定義されておらず、スクリーンリーダーによって動作が異なっていた
- ライブリージョンには「視覚的な変化を通知する」という前提があるので DOM に結びついていなければならないが、DOM と結びつかない命令的な通知をしたい場合に、ハック的な実装が行われてしまうことがある
  - これは視覚的な役割を果たさないため、機能実装の修正時に追従が忘れられたり、いつの間にか壊れたりしがちとのこと
  - 例えば、[Button について - React Aria の実装読むぞ](https://zenn.dev/mehm8128/articles/adv2024-react-aria-button#ispending%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6) で紹介したような、[React Aria の LiveAnnouncer](https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/live-announcer/src/LiveAnnouncer.tsx) のような実装のことを表しているのだと思います

## 用例

- リッチテキストエディターで文字をハイライトしたり太くしたりするようなショートカットキーを押したときに、「選択した文字をハイライトしました」や「選択した文字を太くしました」のような通知を流すとき
- メールの送信に少し時間がかかった後、送信に失敗したことを通知するとき
- スプレッドシートで、セルの編集時に副作用として別のセルの値が変更されたとき

上 2 つは必ずしも DOM に結びつかない通知で、3 つ目は最初に編集したセルの DOM に紐づけた通知がしたい（explainer では「Secondary actions」として紹介されています）という用例です。

## 提案された解決策

前述の背景に対して、新しい命令的な API である `ariaNotify` が提案されました。これは命令的で、ユーザーが直接通知内容を引数に指定して JavaScript から実行する API なので、DOM の中身から通知内容を計算する必要がなく、前述のような一貫性を欠いた挙動を回避することができます。
この関数は `document.ariaNotify("text")` として呼び出すとドキュメントの lang 属性から言語が推測され、`document.querySelector("query").ariaNotify("text")` として呼び出すと、`querySelector` で取得した要素の最も近い祖先の lang 属性から言語が推測されます。

```js
// ドキュメントに関連した通知を送信する例
document.ariaNotify("John Doe is connected");

// 要素に関連した通知を送信する例
document
  .querySelector("#richEditRegion1")
  .ariaNotify("Selected text glowing blue");
```

### `priority` オプション

通知の読み上げ中に新しい通知が送信されたとき、優先順位付けをして通知を保留中キューに追加します。
基本的に優先順位付けはスクリーンリーダーが行いますが、`ariaNotify` を利用する側で明示的に以下の 2 つから優先度を指定することができます。

- `high`: 通知を高優先度通知キューの末尾に追加
- `normal`: 通知を全通知キューの末尾に追加

```js
// バックグラウンドタスクのステータスが更新されたことの通知（低～普通優先度）
document.ariaNotify("Background task completed", { priority: "normal" });

// データが消失した可能性があることを知らせる、高優先度の通知
document.ariaNotify("Unable to save changes, lost connection to server", {
  priority: "high",
});
```

これは `aria-live` 属性と似ていて、`priority: "high"` が `aria-live="assertive"` に、`priority: "normal"` が `aria-live="polite"` に該当します。

## iframe

iframe を使う親コンテンツは、iframe 内のドキュメントに対して `ariaNotify` で通知を追加することはできません。しかし、iframe 内のドキュメントが自分自身のコンテンツに対して `ariaNotify` することができます。
それゆえ、iframe 内コンテンツの通知が過剰で禁止したい場合は、親コンテンツが iframe の `allow` 属性や `Permissions-Policy` などを用いてオプトアウトすることができます。

## 未解決の問題

`ariaNotify` によって二重通知や冗長な通知が発生する可能性があります。さらには、Web サイト側が支援技術ユーザーのみ弾くために `ariaNotify` を（たくさん通知を送信するなどして）悪用する可能性があることが懸念されています。

その対策として、[UserActivation](https://developer.mozilla.org/ja/docs/Web/API/UserActivation) が利用できるということが書かれています。
[Features gated by user activation - Security](https://developer.mozilla.org/en-US/docs/Web/Security/User_activation) に記載のある API は既にこの仕組みを利用して、対策を行っているものです。

## 今後の検討事項

現在は提供されていないが、検討中で今後サポートされる可能性のある機能について紹介されています。

### 点字と音声マークアップ

`braille` オプションで、点字ディスプレイに対する通知を別で指定することができます。
例えば商品の評価を表す「星 3 つ」を、点字ディスプレイでより簡潔に表すために、「\*」を使って以下のように表現できます。

```js
document.ariaNotify("3 stars", { braille: "***" });
```

これは WAI-ARIA 1.3 から入る [aria-braillelabel 属性](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Reference/Attributes/aria-braillelabel) と似ています。

また、`SSML`オプションで読み上げられ方をより細かく指定できます。

SSML とは Speech Synthesis Markup Language（音声合成マークアップ言語）の略で、「ピッチ、発音、読み上げ速度、音量などのテキスト読み上げの出力属性を微調整するために使用できる XML ベースのマークアップ言語」とのことです。

https://learn.microsoft.com/ja-jp/azure/ai-services/speech-service/speech-synthesis-markup

例えば、「911」を「きゅーひゃくじゅーいち」ではなくて「きゅー、いち、いち」と発音させたい場合に、以下のように `interpret-as="digits"` と指定することで、1 桁ずつ読み上げてくれるそうです。

```js
document.ariaNotify("911", { SSML: '<say-as interpret-as="digits">911' });
```

### `interrupt` オプション

これは `priority` と少し似ていてややこしいです。別のテキストの読み上げ中に `ariaNotify` で送信されたテキストがどのように割り込むかを指定するオプションです。`priority` は保留中キューに入っている他の通知との優先順位を指定しするものだったのですが、今回は読み上げ中に割り込むかどうかなどを指定するものです。

オプションを記載しますが、簡略化すると正確性に欠けてしまうため、ほぼ直訳になっています。また、`all` と `pending` の違いは太字の部分です。

- `none`
  - 何も中断せず、保留中（キューにある）の通知の削除もしない
- `all`
  - ステップ 1. 同じソース・`priority`・`interrupt` を持つ通知が読み上げられているときは、**その読み上げを直ちに中断する**
  - ステップ 2. 同じソース・`priority`・`interrupt` を持つ保留中の通知があるときは、それらを全て削除する
  - ステップ 3. `priority` に応じて通知をキューに追加する
- `pending`
  - ステップ 1. 同じソース・`priority`・`interrupt` を持つ通知が読み上げられているときは、**その読み上げが終了するまで待つ**
  - ステップ 2. 同じソース・`priority`・`interrupt` を持つ保留中の通知があるときは、それらを全て削除する
  - ステップ 3. `priority` に応じて通知をキューに追加する

「ソース」はおそらく `ariaNotify` を呼ぶときに指定したドキュメントや要素のことです（原文で "source"）。

提示されているサンプルコードを見ると分かりやすいので、見ていきます。1％から 100％までの進捗状況が順に読み上げられる例です（おそらく `while` などで回すことが想定されています）。

`interrupt: "all"` の例です。この場合、前のパーセントの読み上げが終わっていなくても、次の読み上げが始まったら読み上げ中の通知が中断され、新しい読み上げが優先されます。
つまり、進捗状況の進む速度が速い場合、「Progress is 100」以外はほとんど聞こえないことになります。

```js
let percent = 0;
function simulateProgress() {
  percent += 1;
  updateProgressBarVisual(percent);
  document
    .querySelector("#progressBar")
    .ariaNotify(`Progress is ${currentValue}`, {
      priority: "normal",
      interrupt: "all",
    });
}

if (percent < 100) {
  setTimeout(simulateProgress, 100);
}
```

`interrupt: "pending"` の例です。この場合、読み上げ中の通知は全て読み上げられるので、「Progress is 1」は確実に読み上げられます。しかし、次の通知が送信されたタイミングでキューは全て削除されるので、1 の読み上げ中に 2 ～ 4 が送信された場合、2 ～ 3 の通知は削除され、次に読み上げられるのは「Progress is 4」となります。そして、最後は「Progress is 100」が読み上げられます。

```js
let percent = 0;
function simulateProgress() {
  percent += 1;
  updateProgressBarVisual(percent);
  document
    .querySelector("#progressBar")
    .ariaNotify(`Progress is ${currentValue}`, {
      priority: "normal",
      interrupt: "pending",
    });
}

if (percent < 100) {
  setTimeout(simulateProgress, 100);
}
```

### `type` オプション

まだ謎が多いオプションです。少し前までは `notificationId` と呼ばれていたようです。

`type` というオプション、もしくは第二引数に直接文字列を渡すと、通知に対して追加のコンテキストを付与できます。

例えば以下のサンプルコードだと、`"task-progress-started"` や `"task-progress-finished"` で追加のコンテキストを与えています。

```js
document.ariaNotify(
  "Uploading file untitled-1 to the cloud.",
  "task-progress-started"
);

myfile.asyncFileUpload().then(() => {
  document.ariaNotify("File untitled-1 uploaded.", {
    type: "task-progress-finished",
  });
});
```

スクリーンリーダーでは、このコンテキストに対してフィルタリングしたり、優先順位の高い通知のみ通知するといったことができるようになります（既になっているのか、今後そうしたい話なのかは不明です）。
例えば上記の例で「`type: "task-progress-finished"` の通知は通知しない」のようなフィルタリングが適用できるという話です。

同様にこの `type` を用いて、点字で出力する指示や、ビープ音を出力するような指示など、様々なカスタマイズができるとのことです。

これについては、事前に `type` のプリセットを定義しておくべきなのかという議論もあるようです。

## 参考（になりそうな）資料

- [Add ariaNotify draft by janewman · Pull Request #2577 · w3c/aria](https://github.com/w3c/aria/pull/2577)
- [add arianotify draft by keithamus · Pull Request #2211 · w3c/aria](https://github.com/w3c/aria/pull/2211)
  - 上の PR の元となった PR
- [Issues · w3c/aria](https://github.com/w3c/aria/issues?q=is%3Aissue%20%22ariaNotify%22%20in%3Atitle)
- [ARIA-Notify Breakout Session 2025 – 26 March 2025](https://www.w3.org/2025/03/26-aria-minutes.html)
  - スライドへのリンクがあります
- [Review request for AriaNotify API · Issue #1075 · w3ctag/design-reviews](https://github.com/w3ctag/design-reviews/issues/1075)
- [ARIA Notification Proposal Discussion Points · w3c/aria · Discussion #1958](https://github.com/w3c/aria/discussions/1958)
- [ariaNotify Design Doc - Google ドキュメント](https://docs.google.com/document/d/1tFT-4_sDvgnZoS8AYEcQquXzqAYaoB53DBH0C2T5rMk/edit?tab=t.0#heading=h.8a9jnxl3wfhe)
- [Intent to Ship: ARIA Notify API](https://groups.google.com/a/chromium.org/g/blink-dev/c/QCtWzIPgcCY/m/RSuXobocDAAJ)
