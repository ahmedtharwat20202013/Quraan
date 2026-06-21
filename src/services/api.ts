import { z } from 'zod';
import { Reciter, APISurah } from '../types';

// Define Zod Schemas for Runtime Validation
const MoshafSchema = z.object({
  id: z.number(),
  name: z.string(),
  server: z.string(),
  surah_list: z.string()
});

const ReciterSchema = z.object({
  id: z.union([z.number(), z.string()]).transform(val => Number(val)),
  name: z.string(),
  letter: z.string(),
  moshaf: z.array(MoshafSchema)
});

const RecitersResponseSchema = z.object({
  reciters: z.array(ReciterSchema)
});

const APISurahSchema = z.object({
  id: z.number(),
  name: z.string(),
  start_page: z.number(),
  end_page: z.number(),
  makkia: z.number(),
  type: z.number()
});

const SuwarResponseSchema = z.object({
  suwar: z.array(APISurahSchema)
});

const RECITERS_CACHE_KEY = 'quran_reciters_cache_v2';
const SUWAR_CACHE_KEY = 'quran_suwar_cache_v2';
const CACHE_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 Hours

// Safely gets cache with try-catch & validation
function safeGetCache<T>(key: string): { data: T; timestamp: number } | null {
  try {
    const cached = localStorage.getItem(key);
    if (!cached) return null;
    const parsed = JSON.parse(cached);
    
    // Check structure
    if (!parsed || !parsed.data || !Array.isArray(parsed.data)) {
      return null;
    }
    
    // Check expiry
    if (Date.now() - parsed.timestamp > CACHE_EXPIRY_MS) {
      return null;
    }
    
    return parsed;
  } catch {
    try {
      localStorage.removeItem(key);
    } catch {}
    return null;
  }
}

export class QuranApiService {
  /**
   * Fetches the audited list of reciters from the MP3 Quran API
   */
  static async getReciters(options?: { signal?: AbortSignal }): Promise<Reciter[]> {
    // Try localStorage cache first
    const cached = safeGetCache<Reciter[]>(RECITERS_CACHE_KEY);
    if (cached) {
      return cached.data;
    }

    try {
      const response = await fetch('https://www.mp3quran.net/api/v3/reciters?language=ar', {
        signal: options?.signal
      });
      if (!response.ok) {
        throw new Error('فشل جلب قائمة القراء من السيرفر');
      }
      
      const rawData = await response.json();
      
      // Validate schema in runtime via Zod
      const parsed = RecitersResponseSchema.parse(rawData);
      const reciters: Reciter[] = parsed.reciters as unknown as Reciter[];
      
      // Save valid data to cache
      try {
        localStorage.setItem(RECITERS_CACHE_KEY, JSON.stringify({
          data: reciters,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Error saving reciters to cache', e);
      }

      return reciters;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error;
      }
      console.error('getReciters error:', error);
      
      // Fallback to expired cache if available or clean return
      try {
        const fallback = localStorage.getItem(RECITERS_CACHE_KEY);
        if (fallback) {
          return JSON.parse(fallback).data;
        }
      } catch {}
      throw error;
    }
  }

  /**
   * Fetches the 114 suwar details from the MP3 Quran API
   */
  static async getSuwar(options?: { signal?: AbortSignal }): Promise<APISurah[]> {
    // Try localStorage cache first
    const cached = safeGetCache<APISurah[]>(SUWAR_CACHE_KEY);
    if (cached) {
      return cached.data;
    }

    try {
      const response = await fetch('https://www.mp3quran.net/api/v3/suwar?language=ar', {
        signal: options?.signal
      });
      if (!response.ok) {
        throw new Error('فشل جلب قائمة السور من السيرفر');
      }
      
      const rawData = await response.json();
      
      // Validate schema in runtime via Zod
      const parsed = SuwarResponseSchema.parse(rawData);
      const suwar: APISurah[] = parsed.suwar;
      
      // Save valid data to cache
      try {
        localStorage.setItem(SUWAR_CACHE_KEY, JSON.stringify({
          data: suwar,
          timestamp: Date.now()
        }));
      } catch (e) {
        console.warn('Error saving suwar to cache', e);
      }

      return suwar;
    } catch (error: any) {
      if (error.name === 'AbortError') {
        throw error;
      }
      console.error('getSuwar error:', error);
      
      // Fallback to expired cache if available
      try {
        const fallback = localStorage.getItem(SUWAR_CACHE_KEY);
        if (fallback) {
          return JSON.parse(fallback).data;
        }
      } catch {}
      throw error;
    }
  }
}
