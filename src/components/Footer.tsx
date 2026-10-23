import { NAV_LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-16 sm:px-8 sm:pt-20">
        <p className="font-display text-5xl font-bold tracking-tight sm:text-6xl">
          Ganesh Karki<span className="text-gold">.</span>
        </p>
        <p className="mt-3 text-base text-white/65">Meta Ads, UI/UX &amp; Web Design</p>

        <div className="mt-12 border-t border-white/15" aria-hidden="true" />

        <div className="flex flex-col gap-5 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap gap-x-7 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/75 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-medium text-white/75 transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>
          <p className="text-sm text-white/50">© 2026 Ganesh Karki</p>
        </div>
      </div>
    </footer>
  );
}
