/*
 * Source of truth for the design of public/og.png. NOT a live route.
 *
 * Next's `opengraph-image.tsx` convention does generate this correctly under
 * `output: "export"`, but it emits the file as `out/opengraph-image` with no
 * extension — and GitHub Pages derives Content-Type from the extension, so it
 * would be served as application/octet-stream and every social crawler would
 * reject it. A committed .png in public/ sidesteps that entirely.
 *
 * To regenerate after editing this file:
 *   1. cp scripts/og-image-source.tsx src/app/opengraph-image.tsx
 *   2. npm run build
 *   3. cp out/opengraph-image public/og.png
 *   4. rm src/app/opengraph-image.tsx
 */
import { ImageResponse } from "next/og";

export const alt =
  "Cura by Technesian — hospital management system for Indian hospitals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

// Satori supports flexbox and a CSS subset only — no grid, no shorthand gaps
// on unsupported properties. Keep this layout simple.
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: 80,
          background: "#071120",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 26,
            letterSpacing: 6,
            color: "#38bdf8",
            textTransform: "uppercase",
            fontWeight: 700,
          }}
        >
          Cura by Technesian
        </div>
        <div
          style={{
            fontSize: 78,
            fontWeight: 800,
            lineHeight: 1.05,
            marginTop: 28,
            letterSpacing: -2,
          }}
        >
          Run the whole hospital on one system
        </div>
        <div style={{ fontSize: 30, color: "#94a3b8", marginTop: 32 }}>
          OPD · IPD · Day care · Eye hospital · Lab · Billing · ABDM ready
        </div>
      </div>
    ),
    { ...size }
  );
}
