"use client";
import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { dictionary, type Dictionary, type Locale } from "@/lib/i18n";

type Ctx = { locale: Locale; t: Dictionary; toggle: () => void };
const LanguageContext = createContext<Ctx | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("locale");
      if (saved === "en" || saved === "pt") setLocale(saved);
    } catch {}
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "pt" ? "pt-BR" : "en-US";
  }, [locale]);

  const toggle = useCallback(() => {
    setLocale((l) => {
      const next: Locale = l === "en" ? "pt" : "en";
      try { localStorage.setItem("locale", next); } catch {}
      return next;
    });
  }, []);

  const value = useMemo(() => ({ locale, t: dictionary[locale] as Dictionary, toggle }), [locale, toggle]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside <LanguageProvider>");
  return ctx;
}
