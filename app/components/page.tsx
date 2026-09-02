import type { Metadata } from "next";
import AllComponentsView from "./all-components-view";
import { getProfileStats } from "../lib/get-profile-stats";
import { getAllComponents } from "../registry";
import { getComponentSeo } from "../registry/seo-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

export const metadata: Metadata = {
  title: "All Components",
  description:
    "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    title: "All Components | Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
    url: "/components",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Components | Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
  },
};

export default async function AllComponentsPage() {
  const [stats, components] = await Promise.all([
    getProfileStats(),
    Promise.resolve(getAllComponents()),
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/components#collection`,
    name: "Serenity UI Components",
    url: `${siteUrl}/components`,
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: components.length,
      itemListElement: components.map((comp, idx) => {
        const seo = getComponentSeo(comp.slug);
        return {
          "@type": "ListItem",
          position: idx + 1,
          name: comp.name,
          url: `${siteUrl}/components/${comp.slug}`,
          description: seo.description,
        };
      }),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionJsonLd) }}
      />
      <AllComponentsView stats={stats} />
    </>
  );
}
