"use client";
import { motion, useReducedMotion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useActive } from "./useActive";

export function WebsitePreview({ kind = "barber" }: { kind?: "barber" | "restaurant" }) {
  const { t } = useLanguage();
  const w = t.demo.web[kind];
  const reduce = useReducedMotion();
  const { ref, active } = useActive<HTMLDivElement>();
  return (
    <div ref={ref} role="img" aria-label={`${t.demo.badge}: ${w.brand}`} className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2 border-b border-line bg-elevated px-3 py-2" aria-hidden>
        <span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" /><span className="h-2 w-2 rounded-full bg-white/20" />
        <span className="ml-2 flex-1 truncate rounded-md bg-bg/70 px-2.5 py-1 font-mono text-[0.62rem] text-ink-muted">demo.example</span>
        <span className="rounded bg-primary/20 px-1.5 py-0.5 font-mono text-[0.55rem] text-primary-soft">{t.demo.badge}</span>
      </div>
      <div className="relative flex-1 overflow-hidden" aria-hidden>
        <motion.div animate={active && !reduce ? { y: [0, -90, -90, 0] } : { y: 0 }} transition={{ duration: 11, repeat: Infinity, ease: "easeInOut", times: [0, 0.4, 0.6, 1] }} className="space-y-3 p-3">
          <div className="flex items-center justify-between text-[0.6rem] text-ink-muted"><span className="font-display font-semibold text-ink">{w.brand}</span><span className="hidden gap-3 sm:flex"><i className="not-italic">•</i><i className="not-italic">•</i><i className="not-italic">•</i></span></div>
          <div className="rounded-lg bg-gradient-to-br from-primary/40 via-elevated to-secondary/20 p-4">
            <p className="font-display text-lg font-semibold leading-tight sm:text-xl">{w.tagline}</p>
            <span className="mt-3 inline-block cursor-default rounded-full bg-ink px-3 py-1 text-[0.65rem] font-semibold text-bg transition-transform hover:scale-105">{w.book}</span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {w.items.map((it) => (
              <div key={it} className="rounded-lg border border-line bg-surface p-2 transition-colors hover:border-secondary/50">
                <div className="mb-2 h-8 rounded bg-white/[0.06]" /><p className="text-[0.6rem] text-ink">{it}</p><div className="mt-1 h-1 w-8 rounded bg-white/10" />
              </div>
            ))}
          </div>
          <div className="h-16 rounded-lg border border-line bg-surface" /><div className="h-16 rounded-lg border border-line bg-surface" />
        </motion.div>
      </div>
    </div>
  );
}
