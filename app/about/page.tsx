import type { Metadata } from "next";
import AboutSection from "@/components/home/AboutSection";
import TrainerSection from "@/components/home/TrainerSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import CTABanner from "@/components/home/CTABanner";
import PageHero from "@/components/layout/PageHero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Escape in Yoga" eyebrow="Our story" description="A live yoga practice led by Avani Jain, built around breath, movement and a daily routine." />
      <AboutSection />
      <TrainerSection />
      <BenefitsSection />
      <CTABanner />
    </>
  );
}
