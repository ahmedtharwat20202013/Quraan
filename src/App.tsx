/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
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
  Volume2,
  Clock,
  Sparkles,
  X,
  Plus
} from 'lucide-react';
import { cn } from './lib/utils';
import { SURAHS } from './constants';
import { Surah, AppState } from './types';

// Components
import Home from './components/Home';
import PrayerSection from './components/PrayerSection';
import QuranSection from './components/QuranSection';
import RecitationsSection from './components/RecitationsSection';
import DuasSection from './components/DuasSection';
import TasbeehSection from './components/TasbeehSection';
import SettingsSection from './components/SettingsSection';
import SurahReader from './components/SurahReader';
import StoriesSection from './components/StoriesSection';
import QuizSection from './components/QuizSection';
import GlobalMiniPlayer from './components/GlobalMiniPlayer';
import OfflineBanner from './components/ui/OfflineBanner';

type Screen = 'home' | 'prayer' | 'quran' | 'listen' | 'duas' | 'stories' | 'tasbeeh' | 'settings' | 'reader' | 'quiz';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [previousScreen, setPreviousScreen] = useState<Screen>('home');
  const [selectedSurah, setSelectedSurah] = useState<Surah | null>(null);
  
  // Sheet state for FAB launcher
  const [isOpenServicesSheet, setIsOpenServicesSheet] = useState<boolean>(false);

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

  const mainRef = useRef<HTMLElement>(null);

  // Scroll to top on screen change
  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.scrollTop = 0;
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
    document.body.scrollTo({ top: 0, behavior: 'instant' });
  }, [currentScreen]);

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

  // Custom navigation handler that automatically shuts the bottom sheet
  const handleNavigation = (screen: Screen) => {
    setIsOpenServicesSheet(false);
    setCurrentScreen(screen);
  };

  return (
    <div 
      dir="rtl"
      className={cn(
        "min-h-screen flex flex-col max-w-md mx-auto relative shadow-2xl transition-colors duration-500",
        state.darkMode ? "bg-black" : "bg-neutral-950" // High contrast eye-safe deep slate-black color
      )}
    >
      {/* Offline Status Check Banner */}
      <OfflineBanner />

      {/* Dynamic Background Glow Pattern */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[80%] h-[50%] bg-gold-accent/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-[80%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,1) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Main Container Content */}
      <main ref={mainRef} className="flex-1 relative z-10 overflow-y-auto pb-32">
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
                onNavigate={(scr) => handleNavigation(scr as Screen)} 
                onSurahClick={handleSurahClick}
              />
            </motion.div>
          )}

          {currentScreen === 'prayer' && (
            <motion.div
              key="prayer"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
            >
              <PrayerSection />
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

          {currentScreen === 'listen' && (
            <motion.div
              key="listen"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-6"
            >
              <RecitationsSection />
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
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              className="p-6"
            >
              <div className="pb-6">
                <button 
                  onClick={() => handleNavigation('home')}
                  className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 hover:text-white"
                >
                  <ChevronLeft size={14} className="rotate-180" />
                  رجوع للرئيسية
                </button>
                <DuasSection />
              </div>
            </motion.div>
          )}

          {currentScreen === 'stories' && (
            <motion.div
              key="stories"
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 25 }}
              className="p-6"
            >
              <div className="pb-6">
                <button 
                  onClick={() => handleNavigation('home')}
                  className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 hover:text-white"
                >
                  <ChevronLeft size={14} className="rotate-180" />
                  رجوع للرئيسية
                </button>
                <StoriesSection />
              </div>
            </motion.div>
          )}

          {currentScreen === 'quiz' && (
            <motion.div
              key="quiz"
              className="fixed inset-0 bg-neutral-950 z-50 overflow-y-auto"
            >
              <div className="p-6">
                <QuizSection onBack={() => handleNavigation('home')} />
              </div>
            </motion.div>
          )}

          {currentScreen === 'tasbeeh' && (
            <motion.div
              key="tasbeeh"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="p-6"
            >
              <div className="pb-6">
                <button 
                  onClick={() => handleNavigation('home')}
                  className="mb-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 text-xs text-white/60 hover:text-white"
                >
                  <ChevronLeft size={14} className="rotate-180" />
                  رجوع للرئيسية
                </button>
                <TasbeehSection />
              </div>
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
                onBack={() => handleNavigation('home')} 
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Mini Player for audio recitations */}
      {currentScreen !== 'reader' && currentScreen !== 'quiz' && <GlobalMiniPlayer />}

      {/* Drawer / Service Launcher Overlay (Pristine Bottom Sheet) */}
      <AnimatePresence>
        {isOpenServicesSheet && (
          <>
            {/* Backdrop */}
            <motion.div
              id="services-sheet-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpenServicesSheet(false)}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-md max-w-md mx-auto"
            />

            {/* Sheet itself */}
            <motion.div
              id="services-sheet"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed bottom-0 left-0 right-0 max-w-md mx-auto z-50 bg-[#121212] rounded-t-[2.5rem] border-t border-white/10 p-6 space-y-6 shadow-2xl"
            >
              {/* Drag Handle Indicator */}
              <div className="w-12 h-1 bg-white/10 rounded-full mx-auto" />

              {/* Title & Close Header */}
              <div className="flex justify-between items-center pb-2 border-b border-white/5">
                <div>
                  <h3 className="text-lg font-black text-white">الخدمات الإسلامية</h3>
                  <p className="text-[10px] text-gold-accent font-bold uppercase tracking-wider">سلسلة من العبادات والأذكار والمسابقات</p>
                </div>
                <button 
                  onClick={() => setIsOpenServicesSheet(false)}
                  className="p-2 rounded-full bg-white/5 border border-white/10 text-white/40 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* 2x2 Services Grid inside Bottom Sheet */}
              <div className="grid grid-cols-2 gap-4">
                {/* 1. Prophet Stories */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavigation('stories')}
                  className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-gold-accent/20 flex flex-col items-center justify-center text-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-gold-accent/15 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-islamic-dark transition-all shadow-inner">
                    <BookOpen size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">قصص الأنبياء 📚</h4>
                    <p className="text-[8px] text-white/35 mt-0.5">قصص الأنبياء لجميع الأعمار</p>
                  </div>
                </motion.button>

                {/* 2. Duas & Adhkar */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavigation('duas')}
                  className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-emerald-500/20 flex flex-col items-center justify-center text-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-inner">
                    <HandHeart size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">الأذكار والتحصين 🤲</h4>
                    <p className="text-[8px] text-white/35 mt-0.5">أذكار الصباح، المساء، والنوم</p>
                  </div>
                </motion.button>

                {/* 3. Electronic Tasbeeh */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavigation('tasbeeh')}
                  className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-violet-500/20 flex flex-col items-center justify-center text-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-violet-500/15 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all shadow-inner">
                    <CircleDot size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">المُسبّحة الذكية 📿</h4>
                    <p className="text-[8px] text-white/35 mt-0.5">سبح واحتسب الأجر مع الهزاز</p>
                  </div>
                </motion.button>

                {/* 4. Quiz Contests */}
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => handleNavigation('quiz')}
                  className="p-5 rounded-3xl bg-white/[0.03] border border-white/5 hover:border-rose-500/20 flex flex-col items-center justify-center text-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-2xl bg-rose-500/15 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all shadow-inner">
                    <Trophy size={22} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">مسابقة الأنبياء 🏆</h4>
                    <p className="text-[8px] text-white/35 mt-0.5">٢٠٠ سؤال تفاعلي مشوق ممتع</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom Navigation Bar */}
      {currentScreen !== 'reader' && currentScreen !== 'quiz' && (
        <div id="bottom-main-nav" className="fixed bottom-8 left-0 right-0 max-w-md mx-auto z-40 px-6">
          <nav className="bg-[#141414]/90 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-2 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.6)] overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none" />
            
            {/* 1. Home Tab Item */}
            <button
              onClick={() => handleNavigation('home')}
              className={cn(
                "flex-1 py-3 flex flex-col items-center gap-1 transition-all relative rounded-3xl group",
                currentScreen === 'home' ? "text-gold-accent" : "text-white/30 hover:text-white/60"
              )}
            >
              <LayoutGrid size={22} className="relative z-10" />
              <span className="text-[9px] font-black z-10">الرئيسية</span>
              {currentScreen === 'home' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 rounded-2xl -z-0" />
              )}
            </button>

            {/* 2. Prayer Tab Item */}
            <button
              onClick={() => handleNavigation('prayer')}
              className={cn(
                "flex-1 py-3 flex flex-col items-center gap-1 transition-all relative rounded-3xl group",
                currentScreen === 'prayer' ? "text-gold-accent" : "text-white/30 hover:text-white/60"
              )}
            >
              <Clock size={22} className="relative z-10" />
              <span className="text-[9px] font-black z-10">الصلاة</span>
              {currentScreen === 'prayer' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 rounded-2xl -z-0" />
              )}
            </button>

            {/* 3. Central FAB Launcher Button */}
            <div className="flex-1 flex justify-center -translate-y-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                onClick={() => setIsOpenServicesSheet(!isOpenServicesSheet)}
                className="w-14 h-14 bg-gradient-to-br from-gold-accent to-amber-500 rounded-full flex items-center justify-center text-neutral-950 shadow-[0_8px_24px_rgba(212,175,55,0.4)] border-4 border-neutral-900 focus:outline-none relative z-50 shrink-0"
              >
                <Plus size={28} className={cn("transition-transform duration-300", isOpenServicesSheet ? "rotate-45" : "rotate-0")} strokeWidth={3} />
              </motion.button>
            </div>

            {/* 4. Quran Tab Item */}
            <button
              onClick={() => handleNavigation('quran')}
              className={cn(
                "flex-1 py-3 flex flex-col items-center gap-1 transition-all relative rounded-3xl group",
                currentScreen === 'quran' ? "text-gold-accent" : "text-white/30 hover:text-white/60"
              )}
            >
              <BookOpen size={22} className="relative z-10" />
              <span className="text-[9px] font-black z-10">المصحف</span>
              {currentScreen === 'quran' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 rounded-2xl -z-0" />
              )}
            </button>

            {/* 5. Listening Tab Item */}
            <button
              onClick={() => handleNavigation('listen')}
              className={cn(
                "flex-1 py-3 flex flex-col items-center gap-1 transition-all relative rounded-3xl group",
                currentScreen === 'listen' ? "text-gold-accent" : "text-white/30 hover:text-white/60"
              )}
            >
              <Volume2 size={22} className="relative z-10" />
              <span className="text-[9px] font-black z-10">الاستماع</span>
              {currentScreen === 'listen' && (
                <motion.div layoutId="nav-bg" className="absolute inset-0 bg-white/5 rounded-2xl -z-0" />
              )}
            </button>
          </nav>
        </div>
      )}
    </div>
  );
}
