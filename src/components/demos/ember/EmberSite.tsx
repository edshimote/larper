"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { Reveal } from "../shared/Reveal";
import { EmberGallery } from "./EmberGallery";
import { EmberMenu } from "./EmberMenu";
import { EmberReservations } from "./EmberReservations";
import { GALLERY_ART } from "./data";

const LINKS = ["home", "story", "menu", "gallery", "reservations"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-[family-name:var(--font-cormorant)]";

function Logo({ className = "" }: { className?: string }) {
  const { t } = useLanguage();
  return <span className={`${H} text-2xl font-semibold tracking-wide ${className}`}>{t.demos.ember.brand}</span>;
}

function Header() {
  const { t } = useLanguage();
  const n = t.demos.ember;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.07] bg-[#17120F]/80 backdrop-blur-md">
      <nav aria-label="Ember & Oak" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home"><Logo /></a>
        <ul className="hidden items-center gap-7 lg:flex">
          {LINKS.map((k) => <li key={k}><a href={`#${k}`} className="text-sm tracking-wide text-[#B5A89C] transition-colors hover:text-[#F5EBDD]">{n.nav[k]}</a></li>)}
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 lg:hidden" aria-expanded={open} aria-controls="eo-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="eo-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} className="border-t border-white/[0.07] bg-[#17120F] px-5 pb-4 lg:hidden">
            {LINKS.map((k, i) => (
              <motion.li key={k} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                <a href={`#${k}`} onClick={() => setOpen(false)} className={`${H} block border-b border-white/[0.07] py-3 text-2xl`}>{n.nav[k]}</a>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.ember.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.9, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative isolate flex min-h-[calc(100svh-6.5rem)] items-end overflow-hidden">
      <motion.div initial={{ scale: 1.08 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }} className="absolute inset-0 -z-10">
        <ArtTile spec={GALLERY_ART[0]} label={t.demos.ember.gallery.items[0].title} />
      </motion.div>
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[#17120F] via-[#17120F]/55 to-[#17120F]/10" />
      <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-32 sm:px-8 sm:pb-24">
        <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#C58B53]">{h.eyebrow}</motion.p>
        <motion.h1 {...up(0.15)} className={`${H} mt-5 max-w-[14ch] text-6xl font-medium italic leading-[0.98] sm:text-7xl lg:text-8xl`}>{h.title}</motion.h1>
        <motion.p {...up(0.3)} className="mt-6 max-w-[46ch] text-lg text-[#F5EBDD]/80">{h.sub}</motion.p>
        <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a href="#menu" className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#C58B53] px-7 font-medium text-[#17120F] transition-all hover:bg-[#d49c66] active:scale-[0.97]">{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
          <a href="#reservations" className="inline-flex h-12 items-center justify-center rounded-full border border-[#F5EBDD]/30 px-7 transition-all hover:border-[#F5EBDD] active:scale-[0.97]">{h.secondary}</a>
        </motion.div>
      </div>
    </section>
  );
}

function Story() {
  const { t } = useLanguage();
  const s = t.demos.ember.story;
  return (
    <section id="story" aria-labelledby="eo-story-title" style={{ scrollMarginTop: "7rem" }} className="bg-[#F5EBDD] py-20 text-[#17120F] sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.3em] text-[#9a6a38]">{s.eyebrow}</p>
          <h2 id="eo-story-title" className={`${H} mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl`}>{s.title}</h2>
          <p className="mt-6 text-[#17120F]/75">{s.p1}</p>
          <p className="mt-3 text-[#17120F]/75">{s.p2}</p>
        </Reveal>
        <Reveal delay={0.1} className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-[2rem]"><ArtTile spec={GALLERY_ART[1]} label={t.demos.ember.gallery.items[1].title} /></div>
          <p className="mt-3 text-xs text-[#17120F]/60 sm:absolute sm:-bottom-5 sm:left-6 sm:mt-0 sm:max-w-[28ch] sm:rounded-xl sm:bg-[#17120F] sm:px-4 sm:py-3 sm:text-[#B5A89C]">{s.caption}</p>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const n = t.demos.ember;
  return (
    <footer className="border-t border-white/[0.07] bg-[#120e0b] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div><Logo /><p className="mt-2 text-sm italic text-[#B5A89C]">{n.footer.tag}</p></div>
        <nav aria-label={n.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#B5A89C]">
            {LINKS.map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#C58B53]">{n.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#B5A89C]/70 sm:px-8">{n.footer.notice}</p>
    </footer>
  );
}

export function EmberSite() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#17120F] font-sans text-[#F5EBDD]">
        <DemoTopBar />
        <Header />
        <main><Hero /><Story /><EmberMenu /><EmberGallery /><EmberReservations /></main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
