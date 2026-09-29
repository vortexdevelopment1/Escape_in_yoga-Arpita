import type { Metadata } from "next";
import { Suspense } from "react";
import PageHero from "@/components/layout/PageHero";
import LoginForm from "@/components/member/LoginForm";

export const metadata: Metadata = { title: "Member login" };

export default function LoginPage() {
  return (
    <>
      <PageHero title="Member login" eyebrow="Your journey" description="Log in with the email you used to book to see your daily sessions." />
      <div className="px-5 pb-24 sm:px-8">
        <Suspense fallback={null}><LoginForm /></Suspense>
      </div>
    </>
  );
}
