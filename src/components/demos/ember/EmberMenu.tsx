"use client";
import { useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { Reveal } from "../shared/Reveal";
import { MENU_ART, MENU_CATS, MENU_PRICES, type MenuCat } from "./data";

const H = "font-[family-name:var(--font-cormorant)]";

export function EmberMenu() {
  const { t } = useLanguage();
  const m = t.demos.ember.menu;
  const [cat, setCat] = useState<MenuCat>("starters");
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : -1) + MENU_CATS.length) % MENU_CATS.length;
    setCat(MENU_CATS[next]);
    tabs.current[next]?.focus();
  };

  return (
    <section id="menu" aria-labelledby="eo-menu-title" style={{ scrollMarginTop: "7rem" }} className="bg-[#17120F] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C58B53]">{m.eyebrow}</p>
          <h2 id="eo-menu-title" className={`${H} mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl`}>{m.title}</h2>
          <p className="mt-4 text-[#B5A89C]">{m.sub}</p>
        </Reveal>

        <div role="tablist" aria-label={m.label} className="mx-auto mt-10 flex max-w-full flex-wrap justify-center gap-x-8 gap-y-3 border-b border-white/10">
          {MENU_CATS.map((c, i) => (
            <button key={c} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`eo-tab-${c}`} aria-selected={cat === c} aria-controls="eo-panel" tabIndex={cat === c ? 0 : -1}
              onClick={() => setCat(c)} onKeyDown={(e) => onKey(e, i)}
              className={`relative pb-3 text-sm uppercase tracking-[0.2em] transition-colors ${cat === c ? "text-[#F5EBDD]" : "text-[#B5A89C] hover:text-[#F5EBDD]"}`}>
              {m.cats[c]}
              {cat === c && <motion.span layoutId="eo-tab-line" className="absolute inset-x-0 -bottom-px h-px bg-[#C58B53]" />}
            </button>
          ))}
        </div>

        <div id="eo-panel" role="tabpanel" aria-labelledby={`eo-tab-${cat}`} className="mt-10">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul key={cat} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="grid gap-5 lg:grid-cols-3">
              {m.items[cat].map((d, i) => (
                <motion.li key={d.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: i * 0.08 }}
                  className="group overflow-hidden rounded-2xl border border-white/10 bg-[#241C17] transition-colors duration-300 hover:border-[#C58B53]/50">
                  <div className="aspect-[16/10] overflow-hidden">
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.05] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                      <ArtTile spec={MENU_ART[cat][i]} label={d.name} />
                    </div>
                  </div>
                  <div className="p-5 sm:p-6">
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className={`${H} text-2xl font-semibold leading-tight`}>{d.name}</h3>
                      <span className={`${H} shrink-0 text-2xl text-[#C58B53]`}>${MENU_PRICES[cat][i]}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-[#B5A89C]">{d.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
