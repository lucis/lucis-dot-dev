import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      illustration: image(),
      url: z.string().url().optional(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
