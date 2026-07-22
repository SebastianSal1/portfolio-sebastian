import type { WorkScreenshot } from "./types";

/** Intentional text-led cover labels when no public screenshot ships. */
export const TEXT_COVER_LABEL: Record<string, string> = {
  "network-to-grow": "Strategy Case",
  "industrial-fair": "Business Proposal",
  "industrial-essay": "Written Analysis",
};

export function textCoverLabel(slug: string, domain?: string): string {
  return TEXT_COVER_LABEL[slug] ?? domain ?? "Case Study";
}

/** Intentional empty-state SVG — not a failed network load. */
export function getPlaceholderUrl(
  width = 1200,
  height = 800,
  label = "Case Study"
): string {
  const safe = label
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
  return `data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" fill="%23E8E6E1"><rect width="${width}" height="${height}" fill="%23F5F4F0"/><rect x="1" y="1" width="${width - 2}" height="${height - 2}" fill="none" stroke="%231A2BE0" stroke-opacity="0.12" stroke-width="1"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="%230A0A0A" opacity="0.45" font-family="Inter,system-ui,sans-serif" font-size="20" font-weight="600">${safe}</text><text x="50%" y="56%" dominant-baseline="middle" text-anchor="middle" fill="%230A0A0A" opacity="0.28" font-family="Inter,system-ui,sans-serif" font-size="13">Text-led entry</text></svg>`
  )}`;
}

/**
 * Path-shape check only (client-safe). Existence check lives in work.ts (server).
 */
export function isValidPublicSrc(src: string | undefined): src is string {
  return Boolean(src && src.startsWith("/") && !src.includes(".."));
}

export function toScreenshot(
  src: string,
  alt: string
): WorkScreenshot {
  return { src, alt: alt || "Project visual" };
}
