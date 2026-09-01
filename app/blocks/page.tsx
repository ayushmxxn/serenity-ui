import type { Metadata } from "next";
import AllBlocksView from "./all-blocks-view";
import { getProfileStats } from "../lib/get-profile-stats";

export const metadata: Metadata = {
  title: "All Blocks",
  description:
    "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
  alternates: {
    canonical: "/blocks",
  },
  openGraph: {
    title: "All Blocks — Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS blocks and full-width sections for modern web applications.",
    url: "/blocks",
  },
};

export default async function AllBlocksPage() {
  const stats = await getProfileStats();

  return <AllBlocksView stats={stats} />;
}
