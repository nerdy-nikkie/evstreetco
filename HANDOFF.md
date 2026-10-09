# Handoff

> Session-local files: none. Everything is in the repo. `node_modules/` and `dist/` were rebuilt
> during this session and are gitignored; nothing needs copying out.

_Written 2026-10-09 against `main` @ `9a5e134`._

## 1. Goal

- **What the user wants:** A launch-ready marketing site for **EV Street Co** (formerly Arclight),
  curbside Level 2 EV charging in Chicago. Property owners buy and own the curbside station, set
  their own rate, and earn per session. The site must never assert a fact that isn't settled.
- **Latest request:** Produce this handoff document. Previous work (Aug 28): rebrand to EV Street
  Co, move to evstreetco.com, and remove the Illinois electrical contractor licence card.
- **Done looks like:** evstreetco.com served over HTTPS from GitHub Pages; zero amber "TBD" chips
  on the page; estimate form verified to deliver to a monitored inbox; privacy and terms out of
  draft; `npm run check` clean.
- **Flow:**
  `src/brand.ts` (facts) → Astro pages/components → `npm run deploy` → `gh-pages` branch → GitHub
  Pages → evstreetco.com. The estimate form POSTs straight from the browser to Web3Forms, which
  emails the lead.

## 2. Environment

| Item                | Value                                                                                                                                                                                          |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Machine             | Claude Code cloud container (ephemeral). The owner also works locally (`Desktop/EV charging/`)                                                                                                 |
| OS                  | Ubuntu 24.04.5 LTS, x86_64                                                                                                                                                                     |
| CPU / RAM           | 4 vCPU / 15 GiB                                                                                                                                                                                |
| Network             | Outbound through the agent proxy; npm registry and GitHub reachable                                                                                                                            |
| Accounts / services | GitHub `nickavion/arclight-website` (repo + Pages); Web3Forms (form delivery); domain registrar for evstreetco.com (registrar not recorded); ComEd EVSP programme (application status unknown) |
| Runtimes            | Node v22.22.0, npm 10.9.4 (`.nvmrc` = `22`)                                                                                                                                                    |

## 3. What is installed and where

| Component             | Version                | Absolute path                              | Notes                                                                   |
| --------------------- | ---------------------- | ------------------------------------------ | ----------------------------------------------------------------------- |
| Repo checkout         | `main` @ `9a5e134`     | `/home/user/arclight-website`              | Branch `claude/handoff-vq8ilh` = `main` + this file                     |
| Node                  | 22.22.0                | `/opt/node22/bin/node`                     | Below `engines` (`>=22.22.3`): `npm ci` prints `EBADENGINE` but works   |
| npm                   | 10.9.4                 | `/opt/node22/bin/npm`                      |                                                                         |
| Astro                 | ^7.2.0                 | `/home/user/arclight-website/node_modules` | Tailwind 4, MDX, sitemap, partytown, astro-compress, astro-icon         |
| gh-pages (deploy CLI) | devDependency          | `/home/user/arclight-website/node_modules` | Used by `npm run deploy`                                                |
| Built site            | from `9a5e134`         | `/home/user/arclight-website/dist`         | 7 pages                                                                 |
| Live deploy           | `gh-pages` @ `19604cb` | `origin/gh-pages`                          | Pushed Aug 28 12:35:57, 17 s after `9a5e134`, so it should match `main` |

**Not installed:**

- `gh` CLI auth for this repo (GitHub access in the cloud session is through the MCP tools only)
- No CI workflow in the repo (`.github/workflows` absent); deploys are manual

## 4. How it works

- **Key files / entry points:**
  - `src/brand.ts`: every fact the site asserts (fee, pricing, hardware spec, rebate gate, payout,
    terms, form endpoint). `null` = unresolved → renders as an amber TBD chip via
    `src/components/Tbd.astro`. **Start here.**
  - `src/pages/`: `index`, `about`, `contact`, `for-drivers`, `404` (`.astro`); `privacy`,
    `terms` (`.mdx`, marked as drafts)
  - `src/components/EstimateForm.astro`: lead form (Web3Forms, fetch + inline success/failure)
  - `src/components/CurbsideDiagram.astro`: hero diagram
  - `src/components/CustomStyles.astro`, `src/assets/styles/tailwind.css`: brand colours
    (teal-from-mint primary, pale-yellow accent)
  - `src/config.yaml`: site URL (`https://evstreetco.com`), `base: '/'`, SEO, blog disabled
  - `src/navigation.ts`: header and footer
  - `public/CNAME` (`evstreetco.com`), `public/_headers` (immutable cache on `/_astro/*`)
  - `.agents/skills/*.md`: house guides for adding pages, components, styling, blog posts
