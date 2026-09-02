import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import { ShieldCheck, Loader2, Cpu, CheckCircle2 } from 'lucide-react';
import { soundManager } from '../utils/audio';

interface ProcessingScreenProps {
  onComplete: () => void;
}

export const ProcessingScreen: React.FC<ProcessingScreenProps> = ({ onComplete }) => {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Evaluating PPE safety answers...',
    'Checking zone compliance parameters...',
    'Computing access authorization...',
  ];

  useEffect(() => {
    soundManager.playProcessingStep();

    const t1 = setTimeout(() => {
      setStepIndex(1);
      soundManager.playProcessingStep();
    }, 550);

    const t2 = setTimeout(() => {
      setStepIndex(2);
      soundManager.playProcessingStep();
    }, 1100);

    const tFinal = setTimeout(() => {
      onComplete();
    }, 1700);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(tFinal);
    };
  }, [onComplete]);

  return (
    <div id="screen-processing" className="flex-1 flex flex-col justify-center items-center p-4 sm:p-6 md:p-10 max-w-xl mx-auto w-full text-center select-none overflow-x-hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-6 sm:p-8 md:p-12 shadow-2xl flex flex-col items-center"
      >
        {/* Animated Processing Ring / Spinner */}
        <div className="relative mb-6 sm:mb-8">
          <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 rounded-full border-4 border-slate-800 flex items-center justify-center relative">
            <motion.div
              className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 border-r-blue-500"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
            />
            <motion.div
              className="absolute inset-2 rounded-full border-2 border-transparent border-b-indigo-400"
              animate={{ rotate: -360 }}
              transition={{ repeat: Infinity, duration: 1.8, ease: 'linear' }}
            />
            <Cpu className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 text-cyan-400 animate-pulse" />
          </div>
        </div>

        {/* Primary Spec Label */}
        <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-100 mb-2 sm:mb-3 tracking-tight">
          Checking your responses...
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-400 mb-5 sm:mb-6 font-medium px-2">
          Please wait while the safety engine validates your check.
        </p>

        {/* Step Progress Checklist */}
        <div className="w-full max-w-xs bg-slate-950/80 rounded-xl p-3 sm:p-3.5 border border-slate-800 flex flex-col gap-2 sm:gap-2.5 text-left font-mono text-[11px] sm:text-xs">
          {steps.map((stepText, idx) => {
            const isDone = idx < stepIndex;
            const isCurrent = idx === stepIndex;
            return (
              <div key={stepText} className="flex items-center gap-2 sm:gap-2.5">
                {isDone ? (
                  <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400 animate-spin shrink-0" />
                ) : (
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-full border border-slate-700 shrink-0" />
                )}
                <span className={isCurrent ? 'text-cyan-300 font-semibold' : isDone ? 'text-slate-400 line-through' : 'text-slate-600'}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};
