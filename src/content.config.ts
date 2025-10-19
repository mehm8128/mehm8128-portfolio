import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: () =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
    }),
});

const adv2025 = defineCollection({
  loader: glob({
    base: "./src/content/adv2025-webcomponents",
    pattern: "**/*.md",
  }),
  schema: () =>
    z.object({
      title: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog, adv2025 };
