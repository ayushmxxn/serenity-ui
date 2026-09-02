import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getAllComponents, getAllComponentSlugs, getComponentBySlug } from "../../registry";
import { getComponentSeo } from "../../registry/seo-data";
import { ComponentPreviewView } from "./component-preview-view";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

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

  const seo = getComponentSeo(slug);
  const title = `${item.name} | Serenity UI`;
  const canonicalUrl = `/components/${slug}`;

  return {
    title: item.name,
    description: seo.description,
    keywords: seo.keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description: seo.description,
      url: canonicalUrl,
      type: "article",
      siteName: "Serenity UI",
      tags: seo.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: seo.description,
      creator: "@ayushmxxn",
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

  const seo = getComponentSeo(slug);
  const allComponents = getAllComponents();
  const relatedComponents = allComponents.filter((c) => c.slug !== item.slug).slice(0, 5);
  const dependencies = item.dependencies && item.dependencies.length > 0 ? item.dependencies.join(", ") : "None (zero external dependencies)";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteUrl}/components/${slug}#code`,
        name: item.name,
        description: seo.description,
        programmingLanguage: ["TypeScript", "React", "Tailwind CSS"],
        codeRepository: "https://github.com/ayushmxxn/serenity-ui",
        runtimePlatform: "Node.js / Browser",
        isPartOf: {
          "@id": `${siteUrl}/#website`,
        },
        targetProduct: {
          "@type": "SoftwareApplication",
          name: "React",
          applicationCategory: "DeveloperApplication",
        },
        license: "https://opensource.org/licenses/MIT",
        author: {
          "@id": `${siteUrl}/#creator`,
        },
        url: `${siteUrl}/components/${slug}`,
        keywords: seo.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/components/${slug}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Components",
            item: `${siteUrl}/components`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.name,
            item: `${siteUrl}/components/${slug}`,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Crawlable semantic breadcrumbs, specs, and related links for search engines and assistive technologies */}
      <div className="sr-only" aria-hidden="false">
        <nav aria-label="Breadcrumb">
          <ol>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/components">Components</Link>
            </li>
            <li aria-current="page">{item.name}</li>
          </ol>
        </nav>
        <section aria-label="Component specifications">
          <h2>{item.name} — React UI Component</h2>
          <p>{seo.description}</p>
          <p>Category: {seo.category}</p>
          <p>Framework Support: React 18 & 19, Next.js (App & Pages Router), Vite, Astro, Remix</p>
          <p>Dependencies: {dependencies}</p>
          <p>CLI Installation: {item.cliCommand || `npx shadcn@latest add ayushmxxn/serenity-ui/${item.slug}`}</p>
          <h3>Key Features</h3>
          <ul>
            {seo.features.map((feature, idx) => (
              <li key={idx}>{feature}</li>
            ))}
          </ul>
        </section>
        <section aria-label="Related React Components">
          <h3>Explore More Animated React Components</h3>
          <ul>
            {relatedComponents.map((rel) => (
              <li key={rel.slug}>
                <Link href={`/components/${rel.slug}`}>{rel.name} — React Component</Link>
              </li>
            ))}
            <li>
              <Link href="/blocks/testimonial">Voice Testimonial — React Block</Link>
            </li>
          </ul>
        </section>
      </div>
      <ComponentPreviewView item={item} />
    </>
  );
}
