import React, { useState, useMemo } from 'react';
import { 
  Check, 
  Sparkles, 
  Plus, 
  Minus 
} from 'lucide-react';
import { playSound } from '../utils/sound';
import { analyzeBudget, FocusArea } from '../data/budgetAnalysis';
import { GrowthPlanCard } from './GrowthPlanCard';

interface ProjectEstimatorProps {
  onApplyEstimate: (summary: string) => void;
}

const BUDGET_PRESETS = [
  { label: 'Starter', value: 800, subtext: 'Validation' },
  { label: 'Growth', value: 2000, subtext: 'Most Popular' },
  { label: 'Scale', value: 4500, subtext: 'High-Impact' },
  { label: 'Partner', value: 8500, subtext: 'Full Retainer' }
];

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({ onApplyEstimate }) => {
  const [budget, setBudget] = useState<number>(2000);
  const [focus, setFocus] = useState<FocusArea>('all');
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'all' | 'ads' | 'design'>('all');

  // Analyze budget dynamically using our algorithm
  const scope = useMemo(() => analyzeBudget(budget, focus), [budget, focus]);

  const handleBudgetChange = (newBudget: number) => {
    const clamped = Math.max(500, Math.min(20000, newBudget));
    setBudget(clamped);
  };

  const handlePresetClick = (val: number) => {
    playSound('click');
    setBudget(val);
  };

  const handleFocusChange = (newFocus: FocusArea) => {
    playSound('toggle');
    setFocus(newFocus);
    setActiveTab(newFocus);
  };

  const formattedBudget = useMemo(() => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(budget);
  }, [budget]);

  const whatsappMessage = useMemo(() => {
    return `Hi Ganesh, I used your "Want to grow your brand" budget analyzer with a budget of ${formattedBudget}.

Recommended Plan: ${scope.tierName} (${scope.tierBadge})
Timeline: ${scope.timelineWeeks}
🎁 Special Offer Included: Free 1-Year Custom Domain + NVMe Cloud Hosting & SSL ($280 Value)

Key Deliverables:
${scope.keyDeliverables.map(d => `• ${d}`).join('\n')}

I would like to discuss this growth plan for my brand!`;
  }, [formattedBudget, scope]);

  const whatsappUrl = useMemo(() => {
    return `https://wa.me/9779842902535?text=${encodeURIComponent(whatsappMessage)}`;
  }, [whatsappMessage]);

  const handleApplyToDrawer = () => {
    playSound('click');
    const summary = `Target Budget: ${formattedBudget} | Plan: ${scope.tierName} (${scope.tierBadge}) | Focus: ${focus} | Timeline: ${scope.timelineWeeks} | Special Bonus: Free Domain & Hosting ($280 Value) | Key Deliverables: ${scope.keyDeliverables.join(', ')}`;
    onApplyEstimate(summary);
  };

  const handleCopySummary = async () => {
    playSound('click');
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="estimator" className="relative py-20 sm:py-28 bg-white border-b border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neutral-200 bg-neutral-50 text-xs font-semibold text-neutral-800">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>REAL-TIME SCOPE &amp; BUDGET ANALYZER</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-amber-300 bg-amber-50 text-xs font-bold text-amber-900 shadow-xs">
              <span className="text-sm">🎁</span>
              <span>Free Custom Domain &amp; Cloud Hosting Included ($280 Value)</span>
            </div>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-extrabold text-[#09090b] tracking-tight">
            Want to grow your brand?
          </h2>

          <p className="mt-4 text-base sm:text-lg text-neutral-600 leading-relaxed font-normal">
            Enter your planned investment budget below. My system will analyze your allocation in real-time and provide a concrete, step-by-step breakdown of exactly what deliverables, campaigns, and UI/UX work can be executed.
          </p>
        </div>

        {/* Controls Deck Container */}
        <div className="rounded-3xl border border-neutral-200/90 bg-neutral-50/60 shadow-xs overflow-hidden p-5 sm:p-8 lg:p-10 mb-8">
          
          {/* Top Controls Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8">
            
            {/* Budget Input & Stepper */}
            <div className="lg:col-span-7 space-y-5 sm:space-y-6">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <label htmlFor="budget-input" className="text-xs uppercase tracking-wider font-bold text-neutral-500">
                    Step 1: Set Your Investment Budget
                  </label>
                  <span className="text-[11px] sm:text-xs text-neutral-400 font-mono">
                    Min $500 • Max $20,000+
                  </span>
                </div>

                {/* Big Currency Display & Steppers */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="relative flex-1">
                    <div className="absolute inset-y-0 left-0 pl-3.5 sm:pl-4 flex items-center pointer-events-none text-neutral-400 font-display font-bold text-xl sm:text-2xl">
                      $
                    </div>
                    <input
                      id="budget-input"
                      type="number"
                      min="500"
                      max="50000"
                      step="100"
                      value={budget}
                      onChange={(e) => handleBudgetChange(Number(e.target.value) || 500)}
                      className="w-full pl-8 sm:pl-9 pr-3 sm:pr-4 py-3 sm:py-4 bg-white border border-neutral-300 focus:border-black focus:ring-1 focus:ring-black rounded-2xl text-xl sm:text-3xl font-display font-extrabold text-neutral-900 tracking-tight transition-all shadow-xs"
                      aria-label="Planned budget in USD"
                    />
                  </div>

                  {/* Increment / Decrement Steppers (Min 44x44 on mobile) */}
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      type="button"
                      onClick={() => {
                        playSound('click');
                        handleBudgetChange(budget - 250);
                      }}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-100 active:scale-95 text-neutral-800 flex items-center justify-center transition-all shadow-xs"
                      aria-label="Decrease budget by $250"
                    >
                      <Minus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        playSound('click');
                        handleBudgetChange(budget + 250);
                      }}
                      className="w-11 h-11 sm:w-14 sm:h-14 rounded-2xl border border-neutral-200 bg-white hover:bg-neutral-100 active:scale-95 text-neutral-800 flex items-center justify-center transition-all shadow-xs"
                      aria-label="Increase budget by $250"
                    >
                      <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    </button>
                  </div>
                </div>

                {/* Slider */}
                <div className="mt-5 space-y-2">
                  <input
                    type="range"
                    min="500"
                    max="12000"
                    step="100"
                    value={budget}
                    onChange={(e) => handleBudgetChange(Number(e.target.value))}
                    className="w-full h-2 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-black"
                    aria-label="Budget slider"
                  />
                  <div className="flex justify-between text-[11px] text-neutral-400 font-mono">
                    <span>$500 (Lean)</span>
                    <span>$3,000 (Scale)</span>
                    <span>$6,000 (Growth)</span>
                    <span>$12,000+ (Retainer)</span>
                  </div>
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400 block mb-2">
                  Quick Presets:
                </span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {BUDGET_PRESETS.map((preset) => {
                    const isSelected = budget === preset.value;
                    return (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => handlePresetClick(preset.value)}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          isSelected
                            ? 'border-black bg-black text-white shadow-xs'
                            : 'border-neutral-200 bg-white text-neutral-700 hover:border-neutral-300 hover:bg-neutral-50'
                        }`}
                      >
                        <div className="font-bold text-xs">
                          ${preset.value.toLocaleString()}
                        </div>
                        <div className={`text-[10px] mt-0.5 ${isSelected ? 'text-neutral-300' : 'text-neutral-400'}`}>
                          {preset.label} • {preset.subtext}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Strategic Focus Selector */}
            <div className="lg:col-span-5 space-y-4 lg:border-l lg:border-neutral-200 lg:pl-8 flex flex-col justify-between">
              <div>
                <label className="text-xs uppercase tracking-wider font-bold text-neutral-500 block mb-3">
                  Step 2: Choose Scope Focus
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => handleFocusChange('all')}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                      focus === 'all'
                        ? 'border-black bg-white ring-1 ring-black shadow-xs'
                        : 'border-neutral-200 bg-white/70 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-neutral-900">
                        All-in-One: Meta Ads + UI/UX Web
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Balanced growth engine combining paid acquisition and high-converting design.
                      </p>
                    </div>
                    {focus === 'all' && <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFocusChange('ads')}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                      focus === 'ads'
                        ? 'border-black bg-white ring-1 ring-black shadow-xs'
                        : 'border-neutral-200 bg-white/70 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-neutral-900">
                        Meta Ads & Paid Acquisition Focus
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Deep campaign restructuring, CAPI tracking, and continuous creative testing.
                      </p>
                    </div>
                    {focus === 'ads' && <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />}
                  </button>

                  <button
                    type="button"
                    onClick={() => handleFocusChange('design')}
                    className={`w-full p-3 rounded-xl border text-left flex items-start justify-between transition-all ${
                      focus === 'design'
                        ? 'border-black bg-white ring-1 ring-black shadow-xs'
                        : 'border-neutral-200 bg-white/70 hover:border-neutral-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold text-xs sm:text-sm text-neutral-900">
                        100% UI/UX & High-Converting Web Design
                      </div>
                      <p className="text-[11px] text-neutral-500 mt-0.5">
                        Bespoke Figma design system, rapid responsive web code, and conversion CRO.
                      </p>
                    </div>
                    {focus === 'design' && <Check className="w-4 h-4 text-black flex-shrink-0 mt-0.5" />}
                  </button>
                </div>
              </div>

              {/* Live Status Pill */}
              <div className="p-3 rounded-xl bg-white border border-neutral-200/80 flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <span className="text-xs text-neutral-600">
                  Analysis calibrated for <strong className="text-neutral-900 font-semibold">{formattedBudget}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* The Redesigned Recommended Growth Plan Card */}
        <GrowthPlanCard
          scope={scope}
          budget={budget}
          formattedBudget={formattedBudget}
          focus={focus}
          whatsappUrl={whatsappUrl}
          onApplyEstimate={handleApplyToDrawer}
          onCopySummary={handleCopySummary}
          copied={copied}
          onSelectFullPartnership={() => handlePresetClick(8500)}
        />
      </div>
    </section>
  );
};
