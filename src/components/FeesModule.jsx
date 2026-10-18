import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { AccessDenied } from './AccessDenied';
import {
  CreditCard,
  Receipt,
  Search,
  PlusCircle,
  Printer,
  CheckCircle2,
  AlertTriangle,
  IndianRupee,
  Calendar,
  Filter,
  DollarSign,
  Download,
} from 'lucide-react';

export const FeesModule = ({ onOpenCollectFee }) => {
  const {
    role,
    students,
    receipts,
    feeStructures,
    setActivePrintReceipt,
  } = useERP();

  // Strict role check: Principal Only!
  if (role !== 'principal') {
    return <AccessDenied moduleName="College Fees & Financial Records" />;
  }

  const [activeTab, setActiveTab] = useState('dues'); // 'dues', 'receipts', 'structure'
  const [feeFilter, setFeeFilter] = useState('ALL');
  const [feeSearch, setFeeSearch] = useState('');

  // Filter students with dues
  const filteredStudents = students.filter((s) => {
    const matchesFilter = feeFilter === 'ALL' || s.feeStatus === feeFilter;
    const matchesSearch =
      !feeSearch ||
      s.name.toLowerCase().includes(feeSearch.toLowerCase()) ||
      s.admissionNo.toLowerCase().includes(feeSearch.toLowerCase()) ||
      s.classNum.includes(feeSearch);
    return matchesFilter && matchesSearch;
  });

  const totalCollected = receipts.reduce((acc, r) => acc + (parseFloat(r.amountPaid) || 0), 0);
  const totalPending = students.reduce((acc, s) => acc + (parseFloat(s.feeDue) || 0), 0);
  const totalProjected = totalCollected + totalPending;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-blue-50 text-blue-800">
              <CreditCard className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Fees & Accounts Management
              </h1>
              <p className="text-xs text-slate-500">
                Principal Financial Portal • U.P. Inter College Fee Schedules & Audit Slips
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={onOpenCollectFee}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#0F284E] hover:bg-[#16386C] text-[#F6BD60] rounded-xl font-bold text-xs sm:text-sm shadow-md transition self-start sm:self-auto"
        >
          <Receipt className="w-4 h-4" />
          <span>+ Collect Student Fee & Print Receipt</span>
        </button>
      </div>

      {/* KPI Financial Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Fees Collected</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            ₹{totalCollected.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-400 mt-1">Verified across {receipts.length} payment receipts</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Outstanding Dues</p>
          <p className="text-2xl sm:text-3xl font-black text-[#F28482] mt-1">
            ₹{totalPending.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-400 mt-1">
            Pending with {students.filter(s => s.feeDue > 0).length} students
          </p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Collection Efficiency</p>
          <p className="text-2xl sm:text-3xl font-black text-[#0F284E] mt-1">
            {totalProjected > 0 ? Math.round((totalCollected / totalProjected) * 100) : 78}%
          </p>
          <p className="text-xs text-slate-400 mt-1">Session 2026-27 Target</p>
        </div>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-slate-200 text-xs sm:text-sm font-bold">
        <button
          onClick={() => setActiveTab('dues')}
          className={`py-3 px-5 border-b-2 transition ${
            activeTab === 'dues'
              ? 'border-[#0F284E] text-[#0F284E]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          Student Fee Ledger & Dues ({filteredStudents.length})
        </button>
        <button
          onClick={() => setActiveTab('receipts')}
          className={`py-3 px-5 border-b-2 transition ${
            activeTab === 'receipts'
              ? 'border-[#0F284E] text-[#0F284E]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          Payment Receipts Audit Log ({receipts.length})
        </button>
        <button
          onClick={() => setActiveTab('structure')}
          className={`py-3 px-5 border-b-2 transition ${
            activeTab === 'structure'
              ? 'border-[#0F284E] text-[#0F284E]'
              : 'border-transparent text-slate-400 hover:text-slate-700'
          }`}
        >
          College Fee Schedule (Classes 6 - 12)
        </button>
      </div>

      {/* Tab 1: Student Fee Ledger */}
      {activeTab === 'dues' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-500">Filter:</span>
              <select
                value={feeFilter}
                onChange={(e) => setFeeFilter(e.target.value)}
                className="text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              >
                <option value="ALL">All Fee Statuses</option>
                <option value="Overdue">Overdue Dues Only</option>
                <option value="Partial">Partial Dues</option>
                <option value="Paid">Fully Paid</option>
              </select>
            </div>

            <div className="relative w-full sm:w-72">
              <input
                type="text"
                placeholder="Search by student or admission..."
                value={feeSearch}
                onChange={(e) => setFeeSearch(e.target.value)}
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#0F284E] text-white uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4">Admission No</th>
                    <th className="py-3 px-4">Student & Class</th>
                    <th className="py-3 px-4">Father's Name</th>
                    <th className="py-3 px-4 text-right">Fee Paid</th>
                    <th className="py-3 px-4 text-right">Pending Due</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4 text-center">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredStudents.slice(0, 15).map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-mono font-bold text-slate-800">{s.admissionNo}</td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-slate-900 block">{s.name}</span>
                        <span className="text-[10px] text-slate-500">
                          Class {s.classNum}-{s.section} ({s.stream})
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-700">{s.fatherName}</td>
                      <td className="py-3 px-4 text-right font-semibold text-emerald-700">
                        ₹{s.totalFeePaid.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-right font-bold text-rose-700">
                        ₹{s.feeDue.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3 px-4 text-center">
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                            s.feeStatus === 'Paid'
                              ? 'bg-emerald-100 text-emerald-800'
                              : s.feeStatus === 'Partial'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-rose-100 text-rose-800'
                          }`}
                        >
                          {s.feeStatus}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={onOpenCollectFee}
                          className="px-2.5 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 rounded-lg font-bold text-[11px] transition"
                        >
                          Collect Fee
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Receipts Log */}
      {activeTab === 'receipts' && (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="bg-[#0F284E] text-white uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-4">Receipt #</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4">Class</th>
                  <th className="py-3 px-4">Term</th>
                  <th className="py-3 px-4">Mode / Ref</th>
                  <th className="py-3 px-4 text-right">Amount Paid</th>
                  <th className="py-3 px-4 text-center">Print</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {receipts.map((r) => (
                  <tr key={r.receiptNo} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4 font-mono font-bold text-[#0F284E]">{r.receiptNo}</td>
                    <td className="py-3 px-4 text-slate-500 font-medium">{r.date}</td>
                    <td className="py-3 px-4 font-bold text-slate-900">{r.studentName}</td>
                    <td className="py-3 px-4 text-slate-700">Class {r.classNum}-{r.section}</td>
                    <td className="py-3 px-4 text-slate-600 font-medium">{r.term}</td>
                    <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">{r.paymentMode}</td>
                    <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                      ₹{r.amountPaid.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => setActivePrintReceipt(r)}
                        className="p-1.5 rounded-lg bg-[#0F284E] text-[#F6BD60] hover:bg-[#16386C] font-semibold text-xs inline-flex items-center gap-1 transition shadow-xs"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Official Fee Structures */}
      {activeTab === 'structure' && (
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="border-b border-slate-100 pb-3">
            <h2 className="text-base font-bold text-slate-900">
              Institutional Approved Fee Schedule (U.P. Secondary Education Board Norms)
            </h2>
            <p className="text-xs text-slate-500">
              Prescribed quarterly and monthly fee heads for Madan Lal Inter College, Bisauli
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {Object.entries(feeStructures).map(([classKey, fees]) => (
              <div key={classKey} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="font-extrabold text-sm text-[#0F284E]">Class {classKey}th</span>
                  <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                    ₹{fees.monthlyTotal} / mo
                  </span>
                </div>
                <div className="space-y-1 text-slate-600">
                  <div className="flex justify-between">
                    <span>Tuition Fee:</span>
                    <span className="font-semibold">₹{fees.tuition}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Exam & Test Fund:</span>
                    <span className="font-semibold">₹{fees.exam}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sports & PT Fund:</span>
                    <span className="font-semibold">₹{fees.sports}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Science & Computer Lab:</span>
                    <span className="font-semibold">₹{fees.lab + fees.computer}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
