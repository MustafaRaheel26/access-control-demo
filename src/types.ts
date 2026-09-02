export type ScreenState = 'WELCOME' | 'QUESTIONNAIRE' | 'PROCESSING' | 'APPROVED' | 'DENIED';

export interface QuestionItem {
  id: number;
  question: string;
  category?: string;
  iconName: string;
  subtext?: string;
  requiredAnswer: boolean; // true = YES
}

export interface AnswerRecord {
  questionId: number;
  question: string;
  selectedAnswer: boolean; // true = YES, false = NO
  isCorrect: boolean;
  timestamp: number;
}

export interface KioskConfig {
  terminalId: string;
  locationName: string;
  restrictedAreaName: string;
  autoResetSeconds: number;
}
