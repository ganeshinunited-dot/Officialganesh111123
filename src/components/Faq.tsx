import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../data/content';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">05 — FAQ</p>
        <div className="mt-5 border-t border-ink/10" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:col-span-7">
            Frequently asked questions
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-text lg:col-span-5">
            Everything you need to know about Meta ad campaigns, UI/UX sprints, deliverables, and
            scaling milestones.
          </p>
        </div>

        {/* Editorial accordion */}
        <div className="mt-14 max-w-4xl border-b border-ink/10">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-t border-ink/10">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg font-semibold leading-snug text-navy sm:text-xl">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-jwblue" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-jwblue" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <p className="max-w-3xl pb-7 text-base leading-relaxed text-slate-text">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
