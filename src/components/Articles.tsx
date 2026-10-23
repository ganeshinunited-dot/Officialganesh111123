import { Calendar, Clock } from 'lucide-react';
import { ARTICLES } from '../data/content';

export default function Articles() {
  return (
    <section id="articles" className="bg-mist">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-jwblue sm:text-sm">
          Articles &amp; growth essays
        </p>
        <h2 className="mt-3 font-display text-3xl font-bold text-navy sm:text-4xl">
          Thoughts on growth &amp; design
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-slate-text">
          Real-world lessons from scaling digital advertising, crafting intuitive software
          interfaces, and building lightning-fast websites.
        </p>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ARTICLES.map((article) => (
            <article
              key={article.title}
              className="flex flex-col rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-medium text-slate-text">
                <span className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-jwblue" />
                  {article.date}
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-jwblue" />
                  {article.readTime}
                </span>
              </div>
              <h3 className="mt-4 font-display text-base font-semibold leading-snug text-navy">
                {article.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-text">{article.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
