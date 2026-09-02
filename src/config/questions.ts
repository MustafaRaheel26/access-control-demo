import { QuestionItem, KioskConfig } from '../types';

export const DEFAULT_KIOSK_CONFIG: KioskConfig = {
  terminalId: 'KIOSK-TER-04',
  locationName: 'Primary Access Portal',
  restrictedAreaName: 'Controlled Industrial Zone B',
  autoResetSeconds: 15,
};

export const QUESTIONS_DATA: QuestionItem[] = [
  {
    id: 1,
    question: 'Are you wearing your safety helmet?',
    category: 'Head Protection',
    iconName: 'HardHat',
    subtext: 'Hard hat must be securely fastened and undamaged',
    requiredAnswer: true,
  },
  {
    id: 2,
    question: 'Are you wearing your safety glasses?',
    category: 'Eye Protection',
    iconName: 'Glasses',
    subtext: 'Side-shield eye protection required in this zone',
    requiredAnswer: true,
  },
  {
    id: 3,
    question: 'Are you wearing the required safety shoes?',
    category: 'Footwear Compliance',
    iconName: 'Footprints',
    subtext: 'Steel-toe or composite safety boots with slip-resistant soles',
    requiredAnswer: true,
  },
  {
    id: 4,
    question: 'Are you wearing appropriate protective clothing?',
    category: 'Apparel Compliance',
    iconName: 'Shirt',
    subtext: 'High-visibility vest and flame/chemical-resistant garments',
    requiredAnswer: true,
  },
  {
    id: 5,
    question: 'Is your safety equipment properly secured?',
    category: 'Equipment Check',
    iconName: 'ShieldAlert',
    subtext: 'Straps, latches, and harnesses adjusted and locked',
    requiredAnswer: true,
  },
  {
    id: 6,
    question: 'Have you completed the required safety requirements?',
    category: 'Protocol Verification',
    iconName: 'ClipboardCheck',
    subtext: 'Safety induction briefing and site orientation valid',
    requiredAnswer: true,
  },
  {
    id: 7,
    question: 'Are you ready to enter the restricted area?',
    category: 'Access Confirmation',
    iconName: 'DoorOpen',
    subtext: 'Confirm readiness to proceed past the security gate',
    requiredAnswer: true,
  },
];
