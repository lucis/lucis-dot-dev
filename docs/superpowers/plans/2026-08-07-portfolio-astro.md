# Portfolio Astro — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Substituir o site Gatsby por um portfolio estático em Astro 5 com home editorial (sidebar + projetos), tipografia Georgia, e conteúdo em inglês.

**Architecture:** Astro `output: 'static'` + Tailwind CSS 4 (Vite plugin) + Content Collections (`projects`) + `src/data/site.ts` para metadados. Zero JS no cliente. Deploy na Vercel sem adapter.

**Tech Stack:** Astro 5, Tailwind CSS 4 (`@tailwindcss/vite`), TypeScript, Zod (via `astro/zod`), Vitest, npm, Node 22.

## Global Constraints

- Idioma da UI e do conteúdo: **inglês only**
- Tipografia: **`Georgia, "Times New Roman", Times, serif`** (display e body)
- Resume PDF em `/Users/lucis/personal/resume/resume.pdf` é **só referência de copy** — não copiar para `public/`, não versionar, não linkar
- Blog: link externo `https://blog.lucis.dev`
- Sem i18n, dark mode, formulário, Notion, GitHub GraphQL, analytics, PWA
- Package manager: **npm** (`package-lock.json`); remover `yarn.lock`
- Node: **22** (`.nvmrc`)
- Spec: `docs/superpowers/specs/2026-08-07-portfolio-astro-design.md`

## File Structure

| Path | Responsibility |
|------|----------------|
| `package.json` | Scripts `dev`/`build`/`preview`/`test`; deps Astro + Tailwind + Vitest |
| `astro.config.mjs` | `site`, `output: 'static'`, plugin `@tailwindcss/vite` |
| `.nvmrc` | `22` |
| `src/content.config.ts` | Collection `projects` (schema Zod + `image()`) |
| `src/data/site.ts` | Nome, titles, bio, CTA, socials, skills, SEO |
| `src/lib/projects.ts` | `getPublishedProjects()` — filtra draft, ordena por `order` |
| `src/styles/global.css` | `@import "tailwindcss"`, `@theme` tokens, base Georgia |
| `src/layouts/BaseLayout.astro` | HTML shell + SEO + importa global.css |
| `src/components/SocialLinks.astro` | LinkedIn, GitHub, Blog |
| `src/components/Sidebar.astro` | Avatar, identidade, bio, CTA, socials |
| `src/components/SkillPill.astro` | Tags do topo |
| `src/components/ProjectCard.astro` | Card clicável externo |
| `src/pages/index.astro` | Grid home |
| `src/content/projects/*.md` | Um projeto por arquivo |
| `src/assets/illustrations/*` | Avatar + woodcuts (placeholders SVG se assets finais atrasarem) |
| `public/favicon.svg` | Favicon mínimo |
| `src/lib/projects.test.ts` | Testes Vitest do helper de projetos |
| `vitest.config.ts` | Config Vitest |
| `README.md` | Como desenvolver e atualizar conteúdo |

**Remover na Task 1:** `gatsby-*.js`, `jsconfig.json`, `.eslintrc`, `yarn.lock`, `powered-by-vercel.svg`, `src/` legado, `static/` legado (favicon pode ser recriado), `package.json` antigo (substituído).

**Preservar:** `docs/`, `.git/`, `LICENSE.md`, `.gitignore` (atualizar).

---

### Task 1: Limpar Gatsby e scaffold Astro

**Files:**
- Delete: `gatsby-browser.js`, `gatsby-config.js`, `gatsby-node.js`, `gatsby-ssr.js`, `jsconfig.json`, `.eslintrc`, `yarn.lock`, `powered-by-vercel.svg`, `package.json` (substituir), todo `src/` legado, todo `static/` legado
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `.nvmrc`, `src/pages/index.astro` (stub), `src/env.d.ts`
- Modify: `.gitignore`, `README.md`

**Interfaces:**
- Consumes: nada
- Produces: app Astro que faz `npm run build` com página stub

