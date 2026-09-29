import Link from "next/link";
import Button from "@/components/ui/Button";
import Photo from "@/components/ui/Photo";
import { CheckIcon, ClockIcon } from "@/components/ui/Icons";
import { batchesForClass } from "@/data/schedule";
import { WEEKDAYS, formatTime } from "@/lib/dates";
import { scheduleDayOrder } from "@/data/schedule";
import type { YogaClass } from "@/types";

export default function ClassDetails({ item }: { item: YogaClass }) {
  const sessions = batchesForClass(item.slug).sort(
    (a, b) => scheduleDayOrder.indexOf(a.day) - scheduleDayOrder.indexOf(b.day) || a.time.localeCompare(b.time)
  );
  return (
    <div className="mx-auto grid max-w-7xl gap-12 px-5 pb-24 sm:px-8 lg:grid-cols-[1fr_1fr]">
      <Photo src={item.image} alt={`${item.name} illustration`} className="aspect-[4/5] rounded-[2.5rem] lg:sticky lg:top-28 lg:self-start" />
      <div>
        <p className="flex items-center gap-2 font-semibold text-terracotta-dark"><ClockIcon width={18} height={18} />{item.duration} · {item.level}</p>
        <h1 className="mt-3 text-5xl sm:text-6xl">{item.name}</h1>
        <p className="mt-6 text-lg leading-relaxed text-brown/85">{item.description}</p>

        <h2 className="mt-12 text-2xl">Benefits</h2>
        <ul className="mt-4 space-y-3">
          {item.benefits.map((b) => (
            <li key={b} className="flex items-start gap-3"><span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-terracotta text-cream"><CheckIcon width={14} height={14} /></span>{b}</li>
          ))}
        </ul>

        <h2 className="mt-12 text-2xl">Available sessions</h2>
        <ul className="mt-4 divide-y divide-brown/10 rounded-3xl bg-cream">
          {sessions.map((s) => (
            <li key={s.id} className="flex items-center justify-between gap-4 px-6 py-4">
              <div><p className="font-semibold">{WEEKDAYS[s.day]}</p><p className="text-sm text-brown/70">{s.label} · {formatTime(s.time)}</p></div>
              <Link href={`/booking?class=${item.slug}&batch=${s.id}`} className="rounded-full bg-peach px-4 py-2 text-sm font-semibold transition hover:bg-terracotta hover:text-cream">Select</Link>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-sm text-brown/60">Demo timings. Replace with the real schedule.</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button href={`/booking?class=${item.slug}`} size="lg">Book {item.name}</Button>
          <Button href="/schedule" variant="secondary" size="lg">Full schedule</Button>
        </div>
      </div>
    </div>
  );
}
