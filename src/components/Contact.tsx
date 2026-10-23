import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="bg-terra text-paper">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="font-display text-xs uppercase tracking-[0.22em] text-peach">06 — Contact</p>
        <div className="mt-5 border-t border-paper/25" aria-hidden="true" />

        <p className="mt-10 -rotate-1 font-hand text-2xl font-semibold text-peach sm:text-3xl">
          let&apos;s build something good
        </p>
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4rem)] leading-[1.05] tracking-tight text-paper">
          Want to grow your brand?
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-paper/85">
          Have a specific setup, ad budget, or product challenge? Discuss your project directly —
          direct communication, no locked contracts.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-md bg-paper px-7 py-3.5 font-display text-base text-ink shadow-[0_14px_30px_-12px_rgba(35,34,31,0.5)] transition-colors hover:bg-peach"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2.5 rounded-md border border-paper/70 px-7 py-3.5 font-display text-base text-paper transition-colors hover:bg-paper/10"
          >
            <Phone className="h-5 w-5" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
