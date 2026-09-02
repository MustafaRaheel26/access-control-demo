/**
 * Access Control Kiosk Demo
 * Touchscreen access-control terminal prototype for industrial safety compliance.
 */

import React, { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ScreenState, AnswerRecord } from './types';
import { QUESTIONS_DATA, DEFAULT_KIOSK_CONFIG } from './config/questions';
import { soundManager } from './utils/audio';
import { KioskHeader } from './components/KioskHeader';
import { KioskFrame } from './components/KioskFrame';
import { WelcomeScreen } from './components/WelcomeScreen';
import { QuestionScreen } from './components/QuestionScreen';
import { ProcessingScreen } from './components/ProcessingScreen';
import { ApprovedScreen } from './components/ApprovedScreen';
import { DeniedScreen } from './components/DeniedScreen';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenState>('WELCOME');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<AnswerRecord[]>([]);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [kioskMode, setKioskMode] = useState<'portrait' | 'fullscreen'>('portrait');

  // Toggle sound
  const handleToggleSound = () => {
    const next = !soundEnabled;
    soundManager.enabled = next;
    setSoundEnabled(next);
    if (next) soundManager.playTap();
  };

  // Toggle layout mode
  const handleToggleKioskMode = () => {
    setKioskMode((prev) => (prev === 'portrait' ? 'fullscreen' : 'portrait'));
  };

  // Start Questionnaire
  const handleStartCheck = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentScreen('QUESTIONNAIRE');
  };

  // Handle Question Answer
  const handleAnswer = (userChoice: boolean) => {
    const currentQ = QUESTIONS_DATA[currentQuestionIndex];
    const isCorrect = userChoice === currentQ.requiredAnswer;

    const newRecord: AnswerRecord = {
      questionId: currentQ.id,
      question: currentQ.question,
      selectedAnswer: userChoice,
      isCorrect,
      timestamp: Date.now(),
    };

    const updatedAnswers = [...answers, newRecord];
    setAnswers(updatedAnswers);

    // If more questions remain, advance to next question
    if (currentQuestionIndex + 1 < QUESTIONS_DATA.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Completed all 7 questions -> Transition to Processing Screen
      setCurrentScreen('PROCESSING');
    }
  };

  // Processing Completed -> Evaluate Results
  const handleProcessingComplete = useCallback(() => {
    // Check if all answers are YES (true)
    const allApproved = answers.every((ans) => ans.isCorrect && ans.selectedAnswer === true);

    if (allApproved) {
      setCurrentScreen('APPROVED');
    } else {
      setCurrentScreen('DENIED');
    }
  }, [answers]);

  // Restart Flow from beginning of questionnaire
  const handleTryAgain = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentScreen('QUESTIONNAIRE');
  };

  // Return to Welcome Screen
  const handleResetToWelcome = () => {
    setAnswers([]);
    setCurrentQuestionIndex(0);
    setCurrentScreen('WELCOME');
  };

  // Demo Presets for sales meetings / rapid testing
  const handleQuickScenario = (scenario: 'all_yes' | 'fail_shoe' | 'fail_helmet' | 'reset') => {
    if (scenario === 'reset') {
      handleResetToWelcome();
      return;
    }

    if (scenario === 'all_yes') {
      const generated: AnswerRecord[] = QUESTIONS_DATA.map((q) => ({
        questionId: q.id,
        question: q.question,
        selectedAnswer: true,
        isCorrect: true,
        timestamp: Date.now(),
      }));
      setAnswers(generated);
      setCurrentScreen('PROCESSING');
      return;
    }

    if (scenario === 'fail_shoe') {
      const generated: AnswerRecord[] = QUESTIONS_DATA.map((q) => {
        const isShoe = q.id === 3; // safety shoes
        return {
          questionId: q.id,
          question: q.question,
          selectedAnswer: isShoe ? false : true,
          isCorrect: isShoe ? false : true,
          timestamp: Date.now(),
        };
      });
      setAnswers(generated);
      setCurrentScreen('PROCESSING');
      return;
    }

    if (scenario === 'fail_helmet') {
      const generated: AnswerRecord[] = QUESTIONS_DATA.map((q) => {
        const isHelmet = q.id === 1; // safety helmet
        return {
          questionId: q.id,
          question: q.question,
          selectedAnswer: isHelmet ? false : true,
          isCorrect: isHelmet ? false : true,
          timestamp: Date.now(),
        };
      });
      setAnswers(generated);
      setCurrentScreen('PROCESSING');
      return;
    }
  };

  return (
    <div className="w-full min-h-screen bg-slate-950 font-sans antialiased text-slate-100 flex flex-col justify-between max-w-full overflow-x-hidden">
      {/* Top Universal Access Kiosk Header */}
      <KioskHeader
        config={DEFAULT_KIOSK_CONFIG}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        kioskMode={kioskMode}
        onToggleKioskMode={handleToggleKioskMode}
        onQuickScenario={handleQuickScenario}
        currentScreen={currentScreen}
      />

      {/* Main Kiosk Body & Frame */}
      <KioskFrame mode={kioskMode}>
        <div className="flex-1 flex flex-col relative w-full h-full max-w-full overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentScreen === 'WELCOME' && (
              <motion.div
                key="screen-welcome"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col w-full"
              >
                <WelcomeScreen
                  onStart={handleStartCheck}
                  restrictedAreaName={DEFAULT_KIOSK_CONFIG.restrictedAreaName}
                />
              </motion.div>
            )}

            {currentScreen === 'QUESTIONNAIRE' && (
              <motion.div
                key="screen-questionnaire"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col w-full"
              >
                <QuestionScreen
                  question={QUESTIONS_DATA[currentQuestionIndex]}
                  currentIndex={currentQuestionIndex}
                  totalQuestions={QUESTIONS_DATA.length}
                  onAnswer={handleAnswer}
                  onCancel={handleResetToWelcome}
                />
              </motion.div>
            )}

            {currentScreen === 'PROCESSING' && (
              <motion.div
                key="screen-processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col w-full"
              >
                <ProcessingScreen onComplete={handleProcessingComplete} />
              </motion.div>
            )}

            {currentScreen === 'APPROVED' && (
              <motion.div
                key="screen-approved"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col w-full"
              >
                <ApprovedScreen
                  onRestart={handleResetToWelcome}
                  autoResetSeconds={DEFAULT_KIOSK_CONFIG.autoResetSeconds}
                />
              </motion.div>
            )}

            {currentScreen === 'DENIED' && (
              <motion.div
                key="screen-denied"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col w-full"
              >
                <DeniedScreen
                  answers={answers}
                  onTryAgain={handleTryAgain}
                  onCancel={handleResetToWelcome}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </KioskFrame>
    </div>
  );
}
