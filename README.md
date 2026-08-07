# lucis.dev

Portfolio pessoal de [Luciano de Oliveira](https://lucis.dev) — [Astro](https://astro.build/) 5 + Tailwind CSS 4, tipografia Georgia, deploy no [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Develop

```bash
nvm use          # Node 22
npm install
npm run dev
```

## Content

| Path | Conteúdo |
|------|----------|
| `src/data/site.ts` | Nome, títulos, socials, skills, SEO |
| `src/content/projects/*.md` | Projetos em destaque |
| `src/assets/illustrations/` | Avatar e woodcuts dos cards |

### Frontmatter dos projetos

- `title`, `description`, `order` (obrigatórios)
- `illustration` — imagem em `src/assets/illustrations/`
- `url` — opcional; sem URL o card não é link
- `draft: true` — omite da home

### Ilustrações

| Arquivo | Uso |
|---------|-----|
| `avatar.jpg` | Sidebar + favicon |
| `sip.jpg` | SIP / Santana |
| `coast.jpg` | Coast |
| `deco.jpg` | deco |
| `vtex.jpg` | VTEX |
| `zed.jpg` | ZED |
| `ufcg-pro.jpg` | UFCG Pro |

## Scripts

```bash
npm test           # Vitest
npm run check      # astro check
npm run build      # gera dist/
npm run preview    # preview local do build
npm run deploy     # build + wrangler deploy
```

## Deploy (Cloudflare Workers)

Config em `wrangler.jsonc` — assets estáticos de `dist/`, rotas `lucis.dev/*` e `www.lucis.dev/*`.

```bash
npm run deploy
```

Preview Workers: `https://lucis-dev.luciannojunior.workers.dev`

> Se o apex `lucis.dev` redirecionar para o blog, remova a Redirect Rule correspondente no dashboard da Cloudflare.
