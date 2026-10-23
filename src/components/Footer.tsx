import { NAV_LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-ink text-paper">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <p className="font-display text-5xl tracking-tight sm:text-6xl">
          Ganesh Karki<span className="text-terra">.</span>
        </p>
        <p className="mt-3 text-lg text-paper/65">Meta Ads, UI/UX &amp; Web Design</p>
        <p className="mt-5 -rotate-1 font-hand text-2xl font-semibold text-peach">
          handcrafted with care — Ganesh
        </p>

        <div className="mt-12 border-t border-white/15" aria-hidden="true" />

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm text-paper/75 transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="font-display text-sm text-paper/75 transition-colors hover:text-paper"
            >
              Contact
            </a>
          </nav>
          <p className="text-base text-paper/50">© 2026 Ganesh Karki</p>
        </div>
      </div>
    </footer>
  );
}
