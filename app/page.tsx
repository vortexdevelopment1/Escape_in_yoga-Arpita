import Hero from "@/components/home/Hero";
import AboutSection from "@/components/home/AboutSection";
import TrainerSection from "@/components/home/TrainerSection";
import BenefitsSection from "@/components/home/BenefitsSection";
import HowItWorks from "@/components/home/HowItWorks";
import JourneySection from "@/components/home/JourneySection";
import CTABanner from "@/components/home/CTABanner";
import ContactSection from "@/components/home/ContactSection";
import ClassGrid from "@/components/classes/ClassGrid";
import PostureGrid from "@/components/postures/PostureGrid";
import Schedule from "@/components/schedule/Schedule";
import Button from "@/components/ui/Button";
import SectionHeading from "@/components/ui/SectionHeading";
import { Wave } from "@/components/ui/Icons";
import { classes } from "@/data/classes";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Wave fill="#FFFCF7" />
      <AboutSection />
      <TrainerSection />
      <BenefitsSection />

      <section id="postures" className="bg-cream py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Hot yoga postures" title="Learn the postures before you step in" description="Each posture comes with a short description and its wellness benefits. Open one for more." />
            <Button href="/postures" variant="secondary">All postures</Button>
          </div>
          <div className="mt-12"><PostureGrid limit={6} showFilters={false} /></div>
        </div>
      </section>

      <section id="classes" className="bg-sand py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <SectionHeading eyebrow="Practices" title="Find the class that fits your day" />
          <div className="mt-12"><ClassGrid items={classes} /></div>
        </div>
      </section>

      <section id="schedule" className="bg-peach/50 py-24 sm:py-32">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading eyebrow="Schedule" title="Session timings" description="Pick a day, then choose a session to start booking." />
          <div className="mt-10"><Schedule /></div>
        </div>
      </section>

      <HowItWorks />
      <JourneySection />
      <CTABanner />
      <ContactSection />
    </>
  );
}
