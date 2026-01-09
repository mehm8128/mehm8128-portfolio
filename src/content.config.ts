import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      publishedDate: z.coerce.date(),
    }),
});

const adv2024 = defineCollection({
  loader: glob({
    base: "./src/content/adv2024-reactaria",
    pattern: "**/*.md",
  }),
  schema: () =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
    }),
});

export const collections = { blog, adv2024 };
