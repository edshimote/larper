/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  images: { formats: ["image/avif", "image/webp"] },

  async headers() {
    const securityHeaders = [
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
      { key: "X-DNS-Prefetch-Control", value: "on" },
      {
        key: "Content-Security-Policy",
        // style-src 'unsafe-inline': Tailwind + inline CSS vars used across demo sites.
        // frame-ancestors 'self': only this site may iframe its own /projects/* demo routes
        // (ProjectViewer uses a same-origin iframe); nothing else is allowed to frame it.
        value: [
          "default-src 'self'",
          // plausible.io: only loads if NEXT_PUBLIC_PLAUSIBLE_DOMAIN is set (see src/lib/analytics.ts);
          // harmless to allow when unused, avoids a brittle env-dependent CSP at the header level.
          "script-src 'self' 'unsafe-inline' https://plausible.io",
          "style-src 'self' 'unsafe-inline'",
          "img-src 'self' data: blob:",
          "font-src 'self' data:",
          "connect-src 'self' https://plausible.io",
          "frame-src 'self'",
          "frame-ancestors 'self'",
          "base-uri 'self'",
          "form-action 'self'",
        ].join("; "),
      },
    ];

    return [
      { source: "/:path*", headers: securityHeaders },
      {
        source: "/api/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Cache-Control", value: "no-store" },
        ],
      },
    ];
  },
};

export default nextConfig;
