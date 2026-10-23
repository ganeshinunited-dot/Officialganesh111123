import { ABOUT_IMAGE, FOUNDER_QUOTE, STRENGTHS } from '../data/content';

export default function About() {
  return (
    <section id="about" className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">03 — About</p>
        <div className="mt-5 border-t border-white/15" aria-hidden="true" />
        <h2 className="mt-8 max-w-3xl font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl">
          Performance marketing, craft, &amp; conversion design.
        </h2>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Photo with gold offset frame */}
          <div className="relative mb-5 mr-5 lg:col-span-5">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-xl border-2 border-gold"
              aria-hidden="true"
            />
            <img
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              loading="lazy"
              className="relative aspect-[4/3] w-full rounded-xl object-cover"
            />
          </div>

          {/* Text + pull-quote */}
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-white/80">
              I bridge the gap between strategic Meta advertising and human-centered digital
              design. Every ad creative, landing page, and UI interaction is engineered to
              maximize conversion rates and customer value.
            </p>

            <figure className="mt-10 border-l-2 border-gold pl-6 sm:pl-8">
              <blockquote className="font-display text-2xl font-medium italic leading-snug text-white sm:text-[1.75rem]">
                “{FOUNDER_QUOTE}”
              </blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-white/60">
                Ganesh Karki — Meta Ads &amp; Web Design
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Strengths — 2×2 text grid with hairline dividers */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/15 ring-1 ring-white/15 sm:grid-cols-2">
          {STRENGTHS.map((strength, index) => (
            <div key={strength.title} className="bg-navy p-7 sm:p-8">
              <span className="font-display text-sm font-bold text-gold">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-lg font-semibold leading-snug text-white">
                {strength.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/65">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
