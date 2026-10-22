import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Northline Logistics — Concept Project | Eduardo.dev",
  description: "Concept website for a fictional American logistics company, created for portfolio demonstration. Not a real business.",
  alternates: { canonical: `${SITE_URL}/projects/northline-logistics` },
  robots: { index: false, follow: true },
};

// Reuses the portfolio's own Inter + Space Grotesk fonts (already loaded in the root layout as
// `font-sans` / `font-display`), which is exactly the typography this brand calls for.
export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
