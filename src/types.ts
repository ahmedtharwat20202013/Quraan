export interface Surah {
  number: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  revelationType: string;
  startPage?: number;
  pdfUrl?: string;
}

export interface Dua {
  id: string;
  category: 'Morning' | 'Evening' | 'Sleep' | 'General';
  title: string;
  arabic: string;
  translation: string;
  audioUrl?: string;
}

export interface Bookmark {
  surahNumber: number;
  pageNumber: number;
  timestamp: number;
}

export interface DailyVerse {
  surahName: string;
  text: string;
  reference: string;
}

export interface Story {
  id: string;
  title: string;
  content: string;
  category: string;
  image?: string;
}

export interface AppState {
  lastRead: Bookmark | null;
  bookmarks: Bookmark[];
  favorites: string[]; // Dua IDs
  darkMode: boolean;
  fontSize: number;
  dailyVerse?: DailyVerse;
}
