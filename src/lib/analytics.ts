// Lightweight, privacy-respecting analytics wrapper. Does nothing unless
// NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (see .env.example) — no script loads, no requests fire,
// no cookies, no fake numbers are ever shown anywhere in the UI. Plausible is cookie-free and
// collects no personal data, so no consent banner is required for this specific setup; if a
// different analytics provider is swapped in later, re-check whether that still holds.
export const ANALYTICS_ENABLED = Boolean(process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN);

type PlausibleFn = (event: string, options?: { props?: Record<string, string> }) => void;
declare global {
  interface Window {
    plausible?: PlausibleFn;
  }
}

// Call from CTA/form/estimator handlers to track conversions once analytics is configured.
// Safe no-op otherwise. Event names used across the site: "cta_click", "quote_request",
// "contact_submit", "project_open".
export function trackEvent(event: string, props?: Record<string, string>) {
  if (typeof window === "undefined" || !window.plausible) return;
  window.plausible(event, props ? { props } : undefined);
}
