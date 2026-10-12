---
title: "Interop 2027の個人的ランキング"
publishedDate: "Oct 12 2026"
---

例年通り、9/3から9/23まで[Interop 2027](https://github.com/web-platform-tests/interop/tree/main/2027)のproposalの募集が行われ、12/17までが選考期間になっています。

Firefoxチームが去年から開始したランキングづけページがあります。
肯定的に評価できるInteropのproposalに対して順位をつけることができ、これはFirefoxチームでの検討に役立つとのことです。

https://interop-rank.fxdx.dev/

海外の開発者たちの何人かはこのランキングを個人のブログにて公開しています。
Saraの[My top picks for Interop 2027](https://www.sarasoueidan.com/blog/interop-2027-rankings/) や、その記事の中で他に5人分の記事が紹介されています。

そこで今回、僕もランキング上位に選択したものたちを軽く紹介していきます。

## ランキング

ランキング上位にしたものを紹介しますが、ここでは**順不同**です。

### HTML focusgroup attribute

[HTML `focusgroup`](https://github.com/web-platform-tests/interop/issues/1348)

メニューやタブ、ツールバーなどなどのUIで、矢印キーによるフォーカス移動の実装を楽にしてくれるHTML属性です。
簡単に一貫性のあるフォーカス操作を提供できるようになり、アクセシビリティの向上に役立ちます。

こんな感じ↓で`focusgroup`属性を使えるようになります。

```html
<div focusgroup="toolbar" aria-label="Text formatting">
  <button type="button">Bold</button>
  <button type="button">Italic</button>
  <button type="button">Underline</button>
  <button type="button">Strikethrough</button>
</div>
```

詳しくはChromeチームから出ている記事をご覧ください。

https://developer.chrome.com/blog/focusgroup-rfc?hl=ja

### Interest invokers

[Interest invoker API](https://github.com/web-platform-tests/interop/issues/1358)

ホバーやフォーカス、長押しなどユーザーが「興味を示している」ということを判定できたタイミングで、アクションをトリガーできるHTML属性です。
操作方法や環境によらずユーザーが「興味を示している」ことを判定できるので、アクセシビリティ向上に繋がります。

こんな感じ↓で`interestfor`属性を使えるようになります。

```html
<p><a href="#" interestfor="mypopover">リンク</a>のついたテキスト</p>
<p id="mypopover" popover>簡単な情報の付いた短いプレビュー</p>
```

詳しくは以下の記事やMDNをご覧ください。

https://blog.sakupi01.com/dev/articles/standardizing-user-intent-with-interest-invokers/

https://developer.mozilla.org/ja/docs/Web/API/Popover_API/Using_interest_invokers

### Single-axis scroll containers

[Single-axis scroll containers](https://github.com/web-platform-tests/interop/issues/1436)

「横にスクロールできるテーブルの見出しを固定したい」ときに役立ちます。

以下のように記述することで、x軸とy軸のスクロール挙動を別々に定義できるようになりました。

```css
.table-wrapper {
  overflow: auto clip;
}
```

今まではテーブルを複製するなどして無理やり実装する必要があったので、これもアクセシビリティや開発体験の向上に繋がります。

https://developer.chrome.com/blog/single-axis-scroll-containers-ready-for-testing?hl=ja

https://blog.cybozu.io/entry/2026/07/29/130254

### Shadow DOM referenceTarget

[Reference Target for Cross-Root ARIA](https://github.com/web-platform-tests/interop/issues/1333)

Shadow DOM外からShadow DOM内の要素を参照して`<label for>`したり、`aria-labelledby`したりすることができなかったのを解決するHTML属性です。

```html
<div>
  <label for="checkbox">I agree with the terms and conditions</label>
  <fancy-checkbox id="checkbox">
    <template shadowrootmode="open" shadowRootReferenceTarget="inner-checkbox">
      <input type="checkbox" id="inner-checkbox" />
    </template>
  </fancy-checkbox>
</div>
```

他の方法で解決することが困難な問題を解決する機能であるため、特にアクセシビリティの向上に繋がります。

https://blogs.igalia.com/alice/reference-target-having-your-encapsulation-and-eating-it-too/

https://www.htmhell.dev/adventcalendar/2025/4/

### JavaScript Temporal

[Temporal API](https://github.com/web-platform-tests/interop/issues/1381)

Dateオブジェクトに代わる、JSで日時操作をするためのAPIです。

```js
const zonedDateTime = Temporal.ZonedDateTime.from({
  year: 2025,
  month: 1,
  day: 1,
  hour: 9,
  minute: 0,
  timeZone: "Asia/Tokyo",
});
const duration = Temporal.Duration.from({ hours: 5 }); // 5時間
const addedZonedDateTime = zonedDateTime.add(duration); // 2025/01/01 14:00 JST
```

https://gihyo.jp/article/2025/02/ride-modern-frontend-07

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Temporal

### Customizable/stylable `<select>`

[Customizable Select](https://github.com/web-platform-tests/interop/issues/1393)

`<select>`要素の見た目をカスタマイズ可能にします。
自分のプロダクトに合う見た目のセレクトボックスを一から作ることなく、ブラウザ標準でアクセシビリティが確保された要素を使うことができるようになります。

```css
.custom-select {
  &,
  &::picker(select) {
    appearance: base-select;
  }
}
```

https://developer.chrome.com/blog/a-customizable-select?hl=en

https://blog.sakupi01.com/dev/articles/2024-openui-advent-3

### CSS reading-⁠flow and reading-⁠order properties

[CSS `reading-flow`](https://github.com/web-platform-tests/interop/issues/1349)

CSSの`order`プロパティなどを使って見た目の順序を変えたときに、Tabキーによるフォーカス順序がそれに伴わない問題を解決するCSSプロパティです。
[達成基準 2.4.3: フォーカス順序](https://waic.jp/translations/WCAG22/Understanding/focus-order.html)に直接関係する、アクセシビリティ改善系CSSプロパティです。

```css
.box {
  reading-flow: flex-visual;
}
```

https://developer.chrome.com/blog/reading-flow?hl=ja

### ariaNotify()

[ariaNotify() method](https://github.com/web-platform-tests/interop/issues/1387)

命令的に支援技術にテキストを通知するメソッドです。
ライブリージョンを用いてHACK的に使われていた通知方法を代替できます。

```js
document.ariaNotify("Hello there.");
```

最近MDNのページを日本語に翻訳しました。

https://developer.mozilla.org/ja/docs/Web/API/Document/ariaNotify

https://speakerdeck.com/ryokatsuse/aria-notifynituite

### HTML headingoffset and headingreset attributes

[Computed Heading Level](https://github.com/web-platform-tests/interop/issues/1412)

見出し要素のレベルを調整できるHTML属性及び、CSS疑似クラスです。

```html
<section headingoffset="2">
  <h1>Level 3</h1>

  <dialog headingreset>
    <h1>Level 1</h1>
  </dialog>
</section>
```

```css
:heading(1, 3) {
  color: tomato;
}
```

https://blog.w0s.jp/entry/732

https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/headingoffset

https://developer.mozilla.org/ja/docs/Web/CSS/Reference/Selectors/:heading_function

### Carryover evaluation for the Accessibility testing investigation area

[Carryover evaluation for the Accessibility testing investigation area](https://github.com/web-platform-tests/interop/issues/1489)

ランキングづけページには含まれていませんが、issueが存在しているものです。
先日以下の記事で紹介したInvestigationを、2027年も継続するかどうか評価するissueです。

https://portfolio.hm8128.me/adv2026-as/day6/

## まとめ

是非みなさんもランキングづけしてみてください。
