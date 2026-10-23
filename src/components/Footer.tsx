import { NAV_LINKS } from '../data/content';

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="font-display text-xl font-bold">
              Ganesh Karki<span className="text-gold">.</span>
            </p>
            <p className="mt-1 text-sm text-white/70">Meta Ads, UI/UX &amp; Web Design</p>
          </div>

          <nav className="flex flex-wrap gap-x-6 gap-y-2" aria-label="Footer navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/80 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="text-sm font-medium text-white/80 transition-colors hover:text-white"
            >
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          <p className="text-sm text-white/60">© 2026 Ganesh Karki</p>
        </div>
      </div>
    </footer>
  );
}
