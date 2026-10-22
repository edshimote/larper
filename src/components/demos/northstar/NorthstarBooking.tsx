"use client";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { useDays } from "../shared/useDays";
import { NS_SELECT_EVENT, SERVICE_META, TIMES } from "./data";

const chip = (on: boolean) => `rounded-lg border px-4 py-3 text-sm transition-colors ${on ? "border-[#C6A667] bg-[#C6A667]/15 text-[#F5F5F5]" : "border-white/10 text-[#A3A3A3] hover:border-white/30 hover:text-[#F5F5F5]"}`;

/** Demo-only booking flow. Local state only: nothing is stored, sent or integrated with any calendar. */
export function NorthstarBooking() {
  const { t, locale } = useLanguage();
  const b = t.demos.northstar.booking;
  const items = t.demos.northstar.services.items;
  const days = useDays(7, locale);
  const [step, setStep] = useState(0);
  const [service, setService] = useState<number | null>(null);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    const on = (e: Event) => { const i = (e as CustomEvent<number>).detail; if (typeof i === "number") { setService(i); setStep(0); setDone(false); } };
    window.addEventListener(NS_SELECT_EVENT, on);
    return () => window.removeEventListener(NS_SELECT_EVENT, on);
  }, []);

  const day = days.find((d) => d.key === dayKey);
  const canNext = (step === 0 && service !== null) || (step === 1 && !!dayKey) || (step === 2 && !!time);
  const reset = () => { setStep(0); setService(null); setDayKey(null); setTime(null); setDone(false); };
  const price = service !== null ? SERVICE_META[service].price : null;
  const dash = <span className="text-[#A3A3A3]">—</span>;

  return (
    <section id="booking" aria-labelledby="ns-booking-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] bg-[#111] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C6A667]">{b.eyebrow}</p>
          <h2 id="ns-booking-title" className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight sm:text-5xl">{b.title}</h2>
          <p className="mt-4 text-[#A3A3A3]">{b.sub}</p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
          <div className="rounded-2xl border border-white/10 bg-[#171717] p-5 sm:p-8">
            <ol aria-label={b.progress} className="mb-8 flex flex-wrap gap-x-5 gap-y-2 text-xs">
              {b.steps.map((s, i) => (
                <li key={s} aria-current={!done && i === step ? "step" : undefined} className={`flex items-center gap-2 ${i <= step || done ? "text-[#F5F5F5]" : "text-[#A3A3A3]"}`}>
                  <span className={`grid h-6 w-6 place-items-center rounded-full border text-[0.7rem] ${i < step || done ? "border-[#C6A667] bg-[#C6A667] text-[#0B0B0B]" : i === step ? "border-[#C6A667] text-[#C6A667]" : "border-white/15"}`}>{i < step || done ? <Check size={12} aria-hidden /> : i + 1}</span>{s}
                </li>
              ))}
            </ol>

            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-6 text-center" role="status">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#C6A667] text-[#0B0B0B]"><Check size={26} aria-hidden /></span>
                  <p className="mt-5 font-[family-name:var(--font-playfair)] text-2xl">{b.done}</p>
                  <p className="mx-auto mt-2 max-w-[42ch] text-sm text-[#A3A3A3]">{b.doneSub}</p>
                  <button type="button" onClick={reset} className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm transition-colors hover:border-[#C6A667] hover:text-[#C6A667]">{b.reset}</button>
                </motion.div>
              ) : (
                <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.25 }}>
                  {step === 0 && (
                    <fieldset><legend className="mb-4 font-[family-name:var(--font-playfair)] text-xl">{b.pickService}</legend>
                      <div className="grid gap-3 sm:grid-cols-2">
                        {SERVICE_META.map((m, i) => (
                          <button key={m.id} type="button" aria-pressed={service === i} onClick={() => setService(i)} className={`${chip(service === i)} flex items-center justify-between gap-3 text-left`}>
                            <span>{items[i].name}</span><span className="text-[#C6A667]">${m.price}</span>
                          </button>
                        ))}
                      </div></fieldset>
                  )}
                  {step === 1 && (
                    <fieldset><legend className="mb-4 font-[family-name:var(--font-playfair)] text-xl">{b.pickDate}</legend>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {days.map((d) => (
                          <button key={d.key} type="button" aria-pressed={dayKey === d.key} onClick={() => setDayKey(d.key)} className={`${chip(dayKey === d.key)} text-center`}>
                            <span className="block text-xs uppercase tracking-wider opacity-70">{d.weekday}</span><span className="block">{d.dayNum}</span>
                          </button>
                        ))}
                      </div></fieldset>
                  )}
                  {step === 2 && (
                    <fieldset><legend className="mb-4 font-[family-name:var(--font-playfair)] text-xl">{b.pickTime}</legend>
                      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                        {TIMES.map((x) => <button key={x} type="button" aria-pressed={time === x} onClick={() => setTime(x)} className={`${chip(time === x)} text-center`}>{x}</button>)}
                      </div></fieldset>
                  )}
                  {step === 3 && (
                    <div><h3 className="mb-4 font-[family-name:var(--font-playfair)] text-xl">{b.steps[3]}</h3>
                      <dl className="divide-y divide-white/10 text-sm">
                        <div className="flex justify-between py-3"><dt className="text-[#A3A3A3]">{b.service}</dt><dd>{service !== null ? items[service].name : dash}</dd></div>
                        <div className="flex justify-between py-3"><dt className="text-[#A3A3A3]">{b.date}</dt><dd>{day?.full ?? dash}</dd></div>
                        <div className="flex justify-between py-3"><dt className="text-[#A3A3A3]">{b.time}</dt><dd>{time ?? dash}</dd></div>
                        <div className="flex justify-between py-3"><dt className="text-[#A3A3A3]">{b.total}</dt><dd className="text-[#C6A667]">{price !== null ? `$${price}` : "—"}</dd></div>
                      </dl></div>
                  )}
                  <div className="mt-8 flex items-center justify-between gap-3">
                    <button type="button" onClick={() => setStep((s) => s - 1)} disabled={step === 0} className="rounded-full px-5 py-2.5 text-sm text-[#A3A3A3] transition-colors hover:text-[#F5F5F5] disabled:pointer-events-none disabled:opacity-30">{b.back}</button>
                    {step < 3 ? (
                      <button type="button" onClick={() => setStep((s) => s + 1)} disabled={!canNext} className="rounded-full bg-[#C6A667] px-7 py-2.5 text-sm font-medium text-[#0B0B0B] transition-all hover:bg-[#d8bb80] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40">{b.next}</button>
                    ) : (
                      <button type="button" onClick={() => setDone(true)} disabled={service === null || !dayKey || !time} className="rounded-full bg-[#C6A667] px-7 py-2.5 text-sm font-medium text-[#0B0B0B] transition-all hover:bg-[#d8bb80] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40">{b.confirm}</button>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <aside className="h-fit rounded-2xl border border-white/10 bg-[#171717] p-5 sm:p-8" aria-label={b.steps[3]}>
            <h3 className="font-[family-name:var(--font-playfair)] text-xl">{b.steps[3]}</h3>
            <dl className="mt-4 space-y-3 text-sm">
              <div><dt className="text-xs uppercase tracking-wider text-[#A3A3A3]">{b.service}</dt><dd className="mt-1">{service !== null ? items[service].name : dash}</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-[#A3A3A3]">{b.date}</dt><dd className="mt-1">{day?.full ?? dash}</dd></div>
              <div><dt className="text-xs uppercase tracking-wider text-[#A3A3A3]">{b.time}</dt><dd className="mt-1">{time ?? dash}</dd></div>
              <div className="border-t border-white/10 pt-3"><dt className="text-xs uppercase tracking-wider text-[#A3A3A3]">{b.total}</dt><dd className="mt-1 text-lg text-[#C6A667]">{price !== null ? `$${price}` : "—"}</dd></div>
            </dl>
            <p className="mt-6 text-xs leading-relaxed text-[#A3A3A3]">{b.note}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
