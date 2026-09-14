import type { Loader } from "astro/loaders";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

/**
 * draft: true が設定されたエントリをロード後にストアから除外するローダー。
 * これにより getCollection / getStaticPaths の両方で下書き記事が自動的に弾かれる。
 * ローカル開発時（`astro dev`）は下書きも確認できるようフィルタしない。
 * Cloudflare Pages のプレビューデプロイもビルド（`astro build`）を経るため、
 * 本番と同様に下書きは弾かれる。
 */
function excludeDrafts(loader: Loader): Loader {
  return {
    ...loader,
    load: async (context) => {
      await loader.load(context);
      if (import.meta.env.DEV) {
        return;
      }
      for (const [id, entry] of context.store.entries()) {
        if (entry.data.draft) {
          context.store.delete(id);
        }
      }
    },
  };
}

const draftField = {
  draft: z.boolean().default(false),
};

const blog = defineCollection({
  loader: excludeDrafts(
    glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  ),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      publishedDate: z.coerce.date(),
      ...draftField,
    }),
});

const adv2024 = defineCollection({
  loader: excludeDrafts(
    glob({
      base: "./src/content/adv2024-reactaria",
      pattern: "**/*.md",
    }),
  ),
  schema: () =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
      ...draftField,
    }),
});

const adv2025 = defineCollection({
  loader: excludeDrafts(
    glob({
      base: "./src/content/adv2025-wc",
      pattern: "**/*.md",
    }),
  ),
  schema: () =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
      ...draftField,
    }),
});

const adv2026 = defineCollection({
  loader: excludeDrafts(
    glob({
      base: "./src/content/adv2026-as",
      pattern: "**/*.md",
    }),
  ),
  schema: () =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
      ...draftField,
    }),
});

export const collections = { blog, adv2024, adv2025, adv2026 };

