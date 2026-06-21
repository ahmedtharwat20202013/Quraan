import { ADAM_QUESTIONS } from './questions/adam';
import { NOAH_HOOD_SALEH_QUESTIONS } from './questions/noah_hood_saleh';
import { IBRAHIM_LOT_JOSEPH_QUESTIONS } from './questions/ibrahim_lot_joseph';
import { AYOUB_YOUNUS_SHUAIB_QUESTIONS } from './questions/ayoub_younus_shuaib';
import { MOUSSA_SOLAIMAN_DAWOOD_QUESTIONS } from './questions/moussa_solaiman_dawood';
import { ESSA_QUESTIONS } from './questions/essa';
import { MOHAMMAD_QUESTIONS } from './questions/mohammad';

export interface QuizQuestion {
  id: number;
  category: string;
  question: string;
  answers: string[];
  correctIndex: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  ...ADAM_QUESTIONS,
  ...NOAH_HOOD_SALEH_QUESTIONS,
  ...IBRAHIM_LOT_JOSEPH_QUESTIONS,
  ...AYOUB_YOUNUS_SHUAIB_QUESTIONS,
  ...MOUSSA_SOLAIMAN_DAWOOD_QUESTIONS,
  ...ESSA_QUESTIONS,
  ...MOHAMMAD_QUESTIONS
];
