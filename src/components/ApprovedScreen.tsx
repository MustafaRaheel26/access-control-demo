import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { CheckCircle2, RotateCcw, ShieldCheck, Radio, AlertCircle, ArrowRight } from 'lucide-react';
import { GateSimulation } from './GateSimulation';
import { soundManager } from '../utils/audio';

interface ApprovedScreenProps {
  onRestart: () => void;
  autoResetSeconds?: number;
}

export const ApprovedScreen: React.FC<ApprovedScreenProps> = ({
  onRestart,
  autoResetSeconds = 20,
}) => {
  const [countdown, setCountdown] = useState(autoResetSeconds);
  const [gateOpen, setGateOpen] = useState(false);

  useEffect(() => {
    soundManager.playApproved();

    // Trigger gate opening animation shortly after screen mounts
    const gateTimer = setTimeout(() => {
      setGateOpen(true);
    }, 400);

    // Auto-reset countdown
    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onRestart();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(gateTimer);
      clearInterval(interval);
    };
  }, [onRestart]);

  const handleRestartClick = () => {
    soundManager.playTap();
    onRestart();
  };

  return (
    <div id="screen-access-approved" className="flex-1 flex flex-col justify-between items-center text-center p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full select-none overflow-x-hidden">
      {/* Top Header & Big Success Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="w-full flex flex-col items-center pt-1 shrink-0"
      >
        {/* Large Success Icon */}
        <div className="relative mb-3 sm:mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-emerald-950 border-2 border-emerald-500 shadow-[0_0_35px_rgba(16,185,129,0.35)] flex items-center justify-center text-emerald-400">
            <CheckCircle2 className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[2.5]" />
          </div>
          <div className="absolute -inset-1 rounded-3xl bg-emerald-400/20 blur-md pointer-events-none -z-10" />
        </div>

        {/* Display texts per spec */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-emerald-400 mb-1.5 sm:mb-2 font-sans">
          ACCESS APPROVED
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-200 font-medium max-w-md mb-2">
          Your safety check has been completed successfully.
        </p>

        {/* Simulated Status */}
        <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-[11px] sm:text-xs font-mono font-bold tracking-wider mb-2 sm:mb-3 animate-pulse">
          <Radio className="w-3.5 h-3.5" />
          <span>Opening Access Gate...</span>
        </div>
      </motion.div>

      {/* Gate / Door Animation Simulation */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.35 }}
        className="w-full my-auto py-1 sm:py-2 overflow-hidden"
      >
        <GateSimulation isOpen={gateOpen} />
      </motion.div>

      {/* System Note & Action Controls */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.35 }}
        className="w-full pt-2 sm:pt-3 flex flex-col items-center shrink-0"
      >
        {/* Required simulation disclaimer note */}
        <div className="w-full bg-slate-900/90 border border-slate-800 rounded-xl p-2.5 sm:p-3 mb-3 flex items-start gap-2 text-left text-[11px] sm:text-xs text-slate-400">
          <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-slate-300">Demonstration Note:</strong> In the final system, this step will send a signal to the connected access-control system.
          </p>
        </div>

        {/* START NEW CHECK Button */}
        <button
          id="btn-start-new-check"
          type="button"
          onClick={handleRestartClick}
          className="w-full h-14 sm:h-16 md:h-18 bg-slate-800 hover:bg-slate-700 active:scale-[0.98] text-white font-bold text-base sm:text-lg md:text-xl rounded-2xl border border-slate-600 shadow-lg flex items-center justify-center gap-2.5 transition-all cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>START NEW CHECK</span>
        </button>

        <p className="mt-1.5 sm:mt-2 text-[10px] sm:text-[11px] font-mono text-slate-500">
          AUTO-RESETTING IN {countdown}S • OR TAP BUTTON TO RESTART
        </p>
      </motion.div>
    </div>
  );
};