- **Endpoints / commands:** Form POSTs to `https://api.web3forms.com/submit`. No backend of our own.
- **Config / env vars:** `PORT` overrides the dev port (default **4331**, `astro.config.ts:30`).
  No other env vars.
- **Start / stop / rebuild:** `npm run dev` (Ctrl-C to stop); `npm run build` → `dist/`;
  `npm run preview` serves `dist/`.
- **Run and test:**

```bash
npm ci
npm run dev            # http://localhost:4331
npm run check          # astro check + eslint + prettier --check
npm run build          # static output in dist/
npm run deploy         # build + push dist/ to gh-pages (goes live in ~1 min)
```

## 5. Done and verified

| What                                     | Evidence                                                                                                                                            |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Clean install                            | `npm ci` succeeds on Node 22.22.0 (with an `EBADENGINE` warning only)                                                                               |
| Production build                         | `npm run build`: 7 pages built, "Complete!", sitemap + robots.txt generated                                                                         |
| Type/astro check                         | `npm run check:astro`: 0 errors, 0 warnings, 0 hints                                                                                                |
| Lint                                     | `npm run check:eslint`: clean                                                                                                                       |
| Rebrand to EV Street Co + evstreetco.com | Commit `c8978da`; `public/CNAME` and `gh-pages:CNAME` both `evstreetco.com`                                                                         |
| Licence card removed from contact page   | Commit `9a5e134`                                                                                                                                    |
| Estimate form is wired (not disabled)    | Built `dist/index.html` and `dist/contact/index.html` post to `api.web3forms.com/submit`                                                            |
| TBD chips render where facts are missing | Built pages show: phone (contact), refund/fault policy (for-drivers), payout schedule, install + hardware warranty, insurance, legal review (terms) |

**Bugs found and fixed:**

- None this session (handoff only). Fixed previously: the deprecated `mask-icon` was dropped and
  the logo now uses the new artwork (`c8978da`).

## 6. Open problems

| Problem                               | Symptoms / exact error                                                                                                                                        | Likely cause (confirmed / suspected)                                                     | Next steps                                                                                                          |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| Contact email still on the old domain | `hello@arclightcurb.com` appears in built `dist/contact` and `dist/for-drivers`                                                                               | **Confirmed**: `BRAND.email` in `src/brand.ts` was not updated in the rebrand            | Owner picks the new address (e.g. `hello@evstreetco.com`), sets up the mailbox, updates `brand.ts`                  |
| Form delivery unverified              | None visible. The form submits, but nobody has confirmed a lead arrives                                                                                       | **Suspected** risk: Web3Forms key routes to an inbox nobody has confirmed                | Submit a real test from the live site; confirm the email lands in a monitored inbox                                 |
| Prettier check fails                  | `npm run check:prettier` → `Code style issues found in 6 files` (README.md, src/brand.ts, src/pages/contact.astro, for-drivers.astro, privacy.mdx, terms.mdx) | **Confirmed**: files edited without running `npm run fix`                                | `npm run fix:prettier`, review diff, commit                                                                         |
| Node version mismatch                 | `npm warn EBADENGINE ... required: { node: '>=22.22.3' }` on Node 22.22.0                                                                                     | **Confirmed**: `engines` is stricter than `.nvmrc` (`22`) and README ("22.12 or newer")  | Pick one: relax `engines` to `>=22.12` or pin `.nvmrc` to `22.22.3`, and align README                               |
| README out of date                    | Says the form is "intentionally disabled" and the licence number is "still unset"                                                                             | **Confirmed**: README not updated after Web3Forms was wired and the licence card removed | Update "Pre-launch status" in README                                                                                |
| Stale comments in `brand.ts`          | `domain` says "OPEN — not yet registered"; header points to `Desktop/EV charging/astrowind-EVC-template.md` (not in repo)                                     | **Confirmed**                                                                            | Confirm domain is registered, then drop the OPEN note; move the open-items list into the repo or delete the pointer |
| Dev port inconsistent                 | `.claude/launch.json` uses 4330; `astro.config.ts`/README use 4331                                                                                            | **Confirmed**, harmless                                                                  | Align on 4331                                                                                                       |
| Repo dotfiles on `gh-pages`           | `gh-pages` tree contains `.agents`, `.claude`, `.vscode`, `.nvmrc`, etc.                                                                                      | **Suspected**: branch first created from `main`, and `gh-pages -t` deploys keep dotfiles | Low priority; may publish internal notes under evstreetco.com/.agents/…; consider cleaning the branch once          |

