import { PROJECTS } from '../data/content';

const PANELS = [
  { panel: 'bg-navy', panelText: 'text-white', panelMuted: 'text-white/70' },
  { panel: 'bg-jwblue', panelText: 'text-white', panelMuted: 'text-white/75' },
  { panel: 'bg-gold', panelText: 'text-navy', panelMuted: 'text-navy/70' },
];

export default function Projects() {
  return (
    <section id="work" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-jwblue sm:text-sm">
          Selected work
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
          Featured projects
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-text">
          A selection of Meta advertising campaigns, SaaS product design systems, and modern
          web experiences.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, index) => {
            const theme = PANELS[index % PANELS.length];
            return (
              <article
                key={project.title}
                className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5 transition-shadow hover:shadow-md"
              >
                <div className={`${theme.panel} flex h-36 flex-col justify-end p-5`}>
                  <p
                    className={`${theme.panelMuted} text-xs font-bold uppercase tracking-widest`}
                  >
                    {project.category}
                  </p>
                  <p className={`${theme.panelText} mt-1 font-display text-lg font-bold`}>
                    {project.year}
                  </p>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-bold text-navy">{project.title}</h3>
                  <p className="mt-1 text-sm font-medium text-jwblue">{project.client}</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-text">
                    {project.tagline}
                  </p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full bg-mist px-3 py-1 text-xs font-semibold text-navy"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
