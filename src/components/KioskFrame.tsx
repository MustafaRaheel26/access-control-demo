import React from 'react';

interface KioskFrameProps {
  mode: 'portrait' | 'fullscreen';
  children: React.ReactNode;
}

export const KioskFrame: React.FC<KioskFrameProps> = ({ mode, children }) => {
  if (mode === 'fullscreen') {
    return (
      <main className="w-full flex-1 flex flex-col bg-slate-950 text-slate-100 relative overflow-x-hidden overflow-y-auto max-w-full">
        <div className="w-full flex-1 flex flex-col max-w-4xl mx-auto px-3 sm:px-6 py-4 sm:py-6">
          {children}
        </div>
      </main>
    );
  }

  return (
    <main className="w-full flex-1 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-100 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 select-none overflow-x-hidden max-w-full">
      {/* Outer Kiosk Stand Body / Metallic Kiosk Bezel */}
      <div className="w-full max-w-full sm:max-w-[520px] md:max-w-[560px] bg-slate-900 border-0 sm:border-[10px] md:border-[12px] border-slate-800 sm:rounded-[36px] md:rounded-[40px] shadow-[0_25px_70px_rgba(0,0,0,0.8),0_0_40px_rgba(30,41,59,0.5)] flex flex-col overflow-hidden relative min-h-[calc(100dvh-52px)] sm:min-h-[700px] sm:max-h-[calc(100dvh-80px)]">
        {/* Top Hardware Pinhole Sensor & Status LED */}
        <div className="w-full h-6 sm:h-7 bg-slate-900 flex items-center justify-between px-4 sm:px-6 shrink-0 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-slate-700" />
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
          </div>
          {/* Glass Camera / Proximity Sensor */}
          <div className="w-10 sm:w-12 h-2.5 sm:h-3 rounded-full bg-slate-950 border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-950 border border-cyan-800" />
          </div>
          <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 font-bold uppercase">SEC-TS-4K</span>
        </div>

        {/* Screen Display Glass Area */}
        <div className="flex-1 flex flex-col bg-slate-950 relative overflow-y-auto overflow-x-hidden">
          {children}
        </div>

        {/* Bottom Hardware Bezel Accent */}
        <div className="w-full h-7 sm:h-8 bg-slate-900 flex items-center justify-between px-4 sm:px-6 shrink-0 border-t border-slate-800/80">
          <span className="text-[8px] sm:text-[9px] font-mono text-slate-400 tracking-widest">
            TOUCH TERMINAL • V2.4
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="text-[8px] sm:text-[9px] font-mono text-emerald-400">READY</span>
          </div>
        </div>
      </div>

      {/* Floor Stand Pedestal Base Visual in Portrait Mode */}
      <div className="w-40 sm:w-48 h-4 sm:h-5 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-b-xl border-t border-slate-600 shadow-xl -mt-0.5 hidden sm:block opacity-75 shrink-0" />
    </main>
  );
};
