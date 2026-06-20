import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Book, Heart, CircleDot, ChevronRight, ArrowLeft, BookOpen, Smartphone, ShieldCheck, WifiOff, Trophy, Volume2 } from 'lucide-react';
import { AppState, Surah } from '../types';
import { SURAHS } from '../constants';
import { cn } from '../lib/utils';
import { isAppInstallable, installPWA } from '../registerSW';

interface HomeProps {
  state: AppState;
  onNavigate: (screen: any) => void;
  onSurahClick: (surah: Surah) => void;
}

export default function Home({ state, onNavigate, onSurahClick }: HomeProps) {
  const lastReadSurah = state.lastRead ? SURAHS.find(s => s.number === state.lastRead?.surahNumber) : null;
  const [isInstallable, setIsInstallable] = useState(false);
  const [isDismissed, setIsDismissed] = useState(() => {
    return localStorage.getItem('pwa_install_banner_dismissed') === 'true';
  });

  useEffect(() => {
    // Check initial status
    setIsInstallable(isAppInstallable());

    const handleInstallable = () => {
      setIsInstallable(true);
    };

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

  return (
    <div className="space-y-8 py-4">
      {/* Header */}
      <header className="flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-1">حقيبة المسلم</h1>
          <p className="text-gold-accent text-xs font-medium tracking-wide">أهـلاً بـك يـا أخـي المسـلم • تصفح واستمع للتلاوات العطرة</p>
        </div>
      </header>

      {/* PWA Installation Banner */}
      <AnimatePresence>
        {isInstallable && !isDismissed && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="p-6 rounded-[2rem] bg-gradient-to-br from-gold-accent/20 to-emerald-800/20 border border-gold-accent/30 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 left-0 p-4 opacity-10">
              <Smartphone size={100} className="-rotate-12 translate-x-4 -translate-y-4" />
            </div>
            
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex gap-3">
                  <div className="w-10 h-10 rounded-full bg-gold-accent/20 flex items-center justify-center text-gold-accent shrink-0">
                    <Smartphone size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-base text-white">تثبيت التطبيق على الموبايل</h4>
                    <p className="text-xs text-white/70 mt-0.5 leading-relaxed">
                      حمّل التطبيق الآن على هاتفكم ليكون رفيقكم الدائم بدون الحاجة لإنترنت كحقيبة متكاملة.
                    </p>
                  </div>
                </div>
                <button 
                  onClick={handleDismiss}
                  className="text-white/40 hover:text-white transition-colors p-1"
                  title="إغلاق التنبيه"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="flex gap-2 justify-end">
                <button
                  onClick={handleInstallClick}
                  className="px-5 py-2.5 bg-gold-accent text-emerald-950 font-bold text-xs rounded-xl hover:bg-white hover:text-emerald-900 transition-all active:scale-95 flex items-center gap-1.5 shadow-md"
                >
                  <ShieldCheck size={14} />
                  تثبيت الآن
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Card (Continue Reading) */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => lastReadSurah && onSurahClick(lastReadSurah)}
        className="glass-card-accent p-8 relative overflow-hidden group cursor-pointer"
      >
        <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
          <Book size={120} className="rotate-[15deg]" />
        </div>
        
        <div className="relative z-10 space-y-4">
          <span className="inline-flex items-center gap-2 px-3 py-1 bg-gold-accent text-islamic-dark rounded-full text-[10px] font-bold uppercase tracking-wider">
            تابِع القراءة
          </span>
          <div className="space-y-1">
            <h2 className="text-3xl font-bold flex items-center gap-2">
              {lastReadSurah ? lastReadSurah.name : 'بداية القراءة'}
              <ArrowLeft size={24} className="text-gold-accent mr-auto" />
            </h2>
            <p className="text-white/60 text-sm">
              {lastReadSurah 
                ? `وصلت لصفحة ${state.lastRead?.pageNumber || 1} في سورة ${lastReadSurah.name}` 
                : 'تصفح السور وابدأ وردك اليومي'}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Daily Verse */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card-accent p-10 border border-gold-accent/20 relative overflow-hidden group shadow-2xl"
      >
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-gold-accent/5 blur-[80px] rounded-full group-hover:bg-gold-accent/10 transition-colors" />
        <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-emerald-500/5 blur-[80px] rounded-full group-hover:bg-emerald-500/10 transition-colors" />
        
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-4 mb-10">
            <div className="h-px w-10 bg-gold-accent/20" />
            <div className="flex flex-col items-center">
              <span className="text-gold-accent text-[9px] font-black uppercase tracking-[0.5em] mb-1">وَمَا تَقَدَّمُوا لِأَنفُسِكُم مِّنْ خَيْرٍ تَجِدُوهُ عِندَ اللَّهِ</span>
              <span className="text-gold-accent/60 text-[10px] font-bold uppercase tracking-[0.2em] whitespace-nowrap">آية اليوم</span>
            </div>
            <div className="h-px w-10 bg-gold-accent/20" />
          </div>
          
          <div className="space-y-8">
            <p className="arabic-text text-3xl sm:text-4xl text-center leading-[2.4] text-white font-bold drop-shadow-sm">
              {state.dailyVerse?.text || "يَا أَيُّهَا الَّذِينَ آمَنُوا اذْكُرُوا اللَّهَ ذِكْرًا كَثِيرًا"}
            </p>
            <div className="flex flex-col items-center gap-3">
              <div className="w-1.5 h-1.5 rounded-full bg-gold-accent flex items-center justify-center">
                 <div className="w-1 h-1 rounded-full bg-islamic-dark scale-75" />
              </div>
              <p className="text-gold-accent/80 text-[12px] font-bold tracking-wide Arabic-text-sans">
                {state.dailyVerse ? `سورة ${state.dailyVerse.surahName} - ${state.dailyVerse.reference}` : "سورة الأحزاب - الآية 41"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recitations Audio Library Launcher Card */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => onNavigate('quran')}
        className="glass-card-accent p-6 flex items-center justify-between cursor-pointer group border border-gold-accent/20 hover:border-gold-accent/40 bg-white/5 transition-all shadow-lg overflow-hidden relative"
      >
        <div className="absolute top-0 left-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
          <Volume2 size={95} className="-rotate-12 translate-x-3 translate-y-2 text-gold-accent animate-pulse" />
        </div>
        <div className="flex items-center gap-4 relative z-10 text-right">
          <div className="w-12 h-12 rounded-2xl bg-gold-accent/15 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-black transition-all shadow-inner shrink-0">
            <Volume2 size={24} />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-white group-hover:text-gold-accent transition-colors">مكتبة التلاوات العطرة</h3>
            <p className="text-[11px] text-white/50 mt-1 leading-relaxed">استمع لأعذب قراءات القرآن الكريم بمختلف الروايات لأكثر من ١٠٠ قارئ شهير مباشرة.</p>
          </div>
        </div>
        <ChevronRight size={18} className="text-white/20 group-hover:text-gold-accent transition-colors rotate-180 shrink-0 mr-2" />
      </motion.div>

      {/* Features Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Stories Mini Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('stories')}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 group cursor-pointer text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-gold-accent/10 flex items-center justify-center text-gold-accent group-hover:bg-gold-accent group-hover:text-black transition-all">
            <BookOpen size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white/90">قصص الأطفال</h3>
          </div>
        </motion.div>

        {/* Quiz Mini Card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => onNavigate('quiz')}
          className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] flex flex-col items-center justify-center gap-3 group cursor-pointer text-center"
        >
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white transition-all">
            <Trophy size={24} />
          </div>
          <div>
            <h3 className="font-bold text-white/90">مسابقات الأنبياء</h3>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
