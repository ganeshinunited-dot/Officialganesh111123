import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { BIG_NUMBERS, FOUNDER_QUOTE } from '../data/projects';

export const Methodology: React.FC = () => {
  return (
    <section id="big-numbers" className="relative py-24 sm:py-32 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            ABOUT & IMPACT
          </span>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#09090b] tracking-tight">
            Performance marketing, <br />craft, & conversion design.
          </h2>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
            I bridge the gap between strategic Meta advertising and human-centered digital design. Every ad creative, landing page, and UI interaction is engineered to maximize conversion rates and customer value.
          </p>
        </div>

        {/* Big Numbers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 items-stretch">
          {BIG_NUMBERS.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-neutral-50/80 border border-neutral-200/80 hover:border-neutral-400 transition-all flex flex-col justify-between h-full"
            >
              <div>
                <span className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-black tracking-tight block">
                  {item.value}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 mt-3">
                  {item.label}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-neutral-500 mt-4 leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Founder Quote Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 sm:p-12 rounded-3xl bg-neutral-900 text-white relative overflow-hidden shadow-xl"
        >
          <div className="relative z-10 max-w-4xl">
            <Quote className="w-10 h-10 text-neutral-600 mb-6 opacity-60" />
            <blockquote className="text-xl sm:text-3xl md:text-4xl font-display font-medium leading-snug text-neutral-100">
              &ldquo;{FOUNDER_QUOTE.quote}&rdquo;
            </blockquote>

            <div className="mt-8 flex items-center gap-4 pt-6 border-t border-neutral-800">
              <div className="w-12 h-12 rounded-full bg-white text-black font-display font-black text-base flex items-center justify-center">
                GK
              </div>
              <div>
                <span className="font-bold text-base text-white block">
                  {FOUNDER_QUOTE.author}
                </span>
                <span className="text-xs sm:text-sm text-neutral-400">
                  {FOUNDER_QUOTE.role}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
