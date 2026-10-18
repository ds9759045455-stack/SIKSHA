import React from 'react';
import { Search, Plus, BookOpen, Volume2, Pause, Play, Globe, Calculator, Sparkles } from 'lucide-react';
import { useNotes } from '../context/NotesContext';

export const Navbar = ({ onOpenReader }) => {
  const {
    searchQuery,
    setSearchQuery,
    setIsUploadOpen,
    setIsSolverOpen,
    isPlayingAudio,
    togglePlayAudio,
    audioSpeed,
    cycleAudioSpeed,
    activeTopic,
    activeNote,
    narrationLang,
    toggleLanguage
  } = useNotes();

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-2xl bg-[#120d1a]/90 border-b border-white/10 px-4 sm:px-6 md:px-8 py-3 transition-all">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        
        {/* Brand */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-pink-500 via-purple-600 to-indigo-600 p-0.5 shadow-[0_0_20px_rgba(236,72,153,0.4)]">
            <div className="w-full h-full rounded-[14px] bg-[#120d1a] flex items-center justify-center font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300 text-base sm:text-lg">
              S
            </div>
          </div>
          <div className="hidden sm:block">
            <div className="font-black text-base sm:text-lg tracking-tight text-white leading-tight">
              Shiv<span className="text-pink-400">.org</span>
            </div>
            <p className="text-[10px] text-purple-300/60 font-medium leading-none">
              Notes Hub • BCA Sem III
            </p>
          </div>
        </div>

        {/* Search (Flex-1) */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/50" />
            <input
              type="text"
              placeholder="Search notes, Bisection, CRC, Stack, BCNF..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 rounded-full bg-white/[0.06] border border-white/10 focus:border-pink-500/50 focus:bg-white/[0.09] focus:outline-none text-xs text-white placeholder-purple-300/40 transition-all"
            />
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center space-x-1.5 sm:space-x-2 shrink-0">

          {/* Language Toggle: Hindi / English */}
          <button
            onClick={toggleLanguage}
            className="flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/10 text-xs font-semibold text-purple-200 cursor-pointer active:scale-95 transition-all"
            title="Switch Hindi / English Narration"
          >
            <Globe size={13} className="text-pink-400" />
            <span className="hidden sm:inline">{narrationLang === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}</span>
            <span className="sm:hidden">{narrationLang === 'hi' ? '🇮🇳' : '🇬🇧'}</span>
          </button>

          {/* Audio Speed */}
          <button
            onClick={cycleAudioSpeed}
            className="px-2 py-1.5 rounded-full bg-white/[0.07] hover:bg-white/[0.15] border border-white/10 text-[10px] font-bold text-slate-200 cursor-pointer transition-all"
            title="Change Playback Speed"
          >
            {audioSpeed}x
          </button>

          {/* Audio Play/Pause */}
          <button
            onClick={() => togglePlayAudio(activeTopic)}
            className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
              isPlayingAudio
                ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-400 shadow-[0_0_12px_rgba(236,72,153,0.4)]'
                : 'bg-white/[0.07] border-white/10 text-purple-200 hover:bg-white/[0.15]'
            }`}
            title={narrationLang === 'hi' ? 'हिंदी ऑडियो चालू/बंद' : 'Play/Pause Narration'}
          >
            {isPlayingAudio ? <Pause size={12} fill="currentColor" /> : <Play size={12} fill="currentColor" />}
            <span className="hidden md:inline">{isPlayingAudio ? 'Pause' : narrationLang === 'hi' ? 'सुनें' : 'Listen'}</span>
          </button>

          {/* Math Solver Shortcut */}
          <button
            onClick={() => setIsSolverOpen(true)}
            className="hidden md:flex items-center space-x-1 px-2.5 py-1.5 rounded-full bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
            title="Open Interactive Math Equation Solver"
          >
            <Calculator size={13} />
            <span>Solver</span>
          </button>

          {/* Upload / Share Note */}
          <button
            onClick={() => setIsUploadOpen(true)}
            className="flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-[0_4px_15px_rgba(236,72,153,0.35)] transition-all active:scale-95 cursor-pointer border border-white/20"
          >
            <Plus size={13} strokeWidth={2.5} />
            <span className="hidden sm:inline">Share Note</span>
          </button>
        </div>
      </div>
    </header>
  );
};
