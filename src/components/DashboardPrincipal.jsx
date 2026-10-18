import React from 'react';
import { useERP } from '../context/ERPContext';
import {
  Users,
  CalendarCheck,
  CreditCard,
  Banknote,
  GraduationCap,
  Megaphone,
  TrendingUp,
  UserPlus,
  Receipt,
  AlertCircle,
  CheckCircle2,
  Clock,
  Printer,
  ArrowUpRight,
  ShieldCheck,
  Building2,
  Calendar,
} from 'lucide-react';

export const DashboardPrincipal = ({ onOpenAddStudent, onOpenCollectFee, onOpenPublishNotice }) => {
  const {
    students,
    teachers,
    announcements,
    receipts,
    payroll,
    classesList,
    setActiveTab,
    setActivePrintReceipt,
    totalStudentsCount,
    presentTodayCount,
    absentTodayCount,
    todayAttendanceRate,
    totalFeeCollected,
    totalFeePending,
    totalMonthlyPayroll,
    totalPaidPayroll,
    collegeInfo,
  } = useERP();

  // Class-wise attendance summary for top classes
  const sampleClasses = classesList.slice(0, 8);

  return (
    <div className="space-y-6">
      
      {/* Behance-Style College Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0F284E] via-[#16386C] to-[#0F284E] p-6 sm:p-8 text-white shadow-xl">
        <div className="absolute -right-10 -bottom-10 w-72 h-72 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute right-12 top-6 opacity-10 pointer-events-none hidden md:block">
          <img src={collegeInfo.logo} alt="Watermark" className="w-56 h-56 object-contain" />
        </div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start sm:items-center gap-4">
            <img
              src={collegeInfo.logo}
              alt={collegeInfo.name}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl border-2 border-[#F6BD60] bg-white p-1 shadow-lg shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#F6BD60] bg-white/10 px-2.5 py-0.5 rounded-full border border-white/10">
                  Principal Executive Console
                </span>
                <span className="text-xs text-blue-200">Session 2026-27</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
                {collegeInfo.name}
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 font-medium mt-0.5">
                {collegeInfo.hindiName} • Bisauli, District Badaun (U.P.)
              </p>
              <p className="text-xs text-amber-300 font-serif italic mt-1">
                "{collegeInfo.motto}"
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={onOpenAddStudent}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#F6BD60] hover:bg-amber-400 text-slate-900 rounded-xl font-bold text-xs sm:text-sm shadow-md transition transform active:scale-95"
            >
              <UserPlus className="w-4 h-4" />
              <span>Admit Student</span>
            </button>
            <button
              onClick={onOpenCollectFee}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-semibold text-xs sm:text-sm transition transform active:scale-95"
            >
              <Receipt className="w-4 h-4 text-[#F6BD60]" />
              <span>Collect Fee</span>
            </button>
            <button
              onClick={onOpenPublishNotice}
              className="flex items-center gap-2 px-4 py-2.5 bg-white/15 hover:bg-white/25 text-white border border-white/20 rounded-xl font-semibold text-xs sm:text-sm transition transform active:scale-95"
            >
              <Megaphone className="w-4 h-4 text-rose-300" />
              <span>Publish Notice</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Card 1: Total Enrolled Students */}
        <div
          onClick={() => setActiveTab('students')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Strength</span>
            <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600 group-hover:scale-110 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">2,500</span>
            <span className="text-xs font-semibold text-emerald-600">Capacity Full</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Classes 6 to 12 • <span className="font-semibold text-slate-700">{students.length} Database Loaded</span>
          </p>
        </div>

        {/* Card 2: Today's Attendance */}
        <div
          onClick={() => setActiveTab('attendance')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Attendance</span>
            <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600 group-hover:scale-110 transition-transform">
              <CalendarCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">{todayAttendanceRate}%</span>
            <span className="text-xs font-semibold text-emerald-600 flex items-center">
              <TrendingUp className="w-3.5 h-3.5 mr-0.5" /> High
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="text-emerald-700 font-semibold">{presentTodayCount} Present</span> •{' '}
            <span className="text-rose-600 font-semibold">{absentTodayCount} Absent</span>
          </p>
        </div>

        {/* Card 3: Fee Collections */}
        <div
          onClick={() => setActiveTab('fees')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Term Fees</span>
            <div className="p-2.5 rounded-xl bg-blue-50 text-blue-600 group-hover:scale-110 transition-transform">
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-[#0F284E]">
              ₹{(totalFeeCollected / 1000).toFixed(1)}k
            </span>
            <span className="text-xs font-semibold text-slate-500">Collected</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Pending Dues: <span className="font-semibold text-rose-600">₹{(totalFeePending / 1000).toFixed(1)}k</span>
          </p>
        </div>

        {/* Card 4: Faculty Payroll */}
        <div
          onClick={() => setActiveTab('payroll')}
          className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition cursor-pointer group"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Faculty Payroll</span>
            <div className="p-2.5 rounded-xl bg-purple-50 text-purple-600 group-hover:scale-110 transition-transform">
              <Banknote className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-slate-900">
              ₹{(totalMonthlyPayroll / 100000).toFixed(2)}L
            </span>
            <span className="text-xs font-semibold text-emerald-600">PFMS Ready</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            <span className="font-semibold text-slate-700">{teachers.length} Faculty Staff</span> • Oct 2026
          </p>
        </div>

      </div>

      {/* Main Grid: Class-wise Attendance & Recent Fee Receipts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: Live Class Attendance Overview */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                <CalendarCheck className="w-5 h-5 text-amber-500" />
                <span>Class-wise Daily Attendance Status</span>
              </h2>
              <p className="text-xs text-slate-500">
                Real-time reports submitted by class teachers across sections (Classes 6 to 12)
              </p>
            </div>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-bold text-[#0F284E] hover:underline flex items-center gap-1"
            >
              <span>Full Register</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {sampleClasses.map((cls) => {
              const classStudents = students.filter(s => s.classId === cls.id);
              const presentCount = classStudents.filter(s => s.todayStatus === 'Present').length;
              const rate = classStudents.length > 0 ? Math.round((presentCount / classStudents.length) * 100) : 92;

              return (
                <div
                  key={cls.id}
                  onClick={() => setActiveTab('attendance')}
                  className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-amber-400 hover:bg-amber-50/30 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="font-extrabold text-sm text-[#0F284E]">
                      Class {cls.classNum}-{cls.section}
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      rate >= 90 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {rate}%
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate">{cls.stream}</p>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full mt-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${rate >= 90 ? 'bg-emerald-500' : 'bg-[#F6BD60]'}`}
                      style={{ width: `${rate}%` }}
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1.5">
                    {presentCount}/{classStudents.length} Students Present
                  </p>
                </div>
              );
            })}
          </div>

          <div className="p-3 bg-gradient-to-r from-blue-50 to-amber-50 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>All 25 classroom attendance sheets synchronized with College Server.</span>
            </div>
            <button
              onClick={() => setActiveTab('attendance')}
              className="text-xs font-bold text-[#0F284E] underline shrink-0 ml-2"
            >
              Open Daily Attendance Module →
            </button>
          </div>
        </div>

        {/* Right 1 Col: Recent Announcements & Circulars */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-rose-500" />
                <span>Notice Board</span>
              </h2>
              <button
                onClick={onOpenPublishNotice}
                className="text-xs font-bold text-[#0F284E] hover:underline"
              >
                + New Notice
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {announcements.slice(0, 3).map((notice) => (
                <div
                  key={notice.id}
                  onClick={() => setActiveTab('announcements')}
                  className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/80 transition cursor-pointer"
                >
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className={`px-2 py-0.5 rounded-full font-bold text-[10px] ${
                      notice.priority === 'Urgent' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'
                    }`}>
                      {notice.category}
                    </span>
                    <span className="text-slate-400 font-medium">{notice.date}</span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-800 line-clamp-1">{notice.title}</h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-1">{notice.content}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActiveTab('announcements')}
            className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-xs font-bold text-slate-700 transition text-center"
          >
            View All Circulars & Archives →
          </button>
        </div>

      </div>

      {/* Recent Fee Receipts Audit Table */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <Receipt className="w-5 h-5 text-emerald-600" />
              <span>Recent Fee Collections & Issued Receipts</span>
            </h2>
            <p className="text-xs text-slate-500">
              Audited payment log with instant printable receipts for students and parents
            </p>
          </div>
          <button
            onClick={() => setActiveTab('fees')}
            className="text-xs font-bold text-[#0F284E] hover:underline flex items-center gap-1"
          >
            <span>Full Fee Register</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-slate-50 text-slate-500 font-semibold uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 rounded-l-xl">Receipt #</th>
                <th className="py-3 px-4">Student & Class</th>
                <th className="py-3 px-4">Term</th>
                <th className="py-3 px-4">Payment Mode</th>
                <th className="py-3 px-4 text-right">Amount Paid</th>
                <th className="py-3 px-4 text-center">Status</th>
                <th className="py-3 px-4 text-center rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {receipts.slice(0, 4).map((rec) => (
                <tr key={rec.receiptNo} className="hover:bg-slate-50/80 transition">
                  <td className="py-3 px-4 font-mono font-bold text-[#0F284E]">{rec.receiptNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 block">{rec.studentName}</span>
                    <span className="text-[11px] text-slate-500">Class {rec.classNum}-{rec.section}</span>
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{rec.term}</td>
                  <td className="py-3 px-4 text-slate-600 font-medium">{rec.paymentMode}</td>
                  <td className="py-3 px-4 text-right font-bold text-slate-900 text-sm">
                    ₹{rec.amountPaid.toLocaleString('en-IN')}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> {rec.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => setActivePrintReceipt(rec)}
                      className="px-2.5 py-1 rounded-lg bg-[#0F284E] text-[#F6BD60] hover:bg-[#16386C] font-semibold text-[11px] inline-flex items-center gap-1 transition"
                      title="Print Official Receipt"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Print</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
