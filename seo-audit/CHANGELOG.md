# SEO / AI visibility changes (branch seo/ai-visibility-overhaul)

Branched from origin/main at f8b3819 on 2026-11-24. Not pushed, merged or deployed.

Verification for every row: `npm run build` (vite-react-ssg prerender, format-dist, sitemap, seo-check: 80 pages, 0 problems), `eslint .` (132 errors and 6 warnings, the same set as origin/main, none new), and a script comparing the served no-JS HTML in `dist/` with a baseline build of origin/main on 17 routes (EN and FR home, pricing, four product pages, demo; EN faqs, comparison post, docs/credits). Title, meta description, canonical, hreflang and H1 are unchanged on all 17; every JSON-LD block parses. 159 checks, all pass.

| Change | File | Finding | How verified |
|---|---|---|---|
| format-dist resolves `dist` with `fileURLToPath`, so the build runs on Windows | scripts/format-dist.mjs | (build) | Build completes locally; was failing with ENOENT `C:\C:\...` |
| Organization gets `email`, `vatID`, SIREN `identifier`, `contactPoint`; `url` is the canonical home `/en/` | src/lib/schema.js | G7 | Facts match /mentions-legales and the docs support chapter; JSON-LD on all 17 routes carries them |
| Comparison-post link copy (EN, FR) | src/locales/en.js, src/locales/fr.js | G1 | Rendered text present in HTML |
| `ComparisonLink` component and its styles | src/components/ComparisonLink.jsx, src/poliris.css | G1 | `<a href="/{lang}/blog/poliris-comparison">` in the HTML |
| Comparison link above the closing CTA | src/pages/VisibilityPage.jsx, SentimentPage.jsx, TechnicalAuditPage.jsx, ContentWritingPage.jsx, PricingPage.jsx | G1 | Link present on the 10 EN/FR routes (it was on none of them; home and the blog index already linked it) |
| Pricing "Select plan" and "Try X" are `<a href="https://app.poliris.io">`; plain click still runs the existing handler (free -> app, signed in -> billing, else checkout modal); modified clicks follow the link | src/pages/PricingPage.jsx | G10 | 8+ anchors, 0 `<button class="pr-brand-cta">` on EN/FR pricing |
| Home website form gets `action=".../{lang}/onboarding" method="get"` and `name="website"` | src/components/Hero.jsx | G10 | Attributes in HTML; app onboarding reads `?website=` (poliris-frontend `app/[locale]/(onboarding)/onboarding/page.tsx`) |
| 308 `/(en|fr)/<path>/` to the slashless URL, last in `redirects` | vercel.json | G11 | Pattern tested with path-to-regexp 6.1.0 (Vercel's matcher): `/en/` and `/fr/` not matched, nested paths kept. **Not verified on Vercel**: needs a Preview deploy |
| Demo page agency "Talk to us" books the discovery call instead of opening the app | src/locales/en.js, src/locales/fr.js | B10 | Both demo pages link the card to cal.com |
| Mockups kept out of snippets: `aria-hidden` + `data-nosnippet` where the mockup has no live controls (technical audit overview, AuditVis, sentiment dashboard); `data-nosnippet` only where controls work (home engine demos, visibility dashboard). Fake tabs no longer focusable, two `href="#"` removed | src/components/SiteOverviewMockup.jsx, ProductCarousel.jsx, VisibilityDashboard.jsx, LandingPage.jsx, src/pages/SentimentPage.jsx | B14 | Attributes present in HTML |
| Engine marquee lists each name once in the HTML; loop copies added after hydration, `aria-hidden` | src/components/CtaBand.jsx | B15 | 8 items in HTML (was 24) |
| AI logo band loop copy: empty alt, `aria-hidden` | src/components/Hero.jsx | B15 | Markup check |
| Plan tiers, prices and credits move to one config; pricing cards, comparison table, calculator thresholds and Offer schema read it. Open contradictions recorded as TODO(verify) | src/content/facts.js, src/pages/PricingPage.jsx | G6 | Pricing HTML title/meta/H1 unchanged; Offer prices unchanged |
| Sitemap lastmod manifest updated (20 pages with changed text) | scripts/sitemap-lastmod.json | G16 | `npm run sitemap:update` on the final build |

## Already done on main (no change needed)

| Finding | Evidence |
|---|---|
| G4 legacy redirects | vercel.json (PR #11) and live curl: /tarifs/, /faq/, /services/, /a-propos/, /en/author/florian/ and others 308 |
| G12 www to apex | Live: `www.poliris.io/en/technical-audit` 308 to `poliris.io/en/technical-audit` (path kept) |
| G13 literal `/en/*` | Not in src, scripts, public, vercel.json or the build |
| G15 Technical Fixes chapter | Docs and sitemap use only `/docs/technical-fixes`; `/docs/implementation` 308s live |
| G16 lastmod | Already a content-hash manifest, not the deploy date |
| B7 FAQ "Talk to us" | Links to cal.com, not `#` |

## Prepared, not applied

Branch `seo/legacy-redirects-2` (one commit off origin/main, merges cleanly with this branch): 308 `/en/poliris/` to `/en/` and `/comparaison-seo-geo/` to `/fr/blog/poliris-comparison`. Waiting for approval.
