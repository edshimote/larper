# PROJECT_CONTEXT — EDUARDO.DEV

## Goal
Premium international portfolio for Eduardo (Brazilian developer) to win clients, mainly US small/medium businesses needing websites, automations, bots and custom systems. Primary language: American English (EN), PT prepared. Never invent testimonials, clients, certifications, awards or project counts.

## Visual identity — Dark Futuristic Minimalism
- bg #07090F · surface #101420 · elevated #171D2B · primary #7958FF · secondary #00D9FF · ink #F8FAFC · muted #94A3B8 · line rgba(255,255,255,.08)
- Fonts (next/font): Space Grotesk (`font-display`), Inter (`font-sans`), JetBrains Mono (`font-mono`)
- Fluid type scale in tailwind.config.ts: `text-display-xl`, `text-display-lg`, `text-lead`
- Utilities in globals.css: `.container-x`, `.glass`, `.tech-grid`
- Tokens: tailwind.config.ts + CSS variables in globals.css. Reuse; do not hard-code colors.

## Stack (package.json, caret ranges; none installed/locked yet — no package-lock.json)
Next.js ^15 (App Router) · React ^19 · TypeScript ^5.7 · Tailwind CSS ^3.4 · framer-motion ^11.15 · lucide-react ^0.469 · three ^0.171 · @react-three/fiber ^9.

## Structure
```
src/app/            layout.tsx (fonts, metadata, provider) · page.tsx · globals.css
src/lib/i18n.ts     EN/PT dictionary (add keys to BOTH languages)
src/components/
  providers/LanguageProvider.tsx   useLanguage() -> { locale, t, toggle }; persists in localStorage
  layout/   Navbar.tsx (SECTIONS ids, active indicator, mobile menu) · Footer.tsx · SectionPlaceholder.tsx
  hero/     Hero.tsx · HeroVisual.tsx (WebGL detect, reduced-motion, error boundary, lazy) · CoreScene.tsx (R3F) · CoreFallback.tsx (SVG/CSS)
  ui/       Button.tsx (anchor-based; primary/secondary/ghost) · Badge.tsx
```

## Decisions
- Section ids: home, services, projects, about, contact. The last four are `SectionPlaceholder` stubs so nav links never break; replace each with the real section keeping the same `id`.
- 3D lazy-loaded (`next/dynamic`, ssr:false). SVG fallback without WebGL or on error; static fallback under prefers-reduced-motion.
- Python/Node.js/C#/TypeScript float around the visual; Web Development/Automation badges sit under the CTAs.
- Nav CTA "Let's Talk" -> #contact. Language switch only toggles dictionary/`lang` attr (single URL).

## State
Stages 1–6 are all code-written but NEVER installed, built or opened in a browser — every authoring sandbox, including this one, has had no network access (confirmed again in Stage 6: `npm install` timed out silently, same as every direct DNS/registry check in every prior stage). First action for the next person/AI with real network access: `npm install && npm run lint && npm run build`, fix whatever appears, log it in CHANGELOG.md.

## Pending
A real `npm install && npm run build` + browser pass on this codebase (never done, 1–6). Favicon/OG image are now generated at runtime (`src/app/icon.tsx`/`opengraph-image.tsx`), unverified in a real browser. `NEXT_PUBLIC_SITE_URL` still points at a placeholder — set it to the real domain once deployed (see DEPLOYMENT.md).

## Next AI
Read this file, ROADMAP.md, CHANGELOG.md and NEXT_STAGE_PROMPT.md. Do not recreate the app. Keep tokens, i18n and component conventions; update all docs when done.

---
# Stage 2 additions (Services)
## Components (src/components/services/)
ServicesSection (header + bento grid + renders showcase, tech, CTA; wrapped in `MotionConfig reducedMotion="user"`) · ServiceCard · WebsitePreview (`kind` barber|restaurant; fictional "Northstar Barber Studio" / "Ember & Oak Kitchen") · BotPreview (timed simulated chat, replay) · AutomationPreview (SVG nodes, "Run Demo", autoplays once in view) · SoftwarePreview (sample-data dashboard) · InterfacePreview (hover highlights) · InteractivePreview (CSS 3D orbital, cursor tilt, no WebGL) · ServiceShowcase (accessible tabs with arrow keys; id `showcase`) · TechStack · ServicesCTA · useActive (pauses previews off-screen).
## Behavior
- Section ids: `services` (ServicesSection), `showcase` (inside it). Card CTAs for web/bots/auto/soft scroll to `#showcase` and select the tab via window event `showcase:select`; UI and Interactive cards link to `#projects` (placeholder until Stage 3).
- Only one WebGL canvas exists (the Hero). Stage 2 previews are DOM/SVG/CSS.
- All demo content is labeled as illustrative; no client names, testimonials or metrics.
- i18n: same Stage 1 system. `Dictionary` is typed from the EN object; PT must satisfy it. Tech names are not translated.
- Tech icons are monogram tiles (no brand logos bundled). No experience levels or years are claimed.
## Pending config
- `src/lib/contact.ts` now holds the owner's real email and phone (+55 11 94480-6602). "Start a Project" opens mailto; email/phone also shown as links in the CTA. The phone is also the owner's WhatsApp (confirmed): shown as a wa.me link. The email is for direct contact. Full form = Stage 5.
## Limitations / unverified
- Never installed, built or browser-tested (no network in authoring sandbox). Only a partial tsc pass without type packages was possible.
- Visual tuning (card heights, bento proportions, mobile spacing) needs real-browser review.
- Bot and automation demos use timers; they run when in view.

---
# Stage 3 plan — subdivided
Stage 3 (Projects) is split into 3.1 Project Gallery · 3.2 Barbershop & Restaurant · 3.3 Logistics & E-Commerce · 3.4 Automation & Bots · 3.5 Interactive 3D · 3.6 Integration & Polish. Only 3.1 is implemented. Never start the next sub-stage unprompted.

