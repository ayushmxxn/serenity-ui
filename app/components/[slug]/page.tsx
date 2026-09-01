import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllComponentSlugs, getComponentBySlug } from "../../registry";
import { ComponentPreviewView } from "./component-preview-view";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const slugs = getAllComponentSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = getComponentBySlug(slug);

  if (!item) {
    return {
      title: "Component Not Found",
      robots: { index: false, follow: false },
    };
  }

  const title = `${item.name} — Serenity UI`;
  const description = `Interactive preview, clean source code, and shadcn CLI installation for the ${item.name} React component.`;
  const canonicalUrl = `/components/${slug}`;

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

export default async function ComponentPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getComponentBySlug(slug);

  if (!item) {
    notFound();
  }

  if (item.type === "block") {
    redirect(`/blocks/${item.slug}`);
  }

  return <ComponentPreviewView item={item} />;
}

