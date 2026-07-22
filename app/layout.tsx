import type { Metadata } from "next";
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

// Fonts are self-hosted via @font-face in globals.css (public/fonts/*.woff2) —
// no next/font/google network fetch at build time.

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://sebastianlumme.com";

export const metadata: Metadata = {
  title: "Sebastian Lumme | Strategy, Analysis & Industrial Engineering",
  description:
    "Industrial engineer combining strategy, financial analysis, and data-driven problem solving — with equity research, operations improvement, and backend delivery evidence.",
  openGraph: {
    title: "Sebastian Lumme | Strategy, Analysis & Industrial Engineering",
    description:
      "Industrial engineer combining strategy, financial analysis, and data-driven problem solving into actionable decisions.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian Lumme | Strategy, Analysis & Industrial Engineering",
    description:
      "Industrial engineer combining strategy, financial analysis, and data-driven problem solving into actionable decisions.",
  },
  metadataBase: new URL(SITE_URL),
};

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "work", label: "Evidence" },
  { id: "experience", label: "Experience" },
  { id: "awards", label: "Recognition" },
  { id: "skills", label: "Methods" },
  { id: "contact", label: "Contact" },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body className="font-body bg-paper text-ink">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-accent focus:text-white focus:px-4 focus:py-2 focus:rounded"
        >
          Skip to content
        </a>
        <MotionConfig reducedMotion="user">
          <Navbar sections={sections} />
          <main id="main-content">{children}</main>
          <Footer monogram="SL" />
        </MotionConfig>
      </body>
    </html>
  );
}
