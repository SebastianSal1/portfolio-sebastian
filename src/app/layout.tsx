import type { Metadata } from "next";
import { ClientProviders } from "@/components/ClientProviders";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL("https://portfolio-sebastiansal.vercel.app"),
  title: {
    default: "Sebastian Salutare – Strategy, Operations & Technology",
    template: "%s – Sebastian Salutare",
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
    title: "Sebastian Salutare – Strategy, Operations & Technology",
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
    title: "Sebastian Salutare – Strategy, Operations & Technology",
    description:
      "Fresh graduate in Industrial Engineering from Institut Teknologi Bandung (ITB). Open to interesting opportunities and available to any roles across strategy, finance, operations, and technology.",
    images: ["/og-image.png"],
  },
  icons: {
    icon: "/favicon.ico",
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
      className="antialiased scroll-smooth"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;750&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[var(--color-surface-canvas)] text-[var(--color-content-display)] font-sans min-h-screen selection:bg-[var(--color-primary)]/15 selection:text-[var(--color-primary)]">
        <ClientProviders>
          {children}
        </ClientProviders>
      </body>
    </html>
  );
}
