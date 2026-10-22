"use client";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { WebsitePreview } from "@/components/services/WebsitePreview";
import { resolveProject, type Project, type VisualKey } from "@/lib/projects";
import { ART } from "./ProjectArt";

const FALLBACK_ACCENT = "#7958FF"; // = tokens.primary; only used when a case study has no accent of its own

function Demo({ k, accent }: { k: VisualKey; accent: string }) {
  switch (k) {
    case "northstar": return <WebsitePreview kind="barber" />;
    case "ember": return <WebsitePreview kind="restaurant" />;
    default: { const Art = ART[k]; return <Art accent={accent} />; }
  }
}

/** Illustrative previews (Stage 2 website previews + Stage 3.1 art). Real case studies may use a screenshot. */
export function ProjectVisual({ project }: { project: Project }) {
  const { t, locale } = useLanguage();
  const r = resolveProject(project, t, locale);
  const accent = project.accent ?? FALLBACK_ACCENT;
  if (project.kind === "case" && project.image) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={project.image.src} alt={r.imageAlt ?? r.title} loading="lazy" className="h-full w-full rounded-xl border border-line object-cover object-top" />;
  }
  const key = project.kind === "concept" ? project.id : project.visual;
  if (key) return <Demo k={key} accent={accent} />;
  return (
    <div role="img" aria-label={r.title} className="grid h-full w-full place-items-center rounded-xl border border-line bg-gradient-to-br from-primary/25 via-elevated to-secondary/15 p-6 text-center">
      <span className="font-display text-2xl font-semibold tracking-tight">{r.title}</span>
    </div>
  );
}
