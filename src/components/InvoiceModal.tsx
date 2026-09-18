import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  X,
  Download,
  Printer,
  CheckCircle,
  Shield,
  FileText
} from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import { playSound } from '../utils/sound';
import { WhatsAppIcon } from './WhatsAppIcon';

interface InvoiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  orderReference: string;
  domain: string;
  categoryName: string;
  tierName: string;
  tierTimeline: string;
  addons: { name: string; price: string }[];
  currency: 'NPR' | 'USD';
  totalValue: number;
  freeBonusValue: number;
  finalPayable: number;
  formattedFinal: string;
  formattedTotal: string;
  formattedBonus: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  businessName?: string;
  paymentStatus: 'paid' | 'pending';
  paymentMethod?: string;
  paymentTxnId?: string;
  paymentTimestamp?: string;
}

export const InvoiceModal: React.FC<InvoiceModalProps> = ({
  isOpen,
  onClose,
  orderReference,
  domain,
  categoryName,
  tierName,
  tierTimeline,
  addons,
  currency,
  totalValue,
  freeBonusValue,
  finalPayable,
  formattedFinal,
  formattedTotal,
  formattedBonus,
  clientName,
  clientEmail,
  clientPhone,
  businessName,
  paymentStatus,
  paymentMethod,
  paymentTxnId,
  paymentTimestamp,
}) => {
  const invoiceRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadPDF = async () => {
    if (!invoiceRef.current) return;
    playSound('click');
    setIsDownloading(true);

    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Ganesh_Karki_Invoice_${orderReference}.pdf`);

      setDownloadSuccess(true);
      playSound('success');
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error('PDF generation error, falling back to print:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const handlePrint = () => {
    playSound('click');
    window.print();
  };

  const handleWhatsAppShare = () => {
    playSound('click');
    const text = `*OFFICIAL INVOICE & PROPOSAL*
*Ref:* ${orderReference}
*Client:* ${clientName || 'Valued Client'}
*Domain (Free 1-Yr):* ${domain || 'Custom'}
*Package:* ${categoryName} - ${tierName}
*Total Investment:* ${formattedFinal} (${paymentStatus === 'paid' ? 'PAID & VERIFIED' : 'PENDING DEPOSIT'})
*Issued By:* Karki Media / Ganesh Karki

Hi Ganesh, I am sharing my official invoice reference ${orderReference}.`;
    window.open(`https://wa.me/9779842902535?text=${encodeURIComponent(text)}`, '_blank');
  };

  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const dueDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-neutral-950/85 backdrop-blur-sm overflow-y-auto">
      <style>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-invoice-container, #printable-invoice-container * {
            visibility: visible;
          }
          #printable-invoice-container {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            margin: 0;
            padding: 16px;
            box-shadow: none !important;
            border: none !important;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 10 }}
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden my-auto border border-neutral-200 flex flex-col max-h-[96vh]"
      >
        {/* Top Control Bar (No Print) - Fully responsive flex wrap */}
        <div className="no-print p-3 sm:p-4 bg-neutral-900 text-white flex flex-col md:flex-row items-center justify-between gap-3 border-b border-neutral-800 shrink-0">
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-black font-mono text-xs">
                GK
              </div>
              <div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="text-[10px] font-mono font-bold text-amber-400 uppercase tracking-wider">
                    TAX INVOICE
                  </span>
                  <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                    paymentStatus === 'paid' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}>
                    {paymentStatus === 'paid' ? 'PAID' : 'PENDING'}
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-mono font-bold text-white">
                  Ref: {orderReference}
                </h3>
              </div>
            </div>

            {/* Close button for mobile top bar */}
            <button
              type="button"
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="md:hidden w-8 h-8 rounded-full bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-wrap">
            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
              title="Share to WhatsApp"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              className="px-3 py-2 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-neutral-200 hover:text-white font-bold text-xs flex items-center gap-1.5 transition-colors"
              title="Print Invoice"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              type="button"
              disabled={isDownloading}
              onClick={handleDownloadPDF}
              className="px-3.5 py-2 rounded-xl bg-amber-400 hover:bg-amber-500 text-neutral-950 font-black text-xs flex items-center gap-1.5 transition-all shadow-md active:scale-95 disabled:opacity-50"
              title="Download PDF File"
            >
              {isDownloading ? (
                <>
                  <div className="w-3 h-3 border-2 border-neutral-950/30 border-t-neutral-950 rounded-full animate-spin" />
                  <span>Generating PDF...</span>
                </>
              ) : downloadSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-900" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => {
                playSound('click');
                onClose();
              }}
              className="hidden md:flex w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-300 hover:text-white items-center justify-center transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Invoice Sheet */}
        <div className="p-3 sm:p-6 md:p-10 overflow-y-auto bg-neutral-100 flex-1 flex justify-center">
          <div
            id="printable-invoice-container"
            ref={invoiceRef}
            className="w-full max-w-[760px] bg-white rounded-xl shadow-lg p-5 sm:p-8 md:p-12 text-neutral-900 font-sans relative border border-neutral-200"
          >
            {/* Header: Company Info & Invoice Metadata */}
            <div className="flex flex-col sm:flex-row justify-between items-start pb-6 sm:pb-8 border-b border-neutral-300 gap-5">
              <div>
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-neutral-900 text-amber-400 flex items-center justify-center font-bold font-mono text-xs sm:text-sm">
                    GK
                  </div>
                  <span className="font-bold text-base sm:text-lg tracking-tight text-neutral-950 uppercase">
                    KARKI MEDIA &amp; SYSTEMS
                  </span>
                </div>
                <div className="text-[11px] sm:text-xs text-neutral-600 space-y-0.5 leading-relaxed">
                  <div>Full-Stack Software Architecture &amp; Cloud Infrastructure</div>
                  <div>Kathmandu, Nepal • Global Delivery</div>
                  <div>WhatsApp: +977 9842902535 | ganeshinunited@gmail.com</div>
                </div>
              </div>

              <div className="text-left sm:text-right w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-neutral-200">
                <div className="text-[10px] font-mono font-bold text-neutral-500 uppercase tracking-widest mb-1">
                  TAX INVOICE
                </div>
                <div className="text-lg sm:text-xl font-mono font-extrabold text-neutral-950">
                  {orderReference}
                </div>
                <div className="text-xs text-neutral-600 space-y-0.5 mt-1.5 font-mono">
                  <div><strong className="text-neutral-800">Date:</strong> {currentDate}</div>
                  <div><strong className="text-neutral-800">Due:</strong> {dueDate}</div>
                  <div><strong className="text-neutral-800">Status:</strong> <span className={paymentStatus === 'paid' ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>{paymentStatus === 'paid' ? 'PAID & VERIFIED' : 'PENDING DEPOSIT'}</span></div>
                </div>
              </div>
            </div>

            {/* Bill To & Project Scope */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-5 sm:py-6 border-b border-neutral-200 text-xs">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  BILLED TO:
                </span>
                <div className="font-bold text-sm text-neutral-950">
                  {clientName || 'Valued Client / Partner'}
                </div>
                {businessName && (
                  <div className="text-neutral-700 mt-0.5 font-medium">Company: {businessName}</div>
                )}
                <div className="text-neutral-600 space-y-0.5 mt-1 font-mono text-[11px]">
                  <div>Phone: {clientPhone || 'Not provided'}</div>
                  <div>Email: {clientEmail || 'Not provided'}</div>
                </div>
              </div>

              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-neutral-400 block mb-1">
                  PROJECT SPECIFICATION:
                </span>
                <div className="space-y-1 font-mono text-[11px]">
                  <div><strong className="text-neutral-800">Domain:</strong> <span className="text-neutral-950 font-bold">{domain || 'Custom Domain'}</span></div>
                  <div><strong className="text-neutral-800">Category:</strong> {categoryName}</div>
                  <div><strong className="text-neutral-800">Tier:</strong> {tierName} ({tierTimeline})</div>
                  <div><strong className="text-neutral-800">Hosting:</strong> 1-Yr NVMe Cloud Edge + SSL ($0)</div>
                </div>
              </div>
            </div>

            {/* Itemized Table - Scrollable on very small screens */}
            <div className="py-5 overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[500px]">
                <thead>
                  <tr className="border-b border-neutral-300 text-[10px] sm:text-[11px] font-mono uppercase tracking-wider text-neutral-500">
                    <th className="py-2.5 px-2">Description</th>
                    <th className="py-2.5 px-2 text-center">Timeline</th>
                    <th className="py-2.5 px-2 text-right">List Price</th>
                    <th className="py-2.5 px-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-200 text-xs font-mono">
                  {/* Tier Row */}
                  <tr>
                    <td className="py-3 px-2 font-sans">
                      <strong className="text-neutral-950 font-bold block text-xs sm:text-sm">
                        {categoryName} — {tierName} Package
                      </strong>
                      <span className="text-neutral-500 text-[10px] sm:text-[11px] font-sans">
                        Full-stack development, responsive UI, database &amp; deployment
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-neutral-700 whitespace-nowrap">
                      {tierTimeline}
                    </td>
                    <td className="py-3 px-2 text-right text-neutral-400 line-through whitespace-nowrap">
                      {formattedTotal}
                    </td>
                    <td className="py-3 px-2 text-right text-neutral-950 font-bold whitespace-nowrap">
                      {formattedTotal}
                    </td>
                  </tr>

                  {/* Free Bonus Row */}
                  <tr className="bg-emerald-50/50">
                    <td className="py-3 px-2 font-sans">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-1 py-0.5 rounded bg-emerald-700 text-white text-[9px] font-bold uppercase">
                          100% OFF
                        </span>
                        <strong className="text-emerald-950 font-bold text-xs">
                          Free 1-Yr Domain ({domain || '.com'}) + NVMe Hosting + SSL
                        </strong>
                      </div>
                      <span className="text-[10px] sm:text-[11px] text-emerald-800 font-sans block mt-0.5">
                        Special partnership grant ($280 / रू 37,100 value waived)
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center text-emerald-800 whitespace-nowrap">
                      1 Year
                    </td>
                    <td className="py-3 px-2 text-right text-neutral-500 whitespace-nowrap">
                      {formattedBonus}
                    </td>
                    <td className="py-3 px-2 text-right text-emerald-700 font-bold whitespace-nowrap">
                      {currency === 'NPR' ? 'रू 0' : '$0'}
                    </td>
                  </tr>

                  {/* Add-ons */}
                  {addons.map((addon, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-2 font-sans">
                        <span className="text-neutral-900 font-medium text-xs">
                          + {addon.name}
                        </span>
                      </td>
                      <td className="py-2.5 px-2 text-center text-neutral-500 whitespace-nowrap">—</td>
                      <td className="py-2.5 px-2 text-right text-neutral-600 whitespace-nowrap">{addon.price}</td>
                      <td className="py-2.5 px-2 text-right text-neutral-900 font-bold whitespace-nowrap">{addon.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals Section */}
            <div className="border-t border-neutral-300 pt-5 flex flex-col sm:flex-row justify-between items-start gap-5">
              <div className="space-y-2 text-xs text-neutral-600 max-w-xs font-sans">
                <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px] sm:text-xs">
                  <Shield className="w-3.5 h-3.5 shrink-0" />
                  <span>30 Days Free Post-Launch Warranty</span>
                </div>
                <p className="text-[10px] sm:text-[11px] text-neutral-500 leading-relaxed">
                  {paymentStatus === 'paid' ? 'Payment received in full and verified.' : '50% milestone deposit required to begin development. Balance due upon staging approval.'}
                </p>
                {paymentTxnId && (
                  <div className="font-mono text-[10px] bg-neutral-50 p-2 rounded border border-neutral-200">
                    <div>Txn ID: <strong>{paymentTxnId}</strong></div>
                    <div>Method: <strong>{paymentMethod?.toUpperCase()}</strong></div>
                    <div>Time: {paymentTimestamp}</div>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-64 space-y-1.5 text-right font-mono text-xs">
                <div className="flex justify-between text-neutral-500 text-[11px]">
                  <span>Regular Total:</span>
                  <span className="line-through">{formattedTotal}</span>
                </div>
                <div className="flex justify-between text-emerald-700 font-semibold text-[11px]">
                  <span>Special Discount:</span>
                  <span>-{formattedBonus}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base text-neutral-950 font-extrabold pt-2 border-t border-neutral-300">
                  <span>Total Payable:</span>
                  <span>{formattedFinal}</span>
                </div>
              </div>
            </div>

            {/* Footer Signature */}
            <div className="mt-8 sm:mt-10 pt-4 border-t border-neutral-200 flex flex-col sm:flex-row justify-between items-center text-[11px] text-neutral-500 gap-3 font-sans">
              <div>
                <span>Authorized Tax Invoice • Karki Media &amp; Systems</span>
              </div>
              <div className="font-mono">
                Verified Signature: <strong className="text-neutral-950">Ganesh Karki</strong>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
