import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { Megaphone, X, Send } from 'lucide-react';

export const PublishNoticeModal = ({ isOpen, onClose }) => {
  const { addAnnouncement } = useERP();

  const [title, setTitle] = useState('');
  const [hindiTitle, setHindiTitle] = useState('');
  const [category, setCategory] = useState('Examination');
  const [priority, setPriority] = useState('Normal');
  const [target, setTarget] = useState('All');
  const [content, setContent] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addAnnouncement({
      title,
      hindiTitle,
      category,
      priority,
      target,
      content,
    });
    onClose();
    setTitle('');
    setHindiTitle('');
    setContent('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-rose-100 text-rose-800 rounded-xl">
              <Megaphone className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Broadcast College Circular</h2>
              <p className="text-xs text-slate-500">Madan Lal Inter College Announcement Board</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Title (English) *</label>
            <input
              type="text"
              required
              placeholder="e.g. Schedule for Pre-Board Practical Exams 2026-27"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-amber-200"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Notice Title (Hindi)</label>
            <input
              type="text"
              placeholder="e.g. प्री-बोर्ड प्रयोगात्मक परीक्षा समय सारिणी"
              value={hindiTitle}
              onChange={(e) => setHindiTitle(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none"
              >
                <option value="Examination">Examination</option>
                <option value="Holiday">Holiday</option>
                <option value="Staff Notice">Staff Notice</option>
                <option value="Academic">Academic</option>
                <option value="Sports & Cultural">Sports & Cultural</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none"
              >
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent Alert</option>
                <option value="Info">Information Only</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Audience</label>
              <select
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium outline-none"
              >
                <option value="All">All College</option>
                <option value="Teachers Only">Teachers Only</option>
                <option value="Students & Parents">Students & Parents</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Circular Content / Order Body *</label>
            <textarea
              required
              rows={4}
              placeholder="Enter official circular message..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none leading-relaxed"
            ></textarea>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0F284E] text-[#F6BD60] font-bold rounded-xl hover:bg-[#16386C] shadow-md flex items-center gap-1.5 transition"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Broadcast Circular</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
