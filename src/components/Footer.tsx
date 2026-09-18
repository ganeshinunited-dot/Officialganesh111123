import React, { useState } from 'react';
import { ArrowUp, ArrowUpRight, CheckCircle2, Mail, Send, Phone } from 'lucide-react';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';
import { BrandLogo } from './BrandLogo';
import { ComingSoonPartnerCard } from './ComingSoonPartnerCard';

interface FooterProps {
  onOpenContact: () => void;
  onNavigateToOffer?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateToOffer }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    company: '',
    email: '',
    service: 'Meta Ads Scaling & Optimization',
    budget: '$3,500 – $8,000',
    details: ''
  });

  const scrollToTop = () => {
    playSound('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 6000);
  };

  return (
    <footer className="relative bg-neutral-900 text-white pt-24 pb-12 overflow-hidden">
      {/* Contact Section */}
      <div id="contato" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 border-b border-neutral-800">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Copy & Direct Channels */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-xs uppercase tracking-widest text-neutral-400 font-semibold mb-3 block">
                LET&apos;S CONNECT
              </span>
              <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight leading-tight">
                Your next growth <br />milestone starts here
              </h2>
              <p className="mt-4 text-neutral-400 text-sm sm:text-base leading-relaxed">
                Whether you need to scale Meta ad performance with high-ROAS systems or revamp your product with 100% world-class UI/UX design, let&apos;s build together.
              </p>

              <div className="mt-8 space-y-3 text-xs sm:text-sm text-neutral-300">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Comprehensive ad account and UX funnel review</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Clear technical & creative roadmap to hit target ROAS</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Guaranteed response within 24 hours</span>
                </div>
              </div>
            </div>

            {/* Direct Contacts */}
            <div className="mt-10 pt-8 border-t border-neutral-800 space-y-4">
              <a
                href="mailto:ganeshmaankarki0@gmail.com"
                className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center text-neutral-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 block">Direct Email</span>
                  <span className="font-mono text-white font-medium">ganeshmaankarki0@gmail.com</span>
                </div>
              </a>

              <a
                href="https://wa.me/9779842902535"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-neutral-300 hover:text-white transition-colors"
              >
                <div className="w-9 h-9 rounded-full bg-neutral-800 flex items-center justify-center">
                  <WhatsAppIcon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] text-neutral-500 block">Phone & WhatsApp</span>
                  <span className="font-medium text-white">+977 9842902535</span>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Proposal Form */}
          <div className="lg:col-span-7 bg-neutral-950 p-5 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl">
            <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-2">
              Tell me about your product or brand.
            </h3>
            <p className="text-xs text-neutral-400 mb-6">
              Fill out the details below and I will get back to you with strategic recommendations and availability.
            </p>

            {formSubmitted ? (
              <div className="py-12 text-center bg-neutral-900/60 rounded-2xl border border-neutral-800 p-6 sm:p-8">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="text-xl font-display font-bold text-white">Proposal received successfully!</h4>
                <p className="text-sm text-neutral-400 mt-2 max-w-md mx-auto">
                  Thank you for reaching out. I will review your requirements and reply within 24 business hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-white transition-colors min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Phone / WhatsApp*
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-white transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Company / Brand*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Brand or product name"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-white transition-colors min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                      Work Email*
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-white transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                    Primary Service Needed*
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white text-base sm:text-sm focus:outline-none focus:border-white transition-colors min-h-[44px]"
                  >
                    <option value="Meta Ads Scaling & Optimization">Meta Ads Scaling & Optimization</option>
                    <option value="Full-Stack UI/UX Product Design">Full-Stack UI/UX Product Design (100%)</option>
                    <option value="High-Converting Web Development">High-Converting Web Development</option>
                    <option value="SaaS Growth Strategy & Retention">SaaS Growth Strategy & Retention</option>
                    <option value="Meta CAPI & Tracking Infrastructure">Meta CAPI & Tracking Infrastructure</option>
                    <option value="Monthly Growth Retainer">Monthly Growth Retainer</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                    Target Monthly Budget
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['$1,500 – $3,500', '$3,500 – $8,000', '$8,000+'].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setFormData({ ...formData, budget: tier })}
                        className={`py-2.5 px-2 rounded-xl border text-[11px] sm:text-xs font-semibold transition-all min-h-[42px] ${
                          formData.budget === tier
                            ? 'bg-white text-black border-white shadow-xs'
                            : 'bg-neutral-900 text-neutral-400 border-neutral-800 hover:border-neutral-700 active:bg-neutral-800'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                    Project Details & Growth Goals
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Share your current ROAS, product link, target timeline, or main pain point..."
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500 text-base sm:text-sm focus:outline-none focus:border-white transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[50px] py-3.5 rounded-xl bg-white text-black font-semibold text-base sm:text-sm hover:bg-neutral-200 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg mt-4"
                >
                  <span>Send Project Proposal</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer Details */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Coming Soon: She's Preparing Feature Card */}
        <ComingSoonPartnerCard />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-12 border-b border-neutral-800 text-xs text-neutral-400">
          <div>
            <div className="mb-4 flex items-center">
              <button
                type="button"
                onClick={scrollToTop}
                className="p-1.5 -ml-1.5 rounded-full hover:bg-white/10 active:scale-95 transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-white flex items-center justify-center"
                aria-label="Ganesh Karki - Back to Top"
              >
                <BrandLogo variant="light" size="lg" />
              </button>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-xs">
              Meta advertising mastery, 100% UI/UX product design, and high-converting web development.
            </p>
            <p className="text-neutral-500 text-[11px] mt-2 font-mono">
              Kathmandu & Remote Worldwide
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              SERVICES &amp; OFFERS
            </h4>
            <ul className="space-y-2">
              {onNavigateToOffer && (
                <li>
                  <button
                    type="button"
                    onClick={() => {
                      playSound('click');
                      onNavigateToOffer();
                    }}
                    className="text-amber-400 hover:text-amber-300 font-semibold transition-colors flex items-center gap-1.5"
                  >
                    <span>Special Offer: Free Domain &amp; Hosting ($280)</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              )}
              <li><a href="#services" className="hover:text-white transition-colors">Meta Ads Scaling</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">100% UI/UX Design</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">High-Converting Web</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">SaaS Growth Systems</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Tracking &amp; CAPI</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              CASE STUDIES
            </h4>
            <ul className="space-y-2">
              <li><a href="#cases" className="hover:text-white transition-colors">ScaleFlow CRM (Meta Ads & Funnels)</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">Velocity Apparel (Advantage+ Creative)</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">MetricX Analytics (100% UI/UX)</a></li>
              <li><a href="#cases" className="hover:text-white transition-colors">Synchro Cloud (B2B Lead Architecture)</a></li>
              <li><a href="#blog" className="hover:text-white transition-colors">Growth & Design Essays</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] mb-3">
              DIRECT CHANNELS
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="mailto:ganeshmaankarki0@gmail.com" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>ganeshmaankarki0@gmail.com</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="https://wa.me/9779842902535" target="_blank" rel="noreferrer" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>WhatsApp: +977 9842902535</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
              <li>
                <a href="#contato" className="hover:text-white transition-colors flex items-center gap-1">
                  <span>Request Custom Proposal</span>
                  <ArrowUpRight className="w-3 h-3" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© 2026 Ganesh Karki. All rights reserved. Meta Ads, UI/UX & Web Design.</p>
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1 text-neutral-400 hover:text-white transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
