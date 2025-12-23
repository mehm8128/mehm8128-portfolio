import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string().optional(),
      thumbnail: image(),
      thumbnailAlt: z.string(),
      publishedDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
    }),
});

export const collections = { blog };
