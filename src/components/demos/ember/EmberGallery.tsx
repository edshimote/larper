"use client";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { Lightbox } from "../shared/Lightbox";
import { Reveal } from "../shared/Reveal";
import { GALLERY_ART } from "./data";

const H = "font-[family-name:var(--font-cormorant)]";
const SPANS = ["row-span-2", "", "", "row-span-2", "", ""] as const;

export function EmberGallery() {
  const { t } = useLanguage();
  const g = t.demos.ember.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const show = (i: number) => { opener.current = document.activeElement as HTMLElement | null; setOpen(i); };
  const close = () => { setOpen(null); opener.current?.focus?.(); };
  const nav = (d: number) => setOpen((i) => (i === null ? i : (i + d + g.items.length) % g.items.length));

  return (
    <section id="gallery" aria-labelledby="eo-gallery-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] bg-[#1d1612] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C58B53]">{g.eyebrow}</p>
          <h2 id="eo-gallery-title" className={`${H} mt-4 text-5xl font-medium leading-[1.05] sm:text-6xl`}>{g.title}</h2>
          <p className="mt-4 text-[#B5A89C]">{g.sub}</p>
        </Reveal>
        <ul className="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-3">
          {g.items.map((item, i) => (
            <li key={item.title} className={SPANS[i] ?? ""}>
              <Reveal delay={Math.min(i, 5) * 0.06} className="h-full">
                <button type="button" onClick={() => show(i)} aria-label={`${g.open}: ${item.title}`} aria-haspopup="dialog"
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-white/10 text-left transition-colors duration-500 hover:border-[#C58B53]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C58B53]">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <ArtTile spec={GALLERY_ART[i]} src={GALLERY_ART[i].src} label={item.title} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/80 to-transparent p-3 pt-10 sm:p-4">
                    <p className={`${H} text-xl font-semibold`}>{item.title}</p>
                    <Expand size={15} className="shrink-0 text-[#C58B53]" aria-hidden />
                  </div>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {open !== null && (
          <Lightbox key="eo-lb" index={open} count={g.items.length} title={g.items[open].title} caption={g.items[open].caption} onClose={close} onNavigate={nav}
            panelClass="border-[#C58B53]/30 bg-[#241C17] text-[#F5EBDD]" buttonClass="border-white/15 text-[#F5EBDD] hover:border-[#C58B53]/60 hover:text-[#C58B53]" titleClass={`${H} text-2xl font-semibold`}>
            <ArtTile spec={GALLERY_ART[open]} src={GALLERY_ART[open].src} label={g.items[open].title} />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
