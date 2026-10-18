import React, { useState, useEffect } from 'react';
import { useERP } from '../context/ERPContext';
import {
  CalendarCheck,
  CheckCircle2,
  XCircle,
  Clock,
  UserCheck,
  Save,
  Calendar as CalendarIcon,
  Filter,
  CheckCheck,
  ChevronDown,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Info,
} from 'lucide-react';

export const AttendanceModule = () => {
  const {
    role,
    currentTeacher,
    students,
    classesList,
    markAttendance,
    getClassAttendance,
  } = useERP();

  // Active selected class for attendance
  const [selectedClassId, setSelectedClassId] = useState(() => {
    if (role === 'teacher' && currentTeacher?.assignedClass) {
      const match = classesList.find(c => c.id === currentTeacher.assignedClass);
      if (match) return match.id;
    }
    return classesList[0].id;
  });

  // Selected date
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().split('T')[0];
  });

  // Local status map for active session: { [studentId]: 'Present' | 'Absent' | 'Late' }
  const [localAttendance, setLocalAttendance] = useState({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [activeTabMode, setActiveTabMode] = useState('take'); // 'take' or 'history'

  // Get students of selected class
  const classStudents = students.filter(s => s.classId === selectedClassId);

  // Sync saved attendance when class or date changes
  useEffect(() => {
    const existing = getClassAttendance(selectedClassId, selectedDate);
    if (existing) {
      const map = {};
      classStudents.forEach(s => {
        map[s.id] = existing[s.id] || s.todayStatus || 'Present';
      });
      setLocalAttendance(map);
      setHasUnsavedChanges(false);
    } else {
      // Initialize with student's today status or default Present
      const map = {};
      classStudents.forEach(s => {
        map[s.id] = s.todayStatus || 'Present';
      });
      setLocalAttendance(map);
      setHasUnsavedChanges(false);
    }
  }, [selectedClassId, selectedDate, students]);

  // Toggle single student status
  const handleToggleStatus = (studentId) => {
    setLocalAttendance(prev => {
      const curr = prev[studentId] || 'Present';
      let next = 'Present';
      if (curr === 'Present') next = 'Absent';
      else if (curr === 'Absent') next = 'Late';
      else if (curr === 'Late') next = 'Present';
      return { ...prev, [studentId]: next };
    });
    setHasUnsavedChanges(true);
  };

  // Specific setter
  const handleSetStatus = (studentId, status) => {
    setLocalAttendance(prev => ({ ...prev, [studentId]: status }));
    setHasUnsavedChanges(true);
  };

  // 1-Click "Mark All Present"
  const handleMarkAllPresent = () => {
    const map = {};
    classStudents.forEach(s => {
      map[s.id] = 'Present';
    });
    setLocalAttendance(map);
    setHasUnsavedChanges(true);
  };

  // 1-Click "Mark All Absent"
  const handleMarkAllAbsent = () => {
    const map = {};
    classStudents.forEach(s => {
      map[s.id] = 'Absent';
    });
    setLocalAttendance(map);
    setHasUnsavedChanges(true);
  };

  // Save to Context & LocalStorage
  const handleSave = () => {
    markAttendance(selectedClassId, selectedDate, localAttendance);
    setHasUnsavedChanges(false);
  };

  // Metrics calculation
  const totalInClass = classStudents.length;
  const presentCount = classStudents.filter(s => localAttendance[s.id] === 'Present').length;
  const absentCount = classStudents.filter(s => localAttendance[s.id] === 'Absent').length;
  const lateCount = classStudents.filter(s => localAttendance[s.id] === 'Late').length;
  const attendanceRate = totalInClass > 0 ? Math.round((presentCount / totalInClass) * 100) : 0;

  const currentClassObj = classesList.find(c => c.id === selectedClassId) || classesList[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-700">
              <CalendarCheck className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                  Daily Attendance Console
                </h1>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                  Touch & Mobile Optimized
                </span>
              </div>
              <p className="text-xs text-slate-500">
                {role === 'teacher'
                  ? `Logged in as ${currentTeacher.name} • Class Incharge: ${currentTeacher.assignedClass}`
                  : 'Principal Monitoring & Class Records Overlook'}
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleMarkAllPresent}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-bold transition border border-emerald-200"
          >
            <CheckCheck className="w-4 h-4 text-emerald-600" />
            <span>Mark All Present</span>
          </button>

          <button
            onClick={handleSave}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-bold shadow-md transition ${
              hasUnsavedChanges
                ? 'bg-[#F28482] text-white hover:bg-rose-600 animate-bounce'
                : 'bg-[#0F284E] text-[#F6BD60] hover:bg-[#16386C]'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>{hasUnsavedChanges ? 'Save Changes *' : 'Save Attendance'}</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar: Class & Date */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          
          {/* Class Selector */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Select Class & Section
            </label>
            <select
              value={selectedClassId}
              onChange={(e) => setSelectedClassId(e.target.value)}
              className="w-full text-xs sm:text-sm font-bold py-2.5 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none text-[#0F284E]"
            >
              {classesList.map(c => (
                <option key={c.id} value={c.id}>
                  Class {c.classNum} - Section {c.section} ({c.stream})
                </option>
              ))}
            </select>
          </div>

          {/* Date Picker */}
          <div>
            <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">
              Attendance Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-amber-200 outline-none"
              />
            </div>
          </div>

          {/* Live Attendance Stats Counter */}
          <div className="bg-gradient-to-r from-slate-50 to-[#F7EDE2]/50 p-2.5 rounded-xl border border-slate-200 flex items-center justify-around text-center">
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Present</p>
              <p className="text-base font-extrabold text-emerald-600">{presentCount}</p>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Absent</p>
              <p className="text-base font-extrabold text-[#F28482]">{absentCount}</p>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Late</p>
              <p className="text-base font-extrabold text-amber-600">{lateCount}</p>
            </div>
            <div className="w-px h-6 bg-slate-200"></div>
            <div>
              <p className="text-[10px] font-semibold text-slate-500 uppercase">Rate</p>
              <p className="text-base font-extrabold text-[#0F284E]">{attendanceRate}%</p>
            </div>
          </div>

        </div>
      </div>

      {/* Roster / Attendance Sheet */}
      <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
        
        {/* Banner above table */}
        <div className="p-4 bg-slate-50/80 border-b border-slate-100 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-slate-800">
              Class {currentClassObj.classNum}-{currentClassObj.section} ({currentClassObj.stream})
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">{totalInClass} Students on Roll</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-[11px] text-slate-500">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Present
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#F28482] ml-2"></span> Absent
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 ml-2"></span> Late
          </div>
        </div>

        {/* Mobile-Friendly Grid & Table */}
        <div className="divide-y divide-slate-100">
          {classStudents.map((s) => {
            const status = localAttendance[s.id] || 'Present';

            return (
              <div
                key={s.id}
                className="p-3 sm:px-5 sm:py-3.5 flex items-center justify-between hover:bg-slate-50/80 transition"
              >
                {/* Student Info */}
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-[#84A59D]/20 text-[#0F284E] flex items-center justify-center font-bold text-xs shrink-0">
                    #{s.rollNo}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{s.name}</span>
                      <span className="hidden xs:inline text-[10px] font-mono text-slate-400">
                        {s.admissionNo}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Father: {s.fatherName} • Historical: <span className="text-emerald-700 font-semibold">{s.attendanceRate}%</span>
                    </p>
                  </div>
                </div>

                {/* 1-Tap Toggle Buttons */}
                <div className="flex items-center gap-1.5 sm:gap-2">
                  
                  {/* Present Button */}
                  <button
                    onClick={() => handleSetStatus(s.id, 'Present')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      status === 'Present'
                        ? 'bg-emerald-600 text-white shadow-xs scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>P</span>
                    <span className="hidden sm:inline">resent</span>
                  </button>

                  {/* Absent Button */}
                  <button
                    onClick={() => handleSetStatus(s.id, 'Absent')}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      status === 'Absent'
                        ? 'bg-[#F28482] text-white shadow-xs scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>A</span>
                    <span className="hidden sm:inline">bsent</span>
                  </button>

                  {/* Late Button */}
                  <button
                    onClick={() => handleSetStatus(s.id, 'Late')}
                    className={`px-2.5 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1 transition ${
                      status === 'Late'
                        ? 'bg-[#F6BD60] text-slate-900 shadow-xs scale-105'
                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>L</span>
                    <span className="hidden sm:inline">ate</span>
                  </button>

                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Save Reminder */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Info className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              Attendance status is permanently stored and visible to the Principal in real-time.
            </span>
          </div>

          <button
            onClick={handleSave}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#0F284E] hover:bg-[#16386C] text-[#F6BD60] font-bold rounded-xl shadow transition"
          >
            Submit & Synchronize Attendance
          </button>
        </div>

      </div>

    </div>
  );
};
