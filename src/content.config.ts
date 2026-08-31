import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    date: z.date(),
  }),
});

const awards = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/awards" }),
  schema: z.object({
    date: z.date(),
    event: z.string(),
    result: z.string(),
    category: z.string(),
    code: z.union([z.string(), z.number()]).transform((value) =>
      typeof value === "number" ? String(value).padStart(2, "0") : value
    ),
    priority: z.number().default(0),
    featured: z.boolean().default(false),
  }),
});

export const collections = { blog, awards };
