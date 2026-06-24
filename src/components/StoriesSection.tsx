import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, BookOpen, Star, Hash, Copy, Check, Share2 } from 'lucide-react';
import { STORIES } from '../constants';
import { Story } from '../types';
import { cn } from '../lib/utils';

export default function StoriesSection() {
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [viewMode, setViewMode] = useState<'all' | 'prophets'>('all');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  // Scroll to top on list/view transition
  useEffect(() => {
    const doScroll = () => {
      const mainEl = document.querySelector('main');
      if (mainEl) {
        mainEl.scrollTop = 0;
      }
      window.scrollTo({ top: 0, behavior: 'instant' });
      document.documentElement.scrollTo({ top: 0, behavior: 'instant' });
      document.body.scrollTo({ top: 0, behavior: 'instant' });
    };

    doScroll();
    const timer = setTimeout(doScroll, 80);
    return () => clearTimeout(timer);
  }, [selectedStory, viewMode, activeCategory]);
  const [copied, setCopied] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const categories = useMemo(() => {
    return Array.from(new Set(STORIES.map(s => s.category)));
  }, []);

  const filteredStories = useMemo(() => {
    if (!activeCategory) return STORIES;
    return STORIES.filter(s => s.category === activeCategory);
  }, [activeCategory]);

  const handleBackToList = () => {
    if (selectedStory) {
      setSelectedStory(null);
    } else if (activeCategory) {
      setActiveCategory(null);
    }
  };

  const handleCopyStory = (story: Story) => {
    const textToCopy = `📖 ${story.title}\n\n${story.content}\n\nتمت المشاركة من تطبيق حقيبة المسلم`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setToastMessage('تم نسخ القصة بالكامل بنجاح!');
    setTimeout(() => setCopied(false), 2000);
    setTimeout(() => setToastMessage(null), 2500);
  };

  const handleShareStory = async (story: Story) => {
    const textToShare = `📖 ${story.title}\n\n${story.content}\n\nتمت المشاركة من تطبيق حقيبة المسلم`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: story.title,
          text: textToShare,
        });
      } catch (err) {
        handleCopyStory(story);
      }
    } else {
      handleCopyStory(story);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gold-accent/10 flex items-center justify-center text-gold-accent shadow-inner border border-white/5">
            <BookOpen size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white/90 tracking-tight">قصص الأنبياء</h2>
            <p className="text-[10px] uppercase font-black tracking-[0.2em] text-gold-accent/60">حكايات تربوية للأطفال</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      {!selectedStory && !activeCategory && (
        <div className="flex p-1 bg-white/5 rounded-2xl border border-white/10 mb-2">
          <button
            onClick={() => setViewMode('prophets')}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-black transition-all",
              viewMode === 'prophets' ? "bg-gold-accent text-black shadow-lg shadow-gold-accent/20" : "text-white/40 hover:text-white"
            )}
          >
            اختر النبي
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={cn(
              "flex-1 py-3 rounded-xl text-xs font-black transition-all",
              viewMode === 'all' ? "bg-gold-accent text-black shadow-lg shadow-gold-accent/20" : "text-white/40 hover:text-white"
            )}
          >
            الكل
          </button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {selectedStory ? (
          <motion.div
            key="reader"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-zinc-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-white/10 flex items-center justify-between bg-black/40">
              <button
                onClick={handleBackToList}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:bg-gold-accent hover:text-black transition-all"
              >
                <ChevronLeft size={20} className="rotate-180" />
              </button>
              <div className="text-center px-4 flex-1">
                <h3 className="font-bold text-white/90 truncate max-w-[150px] mx-auto">{selectedStory.title}</h3>
                <span className="text-[10px] text-gold-accent/60 font-black uppercase tracking-widest block">
                  {selectedStory.category}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleShareStory(selectedStory)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:text-gold-accent transition-all"
                  title="مشاركة القصة"
                >
                  <Share2 size={16} />
                </button>
                <button
                  onClick={() => handleCopyStory(selectedStory)}
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-white/5 text-white/60 hover:text-gold-accent transition-all"
                  title="نسخ القصة بالكامل"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>
            
            <div className="p-8 space-y-6">
              <div className="text-xl leading-[1.8] text-white/90 text-justify whitespace-pre-wrap font-medium">
                {selectedStory.content}
              </div>
              <div className="flex justify-center pt-8">
                <div className="p-6 rounded-[2rem] bg-gradient-to-br from-gold-accent/20 to-transparent border border-gold-accent/10 text-gold-accent text-center w-full">
                  <p className="text-sm font-black uppercase tracking-widest">تـمت بـحمد الله</p>
                  <div className="flex justify-center gap-1 mt-4">
                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" className="animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ) : activeCategory ? (
          <motion.div
            key="category-list"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-4"
          >
            <button 
              onClick={() => setActiveCategory(null)}
              className="flex items-center gap-2 text-gold-accent text-xs font-black uppercase tracking-widest p-2"
            >
              <ChevronLeft size={14} className="rotate-180" />
              العودة لقائمة الأنبياء
            </button>
            <div className="grid gap-4">
              {filteredStories.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] text-right transition-all hover:bg-white/10 active:scale-[0.98] overflow-hidden"
                >
                  <h3 className="text-xl font-bold text-white/90 group-hover:text-gold-accent">
                    {story.title}
                  </h3>
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="grid gap-4"
          >
            {viewMode === 'all' ? (
              STORIES.map((story) => (
                <button
                  key={story.id}
                  onClick={() => setSelectedStory(story)}
                  className="group relative bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-[2rem] text-right transition-all hover:bg-white/10 active:scale-[0.98] overflow-hidden"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Hash size={10} className="text-gold-accent/40" />
                        <span className="text-[10px] font-black uppercase text-gold-accent/60 tracking-wider">
                          {story.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-white/90 group-hover:text-gold-accent">
                        {story.title}
                      </h3>
                    </div>
                    <ChevronLeft size={20} className="text-gold-accent/40" />
                  </div>
                </button>
              ))
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat, index) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setActiveCategory(cat)}
                    className="relative p-6 rounded-[2.5rem] bg-gradient-to-b from-white/[0.08] to-transparent border border-white/10 text-center hover:border-gold-accent/50 transition-all group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gold-accent/0 group-hover:bg-gold-accent/5 transition-colors" />
                    <div className="relative z-10">
                      <div className="w-14 h-14 rounded-full bg-gold-accent/10 flex items-center justify-center text-gold-accent mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-inner">
                        <Star size={24} className="group-hover:rotate-12 transition-transform" />
                      </div>
                      <span className="text-sm font-black tracking-tighter text-white/90 group-hover:text-gold-accent">
                        {cat.replace('سيدنا ', '').replace(' عليه السلام', '').replace('النبي ', '')}
                      </span>
                      <div className="mt-2 text-[8px] font-black uppercase tracking-widest text-white/30 group-hover:text-gold-accent/50">
                        عليه السلام
                      </div>
                    </div>
                    {/* Decorative shimmer */}
                    <div className="absolute -inset-x-full top-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none" />
                  </motion.button>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

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
