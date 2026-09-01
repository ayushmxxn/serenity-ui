import "@fontsource/open-runde/400.css";
import "@fontsource/open-runde/500.css";
import "@fontsource/open-runde/600.css";
import "@fontsource/open-runde/700.css";
import { SoundProvider } from "@web-kits/audio/react";
import "lenis/dist/lenis.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SmoothScroll } from "./components/smooth-scroll";
import { ThemeProvider } from "./components/theme-provider";
import { TopViewportOverlay } from "./components/top-viewport-overlay";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Serenity UI – Creative Components for React & Next.js",
    template: "%s | Serenity UI",
  },
  description:
    "A curated collection of free, open-source React, Canvas, and WebGL components styled with Tailwind CSS. Copy-paste ready for modern web apps.",
  keywords: [
    "React components",
    "Next.js UI library",
    "Tailwind CSS components",
    "WebGL animations",
    "Canvas UI",
    "Shadcn UI components",
    "Creative web components",
  ],
  authors: [{ name: "Ayushmaan Singh", url: "https://x.com/ayushmxxn" }],
  creator: "Ayushmaan Singh",
  publisher: "Serenity UI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Serenity UI",
    title: "Serenity UI – Creative Components for React & Next.js",
    description:
      "A curated collection of free, open-source React, Canvas, and WebGL components styled with Tailwind CSS.",
    images: [
      {
        url: "/logo.webp",
        width: 1200,
        height: 630,
        alt: "Serenity UI — Creative components in a new dimension",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serenity UI – Creative Components for React & Next.js",
    description:
      "A curated collection of free, open-source React, Canvas, and WebGL components styled with Tailwind CSS.",
    creator: "@ayushmxxn",
    images: ["/logo.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/logo.webp",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Serenity UI",
      description:
        "Creative components in a new dimension for React and Next.js.",
      publisher: {
        "@type": "Person",
        name: "Ayushmaan Singh",
        url: "https://x.com/ayushmxxn",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${siteUrl}/#software`,
      name: "Serenity UI",
      applicationCategory: "DeveloperApplication",
      operatingSystem: "Web",
      url: siteUrl,
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free and open source React, Canvas, and WebGL component library for modern web applications.",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-full flex flex-col font-sans">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-[var(--text-primary)] focus:text-[var(--bg-primary)] focus:rounded-xl focus:font-semibold focus:text-xs focus:shadow-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
        >
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SoundProvider volume={0.35}>
            <SmoothScroll>
              {children}
              <TopViewportOverlay />
            </SmoothScroll>
          </SoundProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
