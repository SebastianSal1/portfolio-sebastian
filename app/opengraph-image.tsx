import { ImageResponse } from "next/og";

// Editorial-paper social card, generated at build via Next's ImageResponse.
// Tokens mirror the design system: paper #F5F4F0, ink #0A0A0A, accent #1A2BE0.
export const runtime = "edge";
export const alt =
  "Sebastian Lumme — Strategy, Analysis & Industrial Engineering";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Instrument Serif (display) for the name. Falls back to the default font if the
// build-time fetch fails, so the image always renders.
async function loadSerif(): Promise<ArrayBuffer | null> {
  try {
    const css = await fetch(
      "https://fonts.googleapis.com/css2?family=Instrument+Serif",
      { headers: { "User-Agent": "Mozilla/4.0" } }
    ).then((r) => r.text());
    const url = css.match(
      /src: url\((.+?)\) format\('(?:opentype|truetype)'\)/
    )?.[1];
    if (!url) return null;
    return await fetch(url).then((r) => r.arrayBuffer());
  } catch {
    return null;
  }
}

export default async function Image() {
  const serif = await loadSerif();
  const display = serif ? "Instrument Serif" : "serif";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#F5F4F0",
          color: "#0A0A0A",
          padding: "72px",
        }}
      >
        <div
          style={{
            fontSize: 22,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,0.6)",
          }}
        >
          Portfolio
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: display,
              fontSize: 128,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Sebastian Lumme
          </div>
          <div
            style={{
              fontSize: 34,
              marginTop: 16,
              color: "rgba(10,10,10,0.7)",
            }}
          >
            Strategy · Analysis · Industrial Engineering
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              width: 56,
              height: 8,
              backgroundColor: "#1A2BE0",
              borderRadius: 9999,
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: serif
        ? [{ name: "Instrument Serif", data: serif, style: "normal", weight: 400 }]
        : [],
    }
  );
}
