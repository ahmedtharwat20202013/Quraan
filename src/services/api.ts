import { Reciter, APISurah } from '../types';

interface RecitersResponse {
  reciters: Reciter[];
}

interface SuwarResponse {
  suwar: APISurah[];
}

const RECITERS_CACHE_KEY = 'quran_reciters_cache';
const SUWAR_CACHE_KEY = 'quran_suwar_cache';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 hours caching

interface CachedData<T> {
  data: T;
  timestamp: number;
}

export class QuranApiService {
  /**
   * Fetches the list of reciters from the MP3 Quran API
   */
  static async getReciters(): Promise<Reciter[]> {
    // Try localStorage cache first
    try {
      const cached = localStorage.getItem(RECITERS_CACHE_KEY);
      if (cached) {
        const parsed: CachedData<Reciter[]> = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
          return parsed.data;
        }
      }
    } catch (e) {
      console.warn('Error reading reciters cache from localStorage', e);
    }

    try {
      const response = await fetch('https://www.mp3quran.net/api/v3/reciters?language=ar');
      if (!response.ok) {
        throw new Error('فشل جلب قائمة القراء من السيرفر');
      }
      const data: RecitersResponse = await response.json();
      
      // Save to cache
      try {
        const cacheObj: CachedData<Reciter[]> = {
          data: data.reciters,
          timestamp: Date.now()
        };
        localStorage.setItem(RECITERS_CACHE_KEY, JSON.stringify(cacheObj));
      } catch (e) {
        console.warn('Error saving reciters to cache', e);
      }

      return data.reciters;
    } catch (error) {
      console.error('getReciters error:', error);
      // Fallback to expired cache if available
      try {
        const cached = localStorage.getItem(RECITERS_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached).data;
        }
      } catch {}
      throw error;
    }
  }

  /**
   * Fetches the 114 suwar details from the MP3 Quran API
   */
  static async getSuwar(): Promise<APISurah[]> {
    // Try localStorage cache first
    try {
      const cached = localStorage.getItem(SUWAR_CACHE_KEY);
      if (cached) {
        const parsed: CachedData<APISurah[]> = JSON.parse(cached);
        if (Date.now() - parsed.timestamp < CACHE_EXPIRY_MS) {
          return parsed.data;
        }
      }
    } catch (e) {
      console.warn('Error reading suwar cache from localStorage', e);
    }

    try {
      const response = await fetch('https://www.mp3quran.net/api/v3/suwar?language=ar');
      if (!response.ok) {
        throw new Error('فشل جلب قائمة السور من السيرفر');
      }
      const data: SuwarResponse = await response.json();
      
      // Save to cache
      try {
        const cacheObj: CachedData<APISurah[]> = {
          data: data.suwar,
          timestamp: Date.now()
        };
        localStorage.setItem(SUWAR_CACHE_KEY, JSON.stringify(cacheObj));
      } catch (e) {
        console.warn('Error saving suwar to cache', e);
      }

      return data.suwar;
    } catch (error) {
      console.error('getSuwar error:', error);
      // Fallback to expired cache if available
      try {
        const cached = localStorage.getItem(SUWAR_CACHE_KEY);
        if (cached) {
          return JSON.parse(cached).data;
        }
      } catch {}
      throw error;
    }
  }
}
