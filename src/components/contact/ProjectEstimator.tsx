"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { useLanguage } from "@/components/providers/LanguageProvider";
import {
  ESTIMATOR,
  ESTIMATOR_APPLY_EVENT,
  SERVICE_IDS,
  type Complexity,
  type EstimatorApplyDetail,
  type ServiceId,
  type Timeline,
} from "@/lib/contact";

const FEATURE_IDS = ["admin", "payments", "i18n", "auth", "api", "design"] as const;
type FeatureId = (typeof FEATURE_IDS)[number];

const chip = (active: boolean) =>
  `rounded-full border px-4 py-2 text-sm transition-colors ${
    active ? "border-primary/70 bg-primary/15 text-ink" : "border-line bg-white/[0.02] text-ink-muted hover:border-white/20 hover:text-ink"
  }`;

export function ProjectEstimator() {
  const { t } = useLanguage();
  const e = t.contact.estimator;

  const [type, setType] = useState<ServiceId | null>(null);
  const [complexity, setComplexity] = useState<Complexity | null>(null);
  const [features, setFeatures] = useState<FeatureId[]>([]);
  const [timeline, setTimeline] = useState<Timeline | null>(null);
  const [budget, setBudget] = useState<string>("");

  const toggleFeature = (id: FeatureId) =>
    setFeatures((prev) => (prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]));

  const estimate = useMemo(() => {
    if (!type || !complexity || !timeline) return null;
    const base = ESTIMATOR.baseUSD[type] * ESTIMATOR.complexity[complexity] * ESTIMATOR.timelineMultiplier[timeline];
    const withFeatures = base + features.length * ESTIMATOR.featureUSD;
    const low = Math.round(withFeatures * 0.85 / 50) * 50;
    const high = Math.round(withFeatures * 1.2 / 50) * 50;
    return { low, high };
  }, [type, complexity, timeline, features]);

  function reset() {
    setType(null); setComplexity(null); setFeatures([]); setTimeline(null); setBudget("");
  }

  function requestQuote() {
    if (!type) return;
    const lines = [
      `${e.summaryType}: ${t.services.cards[type].title}`,
      complexity ? `${e.summaryComplexity}: ${e.complexity[complexity].label}` : null,
      features.length ? `${e.summaryFeatures}: ${features.map((f) => e.features[f]).join(", ")}` : null,
      timeline ? `${e.summaryTimeline}: ${e.timeline[timeline].label}` : null,
      budget ? `${e.summaryBudget}: ${budget}` : null,
      estimate ? `${e.estimateLabel}: $${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}` : null,
    ].filter(Boolean);
    const summary = lines.join("\n");
    window.dispatchEvent(new CustomEvent<EstimatorApplyDetail>(ESTIMATOR_APPLY_EVENT, { detail: { service: type, summary } }));
  }

  return (
    <div className="glass rounded-2xl p-6 sm:p-8">
      <p className="font-mono text-xs tracking-[0.12em] text-secondary">{e.tag}</p>
      <h3 className="mt-2 font-display text-xl font-semibold sm:text-2xl">{e.title}</h3>
      <p className="mt-2 max-w-[60ch] text-sm text-ink-muted">{e.subtitle}</p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_17rem]">
        <div className="space-y-7">
          <div>
            <p className="mb-3 font-mono text-xs text-ink-muted">{e.stepType}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={e.stepType}>
              {SERVICE_IDS.map((id) => (
                <button key={id} type="button" className={chip(type === id)} aria-pressed={type === id} onClick={() => setType(id)}>
                  {t.services.cards[id].title}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-ink-muted">{e.stepComplexity}</p>
            <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label={e.stepComplexity}>
              {(Object.keys(ESTIMATOR.complexity) as Complexity[]).map((id) => (
                <button key={id} type="button" aria-pressed={complexity === id} onClick={() => setComplexity(id)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${complexity === id ? "border-primary/70 bg-primary/15" : "border-line bg-white/[0.02] hover:border-white/20"}`}>
                  <span className="block text-sm font-medium text-ink">{e.complexity[id].label}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{e.complexity[id].desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-ink-muted">{e.stepFeatures}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={e.stepFeatures}>
              {FEATURE_IDS.map((id) => (
                <button key={id} type="button" className={chip(features.includes(id))} aria-pressed={features.includes(id)} onClick={() => toggleFeature(id)}>
                  {e.features[id]}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-ink-muted">{e.stepTimeline}</p>
            <div className="grid gap-2 sm:grid-cols-3" role="group" aria-label={e.stepTimeline}>
              {(Object.keys(ESTIMATOR.timelineMultiplier) as Timeline[]).map((id) => (
                <button key={id} type="button" aria-pressed={timeline === id} onClick={() => setTimeline(id)}
                  className={`rounded-xl border px-4 py-3 text-left transition-colors ${timeline === id ? "border-primary/70 bg-primary/15" : "border-line bg-white/[0.02] hover:border-white/20"}`}>
                  <span className="block text-sm font-medium text-ink">{e.timeline[id].label}</span>
                  <span className="mt-0.5 block text-xs text-ink-muted">{e.timeline[id].desc}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 font-mono text-xs text-ink-muted">{e.stepBudget}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={e.stepBudget}>
              {t.contact.form.budgets.map((b) => (
                <button key={b} type="button" className={chip(budget === b)} aria-pressed={budget === b} onClick={() => setBudget(b)}>
                  {b}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-ink-muted">{e.budgetHint}</p>
          </div>
        </div>

        <motion.aside
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}
          className="h-fit rounded-xl border border-line bg-gradient-to-br from-elevated via-surface to-bg p-5 lg:sticky lg:top-24"
        >
          <p className="font-display text-sm font-semibold">{e.summaryTitle}</p>
          <dl className="mt-4 space-y-2.5 text-xs">
            <Row label={e.summaryType} value={type ? t.services.cards[type].title : e.none} />
            <Row label={e.summaryComplexity} value={complexity ? e.complexity[complexity].label : e.none} />
            <Row label={e.summaryFeatures} value={features.length ? features.map((f) => e.features[f]).join(", ") : e.none} />
            <Row label={e.summaryTimeline} value={timeline ? e.timeline[timeline].label : e.none} />
            <Row label={e.summaryBudget} value={budget || e.none} />
          </dl>

          <div className="mt-5 border-t border-line pt-4">
            <p className="font-mono text-[0.65rem] uppercase tracking-wide text-ink-muted">{e.estimateLabel}</p>
            <p className="mt-1 font-display text-xl font-semibold text-secondary">
              {estimate ? `$${estimate.low.toLocaleString()} – $${estimate.high.toLocaleString()}` : "—"}
            </p>
            <p className="mt-2 text-[0.68rem] leading-relaxed text-ink-muted">{e.estimateDisclaimer}</p>
          </div>

          <div className="mt-5 flex flex-col gap-2">
            <button type="button" onClick={requestQuote} disabled={!type}
              className="group inline-flex h-11 w-full items-center justify-center gap-2 rounded-full bg-primary px-5 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-soft hover:shadow-glow active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-50">
              {e.cta} <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" aria-hidden />
            </button>
            <button type="button" onClick={reset} className="inline-flex h-9 items-center justify-center gap-1.5 rounded-full text-xs text-ink-muted transition-colors hover:text-ink">
              <RotateCcw size={13} aria-hidden /> {e.reset}
            </button>
          </div>
        </motion.aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-start justify-between gap-3">
      <dt className="shrink-0 text-ink-muted">{label}</dt>
      <dd className="text-right text-ink">{value}</dd>
    </div>
  );
}
