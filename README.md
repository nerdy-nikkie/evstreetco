# EV Street Co

Marketing site for EV Street Co, curbside EV charging in Chicago. Property owners buy and own
the charging station at their curb, set their own rate, and earn on every session.

Built with [Astro](https://astro.build) 7 and Tailwind CSS 4, on the
[AstroWind](https://github.com/arthelokyo/astrowind) template.

**Live:** https://evstreetco.com

## Running it

Requires Node 22.12 or newer.

```bash
npm install && npm run dev
```

The dev server comes up on port 4331. `npm run build` writes the static site to `dist/`.

## Deploying

The site is static and deploys from the `gh-pages` branch.

```bash
npm run deploy
```

That builds and pushes `dist/` to `gh-pages`. GitHub Pages serves it a minute or so later.

## Pre-launch status

This site is not finished. Several facts it needs are still unresolved, and rather than
inventing plausible values they are `null` in `src/brand.ts` and render as visible amber
"TBD" chips on the page. That is deliberate, so an unfinished claim cannot ship by accident.

<!-- Still unset: contractor licence number, -->
Still unset: phone, warranty terms, insurance, and payout schedule. The privacy policy and
terms of service are drafts and say so at the top of each page.

The estimate form is live. It posts to Web3Forms through `FORM_ENDPOINT` and `FORM_ACCESS_KEY`
in `src/brand.ts`. If either is cleared, the button is disabled on purpose, because a form
that posts nowhere loses leads silently.

## Where things live

| Path | Holds |
|---|---|
| `src/brand.ts` | Every fact the site asserts. Start here. |
| `src/config.yaml` | Site URL, base path, SEO, analytics |
| `src/navigation.ts` | Header and footer |
| `src/pages/index.astro` | The home page |
| `src/components/CurbsideDiagram.astro` | The hero diagram |
| `src/components/EstimateForm.astro` | The lead form |
| `src/components/CustomStyles.astro` | Brand colours and fonts |

## Custom domain

The site is configured for **evstreetco.com**: `site` is the domain and `base` is `/` in
`src/config.yaml`, and `public/CNAME` contains `evstreetco.com` (it ends up at the root of the
`gh-pages` branch on deploy, which is what tells GitHub Pages to serve the custom domain).

Remaining one-time setup, done outside this repo:

1. **DNS** at the registrar for evstreetco.com:
   - Four `A` records for the apex `@` → `185.199.108.153`, `185.199.109.153`,
     `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` → `nickavion.github.io`
2. **GitHub → repo Settings → Pages**: set Source to the `gh-pages` branch, enter
   `evstreetco.com` as the custom domain, and once DNS resolves tick **Enforce HTTPS**.
