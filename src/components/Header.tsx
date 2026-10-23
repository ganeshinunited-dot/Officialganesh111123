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
      {/* Slim sand offer strip with a handwritten note */}
      <div className="bg-sand">
        <p className="mx-auto max-w-7xl px-5 py-1.5 text-center font-hand text-lg leading-snug text-terra sm:px-8">
          Special offer — a free custom domain + 1 year of fast cloud hosting with every new project
        </p>
      </div>

      {/* Sticky paper header */}
      <header
        className={`sticky top-0 z-50 bg-paper/95 backdrop-blur transition-shadow duration-300 ${
          scrolled ? 'shadow-[0_10px_36px_-16px_rgba(35,34,31,0.35)]' : 'shadow-none'
        }`}
      >
        <div
          className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-[padding] duration-300 sm:px-8 ${
            scrolled ? 'py-3' : 'py-4'
          } ${scrolled ? 'border-b border-sand' : 'border-b border-transparent'}`}
        >
          <a href="#top" className="flex items-center gap-2.5 font-display text-lg tracking-tight text-ink sm:text-xl">
            <span className="h-2.5 w-2.5 shrink-0 bg-terra" aria-hidden="true" />
            Ganesh Karki
          </a>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Main navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="font-display text-sm text-ink/75 transition-colors hover:text-terra"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="rounded-md bg-terra px-5 py-2.5 font-display text-sm text-paper transition-colors hover:bg-rust"
            >
              Contact
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink transition-colors hover:bg-sand md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        {open && (
          <nav className="border-t border-sand px-5 pb-5 pt-2 md:hidden" aria-label="Mobile navigation">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-md px-3 py-2.5 font-display text-base text-ink/90 transition-colors hover:bg-sand hover:text-terra"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="mt-2 block rounded-md bg-terra px-5 py-2.5 text-center font-display text-base text-paper"
            >
              Contact
            </a>
          </nav>
        )}
      </header>
    </>
  );
}
