/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutGrid,
  Book,
  HandHeart,
  CircleDot,
  Settings,
  BookOpen,
  ChevronLeft,
  Trophy,
} from 'lucide-react';
import { cn } from './lib/utils';
import { SURAHS, DUAS } from './constants';
import { Surah, Dua, AppState, Bookmark, DailyVerse } from './types';

// Components
import Home from './components/Home';
import QuranSection from './components/QuranSection';
import DuasSection from './components/DuasSection';
import TasbeehSection from './components/TasbeehSection';
import SettingsSection from './components/SettingsSection';
import SurahReader from './components/SurahReader';
import StoriesSection from './components/StoriesSection';
import QuizSection from './components/QuizSection';

type Screen = 'home' | 'quran' | 'duas' | 'stories' | 'tasbeeh' | 'settings' | 'reader' | 'quiz';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem('quran_light_state');
    return saved ? JSON.parse(saved) : {
      lastRead: null,
      bookmarks: [],
      favorites: [],
      darkMode: false,
      fontSize: 18,
    };
  });

  useEffect(() => {
    localStorage.setItem('quran_light_state', JSON.stringify(state));
  }, [state]);

  const handleSurahClick = useCallback((surah: Surah) => {
    setSelectedSurah(surah);
    setPreviousScreen(currentScreen);
    setCurrentScreen('reader');
    setState(prev => ({
      ...prev,
      lastRead: {
        surahNumber: surah.number,
        pageNumber: surah.startPage || 1,
        timestamp: Date.now()
      }
    }));
  }, [currentScreen]);

  const handleProgressUpdate = useCallback((surahNumber: number, pageNumber: number) => {
    setState(prev => {
      // Avoid redundant state updates if the page hasn't changed for the same surah
      if (prev.lastRead?.surahNumber === surahNumber && prev.lastRead?.pageNumber === pageNumber) {
        return prev;
      }
      return {
        ...prev,
        lastRead: {
          surahNumber,
          pageNumber,
          timestamp: Date.now()
        }
      };
    });
  }, []);

  const navItems = [
    { id: 'home', icon: LayoutGrid, label: 'الرئيسية' },
    { id: 'quran', icon: Book, label: 'المصحف' },
    { id: 'duas', icon: HandHeart, label: 'الأذكار' },
    { id: 'stories', icon: BookOpen, label: 'قصص' },
    { id: 'quiz', icon: Trophy, label: 'المسابقات' },
    { id: 'tasbeeh', icon: CircleDot, label: 'التسبيح' },
    { id: 'settings', icon: Settings, label: 'الإعدادات' },
  ];

  return (
    <div 
      dir="rtl"
      className={cn(
        "min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl transition-colors duration-500",
        state.darkMode ? "bg-black" : "bg-islamic-green"
      )}
    >
      {/* Dynamic Background Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-gold-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[80%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      <main className="flex-1 relative z-10 overflow-y-auto pb-24">
        <AnimatePresence mode="wait">
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-6"
            >
              <Home 
                state={state} 
                onNavigate={setCurrentScreen} 
                onSurahClick={handleSurahClick}
              />
            </motion.div>
          )}

          {currentScreen === 'quran' && (
            <motion.div
              key="quran"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6"
            >
              <QuranSection onSurahClick={handleSurahClick} />
            </motion.div>
          )}

          {currentScreen === 'reader' && selectedSurah && (
            <motion.div
              key="reader"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 z-50 bg-black"
            >
              <SurahReader 
                surah={selectedSurah} 
                onBack={() => setCurrentScreen(previousScreen)}
                onProgressUpdate={handleProgressUpdate}
                fontSize={state.fontSize}
                initialPage={state.lastRead?.surahNumber === selectedSurah.number ? state.lastRead.pageNumber : undefined}
              />
            </motion.div>
          )}

          {currentScreen === 'duas' && (
            <motion.div
              key="duas"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6"
            >
              <DuasSection />
            </motion.div>
          )}

          {currentScreen === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6"
            >
              <StoriesSection />
            </motion.div>
          )}

          {currentScreen === 'quiz' && (
            <motion.div
              key="quiz"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="px-6 h-full"
            >
              <QuizSection onBack={() => setCurrentScreen('home')} />
            </motion.div>
          )}

          {currentScreen === 'tasbeeh' && (
            <motion.div
              key="tasbeeh"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6 h-full flex flex-col justify-center"
            >
              <TasbeehSection />
            </motion.div>
          )}

          {currentScreen === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="p-6"
            >
              <SettingsSection 
                state={state} 
                setState={setState} 
                onBack={() => setCurrentScreen('home')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Navigation Bar */}
      {currentScreen !== 'reader' && (
        <div className="fixed bottom-8 left-0 right-0 max-w-md mx-auto z-40 px-8">
          <nav className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 flex justify-around items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setCurrentScreen(item.id as Screen)}
                className={cn(
                  "flex-1 py-4 flex flex-col items-center gap-1.5 transition-all relative overflow-hidden rounded-3xl group",
                  currentScreen === item.id ? "text-gold-accent" : "text-white/30 hover:text-white/60"
                )}
              >
                {currentScreen === item.id && (
                  <>
                    <motion.div 
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-gold-accent/10"
                      transition={{ type: 'spring', damping: 25, stiffness: 400 }}
                    />
                    <motion.div 
                      layoutId="nav-glow"
                      className="absolute -bottom-4 w-12 h-8 bg-gold-accent blur-[20px] opacity-20"
                    />
                  </>
                )}
                
                <div className={cn(
                  "relative z-10 transition-transform duration-300",
                  currentScreen === item.id ? "scale-110 -translate-y-0.5" : "group-hover:scale-110"
                )}>
                  <item.icon 
                    size={24} 
                    strokeWidth={currentScreen === item.id ? 2.5 : 2}
                    fill={currentScreen === item.id ? "currentColor" : "none"}
                    className={cn(currentScreen === item.id ? "fill-gold-accent/20" : "")}
                  />
                </div>
                
                <span className={cn(
                  "text-[8px] font-black uppercase tracking-[0.2em] relative z-10 transition-all",
                  currentScreen === item.id ? "opacity-100" : "opacity-0 scale-75"
                )}>
                  {item.label}
                </span>
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