- [ ] **Step 1: Remover artefatos Gatsby**

```bash
cd /Users/lucis/personal/lucis-dot-dev
rm -f gatsby-browser.js gatsby-config.js gatsby-node.js gatsby-ssr.js jsconfig.json .eslintrc yarn.lock powered-by-vercel.svg
rm -rf src static
```

- [ ] **Step 2: Escrever `package.json`**

```json
{
  "name": "lucis-dev",
  "type": "module",
  "version": "0.2.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "test": "vitest run"
  },
  "dependencies": {
    "astro": "^5.13.0"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.0",
    "tailwindcss": "^4.1.0",
    "typescript": "^5.9.0",
    "vitest": "^3.2.0"
  }
}
```

- [ ] **Step 3: Escrever configs**

`.nvmrc`:
```
22
```

`astro.config.mjs`:
```js
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://lucis.dev',
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
```

`tsconfig.json`:
```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"]
}
```

`src/env.d.ts`:
```ts
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />
```

`src/pages/index.astro`:
```astro
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Lucis</title>
  </head>
  <body>
    <h1>Lucis</h1>
  </body>
</html>
```

Atualizar `.gitignore` para incluir `dist/`, `.astro/`, `node_modules/`, `.env*`, e remover entradas só-Gatsby se existirem (`.cache`, `public` do Gatsby — em Astro `public/` é source e **não** deve ser ignorado).

- [ ] **Step 4: Instalar e validar build**

```bash
npm install
npm run build
```

Expected: exit 0; pasta `dist/` com HTML.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Substitui o scaffold Gatsby por Astro 5 estático.

EOF
)"
```

---

### Task 2: Tokens, `site.ts` e BaseLayout

**Files:**
- Create: `src/styles/global.css`, `src/data/site.ts`, `src/layouts/BaseLayout.astro`
- Modify: `src/pages/index.astro` (usar layout)
- Create: `public/favicon.svg`

**Interfaces:**
- Consumes: Astro + Tailwind do Task 1
- Produces: `export const site` tipado em `src/data/site.ts` (shape abaixo); `BaseLayout` com props `title?` e `description?`

Shape de `site` (valores iniciais derivados do resume + mockup):

```ts
export const site = {
  name: 'Luciano Júnior',
  titles: ['Staff Product Engineer', 'AI-native builder'],
  bio: 'I build products that solve real problems with technology, taste, and purpose. From insight to delivery, from idea to scale — always learning, always sharing.',
  avatar: {
    src: '/illustrations/avatar.svg',
    alt: 'Woodcut-style portrait of Luciano Júnior',
  },
  cta: {
    label: 'Learn more about me',
    href: 'https://www.linkedin.com/in/lcnjnr/',
  },
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/lcnjnr/' },
    { label: 'GitHub', href: 'https://github.com/lucis' },
    { label: 'Blog', href: 'https://blog.lucis.dev' },
  ],
  skills: [
    'Product Engineer',
    'Discovery to Production',
    'TypeScript',
    'React Native',
    'Node.js',
    'AI Systems',
  ],
  seo: {
    title: 'Luciano Júnior — Staff Product Engineer',
    description:
      'Staff Product Engineer and AI-native builder. From discovery to production across TypeScript, React Native, Node.js, and AI systems.',
    canonical: 'https://lucis.dev',
  },
} as const;
```

- [ ] **Step 1: Escrever `src/styles/global.css`**

```css
@import "tailwindcss";

@theme {
  --font-sans: Georgia, "Times New Roman", Times, serif;
  --font-serif: Georgia, "Times New Roman", Times, serif;
  --color-ink: #111111;
  --color-paper: #f7f6f3;
  --color-muted: #5c5c5c;
  --color-line: #e6e4df;
  --color-line-strong: #cfcbc3;
}

html {
  font-family: var(--font-serif);
  color: var(--color-ink);
  background: var(--color-paper);
}

