"use client";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, X } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { useCart } from "./cart-context";
import { PRODUCT_ART, PRODUCTS, type ProductId } from "./data";

const FOCUSABLE = "button:not([disabled]), select, input";

export function VantaProductModal({ id, onClose }: { id: ProductId; onClose: () => void }) {
  const { t } = useLanguage();
  const c = t.demos.vanta.catalog;
  const p = t.demos.vanta.product;
  const index = PRODUCTS.findIndex((x) => x.id === id);
  const meta = PRODUCTS[index];
  const copy = c.products[index];
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const closeBtn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeBtn.current?.focus();
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prevOverflow; };
  }, []);

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Escape") { e.preventDefault(); onClose(); return; }
    if (e.key === "Tab" && panel.current) {
      const items = Array.from(panel.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  };

  const step = "grid h-9 w-9 place-items-center rounded-full border border-white/15 text-[#FAFAFA] transition-colors hover:border-[#BEF264] disabled:pointer-events-none disabled:opacity-30";

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
      onKeyDown={onKeyDown} className="fixed inset-0 z-[80] grid place-items-center p-3 sm:p-6">
      <div aria-hidden onClick={onClose} className="absolute inset-0 bg-black/85 backdrop-blur-sm" />
      <motion.div ref={panel} role="dialog" aria-modal="true" aria-labelledby="vanta-pm-title"
        initial={{ opacity: 0, scale: 0.97, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 grid max-h-[94svh] w-full max-w-3xl grid-cols-1 overflow-y-auto rounded-2xl border border-white/10 bg-[#141414] text-[#FAFAFA] shadow-2xl shadow-black/70 sm:grid-cols-2">
        <button ref={closeBtn} type="button" onClick={onClose} aria-label={p.close} className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-[#141414]/80 text-[#FAFAFA] transition-colors hover:border-[#BEF264] hover:text-[#BEF264]">
          <X size={16} aria-hidden />
        </button>
        <div className="relative aspect-square sm:aspect-auto">
          <ArtTile spec={PRODUCT_ART[index]} label={copy.name} />
        </div>
        <div className="flex flex-col p-6 sm:p-8">
          <p className="text-xs uppercase tracking-[0.25em] text-[#A1A1AA]">{c.categories[meta.category]}</p>
          <h3 id="vanta-pm-title" className="mt-2 font-display text-2xl font-semibold leading-tight">{copy.name}</h3>
          <p className="mt-1 text-lg text-[#BEF264]">${meta.price}</p>
          <p className="mt-4 flex-1 text-sm leading-relaxed text-[#A1A1AA]">{copy.desc}</p>

          <div className="mt-6">
            <p id="vanta-qty-label" className="mb-2 text-xs uppercase tracking-wider text-[#A1A1AA]">{p.quantity}</p>
            <div role="group" aria-labelledby="vanta-qty-label" className="flex items-center gap-3">
              <button type="button" className={step} onClick={() => setQty((q) => Math.max(1, q - 1))} disabled={qty <= 1} aria-label="−"><Minus size={14} aria-hidden /></button>
              <span className="min-w-[2ch] text-center text-base" aria-live="polite">{qty}</span>
              <button type="button" className={step} onClick={() => setQty((q) => Math.min(9, q + 1))} disabled={qty >= 9} aria-label="+"><Plus size={14} aria-hidden /></button>
            </div>
          </div>

          <button type="button" onClick={() => { add(id, qty); setAdded(true); }} className="mt-6 h-12 rounded-full bg-[#BEF264] text-sm font-medium text-[#0A0A0A] transition-all hover:bg-[#d2f98f] active:scale-[0.97]">
            {c.addToCart}
          </button>
          {added && <p role="status" className="mt-3 text-xs text-[#BEF264]">{p.added}</p>}
        </div>
      </motion.div>
    </motion.div>
  );
}
