import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, Trophy, RotateCcw, CheckCircle2, XCircle, Sparkles, Heart } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/quizQuestions';
import { audioManager } from '../lib/audioManager';
import { cn } from '../lib/utils';
import { BalloonAnimation } from './BalloonPop';

// Helper to shuffle array
const shuffleArray = <T,>(array: T[]): T[] => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

interface QuizSectionProps {
  onBack: () => void;
}

const TOTAL_QUESTIONS = 10;
const INITIAL_HEARTS = 2;

type GameState = 'start' | 'playing' | 'gameover' | 'won';

export default function QuizSection({ onBack }: QuizSectionProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [hearts, setHearts] = useState(INITIAL_HEARTS);
  const [gameState, setGameState] = useState<GameState>('start');

  const [showBalloons, setShowBalloons] = useState(false);
  const [balloonsExploding, setBalloonsExploding] = useState(false);

  // Initialize quiz
  const initQuiz = useCallback(() => {
    audioManager.unlock();
    const shuffled = shuffleArray(QUIZ_QUESTIONS).slice(0, TOTAL_QUESTIONS);
    setQuestions(shuffled);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setHearts(INITIAL_HEARTS);
    setGameState('playing');
    setShowBalloons(false);
    setBalloonsExploding(false);
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
      
      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          audioManager.play('whoosh');
          setCurrentIndex((prev) => prev + 1);
          setSelectedAnswer(null);
        } else {
          audioManager.play('win');
          setGameState('won');
        }
      }, 1200);

    } else {
      vibrate([100, 50, 100]);
      
      // 1. Play wrong answer sound FIRST
      await audioManager.play('beep');
      
      // 2. Start balloon pop animation
      setShowBalloons(true);
      
      // Wait for balloons to inflate slightly
      await new Promise(r => setTimeout(r, 400));
      
      // 3. Exactly at animation impact moment: play pop
      audioManager.play('pop');
      setBalloonsExploding(true);
      
      // Cleanup balloons after explosion
      setTimeout(() => {
        setShowBalloons(false);
        setBalloonsExploding(false);
      }, 500);
      
      // Proceed with removing a heart and changing game state
      setHearts((prev) => {
        const newHearts = prev - 1;
        
        setTimeout(() => {
          if (newHearts <= 0) {
            audioManager.play('lose');
            setGameState('gameover');
          } else {
            if (currentIndex < questions.length - 1) {
              audioManager.play('whoosh');
              setCurrentIndex((idx) => idx + 1);
              setSelectedAnswer(null);
            } else {
              audioManager.play('win');
              setGameState('won');
            }
          }
        }, 1200);
        
        return newHearts;
      });
    }
  };

  const currentQuestion = questions[currentIndex];

  return (
    <div className="flex flex-col min-h-[calc(100vh-6rem)] pb-32 relative">
      <AnimatePresence mode="wait">

        {/* --- START SCREEN --- */}
        {gameState === 'start' && (
          <motion.div
            key="start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center flex-1 w-full max-w-sm mx-auto"
          >
            <button 
              onClick={onBack}
              className="absolute top-6 right-0 w-12 h-12 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 shadow-md"
            >
              <ChevronLeft size={28} className="translate-x-[2px] rotate-180" />
            </button>

            <motion.div 
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="w-40 h-40 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mb-8 shadow-[0_20px_50px_rgba(16,185,129,0.4)] border-4 border-white/20 relative"
            >
              <Trophy size={70} className="text-white drop-shadow-md" />
              <Sparkles className="absolute top-4 right-4 text-gold-bright animate-pulse" size={24} />
            </motion.div>
            
            <h1 className="text-4xl font-black text-white mb-2 text-center drop-shadow-md">مسابقات الأنبياء</h1>
            <p className="text-white/70 text-center mb-10 font-bold">اختبر معلوماتك في قصص الأنبياء</p>
            
            <button
              onClick={initQuiz}
              className="w-full h-16 rounded-[2rem] bg-gradient-to-r from-gold-bright to-gold-accent text-emerald-950 font-black text-2xl shadow-[0_15px_30px_rgba(212,175,55,0.3)] hover:brightness-110 active:scale-95 transition-all flex items-center justify-center border border-gold-bright/50"
            >
              ابدأ المسابقة
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
            className="flex flex-col flex-1 w-full max-w-sm mx-auto pt-6"
          >
            <div className="flex justify-between items-center mb-8 px-2">
               <button 
                onClick={onBack}
                className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all active:scale-95 z-10"
              >
                <ChevronLeft size={24} className="translate-x-[2px] rotate-180" />
              </button>

              <div className="flex-1 text-center">
                <span className="text-white/60 font-black text-sm uppercase tracking-widest block">
                  سؤال {currentIndex + 1} / {questions.length}
                </span>
                <span className="text-gold-accent font-bold text-lg drop-shadow-sm">
                  {currentQuestion.category}
                </span>
              </div>

              <div className="flex gap-2 z-10 w-20 justify-end items-center h-8">
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
                          size={24} 
                          fill="#f43f5e" 
                          className="text-rose-500 drop-shadow-[0_0_10px_rgba(244,63,94,0.5)]" 
                       />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>

            <div className="relative flex-1 w-full mt-2">
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
                <div className="bg-white rounded-[2.5rem] p-8 shadow-[0_20px_40px_rgba(0,0,0,0.2)] mb-8 relative border-b-8 border-neutral-200">
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center border-4 border-white shadow-md text-white font-black text-xl">
                    ?
                  </div>
                  <h3 className="text-indigo-950 font-black text-2xl text-center leading-normal mt-4 min-h-[6rem] flex items-center justify-center">
                    {currentQuestion.question}
                  </h3>
                </div>

                {/* Answers List */}
                <div className="flex flex-col gap-4 mb-8">
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
                        icon = <CheckCircle2 size={24} className="text-white" />;
                      } else if (isSelected && !isCorrect) {
                        buttonClass = "bg-rose-500 border-none shadow-[0_10px_20px_rgba(244,63,94,0.3)] scale-[0.98] border-b-4 border-rose-700";
                        contentClass = "text-white font-black";
                        icon = <XCircle size={24} className="text-white" />;
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
                          "w-full text-right p-5 rounded-[1.5rem] transition-all duration-300 relative flex items-center justify-between",
                          buttonClass
                        )}
                      >
                        <span className={cn("text-lg font-bold leading-normal relative z-10", contentClass)}>
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
            className="flex flex-col items-center justify-center h-full flex-1 w-full max-w-sm mx-auto"
          >
             <motion.div 
                initial={{ y: 0 }}
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="w-32 h-32 mb-6 bg-rose-500/20 rounded-full flex flex-col items-center justify-center"
             >
                <Heart size={60} fill="#f43f5e" className="text-rose-500" />
                <XCircle size={30} className="text-white absolute mt-6 drop-shadow-md" />
             </motion.div>

            <h2 className="text-4xl font-black text-white mb-2">انتهت اللعبة!</h2>
            <p className="text-rose-400 font-bold mb-10 text-lg">لقد استنفدت محاولاتك</p>

            <button
              onClick={initQuiz}
              className="w-full py-5 rounded-[1.5rem] bg-white text-rose-600 font-black text-xl flex items-center justify-center gap-3 active:scale-95 shadow-xl transition-all mb-4"
            >
              <RotateCcw size={24} />
              <span>العب مرة أخرى</span>
            </button>
            
            <button
              onClick={onBack}
              className="w-full py-4 rounded-[1.5rem] bg-white/10 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition-all border border-white/10"
            >
              العودة للرئيسية
            </button>
          </motion.div>
        )}

        {/* --- WON SCREEN --- */}
        {gameState === 'won' && (
          <motion.div
            key="won"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center h-full flex-1 w-full max-w-sm mx-auto relative"
          >
            {/* Simple Confetti Effect using multiple shapes */}
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
                <Trophy size={140} className="text-gold-accent drop-shadow-[0_10px_20px_rgba(212,175,55,0.4)]" />
             </motion.div>

            <h2 className="text-4xl font-black text-white mb-2 z-10 drop-shadow-md text-center">مبروك 🎉<br/>لقد فزت!</h2>
            <p className="text-emerald-300 font-bold mb-10 text-lg z-10 text-center">أجبت على جميع الأسئلة ببراعة</p>

            <button
              onClick={initQuiz}
              className="w-full py-5 rounded-[1.5rem] bg-gradient-to-r from-emerald-500 to-emerald-400 text-white font-black text-xl flex items-center justify-center gap-3 shadow-[0_15px_30px_rgba(16,185,129,0.3)] active:scale-95 transition-all mb-4 z-10 border border-emerald-300/50"
            >
              <RotateCcw size={24} />
              <span>العب مرة أخرى</span>
            </button>
            
            <button
              onClick={onBack}
              className="w-full py-4 rounded-[1.5rem] bg-white/10 text-white font-bold text-lg flex items-center justify-center gap-3 hover:bg-white/20 active:scale-95 transition-all border border-white/10 z-10"
            >
              العودة للرئيسية
            </button>
          </motion.div>
        )}

      </AnimatePresence>
      <BalloonAnimation show={showBalloons} exploding={balloonsExploding} />
    </div>
  );
}

