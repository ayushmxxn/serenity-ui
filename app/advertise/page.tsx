import type { Metadata } from "next";
import AdvertiseView from "./advertise-view";
import { getProfileStats } from "../lib/get-profile-stats";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

export const metadata: Metadata = {
  title: {
    absolute: "Advertise on Serenity UI",
  },
  description:
    "Feature your product in Serenity's top strip. $99/month, one product, one month. 100% visibility to thousands of frontend designers and engineers.",
  alternates: {
    canonical: "/advertise",
  },
  openGraph: {
    title: "Advertise on Serenity UI",
    description:
      "One product. One month. Right at the top. $99/month exclusive top strip sponsorship on Serenity UI.",
    url: "/advertise",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Advertise on Serenity UI",
    description:
      "One product. One month. Right at the top. $99/month exclusive top strip sponsorship on Serenity UI.",
  },
};

export default async function AdvertisePage() {
  const stats = await getProfileStats();

  const advertiseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Advertise on Serenity UI",
    description:
      "Exclusive monthly top strip sponsorship on Serenity UI for developer and design tools.",
    offers: {
      "@type": "Offer",
      price: "99",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
      url: `${siteUrl}/advertise`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(advertiseJsonLd) }}
      />
      <AdvertiseView stats={stats} />
    </>
  );
}
