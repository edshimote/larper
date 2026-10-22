"use client";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { MODELS, type ModelId } from "./data";

export function PrismGallery({ selected, onSelect }: { selected: ModelId; onSelect: (id: ModelId) => void }) {
  const { t } = useLanguage();
  const g = t.demos.prism.gallery;

  return (
    <section id="gallery" style={{ scrollMarginTop: "7rem" }} className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <Reveal>
        <p className="text-xs uppercase tracking-[0.35em] text-[#8B6CFF]">{g.eyebrow}</p>
        <h2 className="mt-4 font-[family-name:var(--font-outfit)] text-3xl font-semibold tracking-tight text-[#F8FAFC] sm:text-4xl">{g.title}</h2>
        <p className="mt-3 max-w-[60ch] text-[#94A3B8]">{g.sub}</p>
      </Reveal>

      <ul className="mt-10 grid gap-5 sm:grid-cols-3" role="list">
        {MODELS.map((m, i) => {
          const copy = g.items[i];
          const active = selected === m.id;
          const Icon = m.icon;
          return (
            <Reveal key={m.id} delay={i * 0.08}>
              <li>
                <button
                  type="button"
                  onClick={() => onSelect(m.id)}
                  aria-pressed={active}
                  className={`group relative flex w-full flex-col overflow-hidden rounded-2xl border text-left transition-all ${active ? "border-[#8B6CFF] shadow-[0_0_0_1px_rgba(139,108,255,0.5),0_10px_40px_-10px_rgba(139,108,255,0.5)]" : "border-white/10 hover:border-white/25"}`}
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden" style={{ background: `radial-gradient(70% 70% at 70% 20%, ${m.accent}33, transparent 65%), radial-gradient(60% 60% at 15% 85%, ${m.accent2}26, transparent 70%)` }}>
                    <Icon aria-hidden strokeWidth={1} className="absolute left-1/2 top-1/2 h-[42%] w-[42%] -translate-x-1/2 -translate-y-1/2 transition-transform duration-500 group-hover:scale-110 motion-reduce:transition-none" style={{ color: m.accent }} />
                    <span className="absolute left-3 top-3 rounded-full border border-white/15 bg-[#07090F]/70 px-2 py-0.5 text-[0.6rem] uppercase tracking-wider text-[#94A3B8] backdrop-blur-sm">{g.demoTag}</span>
                    {active && (
                      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#8B6CFF] px-2 py-0.5 text-[0.6rem] font-medium text-[#07090F]">
                        <Check size={11} aria-hidden />{g.selected}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1.5 border-t border-white/10 bg-[#0D0820] p-4">
                    <span className="text-[0.65rem] uppercase tracking-wider text-[#94A3B8]">{copy.category}</span>
                    <span className="font-[family-name:var(--font-outfit)] text-base font-semibold text-[#F8FAFC]">{copy.name}</span>
                    <span className="text-sm leading-relaxed text-[#94A3B8]">{copy.desc}</span>
                    <span className={`mt-2 inline-flex w-fit items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors ${active ? "border-[#8B6CFF] text-[#8B6CFF]" : "border-white/15 text-[#94A3B8] group-hover:border-white/30 group-hover:text-[#F8FAFC]"}`}>{g.select}</span>
                  </div>
                </button>
              </li>
            </Reveal>
          );
        })}
      </ul>
    </section>
  );
}
