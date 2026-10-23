import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS } from '../data/content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Slim gold offer strip */}
      <div className="bg-gold text-navy">
        <p className="mx-auto max-w-7xl px-5 py-2 text-center text-xs font-semibold sm:px-8 sm:text-sm">
          Special offer: free custom domain + 1-year fast cloud hosting with new web projects
        </p>
      </div>

      {/* Sticky navy header */}
      <header
        className={`sticky top-0 z-50 bg-navy transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_36px_-14px_rgba(10,26,43,0.65)]' : 'shadow-none'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 ${
            scrolled ? 'py-3' : 'py-4'
          } ${scrolled ? 'border-b border-white/10' : 'border-b border-transparent'}`}
        >
          <a href="#top" className="font-display text-lg font-bold tracking-tight text-white sm:text-xl">
            Ganesh Karki<span className="text-gold">.</span>
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
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
              className="rounded-md bg-gold px-5 py-2.5 text-sm font-bold text-navy transition-colors hover:bg-white"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-white transition-colors hover:bg-white/10 md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-white/10 px-5 pb-5 pt-2 md:hidden" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 text-base font-medium text-white/90 transition-colors hover:bg-white/10 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-md bg-gold px-5 py-2.5 text-center text-base font-bold text-navy"
            >
              Contact
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
