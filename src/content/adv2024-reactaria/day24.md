---
title: "DnDについて"
publishedDate: "Dec 24 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 24 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は DnD について書いていきます。

## 本題

### DnD

React Aria では Drag and Drop (DnD)の a11y 対応も行われています。
それがこれらのページにまとめられています。

https://react-spectrum.adobe.com/react-aria/dnd.html
https://react-spectrum.adobe.com/blog/drag-and-drop.html

DnD はマウスやタッチによる操作を前提としているように思われるかもしれませんが、DnD によって行いたい操作を、同様の異なる操作によって実現できていれば問題ありません。そこで、React Aria ではキーボード操作によって DnD と同様の操作、つまりアイテムの移動ができるようになっています。また、初めてそのサービスを使うユーザーにとってはそのキーボード操作方法が分からない可能性もあるということで、アナウンスによる操作方法の補足説明も行われます。

DnD は主に[`useDrag`](https://react-spectrum.adobe.com/react-aria/useDrag.html)と[`useDrop`](https://react-spectrum.adobe.com/react-aria/useDrop.html)を用いて連携させることによって実現できます。ドラッグできるアイテム（drag source）に`useDrag`、ドロップできる箇所（drop target）に`useDrop`を用います。

また、ListBox や GridList などのリスト内で用いるには[`useDraggableCollection`](https://react-spectrum.adobe.com/react-aria/useDraggableCollection.html)や[`useDroppableCollection`](https://react-spectrum.adobe.com/react-aria/useDroppableCollection.html)を使います。
しかし、例えばファイルアップロードなどといった外部アプリケーションと連携するような DnD 操作を考えてみます。マウスによって DnD を行うことができるユーザーであれば DropZone のようなものを用意しておくことで DnD が可能ですが、キーボード操作しか行うことのできないユーザーはこれを用いることができません（`useDrag`などは実装している Web アプリ内で完結してしまう機能であるため）。これらを実現可能にするために、[`useClipboard`](https://react-spectrum.adobe.com/react-aria/useClipboard.html)という hook も提供されています。これは内部で[Clipboard API - Web APIs | MDN](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API)を使用していて、外部アプリケーションとも連携可能になります。

Clipboard API については、最近会社の先輩が記事を出していたので興味のある方は読んでみてください。
https://zenn.dev/cybozu_frontend/articles/d2782f5ad615f0
https://zenn.dev/cybozu_frontend/articles/46a7223f3b48f1

それでは実装を見ていきましょう。

`DragSession`というオブジェクトでドラッグ中のキーボード操作の listener 登録や、それに伴うスクリーンリーダー用アナウンスが設定されています。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/DragManager.ts#L157-L589

そして`DragSession`は`useDrag`内の`startDragging`関数内で初期化されています。アナウンステキストの翻訳用の`stringFomatter`もここで渡されています。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/useDrag.ts#L263-L275
https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/DragManager.ts#L67-L85

アナウンステキストをいくつか見ていきます。
`useDrag`内では drag source に対するラベルのみ付与しています。例えばキーボード操作でフォーカスした場合（`modality === 'keyboard'`の場合）（以降アナウンスの例はこの場合のテキストを紹介します）、「Enter キーを押してドラッグを開始してください。」「ドラッグしています。Enter キーを押してドラッグをキャンセルします。」というテキストが accessible description に与えられます。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/useDrag.ts#L280-L283

上記の`beginDragging`関数内で実行される`setup`メソッドで、ドラッグが開始されたときに「ドラッグを開始します。Tab キーを押してドロップターゲットに移動し、Enter キーを押してドロップするか、Esc キーを押してキャンセルします。」などのアナウンスをします。
https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/DragManager.ts#L183-L201

次に`useDropIndicator`を見ていきます。これは、ドラッグ中にリストのアイテムとアイテムの間に表示されるバーのようなものです。最初に紹介したブログ記事のデモでも体験できます。

これは`button`role になっているのですが、リスト内でリストアイテム以外の要素が出てくることは通常ないので、[`aria-roledescription`](https://developer.mozilla.org/ja/docs/Web/Accessibility/ARIA/Roles/application_role#aria-roledescription)に「ドロップインジケーター」というテキストが指定され、役割が明確にされています。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/useDropIndicator.ts#L106

この Indicator にもアナウンス対応がされていて、矢印キーなどでフォーカスを移動したときに「{beforeItemText} と {afterItemText} の間に挿入」（プレイスホルダーにはアイテムのラベルが入る）などのアナウンスがされます。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/dnd/src/useDropIndicator.ts#L84-L97

DnD は実装が重く、色々な実現方法があると考えられることもあり、先に RFC が出されていました。今回は要約などはしないので紹介だけしておきます。
[https://github.com/adobe/react-spectrum/blob/main/rfcs/2020-v3-dnd.md](https://github.com/adobe/react-spectrum/blob/main/rfcs/2020-v3-dnd.md)

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、まとめの記事です。お楽しみにー
