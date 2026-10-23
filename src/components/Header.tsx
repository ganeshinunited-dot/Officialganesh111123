import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Slim gold offer strip */}
      <div className="bg-gold text-navy">
        <p className="mx-auto max-w-6xl px-4 py-2 text-center text-xs font-semibold sm:text-sm">
          Special offer: free custom domain + 1-year fast cloud hosting with new web projects
        </p>
      </div>

      {/* Sticky navy header */}
      <header className="sticky top-0 z-50 bg-navy shadow-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
          <a href="#top" className="font-display text-lg font-bold text-white sm:text-xl">
            Ganesh Karki<span className="text-gold">.</span>
          </a>

          <nav className="hidden items-center gap-7 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-white/85 transition-colors hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-full bg-gold px-5 py-2 text-sm font-bold text-navy transition-colors hover:bg-white"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-white/10 px-4 pb-4 pt-2 md:hidden" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-full bg-gold px-5 py-2.5 text-center text-base font-bold text-navy"
            >
              Contact
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
