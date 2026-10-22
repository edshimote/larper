"use client";
import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { Reveal } from "../shared/Reveal";
import { useCart } from "./cart-context";
import { CATEGORIES, PRODUCT_ART, PRODUCTS, type Category, type ProductId, type SortKey } from "./data";
import { VantaProductModal } from "./VantaProductModal";

export function VantaCatalog() {
  const { t } = useLanguage();
  const c = t.demos.vanta.catalog;
  const { add } = useCart();
  const [cat, setCat] = useState<Category>("all");
  const [sort, setSort] = useState<SortKey>("featured");
  const [selected, setSelected] = useState<ProductId | null>(null);

  const items = useMemo(() => {
    const filtered = PRODUCTS.map((p, i) => ({ p, i })).filter(({ p }) => cat === "all" || p.category === cat);
    if (sort === "price-asc") return [...filtered].sort((a, b) => a.p.price - b.p.price);
    if (sort === "price-desc") return [...filtered].sort((a, b) => b.p.price - a.p.price);
    return filtered;
  }, [cat, sort]);

  return (
    <section id="shop" aria-labelledby="vanta-shop-title" style={{ scrollMarginTop: "6.5rem" }} className="border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#BEF264]">{c.eyebrow}</p>
          <h2 id="vanta-shop-title" className="mt-4 font-display text-4xl font-semibold leading-tight sm:text-5xl">{c.title}</h2>
          <p className="mt-4 text-[#A1A1AA]">{c.sub}</p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div role="group" aria-label={c.filterLabel} className="flex flex-wrap gap-2">
            {CATEGORIES.map((k) => (
              <button key={k} type="button" aria-pressed={cat === k} onClick={() => setCat(k)}
                className={`rounded-full border px-4 py-2 text-xs uppercase tracking-wider transition-colors ${cat === k ? "border-[#BEF264] bg-[#BEF264] text-[#0A0A0A]" : "border-white/15 text-[#A1A1AA] hover:border-white/40 hover:text-[#FAFAFA]"}`}>
                {c.categories[k]}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="vanta-sort" className="text-xs uppercase tracking-wider text-[#A1A1AA]">{c.sortLabel}</label>
            <select id="vanta-sort" value={sort} onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-10 rounded-full border border-white/15 bg-[#141414] px-4 text-xs text-[#FAFAFA] outline-none transition-colors focus:border-[#BEF264]">
              <option value="featured">{c.sortFeatured}</option>
              <option value="price-asc">{c.sortPriceAsc}</option>
              <option value="price-desc">{c.sortPriceDesc}</option>
            </select>
          </div>
        </div>

        <motion.ul layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          <AnimatePresence initial={false}>
            {items.map(({ p, i }) => (
              <motion.li key={p.id} layout initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#141414] transition-colors duration-300 hover:border-[#BEF264]/40">
                  <button type="button" onClick={() => setSelected(p.id)} aria-haspopup="dialog" className="relative block aspect-square overflow-hidden text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#BEF264]">
                    <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                      <ArtTile spec={PRODUCT_ART[i]} label={c.products[i].name} />
                    </div>
                  </button>
                  <div className="flex flex-1 flex-col p-4">
                    <p className="text-[0.65rem] uppercase tracking-[0.2em] text-[#A1A1AA]">{c.categories[p.category]}</p>
                    <button type="button" onClick={() => setSelected(p.id)} className="mt-1 text-left text-sm font-medium leading-snug transition-colors hover:text-[#BEF264]">{c.products[i].name}</button>
                    <div className="mt-auto flex items-center justify-between gap-2 pt-4">
                      <span className="text-sm text-[#BEF264]">${p.price}</span>
                      <button type="button" onClick={() => add(p.id, 1)} aria-label={`${c.addToCart}: ${c.products[i].name}`} className="grid h-8 w-8 place-items-center rounded-full border border-white/15 text-[#FAFAFA] transition-colors hover:border-[#BEF264] hover:text-[#BEF264]">
                        <Plus size={14} aria-hidden />
                      </button>
                    </div>
                  </div>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <AnimatePresence>
        {selected && <VantaProductModal key={selected} id={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </section>
  );
}
