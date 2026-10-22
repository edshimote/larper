import type { Dictionary, Locale } from "@/lib/i18n";

/** Window event used by other sections (e.g. Services cards) to pre-select a gallery filter. */
export const PROJECTS_FILTER_EVENT = "projects:filter";

export const FILTERS = ["all", "web", "apps", "bots", "auto", "3d"] as const;
export type Filter = (typeof FILTERS)[number];
export type ProjectCategory = Exclude<Filter, "all">;

/** Concept ids double as visual keys and as keys of `projects.concepts` in i18n.ts. */
export type ConceptId = "northstar" | "ember" | "northline" | "vanta" | "flowcore" | "nexus" | "prism";
export type VisualKey = ConceptId;
export type Localized = { en: string; pt: string };

/** A project may belong to several categories (e.g. a dashboard is both "apps" and "auto"). */
type Shared = { categories: readonly ProjectCategory[]; stack: readonly string[] };

/**
 * Illustrative project built for this portfolio. Fictional content; never a client.
 * Copy lives in i18n.ts (`projects.concepts[id]`).
 * - `label`: "concept" = Concept Project, "demo" = Interactive Demo (every fictional project must carry one).
 * - `accent`: the fictional brand's own color, used for glow/dots only; the portfolio tokens stay the base.
 * - `demoRoute`: path of the full demo once it exists (Stages 3.2–3.4). `null` => card shows "Demo Coming Soon"
 *   and nothing links anywhere. Set it ONLY when the page really exists (see `projectHref`).
 */
export type Concept = Shared & {
  kind: "concept";
  id: ConceptId;
  label: "concept" | "demo";
  accent: string;
  demoRoute: string | null;
};

/** A REAL project provided by the owner. Copy is inline (EN + PT). */
export type CaseStudy = Shared & {
  kind: "case";
  id: string;
  title: Localized;
  summary: Localized;
  highlights?: readonly Localized[];
  year?: string;
  role?: Localized;
  links?: { live?: string; repo?: string };
  accent?: string;
  /** Put the file in /public/projects/. Without an image, `visual` (or a neutral placeholder) is shown. */
  image?: { src: string; alt: Localized };
  visual?: VisualKey;
};

export type Project = Concept | CaseStudy;

/**
 * REAL PROJECTS — add only work the owner confirms. Never invent clients, results or metrics.
 * Template:
 * {
 *   kind: "case", id: "my-project", categories: ["web"],
 *   title: { en: "…", pt: "…" }, summary: { en: "…", pt: "…" },
 *   highlights: [{ en: "…", pt: "…" }], year: "2026", role: { en: "…", pt: "…" },
 *   stack: ["Next.js", "TypeScript"],
 *   links: { live: "https://…", repo: "https://github.com/…" },
 *   image: { src: "/projects/my-project.png", alt: { en: "…", pt: "…" } },
 * }
 */
export const CASE_STUDIES: CaseStudy[] = [];

// The DOM/SVG previews are built with this exact stack (same as the portfolio itself).
const DEMO_STACK = ["React", "TypeScript", "Tailwind CSS", "Framer Motion"] as const;
// Stage 3.5: the one concept that actually renders WebGL (GLB/GLTF viewer), so its stack says so.
const THREE_STACK = [...DEMO_STACK, "Three.js", "React Three Fiber"] as const;

/** Order matters: the first item is rendered as the featured (largest) card. */
export const CONCEPTS: Concept[] = [
  { kind: "concept", id: "northstar", categories: ["web"], label: "concept", accent: "#D4A64A", demoRoute: "/projects/northstar-barber", stack: DEMO_STACK },
  { kind: "concept", id: "ember", categories: ["web"], label: "concept", accent: "#E2683C", demoRoute: "/projects/ember-oak", stack: DEMO_STACK },
  { kind: "concept", id: "northline", categories: ["web"], label: "concept", accent: "#38BDF8", demoRoute: "/projects/northline-logistics", stack: DEMO_STACK },
  { kind: "concept", id: "vanta", categories: ["web", "apps"], label: "concept", accent: "#BEF264", demoRoute: "/projects/vanta-store", stack: DEMO_STACK },
  { kind: "concept", id: "flowcore", categories: ["apps", "auto"], label: "demo", accent: "#34D399", demoRoute: "/projects/flowcore-automation", stack: DEMO_STACK },
  { kind: "concept", id: "nexus", categories: ["apps", "bots"], label: "demo", accent: "#22D3EE", demoRoute: "/projects/nexus-bot-console", stack: DEMO_STACK },
  { kind: "concept", id: "prism", categories: ["3d"], label: "demo", accent: "#8B6CFF", demoRoute: "/projects/beyond-the-screen", stack: THREE_STACK },
];

export const PROJECTS: Project[] = [...CASE_STUDIES, ...CONCEPTS];

export const matchesFilter = (p: Project, f: Filter) => f === "all" || p.categories.includes(f);

/**
 * Routes: each demo is a static App Router folder `src/app/projects/<slug>/` (own layout + fonts).
 * Live (3.2): `/projects/northstar-barber`, `/projects/ember-oak`. Live (3.3): `/projects/northline-logistics`,
 * `/projects/vanta-store`. Live (3.4): `/projects/flowcore-automation`, `/projects/nexus-bot-console`.
 * Every concept now has a real demoRoute. While `demoRoute` is null, `projectHref`
 * returns null and the UI shows "Demo Coming Soon" with no link. Set `demoRoute` ONLY after the page exists.
 * Case studies link only to their own `links.live`.
 */
export const projectRoute = (id: string) => `/projects/${id}`;
export const projectHref = (p: Project): string | null => (p.kind === "concept" ? p.demoRoute : null);
export const hasDemo = (p: Project) => projectHref(p) !== null;

export type Resolved = { title: string; type?: string; summary: string; highlights: readonly string[]; role?: string; imageAlt?: string };

export function resolveProject(p: Project, t: Dictionary, locale: Locale): Resolved {
  if (p.kind === "concept") {
    const c = t.projects.concepts[p.id];
    return { title: c.title, type: c.type, summary: c.summary, highlights: c.highlights };
  }
  return {
    title: p.title[locale],
    summary: p.summary[locale],
    highlights: (p.highlights ?? []).map((h) => h[locale]),
    role: p.role?.[locale],
    imageAlt: p.image?.alt[locale],
  };
}
