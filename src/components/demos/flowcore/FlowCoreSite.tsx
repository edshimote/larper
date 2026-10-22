"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Menu, Workflow, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { Reveal } from "../shared/Reveal";
import { FLOWCORE_ART, WORKFLOWS } from "./data";
import { FlowCoreRunner } from "./FlowCoreRunner";

const LINKS = ["home", "workflows", "runner", "history"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-[family-name:var(--font-sora)]";
const green = "bg-[#34D399] text-[#052e22] hover:bg-[#5fe3b3]";

function Mark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#34D399] text-[#052e22]"><Workflow size={17} aria-hidden /></span>
      <span className={`${H} text-lg font-semibold tracking-tight text-[#F8FAFC]`}>FLOWCORE</span>
    </span>
  );
}

function Header() {
  const { t } = useLanguage();
  const f = t.demos.flowcore;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const link = "text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]";
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.08] bg-[#07140F]/90 backdrop-blur-md">
      <nav aria-label="FlowCore" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="FlowCore Automation"><Mark /></a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.slice(0, -1).map((k) => <li key={k}><a href={`#${k}`} className={link}>{f.nav[k]}</a></li>)}
          <li><a href="#runner" className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${green}`}>{f.nav.runner}</a></li>
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#F8FAFC] md:hidden" aria-expanded={open} aria-controls="fc-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="fc-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/[0.08] bg-[#07140F] px-5 md:hidden">
            {LINKS.map((k) => (
              <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)} className="block border-b border-white/[0.08] py-4 text-base text-[#F8FAFC]">{f.nav[k]}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.flowcore.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(121,88,255,0.16),transparent_70%),radial-gradient(45%_45%_at_10%_90%,rgba(52,211,153,0.14),transparent_70%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#34D399]">{h.eyebrow}</motion.p>
          <motion.h1 {...up(0.15)} className={`${H} mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl`}>{h.title}</motion.h1>
          <motion.p {...up(0.3)} className="mt-6 max-w-[48ch] text-lg text-[#94A3B8]">{h.sub}</motion.p>
          <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#runner" className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-all active:scale-[0.97] ${green}`}>{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
            <a href="#workflows" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[0.95rem] text-[#F8FAFC] transition-all hover:border-[#34D399] hover:text-[#34D399] active:scale-[0.97]">{h.secondary}</a>
          </motion.div>
          <motion.ul {...up(0.55)} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#94A3B8]">
            {h.trust.map((x) => <li key={x} className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#34D399]" aria-hidden />{x}</li>)}
          </motion.ul>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10">
          <ArtTile spec={FLOWCORE_ART} label={h.visualLabel} />
        </motion.div>
      </div>
    </section>
  );
}

function Stats() {
  const { t } = useLanguage();
  const s = t.demos.flowcore.stats;
  return (
    <section aria-labelledby="fc-stats-title" className="border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#34D399]">{s.eyebrow}</p>
          <h2 id="fc-stats-title" className={`${H} mt-4 text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl`}>{s.title}</h2>
        </Reveal>
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => (
            <li key={item.label}>
              <Reveal delay={i * 0.06} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-[#0F2B20] p-6">
                  <p className={`${H} text-3xl font-semibold text-[#F8FAFC]`}>{item.value}</p>
                  <p className="mt-2 text-sm text-[#94A3B8]">{item.label}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Workflows() {
  const { t } = useLanguage();
  const w = t.demos.flowcore.workflows;
  return (
    <section id="workflows" aria-labelledby="fc-workflows-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0F2B20] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#34D399]">{w.eyebrow}</p>
          <h2 id="fc-workflows-title" className={`${H} text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl`}>{w.title}</h2>
          <p className="text-[#94A3B8]">{w.sub}</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {WORKFLOWS.map((wf, i) => {
            const Icon = wf.icon;
            const item = w.items[i];
            return (
              <li key={item.name}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#132E22] p-6 transition-colors duration-300 hover:border-[#34D399]/50">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#34D399]/15 text-[#34D399]"><Icon size={20} aria-hidden /></span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${wf.active ? "bg-[#34D399]/15 text-[#34D399]" : "bg-white/[0.07] text-[#94A3B8]"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${wf.active ? "bg-[#34D399]" : "bg-[#94A3B8]"}`} />{wf.active ? w.statusActive : w.statusPaused}
                      </span>
                    </div>
                    <div>
                      <h3 className={`${H} text-lg font-semibold text-[#F8FAFC]`}>{item.name}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{item.desc}</p>
                    </div>
                    <p className="mt-auto font-mono text-[0.68rem] text-[#94A3B8]">{item.trigger}</p>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 font-mono text-[0.68rem] text-[#94A3B8]">{w.sample}</p>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const f = t.demos.flowcore;
  return (
    <footer className="border-t border-white/[0.08] bg-[#07140F] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Mark />
          <p className="mt-3 text-sm text-[#94A3B8]">{f.footer.tag}</p>
        </div>
        <nav aria-label={f.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#94A3B8]">
            {LINKS.map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#34D399]">{f.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#94A3B8]/70 sm:px-8">{f.footer.notice}</p>
    </footer>
  );
}

export function FlowCoreSite() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#07140F] font-sans text-[#F8FAFC]">
        <DemoTopBar />
        <Header />
        <main>
          <Hero />
          <Stats />
          <Workflows />
          <FlowCoreRunner />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
