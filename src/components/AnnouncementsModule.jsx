import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Megaphone,
  PlusCircle,
  Calendar,
  AlertTriangle,
  FileText,
  Search,
  Filter,
  Trash2,
  Printer,
  X,
  Bell,
  ShieldCheck,
} from 'lucide-react';

export const AnnouncementsModule = ({ onOpenPublishNotice }) => {
  const {
    role,
    announcements,
    deleteAnnouncement,
    collegeInfo,
  } = useERP();

  const isPrincipal = role === 'principal';
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAnnouncements = announcements.filter((a) => {
    const matchesCategory = selectedCategory === 'ALL' || a.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const categories = ['ALL', 'Examination', 'Holiday', 'Academic', 'Staff Notice', 'Emergency'];

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-rose-50 text-rose-700">
              <Megaphone className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Event & Announcement System
              </h1>
              <p className="text-xs text-slate-500">
                Official College Circulars, Examination Notifications & Holiday Orders
              </p>
            </div>
          </div>
        </div>

        {isPrincipal && (
          <button
            onClick={onOpenPublishNotice}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0F284E] hover:bg-[#16386C] text-[#F6BD60] rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Broadcast New Circular</span>
          </button>
        )}
      </div>

      {/* Filter and Category Pills */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#0F284E] text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {cat === 'ALL' ? 'All Notices' : cat}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Search circulars..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center text-slate-400 border border-slate-200/80">
            <Bell className="w-10 h-10 mx-auto mb-2 text-slate-300" />
            <p className="font-semibold text-slate-700">No circulars in this category</p>
            <p className="text-xs text-slate-400 mt-1">Check back later or select All Notices</p>
          </div>
        ) : (
          filteredAnnouncements.map((a) => (
            <div
              key={a.id}
              className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      a.priority === 'Urgent'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-blue-100 text-blue-800'
                    }`}
                  >
                    {a.priority}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                    {a.category}
                  </span>
                  <span className="text-xs font-mono text-slate-400 font-semibold">{a.id}</span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <span className="flex items-center gap-1 font-medium">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" /> {a.date}
                  </span>
                  {isPrincipal && (
                    <button
                      onClick={() => {
                        if (window.confirm('Delete this announcement?')) {
                          deleteAnnouncement(a.id);
                        }
                      }}
                      className="p-1 text-slate-400 hover:text-rose-600 transition"
                      title="Delete Announcement"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              <div>
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 leading-snug">
                  {a.title}
                </h3>
                {a.hindiTitle && (
                  <p className="text-xs font-bold text-amber-800 mt-0.5">{a.hindiTitle}</p>
                )}
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mt-2 whitespace-pre-line">
                  {a.content}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-700">
                  Issued By: <span className="text-[#0F284E] font-bold">{a.issuedBy}</span>
                </span>
                <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">
                  Target: {a.target}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

    </div>
  );
};
