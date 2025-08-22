import type { Metadata } from "next";
import "./globals.css";
import SerenitySearch from "@/components/serenity/SerenitySearch";
import { SearchProvider } from "@/components/serenity/SearchContext";
import { Analytics } from "@vercel/analytics/react";
import Script from "next/script";
import { GeistSans } from "geist/font/sans";

export const metadata: Metadata = {
  title:
    "Serenity UI - Beautifully crafted UI components to elevate your web projects.",
  description:
    "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
  keywords: [
    "Serenity UI",
    "UI components",
    "Next.js components",
    "Tailwind CSS",
    "TypeScript",
    "Framer Motion",
    "open source UI",
    "web development",
    "customizable UI components",
    "React components",
    "frontend development",
    "UI library",
    "web design",
    "Components",
    "Ayushmaan Singh",
    "ayushmxxn",
    "templates",
    "boilerplates",
    "starters",
    "design engineer",
  ],
  authors: [{ name: "Ayushmaan Singh" }],
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
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title:
      "Serenity UI - Beautifully crafted UI components to elevate your web projects.",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
    url: "https://www.serenity-ui.com/",
    siteName: "Serenity UI",
    images: [
      {
        url: "https://i.postimg.cc/9fg2pznm/Screenshot-2025-08-22-152245.png",
        width: 1200,
        height: 630,
        alt: "Serenity UI screenshot",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Serenity UI - Beautifully crafted UI components to elevate your web projects.",
    description:
      "Collection of customizable and open source components made with Next.js, Tailwind, Typescript, and Framer motion.",
    images: ["https://i.postimg.cc/9fg2pznm/Screenshot-2025-08-22-152245.png"],
    creator: "@ayushmxxn",
  },
  alternates: {
    canonical: "https://www.serenity-ui.com/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#000000" />
        <meta name="application-name" content="Serenity UI" />
        <meta name="apple-mobile-web-app-title" content="Serenity UI" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-VZQ745LCF2"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-VZQ745LCF2');
            `,
          }}
        />
      </head>
      <body
        className={`${GeistSans.className} flex flex-col min-h-screen bg-black`}
      >
        <SearchProvider>
          <div className="">
            <SerenitySearch />
          </div>
          <main className="flex-grow">{children}</main>
        </SearchProvider>
        <Analytics />
      </body>
    </html>
  );
}
