import type { Batch } from "@/types";

const b = (classSlug: string, day: number, time: string, label: string): Batch => ({
  id: `${classSlug}-${day}-${time.replace(":", "")}`, classSlug, day, time, label,
});

/** Demo timetable. Replace with the real batch timings. */
export const batches: Batch[] = [
  b("hatha-yoga", 1, "07:00", "Morning Hatha"),
  b("hot-yoga", 1, "18:00", "Evening Hot Yoga"),
  b("vinyasa-yoga", 1, "19:30", "Night Vinyasa"),
  b("vinyasa-yoga", 2, "07:00", "Sunrise Vinyasa"),
  b("yin-yoga", 2, "18:30", "Evening Yin"),
  b("hatha-yoga", 3, "07:00", "Morning Hatha"),
  b("hot-yoga", 3, "18:00", "Evening Hot Yoga"),
  b("breathwork", 3, "19:30", "Evening Breathwork"),
  b("vinyasa-yoga", 4, "07:00", "Sunrise Vinyasa"),
  b("yin-yoga", 4, "18:30", "Evening Yin"),
  b("meditation", 4, "19:30", "Evening Meditation"),
  b("hatha-yoga", 5, "07:00", "Morning Hatha"),
  b("hot-yoga", 5, "18:00", "Evening Hot Yoga"),
  b("vinyasa-yoga", 5, "19:30", "Night Vinyasa"),
  b("hot-yoga", 6, "07:00", "Saturday Hot Yoga"),
  b("vinyasa-yoga", 6, "09:00", "Saturday Vinyasa"),
  b("yin-yoga", 6, "17:00", "Slow Saturday Yin"),
  b("meditation", 0, "08:00", "Sunday Meditation"),
  b("breathwork", 0, "17:00", "Sunday Breathwork"),
];

export const batchesForDay = (day: number) => batches.filter((x) => x.day === day).sort((a, c) => a.time.localeCompare(c.time));
export const batchesForClass = (slug: string) => batches.filter((x) => x.classSlug === slug);
export const getBatch = (id: string) => batches.find((x) => x.id === id);
export const scheduleDayOrder = [1, 2, 3, 4, 5, 6, 0];
