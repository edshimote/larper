"use client";
import { MotionConfig, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { ContactButtons } from "./ContactButtons";
import { ContactForm } from "./ContactForm";
import { ProjectEstimator } from "./ProjectEstimator";

export function ContactSection() {
  const { t } = useLanguage();
  const c = t.contact;

  return (
    <MotionConfig reducedMotion="user">
      <section id="contact" aria-labelledby="contact-title" className="relative overflow-hidden border-t border-line py-20 sm:py-28">
        {/* Violet/cyan gradient backdrop, glassmorphism-friendly */}
        <div className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[32rem] w-[48rem] max-w-[140vw] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/20 blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute bottom-0 right-0 -z-10 h-80 w-80 translate-x-1/3 translate-y-1/3 rounded-full bg-secondary/15 blur-[100px]" aria-hidden />
        <div className="tech-grid pointer-events-none absolute inset-0 -z-10 opacity-60" aria-hidden />

        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-2xl">
            <p className="mb-5 font-mono text-xs tracking-[0.12em] text-secondary">{c.tag}</p>
            <h2 id="contact-title" className="font-display text-display-lg font-semibold">{c.title}</h2>
            <p className="mt-5 max-w-[52ch] text-lead text-ink-muted">{c.subtitle}</p>
            <div className="mt-7">
              <ContactButtons />
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.05, ease: [0.22, 1, 0.36, 1] }} className="mt-10">
            <ProjectEstimator />
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }} className="mt-6 max-w-3xl">
            <ContactForm />
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
