import type { Config } from "tailwindcss";

// Design tokens: single source of truth. CSS variables live in globals.css.
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#07090F",
        surface: "#101420",
        elevated: "#171D2B",
        primary: { DEFAULT: "#7958FF", soft: "#A58FFF" },
        secondary: "#00D9FF",
        ink: { DEFAULT: "#F8FAFC", muted: "#94A3B8" },
        line: "rgba(255,255,255,0.08)",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        "display-xl": ["clamp(2.75rem, 6.2vw + 0.5rem, 6rem)", { lineHeight: "1.02", letterSpacing: "-0.035em" }],
        "display-lg": ["clamp(2rem, 3.5vw + 0.5rem, 3.5rem)", { lineHeight: "1.08", letterSpacing: "-0.03em" }],
        lead: ["clamp(1.05rem, 0.6vw + 0.9rem, 1.3rem)", { lineHeight: "1.65" }],
      },
      borderRadius: { xl2: "1.25rem" },
      boxShadow: {
        glow: "0 0 0 1px rgba(121,88,255,0.5), 0 10px 40px -8px rgba(121,88,255,0.55)",
      },
      keyframes: {
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-10px)" } },
        scrollDot: { "0%": { transform: "translateY(0)", opacity: "0" }, "30%": { opacity: "1" }, "100%": { transform: "translateY(14px)", opacity: "0" } },
      },
      animation: { float: "float 7s ease-in-out infinite", scrollDot: "scrollDot 1.8s ease-in-out infinite" },
    },
  },
  plugins: [],
};
export default config;
