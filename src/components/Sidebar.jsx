import React from 'react';
import { useERP } from '../context/ERPContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  CreditCard,
  Banknote,
  GraduationCap,
  Calendar,
  Megaphone,
  Settings,
  Lock,
  ChevronRight,
  ShieldCheck,
  Building,
  School,
} from 'lucide-react';

export const Sidebar = ({ isMobileMenuOpen, onCloseMobileMenu }) => {
  const {
    role,
    activeTab,
    setActiveTab,
    students,
    teachers,
    announcements,
    currentTeacher,
    collegeInfo,
  } = useERP();

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
    if (onCloseMobileMenu) onCloseMobileMenu();
  };

  const navItemsPrincipal = [
    {
      id: 'dashboard',
      label: 'Executive Dashboard',
      hindi: 'मुख्य डैशबोर्ड',
      icon: LayoutDashboard,
      badge: 'Live',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'students',
      label: 'Student Directory',
      hindi: 'छात्र-छात्रा अभिलेख',
      icon: Users,
      badge: '2,500',
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    {
      id: 'attendance',
      label: 'Attendance Console',
      hindi: 'दैनिक उपस्थिति',
      icon: CalendarCheck,
    },
    {
      id: 'fees',
      label: 'Fee Records & Receipts',
      hindi: 'शुल्क प्रबंधन व रसीद',
      icon: CreditCard,
      badge: 'Receipts',
      badgeColor: 'bg-blue-100 text-blue-800',
    },
    {
      id: 'payroll',
      label: 'Faculty Payroll',
      hindi: 'वेतन व भुगतान पर्ची',
      icon: Banknote,
    },
    {
      id: 'teachers',
      label: 'Faculty & Staff',
      hindi: 'शिक्षक एवं कर्मचारी',
      icon: GraduationCap,
      badge: `${teachers.length}`,
      badgeColor: 'bg-purple-100 text-purple-800',
    },
    {
      id: 'timetable',
      label: 'Master Schedule',
      hindi: 'समय सारिणी',
      icon: Calendar,
    },
    {
      id: 'announcements',
      label: 'Circulars & Events',
      hindi: 'सूचना एवं परिपत्र',
      icon: Megaphone,
      badge: `${announcements.length}`,
      badgeColor: 'bg-rose-100 text-rose-800',
    },
    {
      id: 'settings',
      label: 'College Settings & Backup',
      hindi: 'सेटिंग्स व बैकअप',
      icon: Settings,
    },
  ];

  const navItemsTeacher = [
    {
      id: 'attendance',
      label: 'Take Attendance',
      hindi: 'कक्षा उपस्थिति दर्ज करें',
      icon: CalendarCheck,
      badge: 'Active Class',
      badgeColor: 'bg-emerald-100 text-emerald-800',
    },
    {
      id: 'timetable',
      label: 'My Schedule & Classes',
      hindi: 'मेरी समय सारिणी',
      icon: Calendar,
    },
    {
      id: 'announcements',
      label: 'Notices & Circulars',
      hindi: 'कॉलेज सूचनाएं',
      icon: Megaphone,
      badge: `${announcements.length}`,
      badgeColor: 'bg-amber-100 text-amber-800',
    },
    // Restricted Items shown with Lock icon to demonstrate strict permission separation
    {
      id: 'fees',
      label: 'Fee Records',
      hindi: 'शुल्क रिकॉर्ड (प्रतिबंधित)',
      icon: CreditCard,
      isRestricted: true,
    },
    {
      id: 'payroll',
      label: 'Payroll Ledger',
      hindi: 'वेतन रजिस्टर (प्रतिबंधित)',
      icon: Banknote,
      isRestricted: true,
    },
  ];

  const currentNavItems = role === 'principal' ? navItemsPrincipal : navItemsTeacher;

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileMenuOpen && (
        <div
          onClick={onCloseMobileMenu}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-18 bottom-0 left-0 z-40 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileMenuOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Header summary */}
        <div className="p-4 border-b border-slate-100 bg-[#F7EDE2]/40">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-xl ${role === 'principal' ? 'bg-[#0F284E] text-[#F6BD60]' : 'bg-[#84A59D] text-white'}`}>
              {role === 'principal' ? <ShieldCheck className="w-5 h-5" /> : <GraduationCap className="w-5 h-5" />}
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {role === 'principal' ? 'Super Admin Mode' : 'Teacher View'}
              </p>
              <p className="text-sm font-bold text-slate-900 truncate">
                {role === 'principal' ? 'Principal Dr. R.P. Gautam' : currentTeacher.name}
              </p>
            </div>
          </div>
          {role === 'teacher' && (
            <div className="mt-2 text-[11px] text-slate-600 bg-white/80 p-2 rounded-lg border border-amber-200/60">
              <span className="font-semibold text-amber-900">Assigned Incharge:</span> Class {currentTeacher.assignedClass}
            </div>
          )}
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1.5">
          {currentNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`w-full group flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#0F284E] text-white shadow-md shadow-blue-950/10'
                    : item.isRestricted
                    ? 'text-slate-400 hover:bg-slate-50 opacity-75'
                    : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-1.5 rounded-lg transition ${
                      isActive
                        ? 'bg-white/15 text-[#F6BD60]'
                        : item.isRestricted
                        ? 'text-slate-400'
                        : 'text-slate-500 group-hover:text-[#0F284E]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">{item.label}</span>
                      {item.isRestricted && <Lock className="w-3 h-3 text-amber-600" />}
                    </div>
                    <span className={`text-[10px] block font-normal leading-tight ${isActive ? 'text-blue-200' : 'text-slate-400'}`}>
                      {item.hindi}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span
                      className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                        isActive ? 'bg-[#F6BD60] text-slate-900 font-bold' : item.badgeColor
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-4 h-4 text-[#F6BD60]" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Bottom College Info Tag */}
        <div className="p-3.5 m-3 rounded-2xl bg-gradient-to-br from-slate-50 to-[#F7EDE2]/60 border border-slate-200 text-xs">
          <div className="flex items-center gap-2 text-slate-700 font-semibold mb-1">
            <School className="w-4 h-4 text-amber-600" />
            <span>M.L. Inter College, Bisauli</span>
          </div>
          <p className="text-[11px] text-slate-500">
            Affiliation: <span className="font-medium text-slate-700">BDN-24410 (U.P. Board)</span>
          </p>
          <p className="text-[11px] text-slate-500 mt-0.5">
            Academic Session: <span className="font-semibold text-emerald-700">2026 - 2027</span>
          </p>
        </div>
      </aside>
    </>
  );
};
