"use client";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import { classes, getClass } from "@/data/classes";
import { batchesForClass, getBatch } from "@/data/schedule";
import { SUBSCRIPTION } from "@/data/subscription";
import { addDays, formatDay, formatTime, fromISODate, nextDateForWeekday, startOfDay, toISODate } from "@/lib/dates";
import { saveBooking } from "@/lib/storage";
import { validateEmail, validateName, validatePhone } from "@/lib/validation";
import BookingForm, { type DetailsErrors, type DetailsValues } from "./BookingForm";
import BookingSteps from "./BookingSteps";
import BookingSummary from "./BookingSummary";

export default function BookingFlow() {
  const router = useRouter();
  const params = useSearchParams();

  const [state, setState] = useState(() => {
    const batch = getBatch(params.get("batch") ?? "");
    const slug = batch?.classSlug ?? params.get("class") ?? "";
    if (batch) return { step: 4, classSlug: batch.classSlug, dateISO: toISODate(nextDateForWeekday(batch.day)), batchId: batch.id };
    if (getClass(slug)) return { step: 2, classSlug: slug, dateISO: "", batchId: "" };
    return { step: 1, classSlug: "", dateISO: "", batchId: "" };
  });
  const [details, setDetails] = useState<DetailsValues>({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<DetailsErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");

  const { step, classSlug, dateISO, batchId } = state;
  const cls = getClass(classSlug);
  const batch = getBatch(batchId);

  const dates = useMemo(() => {
    const today = startOfDay(new Date());
    return Array.from({ length: 14 }, (_, i) => addDays(today, i));
  }, []);

  const go = (s: number) => setState((p) => ({ ...p, step: s }));
  const pickClass = (slug: string) => setState({ step: 2, classSlug: slug, dateISO: "", batchId: "" });
  const pickDate = (iso: string) => setState((p) => ({ ...p, step: 3, dateISO: iso, batchId: "" }));
  const pickBatch = (id: string) => setState((p) => ({ ...p, step: 4, batchId: id }));

  const timesForDate = useMemo(() => {
    if (!dateISO || !classSlug) return [];
    const d = fromISODate(dateISO);
    const now = new Date();
    const isToday = toISODate(now) === dateISO;
    const nowHM = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    return batchesForClass(classSlug).filter((b) => b.day === d.getDay() && (!isToday || b.time > nowHM)).sort((a, b) => a.time.localeCompare(b.time));
  }, [dateISO, classSlug]);

  function continueFromDetails() {
    const next: DetailsErrors = { name: validateName(details.name), email: validateEmail(details.email), phone: validatePhone(details.phone) };
    setErrors(next);
    if (!Object.values(next).some(Boolean)) go(5);
  }

  async function confirm() {
    if (!cls || !batch) return;
    setStatus("loading");
    try {
      // Frontend only: the booking is kept in this browser. Swap this for an API call later.
      await new Promise((r) => setTimeout(r, 1200));
      if (!navigator.onLine) throw new Error("offline");
      saveBooking({
        classSlug: cls.slug, className: cls.name, dateISO, batchId: batch.id, time: batch.time,
        name: details.name.trim(), email: details.email.trim(), phone: details.phone.trim(), createdAt: new Date().toISOString(),
      });
      router.push("/booking/confirmation");
    } catch {
      setStatus("error");
    }
  }

  const back = step > 1 ? (
    <Button variant="ghost" onClick={() => go(step - 1)} disabled={status === "loading"}>Back</Button>
  ) : null;

  return (
    <div className="mx-auto max-w-3xl">
      <BookingSteps current={step} />
      <div className="mt-10 rounded-[2rem] bg-cream p-6 shadow-[0_24px_50px_-34px_rgba(73,55,47,.6)] sm:p-10">
        {step === 1 && (
          <section aria-labelledby="s1">
            <h2 id="s1" className="text-3xl">Choose your class</h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {classes.map((c) => (
                <button key={c.slug} onClick={() => pickClass(c.slug)} className="rounded-3xl border border-brown/15 p-5 text-left transition hover:border-terracotta hover:bg-peach/40">
                  <span className="block font-serif text-xl">{c.name}</span>
                  <span className="mt-1 block text-sm text-brown/70">{c.duration} · {c.level}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        {step === 2 && cls && (
          <section aria-labelledby="s2">
            <h2 id="s2" className="text-3xl">Choose a start date</h2>
            <p className="mt-2 text-brown/75">{cls.name} runs on selected days. Unavailable dates are disabled.</p>
            <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {dates.map((d) => {
                const iso = toISODate(d);
                const available = batchesForClass(cls.slug).some((b) => b.day === d.getDay());
                return (
                  <button key={iso} disabled={!available} onClick={() => pickDate(iso)} aria-pressed={dateISO === iso}
                    className={`min-h-[64px] rounded-2xl border px-3 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-40 ${dateISO === iso ? "border-terracotta bg-terracotta text-cream" : "border-brown/15 enabled:hover:border-terracotta enabled:hover:bg-peach/40"}`}>
                    {formatDay(d)}
                  </button>
                );
              })}
            </div>
          </section>
        )}

        {step === 3 && cls && (
          <section aria-labelledby="s3">
            <h2 id="s3" className="text-3xl">Choose a batch</h2>
            <p className="mt-2 text-brown/75">{cls.name} on {formatDay(fromISODate(dateISO))}</p>
            {timesForDate.length ? (
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {timesForDate.map((b) => (
                  <button key={b.id} onClick={() => pickBatch(b.id)} aria-pressed={batchId === b.id}
                    className={`rounded-3xl border p-5 text-left transition hover:border-terracotta hover:bg-peach/40 ${batchId === b.id ? "border-terracotta bg-peach/40" : "border-brown/15"}`}>
                    <span className="block font-serif text-2xl">{formatTime(b.time)}</span>
                    <span className="text-sm text-brown/70">{b.label}</span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="mt-6"><EmptyState title="No batches left on this date" action={<Button variant="secondary" onClick={() => go(2)}>Pick another date</Button>}>Today&rsquo;s batches may have already started.</EmptyState></div>
            )}
          </section>
        )}

        {step === 4 && cls && batch && (
          <section aria-labelledby="s4">
            <h2 id="s4" className="text-3xl">Your details</h2>
            <p className="mt-2 mb-6 text-brown/75">{cls.name} · {formatDay(fromISODate(dateISO))} · {formatTime(batch.time)}</p>
            <BookingForm values={details} errors={errors} onChange={(f, v) => setDetails((d) => ({ ...d, [f]: v }))} />
          </section>
        )}

        {step === 5 && cls && batch && (
          <section aria-labelledby="s5">
            <h2 id="s5" className="text-3xl">Review your booking</h2>
            <p className="mt-2 mb-6 text-brown/75">Your {SUBSCRIPTION.name} starts on the date below. Payment is not part of this frontend demo.</p>
            <BookingSummary className={cls.name} label={batch.label} dateISO={dateISO} time={batch.time} {...details} onEdit={go} />
            {status === "error" && <p role="alert" className="mt-5 rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-900">We couldn&rsquo;t confirm your booking. Check your connection and try again.</p>}
          </section>
        )}

        {(step === 1 || !cls) && step !== 1 && <EmptyState title="Start with a class" action={<Button onClick={() => go(1)}>Choose a class</Button>} />}

        <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>{back}</div>
          {step === 4 && <Button onClick={continueFromDetails} size="lg">Review booking</Button>}
          {step === 5 && <Button onClick={confirm} size="lg" disabled={status === "loading"}>{status === "loading" ? "Confirming…" : status === "error" ? "Try again" : "Confirm booking"}</Button>}
        </div>
      </div>
    </div>
  );
}
