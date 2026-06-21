import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, Heart, Play, ListOrdered, Award, Ban } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import { audioManager } from '../lib/audioManager';
import { cn } from '../lib/utils';
import { BalloonAnimation } from './BalloonPop';

interface QuizSectionProps {
  onBack: () => void;
}

type GameState = 'start' | 'playing' | 'gameover' | 'won';
type DifficultyLevel = 'easy' | 'medium' | 'hard';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

// Key names for localStorage
const SEEN_QUESTIONS_KEY = 'quiz_seen_questions_v2';
const ACTIVE_SESSION_KEY = 'temp_quiz_session_v2';

export default function QuizSection({ onBack }: QuizSectionProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hearts, setHearts] = useState(3);
  const [initialHeartsCount, setInitialHeartsCount] = useState(3);
  const [gameState, setGameState] = useState<GameState>('start');
  const [selectedDifficulty, setSelectedDifficulty] = useState<DifficultyLevel>('medium');
  const [targetCount, setTargetCount] = useState(15);
  const [hasSavedSession, setHasSavedSession] = useState(false);

  const [showBalloons, setShowBalloons] = useState(false);
  const [balloonsExploding, setBalloonsExploding] = useState(false);

  // Load seen question IDs from localStorage
  const getSeenQuestionIds = (): number[] => {
    if (typeof window === 'undefined') return [];
    try {
      const data = localStorage.getItem(SEEN_QUESTIONS_KEY);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  };

  // Add a list of IDs to seen questions
  const addSeenQuestionIds = (ids: number[]) => {
    if (typeof window === 'undefined') return;
    try {
      const seen = getSeenQuestionIds();
      const updated = Array.from(new Set([...seen, ...ids]));
      localStorage.setItem(SEEN_QUESTIONS_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error('Error saving seen questions:', e);
    }
  };

  // Clear seen questions if they've answered them all
  const clearSeenQuestions = () => {
    if (typeof window === 'undefined') return;
    localStorage.removeItem(SEEN_QUESTIONS_KEY);
  };

  // Check if there is a saved temporary session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (saved) {
        setHasSavedSession(true);
      }
    }
  }, []);

  // Save the active session whenever vital states change
  const saveSessionToStorage = (
    currentQuestions: QuizQuestion[],
    index: number,
    ans: number | null,
    currentHearts: number,
    state: GameState,
    diff: DifficultyLevel,
    target: number,
    initHearts: number
  ) => {
    if (typeof window === 'undefined') return;
    if (state === 'playing') {
      const sessionData = {
        questions: currentQuestions,
        currentIndex: index,
        selectedAnswer: ans,
        hearts: currentHearts,
        gameState: state,
        selectedDifficulty: diff,
        targetCount: target,
        initialHeartsCount: initHearts
      };
      localStorage.setItem(ACTIVE_SESSION_KEY, JSON.stringify(sessionData));
      setHasSavedSession(true);
    } else {
      localStorage.removeItem(ACTIVE_SESSION_KEY);
      setHasSavedSession(false);
    }
  };

  // Resume the temporarily saved session
  const resumeQuiz = () => {
    if (typeof window === 'undefined') return;
    try {
      const saved = localStorage.getItem(ACTIVE_SESSION_KEY);
      if (saved) {
        const data = JSON.parse(saved);
        setQuestions(data.questions);
        setCurrentIndex(data.currentIndex);
        setSelectedAnswer(data.selectedAnswer);
        setHearts(data.hearts);
        setInitialHeartsCount(data.initialHeartsCount || 3);
        setGameState(data.gameState);
        setSelectedDifficulty(data.selectedDifficulty);
        setTargetCount(data.targetCount);
        audioManager.play('whoosh');
      }
    } catch (e) {
      console.error('Failed to resume quiz:', e);
    }
  };

  // Generate difficulty sequence with random alternating phases (e.g. easy, then hard, easy, then medium)
  const generateDifficultySequence = (count: number): DifficultyLevel[] => {
    const levels: DifficultyLevel[] = ['easy', 'medium', 'hard'];
    const sequence: DifficultyLevel[] = [];
    for (let i = 0; i < count; i++) {
      let nextLevel = levels[Math.floor(Math.random() * levels.length)];
      // Prevent consecutive duplicates to ensure rotating "easy then hard then medium then easy" phases
      if (i > 0 && nextLevel === sequence[i - 1]) {
        const alternates = levels.filter(l => l !== sequence[i - 1]);
        nextLevel = alternates[Math.floor(Math.random() * alternates.length)];
      }
      sequence.push(nextLevel);
    }
    return sequence;
  };

  // Initialize a new quiz session
  const initQuiz = useCallback((difficulty: DifficultyLevel) => {
    audioManager.unlock();
    
    // Set target question count and hearts based on difficulty mode
    let count = 15;
    let startHearts = 3;
    if (difficulty === 'easy') {
      count = 20;
      startHearts = 3;
    } else if (difficulty === 'medium') {
      count = 15;
      startHearts = 3;
    } else if (difficulty === 'hard') {
      count = 10;
      startHearts = 2;
    }

    setSelectedDifficulty(difficulty);
    setTargetCount(count);
    setInitialHeartsCount(startHearts);

    let seenIds = getSeenQuestionIds();

    // Generate difficulty rhythm phases (alternating levels)
    const diffSequence = generateDifficultySequence(count);
    const selectedQuestionsList: QuizQuestion[] = [];

    // For each phase, pick an unseen question of that difficulty
    for (let i = 0; i < count; i++) {
      const targetDiff = diffSequence[i];
      let candidates = QUIZ_QUESTIONS.filter(
        q => q.difficulty === targetDiff && !seenIds.includes(q.id) && !selectedQuestionsList.some(sq => sq.id === q.id)
      );

      // If we ran out of unseen questions for this difficulty, clear seen history and retry
      if (candidates.length === 0) {
        clearSeenQuestions();
        seenIds = [];
        candidates = QUIZ_QUESTIONS.filter(
          q => q.difficulty === targetDiff && !selectedQuestionsList.some(sq => sq.id === q.id)
        );
      }

      if (candidates.length > 0) {
        const randomQuestion = candidates[Math.floor(Math.random() * candidates.length)];
        selectedQuestionsList.push(randomQuestion);
      } else {
        // Fallback: If still empty, just grab any random question of this difficulty that isn't selected yet
        const backupCandidates = QUIZ_QUESTIONS.filter(q => q.difficulty === targetDiff && !selectedQuestionsList.some(sq => sq.id === q.id));
        if (backupCandidates.length > 0) {
          selectedQuestionsList.push(backupCandidates[Math.floor(Math.random() * backupCandidates.length)]);
        } else {
          // Absolute fallback: pick any question
          const absoluteBackup = QUIZ_QUESTIONS.filter(q => !selectedQuestionsList.some(sq => sq.id === q.id));
          selectedQuestionsList.push(absoluteBackup[Math.floor(Math.random() * absoluteBackup.length)]);
        }
      }
    }

    // Shuffle the final choices slightly, but maintain their diverse difficulties
    const finalQuestions = selectedQuestionsList;

    // Persist their IDs as "seen" to NEVER repeat them in future quizzes
    const chosenIds = finalQuestions.map(q => q.id);
    addSeenQuestionIds(chosenIds);

    // Save states
    setQuestions(finalQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHearts(startHearts);
    setGameState('playing');
    setShowBalloons(false);
    setBalloonsExploding(false);

    // Cache the active session temporarily
    saveSessionToStorage(finalQuestions, 0, null, startHearts, 'playing', difficulty, count, startHearts);

    audioManager.play('whoosh');
  }, []);

  const vibrate = (pattern: number | number[]) => {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(pattern);
    }
  };

  const handleAnswerSelect = async (index: number) => {
    audioManager.unlock();
    if (selectedAnswer !== null || gameState !== 'playing' || !currentQuestion) return;

    setSelectedAnswer(index);

    const isCorrect = index === currentQuestion.correctIndex;

    if (isCorrect) {
      audioManager.play('ding');
      vibrate(50);
      
      const nextIndex = currentIndex + 1;
      const gameIsWon = nextIndex >= questions.length;

      setTimeout(() => {
        if (!gameIsWon) {
          audioManager.play('whoosh');
          setCurrentIndex(nextIndex);
          setSelectedAnswer(null);
          saveSessionToStorage(questions, nextIndex, null, hearts, 'playing', selectedDifficulty, targetCount, initialHeartsCount);
        } else {
          audioManager.play('win');
          setGameState('won');
          saveSessionToStorage(questions, nextIndex, null, hearts, 'won', selectedDifficulty, targetCount, initialHeartsCount);
        }
      }, 1200);

    } else {
      vibrate([100, 50, 100]);
      
      // Play wrong answer sound
      await audioManager.play('beep');
      
      // Start balloon animation
      setShowBalloons(true);
      
      // Wait for balloons to inflate slightly
      await new Promise(r => setTimeout(r, 400));
      
      // Trigger pop
      audioManager.play('pop');
      setBalloonsExploding(true);
      
      // Cleanup balloons after explosion
      setTimeout(() => {
        setShowBalloons(false);
        setBalloonsExploding(false);
      }, 500);
      
      // Deduct a heart and handle game progression
      setHearts((prev) => {
        const newHearts = prev - 1;
        const nextIndex = currentIndex + 1;
        const gameIsWon = nextIndex >= questions.length;

        setTimeout(() => {
          if (newHearts <= 0) {
            audioManager.play('lose');
            setGameState('gameover');
            saveSessionToStorage(questions, currentIndex, null, newHearts, 'gameover', selectedDifficulty, targetCount, initialHeartsCount);
          } else {
            if (!gameIsWon) {
              audioManager.play('whoosh');
              setCurrentIndex(nextIndex);
              setSelectedAnswer(null);
              saveSessionToStorage(questions, nextIndex, null, newHearts, 'playing', selectedDifficulty, targetCount, initialHeartsCount);
            } else {
              audioManager.play('win');
              setGameState('won');
              saveSessionToStorage(questions, nextIndex, null, newHearts, 'won', selectedDifficulty, targetCount, initialHeartsCount);
            }
          }
        }, 1200);
        
        return newHearts;
      });
    }
  };

  const resetAllProgress = () => {
    clearSeenQuestions();
    localStorage.removeItem(ACTIVE_SESSION_KEY);
    setHasSavedSession(false);
    setGameState('start');
    audioManager.play('whoosh');
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] pb-32 relative">
      <AnimatePresence mode="wait">

        {/* --- START SCREEN WITH DIFFICULTY MODES --- */}
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center flex-1 w-full max-w-md mx-auto px-4"
          >
            <button 
              onClick={onBack}
              className="absolute top-6 right-4 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-md"
            >
              <ChevronLeft size={28} className="translate-x-[2px] rotate-180" />
            </button>

            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-32 h-32 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-[0_20px_50px_rgba(16,185,129,0.4)] border-4 border-white/20 relative"
            >
              <Trophy size={55} className="text-white drop-shadow-md" />
              <Sparkles className="absolute top-3 right-3 text-gold-bright animate-pulse" size={20} />
            </motion.div>
            
            <h1 className="text-3xl font-black text-white mb-1 text-center drop-shadow-md">مسابقات الأنبياء</h1>
            <p className="text-white/70 text-center mb-8 font-bold text-sm">اختبر معلوماتك في قصص الأنبياء الرافدة</p>

            {/* Resume Last Session Button */}
            {hasSavedSession && (
              <motion.button
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={resumeQuiz}
                className="w-full h-14 rounded-[1.5rem] bg-gradient-to-r from-amber-400 to-orange-500 text-white font-extrabold text-lg shadow-lg hover:brightness-110 active:scale-95 transition-all flex items-center justify-center gap-3 mb-6 border border-amber-300"
              >
                <Play fill="#fff" size={18} />
                <span>استئناف المسابقة السابقة 🎮</span>
              </motion.button>
            )}
            
            {/* Difficulty Selectors (Play Buttons) */}
            <div className="w-full flex flex-col gap-4">
              <h2 className="text-white/80 font-black text-right text-sm px-1 mb-1">اختر مستوى التحدي وابدأ:</h2>
              
              {/* Easy Mode Button */}
              <button
                onClick={() => initQuiz('easy')}
                className="w-full p-4 rounded-[1.5rem] bg-emerald-500/20 hover:bg-emerald-500/30 border border-emerald-500/40 text-white transition-all text-right flex items-center justify-between active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white shadow-md font-bold text-lg">
                    ٢٠
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-emerald-300 text-lg group-hover:text-emerald-200">المستوى السهل 🟢</span>
                    <span className="block text-xs text-white/60">٢٠ سؤالاً • ٣ قلوب • مثالي للمراجعة والاستمتاع</span>
                  </div>
                </div>
                <Play className="text-emerald-400 rotate-180" size={18} />
              </button>

              {/* Medium Mode Button */}
              <button
                onClick={() => initQuiz('medium')}
                className="w-full p-4 rounded-[1.5rem] bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-white transition-all text-right flex items-center justify-between active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-white shadow-md font-bold text-lg">
                    ١٥
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-amber-300 text-lg group-hover:text-amber-200">المستوى المتوسط 🟡</span>
                    <span className="block text-xs text-white/60">١٥ سؤالاً • ٣ قلوب • ثقافة إسلامية متزنة</span>
                  </div>
                </div>
                <Play className="text-amber-400 rotate-180" size={18} />
              </button>

              {/* Hard Mode Button */}
              <button
                onClick={() => initQuiz('hard')}
                className="w-full p-4 rounded-[1.5rem] bg-rose-500/20 hover:bg-rose-500/30 border border-rose-500/40 text-white transition-all text-right flex items-center justify-between active:scale-[0.98] group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-500 flex items-center justify-center text-white shadow-md font-bold text-lg">
                    ١٠
                  </div>
                  <div className="text-right">
                    <span className="block font-black text-rose-300 text-lg group-hover:text-rose-200">المستوى الصعب 🔴</span>
                    <span className="block text-xs text-white/60">١٠ أسئلة • قلوب ٢ فقط • تحدي حقيقي للمتفوقين</span>
                  </div>
                </div>
                <Play className="text-rose-400 rotate-180" size={18} />
              </button>
            </div>

            {/* Clear Storage / Reset All progress */}
            <button
              onClick={resetAllProgress}
              className="mt-8 text-white/40 hover:text-rose-400 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <RotateCcw size={12} />
              <span>تصفير وتصفية جميع الأسئلة وتجربتها من جديد</span>
            </button>
          </motion.div>
        )}

        {/* --- PLAYING SCREEN --- */}
        {gameState === 'playing' && currentQuestion && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col flex-1 w-full max-w-md mx-auto pt-4 px-4"
          >
            {/* Countdown / Remaining Counter Banner */}
            <div className="w-full mb-4 bg-gradient-to-r from-indigo-600 to-indigo-800 text-white p-3 rounded-2xl flex items-center justify-between shadow-md border border-indigo-400/20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                  <Award size={18} className="text-gold-bright animate-bounce" />
                </div>
                <span className="font-extrabold text-sm md:text-base text-right">
                  باقي {questions.length - currentIndex} سؤال وتكسب! 🏆
                </span>
              </div>
              <span className="text-xs bg-black/20 px-3 py-1 rounded-full font-bold">
                {selectedDifficulty === 'easy' ? 'سهل' : selectedDifficulty === 'medium' ? 'متوسط' : 'صعب'}
              </span>
            </div>

            <div className="flex justify-between items-center mb-4 px-1">
              <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 z-10"
              >
                <ChevronLeft size={24} className="translate-x-[2px] rotate-180" />
              </button>

              <div className="flex-1 text-center">
                <span className="text-white/60 font-black text-xs uppercase tracking-widest block">
                  سؤال {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-gold-accent font-black text-base drop-shadow-sm">
                  {currentQuestion.category}
                </span>
                
                {/* Dynamically Styled Current Question Difficulty Badge */}
                <div className="flex justify-center mt-1">
                  <span className={cn(
                    "text-[10px] font-black px-2 py-0.5 rounded-full border shadow-sm",
                    currentQuestion.difficulty === 'easy' && "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
                    currentQuestion.difficulty === 'medium' && "bg-amber-500/20 text-amber-300 border-amber-500/30",
                    currentQuestion.difficulty === 'hard' && "bg-rose-500/20 text-rose-300 border-rose-500/30"
                  )}>
                    مرحلة: {currentQuestion.difficulty === 'easy' ? 'سهل' : currentQuestion.difficulty === 'medium' ? 'متوسط' : 'صعب'}
                  </span>
                </div>
              </div>

              <div className="flex gap-1.5 z-10 w-24 justify-end items-center h-8">
                <AnimatePresence mode="popLayout">
                  {[...Array(hearts)].map((_, i) => (
                    <motion.div 
                       key={i}
                       layout
                       initial={{ scale: 0 }}
                       animate={{ scale: 1, opacity: 1 }}
                       exit={{ scale: [1, 1.4, 0], opacity: [1, 1, 0] }}
                       transition={{ duration: 0.4, ease: "easeInOut" }}
                    >
                       <Heart 
                          size={20} 
                          fill="#f43f5e" 
                          className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                       />
                    </motion.div>
                  ))}
                  {[...Array(initialHeartsCount - hearts)].map((_, i) => (
                    <div key={`lost-${i}`} className="opacity-25">
                      <Heart size={20} className="text-white" />
                    </div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative flex-1 w-full mt-2 min-h-[380px]">
              <AnimatePresence initial={false}>
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: 100, scale: 0.95 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: -100, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="absolute inset-0 flex flex-col w-full"
                >
                  {/* Question Card */}
                  <div className="bg-white rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.2)] mb-6 relative border-b-8 border-neutral-200">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-md text-white font-black text-lg">
                      ?
                    </div>
                    <h3 className="text-indigo-950 font-black text-xl text-center leading-normal mt-3 min-h-[6.5rem] flex items-center justify-center">
                      {currentQuestion.question}
                    </h3>
                  </div>

                  {/* Answers List */}
                  <div className="flex flex-col gap-3.5 mb-6">
                    {currentQuestion.answers.map((answer, index) => {
                      const isCorrect = index === currentQuestion.correctIndex;
                      const isSelected = selectedAnswer === index;
                      const showResult = selectedAnswer !== null;
                      
                      let buttonClass = "bg-white/10 hover:bg-white/15 border border-white/20 text-white";
                      let contentClass = "text-white";
                      let icon = null;

                      if (showResult) {
                        if (isCorrect) {
                          buttonClass = "bg-emerald-500 border-none shadow-[0_10px_20px_rgba(16,185,129,0.3)] scale-[1.02] z-10 border-b-4 border-emerald-700";
                          contentClass = "text-white font-black";
                          icon = <CheckCircle2 size={22} className="text-white" />;
                        } else if (isSelected && !isCorrect) {
                          buttonClass = "bg-rose-500 border-none shadow-[0_10px_20px_rgba(244,63,94,0.3)] scale-[0.98] border-b-4 border-rose-700";
                          contentClass = "text-white font-black";
                          icon = <XCircle size={22} className="text-white" />;
                        } else {
                          buttonClass = "bg-white/5 border-white/5 opacity-40 scale-95";
                          contentClass = "text-white/50";
                        }
                      }

                      return (
                        <motion.button
                          key={index}
                          whileTap={!showResult ? { scale: 0.95 } : {}}
                          onClick={() => handleAnswerSelect(index)}
                          disabled={showResult}
                          className={cn(
                            "w-full text-right p-4 rounded-[1.25rem] transition-all duration-300 relative flex items-center justify-between",
                            buttonClass
                          )}
                        >
                          <span className={cn("text-base md:text-lg font-bold leading-normal relative z-10", contentClass)}>
                            {answer}
                          </span>
                          {icon && (
                            <motion.div 
                              initial={{ scale: 0, rotate: -45 }}
                              animate={{ scale: 1, rotate: 0 }}
                              className="relative z-10"
                            >
                              {icon}
                            </motion.div>
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* --- GAME OVER SCREEN --- */}
        {gameState === 'gameover' && (
          <motion.div
            key="gameover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full flex-1 w-full max-w-sm mx-auto px-4"
          >
             <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-28 h-28 mb-6 bg-rose-500/20 rounded-full flex flex-col items-center justify-center relative"
             >
                <Heart size={50} fill="#f43f5e" className="text-rose-500" />
                <XCircle size={26} className="text-white absolute mt-5 drop-shadow-md" />
             </motion.div>

            <h2 className="text-3xl font-black text-white mb-2 text-center">انتهت اللعبة!</h2>
            <p className="text-rose-400 font-bold mb-8 text-center text-base">استنفدت جميع المحاولات والقلوب المتاحة</p>

            <button
              onClick={() => initQuiz(selectedDifficulty)}
              className="w-full py-4 rounded-[1.5rem] bg-white text-rose-600 font-black text-xl flex items-center justify-center gap-3 active:scale-95 shadow-xl transition-all mb-4"
            >
              <RotateCcw size={22} />
              <span>حاول مرة أخرى بنفس المستوى</span>
            </button>
            
            <button
              onClick={() => setGameState('start')}
              className="w-full py-4 rounded-[1.5rem] bg-white/10 text-white font-bold text-base flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition-all border border-white/10"
            >
              تغيير المستوى والعودة
            </button>
          </motion.div>
        )}

        {/* --- WON SCREEN --- */}
        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full flex-1 w-full max-w-sm mx-auto relative px-4"
          >
            {/* Simple Confetti Effect */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`confetti-${i}`}
                initial={{ 
                  y: '100vh', 
                  x: `${(Math.random() - 0.5) * 100}vw`,
                  rotate: Math.random() * 360,
                  opacity: 1
                }}
                animate={{ 
                  y: '-20vh', 
                  x: `${(Math.random() - 0.5) * 100}vw`,
                  rotate: Math.random() * 720,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.5 
                }}
                className={cn(
                  "absolute w-4 h-4 rounded-sm border",
                  ['bg-gold-bright', 'bg-emerald-400', 'bg-indigo-400', 'bg-rose-400'][Math.floor(Math.random() * 4)]
                )}
                style={{ zIndex: 0 }}
              />
            ))}

             <motion.div 
                initial={{ y: 20, scale: 0.8 }}
                animate={{ y: [0, -10, 0], scale: 1 }}
                transition={{ y: { repeat: Infinity, duration: 2, ease: "easeInOut" }, scale: { type: "spring", bounce: 0.5 } }}
                className="relative mb-6 z-10"
             >
                <div className="absolute inset-0 bg-gold-accent blur-[50px] opacity-30 rounded-full" />
                <Trophy size={110} className="text-gold-accent drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)]" />
             </motion.div>

            <h2 className="text-3xl font-black text-white mb-2 z-10 drop-shadow-md text-center">مبارك الفوز 🎉<br/>لقد انتصرت بنجاح!</h2>
            <p className="text-emerald-300 font-bold mb-8 text-center text-base z-10 leading-relaxed">
              أجبت على {questions.length} سؤالاً متتالياً بنجاح باهر في المستوى {selectedDifficulty === 'easy' ? 'السهل' : selectedDifficulty === 'medium' ? 'المتوسط' : 'الصعب'}
            </p>

            <button
              onClick={() => initQuiz(selectedDifficulty)}
              className="w-full py-4.5 rounded-[1.5rem] bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-black text-lg flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all mb-4 z-10 border border-emerald-300/50"
            >
              <RotateCcw size={22} />
              <span>العب لعبة جديدة</span>
            </button>
            
            <button
              onClick={() => setGameState('start')}
              className="w-full py-4 rounded-[1.5rem] bg-white/10 text-white font-bold text-base flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition-all border border-white/10 z-10"
            >
              الذهاب لقائمة المستويات
            </button>
          </motion.div>
        )}

      </AnimatePresence>
      <BalloonAnimation show={showBalloons} exploding={balloonsExploding} />
    </div>
  );
}
