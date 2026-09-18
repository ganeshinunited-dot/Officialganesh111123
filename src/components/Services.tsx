import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, TrendingUp, Layout, Code2, Sparkles, Target, Database, Layers, Rocket, Gift } from 'lucide-react';
import { SERVICES } from '../data/projects';
import { playSound } from '../utils/sound';

interface ServicesProps {
  onOpenContact: (scope?: string) => void;
  onNavigateToOffer?: () => void;
}

const ICONS = [TrendingUp, Layout, Code2, Rocket, Target, Database, Layers, Sparkles];

export const Services: React.FC<ServicesProps> = ({ onOpenContact, onNavigateToOffer }) => {
  const [selectedService, setSelectedService] = useState<string | null>(null);

  return (
    <section id="services" className="relative py-24 sm:py-32 bg-neutral-50/70 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-200">
          <div>
            <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
              CORE EXPERTISE & SERVICES
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#09090b] tracking-tight">
              Full-funnel capabilities <br className="hidden sm:inline" />for high-growth brands
            </h2>
          </div>

          <p className="text-neutral-500 text-sm sm:text-base max-w-md font-normal leading-relaxed">
            From profitable Meta ad spend to 100% UI/UX mastery and high-converting web code, I provide end-to-end execution that eliminates finger-pointing and scales revenue.
          </p>
        </div>

        {/* 8 Bento Services Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICES.map((service, index) => {
            const Icon = ICONS[index % ICONS.length];
            const isSelected = selectedService === service.number;

            return (
              <motion.div
                key={service.number}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                onClick={() => {
                  playSound('toggle');
                  setSelectedService(isSelected ? null : service.number);
                }}
                className={`p-5 sm:p-7 rounded-2xl bg-white border transition-all cursor-pointer flex flex-col justify-between h-full ${
                  isSelected
                    ? 'border-black shadow-lg ring-1 ring-black'
                    : 'border-neutral-200/80 hover:border-neutral-400 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4 sm:mb-5">
                    <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-900">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-mono text-neutral-400">
                      {service.number}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900 tracking-tight">
                    {service.title}
                  </h3>

                  {service.number === '03' && (
                    <div className="mt-2">
                      {onNavigateToOffer ? (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            playSound('click');
                            onNavigateToOffer();
                          }}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-[11px] font-bold shadow-xs transition-colors"
                        >
                          <Gift className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Special Offer: Free Domain &amp; Hosting ($280)</span>
                          <ArrowUpRight className="w-3 h-3 text-emerald-600" />
                        </button>
                      ) : (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] font-bold shadow-xs">
                          <Gift className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Free Domain &amp; NVMe Hosting ($280 Value)</span>
                        </div>
                      )}
                    </div>
                  )}

                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-normal leading-relaxed">
                    {service.tagline}
                  </p>
                </div>

                <div className="mt-5 sm:mt-6 pt-4 border-t border-neutral-100">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      playSound('click');
                      onOpenContact(service.title);
                    }}
                    className="min-h-[40px] text-xs font-semibold text-neutral-900 hover:text-black flex items-center gap-1 group py-1"
                  >
                    <span>Hire for {service.title}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Highlight Banner */}
        <div className="mt-10 sm:mt-12 p-6 sm:p-10 rounded-2xl bg-black text-white flex flex-col lg:flex-row lg:items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="max-w-2xl relative z-10">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                CUSTOM GROWTH &amp; DESIGN AUDIT
              </span>
              {onNavigateToOffer ? (
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    onNavigateToOffer();
                  }}
                  className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 hover:bg-emerald-400/30 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30 font-mono transition-colors flex items-center gap-1"
                >
                  <Gift className="w-3 h-3 text-emerald-400" />
                  <span>Bonus: Free Domain + NVMe Hosting ($280 Value)</span>
                  <ArrowUpRight className="w-3 h-3" />
                </button>
              ) : (
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30 font-mono flex items-center gap-1">
                  <Gift className="w-3 h-3 text-emerald-400" />
                  <span>Bonus: Free Domain + NVMe Hosting ($280 Value)</span>
                </span>
              )}
            </div>
            <h3 className="text-xl sm:text-3xl font-display font-bold">
              Unsure whether to fix your Ads or your UI?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-2 leading-relaxed">
              Let&apos;s review your Meta Ads account and product funnel. Plus, every new web design or growth partnership includes a free 1-year custom domain and high-speed NVMe cloud hosting at $0 extra cost.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onOpenContact('Ad Account & UI/UX Audit + Free Domain Offer');
            }}
            className="w-full sm:w-auto min-h-[46px] px-6 py-3.5 rounded-full bg-white text-black font-semibold text-xs sm:text-sm hover:bg-neutral-200 transition-colors flex items-center justify-center gap-2 active:scale-95 shrink-0 self-stretch sm:self-start lg:self-auto relative z-10 shadow-sm"
          >
            <span>Request Growth Audit</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
