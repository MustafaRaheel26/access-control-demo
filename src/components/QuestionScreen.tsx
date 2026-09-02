import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HardHat,
  Glasses,
  Footprints,
  Shirt,
  ShieldAlert,
  ClipboardCheck,
  DoorOpen,
  Check,
  X,
  HelpCircle,
  LucideIcon
} from 'lucide-react';
import { QuestionItem } from '../types';
import { soundManager } from '../utils/audio';

interface QuestionScreenProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
  onCancel: () => void;
}

const ICON_MAP: Record<string, LucideIcon> = {
  HardHat,
  Glasses,
  Footprints,
  Shirt,
  ShieldAlert,
  ClipboardCheck,
  DoorOpen,
};

export const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  currentIndex,
  totalQuestions,
  onAnswer,
  onCancel,
}) => {
  const IconComponent = ICON_MAP[question.iconName] || HelpCircle;
  const progressPercent = Math.round(((currentIndex + 1) / totalQuestions) * 100);

  const handleSelectAnswer = (ans: boolean) => {
    soundManager.playTap();
    onAnswer(ans);
  };

  return (
    <div id="screen-questionnaire" className="flex-1 flex flex-col justify-between p-4 sm:p-6 md:p-8 max-w-3xl mx-auto w-full select-none overflow-x-hidden">
      {/* Top Header & Progress Indicator */}
      <div className="w-full shrink-0">
        {/* Progress Counter & Category Pill */}
        <div className="flex items-center justify-between text-xs sm:text-sm mb-2.5">
          <div className="flex items-center gap-2">
            <span className="font-mono font-bold text-slate-100 text-sm sm:text-base md:text-lg">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            {question.category && (
              <span className="hidden xs:inline-flex text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700 text-cyan-300">
                {question.category}
              </span>
            )}
          </div>
          <button
            id="btn-cancel-quiz"
            type="button"
            onClick={() => {
              soundManager.playTap();
              onCancel();
            }}
            className="text-[11px] sm:text-xs font-mono text-slate-400 hover:text-rose-400 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 transition-colors cursor-pointer"
          >
            Cancel Check
          </button>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-2.5 sm:h-3 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700/60 shadow-inner">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
            initial={{ width: `${(currentIndex / totalQuestions) * 100}%` }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Question Card Area with Smooth Transitions - clipped against horizontal scroll */}
      <div className="w-full my-auto py-3 sm:py-4 relative min-h-[220px] sm:min-h-[260px] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={question.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
            className="w-full bg-slate-900/90 border border-slate-700/80 rounded-2xl sm:rounded-3xl p-5 sm:p-7 md:p-9 shadow-2xl flex flex-col items-center text-center"
          >
            {/* Visual Question Icon Badge */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-b from-slate-800 to-slate-950 border border-slate-700/80 flex items-center justify-center text-cyan-400 mb-4 sm:mb-6 shadow-md shrink-0">
              <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 stroke-[1.8]" />
            </div>

            {/* Question Text - Large Typography */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-50 tracking-tight leading-snug mb-2 sm:mb-3">
              {question.question}
            </h2>

            {/* Supplemental safety requirement note */}
            {question.subtext && (
              <p className="text-xs sm:text-sm md:text-base text-slate-400 max-w-lg font-medium">
                {question.subtext}
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Touch-Friendly Dual Action Buttons: YES and NO */}
      <div className="w-full grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 pt-1 sm:pt-2 pb-1 shrink-0">
        {/* YES Button */}
        <button
          id={`btn-answer-yes-${question.id}`}
          type="button"
          onClick={() => handleSelectAnswer(true)}
          className="h-20 sm:h-24 md:h-28 bg-emerald-600 hover:bg-emerald-500 active:scale-[0.97] active:bg-emerald-700 text-white rounded-2xl md:rounded-3xl shadow-[0_8px_25px_rgba(5,150,105,0.3)] border-t border-emerald-400/40 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 transition-all duration-150 cursor-pointer group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <Check className="w-5 h-5 sm:w-6 sm:h-6 text-white stroke-[3]" />
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-xl sm:text-2xl md:text-3xl font-black tracking-wide leading-none">YES</span>
            <span className="text-[10px] sm:text-xs font-mono text-emerald-100 opacity-90 uppercase tracking-wider">
              Confirmed
            </span>
          </div>
        </button>

        {/* NO Button */}
        <button
          id={`btn-answer-no-${question.id}`}
          type="button"
          onClick={() => handleSelectAnswer(false)}
          className="h-20 sm:h-24 md:h-28 bg-slate-800 hover:bg-rose-700 active:scale-[0.97] active:bg-rose-800 text-white rounded-2xl md:rounded-3xl shadow-[0_8px_25px_rgba(15,23,42,0.5)] border border-slate-700 hover:border-rose-500/50 flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-3 transition-all duration-150 cursor-pointer group"
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 group-hover:bg-rose-500/30 flex items-center justify-center group-hover:scale-110 transition-transform shrink-0">
            <X className="w-5 h-5 sm:w-6 sm:h-6 text-slate-300 group-hover:text-white stroke-[3]" />
          </div>
          <div className="text-center sm:text-left">
            <span className="block text-xl sm:text-2xl md:text-3xl font-black tracking-wide leading-none">NO</span>
            <span className="text-[10px] sm:text-xs font-mono text-slate-400 group-hover:text-rose-100 opacity-90 uppercase tracking-wider">
              Not Met
            </span>
          </div>
        </button>
      </div>

      {/* Accessibility Helper Subtitle */}
      <p className="text-center text-[10px] sm:text-[11px] font-mono text-slate-500 mt-1 shrink-0">
        TAP YOUR ANSWER ON SCREEN TO ADVANCE
      </p>
    </div>
  );
};
