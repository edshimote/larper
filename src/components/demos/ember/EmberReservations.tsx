"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { useDays } from "../shared/useDays";
import { MAX_GUESTS, TIMES } from "./data";

const H = "font-[family-name:var(--font-cormorant)]";
const chip = (on: boolean) => `rounded-lg border px-3 py-2.5 text-sm transition-colors ${on ? "border-[#C58B53] bg-[#C58B53] text-[#17120F]" : "border-[#17120F]/20 text-[#17120F]/75 hover:border-[#17120F]/50"}`;

/** Demo-only reservation preview. Local state only: nothing is stored or sent. */
export function EmberReservations() {
  const { t, locale } = useLanguage();
  const r = t.demos.ember.reservations;
  const days = useDays(7, locale);
  const [dayKey, setDayKey] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [guests, setGuests] = useState(2);
  const [done, setDone] = useState(false);
  const day = days.find((d) => d.key === dayKey);
  const ready = !!day && !!time;
  const reset = () => { setDayKey(null); setTime(null); setGuests(2); setDone(false); };
  const step = "grid h-10 w-10 place-items-center rounded-full border border-[#17120F]/25 transition-colors hover:border-[#17120F] disabled:pointer-events-none disabled:opacity-30";

  return (
    <section id="reservations" aria-labelledby="eo-res-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] bg-[#17120F] py-20 sm:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C58B53]">{r.eyebrow}</p>
          <h2 id="eo-res-title" className={`${H} mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl`}>{r.title}</h2>
          <p className="mt-4 text-[#B5A89C]">{r.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="rounded-3xl bg-[#F5EBDD] p-6 text-[#17120F] sm:p-10">
            <AnimatePresence mode="wait" initial={false}>
              {done ? (
                <motion.div key="done" role="status" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="py-8 text-center">
                  <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-[#C58B53] text-[#17120F]"><Check size={26} aria-hidden /></span>
                  <p className={`${H} mx-auto mt-5 max-w-[26ch] text-3xl font-semibold leading-tight`}>{r.done}</p>
                  <p className="mx-auto mt-3 max-w-[42ch] text-sm text-[#17120F]/70">{r.doneSub}</p>
                  <button type="button" onClick={reset} className="mt-7 rounded-full border border-[#17120F]/30 px-6 py-2.5 text-sm transition-colors hover:border-[#17120F]">{r.reset}</button>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
                  <div className="space-y-7">
                    <fieldset><legend className="mb-3 text-xs uppercase tracking-[0.2em] text-[#17120F]/60">{r.date}</legend>
                      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                        {days.map((d) => <button key={d.key} type="button" aria-pressed={dayKey === d.key} onClick={() => setDayKey(d.key)} className={`${chip(dayKey === d.key)} text-center`}><span className="block text-[0.65rem] uppercase tracking-wider opacity-70">{d.weekday}</span>{d.dayNum}</button>)}
                      </div></fieldset>
                    <fieldset><legend className="mb-3 text-xs uppercase tracking-[0.2em] text-[#17120F]/60">{r.time}</legend>
                      <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
                        {TIMES.map((x) => <button key={x} type="button" aria-pressed={time === x} onClick={() => setTime(x)} className={`${chip(time === x)} text-center`}>{x}</button>)}
                      </div></fieldset>
                    <div>
                      <p id="eo-guests" className="mb-3 text-xs uppercase tracking-[0.2em] text-[#17120F]/60">{r.guests}</p>
                      <div role="group" aria-labelledby="eo-guests" className="flex items-center gap-4">
                        <button type="button" className={step} onClick={() => setGuests((g) => Math.max(1, g - 1))} disabled={guests <= 1} aria-label={r.less}><Minus size={16} aria-hidden /></button>
                        <span className={`${H} min-w-[5.5rem] text-center text-3xl font-semibold`} aria-live="polite">{guests} <span className="text-base font-normal text-[#17120F]/60">{guests === 1 ? r.guestsOne : r.guestsMany}</span></span>
                        <button type="button" className={step} onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))} disabled={guests >= MAX_GUESTS} aria-label={r.more}><Plus size={16} aria-hidden /></button>
                      </div>
                    </div>
                  </div>
                  <aside className="flex flex-col rounded-2xl bg-[#17120F] p-6 text-[#F5EBDD]" aria-label={r.summary}>
                    <h3 className={`${H} text-2xl font-semibold`}>{r.summary}</h3>
                    <dl className="mt-4 flex-1 space-y-3 text-sm">
                      <div><dt className="text-xs uppercase tracking-wider text-[#B5A89C]">{r.date}</dt><dd className="mt-1">{day?.full ?? "—"}</dd></div>
                      <div><dt className="text-xs uppercase tracking-wider text-[#B5A89C]">{r.time}</dt><dd className="mt-1">{time ?? "—"}</dd></div>
                      <div><dt className="text-xs uppercase tracking-wider text-[#B5A89C]">{r.guests}</dt><dd className="mt-1">{guests} {guests === 1 ? r.guestsOne : r.guestsMany}</dd></div>
                    </dl>
                    {!ready && <p className="mt-4 text-xs text-[#B5A89C]">{r.empty}</p>}
                    <button type="button" disabled={!ready} onClick={() => setDone(true)} className="mt-5 rounded-full bg-[#C58B53] px-6 py-3 text-sm font-medium text-[#17120F] transition-all hover:bg-[#d49c66] active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40">{r.confirm}</button>
                  </aside>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <p className="mt-4 text-center text-xs text-[#B5A89C]">{r.note}</p>
        </Reveal>
      </div>
    </section>
  );
}
