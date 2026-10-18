import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';

export const PhoneFrame = ({ children, title = "Mobile Preview", className = "" }) => {
  return (
    <div className={`relative flex flex-col w-[360px] h-[740px] max-w-full rounded-[48px] p-3 bg-gradient-to-b from-[#2e243b] via-[#1a1424] to-[#120d1a] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.12)] border-[4px] border-[#382b4a]/70 select-none overflow-hidden transition-all duration-300 ${className}`}>
      
      {/* Outer subtle bezel metallic glow */}
      <div className="absolute inset-0 rounded-[44px] pointer-events-none border border-white/10" />

      {/* Screen container */}
      <div className="relative flex-1 w-full h-full rounded-[40px] bg-[#150f1f] overflow-hidden flex flex-col text-slate-100 shadow-inner">
        
        {/* Ambient background glows inside phone */}
        <div className="absolute -top-16 -right-16 w-56 h-56 rounded-full bg-pink-500/15 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -left-20 w-52 h-52 rounded-full bg-purple-600/15 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 right-0 w-60 h-60 rounded-full bg-fuchsia-600/10 blur-3xl pointer-events-none" />

        {/* Dynamic Island & iOS Status Bar */}
        <div className="relative z-30 pt-3 px-6 pb-1 flex items-center justify-between text-xs font-semibold text-slate-200">
          <span>9:41</span>
          
          {/* Dynamic Island pill */}
          <div className="w-24 h-6 bg-black rounded-full flex items-center justify-end pr-2.5 space-x-1.5 shadow-md border border-white/5">
            <div className="w-2.5 h-2.5 rounded-full bg-[#1a1a1a] border border-white/10" />
            <div className="w-2 h-2 rounded-full bg-[#0d2238] animate-pulse" />
          </div>

          <div className="flex items-center space-x-1.5 text-slate-300">
            <Signal size={12} strokeWidth={2.5} />
            <Wifi size={12} strokeWidth={2.5} />
            <Battery size={14} strokeWidth={2.5} className="fill-current text-slate-200" />
          </div>
        </div>

        {/* Phone Content viewport */}
        <div className="relative z-10 flex-1 overflow-y-auto overflow-x-hidden flex flex-col">
          {children}
        </div>

        {/* iOS Home Indicator bar */}
        <div className="relative z-30 w-full py-2 flex justify-center pointer-events-none bg-gradient-to-t from-[#150f1f]/80 to-transparent">
          <div className="w-32 h-1 bg-white/30 rounded-full" />
        </div>
      </div>
    </div>
  );
};
