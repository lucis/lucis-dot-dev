# Portfolio lucis.dev — reescrita em Astro

**Data:** 2026-08-07  
**Status:** aprovado em brainstorming; aguardando review do arquivo

## Objetivo

Substituir o site Gatsby 2 (template Smakosh, ~2021) por um portfolio estático moderno em Astro, alinhado ao layout editorial monocromático com ilustrações woodcut (mockup de referência).

## Escopo da v1

**Inclui**

- Home única (`/`) em inglês
- Sidebar + lista de projetos em destaque
- Links externos nos cards de projeto e no CTA “Learn more about me”
- Social: LinkedIn, GitHub, Blog (`https://blog.lucis.dev`)
- SEO básico (title, description, Open Graph mínimos)
- Deploy estático na Vercel (domínio `lucis.dev`)

**Fora da v1**

- Páginas About / detalhe de projeto / blog interno
- i18n (PT/EN) e toggle de idioma
- Dark mode
- Formulário de contato, reCAPTCHA, Notion, GitHub GraphQL
- Analytics (gtag pode voltar depois)
- PWA / service worker
- Resume PDF no site (não publicar nem linkar)

## Decisões de produto

| Tema | Decisão |
|------|----------|
| Idioma | Inglês only |
| Blog | Externo: `blog.lucis.dev` |
| Ilustrações | Assets finais fornecidos pelo autor (woodcut); plugar no layout |
| Destinos | URLs externas (projetos, CTA, socials) |
| Copy | Inspirar-se em `/Users/lucis/personal/resume/resume.pdf` (referência local; **não** vai para o repo nem para `public/`) |
| Repo | Limpar Gatsby por completo; Astro no mesmo repositório |

## Stack

| Peça | Escolha |
|------|---------|
| Framework | Astro 5, `output: 'static'` |
| Estilo | Tailwind CSS 4 + theme tokens |
| Conteúdo de projetos | Content Collections (`src/content/projects/`) |
| Metadados do site | `src/data/site.ts` |
| JS no cliente | Nenhum na v1 |
| Pacotes | npm (`package-lock.json`); remove `yarn.lock` |
| Node | 22 LTS (`.nvmrc`) |

## Arquitetura de pastas

```
src/
  components/
    Sidebar.astro
    SkillPill.astro
    ProjectCard.astro
    SocialLinks.astro
  content/
    projects/          # um .md por projeto
  data/
    site.ts            # nome, bio, CTA, socials, skill tags
  layouts/
    BaseLayout.astro
  pages/
    index.astro
  styles/
    global.css         # tokens, fontes, reset leve
public/
  favicon...
  illustrations/       # woodcuts (avatar + projetos), se não forem importados via assets
```

Home = layout duas colunas:

- Desktop: sidebar sticky ~32% à esquerda; main ~68% à direita
- Mobile: sidebar empilha acima da lista de projetos

## Modelo de conteúdo

### Collection `projects`

Frontmatter por arquivo:

| Campo | Tipo | Obrigatório | Notas |
|-------|------|-------------|--------|
| `title` | string | sim | Ex.: "SIP — AI-native Political Intelligence" |
| `description` | string | sim | 1–2 linhas no card |
| `illustration` | `image()` (Astro schema) | sim | arte woodcut do projeto; otimizada no build |
| `url` | string (URL) | sim | destino externo do card |
| `order` | number | sim | ordenação ascendente na home |
| `draft` | boolean | não | se `true`, omitir da home |

Corpo Markdown: opcional na v1 (não renderizado na home).

### `site.ts`

- `name`, `titles[]` (ex.: Staff Product Engineer, AI-native builder)
- `bio` (parágrafo em itálico na sidebar)
- `cta`: `{ label, href }` — “Learn more about me” → URL externa
- `socials`: LinkedIn, GitHub, Blog
- `skills`: tags do pill (Product Engineer, TypeScript, …)
- `seo`: title, description, canonical `https://lucis.dev`

### Referência de copy (fora do site)

O arquivo local `/Users/lucis/personal/resume/resume.pdf` serve só para inspirar bio, titles, skill tags e descrições dos projetos em inglês. Não copiar para `public/`, não versionar no repo, não linkar na UI.

## Componentes

| Componente | Responsabilidade |
|------------|------------------|
| `BaseLayout` | shell HTML, meta SEO, fontes, `global.css` |
| `Sidebar` | avatar circular, nome, titles, bio, CTA, socials |
| `SkillPill` | ícone + tags separadas por `·` |
| `ProjectCard` | ilustração \| título + descrição \| seta; `<a>` externo; hover sutil |
| `SocialLinks` | LinkedIn, GitHub, Blog |

`index.astro` monta: `BaseLayout` → grid → `Sidebar` \| (`SkillPill` + heading “Featured projects” + lista de `ProjectCard`).

## Visual / tokens

- Fundo off-white; texto preto; bordas cinza muito claras
- Tipografia: **Georgia** (serif) para display e body — stack `Georgia, "Times New Roman", Times, serif`
- Cards: borda leve, cantos levemente arredondados; hover escurece borda ou fundo mínimo
- Ilustrações woodcut como âncora visual (avatar circular; thumbs retangulares nos cards)
- Espaçamento generoso; composição de uma coluna de conteúdo, sem dashboard de cards genéricos

## Remoções explícitas do legado Gatsby

Apagar na migração: `gatsby-*.js`, deps Gatsby/React 16/styled-components/Formik/etc., `src/` antigo do template, `yarn.lock` se migrar de package manager, plugins Notion/GitHub GraphQL, formulário de contato, PWA offline.

Preservar apenas o que ainda fizer sentido: domínio, eventual favicon/branding se reaproveitável, e o crédito histórico no git (não no UI).

## Critérios de sucesso

- `astro build` gera site estático sem erros
- Home corresponde ao mockup em estrutura (sidebar + pill + projetos)
- Todos os projetos, CTA e socials abrem URLs corretas
- Lighthouse razoável em performance (site quase sem JS)
- Conteúdo de projeto editável sem tocar em componentes (só collection + assets)

## Riscos / notas

- Qualidade visual depende dos assets woodcut entregues; sem eles, usar paths definidos e placeholders mínimos só se o asset atrasar
- Conteúdo em inglês (bio, skills, projetos) deve ser derivado do mockup + do resume PDF de referência, sem publicar o PDF
