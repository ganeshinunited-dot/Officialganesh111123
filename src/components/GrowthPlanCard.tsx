import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ShieldCheck, 
  Copy, 
  Layers, 
  TrendingUp, 
  Crown, 
  Target, 
  UserCheck, 
  Lock,
  Zap,
  Gift,
  Globe,
  Server
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';
import { AnalyzedScope, FocusArea } from '../data/budgetAnalysis';

export interface GrowthPlanCardProps {
  scope: AnalyzedScope;
  budget: number;
  formattedBudget: string;
  focus: FocusArea;
  whatsappUrl: string;
  onApplyEstimate: () => void;
  onCopySummary: () => void;
  copied: boolean;
  onSelectFullPartnership?: () => void;
}

export const GrowthPlanCard: React.FC<GrowthPlanCardProps> = ({
  scope,
  budget,
  formattedBudget,
  focus,
  whatsappUrl,
  onApplyEstimate,
  onCopySummary,
  copied,
  onSelectFullPartnership,
}) => {
  const isPartnership = scope.tierBadge === 'Full Partnership';

  return (
    <motion.div
      key={`${scope.tierBadge}-${scope.tierName}-${focus}`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-3xl p-5 sm:p-8 lg:p-10 overflow-hidden shadow-2xl transition-all duration-300 ${
        isPartnership
          ? 'bg-neutral-950 text-white border-2 border-amber-500/30 ring-1 ring-amber-500/20'
          : 'bg-neutral-950 text-white border border-neutral-800'
      }`}
    >
      {/* Ambient Atmospheric Halos */}
      {isPartnership ? (
        <>
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-amber-500/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
        </>
      ) : (
        <>
          <div className="absolute -top-32 -right-32 w-80 h-80 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        </>
      )}

      <div className="relative z-10 space-y-8">
        
        {/* Top Executive Header Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-800/90">
          <div>
            {/* Badges Row */}
            <div className="flex flex-wrap items-center gap-2.5 mb-2.5">
              {isPartnership ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/40 text-xs font-bold uppercase tracking-wider shadow-xs">
                  <Crown className="w-3.5 h-3.5 text-amber-400" />
                  <span>Full Partnership • Flagship Tier</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-white border border-white/20 text-xs font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-sky-400" />
                  <span>{scope.tierBadge}</span>
                </span>
              )}

              {/* Free Domain & Hosting Bonus Badge */}
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-400/15 text-emerald-300 border border-emerald-400/30 text-xs font-semibold">
                <Gift className="w-3.5 h-3.5 text-emerald-400" />
                <span>Free Domain + Hosting Included ($280 Value)</span>
              </span>

              <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
                Recommended Growth Plan
              </span>
            </div>

            {/* Title & Tagline */}
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white tracking-tight">
              {scope.tierName}
            </h3>

            <p className="text-sm sm:text-base text-neutral-300 mt-2 max-w-3xl leading-relaxed">
              {scope.tagline}
            </p>
          </div>

          {/* Right Header Status & Quick Action */}
          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2.5 shrink-0">
            {/* Live Calibrated Status */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-xs text-neutral-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
              <span>
                Calibrated for <strong className="text-white font-mono">{formattedBudget}</strong>
              </span>
            </div>

            {/* Quick-switch to Full Partnership if not currently active */}
            {!isPartnership && onSelectFullPartnership && (
              <button
                type="button"
                onClick={() => {
                  playSound('click');
                  onSelectFullPartnership();
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400/10 hover:bg-amber-400/20 border border-amber-400/30 text-amber-300 text-xs font-semibold transition-all active:scale-95"
              >
                <Crown className="w-3 h-3 text-amber-400" />
                <span>Switch to Full Partnership ($8,500)</span>
              </button>
            )}
          </div>
        </div>

        {/* Executive 4-Stat Metric Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Stat 1: Investment */}
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 text-left">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
              Investment Allocation
            </span>
            <span className="text-lg sm:text-xl font-display font-extrabold text-white mt-0.5 block font-mono">
              {formattedBudget}
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              {isPartnership ? 'Monthly Retainer' : 'Project Growth Scope'}
            </span>
          </div>

          {/* Stat 2: Timeline */}
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 text-left">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
              Timeline &amp; Cadence
            </span>
            <span className="text-sm sm:text-base font-bold text-white mt-1 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-sky-400 shrink-0" />
              <span>{scope.timelineWeeks}</span>
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              Weekly progress reviews
            </span>
          </div>

          {/* Stat 3: Direct Access */}
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 text-left">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
              Direct Communication
            </span>
            <span className="text-xs sm:text-sm font-bold text-emerald-400 mt-1 flex items-center gap-1.5 truncate">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span className="truncate">{scope.directSupport}</span>
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              VIP WhatsApp &amp; Slack
            </span>
          </div>

          {/* Stat 4: Execution Model */}
          <div className="p-4 rounded-2xl bg-neutral-900/80 border border-neutral-800/90 text-left">
            <span className="text-[10px] text-neutral-400 uppercase tracking-widest font-semibold block">
              Delivery Architect
            </span>
            <span className="text-xs sm:text-sm font-bold text-white mt-1 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Direct with Ganesh</span>
            </span>
            <span className="text-[11px] text-neutral-400 mt-0.5 block">
              Zero junior handoffs
            </span>
          </div>
        </div>

        {/* 3 Core Tactical Pillars ("What Work Will Be Executed") */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-neutral-400">
              Core Execution Pillars ({scope.metaAdsTasks.length + scope.designTasks.length + scope.trackingTasks.length} Scope Points)
            </h4>
            <span className="text-xs text-neutral-400 font-mono hidden sm:inline-block">
              Calibrated to maximize ROI
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 items-stretch">
            
            {/* Pillar 1: Meta Ads Strategy & Acquisition */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-blue-400 block">
                      Pillar 01 • Acquisition
                    </span>
                    <h5 className="text-sm font-bold text-white">
                      Meta Ads Strategy &amp; Scaling
                    </h5>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-4 mt-3 border-t border-neutral-800">
                  {scope.metaAdsTasks.map((task, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 2: UI/UX & Web Conversion Craft */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center justify-center shrink-0">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-purple-400 block">
                      Pillar 02 • Conversion Craft
                    </span>
                    <h5 className="text-sm font-bold text-white">
                      UI/UX &amp; High-Converting Web
                    </h5>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-4 mt-3 border-t border-neutral-800">
                  {scope.designTasks.map((task, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-purple-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Pillar 3: Tracking, CAPI & Measurement (Spans full width on tablet for symmetry) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/90 border border-neutral-800/90 hover:border-neutral-700 transition-colors flex flex-col justify-between md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-widest text-emerald-400 block">
                      Pillar 03 • Attribution &amp; Data
                    </span>
                    <h5 className="text-sm font-bold text-white">
                      Tracking, CAPI &amp; Analytics
                    </h5>
                  </div>
                </div>

                <ul className="space-y-2.5 pt-4 mt-3 border-t border-neutral-800">
                  {scope.trackingTasks.map((task, idx) => (
                    <li key={idx} className="text-xs text-neutral-300 flex items-start gap-2.5 leading-relaxed">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Expected Strategic Impact Highlight Card */}
              <div className="mt-4 p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800 text-xs">
                <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                  <Target className="w-3.5 h-3.5" />
                  <span className="text-[10px] uppercase tracking-wider font-bold">
                    Strategic Business Outcome
                  </span>
                </div>
                <p className="text-neutral-300 text-xs leading-relaxed">
                  {scope.expectedImpact}
                </p>
              </div>
            </div>

          </div>
        </div>

        {/* Special High-Value Offer Banner: Free Domain & Hosting */}
        <div className="relative rounded-2xl p-5 sm:p-6 bg-gradient-to-br from-amber-500/10 via-neutral-900/90 to-emerald-500/10 border border-amber-400/30 overflow-hidden shadow-lg">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5">
            <div className="space-y-2 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[11px] font-bold uppercase tracking-wider">
                  <Gift className="w-3 h-3 text-amber-400" />
                  Exclusive Client Welcome Offer
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 text-[11px] font-semibold border border-emerald-400/30 font-mono">
                  $280 Retail Value • 100% Free
                </span>
              </div>

              <h4 className="text-lg sm:text-xl font-display font-extrabold text-white tracking-tight">
                Free Custom Domain (.com) + 1-Year Ultra-Fast Cloud NVMe Hosting
              </h4>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Launch without technical hurdles or hidden maintenance costs. Every project includes your own custom domain registration (.com, .io, or brand extension) and high-speed NVMe cloud hosting with automated SSL encryption. Registered directly in your business name with 100% client ownership.
              </p>
            </div>

            {/* 4 Feature Badges */}
            <div className="grid grid-cols-2 gap-2.5 shrink-0 w-full lg:w-auto">
              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Free Custom Domain</span>
                  <span className="text-[10px] text-neutral-400">.com / .io (1-Yr Free)</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2.5">
                <Server className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">NVMe Cloud Hosting</span>
                  <span className="text-[10px] text-neutral-400">99.9% Uptime &amp; Speed</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">Free SSL Certificate</span>
                  <span className="text-[10px] text-neutral-400">HTTPS Padlock Security</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-neutral-900/90 border border-neutral-800 text-xs text-neutral-200 flex items-center gap-2.5">
                <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                <div>
                  <span className="font-semibold text-white block">100% Client Owned</span>
                  <span className="text-[10px] text-neutral-400">Zero Contract Lock-in</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tangible Client Deliverables Shelf */}
        <div className="p-5 sm:p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800/80">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Included Tangible Deliverables ({scope.keyDeliverables.length}):</span>
            </span>
            <span className="text-[11px] text-neutral-400 font-mono">
              100% Client Owned • Direct Source Files &amp; Full IP Access
            </span>
          </div>

          <div className="flex flex-wrap gap-2 pt-1">
            {scope.keyDeliverables.map((item, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-800/90 text-neutral-200 text-xs font-medium border border-neutral-700/80 shadow-xs"
              >
                <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Conversion Action Dock (Bottom CTA) */}
        <div className="pt-6 border-t border-neutral-800 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5">
          <div>
            <div className="text-sm font-bold text-white">
              Ready to activate this {isPartnership ? 'Full Partnership' : 'Growth Plan'}?
            </div>
            <p className="text-xs text-neutral-400 mt-0.5">
              Discuss directly on WhatsApp or submit your proposal request. Direct contact with Ganesh Karki.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-end gap-2.5 sm:gap-3 w-full lg:w-auto">
            {/* WhatsApp Direct Chat Button */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => playSound('click')}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 text-center"
            >
              <WhatsAppIcon className="w-4 h-4 flex-shrink-0" />
              <span>{isPartnership ? 'Chat on WhatsApp (Full Partnership)' : 'Chat on WhatsApp with this Plan'}</span>
            </a>

            {/* Request Proposal Button */}
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onApplyEstimate();
              }}
              className="w-full sm:w-auto min-h-[48px] px-6 py-3 rounded-full bg-white text-black hover:bg-neutral-200 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 text-center"
            >
              <span>Lock in this Scope</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Copy Plan Summary Button */}
            <button
              type="button"
              onClick={onCopySummary}
              className="w-full sm:w-auto min-h-[46px] px-4 py-3 rounded-full border border-neutral-700 hover:border-neutral-500 bg-neutral-900 text-neutral-300 hover:text-white transition-colors flex items-center justify-center gap-2 text-xs font-medium"
              title="Copy growth plan summary"
              aria-label="Copy growth plan summary"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy Summary'}</span>
            </button>
          </div>
        </div>

        {/* Assurance / Trust Footer Row */}
        <div className="pt-4 border-t border-neutral-900 grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-neutral-400">
          <div className="flex items-center gap-1.5">
            <span className="text-emerald-400 font-bold">⚡</span>
            <span>24h Rapid Response</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Lock className="w-3 h-3 text-neutral-400" />
            <span>No Locked Contracts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <UserCheck className="w-3 h-3 text-amber-400" />
            <span>Direct with Ganesh</span>
          </div>
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3 h-3 text-blue-400" />
            <span>100% Asset Ownership</span>
          </div>
        </div>

      </div>
    </motion.div>
  );
};
