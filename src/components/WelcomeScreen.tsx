import React from 'react';
import { motion } from 'motion/react';
import { ShieldAlert, ArrowRight, ShieldCheck, CheckCircle2, ChevronRight, HardHat, FileCheck } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface WelcomeScreenProps {
  onStart: () => void;
  restrictedAreaName: string;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onStart,
  restrictedAreaName,
}) => {
  const handleStartClick = () => {
    soundManager.playTap();
    onStart();
  };

  return (
    <div id="screen-welcome" className="flex-1 flex flex-col justify-between items-center text-center p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full select-none overflow-x-hidden">
      {/* Top Banner / Zone Security Notice */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="w-full flex flex-col items-center pt-1 shrink-0"
      >
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700/80 text-slate-300 text-[10px] sm:text-xs font-mono mb-2 sm:mb-4 tracking-wide shadow-sm max-w-full truncate">
          <ShieldAlert className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span className="truncate">ACCESS CONTROL POINT • MANDATORY SAFETY AUDIT</span>
        </div>
      </motion.div>

      {/* Main Hero & Security Visual Element */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.05 }}
        className="w-full flex flex-col items-center my-auto py-3 sm:py-6"
      >
        {/* Professional Minimalist Security Icon / Emblem */}
        <div className="relative mb-5 sm:mb-7">
          <div className="w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-2xl sm:rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700 shadow-2xl flex items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-cyan-500/5 group-hover:bg-cyan-500/10 transition-colors" />
            <div className="absolute -inset-0.5 rounded-3xl bg-gradient-to-b from-cyan-500/20 to-transparent opacity-50 blur-sm pointer-events-none" />
            <ShieldCheck className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-cyan-400 relative z-10" />
          </div>
          {/* Active Readiness Indicator */}
          <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-950 border-2 border-slate-900 px-2 py-0.5 rounded-full flex items-center gap-1.5 shadow-lg">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[9px] sm:text-[10px] font-mono text-emerald-300 font-bold uppercase tracking-wider">GATE READY</span>
          </div>
        </div>

        {/* Headings strictly complying with the spec */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-100 mb-2 sm:mb-3 font-sans">
          Welcome
        </h1>

        <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-lg leading-relaxed font-normal mb-5 sm:mb-7 px-2">
          Please complete the following safety check before entering.
        </p>

        {/* Informative Safety Specs Cards */}
        <div className="grid grid-cols-2 gap-2.5 sm:gap-3 w-full max-w-md mb-2 text-left">
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
              <HardHat className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-200 truncate">7 Safety Steps</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Personal PPE rules</p>
            </div>
          </div>
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 flex items-center gap-2.5 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-slate-800 flex items-center justify-center text-slate-300 shrink-0">
              <FileCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] sm:text-xs font-semibold text-slate-200 truncate">Instant Release</p>
              <p className="text-[10px] sm:text-[11px] text-slate-400 truncate">Automated relay</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Primary Action Button */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, delay: 0.15 }}
        className="w-full pb-2 sm:pb-4 max-w-md shrink-0"
      >
        <button
          id="btn-start-check"
          type="button"
          onClick={handleStartClick}
          className="w-full h-16 sm:h-20 md:h-24 bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 hover:from-cyan-500 hover:via-blue-500 hover:to-indigo-500 active:scale-[0.98] text-white font-extrabold text-lg sm:text-xl md:text-2xl rounded-2xl shadow-[0_10px_30px_rgba(37,99,235,0.35)] flex items-center justify-center gap-3 sm:gap-4 transition-all duration-200 cursor-pointer border-t border-cyan-300/30"
        >
          <span>START CHECK</span>
          <ArrowRight className="w-5 h-5 sm:w-7 sm:h-7 stroke-[2.5]" />
        </button>

        <p className="mt-2.5 sm:mt-3 text-[10px] sm:text-xs font-mono text-slate-400 tracking-wide">
          TOUCH SCREEN TO INITIATE • EST. TIME ~ 20 SEC
        </p>
      </motion.div>
    </div>
  );
};
