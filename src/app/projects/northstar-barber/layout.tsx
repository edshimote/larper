import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });

export const metadata: Metadata = {
  title: "Northstar Barber Studio — Concept Project | Eduardo.dev",
  description: "Concept website for a premium barber studio, created for portfolio demonstration. Not a real business.",
  alternates: { canonical: `${SITE_URL}/projects/northstar-barber` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={playfair.variable}>{children}</div>;
}
