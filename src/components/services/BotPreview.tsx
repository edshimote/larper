"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Bot, RotateCcw, SendHorizontal } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useActive } from "./useActive";

export function BotPreview() {
  const { t } = useLanguage();
  const b = t.demo.bot;
  const reduce = useReducedMotion();
  const { ref, active } = useActive<HTMLDivElement>();
  const [shown, setShown] = useState(0);
  const [typing, setTyping] = useState(false);
  const [run, setRun] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (reduce) { setShown(b.msgs.length); return; }
    setShown(0); setTyping(false);
    const ids: number[] = [];
    let at = 500;
    b.msgs.forEach((m, i) => {
      if (m.bot) { ids.push(window.setTimeout(() => setTyping(true), at)); at += 1200; }
      ids.push(window.setTimeout(() => { setTyping(false); setShown(i + 1); }, at));
      at += 900;
    });
    return () => ids.forEach(window.clearTimeout);
  }, [active, run, reduce, b.msgs]);

  return (
    <div ref={ref} className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-2xl shadow-black/40">
      <div className="flex items-center gap-2.5 border-b border-line bg-elevated px-3 py-2.5">
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/25 text-primary-soft"><Bot size={14} aria-hidden /></span>
        <div className="min-w-0 flex-1 leading-tight">
          <p className="truncate text-xs font-medium">{b.title}</p>
          <p className="flex items-center gap-1 font-mono text-[0.6rem] text-ink-muted"><span className={`h-1.5 w-1.5 rounded-full bg-secondary ${typing ? "animate-pulse" : ""}`} />{typing ? b.processing : b.status}</p>
        </div>
        <span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.55rem] text-ink-muted">{t.demo.simulated}</span>
        <button onClick={() => setRun((r) => r + 1)} aria-label={b.replay} className="grid h-7 w-7 place-items-center rounded-full text-ink-muted transition-colors hover:text-ink"><RotateCcw size={13} /></button>
      </div>
      <div className="flex flex-1 flex-col justify-end gap-2 overflow-hidden p-3" aria-live="off">
        {b.msgs.slice(0, shown).map((m, i) => (
          <motion.p key={`${run}-${i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
            className={`max-w-[85%] rounded-2xl px-3 py-2 text-xs leading-snug ${m.bot ? "self-start rounded-bl-sm bg-elevated text-ink" : "self-end rounded-br-sm bg-primary text-white"}`}>{m.text}</motion.p>
        ))}
        {typing && (
          <span className="flex w-12 gap-1 self-start rounded-2xl rounded-bl-sm bg-elevated px-3 py-2.5" aria-hidden>
            {[0, 1, 2].map((d) => <i key={d} style={{ animationDelay: `${d * 150}ms` }} className="h-1.5 w-1.5 animate-pulse rounded-full bg-ink-muted" />)}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2 border-t border-line p-2" aria-hidden>
        <span className="flex-1 rounded-full bg-surface px-3 py-1.5 text-[0.65rem] text-ink-muted">{b.input}</span>
        <span className="grid h-7 w-7 place-items-center rounded-full bg-primary/80"><SendHorizontal size={12} /></span>
      </div>
    </div>
  );
}
