import React from 'react';
import { useERP } from '../context/ERPContext';
import {
  LayoutDashboard,
  Users,
  CalendarCheck,
  Calendar,
  CreditCard,
  Megaphone,
  Banknote,
} from 'lucide-react';

export const MobileNav = () => {
  const { role, activeTab, setActiveTab } = useERP();

  const teacherTabs = [
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'timetable', label: 'Schedule', icon: Calendar },
    { id: 'announcements', label: 'Notices', icon: Megaphone },
  ];

  const principalTabs = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'students', label: 'Students', icon: Users },
    { id: 'attendance', label: 'Attendance', icon: CalendarCheck },
    { id: 'fees', label: 'Fees', icon: CreditCard },
    { id: 'payroll', label: 'Payroll', icon: Banknote },
  ];

  const tabs = role === 'principal' ? principalTabs : teacherTabs;

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-2 py-1 shadow-lg">
      <div className="flex items-center justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 px-3 rounded-xl transition duration-150 ${
                isActive
                  ? 'text-[#0F284E] font-bold'
                  : 'text-slate-500 hover:text-slate-800 font-medium'
              }`}
            >
              <div
                className={`p-1.5 rounded-lg transition ${
                  isActive ? 'bg-[#F6BD60]/30 text-[#0F284E]' : 'text-slate-500'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-[11px] tracking-tight mt-0.5">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
