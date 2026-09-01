import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllBlockSlugs, getBlockBySlug } from "../../registry";
import { ComponentPreviewView } from "../../components/[slug]/component-preview-view";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllBlockSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getBlockBySlug(slug);

  if (!item) {
    return {
      title: "Block Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${item.name} — Serenity UI Blocks`;
  const description = `Interactive preview, clean source code, and shadcn CLI installation for the ${item.name} block and full-width section.`;
  const canonicalUrl = `/blocks/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BlockPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getBlockBySlug(slug);

  if (!item) {
    notFound();
  }

  if (slug === "voice-testimonial" && item.slug === "testimonial") {
    redirect("/blocks/testimonial");
  }

  return <ComponentPreviewView item={item} />;
}
