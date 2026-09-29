"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/Icons";
import { useMember } from "@/components/member/useMember";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/classes", label: "Practices" },
  { href: "/postures", label: "Postures" },
  { href: "/schedule", label: "Schedule" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const { profile } = useMember();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);
      setHidden(y > last && y > 240 && !open);
      last = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const memberHref = profile ? "/member" : "/login";
  const memberLabel = profile ? "My sessions" : "Member login";

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${hidden ? "-translate-y-full" : "translate-y-0"} ${scrolled || open ? "bg-softcream/95 shadow-[0_1px_0_rgba(52,76,61,.1)] backdrop-blur" : "bg-transparent"}`}>
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="font-serif text-2xl font-semibold tracking-tight text-forest">
          Escape in Yoga
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
              className={`rounded-full px-4 py-2 text-[15px] font-medium transition hover:bg-warmbeige/70 ${isActive(l.href) ? "bg-warmbeige text-forest" : "text-forest/80"}`}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <Button href={memberHref} variant="ghost" size="sm">{memberLabel}</Button>
          <Button href="/booking" size="sm">Book a session</Button>
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-full text-forest hover:bg-warmbeige/60 lg:hidden"
          aria-expanded={open} aria-controls="mobile-menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
          {open ? <CloseIcon width={26} height={26} /> : <MenuIcon width={26} height={26} />}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="animate-fade-in border-t border-forest/10 bg-softcream lg:hidden">
          <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-5 pb-8 pt-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} aria-current={isActive(l.href) ? "page" : undefined}
                className="border-b border-forest/10 py-4 font-serif text-2xl text-forest">
                {l.label}
              </Link>
            ))}
            <div className="mt-6 grid gap-3">
              <Button href="/booking" size="lg">Book a session</Button>
              <Button href={memberHref} variant="secondary" size="lg">{memberLabel}</Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
