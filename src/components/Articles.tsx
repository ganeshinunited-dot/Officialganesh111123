import { ARTICLES } from '../data/content';

export default function Articles() {
  return (
    <section id="articles" className="bg-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        {/* Editorial section header */}
        <p className="font-display text-xs uppercase tracking-[0.22em] text-terra">
          Articles &amp; Growth Essays
        </p>
        <div className="mt-5 border-t border-sand" aria-hidden="true" />
        <div className="mt-8 grid gap-6 lg:grid-cols-12 lg:items-end">
          <h2 className="font-display text-4xl tracking-tight text-ink sm:text-5xl lg:col-span-7">
            Thoughts on growth &amp; design
            <span className="mt-1 block -rotate-1 font-hand text-2xl font-semibold normal-case tracking-normal text-terra sm:ml-5 sm:mt-0 sm:inline-block">
              notes &amp; essays
            </span>
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-cocoa lg:col-span-5">
            Real-world lessons from scaling digital advertising, crafting intuitive software
            interfaces, and building lightning-fast websites.
          </p>
        </div>

        {/* Editorial index rows */}
        <div className="mt-14 border-b border-sand">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="group grid grid-cols-1 gap-2 border-t border-sand py-7 sm:grid-cols-12 sm:items-baseline sm:gap-6 sm:py-8"
            >
              <time className="font-display text-sm uppercase tracking-wider text-cocoa sm:col-span-2">
                {article.date}
              </time>
              <div className="sm:col-span-8">
                <h3 className="font-display text-xl leading-snug text-ink transition-colors duration-200 group-hover:text-terra sm:text-2xl">
                  {article.title}
                </h3>
                {article.author && (
                  <p className="mt-1.5 font-display text-sm uppercase tracking-wider text-terra">
                    By {article.author}
                  </p>
                )}
                <p className="mt-2 max-w-2xl leading-relaxed text-cocoa">{article.excerpt}</p>
              </div>
              <p className="font-display text-sm text-cocoa sm:col-span-2 sm:text-right">
                {article.readTime}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
