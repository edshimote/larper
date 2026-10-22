import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { Outfit } from "next/font/google";

const outfit = Outfit({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Beyond the Screen — Interactive 3D Demo | Eduardo.dev",
  description: "Interactive GLB/GLTF 3D viewer concept built with Three.js and React Three Fiber, created for portfolio demonstration. Not a real product.",
  alternates: { canonical: `${SITE_URL}/projects/beyond-the-screen` },
  robots: { index: false, follow: true },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <div className={outfit.variable}>{children}</div>;
}
