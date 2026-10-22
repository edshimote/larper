"use client";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Gem, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { Reveal } from "../shared/Reveal";
import { DEFAULT_MODEL, MODELS, PRISM_ART, type ModelId } from "./data";
import { PrismGallery } from "./PrismGallery";
import { PrismViewer } from "./PrismViewer";

const LINKS = ["home", "gallery", "viewer"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-[family-name:var(--font-outfit)]";
const violet = "bg-[#8B6CFF] text-[#0D0820] hover:bg-[#A58FFF]";

function Mark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#8B6CFF] text-[#0D0820]"><Gem size={16} aria-hidden /></span>
      <span className={`${H} text-lg font-semibold tracking-tight text-[#F8FAFC]`}>PRISM</span>
    </span>
  );
}

function Header() {
  const { t } = useLanguage();
  const p = t.demos.prism;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const link = "text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]";
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.08] bg-[#07090F]/90 backdrop-blur-md">
      <nav aria-label="Prism" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Beyond the Screen"><Mark /></a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.slice(0, -1).map((k) => <li key={k}><a href={`#${k}`} className={link}>{p.nav[k]}</a></li>)}
          <li><a href="#viewer" className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${violet}`}>{p.nav.viewer}</a></li>
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#F8FAFC] md:hidden" aria-expanded={open} aria-controls="pr-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="pr-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/[0.08] bg-[#07090F] px-5 md:hidden">
            {LINKS.map((k) => (
              <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)} className="block border-b border-white/[0.08] py-4 text-base text-[#F8FAFC]">{p.nav[k]}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.prism.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(139,108,255,0.18),transparent_70%),radial-gradient(50%_50%_at_10%_90%,rgba(0,217,255,0.12),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#8B6CFF]">{h.eyebrow}</motion.p>
          <motion.h1 {...up(0.15)} className={`${H} mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl`}>{h.title}</motion.h1>
          <motion.p {...up(0.3)} className="mt-6 max-w-[48ch] text-lg text-[#94A3B8]">{h.sub}</motion.p>
          <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#viewer" className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-all active:scale-[0.97] ${violet}`}>{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
            <a href="#gallery" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[0.95rem] text-[#F8FAFC] transition-all hover:border-[#8B6CFF] hover:text-[#8B6CFF] active:scale-[0.97]">{h.secondary}</a>
          </motion.div>
          <motion.ul {...up(0.55)} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#94A3B8]">
            {h.trust.map((x) => <li key={x} className="flex items-center gap-2"><Gem size={13} className="text-[#8B6CFF]" aria-hidden />{x}</li>)}
          </motion.ul>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10">
          <ArtTile spec={PRISM_ART} label={h.visualLabel} />
        </motion.div>
      </div>
    </section>
  );
}

function ViewerSection({ selected, onSelect }: { selected: ModelId; onSelect: (id: ModelId) => void }) {
  const { t } = useLanguage();
  const p = t.demos.prism;
  const index = MODELS.findIndex((m) => m.id === selected);
  const entry = MODELS[index];
  const copy = p.gallery.items[index];
  return (
    <section id="viewer" style={{ scrollMarginTop: "7rem" }} className="mx-auto max-w-5xl px-5 pb-24 pt-4 sm:px-8">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.35em] text-[#00D9FF]">{p.viewer.eyebrow}</p>
        <h2 className={`${H} mt-4 text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl`}>{p.viewer.title}</h2>
        <p className="mt-3 max-w-[60ch] text-[#94A3B8]">{p.viewer.sub}</p>
      </Reveal>
      <Reveal delay={0.1} className="mt-8">
        <PrismViewer entry={entry} modelLabel={`${copy.name} — ${copy.desc}`} />
      </Reveal>
      <p className="mx-auto mt-4 max-w-[60ch] text-center text-xs text-[#94A3B8]/80">{p.viewer.addNote}</p>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const p = t.demos.prism;
  return (
    <footer className="border-t border-white/[0.08] bg-[#07090F] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Mark />
          <p className="mt-3 text-sm text-[#94A3B8]">{p.footer.tag}</p>
        </div>
        <nav aria-label={p.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#94A3B8]">
            {LINKS.map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#8B6CFF]">{p.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#94A3B8]/70 sm:px-8">{p.footer.notice}</p>
    </footer>
  );
}

export function PrismSite() {
  const [selected, setSelected] = useState<ModelId>(DEFAULT_MODEL);
  const onSelect = useMemo(() => (id: ModelId) => setSelected(id), []);
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#07090F] font-sans text-[#F8FAFC]">
        <DemoTopBar />
        <Header />
        <main>
          <Hero />
          <PrismGallery selected={selected} onSelect={onSelect} />
          <ViewerSection selected={selected} onSelect={onSelect} />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
