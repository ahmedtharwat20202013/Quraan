import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'motion/react';
import { Coordinates, CalculationMethod, PrayerTimes, SunnahTimes, Prayer } from 'adhan';
import { MapPin, Calendar, Clock, CheckCircle2, AlertCircle, Bell, BellOff } from 'lucide-react';
import { cn } from '../lib/utils';

export default function PrayerSection() {
  const [coords, setCoords] = useState<{ latitude: number; longitude: number } | null>({
    latitude: 21.4225, // default: Mecca Coordinates
    longitude: 39.8262
  });
  const [locationName, setLocationName] = useState<string>('مكة المكرمة (افتراضي)');
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(() => {
    return localStorage.getItem('quran_prayer_notif') === 'true';
  });

  // Fetch GPS Coordinates if allowed
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoords({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
          setLocationName('موقعك الحالي (GPS)');
        },
        (error) => {
          console.warn('Geolocation failed, falling back to Mecca defaults', error);
        }
      );
    }
  }, []);

  // Update clock every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Calculate prayer times
  const prayerData = useMemo(() => {
    if (!coords) return null;
    
    const coordinates = new Coordinates(coords.latitude, coords.longitude);
    const params = CalculationMethod.UmmAlQura();
    const date = new Date();
    
    const prayerTimes = new PrayerTimes(coordinates, date, params);
    const sunnahTimes = new SunnahTimes(prayerTimes);

    const checkFormat = (d: Date) => {
      return d.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
    };

    const list = [
      { id: 'fajr', name: 'الفجر', dateObj: prayerTimes.fajr, timeStr: checkFormat(prayerTimes.fajr) },
      { id: 'sunrise', name: 'الشروق', dateObj: prayerTimes.sunrise, timeStr: checkFormat(prayerTimes.sunrise) },
      { id: 'dhuhr', name: 'الظهر', dateObj: prayerTimes.dhuhr, timeStr: checkFormat(prayerTimes.dhuhr) },
      { id: 'asr', name: 'العصر', dateObj: prayerTimes.asr, timeStr: checkFormat(prayerTimes.asr) },
      { id: 'maghrib', name: 'المغرب', dateObj: prayerTimes.maghrib, timeStr: checkFormat(prayerTimes.maghrib) },
      { id: 'isha', name: 'العشاء', dateObj: prayerTimes.isha, timeStr: checkFormat(prayerTimes.isha) },
      { id: 'midnight', name: 'منتصف الليل', dateObj: sunnahTimes.middleOfTheNight, timeStr: checkFormat(sunnahTimes.middleOfTheNight) }
    ];

    // Determine past/current/next prayers
    let activeIndex = -1;
    let nextIndex = 0;
    const nowMs = currentTime.getTime();

    for (let i = 0; i < list.length; i++) {
      if (nowMs >= list[i].dateObj.getTime()) {
        activeIndex = i;
      }
    }
    
    nextIndex = (activeIndex + 1) % list.length;

    // Remaining time calculation to next prayer
    const nextPrayer = list[nextIndex];
    let timeDiffMs = nextPrayer.dateObj.getTime() - nowMs;
    // If next prayer is Fajr tomorrow
    if (timeDiffMs < 0) {
      const tomorrowPrayer = new Date(nextPrayer.dateObj);
      tomorrowPrayer.setDate(tomorrowPrayer.getDate() + 1);
      timeDiffMs = tomorrowPrayer.getTime() - nowMs;
    }

    const totalSecs = Math.floor(timeDiffMs / 1000);
    const hours = Math.floor(totalSecs / 3600);
    const mins = Math.floor((totalSecs % 3600) / 60);
    const secs = totalSecs % 60;

    const remainingStr = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return {
      list,
      activeIndex,
      nextPrayerName: nextPrayer.name,
      remainingStr,
    };
  }, [coords, currentTime]);

  // Handle local notification simulation / toggle
  const toggleNotifications = () => {
    const newState = !notificationsEnabled;
    setNotificationsEnabled(newState);
    localStorage.setItem('quran_prayer_notif', String(newState));
    
    if (newState && 'Notification' in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === 'granted') {
          new Notification('حقيبة المسلم', {
            body: 'تم تفعيل منبّهات ومواعيد الأذان بنجاح!',
            icon: 'https://img.icons8.com/color/192/000000/mosque.png'
          });
        }
      });
    }
  };

  // Natively calculate Hijri date with exactly high precision
  const hijriDateStr = useMemo(() => {
    try {
      return new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }).format(currentTime);
    } catch {
      return 'تاريخ هجري تقريبي';
    }
  }, [currentTime]);

  const miladiDateStr = useMemo(() => {
    return currentTime.toLocaleDateString('ar-EG', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  }, [currentTime]);

  return (
    <div className="relative text-white min-h-screen rounded-3xl overflow-hidden pb-32">
      {/* Background with Holy Kaaba picture and blur overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1542856391-010fb87dcfed?q=80&w=1200&auto=format&fit=crop" 
          alt="Holy Kaaba Makkah" 
          className="w-full h-full object-cover scale-105 filter brightness-[0.25]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-emerald-950/40 backdrop-blur-sm" />
      </div>

      <div className="relative z-10 px-6 py-8 space-y-6">
        {/* Header Title */}
        <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-md">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-gold-accent flex items-center gap-2">
              <Clock size={20} className="text-gold-accent animate-pulse" />
              مواقيت الصلاة
            </h1>
            <p className="text-xs text-white/60 flex items-center gap-1">
              <MapPin size={12} className="text-emerald-400" />
              {locationName}
            </p>
          </div>
          
          <button 
            onClick={toggleNotifications}
            className={cn(
              "p-2.5 rounded-xl border transition-all active:scale-95 duration-300",
              notificationsEnabled 
                ? "bg-gold-accent/20 border-gold-accent/45 text-gold-accent hover:bg-gold-accent/30" 
                : "bg-white/5 border-white/10 text-white/40 hover:text-white/60"
            )}
            title="تنبيهات الأذان"
          >
            {notificationsEnabled ? <Bell size={18} /> : <BellOff size={18} />}
          </button>
        </div>

        {/* Big Countdown Timer Card */}
        <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-950/60 border border-white/10 rounded-3xl p-6 text-center backdrop-blur-2xl shadow-xl space-y-3 relative overflow-hidden">
          <div className="absolute right-0 top-0 -translate-y-6 translate-x-6 w-24 h-24 bg-gold-accent/10 rounded-full blur-2xl" />
          
          <h2 className="text-sm font-black text-white/50 tracking-wider">العد التنازلي للصلاة التالية</h2>
          
          <div className="text-4xl font-mono text-gold-accent font-extrabold tracking-widest drop-shadow-[0_4px_12px_rgba(212,175,55,0.3)] animate-pulse">
            {prayerData?.remainingStr || '00:00:00'}
          </div>

          <div className="text-sm font-semibold text-emerald-300">
            بقي على <span className="text-gold-accent text-base px-1 font-bold">{prayerData?.nextPrayerName}</span>
          </div>
        </div>

        {/* Date Card */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-center items-center text-center space-y-1">
            <Calendar size={18} className="text-gold-accent" />
            <span className="text-[10px] text-white/40">التاريخ الهجري</span>
            <span className="text-xs font-bold text-white/90">{hijriDateStr}</span>
          </div>
          <div className="bg-white/5 border border-white/5 rounded-2xl p-4 backdrop-blur-md flex flex-col justify-center items-center text-center space-y-1">
            <Calendar size={18} className="text-emerald-400" />
            <span className="text-[10px] text-white/40">التاريخ الميلادي</span>
            <span className="text-xs font-bold text-white/90">{miladiDateStr}</span>
          </div>
        </div>

        {/* Prayer Times Checklist Timeline */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-5 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-gold-accent/80 pb-2 border-b border-white/5">جدول الصلوات اليومي</h3>
          
          <div className="relative border-r border-white/10 pr-4 space-y-5">
            {prayerData?.list.map((prayer, idx) => {
              const isPast = idx <= (prayerData?.activeIndex ?? -1);
              const isNext = idx === ((prayerData?.activeIndex ?? -1) + 1) % prayerData.list.length;
              
              return (
                <div 
                  key={prayer.id} 
                  className={cn(
                    "flex justify-between items-center relative transition-all duration-300",
                    isNext ? "scale-105 origin-right" : ""
                  )}
                >
                  {/* Timeline point indicator */}
                  <div className={cn(
                    "absolute -right-[21px] w-2.5 h-2.5 rounded-full border transition-all duration-500",
                    isPast ? "bg-emerald-400 border-emerald-400 shadow-[0_0_8px_#34d399]" : 
                    isNext ? "bg-gold-accent border-gold-accent animate-ping" : "bg-white/20 border-white/20"
                  )} />
                  <div className={cn(
                    "absolute -right-[21px] w-2.5 h-2.5 rounded-full border transition-all duration-500",
                    isPast ? "bg-emerald-400 border-emerald-400" : 
                    isNext ? "bg-gold-accent border-gold-accent" : "bg-white/20 border-white/20"
                  )} />

                  <div className="space-y-0.5">
                    <span className={cn(
                      "text-sm font-black transition-all",
                      isNext ? "text-gold-accent font-extrabold text-base" : 
                      isPast ? "text-white/80" : "text-white/40"
                    )}>
                      {prayer.name}
                    </span>
                    {isNext && (
                      <span className="block text-[9px] bg-gold-accent/20 text-gold-accent font-bold px-1.5 py-0.5 rounded-full w-max">
                        الصلاة القادمة
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <span className={cn(
                      "font-mono text-sm tracking-wider",
                      isNext ? "text-gold-accent font-bold" : 
                      isPast ? "text-white/90" : "text-white/30"
                    )}>
                      {prayer.timeStr}
                    </span>
                    {isPast && (
                      <CheckCircle2 size={14} className="text-emerald-400" />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
