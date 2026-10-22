"use client";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

type Props = { title: string; desc: string; tags: readonly string[]; cta: string; href: string; onCta?: () => void; className?: string; wide?: boolean; children: ReactNode };

export function ServiceCard({ title, desc, tags, cta, href, onCta, className = "", wide, children }: Props) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative flex flex-col gap-6 overflow-hidden rounded-xl2 border border-line bg-gradient-to-b from-elevated/70 to-surface p-5 transition-colors duration-300 hover:border-primary/40 sm:p-7 ${wide ? "lg:flex-row" : ""} ${className}`}>
      <div className={`flex flex-col ${wide ? "lg:w-[38%]" : ""}`}>
        <h3 className="font-display text-2xl font-semibold tracking-tight">{title}</h3>
        <p className="mt-3 max-w-[46ch] text-sm leading-relaxed text-ink-muted">{desc}</p>
        <ul className="mt-5 flex flex-wrap gap-1.5">{tags.map((tag) => <li key={tag}><Badge className="px-2.5 py-1 text-[0.68rem]">{tag}</Badge></li>)}</ul>
        <a href={href} onClick={onCta} className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-secondary transition-colors hover:text-ink lg:mt-auto lg:pt-6">
          {cta}<ArrowUpRight size={15} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
        </a>
      </div>
      <div className={`relative h-64 sm:h-72 ${wide ? "lg:h-auto lg:min-h-[19rem] lg:flex-1" : ""}`}>{children}</div>
    </motion.article>
  );
}
