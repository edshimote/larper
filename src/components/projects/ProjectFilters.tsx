"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { FILTERS, type Filter } from "@/lib/projects";

type Props = { value: Filter; onChange: (f: Filter) => void; counts: Record<Filter, number> };

/** Filter chips with a sliding active pill (shared layoutId). Buttons use aria-pressed. */
export function ProjectFilters({ value, onChange, counts }: Props) {
  const { t } = useLanguage();
  const p = t.projects;
  return (
    <div role="group" aria-label={p.filterLabel} className="flex flex-wrap gap-2">
      {FILTERS.map((f) => {
        const active = value === f;
        return (
          <button key={f} type="button" aria-pressed={active} onClick={() => onChange(f)}
            className={`relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${active ? "border-transparent text-ink" : "border-line text-ink-muted hover:border-white/20 hover:text-ink"}`}>
            {active && (
              <motion.span layoutId="projects-filter-pill" aria-hidden transition={{ type: "spring", stiffness: 420, damping: 36 }}
                className="absolute inset-0 rounded-full border border-primary/60 bg-primary/15" />
            )}
            <span className="relative">{p.filters[f]}</span>
            {f !== "all" && counts[f] === 0 && <span className="relative rounded-full bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-wider text-ink-muted">{p.soon}</span>}
          </button>
        );
      })}
    </div>
  );
}
