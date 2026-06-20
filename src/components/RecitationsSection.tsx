import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Search, 
  User, 
  BookOpen, 
  HelpCircle, 
  Volume2, 
  Play, 
  Pause, 
  Square, 
  ChevronLeft, 
  Sparkles, 
  AlertTriangle, 
  RefreshCw,
  Gauge,
  Disc,
  ListRestart
} from 'lucide-react';
import { Reciter, APISurah, Moshaf } from '../types';
import { QuranApiService } from '../services/api';
import { useAudioPlayer } from '../hooks/useAudioPlayer';
import { cn } from '../lib/utils';

export default function RecitationsSection() {
  const [reciters, setReciters] = useState<Reciter[]>([]);
  const [suwar, setSuwar] = useState<APISurah[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Selection states
  const [selectedReciter, setSelectedReciter] = useState<Reciter | null>(null);
  const [selectedMoshaf, setSelectedMoshaf] = useState<Moshaf | null>(null);
  
  // Custom audio player hook
  const audioPlayer = useAudioPlayer();

  // Load Reciters & Suwar on Mount
  useEffect(() => {
    loadData();
    (window as any).isListeningTab = true;
    return () => {
      (window as any).isListeningTab = false;
    };
  }, []);

  const loadData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Parallel loading for maximum speed
      const [recitersData, suwarData] = await Promise.all([
        QuranApiService.getReciters(),
        QuranApiService.getSuwar(),
      ]);

      // Sort reciters alphabetically
      const sortedReciters = [...recitersData].sort((a, b) => a.name.localeCompare(b.name, 'ar'));
      
      setReciters(sortedReciters);
      
      // Sort suwar by ID
      const sortedSuwar = [...suwarData].sort((a, b) => a.id - b.id);
      setSuwar(sortedSuwar);
      
      // Feed suwar list to audio service for auto-advance
      audioPlayer.setSuwarList(sortedSuwar);
    } catch (err: any) {
      console.error(err);
      setError('تعذر جلب البيانات من السيرفر. يرجى التحقق من اتصال الإنترنت والمحاولة مجدداً.');
    } finally {
      setLoading(false);
    }
  };

  // Filter Reciters by Search Query
  const filteredReciters = useMemo(() => {
    if (!searchQuery.trim()) return reciters;
    const query = searchQuery.trim().toLowerCase();
    return reciters.filter(r => 
      r.name.includes(query) || 
      (r.moshaf && r.moshaf.some(m => m.name.toLowerCase().includes(query)))
    );
  }, [reciters, searchQuery]);

  // Handle Reciter Choice
  const handleSelectReciter = (reciter: Reciter) => {
    setSelectedReciter(reciter);
    // Auto-select the first moshaf
    if (reciter.moshaf && reciter.moshaf.length > 0) {
      setSelectedMoshaf(reciter.moshaf[0]);
    } else {
      setSelectedMoshaf(null);
    }
  };

  // Check if a Surah is available in the currently selected Moshaf's list
  const isSurahAvailable = (surahId: number): boolean => {
    if (!selectedMoshaf || !selectedMoshaf.surah_list) return true; // Fail-safe
    const availableSuwar = selectedMoshaf.surah_list.split(',').map(s => parseInt(s.trim(), 10));
    return availableSuwar.includes(surahId);
  };

  // Format second counts to MM:SS
  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const minutes = Math.floor(secs / 60);
    const seconds = Math.floor(secs % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  // Progress Bar dynamic width
  const progressPercent = audioPlayer.duration > 0 
    ? (audioPlayer.currentTime / audioPlayer.duration) * 100 
    : 0;

  // Handle playing a surah
  const handlePlaySurah = (surah: APISurah) => {
    if (!selectedReciter || !selectedMoshaf) return;
    
    audioPlayer.playSurah(
      surah,
      selectedMoshaf.server,
      selectedReciter.name,
      selectedMoshaf.name
    );
  };

  return (
    <div className="space-y-6 pb-36">
      {/* Header */}
      {!selectedReciter && (
        <header className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-4xl font-black tracking-tight mb-2">إذاعة التلاوات</h2>
              <p className="text-gold-accent text-xs font-bold">بث مباشر لأجود وأعذب قراءات القرآن الكريم بمختلف الروايات</p>
            </div>
            <motion.div
              animate={{ rotate: [0, 360] }}
              transition={{ repeat: Infinity, duration: 15, ease: 'linear' }}
              className="w-12 h-12 rounded-full border border-gold-accent/20 flex items-center justify-center text-gold-accent hidden sm:flex shrink-0 bg-white/5"
            >
              <Sparkles size={20} />
            </motion.div>
          </div>

          {/* Search bar */}
          <div className="relative group">
            <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-gold-accent transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="ابحث باسم القارئ..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-[1.8rem] py-4 pr-12 pl-6 focus:outline-none focus:border-gold-accent/50 focus:bg-white/10 transition-all placeholder:text-white/20 text-right font-bold text-sm"
            />
          </div>
        </header>
      )}

      {/* Loading State */}
      {loading && (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <div className="w-14 h-14 border-4 border-gold-accent border-t-transparent rounded-full animate-spin shadow-[0_0_20px_rgba(212,175,55,0.3)]" />
          <div className="text-gold-accent font-black text-xs uppercase tracking-[0.2em] animate-pulse">جاري تحميل البث الإسلامي...</div>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="p-8 text-center space-y-6 bg-rose-500/5 rounded-[2rem] border border-rose-500/20 max-w-sm mx-auto">
          <div className="w-16 h-16 bg-rose-500/10 rounded-full flex items-center justify-center mx-auto text-rose-500">
            <AlertTriangle size={32} />
          </div>
          <p className="text-white/80 text-sm font-bold leading-relaxed">{error}</p>
          <button 
            onClick={loadData}
            className="px-6 py-3 bg-white text-emerald-950 font-black text-xs rounded-xl flex items-center gap-2 mx-auto shadow-md hover:scale-105 active:scale-95 transition-all"
          >
            <RefreshCw size={14} />
            إعادة المحاولة
          </button>
        </div>
      )}

      {/* Reciters List Section */}
      {!loading && !error && !selectedReciter && (
        <>
          {filteredReciters.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <div className="text-white/20 w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle size={32} />
              </div>
              <p className="text-white/40 font-bold">لم نجد قارئاً بهذا الاسم، يرجى كتابة اسم آخر</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <AnimatePresence>
                {filteredReciters.map((reciter) => {
                  const firstMoshaf = reciter.moshaf && reciter.moshaf[0];
                  return (
                    <motion.div
                      key={reciter.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      whileHover={{ scale: 1.01, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleSelectReciter(reciter)}
                      className="glass-card p-6 flex items-center justify-between cursor-pointer group hover:border-gold-accent/30 transition-all shadow-md relative overflow-hidden"
                    >
                      <div className="flex items-center gap-4 relative z-10">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-hover:bg-gold-accent/10 transition-all font-black text-gold-accent shadow-inner border border-white/5">
                          <User size={20} />
                        </div>
                        <div className="text-right">
                          <h3 className="font-extrabold text-white text-base tracking-tight mb-1 group-hover:text-gold-accent transition-colors">
                            {reciter.name}
                          </h3>
                          <div className="flex items-center gap-2">
                            {firstMoshaf && (
                              <span className="text-[10px] text-white/50 bg-emerald-500/10 text-emerald-400 px-2.5 py-0.5 rounded-full font-bold">
                                {firstMoshaf.name.replace("المصحف المرتل", "مرتل")}
                              </span>
                            )}
                            {reciter.moshaf && reciter.moshaf.length > 1 && (
                              <span className="text-[9px] text-gold-accent/80 bg-gold-accent/10 px-2 py-0.5 rounded-full font-bold">
                                +{reciter.moshaf.length - 1} روايات أخرى
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      <ChevronLeft size={16} className="text-white/20 group-hover:text-gold-accent transition-all rotate-180" />
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>
          )}
        </>
      )}

      {/* Drill-down Surah List for Selected Reciter */}
      {!loading && !error && selectedReciter && (
        <div className="space-y-6">
          {/* Back button and profile header */}
          <div className="space-y-4">
            <button 
              onClick={() => setSelectedReciter(null)}
              className="flex items-center gap-2 text-white/55 hover:text-gold-accent font-black text-xs transition-colors py-2"
            >
              <ChevronLeft size={16} />
              <span>العودة لقائمة القراء</span>
            </button>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card-accent p-6 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="space-y-2">
                <span className="inline-flex px-3 py-1 bg-gold-accent/25 text-gold-bright rounded-full text-[9px] font-black uppercase tracking-wider">
                  القارئ المختار
                </span>
                <h3 className="text-2xl font-black text-white">{selectedReciter.name}</h3>
                
                {/* Riwayat/Moshaf dropdown chooser */}
                {selectedReciter.moshaf && selectedReciter.moshaf.length > 1 ? (
                  <div className="flex flex-col gap-1.5 pt-2">
                    <span className="text-[10px] font-bold text-white/40">اختر الرواية / نوع المصحف:</span>
                    <div className="flex flex-wrap gap-2">
                      {selectedReciter.moshaf.map(m => (
                        <button
                          key={m.id}
                          onClick={() => setSelectedMoshaf(m)}
                          className={cn(
                            "px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all border",
                            selectedMoshaf?.id === m.id 
                              ? "bg-gold-accent text-emerald-950 border-gold-bright shadow-md scale-105" 
                              : "bg-white/5 text-white/60 border-white/5 hover:bg-white/10"
                          )}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-xs text-white/50 font-bold flex items-center gap-1.5 pt-1">
                    <span>الرواية:</span>
                    <span className="text-gold-accent">{selectedMoshaf?.name || 'حفص عن عاصم'}</span>
                  </p>
                )}
              </div>
            </motion.div>
          </div>

          {/* Surah List Title */}
          <div>
            <h4 className="font-extrabold text-white text-lg pr-1">تصفح سور القرآن واستمع مباشرة</h4>
            <p className="text-white/40 text-xs font-bold pr-1 mt-1">
              اختر سورة للبدء. السور الباهتة قد لا تتوفر بهذا التسجيل لدى هذا القارئ.
            </p>
          </div>

          {/* Surah list */}
          <div className="space-y-3">
            {suwar.map((surah) => {
              const available = isSurahAvailable(surah.id);
              const isCurrent = audioPlayer.currentSurahNumber === surah.id && 
                                audioPlayer.currentReciterName === selectedReciter.name;
              
              return (
                <motion.div
                  key={surah.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={cn(
                    "glass-card p-4 flex items-center justify-between transition-all relative overflow-hidden",
                    available ? "cursor-pointer group hover:bg-white/10" : "opacity-35 cursor-not-allowed select-none",
                    isCurrent ? "border-gold-accent/40 bg-gold-accent/5" : ""
                  )}
                  onClick={() => available && handlePlaySurah(surah)}
                >
                  <div className="flex items-center gap-4">
                    {/* Surah ID number layout */}
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs transition-colors",
                      isCurrent ? "bg-gold-accent text-emerald-950 shadow-md" : "bg-white/5 text-white/30 group-hover:bg-gold-accent/10 group-hover:text-gold-accent"
                    )}>
                      {surah.id}
                    </div>

                    <div className="text-right">
                      <h4 className={cn(
                        "font-extrabold text-base transition-colors",
                        isCurrent ? "text-gold-accent" : "text-white group-hover:text-gold-accent"
                      )}>
                        سورة {surah.name}
                      </h4>
                      <p className="text-[10px] text-white/30 font-bold mt-0.5">
                        {surah.makkia === 1 ? 'مكية' : 'مدنية'} • صفحة البدء {surah.start_page}
                      </p>
                    </div>
                  </div>

                  {/* Play audio states */}
                  <div className="flex items-center gap-3">
                    {isCurrent ? (
                      audioPlayer.isPlaying ? (
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gold-accent/20 rounded-full text-gold-accent text-[9px] font-black">
                          <span className="w-2 h-2 rounded-full bg-gold-accent animate-ping" />
                          <span>جاري التشغيل</span>
                        </div>
                      ) : (
                        <div className="text-white/40 group-hover:text-gold-accent">
                          <Play size={18} fill="currentColor" />
                        </div>
                      )
                    ) : (
                      available && (
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-gold-accent group-hover:text-emerald-950 transition-all">
                          <Play size={12} fill="currentColor" />
                        </div>
                      )
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Floating Global Audio Player Controller Sheet */}
      <AnimatePresence>
        {audioPlayer.audioUrl && (
          <motion.div 
            initial={{ y: 150, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 150, opacity: 0 }}
            className="fixed bottom-[96px] left-4 right-4 max-w-sm mx-auto z-40"
          >
            <div className="bg-emerald-950/95 backdrop-blur-2xl border border-white/10 rounded-[2.2rem] p-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative overflow-hidden">
              <div className="absolute inset-0 bg-gold-accent/5 pointer-events-none" />
              
              {/* Spinning/pulsating Disc & Reciter header */}
              <div className="flex items-center gap-4 mb-4">
                <motion.div 
                  animate={audioPlayer.isPlaying ? { rotate: 360 } : {}}
                  transition={{ repeat: Infinity, duration: 8, ease: 'linear' }}
                  className={cn(
                    "w-12 h-12 rounded-full bg-gradient-to-br from-gold-bright to-gold-accent flex items-center justify-center text-emerald-950 shadow-lg shrink-0 border-2 border-emerald-900",
                    audioPlayer.isBuffering ? "animate-pulse" : ""
                  )}
                >
                  <Disc size={20} />
                </motion.div>

                <div className="text-right flex-1 min-w-0">
                  <span className="text-[8px] font-black tracking-widest text-gold-accent uppercase">
                    {audioPlayer.currentMoshafName?.replace("المصحف المرتل - ", "") || "رواية حفص عن عاصم"}
                  </span>
                  <h5 className="text-white font-extrabold text-sm truncate leading-snug">
                    سورة {audioPlayer.currentSurah?.name || `رقم ${audioPlayer.currentSurahNumber}`}
                  </h5>
                  <p className="text-[10px] text-white/50 truncate font-bold">
                    {audioPlayer.currentReciterName || "قارئ غير معروف"}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {/* Playback speed selector */}
                  <div className="flex items-center gap-1 bg-white/5 px-2.5 py-1.5 rounded-full select-none cursor-pointer"
                       title="سرعة التلاوة"
                       onClick={() => {
                         const velocities = [1.0, 1.25, 1.5, 0.75];
                         const idx = velocities.indexOf(audioPlayer.playbackRate);
                         const nextIdx = (idx + 1) % velocities.length;
                         audioPlayer.setSpeed(velocities[nextIdx]);
                       }}
                  >
                    <Gauge size={10} className="text-gold-accent" />
                    <span className="text-[9px] font-bold text-white/80">{audioPlayer.playbackRate}x</span>
                  </div>

                  <button 
                    onClick={() => audioPlayer.stop()}
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-white/40 hover:text-rose-500 transition-all outline-none"
                    title="إيقاف"
                  >
                    <Square size={12} fill="currentColor" />
                  </button>
                </div>
              </div>

              {/* Progress Slider Bar */}
              <div className="space-y-1">
                <input 
                  type="range"
                  min="0"
                  max={audioPlayer.duration || 100}
                  value={audioPlayer.currentTime || 0}
                  onChange={(e) => audioPlayer.seek(parseFloat(e.target.value))}
                  className="w-full accent-gold-accent bg-white/15 h-1 rounded-lg cursor-pointer transition-all"
                />
                
                <div className="flex justify-between items-center text-[9px] font-bold text-white/40">
                  <span>{formatTime(audioPlayer.currentTime)}</span>
                  {audioPlayer.isBuffering ? (
                    <span className="text-gold-accent animate-pulse">جاري التخزين المؤقت...</span>
                  ) : (
                    <span>القارئ التالي آلياً</span>
                  )}
                  <span>{formatTime(audioPlayer.duration)}</span>
                </div>
              </div>

              {/* Play / pause buttons bar */}
              <div className="flex justify-center items-center gap-6 mt-4">
                <button
                  onClick={() => audioPlayer.togglePlay()}
                  className="w-12 h-12 bg-white text-emerald-950 hover:bg-gold-accent hover:text-emerald-950 transition-all rounded-full flex items-center justify-center shadow-lg active:scale-95"
                >
                  {audioPlayer.isPlaying ? (
                    <Pause size={20} fill="currentColor" strokeWidth={0} />
                  ) : (
                    <Play size={20} fill="currentColor" strokeWidth={0} className="translate-x-[1px]" />
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
