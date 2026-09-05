import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Script-src environment branching:
// Production strictly excludes 'unsafe-eval' (verified unnecessary for static prerendering).
// Development retains 'unsafe-eval' for hot-reloading / Turbopack eval source maps.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

// CSP Report-Only policy testing tightened font-src and script-src-attr
const cspReportOnly = [
  "default-src 'self'",
  scriptSrc,
  "script-src-attr 'none'",
  "style-src 'self' 'unsafe-inline'", // Google Fonts CDN removed; fonts are now self-hosted via next/font/google
  "font-src 'self'", // Google Fonts CDN removed; self-hosted from /_next/static/media/
  "img-src 'self' data: blob:", // retained for observation testing
  "connect-src 'self'",
  "object-src 'self'", // required for /cv.pdf embedded preview modal
  "frame-src 'self'",
  "frame-ancestors 'self'", // prevents clickjacking while permitting same-origin modal preview
  "base-uri 'self'",
  "form-action 'none'",
].join("; ");

const securityHeaders = [
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=31536000",
  },
  {
    key: "Content-Signal",
    value: "search=yes, ai-input=yes, ai-train=no, use=reference",
  },
  {
    key: "X-Robots-Tag",
    value: "nocache",
  },
  {
    key: "Content-Security-Policy-Report-Only",
    value: cspReportOnly,
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  allowedDevOrigins: ["localhost", "127.0.0.1"],
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      {
        source: "/cv.pdf",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, noarchive",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
