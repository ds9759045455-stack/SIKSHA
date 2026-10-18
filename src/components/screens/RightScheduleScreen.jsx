import React from 'react';
import { ArrowLeft, Bell, ChevronLeft, ChevronRight, Rocket, Lock, CheckCircle2, Circle, Edit3, Plus, BookOpen, Clock } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

export const RightScheduleScreen = ({ onBack }) => {
  const {
    schedule,
    selectedDayIndex,
    setSelectedDayIndex,
    toggleScheduleComplete,
    setActiveMobileScreen,
    setIsUploadOpen,
    setActiveNoteId
  } = useNotes();

  const days = [
    { day: 'Sun', date: '13', tasks: '2/4' },
    { day: 'Mon', date: '2', tasks: '1/3' },
    { day: 'Tue', date: '7', tasks: '4/4' },
    { day: 'Wed', date: '3/6', active: true, progressPct: 65 },
    { day: 'Thu', date: '', tasks: '0/2' },
    { day: 'Fri', date: '', tasks: '0/3' },
    { day: 'Sat', date: '', tasks: '0/1' }
  ];

  const getScheduleIcon = (iconName) => {
    switch (iconName) {
      case 'Rocket':
        return <Rocket size={16} className="text-white" />;
      case 'Lock':
        return <Lock size={16} className="text-purple-300" />;
      default:
        return <BookOpen size={16} className="text-pink-300" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-between px-4 pt-2 pb-4 text-white select-none">
      <div>
        {/* Top Header */}
        <div className="flex items-center justify-between py-2">
          <button
            onClick={() => {
              if (onBack) onBack();
              else setActiveMobileScreen(2);
            }}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center border border-white/10 backdrop-blur-md cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft size={18} className="text-slate-200" />
          </button>

          <div className="text-[11px] font-semibold text-purple-200/80 uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
            Study Planner
          </div>

          <button
            onClick={() => setIsUploadOpen(true)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all flex items-center justify-center border border-white/10 backdrop-blur-md cursor-pointer"
            title="Add to Schedule"
          >
            <Bell size={18} className="text-slate-200" />
          </button>
        </div>

        {/* Month Selector: < January 4-10 > */}
        <div className="flex items-center justify-center space-x-3 mt-1.5 py-1">
          <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ChevronLeft size={16} />
          </button>
          <div className="text-sm font-bold text-white tracking-wide">
            January <span className="font-normal text-purple-200/60">4-10</span>
          </div>
          <button className="text-slate-400 hover:text-white transition-colors cursor-pointer">
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Days Row (Horizontal calendar strip) */}
        <div className="grid grid-cols-7 gap-1.5 mt-3 text-center">
          {days.map((item, index) => {
            const isSelected = selectedDayIndex === index;
            return (
              <div
                key={index}
                onClick={() => setSelectedDayIndex(index)}
                className="flex flex-col items-center cursor-pointer group"
              >
                <span className="text-[10px] text-purple-300/60 font-medium mb-1 group-hover:text-purple-200 transition-colors">
                  {item.day}
                </span>

                {item.active ? (
                  // Active day with progress circular ring (Wed 3/6 in screenshot)
                  <div className="relative w-9 h-9 rounded-full flex items-center justify-center bg-[#1e152d] border border-white/20 shadow-lg">
                    {/* SVG Circular Progress Arc */}
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="2.5"
                      />
                      <circle
                        cx="18"
                        cy="18"
                        r="16"
                        fill="none"
                        stroke="#facc15"
                        strokeWidth="2.5"
                        strokeDasharray="100"
                        strokeDashoffset="35"
                        strokeLinecap="round"
                      />
                    </svg>
                    <span className="relative z-10 text-[9px] font-bold text-amber-300 font-mono">
                      {item.date}
                    </span>
                  </div>
                ) : item.date ? (
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-pink-600/40 border border-pink-400 text-white'
                        : 'bg-white/[0.06] hover:bg-white/[0.12] text-purple-200/70 border border-white/5'
                    }`}
                  >
                    {item.date}
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-purple-400/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Section Header: Schedule Today, 15 Jan */}
        <div className="mt-5 flex items-center justify-between">
          <div className="text-xs font-bold text-white tracking-wide">
            Schedule <span className="font-normal text-purple-300/70 text-[11px] ml-1">Today, 15 Jan</span>
          </div>
          <span className="text-[10px] text-pink-300 font-medium px-2 py-0.5 rounded-full bg-pink-500/15 border border-pink-500/30">
            Develop by Shiv.org
          </span>
        </div>

        {/* Schedule Cards List */}
        <div className="mt-3 space-y-2.5 overflow-y-auto max-h-[380px] pr-0.5">
          {schedule.map((task, idx) => {
            const isFirst = idx === 0;
            return (
              <div
                key={task.id}
                onClick={() => {
                  if (task.noteId) setActiveNoteId(task.noteId);
                  toggleScheduleComplete(task.id);
                }}
                className={`relative rounded-3xl p-3.5 transition-all cursor-pointer backdrop-blur-md border ${
                  isFirst
                    ? 'bg-gradient-to-r from-pink-600/40 via-purple-700/30 to-purple-950/60 border-pink-500/30 shadow-[0_10px_25px_rgba(236,72,153,0.25)]'
                    : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/10'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center border shadow-sm ${
                        isFirst
                          ? 'bg-pink-500 border-pink-400 text-white'
                          : 'bg-white/10 border-white/10 text-purple-300'
                      }`}
                    >
                      {getScheduleIcon(task.icon)}
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white tracking-tight leading-snug line-clamp-1">
                        {task.title}
                      </h4>
                      <p className="text-[10px] text-purple-200/60 font-medium mt-0.5">
                        {task.duration}
                      </p>
                    </div>
                  </div>

                  {/* Completion percentage & checkmark badge */}
                  <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-purple-200">
                    {task.completed ? (
                      <CheckCircle2 size={13} className="text-emerald-400 fill-emerald-400/20" />
                    ) : (
                      <Circle size={13} className="text-purple-300/40" />
                    )}
                    <span className="font-mono text-[10px]">{task.progress}%</span>
                  </div>
                </div>

                {/* Card footer: Time & Lessons count */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
                  <span className="px-2 py-0.5 rounded-full bg-black/40 text-purple-200 font-mono">
                    {task.time}
                  </span>

                  <span className="text-purple-300/80 font-medium flex items-center space-x-0.5 hover:text-white transition-colors">
                    <span>{task.lessons} lessons</span>
                    <span>›</span>
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Buttons at Bottom Right (Pencil & Plus in screenshot) */}
      <div className="relative flex justify-end items-center space-x-2.5 pt-2">
        {/* Pencil Edit Memo Button */}
        <button
          onClick={() => {
            const memo = prompt('Quick Study Note / Memo:');
            if (memo) alert('Saved study memo to Shiv.org local session!');
          }}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 active:scale-95 transition-all border border-white/15 flex items-center justify-center text-slate-200 backdrop-blur-xl shadow-lg cursor-pointer"
          title="Quick Study Memo"
        >
          <Edit3 size={16} />
        </button>

        {/* Plus Button */}
        <button
          onClick={() => setIsUploadOpen(true)}
          className="w-12 h-12 rounded-full bg-gradient-to-tr from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 active:scale-95 transition-all flex items-center justify-center text-white shadow-[0_8px_20px_rgba(236,72,153,0.4)] cursor-pointer border border-white/20"
          title="Upload & Share Note"
        >
          <Plus size={22} strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
