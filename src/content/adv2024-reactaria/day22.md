---
title: "DateFieldについて"
publishedDate: "Dec 22 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 22 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は DateField について書いていきます。

https://react-spectrum.adobe.com/react-aria/useDateField.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
export function DateField(props) {
  let { locale } = useLocale();
  let state = useDateFieldState({
    ...props,
    locale,
    createCalendar,
  });

  let ref = React.useRef(null);
  let { labelProps, fieldProps } = useDateField(props, state, ref);

  return (
    <div className="wrapper">
      <span {...labelProps}>{props.label}</span>
      <div {...fieldProps} ref={ref} className="field">
        {state.segments.map((segment, i) => (
          <DateSegment key={i} segment={segment} state={state} />
        ))}
        {state.isInvalid && <span aria-hidden="true">🚫</span>}
      </div>
    </div>
  );
}

function DateSegment({ segment, state }) {
  let ref = React.useRef(null);
  let { segmentProps } = useDateSegment(segment, state, ref);

  return (
    <div
      {...segmentProps}
      ref={ref}
      className={`segment ${segment.isPlaceholder ? "placeholder" : ""}`}
    >
      {segment.text}
    </div>
  );
}
```

## 本題

### i18n

フォーマットについては昨日の記事で紹介したのですが、Intl 以外の観点で見ていきます。

React Aria では`CalendarDate` オブジェクトという、`Date`オブジェクトを wrap しているのではなくて完全に独自実装をしている日付用オブジェクトを用意しています。これは Temporal に inspire されているらしく、日付の演算やその他便利なメソッドが用意されています。

> Rather than wrapping a Date object and providing an API on top, it implements all date arithmetic and utilities from scratch.

公式のサンプルコードもそのまま載せておきます。

```ts
import { CalendarDate } from "@internationalized/date";

let date = new CalendarDate(2022, 2, 3);
date = date.add({ years: 1, months: 1, days: 1 });
date.toString(); // '2023-03-04'
```

https://react-spectrum.adobe.com/blog/date-and-time-pickers-for-all.html

`CalendarDate`オブジェクトのいくつかの利点を見ていきます。

`Intl.datetimeformat` は複数の暦のフォーマットをサポートしているのですが、`Date` オブジェクトはグレゴリオ暦のみサポートしているので、演算結果を別の暦で表示しようとすると正しく表示されないという問題があります。
よって、`CalendarDate` オブジェクトを用いて別の暦に変換できるようにしているとのことです。
サンプルコードをそのまま引用しておきます。

```ts
import {
  GregorianCalendar,
  HebrewCalendar,
  toCalendar,
} from "@internationalized/date";

let hebrewDate = new CalendarDate(new HebrewCalendar(), 5781, 1, 1);
let gregorianDate = toCalendar(hebrewDate, new GregorianCalendar());
gregorianDate.toString();
// => '2020-09-19'
```

その他、1 週間が何曜日に終わるかや何曜日が休日か、またタイムゾーンとかサマータイムなどの面倒も見てくれていて、様々なユーティリティ関数が提供されています。

### useDateSegment

`useDateSegment`は年、月、日などのそれぞれの入力欄用の hook です。
この中で`useSpinButton`を用いて spinbutton にしていたり、その他数値の入力に関する a11y 対応がされています。

https://github.com/adobe/react-spectrum/blob/main/packages/%40react-aria/datepicker/src/useDateSegment.ts

### DatePicker で使用するときの冗長な読み上げ対応

`useDatePicker`という hook を使うことで、DateField と一緒に Calendar（明日紹介します）を表示することができる、DatePicker を作成することができます。

https://react-spectrum.adobe.com/react-aria/useDatePicker.html

この`useDatePicker`で使用するときに、冗長な読み上げがされないような対応がされています。
`useDateField`を単体で利用するときは年・月・日の入力欄のみで 1 つのグループですが、`useDatePicker`と一緒に利用するときは、DatePicker のトリガーボタンも含めて 1 つのグループなので、`group`role をつけて description などを付与するのを、`useDateField`の責務ではなくて`useDatePicker`の責務にして、冗長な読み上げを防いだり、グループ構造を適切にしています。

以下のコードで、`descProps`は「選択した日付 : 2024 年 12 月 18 日」などのテキスト、`fieldProps`はフィールド自体の説明文です。

https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/datepicker/src/useDateField.ts#L98-L102

`hookData.set`は先ほどの`useDateSegment`にデータを渡しています。
https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/datepicker/src/useDateField.ts#L107-L113

ここで DateField の role などを指定しています。
https://github.com/adobe/react-spectrum/blob/50c7ada5d1880a174b6b6d3f43e8d90ee9bd4ad8/packages/%40react-aria/datepicker/src/useDateField.ts#L117-L132

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、 Calendar についての記事です。お楽しみにー
