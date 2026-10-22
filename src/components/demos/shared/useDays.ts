"use client";
import { useEffect, useState } from "react";
import type { Locale } from "@/lib/i18n";

export type Day = { key: string; weekday: string; dayNum: string; full: string };

/** Next `count` calendar days, built after mount (avoids SSR/client date mismatch). Display-only, demo data. */
export function useDays(count: number, locale: Locale): Day[] {
  const [days, setDays] = useState<Day[]>([]);
  useEffect(() => {
    const tag = locale === "pt" ? "pt-BR" : "en-US";
    const base = new Date();
    setDays(Array.from({ length: count }, (_, i) => {
      const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + i + 1);
      return {
        key: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        weekday: d.toLocaleDateString(tag, { weekday: "short" }),
        dayNum: d.toLocaleDateString(tag, { day: "numeric", month: "short" }),
        full: d.toLocaleDateString(tag, { weekday: "long", month: "long", day: "numeric" }),
      };
    }));
  }, [count, locale]);
  return days;
}
