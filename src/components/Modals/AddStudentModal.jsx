import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { UserPlus, X, ShieldCheck } from 'lucide-react';

export const AddStudentModal = ({ isOpen, onClose }) => {
  const { addStudent, classesList, feeStructures } = useERP();

  const [formData, setFormData] = useState({
    name: '',
    gender: 'Male',
    classNum: '10',
    section: 'A',
    rollNo: '',
    fatherName: '',
    motherName: '',
    phone: '',
    address: 'Station Road, Bisauli, Badaun',
    bloodGroup: 'B+',
    category: 'OBC',
    totalFeePaid: 1500,
    feeDue: 0,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const matchedClass = classesList.find(c => c.classNum === formData.classNum && c.section === formData.section) || classesList[0];
    
    addStudent({
      ...formData,
      classId: matchedClass.id,
      stream: matchedClass.stream,
      rollNo: parseInt(formData.rollNo) || 1,
      totalFeePaid: parseFloat(formData.totalFeePaid) || 0,
      feeDue: parseFloat(formData.feeDue) || 0,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-slate-200 my-8">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-amber-100 text-amber-900 rounded-xl">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-900">Admit New Student</h2>
              <p className="text-xs text-slate-500">Madan Lal Inter College Enrollment Form</p>
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
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Student Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Aman Sharma"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none focus:ring-2 focus:ring-amber-200"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
              >
                <option value="Male">Male (छात्र)</option>
                <option value="Female">Female (छात्रा)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Class</label>
              <select
                value={formData.classNum}
                onChange={(e) => setFormData({ ...formData, classNum: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                {['6', '7', '8', '9', '10', '11', '12'].map(c => (
                  <option key={c} value={c}>Class {c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Section</label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
              >
                {['A', 'B', 'C', 'D'].map(sec => (
                  <option key={sec} value={sec}>Sec {sec}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Roll Number</label>
              <input
                type="number"
                placeholder="Auto / Enter"
                value={formData.rollNo}
                onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-semibold outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Father's Name *</label>
              <input
                type="text"
                required
                placeholder="Shri ..."
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Mother's Name</label>
              <input
                type="text"
                placeholder="Smt. ..."
                value={formData.motherName}
                onChange={(e) => setFormData({ ...formData, motherName: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Mobile *</label>
              <input
                type="text"
                required
                placeholder="98XXXXXXXX"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-mono"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Category & Blood Group</label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  <option value="GEN">General</option>
                  <option value="OBC">OBC</option>
                  <option value="SC">SC</option>
                  <option value="ST">ST</option>
                </select>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                >
                  {['A+', 'B+', 'O+', 'AB+', 'A-', 'B-', 'O-', 'AB-'].map(bg => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Residential Address (Bisauli / Badaun)</label>
            <input
              type="text"
              required
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3 bg-amber-50/50 p-3 rounded-2xl border border-amber-200/60">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admission Fee Paid (₹)</label>
              <input
                type="number"
                value={formData.totalFeePaid}
                onChange={(e) => setFormData({ ...formData, totalFeePaid: e.target.value })}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-emerald-800"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">Pending Balance (₹)</label>
              <input
                type="number"
                value={formData.feeDue}
                onChange={(e) => setFormData({ ...formData, feeDue: e.target.value })}
                className="w-full p-2.5 bg-white border border-slate-200 rounded-xl font-bold text-rose-700"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0F284E] text-[#F6BD60] font-bold rounded-xl hover:bg-[#16386C] shadow-md transition"
            >
              Admit & Save Student
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