body {
  margin: 0;
  min-height: 100vh;
}

a {
  color: inherit;
}
```

- [ ] **Step 2: Escrever `src/data/site.ts`** com o objeto `site` acima (texto em inglês; bio adaptada do mockup + profile do resume).

- [ ] **Step 3: Escrever `BaseLayout.astro`**

```astro
---
import '../styles/global.css';
import { site } from '../data/site';

interface Props {
  title?: string;
  description?: string;
}

const title = Astro.props.title ?? site.seo.title;
const description = Astro.props.description ?? site.seo.description;
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={site.seo.canonical} />
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={site.seo.canonical} />
    <meta property="og:type" content="website" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  </head>
  <body class="bg-paper text-ink antialiased">
    <slot />
  </body>
</html>
```

- [ ] **Step 4: Favicon SVG mínimo em `public/favicon.svg`** (círculo preto em fundo transparente) e stub `index.astro` usando `BaseLayout` + um `<p>{site.name}</p>` para confirmar tipografia.

- [ ] **Step 5: Validar**

```bash
npm run build
```

Expected: exit 0; HTML em `dist/` com `Luciano Júnior` e `font-family` Georgia no CSS gerado.

- [ ] **Step 6: Commit**

```bash
git add src/styles/global.css src/data/site.ts src/layouts/BaseLayout.astro src/pages/index.astro public/favicon.svg
git commit -m "$(cat <<'EOF'
Adiciona tokens, metadados do site e BaseLayout.

EOF
)"
```

---

### Task 3: Content Collections + helper + testes

**Files:**
- Create: `src/content.config.ts`, `src/lib/projects.ts`, `src/lib/projects.test.ts`, `vitest.config.ts`
- Create: `src/content/projects/{sip,coast,deco,matriculas,ufcg-pro}.md`
- Create: `src/assets/illustrations/{avatar,sip,coast,deco,matriculas,ufcg-pro}.svg` (placeholders monocromáticos; trocar pelos woodcuts finais quando disponíveis)
- Create: `public/illustrations/avatar.svg` **ou** servir avatar via import em Sidebar depois — nesta task, manter avatar em `src/assets/illustrations/avatar.svg` e atualizar `site.avatar.src` na Task 4 para import Astro; por ora placeholders SVG bastam

**Interfaces:**
- Consumes: schema Astro Content Layer
- Produces:
  - collection `projects`
  - `getPublishedProjects(): Promise<CollectionEntry<'projects'>[]>` em `src/lib/projects.ts`

Schema:

```ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      illustration: image(),
      url: z.string().url(),
      order: z.number(),
      draft: z.boolean().default(false),
    }),
});

export const collections = { projects };
```

Helper:

```ts
import { getCollection, type CollectionEntry } from 'astro:content';

export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return projects
    .filter((project) => !project.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}
```

**Conteúdo dos projetos (inglês, inspirado no resume):**

| id | title | description | url | order |
|----|-------|-------------|-----|-------|
| sip | SIP — AI-native Political Intelligence | Multi-stage LLM pipelines for relevance, entity resolution, and a temporal graph of political alliances and conflicts. | `https://www.linkedin.com/in/lcnjnr/` | 1 |
| coast | Coast — Product Engineering for Mobile | Shipped web and mobile features with React Native, Expo, and TypeScript, from Figma into production. | `https://www.linkedin.com/in/lcnjnr/` | 2 |
| deco | deco — Scaling a Builder Platform | Led product and tech through Deno Deploy → Kubernetes as the platform hit millions of monthly requests. | `https://www.deco.cx` | 3 |
| matriculas | Municipal Enrollment System | Pragmatic monolith for Campina Grande’s education dept — 250 schools, 30k+ students. | `https://www.linkedin.com/in/lcnjnr/` | 4 |
| ufcg-pro | UFCG Pro | Browser extension used by ~5,000 students and professors across Chrome and Firefox. | `https://github.com/lucis/ufcg-pro` | 5 |

