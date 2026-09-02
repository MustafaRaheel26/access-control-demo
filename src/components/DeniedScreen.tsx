import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ShieldX, AlertTriangle, RotateCcw, XCircle, CheckCircle2, ChevronRight, Ban } from 'lucide-react';
import { AnswerRecord } from '../types';
import { soundManager } from '../utils/audio';

interface DeniedScreenProps {
  answers: AnswerRecord[];
  onTryAgain: () => void;
  onCancel: () => void;
}

export const DeniedScreen: React.FC<DeniedScreenProps> = ({
  answers,
  onTryAgain,
  onCancel,
}) => {
  useEffect(() => {
    soundManager.playDenied();
  }, []);

  const handleTryAgain = () => {
    soundManager.playTap();
    onTryAgain();
  };

  const handleCancel = () => {
    soundManager.playTap();
    onCancel();
  };

  const failedAnswers = answers.filter((a) => !a.isCorrect);

  return (
    <div id="screen-access-denied" className="flex-1 flex flex-col justify-between items-center text-center p-4 sm:p-6 md:p-8 max-w-2xl mx-auto w-full select-none overflow-x-hidden">
      {/* Top Warning Badge & Headings */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
        className="w-full flex flex-col items-center pt-1 shrink-0"
      >
        {/* Large Warning Icon */}
        <div className="relative mb-3 sm:mb-4">
          <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl sm:rounded-3xl bg-rose-950 border-2 border-rose-500 shadow-[0_0_35px_rgba(244,63,94,0.35)] flex items-center justify-center text-rose-400">
            <ShieldX className="w-9 h-9 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[2.2]" />
          </div>
          <div className="absolute -inset-1 rounded-3xl bg-rose-400/20 blur-md pointer-events-none -z-10" />
        </div>

        {/* Display Header strictly matching spec */}
        <h1 className="text-2xl sm:text-3xl md:text-5xl font-black tracking-tight text-rose-500 mb-1.5 sm:mb-2 font-sans">
          ACCESS NOT APPROVED
        </h1>

        <p className="text-sm sm:text-base md:text-lg text-slate-200 font-semibold mb-1 max-w-lg">
          One or more safety requirements were not confirmed.
        </p>

        <p className="text-xs sm:text-sm md:text-base text-slate-400 font-normal max-w-md">
          Please ensure all safety requirements are met before requesting access.
        </p>
      </motion.div>

      {/* Checklist Breakdown of Unconfirmed Items */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.35 }}
        className="w-full my-auto py-2 sm:py-3 overflow-hidden"
      >
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-3 sm:p-4 text-left shadow-xl max-w-lg mx-auto">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2 mb-2.5">
            <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-400 tracking-wider font-semibold">
              Safety Verification Summary
            </span>
            <span className="text-[10px] sm:text-xs font-mono px-2 py-0.5 rounded bg-rose-950/80 text-rose-300 border border-rose-800/50">
              {failedAnswers.length} Requirement{failedAnswers.length > 1 ? 's' : ''} Failed
            </span>
          </div>

          <div className="space-y-1.5 sm:space-y-2 max-h-36 sm:max-h-44 overflow-y-auto pr-1">
            {answers.map((record) => (
              <div
                key={record.questionId}
                className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between text-xs transition-colors ${
                  record.isCorrect
                    ? 'bg-slate-950/60 border-slate-800 text-slate-400'
                    : 'bg-rose-950/40 border-rose-800/60 text-rose-200'
                }`}
              >
                <div className="flex items-center gap-2 sm:gap-2.5 min-w-0 pr-2">
                  {record.isCorrect ? (
                    <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400 shrink-0" />
                  )}
                  <span className={`truncate ${record.isCorrect ? 'line-through opacity-70' : 'font-medium'}`}>
                    {record.question}
                  </span>
                </div>
                <span className={`font-mono text-[9px] sm:text-[10px] font-bold uppercase px-1.5 py-0.5 rounded shrink-0 ${
                  record.isCorrect ? 'bg-emerald-950 text-emerald-400' : 'bg-rose-900 text-white'
                }`}>
                  {record.selectedAnswer ? 'YES' : 'NO'}
                </span>
              </div>
            ))}
          </div>

          {/* Barrier Locked Indicator */}
          <div className="mt-2.5 pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-slate-400">
            <span className="flex items-center gap-1.5 text-rose-400">
              <Ban className="w-3.5 h-3.5" />
              <span>ACCESS GATE REMAINS LOCKED</span>
            </span>
            <span>NO SIGNAL SENT</span>
          </div>
        </div>
      </motion.div>

      {/* Two Specified Options: TRY AGAIN and CANCEL */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.35 }}
        className="w-full pt-1 sm:pt-2 flex flex-col gap-2.5 sm:gap-3 max-w-lg shrink-0"
      >
        {/* TRY AGAIN */}
        <button
          id="btn-try-again"
          type="button"
          onClick={handleTryAgain}
          className="w-full h-14 sm:h-16 md:h-18 bg-cyan-600 hover:bg-cyan-500 active:scale-[0.98] text-white font-extrabold text-base sm:text-lg md:text-xl rounded-2xl shadow-[0_6px_20px_rgba(6,182,212,0.3)] flex items-center justify-center gap-2.5 transition-all cursor-pointer border-t border-cyan-300/30"
        >
          <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2.5]" />
          <span>TRY AGAIN</span>
        </button>

        {/* CANCEL */}
        <button
          id="btn-cancel-denied"
          type="button"
          onClick={handleCancel}
          className="w-full h-12 sm:h-14 bg-slate-900 hover:bg-slate-800 active:scale-[0.98] text-slate-300 hover:text-white font-bold text-sm sm:text-base md:text-lg rounded-2xl border border-slate-700/80 shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
        >
          <span>CANCEL</span>
        </button>
      </motion.div>
    </div>
  );
};
