"use client";
import type { ReactNode } from "react";
import Button from "@/components/ui/Button";
import { EmptyState } from "@/components/ui/Field";
import type { MemberProfile } from "@/types";
import { useMember } from "./useMember";

/** Renders children only for a logged-in (mock) member. */
export default function MemberGate({ children }: { children: ReactNode }) {
  const { ready, profile } = useMember();
  if (!ready) return <p role="status" className="py-20 text-center text-brown/70">Loading your journey…</p>;
  if (!profile) {
    return <EmptyState title="Log in to see your sessions" action={<Button href="/login">Member login</Button>}>Your subscription and daily sessions appear here after you log in.</EmptyState>;
  }
  return <>{children}</>;
}
