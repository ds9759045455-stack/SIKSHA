import React from 'react';
import { PhoneFrame } from './PhoneFrame';
import { LeftCourseScreen } from './screens/LeftCourseScreen';
import { CenterDashboardScreen } from './screens/CenterDashboardScreen';
import { RightScheduleScreen } from './screens/RightScheduleScreen';
import { useNotes } from '../context/NotesContext';
import { Sparkles, Monitor, Eye } from 'lucide-react';

export const ShowcaseView = ({ onOpenReader }) => {
  const {
    activeMobileScreen,
    setActiveMobileScreen,
    setLayoutMode
  } = useNotes();

  return (
    <div className="w-full flex flex-col items-center py-6 px-2 sm:px-6 relative select-none">
      
      {/* Ambient background glows for the whole mockup stage */}
      <div className="ambient-glow-pink top-10 left-1/4 opacity-40" />
      <div className="ambient-glow-purple bottom-10 right-1/4 opacity-40" />
      <div className="ambient-glow-orange top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-20" />

      {/* Top Banner Tag */}
      <div className="relative z-10 flex flex-col items-center text-center mb-6 space-y-2">
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-white/[0.08] backdrop-blur-xl border border-white/15 shadow-lg text-xs font-semibold text-pink-300">
          <Sparkles size={14} className="text-pink-400" />
          <span>Develop by Shiv.org • 3-Screen Design System</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Notes Sharing UI Design System
        </h2>
        <p className="text-xs text-purple-200/70 max-w-md">
          Interactive replica of the UI design: Course View (Left), Dashboard (Center), and Schedule Planner (Right).
        </p>

        {/* Mobile Tab Switcher (Visible on small screens where 3 phones cannot fit side by side) */}
        <div className="flex xl:hidden items-center p-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 mt-3 text-xs">
          <button
            onClick={() => setActiveMobileScreen(1)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              activeMobileScreen === 1
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : 'text-purple-200/60 hover:text-white'
            }`}
          >
            1. Course View
          </button>
          <button
            onClick={() => setActiveMobileScreen(2)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              activeMobileScreen === 2
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : 'text-purple-200/60 hover:text-white'
            }`}
          >
            2. Dashboard
          </button>
          <button
            onClick={() => setActiveMobileScreen(3)}
            className={`px-3 py-1.5 rounded-full font-semibold transition-all cursor-pointer ${
              activeMobileScreen === 3
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-sm'
                : 'text-purple-200/60 hover:text-white'
            }`}
          >
            3. Schedule
          </button>
        </div>
      </div>

      {/* Triple Device Showcase Stage */}
      {/* On large screens (xl:), all 3 phones are shown side by side just like the user's mockup! */}
      <div className="relative z-10 w-full max-w-7xl flex items-center justify-center gap-6 lg:gap-8 flex-wrap xl:flex-nowrap">
        
        {/* Device 1 (Left: Course View) */}
        <div className={`transition-all duration-300 ${activeMobileScreen !== 1 ? 'hidden xl:block' : 'block'}`}>
          <div className="flex flex-col items-center">
            <span className="hidden xl:inline-block text-[11px] font-bold uppercase tracking-widest text-purple-300/60 mb-2">
              Screen 1 • Note / Course Detail
            </span>
            <PhoneFrame title="Course Detail">
              <LeftCourseScreen
                onBack={() => setActiveMobileScreen(2)}
                onOpenReader={onOpenReader}
              />
            </PhoneFrame>
          </div>
        </div>

        {/* Device 2 (Center: Main Dashboard) */}
        <div className={`transition-all duration-300 ${activeMobileScreen !== 2 ? 'hidden xl:block' : 'block'}`}>
          <div className="flex flex-col items-center">
            <span className="hidden xl:inline-block text-[11px] font-bold uppercase tracking-widest text-pink-300 mb-2 flex items-center space-x-1">
              <span className="w-2 h-2 rounded-full bg-pink-400 animate-pulse" />
              <span>Screen 2 • Main Hub (Shiv.org)</span>
            </span>
            <PhoneFrame title="Main Hub" className="xl:scale-105 xl:-translate-y-2 z-20">
              <CenterDashboardScreen
                onSelectNote={() => {
                  setActiveMobileScreen(1);
                  onOpenReader();
                }}
                onNavigateScreen={(screenNum) => setActiveMobileScreen(screenNum)}
              />
            </PhoneFrame>
          </div>
        </div>

        {/* Device 3 (Right: Schedule & Timeline) */}
        <div className={`transition-all duration-300 ${activeMobileScreen !== 3 ? 'hidden xl:block' : 'block'}`}>
          <div className="flex flex-col items-center">
            <span className="hidden xl:inline-block text-[11px] font-bold uppercase tracking-widest text-purple-300/60 mb-2">
              Screen 3 • Schedule & FAB
            </span>
            <PhoneFrame title="Schedule Planner">
              <RightScheduleScreen
                onBack={() => setActiveMobileScreen(2)}
              />
            </PhoneFrame>
          </div>
        </div>
      </div>

      {/* Switch to Web experience button */}
      <div className="relative z-10 mt-10">
        <button
          onClick={() => setLayoutMode('app')}
          className="flex items-center space-x-2 px-6 py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] border border-white/20 backdrop-blur-xl text-white text-xs sm:text-sm font-semibold transition-all shadow-xl active:scale-95 cursor-pointer"
        >
          <Monitor size={16} className="text-pink-400" />
          <span>Switch to Full Responsive Web Platform View</span>
        </button>
      </div>
    </div>
  );
};
