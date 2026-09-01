import type { Metadata } from "next";
import AllComponentsView from "./all-components-view";
import { getProfileStats } from "../lib/get-profile-stats";

export const metadata: Metadata = {
  title: "All Components",
  description:
    "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
  alternates: {
    canonical: "/components",
  },
  openGraph: {
    title: "All Components — Serenity UI",
    description:
      "Explore the full collection of copy-paste React, Canvas, and Tailwind CSS components for modern web applications.",
    url: "/components",
  },
};

export default async function AllComponentsPage() {
  const stats = await getProfileStats();

  return <AllComponentsView stats={stats} />;
}
