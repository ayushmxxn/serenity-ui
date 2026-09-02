import type { Metadata } from "next";
import AllBlocksView from "./all-blocks-view";
import { getProfileStats } from "../lib/get-profile-stats";
import { getAllBlocks } from "../registry";
import { getComponentSeo } from "../registry/seo-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

export const metadata: Metadata = {
  title: "All Blocks",
  description:
    "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
  alternates: {
    canonical: "/blocks",
  },
  openGraph: {
    title: "All Blocks | Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
    url: "/blocks",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Blocks | Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
  },
};

export default async function AllBlocksPage() {
  const [stats, blocks] = await Promise.all([
    getProfileStats(),
    Promise.resolve(getAllBlocks()),
  ]);

  const collectionJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteUrl}/blocks#collection`,
    name: "Serenity UI Blocks",
    url: `${siteUrl}/blocks`,
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: blocks.length,
      itemListElement: blocks.map((block, idx) => {
        const seo = getComponentSeo(block.slug);
        return {
          "@type": "ListItem",
          position: idx + 1,
          name: block.name,
          url: `${siteUrl}/blocks/${block.slug}`,
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
      <AllBlocksView stats={stats} />
    </>
  );
}
