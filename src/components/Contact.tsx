import { MessageCircle, Phone } from 'lucide-react';
import { CONTACT } from '../data/content';

export default function Contact() {
  return (
    <section id="contact" className="bg-gold">
      <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 sm:py-20">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Want to grow your brand?
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-navy/80">
          Have a specific setup, ad budget, or product challenge? Discuss your project directly —
          direct communication, no locked contracts.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href={CONTACT.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-navy px-7 py-3 text-sm font-bold text-white transition-colors hover:bg-jwblue sm:text-base"
          >
            <MessageCircle className="h-5 w-5" />
            Chat on WhatsApp
          </a>
          <a
            href={CONTACT.phoneHref}
            className="flex items-center gap-2 rounded-full border-2 border-navy px-7 py-3 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white sm:text-base"
          >
            <Phone className="h-5 w-5" />
            {CONTACT.phoneDisplay}
          </a>
        </div>
      </div>
    </section>
  );
}
