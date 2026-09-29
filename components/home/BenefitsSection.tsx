import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

const benefits = [
  { title: "Breath awareness", text: "Learn to notice and steady your breath, on and off the mat." },
  { title: "Strength and steadiness", text: "Standing and floor postures build a stable, supported body over time." },
  { title: "Flexibility and ease", text: "Regular, gentle stretching helps the body feel more open and at ease." },
  { title: "Calm and focus", text: "A daily routine gives the mind a regular place to slow down." },
];

export default function BenefitsSection() {
  return (
    <section id="benefits" className="bg-sand py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading eyebrow="Why practise" title="What a regular practice can bring" description="Many practitioners describe these benefits. Yoga is a wellness practice, not a medical treatment." />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <Reveal key={b.title} delay={i * 80}>
              <div className={`h-full rounded-[2rem] p-8 ${i % 2 === 0 ? "bg-peach" : "bg-cream"} ${i === 1 || i === 3 ? "lg:translate-y-8" : ""}`}>
                <div className="mb-8 h-12 w-12 rounded-full bg-terracotta/90" style={{ borderRadius: i % 2 ? "50% 50% 50% 8%" : "50% 8% 50% 50%" }} aria-hidden="true" />
                <h3 className="text-2xl">{b.title}</h3>
                <p className="mt-3 text-brown/80">{b.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
