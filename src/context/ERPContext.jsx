import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  COLLEGE_INFO,
  CLASSES_LIST,
  INITIAL_TEACHERS,
  generateSeedStudents,
  INITIAL_ANNOUNCEMENTS,
  INITIAL_RECEIPTS,
  INITIAL_PAYROLL,
  TIMETABLE_PERIODS,
  TEACHER_SCHEDULES,
  FEE_STRUCTURES,
} from '../data/initialData';

const ERPContext = createContext();

const STORAGE_KEYS = {
  ROLE: 'mlic_erp_role',
  CURRENT_TEACHER: 'mlic_erp_curr_teacher',
  STUDENTS: 'mlic_erp_students_v1',
  TEACHERS: 'mlic_erp_teachers_v1',
  ANNOUNCEMENTS: 'mlic_erp_announcements_v1',
  RECEIPTS: 'mlic_erp_receipts_v1',
  PAYROLL: 'mlic_erp_payroll_v1',
  ATTENDANCE: 'mlic_erp_attendance_v1',
};

export const ERPProvider = ({ children }) => {
  // Current user role: 'principal' or 'teacher'
  const [role, setRole] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.ROLE) || 'principal';
  });

  // Selected teacher when role is 'teacher'
  const [currentTeacherId, setCurrentTeacherId] = useState(() => {
    return localStorage.getItem(STORAGE_KEYS.CURRENT_TEACHER) || INITIAL_TEACHERS[0].id;
  });

  // Active navigation tab
  const [activeTab, setActiveTab] = useState(() => {
    return role === 'principal' ? 'dashboard' : 'attendance';
  });

  // Global search query
  const [globalSearch, setGlobalSearch] = useState('');

  // Toast notifications
  const [toast, setToast] = useState(null);

  // Modal states for printing / viewing
  const [activePrintReceipt, setActivePrintReceipt] = useState(null);
  const [activePrintIdCard, setActivePrintIdCard] = useState(null);
  const [activePrintPayslip, setActivePrintPayslip] = useState(null);

  // Initialize Data from LocalStorage or Defaults
  const [students, setStudents] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return generateSeedStudents();
  });

  const [teachers, setTeachers] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TEACHERS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_TEACHERS;
  });

  const [announcements, setAnnouncements] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ANNOUNCEMENTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_ANNOUNCEMENTS;
  });

  const [receipts, setReceipts] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECEIPTS);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_RECEIPTS;
  });

  const [payroll, setPayroll] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PAYROLL);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return INITIAL_PAYROLL;
  });

  // Attendance store: { "2026-10-18_10-A": { "STU-MLIC-...": "Present" | "Absent" | "Late" } }
  const [attendanceRecords, setAttendanceRecords] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTENDANCE);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return {};
  });

  // Sync to LocalStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CURRENT_TEACHER, currentTeacherId);
  }, [currentTeacherId]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.TEACHERS, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ANNOUNCEMENTS, JSON.stringify(announcements));
  }, [announcements]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.RECEIPTS, JSON.stringify(receipts));
  }, [receipts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PAYROLL, JSON.stringify(payroll));
  }, [payroll]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTENDANCE, JSON.stringify(attendanceRecords));
  }, [attendanceRecords]);

  // Toast trigger
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  // Switch Role
  const switchRole = (newRole, teacherId = null) => {
    setRole(newRole);
    if (newRole === 'teacher') {
      if (teacherId) setCurrentTeacherId(teacherId);
      setActiveTab('attendance'); // Default safe view for teacher
    } else {
      setActiveTab('dashboard');
    }
    showToast(`Switched view to ${newRole === 'principal' ? 'Principal (Super Admin)' : 'Teacher Panel'}`, 'info');
  };

  // Student CRUD (Principal Only)
  const addStudent = (studentData) => {
    const admissionNo = studentData.admissionNo || `MLIC-2026-${String(students.length + 101).padStart(4, '0')}`;
    const newStudent = {
      ...studentData,
      id: `STU-${admissionNo}`,
      admissionNo,
      rollNo: parseInt(studentData.rollNo) || (students.filter(s => s.classId === studentData.classId).length + 1),
      feeStatus: studentData.feeDue > 0 ? (studentData.feeDue < 2000 ? 'Partial' : 'Overdue') : 'Paid',
      totalFeePaid: studentData.totalFeePaid || 0,
      attendanceRate: 92,
      todayStatus: 'Present',
    };
    setStudents(prev => [newStudent, ...prev]);
    showToast(`Student ${newStudent.name} admitted successfully!`);
    return newStudent;
  };

  const updateStudent = (studentId, updatedData) => {
    setStudents(prev =>
      prev.map(s => {
        if (s.id === studentId) {
          const merged = { ...s, ...updatedData };
          merged.feeStatus = merged.feeDue > 0 ? (merged.feeDue < 2000 ? 'Partial' : 'Overdue') : 'Paid';
          return merged;
        }
        return s;
      })
    );
    showToast('Student record updated successfully!');
  };

  const deleteStudent = (studentId) => {
    const target = students.find(s => s.id === studentId);
    setStudents(prev => prev.filter(s => s.id !== studentId));
    showToast(`Student ${target ? target.name : ''} removed from records.`, 'error');
  };

  // Attendance marking (Teachers & Principal)
  const markAttendance = (classId, date, statusMap) => {
    const key = `${date}_${classId}`;
    setAttendanceRecords(prev => ({
      ...prev,
      [key]: {
        ...(prev[key] || {}),
        ...statusMap,
        submittedAt: new Date().toISOString(),
        markedBy: role === 'principal' ? 'Principal' : (teachers.find(t => t.id === currentTeacherId)?.name || 'Teacher'),
      },
    }));

    // Also update student todayStatus if date is today
    const todayStr = new Date().toISOString().split('T')[0];
    if (date === todayStr) {
      setStudents(prev =>
        prev.map(s => {
          if (s.classId === classId && statusMap[s.id]) {
            return { ...s, todayStatus: statusMap[s.id] };
          }
          return s;
        })
      );
    }
    showToast(`Attendance for Class ${classId} recorded successfully!`);
  };

  const getClassAttendance = (classId, date) => {
    const key = `${date}_${classId}`;
    return attendanceRecords[key] || null;
  };

  // Fees Management (Principal Only)
  const collectFee = (data) => {
    const receiptNo = `MLIC/2026/${String(receipts.length + 943).padStart(4, '0')}`;
    const newReceipt = {
      receiptNo,
      date: data.date || new Date().toISOString().split('T')[0],
      studentId: data.studentId,
      studentName: data.studentName,
      fatherName: data.fatherName,
      classId: data.classId,
      classNum: data.classNum,
      section: data.section,
      amountPaid: parseFloat(data.amountPaid),
      term: data.term || 'Quarter 2 (Oct-Dec 2026)',
      paymentMode: data.paymentMode || 'Cash',
      transactionRef: data.transactionRef || `PAY-${Date.now().toString().slice(-6)}`,
      receivedBy: data.receivedBy || 'Office of Principal / Accounts Desk',
      status: 'Verified',
      remarks: data.remarks || 'Regular Term Tuition & Exam Fee',
    };

    setReceipts(prev => [newReceipt, ...prev]);

    // Update student fee due and totalFeePaid
    setStudents(prev =>
      prev.map(s => {
        if (s.id === data.studentId) {
          const newDue = Math.max(0, (s.feeDue || 0) - parseFloat(data.amountPaid));
          const newPaid = (s.totalFeePaid || 0) + parseFloat(data.amountPaid);
          return {
            ...s,
            feeDue: newDue,
            totalFeePaid: newPaid,
            feeStatus: newDue === 0 ? 'Paid' : (newDue < 2000 ? 'Partial' : 'Overdue'),
          };
        }
        return s;
      })
    );

    showToast(`Fee receipt #${receiptNo} generated for ${data.studentName}!`);
    setActivePrintReceipt(newReceipt);
    return newReceipt;
  };

  // Payroll Management (Principal Only)
  const updatePayrollStatus = (payId, newStatus, paymentDetails = {}) => {
    setPayroll(prev =>
      prev.map(p => {
        if (p.id === payId) {
          return {
            ...p,
            paymentStatus: newStatus,
            paidDate: newStatus === 'Paid' ? (paymentDetails.date || new Date().toISOString().split('T')[0]) : null,
            paymentMode: paymentDetails.mode || p.paymentMode,
            referenceNo: paymentDetails.ref || `PFMS-UP-${Date.now().toString().slice(-7)}`,
          };
        }
        return p;
      })
    );
    showToast(`Salary status updated to ${newStatus}`);
  };

  // Announcements (Principal Posts, All/Teachers view)
  const addAnnouncement = (noticeData) => {
    const newNotice = {
      id: `NOT-2026-${String(announcements.length + 90).padStart(3, '0')}`,
      date: new Date().toISOString().split('T')[0],
      issuedBy: role === 'principal' ? 'Dr. R.P. Gautam (Principal)' : 'Administrative Office',
      ...noticeData,
    };
    setAnnouncements(prev => [newNotice, ...prev]);
    showToast('New announcement broadcasted successfully!');
    return newNotice;
  };

  const deleteAnnouncement = (noticeId) => {
    setAnnouncements(prev => prev.filter(n => n.id !== noticeId));
    showToast('Announcement removed.');
  };

  // Teachers / Staff CRUD (Principal Only)
  const addTeacher = (teacherData) => {
    const newTeacher = {
      ...teacherData,
      id: `TCH-${String(teachers.length + 1).padStart(3, '0')}`,
      role: 'teacher',
      status: 'Active',
      joiningDate: teacherData.joiningDate || new Date().toISOString().split('T')[0],
      salary: parseFloat(teacherData.salary) || 50000,
    };
    setTeachers(prev => [...prev, newTeacher]);
    showToast(`Faculty member ${newTeacher.name} added!`);
    return newTeacher;
  };

  const updateTeacher = (teacherId, data) => {
    setTeachers(prev =>
      prev.map(t => (t.id === teacherId ? { ...t, ...data } : t))
    );
    showToast('Faculty record updated.');
  };

  // Reset to default
  const resetToDefaultData = () => {
    localStorage.clear();
    setStudents(generateSeedStudents());
    setTeachers(INITIAL_TEACHERS);
    setAnnouncements(INITIAL_ANNOUNCEMENTS);
    setReceipts(INITIAL_RECEIPTS);
    setPayroll(INITIAL_PAYROLL);
    setAttendanceRecords({});
    setRole('principal');
    setActiveTab('dashboard');
    showToast('All ERP records restored to official demo defaults!', 'info');
  };

  // Backup & Import
  const exportDataBackup = () => {
    const fullBackup = {
      college: COLLEGE_INFO,
      exportedAt: new Date().toISOString(),
      students,
      teachers,
      announcements,
      receipts,
      payroll,
      attendanceRecords,
    };
    const blob = new Blob([JSON.stringify(fullBackup, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `MLIC_Bisauli_ERP_Backup_${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    showToast('ERP database backup downloaded successfully!');
  };

  const importDataBackup = (jsonData) => {
    try {
      const data = typeof jsonData === 'string' ? JSON.parse(jsonData) : jsonData;
      if (data.students) setStudents(data.students);
      if (data.teachers) setTeachers(data.teachers);
      if (data.announcements) setAnnouncements(data.announcements);
      if (data.receipts) setReceipts(data.receipts);
      if (data.payroll) setPayroll(data.payroll);
      if (data.attendanceRecords) setAttendanceRecords(data.attendanceRecords);
      showToast('Database imported and restored successfully!');
    } catch (e) {
      showToast('Invalid backup file. Could not import.', 'error');
    }
  };

  // Active teacher object
  const currentTeacher = teachers.find(t => t.id === currentTeacherId) || teachers[0];

  // Helper metrics for college
  const totalStudentsCount = students.length;
  const totalBoys = students.filter(s => s.gender === 'Male').length;
  const totalGirls = students.filter(s => s.gender === 'Female').length;
  const presentTodayCount = students.filter(s => s.todayStatus === 'Present').length;
  const absentTodayCount = students.filter(s => s.todayStatus === 'Absent').length;
  const todayAttendanceRate = totalStudentsCount > 0 ? Math.round((presentTodayCount / totalStudentsCount) * 100) : 0;

  const totalFeeCollected = receipts.reduce((acc, r) => acc + (parseFloat(r.amountPaid) || 0), 0);
  const totalFeePending = students.reduce((acc, s) => acc + (parseFloat(s.feeDue) || 0), 0);

  const totalMonthlyPayroll = payroll.reduce((acc, p) => acc + (parseFloat(p.grossSalary) || 0), 0);
  const totalPaidPayroll = payroll.filter(p => p.paymentStatus === 'Paid').reduce((acc, p) => acc + (parseFloat(p.netPayable) || 0), 0);

  return (
    <ERPContext.Provider
      value={{
        role,
        switchRole,
        currentTeacher,
        currentTeacherId,
        setCurrentTeacherId,
        activeTab,
        setActiveTab,
        globalSearch,
        setGlobalSearch,
        toast,
        showToast,
        activePrintReceipt,
        setActivePrintReceipt,
        activePrintIdCard,
        setActivePrintIdCard,
        activePrintPayslip,
        setActivePrintPayslip,

        // Data
        students,
        teachers,
        announcements,
        receipts,
        payroll,
        attendanceRecords,
        classesList: CLASSES_LIST,
        feeStructures: FEE_STRUCTURES,
        timetablePeriods: TIMETABLE_PERIODS,
        teacherSchedules: TEACHER_SCHEDULES,
        collegeInfo: COLLEGE_INFO,

        // Operations
        addStudent,
        updateStudent,
        deleteStudent,
        markAttendance,
        getClassAttendance,
        collectFee,
        updatePayrollStatus,
        addAnnouncement,
        deleteAnnouncement,
        addTeacher,
        updateTeacher,
        resetToDefaultData,
        exportDataBackup,
        importDataBackup,

        // Metrics
        totalStudentsCount,
        totalBoys,
        totalGirls,
        presentTodayCount,
        absentTodayCount,
        todayAttendanceRate,
        totalFeeCollected,
        totalFeePending,
        totalMonthlyPayroll,
        totalPaidPayroll,
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) throw new Error('useERP must be used within an ERPProvider');
  return context;
};
