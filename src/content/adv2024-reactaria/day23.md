---
title: "Calendarについて"
publishedDate: "Dec 23 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 23 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は Calendar について書いていきます。

https://react-spectrum.adobe.com/react-aria/useCalendar.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function Calendar(props) {
  let { locale } = useLocale();
  let state = useCalendarState({
    ...props,
    locale,
    createCalendar,
  });

  let { calendarProps, prevButtonProps, nextButtonProps, title } = useCalendar(
    props,
    state
  );

  return (
    <div {...calendarProps} className="calendar">
      <div className="header">
        <h2>{title}</h2>
        <Button {...prevButtonProps}>&lt;</Button>
        <Button {...nextButtonProps}>&gt;</Button>
      </div>
      <CalendarGrid state={state} />
    </div>
  );
}
```

## 本題

### i18n

再び i18n です。
React Aria の Calendar には 2 種類あり、普通に選択する Calendar と、日付の範囲を選択する Calendar です。後者はホテル予約とかで見るやつです。
範囲選択でも、選択した範囲を示すのに適切なフォーマットにしたテキストをアナウンスする必要があるので、i18n が行われています。

そこで登場するのが`useDateFormatter`から得られる`DateFormatter`オブジェクトの`formatRange`メソッドです。これは内部で`Intl.DateTimeFormat`の`formatRange`メソッドを使っています。

`Intl.DateTimeFormat`の`formatRange`メソッドについてはこちらの記事をご覧ください。
https://zenn.dev/sajikix/articles/intl-advent-calendar-24-07#formatrange()-%E3%81%A8-formatrangetoparts()

日付の演算は独自の`CalendarDate`オブジェクトを利用するのですが、フォーマットについては Intl のメソッドを使う関係上、一度`Date`オブジェクトに変換してから渡すような実装になっているようです。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40internationalized/date/src/DateFormatter.ts#L40-L54

### 読み上げ

Calendar の操作について、補足説明的な読み上げがされたり、逆に冗長な読み上げを防ぐためにスキップされたりしています。

#### useCalendarGrid

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/calendar/src/useCalendarGrid.ts#L158-L162

Calendar のヘッダー（曜日の部分）は、スクリーンリーダーによる読み上げがされないようにしています。これによって、日付部分に素早く移動することができるようにしています。代わりに、各日付のボタンにフォーカスしたタイミングで「2024 年 12 月 23 日月曜日」のように、日付と一緒に曜日が読み上げられるようになっています。

#### useCalendarCell

`useRangeCalendar`で範囲選択が可能になっているとき、操作についての補足説明が読み上げられます。
`state.anchorDate`とは、選択されている開始日時です。開始日時が選択されているとき、他の日付にフォーカスすると日付情報と共に「クリックして日付範囲の選択を終了」と読み上げられます。
逆に、まだ開始日時を選択していないときには「クリックして日付範囲の選択を開始」と読み上げられます。
これらの説明は`aria-description`として付与されます。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/calendar/src/useCalendarCell.ts#L145-L156

ただ、スクリーンリーダーユーザー向けの読み上げなので、「クリックして」ではなくてキーボード操作を想定した読み上げにした方が良いのではと思いました（`useNumberField` のときのような翻訳ミスではなくて、`en-US`でも`"Click to start selecting date range"`などとなっています）。

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、 DnD についての記事です。お楽しみにー
