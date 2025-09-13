interface Contribution {
  title: string;
  link: string;
}

export const contributions = [
  {
    title:
      "feat(biome_js_analyze): implement noExcessiveLinesPerFunction #6166 · biomejs/biome",
    link: "https://github.com/biomejs/biome/pull/6166",
  },
  {
    title: "feat(lint): implement useUniqueElementIds #6082 · biomejs/biome",
    link: "https://github.com/biomejs/biome/pull/6082",
  },
  {
    title:
      "feat(linter): show dependency variable name by useExhaustiveDependencies #1551 · biomejs/biome",
    link: "https://github.com/biomejs/biome/pull/1551",
  },
  {
    title:
      "fix(css_semantic): semantic event for css supports at-rule #4810 · biomejs/biome",
    link: "https://github.com/biomejs/biome/pull/4810",
  },
  {
    title: "Fix the way to calculate processedProps #283 · kuma-ui/kuma-ui",
    link: "https://github.com/kuma-ui/kuma-ui/pull/283",
  },
  {
    title:
      "feat: トピック名の文字数をvalidateするように #545 · zenn-dev/zenn-editor",
    link: "https://github.com/zenn-dev/zenn-editor/pull/545",
  },
  {
    title: "fix: useButton href condition #7239 · adobe/react-spectrum",
    link: "https://github.com/adobe/react-spectrum/pull/7239",
  },
  {
    title: "doc: Fix date inputs on Chrome #704 · 47ng/nuqs",
    link: "https://github.com/47ng/nuqs/pull/704#event-14844194210",
  },
  {
    title:
      "fix: customizing the starting line number even if globally set #2941 · vuejs/vitepress",
    link: "https://github.com/vuejs/vitepress/pull/2941",
  },
  {
    title: "mdn/translated-content への Pull Request",
    link: "https://github.com/mdn/translated-content/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+",
  },
] as const satisfies Contribution[];
