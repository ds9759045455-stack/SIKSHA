import React, { useState } from 'react';
import { useERP } from '../context/ERPContext';
import {
  Calendar,
  Clock,
  BookOpen,
  User,
  GraduationCap,
  Bell,
  CheckCircle,
  Coffee,
  Sparkles,
} from 'lucide-react';

export const TimetableModule = () => {
  const {
    role,
    currentTeacher,
    teachers,
    classesList,
    timetablePeriods,
    teacherSchedules,
  } = useERP();

  // Mode: 'teacher' (Personal schedule) or 'class' (Student class schedule)
  const [scheduleView, setScheduleView] = useState('teacher');
  const [selectedClassId, setSelectedClassId] = useState(classesList[0].id);
  const [selectedDay, setSelectedDay] = useState('Monday');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  // Current teacher's schedule matrix
  const mySchedule = teacherSchedules[currentTeacher.id] || teacherSchedules['TCH-001'] || [];

  // Generate dynamic student class schedule based on selected class
  const getClassPeriodSubject = (dayIndex, periodIndex, classObj) => {
    if (periodIndex === 0) return { subject: 'Assembly & Prayer', teacher: 'All Faculty', room: 'Central Ground' };
    if (periodIndex === 5) return { subject: 'Tiffin / Recess', teacher: 'Break', room: 'Campus Courtyard' };

    const classNum = parseInt(classObj.classNum);
    if (classNum >= 11) {
      if (classObj.stream.includes('PCM')) {
        const subs = [
          ['Physics Theory', 'Chemistry', 'Mathematics', 'English Core', 'Lab Practicals', 'Sports Drill', 'Computer'],
          ['Mathematics', 'Physics Theory', 'Chemistry Lab', 'Chemistry Lab', 'English Core', 'Library', 'Doubt Session'],
          ['Physics Lab', 'Physics Lab', 'Mathematics', 'Chemistry', 'English Core', 'P.T. & Games', 'Tutorial'],
          ['Chemistry', 'Mathematics', 'Physics Theory', 'English Core', 'Hindi / Sanskrit', 'Physics Doubt', 'Lab'],
          ['Mathematics', 'Physics Theory', 'Chemistry', 'English Core', 'Practicals', 'Practicals', 'Remedial'],
          ['Weekly Test', 'Weekly Test', 'Chemistry', 'Physics', 'Mathematics', 'Sports Activity', 'Seminar'],
        ];
        return {
          subject: subs[dayIndex % 6][(periodIndex > 5 ? periodIndex - 1 : periodIndex) % 7] || 'Subject Study',
          teacher: 'PGT Senior Faculty',
          room: `Hall ${classObj.classNum}-${classObj.section}`,
        };
      }
    }

    // High school / Middle school routine
    const generalSubs = ['Mathematics', 'Hindi', 'English Literature', 'Science', 'Social Science', 'Sanskrit', 'Drawing & IT'];
    const sub = generalSubs[(periodIndex + dayIndex) % generalSubs.length];
    return {
      subject: sub,
      teacher: `Teacher for ${sub}`,
      room: `Room ${classObj.classNum}-${classObj.section}`,
    };
  };

  const activeClassObj = classesList.find(c => c.id === selectedClassId) || classesList[0];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-amber-50 text-amber-700">
              <Calendar className="w-5 h-5" />
            </span>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Academic Timetable & Bell Schedule
              </h1>
              <p className="text-xs text-slate-500">
                Madan Lal Inter College • Periods 1 to 7 • Weekly Routine
              </p>
            </div>
          </div>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-2xl">
          <button
            onClick={() => setScheduleView('teacher')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              scheduleView === 'teacher'
                ? 'bg-[#0F284E] text-[#F6BD60] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            My Teacher Schedule
          </button>
          <button
            onClick={() => setScheduleView('class')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              scheduleView === 'class'
                ? 'bg-[#0F284E] text-[#F6BD60] shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Check Student Schedule
          </button>
        </div>
      </div>

      {/* Bell Timings Ribbon */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs overflow-x-auto">
        <div className="flex items-center gap-3 min-w-[700px]">
          <div className="text-xs font-bold text-[#0F284E] uppercase tracking-wider shrink-0 flex items-center gap-1.5">
            <Bell className="w-4 h-4 text-amber-500" />
            <span>Bell Timings:</span>
          </div>
          <div className="flex items-center gap-2 flex-1">
            {timetablePeriods.map((p) => (
              <div
                key={p.period}
                className={`p-2 rounded-xl text-center shrink-0 border text-[11px] ${
                  p.isBreak
                    ? 'bg-amber-50 text-amber-900 border-amber-200 font-bold'
                    : 'bg-slate-50 text-slate-700 border-slate-200 font-medium'
                }`}
              >
                <span className="block font-bold leading-tight">{p.label}</span>
                <span className="text-[10px] text-slate-400 block">{p.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* View 1: Teacher's Personal Weekly Schedule */}
      {scheduleView === 'teacher' && (
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-[#F7EDE2]/60 p-4 rounded-2xl border border-blue-100 flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#0F284E] text-white flex items-center justify-center font-bold">
                {currentTeacher.name.split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
              <div>
                <p className="font-bold text-sm text-slate-900">
                  Weekly Teaching Load for {currentTeacher.name}
                </p>
                <p className="text-slate-500 text-[11px]">
                  {currentTeacher.designation} • Class Incharge: {currentTeacher.assignedClass}
                </p>
              </div>
            </div>
            <span className="hidden sm:inline text-xs font-semibold px-3 py-1 bg-white rounded-lg border border-slate-200 text-slate-700">
              Session 2026-27 Active
            </span>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead>
                  <tr className="bg-[#0F284E] text-white uppercase text-[10px] tracking-wider">
                    <th className="py-3 px-4 font-semibold">Day</th>
                    {timetablePeriods.filter(p => p.period > 0).map((p) => (
                      <th key={p.period} className="py-3 px-3 font-semibold text-center">
                        {p.label}
                        <span className="block text-[9px] font-normal text-blue-200">{p.time.split(' - ')[0]}</span>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {mySchedule.map((daySchedule) => (
                    <tr key={daySchedule.day} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 px-4 font-extrabold text-[#0F284E] bg-slate-50/60">
                        {daySchedule.day}
                      </td>
                      {daySchedule.periods.map((slot, idx) => {
                        const isFree = slot === 'Free';
                        const isBreak = slot === 'Break';

                        return (
                          <td key={idx} className="py-3 px-2 text-center">
                            <span
                              className={`inline-block w-full py-1.5 px-2 rounded-xl font-bold text-[11px] truncate max-w-[120px] ${
                                isBreak
                                  ? 'bg-amber-100 text-amber-900 border border-amber-200'
                                  : isFree
                                  ? 'bg-slate-100 text-slate-400 font-normal'
                                  : 'bg-blue-100 text-[#0F284E] border border-blue-200 shadow-2xs'
                              }`}
                            >
                              {slot}
                            </span>
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* View 2: Check Student Class Schedule */}
      {scheduleView === 'class' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-xs flex flex-col sm:flex-row gap-3 items-center justify-between">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <span className="text-xs font-bold text-slate-700">Select Student Class:</span>
              <select
                value={selectedClassId}
                onChange={(e) => setSelectedClassId(e.target.value)}
                className="text-xs font-bold py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none text-[#0F284E]"
              >
                {classesList.map(c => (
                  <option key={c.id} value={c.id}>
                    Class {c.classNum} - Section {c.section} ({c.stream})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
              {daysOfWeek.map((day) => (
                <button
                  key={day}
                  onClick={() => setSelectedDay(day)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition shrink-0 ${
                    selectedDay === day
                      ? 'bg-[#0F284E] text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
          </div>

          {/* Period cards for the selected class on selected day */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
            <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {selectedDay} Routine for Class {activeClassObj.classNum}-{activeClassObj.section}
                </h3>
                <p className="text-xs text-slate-500">{activeClassObj.stream} • Capacity {activeClassObj.capacity} Students</p>
              </div>
              <span className="px-3 py-1 bg-amber-100 text-amber-900 font-bold text-xs rounded-xl">
                Room #{activeClassObj.classNum}0{activeClassObj.section.charCodeAt(0) - 64}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {timetablePeriods.map((period, pIdx) => {
                const info = getClassPeriodSubject(daysOfWeek.indexOf(selectedDay), pIdx, activeClassObj);

                return (
                  <div
                    key={period.period}
                    className={`p-4 rounded-2xl border transition ${
                      period.isBreak
                        ? 'bg-amber-50/80 border-amber-200'
                        : 'bg-slate-50 hover:bg-white border-slate-200/80 hover:shadow-sm'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-extrabold text-[#0F284E]">{period.label}</span>
                      <span className="text-[10px] font-semibold text-slate-400">{period.time}</span>
                    </div>
                    <p className="font-extrabold text-sm text-slate-800">{info.subject}</p>
                    <div className="mt-2 pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{info.teacher}</span>
                      <span className="font-semibold text-slate-700">{info.room}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
