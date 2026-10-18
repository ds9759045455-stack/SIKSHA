import React from 'react';
import { useERP } from '../../context/ERPContext';
import { Printer, X, CheckCircle, ShieldCheck } from 'lucide-react';

export const FeeReceiptModal = () => {
  const { activePrintReceipt, setActivePrintReceipt, collegeInfo } = useERP();

  if (!activePrintReceipt) return null;

  const r = activePrintReceipt;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 print:m-0 print:border-none print:shadow-none">
        
        {/* Top Control Bar (Hidden when printing) */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Official College Fee Receipt
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F284E] hover:bg-[#193a6b] text-white text-xs font-bold rounded-xl shadow transition"
            >
              <Printer className="w-4 h-4 text-[#F6BD60]" />
              Print / Save PDF
            </button>
            <button
              onClick={() => setActivePrintReceipt(null)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Receipt Body */}
        <div className="p-8 text-slate-800 print:p-6" id="printable-receipt">
          
          {/* Institutional Header with Logo */}
          <div className="flex items-center justify-between border-b-2 border-[#0F284E] pb-4 mb-5">
            <div className="flex items-center gap-4">
              <img
                src={collegeInfo.logo}
                alt={collegeInfo.name}
                className="w-18 h-18 object-contain rounded-full border-2 border-amber-400"
              />
              <div>
                <h1 className="text-xl sm:text-2xl font-black text-[#0F284E] tracking-tight uppercase">
                  {collegeInfo.name}
                </h1>
                <p className="text-xs font-bold text-amber-700">
                  {collegeInfo.hindiName} • {collegeInfo.location}
                </p>
                <p className="text-[11px] text-slate-600">
                  {collegeInfo.fullAddress}
                </p>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Affiliation: {collegeInfo.affiliation}
                </p>
              </div>
            </div>
            
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-amber-100 text-[#0F284E] border border-amber-300 font-bold text-xs rounded-lg uppercase tracking-wider">
                Fee Receipt (Student Copy)
              </span>
              <p className="text-xs font-bold text-slate-700 mt-2">
                Receipt No: <span className="text-[#0F284E]">{r.receiptNo}</span>
              </p>
              <p className="text-[11px] text-slate-500">
                Date: <span className="font-semibold">{r.date}</span>
              </p>
            </div>
          </div>

          {/* Student Info Box */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200 text-xs mb-6">
            <div>
              <p className="text-slate-400 font-medium">Student Name</p>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{r.studentName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Father's Name</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{r.fatherName || 'Not specified'}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Class & Section</p>
              <p className="text-sm font-bold text-blue-900 mt-0.5">
                Class {r.classNum} - {r.section}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Admission ID</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{r.studentId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Term / Fee Head</p>
              <p className="text-xs font-semibold text-slate-700 mt-0.5">{r.term}</p>
            </div>
            <div>
              <p className="text-slate-400 font-medium">Academic Session</p>
              <p className="text-xs font-semibold text-emerald-700 mt-0.5">2026 - 2027</p>
            </div>
          </div>

          {/* Fee Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden mb-6">
            <table className="w-full text-xs text-left">
              <thead className="bg-[#0F284E] text-white">
                <tr>
                  <th className="py-2.5 px-4 font-semibold">Sr. No.</th>
                  <th className="py-2.5 px-4 font-semibold">Description / Particulars</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Amount (₹)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                <tr>
                  <td className="py-2.5 px-4 text-slate-500">1</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">Tuition & Development Fee</td>
                  <td className="py-2.5 px-4 text-right font-semibold">₹{(r.amountPaid * 0.65).toFixed(0)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-500">2</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">Examination & Evaluation Charges</td>
                  <td className="py-2.5 px-4 text-right font-semibold">₹{(r.amountPaid * 0.15).toFixed(0)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-500">3</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">Science Lab & Computer / Digital Lab Fund</td>
                  <td className="py-2.5 px-4 text-right font-semibold">₹{(r.amountPaid * 0.12).toFixed(0)}</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-4 text-slate-500">4</td>
                  <td className="py-2.5 px-4 font-medium text-slate-800">Games, Sports & Co-Curricular Welfare</td>
                  <td className="py-2.5 px-4 text-right font-semibold">₹{(r.amountPaid - ((r.amountPaid * 0.65) + (r.amountPaid * 0.15) + (r.amountPaid * 0.12))).toFixed(0)}</td>
                </tr>
                <tr className="bg-amber-50/60 font-bold text-slate-900 border-t-2 border-slate-300">
                  <td className="py-3 px-4" colSpan={2}>Total Amount Received</td>
                  <td className="py-3 px-4 text-right text-base text-[#0F284E]">₹{r.amountPaid.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Payment metadata */}
          <div className="grid grid-cols-2 gap-4 text-xs bg-slate-50 p-3 rounded-xl border border-slate-200 mb-8">
            <div>
              <span className="text-slate-400">Payment Mode:</span>{' '}
              <span className="font-bold text-slate-800">{r.paymentMode}</span>
            </div>
            <div>
              <span className="text-slate-400">Transaction Ref:</span>{' '}
              <span className="font-mono font-semibold text-slate-800">{r.transactionRef}</span>
            </div>
            <div className="col-span-2">
              <span className="text-slate-400">Verified By:</span>{' '}
              <span className="font-semibold text-emerald-800">{r.receivedBy}</span>
            </div>
          </div>

          {/* Signature Block */}
          <div className="grid grid-cols-2 pt-10 text-center text-xs">
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
              <p className="font-bold text-slate-800">Fee Clerk / Cashier</p>
              <p className="text-[10px] text-slate-500">Accounts Section</p>
            </div>
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1 flex items-center justify-center">
                <span className="text-[10px] italic text-blue-900 font-serif">R.P. Gautam</span>
              </div>
              <p className="font-bold text-[#0F284E]">Principal / Seal</p>
              <p className="text-[10px] text-slate-500">Madan Lal Inter College, Bisauli</p>
            </div>
          </div>

          {/* Watermark Note */}
          <div className="mt-8 pt-3 border-t border-slate-200 text-center text-[10px] text-slate-400">
            Note: This is a system-generated official fee receipt. Fees once paid are non-refundable. Please preserve this receipt for roll number issuance and board admit card clearance.
          </div>

        </div>

      </div>
    </div>
  );
};
