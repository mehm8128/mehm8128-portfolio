// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkCallout from "@r4ai/remark-callout";
import remarkLinkCard from "remark-link-card-plus";
import { rehypeCollapsableToc } from "./src/plugins/toc";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.hm8128.me",
  integrations: [mdx(), sitemap()],
  markdown: {
    remarkPlugins: [
      remarkCallout,
      [
        remarkLinkCard,
        {
          cache: true,
        },
      ],
    ],
    rehypePlugins: [
      // Astroの自動id付与はrehypeが走った後なので、先にidを付与してからautolinkを使う必要がある
      rehypeHeadingIds,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "wrap",
          content: {
            type: "element",
            tagName: "span",
            properties: { class: "icon-link" },
            children: [
              {
                type: "text",
                value: " #",
              },
            ],
          },
        },
      ],
      rehypeCollapsableToc,
    ],
  },
});
