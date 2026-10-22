"use client";
import { useEffect, useRef, type KeyboardEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Props = {
  index: number; count: number; title: string; caption: string;
  onClose: () => void; onNavigate: (delta: number) => void;
  children: ReactNode;              // the enlarged visual for the current index
  panelClass?: string; buttonClass?: string; titleClass?: string; // per-site theming
};
const FOCUSABLE = "button:not([disabled])";

/** Accessible enlarged-view dialog: focus trap, Esc, ArrowLeft/Right, scroll lock. Parent restores focus. */
export function Lightbox({ index, count, title, caption, onClose, onNavigate, children, panelClass = "", buttonClass = "", titleClass = "" }: Props) {
  const { t } = useLanguage();
  const c = t.demos.common;
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
    if (e.key === "ArrowLeft" || e.key === "ArrowRight") { e.preventDefault(); onNavigate(e.key === "ArrowRight" ? 1 : -1); return; }
    if (e.key === "Tab" && panel.current) {
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };
  const btn = `grid h-10 w-10 place-items-center rounded-full border transition-colors ${buttonClass}`;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      onKeyDown={onKeyDown} className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={title}
        initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className={`relative z-10 flex max-h-[94svh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl border shadow-2xl shadow-black/70 ${panelClass}`}>
        <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
          <p className="font-mono text-xs opacity-70" aria-live="polite">{index + 1} {c.counter} {count}</p>
          <div className="flex gap-2">
            <button type="button" onClick={() => onNavigate(-1)} aria-label={c.prev} className={btn}><ChevronLeft size={18} aria-hidden /></button>
            <button type="button" onClick={() => onNavigate(1)} aria-label={c.next} className={btn}><ChevronRight size={18} aria-hidden /></button>
            <button ref={closeBtn} type="button" onClick={onClose} aria-label={c.close} className={btn}><X size={18} aria-hidden /></button>
          </div>
        </div>
        <div className="relative aspect-[4/3] max-h-[62svh] w-full min-h-0 flex-1 overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={index} initial={{ opacity: 0, scale: 1.02 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} className="absolute inset-0">
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="px-5 py-4">
          <h3 className={`text-xl ${titleClass}`}>{title}</h3>
          <p className="mt-1 text-sm opacity-70">{caption}</p>
          <p className="mt-3 font-mono text-[0.65rem] opacity-50">{c.artNote}</p>
        </div>
      </motion.div>
    </motion.div>
  );
}
