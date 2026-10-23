import { SERVICES } from '../data/content';

export default function Services() {
  return (
    <section id="services" className="bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-jwblue sm:text-sm">
          What I do
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
          Services
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-text">
          From profitable Meta ad spend to polished product design and fast, high-converting
          websites — end-to-end execution under one roof.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-mist text-jwblue">
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-navy">
                {service.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-text">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
