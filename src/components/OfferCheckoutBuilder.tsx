import React, { useState, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Check,
  Globe,
  Server,
  ShieldCheck,
  Gift,
  ArrowRight,
  ArrowLeft,
  ShoppingBag,
  Cpu,
  Building2,
  Home,
  HeartPulse,
  Compass,
  GraduationCap,
  Utensils,
  Zap,
  Wrench,
  Sparkles,
  DollarSign,
  CreditCard,
  Printer,
  Copy,
  Clock,
  FileText,
  CheckCircle2,
  HelpCircle,
  Smartphone,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Key,
  QrCode,
  Receipt,
  LogOut,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { 
  WEBSITE_CATEGORIES, 
  SYSTEM_ADDONS, 
  SPECIAL_OFFER_INCLUSIONS, 
  WebsiteCategory, 
  SystemTier 
} from '../data/offerCategories';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';
import { ClientPaymentModal, PaymentMethod } from './ClientPaymentModal';
import { InvoiceModal } from './InvoiceModal';

export interface ClientUser {
  name: string;
  email: string;
  phone: string;
  businessName?: string;
  registeredAt: string;
}

interface OfferCheckoutBuilderProps {
  initialDomain?: string;
  onOpenDomainSearch: () => void;
  onNavigateHome: () => void;
}

export const OfferCheckoutBuilder: React.FC<OfferCheckoutBuilderProps> = ({
  initialDomain = '',
  onOpenDomainSearch,
  onNavigateHome
}) => {
  // Step state: 1: Domain, 2: Category, 3: Tier & Addons, 4: Checkout & Order
  const [currentStep, setCurrentStep] = useState<number>(initialDomain ? 2 : 1);
  const [currency, setCurrency] = useState<'NPR' | 'USD'>('NPR');
  
  // Selection states
  const [chosenDomain, setChosenDomain] = useState<string>(initialDomain || '');
  const [customDomainInput, setCustomDomainInput] = useState<string>(initialDomain || '');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('ecommerce');
  const [selectedTierId, setSelectedTierId] = useState<'starter' | 'pro' | 'enterprise'>('pro');
  const [selectedAddonIds, setSelectedAddonIds] = useState<string[]>(['esewa_khalti_stripe', 'meta_capi_tracking']);
  
  // Client information for checkout
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [paymentPreference, setPaymentPreference] = useState<'milestone' | 'full'>('milestone');
  
  // Payment modal and confirmation state
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [paymentTxnId, setPaymentTxnId] = useState('');
  const [paymentMethodUsed, setPaymentMethodUsed] = useState<string>('');
  const [paymentTimestamp, setPaymentTimestamp] = useState<string>('');

  // Checkout submission state
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderReference, setOrderReference] = useState('');
  const [copiedInvoice, setCopiedInvoice] = useState(false);

  // Sync initial domain if changed
  React.useEffect(() => {
    if (initialDomain && initialDomain !== chosenDomain) {
      setChosenDomain(initialDomain);
      setCustomDomainInput(initialDomain);
      if (currentStep === 1) {
        setCurrentStep(2);
      }
    }
  }, [initialDomain]);

  // Find active category & tier
  const activeCategory: WebsiteCategory = 
    WEBSITE_CATEGORIES.find((c) => c.id === selectedCategoryId) || WEBSITE_CATEGORIES[0];
  
  const activeTier: SystemTier = 
    activeCategory.tiers.find((t) => t.id === selectedTierId) || activeCategory.tiers[1] || activeCategory.tiers[0];

  // Pricing calculations
  const basePrice = currency === 'NPR' ? activeTier.priceNPR : activeTier.priceUSD;
  
  const addonsTotal = selectedAddonIds.reduce((sum, id) => {
    const addon = SYSTEM_ADDONS.find((a) => a.id === id);
    if (!addon) return sum;
    return sum + (currency === 'NPR' ? addon.priceNPR : addon.priceUSD);
  }, 0);

  const websiteBuildSubtotal = basePrice + addonsTotal;
  
  // Value of the free items
  const freeBonusValue = currency === 'NPR' 
    ? SPECIAL_OFFER_INCLUSIONS.totalBonusValueNPR 
    : SPECIAL_OFFER_INCLUSIONS.totalBonusValueUSD;

  const totalBeforeFreeBonus = websiteBuildSubtotal + freeBonusValue;
  const finalPayable = websiteBuildSubtotal; // Client only pays website build, domain & hosting are $0 FREE!

  const milestoneDeposit = Math.round(finalPayable * 0.5);

  const formatPrice = (amount: number) => {
    if (currency === 'NPR') {
      return `रू ${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShoppingBag': return <ShoppingBag className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      case 'Building2': return <Building2 className="w-5 h-5" />;
      case 'Home': return <Home className="w-5 h-5" />;
      case 'HeartPulse': return <HeartPulse className="w-5 h-5" />;
      case 'Compass': return <Compass className="w-5 h-5" />;
      case 'GraduationCap': return <GraduationCap className="w-5 h-5" />;
      case 'Utensils': return <Utensils className="w-5 h-5" />;
      case 'Zap': return <Zap className="w-5 h-5" />;
      case 'Wrench': return <Wrench className="w-5 h-5" />;
      default: return <Globe className="w-5 h-5" />;
    }
  };

  const handleToggleAddon = (id: string) => {
    playSound('toggle');
    setSelectedAddonIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyCustomDomain = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customDomainInput.trim()) return;
    playSound('click');
    setChosenDomain(customDomainInput.trim().toLowerCase());
    setCurrentStep(2);
  };

  const saveOrderToLocalStorage = (refId: string, txnId?: string, method?: string) => {
    try {
      const existing = localStorage.getItem('gk_client_orders');
      const orders = existing ? JSON.parse(existing) : [];
      const newOrder = {
        id: 'ord-' + Math.random().toString(36).substring(2, 9),
        orderReference: refId,
        domain: chosenDomain || 'mybrand.com',
        categoryName: activeCategory.name,
        tierName: activeTier.name,
        amount: paymentPreference === 'milestone' ? milestoneDeposit : finalPayable,
        formattedAmount: formatPrice(paymentPreference === 'milestone' ? milestoneDeposit : finalPayable),
        paymentPreference,
        paymentStatus: 'pending_verification' as const,
        paymentMethod: method,
        transactionId: txnId,
        createdAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        clientName: clientName || 'Partner',
        clientEmail: clientEmail || 'client@company.com',
        clientPhone: clientPhone || '+9779800000000',
        businessName: businessName || ''
      };
      orders.unshift(newOrder);
      localStorage.setItem('gk_client_orders', JSON.stringify(orders));
    } catch {
      // ignore
    }
  };

  const handlePaymentSuccess = (details: {
    transactionId: string;
    method: PaymentMethod;
    paidAmount: number;
    paidFormatted: string;
    timestamp: string;
  }) => {
    setIsPaymentModalOpen(false);
    const refId = orderReference || `GK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(refId);
    setPaymentTxnId(details.transactionId);
    setPaymentMethodUsed(details.method);
    setPaymentTimestamp(details.timestamp);
    setPaymentConfirmed(true);
    setOrderPlaced(true);
    saveOrderToLocalStorage(refId, details.transactionId, details.method);
    playSound('success');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('success');
    const refId = orderReference || `GK-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderReference(refId);
    setOrderPlaced(true);
    saveOrderToLocalStorage(refId);
  };

  const generateWhatsAppMessage = () => {
    const domainText = chosenDomain || 'Domain to be finalized';
    const addonNames = selectedAddonIds
      .map(id => SYSTEM_ADDONS.find(a => a.id === id)?.name)
      .filter(Boolean)
      .join(', ');

    if (paymentConfirmed) {
      const msg = 
`*WEBSITE ORDER & VERIFIED PAYMENT RECEIPT*
*Order Ref:* ${orderReference}
*Payment Status:* PAID / VERIFIED (${paymentPreference === 'milestone' ? '50% Milestone Deposit' : '100% Full Payment'})
*Transaction Ref:* ${paymentTxnId}
*Payment Channel:* ${paymentMethodUsed.toUpperCase()}

*Client Profile:*
• Name: ${clientName || 'Partner'}
• WhatsApp: ${clientPhone || 'Not provided'}
• Email: ${clientEmail || 'Not provided'}
• Brand: ${businessName || 'None'}

*Target Architecture:*
• Free Domain (1-Yr FREE): ${domainText}
• Free Cloud Edge Hosting: 1-Yr NVMe Cloud Edge + SSL ($280 / रू 37,100 Waived)
• Category: ${activeCategory.name}
• Tier: ${activeTier.name} (${activeTier.timeline})
• Add-ons: ${addonNames || 'None'}

*Financials:*
• Total Project Value: ${formatPrice(finalPayable)}
• Amount Paid Now: ${formatPrice(paymentPreference === 'milestone' ? milestoneDeposit : finalPayable)}
• Balance on Completion: ${paymentPreference === 'milestone' ? formatPrice(finalPayable - milestoneDeposit) : 'रू 0 / $0'}

Hi Ganesh, I have logged my order and completed payment for ${domainText}. Please confirm receipt and let's kick off the website!`;
      return `https://wa.me/9779842902535?text=${encodeURIComponent(msg)}`;
    }

    const msg = 
`*NEW WEBSITE ORDER & SPECIAL OFFER CLAIM*
*Ref:* ${orderReference || 'WEB-PROPOSAL'}

*Target Domain (1-Yr FREE):* ${domainText}
*Free Hosting Included:* 1-Yr NVMe Cloud Edge + SSL ($280 / रू 37,100 Waived)

*Client Details:*
• Name: ${clientName || 'Partner'}
• WhatsApp: ${clientPhone || 'Not provided'}
• Email: ${clientEmail || 'Not provided'}
• Business / Brand: ${businessName || 'Not provided'}

*Project Scope:*
• Category: ${activeCategory.name}
• Tier: ${activeTier.name}
• Estimated Timeline: ${activeTier.timeline}
• Add-ons: ${addonNames || 'None'}

*Financial Summary:*
• Regular Total Value: ${formatPrice(totalBeforeFreeBonus)}
• Special Offer Savings: -${formatPrice(freeBonusValue)} (100% FREE Domain & Hosting)
• *Final Website Design Investment:* ${formatPrice(finalPayable)}
• *50% Starting Milestone:* ${formatPrice(milestoneDeposit)}

*Client Notes:* ${projectNotes || 'None'}

Hi Ganesh, I would like to proceed with this website development package with the 1-year free domain & hosting offer!`;

    return `https://wa.me/9779842902535?text=${encodeURIComponent(msg)}`;
  };

  const handleCopySummary = () => {
    playSound('click');
    const text = `Order Ref: ${orderReference}\nDomain: ${chosenDomain}\nCategory: ${activeCategory.name} (${activeTier.name})\nFinal Price: ${formatPrice(finalPayable)}\nFree Domain & Hosting: Included ($280 / रू 37,100 Free)`;
    navigator.clipboard.writeText(text);
    setCopiedInvoice(true);
    setTimeout(() => setCopiedInvoice(false), 2500);
  };

  return (
    <div id="checkout-system" className="bg-white rounded-3xl border border-neutral-200 shadow-xl overflow-hidden scroll-mt-24">
      {/* Top Banner Explaining the Offer Policy */}
      <div className="bg-neutral-900 text-white p-4 sm:p-5 border-b border-neutral-800">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-start sm:items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-400 text-neutral-950 flex items-center justify-center shrink-0 font-bold shadow-xs">
              <Gift className="w-5 h-5 text-neutral-900" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 font-mono">
                  SPECIAL OFFER POLICY
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                  Free 1-Yr Domain + NVMe Hosting ($280 Value)
                </span>
              </div>
              <p className="text-xs sm:text-sm text-neutral-300 mt-0.5 leading-snug">
                The 1-year free domain &amp; high-speed cloud hosting is bundled <strong>100% free</strong> when you design and build your website/system through Ganesh!
              </p>
            </div>
          </div>

          {/* Currency Toggle */}
          <div className="flex items-center gap-1.5 self-end md:self-auto bg-neutral-800 p-1 rounded-xl border border-neutral-700 shrink-0">
            <span className="text-[10px] uppercase font-mono text-neutral-400 px-2 font-semibold">Currency:</span>
            <button
              type="button"
              onClick={() => {
                playSound('toggle');
                setCurrency('NPR');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'NPR'
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              रू NPR (Nepal)
            </button>
            <button
              type="button"
              onClick={() => {
                playSound('toggle');
                setCurrency('USD');
              }}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                currency === 'USD'
                  ? 'bg-amber-400 text-neutral-950 shadow-xs'
                  : 'text-neutral-300 hover:text-white'
              }`}
            >
              $ USD (Global)
            </button>
          </div>
        </div>
      </div>

      {/* Redesigned Professional 4-Step Stepper & Cart Bar */}
      <div className="bg-white border-b border-neutral-200 shadow-xs px-4 sm:px-8 py-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          
          {/* Step 1 Card */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setCurrentStep(1);
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              currentStep === 1
                ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                : chosenDomain
                ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-neutral-900'
                : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                  currentStep === 1
                    ? 'bg-white text-neutral-900'
                    : chosenDomain
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {chosenDomain ? '✓' : '1'}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep === 1 ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Step One
                </span>
              </div>
              <p className="text-sm font-display font-bold">
                {chosenDomain ? chosenDomain : 'Select Domain'}
              </p>
            </div>
            <span className={`text-xs font-bold ${currentStep === 1 ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`}>
              →
            </span>
          </button>

          {/* Step 2 Card */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setCurrentStep(2);
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              currentStep === 2
                ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                : currentStep > 2
                ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-neutral-900'
                : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                  currentStep === 2
                    ? 'bg-white text-neutral-900'
                    : currentStep > 2
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {currentStep > 2 ? '✓' : '2'}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep === 2 ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Step Two
                </span>
              </div>
              <p className="text-sm font-display font-bold truncate max-w-[180px]">
                {activeCategory.name}
              </p>
            </div>
            <span className={`text-xs font-bold ${currentStep === 2 ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`}>
              →
            </span>
          </button>

          {/* Step 3 Card */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setCurrentStep(3);
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              currentStep === 3
                ? 'border-neutral-900 bg-neutral-900 text-white shadow-md'
                : currentStep > 3
                ? 'border-emerald-200 bg-emerald-50/50 hover:bg-emerald-50 text-neutral-900'
                : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                  currentStep === 3
                    ? 'bg-white text-neutral-900'
                    : currentStep > 3
                    ? 'bg-emerald-600 text-white'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  {currentStep > 3 ? '✓' : '3'}
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep === 3 ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Step Three
                </span>
              </div>
              <p className="text-sm font-display font-bold">
                {activeTier.name} ({selectedAddonIds.length} Add-ons)
              </p>
            </div>
            <span className={`text-xs font-bold ${currentStep === 3 ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`}>
              →
            </span>
          </button>

          {/* Step 4 Card */}
          <button
            type="button"
            onClick={() => {
              playSound('click');
              setCurrentStep(4);
            }}
            className={`p-3.5 rounded-2xl border text-left transition-all flex items-center justify-between group ${
              currentStep === 4
                ? 'border-emerald-600 bg-emerald-600 text-white shadow-md'
                : 'border-neutral-200 bg-neutral-50 hover:bg-neutral-100 text-neutral-800'
            }`}
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center font-mono ${
                  currentStep === 4
                    ? 'bg-white text-emerald-900'
                    : 'bg-neutral-200 text-neutral-700'
                }`}>
                  4
                </span>
                <span className={`text-xs font-bold uppercase tracking-wider ${currentStep === 4 ? 'text-emerald-100' : 'text-neutral-500'}`}>
                  Step Four
                </span>
              </div>
              <p className="text-sm font-display font-bold">
                {formatPrice(paymentPreference === 'milestone' ? milestoneDeposit : finalPayable)}
              </p>
            </div>
            <span className={`text-xs font-bold ${currentStep === 4 ? 'text-white' : 'text-neutral-400 group-hover:text-neutral-900'}`}>
              →
            </span>
          </button>

        </div>
      </div>

      {/* Main Content Area Based on Current Step */}
      <div className="p-5 sm:p-8 lg:p-10">

        {/* STEP 1: DOMAIN VERIFICATION & LOCK */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
                <Globe className="w-3.5 h-3.5 text-blue-600" />
                <span>STEP 1 OF 4 • DOMAIN RESERVATION</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900">
                Lock in your 100% Free Domain Name.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                You can pick any available domain (.com, .io, .co, .net, etc.) or specify your brand name. We cover the entire 1-year registration cost with your website design package!
              </p>
            </div>

            {/* If a domain is already locked */}
            {chosenDomain ? (
              <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-300 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                    <Check className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block">
                      CURRENT SELECTED DOMAIN (100% FREE WITH OFFER)
                    </span>
                    <strong className="font-mono text-xl text-neutral-900 font-extrabold">
                      {chosenDomain}
                    </strong>
                    <span className="text-xs text-emerald-700 block mt-0.5">
                      Retail: $18 - $45/yr • <strong>Cost to you: $0.00</strong>
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={onOpenDomainSearch}
                    className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors"
                  >
                    Change Domain via Live Search
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      playSound('click');
                      setCurrentStep(2);
                    }}
                    className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-black text-white text-xs font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Continue to Website Category</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Search trigger card */}
                <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200 text-center space-y-3">
                  <h4 className="font-display font-bold text-neutral-900 text-lg">
                    Have not checked domain availability yet?
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto">
                    Use our real-time authoritative registry search engine to verify live availability for .com, .io, .co and get smart alternative brand suggestions!
                  </p>
                  <button
                    type="button"
                    onClick={onOpenDomainSearch}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-all shadow-sm"
                  >
                    <Globe className="w-4 h-4 text-blue-400" />
                    <span>Open Live Domain Search Engine ↑</span>
                  </button>
                </div>

                {/* Direct Entry Alternative */}
                <div className="p-6 rounded-2xl bg-white border border-neutral-200">
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 block mb-2">
                    OR ENTER YOUR PREFERRED DOMAIN DIRECTLY:
                  </span>
                  <form onSubmit={handleApplyCustomDomain} className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      placeholder="e.g. mybrandname.com"
                      value={customDomainInput}
                      onChange={(e) => setCustomDomainInput(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl border border-neutral-300 font-mono text-sm focus:outline-none focus:border-black"
                    />
                    <button
                      type="submit"
                      disabled={!customDomainInput.trim()}
                      className="px-6 py-3 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-black disabled:opacity-50 transition-all"
                    >
                      Save Domain &amp; Proceed →
                    </button>
                  </form>
                  <span className="text-[11px] text-neutral-400 mt-2 block">
                    *We verify the registrar availability before final checkout. If already taken, we help you secure the next best alternative at $0 charge.
                  </span>
                </div>
              </div>
            )}

            {/* Perks included with domain */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-neutral-100 text-xs">
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>100% Client Owned</strong> with full DNS credentials</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Google Workspace MX</strong> records pre-configured</span>
              </div>
              <div className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                <span><strong>Free Cloud Edge Hosting</strong> ($180 value) bundled</span>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 2: CHOOSE WEBSITE CATEGORY / SYSTEM TYPE */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>STEP 2 OF 4 • CHOOSE YOUR WEBSITE SYSTEM CATEGORY</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900">
                What kind of website or system do you want to build?
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                From high-converting e-commerce and corporate portfolios to complex SaaS platforms, booking engines, and custom enterprise software — <strong>any custom system is built from scratch</strong>.
              </p>
            </div>

            {/* Category Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {WEBSITE_CATEGORIES.map((cat) => {
                const isSelected = selectedCategoryId === cat.id;
                const startingPrice = currency === 'NPR' ? cat.tiers[0].priceNPR : cat.tiers[0].priceUSD;

                return (
                  <div
                    key={cat.id}
                    onClick={() => {
                      playSound('click');
                      setSelectedCategoryId(cat.id);
                    }}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-neutral-900 text-white border-neutral-900 ring-2 ring-neutral-900 shadow-md'
                        : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-400 hover:shadow-xs'
                    }`}
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isSelected ? 'bg-white/15 text-amber-300' : 'bg-neutral-100 text-neutral-800'
                        }`}>
                          {getCategoryIcon(cat.iconName)}
                        </div>

                        {cat.badge && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isSelected
                              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                              : 'bg-neutral-100 text-neutral-700 border border-neutral-200'
                          }`}>
                            {cat.badge}
                          </span>
                        )}
                      </div>

                      <h4 className="font-display font-bold text-base sm:text-lg leading-snug">
                        {cat.name}
                      </h4>
                      
                      <p className={`text-xs mt-1.5 leading-relaxed ${
                        isSelected ? 'text-neutral-300' : 'text-neutral-600'
                      }`}>
                        {cat.shortDesc}
                      </p>

                      <div className={`mt-3 pt-3 border-t text-[11px] ${
                        isSelected ? 'border-neutral-800 text-neutral-400' : 'border-neutral-100 text-neutral-500'
                      }`}>
                        <strong>Best for:</strong> {cat.recommendedFor}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-200/40 flex items-center justify-between">
                      <div>
                        <span className={`text-[10px] uppercase font-mono block ${
                          isSelected ? 'text-neutral-400' : 'text-neutral-500'
                        }`}>
                          Starting From:
                        </span>
                        <strong className={`font-mono text-sm font-extrabold ${
                          isSelected ? 'text-amber-300' : 'text-neutral-950'
                        }`}>
                          {formatPrice(startingPrice)}
                        </strong>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 ${
                        isSelected
                          ? 'bg-amber-400 text-neutral-950'
                          : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                      }`}>
                        <span>{isSelected ? 'Selected' : 'Select'}</span>
                        {isSelected && <Check className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Step 2 Bottom Navigation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setCurrentStep(1);
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Domain</span>
                </button>
                <div className="text-xs">
                  <span className="text-neutral-500">Selected Category:</span>{' '}
                  <strong className="text-neutral-900">{activeCategory.name}</strong>
                </div>
              </div>

              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setCurrentStep(3);
                }}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
              >
                <span>Customize Tiers &amp; Add-ons</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}

        {/* STEP 3: TIER & ADD-ON CUSTOMIZATION */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 text-neutral-800 text-xs font-semibold mb-2">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                <span>STEP 3 OF 4 • SPECIFICATIONS &amp; ADD-ONS</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900">
                Configure {activeCategory.name} Specs.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                Select your scale and toggle any system capabilities (payment gateways, automated WhatsApp routing, or Meta pixel tracking).
              </p>
            </div>

            {/* Tier Selection */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-500 mb-4 flex items-center gap-2">
                <span>Select Project Scale / Tier:</span>
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {activeCategory.tiers.map((tier) => {
                  const isSelected = selectedTierId === tier.id;
                  const tierPrice = currency === 'NPR' ? tier.priceNPR : tier.priceUSD;

                  return (
                    <div
                      key={tier.id}
                      onClick={() => {
                        playSound('click');
                        setSelectedTierId(tier.id);
                      }}
                      className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-neutral-900 text-white border-neutral-900 ring-2 ring-neutral-900 shadow-md'
                          : 'bg-white text-neutral-900 border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <span className={`text-[11px] font-bold uppercase tracking-wider font-mono ${
                            isSelected ? 'text-amber-400' : 'text-neutral-500'
                          }`}>
                            {tier.id.toUpperCase()} TIER
                          </span>

                          {tier.badge && (
                            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-neutral-950 text-[10px] font-bold">
                              {tier.badge}
                            </span>
                          )}
                        </div>

                        <h5 className="font-display font-bold text-lg sm:text-xl">
                          {tier.name}
                        </h5>

                        <div className="mt-3 flex items-baseline gap-1.5">
                          <span className={`font-mono text-2xl sm:text-3xl font-extrabold ${
                            isSelected ? 'text-white' : 'text-neutral-900'
                          }`}>
                            {formatPrice(tierPrice)}
                          </span>
                          <span className={`text-xs ${isSelected ? 'text-neutral-400' : 'text-neutral-500'}`}>
                            one-time
                          </span>
                        </div>

                        <p className={`text-xs mt-2 leading-relaxed ${
                          isSelected ? 'text-neutral-300' : 'text-neutral-600'
                        }`}>
                          {tier.summary}
                        </p>

                        <div className={`mt-4 pt-3 border-t space-y-2 text-xs ${
                          isSelected ? 'border-neutral-800' : 'border-neutral-100'
                        }`}>
                          <div className={`flex items-center gap-1.5 font-semibold ${
                            isSelected ? 'text-amber-300' : 'text-neutral-800'
                          }`}>
                            <Clock className="w-3.5 h-3.5" />
                            <span>Delivery: {tier.timeline}</span>
                          </div>

                          <div className="space-y-1.5 pt-1">
                            {tier.includedFeatures.map((feat, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <Check className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${
                                  isSelected ? 'text-emerald-400' : 'text-emerald-600'
                                }`} />
                                <span className={isSelected ? 'text-neutral-300' : 'text-neutral-700'}>
                                  {feat}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 pt-3 border-t border-neutral-200/20">
                        <button
                          type="button"
                          className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                            isSelected
                              ? 'bg-amber-400 text-neutral-950 font-extrabold'
                              : 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200'
                          }`}
                        >
                          {isSelected ? (
                            <>
                              <Check className="w-3.5 h-3.5" />
                              <span>Active Tier Selected</span>
                            </>
                          ) : (
                            <span>Select This Tier</span>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* System Add-ons Section */}
            <div className="pt-6 border-t border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider text-neutral-900 flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Optional System Integrations &amp; Add-ons</span>
                  </h4>
                  <p className="text-xs text-neutral-500">
                    Click to include any specialized features or marketing integrations.
                  </p>
                </div>
                <span className="text-xs text-neutral-500 font-mono">
                  {selectedAddonIds.length} Add-on(s) included
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {SYSTEM_ADDONS.map((addon) => {
                  const isChecked = selectedAddonIds.includes(addon.id);
                  const addonPrice = currency === 'NPR' ? addon.priceNPR : addon.priceUSD;

                  return (
                    <div
                      key={addon.id}
                      onClick={() => handleToggleAddon(addon.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                        isChecked
                          ? 'bg-emerald-50/70 border-emerald-500 ring-1 ring-emerald-500'
                          : 'bg-white border-neutral-200 hover:border-neutral-300'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-display font-bold text-xs sm:text-sm text-neutral-900 leading-tight">
                              {addon.name}
                            </span>
                            {addon.recommended && (
                              <span className="px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 text-[9px] font-bold">
                                Rec
                              </span>
                            )}
                          </div>
                          <p className="text-[11px] text-neutral-600 mt-1 leading-relaxed">
                            {addon.description}
                          </p>
                        </div>

                        <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 border transition-all ${
                          isChecked
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-neutral-300 bg-white'
                        }`}>
                          {isChecked && <Check className="w-3.5 h-3.5" />}
                        </div>
                      </div>

                      <div className="mt-3 pt-2 border-t border-neutral-200/60 flex items-center justify-between text-xs">
                        <span className="font-mono font-bold text-neutral-900">
                          +{formatPrice(addonPrice)}
                        </span>
                        <span className={`text-[10px] font-semibold ${
                          isChecked ? 'text-emerald-700' : 'text-neutral-400'
                        }`}>
                          {isChecked ? 'Included in Quote' : 'Click to Add'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Step 3 Bottom Navigation */}
            <div className="p-4 sm:p-5 rounded-2xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  setCurrentStep(2);
                }}
                className="px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors flex items-center gap-1.5 self-start sm:self-auto"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Categories</span>
              </button>

              <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                <div className="text-center sm:text-right">
                  <span className="text-[11px] text-neutral-500 block">Current Estimated Investment:</span>
                  <strong className="font-mono text-base sm:text-lg text-neutral-900">
                    {formatPrice(finalPayable)}
                  </strong>
                  <span className="text-[10px] text-emerald-600 font-bold block">
                    (Free Domain + 1-Yr Cloud Hosting Included)
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setCurrentStep(4);
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-black text-white text-xs sm:text-sm font-bold hover:bg-neutral-800 transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <span>Proceed to Quote &amp; Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: LIVE TRANSPARENT INVOICE, CHECKOUT & INSTANT BOOKING */}
        {currentStep === 4 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="text-center max-w-2xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-bold mb-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>STEP 4 OF 4 • TRANSPARENT CHECKOUT &amp; BOOKING</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-neutral-900">
                Review Your Package &amp; Final Price.
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-neutral-600">
                100% Transparent. Zero surprises. Your free domain registration and 1-year NVMe cloud edge hosting have been deducted from your invoice total!
              </p>
            </div>

            {orderPlaced ? (
              /* Success Order Confirmation Card */
              <div className="max-w-2xl mx-auto p-6 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200 text-center space-y-5 shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <Check className="w-8 h-8" />
                </div>

                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-emerald-700 font-bold block mb-1">
                    ORDER REFERENCE: {orderReference}
                  </span>
                  <h4 className="text-2xl sm:text-3xl font-display font-extrabold text-neutral-900">
                    Website Order &amp; Free Domain Locked In!
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-600 mt-2 max-w-md mx-auto">
                    Thank you, <strong>{clientName || 'Partner'}</strong>! Your order for <strong>{chosenDomain || 'your custom domain'}</strong> and the <strong>{activeCategory.name}</strong> ({activeTier.name}) package has been logged.
                  </p>
                </div>

                {/* Key Summary Box */}
                <div className="p-4 rounded-xl bg-white border border-neutral-200 text-left space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Reserved Free Domain:</span>
                    <strong className="font-mono text-neutral-900">{chosenDomain || 'To be selected'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Website Package:</span>
                    <strong className="text-neutral-900">{activeCategory.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">Tier:</span>
                    <strong className="text-neutral-900">{activeTier.name}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-500">1-Year Cloud Hosting &amp; SSL:</span>
                    <strong className="text-emerald-600 font-bold">100% FREE ($0)</strong>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-neutral-100 text-sm">
                    <span className="font-bold text-neutral-900">Final Investment Total:</span>
                    <strong className="font-mono font-extrabold text-neutral-900">{formatPrice(finalPayable)}</strong>
                  </div>
                </div>

                <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={generateWhatsAppMessage()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSound('click')}
                    className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-white" />
                    <span>Confirm Order on WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-neutral-200 hover:bg-neutral-300 text-neutral-800 font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    {copiedInvoice ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-700" />
                        <span>Copied Summary!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Order Slip</span>
                      </>
                    )}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    onNavigateHome();
                  }}
                  className="text-xs text-neutral-500 hover:text-neutral-900 underline block mx-auto pt-2"
                >
                  Return to Main Portfolio
                </button>
              </div>
            ) : (
              /* Two-Column Checkout Layout: Live Invoice (Left) + Order Details Form (Right) */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Column: Live Itemized Breakdown & Savings Slip (7 Cols) */}
                <div className="lg:col-span-7 bg-neutral-50 rounded-3xl p-6 sm:p-8 border border-neutral-200 space-y-6">
                  <div className="flex items-center justify-between border-b border-neutral-200 pb-4">
                    <div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 font-bold block">
                        ITEMIZED INVOICE ESTIMATE
                      </span>
                      <h4 className="text-xl font-display font-bold text-neutral-900">
                        {activeCategory.name}
                      </h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full bg-neutral-200 text-neutral-800 text-xs font-mono font-bold">
                      {activeTier.timeline}
                    </span>
                  </div>

                  {/* Line Items List */}
                  <div className="space-y-3 text-xs sm:text-sm">
                    {/* Item 1: Base Tier */}
                    <div className="flex items-start justify-between gap-4 py-2 border-b border-neutral-200/60">
                      <div>
                        <strong className="text-neutral-900 block">{activeTier.name}</strong>
                        <span className="text-neutral-500 text-xs">{activeTier.summary}</span>
                      </div>
                      <span className="font-mono font-bold text-neutral-900 shrink-0">
                        {formatPrice(basePrice)}
                      </span>
                    </div>

                    {/* Selected Addons */}
                    {selectedAddonIds.map((addonId) => {
                      const addon = SYSTEM_ADDONS.find((a) => a.id === addonId);
                      if (!addon) return null;
                      const price = currency === 'NPR' ? addon.priceNPR : addon.priceUSD;
                      return (
                        <div key={addonId} className="flex items-start justify-between gap-4 py-1.5 border-b border-neutral-200/60">
                          <div>
                            <span className="text-neutral-800 font-medium block">{addon.name}</span>
                            <span className="text-[11px] text-neutral-400">System Integration Add-on</span>
                          </div>
                          <span className="font-mono text-neutral-800 shrink-0">
                            +{formatPrice(price)}
                          </span>
                        </div>
                      );
                    })}

                    {/* Special Offer Waived Items (Prominently Listed with $0 and strike-through!) */}
                    <div className="pt-2 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block">
                        🎁 SPECIAL OFFER BONUSES APPLIED (100% FREE):
                      </span>

                      {/* Free Domain */}
                      <div className="flex items-center justify-between bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2">
                          <Globe className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <div>
                            <span className="font-bold text-emerald-950">
                              Custom Domain: {chosenDomain || 'Selected Domain (.com/.io/etc.)'}
                            </span>
                            <span className="text-[10px] text-emerald-700 block">
                              1-Year Free Registration &amp; DNS Management
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="line-through text-neutral-400 text-xs font-mono mr-1.5">
                            {formatPrice(currency === 'NPR' ? SPECIAL_OFFER_INCLUSIONS.domain.retailNPR : SPECIAL_OFFER_INCLUSIONS.domain.retailUSD)}
                          </span>
                          <span className="font-mono font-bold text-emerald-700">FREE ($0)</span>
                        </div>
                      </div>

                      {/* Free Cloud Hosting */}
                      <div className="flex items-center justify-between bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2">
                          <Server className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <div>
                            <span className="font-bold text-emerald-950">
                              1-Year High-Speed NVMe Cloud Edge Hosting
                            </span>
                            <span className="text-[10px] text-emerald-700 block">
                              Sub-second TTFB, 99.9% uptime SLA, CDN Edge Caching
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="line-through text-neutral-400 text-xs font-mono mr-1.5">
                            {formatPrice(currency === 'NPR' ? SPECIAL_OFFER_INCLUSIONS.hosting.retailNPR : SPECIAL_OFFER_INCLUSIONS.hosting.retailUSD)}
                          </span>
                          <span className="font-mono font-bold text-emerald-700">FREE ($0)</span>
                        </div>
                      </div>

                      {/* Free SSL Padlock */}
                      <div className="flex items-center justify-between bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-xs">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                          <div>
                            <span className="font-bold text-emerald-950">
                              Grade A+ Automated SSL Padlock Encryption
                            </span>
                            <span className="text-[10px] text-emerald-700 block">
                              Zero SSL expiry warnings, automatic renewals
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="line-through text-neutral-400 text-xs font-mono mr-1.5">
                            {formatPrice(currency === 'NPR' ? SPECIAL_OFFER_INCLUSIONS.ssl.retailNPR : SPECIAL_OFFER_INCLUSIONS.ssl.retailUSD)}
                          </span>
                          <span className="font-mono font-bold text-emerald-700">FREE ($0)</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Financial Totals Calculation Box */}
                  <div className="pt-4 border-t border-neutral-300 space-y-2">
                    <div className="flex justify-between text-xs text-neutral-500">
                      <span>Standard Retail Value (Without Offer):</span>
                      <span className="font-mono line-through">{formatPrice(totalBeforeFreeBonus)}</span>
                    </div>

                    <div className="flex justify-between text-xs font-bold text-emerald-700">
                      <span>Special Offer Free Bonus Savings:</span>
                      <span className="font-mono">-{formatPrice(freeBonusValue)}</span>
                    </div>

                    <div className="pt-2 border-t border-neutral-200 flex items-baseline justify-between">
                      <div>
                        <span className="font-display font-extrabold text-lg sm:text-xl text-neutral-900 block">
                          Final Website Investment:
                        </span>
                        <span className="text-[11px] text-neutral-500">
                          (Free 1-Yr Domain + Hosting + SSL included at $0)
                        </span>
                      </div>
                      <div className="text-right">
                        <strong className="font-mono text-2xl sm:text-3xl font-extrabold text-neutral-950">
                          {formatPrice(finalPayable)}
                        </strong>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-900 flex items-center justify-between">
                      <span>Standard Milestone Deposit (50% to start):</span>
                      <strong className="font-mono font-bold text-xs">{formatPrice(milestoneDeposit)}</strong>
                    </div>
                  </div>

                  {/* Guarantees */}
                  <div className="grid grid-cols-2 gap-2 pt-2 text-[11px] text-neutral-600 font-medium">
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>100% Code &amp; DNS Ownership</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>30 Days Free Post-Launch Support</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Zero Developer Lock-In</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span>On-Time Launch Guarantee</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Checkout Form (5 Cols) */}
                <div className="lg:col-span-5 space-y-5">
                  {/* Main Checkout Form Card */}
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200 shadow-sm space-y-5">
                    <div className="border-b border-neutral-100 pb-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                        CLIENT INFORMATION
                      </span>
                      <h4 className="text-lg font-display font-bold text-neutral-900">
                        Where should we send your official quote?
                      </h4>
                    </div>

                  <form onSubmit={handlePlaceOrder} className="space-y-4">
                    {/* Chosen Domain Display */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                        Locked Free Domain Name*
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-emerald-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={chosenDomain}
                          onChange={(e) => setChosenDomain(e.target.value)}
                          placeholder="e.g. brandname.com"
                          className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-neutral-300 font-mono text-xs sm:text-sm font-bold text-neutral-900 bg-neutral-50/70 focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                        Your Full Name*
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sujan Shrestha / John Doe"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                          WhatsApp / Phone*
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+977 98XXXXXXXX"
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                          Email Address*
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="name@company.com"
                          value={clientEmail}
                          onChange={(e) => setClientEmail(e.target.value)}
                          className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                        Business / Brand Name (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Zenith Apparel or Vertex Tech"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
                        Project Notes / Specific Feature Needs (Optional)
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Any specific design inspiration, target launch date, or reference links..."
                        value={projectNotes}
                        onChange={(e) => setProjectNotes(e.target.value)}
                        className="w-full px-3.5 py-2 rounded-xl border border-neutral-300 text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
                      />
                    </div>

                    {/* Payment milestone choice */}
                    <div>
                      <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1.5">
                        Payment Preference
                      </label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button
                          type="button"
                          onClick={() => setPaymentPreference('milestone')}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                            paymentPreference === 'milestone'
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          <span className="block text-[11px]">50% Milestone Start</span>
                          <span className="text-[10px] opacity-75 font-mono">({formatPrice(milestoneDeposit)})</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => setPaymentPreference('full')}
                          className={`p-2.5 rounded-xl border text-left font-semibold transition-all ${
                            paymentPreference === 'full'
                              ? 'bg-neutral-900 text-white border-neutral-900'
                              : 'bg-neutral-50 text-neutral-700 border-neutral-200'
                          }`}
                        >
                          <span className="block text-[11px]">100% Full Upfront</span>
                          <span className="text-[10px] opacity-75 font-mono">({formatPrice(finalPayable)})</span>
                        </button>
                      </div>
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-3 space-y-2.5">
                      <button
                        type="button"
                        onClick={() => {
                          playSound('click');
                          setIsPaymentModalOpen(true);
                        }}
                        className="w-full py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                      >
                        <CreditCard className="w-4 h-4 text-white" />
                        <span>Proceed to Secure Payment ({formatPrice(paymentPreference === 'milestone' ? milestoneDeposit : finalPayable)})</span>
                      </button>

                      <button
                        type="submit"
                        className="w-full py-3.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs sm:text-sm transition-all shadow-sm active:scale-95 flex items-center justify-center gap-2"
                      >
                        <span>Lock In Offer &amp; Generate Invoice</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <a
                        href={generateWhatsAppMessage()}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => playSound('click')}
                        className="w-full py-3 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-xs"
                      >
                        <WhatsAppIcon className="w-4 h-4 text-white" />
                        <span>Instant Checkout via WhatsApp</span>
                      </a>

                      <button
                        type="button"
                        onClick={() => {
                          playSound('click');
                          setIsInvoiceModalOpen(true);
                        }}
                        className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-neutral-950 font-black text-xs sm:text-sm transition-all shadow-sm flex items-center justify-center gap-2"
                      >
                        <FileText className="w-4 h-4 text-neutral-950" />
                        <span>📄 View &amp; Download Official PDF Invoice</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>

              </div>
            )}

            {/* Back to Step 3 */}
            {!orderPlaced && (
              <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
                <button
                  type="button"
                  onClick={() => {
                    playSound('click');
                    setCurrentStep(3);
                  }}
                  className="px-4 py-2 rounded-xl border border-neutral-300 bg-white hover:bg-neutral-100 text-xs font-bold text-neutral-800 transition-colors flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Tier &amp; Add-ons</span>
                </button>
                <span className="text-xs text-neutral-400">
                  Step 4 of 4 • Guaranteed 1-Year Free Domain &amp; NVMe Cloud Hosting Included
                </span>
              </div>
            )}

          </motion.div>
        )}

      </div>

      {/* Client Payment Modal */}
      <ClientPaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        orderReference={orderReference || `GK-${Math.floor(100000 + Math.random() * 900000)}`}
        domain={chosenDomain}
        categoryName={activeCategory.name}
        tierName={activeTier.name}
        amount={paymentPreference === 'milestone' ? milestoneDeposit : finalPayable}
        formattedAmount={formatPrice(paymentPreference === 'milestone' ? milestoneDeposit : finalPayable)}
        currency={currency}
        paymentPreference={paymentPreference}
        clientName={clientName}
        clientEmail={clientEmail}
        clientPhone={clientPhone}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Official Invoice & PDF Modal */}
      <InvoiceModal
        isOpen={isInvoiceModalOpen}
        onClose={() => setIsInvoiceModalOpen(false)}
        orderReference={orderReference || `GK-${Math.floor(100000 + Math.random() * 900000)}`}
        domain={chosenDomain}
        categoryName={activeCategory.name}
        tierName={activeTier.name}
        tierTimeline={activeTier.timeline}
        addons={selectedAddonIds.map(id => {
          const a = SYSTEM_ADDONS.find(item => item.id === id);
          return { name: a?.name || id, price: formatPrice(currency === 'NPR' ? a?.priceNPR || 0 : a?.priceUSD || 0) };
        })}
        currency={currency}
        totalValue={basePrice + addonsTotal}
        freeBonusValue={freeBonusValue}
        finalPayable={finalPayable}
        formattedFinal={formatPrice(finalPayable)}
        formattedTotal={formatPrice(basePrice + addonsTotal)}
        formattedBonus={formatPrice(freeBonusValue)}
        clientName={clientName}
        clientEmail={clientEmail}
        clientPhone={clientPhone}
        businessName={businessName}
        paymentStatus={paymentConfirmed ? 'paid' : 'pending'}
        paymentMethod={paymentMethodUsed}
        paymentTxnId={paymentTxnId}
        paymentTimestamp={paymentTimestamp}
      />
    </div>
  );
};
