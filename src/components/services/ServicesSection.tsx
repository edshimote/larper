"use client";
import { MotionConfig, motion } from "framer-motion";
import { useLanguage } from "@/components/providers/LanguageProvider";
import { AutomationPreview } from "./AutomationPreview";
import { BotPreview } from "./BotPreview";
import { InteractivePreview } from "./InteractivePreview";
import { InterfacePreview } from "./InterfacePreview";
import { ServiceCard } from "./ServiceCard";
import { ServiceShowcase, SHOWCASE_EVENT, type Category } from "./ServiceShowcase";
import { ServicesCTA } from "./ServicesCTA";
import { SoftwarePreview } from "./SoftwarePreview";
import { TechStack } from "./TechStack";
import { WebsitePreview } from "./WebsitePreview";
import { PROJECTS_FILTER_EVENT } from "@/lib/projects";

// Bento layout: widths vary per card on lg (6-col grid). `cat` links a card to a showcase tab.
const CARDS = [
  { key: "web", cls: "md:col-span-2 lg:col-span-4", wide: true, cat: "web", filter: null, Visual: WebsitePreview },
  { key: "bots", cls: "lg:col-span-2", wide: false, cat: "bots", filter: null, Visual: BotPreview },
  { key: "auto", cls: "lg:col-span-3", wide: false, cat: "auto", filter: null, Visual: AutomationPreview },
  { key: "soft", cls: "lg:col-span-3", wide: false, cat: "soft", filter: null, Visual: SoftwarePreview },
  { key: "ui", cls: "lg:col-span-2", wide: false, cat: null, filter: "apps", Visual: InterfacePreview },
  { key: "xp", cls: "md:col-span-2 lg:col-span-4", wide: true, cat: null, filter: "3d", Visual: InteractivePreview },
] as const;

export function ServicesSection() {
  const { t } = useLanguage();
  const s = t.services;
  const select = (cat: Category) => { window.dispatchEvent(new CustomEvent(SHOWCASE_EVENT, { detail: cat })); };
  const filterProjects = (f: string) => { window.dispatchEvent(new CustomEvent(PROJECTS_FILTER_EVENT, { detail: f })); };
  return (
    <MotionConfig reducedMotion="user">
      <section id="services" aria-labelledby="services-title" className="relative border-t border-line py-20 sm:py-28">
        <div className="container-x">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="max-w-3xl">
            <p className="mb-5 font-mono text-xs tracking-[0.12em] text-secondary">{s.tag}</p>
            <h2 id="services-title" className="font-display text-display-lg font-semibold">{s.title}</h2>
            <p className="mt-5 max-w-[56ch] text-lead text-ink-muted">{s.desc}</p>
          </motion.div>
          <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-6">
            {CARDS.map(({ key, cls, wide, cat, filter, Visual }) => {
              const c = s.cards[key];
              return (
                <ServiceCard key={key} className={cls} wide={wide} title={c.title} desc={c.desc} tags={c.tags} cta={c.cta}
                  href={cat ? "#showcase" : "#projects"} onCta={cat ? () => select(cat) : filter ? () => filterProjects(filter) : undefined}>
                  <Visual />
                </ServiceCard>
              );
            })}
          </div>
          <p className="mt-6 font-mono text-[0.7rem] text-ink-muted">{s.note}</p>
        </div>
      </section>
      <ServiceShowcase />
      <TechStack />
      <ServicesCTA />
    </MotionConfig>
  );
}
