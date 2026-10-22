import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-space-mono", display: "swap" });

export const metadata: Metadata = {
  title: "Nexus Bot Console — Interactive Demo | Eduardo.dev",
  description: "Interactive demo of a bot-management console concept, created for portfolio demonstration. Not a real product.",
  alternates: { canonical: `${SITE_URL}/projects/nexus-bot-console` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={spaceMono.variable}>{children}</div>;
}
