import { PROJECTS, type Project } from '../data/content';

const WARM_GRADE = 'sepia-[.25] saturate-[.9] contrast-[1.02]';

function TagList({ tags }: { tags: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <li
          key={tag}
          className="rounded-md bg-sand px-3 py-1 font-display text-[11px] uppercase tracking-wider text-cocoa"
        >
          {tag}
        </li>
      ))}
    </ul>
  );
}

function Meta({ project }: { project: Project }) {
  return (
    <p className="font-display text-xs uppercase tracking-[0.18em] text-terra">
      {project.category} · {project.year}
    </p>
  );
}

export default function Projects() {
  const [feature, ...rest] = PROJECTS;
  const aspects = ['aspect-[4/3]', 'aspect-[3/2]'];

  return (
    <section id="work" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="font-display text-xs uppercase tracking-[0.22em] text-terra">
          02 — Selected Work
        </p>
        <div className="mt-5 border-t border-sand" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl lg:col-span-7">
            Featured projects
            <span className="mt-1 block -rotate-1 font-hand text-2xl font-semibold normal-case tracking-normal text-terra sm:ml-5 sm:mt-0 sm:inline-block">
              selected case studies
            </span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa lg:col-span-5">
            A selection of Meta advertising campaigns, SaaS product design systems, and modern
            web experiences.
          </p>
        </div>

        {/* Feature project */}
        <article className="mt-14 rounded-2xl border border-sand bg-paper p-4 shadow-[0_14px_36px_-20px_rgba(35,34,31,0.3)] sm:p-5">
          <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="group overflow-hidden rounded-xl lg:col-span-7">
              <img
                src={feature.image}
                alt={feature.imageAlt}
                loading="lazy"
                className={`aspect-[16/10] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${WARM_GRADE}`}
              />
            </div>
            <div className="px-1 pb-2 lg:col-span-5 lg:px-2">
              <Meta project={feature} />
              <h3 className="mt-3 font-display text-3xl tracking-tight text-ink sm:text-4xl">
                {feature.title}
              </h3>
              <p className="mt-2 font-display text-sm text-cocoa">{feature.client}</p>
              <p className="mt-4 text-lg leading-relaxed text-cocoa">{feature.tagline}</p>
              <div className="mt-6">
                <TagList tags={feature.tags} />
              </div>
            </div>
          </div>
        </article>

        {/* Remaining projects — staggered, varied ratios */}
        <div className="mt-14 grid gap-x-10 gap-y-14 md:grid-cols-2 md:items-start lg:mt-16">
          {rest.map((project, index) => (
            <article
              key={project.title}
              className={`rounded-2xl border border-sand bg-paper p-4 shadow-[0_14px_36px_-20px_rgba(35,34,31,0.3)] sm:p-5 ${
                index % 2 === 1 ? 'md:mt-16' : ''
              }`}
            >
              <div className="group overflow-hidden rounded-xl">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className={`w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] ${WARM_GRADE} ${
                    aspects[index % aspects.length]
                  }`}
                />
              </div>
              <div className="px-1 pb-2 pt-5">
                <Meta project={project} />
                <h3 className="mt-2.5 font-display text-2xl tracking-tight text-ink">
                  {project.title}
                </h3>
                <p className="mt-1 font-display text-sm text-cocoa">{project.client}</p>
                <p className="mt-3 text-lg leading-relaxed text-cocoa">{project.tagline}</p>
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
