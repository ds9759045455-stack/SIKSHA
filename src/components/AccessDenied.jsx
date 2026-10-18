import React from 'react';
import { useERP } from '../context/ERPContext';
import { ShieldAlert, Lock, ArrowLeft, KeyRound } from 'lucide-react';

export const AccessDenied = ({ moduleName = 'This Module' }) => {
  const { switchRole, setActiveTab } = useERP();

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl border border-rose-200/80 shadow-xl p-8 text-center relative overflow-hidden">
        {/* Subtle decorative background circle */}
        <div className="absolute -top-12 -right-12 w-40 h-40 bg-rose-100 rounded-full blur-2xl opacity-60"></div>
        <div className="absolute -bottom-12 -left-12 w-40 h-40 bg-amber-100 rounded-full blur-2xl opacity-60"></div>

        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-tr from-rose-500 to-amber-500 rounded-2xl flex items-center justify-center text-white shadow-lg shadow-rose-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <span className="text-[11px] font-bold uppercase tracking-wider px-3 py-1 bg-rose-100 text-rose-800 rounded-full inline-block mb-3">
            Principal Authorization Required
          </span>

          <h2 className="text-xl font-bold text-slate-900 mb-2">
            Restricted Administrative Access
          </h2>

          <p className="text-sm text-slate-600 leading-relaxed mb-6">
            According to institutional governance policies of <span className="font-semibold text-slate-800">Madan Lal Inter College</span>, {moduleName.toLowerCase()} (including financial records, fee collection, staff payroll, and master student records) can only be accessed and modified by the <span className="font-semibold text-[#0F284E]">Principal</span>.
          </p>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mb-6 text-left text-xs text-slate-600 space-y-1.5">
            <div className="flex items-center gap-2 font-semibold text-slate-800">
              <ShieldAlert className="w-4 h-4 text-amber-600" />
              <span>Permitted Teacher Actions:</span>
            </div>
            <p>✓ Daily Attendance Marking for assigned classes</p>
            <p>✓ Teacher Personal & Student Class Timetable</p>
            <p>✓ College Circulars & Administrative Announcements</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setActiveTab('attendance')}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 text-sm font-semibold flex items-center justify-center gap-2 transition"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Attendance
            </button>
            <button
              onClick={() => switchRole('principal')}
              className="px-5 py-2.5 rounded-xl bg-[#0F284E] hover:bg-[#183a6b] text-white text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition"
            >
              <KeyRound className="w-4 h-4 text-[#F6BD60]" />
              Switch to Principal Mode
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
