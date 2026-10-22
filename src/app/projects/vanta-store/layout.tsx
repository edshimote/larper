import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Manrope } from "next/font/google";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });

export const metadata: Metadata = {
  title: "Vanta Store — Concept Project | Eduardo.dev",
  description: "Concept e-commerce storefront for a fictional minimalist brand, created for portfolio demonstration. Not a real store.",
  alternates: { canonical: `${SITE_URL}/projects/vanta-store` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={manrope.variable}>{children}</div>;
}