# Stage 3.1 — Project Gallery ("Selected Work.")
Evolved the existing Stage 3 gallery in place (no duplicate components, no new libraries). The previous generic concepts (booking bot, workflow, dashboard, interface system, CSS-3D composition) were replaced in the gallery by the six named projects; their preview components still exist in `components/services/` and keep powering the Services section/showcase.
## Header copy (EN, i18n `projects.*`)
Eyebrow "PROJECTS" · title "Selected Work." · headline "Crafted to Impress. Built to Perform." · desc "Explore interactive concepts, digital products, and development projects that demonstrate what's possible."
## Components (src/components/projects/)
ProjectsSection (id `projects`, `MotionConfig reducedMotion="user"`, filter state, asymmetric `bento(n)` layout, AnimatePresence `popLayout` for filter transitions, per-item scroll reveal + stagger, "your project" banner, viewer host) · ProjectFilters (chips, sliding pill via `layoutId`, "Soon" tag on empty categories, `aria-pressed`) · ProjectCard (`variant` default|feature|wide; sets `--accent`; category chips, type line, label badge, stack, "Explore Project" button, "Demo Coming Soon" status, hover glow + subtle preview zoom; preview is `inert`) · ProjectEmptyState (elegant empty state, used by the 3D filter) · ProjectArt (NEW previews: Northline, Vanta, FlowCore, Nexus; DOM/SVG/CSS, no images/URLs) · ProjectVisual (maps concept id -> preview; Northstar/Ember reuse Stage 2 `WebsitePreview`) · ProjectViewer (unchanged behavior; now shows type line + "Demo Coming Soon"; device toggle when categories include `web`) · TiltStage (unchanged).
There is no separate FeaturedProject file: the featured treatment is `ProjectCard variant="feature"` (first item of the visible list) to avoid duplicate components.
## Data (src/lib/projects.ts)
- `categories: ProjectCategory[]` (multi-category). `FILTERS = all, web, apps, bots, auto, 3d`. `matchesFilter()`.
- `CONCEPTS` (ids = visual keys = i18n keys `projects.concepts[id]`): northstar (web) · ember (web) · northline (web) · vanta (web+apps) · flowcore (apps+auto) · nexus (apps+bots). Order = display order; first = featured.
- Every concept has `label` ("concept" -> "Concept Project", "demo" -> "Interactive Demo"), `accent` (fictional brand color; glow/dots only), `demoRoute` (null for all today).
- 3D has zero projects on purpose (empty state) until Stage 3.5.
- `CASE_STUDIES` is still EMPTY (owner has not supplied real projects). Real ones would show first (and become the featured card). Never invent clients, results, testimonials.
- Route preparation: `projectRoute(id)` = `/projects/<id>`, `projectHref(p)`, `hasDemo(p)`. A card shows "Demo Coming Soon" while `demoRoute` is null and NOTHING links to a page. When a sub-stage builds a real demo page, create the route (App Router `src/app/projects/[slug]/page.tsx` or a folder per project) and only then set `demoRoute`; the card/viewer must then render a real link.
## Cross-section wiring
- Navbar unchanged: `projects` id already in SECTIONS, `#projects` anchor works.
- Services cards "Interface Design" -> filter `apps`; "Interactive Experiences" -> filter `3d` (shows the empty state until 3.5). Event: `window` `projects:filter` (detail = filter id).
## i18n
New keys in EN + PT (same typed dictionary): `projects.{headline,soon,shown,featured,kinds.demo,comingSoon,empty,concepts[id].type,filters.apps/3d}` and `demo.art.{northline,vanta,flowcore,nexus}`. Brand names are not translated. Removed keys: old concept copy (bot/auto/soft/ui/xp), `filters.soft/design`.
## Verification status (honest)
DONE: isolated `tsc --strict` on `i18n.ts` + `projects.ts` (passes, so PT/EN parity and concept keys are type-checked); syntax check (TypeScript transpile) of all 35 source files, 0 errors; Node logic test of filters/counts/bento layouts for every filter (all, web 4, apps 3, bots 1, auto 1, 3d 0) and EN/PT copy completeness; grep confirmed no href to non-existent pages (only `contactHref` and optional case-study links).
NOT DONE (no network, no node_modules): `npm install`, `next build`, type-check of components (React/framer-motion types missing), any browser run, responsive/overflow check, animation/reduced-motion check, keyboard/modal check, visual tuning. Therefore 3.1 is NOT marked complete in ROADMAP.md.
## Things to watch when first built
`inert` prop typing on React 19 · Tailwind arbitrary classes in ProjectCard (`hover:border-[color:color-mix(...)]`) · `motion.li layout` + `AnimatePresence mode="popLayout"` inside a CSS grid (row-span featured card) · featured card height vs. neighbours on lg · text size inside the new previews on small cards · `ART` map typed as `(p) => ReactNode` used as JSX component.

# Stage 3.2 — Barbershop & Restaurant demo websites
Two independent, navigable concept sites inside the portfolio. Fictional; each shows "Concept Project" (portfolio top bar) and a footer notice "Concept website created for portfolio demonstration."
## Routes (static App Router folders, each with its own layout/fonts)
- `/projects/northstar-barber` -> `src/app/projects/northstar-barber/{layout,page}.tsx` (Playfair Display via next/font, var `--font-playfair`)
- `/projects/ember-oak` -> `src/app/projects/ember-oak/{layout,page}.tsx` (Cormorant Garamond, var `--font-cormorant`)
- `projects.ts`: `demoRoute` is now set for `northstar` and `ember`; the other four cards still say "Demo Coming Soon" and link nowhere. Card "Explore Project" + preview overlay are `next/link` to the route when `projectHref()` exists; the viewer gets an "Open demo" button. Return path: top bar link -> `/#projects`.
## Components (src/components/demos/)
- `shared/`: DemoTopBar (back to portfolio, "Concept Project", EN/PT switch; portfolio tokens) · ArtTile (original gradient+icon artwork; optional `src` for real photos) · Lightbox (accessible enlarged view: focus trap, Esc, arrows, scroll lock; themed by props) · Reveal (scroll reveal) · useDays (next N days, built after mount)
- `northstar/`: NorthstarSite (header + mobile menu, hero, services, about, footer; `MotionConfig reducedMotion="user"`) · NorthstarGallery · NorthstarBooking (4-step demo: service -> date -> time -> summary/confirm) · data.ts (prices, times, art, `northstar:select` event)
- `ember/`: EmberSite (header + mobile menu, hero, story, footer) · EmberMenu (accessible tabs with arrow keys, animated category switch, 3 dishes per category) · EmberGallery · EmberReservations (date, time, guests stepper, summary, confirm) · data.ts
## Identity (hard-coded on purpose, scoped to each site; portfolio tokens are NOT used inside the sites)
Northstar: #0B0B0B / #171717 / gold #C6A667 / #F5F5F5 / #A3A3A3. Ember & Oak: #17120F / #241C17 / accent #C58B53 / cream #F5EBDD / #B5A89C.
## Copy / i18n
`demos.{common,northstar,ember}` in `src/lib/i18n.ts`, EN + PT, same typed dictionary. Fictional prices live in each `data.ts`, names/descriptions in i18n (same array order; lengths verified by script). New project keys: `projects.openDemo`, `projects.demoReady`.
## Required strings (verbatim in EN)
Hero titles, CTAs, "Demo completed — no actual booking was made.", "Reservation preview completed. No real reservation was submitted." — all present.
## Dependencies
None added. Uses `next/font/google` (needs network at build time), framer-motion, lucide-react (already installed).
## Decisions / limitations
- NO PHOTOGRAPHS: no legally usable photo source was available offline and no external URLs are allowed, so all imagery is original generated artwork (ArtTile). To use real photos later: put licensed files in `/public/demos/...` and set `src` in the `GALLERY_ART` entries (and add alt/credit as needed).
- Booking/reservation are local React state only: nothing is stored, sent, or tied to a calendar. Times and dates are illustrative (dates = next 7 days from today, computed in the browser).
- Sections have `scroll-margin-top: 7rem` (inline) to clear the two sticky bars. Smooth scrolling comes from the global `html { scroll-behavior: smooth }` (reduced-motion handled in globals.css).
- Concept sites show no address, phone, social links or invented awards/testimonials/years.
## Verification status (honest)
DONE: isolated strict `tsc` (i18n + projects); stub-based type pass over every file in src (React/framer-motion/lucide/next stubbed, so only i18n key/shape and plain TS errors are meaningful; the remaining reported errors were stub artifacts); syntax check of 53 files, 0 errors; script check that i18n arrays match data arrays (services 4, gallery 6+6, menu 3x4, EN+PT) and required strings exist.
NOT DONE (no network/node_modules): `npm install`, `next build` (incl. Google Fonts download), real type-check, any browser run, responsive/overflow check, keyboard/lightbox/tab behavior, animation tuning. Stage 3.2 is therefore NOT marked complete.
## Watch when first built
Tailwind arbitrary `font-[family-name:var(--font-playfair)]` · `ArtTile` `LucideIcon` type import · Lightbox/AnimatePresence exit · sticky stacking (top bar z-50, site header z-40 at `top-10`) · hero heights on small phones · `inert` typing (from 3.1).

