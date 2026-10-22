import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/components/providers/LanguageProvider";
import { CONTACT } from "@/lib/contact";
import { SITE_URL, SITE_NAME, SITE_TITLE, SITE_DESCRIPTION } from "@/lib/site";

const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s — Eduardo.dev" },
  description: SITE_DESCRIPTION,
  keywords: [
    "full-stack developer",
    "web development",
    "automation specialist",
    "custom software developer",
    "React developer",
    "Next.js developer",
    "chatbot development",
    "business automation",
    "freelance developer for US businesses",
  ],
  authors: [{ name: "Eduardo" }],
  creator: "Eduardo",
  alternates: {
    canonical: "/",
    // Single-URL i18n (client-side language toggle, no per-language routes): both language
    // variants live at the same address. x-default + explicit en-US/pt-BR tags tell search
    // engines the page serves both audiences rather than implying separate URLs that don't exist.
    languages: { "en-US": "/", "pt-BR": "/", "x-default": "/" },
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_US",
    alternateLocale: ["pt_BR"],
    url: SITE_URL,
    siteName: SITE_NAME,
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};
export const viewport: Viewport = { themeColor: "#07090F", width: "device-width", initialScale: 1 };

// Person/ProfessionalService structured data — only real, confirmed facts (no invented company,
// US address, awards or testimonials). Email/phone pulled from the single source of truth.
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: SITE_NAME,
  description: SITE_DESCRIPTION,
  url: SITE_URL,
  image: `${SITE_URL}/opengraph-image`,
  priceRange: "$$",
  areaServed: { "@type": "Country", name: "United States" },
  ...(CONTACT.email ? { email: CONTACT.email } : {}),
  ...(CONTACT.phone ? { telephone: CONTACT.phone } : {}),
  founder: { "@type": "Person", name: "Eduardo", jobTitle: "Full-Stack Developer & Automation Specialist" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN && (
          <Script
            defer
            data-domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN}
            src="https://plausible.io/js/script.js"
            strategy="afterInteractive"
          />
        )}
        <LanguageProvider>
          <a href="#home" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2">Skip to content</a>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