## 7. Remaining TODO

Business decisions (owner) — each is a `null` in `src/brand.ts`:

1. **Session minimum** (`PRICING.sessionMinimum`, OPEN 1): decides whether the product works.
   With no minimum a host nets about $5.53/month; with a $5.00 minimum, about $78.15/month. No
   earnings language until set.
2. **Install price basis** (OPEN 2): confirm the $2,000 is *cost*, not customer price. The ABC
   price book's curbside line items alone total $4,479 retail before hardware.
3. **CDOT public-way permit cost** (`PRICING.cdotPublicWayPermit`, OPEN 3).
4. **ComEd EVSP approval** (`REBATE.isApprovedEVSP`, OPEN 5): no rebate copy until approved.
   The programme ends 2026-12-31.
5. Phone number, payout schedule, install and hardware warranty, insurance carried.
6. Legal review of `privacy.mdx` and `terms.mdx`; then remove the draft banners.
7. Claim Instagram/LinkedIn handles before adding `BRAND.social` links.

Engineering:

8. Fix the contact email once the new mailbox exists.
9. Send a live test submission through the estimate form.
10. `npm run fix:prettier`; align Node version (engines / `.nvmrc` / README); update README.
11. One-time domain setup outside the repo (see README "Custom domain"): DNS A records for the
    apex → GitHub Pages IPs, `www` CNAME → `nickavion.github.io`; Pages custom domain set to
    `evstreetco.com`; tick **Enforce HTTPS** once DNS resolves. **Not verified** from this session.
12. Optional: add a GitHub Actions workflow running `npm run check` + build on PRs.

## 8. Gotchas and decisions

- **User preferences / constraints:** Pre-revenue: no customers, logos, press or counts
  (`PROOF` stays at 0). Never fill an unknown with a plausible guess.
- **Deliberate choices and why:**
  - Unresolved facts are `null` and render as visible amber TBD chips so an unfinished claim
    can't ship by accident. Rule: _if a number is not in `brand.ts`, it does not go on the page._
  - Fee is settled at **$1 per session + 10%**: the percentage keeps the margin between 79% and
    83% at every session size.
  - Station spec is **9.6 kW**, not 12: NEC 625.41 continuous-load rule, 80% of a 50 A breaker
    at 240 V.
  - The word "weekly" for payouts was removed everywhere because there is no committed
    schedule. Don't reintroduce it.
  - Rebrand from Arclight → EV Street Co. The GitHub repo is still named `arclight-website`.
- **Looks wrong but intentional:**
  - `FORM_ACCESS_KEY` is committed in `src/brand.ts`. Web3Forms keys are public routing
    addresses, not secrets.
  - The form shows as disabled with an explanation if `FORM_ENDPOINT`/`FORM_ACCESS_KEY` is
    `null`. That is the designed fallback, not a bug. AstroWind's stock `<Form>` silently
    swallowed submissions, which is worse.
  - Amber TBD chips on the live site are expected until each fact is resolved.
  - Contractor licence card was removed on purpose (`9a5e134`). Don't restore it.
- **Do not touch:**
  - `public/CNAME`: removing it unbinds the custom domain on the next deploy.
  - `base: '/'` / `site` in `src/config.yaml`, unless the domain changes.
  - `HARDWARE.kW` (see above) and `FEE` (settled).
- **Failed approaches (don't retry):** AstroWind's built-in `<Form>` widget for leads (no
  `action`, drops submissions silently).
- **Secrets:** None in the repo. The Web3Forms key in `src/brand.ts` is public by design. Account
  access for GitHub, Web3Forms and the domain registrar is held by the owner (nickavion); no
  credentials are stored in this repo or session.
