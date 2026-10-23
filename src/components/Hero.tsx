import { HERO_IMAGE, PROJECTS, SERVICES } from '../data/content';

const STATS = [
  { value: String(PROJECTS.length), label: 'Featured case studies' },
  { value: String(SERVICES.length), label: 'Core services' },
  { value: '10', label: 'Tools & platforms' },
];

export default function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-12 sm:px-8 sm:pt-16 lg:pb-20 lg:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <p className="-rotate-2 font-hand text-2xl font-semibold text-terra sm:text-3xl">
              namaste, I&apos;m Ganesh —
            </p>

            <h1 className="mt-5 font-display text-[clamp(2.8rem,6vw,4.6rem)] leading-[1.06] tracking-tight text-ink">
              Scaling SaaS &amp; digital products with high-impact{' '}
              <span className="font-serif-body italic text-terra">Meta Ads</span>.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-cocoa">
              Hi, I&apos;m Ganesh Karki — Meta ads specialist with deep performance marketing
              knowledge, full-stack UI/UX design craft, and expert web development.
            </p>

            <p className="mt-7 flex items-center gap-2.5 text-base font-medium text-ink/85">
              <span className="h-2 w-2 shrink-0 rounded-full bg-sage" aria-hidden="true" />
              Available for new projects
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-md bg-terra px-7 py-3.5 font-display text-base text-paper transition-colors hover:bg-rust"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="rounded-md border border-ink/40 px-7 py-3.5 font-display text-base text-ink transition-colors hover:border-ink hover:bg-sand"
              >
                View my work
              </a>
            </div>
          </div>

          {/* Illustration */}
          <div className="relative mb-6 lg:col-span-6">
            <div
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-[2rem] bg-sand"
              aria-hidden="true"
            />
            <div className="relative overflow-hidden rounded-[2rem]">
              <img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                loading="eager"
                className="aspect-[3/2] w-full object-cover"
              />
            </div>
            <div className="relative z-10 mx-5 -mt-10 max-w-xs rounded-lg bg-paper p-5 shadow-[0_18px_44px_-14px_rgba(35,34,31,0.35)] ring-1 ring-sand sm:mx-0 sm:ml-8 lg:absolute lg:-bottom-8 lg:left-8 lg:mx-0 lg:mt-0">
              <p className="font-display text-sm leading-snug text-ink">
                Meta Ads · UI/UX · Web Design
              </p>
              <p className="mt-1.5 text-base leading-relaxed text-cocoa">
                One partner, end to end.
              </p>
            </div>
          </div>
        </div>

        {/* Counts strip */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-sand pt-9 sm:grid-cols-3 lg:mt-24">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-4">
              <span className="font-display text-4xl text-terra">{stat.value}</span>
              <span className="font-display text-xs font-medium uppercase leading-snug tracking-[0.14em] text-cocoa">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
