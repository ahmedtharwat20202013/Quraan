export interface QuranProgress {
  surahNumber: number;
  surahName: string;
  pageNumber: number;
  timestamp: number;
}

const QURAN_PROGRESS_KEY = 'quran_progress_history';
const STORIES_READ_KEY = 'stories_read_history';
const TASBEEH_COUNT_KEY = 'tasbeeh_count_history';

export class ProgressService {
  /**
   * Saves progress for Quran reading
   */
  static saveQuranProgress(surahNumber: number, surahName: string, pageNumber: number): void {
    try {
      const progress: QuranProgress = {
        surahNumber,
        surahName,
        pageNumber,
        timestamp: Date.now()
      };
      localStorage.setItem(QURAN_PROGRESS_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Error saving Quran progress', e);
    }
  }

  /**
   * Retrieves saved Quran progress
   */
  static getQuranProgress(): QuranProgress | null {
    try {
      const saved = localStorage.getItem(QURAN_PROGRESS_KEY);
      if (!saved) return null;
      return JSON.parse(saved);
    } catch {
      return null;
    }
  }

  /**
   * Saves that a specific prophet story has been read
   */
  static saveStoryRead(storyId: string): void {
    try {
      const readStories = this.getReadStories();
      if (!readStories.includes(storyId)) {
        readStories.push(storyId);
        localStorage.setItem(STORIES_READ_KEY, JSON.stringify(readStories));
      }
    } catch (e) {
      console.error('Error saving read story', e);
    }
  }

  /**
   * Retrieves list of read stories
   */
  static getReadStories(): string[] {
    try {
      const saved = localStorage.getItem(STORIES_READ_KEY);
      if (!saved) return [];
      const parsed = JSON.parse(saved);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }

  /**
   * Resets all native app progress data
   */
  static clearAllProgress(): void {
    try {
      localStorage.removeItem(QURAN_PROGRESS_KEY);
      localStorage.removeItem(STORIES_READ_KEY);
      localStorage.removeItem('quran_light_state');
    } catch (e) {
      console.error('Error clearing progress history', e);
    }
  }
}
