"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { Button } from "@/components/ui/Button";
import { CONTACT, contactHref, whatsappHref } from "@/lib/contact";

export function ServicesCTA() {
  const { t } = useLanguage();
  return (
    <section aria-labelledby="cta-title" className="pb-24 sm:pb-32">
      <div className="container-x">
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.6 }}
          className="relative isolate overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-elevated via-surface to-bg px-6 py-14 text-center sm:px-12 sm:py-20">
          <div className="absolute left-1/2 top-0 -z-10 h-64 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-primary/25 blur-[100px]" aria-hidden />
          <h2 id="cta-title" className="mx-auto max-w-[18ch] font-display text-display-lg font-semibold">{t.cta.title}</h2>
          <p className="mx-auto mt-5 max-w-[52ch] text-lead text-ink-muted">{t.cta.desc}</p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="#contact">{t.cta.primary}<ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden /></Button>
            <Button href="#projects" variant="secondary">{t.cta.secondary}</Button>
          </div>
          {(CONTACT.email || whatsappHref) && (
            <p className="mt-6 flex flex-col items-center justify-center gap-1 font-mono text-xs text-ink-muted sm:flex-row sm:gap-5">
              {CONTACT.email && <a href={contactHref} className="transition-colors hover:text-ink">{CONTACT.email}</a>}
              {whatsappHref && <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-ink">WhatsApp {CONTACT.phoneDisplay}</a>}
            </p>
          )}
          {!CONTACT.email && process.env.NODE_ENV !== "production" && <p className="mt-6 font-mono text-[0.68rem] text-ink-muted">{t.cta.unconfigured}</p>}
        </motion.div>
      </div>
    </section>
  );
}
