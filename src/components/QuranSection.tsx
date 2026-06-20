import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, Bookmark, ChevronLeft, BookOpen, Volume2 } from 'lucide-react';
import { SURAHS } from '../constants';
import { Surah } from '../types';
import { cn } from '../lib/utils';
import RecitationsSection from './RecitationsSection';

interface QuranSectionProps {
  onSurahClick: (surah: Surah) => void;
}

export default function QuranSection({ onSurahClick }: QuranSectionProps) {
  const [viewMode, setViewMode] = useState<'read' | 'listen'>('read');
  const [search, setSearch] = useState("");
  
  const filteredSurahs = SURAHS.filter(s => 
    s.name.includes(search) || 
    s.englishName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 pb-20">
      {/* Top Slider Toggle between Read and Listen (Material 3 style) */}
      <div className="flex bg-white/5 border border-white/5 rounded-3xl p-1 gap-1 shadow-inner">
        <button 
          onClick={() => setViewMode('read')}
          className={cn(
            "flex-1 py-3 text-xs font-black rounded-2xl transition-all flex items-center justify-center gap-2",
            viewMode === 'read' 
              ? "bg-gradient-to-br from-gold-bright to-gold-accent text-emerald-950 shadow-md scale-102" 
              : "text-white/40 hover:text-white"
          )}
        >
          <BookOpen size={16} />
          <span>قراءة المصحف</span>
        </button>
        <button 
          onClick={() => setViewMode('listen')}
          className={cn(
            "flex-1 py-3 text-xs font-black rounded-2xl transition-all flex items-center justify-center gap-2",
            viewMode === 'listen' 
              ? "bg-gradient-to-br from-gold-bright to-gold-accent text-emerald-950 shadow-md scale-102" 
              : "text-white/40 hover:text-white"
          )}
        >
          <Volume2 size={16} />
          <span>الاستماع للتلاوات</span>
        </button>
      </div>

      <AnimatePresence mode="wait">
        {viewMode === 'read' ? (
          <motion.div
            key="read-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            <header className="space-y-6">
              <div>
                <h2 className="text-4xl font-black tracking-tight mb-2">فهرس السور</h2>
                <p className="text-white/40 text-xs font-bold">اختر سورة لتبدأ القراءة بتمعن وسكينة مع التمرير السهل</p>
              </div>
              
              <div className="relative group">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-accent transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="ابحث عن سورة..." 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pr-12 pl-6 focus:outline-none focus:border-gold-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20 text-right"
                />
              </div>
            </header>

            <div className="space-y-4">
              {filteredSurahs.map((surah) => (
                <motion.div
                  key={surah.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onSurahClick(surah)}
                  className="glass-card hover:bg-white/10 transition-all p-5 flex items-center justify-between cursor-pointer group"
                >
                  <div className="flex items-center gap-5">
                     <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center relative group-hover:bg-gold-accent/10 transition-colors">
                        <span className="text-xs font-bold opacity-30 group-hover:opacity-100 group-hover:text-gold-accent transition-all">{surah.number}</span>
                        <div className="absolute inset-0 border border-white/5 group-hover:border-gold-accent/20 rounded-2xl" />
                     </div>
                     <div className="text-right">
                        <h3 className="font-bold text-lg tracking-tight group-hover:text-gold-accent transition-colors">{surah.name}</h3>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className={cn(
                             "text-[10px] px-2 py-0.5 rounded-full font-bold",
                             surah.revelationType === 'مكية' ? "bg-emerald-500/10 text-emerald-500" : "bg-blue-500/10 text-blue-500"
                          )}>
                            {surah.revelationType}
                          </span>
                          <span className="text-[10px] text-white/20 font-bold">•</span>
                          <span className="text-[10px] text-white/40 font-bold uppercase tracking-wider">{surah.numberOfAyahs} آية</span>
                        </div>
                     </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                     <div className="text-right hidden sm:block">
                        <p className="arabic-text text-lg text-white/80 leading-none">{surah.englishNameTranslation}</p>
                     </div>
                     <ChevronLeft size={18} className="text-white/10 group-hover:text-gold-accent transition-colors rotate-180" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="listen-mode"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <RecitationsSection />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
