import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Page Not Found", robots: { index: false, follow: false } };

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center gap-6 px-5 text-center">
      <p className="font-mono text-sm uppercase tracking-[0.3em] text-secondary">404</p>
      <h1 className="font-display text-display-lg text-ink">Page not found.</h1>
      <p className="max-w-md text-ink-muted">
        The page you're looking for doesn't exist or has moved. Let's get you back on track.
      </p>
      <Link
        href="/"
        className="rounded-full bg-primary px-6 py-3 font-medium text-ink transition hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-secondary"
      >
        Back to Home
      </Link>
    </main>
  );
}
