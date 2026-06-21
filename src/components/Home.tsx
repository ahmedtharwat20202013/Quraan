import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Book, 
  Heart, 
  CircleDot, 
  ChevronRight, 
  ArrowLeft, 
  BookOpen, 
  Smartphone, 
  ShieldCheck, 
  Trophy, 
  Volume2, 
  HandHeart,
  CalendarDays,
  Settings
} from 'lucide-react';
import { AppState, Surah } from '../types';
import { SURAHS } from '../constants';
import { cn } from '../lib/utils';
import { isAppInstallable, installPWA } from '../registerSW';
import { ProgressService } from '../services/progress';

interface HomeProps {
  state: AppState;
  onNavigate: (screen: any) => void;
  onSurahClick: (surah: Surah) => void;
}

export default function Home({ state, onNavigate, onSurahClick }: HomeProps) {
  // Try retrieving reading progress
  const progress = ProgressService.getQuranProgress();
  const lastReadSurah = progress 
    ? SURAHS.find(s => s.number === progress.surahNumber) 
    : (state.lastRead ? SURAHS.find(s => s.number === state.lastRead?.surahNumber) : null);

  const savedPage = progress ? progress.pageNumber : (state.lastRead ? state.lastRead.pageNumber : 1);

  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('pwa_install_banner_dismissed') === 'true';
  });

  useEffect(() => {
    setIsInstallable(isAppInstallable());
    const handleInstallable = () => setIsInstallable(true);
    window.addEventListener('pwa-installable', handleInstallable);
    return () => {
      window.removeEventListener('pwa-installable', handleInstallable);
    };
  }, []);

  const handleInstallClick = async () => {
    const success = await installPWA();
    if (success) {
      setIsInstallable(false);
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    localStorage.setItem('pwa_install_banner_dismissed', 'true');
  };

  // Natively calculate Hijri date with exactly high precision
  const hijriToday = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date());

  return (
    <div className="space-y-6 py-4">
      {/* Header and Welcome */}
      <header className="flex justify-between items-center pb-2 border-b border-white/5">
        <div className="space-y-1">
          <h1 className="text-3xl font-black text-white tracking-tight">حقيبة المسلم</h1>
          <p className="text-gold-accent text-xs font-bold tracking-wide">
            أهلاً ومرحباً بك يا أخي المسلم • {hijriToday}
          </p>
        </div>
        <button 
          onClick={() => onNavigate('settings')}
          className="p-2.5 rounded-2xl bg-white/5 border border-white/10 text-white/50 hover:text-white transition-all active:scale-95"
          title="الإعدادات"
        >
          <Settings size={20} />
        </button>
      </header>

      {/* PWA Installation Banner */}
      <AnimatePresence>
        {isInstallable && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="p-5 rounded-[2rem] bg-gradient-to-br from-gold-accent/20 to-emerald-950/40 border border-gold-accent/30 relative overflow-hidden shadow-xl"
          >
            <div className="relative z-10 flex flex-col gap-3">
              <div className="flex items-start justify-between gap-3">
                <div className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0">
                    <Smartphone size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-white">تثبيت التطبيق على الهواتف</h4>
                    <p className="text-[11px] text-white/60 mt-0.5 leading-relaxed">
                      حمّل التطبيق الآن ليتثبت كـ App وبشكل كامل أوفلاين مع سرعة تصفح فائقة.
                    </p>
                  </div>
                </div>
                <button onClick={handleDismiss} className="text-white/40 hover:text-white p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex justify-end">
                <button
                  onClick={handleInstallClick}
                  className="px-4 py-2 bg-gold-accent text-islamic-dark font-black text-[10px] rounded-lg tracking-wide hover:bg-white transition-all active:scale-95 flex items-center gap-1 shadow-md"
                >
                  <ShieldCheck size={12} />
                  تثبيت الآن
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Reading Card */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => lastReadSurah && onSurahClick(lastReadSurah)}
        className="bg-gradient-to-br from-emerald-900/60 to-emerald-950/80 border border-gold-accent/20 rounded-3xl p-6 relative overflow-hidden cursor-pointer shadow-xl group border-l-4 border-l-gold-accent"
      >
        <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Book size={100} className="rotate-12 translate-x-2 -translate-y-2 text-gold-accent" />
        </div>
        
        <div className="flex justify-between items-start">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gold-accent/15 text-gold-accent rounded-full text-[10px] font-black uppercase tracking-widest border border-gold-accent/10">
              متابعة القراءة اليومية
            </span>
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-white flex items-center gap-2">
                {lastReadSurah ? lastReadSurah.name : 'سورة الفاتحة'}
              </h2>
              <p className="text-white/60 text-xs">
                {lastReadSurah 
                  ? `أخر ما قرأت: صفحة ${savedPage}` 
                  : 'اقرأ تلاوتك اليومية واحفظ تقدمك في المصحف'}
              </p>
            </div>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-gold-accent">
            <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
          </div>
        </div>
      </motion.div>

      {/* Verse of the Day Card */}
      <div className="bg-gradient-to-br from-white/5 to-white/[0.01] border border-white/10 rounded-3xl p-6 relative overflow-hidden shadow-2xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-gold-accent animate-ping" />
          <span className="text-gold-accent/80 text-[10px] font-black uppercase tracking-[0.3em]">آية اليوم العطرة</span>
        </div>
        
        <p className="font-arabic text-xl sm:text-2xl text-white font-extrabold leading-loose text-center drop-shadow-md">
          {state.dailyVerse?.text || "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا وَسَبِّحُوهُ بُكْرَةً وَأَصِيلًا"}
        </p>

        <div className="flex justify-center items-center gap-2 text-gold-accent/60 text-xs font-bold border-t border-white/5 pt-3">
          <CalendarDays size={14} />
          <span>{state.dailyVerse ? `سورة ${state.dailyVerse.surahName} • الآية ${state.dailyVerse.reference}` : "سورة الأحزاب • الآية ٤١ - ٤٢"}</span>
        </div>
      </div>

      {/* Listening Card Shortcut */}
      <motion.div 
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('listen')}
        className="bg-white/5 border border-white/10 hover:border-gold-accent/30 rounded-3xl p-5 flex items-center justify-between cursor-pointer group transition-all relative overflow-hidden shadow-lg"
      >
        <div className="flex items-center gap-4 text-right">
          <div className="w-10 h-10 rounded-2xl bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0 group-hover:bg-gold-accent group-hover:text-islamic-dark transition-all">
            <Volume2 size={20} />
          </div>
          <div>
            <h3 className="font-bold text-sm text-white group-hover:text-gold-accent transition-colors">مكتبة التلاوات العطرة</h3>
            <p className="text-[10px] text-white/40 mt-0.5 max-w-[240px]">أكثر من ١٠٠ قارئ بروايات حفص وورش والعديد من الشيوخ.</p>
          </div>
        </div>
        <ChevronRight size={16} className="text-white/20 group-hover:text-gold-accent transition-colors rotate-180" />
      </motion.div>

      {/* Quick Features 2x2 Grid */}
      <div className="space-y-3 pb-6">
        <h3 className="text-xs font-black text-white/40 uppercase tracking-widest">خدمات سريعة</h3>
        <div className="grid grid-cols-2 gap-3">
          {/* Stories */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('stories')}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-accent/30 flex items-center gap-3 text-right cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-gold-accent/15 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-islamic-dark transition-all shrink-0">
              <BookOpen size={18} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-gold-accent">قصص الأنبياء</h4>
              <p className="text-[8px] text-white/30">قصص من الوعي والتعليم</p>
            </div>
          </motion.button>

          {/* Duas */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('duas')}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-accent/30 flex items-center gap-3 text-right cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all shrink-0">
              <HandHeart size={18} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-emerald-400">حصن المسلم والأذكار</h4>
              <p className="text-[8px] text-white/30">أدعية يومية وأذكار</p>
            </div>
          </motion.button>

          {/* Tasbeeh */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('tasbeeh')}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-accent/30 flex items-center gap-3 text-right cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-violet-500/15 flex items-center justify-center text-violet-400 group-hover:bg-violet-500 group-hover:text-white transition-all shrink-0">
              <CircleDot size={18} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-violet-400">المُسبّحة الذكية</h4>
              <p className="text-[8px] text-white/30">تسبيح مَرن وهزاز</p>
            </div>
          </motion.button>

          {/* Quiz */}
          <motion.button 
            whileTap={{ scale: 0.97 }}
            onClick={() => onNavigate('quiz')}
            className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 hover:border-gold-accent/30 flex items-center gap-3 text-right cursor-pointer group transition-all"
          >
            <div className="w-10 h-10 rounded-xl bg-rose-500/15 flex items-center justify-center text-rose-400 group-hover:bg-rose-500 group-hover:text-white transition-all shrink-0">
              <Trophy size={18} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-white group-hover:text-rose-400">مسابقة الأنبياء</h4>
              <p className="text-[8px] text-white/30">مسابقات دينية ٢٠٠سؤال</p>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
