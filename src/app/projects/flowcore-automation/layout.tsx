import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Sora } from "next/font/google";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });

export const metadata: Metadata = {
  title: "FlowCore Automation — Interactive Demo | Eduardo.dev",
  description: "Interactive demo of a workflow-automation dashboard concept, created for portfolio demonstration. Not a real product.",
  alternates: { canonical: `${SITE_URL}/projects/flowcore-automation` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={sora.variable}>{children}</div>;
}
