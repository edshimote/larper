"use client";
import { motion } from "framer-motion";
import { Activity, BarChart3, LayoutDashboard, Users } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { useActive } from "./useActive";

const BARS = [38, 62, 48, 80, 58, 92, 70];
const ICONS = [LayoutDashboard, BarChart3, Users];
const VALUES = ["128", "12"];

export function SoftwarePreview() {
  const { t } = useLanguage();
  const s = t.demo.soft;
  const { ref, active } = useActive<HTMLDivElement>();
  return (
    <div ref={ref} role="img" aria-label={`${t.demo.badge}: ${s.sample}`} className="flex h-full w-full overflow-hidden rounded-xl border border-line bg-bg shadow-2xl shadow-black/40">
      <div className="hidden w-12 flex-col items-center gap-3 border-r border-line bg-surface py-3 sm:flex" aria-hidden>
        <span className="mb-1 h-5 w-5 rounded-md bg-primary" />
        {ICONS.map((I, i) => <span key={i} className={`grid h-8 w-8 cursor-default place-items-center rounded-lg transition-colors ${i === 0 ? "bg-white/10 text-ink" : "text-ink-muted hover:bg-white/5 hover:text-ink"}`}><I size={15} /></span>)}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-2.5 p-3" aria-hidden>
        <div className="flex items-center justify-between"><span className="text-xs font-medium">{s.nav[0]}</span><span className="rounded bg-white/[0.07] px-1.5 py-0.5 font-mono text-[0.55rem] text-ink-muted">{s.sample}</span></div>
        <div className="grid grid-cols-3 gap-2">
          {s.stats.map((label, i) => (
            <div key={label} className="rounded-lg border border-line bg-surface p-2 transition-colors hover:border-primary/40">
              <p className="truncate text-[0.58rem] text-ink-muted">{label}</p>
              <p className="mt-0.5 flex items-center gap-1 font-display text-sm font-semibold">{i === 2 ? <><span className="h-1.5 w-1.5 rounded-full bg-secondary" /><span className="text-[0.62rem]">{s.syncValue}</span></> : VALUES[i]}</p>
            </div>
          ))}
        </div>
        <div className="grid min-h-0 flex-1 grid-cols-5 gap-2">
          <div className="col-span-3 flex flex-col rounded-lg border border-line bg-surface p-2">
            <p className="text-[0.58rem] text-ink-muted">{s.chart}</p>
            <div className="mt-2 flex flex-1 items-end gap-1.5">
              {BARS.map((h, i) => (
                <motion.i key={i} initial={{ scaleY: 0 }} animate={{ scaleY: active ? h / 100 : 0 }} transition={{ duration: 0.6, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }} style={{ transformOrigin: "bottom" }} className="h-full flex-1 rounded-sm bg-gradient-to-t from-primary to-secondary/80" />
              ))}
            </div>
          </div>
          <div className="col-span-2 rounded-lg border border-line bg-surface p-2">
            <p className="flex items-center gap-1 text-[0.58rem] text-ink-muted"><Activity size={10} />{s.feedTitle}</p>
            <ul className="mt-2 space-y-2">{s.feed.map((f) => <li key={f} className="flex items-center gap-1.5 text-[0.58rem] text-ink"><span className="h-1 w-1 shrink-0 rounded-full bg-secondary" /><span className="truncate">{f}</span></li>)}</ul>
          </div>
        </div>
      </div>
    </div>
  );
}
