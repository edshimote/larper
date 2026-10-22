"use client";
import { useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Expand } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ArtTile } from "../shared/ArtTile";
import { Lightbox } from "../shared/Lightbox";
import { Reveal } from "../shared/Reveal";
import { GALLERY_ART } from "./data";

const SPANS = ["sm:col-span-2 sm:row-span-2", "", "", "", "sm:col-span-2", ""] as const;

export function NorthstarGallery() {
  const { t } = useLanguage();
  const g = t.demos.northstar.gallery;
  const [open, setOpen] = useState<number | null>(null);
  const opener = useRef<HTMLElement | null>(null);
  const show = (i: number) => { opener.current = document.activeElement as HTMLElement | null; setOpen(i); };
  const close = () => { setOpen(null); opener.current?.focus?.(); };
  const nav = (d: number) => setOpen((i) => (i === null ? i : (i + d + g.items.length) % g.items.length));

  return (
    <section id="gallery" aria-labelledby="ns-gallery-title" style={{ scrollMarginTop: "7rem" }} className="border-t border-white/[0.06] bg-[#0B0B0B] py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-[#C6A667]">{g.eyebrow}</p>
          <h2 id="ns-gallery-title" className="mt-4 font-[family-name:var(--font-playfair)] text-4xl leading-tight sm:text-5xl">{g.title}</h2>
          <p className="mt-4 text-[#A3A3A3]">{g.sub}</p>
        </Reveal>
        <ul className="mt-12 grid auto-rows-[11rem] grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:grid-cols-4">
          {g.items.map((item, i) => (
            <li key={item.title} className={SPANS[i] ?? ""}>
              <Reveal delay={Math.min(i, 5) * 0.06} className="h-full">
                <button type="button" onClick={() => show(i)} aria-label={`${g.open}: ${item.title}`} aria-haspopup="dialog"
                  className="group relative block h-full w-full overflow-hidden rounded-xl border border-white/10 text-left transition-colors duration-500 hover:border-[#C6A667]/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#C6A667]">
                  <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06] motion-reduce:transition-none motion-reduce:group-hover:scale-100">
                    <ArtTile spec={GALLERY_ART[i]} src={GALLERY_ART[i].src} label={item.title} />
                  </div>
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 bg-gradient-to-t from-black/85 to-transparent p-3 pt-10 sm:p-4">
                    <div>
                      <p className="font-[family-name:var(--font-playfair)] text-base sm:text-lg">{item.title}</p>
                      <p className="hidden text-xs text-[#A3A3A3] opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:block">{item.caption}</p>
                    </div>
                    <Expand size={16} className="shrink-0 text-[#C6A667]" aria-hidden />
                  </div>
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
      <AnimatePresence>
        {open !== null && (
          <Lightbox key="ns-lb" index={open} count={g.items.length} title={g.items[open].title} caption={g.items[open].caption} onClose={close} onNavigate={nav}
            panelClass="border-[#C6A667]/30 bg-[#171717] text-[#F5F5F5]" buttonClass="border-white/15 text-[#F5F5F5] hover:border-[#C6A667]/60 hover:text-[#C6A667]" titleClass="font-[family-name:var(--font-playfair)]">
            <ArtTile spec={GALLERY_ART[open]} src={GALLERY_ART[open].src} label={g.items[open].title} />
          </Lightbox>
        )}
      </AnimatePresence>
    </section>
  );
}
