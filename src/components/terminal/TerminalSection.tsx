"use client";
import { motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Terminal } from "./Terminal";

export function TerminalSection() {
  const { t } = useLanguage();
  return (
    <section id="terminal" aria-labelledby="terminal-title" className="border-t border-line py-20 sm:py-28">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="font-mono text-xs tracking-[0.2em] text-secondary">{t.terminal.tag}</p>
          <h2 id="terminal-title" className="mt-3 font-display text-display-lg font-semibold">{t.terminal.title}</h2>
          <p className="mt-2 text-lead text-ink-muted">{t.terminal.subtitle}</p>
          <p className="mt-2 max-w-2xl text-sm text-ink-muted">{t.terminal.desc}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-10"
        >
          <Terminal />
        </motion.div>
      </div>
    </section>
  );
}
