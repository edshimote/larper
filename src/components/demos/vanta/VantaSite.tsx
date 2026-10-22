"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { ArrowRight, Menu, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { DemoTopBar } from "../shared/DemoTopBar";
import { CartProvider, useCart } from "./cart-context";
import { PRODUCT_ART } from "./data";
import { VantaCart } from "./VantaCart";
import { VantaCatalog } from "./VantaCatalog";

const LINKS = ["home", "shop"] as const;
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const H = "font-[family-name:var(--font-manrope)]";
const lime = "bg-[#BEF264] text-[#0A0A0A] hover:bg-[#d2f98f]";

function CartButton() {
  const { t } = useLanguage();
  const { count, setOpen } = useCart();
  return (
    <button type="button" onClick={() => setOpen(true)} aria-label={`${t.demos.vanta.nav.cart}${count ? ` (${count})` : ""}`}
      className="relative grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#FAFAFA] transition-colors hover:border-[#BEF264] hover:text-[#BEF264]">
      <ShoppingBag size={18} aria-hidden />
      {count > 0 && <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#BEF264] px-1 text-[0.65rem] font-semibold text-[#0A0A0A]">{count}</span>}
    </button>
  );
}

function Header() {
  const { t } = useLanguage();
  const v = t.demos.vanta;
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", k);
    return () => document.removeEventListener("keydown", k);
  }, [open]);
  const link = "text-sm text-[#A1A1AA] transition-colors hover:text-[#FAFAFA]";
  return (
    <header className="sticky top-10 z-40 border-b border-white/[0.08] bg-[#0A0A0A]/90 backdrop-blur-md">
      <nav aria-label="Vanta" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className={`${H} text-lg font-bold tracking-[0.1em] text-[#FAFAFA]`}>{v.brand}</a>
        <ul className="hidden items-center gap-8 md:flex">
          {LINKS.map((k) => <li key={k}><a href={`#${k}`} className={link}>{v.nav[k]}</a></li>)}
        </ul>
        <div className="flex items-center gap-2">
          <CartButton />
          <button type="button" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-[#FAFAFA] md:hidden" aria-expanded={open} aria-controls="vanta-menu" aria-label={open ? t.demos.common.closeMenu : t.demos.common.openMenu} onClick={() => setOpen((o) => !o)}>
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul id="vanta-menu" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: EASE }} className="overflow-hidden border-t border-white/[0.08] bg-[#0A0A0A] px-5 md:hidden">
            {LINKS.map((k) => <li key={k}><a href={`#${k}`} onClick={() => setOpen(false)} className="block border-b border-white/[0.08] py-4 text-base text-[#FAFAFA]">{v.nav[k]}</a></li>)}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  const { t } = useLanguage();
  const h = t.demos.vanta.hero;
  const up = (d: number) => ({ initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.8, delay: d, ease: EASE } });
  return (
    <section id="home" style={{ scrollMarginTop: "7rem" }} className="relative overflow-hidden">
      <div className="relative mx-auto grid min-h-[calc(100svh-6.5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-[1fr_1.1fr]">
        <div>
          <motion.p {...up(0.05)} className="text-xs uppercase tracking-[0.35em] text-[#BEF264]">{h.eyebrow}</motion.p>
          <motion.h1 {...up(0.15)} className={`${H} mt-5 text-5xl font-bold leading-[1.02] tracking-tight text-[#FAFAFA] sm:text-6xl lg:text-7xl`}>{h.title}</motion.h1>
          <motion.p {...up(0.3)} className="mt-6 max-w-[42ch] text-lg text-[#A1A1AA]">{h.sub}</motion.p>
          <motion.div {...up(0.45)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href="#shop" className={`group inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-[0.95rem] font-medium transition-all active:scale-[0.97] ${lime}`}>{h.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1 motion-reduce:transition-none" aria-hidden /></a>
            <a href="#shop" className="inline-flex h-12 items-center justify-center rounded-full border border-white/20 px-7 text-[0.95rem] text-[#FAFAFA] transition-all hover:border-[#BEF264] hover:text-[#BEF264] active:scale-[0.97]">{h.secondary}</a>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2, ease: EASE }} className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
          <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"><ArtTile spec={PRODUCT_ART[0]} label={h.visualLabel} /></div>
          <div className="relative mt-8 aspect-[3/4] overflow-hidden rounded-2xl border border-white/10"><ArtTile spec={PRODUCT_ART[7]} label={h.visualLabel} /></div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  const { t } = useLanguage();
  const v = t.demos.vanta;
  return (
    <footer className="border-t border-white/[0.08] bg-[#0A0A0A] py-12">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div>
          <p className={`${H} text-lg font-bold tracking-[0.1em] text-[#FAFAFA]`}>{v.brand}</p>
          <p className="mt-3 text-sm text-[#A1A1AA]">{v.footer.tag}</p>
        </div>
        <nav aria-label={v.footer.navLabel}>
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-[#A1A1AA]">
            {LINKS.map((k) => <li key={k}><a href={`#${k}`} className="transition-colors hover:text-[#BEF264]">{v.nav[k]}</a></li>)}
          </ul>
        </nav>
      </div>
      <p className="mx-auto mt-10 max-w-6xl px-5 text-xs text-[#A1A1AA]/70 sm:px-8">{v.footer.notice}</p>
    </footer>
  );
}

export function VantaSite() {
  return (
    <CartProvider>
      <MotionConfig reducedMotion="user">
        <div className="min-h-screen bg-[#0A0A0A] font-sans text-[#FAFAFA]">
          <DemoTopBar />
          <Header />
          <main><Hero /><VantaCatalog /></main>
          <Footer />
          <VantaCart />
        </div>
      </MotionConfig>
    </CartProvider>
  );
}
