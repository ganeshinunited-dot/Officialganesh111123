import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { FAQ_ITEMS } from '../data/projects';
import { playSound } from '../utils/sound';

interface FAQProps {
  onOpenContact: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenContact }) => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  const toggle = (id: string) => {
    playSound('toggle');
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-neutral-50/60 border-b border-neutral-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-2 block">
            FREQUENTLY ASKED QUESTIONS
          </span>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-[#09090b] tracking-tight">
            Frequently asked questions
          </h2>
          <p className="mt-3 text-neutral-600 text-sm sm:text-base">
            Everything you need to know about Meta ad campaigns, UI/UX sprints, deliverables, and scaling milestones.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all bg-white ${
                  isOpen ? 'border-neutral-400 shadow-sm' : 'border-neutral-200/80 hover:border-neutral-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  className="w-full text-left p-4 sm:p-7 flex items-center justify-between gap-3 sm:gap-4"
                >
                  <h3 className="text-sm sm:text-lg font-bold text-neutral-900 pr-2">
                    {item.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen ? 'bg-black text-white' : 'bg-neutral-100 text-neutral-600'
                  }`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 sm:px-7 pb-5 sm:pb-7 pt-1 text-xs sm:text-base text-neutral-600 leading-relaxed border-t border-neutral-100">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-10 sm:mt-12 p-5 sm:p-8 rounded-2xl bg-white border border-neutral-200/80 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-display font-bold text-base sm:text-lg text-neutral-900">
              Still have questions about your project?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-500 mt-0.5">
              Have a specific setup, ad budget, or product challenge? I&apos;m here to advise you directly.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onOpenContact();
            }}
            className="w-full sm:w-auto min-h-[46px] px-6 py-3 rounded-full bg-black text-white font-semibold text-xs sm:text-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
          >
            <span>Ask Ganesh Directly</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