# Stage 3.3 — Logistics & E-Commerce demo websites
Two more independent, navigable concept sites inside the portfolio, same pattern as 3.2. Fictional; each shows "Concept Project" (portfolio top bar) and a footer notice "Concept website created for portfolio demonstration."
## Routes (static App Router folders, each with its own layout)
- `/projects/northline-logistics` -> `src/app/projects/northline-logistics/{layout,page}.tsx`. Deliberately reuses the portfolio's own `font-sans`/`font-display` (Inter + Space Grotesk, already loaded in the root layout) instead of a new `next/font` instance — that pairing is exactly what this brand's identity calls for, so duplicating the font fetch would add nothing.
- `/projects/vanta-store` -> `src/app/projects/vanta-store/{layout,page}.tsx` (Manrope via next/font, var `--font-manrope`, used for display text only; body stays on the portfolio's Inter).
- `projects.ts`: `demoRoute` is now set for `northline` and `vanta`. The remaining two cards (FlowCore, Nexus) are untouched and still say "Demo Coming Soon".
## Components (src/components/demos/)
- `northline/`: NorthlineSite (header + mobile menu, hero, services, about, process, footer; `MotionConfig reducedMotion="user"`) · NorthlineTracking (fixed-code shipment tracker) · NorthlineQuote (quote simulator with a processing animation) · data.ts (service icons, fixed tracking demo codes, cities, cargo types, modes)
- `vanta/`: VantaSite (header incl. cart button, mobile menu, hero, footer; wraps everything in `CartProvider`) · VantaCatalog (category filter + price sort + product grid, opens the product modal) · VantaProductModal (accessible dialog: focus trap, Esc, quantity stepper, add to cart) · VantaCart (accessible slide-over: focus trap, Esc, qty stepper, remove, subtotal, demo checkout) · cart-context.tsx (`CartProvider`/`useCart`, local React state only) · data.ts (9 fictional products, categories, art specs)
- Both reuse `src/components/demos/shared` (`ArtTile`, `Reveal`, `DemoTopBar`); Northline's tracker/quote and Vanta's modal/cart build their own small accessible-dialog logic (same focus-trap/Esc pattern as `Lightbox`) since they show structured data, not an image gallery.
## Identity (hard-coded on purpose, scoped to each site; portfolio tokens are NOT reused for color)
Northline Logistics: navy #0A1628 / #0F2238 / elevated #132A45, electric blue accent #38BDF8, ink #F8FAFC, muted #94A3B8 — matches the fictional brand's own `accent` in `projects.ts`. Vanta Store: near-black #0A0A0A / #141414, ink #FAFAFA, muted #A1A1AA, lime accent #BEF264 (used sparingly, CTA/price only) — also matches its `projects.ts` accent.
## Interactive demos (all local state, nothing sent anywhere)
- Northline shipment tracking: recognizes ONLY three fixed, fictional codes (`NL-48213`, `NL-77050`, `NL-90456`, shown as clickable sample chips) and renders a 4-stage timeline. No real carrier/API.
- Northline quote simulator: origin/destination (fixed city list)/cargo type/weight/mode form → ~1.4s simulated processing animation → demo summary with a reference code and an illustrative transit-time range. Deliberately shows **no price, real or fictional** (stricter than the 3.2 pattern) — the result is explicitly labeled a demonstration and nothing is sent anywhere.
- Vanta catalog: 9 fictional products across 5 categories (bags, apparel, home, tech, accessories), category filter + price sort, product detail modal with a quantity stepper.
- Vanta cart: add/remove/quantity, live subtotal, "Checkout (Demo)" clears the cart and shows a "Demo — no purchase was made." confirmation. No payment, backend or persistence of any kind.
## Copy / i18n
`demos.northline` and `demos.vanta` added to `src/lib/i18n.ts`, EN + PT, same typed `Dictionary` (PT type-checked against EN in isolation — see Verification below). Product/service names and descriptions live in i18n (same order as `data.ts`); fictional prices, tracking codes, cities and cargo/mode keys live in each `data.ts`.
## Required strings (verbatim in EN)
Hero title "Moving Business Forward." (Northline) · cart confirmation "Demo — no purchase was made." (Vanta) · tracking note stating codes/carriers are fictional and not connected to any real system · quote note stating no real quote/price was generated and no information was sent.
## Dependencies
None added. Vanta's layout adds one more `next/font/google` family (Manrope, needs network at build time, same as Playfair/Cormorant in 3.2); Northline's layout adds none.
## Verification status (honest)
This sandbox also had no network (same limitation as every stage so far), so `npm install`/`next build`/a real component type-check/any browser run were **not possible** here either. What WAS done, without node_modules:
- Isolated strict `tsc --strict` on `i18n.ts` + `projects.ts` together (0 errors) — confirms the new `demos.northline`/`demos.vanta` PT blocks satisfy the typed `Dictionary`, and that `projects.ts`'s new `demoRoute` values type-check.
- Syntax check (TypeScript parse, no type info) of all 67 files in `src/`, 0 errors.
- A Node script transpiled `i18n.ts`, `projects.ts` and both new `data.ts` files (stubbing the `lucide-react` value import) and ran real runtime assertions: EN/PT leaf-key parity for `demos.northline`/`demos.vanta`, array lengths (6 services, 4 process steps, 3 about points, 4 tracking stages, 5 cargo types, 3 modes, 9 Vanta products, 6 categories) matching between i18n and `data.ts`, required verbatim strings present, `projects.ts` `demoRoute`/`projectHref` wiring correct for northline/vanta, and that the 3.1/3.2/3.4 cards (flowcore, nexus, northstar, ember) were left untouched.
- Diffed the full `src/` tree against the Stage 3.2 zip: confirms `i18n.ts` had zero lines removed (purely additive) and `projects.ts` changed only the two `demoRoute` values + one comment; every other existing file is byte-identical.
NOT DONE (no network, no node_modules, same as every prior stage): `npm install`, `next build` (incl. the Manrope Google Fonts fetch), a real component type-check (no `@types/react`/`framer-motion`/`next` types available offline), any browser run, responsive/overflow check, keyboard/focus-trap behavior in a real browser, animation/reduced-motion check, visual tuning. Therefore 3.3 is NOT marked complete in ROADMAP.md, same as 3.1/3.2.
## Watch when first built
Manrope `next/font` fetch (network required) · `font-sans`/`font-display` on Northline resolving correctly outside the root layout's `<html>` (they're applied via CSS variables on `<html>`, which nested routes inherit, so this should just work, but it's unverified in a browser) · focus trap + body-scroll-lock interplay between `VantaProductModal` and `VantaCart` if a person opens the cart from inside the product modal · `CartProvider` placement (wraps the whole `VantaSite`, so the header cart icon and the catalog share one instance) · `inert`/dialog stacking consistent with 3.1/3.2 (`z-[80]` for product modal/cart, topbar `z-50`, site header `z-40`).

# Stage 3.4 — Automation & Bots (FlowCore Automation, Nexus Bot Console)
Two more independent, navigable concept sites, same pattern as 3.2/3.3, but SaaS dashboard/console concepts rather than marketing sites. Fictional; each shows "Concept Project" (portfolio top bar) and a footer notice "Concept dashboard created for portfolio demonstration."
## Routes (static App Router folders, each with its own layout)
- `/projects/flowcore-automation` -> `src/app/projects/flowcore-automation/{layout,page}.tsx` (Sora via next/font, var `--font-sora`, used for display text only; body stays on the portfolio's Inter, same pattern as Vanta/Manrope in 3.3).
- `/projects/nexus-bot-console` -> `src/app/projects/nexus-bot-console/{layout,page}.tsx` (Space Mono via next/font, var `--font-space-mono`).
- `projects.ts`: `demoRoute` is now set for `flowcore` and `nexus`. This is the last pair of concept cards — every card in the gallery links to a real demo except the `3d` filter, which stays an intentional empty state until Stage 3.5.
## Components (src/components/demos/)
- `flowcore/`: FlowCoreSite (header + mobile menu, hero, stats grid, workflow cards, footer; `MotionConfig reducedMotion="user"`) · FlowCoreRunner (full-page version of the Stage 2 `AutomationPreview`: a column of connected workflow nodes that light up one at a time on "Run Automation"/"Run Again", a live execution log that fills in alongside it, "Reset", and a sample run-history table) · data.ts (step icons, workflow icons, history durations)
- `nexus/`: NexusSite (header + mobile menu, hero, footer) · NexusBots (3 fictional bots, each with its own local Start/Stop toggle and Online/Offline badge) · NexusChat (full-page version of the Stage 2 `BotPreview`: bot selector, replayable sample conversation, a message input that always gets a predefined demo reply) · NexusTerminal (command console: `help`, `status`, `ping` → "Pong.", `restart`, `clear`, all handled with local React state — no `eval`, no arbitrary code execution, no system commands) · data.ts (bot icons, command list)
- Both reuse `src/components/demos/shared` (`ArtTile`, `Reveal`, `DemoTopBar`). No `Lightbox`/`useDays` — neither dashboard needed a gallery or a date picker.
## Identity (hard-coded on purpose, scoped to each site; portfolio tokens are NOT reused for color)
FlowCore Automation: near-black green-tinted bg #07140F / surface #0F2B20 / elevated #132E22, emerald accent #34D399 (also matches its `projects.ts` accent), with violet/cyan used sparingly in hero gradients — a dark SaaS-premium palette per the brief. Nexus Bot Console: near-black teal-tinted bg #071219 / surface #0B2227 / elevated #0F2A30, cyan accent #22D3EE (matches its `projects.ts` accent).
## Interactive demos (all local state, nothing sent anywhere)
- FlowCore runner: "Run Automation" animates through 5 steps (Trigger → Validate Data → Transform → Notify → Complete) with timed state transitions (`setTimeout`, cleared on unmount/reset), a connecting line that fills in per completed step, and a live execution log that appends one line per step. "Run Again" restarts the simulation; "Reset" clears it. Workflow cards and the run-history table show fixed sample data, explicitly labeled.
- Nexus bots: each bot's Online/Offline state is local `useState`, toggled independently by its own Start/Stop button — no shared backend, no real bot platform.
- Nexus chat: selecting a bot resets and replays a short sample conversation; typing a message and sending it appends the message, shows a typing indicator, then appends one predefined reply. Switching bots replays the sample conversation again.
- Nexus console: a fixed command set (`help`/`status`/`ping`/`restart`/`clear`) matched against lower-cased input; `clear` empties the local line buffer, everything else appends a predefined response line; unrecognized input gets a generic "unknown command" response. No system commands, no `eval`, no code execution of any kind.
## Copy / i18n
`demos.flowcore` and `demos.nexus` added to `src/lib/i18n.ts`, EN + PT, same typed `Dictionary` (PT type-checked against EN in isolation — see Verification below). Icons/step order/command list live in each `data.ts`; all copy (including the "Sample data" labeling) lives in i18n.
## Dependencies
None added. FlowCore's layout adds one `next/font/google` family (Sora); Nexus's layout adds one more (Space Mono) — same pattern as Playfair/Cormorant (3.2) and Manrope (3.3), needs network at build time.
## Decisions / limitations
- No invented client names, uptime/performance numbers, or integrations that don't exist — every stat, workflow, bot and log line is explicitly fictional/sample data, consistent with `demo.art.flowcore`/`demo.art.nexus` from Stage 2/3.1.
- The runner and chat demos use `setTimeout`-based simulations like the Stage 2 previews; both clean up their timers on unmount and on reset/replay to avoid stacking stale timeouts.
- No new WebGL canvas (the one-canvas rule from the Hero is untouched); both dashboards are DOM/SVG/CSS only.
## Verification status (honest)
This sandbox also had no network (same limitation as every stage so far), so `npm install`/`next build`/a real component type-check/any browser run were **not possible** here either. What WAS done, without node_modules:
- Isolated strict `tsc --strict` on `i18n.ts` + `projects.ts` together (0 errors) — confirms the new `demos.flowcore`/`demos.nexus` PT blocks satisfy the typed `Dictionary`, and that `projects.ts`'s new `demoRoute` values type-check.
- Syntax check (TypeScript parse, no type info) of all 79 files in `src/`, 0 errors.
- A Node script transpiled `i18n.ts`, `projects.ts` and both new `data.ts` files (stubbing the `lucide-react` value import) and ran real runtime assertions: EN/PT leaf-key parity for `demos.flowcore`/`demos.nexus`; array-length consistency between i18n and `data.ts` (5 runner steps, 5 log entries, 5 history rows, 4 workflow cards, 4 stat cards, 3 bots, 4 chat messages); `projects.ts` `demoRoute`/`projectHref` wiring correct for flowcore/nexus; and that northstar/ember/northline/vanta were left untouched.
- Diffed the full `src/` tree against the Stage 3.3 zip: confirms `i18n.ts` had zero lines removed (purely additive) and `projects.ts` changed only the two `demoRoute` values + one comment; every other existing file is byte-identical.
NOT DONE (no network, no node_modules, same as every prior stage): `npm install`, `next build` (incl. the Sora/Space Mono Google Fonts fetch), a real component type-check (no `@types/react`/`framer-motion`/`next` types available offline), any browser run, responsive/overflow check, keyboard behavior in a real browser (menu, console input, chat form), animation/reduced-motion check, visual tuning. Therefore 3.4 is NOT marked complete in ROADMAP.md, same as 3.1/3.2/3.3.
## Watch when first built
Sora/Space Mono `next/font` fetch (network required) · `font-sans` on both sites resolving correctly outside the root layout's `<html>` (same inheritance pattern as Northline/Vanta, unverified in a browser) · FlowCoreRunner's `setTimeout` array cleanup on rapid repeated clicks of "Run Automation"/"Run Again" · NexusChat's bot-switch effect (`replay()` on `<select>` change) re-triggering correctly alongside the component's own mount-time `shown` state · NexusTerminal's `<form>` submit vs. the portfolio's global keyboard handling · `inert`/dialog stacking consistent with 3.1–3.3 (neither dashboard opens a modal, so no stacking conflict is expected, but unverified).

# Stage 3.5 — Interactive 3D & GLB/GLTF Viewer ("Beyond the Screen.")
## One-WebGL-canvas rule — the decision
Two compliant approaches were offered in NEXT_STAGE_PROMPT.md. Chosen: a lazy-mounted canvas that
lives only on the dedicated demo route (`/projects/beyond-the-screen`), unmounted when the person
navigates back to `/#projects` — not a CSS-3D gallery-card treatment with the viewer somewhere else.
Reason: the brief's whole point is a real orbit/zoom GLB/GLTF viewer, which only means something as
an actual `<canvas>`; confining it to its own route (same pattern as every 3.2–3.4 demo site) keeps
the Hero's canvas as the portfolio's only persistent one. The gallery card itself (`ProjectArt.tsx`
→ `PrismArt`) stays CSS/SVG, same as every other `ProjectArt` tile — no second canvas ever exists
alongside the Hero on the main page.
## Route
`/projects/beyond-the-screen` → `src/app/projects/beyond-the-screen/{layout,page}.tsx`. Own font:
Outfit (`next/font/google`, `--font-outfit`, display text only; body stays on the portfolio's Inter
— same pattern as Vanta/Manrope in 3.3). `projects.ts`: new `ConceptId` `"prism"`, `categories:
["3d"]`, `accent: "#8B6CFF"` (violet, close to the portfolio's own primary — deliberate, since this
concept is literally about the portfolio's own 3D capability, not an unrelated fictional brand),
`demoRoute` set. This was the only concept with `categories: ["3d"]`, so the gallery's `3d` filter
is no longer an empty state; `ProjectEmptyState`/`ProjectFilters`/`ProjectsSection` needed zero
changes — 3.1's filter logic (`matchesFilter`, `counts`) picked it up automatically, confirming it
was sound.
## Components (src/components/demos/prism/)
PrismSite (header + mobile menu, hero, gallery, viewer section, footer; `MotionConfig
reducedMotion="user"`) · PrismGallery (3 selectable model cards, CSS/SVG previews only, "Demo
model" badge, `aria-pressed`) · PrismViewer (the WebGL/error/reduced-motion panel — mirrors
`hero/HeroVisual.tsx`'s detect/boundary/lazy pattern exactly: `hasWebGL()` check, a class-based
error `Boundary`, `next/dynamic(..., { ssr: false })` for the scene, a `prefers-reduced-motion`
check, an `IntersectionObserver` that switches the Canvas to `frameloop="demand"` when the panel
scrolls out of view, a "Reset View" button, and drag/zoom hint chips) · PrismScene (the actual R3F
`Canvas` + lights + a hand-rolled `Controls` component bridging Three's own `OrbitControls` into
R3F via `useThree`/`useFrame`, instead of `@react-three/drei`'s `<OrbitControls>` — see
"Dependencies" below) · PrismModels (three original procedural geometries — Aurora Prism
octahedron-in-wireframe, Helix Lattice double torus, Nova Cluster orbiting icosahedra satellites —
plus `GLTFModel`, a `useLoader(GLTFLoader, path)` component wrapped in `<Suspense>`, with a
`useAutoFit` hook that centers/scales any loaded object via `THREE.Box3`) · PrismFallback (pure
CSS/SVG, same structure as `hero/CoreFallback.tsx`, violet/cyan palette) · data.ts (`MODELS`
registry, `DEFAULT_MODEL`, `PRISM_ART` for the hero's `ArtTile`).
## Adding a new GLB/GLTF model (how to extend without touching the viewer)
1. Put the file at `public/models/<name>.glb` (create the folder; none exists yet — no asset was
   ever supplied).
2. In `src/components/demos/prism/data.ts`, add an entry to `MODELS`: `{ id: "<id>", kind: "glb",
   icon: <LucideIcon>, accent: "<hex>", accent2: "<hex>", path: "/models/<name>.glb" }`.
3. Add matching copy to `demos.prism.gallery.items` in `i18n.ts` (EN + PT, same array index) —
   `name`, `desc`, `category`.
4. Nothing else changes: `PrismModel` (in `PrismModels.tsx`) already branches on `entry.kind` and
   renders `GLTFModel` for `"glb"` entries, auto-centered and auto-scaled; `PrismGallery` and
   `PrismViewer` read `MODELS` and the i18n array by index already.
Today every entry is `kind: "procedural"` — no `.glb` file exists in this codebase or sandbox, so
no fake downloadable asset URL was invented, per the Stage 3.5 brief.
## Interactive viewer (local only, nothing sent anywhere)
Orbit (drag), zoom (scroll/pinch, clamped `minDistance`/`maxDistance`, no pan so the model always
stays centered), "Reset View" (re-homes the `OrbitControls` instance via a `resetToken` that
changes on click), a slow idle auto-rotation of the model group that pauses once the panel leaves
the viewport (`IntersectionObserver` → `inView` → `frameloop="demand"`), a loading state while the
dynamic import resolves, a WebGL-unavailable fallback, an error-boundary fallback if the R3F tree
throws, and a `prefers-reduced-motion` static fallback — all mirroring `HeroVisual`'s existing
pattern rather than reinventing it.
## Dependencies
None added. `OrbitControls` and `GLTFLoader` are imported straight from `three/examples/jsm/...`
(bundled with the already-installed `three` package), not from `@react-three/drei` — this avoids
the first new dependency since Stage 1, per NEXT_STAGE_PROMPT.md's instruction to justify one only
if essential; a hand-rolled `useThree`/`useFrame` bridge was straightforward enough that `drei`
was not essential. Outfit is a `next/font/google` family, not a package (same as every prior demo
site's font).
## Decisions / limitations
- No invented client, product spec or commercial claim; every model is explicitly labeled a demo
  model built for this portfolio (`demos.prism.viewer.note`, `gallery.demoTag`).
- `PrismScene`'s `Controls` component disposes its `OrbitControls` instance on unmount (effect
  cleanup), matching the resource-release requirement in the brief.
- No new WebGL canvas exists anywhere else; the Hero's own canvas is completely untouched.
## Verification status (honest)
This sandbox also had no network (same limitation as every prior stage), so `npm install`/`next
build`/a real component type-check/any browser or WebGL run were **not possible** here either.
What WAS done, without `node_modules`:
- Isolated strict `tsc` on `i18n.ts` + `projects.ts` together (0 errors, once the `@/lib/i18n` path
  alias — unresolvable in isolation — was swapped for a relative import; a known artifact of this
  check, not a real error) — confirms the new `demos.prism`/`projects.concepts.prism`/
  `demo.art.prism` PT blocks satisfy the typed `Dictionary`, and `prism`'s `CONCEPTS` entry
  type-checks.
- Syntax-only parse (TypeScript parser, no type info) of all 88 files in `src/` (up from 79), 0
  errors — covers all 7 new `prism/` component files plus the new route.
- A Node script transpiled `i18n.ts`, `projects.ts` and `prism/data.ts` (stubbing the
  `lucide-react`/`ArtSpec` value imports) and ran 19 runtime assertions: EN/PT leaf-key parity for
  `demos.prism` (34 keys), `projects.concepts.prism`, and `demo.art.prism`; `gallery.items.length`
  matching `MODELS.length` (3) in both languages; every `MODELS` entry genuinely `kind:
  "procedural"`; `DEFAULT_MODEL` present in `MODELS`; `prism`'s `categories`/`demoRoute`/
  `hasDemo()`/`projectHref()` wiring; the `3d` filter now returning exactly 1 project (was 0); and
  that northstar/ember/northline/vanta/flowcore/nexus were left untouched. All 19 passed.
- Diffed the full `src/` tree (plus `package.json`) against the uploaded Stage 3.4 zip: only 2 new
  directories (`src/app/projects/beyond-the-screen/`, `src/components/demos/prism/`) and 3 touched
  files — `i18n.ts` (zero removed lines, purely additive), `projects.ts` (one line changed, the
  `ConceptId` union — otherwise additive), `ProjectArt.tsx` (only the closing `ART` map replaced to
  add `prism`). No other existing file was touched.
NOT DONE (no network, no `node_modules`, same as every prior stage): `npm install`, `next build`
(incl. the Outfit Google Fonts fetch), a real component type-check (no `@types/react`/
`framer-motion`/`next`/`@react-three/fiber`/`three` types resolved offline — R3F/Three JSX elements
like `<group>`/`<mesh>`/`<meshStandardMaterial>` and hooks like `useThree`/`useFrame`/`useLoader`
could not be type-checked here), any browser or WebGL runtime check, responsive/overflow check,
actual drag/zoom/reset behavior of `OrbitControls`, `IntersectionObserver` pause behavior,
reduced-motion check, visual tuning. **The R3F/GLTF code in particular cannot be meaningfully
verified without a real build and browser** — type stubs cannot catch WebGL runtime issues (e.g.
whether `OrbitControlsImpl`'s constructor signature matches at runtime, whether `frameloop="demand"`
combined with the `invalidate` call on `"change"` actually keeps the canvas responsive while
paused, whether `useAutoFit`'s `THREE.Box3` math centers a real loaded `.glb` correctly) — flagged
here plainly rather than implied otherwise.
## Watch when first built
Outfit `next/font` fetch (network required) · whether `OrbitControlsImpl` (from
`three/examples/jsm/controls/OrbitControls.js`) is compatible with the installed `three@^0.171.0` —
unverified, this file path has moved between Three versions in the past · `frameloop="demand"` vs
`"always"` switching on `inView` causing any visible stutter when the panel re-enters the viewport ·
`IntersectionObserver` + `next/dynamic` mount order (the observer attaches to `hostRef`, which
exists before the dynamic `PrismScene` resolves) · `useLoader(GLTFLoader, path)` suspending
correctly inside the existing `Boundary` class component once a real `.glb` is added · mobile
pinch-to-zoom via `OrbitControls` (desktop-authored, touch behavior unverified) · `inert`/dialog
stacking (this page opens no modal, so none expected, but unverified, same caveat as 3.1–3.4).

# Stage 3.6 — Integration & Polish
## What this stage found and fixed
`ProjectCard` had a `next/link`-based overlay/CTA that navigated straight to a project's `demoRoute` whenever one existed — since 3.4/3.5 gave every concept a route, this meant `ProjectViewer` (the "professional viewer" built in 3.1) was never actually opened for any project. Fixed: the card body and CTA now always call `onOpen`, so the viewer is the single, consistent entry point for all 7 projects.
## Viewer (src/components/projects/ProjectViewer.tsx) — now a real preview system
- `live = Boolean(demoHref)`: when a project has a route, the preview pane renders `<iframe src={demoHref}>` (key'd by project id) instead of the static `ProjectVisual`/`TiltStage` art — an actual, navigable instance of the demo site/app/console, not a picture of one.
- Device toggle: **Desktop / Tablet / Mobile** (`max-w-none` / `48rem` / `23.5rem` iframe frame widths, centered, bordered, rounded).
- **Fullscreen** toggle (`Maximize2`/`Minimize2`): panel expands to `100svh`/`max-w-none`/`rounded-none`, info column hides (`lg:grid-cols-1`), `Escape` closes fullscreen before closing the dialog.
- **Open Demo**: unchanged `Button href={demoHref}` CTA (full navigation to the dedicated route).
- **Back to Portfolio**: unchanged `DemoTopBar` link (`/#projects`) on every demo route, plus the viewer's own close (X / backdrop click / Escape) which returns to the gallery without leaving the page.
- Loading state (spinner + i18n label) shown until the iframe's `onLoad` fires. `sandbox="allow-scripts allow-same-origin allow-forms"` — first-party content, same origin.
- Non-demo projects (case studies without a route) keep the original static preview + 3D-tilt toggle, unchanged.
- New i18n keys (`projects.device.tablet`, `.fullscreen`, `.exitFullscreen`, `.livePreview`, `.loadingPreview`) in EN + PT.
## Known cosmetic nuance (unverified, not a functional bug)
`DemoTopBar`'s "Back to portfolio" link inside the iframe points to `/#projects` and will navigate *within the iframe*, not the parent page, if clicked from inside the small device-frame preview — it would show the gallery page nested inside the frame rather than closing the modal. The viewer's own X/backdrop/Escape are unaffected and are the primary close path. Left as-is (out of this stage's scope to rearchitect cross-frame messaging); flagged for Stage 4+ if it proves confusing in a real browser pass.
## Integration check (all 7)
Northstar Barber Studio, Ember & Oak, Northline Logistics, Vanta Store, FlowCore Automation, Nexus Bot Console, Beyond the Screen (3D Showcase) — every `CONCEPTS` entry in `src/lib/projects.ts` has a non-null `demoRoute` and a matching `src/app/projects/<slug>/{layout,page}.tsx`; every gallery card now opens `ProjectViewer`, which can load each one live. No project is presented as finished beyond what's documented per its own stage section above.
## Verification status (honest)
DONE (no network, no project `node_modules`, same constraint as every stage so far — confirmed again this session: `npm install` and a direct request to `registry.npmjs.org` both fail, no DNS): TypeScript syntax parse of all 88 `src/` files via the sandbox's globally installed `typescript` package (0 errors, before and after every edit in this stage); manual review of every demo route's `layout.tsx` + `DemoTopBar`; confirmed only two `next/dynamic` entry points exist (Hero's R3F canvas, Prism/Beyond-the-Screen's viewer) so the one-WebGL-canvas rule still holds in source; confirmed `globals.css` still sets `overflow-x: clip` on `body` and has a `prefers-reduced-motion` block; grepped for `TODO`/`console.log`/leftover `next/link` demo hrefs — none found.
NOT DONE (no network): `npm install`, `next build`, `next lint`/a real component type-check (React 19 `inert` typing, framer-motion/three types, all unavailable offline), any browser render of the new iframe/device-frame/fullscreen UI, responsive/overflow check, keyboard and focus-trap behavior of the rebuilt viewer, prefers-reduced-motion visual check, Core Web Vitals/bundle-size measurement. This is why Stage 3.6 is marked `[~]` (code implemented, not build-verified) rather than `[x]` in ROADMAP.md — same honesty standard as every prior stage.
## Watch when first built
Iframe `sandbox` attribute interaction with each demo route's own client state (Vanta cart, FlowCore runner timers, Nexus terminal) when loaded inside a sandboxed same-origin frame · fullscreen mode's `100svh` on mobile Safari (dynamic toolbar) · device-frame `iframe` reflow when a demo route's own `scroll-margin-top`/sticky bars (`DemoTopBar` + site header) stack correctly at reduced widths (tablet/mobile frame) · whether nesting the gallery (`/#projects`) inside the iframe via `DemoTopBar`'s back link reads as confusing in a real browser, per the cosmetic-nuance note above · nothing new to verify for the one-WebGL-canvas rule (Beyond the Screen's canvas lives inside its own iframe document now, same as before, just viewed through a frame).

# Stage 4 — Advanced Interactive Terminal & Developer Experience ("Developer Terminal.")
## Section
`TerminalSection` (`id="terminal"`) sits between Projects and the About placeholder. Header copy: eyebrow `terminal.tag`, title "Developer Terminal.", subtitle "Explore My World Through Code." (`terminal.title/subtitle`, EN+PT). Not added to `Navbar`'s `SECTIONS` (nav scope untouched per brief) — reachable by scroll or `/#terminal`.
## Components (src/components/terminal/)
`Terminal.tsx` (window chrome with traffic-light dots, scrollable output pane, live input row, mobile quick-command row) · `commands.ts` (`runCommand(raw, ctx)` — pure interpreter, returns a React node or a `clear` signal; no `eval`, no shell, no system access) · `Output.tsx` (`OutLine`/`OutBlock`/`OutRow`/`OutList` presentational primitives) · `DemoRun.tsx` (the `demo` command's visual-only Python-run simulation: fixed strings revealed on a timer, nothing executed) · `types.ts` (theme ids/styles, command id list, history entry type).
## Commands (all implemented, per the brief)
`help`, `about`, `skills`, `projects`, `open [project]`, `services`, `contact`, `whoami`, `clear`, `theme`, `date`, `echo [text]`, `demo`. Unknown input returns a friendly error pointing to `help`. Hidden `sudo` easter egg (one line, no privilege implied).
## Data wiring (no invented content)
- `projects`/`open [project]` read `CONCEPTS` from `src/lib/projects.ts` (`resolveProject`, `projectHref`, `hasDemo`) and push to the real demo routes from 3.2–3.5 via `next/navigation`'s router — same routes the gallery's `ProjectViewer` opens. `open` matches by id (slugified), prefix, then substring; no match → "not found" with a hint.
- `services` lists the real `t.services.cards` (web/bots/auto/soft/ui/xp) and scrolls to `#services`.
- `contact` reads `src/lib/contact.ts` (the owner's real email + WhatsApp) and scrolls to `#contact`; renders `mailto:`/`wa.me` links.
- `skills` lists the same technologies as `TechStack.tsx` (Python, JavaScript, TypeScript, C#, React, Next.js, Node.js, HTML, CSS) grouped under `terminal.skills.categories`.
- `about`/`whoami` use only facts already established elsewhere in the portfolio (no new claims, no certifications/experience invented).
## UX details
TAB autocompletes a unique command match (or lists candidates); ↑/↓ recall up to the last 50 commands; history capped at 60 rendered entries; each submitted command shows a brief "processing" state (skipped when `prefers-reduced-motion` is set) before the result renders; scroll-to-bottom on every update; mobile (`sm:hidden`) row of quick-tap buttons for `help/about/skills/projects/contact/whoami/clear`. `theme` cycles three CSS-variable palettes (`violet` default, `matrix`, `amber`) applied via inline style on the terminal root — no new Tailwind tokens added.
## i18n
New top-level `terminal.*` key in `src/lib/i18n.ts`, EN + PT, same typed `Dictionary` (52 leaf keys, parity verified by script — see Verification).
## Dependencies
None added. Reuses `framer-motion` (list enter animation, respecting reduced motion), `lucide-react` (window-chrome icons), `next/navigation`'s `useRouter` (new usage, already part of `next`).
## Verification status (honest)
This sandbox also had no network (same limitation as every stage so far; `registry.npmjs.org` DNS confirmed unreachable again this session), so `npm install`/`next build`/a real component type-check/any browser run were **not possible** here either. What WAS done, without `node_modules`:
- `ts.transpileModule` syntax parse (via the sandbox's global `typescript`) of all 94 `src/` files (up from 88), 0 errors — covers the 6 new `terminal/` component files plus the `page.tsx` edit.
- Isolated strict `tsc` on `i18n.ts` + `projects.ts` together (0 errors, relative-import workaround for the unresolvable `@/lib/i18n` alias, same known artifact as prior stages) — confirms the new `terminal.*` PT block satisfies the typed `Dictionary`.
- A Node script transpiled `i18n.ts`, `projects.ts`, `contact.ts`, `commands.ts`, `Output.tsx`, `DemoRun.tsx` and `types.ts` (stubbing `react`) and ran all 13 real commands (plus `sudo` and an empty string) through `runCommand`: every command returned a renderable node; `open vanta` resolved to `/projects/vanta-store` and invoked the navigate callback; `services`/`contact` invoked the scroll callback with `services`/`contact`; `theme` cycled `violet → matrix`; unrecognized input returned the friendly-error branch; empty input returned a no-op. A separate script confirmed 52/52 EN/PT leaf-key parity under `terminal`, 13/13 `help.items`, 4/4 `skills.categories`, 5/5 `demo.lines`.
- Grepped `src/components/terminal/` for `eval(`, `new Function`, `child_process`, `exec(`, `dangerouslySetInnerHTML` — none found, consistent with the brief's security requirement.
NOT DONE (no network, no `node_modules`, same as every prior stage): `npm install`, `next build`, a real component type-check (React/Next/framer-motion/lucide types unavailable offline), any browser run, actual keyboard/TAB/history-recall behavior, mobile quick-button layout/touch check, animation and `prefers-reduced-motion` visual check, responsive/overflow check at small widths, Lighthouse/Core Web Vitals. Stage 4 is therefore **NOT marked complete** in ROADMAP.md (marked `[~]`), same honesty standard as every prior stage.
## Watch when first built
`OutList`'s `before:content-['›']` arbitrary Tailwind value · `Terminal.tsx`'s inline `style={styleVars}` CSS custom properties actually cascading to the `text-[var(--term-accent)]` arbitrary-value classes in `Output.tsx`/`DemoRun.tsx` · TAB-key default-prevention not conflicting with the browser's own focus-change TAB behavior when no match exists · `AnimatePresence`/`motion.div` list growth performance once history nears the 60-entry cap · `scrollRef.current?.scrollTo` smooth-behavior on iOS Safari · mobile quick-command row wrapping on very narrow viewports · `useRouter().push` navigating away from `/#terminal` on `open` (expected — same pattern as every "Explore Project" link elsewhere) with no special handling to return the user to the terminal afterward (out of scope for this stage).

# Stage 5 — Premium Contact, Client Acquisition & Quotation System
## Section
`ContactSection` (`id="contact"`) replaces the old `SectionPlaceholder`; `about` stays a placeholder (out of this stage's scope). Header copy: eyebrow `contact.tag`, title "Let's Build Something Great.", subtitle "Have a project in mind? Let's turn your ideas into reality." (`contact.title/subtitle`, EN+PT). Dark, violet/cyan gradient blobs + `tech-grid` backdrop + `.glass` panels, same tokens as the rest of the site — no new colors introduced.
## Components (src/components/contact/)
`ContactButtons.tsx` (Email/WhatsApp/GitHub/LinkedIn — each rendered ONLY if `CONTACT.<field>` is set in `src/lib/contact.ts`; GitHub/LinkedIn are `null` today, so only Email + WhatsApp render) · `ContactForm.tsx` (Full Name, Email, Company (optional), Service Required, Estimated Budget, Project Description; client + server validation, loading/success/error/"unconfigured" states, honeypot field + 1.5s min-fill-time anti-spam, `aria-invalid`/`aria-describedby`/`role="alert"`/`role="status"`) · `ProjectEstimator.tsx` ("Project Estimator": project type (reuses the 6 service ids), complexity, features, timeline, budget; live summary panel + an illustrative, explicitly non-binding USD range; "Request a Custom Quote" dispatches `ESTIMATOR_APPLY_EVENT` instead of navigating, so `ContactForm` prefills `service` + appends a summary to `message` without losing anything already typed; "Start over" resets).
## Server (src/app/api/contact/route.ts)
Validates/sanitizes every field server-side (length caps, email regex, service id whitelist), per-IP in-memory rate limit (1/30s), honeypot short-circuit. **No fake success**: if `CONTACT_FORM_WEBHOOK_URL` isn't set in the server environment, returns `503 not_configured` and the form shows the "unconfigured" state (explains it plainly + shows `ContactButtons` as a working alternative — never a fake "message sent"). When configured, POSTs the payload (name/email/company/service/budget/message/estimatorSummary) as JSON to that webhook, with an optional `Authorization: Bearer ${CONTACT_FORM_WEBHOOK_TOKEN}` header. Both env vars stay server-only; nothing is exposed to the client. No database/storage — data is only ever forwarded, never persisted.
## Data (src/lib/contact.ts)
Added `github`/`linkedin` to `CONTACT` (both `null` — not supplied by the owner, never invented). Added `SERVICE_IDS` (same six ids as `services.cards`: web/bots/auto/soft/ui/xp) reused by the form's service select AND the estimator's project-type chips — one source of truth, no duplicated service list. Added `ESTIMATOR` (per-service base USD, complexity multipliers, timeline multipliers, flat per-feature USD) — all explicitly illustrative; the computed range is `base × complexity × timeline (+ features) × [0.85, 1.2]`, rounded to $50. Added `ESTIMATOR_APPLY_EVENT`/`EstimatorApplyDetail` for the estimator→form handoff (same window-CustomEvent pattern as `showcase:select`/`projects:filter`).
## Wiring existing CTAs to the real section
`ServicesCTA`'s primary button, `ProjectsSection`'s "your project" slot CTA, and `ProjectViewer`'s "Discuss a similar project" button now all point to `#contact` (scroll to the real section) instead of a direct `mailto:` — per the brief, "no broken buttons" and all CTAs connect to Contact. `ServicesCTA`'s secondary email/WhatsApp links (shown next to the button) are untouched and still `mailto:`/`wa.me` direct links. Navbar/Hero/Terminal `#contact` links needed no change — they already pointed at the anchor, which now has real content.
## i18n
New top-level `contact.*` key in `src/lib/i18n.ts`, EN + PT, same typed `Dictionary` (71 leaf keys, parity verified by script — see Verification). Service names are NOT duplicated — the form/estimator read `t.services.cards[id].title`.
## Security / privacy (per brief section 6)
Frontend + backend validation; sanitization strips control characters and caps every field's length; honeypot + per-IP rate limit; no API key or webhook token ever reaches the client bundle (both live only in `route.ts`, read from `process.env`); no data is stored — the API only forwards to a configured webhook and returns; the form's error states never leak internals (generic "something went wrong" vs. a specific "not configured" dev-facing state); the privacy line under the submit button states the data is used only to reply and is never shared with third parties. No payments, no new unapproved dependencies.
## Decisions / limitations
- No testimonials, pricing guarantees, certifications or team size invented — the estimator's disclaimer (`estimator.estimateDisclaimer`) is shown every time a range is computed, and the CTA copy itself (`estimator.cta`) frames it as a request, not a quote.
- `CONTACT_FORM_WEBHOOK_URL` is intentionally generic (any JSON-accepting endpoint — Formspree, Make, n8n, a custom Resend-backed route, etc.) rather than locking the brief's "configurable provider" requirement to one vendor; swapping providers never touches `ContactForm.tsx`.
- The 1.5s min-fill-time + honeypot are lightweight, dependency-free anti-spam; no CAPTCHA/third-party script was added (would need owner approval + a new dependency).
- Server rate limiting is in-memory (`Map`), so it resets on cold start/redeploy — acceptable as a first line of defense, documented as non-durable rather than presented as more robust than it is.
## Verification status (honest)
This sandbox also had no network (same limitation as every prior stage), so `npm install`/`next build`/a real component type-check/any browser run were **not possible** here either. What WAS done, without `node_modules`:
- Isolated strict `tsc --strict` on `i18n.ts` + `contact.ts` + `projects.ts` together (0 errors, same relative-import workaround for the unresolvable `@/lib/i18n` alias as every prior stage) — confirms the new `contact.*` PT block satisfies the typed `Dictionary`, and `contact.ts`'s new exports (`SERVICE_IDS`, `ESTIMATOR`, `ESTIMATOR_APPLY_EVENT`) type-check.
- `ts.transpileModule`-based syntax parse of all 99 `src/` files (up from 94), 0 errors — covers the 4 new `contact/` components and the new API route.
- A Node script transpiled `i18n.ts` and ran a recursive leaf-key diff between `dictionary.en.contact` and `dictionary.pt.contact`: 71/71 keys match in both directions, and `form.budgets` has 5/5 entries in both languages.
- Manual review (no network to actually hit it) of `src/app/api/contact/route.ts` for the "no fake success" requirement: every code path either returns a real error status or only returns `{ok:true}` after a webhook call that itself succeeded (or silently drops an honeypot hit, which is intentionally indistinguishable from success to the bot, not to a human).
NOT DONE (no network, no `node_modules`, same as every prior stage): `npm install`, `next build`, a real component type-check (React/Next/framer-motion types unavailable offline, so `ContactForm`/`ProjectEstimator`'s JSX and hooks are unverified against real types), any browser run, an actual POST to `/api/contact` (Next's route handler runtime wasn't exercised), responsive/overflow check, keyboard/focus behavior of the form and estimator chips, animation/reduced-motion visual check. Stage 5 is therefore **NOT marked complete** in ROADMAP.md (marked `[~]`), same honesty standard as every prior stage.
## Watch when first built
Whether `route.ts`'s `NextRequest`/`NextResponse` imports resolve as expected under the installed Next version · the in-memory rate-limit `Map` behavior under Next's dev-mode hot-reload (may reset unexpectedly, which is fine, just worth knowing) · `ProjectEstimator`'s sticky summary aside (`lg:sticky lg:top-24`) interaction with the page's own sticky navbar height · `ContactForm`'s honeypot field being fully invisible/non-tabbable to screen readers and sighted keyboard users alike (`-left-[9999px]` + `tabIndex={-1}` + `aria-hidden` on the wrapper) · whether a real webhook provider's response shape needs any payload adjustment (the current payload is a reasonable generic default, documented in NEXT_STAGE_PROMPT.md) · mobile layout of the estimator's chip rows at very narrow widths.

# Stage 6 — Final Optimization, SEO, Security & Deployment
## What this stage added
- `src/lib/site.ts`: single source of truth for `SITE_URL`/`SITE_NAME`/`SITE_TITLE`/`SITE_DESCRIPTION`, reading `NEXT_PUBLIC_SITE_URL` with a clearly-placeholder fallback.
- `src/app/sitemap.ts` / `robots.ts`: Next's dynamic `MetadataRoute` generators. Sitemap lists only `/` on purpose — the 7 `/projects/<slug>` demo routes are fictional concept sites and are explicitly `robots: { index: false }` in their own `layout.tsx`, per the brief's "don't publish fictional project data as real companies" rule; they stay reachable (crawlable via `follow: true` and real links) but never indexed as standalone businesses.
- `layout.tsx`: full `Metadata` — `metadataBase`, title template, keywords, `alternates.canonical`, `alternates.languages` (`en-US`/`pt-BR`/`x-default`, all pointing at the one URL since the language switch is a client-side dictionary toggle, not a routed `/en`/`/pt` — documented as the honest shape of hreflang for this architecture, not a true per-language-URL setup), Open Graph + Twitter cards, and a `ProfessionalService` JSON-LD block built only from `CONTACT.email`/`CONTACT.phone` — no invented US address, org name, or reviews.
- `src/app/icon.tsx` / `opengraph-image.tsx`: favicon and OG image generated at request/build time via `next/og`'s `ImageResponse` — no binary asset to source or host, works without network (relevant given every sandbox so far has had none).
- `next.config.mjs`: `headers()` adds CSP (`default-src 'self'`, Plausible allow-listed for script/connect, `frame-ancestors 'self'`), `Permissions-Policy`, `Referrer-Policy`, `X-Content-Type-Options`, no `X-Powered-By`; `/api/*` also gets `Cache-Control: no-store`. Image formats set to AVIF/WebP.
- `.env.example` + hardened `.gitignore` (`.env`, `.vercel` added) — documents `NEXT_PUBLIC_SITE_URL`, `CONTACT_FORM_WEBHOOK_URL`/`TOKEN` (already existed from Stage 5, now documented), `NEXT_PUBLIC_PLAUSIBLE_DOMAIN`.
- `src/lib/analytics.ts` + a conditional Plausible `<Script>` in `layout.tsx`: zero-cookie, opt-in only (nothing loads/tracks unless `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set), exports `trackEvent()` for future CTA/conversion wiring. No fake numbers are shown anywhere — this stage only prepares the pipe, per the brief.
- `src/app/not-found.tsx` (branded 404, `noindex`) and `src/app/error.tsx` (root error boundary — defines its own `<html>/<body>` as Next requires for a top-level `error.tsx`).
- `DEPLOYMENT.md`: env var table, Vercel CLI/dashboard steps, domain setup, manual post-deploy checklist, maintenance notes.
## Accessibility/security audit (Stages 1–5, no code changes needed)
All `<img>` already had real `alt` + `loading="lazy"` (`ProjectVisual.tsx`, `ArtTile.tsx`); all `target="_blank"` links already had `rel="noopener noreferrer"`; no `http://` links; no hardcoded secrets; no `eval`/`new Function`/stray `console.log`/`TODO` anywhere in `src/`. Confirmed clean by grep, not rewritten.
## Verification status (honest)
This sandbox also had no network (same limitation as every prior stage — `npm install` and a direct `registry.npmjs.org` request both returned nothing this session too), so `npm install`/`next build`/a real component type-check/any browser or Lighthouse run were **not possible** here either. What WAS done, without `node_modules`:
- `ts.transpileModule` syntax parse of all 107 `src/` files (up from 99), 0 errors.
- Isolated strict `tsc --strict` on `i18n.ts` + `contact.ts` + `projects.ts` + the new `site.ts` (0 real errors; the one diagnostic was `site.ts`'s `process.env` needing `@types/node` in isolation — the same known artifact every prior stage hit, not a genuine error).
- A Node script transpiled `i18n.ts` and recursively diffed every leaf key between `dictionary.en`/`dictionary.pt`: 684/684 match both ways — confirms Stage 6 touched zero i18n content.
- Full grep audit (secrets, `eval`, `console.log`, `TODO`, insecure links) — clean.
- Diffed the full tree against the Stage 5 zip: only `layout.tsx`, the 7 demo `layout.tsx` files, `next.config.mjs`, `.gitignore` were modified, plus the new files listed above — every other Stage 1–5 file is byte-identical, so no existing functionality was touched.
NOT DONE (no network, no `node_modules`, same as every prior stage): `npm install`, `next build` (including whether `ImageResponse`-based `icon.tsx`/`opengraph-image.tsx` actually render, and whether the Google Fonts fetches from Stages 1–3.5 still resolve), a real component type-check, any browser or Lighthouse/Core Web Vitals run, confirming the CSP doesn't block any runtime behavior, confirming `/sitemap.xml`/`/robots.txt` actually serve. Stage 6 is therefore **NOT marked complete** in ROADMAP.md (marked `[~]`), same honesty standard as every prior stage.
## Watch when first built
`next/og`'s `ImageResponse` with the fonts/layout used in `icon.tsx`/`opengraph-image.tsx` (satori has a more limited CSS subset than regular JSX — kept deliberately simple, flat colors, no `background-clip: text`, to reduce render risk) · whether the CSP's `script-src 'unsafe-inline'` is actually needed once a real build's inline scripts (Next's own hydration data) are inspected, or whether a nonce-based approach would be stricter · Plausible script loading correctly when `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` is set · whether Vercel's own default security headers conflict with or duplicate the ones in `next.config.mjs`.
