import { HERO_IMAGE, PROJECTS, SERVICES } from '../data/content';

const STATS = [
  { value: String(PROJECTS.length), label: 'Featured case studies' },
  { value: String(SERVICES.length), label: 'Core services' },
  { value: '10', label: 'Tools & platforms' },
];

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-5 pb-14 pt-14 sm:px-8 sm:pt-20 lg:pb-20 lg:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Copy */}
          <div className="lg:col-span-6">
            <p className="flex items-center gap-2.5 text-sm font-semibold text-white/85">
              <span className="h-2 w-2 shrink-0 rounded-full bg-gold" aria-hidden="true" />
              Available for new projects
            </p>

            <h1 className="mt-6 font-display text-[clamp(2.8rem,6vw,4.6rem)] font-bold leading-[1.04] tracking-tight">
              Scaling SaaS &amp; digital products with high-impact Meta Ads.
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/75">
              Hi, I&apos;m Ganesh Karki — Meta ads specialist with deep performance marketing
              knowledge, full-stack UI/UX design craft, and expert web development.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#contact"
                className="rounded-md bg-gold px-7 py-3.5 text-base font-bold text-navy transition-colors hover:bg-white"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="rounded-md border border-white/35 px-7 py-3.5 text-base font-bold text-white transition-colors hover:border-white hover:bg-white/10"
              >
                View my work
              </a>
            </div>
          </div>

          {/* Photo */}
          <div className="relative lg:col-span-6">
            <div className="relative overflow-hidden rounded-xl">
              <img
                src={HERO_IMAGE.src}
                alt={HERO_IMAGE.alt}
                loading="eager"
                className="aspect-[4/3] w-full object-cover lg:aspect-[5/4]"
              />
            </div>
            <div className="relative z-10 mx-5 -mt-10 max-w-xs rounded-lg bg-navy p-5 shadow-[0_18px_44px_-14px_rgba(0,0,0,0.55)] ring-1 ring-white/15 sm:mx-0 sm:ml-8 lg:absolute lg:-bottom-8 lg:left-8 lg:mx-0 lg:mt-0">
              <p className="font-display text-sm font-bold leading-snug text-white">
                Meta Ads · UI/UX · Web Design
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/65">
                One partner, end to end.
              </p>
            </div>
          </div>
        </div>

        {/* Counts strip */}
        <div className="mt-20 grid grid-cols-1 gap-8 border-t border-white/15 pt-9 sm:grid-cols-3 lg:mt-24">
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-4">
              <span className="font-display text-4xl font-bold text-gold">{stat.value}</span>
              <span className="text-sm font-medium leading-snug text-white/70">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
