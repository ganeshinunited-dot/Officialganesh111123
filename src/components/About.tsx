import { ABOUT_IMAGE, FOUNDER_QUOTE, STRENGTHS } from '../data/content';

export default function About() {
  return (
    <section id="about" className="bg-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="font-display text-xs uppercase tracking-[0.22em] text-terra">03 — About</p>
        <div className="mt-5 border-t border-ink/10" aria-hidden="true" />
        <h2 className="mt-8 max-w-3xl font-display text-4xl leading-[1.12] tracking-tight text-ink sm:text-5xl">
          Performance marketing, craft, &amp; conversion design.
          <span className="mt-1 block -rotate-1 font-hand text-2xl font-semibold normal-case tracking-normal text-terra sm:ml-5 sm:mt-0 sm:inline-block">
            a little about me
          </span>
        </h2>

        <div className="mt-14 grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
          {/* Illustration with terra-tinted offset frame */}
          <div className="relative mb-5 mr-5 lg:col-span-5">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[1.5rem] border-2 border-terra/50"
              aria-hidden="true"
            />
            <img
              src={ABOUT_IMAGE.src}
              alt={ABOUT_IMAGE.alt}
              loading="lazy"
              className="relative aspect-[3/2] w-full rounded-[1.5rem] object-cover"
            />
          </div>

          {/* Text + pull-quote */}
          <div className="lg:col-span-7">
            <p className="max-w-2xl text-lg leading-relaxed text-ink/85">
              I bridge the gap between strategic Meta advertising and human-centered digital
              design. Every ad creative, landing page, and UI interaction is engineered to
              maximize conversion rates and customer value.
            </p>

            <figure className="mt-10 border-l-2 border-terra pl-6 sm:pl-8">
              <blockquote className="font-serif-body text-2xl font-medium italic leading-snug text-ink sm:text-3xl">
                “{FOUNDER_QUOTE}”
              </blockquote>
              <figcaption className="mt-4 font-display text-sm text-cocoa">
                Ganesh Karki — Meta Ads &amp; Web Design
              </figcaption>
            </figure>
          </div>
        </div>

        {/* Strengths — 2×2 text grid with hairline dividers */}
        <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-ink/10 ring-1 ring-ink/10 sm:grid-cols-2">
          {STRENGTHS.map((strength, index) => (
            <div key={strength.title} className="bg-sand p-7 sm:p-8">
              <span className="font-display text-sm text-terra">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="mt-3 font-display text-lg leading-snug text-ink">
                {strength.title}
              </h3>
              <p className="mt-2 leading-relaxed text-cocoa">{strength.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
