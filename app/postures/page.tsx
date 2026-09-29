import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import PostureGrid from "@/components/postures/PostureGrid";

export const metadata: Metadata = { title: "Postures" };

export default function PosturesPage() {
  return (
    <>
      <PageHero title="Hot yoga postures" eyebrow="Posture guide" description="Browse the postures used in class, filter by focus and open any card for its wellness benefits." />
      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8"><PostureGrid /></div>
    </>
  );
}
