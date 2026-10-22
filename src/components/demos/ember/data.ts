import { Cake, Coffee, Cookie, Drumstick, Fish, Flame, Leaf, Martini, Salad, UtensilsCrossed, Wine, ChefHat, Candy } from "lucide-react";
import type { ArtSpec } from "../shared/ArtTile";

export const MENU_CATS = ["starters", "mains", "desserts", "drinks"] as const;
export type MenuCat = (typeof MENU_CATS)[number];

/** Fictional prices (USD). Names/descriptions live in i18n (`demos.ember.menu.items[cat]`, same order). */
export const MENU_PRICES: Record<MenuCat, readonly number[]> = {
  starters: [14, 13, 12],
  mains: [38, 29, 26],
  desserts: [11, 10, 11],
  drinks: [14, 12, 7],
};

const spec = (icon: ArtSpec["icon"], from: string, via: string, glow: string, tone: string): ArtSpec => ({ icon, from, via, to: "#17120F", glow, tone });

export const MENU_ART: Record<MenuCat, ArtSpec[]> = {
  starters: [spec(Leaf, "#26301f", "#2e2a1c", "rgba(197,139,83,.28)", "#d7c48e"), spec(Salad, "#3a1f24", "#2b1c1a", "rgba(197,100,83,.3)", "#e0a39a"), spec(Flame, "#33261a", "#2a1f16", "rgba(197,139,83,.35)", "#e1b27a")],
  mains: [spec(Flame, "#3a1c14", "#2a1812", "rgba(226,104,60,.35)", "#f0a37a"), spec(Fish, "#3a2a1c", "#271d16", "rgba(197,139,83,.32)", "#f0c79a"), spec(Drumstick, "#3a2616", "#2a1d14", "rgba(197,139,83,.3)", "#e6b98a")],
  desserts: [spec(Cake, "#3a2c18", "#2a2014", "rgba(240,200,120,.3)", "#f1d9a0"), spec(Cookie, "#2a1812", "#1f1511", "rgba(120,70,50,.4)", "#c99a82"), spec(Candy, "#38261a", "#2a1e15", "rgba(197,139,83,.3)", "#e8b98a")],
  drinks: [spec(Martini, "#3a2214", "#2a1a12", "rgba(226,140,60,.33)", "#f0b27a"), spec(Wine, "#2d2018", "#251a14", "rgba(210,170,100,.3)", "#e9d29a"), spec(Coffee, "#241a14", "#1d1511", "rgba(150,100,70,.35)", "#c9a58a")],
};

// Gallery art in the same order as i18n `demos.ember.gallery.items`. Swap `src` in for real photos later.
export const GALLERY_ART: (ArtSpec & { src?: string })[] = [
  spec(Flame, "#3a1c14", "#2a1812", "rgba(226,104,60,.4)", "#f0a37a"),
  spec(UtensilsCrossed, "#2a2018", "#201813", "rgba(197,139,83,.3)", "#e1b27a"),
  spec(Leaf, "#26301f", "#2a2a1c", "rgba(197,160,83,.3)", "#d7c48e"),
  spec(Martini, "#3a2214", "#2a1a12", "rgba(226,140,60,.33)", "#f0b27a"),
  spec(Cake, "#3a2c18", "#2a2014", "rgba(240,200,120,.3)", "#f1d9a0"),
  spec(ChefHat, "#2b1c1a", "#201511", "rgba(197,139,83,.35)", "#e6b98a"),
];

/** Illustrative time slots. NOT real availability. */
export const TIMES = ["5:30 PM", "6:30 PM", "7:30 PM", "8:30 PM", "9:30 PM"] as const;
export const MAX_GUESTS = 8;
export const ACCENT = "#C58B53";
