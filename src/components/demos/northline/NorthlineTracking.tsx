"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, PackageSearch, Search } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { TRACKING_DEMOS } from "./data";

/**
 * Demo-only shipment tracker. Recognizes ONLY the fixed, fictional codes in `TRACKING_DEMOS`.
 * No real carrier, API or external request is involved.
 */
export function NorthlineTracking() {
  const { t } = useLanguage();
  const tr = t.demos.northline.tracking;
  const [value, setValue] = useState("");
  const [result, setResult] = useState<(typeof TRACKING_DEMOS)[number] | null | "miss">(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const hit = TRACKING_DEMOS.find((d) => d.code.toLowerCase() === value.trim().toLowerCase());
    setResult(hit ?? "miss");
  };
  const useCode = (code: string) => { setValue(code); setResult(TRACKING_DEMOS.find((d) => d.code === code) ?? null); };

  return (
    <section id="tracking" aria-labelledby="nl-tracking-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{tr.eyebrow}</p>
          <h2 id="nl-tracking-title" className="mt-4 font-display text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{tr.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{tr.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-white/10 bg-[#132A45] p-6 sm:p-8">
          <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
            <label htmlFor="nl-track-input" className="sr-only">{tr.label}</label>
            <div className="relative flex-1">
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]" aria-hidden />
              <input id="nl-track-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={tr.placeholder}
                className="h-12 w-full rounded-xl border border-white/15 bg-[#0F2238] pl-11 pr-4 text-sm text-[#F8FAFC] placeholder:text-[#94A3B8]/70 outline-none transition-colors focus:border-[#38BDF8]" />
            </div>
            <button type="submit" className="h-12 shrink-0 rounded-xl bg-[#38BDF8] px-7 text-sm font-medium text-[#071120] transition-all hover:bg-[#67cbfb] active:scale-[0.97]">{tr.cta}</button>
          </form>
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-[#94A3B8]">
            <span>{tr.hint}</span>
            {TRACKING_DEMOS.map((d) => (
              <button key={d.code} type="button" onClick={() => useCode(d.code)} className="rounded-full border border-white/15 px-3 py-1 font-mono text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]">{d.code}</button>
            ))}
          </div>

          <AnimatePresence mode="wait" initial={false}>
            {result === "miss" && (
              <motion.p key="miss" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="mt-6 text-sm text-[#94A3B8]">{tr.notFound}</motion.p>
            )}
            {result && result !== "miss" && (
              <motion.div key={result.code} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status" className="mt-8 border-t border-white/10 pt-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <PackageSearch size={18} className="text-[#38BDF8]" aria-hidden />
                    <span className="font-mono text-sm text-[#F8FAFC]">{result.code}</span>
                  </div>
                  <span className="text-sm text-[#94A3B8]">{result.origin} → {result.destination}</span>
                </div>
                <ol className="mt-6 grid gap-4 sm:grid-cols-4">
                  {tr.stages.map((label, i) => {
                    const done = i <= result.stage;
                    return (
                      <li key={label} className="flex flex-col items-center gap-2 text-center sm:items-start sm:text-left">
                        <span className={`grid h-8 w-8 place-items-center rounded-full border text-xs ${done ? "border-[#38BDF8] bg-[#38BDF8] text-[#071120]" : "border-white/15 text-[#94A3B8]"}`}>
                          {done ? <Check size={14} aria-hidden /> : i + 1}
                        </span>
                        <span className={`text-sm ${done ? "text-[#F8FAFC]" : "text-[#94A3B8]"}`}>{label}</span>
                      </li>
                    );
                  })}
                </ol>
                <p className="mt-5 text-sm text-[#94A3B8]">{tr.etaLabel}: <span className="text-[#F8FAFC]">{result.eta}</span></p>
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-6 text-xs text-[#94A3B8]/70">{tr.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
