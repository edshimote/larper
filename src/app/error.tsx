"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en-US">
      <body style={{ background: "#07090F", color: "#F8FAFC" }}>
        <main
          style={{
            minHeight: "100svh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1.5rem",
            padding: "1.25rem",
            textAlign: "center",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.75rem", fontWeight: 700 }}>Something went wrong.</h1>
          <p style={{ color: "#94A3B8", maxWidth: "28rem" }}>
            An unexpected error occurred. You can try again, or head back to the homepage.
          </p>
          <div style={{ display: "flex", gap: "0.75rem" }}>
            <button
              onClick={() => reset()}
              style={{
                borderRadius: "999px",
                background: "#7958FF",
                color: "#F8FAFC",
                padding: "0.75rem 1.5rem",
                border: "none",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "999px",
                border: "1px solid rgba(255,255,255,0.15)",
                color: "#F8FAFC",
                padding: "0.75rem 1.5rem",
                textDecoration: "none",
              }}
            >
              Back to Home
            </a>
          </div>
        </main>
      </body>
    </html>
  );
}
