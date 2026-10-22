"use client";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, ChevronDown, Code2, Workflow } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { HeroVisual } from "./HeroVisual";

const stagger: Variants = { hidden: {}, show: { transition: { staggerChildren: 0.11, delayChildren: 0.1 } } };
const rise: Variants = { hidden: { opacity: 0, y: 22 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } } };

const floating = [
  { label: "Python", pos: "left-[2%] top-[18%]", delay: "0s" },
  { label: "Node.js", pos: "right-[0%] top-[28%]", delay: "1.4s" },
  { label: "C#", pos: "left-[8%] bottom-[16%]", delay: "2.6s" },
  { label: "TypeScript", pos: "right-[6%] bottom-[10%]", delay: "0.8s" },
];

export function Hero() {
  const { t } = useLanguage();
  return (
    <section id="home" className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-24 pt-28 lg:pb-16">
      <div className="tech-grid absolute inset-0 -z-10" aria-hidden />
      <div className="absolute -left-40 top-0 -z-10 h-[520px] w-[520px] rounded-full bg-primary/15 blur-[140px]" aria-hidden />
      <div className="absolute bottom-0 right-0 -z-10 h-[420px] w-[420px] rounded-full bg-secondary/10 blur-[140px]" aria-hidden />

      <div className="container-x grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-6">
        <motion.div variants={stagger} initial="hidden" animate="show" className="relative z-10">
          <motion.p variants={rise} className="mb-6 inline-flex items-center gap-2 font-mono text-[0.7rem] leading-relaxed tracking-[0.12em] text-secondary sm:text-xs">
            <span className="h-px w-8 bg-secondary/60" aria-hidden />
            {t.hero.tag}
          </motion.p>
          <motion.h1 variants={rise} className="max-w-[16ch] font-display text-display-xl font-semibold">
            {t.hero.title}
          </motion.h1>
          <motion.p variants={rise} className="mt-7 max-w-[56ch] text-lead text-ink-muted">
            {t.hero.subtitle}
          </motion.p>
          <motion.div variants={rise} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#projects">{t.hero.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></Button>
            <Button href="#contact" variant="secondary">{t.hero.secondary}</Button>
          </motion.div>
          <motion.div variants={rise} className="mt-10 flex flex-wrap gap-2">
            <Badge icon={<Code2 size={13} className="text-primary-soft" aria-hidden />}>Web Development</Badge>
            <Badge icon={<Workflow size={13} className="text-secondary" aria-hidden />}>Automation</Badge>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto aspect-square w-full max-w-[460px] lg:max-w-[640px]">
          <HeroVisual label={t.hero.visualLabel} />
          {floating.map((f) => (
            <span key={f.label} aria-hidden style={{ animationDelay: f.delay }}
              className={`glass absolute ${f.pos} animate-float rounded-xl2 px-3 py-1.5 font-mono text-[0.7rem] text-ink shadow-lg shadow-black/30 sm:px-4 sm:py-2 sm:text-xs`}>
              {f.label}
            </span>
          ))}
        </motion.div>
      </div>

      <a href="#services" aria-label={t.hero.scroll} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-[0.65rem] tracking-widest text-ink-muted transition-colors hover:text-ink sm:flex">
        {t.hero.scroll}
        <span className="relative flex h-9 w-5 justify-center rounded-full border border-white/20 pt-2">
          <span className="h-1.5 w-1 animate-scrollDot rounded-full bg-secondary" />
        </span>
        <ChevronDown size={12} aria-hidden />
      </a>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-bg" aria-hidden />
    </section>
  );
}
