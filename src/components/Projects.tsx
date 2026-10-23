import { PROJECTS, type Project } from '../data/content';

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md bg-white px-3 py-1 text-xs font-semibold text-navy ring-1 ring-ink/5"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Meta({ project, light = false }: { project: Project; light?: boolean }) {
  return (
    <p
      className={`text-xs font-bold uppercase tracking-[0.18em] ${
        light ? 'text-gold' : 'text-jwblue'
      }`}
    >
      {project.category} · {project.year}
    </p>
  );
}

export default function Projects() {
  const [feature, ...rest] = PROJECTS;
  const aspects = ['aspect-[4/3]', 'aspect-[3/2]'];

  return (
    <section id="work" className="bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">02 — Selected Work</p>
        <div className="mt-5 border-t border-ink/10" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:col-span-7">
            Featured projects
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-text lg:col-span-5">
            A selection of Meta advertising campaigns, SaaS product design systems, and modern
            web experiences.
          </p>
        </div>

        {/* Feature project */}
        <article className="mt-14 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="group overflow-hidden rounded-xl lg:col-span-7">
            <img
              src={feature.image}
              alt={feature.imageAlt}
              loading="lazy"
              className="aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          </div>
          <div className="lg:col-span-5">
            <Meta project={feature} />
            <h3 className="mt-3 font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl">
              {feature.title}
            </h3>
            <p className="mt-2 text-base font-semibold text-jwblue">{feature.client}</p>
            <p className="mt-4 text-lg leading-relaxed text-slate-text">{feature.tagline}</p>
            <div className="mt-6">
              <TagList tags={feature.tags} />
            </div>
          </div>
        </article>

        {/* Remaining projects — staggered, varied ratios */}
        <div className="mt-20 grid gap-x-10 gap-y-14 md:grid-cols-2 md:items-start lg:mt-24">
          {rest.map((project, index) => (
            <article key={project.title} className={index % 2 === 1 ? 'md:mt-16' : ''}>
              <div className="group overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${
                    aspects[index % aspects.length]
                  }`}
                />
              </div>
              <div className="mt-5">
                <Meta project={project} />
                <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight text-navy">
                  {project.title}
                </h3>
                <p className="mt-1 text-sm font-semibold text-jwblue">{project.client}</p>
                <p className="mt-3 leading-relaxed text-slate-text">{project.tagline}</p>
                <div className="mt-4">
                  <TagList tags={project.tags} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
