import React, { useState } from 'react';
import { X, Pause, Play, Download, Bookmark, CheckCircle2, Copy, Check, Calculator, Sparkles, Globe, Menu, ChevronDown } from 'lucide-react';
import { useNotes } from '../context/NotesContext';
import { hindiNarrations } from '../data/hindiNarrations';

export const NoteReaderModal = ({ isOpen, onClose }) => {
  const {
    activeNote,
    activeTopic,
    setActiveTopicId,
    toggleSaveNote,
    isSaved,
    isPlayingAudio,
    togglePlayAudio,
    audioSpeed,
    cycleAudioSpeed,
    setIsSolverOpen,
    narrationLang,
    toggleLanguage,
    getHindiTopicData,
    showToast
  } = useNotes();

  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);
  const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false);

  if (!isOpen || !activeNote) return null;

  const currentTopic = activeTopic || activeNote.units?.[0]?.topics?.[0] || {
    id: 'default',
    title: activeNote.title,
    content: activeNote.description
  };

  const hindiData = getHindiTopicData(currentTopic.id);

  const handleCopyCode = (codeText, idx) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCodeIndex(idx);
    showToast('Code copied to clipboard! 📋');
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const element = document.createElement('a');
    const contentToDownload = narrationLang === 'hi' 
      ? `# ${activeNote.title}\n## ${hindiData.titleHindi}\n\n${hindiData.audioText}\n\n---\n\n${currentTopic.content}`
      : `# ${activeNote.title}\n## ${currentTopic.title}\n\n${currentTopic.content}`;
      
    const file = new Blob([contentToDownload], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = `${activeNote.code}_${currentTopic.title.replace(/[^a-zA-Z0-9]/g, '_')}.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    showToast('Downloaded study note file! 📥');
  };

  // Helper to render markdown content with styled code blocks, tables, and math
  const renderFormattedContent = (content) => {
    if (!content) return null;

    const sections = content.split('```');
    return sections.map((section, index) => {
      if (index % 2 === 1) {
        const firstLineBreak = section.indexOf('\n');
        const language = section.slice(0, firstLineBreak).trim() || 'text';
        const code = section.slice(firstLineBreak + 1);

        return (
          <div key={index} className="my-4 rounded-2xl overflow-hidden border border-white/15 bg-black/60 shadow-xl">
            <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-white/[0.08] border-b border-white/10 text-xs">
              <span className="font-mono text-pink-300 font-semibold">{language.toUpperCase()}</span>
              <button
                onClick={() => handleCopyCode(code, index)}
                className="flex items-center space-x-1.5 px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-slate-200 transition-all active:scale-95 cursor-pointer text-xs"
              >
                {copiedCodeIndex === index ? (
                  <>
                    <Check size={12} className="text-emerald-400" />
                    <span className="text-emerald-400 font-medium">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={12} />
                    <span>Copy Code</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 sm:p-4 text-xs font-mono text-purple-100 overflow-x-auto leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      const lines = section.split('\n');
      return (
        <div key={index} className="space-y-3 text-slate-200 text-xs sm:text-sm leading-relaxed">
          {lines.map((line, lIdx) => {
            if (line.startsWith('### ')) {
              return (
                <h3 key={lIdx} className="text-base sm:text-lg font-bold text-white pt-4 pb-1 border-b border-white/10 flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-pink-500 shrink-0" />
                  <span>{line.replace('### ', '')}</span>
                </h3>
              );
            }
            if (line.startsWith('#### ')) {
              return (
                <h4 key={lIdx} className="text-sm sm:text-base font-semibold text-pink-300 pt-2">
                  {line.replace('#### ', '')}
                </h4>
              );
            }
            if (line.startsWith('> ')) {
              return (
                <blockquote key={lIdx} className="p-3 my-2 rounded-xl bg-pink-500/10 border-l-4 border-pink-500 text-xs text-pink-200 italic">
                  {line.replace('> ', '')}
                </blockquote>
              );
            }
            if (line.startsWith('- ')) {
              return (
                <li key={lIdx} className="ml-4 sm:ml-5 list-disc text-slate-300 marker:text-pink-400">
                  {line.replace('- ', '')}
                </li>
              );
            }
            if (line.startsWith('|')) {
              return (
                <div key={lIdx} className="font-mono text-[11px] sm:text-xs overflow-x-auto my-1 py-1 text-purple-200">
                  {line}
                </div>
              );
            }
            if (line.trim() === '---') {
              return <hr key={lIdx} className="border-white/10 my-4" />;
            }
            if (!line.trim()) {
              return <div key={lIdx} className="h-1 sm:h-2" />;
            }
            return <p key={lIdx}>{line}</p>;
          })}
        </div>
      );
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-2xl animate-fade-in overflow-hidden">
      <div className="relative w-full max-w-5xl h-[95vh] sm:h-[90vh] flex flex-col rounded-2xl sm:rounded-3xl bg-gradient-to-b from-[#1f162e] via-[#161022] to-[#110c1a] border border-white/20 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden text-white">
        
        {/* Glow */}
        <div className="absolute top-0 right-1/4 w-80 h-32 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Top Bar */}
        <div className="relative z-10 px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-white/[0.04] backdrop-blur-md">
          <div className="flex items-center space-x-2.5 min-w-0">
            <span className="px-2 py-0.5 rounded-lg bg-pink-500/20 text-pink-300 font-bold text-[11px] sm:text-xs border border-pink-500/30 shrink-0">
              {activeNote.code}
            </span>
            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate max-w-[200px] sm:max-w-md">
                {activeNote.title}
              </h2>
              <p className="text-[10px] sm:text-xs text-purple-200/60 truncate">
                {narrationLang === 'hi' ? hindiData.titleHindi : currentTopic.title}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2">
            {/* Hindi / English Language Selector Pill */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-[11px] font-semibold text-purple-200 cursor-pointer active:scale-95 transition-all"
              title="Switch Narration Language"
            >
              <Globe size={12} className="text-pink-400" />
              <span>{narrationLang === 'hi' ? '🇮🇳 हिन्दी' : '🇬🇧 EN'}</span>
            </button>

            {/* Audio Speed Pill */}
            <button
              onClick={cycleAudioSpeed}
              className="px-2 py-1 rounded-full bg-white/10 hover:bg-white/20 text-[10px] font-bold text-slate-200 border border-white/10 cursor-pointer"
              title="Narration Speed"
            >
              {audioSpeed}x
            </button>

            {/* Audio narrator toggle */}
            <button
              onClick={() => togglePlayAudio(currentTopic)}
              className={`flex items-center space-x-1 px-2.5 sm:px-3 py-1 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                isPlayingAudio
                  ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white border-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.5)]'
                  : 'bg-white/10 hover:bg-white/20 text-purple-200 border-white/10'
              }`}
              title={narrationLang === 'hi' ? 'हिंदी ऑडियो नोट्स सुनें' : 'Listen study note'}
            >
              {isPlayingAudio ? <Pause size={12} fill="white" /> : <Play size={12} fill="currentColor" />}
              <span className="hidden sm:inline">
                {isPlayingAudio ? 'Pause' : narrationLang === 'hi' ? 'हिंदी सुनें' : 'Listen'}
              </span>
            </button>

            {/* Solver tool launcher if applicable */}
            {activeNote.id === 'bca-315' && (
              <button
                onClick={() => setIsSolverOpen(true)}
                className="hidden md:flex items-center space-x-1 px-2.5 py-1 rounded-full bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all cursor-pointer"
                title="Open Math Equation Solver"
              >
                <Calculator size={12} />
                <span>Solver</span>
              </button>
            )}

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-all cursor-pointer"
              title="Download Note File"
            >
              <Download size={14} />
            </button>

            {/* Bookmark */}
            <button
              onClick={(e) => toggleSaveNote(activeNote.id, e)}
              className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
                isSaved(activeNote.id)
                  ? 'bg-pink-600/30 border-pink-500 text-pink-300'
                  : 'bg-white/10 border-white/10 text-slate-300 hover:bg-white/20'
              }`}
              title="Bookmark Note"
            >
              <Bookmark size={14} className={isSaved(activeNote.id) ? 'fill-current' : ''} />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-full bg-white/10 hover:bg-rose-500/30 hover:border-rose-400 text-slate-300 transition-all cursor-pointer border border-white/10"
              title="Close Reader"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Mobile Topic Selector Drawer Bar */}
        <div className="md:hidden px-4 py-2 bg-white/[0.03] border-b border-white/10 flex items-center justify-between">
          <button
            onClick={() => setMobileOutlineOpen(!mobileOutlineOpen)}
            className="flex items-center space-x-1.5 text-xs text-purple-200 font-semibold cursor-pointer"
          >
            <Menu size={14} />
            <span>Select Chapter / Topic</span>
            <ChevronDown size={14} className={`transition-transform ${mobileOutlineOpen ? 'rotate-180' : ''}`} />
          </button>

          <span className="text-[10px] text-pink-400 font-mono">
            {currentTopic.duration || '15 min'}
          </span>
        </div>

        {/* Mobile Dropdown Menu for Topics */}
        {mobileOutlineOpen && (
          <div className="md:hidden max-h-48 overflow-y-auto bg-[#171024] p-3 border-b border-white/10 space-y-1">
            {activeNote.units?.flatMap(u => u.topics)?.map((t) => (
              <button
                key={t.id}
                onClick={() => {
                  setActiveTopicId(t.id);
                  setMobileOutlineOpen(false);
                }}
                className={`w-full text-left p-2 rounded-xl text-xs flex items-center space-x-2 ${
                  t.id === currentTopic.id
                    ? 'bg-pink-600/30 text-white font-bold border border-pink-500/30'
                    : 'text-purple-200/70 hover:bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-pink-400 shrink-0" />
                <span className="truncate">{narrationLang === 'hi' && hindiNarrations[t.id] ? hindiNarrations[t.id].titleHindi : t.title}</span>
              </button>
            ))}
          </div>
        )}

        {/* Modal Main Area: Sidebar of Topics + Reader Content */}
        <div className="relative z-10 flex-1 flex flex-col md:flex-row overflow-hidden">
          
          {/* Topics Sidebar (Desktop) */}
          <div className="hidden md:block w-72 border-r border-white/10 p-4 overflow-y-auto bg-black/20 shrink-0">
            <div className="text-xs font-bold text-slate-300 tracking-wider uppercase mb-3 flex items-center justify-between">
              <span>Course Outline</span>
              <span className="text-[10px] text-pink-400 font-normal">
                {activeNote.duration}
              </span>
            </div>

            <div className="space-y-3">
              {activeNote.units?.map((unit) => (
                <div key={unit.unitId} className="space-y-1.5">
                  <div className="text-[11px] font-semibold text-purple-300/80 uppercase tracking-wide px-2 py-1">
                    {unit.title}
                  </div>
                  {unit.topics?.map((topic) => {
                    const isSelected = topic.id === currentTopic.id;
                    return (
                      <button
                        key={topic.id}
                        onClick={() => setActiveTopicId(topic.id)}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs transition-all flex items-start space-x-2 cursor-pointer ${
                          isSelected
                            ? 'bg-gradient-to-r from-pink-600/40 to-purple-600/40 text-white font-semibold border border-pink-500/40 shadow-sm'
                            : 'text-purple-200/70 hover:bg-white/[0.06] hover:text-white'
                        }`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1.5 shrink-0" />
                        <span className="line-clamp-2 leading-relaxed">
                          {narrationLang === 'hi' && hindiNarrations[topic.id]
                            ? hindiNarrations[topic.id].titleHindi
                            : topic.title}
                        </span>
                      </button>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>

          {/* Reader Content Pane */}
          <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto bg-gradient-to-b from-transparent to-black/30">
            <div className="max-w-3xl mx-auto space-y-5">
              
              {/* Header Topic Banner */}
              <div className="p-4 rounded-2xl bg-white/[0.05] border border-white/10 backdrop-blur-md space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h1 className="text-lg sm:text-2xl font-bold text-white tracking-tight">
                      {narrationLang === 'hi' ? hindiData.titleHindi : currentTopic.title}
                    </h1>
                    <p className="text-xs text-purple-200/70 mt-1">
                      {currentTopic.readTime || '8 min read'} • Contributed by {activeNote.author?.name}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => togglePlayAudio(currentTopic, narrationLang)}
                      className="px-3 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold flex items-center space-x-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      {isPlayingAudio ? <Pause size={12} fill="white" /> : <Play size={12} fill="white" />}
                      <span>{narrationLang === 'hi' ? 'हिंदी व्याख्या सुनें' : 'Listen Narration'}</span>
                    </button>
                  </div>
                </div>

                {/* Hindi summary callout banner */}
                {narrationLang === 'hi' && (
                  <div className="p-3 rounded-xl bg-gradient-to-r from-pink-500/15 via-purple-600/15 to-transparent border border-pink-500/30 text-xs text-pink-200 space-y-1">
                    <div className="font-bold flex items-center space-x-1.5 text-pink-300">
                      <span>🇮🇳</span>
                      <span>हिंदी अध्ययन सारांश (Audio & Text):</span>
                    </div>
                    <p className="leading-relaxed text-purple-100">
                      {hindiData.summaryHindi}
                    </p>
                  </div>
                )}
              </div>

              {/* Formatted Content Body */}
              <div className="prose prose-invert max-w-none text-slate-200">
                {renderFormattedContent(currentTopic.content)}
              </div>

              {/* Footer info box */}
              <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-xs text-purple-300/60 gap-3">
                <div className="flex items-center space-x-2">
                  <Sparkles size={14} className="text-pink-400 shrink-0" />
                  <span>Academic Content curated by Shiv.org Educational Community</span>
                </div>
                <div className="text-[11px] font-mono bg-white/5 px-2.5 py-1 rounded-md">
                  Revision Code: {activeNote.code}-{currentTopic?.id || 'REV'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