Frontmatter de cada `.md` deve apontar `illustration` para o SVG relativo, ex.: `illustration: ../../assets/illustrations/sip.svg`.

Exemplo `src/content/projects/sip.md`:

```md
---
title: "SIP — AI-native Political Intelligence"
description: "Multi-stage LLM pipelines for relevance, entity resolution, and a temporal graph of political alliances and conflicts."
illustration: ../../assets/illustrations/sip.svg
url: https://www.linkedin.com/in/lcnjnr/
order: 1
draft: false
---
```

Placeholder SVG (repetir com `id` no filename; desenho simples preto/branco):

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360" role="img">
  <rect width="640" height="360" fill="#f7f6f3"/>
  <rect x="24" y="24" width="592" height="312" fill="none" stroke="#111" stroke-width="3"/>
  <text x="320" y="190" text-anchor="middle" font-family="Georgia, serif" font-size="28" fill="#111">SIP</text>
</svg>
```

- [ ] **Step 1: Escrever teste Vitest que falha** — `src/lib/projects.test.ts`

Testar a lógica pura de filtro/ordenação (`sortPublished`) sem depender do runtime `getCollection`:

```ts
import { describe, expect, it } from 'vitest';
import { sortPublished } from './projects';

describe('sortPublished', () => {
  it('filters drafts and sorts by order ascending', () => {
    const result = sortPublished([
      { id: 'c', data: { order: 3, draft: false } },
      { id: 'a', data: { order: 1, draft: false } },
      { id: 'hidden', data: { order: 0, draft: true } },
      { id: 'b', data: { order: 2, draft: false } },
    ]);
    expect(result.map((p) => p.id)).toEqual(['a', 'b', 'c']);
  });
});
```

`vitest.config.ts`:

```ts
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['src/**/*.test.ts'],
  },
});
```

Nota: o import de `./projects` falha até o Step 3 — é o FAIL esperado do Step 2.

- [ ] **Step 2: Rodar teste — deve falhar**

```bash
npm test
```

Expected: FAIL (módulo/função inexistente).

- [ ] **Step 3: Implementar `src/lib/projects.ts`, `content.config.ts`, markdowns, SVGs**

```ts
import { getCollection, type CollectionEntry } from 'astro:content';

export function sortPublished<T extends { data: { order: number; draft: boolean } }>(
  projects: T[],
): T[] {
  return projects
    .filter((project) => !project.data.draft)
    .sort((a, b) => a.data.order - b.data.order);
}

export async function getPublishedProjects(): Promise<CollectionEntry<'projects'>[]> {
  const projects = await getCollection('projects');
  return sortPublished(projects);
}
```

Teste alinhado ao shape:

```ts
import { describe, expect, it } from 'vitest';
import { sortPublished } from './projects';

describe('sortPublished', () => {
  it('filters drafts and sorts by order ascending', () => {
    const result = sortPublished([
      { id: 'c', data: { order: 3, draft: false } },
      { id: 'a', data: { order: 1, draft: false } },
      { id: 'hidden', data: { order: 0, draft: true } },
      { id: 'b', data: { order: 2, draft: false } },
    ]);
    expect(result.map((p) => p.id)).toEqual(['a', 'b', 'c']);
  });
});
```

Criar os 5 `.md`, os SVGs placeholder e `src/content.config.ts` conforme tabelas acima.

- [ ] **Step 4: Rodar testes e build**

```bash
npm test
npm run build
```

Expected: testes PASS; build PASS (collection válida).

- [ ] **Step 5: Commit**

```bash
git add src/content.config.ts src/content src/assets src/lib vitest.config.ts
git commit -m "$(cat <<'EOF'
Adiciona collection de projetos com ordenação testada.

