"use client";
import { useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Field";
import { SUBSCRIPTION } from "@/data/subscription";
import { getBooking, saveSession } from "@/lib/storage";
import { validateEmail, validatePassword } from "@/lib/validation";

export default function LoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get("next") === "/member/sessions" ? "/member/sessions" : "/member";

  const [email, setEmail] = useState(params.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string | null; password?: string | null }>({});
  const [formError, setFormError] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");

  useEffect(() => setEmail((e) => e || params.get("email") || ""), [params]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const next2 = { email: validateEmail(email), password: validatePassword(password) };
    setErrors(next2);
    setFormError("");
    if (next2.email || next2.password) return;

    setStatus("loading");
    await new Promise((r) => setTimeout(r, 900));

    const typed = email.trim().toLowerCase();
    const booking = getBooking();
    if (typed === SUBSCRIPTION.demoEmail) {
      if (password !== SUBSCRIPTION.demoPassword) return fail("That password doesn't match the demo account. Use the demo credentials shown below.");
      saveSession({ email: SUBSCRIPTION.demoEmail, mode: "demo" });
    } else if (booking && booking.email.toLowerCase() === typed) {
      // Demo mode: any password of 6+ characters is accepted for the email used in your booking.
      saveSession({ email: booking.email, mode: "booking" });
    } else {
      return fail("We couldn't find that email. Use the demo account, or the email from your booking on this device.");
    }
    setStatus("success");
    setTimeout(() => router.push(next), 700);
  }

  function fail(msg: string) { setFormError(msg); setStatus("idle"); }

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-[2rem] bg-cream p-8 shadow-[0_24px_50px_-34px_rgba(73,55,47,.6)] sm:p-10">
        {formError && <p role="alert" className="rounded-2xl bg-red-100 px-4 py-3 text-sm font-medium text-red-900">{formError}</p>}
        {status === "success" && <p role="status" className="rounded-2xl bg-peach px-4 py-3 text-sm font-semibold">Welcome back. Opening your member area…</p>}
        <Input id="login-email" type="email" label="Email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} disabled={status !== "idle"} />
        <Input id="login-password" type="password" label="Password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} disabled={status !== "idle"} />
        <Button type="submit" size="lg" className="w-full" disabled={status !== "idle"}>{status === "loading" ? "Logging in…" : status === "success" ? "Logged in" : "Log in"}</Button>
      </form>

      <div className="mt-6 rounded-3xl border border-dashed border-terracotta/60 bg-peach/40 p-6 text-sm">
        <p className="font-semibold">Demo mode</p>
        <p className="mt-1 text-brown/80">There is no real authentication. Use the demo account, or the email from a booking made on this device with any password of 6+ characters.</p>
        <p className="mt-3 break-all">Email: <code>{SUBSCRIPTION.demoEmail}</code><br />Password: <code>{SUBSCRIPTION.demoPassword}</code></p>
        <Button type="button" variant="secondary" size="sm" className="mt-4" disabled={status !== "idle"}
          onClick={() => { setEmail(SUBSCRIPTION.demoEmail); setPassword(SUBSCRIPTION.demoPassword); setErrors({}); setFormError(""); }}>
          Fill demo credentials
        </Button>
      </div>
    </div>
  );
}
