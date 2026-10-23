import { Target, Zap, PenTool, Code2 } from 'lucide-react';

const TOOLS = [
  { icon: Target, label: 'Meta Ads Manager' },
  { icon: Zap, label: 'Conversions API' },
  { icon: PenTool, label: 'Figma' },
  { icon: Code2, label: 'React & TypeScript' },
];

export default function Hero() {
  return (
    <section className="bg-navy text-white">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold sm:text-sm">
          Meta Ads • UI/UX • Web Design
        </p>

        <h1 className="mt-5 max-w-3xl font-display text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
          Scaling SaaS &amp; digital products with high-impact Meta Ads.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
          Hi, I&apos;m Ganesh Karki — Meta ads specialist with deep performance marketing
          knowledge, full-stack UI/UX design craft, and expert web development.
        </p>

        <div className="mt-9 flex flex-wrap gap-4">
          <a
            href="#contact"
            className="rounded-full bg-gold px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-white sm:text-base"
          >
            Start a project
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/40 px-7 py-3 text-sm font-bold text-white transition-colors hover:border-white hover:bg-white/10 sm:text-base"
          >
            View my work
          </a>
        </div>

        <ul className="mt-12 flex flex-wrap gap-3">
          {TOOLS.map((tool) => (
            <li
              key={tool.label}
              className="flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white/90"
            >
              <tool.icon className="h-4 w-4 text-gold" />
              {tool.label}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
