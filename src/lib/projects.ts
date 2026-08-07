import type { CollectionEntry } from 'astro:content';

export function sortPublished<T extends { data: { order: number; draft: boolean } }>(
  projects: T[],
): T[] {
  return projects
    .filter((project) => !project.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const { getCollection } = await import('astro:content');
  const projects = await getCollection('projects');
  return sortPublished(projects);
}