EOF
)"
```

---

### Task 4: Componentes da UI

**Files:**
- Create: `src/components/SocialLinks.astro`, `Sidebar.astro`, `SkillPill.astro`, `ProjectCard.astro`
- Modify: `src/data/site.ts` — trocar `avatar.src` string por path importável se necessário

**Interfaces:**
- `SocialLinks`: lê `site.socials`
- `Sidebar`: lê `site` (+ Image do avatar)
- `SkillPill`: props `{ skills: readonly string[] }`
- `ProjectCard`: props `{ project: CollectionEntry<'projects'> }`

- [ ] **Step 1: `SocialLinks.astro`**

```astro
---
import { site } from '../data/site';
---
<ul class="flex flex-col gap-2 text-sm">
  {site.socials.map((item) => (
    <li>
      <a
        href={item.href}
        target="_blank"
        rel="noopener noreferrer"
        class="underline-offset-4 hover:underline"
      >
        {item.label}
      </a>
    </li>
  ))}
</ul>
```

- [ ] **Step 2: `Sidebar.astro`**

```astro
---
import { Image } from 'astro:assets';
import { site } from '../data/site';
import SocialLinks from './SocialLinks.astro';
import avatar from '../assets/illustrations/avatar.svg';
---
<aside class="flex flex-col gap-6">
  <Image
    src={avatar}
    alt={site.avatar.alt}
    class="h-40 w-40 rounded-full object-cover border border-line"
  />
  <div>
    <h1 class="text-4xl font-bold tracking-tight">{site.name}</h1>
    {site.titles.map((title) => (
      <p class="text-base text-muted">{title}</p>
    ))}
  </div>
  <p class="text-base italic leading-relaxed text-ink/90">{site.bio}</p>
  <a
    href={site.cta.href}
    target="_blank"
    rel="noopener noreferrer"
    class="underline underline-offset-4"
  >
    {site.cta.label} →
  </a>
  <div class="mt-auto pt-8">
    <SocialLinks />
  </div>
</aside>
```

Remover `site.avatar.src` se não for mais usado; manter só `alt`.

- [ ] **Step 3: `SkillPill.astro`**

```astro
---
interface Props {
  skills: readonly string[];
}
const { skills } = Astro.props;
---
<div class="inline-flex max-w-full items-center gap-2 rounded-full border border-line bg-paper px-4 py-2 text-sm text-muted">
  <span aria-hidden="true">✧</span>
  <p class="truncate">{skills.join(' · ')}</p>
</div>
```

- [ ] **Step 4: `ProjectCard.astro`**

```astro
---
import { Image } from 'astro:assets';
import type { CollectionEntry } from 'astro:content';

interface Props {
  project: CollectionEntry<'projects'>;
}
const { project } = Astro.props;
const { title, description, illustration, url } = project.data;
---
<a
  href={url}
  target="_blank"
  rel="noopener noreferrer"
  class="group grid grid-cols-1 gap-4 rounded-md border border-line bg-paper p-3 transition-colors hover:border-line-strong hover:bg-white sm:grid-cols-[220px_1fr_auto] sm:items-center"
>
  <Image
    src={illustration}
    alt=""
    class="h-36 w-full rounded-sm object-cover sm:h-28"
  />
  <div>
    <h3 class="text-xl font-bold">{title}</h3>
    <p class="mt-1 text-sm leading-relaxed text-muted">{description}</p>
  </div>
  <span class="justify-self-end text-xl transition-transform group-hover:translate-x-0.5" aria-hidden="true">→</span>
</a>
```

- [ ] **Step 5: Smoke visual via `index` temporário** — renderizar só `Sidebar` + um card fictício **ou** pular direto para Task 5 se preferir compor tudo de uma vez. Preferência: commit dos componentes mesmo sem página completa, com build ainda no stub (componentes não quebram build se não importados). Validar TypeScript:

```bash
npx astro check
```

Expected: sem erros nos novos componentes (ou apenas warnings irrelevantes).

- [ ] **Step 6: Commit**

```bash
git add src/components src/data/site.ts
git commit -m "$(cat <<'EOF'
Adiciona Sidebar, SkillPill, ProjectCard e SocialLinks.

