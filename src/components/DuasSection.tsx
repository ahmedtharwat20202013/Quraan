import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bookmark, Share2, Heart, Copy, Check } from 'lucide-react';
import { DUAS } from '../constants';
import { cn } from '../lib/utils';

export default function DuasSection() {
  const [activeCategory, setActiveCategory] = useState('Morning');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = [
    { id: 'Morning', label: 'الصباح' },
    { id: 'Evening', label: 'المساء' },
    { id: 'Sleep', label: 'النوم' },
    { id: 'General', label: 'أدعية عامة' },
  ];

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setToastMessage('تم نسخ الذكر إلى الحافظة بنجاح!');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  const handleShare = async (title: string, text: string) => {
    const shareContent = `${title}\n\n${text}\n\nتمت المشاركة من تطبيق حقيبة المسلم`;
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: shareContent,
        });
      } catch (err) {
        // user cancelled or share failed, fallback to copy
        handleCopy('share-' + title, shareContent);
      }
    } else {
      handleCopy('share-' + title, shareContent);
    }
  };

  const filteredDuas = DUAS.filter(d => d.category === activeCategory);

  return (
    <div className="space-y-8 pb-32">
      <header className="space-y-6">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2">الأذكار اليومية</h2>
          <p className="text-white/40 text-xs font-medium uppercase tracking-[0.1em]">حصن المسلم من القرآن والسنة</p>
        </div>
        
        <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] whitespace-nowrap transition-all border shrink-0",
                activeCategory === cat.id 
                  ? "bg-gold-accent text-islamic-dark border-gold-accent shadow-xl shadow-gold-accent/10" 
                  : "bg-white/5 border-white/5 text-white/40 hover:text-white"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </header>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={activeCategory}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-8"
          >
            {filteredDuas.map((dua, idx) => {
              const fullText = `${dua.arabic}\n\n${dua.translation}`;
              return (
                <motion.div
                  key={dua.id}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  className="glass-card-accent p-8 space-y-6 relative group overflow-hidden border border-white/5"
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-gold-accent/10 flex items-center justify-center text-gold-accent">
                        <Heart size={14} />
                      </div>
                      <h3 className="text-white/40 text-[10px] font-black uppercase tracking-[0.2em]">{dua.title}</h3>
                    </div>
                    <div className="flex gap-4">
                      <button 
                        onClick={() => handleShare(dua.title, fullText)}
                        className="text-white/30 hover:text-gold-accent transition-colors p-1"
                        title="مشاركة الذكر"
                      >
                        <Share2 size={16} />
                      </button>
                      <button 
                        onClick={() => handleCopy(dua.id, fullText)}
                        className="text-white/30 hover:text-gold-accent transition-colors p-1"
                        title="نسخ الذكر"
                      >
                        {copiedId === dua.id ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                    </div>
                  </div>
                  
                  <p className="arabic-text text-2xl sm:text-3xl leading-[2.2] text-center text-white/90 py-4 font-bold">
                    {dua.arabic}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-px flex-1 bg-white/5" />
                      <div className="w-1.5 h-1.5 rounded-full bg-gold-accent/20" />
                      <div className="h-px flex-1 bg-white/5" />
                    </div>
                    
                    <p className="text-white/30 text-xs text-center leading-relaxed font-medium italic">
                      {dua.translation}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Floating toast notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 left-4 right-4 max-w-sm mx-auto z-[100] bg-emerald-950/95 border border-gold-accent/40 backdrop-blur-md px-6 py-4 rounded-2xl flex items-center gap-3 shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-center justify-center"
          >
            <div className="w-6 h-6 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent shrink-0">
              <Check size={14} />
            </div>
            <p className="text-xs font-bold text-white tracking-wide">{toastMessage}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
