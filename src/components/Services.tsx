import { SERVICES, SERVICES_IMAGE } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">01 — Services</p>
        <div className="mt-5 border-t border-ink/10" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:col-span-7">
            Services
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-text lg:col-span-5">
            From profitable Meta ad spend to polished product design and fast, high-converting
            websites — end-to-end execution under one roof.
          </p>
        </div>

        {/* Craft banner */}
        <figure className="mt-12">
          <div className="overflow-hidden rounded-xl">
            <img
              src={SERVICES_IMAGE.src}
              alt={SERVICES_IMAGE.alt}
              loading="lazy"
              className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
            />
          </div>
          <figcaption className="mt-3 text-sm text-slate-text">{SERVICES_IMAGE.caption}</figcaption>
        </figure>

        {/* Numbered editorial rows */}
        <div className="mt-14 border-b border-ink/10">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group grid grid-cols-1 gap-1.5 border-t border-ink/10 px-4 py-6 transition-colors duration-200 hover:bg-mist sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-6 sm:py-7"
            >
              <span className="font-display text-sm font-bold text-gold sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-jwblue sm:col-span-5">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-slate-text sm:col-span-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
