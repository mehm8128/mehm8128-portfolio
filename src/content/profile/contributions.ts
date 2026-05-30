interface Contribution {
  title: string;
  link: string;
}

export const contributions = [
  {
    title: "Pull Request to biomejs/biome",
    link: "https://github.com/biomejs/biome/pulls?q=is%3Apr+author%3Amehm8128+is%3Aclosed",
  },
  {
    title: "Pull Request to oxc-project/oxc",
    link: "https://github.com/oxc-project/oxc/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+is%3Amerged",
  },
  {
    title: "Pull Request to dequelabs/axe-core",
    link: "https://github.com/dequelabs/axe-core/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+is%3Aclosed",
  },
  {
    title: "Pull Request to mdn/translated-content",
    link: "https://github.com/mdn/translated-content/pulls?q=sort%3Aupdated-desc+is%3Apr+author%3Amehm8128+",
  },
  {
    title:
      'fix: announce all content inside `role="alert"` #20056 · nvaccess/nvda',
    link: "https://github.com/nvaccess/nvda/pull/20056",
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
] as const satisfies Contribution[];
