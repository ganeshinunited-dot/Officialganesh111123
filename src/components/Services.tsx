import { SERVICES } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="font-display text-xs uppercase tracking-[0.22em] text-terra">01 — Services</p>
        <div className="mt-5 border-t border-sand" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl lg:col-span-7">
            Services
            <span className="mt-1 block -rotate-1 font-hand text-2xl font-semibold normal-case tracking-normal text-terra sm:ml-5 sm:mt-0 sm:inline-block">
              what I can do for you
            </span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa lg:col-span-5">
            From profitable Meta ad spend to polished product design and fast, high-converting
            websites — end-to-end execution under one roof.
          </p>
        </div>

        {/* Numbered editorial rows */}
        <div className="mt-14 border-b border-sand">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group grid grid-cols-1 gap-1.5 border-t border-sand px-4 py-6 transition-colors duration-200 hover:bg-sand/60 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:px-6 sm:py-7"
            >
              <span className="font-display text-sm text-terra sm:col-span-1">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-terra sm:col-span-5">
                {service.title}
              </h3>
              <p className="text-lg leading-relaxed text-cocoa sm:col-span-6">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
