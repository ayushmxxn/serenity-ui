import type { Metadata } from "next";
import SponsorsView from "./sponsors-view";
import { getProfileStats } from "../lib/get-profile-stats";

export const metadata: Metadata = {
  title: "Sponsors & Backers",
  description:
    "Support Serenity UI and independent open-source creative React and WebGL components. Back the project as an individual friend, studio, or founding partner.",
  alternates: {
    canonical: "/sponsors",
  },
  openGraph: {
    title: "Sponsors & Backers | Serenity UI",
    description:
      "Support Serenity UI and independent open-source creative React and WebGL components. Back the project as an individual friend, studio, or founding partner.",
    url: "/sponsors",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sponsors & Backers | Serenity UI",
    description:
      "Support Serenity UI and independent open-source creative React and WebGL components. Back the project as an individual friend, studio, or founding partner.",
  },
};

export default async function SponsorsPage() {
  const stats = await getProfileStats();

  return <SponsorsView stats={stats} />;
}
