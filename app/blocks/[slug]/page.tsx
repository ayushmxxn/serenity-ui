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
      title: "Block Not Found — Serenity UI",
    };
  }

  return {
    title: `${item.name} — Serenity UI Blocks`,
    description: `Interactive preview, source code, and CLI installation for ${item.name} block.`,
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
