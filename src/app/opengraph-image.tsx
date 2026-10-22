import { ImageResponse } from "next/og";
import { SITE_TITLE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = SITE_TITLE;

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#07090F",
          backgroundImage:
            "radial-gradient(circle at 75% 30%, rgba(121,88,255,0.35), transparent 60%), radial-gradient(circle at 20% 80%, rgba(0,217,255,0.22), transparent 55%)",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#00D9FF", letterSpacing: 2, marginBottom: 24 }}>
          EDUARDO.DEV
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 58,
            fontWeight: 700,
            color: "#F8FAFC",
            maxWidth: 920,
            lineHeight: 1.15,
          }}
        >
          Building Digital Experiences That Make an Impact.
        </div>
        <div style={{ display: "flex", fontSize: 26, color: "#94A3B8", marginTop: 28, maxWidth: 820 }}>
          Full-Stack Developer & Automation Specialist — websites, bots, automations and custom software.
        </div>
      </div>
    ),
    { ...size }
  );
}
