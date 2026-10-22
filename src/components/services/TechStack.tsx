"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";

type Kind = "lang" | "fw" | "markup" | "style" | "rt";
// Monogram tiles keep the set visually consistent without bundling brand logos.
const TECH: { name: string; mark: string; kind: Kind }[] = [
  { name: "Python", mark: "Py", kind: "lang" }, { name: "JavaScript", mark: "JS", kind: "lang" }, { name: "TypeScript", mark: "TS", kind: "lang" },
  { name: "Node.js", mark: "No", kind: "rt" }, { name: "C#", mark: "C#", kind: "lang" }, { name: "React", mark: "Re", kind: "fw" },
  { name: "Next.js", mark: "Nx", kind: "fw" }, { name: "HTML", mark: "</>", kind: "markup" }, { name: "CSS", mark: "{ }", kind: "style" },
];

export function TechStack() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="tech-title" className="border-t border-line py-20 sm:py-24">
      <div className="container-x">
        <h2 id="tech-title" className="font-display text-display-lg font-semibold">{t.tech.title}</h2>
        <ul className="mt-10 grid grid-cols-3 gap-3 sm:grid-cols-5 lg:grid-cols-9">
          {TECH.map((x, i) => (
            <motion.li key={x.name} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.04 }}>
              <button type="button" aria-label={`${x.name} — ${t.tech.kinds[x.kind]}`}
                className="group relative flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl2 border border-line bg-surface transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-glow focus-visible:-translate-y-1">
                <span className="font-mono text-lg font-semibold text-ink-muted transition-colors group-hover:text-secondary">{x.mark}</span>
                <span className="text-[0.7rem] text-ink-muted">{x.name}</span>
                <span role="tooltip" className="pointer-events-none absolute -top-8 rounded-md bg-elevated px-2 py-1 font-mono text-[0.62rem] text-ink opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100">{t.tech.kinds[x.kind]}</span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
