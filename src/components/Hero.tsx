import React from 'react';
import { motion } from 'motion/react';
import { ArrowDown, ArrowUpRight, Award, CheckCircle2, TrendingUp, Sparkles, Gift } from 'lucide-react';
import { playSound } from '../utils/sound';

interface HeroProps {
  onOpenContact: () => void;
  onOpenEstimator: () => void;
  onNavigateToOffer: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onOpenEstimator, onNavigateToOffer }) => {
  const scrollToCases = () => {
    playSound('click');
    const casesElement = document.getElementById('cases');
    if (casesElement) {
      casesElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative pt-28 sm:pt-44 pb-16 sm:pb-28 bg-white overflow-hidden border-b border-neutral-100">
      {/* Subtle light background grid texture */}
      <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />

      {/* Gentle ambient glow */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-neutral-100/80 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          {/* Exclusive Client Offer Pill */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => {
              playSound('click');
              onNavigateToOffer();
            }}
            className="mb-5 sm:mb-6 cursor-pointer group inline-flex items-center gap-2 sm:gap-2.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-neutral-900 hover:bg-black text-white border border-neutral-700/80 hover:border-amber-400 shadow-sm hover:shadow-amber-500/10 transition-all text-xs active:scale-95"
            role="button"
            tabIndex={0}
          >
            <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="font-bold text-amber-300 uppercase tracking-wider text-[11px]">
              Special Offer
            </span>
            <span className="hidden sm:inline text-neutral-500">•</span>
            <span className="text-neutral-200 font-medium">
              Free Custom Domain + 1-Yr Fast Cloud Hosting ($280 Value)
            </span>
            <span className="text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform text-xs">
              →
            </span>
          </motion.div>

          {/* Main H1 Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-display font-extrabold tracking-tight text-[#09090b] leading-[1.12] sm:leading-[1.05]"
          >
            Scaling SaaS & digital products with high-impact Meta Ads.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="mt-5 sm:mt-8 text-base sm:text-xl md:text-2xl text-neutral-600 max-w-3xl leading-relaxed font-normal"
          >
            Hi, I&apos;m <strong className="text-black font-semibold">Ganesh Karki</strong>. Meta ads specialist with deep performance marketing knowledge, 100% full-stack UI/UX design craft, and expert web development.
          </motion.p>

          {/* Mobile-Friendly CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto"
          >
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onOpenContact();
              }}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-black text-white font-semibold text-sm sm:text-base tracking-tight hover:bg-neutral-800 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                onOpenEstimator();
              }}
              className="w-full sm:w-auto min-h-[48px] px-8 py-3.5 sm:py-4 rounded-full bg-white text-neutral-900 font-semibold text-sm sm:text-base tracking-tight border border-neutral-300 hover:border-black hover:bg-neutral-50 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Grow Your Brand</span>
            </button>

            <button
              type="button"
              onClick={scrollToCases}
              className="w-full sm:w-auto min-h-[44px] px-6 py-3 rounded-full text-neutral-600 hover:text-black text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Explore Work</span>
              <ArrowDown className="w-4 h-4" />
            </button>
          </motion.div>

          {/* Trust badges (neat grid on mobile) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 sm:mt-14 pt-8 border-t border-neutral-100 w-full grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap items-center justify-center gap-3 sm:gap-6 lg:gap-10 text-xs sm:text-sm text-neutral-600"
          >
            <div className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded-lg bg-neutral-50/70 sm:bg-transparent">
              <TrendingUp className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Data-Driven Meta Ad Scaling</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded-lg bg-neutral-50/70 sm:bg-transparent">
              <CheckCircle2 className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Creative Strategy &amp; Funnel CRO</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded-lg bg-neutral-50/70 sm:bg-transparent">
              <Award className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>100% UI/UX &amp; Web Craft</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded-lg bg-neutral-50/70 sm:bg-transparent">
              <Sparkles className="w-4 h-4 text-neutral-900 shrink-0" />
              <span>Server-Side CAPI &amp; Conversions</span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-2 py-1 px-2 rounded-lg bg-emerald-50/70 sm:bg-transparent text-emerald-800 sm:text-neutral-600 font-medium sm:font-normal">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 sm:text-neutral-900 shrink-0" />
              <span>Free Domain &amp; Cloud Hosting</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
