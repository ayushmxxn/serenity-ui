import type { Metadata } from "next";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ComponentPreviewView } from "../../components/[slug]/component-preview-view";
import { getAllBlockSlugs, getAllComponents, getBlockBySlug } from "../../registry";
import { getComponentSeo } from "../../registry/seo-data";

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://serenity-ui.com";

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

  const seo = getComponentSeo(slug);
  const title = `${item.name} | Serenity UI`;
  const canonicalUrl = `/blocks/${slug}`;

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

export default async function BlockPage({ params }: PageProps) {
  const { slug } = await params;
  const item = getBlockBySlug(slug);

  if (!item) {
    notFound();
  }

  if (slug === "voice-testimonial" && item.slug === "testimonial") {
    redirect("/blocks/testimonial");
  }

  const seo = getComponentSeo(slug);
  const allComponents = getAllComponents().slice(0, 5);
  const dependencies = item.dependencies && item.dependencies.length > 0 ? item.dependencies.join(", ") : "None (zero external dependencies)";

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "SoftwareSourceCode",
        "@id": `${siteUrl}/blocks/${slug}#code`,
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
        url: `${siteUrl}/blocks/${slug}`,
        keywords: seo.keywords.join(", "),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${siteUrl}/blocks/${slug}#breadcrumb`,
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
            name: "Blocks",
            item: `${siteUrl}/blocks`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: item.name,
            item: `${siteUrl}/blocks/${slug}`,
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
              <Link href="/blocks">Blocks</Link>
            </li>
            <li aria-current="page">{item.name}</li>
          </ol>
        </nav>
        <section aria-label="Block specifications">
          <h2>{item.name} — React UI Block & Section</h2>
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
        <section aria-label="Explore React UI Components">
          <h3>Explore Animated React Components</h3>
          <ul>
            {allComponents.map((comp) => (
              <li key={comp.slug}>
                <Link href={`/components/${comp.slug}`}>{comp.name} — React Component</Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
      <ComponentPreviewView item={item} />
    </>
  );
}
