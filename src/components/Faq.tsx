import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { FAQS } from '../data/content';

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="font-display text-xs uppercase tracking-[0.22em] text-terra">05 — FAQ</p>
        <div className="mt-5 border-t border-sand" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl lg:col-span-7">
            Frequently asked questions
            <span className="mt-1 block -rotate-1 font-hand text-2xl font-semibold normal-case tracking-normal text-terra sm:ml-5 sm:mt-0 sm:inline-block">
              good questions
            </span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa lg:col-span-5">
            Everything you need to know about Meta ad campaigns, UI/UX sprints, deliverables, and
            scaling milestones.
          </p>
        </div>

        {/* Editorial accordion */}
        <div className="mt-14 max-w-4xl border-b border-sand">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={faq.question} className="border-t border-sand">
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-7"
                  aria-expanded={isOpen}
                >
                  <span className="font-display text-lg leading-snug text-ink sm:text-xl">
                    {faq.question}
                  </span>
                  {isOpen ? (
                    <Minus className="h-5 w-5 shrink-0 text-terra" aria-hidden="true" />
                  ) : (
                    <Plus className="h-5 w-5 shrink-0 text-terra" aria-hidden="true" />
                  )}
                </button>
                {isOpen && (
                  <p className="max-w-3xl pb-7 text-lg leading-relaxed text-cocoa">
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
