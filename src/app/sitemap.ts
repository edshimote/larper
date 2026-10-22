import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Project demo routes (/projects/<slug>) are fictional concept sites marked `robots: noindex` in
// their own layout.tsx (see PROJECT_CONTEXT.md, Stage 6) so they never get presented in search
// results as real businesses — they're intentionally left out of the sitemap too.
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: `${SITE_URL}/`, lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