EOF
)"
```

---

### Task 5: Compor a home

**Files:**
- Modify: `src/pages/index.astro`

**Interfaces:**
- Consumes: `BaseLayout`, `Sidebar`, `SkillPill`, `ProjectCard`, `getPublishedProjects`, `site.skills`

- [ ] **Step 1: Escrever `index.astro`**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Sidebar from '../components/Sidebar.astro';
import SkillPill from '../components/SkillPill.astro';
import ProjectCard from '../components/ProjectCard.astro';
import { site } from '../data/site';
import { getPublishedProjects } from '../lib/projects';

const projects = await getPublishedProjects();
---
<BaseLayout>
  <main class="mx-auto grid min-h-screen max-w-6xl gap-12 px-6 py-10 lg:grid-cols-[minmax(240px,0.34fr)_1fr] lg:gap-16 lg:px-10 lg:py-16">
    <div class="lg:sticky lg:top-16 lg:self-start">
      <Sidebar />
    </div>
    <section class="flex flex-col gap-8">
      <div class="flex justify-center lg:justify-start">
        <SkillPill skills={site.skills} />
      </div>
      <h2 class="text-3xl font-bold tracking-tight">Featured projects</h2>
      <div class="flex flex-col gap-4">
        {projects.map((project) => (
          <ProjectCard project={project} />
        ))}
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Build + preview manual**

```bash
npm run build
npm run preview
```

Expected: home com duas colunas no desktop; 5 cards; links externos; Georgia; sem toggle PT/EN; sem link de resume.

Checklist visual vs mockup:
- [ ] Sidebar esquerda sticky
- [ ] Pill de skills no topo do main
- [ ] Heading “Featured projects”
- [ ] Cards com ilustração | texto | seta
- [ ] Mobile empilha sidebar acima

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "$(cat <<'EOF'
Compõe a home editorial com sidebar e projetos.

EOF
)"
```

---

### Task 6: Polish, README e assets finais

**Files:**
- Modify: componentes/CSS se o preview mostrar gaps vs mockup (espaçamento, tamanho do avatar, tipografia)
- Modify: `README.md`
- Replace: SVGs placeholder pelos woodcuts finais **se o autor fornecer os arquivos nesta etapa**; caso contrário, deixar placeholders e documentar paths esperados no README

- [ ] **Step 1: Ajustes visuais mínimos** para aproximar o mockup (padding dos cards, `object-cover` das ilustrações, hierarquia de `text-*`). Sem adicionar features fora do escopo.

- [ ] **Step 2: Reescrever `README.md`** com seções Develop (`nvm use` / `npm install` / `npm run dev`), Content (`site.ts`, `src/content/projects/`, `src/assets/illustrations/`), e Build (`npm run build` / `npm run preview`).

- [ ] **Step 3: Verificação final**

```bash
npm test
npm run build
```

Expected: ambos exit 0. Confirmar que `dist/` **não** contém `resume.pdf`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
Polimento visual e README do portfolio Astro.

EOF
)"
```

---

## Spec coverage (self-review)

| Requisito da spec | Task |
|-------------------|------|
| Home única EN | 5 |
| Sidebar + projetos | 4–5 |
| Links externos | 3–4 |
| Social LinkedIn/GitHub/Blog | 2, 4 |
| SEO básico | 2 |
| Vercel static / `lucis.dev` | 1 (`site` + output static) |
| Sem resume no site | 2–6 (ausente de propósito) |
| Content Collections | 3 |
| `site.ts` | 2 |
| Georgia | 2 |
| Remover Gatsby | 1 |
| Copy inspirada no resume | 2–3 |
| Placeholders se woodcuts atrasarem | 3, 6 |

**Placeholders scan:** nenhuma TBD; URLs de SIP/Coast/Matrículas apontam a LinkedIn até haver URL pública do produto (decisão explícita, não gap).

**Type consistency:** `getPublishedProjects` → `CollectionEntry<'projects'>` → prop de `ProjectCard`; `site.skills` → `SkillPill`.
