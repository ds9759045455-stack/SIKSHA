import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { AccessDenied } from './AccessDenied';
import {
  Banknote,
  Printer,
  CheckCircle2,
  Clock,
  Search,
  Check,
  Building2,
  IndianRupee,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const PayrollModule = () => {
  const {
    role,
    payroll,
    updatePayrollStatus,
    setActivePrintPayslip,
    totalMonthlyPayroll,
    totalPaidPayroll,
  } = useERP();

  // Strict role check: Principal Only!
  if (role !== 'principal') {
    return <AccessDenied moduleName="Faculty Payroll & Salary Registers" />;
  }

  const [selectedMonth, setSelectedMonth] = useState('October 2026');
  const [payrollSearch, setPayrollSearch] = useState('');

  const filteredPayroll = payroll.filter((p) => {
    return (
      !payrollSearch ||
      p.teacherName.toLowerCase().includes(payrollSearch.toLowerCase()) ||
      p.designation.toLowerCase().includes(payrollSearch.toLowerCase()) ||
      p.teacherId.toLowerCase().includes(payrollSearch.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-800">
              <Banknote className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Faculty & Staff Payroll Ledger
              </h1>
              <p className="text-xs text-slate-500">
                Official Government-Aided Salary Disbursal & PFMS Pay Advice Records
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">Select Month:</span>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-[#0F284E]"
          >
            <option value="October 2026">October 2026 (Active)</option>
            <option value="September 2026">September 2026 (Audited)</option>
            <option value="August 2026">August 2026 (Disbursed)</option>
          </select>
        </div>
      </div>

      {/* Payroll KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Gross Monthly Wage Bill</p>
          <p className="text-2xl sm:text-3xl font-black text-[#0F284E] mt-1">
            ₹{totalMonthlyPayroll.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-400 mt-1">Teaching & Non-Teaching Faculty</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Amount Disbursed</p>
          <p className="text-2xl sm:text-3xl font-black text-emerald-600 mt-1">
            ₹{totalPaidPayroll.toLocaleString('en-IN')}
          </p>
          <p className="text-xs text-slate-400 mt-1">Credited via PFMS Bank Mandate</p>
        </div>

        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Disbursement Status</p>
          <p className="text-2xl sm:text-3xl font-black text-amber-600 mt-1">
            {payroll.filter(p => p.paymentStatus === 'Paid').length} / {payroll.length} Paid
          </p>
          <p className="text-xs text-slate-400 mt-1">Remaining in process at Treasury</p>
        </div>
      </div>

      {/* Search & Filter */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search faculty name, designation, ID..."
            value={payrollSearch}
            onChange={(e) => setPayrollSearch(e.target.value)}
            className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <span className="text-xs text-slate-500 font-medium hidden sm:inline">
          Official Payroll for {selectedMonth}
        </span>
      </div>

      {/* Payroll Table */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#0F284E] text-white uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Teacher / Employee</th>
                <th className="py-3 px-4 font-semibold">Designation</th>
                <th className="py-3 px-4 font-semibold text-right">Basic Pay</th>
                <th className="py-3 px-4 font-semibold text-right">DA + HRA</th>
                <th className="py-3 px-4 font-semibold text-right">Deductions</th>
                <th className="py-3 px-4 font-semibold text-right">Net Payable</th>
                <th className="py-3 px-4 font-semibold text-center">Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayroll.map((p) => {
                const isPaid = p.paymentStatus === 'Paid';

                return (
                  <tr key={p.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-purple-100 text-purple-900 flex items-center justify-center font-bold text-xs shrink-0">
                          {p.teacherName.split(' ').map(n => n[0]).slice(0, 2).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block">{p.teacherName}</span>
                          <span className="text-[10px] font-mono text-slate-400">{p.teacherId}</span>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-slate-700 font-medium">
                      {p.designation}
                    </td>

                    <td className="py-3 px-4 text-right font-semibold text-slate-800">
                      ₹{p.basicSalary.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-medium text-slate-600">
                      ₹{(p.da + p.hra).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-medium text-rose-600">
                      -₹{(p.epfDeduction + p.taxDeduction).toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-right font-black text-slate-900 text-sm">
                      ₹{p.netPayable.toLocaleString('en-IN')}
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          isPaid
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isPaid ? <CheckCircle2 className="w-3 h-3" /> : <Clock className="w-3 h-3" />}
                        {p.paymentStatus}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        {/* View Payslip */}
                        <button
                          onClick={() => setActivePrintPayslip(p)}
                          className="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold text-[11px] flex items-center gap-1 transition"
                          title="Print Pay Advice"
                        >
                          <Printer className="w-3 h-3 text-[#0F284E]" />
                          <span>Slip</span>
                        </button>

                        {/* Toggle Status */}
                        {!isPaid && (
                          <button
                            onClick={() => updatePayrollStatus(p.id, 'Paid')}
                            className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg font-bold text-[11px] flex items-center gap-1 transition shadow-xs"
                          >
                            <Check className="w-3 h-3" />
                            <span>Mark Paid</span>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
