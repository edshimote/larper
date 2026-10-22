"use client";
import { useState } from "react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { BOTS } from "./data";

/** Fictional bot fleet with a local Start/Stop toggle per bot. No real Telegram/Discord account is connected. */
export function NexusBots() {
  const { t } = useLanguage();
  const b = t.demos.nexus.bots;
  const [online, setOnline] = useState<boolean[]>(BOTS.map((bot) => bot.online));

  return (
    <section id="bots" aria-labelledby="nx-bots-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0B2227] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="flex max-w-2xl flex-col gap-4">
          <p className="text-xs uppercase tracking-[0.3em] text-[#22D3EE]">{b.eyebrow}</p>
          <h2 id="nx-bots-title" className="font-[family-name:var(--font-space-mono)] text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{b.title}</h2>
          <p className="text-[#94A3B8]">{b.sub}</p>
        </Reveal>
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {BOTS.map((bot, i) => {
            const Icon = bot.icon;
            const item = b.items[i];
            const isOnline = online[i];
            return (
              <li key={item.name}>
                <Reveal delay={i * 0.06} className="h-full">
                  <article className="flex h-full flex-col gap-4 rounded-2xl border border-white/10 bg-[#0F2A30] p-6 transition-colors duration-300 hover:border-[#22D3EE]/50">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-[#22D3EE]/15 text-[#22D3EE]"><Icon size={20} aria-hidden /></span>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${isOnline ? "bg-[#22D3EE]/15 text-[#22D3EE]" : "bg-white/[0.07] text-[#94A3B8]"}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${isOnline ? "bg-[#22D3EE] animate-pulse" : "bg-[#94A3B8]"}`} />{isOnline ? b.online : b.offline}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-[family-name:var(--font-space-mono)] text-lg font-semibold text-[#F8FAFC]">{item.name}</h3>
                      <p className="mt-1 text-xs uppercase tracking-wide text-[#22D3EE]/80">{item.type}</p>
                      <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{item.desc}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setOnline((prev) => prev.map((v, idx) => (idx === i ? !v : v)))}
                      className={`mt-auto inline-flex h-9 items-center justify-center rounded-full text-sm font-medium transition-colors ${
                        isOnline ? "border border-white/20 text-[#F8FAFC] hover:border-[#F87171] hover:text-[#F87171]" : "bg-[#22D3EE] text-[#052a30] hover:bg-[#5fe6f5]"
                      }`}
                    >
                      {isOnline ? b.stop : b.start}
                    </button>
                  </article>
                </Reveal>
              </li>
            );
          })}
        </ul>
        <p className="mt-6 font-mono text-[0.68rem] text-[#94A3B8]">{b.sample}</p>
      </div>
    </section>
  );
}
