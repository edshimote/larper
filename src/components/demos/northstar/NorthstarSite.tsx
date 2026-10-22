"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Armchair, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { Reveal } from "../shared/Reveal";
import { GALLERY_ART, NS_SELECT_EVENT, SERVICE_META } from "./data";
import { NorthstarBooking } from "./NorthstarBooking";
import { NorthstarGallery } from "./NorthstarGallery";

const LINKS = ["home", "services", "gallery", "about"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-[family-name:var(--font-playfair)]";
const gold = "bg-[#C6A667] text-[#0B0B0B] hover:bg-[#d8bb80]";

function StarMark() {
  return <svg aria-hidden width="22" height="22" viewBox="0 0 24 24" className="text-[#C6A667]"><path d="M12 1.5l2.2 8.3 8.3 2.2-8.3 2.2L12 22.5l-2.2-8.3L1.5 12l8.3-2.2z" fill="currentColor" /></svg>;
}

function Header() {
  const { t } = useLanguage();
  const n = t.demos.northstar;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const link = "text-sm text-[#A3A3A3] transition-colors hover:text-[#F5F5F5]";
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.06] bg-[#0B0B0B]/85 backdrop-blur-md">
      <nav aria-label="Northstar" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2.5"><StarMark /><span className={`${H} text-lg tracking-[0.18em]`}>{n.brand.toUpperCase()}</span></a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((k) => <li key={k}><a href={`#${k}`} className={link}>{n.nav[k]}</a></li>)}
          <li><a href="#booking" className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${gold}`}>{n.nav.book}</a></li>
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 md:hidden" aria-expanded={open} aria-controls="ns-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="ns-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/[0.06] bg-[#0B0B0B] px-5 md:hidden">
            {[...LINKS, "booking" as const].map((k) => (
              <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)} className="block border-b border-white/[0.06] py-4 text-base text-[#F5F5F5]">{k === "booking" ? n.nav.book : n.nav[k]}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.northstar.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_20%,rgba(198,166,103,0.14),transparent_70%)]" />
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#C6A667]">{h.eyebrow}</motion.p>
          <motion.h1 {...up(0.15)} className={`${H} mt-5 text-5xl leading-[1.05] sm:text-6xl lg:text-7xl`}>{h.title}</motion.h1>
          <motion.p {...up(0.3)} className="mt-6 max-w-[44ch] text-lg text-[#A3A3A3]">{h.sub}</motion.p>
          <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#booking" className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-all active:scale-[0.97] ${gold}`}>{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
            <a href="#services" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[0.95rem] transition-all hover:border-[#C6A667] hover:text-[#C6A667] active:scale-[0.97]">{h.secondary}</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative mx-auto w-full max-w-md">
          <div aria-hidden className="absolute -inset-3 rounded-t-[999px] rounded-b-3xl border border-[#C6A667]/30" />
          <div className="relative aspect-[3/4] overflow-hidden rounded-t-[999px] rounded-b-2xl border border-white/10">
            <ArtTile spec={GALLERY_ART[0]} label={t.demos.northstar.gallery.items[0].title} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLanguage();
  const s = t.demos.northstar.services;
  const pick = (i: number) => window.dispatchEvent(new CustomEvent(NS_SELECT_EVENT, { detail: i }));
  return (
    <section id="services" aria-labelledby="ns-services-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] bg-[#111] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C6A667]">{s.eyebrow}</p>
          <h2 id="ns-services-title" className={`${H} mt-4 text-4xl leading-tight sm:text-5xl`}>{s.title}</h2>
          <p className="mt-4 text-[#A3A3A3]">{s.sub}</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2">
          {SERVICE_META.map((m, i) => (
            <li key={m.id}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#171717] p-6 transition-colors duration-300 hover:border-[#C6A667]/50 sm:p-8">
                  <div className="flex items-baseline justify-between gap-4">
                    <h3 className={`${H} text-2xl`}>{s.items[i].name}</h3>
                    <span className={`${H} text-2xl text-[#C6A667]`}>${m.price}</span>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-[#A3A3A3]">{s.items[i].desc}</p>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-white/10 pt-4 text-sm">
                    <span className="text-xs text-[#A3A3A3]">{m.minutes} min</span>
                    <a href="#booking" onClick={() => pick(i)} className="inline-flex items-center gap-1.5 text-[#C6A667] transition-colors hover:text-[#F5F5F5]">{s.book}<ArrowRight size={14} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function About() {
  const { t } = useLanguage();
  const a = t.demos.northstar.about;
  return (
    <section id="about" aria-labelledby="ns-about-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10">
          <ArtTile spec={GALLERY_ART[4]} label={t.demos.northstar.gallery.items[4].title} />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-xs uppercase tracking-[0.3em] text-[#C6A667]">{a.eyebrow}</p>
          <h2 id="ns-about-title" className={`${H} mt-4 text-4xl leading-tight sm:text-5xl`}>{a.title}</h2>
          <p className="mt-5 text-[#A3A3A3]">{a.p1}</p>
          <p className="mt-3 text-[#A3A3A3]">{a.p2}</p>
          <ul className="mt-8 space-y-4">
            {a.points.map((p) => (
              <li key={p.t} className="flex gap-3"><Armchair size={18} className="mt-0.5 shrink-0 text-[#C6A667]" aria-hidden /><div><p className="text-sm font-medium">{p.t}</p><p className="text-sm text-[#A3A3A3]">{p.d}</p></div></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const n = t.demos.northstar;
  return (
    <footer className="border-t border-white/[0.06] bg-[#0B0B0B] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <div className="flex items-center gap-2.5"><StarMark /><span className={`${H} text-lg tracking-[0.18em]`}>{n.brand.toUpperCase()}</span></div>
          <p className="mt-3 text-sm text-[#A3A3A3]">{n.footer.tag}</p>
        </div>
        <nav aria-label={n.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#A3A3A3]">
            {[...LINKS, "booking" as const].map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#C6A667]">{k === "booking" ? n.nav.book : n.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#A3A3A3]/70 sm:px-8">{n.footer.notice}</p>
    </footer>
  );
}

export function NorthstarSite() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0B0B0B] font-sans text-[#F5F5F5]">
        <DemoTopBar />
        <Header />
        <main><Hero /><Services /><NorthstarGallery /><About /><NorthstarBooking /></main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
