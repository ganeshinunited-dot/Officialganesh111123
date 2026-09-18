import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, User } from 'lucide-react';
import { playSound } from '../utils/sound';
import { BrandLogo } from './BrandLogo';

export const ComingSoonPartnerCard: React.FC = () => {
  const [cheerCount, setCheerCount] = useState<number>(54);
  const [hasCheered, setHasCheered] = useState<boolean>(false);
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('ganesh_partner_cheers');
    if (saved) {
      setCheerCount(parseInt(saved, 10));
    }
    const cheered = localStorage.getItem('ganesh_partner_has_cheered');
    if (cheered) {
      setHasCheered(true);
    }
  }, []);

  const handleCheer = () => {
    playSound('success');
    const newCount = cheerCount + 1;
    setCheerCount(newCount);
    setHasCheered(true);
    localStorage.setItem('ganesh_partner_cheers', newCount.toString());
    localStorage.setItem('ganesh_partner_has_cheered', 'true');

    // Spawn heart particles
    const newHearts = Array.from({ length: 6 }).map((_, i) => ({
      id: Date.now() + i,
      x: (Math.random() - 0.5) * 80,
    }));
    setFloatingHearts((prev) => [...prev, ...newHearts]);

    setTimeout(() => {
      setFloatingHearts([]);
    }, 2000);
  };

  return (
    <div className="relative mb-14 rounded-3xl p-[2px] overflow-hidden shadow-2xl group">
      {/* Google Gemini animated rotating color border (color kudne effect) */}
      <div
        className="absolute inset-[-200%] animate-gemini-spin pointer-events-none"
        style={{
          background:
            'conic-gradient(from 0deg at 50% 50%, #4285F4 0deg, #9B72CF 60deg, #E879F9 120deg, #F43F5E 180deg, #FB923C 240deg, #38BDF8 300deg, #4285F4 360deg)',
        }}
      />

      {/* Inner Card content container */}
      <div className="relative rounded-[22px] bg-neutral-950 p-5 sm:p-10 overflow-hidden z-10">
        {/* Subtle interior atmospheric glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-rose-500/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          {/* Title & Narrative */}
          <div className="max-w-3xl mb-6 sm:mb-8">
            <h3 className="text-xl sm:text-4xl font-display font-extrabold text-white tracking-tight leading-snug">
              Something Coming Soon...{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-200 via-rose-200 to-amber-100">
                She&apos;s Preparing.
              </span>
            </h3>
            <p className="mt-3 text-neutral-300 text-xs sm:text-base leading-relaxed">
              Behind this journey is a strong creative partnership. She is quietly learning, honing her craft, and preparing behind the scenes.
            </p>
            <p className="mt-2 text-neutral-400 text-xs sm:text-sm leading-relaxed">
              <strong className="text-white font-semibold">&ldquo;Coming Soon&rdquo;</strong> means she will officially step into the studio to co-lead the next era beside me—marking the start of our creative collaboration.
            </p>
          </div>

          {/* The Duo Collaboration Preview Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-11 gap-3 sm:gap-4 items-center pt-2 pb-6">
            {/* Card 1: Ganesh */}
            <div className="lg:col-span-5 p-4 sm:p-5 rounded-2xl bg-neutral-900/90 border border-neutral-800 hover:border-neutral-700 transition-all flex items-center gap-3 sm:gap-4">
              <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 shadow-inner">
                <BrandLogo variant="light" size="md" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white tracking-tight">Ganesh Karki</h4>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-[10px] text-emerald-400 font-mono">
                    Active
                  </span>
                </div>
                <p className="text-neutral-400 text-xs mt-0.5">
                  Meta Ads Scaling • 100% UI/UX • Web Dev
                </p>
              </div>
            </div>

            {/* Center Connector */}
            <div className="lg:col-span-1 flex flex-col items-center justify-center py-1 sm:py-2 lg:py-0">
              <div className="w-8 h-8 rounded-full bg-neutral-800/90 border border-neutral-700 flex items-center justify-center text-rose-400 shadow-md">
                <Heart className="w-4 h-4 fill-rose-500/20 text-rose-400" />
              </div>
              <span className="text-[9px] font-mono text-neutral-400 mt-1 uppercase tracking-widest hidden lg:block">
                &amp;
              </span>
            </div>

            {/* Card 2: Future Partner — Gemini rounded card with rotating color border */}
            <div className="lg:col-span-5 relative rounded-2xl p-[1.5px] overflow-hidden shadow-xl group/partner">
              <div
                className="absolute inset-[-200%] animate-gemini-spin-slow pointer-events-none"
                style={{
                  background:
                    'conic-gradient(from 0deg at 50% 50%, #4285F4, #9B72CF, #F43F5E, #FB923C, #38BDF8, #4285F4)',
                }}
              />
              <div className="relative rounded-[14px] bg-neutral-900/95 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 z-10">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-neutral-800 border border-neutral-700 flex items-center justify-center shrink-0 shadow-inner">
                  <User className="w-5 h-5 text-neutral-300" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold text-white tracking-tight">Future Creative Co-Pilot</h4>
                    <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 border border-rose-500/30 text-[10px] text-rose-300 font-mono">
                      She&apos;s Preparing
                    </span>
                  </div>
                  <p className="text-neutral-400 text-xs mt-0.5">
                    Creative Direction &amp; Strategy • Coming Soon
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Action / Cheering Area */}
          <div className="mt-4 pt-5 sm:pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-neutral-400 text-center sm:text-left">
              <span>Currently deep in learning &amp; preparation. Exciting things ahead!</span>
            </div>

            <div className="relative w-full sm:w-auto">
              {/* Cheer Button */}
              <button
                type="button"
                onClick={handleCheer}
                className={`w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all active:scale-95 ${
                  hasCheered
                    ? 'bg-neutral-800 text-rose-300 border border-rose-900/50'
                    : 'bg-white text-black hover:bg-neutral-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${hasCheered ? 'fill-rose-400 text-rose-400' : 'text-rose-500'}`} />
                <span>{hasCheered ? 'Cheered!' : 'Cheer Her Preparation'}</span>
                <span className="px-1.5 py-0.5 rounded-md bg-neutral-900 text-neutral-300 text-[10px] font-mono border border-neutral-700">
                  {cheerCount}
                </span>
              </button>

              {/* Floating Heart Particles */}
              <AnimatePresence>
                {floatingHearts.map((heart) => (
                  <motion.div
                    key={heart.id}
                    initial={{ opacity: 1, y: 0, x: heart.x, scale: 0.8 }}
                    animate={{ opacity: 0, y: -60, scale: 1.4 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.5, ease: 'easeOut' }}
                    className="absolute left-1/2 bottom-full pointer-events-none text-rose-400"
                  >
                    <Heart className="w-4 h-4 fill-rose-500 text-rose-400" />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
