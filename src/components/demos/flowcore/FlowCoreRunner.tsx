"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Play, RotateCcw } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Reveal } from "../shared/Reveal";
import { HISTORY_META, RUNNER_STEPS } from "./data";

const STEP_MS = 900;
const green = "bg-[#34D399] text-[#052e22] hover:bg-[#5fe3b3]";

/**
 * Full-page version of the Stage 2 AutomationPreview: a row of connected workflow nodes that light up
 * one at a time on "Run Automation", with a matching live execution log. Local simulation only — no
 * real automation runs.
 */
export function FlowCoreRunner() {
  const { t } = useLanguage();
  const f = t.demos.flowcore.runner;
  const n = RUNNER_STEPS.length;
  // -1 idle, 0..n-1 running that node, n = finished
  const [cur, setCur] = useState(-1);
  const [log, setLog] = useState<number[]>([]);
  const timers = useRef<number[]>([]);

  const run = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    setCur(-1);
    setLog([]);
    timers.current = Array.from({ length: n + 1 }, (_, i) =>
      window.setTimeout(() => {
        setCur(i);
        if (i < n) setLog((prev) => [...prev, i]);
      }, 300 + i * STEP_MS)
    );
  }, [n]);

  const reset = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    setCur(-1);
    setLog([]);
  }, []);

  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const running = cur >= 0 && cur < n;
  const done = cur >= n;

  return (
    <section id="runner" aria-labelledby="fc-runner-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.08] bg-[#0A1F18] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#34D399]">{f.eyebrow}</p>
          <h2 id="fc-runner-title" className="mt-4 font-[family-name:var(--font-sora)] text-4xl font-semibold leading-tight text-[#F8FAFC] sm:text-5xl">{f.title}</h2>
          <p className="mt-4 text-[#94A3B8]">{f.sub}</p>
        </Reveal>

        <Reveal delay={0.1} className="mt-10 grid gap-6 lg:grid-cols-[1.3fr_1fr]">
          {/* Flowchart */}
          <div className="rounded-2xl border border-white/10 bg-[#0F2B20] p-5 sm:p-7">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p role="status" className={`font-mono text-xs ${done ? "text-[#34D399]" : "text-[#94A3B8]"}`}>
                {done ? f.completed : running ? f.running : f.idle}
              </p>
              <div className="flex gap-2">
                <button type="button" onClick={run} className={`inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-medium transition-all active:scale-[0.97] ${green}`}>
                  <Play size={14} aria-hidden />{done ? f.restart : f.run}
                </button>
                {(running || done) && (
                  <button type="button" onClick={reset} aria-label={f.reset} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#F8FAFC] transition-colors hover:border-[#34D399] hover:text-[#34D399]">
                    <RotateCcw size={15} aria-hidden />
                  </button>
                )}
              </div>
            </div>
            <ol className="flex flex-col gap-0" aria-label={f.steps.join(" → ")}>
              {f.steps.map((label, i) => {
                const Icon = RUNNER_STEPS[i];
                const state = cur > i || done ? "done" : cur === i ? "run" : "wait";
                return (
                  <li key={label} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <span
                        className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border-2 transition-colors ${
                          state === "wait" ? "border-white/15 text-[#94A3B8]" : state === "run" ? "border-[#7958FF] text-[#7958FF]" : "border-[#34D399] bg-[#34D399]/15 text-[#34D399]"
                        } ${state === "run" ? "animate-pulse" : ""}`}
                      >
                        {state === "done" ? <Check size={16} aria-hidden /> : <Icon size={16} aria-hidden />}
                      </span>
                      {i < f.steps.length - 1 && (
                        <span className="relative my-1 h-10 w-px bg-white/10">
                          <motion.span initial={false} animate={{ scaleY: cur > i ? 1 : 0 }} transition={{ duration: 0.45 }} style={{ transformOrigin: "top" }} className="absolute inset-0 w-px bg-[#34D399]" />
                        </span>
                      )}
                    </div>
                    <div className={`flex-1 pb-8 ${i === f.steps.length - 1 ? "pb-0" : ""}`}>
                      <p className={`text-sm font-medium ${state === "wait" ? "text-[#94A3B8]" : "text-[#F8FAFC]"}`}>{label}</p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {/* Live log */}
          <div className="flex flex-col rounded-2xl border border-white/10 bg-[#0F2B20] p-5 sm:p-7">
            <p className="font-mono text-xs uppercase tracking-wide text-[#94A3B8]">{f.log.title}</p>
            <div className="mt-4 flex-1 space-y-2.5 font-mono text-[0.78rem] leading-relaxed" aria-live="polite">
              {log.length === 0 && <p className="text-[#94A3B8]">{f.log.empty}</p>}
              {log.map((i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="flex gap-2 text-[#CBD5E1]">
                  <span className="text-[#34D399]">›</span>{f.log.entries[i]}
                </motion.p>
              ))}
              {done && (
                <motion.p initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 pt-1 text-[#34D399]">
                  <Check size={14} aria-hidden />{f.completed}
                </motion.p>
              )}
            </div>
          </div>
        </Reveal>

        {/* History */}
        <Reveal delay={0.15} className="mt-14">
          <h3 className="font-[family-name:var(--font-sora)] text-2xl font-semibold text-[#F8FAFC]">{f.history.title}</h3>
          <p className="mt-2 max-w-2xl text-sm text-[#94A3B8]">{f.history.sub}</p>
          <div className="mt-6 overflow-x-auto rounded-2xl border border-white/10">
            <table className="w-full min-w-[480px] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/10 bg-[#0F2B20] text-xs uppercase tracking-wide text-[#94A3B8]">
                  <th scope="col" className="px-5 py-3 font-medium">{f.history.columns.workflow}</th>
                  <th scope="col" className="px-5 py-3 font-medium">{f.history.columns.status}</th>
                  <th scope="col" className="px-5 py-3 font-medium">{f.history.columns.duration}</th>
                  <th scope="col" className="px-5 py-3 font-medium">{f.history.columns.time}</th>
                </tr>
              </thead>
              <tbody>
                {f.history.rows.map((row, i) => (
                  <tr key={i} className="border-b border-white/[0.06] text-[#F8FAFC] last:border-b-0">
                    <td className="px-5 py-3">{row.workflow}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#34D399]/15 px-2.5 py-0.5 text-xs text-[#34D399]">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#34D399]" />{f.history.statusSuccess}
                      </span>
                    </td>
                    <td className="px-5 py-3 font-mono text-[#94A3B8]">{HISTORY_META[i]?.duration}</td>
                    <td className="px-5 py-3 text-[#94A3B8]">{row.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
