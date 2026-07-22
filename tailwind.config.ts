import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: "#F5F4F0",
        ink: {
          DEFAULT: "#0A0A0A",
          10: "rgba(10,10,10,0.10)",
          12: "rgba(10,10,10,0.12)",
          15: "rgba(10,10,10,0.15)",
          20: "rgba(10,10,10,0.20)",
          30: "rgba(10,10,10,0.30)",
          60: "rgba(10,10,10,0.60)",
          70: "rgba(10,10,10,0.70)",
        },
        accent: "#1A2BE0",
        orange: "#FF5A1F",
        night: "#0B0D12",
        mist: "rgba(26,43,224,0.06)",
        muted: "#6B6860",
      },
      fontFamily: {
        display: ['"Instrument Serif"', "Georgia", "serif"],
        body: ['"Inter"', "system-ui", "sans-serif"],
      },
      borderRadius: {
        small: "0.25rem",
        card: "0.375rem",
        panel: "0.75rem",
        pill: "9999px",
      },
      boxShadow: {
        rest: "0 4px 16px rgba(10,10,10,0.05)",
        raised: "0 8px 28px rgba(10,10,10,0.08)",
        floating: "0 18px 48px rgba(10,10,10,0.12)",
        inset: "inset 0 1px 0 rgba(255,255,255,0.06)",
        glow: "0 0 40px rgba(26,43,224,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
