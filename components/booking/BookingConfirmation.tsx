"use client";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import { CheckIcon } from "@/components/ui/Icons";
import NotificationPreview from "@/components/notifications/NotificationPreview";
import { SUBSCRIPTION } from "@/data/subscription";
import { addDays, formatDay, formatRange, formatTime, fromISODate } from "@/lib/dates";
import { getBooking } from "@/lib/storage";
import type { Booking } from "@/types";

export default function BookingConfirmation() {
  const [booking, setBooking] = useState<Booking | null | undefined>(undefined);
  useEffect(() => setBooking(getBooking()), []);

  if (booking === undefined) return <p className="text-center text-brown/70" role="status">Loading your booking…</p>;
  if (!booking) {
    return <EmptyState title="No booking yet" action={<Button href="/booking">Book a session</Button>}>Complete the booking steps and your confirmation will appear here.</EmptyState>;
  }

  const start = fromISODate(booking.dateISO);
  return (
    <div className="mx-auto max-w-4xl">
      <div className="animate-rise rounded-[2.5rem] bg-cream p-8 text-center shadow-[0_30px_60px_-40px_rgba(73,55,47,.7)] sm:p-14">
        <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-terracotta text-cream"><CheckIcon width={30} height={30} /></span>
        <h1 className="mt-6 text-4xl sm:text-5xl">Booking confirmed</h1>
        <p className="mt-2 text-brown/75">Thank you, {booking.name.split(" ")[0]}. Your place is saved.</p>

        <div className="mx-auto mt-10 max-w-lg rounded-3xl bg-sand/70 p-7 text-left">
          <p className="font-serif text-3xl">{booking.className}</p>
          <p className="mt-1 text-lg">{formatDay(start)} · {formatTime(booking.time)}</p>
          <dl className="mt-5 space-y-3 border-t border-brown/15 pt-5 text-sm">
            <div><dt className="text-brown/65">Registered email</dt><dd className="break-all font-medium">{booking.email}</dd></div>
            <div><dt className="text-brown/65">Registered phone</dt><dd className="font-medium">{booking.phone}</dd></div>
            <div><dt className="text-brown/65">{SUBSCRIPTION.name}</dt><dd className="font-medium">{formatRange(start, addDays(start, SUBSCRIPTION.durationDays - 1))}</dd></div>
          </dl>
        </div>

        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={`/login?next=/member/sessions&email=${encodeURIComponent(booking.email)}`} size="lg">View my sessions</Button>
          <Button href="/" variant="secondary" size="lg">Back to home</Button>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-2xl">What happens next</h2>
        <NotificationPreview phone={booking.phone} className={booking.className} time={formatTime(booking.time)} />
      </div>
    </div>
  );
}
