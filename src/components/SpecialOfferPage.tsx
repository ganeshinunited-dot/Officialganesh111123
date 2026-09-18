import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  Check, 
  X, 
  ArrowLeft, 
  ArrowRight, 
  Gift, 
  Globe, 
  Server, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  RefreshCw, 
  ExternalLink, 
  ChevronRight,
  HelpCircle,
  Clock,
  Layers
} from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';
import { 
  checkSingleDomain, 
  extractBaseBrand, 
  generateDomainSuggestions, 
  POPULAR_TLDS, 
  DomainCheckResult 
} from '../utils/domainChecker';
import { OfferCheckoutBuilder } from './OfferCheckoutBuilder';

interface SpecialOfferPageProps {
  onNavigateHome: () => void;
  onOpenContact: (initialScope?: string) => void;
}

export const SpecialOfferPage: React.FC<SpecialOfferPageProps> = ({ 
  onNavigateHome, 
  onOpenContact 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeQuery, setActiveQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [tldResults, setTldResults] = useState<DomainCheckResult[]>([]);
  const [suggestedResults, setSuggestedResults] = useState<DomainCheckResult[]>([]);
  const [selectedDomain, setSelectedDomain] = useState<string>('');
  
  // Claim form states
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [projectType, setProjectType] = useState('Web Design & Development');
  const [projectNotes, setProjectNotes] = useState('');
  const [claimSubmitted, setClaimSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<string | null>('faq-1');

  const claimFormRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Quick preset search brands
  const presetBrands = ['aurora', 'zenith', 'pulsehq', 'craftflow', 'veridian', 'karkimedia'];

  const executeDomainSearch = async (queryInput: string) => {
    const raw = queryInput.trim();
    if (!raw) return;

    playSound('click');
    setIsSearching(true);
    const { baseName, preferredExt } = extractBaseBrand(raw);
    setActiveQuery(baseName);

    // 1. Prepare Primary TLD list
    const initialTlds: DomainCheckResult[] = POPULAR_TLDS.map(tld => ({
      domain: `${baseName}${tld.ext}`,
      extension: tld.ext,
      available: false,
      status: 'checking',
      retailValue: tld.retail
    }));
    setTldResults(initialTlds);
    setSuggestedResults([]);

    // 2. Perform concurrent live checks on primary TLDs
    const checkedTlds = await Promise.all(
      initialTlds.map(async (item) => {
        const isAvail = await checkSingleDomain(item.domain);
        return {
          ...item,
          available: isAvail,
          status: (isAvail ? 'available' : 'taken') as 'available' | 'taken'
        };
      })
    );
    setTldResults(checkedTlds);

    // 3. Generate smart brand suggestions if .com is taken or as bonus alternatives
    const isComTaken = checkedTlds.find(t => t.extension === '.com' && !t.available);
    const suggestions = generateDomainSuggestions(baseName);

    // Check first 8 suggestions in parallel
    const candidatesToCheck = suggestions.slice(0, 8);
    const checkedSuggestions: DomainCheckResult[] = await Promise.all(
      candidatesToCheck.map(async (dom) => {
        const isAvail = await checkSingleDomain(dom);
        return {
          domain: dom,
          extension: '.com',
          available: isAvail,
          status: (isAvail ? 'available' : 'taken') as 'available' | 'taken',
          isSuggested: true,
          retailValue: '$18/yr'
        };
      })
    );

    // Filter to prioritize available ones
    setSuggestedResults(checkedSuggestions);
    setIsSearching(false);
  };

  const handleSelectDomain = (domain: string) => {
    playSound('click');
    setSelectedDomain(domain);
    if (claimFormRef.current) {
      claimFormRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    setClaimSubmitted(true);
  };

  const formattedWhatsAppUrl = () => {
    const domainText = selectedDomain ? `Reserved Domain: ${selectedDomain}` : 'Domain to be selected';
    const text = `Hi Ganesh, I would like to claim the "Free Domain & Cloud Hosting ($280 Value)" offer for my brand!\n\n` +
      `• ${domainText}\n` +
      `• Name: ${clientName || 'Not specified'}\n` +
      `• Project Type: ${projectType}\n` +
      `• Notes: ${projectNotes || 'None'}\n\n` +
      `Let's discuss starting our project together!`;
    return `https://wa.me/9779842902535?text=${encodeURIComponent(text)}`;
  };

  const offerFaqs = [
    {
      id: 'faq-who',
      question: 'Who is eligible for the 1-Year Free Domain & Free Cloud Hosting?',
      answer: 'The 1-year free custom domain (.com, .io, .co) and 1-year high-speed NVMe cloud edge hosting with automated SSL ($280 / रू ३७,१०० value) are bundled 100% FREE for clients who build or design their website or digital software system through Ganesh Karki / Karki Media! When you select your category in the checkout builder (E-Commerce, SaaS, Corporate, Real Estate, Healthcare, LMS, Travel, Restaurant, or Custom Bespoke System), the domain registration and 1-year cloud hosting fees are completely waived on your invoice.'
    },
    {
      id: 'faq-1',
      question: 'Is the domain and cloud hosting really 100% free?',
      answer: 'Yes, 100% free! When you book any web design, product redesign, or growth marketing sprint, I personally cover the cost of your 1-year custom domain registration (.com, .io, .co, etc.) and 1 full year of ultra-fast NVMe cloud hosting with automated SSL encryption ($280 total value). There are zero hidden setup fees or surprise add-ons.'
    },
    {
      id: 'faq-2',
      question: 'Who owns the domain name and hosting account?',
      answer: 'You have 100% legal ownership from day one. The domain name is registered under your business name and details. You receive full DNS access, registrar ownership, and hosting credentials. You are never locked into any proprietary contracts or trapped by developer lock-in.'
    },
    {
      id: 'faq-3',
      question: 'What happens after the first free year ends?',
      answer: 'After 12 months, standard registrar renewals apply (typically ~$12-$18/year for .com). There is zero markup from my side. You can choose to renew at standard cost, host with your own provider, or transfer the domain anywhere with one click.'
    },
    {
      id: 'faq-4',
      question: 'What if I already have a registered domain?',
      answer: 'No problem at all! If you already own your domain, you can still enjoy the 1-year free NVMe cloud hosting and SSL setup, or register an alternative/sub-brand domain (such as .io or an app extension) for a secondary product or campaign.'
    },
    {
      id: 'faq-5',
      question: 'How fast is the NVMe cloud hosting?',
      answer: 'Extremely fast. It uses high-performance NVMe cloud edge servers with automated Brotli compression, HTTP/3, and global CDN delivery, engineered to score 95+ on Google PageSpeed with sub-second Time to First Byte (TTFB).'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#09090b] font-sans selection:bg-neutral-900 selection:text-white">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-100 py-3 sm:py-4 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onNavigateHome();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-neutral-600 hover:text-black hover:bg-neutral-100 transition-all border border-neutral-200"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Portfolio</span>
            </button>

            <div className="hidden sm:block h-4 w-px bg-neutral-200" />

            <div 
              onClick={() => {
                playSound('click');
                onNavigateHome();
              }} 
              className="cursor-pointer hidden sm:flex items-center gap-2"
            >
              <BrandLogo variant="dark" size="sm" />
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
              <Gift className="w-3.5 h-3.5 text-emerald-600" />
              <span>$280 Welcome Offer Active</span>
            </span>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                if (claimFormRef.current) {
                  claimFormRef.current.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-white bg-black hover:bg-neutral-800 transition-all shadow-xs"
            >
              <span>Configure Website &amp; Checkout</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 border-b border-neutral-100 overflow-hidden">
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 bg-subtle-grid opacity-30 pointer-events-none" />
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-gradient-to-b from-amber-500/5 via-emerald-500/5 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          
          {/* Eyebrow badge (No pulsing dot, no praying emoji) */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white border border-neutral-700/80 mb-6 shadow-xs">
            <Gift className="w-3.5 h-3.5 text-amber-300 shrink-0" />
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Special Client Offer
            </span>
            <span className="text-neutral-500 text-xs">•</span>
            <span className="text-xs text-neutral-200 font-medium">
              $280 Retail Value Included
            </span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#09090b] tracking-tight leading-[1.12]">
            Search &amp; Claim Your Free Custom Domain + 1-Year Fast Cloud Hosting.
          </h1>

          <p className="mt-5 text-base sm:text-xl text-neutral-600 max-w-3xl mx-auto leading-relaxed font-normal">
            Eliminate upfront hosting and domain friction. Every new web design sprint, SaaS product UI/UX overhaul, or growth partnership includes a <strong>free 1-year custom domain</strong> and <strong>high-speed NVMe cloud hosting with automated SSL</strong> at zero extra charge.
          </p>

          {/* 4 Core Trust Badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-3 text-xs font-semibold text-neutral-700">
            <div className="px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>100% Client Owned (Zero Lock-in)</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>High-Speed NVMe Cloud Hosting</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free SSL Padlock &amp; DDoS Security</span>
            </div>
            <div className="px-3 py-1.5 rounded-full bg-neutral-50 border border-neutral-200 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Direct Setup by Ganesh</span>
            </div>
          </div>
        </div>
      </section>

      {/* LIVE DOMAIN SEARCH ENGINE SECTION */}
      <section id="domain-search" className="py-16 sm:py-24 bg-neutral-50/70 border-b border-neutral-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-neutral-200 text-xs font-semibold text-neutral-800 mb-3 shadow-xs">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>LIVE DOMAIN AVAILABILITY ENGINE</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Check if your dream domain is available.
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-neutral-600">
              Type your brand name below to scan real-time DNS registry availability across major extensions. If your preferred name is taken, our engine automatically suggests available alternatives!
            </p>
          </div>

          {/* Interactive Search Bar Box */}
          <div className="bg-white rounded-3xl p-5 sm:p-8 border border-neutral-200/90 shadow-md">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                executeDomainSearch(searchTerm);
              }}
              className="flex flex-col sm:flex-row items-stretch gap-3"
            >
              <div className="relative flex-1">
                <Search className="w-5 h-5 text-neutral-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Enter brand name, e.g. 'solaris' or 'craftflow.com'..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-10 py-3.5 sm:py-4 rounded-2xl border border-neutral-300 text-neutral-900 text-base focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all"
                />
                {searchTerm && (
                  <button
                    type="button"
                    onClick={() => setSearchTerm('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700 p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <button
                type="submit"
                disabled={isSearching || !searchTerm.trim()}
                className="px-7 py-3.5 sm:py-4 rounded-2xl bg-black text-white font-semibold text-sm hover:bg-neutral-800 disabled:opacity-50 active:scale-95 transition-all flex items-center justify-center gap-2 shrink-0 shadow-sm min-h-[48px]"
              >
                {isSearching ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-white" />
                    <span>Scanning Registry...</span>
                  </>
                ) : (
                  <>
                    <Search className="w-4 h-4" />
                    <span>Check Live Availability</span>
                  </>
                )}
              </button>
            </form>

            {/* Quick preset suggestions */}
            <div className="mt-4 pt-4 border-t border-neutral-100 flex flex-wrap items-center gap-2 text-xs">
              <span className="text-neutral-400 font-medium">Try instant examples:</span>
              {presetBrands.map((brand) => (
                <button
                  key={brand}
                  type="button"
                  onClick={() => {
                    setSearchTerm(brand);
                    executeDomainSearch(brand);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-mono transition-colors"
                >
                  {brand}
                </button>
              ))}
            </div>

            {/* Live Search Results */}
            {activeQuery && (
              <div className="mt-8 space-y-6">
                
                {/* Status Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-neutral-800">
                      Live Search Results for:
                    </span>
                    <strong className="font-mono text-neutral-900 bg-white px-2 py-0.5 rounded border border-neutral-200">
                      {activeQuery}
                    </strong>
                  </div>
                  <span className="text-neutral-500 font-mono text-[11px]">
                    Authoritative Cloudflare DoH &amp; Verisign RDAP Live Check
                  </span>
                </div>

                {/* Primary TLDs Results Grid */}
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-3 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-neutral-700" />
                    <span>Primary Domain Extensions ({tldResults.length})</span>
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {tldResults.map((result) => {
                      const isSelected = selectedDomain === result.domain;
                      return (
                        <div
                          key={result.domain}
                          className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                            result.available
                              ? isSelected
                                ? 'bg-emerald-50/80 border-emerald-500 ring-2 ring-emerald-500 shadow-sm'
                                : 'bg-white border-emerald-200/80 hover:border-emerald-400 hover:shadow-xs'
                              : 'bg-neutral-50/70 border-neutral-200 text-neutral-400'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="font-mono text-base font-bold text-neutral-900 block">
                                {result.domain}
                              </span>
                              <span className="text-[11px] text-neutral-500">
                                Retail: {result.retailValue} • <strong>$0 Free With Offer</strong>
                              </span>
                            </div>

                            {/* Status badge */}
                            <div>
                              {result.status === 'checking' ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-neutral-200 text-neutral-700 text-[11px] font-medium">
                                  <RefreshCw className="w-3 h-3 animate-spin" />
                                  <span>Checking</span>
                                </span>
                              ) : result.available ? (
                                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold border border-emerald-200">
                                  <Check className="w-3 h-3" />
                                  <span>Available</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-200/70 text-neutral-500 text-[11px] font-medium">
                                  <X className="w-3 h-3" />
                                  <span>Taken</span>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                            {result.available ? (
                              <button
                                type="button"
                                onClick={() => handleSelectDomain(result.domain)}
                                className={`w-full py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                                  isSelected
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-black text-white hover:bg-neutral-800'
                                }`}
                              >
                                {isSelected ? (
                                  <>
                                    <Check className="w-3.5 h-3.5" />
                                    <span>Selected for Offer</span>
                                  </>
                                ) : (
                                  <>
                                    <Gift className="w-3.5 h-3.5 text-amber-300" />
                                    <span>Claim This Free Domain</span>
                                  </>
                                )}
                              </button>
                            ) : (
                              <span className="text-[11px] text-neutral-400 italic">
                                Domain registered by another party
                              </span>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Smart Available Brand Name Suggestions (If Taken or as Alternatives) */}
                {suggestedResults.length > 0 && (
                  <div className="pt-4 border-t border-neutral-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-3">
                      <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-amber-500" />
                        <span>Smart Alternative Brand Names (Verified Live)</span>
                      </h3>
                      <span className="text-[11px] text-neutral-500 font-mono">
                        High-authority variations available to claim immediately
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                      {suggestedResults.map((sug) => {
                        const isSelected = selectedDomain === sug.domain;
                        return (
                          <div
                            key={sug.domain}
                            className={`p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                              sug.available
                                ? isSelected
                                  ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-500'
                                  : 'bg-white border-neutral-200 hover:border-emerald-300 hover:shadow-xs'
                                : 'bg-neutral-50 border-neutral-200 opacity-60'
                            }`}
                          >
                            <div>
                              <div className="flex items-center justify-between gap-1">
                                <span className="font-mono text-sm font-bold text-neutral-900 truncate">
                                  {sug.domain}
                                </span>
                                {sug.available ? (
                                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                                    Available
                                  </span>
                                ) : (
                                  <span className="px-2 py-0.5 rounded-full bg-neutral-200 text-neutral-500 text-[10px] shrink-0">
                                    Taken
                                  </span>
                                )}
                              </div>
                              <span className="text-[10px] text-neutral-400 block mt-0.5">
                                Included Free With Offer
                              </span>
                            </div>

                            <div className="mt-3 pt-2 border-t border-neutral-100">
                              {sug.available ? (
                                <button
                                  type="button"
                                  onClick={() => handleSelectDomain(sug.domain)}
                                  className={`w-full py-1.5 rounded-lg text-xs font-semibold transition-all ${
                                    isSelected
                                      ? 'bg-emerald-600 text-white'
                                      : 'bg-neutral-900 text-white hover:bg-black'
                                  }`}
                                >
                                  {isSelected ? 'Selected' : 'Claim Free'}
                                </button>
                              ) : (
                                <span className="text-[10px] text-neutral-400">Unavailable</span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* Selected Domain Banner */}
            {selectedDomain && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-500/15 via-amber-500/10 to-neutral-900 text-neutral-900 border border-emerald-400/40 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-800 block">
                      Target Domain Selected For Your Free Offer:
                    </span>
                    <strong className="font-mono text-lg text-neutral-950 font-extrabold">
                      {selectedDomain}
                    </strong>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    if (claimFormRef.current) {
                      claimFormRef.current.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                  className="px-5 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-all shrink-0 flex items-center gap-1.5"
                >
                  <span>Configure Website &amp; Checkout ↓</span>
                </button>
              </motion.div>
            )}

          </div>
        </div>
      </section>

      {/* WHAT'S INCLUDED BREAKDOWN ($280 RETAIL VALUE) */}
      <section className="py-16 sm:py-24 bg-white border-b border-neutral-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 mb-3">
              <Gift className="w-3.5 h-3.5 text-amber-500" />
              <span>THE $280 WELCOME PACKAGE</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight">
              Everything included in the free offer.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
              No hidden fees, no lock-ins, and no surprises. Here is the concrete technical breakdown of what you receive at zero charge when partnering with me for your web design or growth project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Card 1: Domain */}
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-400 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-5">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-700 font-bold block mb-1">
                  $18 – $50 VALUE • 1 YEAR
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                  Custom Domain Name
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Choose your .com, .io, .co, or brand extension. Registered 100% under your legal company name with full DNS ownership and zero transfer locks.
                </p>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-200/60 space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full DNS zone management</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Google Workspace MX ready</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Zero transfer restrictions</span>
                </li>
              </ul>
            </div>

            {/* Card 2: NVMe Hosting */}
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-400 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-5">
                  <Server className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                  $180 VALUE • 1 YEAR
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                  High-Speed Cloud Hosting
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Ultra-fast NVMe cloud edge servers engineered for sub-second loading speeds, 99.9% uptime SLA, and Core Web Vitals optimization.
                </p>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-200/60 space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Sub-second TTFB worldwide</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Global CDN edge caching</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Automated daily backups</span>
                </li>
              </ul>
            </div>

            {/* Card 3: SSL Security */}
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-400 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-5">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-sky-700 font-bold block mb-1">
                  $50 VALUE • AUTOMATED
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                  Automated SSL &amp; Security
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Grade A+ HTTPS encryption, instant green padlock, DDoS mitigation, and modern HTTP/3 security protocols configured automatically.
                </p>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-200/60 space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Auto-renewing SSL certificates</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>HSTS &amp; DNSSEC protection</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Enterprise DDoS mitigation</span>
                </li>
              </ul>
            </div>

            {/* Card 4: Done-For-You Setup */}
            <div className="p-6 sm:p-7 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between hover:border-neutral-400 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-5">
                  <Sparkles className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-purple-700 font-bold block mb-1">
                  HANDS-OFF • DONE FOR YOU
                </span>
                <h3 className="text-lg sm:text-xl font-display font-bold text-neutral-900">
                  Full Technical Setup
                </h3>
                <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                  Zero server command lines or confusing DNS records for you to touch. I personally handle all DNS routing, verification, and deployment.
                </p>
              </div>

              <ul className="mt-5 pt-4 border-t border-neutral-200/60 space-y-2 text-xs text-neutral-700">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Direct setup by Ganesh</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Pixel &amp; Analytics tag routing</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>100% Turnkey handoff</span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </section>

      {/* HOW IT WORKS (3 SIMPLE STEPS) */}
      <section className="py-16 sm:py-24 bg-neutral-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-3xl mb-12 sm:mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-400 block mb-2">
              HOW TO CLAIM &amp; GET STARTED
            </span>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight">
              Three simple steps from search to launch.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 space-y-3">
              <span className="text-3xl font-display font-extrabold text-amber-400">01</span>
              <h3 className="text-lg font-bold text-white">Search &amp; Pick Your Free Domain</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Use the live search engine above to test your brand name across .com, .io, .co or check our smart available suggestions.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 space-y-3">
              <span className="text-3xl font-display font-extrabold text-emerald-400">02</span>
              <h3 className="text-lg font-bold text-white">Choose Category &amp; Calculate Pricing</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Navigate website categories, pick your tier, and preview your itemized invoice. Your 1-Year Free Domain and High-Speed Cloud Hosting ($280 value) are automatically deducted ($0)!
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-neutral-800/60 border border-neutral-700/80 space-y-3">
              <span className="text-3xl font-display font-extrabold text-sky-400">03</span>
              <h3 className="text-lg font-bold text-white">We Register, Deploy &amp; Build</h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                I register the domain under your legal name, configure high-speed cloud edge servers, and build your high-converting digital product.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* INTERACTIVE WEBSITE SYSTEM CONFIGURATOR & CHECKOUT */}
      <section ref={claimFormRef} id="checkout-system" className="py-16 sm:py-24 bg-neutral-100/60 border-b border-neutral-200 scroll-mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 text-white text-xs font-bold mb-3 shadow-xs">
              <Gift className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-amber-400 uppercase tracking-wider font-mono">
                PROJECT CONFIGURATOR &amp; CHECKOUT
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-neutral-900 tracking-tight">
              Select Your Category, Tier &amp; Calculate Exact Pricing.
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mt-3 max-w-2xl mx-auto leading-relaxed">
              Navigate through all website categories (E-commerce, SaaS, Corporate, Real Estate, Healthcare, LMS, Travel, etc.) to configure your system. Your <strong>1-Year Free Domain and High-Speed Cloud Hosting ($280 / रू ३७,१०० value)</strong> are included 100% free on your final invoice!
            </p>
          </div>

          <OfferCheckoutBuilder
            initialDomain={selectedDomain}
            onOpenDomainSearch={() => {
              playSound('click');
              const el = document.getElementById('domain-search');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }
            }}
            onNavigateHome={onNavigateHome}
          />
        </div>
      </section>

      {/* SPECIAL OFFER FAQ */}
      <section className="py-16 sm:py-24 bg-neutral-50/70 border-b border-neutral-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-neutral-500 block mb-2">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900 tracking-tight">
              Got questions about the offer?
            </h2>
          </div>

          <div className="space-y-3">
            {offerFaqs.map((faq) => {
              const isOpen = expandedFaq === faq.id;
              return (
                <div
                  key={faq.id}
                  className="rounded-2xl bg-white border border-neutral-200/80 overflow-hidden transition-all shadow-xs"
                >
                  <button
                    type="button"
                    onClick={() => {
                      playSound('toggle');
                      setExpandedFaq(isOpen ? null : faq.id);
                    }}
                    className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-display font-bold text-neutral-900 text-base sm:text-lg hover:text-black transition-colors"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-12 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BrandLogo variant="light" size="sm" />
            <span className="text-xs text-neutral-400">
              © {new Date().getFullYear()} Ganesh Karki. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onNavigateHome();
              }}
              className="hover:text-white transition-colors"
            >
              Main Portfolio
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onOpenContact('Special Offer Consultation');
              }}
              className="hover:text-white transition-colors"
            >
              Contact Ganesh
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
