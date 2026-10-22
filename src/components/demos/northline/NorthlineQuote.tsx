"use client";
import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Loader2 } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { CARGO_TYPES, CITIES, MODES, type CargoType, type ModeId } from "./data";

const field = "h-12 w-full rounded-xl border border-white/15 bg-[#0A1628] px-4 text-sm text-[#F8FAFC] outline-none transition-colors focus:border-[#38BDF8]";
const label = "mb-2 block text-xs uppercase tracking-wider text-[#94A3B8]";

/**
 * Demo-only quote simulator. Shows an illustrative transit-time estimate ONLY — never a price.
 * Local state only: nothing is sent anywhere, there is no real quote and no information leaves the browser.
 */
export function NorthlineQuote() {
  const { t } = useLanguage();
  const q = t.demos.northline.quote;
  // v2: city state is typed as plain string (CITIES is `as const`, so inference would otherwise narrow to a literal)
  const cityAt = (i: number): string => CITIES[i];
  const [origin, setOrigin] = useState<string>(cityAt(0));
  const [destination, setDestination] = useState<string>(cityAt(1));
  const [cargo, setCargo] = useState<CargoType>("general");
  const [weight, setWeight] = useState("");
  const [mode, setMode] = useState<ModeId>("ground");
  const [phase, setPhase] = useState<"idle" | "processing" | "done">("idle");
  const [ref_, setRef] = useState("");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (phase === "processing") return;
    setPhase("processing");
    setRef(`NL-Q-${Math.floor(10000 + Math.random() * 89999)}`);
    window.setTimeout(() => setPhase("done"), 1400);
  };
  const reset = () => { setPhase("idle"); setWeight(""); };
  const eta = MODES.find((m) => m.id === mode)?.eta ?? "";
  const dash = <span className="text-[#94A3B8]">—</span>;

  return (
    <section id="quote" aria-labelledby="nl-quote-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0F2238] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#38BDF8]">{q.eyebrow}</p>
          <h2 id="nl-quote-title" className="mt-4 font-display text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{q.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{q.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 rounded-2xl border border-white/10 bg-[#132A45] p-6 sm:p-10">
          <AnimatePresence mode="wait" initial={false}>
            {phase === "idle" && (
              <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className={label} htmlFor="nl-origin">{q.origin}</label>
                  <select id="nl-origin" value={origin} onChange={(e) => setOrigin(e.target.value)} className={field}>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="nl-dest">{q.destination}</label>
                  <select id="nl-dest" value={destination} onChange={(e) => setDestination(e.target.value)} className={field}>
                    {CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="nl-cargo">{q.cargoType}</label>
                  <select id="nl-cargo" value={cargo} onChange={(e) => setCargo(e.target.value as CargoType)} className={field}>
                    {CARGO_TYPES.map((c) => <option key={c} value={c}>{q.cargoTypes[c]}</option>)}
                  </select>
                </div>
                <div>
                  <label className={label} htmlFor="nl-weight">{q.weight}</label>
                  <input id="nl-weight" type="number" min={1} required inputMode="numeric" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder={q.weightPlaceholder} className={field} />
                </div>
                <fieldset className="sm:col-span-2">
                  <legend className={label}>{q.mode}</legend>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {MODES.map((m) => (
                      <button key={m.id} type="button" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}
                        className={`rounded-xl border px-4 py-3 text-left text-sm transition-colors ${mode === m.id ? "border-[#38BDF8] bg-[#38BDF8]/15 text-[#F8FAFC]" : "border-white/15 text-[#94A3B8] hover:border-white/30 hover:text-[#F8FAFC]"}`}>
                        {q.modes[m.id]}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="flex items-center justify-end sm:col-span-2">
                  <button type="submit" disabled={!weight} className="rounded-full bg-[#38BDF8] px-8 py-3 text-sm font-medium text-[#071120] transition-all hover:bg-[#67cbfb] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40">{q.submit}</button>
                </div>
              </motion.form>
            )}
            {phase === "processing" && (
              <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="status" className="flex flex-col items-center gap-4 py-10 text-center">
                <Loader2 size={32} className="animate-spin text-[#38BDF8] motion-reduce:animate-none" aria-hidden />
                <p className="text-sm text-[#94A3B8]">{q.processing}</p>
              </motion.div>
            )}
            {phase === "done" && (
              <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} role="status">
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-[#38BDF8] text-[#071120]"><Check size={18} aria-hidden /></span>
                  <h3 className="font-display text-xl font-semibold text-[#F8FAFC]">{q.resultTitle}</h3>
                </div>
                <dl className="mt-6 divide-y divide-white/10 text-sm">
                  <div className="flex justify-between py-3"><dt className="text-[#94A3B8]">{q.refLabel}</dt><dd className="font-mono text-[#F8FAFC]">{ref_ || dash}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-[#94A3B8]">{q.routeLabel}</dt><dd className="text-[#F8FAFC]">{origin} → {destination}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-[#94A3B8]">{q.cargoLabel}</dt><dd className="text-[#F8FAFC]">{q.cargoTypes[cargo]} · {weight} lbs</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-[#94A3B8]">{q.modeLabel}</dt><dd className="text-[#F8FAFC]">{q.modes[mode]}</dd></div>
                  <div className="flex justify-between py-3"><dt className="text-[#94A3B8]">{q.etaLabel}</dt><dd className="text-[#38BDF8]">{eta}</dd></div>
                </dl>
                <p className="mt-6 text-xs leading-relaxed text-[#94A3B8]">{q.note}</p>
                <button type="button" onClick={reset} className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm text-[#F8FAFC] transition-colors hover:border-[#38BDF8] hover:text-[#38BDF8]">{q.reset}</button>
              </motion.div>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}
