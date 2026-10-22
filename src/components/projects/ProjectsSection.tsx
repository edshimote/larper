"use client";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { CASE_STUDIES, FILTERS, PROJECTS, PROJECTS_FILTER_EVENT, matchesFilter, type Filter } from "@/lib/projects";
import { ProjectCard, type CardVariant } from "./ProjectCard";
import { ProjectEmptyState } from "./ProjectEmptyState";
import { ProjectFilters } from "./ProjectFilters";
import { ProjectViewer } from "./ProjectViewer";

type Slot = { cls: string; variant: CardVariant };

// Tailwind needs these as full literals. Grid: 1 col (phone) · 2 cols (md) · 6 cols (lg).
const FEATURE: Slot = { cls: "md:col-span-2 lg:col-span-4 lg:row-span-2", variant: "feature" };
const SMALL = "lg:col-span-2";
const SMALL_LAST_ODD = "md:col-span-2 lg:col-span-2"; // keeps the 2-col tablet grid free of holes
const HALF = "lg:col-span-3";
const WIDE: Slot = { cls: "md:col-span-2 lg:col-span-6", variant: "wide" };

/** Asymmetric bento layout for any number of visible projects (first item is the featured one). */
function bento(n: number): Slot[] {
  if (n <= 0) return [];
  if (n === 1) return [WIDE];
  if (n === 2) return [{ cls: HALF, variant: "default" }, { cls: HALF, variant: "default" }];
  const rest = n - 1;
  const out: Slot[] = [FEATURE];
  for (let i = 0; i < rest; i++) {
    const last = i === rest - 1;
    if (n === 4 && last) out.push(WIDE);
    else if (n === 5 && i >= 2) out.push({ cls: HALF, variant: "default" });
    else out.push({ cls: last && rest % 2 === 1 ? SMALL_LAST_ODD : SMALL, variant: "default" });
  }
  return out;
}

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function ProjectsSection() {
  const { t } = useLanguage();
  const p = t.projects;
  const [filter, setFilter] = useState<Filter>("all");
  const [openId, setOpenId] = useState<string | null>(null);
  const opener = useRef<HTMLElement | null>(null);

  const counts = useMemo(() => Object.fromEntries(FILTERS.map((f) => [f, PROJECTS.filter((x) => matchesFilter(x, f)).length])) as Record<Filter, number>, []);
  const list = useMemo(() => PROJECTS.filter((x) => matchesFilter(x, filter)), [filter]);
  const slots = useMemo(() => bento(list.length), [list.length]);
  const index = openId ? list.findIndex((x) => x.id === openId) : -1;

  useEffect(() => {
    const on = (e: Event) => {
      const f = (e as CustomEvent<Filter>).detail;
      if (FILTERS.includes(f)) setFilter(f);
    };
    window.addEventListener(PROJECTS_FILTER_EVENT, on);
    return () => window.removeEventListener(PROJECTS_FILTER_EVENT, on);
  }, []);

  const open = (id: string) => { opener.current = document.activeElement as HTMLElement | null; setOpenId(id); };
  const close = useCallback((restoreFocus = true) => { setOpenId(null); if (restoreFocus) opener.current?.focus?.(); }, []);
  const navigate = (delta: number) => {
    if (!list.length || index < 0) return;
    setOpenId(list[(index + delta + list.length) % list.length].id);
  };

  return (
    <MotionConfig reducedMotion="user">
      <section id="projects" aria-labelledby="projects-title" className="relative border-t border-line py-20 sm:py-28">
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: EASE }} className="max-w-3xl">
            <p className="mb-5 font-mono text-xs tracking-[0.12em] text-secondary">{p.tag}</p>
            <h2 id="projects-title" className="font-display text-display-lg font-semibold">{p.title}</h2>
            <p className="mt-4 font-display text-xl font-medium tracking-tight text-primary-soft sm:text-2xl">{p.headline}</p>
            <p className="mt-5 max-w-[56ch] text-lead text-ink-muted">{p.desc}</p>
          </motion.div>

          <div className="mt-10"><ProjectFilters value={filter} onChange={setFilter} counts={counts} /></div>
          <p className="sr-only" aria-live="polite">{list.length} {p.shown}</p>

          {list.length === 0 ? (
            <motion.div key={`empty-${filter}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease: EASE }} className="mt-8">
              <ProjectEmptyState onReset={() => setFilter("all")} />
            </motion.div>
          ) : (
            <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
              <AnimatePresence mode="popLayout" initial={false}>
                {list.map((project, i) => {
                  const slot = slots[i] ?? { cls: SMALL, variant: "default" as const };
                  return (
                    <motion.li key={project.id} layout
                      initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96 }}
                      viewport={{ once: true, margin: "-60px" }}
                      transition={{ duration: 0.55, ease: EASE, delay: Math.min(i, 5) * 0.07, layout: { duration: 0.45, ease: EASE } }}
                      className={slot.cls}>
                      <ProjectCard project={project} variant={slot.variant} onOpen={() => open(project.id)} />
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          )}

          <div className="mt-6 flex flex-col items-start justify-between gap-5 overflow-hidden rounded-xl2 border border-dashed border-white/15 bg-gradient-to-r from-primary/10 via-surface to-bg p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <h3 className="font-display text-2xl font-semibold tracking-tight">{p.slot.title}</h3>
              <p className="mt-2 max-w-[52ch] text-sm leading-relaxed text-ink-muted">{p.slot.desc}</p>
            </div>
            <Button href="#contact" size="md">{p.slot.cta}<ArrowRight size={15} className="transition-transform group-hover:translate-x-1" aria-hidden /></Button>
          </div>

          <p className="mt-6 font-mono text-[0.7rem] text-ink-muted">{p.note}</p>
          {CASE_STUDIES.length === 0 && process.env.NODE_ENV !== "production" && <p className="mt-2 font-mono text-[0.68rem] text-ink-muted">{p.unconfigured}</p>}
        </div>
      </section>

      <AnimatePresence>
        {index >= 0 && <ProjectViewer key="viewer" projects={list} index={index} onClose={close} onNavigate={navigate} />}
      </AnimatePresence>
    </MotionConfig>
  );
}
