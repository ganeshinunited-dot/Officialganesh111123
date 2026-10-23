import { ARTICLES } from '../data/content';

export default function Articles() {
  return (
    <section id="articles" className="bg-white">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-gold">04 — Articles</p>
        <div className="mt-5 border-t border-ink/10" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl font-bold tracking-tight text-navy sm:text-5xl lg:col-span-7">
            Thoughts on growth &amp; design
          </h2>
          <p className="max-w-xl text-base leading-relaxed text-slate-text lg:col-span-5">
            Real-world lessons from scaling digital advertising, crafting intuitive software
            interfaces, and building lightning-fast websites.
          </p>
        </div>

        {/* Editorial index rows */}
        <div className="mt-14 border-b border-ink/10">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="group grid grid-cols-1 gap-2 border-t border-ink/10 py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-8"
            >
              <time className="text-sm font-semibold uppercase tracking-wider text-slate-text sm:col-span-2">
                {article.date}
              </time>
              <div className="sm:col-span-8">
                <h3 className="font-display text-xl font-semibold leading-snug text-navy transition-colors duration-200 group-hover:text-jwblue sm:text-2xl">
                  {article.title}
                </h3>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-text">
                  {article.excerpt}
                </p>
              </div>
              <p className="text-sm font-medium text-slate-text sm:col-span-2 sm:text-right">
                {article.readTime}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
