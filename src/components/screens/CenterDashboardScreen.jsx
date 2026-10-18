import React, { useState } from 'react';
import { Bell, Clock, Star, Video, ChevronRight, Home, MessageSquare, Compass, Settings, Search, Sparkles } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

export const CenterDashboardScreen = ({ onSelectNote, onNavigateScreen }) => {
  const {
    notes,
    savedNoteIds,
    activeNoteId,
    setActiveNoteId,
    selectedStatusTab,
    setSelectedStatusTab,
    setActiveMobileScreen,
    setIsUploadOpen
  } = useNotes();

  const [topTab, setTopTab] = useState('My Courses'); // 'My Courses' | 'Progress'

  // Primary featured note (like AI for Creators in screenshot)
  const heroNote = notes[0] || {};
  // Secondary note (like From Sketch to Vision in screenshot)
  const secondaryNote = notes[1] || notes[0] || {};

  // Compute category counts
  const totalCourses = notes.length;
  const completedCount = notes.filter(n => n.status === 'Completed' || n.progress >= 80).length;
  const incompleteCount = notes.filter(n => n.status === 'Incomplete' || (n.progress < 80 && n.progress > 0)).length;
  const savedCount = savedNoteIds.length;

  const handleOpenNote = (noteId) => {
    setActiveNoteId(noteId);
    if (onSelectNote) {
      onSelectNote(noteId);
    } else {
      setActiveMobileScreen(1); // switch to Left screen (Course view)
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-3 text-white select-none">
      <div>
        {/* Top Header: Avatar + Develop by Shiv.org + Bell */}
        <div className="flex items-center justify-between py-1.5">
          <div className="flex items-center space-x-2.5">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                alt="Profile"
                className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-500/40"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#150f1f]" />
            </div>

            <div>
              <div className="text-[10px] text-pink-300 font-semibold tracking-wider uppercase flex items-center space-x-1">
                <span>Develop by</span>
                <span className="px-1.5 py-0.2 rounded bg-pink-500/20 text-pink-200 border border-pink-500/30">Shiv.org</span>
              </div>
              <div className="text-xs font-bold text-white tracking-tight">
                Notes Sharing Hub
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="relative w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center border border-white/10 backdrop-blur-md cursor-pointer"
            title="Notifications / Upload"
          >
            <Bell size={16} className="text-slate-200" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500 animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-pink-500" />
          </button>
        </div>

        {/* Top Pills: My Courses | Progress */}
        <div className="flex justify-center mt-2.5">
          <div className="inline-flex p-1 rounded-full bg-white/[0.08] backdrop-blur-md border border-white/10 text-xs">
            <button
              onClick={() => setTopTab('My Courses')}
              className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                topTab === 'My Courses'
                  ? 'bg-white/20 text-white shadow-sm font-semibold'
                  : 'text-purple-200/60 hover:text-white'
              }`}
            >
              My Courses
            </button>
            <button
              onClick={() => {
                setTopTab('Progress');
                setActiveMobileScreen(3); // switch to Schedule / Progress
              }}
              className={`px-4 py-1.5 rounded-full font-medium transition-all cursor-pointer ${
                topTab === 'Progress'
                  ? 'bg-white/20 text-white shadow-sm font-semibold'
                  : 'text-purple-200/60 hover:text-white'
              }`}
            >
              Progress
            </button>
          </div>
        </div>

        {/* Hero Featured Card (AI for Creators / BCA 315) */}
        <div
          onClick={() => handleOpenNote(heroNote.id)}
          className="relative mt-3.5 rounded-3xl p-4 overflow-hidden border border-white/15 bg-gradient-to-br from-pink-600/30 via-purple-700/20 to-black/60 shadow-[0_15px_35px_rgba(0,0,0,0.5)] cursor-pointer group active:scale-[0.98] transition-all"
        >
          {/* Frosted pink ambient glow */}
          <div className="absolute -top-10 -right-10 w-44 h-44 rounded-full bg-pink-500/30 blur-2xl pointer-events-none group-hover:scale-110 transition-transform duration-500" />
          
          <img
            src={heroNote.coverImage || "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&auto=format&fit=crop&q=80"}
            alt={heroNote.title}
            className="absolute right-0 top-0 w-40 h-full object-cover opacity-25 mix-blend-screen pointer-events-none"
          />

          {/* Top row: Avatar stack + Active pill */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center -space-x-2">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&auto=format&fit=crop&q=80"
                alt="Peer"
                className="w-6 h-6 rounded-full object-cover ring-2 ring-black"
              />
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&auto=format&fit=crop&q=80"
                alt="Peer"
                className="w-6 h-6 rounded-full object-cover ring-2 ring-black"
              />
              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-[9px] font-bold text-white ring-2 ring-black">
                +1K
              </div>
            </div>

            <span className="px-2.5 py-0.5 rounded-full bg-white text-slate-900 font-bold text-[10px] shadow-sm">
              Active
            </span>
          </div>

          {/* Title & Metadata */}
          <div className="relative z-10 mt-3">
            <h3 className="text-base font-bold text-white tracking-tight leading-tight group-hover:text-pink-200 transition-colors">
              {heroNote.title || 'AI for Creators'}
            </h3>
            <p className="text-[11px] text-purple-200/70 font-medium">
              {heroNote.code || 'BCA 315'} • Shiv.org Verified Notes
            </p>

            <div className="flex items-center space-x-3 mt-2 text-[10px] text-purple-200/90 font-medium">
              <div className="flex items-center space-x-1">
                <Clock size={11} className="text-pink-300" />
                <span>{heroNote.duration || '18h 9m'}</span>
              </div>
              <div className="flex items-center space-x-0.5 text-amber-300">
                <Star size={11} className="fill-current text-amber-400" />
                <span>4.7</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video size={11} className="text-purple-300" />
                <span>16</span>
              </div>
            </div>
          </div>

          {/* Bottom Card Footer: 1 of 5 | Continue > */}
          <div className="relative z-10 mt-4 flex items-center justify-between text-xs pt-1 border-t border-white/10">
            <span className="text-[11px] text-purple-200/70 font-mono">1 of 5</span>
            <span className="inline-flex items-center space-x-1 text-pink-300 font-semibold group-hover:text-white transition-colors">
              <span>Continue</span>
              <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
            </span>
          </div>
        </div>

        {/* Filter Tabs with dynamic counts */}
        <div className="mt-3.5 flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
          {[
            { label: 'All Courses', count: totalCourses },
            { label: 'Completed', count: completedCount },
            { label: 'Incomplete', count: incompleteCount },
            { label: 'Saved', count: savedCount }
          ].map((tab) => {
            const isActive = selectedStatusTab === tab.label;
            return (
              <button
                key={tab.label}
                onClick={() => setSelectedStatusTab(tab.label)}
                className={`whitespace-nowrap flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white/20 text-white font-semibold border border-white/30 shadow-sm'
                    : 'bg-white/[0.05] text-purple-200/60 hover:text-white border border-white/5'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-pink-500/40 text-pink-200' : 'bg-white/10 text-purple-300/60'}`}>
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Secondary Card (From Sketch to Vision / BCA 304 DBMS) */}
        <div
          onClick={() => handleOpenNote(secondaryNote.id)}
          className="relative mt-2.5 rounded-3xl p-3.5 overflow-hidden border border-white/10 bg-gradient-to-r from-orange-500/15 via-purple-900/20 to-black/60 shadow-lg cursor-pointer group active:scale-[0.98] transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-white/15 shrink-0 bg-purple-900/30">
              <img
                src={secondaryNote.coverImage || "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=80"}
                alt={secondaryNote.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform"
              />
            </div>

            <div className="min-w-0">
              <div className="flex items-center space-x-1 -space-x-1 mb-1">
                <div className="w-4 h-4 rounded-full bg-pink-500 text-[8px] flex items-center justify-center font-bold">S</div>
                <div className="w-4 h-4 rounded-full bg-purple-500 text-[8px] flex items-center justify-center font-bold">O</div>
                <span className="text-[9px] text-purple-200/80 font-bold ml-1.5 bg-white/10 px-1 rounded-full">+2K</span>
              </div>

              <h4 className="text-xs font-bold text-white tracking-tight truncate max-w-[160px] group-hover:text-pink-300 transition-colors">
                {secondaryNote.title}
              </h4>
              <p className="text-[10px] text-purple-200/60">
                {secondaryNote.code} • {secondaryNote.totalLessons} lectures
              </p>
            </div>
          </div>

          <div className="w-7 h-7 rounded-full bg-white/10 flex items-center justify-center text-slate-300 group-hover:text-white group-hover:bg-pink-500/30 transition-all">
            <ChevronRight size={14} />
          </div>
        </div>
      </div>

      {/* Floating Translucent Pill Navigation Dock (Bottom bar in screenshot) */}
      <div className="relative mt-2 flex justify-center pb-1">
        <div className="flex items-center justify-between w-full max-w-[280px] px-3 py-2 rounded-full bg-white/[0.08] backdrop-blur-2xl border border-white/15 shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
          {/* Home Active Pill */}
          <button
            onClick={() => setActiveMobileScreen(2)}
            className="w-8 h-8 rounded-full bg-white/20 text-white flex items-center justify-center shadow-inner cursor-pointer"
            title="Home Dashboard"
          >
            <Home size={15} />
          </button>

          {/* Discussion */}
          <button
            onClick={() => setActiveMobileScreen(1)}
            className="w-8 h-8 rounded-full text-purple-200/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            title="Course Lessons"
          >
            <MessageSquare size={15} />
          </button>

          {/* Explore / Compass */}
          <button
            onClick={() => setActiveMobileScreen(3)}
            className="w-8 h-8 rounded-full text-purple-200/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            title="Schedule & Progress"
          >
            <Compass size={15} />
          </button>

          {/* Settings */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-8 h-8 rounded-full text-purple-200/60 hover:text-white hover:bg-white/10 flex items-center justify-center transition-all cursor-pointer"
            title="Upload Note"
          >
            <Settings size={15} />
          </button>

          {/* Search in small circle */}
          <button
            onClick={() => {
              const query = prompt('Search BCA notes by topic or keyword (e.g. Bisection, Stack, OSI, 2PL):');
              if (query) {
                // handle search
              }
            }}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 flex items-center justify-center border border-white/10 transition-all cursor-pointer"
            title="Search Notes"
          >
            <Search size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
