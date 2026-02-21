interface Blog {
  title: string;
  link: string;
}

export const blogs = [
  {
    title: "Rustでmini-gitを作った話",
    link: "https://trap.jp/post/2036/",
  },
  {
    title: "Web 標準動向",
    link: "https://zenn.dev/cybozu_frontend/articles/web_standards_monthly_202509",
  },
  {
    title:
      "サイボウズのフロントエンドエンジニアの探究活動について全てをお話します",
    link: "https://blog.cybozu.io/entry/2025/08/19/113000",
  },
  {
    title: "25新卒エンジニア5人の内定者アルバイト体験記",
    link: "https://blog.cybozu.io/entry/2025/02/26/112000",
  },
  {
    title: "Referencing HTML elements inside Shadow DOM",
    link: "https://htmhell.dev/adventcalendar/2025/4/",
  },
  {
    title: "2024年のa11y活動報告",
    link: "https://sizu.me/mehm8128/posts/vahz9skimne4",
  },
  {
    title: "技術書典16 traP TechBook執筆",
    link: "https://sizu.me/mehm8128/posts/mb6nidhor1v3",
  },
] as const satisfies Blog[];
