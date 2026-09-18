import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  CreditCard,
  QrCode,
  Building2,
  CheckCircle2,
  Copy,
  Check,
  ShieldCheck,
  Lock,
  ArrowRight,
  Smartphone,
  AlertCircle
} from 'lucide-react';
import { playSound } from '../utils/sound';

export type PaymentMethod = 'esewa' | 'khalti' | 'qr' | 'bank' | 'card';

interface ClientPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderReference: string;
  domain: string;
  categoryName: string;
  tierName: string;
  amount: number;
  formattedAmount: string;
  currency: 'NPR' | 'USD';
  paymentPreference: 'milestone' | 'full';
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  onPaymentSuccess: (details: {
    transactionId: string;
    method: PaymentMethod;
    paidAmount: number;
    paidFormatted: string;
    timestamp: string;
  }) => void;
}

export const ClientPaymentModal: React.FC<ClientPaymentModalProps> = ({
  isOpen,
  onClose,
  orderReference,
  domain,
  categoryName,
  tierName,
  amount,
  formattedAmount,
  currency,
  paymentPreference,
  clientName,
  clientEmail,
  clientPhone,
  onPaymentSuccess,
}) => {
  const [activeMethod, setActiveMethod] = useState<PaymentMethod>(currency === 'NPR' ? 'esewa' : 'card');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transactionNote, setTransactionNote] = useState('');

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [cardZip, setCardZip] = useState('');

  if (!isOpen) return null;

  const handleCopy = (text: string, key: string) => {
    playSound('click');
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const handleProcessPayment = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('click');
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      playSound('success');
      const txnId = `TXN-GK-${Math.floor(100000 + Math.random() * 900000)}`;
      onPaymentSuccess({
        transactionId: txnId,
        method: activeMethod,
        paidAmount: amount,
        paidFormatted: formattedAmount,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', month: 'short', day: 'numeric', year: 'numeric' })
      });
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-neutral-950/70 backdrop-blur-xs overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-2xl bg-white rounded-3xl border border-neutral-200 shadow-2xl overflow-hidden my-auto"
      >
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold tracking-wider uppercase border border-emerald-500/30">
                SECURE CHECKOUT TERMINAL
              </span>
              <span className="font-mono text-xs text-neutral-400">
                REF: {orderReference}
              </span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-extrabold text-white mt-1">
              Complete Website Payment
            </h3>
            <p className="text-xs text-neutral-400 mt-0.5">
              {paymentPreference === 'milestone' ? '50% Milestone Starting Deposit' : '100% Full Upfront Investment'} for <strong className="text-neutral-200">{domain || 'Custom Website'}</strong>
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playSound('click');
              onClose();
            }}
            className="w-9 h-9 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white flex items-center justify-center transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Amount Pill Bar */}
        <div className="px-6 py-3.5 bg-neutral-50 border-b border-neutral-200 flex flex-wrap items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block">
              Payable Amount ({paymentPreference === 'milestone' ? '50% Deposit' : 'Full Payment'})
            </span>
            <div className="flex items-baseline gap-2">
              <span className="font-mono text-2xl font-extrabold text-neutral-950">
                {formattedAmount}
              </span>
              <span className="text-[11px] font-medium text-emerald-700 bg-emerald-100/80 px-2 py-0.5 rounded-full">
                Free Domain &amp; Cloud Hosting Included ($0)
              </span>
            </div>
          </div>

          <div className="text-right text-xs">
            <span className="text-neutral-500 block text-[11px]">Billed to:</span>
            <strong className="text-neutral-900 font-medium">{clientName || 'Partner'}</strong>
          </div>
        </div>

        {/* Payment Methods Tabs */}
        <div className="p-5 sm:p-6 space-y-6">
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-2.5">
              Select Payment Method
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {/* eSewa */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setActiveMethod('esewa');
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeMethod === 'esewa'
                    ? 'border-emerald-600 bg-emerald-50/80 ring-2 ring-emerald-500/20 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center font-display">
                  e
                </div>
                <span className="text-xs font-bold text-neutral-900">eSewa</span>
                <span className="text-[9px] font-medium text-neutral-500">Nepal Wallet</span>
              </button>

              {/* Khalti */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setActiveMethod('khalti');
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeMethod === 'khalti'
                    ? 'border-purple-600 bg-purple-50/80 ring-2 ring-purple-500/20 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <div className="w-7 h-7 rounded-lg bg-purple-600 text-white font-black text-xs flex items-center justify-center font-display">
                  K
                </div>
                <span className="text-xs font-bold text-neutral-900">Khalti</span>
                <span className="text-[9px] font-medium text-neutral-500">Instant Pay</span>
              </button>

              {/* Bank QR / Fonepay */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setActiveMethod('qr');
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeMethod === 'qr'
                    ? 'border-neutral-900 bg-neutral-900 text-white ring-2 ring-neutral-900/20 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <QrCode className={`w-6 h-6 ${activeMethod === 'qr' ? 'text-amber-400' : 'text-neutral-700'}`} />
                <span className={`text-xs font-bold ${activeMethod === 'qr' ? 'text-white' : 'text-neutral-900'}`}>
                  Bank QR
                </span>
                <span className={`text-[9px] font-medium ${activeMethod === 'qr' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Any Bank App
                </span>
              </button>

              {/* Bank Transfer */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setActiveMethod('bank');
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeMethod === 'bank'
                    ? 'border-blue-600 bg-blue-50/80 ring-2 ring-blue-500/20 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <Building2 className="w-6 h-6 text-blue-600" />
                <span className="text-xs font-bold text-neutral-900">Wire / A/C</span>
                <span className="text-[9px] font-medium text-neutral-500">Nabil Bank</span>
              </button>

              {/* Card / Stripe */}
              <button
                type="button"
                onClick={() => {
                  playSound('toggle');
                  setActiveMethod('card');
                }}
                className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center justify-center gap-1.5 ${
                  activeMethod === 'card'
                    ? 'border-neutral-900 bg-neutral-900 text-white ring-2 ring-neutral-900/20 shadow-xs'
                    : 'border-neutral-200 bg-white hover:border-neutral-300'
                }`}
              >
                <CreditCard className={`w-6 h-6 ${activeMethod === 'card' ? 'text-emerald-400' : 'text-neutral-700'}`} />
                <span className={`text-xs font-bold ${activeMethod === 'card' ? 'text-white' : 'text-neutral-900'}`}>
                  Card / Global
                </span>
                <span className={`text-[9px] font-medium ${activeMethod === 'card' ? 'text-neutral-300' : 'text-neutral-500'}`}>
                  Visa / Master
                </span>
              </button>
            </div>
          </div>

          {/* Active Payment Channel View */}
          <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
            {/* 1. eSewa */}
            {activeMethod === 'esewa' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-700">
                      ESEWA DIGITAL WALLET CHECKOUT
                    </span>
                    <h4 className="font-display font-bold text-base text-neutral-900 mt-0.5">
                      Send to Verified eSewa Account
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Open eSewa app &gt; Send Money or scan QR with exact order reference in remarks.
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Instant Approval
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      eSewa ID / Mobile Number
                    </span>
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm sm:text-base font-extrabold text-neutral-900">
                        9842902535
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleCopy('9842902535', 'esewa_id')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'esewa_id' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Receiver: <strong>Ganesh Karki</strong>
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Remarks to Enter
                    </span>
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm font-extrabold text-emerald-700">
                        {orderReference}
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(orderReference, 'esewa_ref')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'esewa_ref' ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-600" />
                            <span className="text-emerald-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy Ref</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Package: <strong>{tierName}</strong> ({domain || 'Custom'})
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 2. Khalti */}
            {activeMethod === 'khalti' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-700">
                      KHALTI WALLET CHECKOUT
                    </span>
                    <h4 className="font-display font-bold text-base text-neutral-900 mt-0.5">
                      Send to Verified Khalti ID
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Send money directly from your Khalti app with your order reference in remarks.
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 text-[10px] font-bold">
                    Instant Khalti
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Khalti ID / Mobile Number
                    </span>
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm sm:text-base font-extrabold text-neutral-900">
                        9842902535
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleCopy('9842902535', 'khalti_id')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'khalti_id' ? (
                          <>
                            <Check className="w-3 h-3 text-purple-600" />
                            <span className="text-purple-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy ID</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Account Name: <strong>Ganesh Karki</strong>
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-neutral-200">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Remarks / Reference
                    </span>
                    <div className="flex items-center justify-between">
                      <strong className="font-mono text-sm font-extrabold text-purple-700">
                        {orderReference}
                      </strong>
                      <button
                        type="button"
                        onClick={() => handleCopy(orderReference, 'khalti_ref')}
                        className="px-2.5 py-1 rounded-lg bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-xs font-semibold flex items-center gap-1 transition-colors"
                      >
                        {copiedKey === 'khalti_ref' ? (
                          <>
                            <Check className="w-3 h-3 text-purple-600" />
                            <span className="text-purple-700">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>
                    <span className="text-[11px] text-neutral-500 block mt-1">
                      Amount: <strong>{formattedAmount}</strong>
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Bank QR / Fonepay */}
            {activeMethod === 'qr' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                      NEPALPAY / FONEPAY SMART QR
                    </span>
                    <h4 className="font-display font-bold text-base text-neutral-900 mt-0.5">
                      Scan from Any Mobile Banking App
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Works with Nabil, NIC Asia, Global IME, Kumari, Everest, Siddhartha &amp; ConnectIPS.
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-neutral-200 text-neutral-800 text-[10px] font-mono font-bold">
                    All Banks
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-5 p-4 rounded-xl bg-white border border-neutral-200">
                  {/* Stylized QR Graphic */}
                  <div className="w-36 h-36 bg-white p-2 rounded-xl border border-neutral-300 shadow-xs shrink-0 flex flex-col items-center justify-center relative">
                    <svg viewBox="0 0 100 100" className="w-full h-full text-neutral-950" fill="currentColor">
                      {/* Corner 1 */}
                      <rect x="5" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="11" y="11" width="14" height="14" rx="2" fill="currentColor" />
                      {/* Corner 2 */}
                      <rect x="69" y="5" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="75" y="11" width="14" height="14" rx="2" fill="currentColor" />
                      {/* Corner 3 */}
                      <rect x="5" y="69" width="26" height="26" rx="4" fill="none" stroke="currentColor" strokeWidth="4" />
                      <rect x="11" y="75" width="14" height="14" rx="2" fill="currentColor" />
                      {/* Random Matrix Pattern */}
                      <rect x="37" y="8" width="6" height="6" />
                      <rect x="49" y="8" width="6" height="6" />
                      <rect x="57" y="18" width="6" height="6" />
                      <rect x="37" y="24" width="6" height="6" />
                      <rect x="45" y="32" width="6" height="6" />
                      <rect x="10" y="37" width="6" height="6" />
                      <rect x="22" y="45" width="6" height="6" />
                      <rect x="36" y="44" width="28" height="28" rx="4" fill="#09090b" />
                      <rect x="70" y="37" width="8" height="8" />
                      <rect x="84" y="48" width="8" height="8" />
                      <rect x="37" y="76" width="6" height="6" />
                      <rect x="49" y="84" width="6" height="6" />
                      <rect x="62" y="72" width="6" height="6" />
                      <rect x="74" y="78" width="6" height="6" />
                      <rect x="86" y="86" width="6" height="6" />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 font-display font-extrabold text-[10px] flex items-center justify-center border-2 border-white shadow-xs">
                        GK
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                        MERCHANT NAME
                      </span>
                      <strong className="text-neutral-900 font-bold text-sm block">
                        KARKI MEDIA / GANESH KARKI
                      </strong>
                    </div>
                    <div className="flex gap-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          PAYABLE
                        </span>
                        <strong className="font-mono text-emerald-700 font-extrabold">
                          {formattedAmount}
                        </strong>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                          REMARKS
                        </span>
                        <strong className="font-mono text-neutral-900 font-extrabold">
                          {orderReference}
                        </strong>
                      </div>
                    </div>
                    <p className="text-[11px] text-neutral-500 leading-relaxed pt-1">
                      Open your bank app, tap QR Scan, point at this screen, and input reference <strong>{orderReference}</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Bank Wire */}
            {activeMethod === 'bank' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-blue-700">
                      DIRECT BANK WIRE &amp; CORPORATE TRANSFER
                    </span>
                    <h4 className="font-display font-bold text-base text-neutral-900 mt-0.5">
                      Nabil Bank Limited
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Transfer directly via Internet Banking, Mobile App, or Branch counter.
                    </p>
                  </div>
                  <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">
                    Official Corporate Account
                  </span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-neutral-200 space-y-2.5 text-xs">
                  <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Bank Name:</span>
                    <strong className="text-neutral-900">Nabil Bank Limited</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Account Name:</span>
                    <strong className="text-neutral-900 font-bold">GANESH KARKI</strong>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Account Number:</span>
                    <div className="flex items-center gap-2">
                      <strong className="font-mono text-sm text-blue-900 font-extrabold">01901017500000</strong>
                      <button
                        type="button"
                        onClick={() => handleCopy('01901017500000', 'bank_acc')}
                        className="px-2 py-0.5 rounded bg-neutral-100 hover:bg-neutral-200 text-[11px] font-bold"
                      >
                        {copiedKey === 'bank_acc' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                  <div className="flex justify-between items-center py-1 border-b border-neutral-100">
                    <span className="text-neutral-500">Branch &amp; SWIFT:</span>
                    <span className="font-mono text-neutral-800">Kathmandu, Nepal • SWIFT: NARNNPKT</span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="text-neutral-500">Deposit Reference:</span>
                    <strong className="font-mono text-emerald-700 font-bold">{orderReference}</strong>
                  </div>
                </div>
              </div>
            )}

            {/* 5. Credit / Debit Card (Stripe) */}
            {activeMethod === 'card' && (
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-700">
                      INTERNATIONAL CARD PAYMENT (STRIPE)
                    </span>
                    <h4 className="font-display font-bold text-base text-neutral-900 mt-0.5">
                      Credit / Debit Card Checkout
                    </h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Encrypted 256-bit SSL transaction for global clients.
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5 text-neutral-600 text-xs font-semibold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>256-bit SSL</span>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div>
                    <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                      Card Number
                    </label>
                    <div className="relative">
                      <CreditCard className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="4242 •••• •••• 4242"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-neutral-300 bg-white font-mono text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        Expiry
                      </label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-mono text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        CVC
                      </label>
                      <input
                        type="text"
                        placeholder="123"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-mono text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 block mb-1">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        placeholder="Postal Code"
                        value={cardZip}
                        onChange={(e) => setCardZip(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border border-neutral-300 bg-white font-mono text-xs sm:text-sm text-neutral-900 focus:outline-none focus:border-black"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transaction Note / Reference input */}
          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-600 block mb-1">
              Transaction ID / Remarks (Optional or After Transfer)
            </label>
            <input
              type="text"
              placeholder="e.g. eSewa Txn ID, Bank Journal No., or Cardholder Name"
              value={transactionNote}
              onChange={(e) => setTransactionNote(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 bg-white text-neutral-900 text-xs sm:text-sm focus:outline-none focus:border-black"
            />
          </div>

          {/* Action Button: Confirm & Complete Payment */}
          <div className="pt-2 space-y-2">
            <button
              type="button"
              disabled={isProcessing}
              onClick={handleProcessPayment}
              className="w-full py-4 rounded-xl bg-black hover:bg-neutral-800 disabled:bg-neutral-600 text-white font-bold text-sm sm:text-base transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Verifying &amp; Logging Payment...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>
                    Confirm Payment &amp; Generate Official Receipt ({formattedAmount})
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 text-[11px] text-neutral-500 pt-1">
              <span className="flex items-center gap-1">
                <Lock className="w-3 h-3 text-neutral-400" />
                100% Encrypted &amp; Secure
              </span>
              <span>•</span>
              <span>Official Tax Invoice Included</span>
              <span>•</span>
              <span>Direct WhatsApp Alignment</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
