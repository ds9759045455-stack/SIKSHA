import React, { useRef } from 'react';
import { useERP } from '../context/ERPContext';
import { AccessDenied } from './AccessDenied';
import {
  Settings,
  Download,
  Upload,
  RefreshCw,
  Building,
  ShieldCheck,
  CheckCircle,
  Database,
  Palette,
} from 'lucide-react';

export const CollegeSettings = () => {
  const {
    role,
    collegeInfo,
    students,
    teachers,
    receipts,
    payroll,
    exportDataBackup,
    importDataBackup,
    resetToDefaultData,
  } = useERP();

  if (role !== 'principal') {
    return <AccessDenied moduleName="College ERP Settings & Database Management" />;
  }

  const fileInputRef = useRef(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      importDataBackup(event.target.result);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex items-center gap-3">
        <span className="p-2 rounded-xl bg-slate-100 text-slate-700">
          <Settings className="w-5 h-5" />
        </span>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Institutional Settings & Cloud Backup
          </h1>
          <p className="text-xs text-slate-500">
            System configuration, data security, and local offline backups for Madan Lal Inter College
          </p>
        </div>
      </div>

      {/* College Identity Overview Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-4">
          <img
            src={collegeInfo.logo}
            alt={collegeInfo.name}
            className="w-16 h-16 rounded-full border-2 border-amber-400 p-0.5 bg-white shadow-md object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-[#0F284E]">{collegeInfo.name}</h2>
            <p className="text-xs font-bold text-amber-700">{collegeInfo.hindiName} • {collegeInfo.location}</p>
            <p className="text-xs text-slate-500 mt-0.5">{collegeInfo.fullAddress}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-semibold block">Board Affiliation</span>
            <span className="font-bold text-slate-800 text-sm mt-0.5 block">{collegeInfo.affiliation}</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-semibold block">Academic Session</span>
            <span className="font-bold text-emerald-700 text-sm mt-0.5 block">2026 - 2027</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-semibold block">Student Target Strength</span>
            <span className="font-bold text-amber-700 text-sm mt-0.5 block">2,500 Students</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
            <span className="text-slate-400 font-semibold block">Classes Range</span>
            <span className="font-bold text-blue-900 text-sm mt-0.5 block">Class 6 to 12</span>
          </div>
        </div>
      </div>

      {/* Palette Preview */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <Palette className="w-5 h-5 text-amber-500" />
          <h2 className="text-base font-bold text-slate-900">Behance Color Palette Harmonization</h2>
        </div>
        <p className="text-xs text-slate-500">
          Crafted by harmonizing the Royal Crest Navy Blue with the warm Dopely palette:
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3 pt-2">
          <div className="p-3 rounded-xl text-center bg-[#0F284E] text-white">
            <span className="block font-bold text-xs">#0F284E</span>
            <span className="text-[10px] text-blue-200">Royal Navy</span>
          </div>
          <div className="p-3 rounded-xl text-center bg-[#F6BD60] text-slate-900">
            <span className="block font-bold text-xs">#F6BD60</span>
            <span className="text-[10px]">Warm Gold</span>
          </div>
          <div className="p-3 rounded-xl text-center bg-[#F7EDE2] text-slate-900 border border-slate-200">
            <span className="block font-bold text-xs">#F7EDE2</span>
            <span className="text-[10px] text-slate-500">Cream Canvas</span>
          </div>
          <div className="p-3 rounded-xl text-center bg-[#F5CAC3] text-slate-900">
            <span className="block font-bold text-xs">#F5CAC3</span>
            <span className="text-[10px]">Rose Blush</span>
          </div>
          <div className="p-3 rounded-xl text-center bg-[#84A59D] text-white">
            <span className="block font-bold text-xs">#84A59D</span>
            <span className="text-[10px] text-teal-100">Sage Slate</span>
          </div>
          <div className="p-3 rounded-xl text-center bg-[#F28482] text-white">
            <span className="block font-bold text-xs">#F28482</span>
            <span className="text-[10px] text-rose-100">Coral Alert</span>
          </div>
        </div>
      </div>

      {/* Database Backup & Restore */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Database className="w-5 h-5 text-emerald-600" />
          <h2 className="text-base font-bold text-slate-900">ERP Database Operations</h2>
        </div>
        <p className="text-xs text-slate-500">
          Export full college records to an encrypted JSON file or restore from a previous backup.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          {/* Export */}
          <button
            onClick={exportDataBackup}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition flex items-start gap-3"
          >
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">Export Backup</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Download full JSON snapshot</p>
            </div>
          </button>

          {/* Import */}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-left transition flex items-start gap-3"
          >
            <div className="p-2.5 rounded-xl bg-blue-100 text-blue-800">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-slate-900">Import Data</p>
              <p className="text-[11px] text-slate-500 mt-0.5">Upload existing JSON backup</p>
            </div>
          </button>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileUpload}
            accept=".json"
            className="hidden"
          />

          {/* Reset */}
          <button
            onClick={() => {
              if (window.confirm('Reset all records to official demo defaults? Any newly added data will be replaced.')) {
                resetToDefaultData();
              }
            }}
            className="p-4 rounded-2xl bg-rose-50 hover:bg-rose-100 border border-rose-200 text-left transition flex items-start gap-3"
          >
            <div className="p-2.5 rounded-xl bg-rose-200 text-rose-800">
              <RefreshCw className="w-5 h-5" />
            </div>
            <div>
              <p className="font-bold text-xs text-rose-900">Reset Demo Defaults</p>
              <p className="text-[11px] text-rose-700 mt-0.5">Restore original student & fee records</p>
            </div>
          </button>
        </div>
      </div>

    </div>
  );
};
