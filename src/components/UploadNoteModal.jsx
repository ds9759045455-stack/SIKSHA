import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, Sparkles, Plus } from 'lucide-react';
import { useNotes } from '../context/NotesContext';

export const UploadNoteModal = ({ isOpen, onClose }) => {
  const { addNewNote } = useNotes();

  const [formData, setFormData] = useState({
    title: '',
    code: 'BCA 305',
    category: 'Computer Science',
    semester: 'Semester III',
    authorName: 'Shiv.org Contributor',
    description: '',
    tags: 'Revision, BCA 3rd Sem, Exam Prep',
    content: ''
  });

  const [fileName, setFileName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      addNewNote({
        ...formData,
        content: formData.content || `### ${formData.title}\n\n${formData.description}\n\n*Contributed via Shiv.org Open Student Notes platform.*`
      });
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const handleFileUploadMock = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      if (!formData.title) {
        setFormData(prev => ({ ...prev, title: file.name.replace(/\.[^/.]+$/, "") }));
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#201730] via-[#171124] to-[#120d1c] border border-white/20 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6 text-white overflow-hidden">
        
        {/* Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between pb-4 border-b border-white/10">
          <div className="flex items-center space-x-2.5">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
              <UploadCloud size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight">
                Share Study Notes
              </h3>
              <p className="text-xs text-purple-200/70">
                Develop by Shiv.org • Open Academic Knowledge Exchange
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-slate-300 transition-all cursor-pointer border border-white/10"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative z-10 mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-1">
          {/* File Dropzone */}
          <div className="relative border-2 border-dashed border-white/20 hover:border-pink-500/50 rounded-2xl p-4 text-center bg-white/[0.03] transition-all cursor-pointer">
            <input
              type="file"
              accept=".pdf,.doc,.docx,.txt,.md"
              onChange={handleFileUploadMock}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <div className="flex flex-col items-center space-y-1">
              <FileText size={24} className="text-pink-400" />
              <div className="text-xs font-semibold text-white">
                {fileName ? fileName : 'Upload PDF / Markdown Study Document'}
              </div>
              <div className="text-[10px] text-purple-200/60">
                Supports PDF, Markdown, DOCX up to 50MB
              </div>
            </div>
          </div>

          {/* Grid fields */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Note Title *
              </label>
              <input
                type="text"
                required
                placeholder="e.g. Computer Graphics: 3D Transformation"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Course / Subject Code
              </label>
              <input
                type="text"
                placeholder="e.g. BCA 305"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1d162b] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white"
              >
                <option value="Computer Science">Computer Science</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Networking">Networking</option>
                <option value="Databases">Databases</option>
                <option value="Software Eng">Software Eng</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-[#1d162b] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white"
              >
                <option value="Semester I">Semester I</option>
                <option value="Semester II">Semester II</option>
                <option value="Semester III">Semester III</option>
                <option value="Semester IV">Semester IV</option>
                <option value="Semester V">Semester V</option>
                <option value="Semester VI">Semester VI</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-purple-200 mb-1">
                Author / Peer Name
              </label>
              <input
                type="text"
                placeholder="Your Name or Shiv.org"
                value={formData.authorName}
                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                className="w-full px-3 py-2.5 rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Brief Overview / Abstract
            </label>
            <textarea
              rows={2}
              placeholder="Summary of formulas, algorithms, or key exam questions covered in this note..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30 leading-relaxed"
            />
          </div>

          {/* Detailed Content / Markdown */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Note Notes & Formatted Markdown (Optional)
            </label>
            <textarea
              rows={4}
              placeholder="Paste Markdown formulas, C programs, or algorithmic proofs here..."
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              className="w-full px-3.5 py-2 font-mono rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30 leading-relaxed"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-semibold text-purple-200 mb-1">
              Tags (Comma separated)
            </label>
            <input
              type="text"
              value={formData.tags}
              onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              className="w-full px-3.5 py-2 rounded-xl bg-white/[0.06] border border-white/15 focus:border-pink-500 focus:outline-none text-xs text-white placeholder-purple-300/30"
            />
          </div>

          {/* Submit */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-slate-300 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-xs font-bold text-white shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Sparkles size={14} />
              <span>{isSubmitting ? 'Publishing...' : 'Publish to Shiv.org'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
