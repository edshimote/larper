# NEXT_STAGE_PROMPT

## Summary
Written so far: design system, Navbar, Hero (R3F core), Services, Stage 3.1 gallery (seven cards,
filters, viewer), Stage 3.2–3.5 demo sites (all 7 routes under `/projects/*`), Stage 3.6
integration (gallery → live iframe `ProjectViewer`), Stage 4 `TerminalSection` (`/#terminal`), and
Stage 5: `ContactSection` (`/#contact`) — Email/WhatsApp contact buttons (GitHub/LinkedIn ready via
`CONTACT.github`/`CONTACT.linkedin`, both `null` until the owner supplies them), a full contact form
with server-side delivery through a configurable webhook (`src/app/api/contact/route.ts` — never
fakes success when unconfigured), and an interactive "Project Estimator" producing an illustrative,
non-binding USD range with a CTA that hands its selections into the contact form. Existing CTAs
(Services/Projects/ProjectViewer) now point at the real `#contact` section. `about` is STILL a
placeholder — intentionally out of Stage 5's scope. NOTHING has been installed, built or
browser-tested (every authoring sandbox so far, including this one, had no network). Stages 1–5 are
implemented but NOT marked complete in ROADMAP.md for that reason. `CASE_STUDIES` is still empty.

## Prompt for the next AI — Stage 6: "Final Optimization, SEO, Testing & Deployment"
Continue EDUARDO.DEV. Read PROJECT_CONTEXT.md (especially "Stage 5"), ROADMAP.md, CHANGELOG.md and
src/ first. Do not recreate the app or touch Hero/Navbar/Services/Projects/Terminal/Contact behavior
beyond what this stage needs.
1. Before any new work: `npm install && npm run lint && npm run build`. This has never succeeded on
   this codebase (every stage, 1 through 5, had no outbound network). If it finally runs, fix every
   real error it surfaces and log each fix in CHANGELOG.md; only then mark 1–5 complete in
   ROADMAP.md with what actually passed. If network is unavailable again, say so plainly, do the
   same isolated-check approach as prior stages, and do NOT mark anything complete that wasn't
   build/browser-verified.
2. Scope Stage 6 per the ROADMAP.md entry: metadata/Open Graph/favicon completion, `robots.txt` +
   `sitemap.xml`, semantic/accessibility pass, performance (image/font loading, bundle size,
   Core Web Vitals once buildable), and a final cross-stage QA pass (every nav link, every CTA,
   every demo route, EN/PT parity, the contact form's unconfigured-state fallback). Payments or an
   admin area are explicitly out of scope unless the owner requests them.
3. No invented content, no new unapproved dependencies, `CASE_STUDIES` stays empty unless the owner
   supplies real projects. `about` remains a placeholder unless the owner asks for it to be scoped —
   confirm before building it, since it was deliberately left out of Stages 1–5.
4. `CONTACT_FORM_WEBHOOK_URL` / `CONTACT_FORM_WEBHOOK_TOKEN` are still unset — the contact form will
   correctly show its "not configured" fallback until the owner provides a webhook endpoint. Do not
   hardcode a provider; the route already accepts any JSON-accepting endpoint.
5. Update all four docs with what was actually built/fixed/verified vs. what remains unverified.

## If network is unavailable again
Every stage so far (1 through 5) had no outbound network, so npm install/next build/a real browser
check have never actually run on this codebase. If Stage 6 hits the same limitation, report it
honestly and keep using isolated TypeScript syntax checks (the sandbox has a global `typescript`
install usable via `tsc`/`ts-node`/`ts.transpileModule` even without the project's own
`node_modules`) plus careful manual review and small Node scripts that transpile-and-run the pure
logic (i18n parity, data wiring) — but make clear in the docs that these are not a substitute for
the real build.
