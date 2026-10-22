"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AutomationPreview } from "./AutomationPreview";
import { BotPreview } from "./BotPreview";
import { SoftwarePreview } from "./SoftwarePreview";
import { WebsitePreview } from "./WebsitePreview";

export const SHOWCASE_CATEGORIES = ["web", "auto", "bots", "soft"] as const;
export type Category = (typeof SHOWCASE_CATEGORIES)[number];
export const SHOWCASE_EVENT = "showcase:select";

const PANELS: Record<Category, () => React.JSX.Element> = {
  web: () => <WebsitePreview kind="restaurant" />,
  auto: () => <AutomationPreview />,
  bots: () => <BotPreview />,
  soft: () => <SoftwarePreview />,
};

export function ServiceShowcase() {
  const { t } = useLanguage();
  const [cat, setCat] = useState<Category>("web");
  const tabs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    const on = (e: Event) => { const c = (e as CustomEvent<Category>).detail; if (SHOWCASE_CATEGORIES.includes(c)) setCat(c); };
    window.addEventListener(SHOWCASE_EVENT, on);
    return () => window.removeEventListener(SHOWCASE_EVENT, on);
  }, []);

  const onKey = (e: KeyboardEvent) => {
    const i = SHOWCASE_CATEGORIES.indexOf(cat);
    const step = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = SHOWCASE_CATEGORIES[(i + step + SHOWCASE_CATEGORIES.length) % SHOWCASE_CATEGORIES.length];
    setCat(next); tabs.current[next]?.focus();
  };
  const Panel = PANELS[cat];

  return (
    <section id="showcase" aria-labelledby="showcase-title" className="border-t border-line py-20 sm:py-28">
      <div className="container-x grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <h2 id="showcase-title" className="font-display text-display-lg font-semibold">{t.showcase.title}</h2>
          <p className="mt-4 max-w-[44ch] text-lead text-ink-muted">{t.showcase.subtitle}</p>
          <div role="tablist" aria-label={t.showcase.label} onKeyDown={onKey} className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2">
            {SHOWCASE_CATEGORIES.map((c) => (
              <button key={c} ref={(el) => { tabs.current[c] = el; }} role="tab" id={`tab-${c}`} aria-selected={cat === c} aria-controls="showcase-panel" tabIndex={cat === c ? 0 : -1} onClick={() => setCat(c)}
                className={`rounded-xl border px-4 py-3 text-left text-sm font-medium transition-colors ${cat === c ? "border-primary/60 bg-primary/15 text-ink" : "border-line text-ink-muted hover:border-white/20 hover:text-ink"}`}>
                {t.showcase.tabs[c]}
              </button>
            ))}
          </div>
          <p className="mt-6 max-w-[44ch] text-sm leading-relaxed text-ink-muted">{t.showcase.desc[cat]}</p>
        </div>
        <div id="showcase-panel" role="tabpanel" aria-labelledby={`tab-${cat}`} className="relative h-[24rem] sm:h-[28rem]">
          <AnimatePresence mode="wait">
            <motion.div key={cat} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }} className="h-full">
              <Panel />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
