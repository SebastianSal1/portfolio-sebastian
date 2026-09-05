import type { Metadata } from "next";
import { Instrument_Serif, Inter } from "next/font/google";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-sebastiansal.vercel.app"),
  title: {
    default: "Sebastian – Portfolio",
    template: "%s – Sebastian",
  },
  description:
    "Fresh graduate in Industrial Engineering from Institut Teknologi Bandung (ITB). Open to interesting opportunities and available to any roles across strategy, finance, operations, and technology.",
  keywords: [
    "Sebastian Salutare",
    "Industrial Engineering",
    "ITB",
    "Strategy",
    "Operations Research",
    "Finance",
    "Technology",
    "Fresh Graduate",
    "Consulting",
  ],
  authors: [{ name: "Sebastian Salutare" }],
  creator: "Sebastian Salutare",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://portfolio-sebastiansal.vercel.app",
    siteName: "Sebastian Salutare Portfolio",
    title: "Sebastian – Portfolio",
    description:
      "Fresh graduate in Industrial Engineering from Institut Teknologi Bandung (ITB). Open to interesting opportunities and available to any roles across strategy, finance, operations, and technology.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sebastian Salutare – Fresh Graduate in Industrial Engineering, ITB",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sebastian – Portfolio",
    description:
      "Fresh graduate in Industrial Engineering from Institut Teknologi Bandung (ITB). Open to interesting opportunities and available to any roles across strategy, finance, operations, and technology.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: "/apple-touch-icon.png",
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${inter.variable} antialiased scroll-smooth`}
    >
      <body className="bg-[var(--color-surface-canvas)] text-[var(--color-content-display)] font-sans min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)]">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
