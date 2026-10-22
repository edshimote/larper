import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Cormorant_Garamond } from "next/font/google";

const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-cormorant", display: "swap" });

export const metadata: Metadata = {
  title: "Ember & Oak — Concept Project | Eduardo.dev",
  description: "Concept website for a contemporary restaurant, created for portfolio demonstration. Not a real business.",
  alternates: { canonical: `${SITE_URL}/projects/ember-oak` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={cormorant.variable}>{children}</div>;
}
