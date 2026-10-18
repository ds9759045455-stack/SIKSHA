import React, { useState, useMemo } from 'react';
import { useERP } from '../context/ERPContext';
import { AccessDenied } from './AccessDenied';
import {
  Users,
  Search,
  Filter,
  UserPlus,
  Edit2,
  Trash2,
  Printer,
  CreditCard,
  Download,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Phone,
  MapPin,
  Check,
  AlertCircle,
  X,
  User,
  ShieldCheck,
} from 'lucide-react';

export const StudentDirectory = ({ onOpenAddStudent }) => {
  const {
    role,
    students,
    classesList,
    deleteStudent,
    updateStudent,
    setActivePrintIdCard,
    setActivePrintReceipt,
    globalSearch,
    setGlobalSearch,
  } = useERP();

  // If teacher tries to view full student directory, block it per user request:
  // "all student data i can enter or principle enter or update all data only visible for principle"
  if (role !== 'principal') {
    return <AccessDenied moduleName="Student Master Records" />;
  }

  // Filters
  const [selectedClassNum, setSelectedClassNum] = useState('ALL');
  const [selectedSection, setSelectedSection] = useState('ALL');
  const [selectedFeeStatus, setSelectedFeeStatus] = useState('ALL');
  const [selectedGender, setSelectedGender] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const [editingStudent, setEditingStudent] = useState(null);
  const itemsPerPage = 15;

  // Filter students based on search and filters
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      // Global or local search
      const query = globalSearch.toLowerCase().trim();
      const matchesSearch =
        !query ||
        s.name.toLowerCase().includes(query) ||
        s.admissionNo.toLowerCase().includes(query) ||
        String(s.rollNo).includes(query) ||
        s.fatherName.toLowerCase().includes(query) ||
        s.phone.includes(query) ||
        s.address.toLowerCase().includes(query);

      // Class filter
      const matchesClass = selectedClassNum === 'ALL' || s.classNum === selectedClassNum;
      // Section filter
      const matchesSection = selectedSection === 'ALL' || s.section === selectedSection;
      // Fee Status
      const matchesFee = selectedFeeStatus === 'ALL' || s.feeStatus === selectedFeeStatus;
      // Gender
      const matchesGender = selectedGender === 'ALL' || s.gender === selectedGender;

      return matchesSearch && matchesClass && matchesSection && matchesFee && matchesGender;
    });
  }, [students, globalSearch, selectedClassNum, selectedSection, selectedFeeStatus, selectedGender]);

  // Pagination
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage) || 1;
  const paginatedStudents = filteredStudents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Export CSV
  const handleExportCSV = () => {
    const headers = ['Admission No', 'Roll No', 'Name', 'Gender', 'Class', 'Section', 'Stream', 'Father Name', 'Phone', 'Address', 'Fee Status', 'Fee Due'];
    const rows = filteredStudents.map(s => [
      s.admissionNo,
      s.rollNo,
      `"${s.name}"`,
      s.gender,
      s.classNum,
      s.section,
      `"${s.stream}"`,
      `"${s.fatherName}"`,
      s.phone,
      `"${s.address}"`,
      s.feeStatus,
      s.feeDue,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `MLIC_Students_Report_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingStudent) return;
    updateStudent(editingStudent.id, editingStudent);
    setEditingStudent(null);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Student Master Directory
              </h1>
              <p className="text-xs text-slate-500">
                Official institutional records for Classes 6 to 12 • 2,500 Student Roll Capacity
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={onOpenAddStudent}
            className="flex items-center gap-2 px-4 py-2 bg-[#0F284E] hover:bg-[#16386C] text-[#F6BD60] rounded-xl text-xs sm:text-sm font-bold shadow-md transition"
          >
            <UserPlus className="w-4 h-4" />
            <span>+ Admit New Student</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs space-y-3">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          
          {/* Class filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Class</label>
            <select
              value={selectedClassNum}
              onChange={(e) => {
                setSelectedClassNum(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
            >
              <option value="ALL">All Classes (6 - 12)</option>
              <option value="6">Class 6th</option>
              <option value="7">Class 7th</option>
              <option value="8">Class 8th</option>
              <option value="9">Class 9th</option>
              <option value="10">Class 10th (High School)</option>
              <option value="11">Class 11th (Inter Part I)</option>
              <option value="12">Class 12th (Inter Part II)</option>
            </select>
          </div>

          {/* Section filter */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Section</label>
            <select
              value={selectedSection}
              onChange={(e) => {
                setSelectedSection(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
            >
              <option value="ALL">All Sections</option>
              <option value="A">Section A</option>
              <option value="B">Section B</option>
              <option value="C">Section C</option>
              <option value="D">Section D</option>
            </select>
          </div>

          {/* Fee Status */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Fee Status</label>
            <select
              value={selectedFeeStatus}
              onChange={(e) => {
                setSelectedFeeStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
            >
              <option value="ALL">All Statuses</option>
              <option value="Paid">Fully Paid</option>
              <option value="Partial">Partial Dues</option>
              <option value="Overdue">Overdue</option>
            </select>
          </div>

          {/* Gender */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Gender</label>
            <select
              value={selectedGender}
              onChange={(e) => {
                setSelectedGender(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full text-xs font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
            >
              <option value="ALL">All Genders</option>
              <option value="Male">Boys (छात्र)</option>
              <option value="Female">Girls (छात्रा)</option>
            </select>
          </div>

          {/* Search box */}
          <div className="col-span-2 sm:col-span-1">
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Direct Search</label>
            <div className="relative">
              <input
                type="text"
                placeholder="Name / Roll..."
                value={globalSearch}
                onChange={(e) => {
                  setGlobalSearch(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full text-xs py-2 pl-8 pr-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>
            Showing <span className="font-bold text-slate-800">{filteredStudents.length}</span> students matching filter criteria
          </span>
          {(selectedClassNum !== 'ALL' || selectedSection !== 'ALL' || selectedFeeStatus !== 'ALL' || globalSearch) && (
            <button
              onClick={() => {
                setSelectedClassNum('ALL');
                setSelectedSection('ALL');
                setSelectedFeeStatus('ALL');
                setSelectedGender('ALL');
                setGlobalSearch('');
              }}
              className="text-amber-700 font-semibold hover:underline text-[11px]"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Students Table (Desktop & Mobile Responsive) */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead>
              <tr className="bg-[#0F284E] text-white uppercase text-[10px] tracking-wider">
                <th className="py-3 px-4 font-semibold">Adm No / Roll</th>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Class & Sec</th>
                <th className="py-3 px-4 font-semibold">Father's Name</th>
                <th className="py-3 px-4 font-semibold">Contact & Address</th>
                <th className="py-3 px-4 font-semibold text-center">Fee Status</th>
                <th className="py-3 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {paginatedStudents.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400">
                    <p className="font-semibold text-sm">No student records found</p>
                    <p className="text-xs mt-1">Try relaxing your search query or filters</p>
                  </td>
                </tr>
              ) : (
                paginatedStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/80 transition">
                    
                    {/* Adm & Roll */}
                    <td className="py-3 px-4">
                      <span className="font-mono font-bold text-slate-800 block">{s.admissionNo}</span>
                      <span className="text-[11px] text-slate-500 font-medium">Roll: #{s.rollNo}</span>
                    </td>

                    {/* Student Name & Avatar */}
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#84A59D]/20 text-[#0F284E] flex items-center justify-center font-bold text-xs shrink-0">
                          {s.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 block text-xs">{s.name}</span>
                          <span className="text-[10px] text-slate-400">
                            {s.gender} • {s.category || 'GEN'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Class & Section */}
                    <td className="py-3 px-4">
                      <span className="inline-block px-2 py-0.5 bg-blue-50 text-blue-900 border border-blue-200 rounded font-bold text-[11px]">
                        Class {s.classNum} - {s.section}
                      </span>
                      <span className="text-[10px] text-slate-500 block mt-0.5 truncate max-w-[120px]">
                        {s.stream}
                      </span>
                    </td>

                    {/* Father Name */}
                    <td className="py-3 px-4">
                      <span className="font-semibold text-slate-700 block">{s.fatherName}</span>
                      <span className="text-[10px] text-slate-400">Mother: {s.motherName}</span>
                    </td>

                    {/* Contact & Address */}
                    <td className="py-3 px-4">
                      <span className="font-mono text-slate-700 block flex items-center gap-1">
                        <Phone className="w-3 h-3 text-slate-400" /> {s.phone}
                      </span>
                      <span className="text-[10px] text-slate-500 truncate max-w-[140px] block">
                        {s.address}
                      </span>
                    </td>

                    {/* Fee Status */}
                    <td className="py-3 px-4 text-center">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full font-bold text-[10px] ${
                          s.feeStatus === 'Paid'
                            ? 'bg-emerald-100 text-emerald-800'
                            : s.feeStatus === 'Partial'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-rose-100 text-rose-800'
                        }`}
                      >
                        {s.feeStatus}
                      </span>
                      {s.feeDue > 0 && (
                        <span className="block text-[10px] text-rose-600 font-semibold mt-0.5">
                          Due: ₹{s.feeDue}
                        </span>
                      )}
                    </td>

                    {/* Actions */}
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        {/* ID Card */}
                        <button
                          onClick={() => setActivePrintIdCard(s)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-blue-900 hover:bg-blue-50 transition"
                          title="Print Student ID Card"
                        >
                          <Printer className="w-4 h-4 text-blue-700" />
                        </button>

                        {/* Edit Student */}
                        <button
                          onClick={() => setEditingStudent(s)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-amber-900 hover:bg-amber-50 transition"
                          title="Edit Student Record"
                        >
                          <Edit2 className="w-4 h-4 text-amber-700" />
                        </button>

                        {/* Delete Student */}
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete ${s.name}'s record from college ERP?`)) {
                              deleteStudent(s.id);
                            }
                          }}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-rose-900 hover:bg-rose-50 transition"
                          title="Delete Student"
                        >
                          <Trash2 className="w-4 h-4 text-rose-600" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
          <div>
            Page <span className="font-bold text-slate-900">{currentPage}</span> of{' '}
            <span className="font-bold text-slate-900">{totalPages}</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="px-2 font-semibold">{currentPage}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-slate-200 hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Edit Student Modal */}
      {editingStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-4">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Edit2 className="w-5 h-5 text-amber-600" />
                <span>Update Student Record ({editingStudent.admissionNo})</span>
              </h2>
              <button
                onClick={() => setEditingStudent(null)}
                className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Student Full Name</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.name}
                    onChange={(e) => setEditingStudent({ ...editingStudent, name: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200 font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Roll Number</label>
                  <input
                    type="number"
                    required
                    value={editingStudent.rollNo}
                    onChange={(e) => setEditingStudent({ ...editingStudent, rollNo: parseInt(e.target.value) || 1 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Father's Name</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.fatherName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, fatherName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Mother's Name</label>
                  <input
                    type="text"
                    value={editingStudent.motherName}
                    onChange={(e) => setEditingStudent({ ...editingStudent, motherName: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Class</label>
                  <select
                    value={editingStudent.classNum}
                    onChange={(e) => {
                      const c = e.target.value;
                      const matchedClass = classesList.find(cl => cl.classNum === c && cl.section === editingStudent.section) || classesList[0];
                      setEditingStudent({
                        ...editingStudent,
                        classNum: c,
                        classId: matchedClass.id,
                        stream: matchedClass.stream,
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {['6', '7', '8', '9', '10', '11', '12'].map(cn => (
                      <option key={cn} value={cn}>Class {cn}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Section</label>
                  <select
                    value={editingStudent.section}
                    onChange={(e) => {
                      const sec = e.target.value;
                      const matchedClass = classesList.find(cl => cl.classNum === editingStudent.classNum && cl.section === sec) || classesList[0];
                      setEditingStudent({
                        ...editingStudent,
                        section: sec,
                        classId: matchedClass.id,
                        stream: matchedClass.stream,
                      });
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold"
                  >
                    {['A', 'B', 'C', 'D'].map(sec => (
                      <option key={sec} value={sec}>Sec {sec}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Pending Fee Due (₹)</label>
                  <input
                    type="number"
                    value={editingStudent.feeDue}
                    onChange={(e) => setEditingStudent({ ...editingStudent, feeDue: parseFloat(e.target.value) || 0 })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-rose-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Emergency Phone</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.phone}
                    onChange={(e) => setEditingStudent({ ...editingStudent, phone: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Residential Address (Bisauli/Badaun)</label>
                  <input
                    type="text"
                    required
                    value={editingStudent.address}
                    onChange={(e) => setEditingStudent({ ...editingStudent, address: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingStudent(null)}
                  className="px-4 py-2 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0F284E] text-[#F6BD60] font-bold rounded-xl hover:bg-[#16386C] shadow"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
