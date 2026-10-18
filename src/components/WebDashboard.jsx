import React from 'react';
import { BookOpen, Star, Clock, Video, Bookmark, ArrowRight, ChevronRight, Calculator, Sparkles, CheckCircle2, Circle, UploadCloud, Search } from 'lucide-react';
import { useNotes } from '../context/NotesContext';

export const WebDashboard = ({ onOpenReader }) => {
  const {
    filteredNotes,
    toggleSaveNote,
    isSaved,
    setActiveNoteId,
    setActiveTopicId,
    selectedCategory,
    setSelectedCategory,
    selectedStatusTab,
    setSelectedStatusTab,
    searchQuery,
    setSearchQuery,
    schedule,
    selectedDayIndex,
    setSelectedDayIndex,
    toggleScheduleComplete,
    setIsUploadOpen,
    setIsSolverOpen,
    togglePlayAudio,
    narrationLang,
    toggleLanguage
  } = useNotes();

  const categories = ['All', 'Mathematics', 'Computer Science', 'Networking', 'Databases'];

  const days = [
    { day: 'Sun', date: '13' },
    { day: 'Mon', date: '2' },
    { day: 'Tue', date: '7' },
    { day: 'Wed', date: '3/6', active: true },
    { day: 'Thu', date: '14' },
    { day: 'Fri', date: '15' },
    { day: 'Sat', date: '16' }
  ];

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-5 md:px-8 py-5 sm:py-8 space-y-6 sm:space-y-10">
      
      {/* Hero Banner */}
      <div className="relative rounded-2xl sm:rounded-[32px] p-5 sm:p-8 md:p-10 overflow-hidden border border-white/15 bg-gradient-to-r from-purple-950/60 via-[#1e1330] to-[#140e1f] shadow-2xl">
        <div className="absolute -top-20 -right-10 w-72 h-72 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-xs font-semibold text-pink-300">
              <Sparkles size={12} className="text-pink-400" />
              <span>Develop by Shiv.org • BCA Sem III Open Notes Platform</span>
            </div>

            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
              Share, Learn & Ace <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-300 to-purple-300">
                BCA Semester III Notes
              </span>
            </h1>

            <p className="text-sm text-purple-200/80 leading-relaxed">
              Curated revision guides with solved numericals, algorithms in C, and step-by-step proofs. Bisection, Newton-Raphson, OSI Model, SQL Normalization — all with Hindi audio narration!
            </p>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <button
                onClick={() => {
                  setActiveNoteId('bca-315');
                  onOpenReader();
                }}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-[0_10px_25px_rgba(236,72,153,0.35)] transition-all active:scale-95 cursor-pointer flex items-center space-x-2 border border-white/20"
              >
                <span>Read Featured Notes</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={() => setIsSolverOpen(true)}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-purple-200 hover:text-white font-semibold text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <Calculator size={15} className="text-amber-400" />
                <span>Math Solver</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="px-4 sm:px-6 py-2.5 sm:py-3 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-purple-200 hover:text-white font-semibold text-xs sm:text-sm border border-white/15 backdrop-blur-md transition-all active:scale-95 cursor-pointer flex items-center space-x-2"
              >
                <span>{narrationLang === 'hi' ? '🇮🇳 हिंदी ऑडियो' : '🇬🇧 English Audio'}</span>
              </button>
            </div>
          </div>

          {/* Stats Card — shown on xl */}
          <div className="w-full xl:w-72 rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl space-y-4">
            <div className="text-xs font-bold text-purple-200/80 uppercase tracking-wider">Platform Stats</div>
            <div className="grid grid-cols-2 gap-3 text-center">
              {[
                { val: '4', label: 'Full Courses' },
                { val: '68+', label: 'Exam Topics', color: 'text-pink-400' },
                { val: '4.9★', label: 'Avg Rating', color: 'text-amber-300' },
                { val: '100%', label: 'Free & Open', color: 'text-emerald-400' },
              ].map((s, i) => (
                <div key={i} className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                  <div className={`text-xl sm:text-2xl font-black text-white ${s.color || ''}`}>{s.val}</div>
                  <div className="text-[11px] text-purple-300/70">{s.label}</div>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-white/10 text-[11px] text-purple-200/60 text-center">
              Verified by <strong className="text-white">Shiv.org</strong> Academic Committee
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar (supplemental, since desktop has it in navbar) */}
      <div className="md:hidden relative">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-300/50" />
        <input
          type="text"
          placeholder="Search notes or topics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-8 pr-3 py-2.5 rounded-full bg-white/[0.06] border border-white/10 focus:border-pink-500/50 focus:outline-none text-xs text-white placeholder-purple-300/40"
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 sm:gap-8">
        
        {/* Left/Main: Notes List */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Category Pills */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1.5 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-[0_4px_15px_rgba(236,72,153,0.35)] border border-white/20'
                    : 'bg-white/[0.06] hover:bg-white/[0.12] text-purple-200/70 border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Status filter tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none text-xs">
            {['All Courses', 'Completed', 'Incomplete', 'Saved'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedStatusTab(tab)}
                className={`whitespace-nowrap px-3 py-1 rounded-full transition-all cursor-pointer border ${
                  selectedStatusTab === tab
                    ? 'bg-white/15 text-white font-semibold border-white/30'
                    : 'bg-white/[0.04] text-purple-200/60 border-white/5 hover:text-white'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Notes Grid */}
          {filteredNotes.length === 0 ? (
            <div className="py-16 text-center text-purple-300/60">
              <BookOpen size={40} className="mx-auto mb-3 opacity-40" />
              <p className="text-sm">No notes match your search. Try different keywords.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {filteredNotes.map((note) => {
                const saved = isSaved(note.id);
                return (
                  <div
                    key={note.id}
                    className="group relative rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-b from-white/[0.08] to-white/[0.02] backdrop-blur-xl border border-white/15 hover:border-pink-500/40 shadow-xl hover:shadow-[0_20px_40px_rgba(236,72,153,0.15)] transition-all cursor-pointer flex flex-col justify-between"
                    onClick={() => { setActiveNoteId(note.id); onOpenReader(); }}
                  >
                    {/* Cover image */}
                    <div className="relative w-full h-32 sm:h-36 rounded-xl sm:rounded-2xl overflow-hidden mb-3.5 border border-white/10 bg-purple-950/40">
                      <img
                        src={note.coverImage}
                        alt={note.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#150f1f] via-transparent to-transparent" />

                      <div className="absolute top-2 left-2 z-10 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-pink-300">
                        {note.code}
                      </div>

                      <button
                        onClick={(e) => toggleSaveNote(note.id, e)}
                        className={`absolute top-2 right-2 z-10 p-1.5 sm:p-2 rounded-full backdrop-blur-md border transition-all cursor-pointer ${
                          saved ? 'bg-pink-600/40 border-pink-500 text-pink-300' : 'bg-black/50 border-white/15 text-slate-300 hover:bg-white/20'
                        }`}
                      >
                        <Bookmark size={13} className={saved ? 'fill-current' : ''} />
                      </button>

                      {/* Progress bar */}
                      {note.progress > 0 && (
                        <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
                          <div className="h-full bg-gradient-to-r from-pink-500 to-purple-400" style={{ width: `${note.progress}%` }} />
                        </div>
                      )}
                    </div>

                    <h3 className="text-sm sm:text-base font-bold text-white tracking-tight group-hover:text-pink-300 transition-colors line-clamp-1">
                      {note.title}
                    </h3>
                    <p className="text-xs text-purple-200/60 mt-1 line-clamp-2 leading-relaxed">
                      {note.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mt-2.5">
                      {note.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-white/[0.05] border border-white/10 text-purple-300">
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Card footer */}
                    <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <img
                          src={note.author?.avatar}
                          alt={note.author?.name}
                          className="w-6 h-6 sm:w-7 sm:h-7 rounded-full object-cover ring-1 ring-pink-500/30"
                        />
                        <div className="text-[11px] font-medium text-slate-200 truncate max-w-[120px]">
                          {note.author?.name}
                        </div>
                      </div>
                      <div className="flex items-center space-x-0.5 text-xs font-bold text-pink-400 group-hover:translate-x-1 transition-transform">
                        <span>Read</span>
                        <ChevronRight size={13} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Sidebar: Schedule & Tips */}
        <div className="space-y-5">
          
          {/* Schedule Card */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">Study Timeline</h3>
                <p className="text-xs text-purple-200/60">Weekly Revision Schedule</p>
              </div>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-300 font-semibold border border-pink-500/30">Shiv.org</span>
            </div>

            {/* Days Strip */}
            <div className="grid grid-cols-7 gap-1 text-center">
              {days.map((item, index) => {
                const isSelected = selectedDayIndex === index;
                return (
                  <div key={index} onClick={() => setSelectedDayIndex(index)} className="flex flex-col items-center cursor-pointer group">
                    <span className="text-[10px] text-purple-300/60 font-medium mb-1">{item.day}</span>
                    {item.active ? (
                      <div className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#1e152d] border border-white/20">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="16" cy="16" r="14" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
                          <circle cx="16" cy="16" r="14" fill="none" stroke="#facc15" strokeWidth="2" strokeDasharray="90" strokeDashoffset="30" strokeLinecap="round" />
                        </svg>
                        <span className="relative z-10 text-[8px] font-bold text-amber-300 font-mono">{item.date}</span>
                      </div>
                    ) : (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-semibold transition-all ${isSelected ? 'bg-pink-600/40 border border-pink-400 text-white' : 'bg-white/[0.06] hover:bg-white/[0.12] text-purple-200/70 border border-white/5'}`}>
                        {item.date}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Tasks */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-300">Today's Revision Goals</div>
              {schedule.map((task) => (
                <div
                  key={task.id}
                  onClick={() => toggleScheduleComplete(task.id)}
                  className="p-2.5 sm:p-3 rounded-xl sm:rounded-2xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 transition-all cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2 min-w-0">
                    {task.completed
                      ? <CheckCircle2 size={15} className="text-emerald-400 fill-emerald-400/20 shrink-0" />
                      : <Circle size={15} className="text-purple-400/50 shrink-0" />
                    }
                    <div className="min-w-0">
                      <div className={`text-xs font-semibold text-white truncate max-w-[160px] ${task.completed ? 'line-through opacity-50' : ''}`}>
                        {task.title}
                      </div>
                      <div className="text-[10px] text-purple-200/60">{task.time} • {task.duration}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-purple-200 font-bold shrink-0 ml-2">{task.progress}%</span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setIsUploadOpen(true)}
              className="w-full py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
            >
              <UploadCloud size={14} />
              <span>Contribute New Study Notes</span>
            </button>
          </div>

          {/* Exam Tips */}
          <div className="rounded-2xl sm:rounded-3xl p-4 sm:p-5 bg-gradient-to-br from-amber-500/10 via-purple-900/20 to-transparent border border-amber-500/20 space-y-3">
            <div className="flex items-center space-x-2 text-xs font-bold text-amber-300">
              <Sparkles size={14} />
              <span>Shiv.org Quick Exam Tips</span>
            </div>
            <ul className="text-xs text-slate-300 space-y-1.5 list-disc ml-4 leading-relaxed">
              <li>Binary Search requires pre-sorted array — always state this first!</li>
              <li>Circular Queue: <code className="text-amber-300 text-[10px]">Rear = (Rear+1) % MaxSize</code></li>
              <li>Newton-Raphson fails if <code className="text-amber-300 text-[10px]">f'(x) = 0</code>.</li>
              <li>OSI vs TCP/IP: 7 layers vs 4 layers — draw the diagram!</li>
              <li>BCNF requires every determinant to be a super key.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
