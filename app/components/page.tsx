import type { Metadata } from "next";
import AllComponentsView from "./all-components-view";
import { getProfileStats } from "../lib/get-profile-stats";

export const metadata: Metadata = {
  title: "All Components — Serenity UI",
  description:
    "Explore the full collection of copy-paste React & Tailwind CSS components for modern web applications.",
};

export default async function AllComponentsPage() {
  const stats = await getProfileStats();

  return <AllComponentsView stats={stats} />;
}
