# lucis.dev

Static portfolio for [lucis.dev](https://lucis.dev), built with [Astro](https://astro.build/) 5 and Tailwind CSS 4.

## Develop

```bash
nvm use
npm install
npm run dev
```

Requires Node 22 LTS (see `.nvmrc`).

## Content

| Location | Purpose |
|----------|---------|
| `src/data/site.ts` | Name, titles, bio, CTA, social links, skill tags, SEO |
| `src/content/projects/` | One Markdown file per featured project |
| `src/assets/illustrations/` | Woodcut artwork for avatar and project cards |

### Project frontmatter

Each file under `src/content/projects/` uses:

- `title`, `description`, `url`, `order`
- `illustration` — path to an image under `src/assets/illustrations/` (Astro `image()` schema)
- `draft` — set `true` to hide from the home page

### Illustrations (placeholders)

Final woodcut assets are not in this repo yet. Replace the SVG placeholders in place (same filenames) or update import paths in `Sidebar.astro` and project frontmatter.

| File | Used for |
|------|----------|
| `src/assets/illustrations/avatar.jpg` | Sidebar portrait |
| `src/assets/illustrations/sip.svg` | SIP project card |
| `src/assets/illustrations/coast.svg` | Coast project card |
| `src/assets/illustrations/matriculas.svg` | Matrículas project card |
| `src/assets/illustrations/deco.svg` | Deco project card |
| `src/assets/illustrations/ufcg-pro.svg` | UFCG Pro project card |

The site does not publish or link a resume PDF.

## Build

```bash
npm test
npm run build
npm run preview
```

Output is static files in `dist/` (suitable for Vercel or any static host).
