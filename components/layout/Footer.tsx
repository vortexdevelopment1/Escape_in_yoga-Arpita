import Link from "next/link";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/ui/Icons";

const groups = [
  { title: "Explore", links: [["About", "/about"], ["Classes", "/classes"], ["Postures", "/postures"], ["Schedule", "/schedule"], ["Contact", "/contact"]] },
  { title: "Member", links: [["Login", "/login"], ["My sessions", "/member/sessions"], ["Book a session", "/booking"]] },
];
const socials = [
  { name: "Instagram", Icon: InstagramIcon },
  { name: "YouTube", Icon: YoutubeIcon },
  { name: "Facebook", Icon: FacebookIcon },
];

export default function Footer() {
  return (
    <footer className="bg-forest text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <p className="font-serif text-3xl text-white">Escape in Yoga</p>
          <p className="mt-4 max-w-sm text-white/80">Live yoga with Avani Jain. Choose a batch, book your place and return to your practice every day.</p>
          <ul className="mt-6 flex gap-3" aria-label="Social media (placeholders)">
            {socials.map(({ name, Icon }) => (
              <li key={name} title={`${name} — link coming soon`} className="flex h-11 w-11 items-center justify-center rounded-full border border-white/25 text-white/80 transition hover:bg-white/10 hover:text-white">
                <Icon /><span className="sr-only">{name} (link coming soon)</span>
              </li>
            ))}
          </ul>
        </div>
        {groups.map((g) => (
          <nav key={g.title} aria-label={g.title}>
            <p className="font-serif text-xl text-white">{g.title}</p>
            <ul className="mt-4 space-y-2.5">
              {g.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-white/80 transition hover:text-warmbeige">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-white/15">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>© {new Date().getFullYear()} Escape in Yoga. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-warmbeige">Privacy</Link>
            <Link href="/terms" className="hover:text-warmbeige">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
