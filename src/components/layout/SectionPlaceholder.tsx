"use client";
import { useLanguage } from "@/components/providers/LanguageProvider";

// Anchor target so navbar links never break. Replace with real sections in later stages.
export function SectionPlaceholder({ id, label }: { id: string; label: string }) {
  const { t } = useLanguage();
  return (
    <section id={id} aria-label={label} className="border-t border-line py-24">
      <div className="container-x font-mono text-xs text-ink-muted">// {label.toLowerCase()} — {t.placeholder}</div>
    </section>
  );
}
