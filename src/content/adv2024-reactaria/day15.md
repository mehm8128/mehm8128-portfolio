---
title: "ColorPickerについて"
publishedDate: "Dec 15 2024"
---

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 15 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は ColorPicker について書いていきます。

カラーピッカーにもいくつか種類があるのですが、今回は主に`useColorArea`の話をします。

https://react-spectrum.adobe.com/react-aria/useColorArea.html

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
const SIZE = 192;
const FOCUSED_THUMB_SIZE = 28;
const THUMB_SIZE = 20;
const BORDER_RADIUS = 4;

function ColorArea(props) {
  let inputXRef = React.useRef(null);
  let inputYRef = React.useRef(null);
  let containerRef = React.useRef(null);

  let state = useColorAreaState(props);

  let { isDisabled } = props;

  let { colorAreaProps, xInputProps, yInputProps, thumbProps } = useColorArea(
    { ...props, inputXRef, inputYRef, containerRef },
    state
  );

  let { focusProps, isFocusVisible } = useFocusRing();

  return (
    <div
      ref={containerRef}
      {...colorAreaProps}
      style={{
        ...colorAreaProps.style,
        width: SIZE,
        height: SIZE,
        borderRadius: BORDER_RADIUS,
        background: isDisabled
          ? "rgb(142, 142, 142)"
          : colorAreaProps.style.background,
        opacity: isDisabled ? 0.3 : undefined,
      }}
    >
      <div
        {...thumbProps}
        style={{
          ...thumbProps.style,
          background: isDisabled
            ? "rgb(142, 142, 142)"
            : state.getDisplayColor().toString("css"),
          border: `2px solid ${isDisabled ? "rgb(142, 142, 142)" : "white"}`,
          borderRadius: "50%",
          boxShadow: "0 0 0 1px black, inset 0 0 0 1px black",
          boxSizing: "border-box",
          height: isFocusVisible ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
          width: isFocusVisible ? FOCUSED_THUMB_SIZE + 4 : THUMB_SIZE,
        }}
      >
        <input ref={inputXRef} {...xInputProps} {...focusProps} />
        <input ref={inputYRef} {...yInputProps} {...focusProps} />
      </div>
    </div>
  );
}
```

## 本題

APG はこちらです。
https://www.w3.org/WAI/ARIA/apg/patterns/slider/

### 読み上げ

React Aria では色の読み上げられ方を重視していて、ブログ記事にまとめられているので解説します。

https://react-spectrum.adobe.com/blog/accessible-color-descriptions.html

元々、ColorPicker がスクリーンリーダーに読み上げられるときに各チャンネルの数字が読み上げられるようになっていて、これだけだとほとんどの人はどんな色なのか分かりませんでした。そこで色名と数値の組み合わせをたくさん用意して、各数値に対して近い色名を読み上げるように改善しました。しかし、これだと i18n などもするとバンドルサイズが大きくなったり、色名自体もあまり普段聞かないような名前がつけられていたりして分かりづらさが残っていました。

そこで、さらに色を減らして 13 の色とその中間色（黄色と緑の間なら黄緑、とか）、明度、彩度の組み合わせを読み上げられるようにしました。こうすることで上記の 2 つの問題は解決し、視覚障害を持つユーザーにも分かりやすいような読み上げられ方になりました。ちなみに、同じ読み上げられ方をする色でも微妙に数値が違うといったことがあるため、各チャンネルの数値自体も一緒に読み上げられます。

また、OKLCH という 2023 年に newly available になった色空間を使用していて、HSL 色空間に対する利点がいくつか述べられています。

https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch

実際に色の名前を生成する処理は`getColorName`という関数に書かれていました。

https://github.com/adobe/react-spectrum/blob/993de98adad65e48bcebad8ac835f5c9e0c94c85/packages/%40react-stately/color/src/Color.ts#L132-L197

## まとめ

明日の担当は [@mehm8128](https://zenn.dev/mehm8128) さんで、Tab についての記事です。お楽しみにー
