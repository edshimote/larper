"use client";
import type { CSSProperties } from "react";
import { ArrowUpRight, Clock } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { hasDemo, projectHref, resolveProject, type Project } from "@/lib/projects";
import { ProjectVisual } from "./ProjectVisual";

export type CardVariant = "default" | "feature" | "wide";

const FALLBACK_ACCENT = "#7958FF";

type Props = { project: Project; variant?: CardVariant; onOpen: () => void };

/**
 * Gallery card. Each card sets `--accent` from its fictional brand; hover adds a glow, a subtle preview zoom
 * and a lifted border. "feature" is the large card (also used as the FeaturedProject treatment), "wide" is a
 * horizontal card for full-row slots. Scroll reveal/stagger are handled by the parent <li>.
 */
export function ProjectCard({ project, variant = "default", onOpen }: Props) {
  const { t, locale } = useLanguage();
  const p = t.projects;
  const r = resolveProject(project, t, locale);
  const accent = project.accent ?? FALLBACK_ACCENT;
  const feature = variant === "feature";
  const wide = variant === "wide";
  const label = project.kind === "concept" ? p.kinds[project.label] : p.kinds.case;
  const cta = project.kind === "case" ? p.openCase : p.open;
  const comingSoon = project.kind === "concept" && !hasDemo(project);
  const href = projectHref(project);
  const ctaCls = "inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-secondary";
  const arrow = <ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none" aria-hidden />;

  return (
    <article style={{ "--accent": accent } as CSSProperties}
      className={`group relative flex h-full overflow-hidden rounded-xl2 border border-line bg-gradient-to-b from-elevated/70 to-surface transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[color:color-mix(in_srgb,var(--accent)_55%,transparent)] hover:shadow-2xl hover:shadow-black/40 motion-reduce:transform-none ${wide ? "flex-col lg:flex-row" : "flex-col"}`}>
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(70% 55% at 50% 0%, color-mix(in srgb, ${accent} 16%, transparent), transparent 70%)` }} />

      {/* Previews contain their own buttons, so they are inert here; the viewer holds the interactive copy. */}
      <div className={`relative p-4 ${feature ? "min-h-[16rem] flex-1 sm:min-h-[22rem] lg:p-5" : wide ? "h-56 lg:h-auto lg:min-h-[18rem] lg:w-1/2" : "h-52 sm:h-56"}`}>
        <div inert aria-hidden className="pointer-events-none h-full overflow-hidden rounded-xl">
          <div className="h-full origin-center transition-transform duration-700 ease-out group-hover:scale-[1.035] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
            <ProjectVisual project={project} />
          </div>
        </div>
        <ul className="pointer-events-none absolute left-6 top-6 z-10 flex flex-wrap gap-1.5">
          {project.categories.map((c) => (
            <li key={c} className="glass inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-wider text-ink">
              <i aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />{p.filters[c]}
            </li>
          ))}
        </ul>
        <button type="button" tabIndex={-1} aria-hidden onClick={onOpen} className="absolute inset-0 z-10 cursor-pointer" />
      </div>

      <div className={`relative flex flex-col gap-3 p-5 pt-2 sm:p-6 sm:pt-2 ${wide ? "lg:w-1/2 lg:justify-center lg:pt-6" : "flex-none"}`}>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="px-2.5 py-1 text-[0.68rem]">{label}</Badge>
          {feature && <span className="rounded-full px-2.5 py-1 font-mono text-[0.68rem]" style={{ background: `color-mix(in srgb, ${accent} 16%, transparent)`, color: accent }}>{p.featured}</span>}
        </div>
        {r.type && <p className="font-mono text-[0.7rem] tracking-wide" style={{ color: accent }}>{r.type}</p>}
        <h3 className={`font-display font-semibold tracking-tight ${feature ? "text-2xl sm:text-3xl" : "text-xl"}`}>{r.title}</h3>
        <p className={`max-w-[52ch] text-sm leading-relaxed text-ink-muted ${feature ? "" : "line-clamp-3"}`}>{r.summary}</p>
        {feature && r.highlights.length > 0 && (
          <ul className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-muted">
            {r.highlights.map((h) => <li key={h} className="flex items-center gap-1.5"><i aria-hidden className="h-1 w-1 rounded-full" style={{ background: accent }} />{h}</li>)}
          </ul>
        )}
        <ul className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => <li key={s}><Badge className="px-2.5 py-1 text-[0.68rem]">{s}</Badge></li>)}
        </ul>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-line pt-4">
          <button type="button" onClick={onOpen} aria-haspopup="dialog" aria-label={`${cta}: ${r.title}`} className={ctaCls}>{cta}{arrow}</button>
          {href && <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ink-muted"><i aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: accent }} />{p.demoReady}</span>}
          {comingSoon && <span className="inline-flex items-center gap-1.5 font-mono text-[0.68rem] text-ink-muted"><Clock size={12} aria-hidden />{p.comingSoon}</span>}
        </div>
      </div>
    </article>
  );
}
