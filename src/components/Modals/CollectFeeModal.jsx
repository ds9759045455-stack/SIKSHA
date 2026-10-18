import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Receipt, X, Printer, ShieldCheck } from 'lucide-react';

export const CollectFeeModal = ({ isOpen, onClose }) => {
  const { students, collectFee } = useERP();

  const [selectedStudentId, setSelectedStudentId] = useState(students[0]?.id || '');
  const [amountPaid, setAmountPaid] = useState('1700');
  const [term, setTerm] = useState('Quarter 2 (Oct-Dec 2026)');
  const [paymentMode, setPaymentMode] = useState('UPI / QR Code');
  const [remarks, setRemarks] = useState('Tuition & Examination Fee');

  if (!isOpen) return null;

  const currentStudent = students.find(s => s.id === selectedStudentId) || students[0];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!currentStudent) return;

    collectFee({
      studentId: currentStudent.id,
      studentName: currentStudent.name,
      fatherName: currentStudent.fatherName,
      classId: currentStudent.classId,
      classNum: currentStudent.classNum,
      section: currentStudent.section,
      amountPaid: parseFloat(amountPaid) || 0,
      term,
      paymentMode,
      remarks,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-blue-100 text-blue-900 rounded-xl">
              <Receipt className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Collect Student Fee</h2>
              <p className="text-xs text-slate-500">Instant Official Receipt Generator</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          
          {/* Select Student */}
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Select Student</label>
            <select
              value={selectedStudentId}
              onChange={(e) => {
                setSelectedStudentId(e.target.value);
                const s = students.find(st => st.id === e.target.value);
                if (s && s.feeDue > 0) {
                  setAmountPaid(String(s.feeDue));
                }
              }}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-[#0F284E] outline-none"
            >
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} (Class {s.classNum}-{s.section}, Roll #{s.rollNo}) — Due: ₹{s.feeDue}
                </option>
              ))}
            </select>
          </div>

          {/* Student details snapshot */}
          {currentStudent && (
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-2 gap-2 text-[11px]">
              <div>
                <span className="text-slate-400 font-medium">Admission ID:</span>{' '}
                <span className="font-mono font-bold text-slate-700">{currentStudent.admissionNo}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Father's Name:</span>{' '}
                <span className="font-semibold text-slate-700">{currentStudent.fatherName}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Class & Stream:</span>{' '}
                <span className="font-bold text-[#0F284E]">Class {currentStudent.classNum}-{currentStudent.section}</span>
              </div>
              <div>
                <span className="text-slate-400 font-medium">Current Fee Due:</span>{' '}
                <span className="font-bold text-rose-600">₹{currentStudent.feeDue}</span>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Fee Amount to Collect (₹) *</label>
              <input
                type="number"
                required
                value={amountPaid}
                onChange={(e) => setAmountPaid(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-extrabold text-base text-emerald-800 outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Payment Method</label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
              >
                <option value="UPI / QR Code">UPI / PhonePe / Paytm</option>
                <option value="Cash">Cash Deposit</option>
                <option value="Net Banking (SBI)">Bank Transfer (SBI Bisauli)</option>
                <option value="Demand Draft / Cheque">Cheque / Demand Draft</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Fee Term / Quarter</label>
            <select
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none"
            >
              <option value="Quarter 2 (Oct-Dec 2026)">Quarter 2 (Oct-Dec 2026)</option>
              <option value="Quarter 3 (Jan-Mar 2027)">Quarter 3 (Jan-Mar 2027)</option>
              <option value="Quarter 1 (Jul-Sep 2026) Arrears">Quarter 1 Arrears</option>
              <option value="Annual Full Session 2026-27">Annual Full Session Fee</option>
            </select>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Remarks / Note</label>
            <input
              type="text"
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#0F284E] text-[#F6BD60] font-bold rounded-xl hover:bg-[#16386C] shadow-md flex items-center gap-1.5 transition"
            >
              <Printer className="w-4 h-4" />
              <span>Record & Generate Receipt</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
