"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Languages, Menu, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";

export const SECTIONS = ["home", "services", "projects", "about", "contact"] as const;
type Section = (typeof SECTIONS)[number];

export function Navbar() {
  const { t, locale, toggle } = useLanguage();
  const [active, setActive] = useState<Section>("home");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = SECTIONS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id as Section)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled || open ? "border-b border-line bg-bg/70 backdrop-blur-xl" : "border-b border-transparent"}`}>
      <nav aria-label="Primary" className="container-x flex h-[72px] items-center justify-between">
        <a href="#home" className="font-display text-lg font-semibold tracking-tight" onClick={() => setOpen(false)}>
          EDUARDO<span className="text-secondary">.</span>DEV
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {SECTIONS.map((id) => (
            <li key={id}>
              <a href={`#${id}`} aria-current={active === id ? "page" : undefined}
                className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === id ? "text-ink" : "text-ink-muted hover:text-ink"}`}>
                {active === id && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 -z-10 rounded-full border border-line bg-white/[0.06]" transition={{ type: "spring", stiffness: 380, damping: 32 }} />
                )}
                {t.nav[id]}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button onClick={toggle} aria-label={t.nav.lang} className="glass inline-flex h-10 items-center gap-1.5 rounded-full px-3 font-mono text-xs text-ink-muted transition-colors hover:text-ink">
            <Languages size={14} aria-hidden /> <span className={locale === "en" ? "text-ink" : ""}>EN</span>/<span className={locale === "pt" ? "text-ink" : ""}>PT</span>
          </button>
          <Button href="#contact" size="md" className="hidden sm:inline-flex">{t.nav.cta}</Button>
          <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? t.nav.close : t.nav.menu}
            className="glass inline-flex h-10 w-10 items-center justify-center rounded-full md:hidden">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div id="mobile-menu" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}
            className="container-x flex h-[calc(100svh-72px)] flex-col gap-1 pb-8 pt-6 md:hidden">
            {SECTIONS.map((id) => (
              <a key={id} href={`#${id}`} onClick={() => setOpen(false)} aria-current={active === id ? "page" : undefined}
                className={`border-b border-line py-4 font-display text-3xl tracking-tight ${active === id ? "text-ink" : "text-ink-muted"}`}>
                {t.nav[id]}
              </a>
            ))}
            <Button href="#contact" onClick={() => setOpen(false)} className="mt-6 sm:hidden">{t.nav.cta}</Button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
