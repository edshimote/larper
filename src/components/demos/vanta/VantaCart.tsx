"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { useCart } from "./cart-context";
import { findProduct, PRODUCT_ART, PRODUCTS } from "./data";

const FOCUSABLE = "button:not([disabled])";

/** Slide-over cart. Local state only: no payment, no backend, no order is ever submitted. */
export function VantaCart() {
  const { t } = useLanguage();
  const c = t.demos.vanta.cart;
  const names = t.demos.vanta.catalog.products;
  const { lines, subtotal, open, setOpen, remove, setQty, clear } = useCart();
  const [confirmed, setConfirmed] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) { setConfirmed(false); return; }
    closeBtn.current?.focus();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.preventDefault(); setOpen(false); return; }
    if (e.key === "Tab" && panel.current) {
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const checkout = () => { setConfirmed(true); clear(); };
  const step = "grid h-7 w-7 place-items-center rounded-full border border-white/15 text-[#FAFAFA] transition-colors hover:border-[#BEF264] disabled:pointer-events-none disabled:opacity-30";

  return (
    <AnimatePresence>
      {open && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onKeyDown={onKeyDown} className="fixed inset-0 z-[80]">
          <div aria-hidden onClick={() => setOpen(false)} className="absolute inset-0 bg-black/75 backdrop-blur-sm" />
          <motion.div ref={panel} role="dialog" aria-modal="true" aria-label={c.title}
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-white/10 bg-[#141414] text-[#FAFAFA]">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
              <h2 className="font-display text-lg font-semibold">{c.title}</h2>
              <button ref={closeBtn} type="button" onClick={() => setOpen(false)} aria-label={c.close} className="grid h-9 w-9 place-items-center rounded-full border border-white/15 transition-colors hover:border-[#BEF264] hover:text-[#BEF264]"><X size={16} aria-hidden /></button>
            </div>

            {confirmed ? (
              <div role="status" className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-[#BEF264] text-[#0A0A0A]"><Check size={26} aria-hidden /></span>
                <p className="font-display text-xl font-semibold">{c.confirmTitle}</p>
                <p className="max-w-[32ch] text-sm text-[#A1A1AA]">{c.confirmSub}</p>
                <button type="button" onClick={() => setOpen(false)} className="mt-2 rounded-full bg-[#BEF264] px-6 py-2.5 text-sm font-medium text-[#0A0A0A] transition-all hover:bg-[#d2f98f] active:scale-[0.97]">{c.continueShopping}</button>
              </div>
            ) : lines.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-[#A1A1AA]">
                <ShoppingBag size={28} aria-hidden />
                <p className="text-sm">{c.empty}</p>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-white/10 overflow-y-auto px-6">
                  {lines.map((l) => {
                    const i = PRODUCTS.findIndex((p) => p.id === l.id);
                    const product = findProduct(l.id);
                    return (
                      <li key={l.id} className="flex gap-4 py-5">
                        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-white/10"><ArtTile spec={PRODUCT_ART[i]} label={names[i].name} /></div>
                        <div className="flex flex-1 flex-col">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-sm font-medium leading-snug">{names[i].name}</p>
                            <button type="button" onClick={() => remove(l.id)} aria-label={c.itemRemove} className="text-xs text-[#A1A1AA] underline-offset-2 transition-colors hover:text-[#FAFAFA] hover:underline">{c.itemRemove}</button>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button type="button" className={step} onClick={() => setQty(l.id, l.qty - 1)} disabled={l.qty <= 1} aria-label="−"><Minus size={12} aria-hidden /></button>
                              <span className="min-w-[1.5ch] text-center text-sm" aria-live="polite">{l.qty}</span>
                              <button type="button" className={step} onClick={() => setQty(l.id, l.qty + 1)} disabled={l.qty >= 9} aria-label="+"><Plus size={12} aria-hidden /></button>
                            </div>
                            <span className="text-sm text-[#BEF264]">${product.price * l.qty}</span>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <div className="border-t border-white/10 px-6 py-6">
                  <div className="flex items-center justify-between text-base">
                    <span>{c.subtotal}</span>
                    <span className="font-display font-semibold text-[#BEF264]">${subtotal}</span>
                  </div>
                  <button type="button" onClick={checkout} className="mt-5 h-12 w-full rounded-full bg-[#BEF264] text-sm font-medium text-[#0A0A0A] transition-all hover:bg-[#d2f98f] active:scale-[0.97]">{c.checkout}</button>
                  <p className="mt-3 text-center text-xs text-[#A1A1AA]">{c.note}</p>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
