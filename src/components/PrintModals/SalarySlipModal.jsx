import React from 'react';
import { useERP } from '../../context/ERPContext';
import { Printer, X, CheckCircle2 } from 'lucide-react';

export const SalarySlipModal = () => {
  const { activePrintPayslip, setActivePrintPayslip, collegeInfo } = useERP();

  if (!activePrintPayslip) return null;

  const p = activePrintPayslip;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 print:m-0 print:border-none print:shadow-none">
        
        {/* Controls */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Faculty Pay Advice / Payslip
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F284E] hover:bg-[#193a6b] text-white text-xs font-bold rounded-xl shadow transition"
            >
              <Printer className="w-4 h-4 text-[#F6BD60]" />
              Print Payslip
            </button>
            <button
              onClick={() => setActivePrintPayslip(null)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Area */}
        <div className="p-8 text-slate-800">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b-2 border-[#0F284E] pb-4 mb-6">
            <div className="flex items-center gap-3">
              <img
                src={collegeInfo.logo}
                alt={collegeInfo.name}
                className="w-16 h-16 object-contain rounded-full border border-amber-400"
              />
              <div>
                <h1 className="text-xl font-black text-[#0F284E] uppercase tracking-tight">
                  {collegeInfo.name}
                </h1>
                <p className="text-xs font-bold text-amber-700">Bisauli, Badaun (Uttar Pradesh)</p>
                <p className="text-[10px] text-slate-500">Government-Aided Institution • U.P. Board Affiliated</p>
              </div>
            </div>
            <div className="text-right">
              <span className="px-3 py-1 bg-blue-100 text-[#0F284E] font-bold text-xs rounded-lg uppercase">
                Monthly Pay Slip
              </span>
              <p className="text-xs font-bold text-slate-800 mt-2">
                Month: <span className="text-amber-800">{p.month}</span>
              </p>
              <p className="text-[10px] text-slate-500">Payslip Ref: {p.id}</p>
            </div>
          </div>

          {/* Employee Info */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs mb-6">
            <div>
              <p className="text-slate-400 font-semibold">Teacher Name</p>
              <p className="font-bold text-slate-900 text-sm mt-0.5">{p.teacherName}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Designation</p>
              <p className="font-bold text-slate-800 mt-0.5">{p.designation}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Employee ID</p>
              <p className="font-semibold text-slate-700 mt-0.5">{p.teacherId}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Payment Status</p>
              <p className="font-bold text-emerald-700 flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" /> {p.paymentStatus}
              </p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">Disbursement Mode</p>
              <p className="font-semibold text-slate-700 mt-0.5">{p.paymentMode}</p>
            </div>
            <div>
              <p className="text-slate-400 font-semibold">PFMS Reference</p>
              <p className="font-mono text-[11px] font-semibold text-slate-700 mt-0.5">{p.referenceNo}</p>
            </div>
          </div>

          {/* Earnings & Deductions Breakup */}
          <div className="grid grid-cols-2 gap-4 border border-slate-200 rounded-xl overflow-hidden mb-6">
            {/* Earnings */}
            <div>
              <div className="bg-emerald-800 text-white font-bold text-xs py-2 px-3">
                Earnings (A)
              </div>
              <div className="p-3 text-xs divide-y divide-slate-100 space-y-2">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Basic Pay:</span>
                  <span className="font-semibold">₹{p.basicSalary.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Dearness Allowance (DA):</span>
                  <span className="font-semibold">₹{p.da.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">House Rent Allowance (HRA):</span>
                  <span className="font-semibold">₹{p.hra.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Special Allowances:</span>
                  <span className="font-semibold">₹{p.allowances.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold text-emerald-900 bg-emerald-50/50 -mx-3 px-3 py-1.5">
                  <span>Gross Earnings:</span>
                  <span>₹{p.grossSalary.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Deductions */}
            <div className="border-l border-slate-200">
              <div className="bg-rose-800 text-white font-bold text-xs py-2 px-3">
                Deductions (B)
              </div>
              <div className="p-3 text-xs divide-y divide-slate-100 space-y-2">
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Provident Fund (EPF/GPF):</span>
                  <span className="font-semibold">₹{p.epfDeduction.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Income Tax (TDS):</span>
                  <span className="font-semibold">₹{p.taxDeduction.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">GIS & Group Insurance:</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-600">Festival Advance / Loan:</span>
                  <span className="font-semibold">₹0</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold text-rose-900 bg-rose-50/50 -mx-3 px-3 py-1.5">
                  <span>Total Deductions:</span>
                  <span>₹{(p.epfDeduction + p.taxDeduction).toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Net Payable Highlight */}
          <div className="bg-[#0F284E] text-white p-4 rounded-xl flex items-center justify-between mb-8">
            <div>
              <p className="text-xs uppercase font-bold text-amber-300 tracking-wider">
                Net Salary Transferred (A - B)
              </p>
              <p className="text-[11px] text-blue-200">Credited to Salary Account via PFMS</p>
            </div>
            <div className="text-2xl font-black text-[#F6BD60]">
              ₹{p.netPayable.toLocaleString('en-IN')}
            </div>
          </div>

          {/* Signature */}
          <div className="grid grid-cols-2 pt-8 text-center text-xs">
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1"></div>
              <p className="font-bold text-slate-800">Drawing & Disbursing Officer</p>
              <p className="text-[10px] text-slate-500">Madan Lal Inter College</p>
            </div>
            <div>
              <div className="w-36 border-b border-slate-400 mx-auto mb-1 flex items-center justify-center">
                <span className="text-[10px] italic text-blue-900 font-serif">R.P. Gautam</span>
              </div>
              <p className="font-bold text-[#0F284E]">Principal / Approving Authority</p>
              <p className="text-[10px] text-slate-500">Bisauli, Badaun (U.P.)</p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
