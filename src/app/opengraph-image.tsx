import { site } from "@/content/site";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(145deg, #0f1a12 0%, #1a2f1e 50%, #243d2a 100%)",
          color: "#f4f0e6",
          fontFamily: "Georgia, serif",
        }}
      >
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {site.name}
        </div>
        <div
          style={{
            marginTop: 24,
            fontSize: 32,
            color: "#9bc492",
            maxWidth: 900,
            lineHeight: 1.35,
          }}
        >
          {site.tagline}
        </div>
        <div
          style={{
            marginTop: 48,
            fontSize: 22,
            color: "#e8e0d0",
            opacity: 0.9,
            maxWidth: 800,
          }}
        >
          {site.description.slice(0, 140)}…
        </div>
      </div>
    ),
    { ...size },
  );
}
