"use client";
import Link from "next/link";
import { ArrowLeft, Languages } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

/** Portfolio chrome shown above each demo site: back link, "Concept Project" label, EN/PT switch. Uses portfolio tokens, not the demo's brand. */
export function DemoTopBar() {
  const { t, locale, toggle } = useLanguage();
  const c = t.demos.common;
  return (
    <div className="sticky top-0 z-50 flex h-10 items-center justify-between gap-3 border-b border-white/10 bg-bg/90 px-4 font-mono text-[0.7rem] text-ink-muted backdrop-blur-md sm:px-6">
      <Link href="/#projects" className="inline-flex items-center gap-1.5 rounded-full py-1 pr-2 transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary">
        <ArrowLeft size={14} aria-hidden />{c.back}
      </Link>
      <span className="rounded-full border border-white/10 px-2.5 py-0.5 text-ink">{c.concept}</span>
      <button type="button" onClick={toggle} aria-label={c.langSwitch} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-2.5 py-1 transition-colors hover:text-ink">
        <Languages size={13} aria-hidden />{locale === "en" ? "PT" : "EN"}
      </button>
    </div>
  );
}
