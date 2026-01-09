---
title: "TextFieldについて"
publishedDate: "Dec 4 2024"
---

> [!warn]
> この記事は他サイトから移行したものです。

> [!note]
> この記事は [React Aria の実装読むぞ - Qiita Advent Calendar 2024](https://qiita.com/advent-calendar/2024/react-aria) の 4 日目の記事です。

こんにちは、フロントエンドエンジニアの mehm8128 です。
今日は TextField について書いていきます。

https://react-spectrum.adobe.com/react-aria/useTextField.html

## `useTextField` とは

テキストの入力欄を作るための hook です。

## 使用例

ドキュメントからそのまま取ってきています。

```tsx
function TextField(props: AriaTextFieldProps) {
  let { label } = props;
  let ref = React.useRef(null);
  let {
    labelProps,
    inputProps,
    descriptionProps,
    errorMessageProps,
    isInvalid,
    validationErrors,
  } = useTextField(props, ref);

  return (
    <div style={{ display: "flex", flexDirection: "column", width: 200 }}>
      <label {...labelProps}>{label}</label>
      <input {...inputProps} ref={ref} />
      {props.description && (
        <div {...descriptionProps} style={{ fontSize: 12 }}>
          {props.description}
        </div>
      )}
      {isInvalid && (
        <div {...errorMessageProps} style={{ color: "red", fontSize: 12 }}>
          {validationErrors.join(" ")}
        </div>
      )}
    </div>
  );
}
```

## 本題

WAI-ARIA はこちらです。

https://www.w3.org/TR/wai-aria-1.2/#textbox

### フィールドの a11y とバリデーション

React Aria ではフィールド系のコンポーネントにはラベルに加えて説明文とエラーメッセージを紐づけることができます。
説明文を入れている要素には`descriptionProps`を、エラーメッセージを入れている要素には`errorMessageProps`を渡すことで、[`useField`](https://github.com/adobe/react-spectrum/blob/93c26d8bd2dfe48a815f08c58925a977b94d6fdd/packages/%40react-aria/label/src/useField.ts#L31)によって生成されている id を用いて`aria-describedby`でテキストフィールドに紐づけることができます。
また、 React Hook Form などのライブラリと一緒に使うこともでき、そのバリデーション結果のエラーメッセージを、`errorMessageProps`を渡している要素に入れることで紐づけます。

https://react-spectrum.adobe.com/react-aria/forms.html

エラーメッセージには`aria-errormessage`が使われることもありますが、`aria-errormessage`は現状スクリーンリーダーによっては上手く読み上げられないことがあるため、用いられていないようです。

https://github.com/adobe/react-spectrum/issues/7425

https://a11ysupport.io/tech/aria/aria-errormessage_attribute

### aria-multiline

WAI-ARIA を見てみます。

https://www.w3.org/TR/wai-aria-1.2/#textbox

NOTE の欄には、1 行のテキストフィールドである`input`要素は Enter キーを押すとデフォルトではフォームが送信されるけど、複数行である`textarea`要素は改行されるだけなので、それを区別するために`aria-multiline`があるという話が書かれています。
`aria-multiline`を`true`にするとスクリーンリーダーでは「複数行」という読み上げがされるので、それによって Enter を押したときにすぐに送信されてしまうか、改行されるだけかという判断がつく、という話だと理解しました。
ただ、複数行のときにはちゃんと`textarea`要素を使っていれば自動で`aria-multiline="true"`の挙動になってくれるので、RTE を触るときなどに気にすることになりそうです。React Aria の`useTextfield`では下に載せたコードの部分で`input`か`textarea`要素のみを受け入れるようにしているので、実装に明示的に含まれてはいませんでした。

https://github.com/adobe/react-spectrum/blob/93c26d8bd2dfe48a815f08c58925a977b94d6fdd/packages/%40react-aria/textfield/src/useTextField.ts#L50

### inputMode

`input`要素には`type`属性があり、単純な TextField なら`type="text"`、チェックボックスなら`type="checkbox"`、数値なら`type="number"`など、用途に応じて指定することで入力フィールドの見た目や機能が変わったり、モバイル時に仮想キーボードが変化したりします。例えば`type="number"`だと、数字（と一部の記号）だけの仮想キーボードになります。スマホでロック画面解除のパスワードを入力するような画面を想像してもらうと分かりやすいと思います。

しかし、例えば郵便番号は数字だから数字を入力しやすいように`type="number"`にしよう、というのは間違いです。デフォルトで`type="number"`には+/-ボタンのスピナーがつくのですが、郵便番号は数字を増減させて操作するタイプのものではないからです。

こういう場合に、`type`属性ではなくて`inputMode`を利用します。
`inputMode`は、入力フィールドの見た目や機能を変えずに、仮想キーボードのみを変化させるためのものです。例えば`type="number"`のときに表示される仮想キーボードと同じものを表示させるには、`inputMode="numeric"`を指定します。つまり、郵便番号の場合には`type="text"`で`inputMode="numeric"`を指定するのが適切だと考えられます。
それ以外にも`type="email"`のときに出てくる仮想キーボードは`inputMode="email"`で表示できるなど、いくつかの種類があります。詳しくは下のリンクから HTML Standard をご覧ください。
ちなみに`inputMode`は明日の記事でも登場します。

https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute

## まとめ

明日の担当は [@mehm8128](https://x.com/mehm8128) さんで、 NumberField についての記事です。お楽しみにー
