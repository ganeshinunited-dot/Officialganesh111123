import { Quote } from 'lucide-react';
import { FOUNDER_QUOTE, STRENGTHS } from '../data/content';

export default function About() {
  return (
    <section id="about" className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
          About &amp; impact
        </p>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-bold leading-snug sm:text-4xl">
          Performance marketing, craft, &amp; conversion design.
        </h2>

        <figure className="mt-8 max-w-3xl border-l-4 border-gold pl-5 sm:pl-6">
          <Quote className="h-6 w-6 text-gold" aria-hidden="true" />
          <blockquote className="mt-3 text-lg leading-relaxed text-white/90 sm:text-xl">
            {FOUNDER_QUOTE}
          </blockquote>
          <figcaption className="mt-3 text-sm font-semibold text-white/70">
            Ganesh Karki — Meta Ads &amp; Web Design
          </figcaption>
        </figure>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STRENGTHS.map((strength) => (
            <div key={strength.title} className="rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <h3 className="font-display text-base font-semibold leading-snug text-white">
                {strength.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {strength.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
