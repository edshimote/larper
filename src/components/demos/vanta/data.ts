import { Backpack, Briefcase, Coffee, Headphones, Lamp, LayoutGrid, Shirt, Watch } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

export const LIME = "#BEF264";

export const CATEGORIES = ["all", "bags", "apparel", "home", "tech", "accessories"] as const;
export type Category = (typeof CATEGORIES)[number];
export type SortKey = "featured" | "price-asc" | "price-desc";

/**
 * Fictional catalog (9 items). Prices are illustrative. Names/descriptions live in i18n
 * (`demos.vanta.catalog.products`, same order as this array). Nothing here is a real product.
 */
export const PRODUCTS = [
  { id: "everyday-pack", category: "bags", price: 148, icon: Backpack },
  { id: "carry-case", category: "bags", price: 62, icon: Briefcase },
  { id: "field-jacket", category: "apparel", price: 168, icon: Shirt },
  { id: "essential-tee", category: "apparel", price: 42, icon: Shirt },
  { id: "studio-lamp", category: "home", price: 89, icon: Lamp },
  { id: "desk-organizer", category: "home", price: 54, icon: LayoutGrid },
  { id: "ceramic-mug-set", category: "home", price: 38, icon: Coffee },
  { id: "wireless-earbuds", category: "tech", price: 129, icon: Headphones },
  { id: "minimal-watch", category: "accessories", price: 210, icon: Watch },
] as const satisfies readonly { id: string; category: Exclude<Category, "all">; price: number; icon: typeof Backpack }[];

export type ProductId = (typeof PRODUCTS)[number]["id"];

const tone = (hex: string): ArtSpec => ({ icon: PRODUCTS[0].icon, from: "#0A0A0A", via: "#161616", to: "#0A0A0A", glow: `${hex}26`, tone: hex });

/** One art spec per product, same order as `PRODUCTS`. Dark, minimalist, monochrome-with-an-accent. */
export const PRODUCT_ART: ArtSpec[] = PRODUCTS.map((p, i) => ({ ...tone(i % 3 === 0 ? LIME : "#E4E4E7"), icon: p.icon }));

export const findProduct = (id: ProductId) => PRODUCTS.find((p) => p.id === id)!;
