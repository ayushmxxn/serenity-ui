import type { Metadata } from "next";
import AllBlocksView from "./all-blocks-view";
import { getProfileStats } from "../lib/get-profile-stats";

export const metadata: Metadata = {
  title: "All Blocks — Serenity UI",
  description:
    "Explore the full collection of copy-paste React & Tailwind CSS blocks and full-width sections for modern web applications.",
};

export default async function AllBlocksPage() {
  const stats = await getProfileStats();

  return <AllBlocksView stats={stats} />;
}
