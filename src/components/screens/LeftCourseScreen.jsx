import React from 'react';
import { ArrowLeft, Bookmark, Star, Lightbulb, Activity, Play, Pause, Maximize2, BookOpen, Volume2 } from 'lucide-react';
import { useNotes } from '../../context/NotesContext';

export const LeftCourseScreen = ({ onBack, onOpenReader }) => {
  const {
    activeNote,
    setActiveTopicId,
    toggleSaveNote,
    isSaved,
    isPlayingAudio,
    togglePlayAudio,
    audioSpeed,
    cycleAudioSpeed,
    audioProgress,
    setAudioProgress,
    setActiveMobileScreen
  } = useNotes();

  const saved = isSaved(activeNote.id);

  // Default lesson icons
  const getTopicIcon = (index) => {
    if (index % 3 === 0) return <Lightbulb size={18} className="text-amber-300" />;
    if (index % 3 === 1) return <Activity size={18} className="text-pink-400" />;
    return <BookOpen size={18} className="text-purple-400" />;
  };

  const allTopics = activeNote.units ? activeNote.units.flatMap(u => u.topics) : [];

  return (
    <div className="flex-1 flex flex-col px-4 pt-2 pb-6 text-white select-none">
      {/* Top Header Navigation */}
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
          Course View
        </div>

        <button
          onClick={(e) => toggleSaveNote(activeNote.id, e)}
          className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all active:scale-95 cursor-pointer backdrop-blur-md ${
            saved
              ? 'bg-pink-600/30 border-pink-500/50 text-pink-300 shadow-[0_0_15px_rgba(236,72,153,0.3)]'
              : 'bg-white/10 border-white/10 text-slate-300 hover:bg-white/20'
          }`}
          title={saved ? 'Remove Bookmark' : 'Bookmark Note'}
        >
          <Bookmark size={18} className={saved ? 'fill-current' : ''} />
        </button>
      </div>

      {/* Hero Media / Lecture Banner */}
      <div className="relative mt-2 rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-br from-purple-900/40 via-purple-950/60 to-black/80 aspect-[4/3] flex flex-col justify-end p-3.5 shadow-2xl">
        <img
          src={activeNote.coverImage || "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=80"}
          alt={activeNote.title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105 hover:scale-110 transition-transform duration-700"
        />

        {/* Subtle glow layer */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150f1f] via-[#150f1f]/60 to-transparent" />

        {/* Faculty badge overlay */}
        <div className="absolute top-3 left-3 z-10 flex items-center space-x-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/15 text-[11px] text-purple-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{activeNote.code} • Shiv.org Verified</span>
        </div>

        {/* Audio scrub control bar (matching UI in left screen) */}
        <div className="relative z-10 rounded-2xl p-2.5 bg-white/10 backdrop-blur-xl border border-white/20 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-[11px] text-slate-200">
            <button
              onClick={cycleAudioSpeed}
              className="px-2 py-0.5 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition-all font-semibold tracking-wider text-[10px] text-white cursor-pointer border border-white/10"
              title="Click to change playback speed"
            >
              {audioSpeed}x
            </button>

            <span className="font-mono text-[10px] text-slate-300">
              {isPlayingAudio ? '12:18' : '00:00'} / {activeNote.duration || '28:00'}
            </span>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => togglePlayAudio(activeNote.description)}
                className="w-6 h-6 rounded-full bg-pink-500 hover:bg-pink-400 text-white flex items-center justify-center transition-transform active:scale-90 cursor-pointer shadow-md"
                title={isPlayingAudio ? 'Pause Lecture' : 'Play Lecture'}
              >
                {isPlayingAudio ? <Pause size={11} fill="white" /> : <Play size={11} fill="white" className="ml-0.5" />}
              </button>
              <button
                onClick={onOpenReader}
                className="text-slate-300 hover:text-white transition-colors cursor-pointer"
                title="Open Fullscreen Reader"
              >
                <Maximize2 size={13} />
              </button>
            </div>
          </div>

          {/* Progress Slider Bar */}
          <div className="relative w-full h-1.5 bg-white/20 rounded-full overflow-hidden cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-pink-500 to-purple-400 rounded-full relative"
              style={{ width: `${isPlayingAudio ? 55 : audioProgress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white rounded-full shadow-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mt-4">
        <h2 className="text-xl font-bold tracking-tight text-white leading-snug">
          {activeNote.title}
        </h2>
        <p className="mt-1 text-xs text-purple-200/70 line-clamp-2 leading-relaxed">
          {activeNote.description}
        </p>
      </div>

      {/* Author / Contributor Info */}
      <div className="mt-3.5 flex items-center justify-between py-2 px-3 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md">
        <div className="flex items-center space-x-2.5">
          <img
            src={activeNote.author?.avatar || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80"}
            alt={activeNote.author?.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-pink-500/40"
          />
          <div>
            <div className="text-xs font-semibold text-white">
              By {activeNote.author?.name || 'Shiv.org Board'}
            </div>
            <div className="text-[10px] text-purple-300/60">
              {activeNote.author?.role || 'Verified Contributor'}
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-1 text-xs font-semibold text-amber-300">
          <span>{activeNote.author?.rating || 4.9}</span>
          <Star size={12} className="fill-current text-amber-400" />
        </div>
      </div>

      {/* Lessons / Topics List */}
      <div className="mt-4 flex-1 flex flex-col">
        <div className="flex items-center justify-between mb-2.5">
          <span className="text-xs font-semibold text-slate-300 tracking-wide uppercase">
            Lessons & Topics
          </span>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white/10 text-purple-200">
            {allTopics.length || activeNote.totalLessons}
          </span>
        </div>

        <div className="space-y-2 overflow-y-auto pr-0.5 max-h-[220px]">
          {allTopics.map((topic, idx) => (
            <div
              key={topic.id || idx}
              onClick={() => {
                setActiveTopicId(topic.id);
                if (onOpenReader) onOpenReader();
              }}
              className="group flex items-center justify-between p-2.5 rounded-2xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-pink-500/30 transition-all cursor-pointer backdrop-blur-md active:scale-[0.98]"
            >
              <div className="flex items-center space-x-3 min-w-0">
                <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:scale-105 transition-transform">
                  {getTopicIcon(idx)}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium text-white truncate max-w-[160px] group-hover:text-pink-300 transition-colors">
                    {topic.title}
                  </div>
                  <div className="text-[10px] text-purple-200/60">
                    {topic.duration || '28 min'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-1 text-[11px] text-purple-300/80 font-medium">
                <span>{topic.lessonsCount || '1'} lesson</span>
                <span className="text-slate-400 group-hover:translate-x-0.5 transition-transform">›</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
