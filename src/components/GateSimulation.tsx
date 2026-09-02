import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Lock, Unlock, Radio, ArrowRight } from 'lucide-react';

interface GateSimulationProps {
  isOpen: boolean;
}

export const GateSimulation: React.FC<GateSimulationProps> = ({ isOpen }) => {
  return (
    <div id="gate-simulation-container" className="w-full max-w-lg mx-auto bg-slate-900 border border-slate-700/80 rounded-2xl p-3 sm:p-5 shadow-2xl overflow-hidden text-slate-100">
      {/* Simulation Header */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-2 sm:pb-3 mb-3 sm:mb-4">
        <div className="flex items-center gap-2 min-w-0">
          <div className={`w-2.5 h-2.5 rounded-full shrink-0 animate-pulse ${isOpen ? 'bg-emerald-400 shadow-[0_0_10px_#34d399]' : 'bg-rose-500 shadow-[0_0_10px_#f43f5e]'}`} />
          <span className="text-[10px] sm:text-xs font-mono tracking-wider uppercase font-semibold text-slate-300 truncate">
            {isOpen ? 'GATE STATUS: UNLOCKED / OPEN' : 'GATE STATUS: SECURED / LOCKED'}
          </span>
        </div>
        <div className="flex items-center gap-1 text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded-md shrink-0">
          <Radio className={`w-3 h-3 ${isOpen ? 'text-emerald-400 animate-spin' : 'text-slate-500'}`} />
          <span>RELAY CH-01</span>
        </div>
      </div>

      {/* Visual Physical Gate Simulation Graphic */}
      <div className="relative h-36 sm:h-44 bg-slate-950/90 rounded-xl border border-slate-800 flex items-center justify-between px-3 sm:px-6 overflow-hidden">
        {/* Floor Guidance Stripes */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[repeating-linear-gradient(45deg,#000,#000_10px,#fbbf24_10px,#fbbf24_20px)]" />

        {/* Left Post */}
        <div className="relative z-10 flex flex-col items-center shrink-0">
          <div className={`w-9 sm:w-12 h-24 sm:h-32 rounded-lg border flex flex-col items-center justify-between p-1.5 sm:p-2 transition-colors duration-500 ${
            isOpen ? 'bg-slate-800 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-slate-700'
          }`}>
            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-colors ${
              isOpen ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            }`}>
              {isOpen ? <Unlock className="w-2 h-2 text-white" /> : <Lock className="w-2 h-2 text-white" />}
            </div>
            <div className="w-1 sm:w-1.5 h-8 sm:h-12 bg-slate-700 rounded-full overflow-hidden">
              <div className={`w-full h-full transition-all duration-700 ${isOpen ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-slate-400">POST-L</span>
          </div>
        </div>

        {/* Center Barrier Arms / Doors */}
        <div className="relative flex-1 h-full flex items-center justify-center px-1 sm:px-2 overflow-hidden">
          {/* Passage Area Indicator */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isOpen ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1.5 text-emerald-400 font-mono text-[10px] sm:text-xs tracking-wider bg-emerald-950/80 border border-emerald-500/30 px-2 sm:px-3 py-1 rounded-full"
              >
                <span>PASSAGE CLEAR</span>
                <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
              </motion.div>
            ) : (
              <div className="flex items-center gap-1 text-rose-400 font-mono text-[10px] sm:text-xs tracking-wider bg-rose-950/60 border border-rose-500/20 px-2 sm:px-3 py-0.5 rounded-full">
                <Lock className="w-2.5 h-2.5" />
                <span>ENTRY RESTRICTED</span>
              </div>
            )}
          </div>

          {/* Left Barrier Wing */}
          <motion.div
            className="w-1/2 h-10 sm:h-14 bg-gradient-to-r from-slate-700 to-slate-800 border-y-2 border-l-2 rounded-l-md flex items-center justify-start pl-1 sm:pl-2 shadow-lg"
            animate={{
              rotateY: isOpen ? -75 : 0,
              x: isOpen ? -20 : 0,
              opacity: isOpen ? 0.35 : 1,
              borderColor: isOpen ? '#10b981' : '#f43f5e',
            }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-amber-400/80 rounded-sm" />
          </motion.div>

          {/* Right Barrier Wing */}
          <motion.div
            className="w-1/2 h-10 sm:h-14 bg-gradient-to-l from-slate-700 to-slate-800 border-y-2 border-r-2 rounded-r-md flex items-center justify-end pr-1 sm:pr-2 shadow-lg"
            animate={{
              rotateY: isOpen ? 75 : 0,
              x: isOpen ? 20 : 0,
              opacity: isOpen ? 0.35 : 1,
              borderColor: isOpen ? '#10b981' : '#f43f5e',
            }}
            transition={{ type: 'spring', stiffness: 90, damping: 14 }}
          >
            <div className="w-1.5 sm:w-2 h-6 sm:h-8 bg-amber-400/80 rounded-sm" />
          </motion.div>
        </div>

        {/* Right Post */}
        <div className="relative z-10 flex flex-col items-center shrink-0">
          <div className={`w-9 sm:w-12 h-24 sm:h-32 rounded-lg border flex flex-col items-center justify-between p-1.5 sm:p-2 transition-colors duration-500 ${
            isOpen ? 'bg-slate-800 border-emerald-500/50 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 'bg-slate-800 border-slate-700'
          }`}>
            <div className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full flex items-center justify-center transition-colors ${
              isOpen ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-rose-500 shadow-[0_0_8px_#f43f5e]'
            }`}>
              <ShieldCheck className="w-2 h-2 text-white" />
            </div>
            <div className="w-1 sm:w-1.5 h-8 sm:h-12 bg-slate-700 rounded-full overflow-hidden">
              <div className={`w-full h-full transition-all duration-700 ${isOpen ? 'bg-emerald-400' : 'bg-rose-500'}`} />
            </div>
            <span className="text-[8px] sm:text-[9px] font-mono text-slate-400">POST-R</span>
          </div>
        </div>
      </div>

      {/* Controller Bus Readout */}
      <div className="mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400 px-1">
        <span>IO: NO/COM CONTACT</span>
        <span className={isOpen ? 'text-emerald-400 font-semibold' : 'text-slate-400'}>
          {isOpen ? 'SIGNAL TRANSMITTED (12VDC PULSE)' : 'STANDBY - READY'}
        </span>
      </div>
    </div>
  );
};
