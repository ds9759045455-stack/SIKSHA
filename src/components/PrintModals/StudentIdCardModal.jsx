import React from 'react';
import { useERP } from '../../context/ERPContext';
import { Printer, X, QrCode, Phone, MapPin, Calendar, Heart } from 'lucide-react';

export const StudentIdCardModal = () => {
  const { activePrintIdCard, setActivePrintIdCard, collegeInfo } = useERP();

  if (!activePrintIdCard) return null;

  const s = activePrintIdCard;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-8 print:m-0 print:border-none print:shadow-none">
        
        {/* Top bar */}
        <div className="no-print flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-slate-200">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
            Student Identity Card Preview
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-4 py-2 bg-[#0F284E] hover:bg-[#193a6b] text-white text-xs font-bold rounded-xl shadow transition"
            >
              <Printer className="w-4 h-4 text-[#F6BD60]" />
              Print ID Card
            </button>
            <button
              onClick={() => setActivePrintIdCard(null)}
              className="p-2 text-slate-400 hover:text-slate-600 rounded-xl hover:bg-slate-200 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable ID Card Container */}
        <div className="p-6 flex flex-col items-center justify-center bg-slate-100">
          
          {/* Card Wrapper (Standard CR80 Identity Card Proportions) */}
          <div className="w-[340px] bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-slate-200 relative">
            
            {/* College Top Header with Navy & Gold Accent */}
            <div className="bg-[#0F284E] p-3 text-center text-white relative">
              <div className="absolute left-2 top-2">
                <img
                  src={collegeInfo.logo}
                  alt="Logo"
                  className="w-10 h-10 rounded-full border border-amber-400 bg-white"
                />
              </div>
              <div className="pl-8">
                <h2 className="text-xs font-black tracking-tight uppercase text-amber-300">
                  {collegeInfo.name}
                </h2>
                <p className="text-[10px] text-blue-100 font-medium">Bisauli, Badaun (U.P.)</p>
                <p className="text-[9px] text-amber-200/90 font-mono tracking-tighter">Code: BDN-24410</p>
              </div>
              <div className="h-1 bg-gradient-to-r from-amber-400 via-amber-200 to-amber-400 absolute bottom-0 left-0 right-0"></div>
            </div>

            {/* Session Tag */}
            <div className="bg-amber-50 px-3 py-1 flex items-center justify-between text-[10px] font-bold text-amber-900 border-b border-amber-100">
              <span>STUDENT IDENTITY CARD</span>
              <span>SESSION 2026-27</span>
            </div>

            {/* Card Body */}
            <div className="p-4">
              <div className="flex gap-3">
                {/* Photo box */}
                <div className="w-22 h-26 rounded-xl bg-slate-100 border-2 border-dashed border-slate-300 flex flex-col items-center justify-center shrink-0 overflow-hidden shadow-inner">
                  <div className="w-16 h-16 rounded-full bg-[#84A59D]/30 flex items-center justify-center font-bold text-lg text-[#0F284E]">
                    {s.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <span className="text-[8px] font-bold text-slate-400 mt-1 uppercase">Photo</span>
                </div>

                {/* Core student details */}
                <div className="flex-1 text-xs space-y-1">
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 leading-tight">{s.name}</h3>
                    <p className="text-[11px] font-bold text-[#0F284E]">
                      Class {s.classNum} - {s.section} {s.stream !== 'General' ? `(${s.stream})` : ''}
                    </p>
                  </div>
                  <p className="text-[10px] text-slate-600">
                    <span className="text-slate-400 font-semibold">Adm No:</span> {s.admissionNo}
                  </p>
                  <p className="text-[10px] text-slate-600">
                    <span className="text-slate-400 font-semibold">Roll No:</span> {s.rollNo}
                  </p>
                  <p className="text-[10px] text-slate-600">
                    <span className="text-slate-400 font-semibold">Father:</span> {s.fatherName}
                  </p>
                  <div className="flex items-center gap-2 pt-1">
                    <span className="px-1.5 py-0.5 bg-rose-50 text-rose-700 border border-rose-200 rounded text-[9px] font-bold">
                      Blood: {s.bloodGroup || 'O+'}
                    </span>
                    <span className="px-1.5 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded text-[9px] font-bold">
                      DOB: {s.dob}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact & Address */}
              <div className="mt-3 pt-2 border-t border-slate-100 text-[10px] space-y-0.5 text-slate-600">
                <p className="flex items-center gap-1.5 truncate">
                  <Phone className="w-3 h-3 text-emerald-600 shrink-0" />
                  <span>Emergency: +91 {s.phone}</span>
                </p>
                <p className="flex items-center gap-1.5 truncate">
                  <MapPin className="w-3 h-3 text-rose-500 shrink-0" />
                  <span>Address: {s.address}</span>
                </p>
              </div>

              {/* Bottom validation & QR code */}
              <div className="mt-4 pt-2 border-t-2 border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1 text-[9px] text-slate-400">
                  <div className="w-8 h-8 bg-slate-900 rounded p-0.5 text-white flex items-center justify-center">
                    <QrCode className="w-7 h-7" />
                  </div>
                  <span>Scan for verified credentials</span>
                </div>
                <div className="text-right">
                  <div className="text-[9px] font-serif italic text-blue-900 leading-none">R.P. Gautam</div>
                  <div className="w-20 border-b border-slate-400 my-0.5"></div>
                  <span className="text-[8px] font-bold uppercase text-slate-700 block">Principal</span>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="bg-slate-50 border-t border-slate-200 py-1 text-center text-[8px] text-slate-400 font-medium">
              Station Road, Bisauli, Badaun (U.P.) • Ph: 05834-245100
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
