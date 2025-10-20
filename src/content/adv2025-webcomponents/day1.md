---
title: Reference Target - Cross-root ARIA Reference Target 比較と課題
publishedDate: "2025-12-01"
---

## 現状の課題

### スコープとする属性

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/8
https://github.com/WICG/webcomponents/issues/1091

### event

https://alice.pages.igalia.com/2025-hackfest-reference-target/#/9
https://github.com/WICG/webcomponents/issues/1098

### Phase2の用例

https://github.com/WICG/webcomponents/issues/1111

### ボトルネック効果

- 代替案１：「個々のユースケースを個別に扱う」
  https://github.com/WICG/webcomponents/blob/gh-pages/proposals/reference-target-explainer.md#addressing-individual-use-cases-separately
- 代替案２：exportid

### 一旦スコープ外にしているもの

- attribute forwarding（semantic-delegate的な）
  - https://alice.pages.igalia.com/2025-hackfest-reference-target/#/13/2
  - https://github.com/WICG/webcomponents/issues/1068
- 中から外を参照する宣言的な方法
  - https://alice.pages.igalia.com/2025-hackfest-reference-target/#/13/3

## まとめ
