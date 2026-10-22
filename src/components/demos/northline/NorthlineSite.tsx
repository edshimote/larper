"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, CheckCircle2, Menu, Truck, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { Reveal } from "../shared/Reveal";
import { NORTHLINE_ART, SERVICE_ICONS } from "./data";
import { NorthlineQuote } from "./NorthlineQuote";
import { NorthlineTracking } from "./NorthlineTracking";

const LINKS = ["home", "services", "about", "process"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-display";
const blue = "bg-[#38BDF8] text-[#071120] hover:bg-[#67cbfb]";

function Mark() {
  return (
    <span className="flex items-center gap-2.5">
      <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#38BDF8] text-[#071120]"><Truck size={17} aria-hidden /></span>
      <span className={`${H} text-lg font-semibold tracking-tight text-[#F8FAFC]`}>NORTHLINE</span>
    </span>
  );
}

function Header() {
  const { t } = useLanguage();
  const n = t.demos.northline;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const link = "text-sm text-[#94A3B8] transition-colors hover:text-[#F8FAFC]";
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.08] bg-[#0A1628]/90 backdrop-blur-md">
      <nav aria-label="Northline" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" aria-label="Northline Logistics"><Mark /></a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((k) => <li key={k}><a href={`#${k}`} className={link}>{n.nav[k]}</a></li>)}
          <li><a href="#tracking" className={link}>{n.nav.tracking}</a></li>
          <li><a href="#quote" className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${blue}`}>{n.nav.quote}</a></li>
        </ul>
        <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#F8FAFC] md:hidden" aria-expanded={open} aria-controls="nl-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((v) => !v)}>
          {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
        </button>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="nl-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/[0.08] bg-[#0A1628] px-5 md:hidden">
            {[...LINKS, "tracking" as const, "quote" as const].map((k) => (
              <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)} className="block border-b border-white/[0.08] py-4 text-base text-[#F8FAFC]">{n.nav[k]}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.northline.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_80%_10%,rgba(56,189,248,0.16),transparent_70%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: "linear-gradient(rgba(148,163,184,.6) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,.6) 1px, transparent 1px)", backgroundSize: "56px 56px" }} />
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1.1fr_1fr]">
        <div>
          <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#38BDF8]">{h.eyebrow}</motion.p>
          <motion.h1 {...up(0.15)} className={`${H} mt-5 text-5xl font-semibold leading-[1.05] tracking-tight text-[#F8FAFC] sm:text-6xl lg:text-7xl`}>{h.title}</motion.h1>
          <motion.p {...up(0.3)} className="mt-6 max-w-[48ch] text-lg text-[#94A3B8]">{h.sub}</motion.p>
          <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#quote" className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-all active:scale-[0.97] ${blue}`}>{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
            <a href="#tracking" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[0.95rem] text-[#F8FAFC] transition-all hover:border-[#38BDF8] hover:text-[#38BDF8] active:scale-[0.97]">{h.secondary}</a>
          </motion.div>
          <motion.ul {...up(0.55)} className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#94A3B8]">
            {h.trust.map((x) => <li key={x} className="flex items-center gap-2"><CheckCircle2 size={15} className="text-[#38BDF8]" aria-hidden />{x}</li>)}
          </motion.ul>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative mx-auto aspect-[4/3] w-full max-w-lg overflow-hidden rounded-2xl border border-white/10">
          <ArtTile spec={NORTHLINE_ART[0]} label={h.visualLabel} />
        </motion.div>
      </div>
    </section>
  );
}

function Services() {
  const { t } = useLanguage();
  const s = t.demos.northline.services;
  return (
    <section id="services" aria-labelledby="nl-services-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0F2238] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{s.eyebrow}</p>
          <h2 id="nl-services-title" className={`${H} mt-4 text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl`}>{s.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{s.sub}</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_ICONS.map((Icon, i) => (
            <li key={i}>
              <Reveal delay={i * 0.06} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-white/10 bg-[#132A45] p-6 transition-colors duration-300 hover:border-[#38BDF8]/50">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#38BDF8]/15 text-[#38BDF8]"><Icon size={20} aria-hidden /></span>
                  <h3 className={`${H} mt-5 text-lg font-semibold text-[#F8FAFC]`}>{s.items[i].name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#94A3B8]">{s.items[i].desc}</p>
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
  const a = t.demos.northline.about;
  return (
    <section id="about" aria-labelledby="nl-about-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2">
        <Reveal className="relative aspect-[5/4] overflow-hidden rounded-2xl border border-white/10 lg:order-2">
          <ArtTile spec={NORTHLINE_ART[1]} label={a.title} />
        </Reveal>
        <Reveal delay={0.1} className="lg:order-1">
          <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{a.eyebrow}</p>
          <h2 id="nl-about-title" className={`${H} mt-4 text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl`}>{a.title}</h2>
          <p className="mt-5 text-[#94A3B8]">{a.p1}</p>
          <p className="mt-3 text-[#94A3B8]">{a.p2}</p>
          <ul className="mt-8 space-y-4">
            {a.points.map((p) => (
              <li key={p.t} className="flex gap-3"><CheckCircle2 size={18} className="mt-0.5 shrink-0 text-[#38BDF8]" aria-hidden /><div><p className="text-sm font-medium text-[#F8FAFC]">{p.t}</p><p className="text-sm text-[#94A3B8]">{p.d}</p></div></li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useLanguage();
  const p = t.demos.northline.process;
  return (
    <section id="process" aria-labelledby="nl-process-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0F2238] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{p.eyebrow}</p>
          <h2 id="nl-process-title" className={`${H} mt-4 text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl`}>{p.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{p.sub}</p>
        </Reveal>
        <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((s, i) => (
            <li key={s.title}>
              <Reveal delay={i * 0.08} className="h-full">
                <div className="h-full rounded-2xl border border-white/10 bg-[#132A45] p-6">
                  <span className={`${H} text-3xl font-semibold text-[#38BDF8]`}>{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 text-base font-semibold text-[#F8FAFC]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{s.desc}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const n = t.demos.northline;
  return (
    <footer className="border-t border-white/[0.08] bg-[#071120] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <Mark />
          <p className="mt-3 text-sm text-[#94A3B8]">{n.footer.tag}</p>
        </div>
        <nav aria-label={n.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#94A3B8]">
            {[...LINKS, "tracking" as const, "quote" as const].map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#38BDF8]">{n.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#94A3B8]/70 sm:px-8">{n.footer.notice}</p>
    </footer>
  );
}

export function NorthlineSite() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-[#0A1628] font-sans text-[#F8FAFC]">
        <DemoTopBar />
        <Header />
        <main>
          <Hero />
          <Services />
          <About />
          <Process />
          <NorthlineTracking />
          <NorthlineQuote />
        </main>
        <Footer />
      </div>
    </MotionConfig>
  );
}
