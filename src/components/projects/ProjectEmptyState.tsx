"use client";
import { Box } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Shown when a category has no projects yet (today: "3D", which Stage 3.5 fills). */
export function ProjectEmptyState({ onReset }: { onReset: () => void }) {
  const { t } = useLanguage();
  const e = t.projects.empty;
  return (
    <div className="relative flex min-h-[20rem] flex-col items-center justify-center gap-5 overflow-hidden rounded-xl2 border border-dashed border-white/15 bg-gradient-to-b from-primary/10 via-surface to-bg px-6 py-14 text-center">
      <div aria-hidden className="tech-grid pointer-events-none absolute inset-0 opacity-40" />
      <div aria-hidden className="relative grid h-16 w-16 animate-float place-items-center rounded-2xl border border-primary/40 bg-primary/10 text-primary-soft motion-reduce:animate-none">
        <Box size={28} strokeWidth={1.5} />
      </div>
      <h3 className="relative font-display text-2xl font-semibold tracking-tight">{e.title}</h3>
      <p className="relative max-w-[44ch] text-sm leading-relaxed text-ink-muted">{e.desc}</p>
      <button type="button" onClick={onReset} className="relative rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-primary/50 hover:bg-primary/10">{e.cta}</button>
    </div>
  );
}
