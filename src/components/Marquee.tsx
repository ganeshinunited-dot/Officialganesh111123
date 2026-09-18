import React from 'react';
import { motion } from 'motion/react';
import { BRAND_LOGOS } from '../data/projects';

export const Marquee: React.FC = () => {
  const items = [...BRAND_LOGOS, ...BRAND_LOGOS, ...BRAND_LOGOS];

  return (
    <section id="clients" className="relative w-full py-10 border-b border-neutral-100 bg-neutral-50/50 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 mb-4 text-center">
        <p className="text-xs uppercase tracking-widest text-neutral-400 font-semibold">
          Core Advertising Infrastructure, Frameworks & Tool Stack
        </p>
      </div>

      {/* Side gradient fades */}
      <div className="absolute left-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-r from-neutral-50/90 to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-20 sm:w-32 bg-gradient-to-l from-neutral-50/90 to-transparent z-10 pointer-events-none" />

      <div className="flex items-center">
        <motion.div
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            ease: 'linear',
            duration: 25,
          }}
          className="flex items-center gap-12 sm:gap-20 whitespace-nowrap will-change-transform"
        >
          {items.map((brand, idx) => (
            <div
              key={`${brand}-${idx}`}
              className="flex items-center gap-8 group cursor-default"
            >
              <span className="font-display font-extrabold text-base sm:text-xl text-neutral-400 group-hover:text-black transition-colors tracking-wider uppercase">
                {brand}
              </span>
              <span className="text-neutral-200 text-lg">•</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
