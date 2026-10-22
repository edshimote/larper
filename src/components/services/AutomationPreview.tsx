"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Play } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useActive } from "./useActive";

const STEP_MS = 800;

export function AutomationPreview() {
  const { t } = useLanguage();
  const a = t.demo.auto;
  const { ref, active } = useActive<HTMLDivElement>();
  // -1 idle, 0..n-1 running that node, n = finished
  const [cur, setCur] = useState(-1);
  const timers = useRef<number[]>([]);
  const played = useRef(false);
  const n = a.steps.length;

  const run = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    setCur(-1);
    timers.current = Array.from({ length: n + 1 }, (_, i) => window.setTimeout(() => setCur(i), 250 + i * STEP_MS));
  }, [n]);

  useEffect(() => { if (active && !played.current) { played.current = true; run(); } }, [active, run]);
  useEffect(() => () => timers.current.forEach(window.clearTimeout), []);

  const running = cur >= 0 && cur < n;
  const done = cur >= n;
  const y = (i: number) => 18 + i * 50;

  return (
    <div ref={ref} className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg p-3 shadow-2xl shadow-black/40">
      <div className="mb-1 flex items-center justify-between gap-2">
        <span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.55rem] text-ink-muted">{t.demo.simulated}</span>
        <p role="status" className={`font-mono text-[0.65rem] ${done ? "text-secondary" : "text-ink-muted"}`}>{done ? a.done : running ? a.running : a.idle}</p>
        <button onClick={run} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1 text-[0.7rem] font-medium text-white transition-colors hover:bg-primary-soft"><Play size={11} aria-hidden />{a.run}</button>
      </div>
      <svg viewBox="0 0 300 250" className="min-h-0 w-full flex-1" role="img" aria-label={a.steps.join(" → ")}>
        {a.steps.slice(0, -1).map((_, i) => (
          <g key={i}>
            <line x1="150" x2="150" y1={y(i) + 34} y2={y(i + 1)} stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
            <motion.line x1="150" x2="150" y1={y(i) + 34} y2={y(i + 1)} stroke="#00D9FF" strokeWidth="2" strokeLinecap="round" initial={false} animate={{ pathLength: cur > i ? 1 : 0 }} transition={{ duration: 0.45 }} />
          </g>
        ))}
        {a.steps.map((s, i) => {
          const state = cur > i || done ? "done" : cur === i ? "run" : "wait";
          return (
            <g key={s}>
              <rect x="50" y={y(i)} width="200" height="34" rx="10" fill="#101420" stroke={state === "wait" ? "rgba(255,255,255,0.1)" : state === "run" ? "#7958FF" : "rgba(0,217,255,0.5)"} strokeWidth="1.5" />
              <text x="66" y={y(i) + 21} fill={state === "wait" ? "#94A3B8" : "#F8FAFC"} fontSize="11.5" className="font-mono">{s}</text>
              <circle cx="228" cy={y(i) + 17} r="8" fill={state === "done" ? "#00D9FF" : "transparent"} stroke={state === "run" ? "#7958FF" : state === "done" ? "#00D9FF" : "rgba(255,255,255,0.15)"} strokeWidth="1.5" className={state === "run" ? "animate-pulse" : ""} />
              {state === "done" && <path d={`M224 ${y(i) + 17} l3 3 l5 -6`} stroke="#07090F" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />}
            </g>
          );
        })}
      </svg>
      <span className="sr-only"><Check aria-hidden /></span>
    </div>
  );
}
