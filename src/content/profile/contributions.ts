interface Contribution {
  title: string;
  link: string;
}

export const contributions = [
  {
    title: "biomejs/biomeへのPull Request",
    link: "https://github.com/biomejs/biome/pulls?q=is%3Apr+author%3Amehm8128+is%3Aclosed",
  },
  {
    title: "feat(linter): implement aria/proptypes #17253 · oxc-project/oxc",
    link: "https://github.com/oxc-project/oxc/pull/17253",
  },
  {
    title:
      "Add tests for interactive element labels named by svg title elements #56902 · web-platform-tests/wpt",
    link: "https://github.com/web-platform-tests/wpt/pull/56902",
  },
  {
    title: "Fix the way to calculate processedProps #283 · kuma-ui/kuma-ui",
    link: "https://github.com/kuma-ui/kuma-ui/pull/283",
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
