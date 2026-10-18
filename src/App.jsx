import React, { useState } from 'react';
import { NotesProvider, useNotes } from './context/NotesContext';
import { Navbar } from './components/Navbar';
import { WebDashboard } from './components/WebDashboard';
import { NoteReaderModal } from './components/NoteReaderModal';
import { UploadNoteModal } from './components/UploadNoteModal';
import { InteractiveSolverModal } from './components/InteractiveSolverModal';
import { Sparkles } from 'lucide-react';

const MainApp = () => {
  const {
    isUploadOpen,
    setIsUploadOpen,
    isSolverOpen,
    setIsSolverOpen,
    toastMessage
  } = useNotes();

  const [isReaderOpen, setIsReaderOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#120d1a] text-[#ede9fe] flex flex-col selection:bg-pink-500/30 selection:text-pink-200">

      {/* Top Navbar */}
      <Navbar onOpenReader={() => setIsReaderOpen(true)} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <WebDashboard onOpenReader={() => setIsReaderOpen(true)} />
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-white/10 bg-black/40 backdrop-blur-xl py-5 px-4 sm:px-8 mt-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-purple-200/50">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-tr from-pink-500 to-purple-600 flex items-center justify-center text-white text-[10px] font-black">S</div>
            <span className="font-semibold text-white">Shiv.org Notes Hub</span>
            <span className="text-pink-400 font-medium">• Develop by Shiv.org</span>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[11px]">
            <span>BCA Semester III Notes</span>
            <span>•</span>
            <span>हिंदी ऑडियो नैरेशन</span>
            <span>•</span>
            <span>Interactive Math Solver</span>
          </div>
          <div className="text-[11px] text-purple-300/40">© {new Date().getFullYear()} Shiv.org</div>
        </div>
      </footer>

      {/* Modals */}
      <NoteReaderModal isOpen={isReaderOpen} onClose={() => setIsReaderOpen(false)} />
      <UploadNoteModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
      <InteractiveSolverModal isOpen={isSolverOpen} onClose={() => setIsSolverOpen(false)} />

      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 flex items-center space-x-2 px-4 py-3 rounded-2xl bg-[#1e152d] border border-pink-500/40 text-white text-xs font-medium shadow-[0_10px_30px_rgba(236,72,153,0.3)] backdrop-blur-xl max-w-[90vw]">
          <Sparkles size={14} className="text-pink-400 shrink-0" />
          <span className="text-center">{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <NotesProvider>
      <MainApp />
    </NotesProvider>
  );
}
