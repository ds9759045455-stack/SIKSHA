import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import { AccessDenied } from './AccessDenied';
import {
  GraduationCap,
  UserPlus,
  Phone,
  Mail,
  Award,
  Calendar,
  Search,
  BookOpen,
  Edit2,
  X,
  ShieldCheck,
} from 'lucide-react';

export const StaffDirectory = () => {
  const { role, teachers, addTeacher, updateTeacher } = useERP();

  // If teacher role, let them view the faculty directory for collaboration, but only Principal can add/edit/manage salaries
  const isPrincipal = role === 'principal';

  const [staffSearch, setStaffSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);

  const [newTeacherData, setNewTeacherData] = useState({
    name: '',
    hindiName: '',
    designation: 'Lecturer (PGT)',
    phone: '',
    email: '',
    qualification: 'M.Sc., B.Ed.',
    assignedClass: '10-A',
    assignedSubjects: 'Mathematics',
    salary: 55000,
  });

  const filteredTeachers = teachers.filter((t) => {
    return (
      !staffSearch ||
      t.name.toLowerCase().includes(staffSearch.toLowerCase()) ||
      t.designation.toLowerCase().includes(staffSearch.toLowerCase()) ||
      t.assignedClass.toLowerCase().includes(staffSearch.toLowerCase())
    );
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addTeacher({
      ...newTeacherData,
      assignedSubjects: newTeacherData.assignedSubjects.split(',').map(s => s.trim()),
    });
    setShowAddModal(false);
    setNewTeacherData({
      name: '',
      hindiName: '',
      designation: 'Lecturer (PGT)',
      phone: '',
      email: '',
      qualification: 'M.Sc., B.Ed.',
      assignedClass: '10-A',
      assignedSubjects: 'Mathematics',
      salary: 55000,
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-purple-50 text-purple-800">
              <GraduationCap className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Faculty & Staff Directory
              </h1>
              <p className="text-xs text-slate-500">
                Madan Lal Inter College • Teaching Faculty & Class Incharges
              </p>
            </div>
          </div>
        </div>

        {isPrincipal && (
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0F284E] hover:bg-[#16386C] text-[#F6BD60] rounded-xl font-bold text-xs sm:text-sm shadow-md transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Add New Faculty Member</span>
          </button>
        )}
      </div>

      {/* Search */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search teacher by name, subject, class..."
            value={staffSearch}
            onChange={(e) => setStaffSearch(e.target.value)}
            className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl outline-none"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <span className="text-xs font-semibold text-slate-500">
          Total Faculty: <span className="text-slate-900 font-bold">{teachers.length} Members</span>
        </span>
      </div>

      {/* Faculty Cards Grid (Behance Style Cards) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-[#0F284E] text-[#F6BD60] flex items-center justify-center font-bold text-base shadow-sm">
                    {t.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
                  </div>
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{t.name}</h3>
                    <p className="text-[11px] font-bold text-[#84A59D]">{t.hindiName || ''}</p>
                    <p className="text-[11px] text-slate-500 font-medium">{t.designation}</p>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                  Class {t.assignedClass}
                </span>
              </div>

              {/* Details */}
              <div className="space-y-1.5 text-xs text-slate-600 border-t border-slate-100 pt-3">
                <p className="flex items-center gap-2">
                  <Award className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                  <span className="text-slate-500">Qualification:</span>
                  <span className="font-semibold text-slate-800">{t.qualification}</span>
                </p>
                <p className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                  <span className="text-slate-500">Subjects:</span>
                  <span className="font-semibold text-slate-800">
                    {Array.isArray(t.assignedSubjects) ? t.assignedSubjects.join(', ') : t.assignedSubjects}
                  </span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-500">Phone:</span>
                  <span className="font-mono font-medium">+91 {t.phone}</span>
                </p>
                <p className="flex items-center gap-2 truncate">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="font-mono text-[11px] text-slate-600 truncate">{t.email}</span>
                </p>
              </div>
            </div>

            {/* Bottom Meta */}
            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
              <span>Joined: {t.joiningDate}</span>
              {isPrincipal && (
                <span className="font-bold text-slate-700">Salary: ₹{t.salary.toLocaleString('en-IN')}/mo</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-amber-600" />
                <span>Add Faculty Member</span>
              </h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name (English)</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Satish Chandra Sharma"
                  value={newTeacherData.name}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, name: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Name (Hindi)</label>
                <input
                  type="text"
                  placeholder="e.g. डॉ. सतीश चन्द्र शर्मा"
                  value={newTeacherData.hindiName}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, hindiName: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Designation</label>
                  <select
                    value={newTeacherData.designation}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, designation: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  >
                    <option value="Lecturer (PGT)">Lecturer (PGT)</option>
                    <option value="Assistant Teacher (TGT)">Assistant Teacher (TGT)</option>
                    <option value="Physical Training Instructor (PTI)">Physical Training Instructor (PTI)</option>
                    <option value="Lab Assistant">Lab Assistant</option>
                    <option value="Junior Clerk">Junior Clerk</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assigned Incharge Class</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 10-A or 11-PCM"
                    value={newTeacherData.assignedClass}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, assignedClass: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                  <input
                    type="text"
                    required
                    placeholder="9412345678"
                    value={newTeacherData.phone}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gross Salary (₹)</label>
                  <input
                    type="number"
                    required
                    value={newTeacherData.salary}
                    onChange={(e) => setNewTeacherData({ ...newTeacherData, salary: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Assigned Subjects (comma separated)</label>
                <input
                  type="text"
                  placeholder="e.g. Physics, General Science"
                  value={newTeacherData.assignedSubjects}
                  onChange={(e) => setNewTeacherData({ ...newTeacherData, assignedSubjects: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F284E] text-[#F6BD60] font-bold rounded-xl hover:bg-[#16386C] shadow"
                >
                  Save Faculty Member
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
