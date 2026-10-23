import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="bg-gold">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-navy/60">06 — Contact</p>
        <div className="mt-5 border-t border-navy/15" aria-hidden="true" />

        <h2 className="mt-10 max-w-3xl font-display text-[clamp(2.4rem,5.5vw,4rem)] font-bold leading-[1.05] tracking-tight text-navy">
          Want to grow your brand?
        </h2>
        <p className="mt-5 max-w-xl text-lg leading-relaxed text-navy/80">
          Have a specific setup, ad budget, or product challenge? Discuss your project directly —
          direct communication, no locked contracts.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5 rounded-md bg-white px-7 py-3.5 text-base font-bold text-navy shadow-[0_14px_30px_-12px_rgba(22,50,79,0.45)] transition-colors hover:bg-navy hover:text-white"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2.5 rounded-md bg-navy px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-jwblue"
          >
            <Phone className="h-5 w-5" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
