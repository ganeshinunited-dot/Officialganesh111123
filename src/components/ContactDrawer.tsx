import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Copy, Check, Send } from 'lucide-react';
import confetti from 'canvas-confetti';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';

interface ContactDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialMessage?: string;
}

export const ContactDrawer: React.FC<ContactDrawerProps> = ({
  isOpen,
  onClose,
  initialMessage = ''
}) => {
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form state
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState('Meta Ads Scaling & Optimization');
  const [budget, setBudget] = useState('$3,500 – $8,000');
  const [message, setMessage] = useState(initialMessage);

  useEffect(() => {
    if (initialMessage) {
      setMessage(initialMessage);
    }
  }, [initialMessage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const directEmail = 'ganeshmaankarki0@gmail.com';
  const directPhone = '+977 9842902535';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(directEmail);
    setCopied(true);
    playSound('success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    
    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#000000', '#2563eb', '#10b981']
      });
    } catch {
      // Safe fallback
    }

    setSubmitted(true);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => {
            playSound('click');
            onClose();
          }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Drawer Window */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-xl bg-white border-l border-neutral-200 h-full overflow-y-auto shadow-2xl z-10 flex flex-col justify-between"
        >
          {/* Header */}
          <div className="p-4 sm:p-8 border-b border-neutral-100 flex items-center justify-between bg-neutral-50/80 sticky top-0 z-20 backdrop-blur-md">
            <div>
              <span className="text-[11px] sm:text-xs uppercase tracking-widest text-neutral-400 font-semibold block">
                START A PROJECT
              </span>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900 mt-0.5">
                Talk with Ganesh Karki
              </h2>
            </div>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="w-10 h-10 sm:w-9 sm:h-9 rounded-full bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 flex items-center justify-center text-neutral-700 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 sm:p-8 space-y-5 sm:space-y-6 flex-1">
            {submitted ? (
              <div className="py-12 sm:py-16 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-7 h-7" />
                </div>
                <h3 className="text-xl sm:text-2xl font-display font-extrabold text-neutral-900">
                  Proposal request sent!
                </h3>
                <p className="text-neutral-600 text-xs sm:text-sm max-w-sm mx-auto">
                  I have received your project details and requirements. I will review and reply within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="mt-6 px-8 py-3 rounded-full bg-black text-white text-sm font-semibold hover:bg-neutral-800 min-h-[44px]"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Free Domain & Hosting Offer Ribbon */}
                <div className="p-3.5 sm:p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-neutral-50 border border-amber-300/80 flex items-start gap-3">
                  <span className="text-xl shrink-0">🎁</span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-neutral-900">
                        Client Welcome Offer Included
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        $280 Value • $0 Cost
                      </span>
                    </div>
                    <p className="text-xs text-neutral-600 mt-0.5 leading-relaxed">
                      All new web and growth projects include <strong>1 full year of a free custom domain (.com/.io)</strong> and <strong>ultra-fast NVMe cloud hosting + SSL</strong> with 100% full client ownership.
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      Full Name*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      Phone / WhatsApp*
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      Company / Brand*
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Brand or product"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors min-h-[44px]"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                      Work Email*
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors min-h-[44px]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Primary Service Needed
                  </label>
                  <select
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors min-h-[44px]"
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
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Target Budget
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {['$1,500 – $3,500', '$3,500 – $8,000', '$8,000+'].map((tier) => (
                      <button
                        type="button"
                        key={tier}
                        onClick={() => setBudget(tier)}
                        className={`py-2.5 px-2 rounded-xl text-[11px] sm:text-xs font-semibold border transition-all min-h-[42px] ${
                          budget === tier
                            ? 'bg-black text-white border-black shadow-xs'
                            : 'bg-white text-neutral-700 border-neutral-200 hover:border-neutral-400 active:bg-neutral-50'
                        }`}
                      >
                        {tier}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] sm:text-xs font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                    Project Details & Goals
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell me about your product, ad spend, goals, and target timeline..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 sm:py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-base sm:text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full min-h-[48px] py-3.5 rounded-xl bg-black text-white font-semibold text-sm sm:text-base hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm active:scale-95"
                >
                  <span>Send Proposal Request</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Quick Connect Footer inside drawer */}
            <div className="pt-5 sm:pt-6 border-t border-neutral-200/80 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-neutral-500 gap-1">
                <span>Direct Email:</span>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="font-mono text-neutral-900 font-semibold hover:underline flex items-center gap-1 self-start sm:self-auto py-1"
                >
                  <span>{directEmail}</span>
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <a
                href="https://wa.me/9779842902535"
                target="_blank"
                rel="noreferrer"
                className="w-full min-h-[46px] py-3 sm:py-2.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 active:bg-neutral-300 text-neutral-800 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-colors shadow-xs"
              >
                <WhatsAppIcon className="w-5 h-5 flex-shrink-0" />
                <span>Chat on WhatsApp (+977 9842902535)</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
