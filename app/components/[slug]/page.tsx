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
      title: "Component Not Found — Serenity UI",
    };
  }

  return {
    title: `${item.name} — Serenity UI`,
    description: `Interactive preview, source code, and CLI installation for ${item.name}.`,
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

