import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Gift } from 'lucide-react';
import { playSound } from '../utils/sound';
import { BrandLogo } from './BrandLogo';

interface NavigationProps {
  onOpenContact: (initialScope?: string) => void;
  onOpenEstimator: () => void;
  onNavigateToOffer: () => void;
  currentView?: 'home' | 'offer';
}

export const Navigation: React.FC<NavigationProps> = ({ 
  onOpenContact, 
  onOpenEstimator, 
  onNavigateToOffer,
  currentView = 'home'
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Stack', href: '#clients' },
    { name: 'Selected Work', href: '#cases' },
    { name: 'Services', href: '#services' },
    { name: 'Growth Plan', href: '#estimator' },
    { name: 'About & Focus', href: '#big-numbers' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Insights', href: '#blog' },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    playSound('click');
    setMobileMenuOpen(false);
    if (currentView !== 'home') {
      window.location.hash = href;
      setTimeout(() => {
        const target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return;
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'py-2 sm:py-3' : 'py-3 sm:py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav className="bg-white/95 backdrop-blur-md rounded-full px-3.5 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between border border-black/10 shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06)] transition-all">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                playSound('click');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="flex items-center justify-center p-1 rounded-full hover:bg-neutral-100/80 active:scale-95 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-black shrink-0"
              aria-label="Ganesh Karki - Back to Top"
            >
              <BrandLogo variant="dark" size="md" />
            </a>

            {/* Desktop Navigation Links (shown on lg+ screens to prevent tablet header cramping) */}
            <div className="hidden lg:flex items-center gap-3 xl:gap-6">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="text-xs xl:text-sm font-medium text-neutral-600 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}

              {/* Special Offer Pill */}
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onNavigateToOffer();
                }}
                className="text-xs font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 px-3 py-1.5 rounded-full border border-amber-200/80 transition-all flex items-center gap-1.5 shadow-xs"
              >
                <Gift className="w-3.5 h-3.5 text-amber-600" />
                <span>Special Offer</span>
              </button>
            </div>

            {/* CTA Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onOpenEstimator();
                }}
                className="hidden xl:inline-flex items-center px-4 py-2 rounded-full text-xs font-semibold text-neutral-700 hover:text-black border border-neutral-200 hover:border-black/30 hover:bg-neutral-50 transition-all"
              >
                Estimate Project
              </button>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onOpenContact();
                }}
                className="inline-flex items-center gap-1.5 px-3 sm:px-5 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-all shadow-sm active:scale-95 min-h-[38px]"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              {/* Mobile & Tablet Hamburger (Min 44x44px touch target) */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setMobileMenuOpen(!mobileMenuOpen);
                }}
                className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-neutral-800 hover:text-black hover:bg-neutral-100 active:bg-neutral-200 transition-colors"
                aria-label="Toggle menu"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile & Tablet Drawer & Backdrop Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-xs lg:hidden"
            />

            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.98 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-x-3 sm:inset-x-4 top-18 sm:top-20 z-50 bg-white rounded-3xl border border-black/10 shadow-2xl p-5 sm:p-6 lg:hidden max-w-lg mx-auto"
            >
              <div className="flex flex-col space-y-1">
                {/* Special Offer Mobile Banner */}
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setMobileMenuOpen(false);
                    onNavigateToOffer();
                  }}
                  className="w-full text-sm font-semibold text-amber-900 bg-amber-50 hover:bg-amber-100 py-3 px-3.5 rounded-2xl transition-colors border border-amber-200/80 flex items-center justify-between mb-2 shadow-xs"
                >
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Special Offer: Free Domain &amp; Hosting</span>
                  </div>
                  <span className="text-[11px] bg-amber-200 text-amber-900 px-2 py-0.5 rounded-full font-bold shrink-0">
                    $280 Value
                  </span>
                </button>

                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => handleLinkClick(e, link.href)}
                    className="text-base font-semibold text-neutral-800 hover:text-black py-3 px-3 rounded-xl hover:bg-neutral-50 active:bg-neutral-100 transition-colors border-b border-neutral-100/80 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400" />
                  </a>
                ))}

                <div className="pt-4 flex flex-col gap-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setMobileMenuOpen(false);
                      onOpenEstimator();
                    }}
                    className="w-full min-h-[46px] rounded-full text-sm font-semibold text-neutral-800 border border-neutral-300 hover:bg-neutral-50 active:bg-neutral-100 text-center transition-all flex items-center justify-center"
                  >
                    Estimate Project Scope & Budget
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setMobileMenuOpen(false);
                      onOpenContact();
                    }}
                    className="w-full min-h-[46px] rounded-full text-sm font-semibold text-white bg-black hover:bg-neutral-800 active:scale-[0.98] text-center flex items-center justify-center gap-2 shadow-sm transition-all"
                  >
                    <span>Start a Project</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
