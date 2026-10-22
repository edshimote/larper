"use client";
import { Home, Search, User } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

const hl = "transition-all duration-200 hover:ring-2 hover:ring-secondary/70 hover:ring-offset-2 hover:ring-offset-bg";

export function InterfacePreview() {
  const { t } = useLanguage();
  const u = t.demo.ui;
  return (
    <div className="relative flex h-full w-full items-center justify-center gap-3 overflow-hidden rounded-xl border border-line bg-bg p-3" aria-hidden>
      <div className="flex h-full min-w-0 flex-1 flex-col rounded-lg border border-line bg-surface p-2.5">
        <div className="mb-2 flex gap-1"><i className="h-1.5 w-6 rounded bg-primary" /><i className="h-1.5 w-6 rounded bg-white/10" /><i className="h-1.5 w-6 rounded bg-white/10" /></div>
        <div className="grid flex-1 grid-cols-2 gap-1.5"><i className={`rounded bg-white/[0.06] ${hl}`} /><i className={`rounded bg-primary/30 ${hl}`} /><i className={`col-span-2 rounded bg-white/[0.06] ${hl}`} /></div>
      </div>
      <div className="flex h-full w-[34%] min-w-[5.5rem] flex-col rounded-[1.1rem] border border-white/15 bg-surface p-2">
        <i className="mx-auto mb-2 h-1 w-8 rounded bg-white/15" />
        <i className={`mb-1.5 h-10 rounded-lg bg-gradient-to-br from-primary/50 to-secondary/30 ${hl}`} />
        <i className={`mb-1.5 h-3 rounded bg-white/10 ${hl}`} /><i className={`h-3 w-2/3 rounded bg-white/10 ${hl}`} />
        <div className="mt-auto flex justify-around text-ink-muted"><Home size={12} className="text-secondary" /><Search size={12} /><User size={12} /></div>
      </div>
      <div className="flex h-full w-[28%] min-w-[5rem] flex-col justify-center gap-2.5">
        <span className={`rounded-full bg-primary py-1.5 text-center text-[0.6rem] font-medium text-white ${hl}`}>{u.primary}</span>
        <span className={`rounded-full border border-line py-1.5 text-center text-[0.6rem] text-ink ${hl}`}>{u.secondary}</span>
        <div className={`rounded-md border border-line bg-surface px-2 py-1.5 ${hl}`}><p className="truncate text-[0.55rem] text-ink-muted">{u.input}</p></div>
        <p className="truncate text-[0.5rem] text-ink-muted">{u.hint}</p>
        <i className={`h-3.5 w-7 rounded-full bg-secondary/80 p-0.5 ${hl}`}><b className="ml-auto block h-2.5 w-2.5 rounded-full bg-bg" /></i>
      </div>
    </div>
  );
}
