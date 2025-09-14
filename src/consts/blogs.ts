interface Blog {
  title: string;
  link: string;
  site: "Zenn" | "traP" | "sizu.me" | "Cybozu" | undefined;
  publishedAt: string; // YYYY-MM-DD format
}

export const blogs = [
  {
    title: "React Ariaの実装読むぞ Advent Calendar 2024",
    link: "https://qiita.com/advent-calendar/2024/react-aria",
    site: "Zenn",
    publishedAt: "2024-12-01",
  },
  {
    title: "Rustでmini-gitを作った話",
    link: "https://trap.jp/post/2036/",
    site: "traP",
    publishedAt: "2024-01-06",
  },
  {
    title: "25新卒エンジニア5人の内定者アルバイト体験記",
    link: "https://blog.cybozu.io/entry/2025/02/26/112000",
    site: "Cybozu",
    publishedAt: "2025-02-26",
  },
  {
    title:
      "サイボウズのフロントエンドエンジニアの探究活動について全てをお話します",
    link: "https://blog.cybozu.io/entry/2025/08/19/113000",
    site: "Cybozu",
    publishedAt: "2025-08-19",
  },
  {
    title: "2024年のa11y活動報告",
    link: "https://sizu.me/mehm8128/posts/vahz9skimne4",
    site: "sizu.me",
    publishedAt: "2024-12-11",
  },
  {
    title: "a11y 上の理由で Deprecated になった HTML と ARIA まとめ",
    link: "https://zenn.dev/cybozu_frontend/articles/deprecated-html-and-aria",
    site: "Zenn",
    publishedAt: "2024-07-24",
  },
  {
    title: "BiomeのPluginについて",
    link: "https://zenn.dev/mehm8128/articles/biome-plugin",
    site: "Zenn",
    publishedAt: "2024-02-02",
  },
  {
    title: "技術書典16 traP TechBook執筆",
    link: "https://sizu.me/mehm8128/posts/mb6nidhor1v3",
    site: "sizu.me",
    publishedAt: "2024-05-27",
  },
] as const satisfies Blog[];
