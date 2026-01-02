// @ts-check

import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from "@astrojs/markdown-remark";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkCallout from "@r4ai/remark-callout";
import remarkLinkCard from "remark-link-card-plus";
import { rehypeCollapsibleToc } from "@mehm8128/rehype-toc";
import react from "@astrojs/react";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  site: "https://portfolio.hm8128.me",
  integrations: [mdx(), sitemap(), react()],

  markdown: {
    remarkPlugins: [
      remarkCallout,
      [
        remarkLinkCard,
        {
          ogTransformer: (
            /** @type {import("remark-link-card-plus").OgData} */ ogData
          ) => {
            return {
              ...ogData,
              title: ogData.title?.replace(/</g, "&#x3C;"),
              description: ogData.description?.replace(/</g, "&#x3C;"),
            };
          },
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
      rehypeCollapsibleToc,
    ],
  },
});
