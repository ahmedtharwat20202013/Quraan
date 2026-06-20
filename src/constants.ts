import { Surah, Dua, Story } from './types';

export const SURAHS: Surah[] = [
  { number: 1, name: "الفاتحة", englishName: "Al-Fatiha", englishNameTranslation: "فاتحة الكتاب", numberOfAyahs: 7, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/1.pdf" },
  { number: 2, name: "البقرة", englishName: "Al-Baqarah", englishNameTranslation: "سنام القرآن", numberOfAyahs: 286, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/2.pdf" },
  { number: 3, name: "آل عمران", englishName: "Al-Imran", englishNameTranslation: "العمرانية", numberOfAyahs: 200, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/3.pdf" },
  { number: 4, name: "النساء", englishName: "An-Nisa", englishNameTranslation: "النساء الكبرى", numberOfAyahs: 176, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/4.pdf" },
  { number: 5, name: "المائدة", englishName: "Al-Ma'idah", englishNameTranslation: "العقود", numberOfAyahs: 120, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/5.pdf" },
  { number: 6, name: "الأنعام", englishName: "Al-An'am", englishNameTranslation: "الأنعام", numberOfAyahs: 165, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/6.pdf" },
  { number: 7, name: "الأعراف", englishName: "Al-A'raf", englishNameTranslation: "الميثاق", numberOfAyahs: 206, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/7.pdf" },
  { number: 8, name: "الأنفال", englishName: "Al-Anfal", englishNameTranslation: "بدر", numberOfAyahs: 75, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/8.pdf" },
  { number: 9, name: "التوبة", englishName: "At-Tawbah", englishNameTranslation: "البراءة", numberOfAyahs: 129, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/9.pdf" },
  { number: 10, name: "يونس", englishName: "Yunus", englishNameTranslation: "يونس", numberOfAyahs: 109, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/10.pdf" },
  { number: 11, name: "هود", englishName: "Hud", englishNameTranslation: "هود", numberOfAyahs: 123, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/11.pdf" },
  { number: 12, name: "يوسف", englishName: "Yusuf", englishNameTranslation: "أحسن القصص", numberOfAyahs: 111, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/12.pdf" },
  { number: 13, name: "الرعد", englishName: "Ar-Ra'd", englishNameTranslation: "الرعد", numberOfAyahs: 43, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/13.pdf" },
  { number: 14, name: "إبراهيم", englishName: "Ibrahim", englishNameTranslation: "إبراهيم", numberOfAyahs: 52, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/14.pdf" },
  { number: 15, name: "الحجر", englishName: "Al-Hijr", englishNameTranslation: "الحجر", numberOfAyahs: 99, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/15.pdf" },
  { number: 16, name: "النحل", englishName: "An-Nahl", englishNameTranslation: "النعم", numberOfAyahs: 128, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/16.pdf" },
  { number: 17, name: "الإسراء", englishName: "Al-Isra", englishNameTranslation: "بني إسرائيل", numberOfAyahs: 111, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/17.pdf" },
  { number: 18, name: "الكهف", englishName: "Al-Kahf", englishNameTranslation: "أصحاب الكهف", numberOfAyahs: 110, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/18.pdf" },
  { number: 19, name: "مريم", englishName: "Maryam", englishNameTranslation: "مريم", numberOfAyahs: 98, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/19.pdf" },
  { number: 20, name: "طه", englishName: "Taha", englishNameTranslation: "طه", numberOfAyahs: 135, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/20.pdf" },
  { number: 21, name: "الأنبياء", englishName: "Al-Anbiya", englishNameTranslation: "الأنبياء", numberOfAyahs: 112, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/21.pdf" },
  { number: 22, name: "الحج", englishName: "Al-Hajj", englishNameTranslation: "الحج", numberOfAyahs: 78, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/22.pdf" },
  { number: 23, name: "المؤمنون", englishName: "Al-Mu'minun", englishNameTranslation: "المؤمنون", numberOfAyahs: 118, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/23.pdf" },
  { number: 24, name: "النور", englishName: "An-Nur", englishNameTranslation: "النور", numberOfAyahs: 64, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/24.pdf" },
  { number: 25, name: "الفرقان", englishName: "Al-Furqan", englishNameTranslation: "الفرقان", numberOfAyahs: 77, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/25.pdf" },
  { number: 26, name: "الشعراء", englishName: "Ash-Shu'ara", englishNameTranslation: "الجامعة", numberOfAyahs: 227, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/26.pdf" },
  { number: 27, name: "النمل", englishName: "An-Naml", englishNameTranslation: "الهدهد", numberOfAyahs: 93, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/27.pdf" },
  { number: 28, name: "القصص", englishName: "Al-Qasas", englishNameTranslation: "القصص", numberOfAyahs: 88, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/28.pdf" },
  { number: 29, name: "العنكبوت", englishName: "Al-Ankabut", englishNameTranslation: "العنكبوت", numberOfAyahs: 69, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/29.pdf" },
  { number: 30, name: "الروم", englishName: "Ar-Rum", englishNameTranslation: "الروم", numberOfAyahs: 60, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/30.pdf" },
  { number: 31, name: "لقمان", englishName: "Luqman", englishNameTranslation: "لقمان", numberOfAyahs: 34, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/31.pdf" },
  { number: 32, name: "السجدة", englishName: "As-Sajdah", englishNameTranslation: "المضاجع", numberOfAyahs: 30, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/32.pdf" },
  { number: 33, name: "الأحزاب", englishName: "Al-Ahzab", englishNameTranslation: "الأحزاب", numberOfAyahs: 73, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/33.pdf" },
  { number: 34, name: "سبأ", englishName: "Saba", englishNameTranslation: "سبأ", numberOfAyahs: 54, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/34.pdf" },
  { number: 35, name: "فاطر", englishName: "Fatir", englishNameTranslation: "الملائكة", numberOfAyahs: 45, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/35.pdf" },
  { number: 36, name: "يس", englishName: "Ya-Sin", englishNameTranslation: "قلب القرآن", numberOfAyahs: 83, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/36.pdf" },
  { number: 37, name: "الصافات", englishName: "As-Saffat", englishNameTranslation: "الصافات", numberOfAyahs: 182, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/37.pdf" },
  { number: 38, name: "ص", englishName: "Sad", englishNameTranslation: "ص", numberOfAyahs: 88, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/38.pdf" },
  { number: 39, name: "الزمر", englishName: "Az-Zumar", englishNameTranslation: "الغرف", numberOfAyahs: 75, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/39.pdf" },
  { number: 40, name: "غافر", englishName: "Ghafir", englishNameTranslation: "المؤمن", numberOfAyahs: 85, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/40.pdf" },
  { number: 41, name: "فصلت", englishName: "Fussilat", englishNameTranslation: "حم السجدة", numberOfAyahs: 54, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/41.pdf" },
  { number: 42, name: "الشورى", englishName: "Ash-Shura", englishNameTranslation: "الشورى", numberOfAyahs: 53, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/42.pdf" },
  { number: 43, name: "الزخرف", englishName: "Az-Zukhruf", englishNameTranslation: "الزخرف", numberOfAyahs: 89, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/43.pdf" },
  { number: 44, name: "الدخان", englishName: "Ad-Dukhan", englishNameTranslation: "الدخان", numberOfAyahs: 59, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/44.pdf" },
  { number: 45, name: "الجاثية", englishName: "Al-Jathiyah", englishNameTranslation: "الشريعة", numberOfAyahs: 37, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/45.pdf" },
  { number: 46, name: "الأحقاف", englishName: "Al-Ahqaf", englishNameTranslation: "الأحقاف", numberOfAyahs: 35, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/46.pdf" },
  { number: 47, name: "محمد", englishName: "Muhammad", englishNameTranslation: "القتال", numberOfAyahs: 38, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/47.pdf" },
  { number: 48, name: "الفتح", englishName: "Al-Fath", englishNameTranslation: "الفتح", numberOfAyahs: 29, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/48.pdf" },
  { number: 49, name: "الحجرات", englishName: "Al-Hujurat", englishNameTranslation: "الأخلاق", numberOfAyahs: 18, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/49.pdf" },
  { number: 50, name: "ق", englishName: "Qaf", englishNameTranslation: "ق", numberOfAyahs: 45, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/50.pdf" },
  { number: 51, name: "الذاريات", englishName: "Adh-Dhariyat", englishNameTranslation: "الذاريات", numberOfAyahs: 60, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/51.pdf" },
  { number: 52, name: "الطور", englishName: "At-Tur", englishNameTranslation: "الطور", numberOfAyahs: 49, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/52.pdf" },
  { number: 53, name: "النجم", englishName: "An-Najm", englishNameTranslation: "النجم", numberOfAyahs: 62, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/53.pdf" },
  { number: 54, name: "القمر", englishName: "Al-Qamar", englishNameTranslation: "اقتربت", numberOfAyahs: 55, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/54.pdf" },
  { number: 55, name: "الرحمن", englishName: "Ar-Rahman", englishNameTranslation: "عروس القرآن", numberOfAyahs: 78, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/55.pdf" },
  { number: 56, name: "الواقعة", englishName: "Al-Waqi'ah", englishNameTranslation: "الواقعة", numberOfAyahs: 96, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/56.pdf" },
  { number: 57, name: "الحديد", englishName: "Al-Hadid", englishNameTranslation: "الحديد", numberOfAyahs: 29, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/57.pdf" },
  { number: 58, name: "المجادلة", englishName: "Al-Mujadila", englishNameTranslation: "قد سمع", numberOfAyahs: 22, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/58.pdf" },
  { number: 59, name: "الحشر", englishName: "Al-Hashr", englishNameTranslation: "بني النضير", numberOfAyahs: 24, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/59.pdf" },
  { number: 60, name: "الممتحنة", englishName: "Al-Mumtahanah", englishNameTranslation: "المودة", numberOfAyahs: 13, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/60.pdf" },
  { number: 61, name: "الصف", englishName: "As-Saff", englishNameTranslation: "الحواريين", numberOfAyahs: 14, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/61.pdf" },
  { number: 62, name: "الجمعة", englishName: "Al-Jumu'ah", englishNameTranslation: "الجمعة", numberOfAyahs: 11, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/62.pdf" },
  { number: 63, name: "المنافقون", englishName: "Al-Munafiqun", englishNameTranslation: "المنافقون", numberOfAyahs: 11, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/63.pdf" },
  { number: 64, name: "التغابن", englishName: "At-Taghabun", englishNameTranslation: "التغابن", numberOfAyahs: 18, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/64.pdf" },
  { number: 65, name: "الطلاق", englishName: "At-Talaq", englishNameTranslation: "النساء الصغرى", numberOfAyahs: 12, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/65.pdf" },
  { number: 66, name: "التحريم", englishName: "At-Tahrim", englishNameTranslation: "يا أيها النبي", numberOfAyahs: 12, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/66.pdf" },
  { number: 67, name: "الملك", englishName: "Al-Mulk", englishNameTranslation: "تبارك", numberOfAyahs: 30, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/67.pdf" },
  { number: 68, name: "القلم", englishName: "Al-Qalam", englishNameTranslation: "ن والقلم", numberOfAyahs: 52, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/68.pdf" },
  { number: 69, name: "الحاقة", englishName: "Al-Haqqah", englishNameTranslation: "الحاقة", numberOfAyahs: 52, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/69.pdf" },
  { number: 70, name: "المعارج", englishName: "Al-Ma'arij", englishNameTranslation: "سأل سائل", numberOfAyahs: 44, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/70.pdf" },
  { number: 71, name: "نوح", englishName: "Nuh", englishNameTranslation: "نوح", numberOfAyahs: 28, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/71.pdf" },
  { number: 72, name: "الجن", englishName: "Al-Jinn", englishNameTranslation: "الجن", numberOfAyahs: 28, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/72.pdf" },
  { number: 73, name: "المزمل", englishName: "Al-Muzzammil", englishNameTranslation: "المزمل", numberOfAyahs: 20, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/73.pdf" },
  { number: 74, name: "المدثر", englishName: "Al-Muddathir", englishNameTranslation: "المدثر", numberOfAyahs: 56, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/74.pdf" },
  { number: 75, name: "القيامة", englishName: "Al-Qiyamah", englishNameTranslation: "لا أقسم", numberOfAyahs: 40, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/75.pdf" },
  { number: 76, name: "الإنسان", englishName: "Al-Insan", englishNameTranslation: "الدهر", numberOfAyahs: 31, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/76.pdf" },
  { number: 77, name: "المرسلات", englishName: "Al-Mursalat", englishNameTranslation: "العرف", numberOfAyahs: 50, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/77.pdf" },
  { number: 78, name: "النبأ", englishName: "An-Naba", englishNameTranslation: "يساءلون", numberOfAyahs: 40, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/78.pdf" },
  { number: 79, name: "النازعات", englishName: "An-Nazi'at", englishNameTranslation: "الساهرة", numberOfAyahs: 46, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/79.pdf" },
  { number: 80, name: "عبس", englishName: "Abasa", englishNameTranslation: "الصاخة", numberOfAyahs: 42, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/80.pdf" },
  { number: 81, name: "التكوير", englishName: "At-Takwir", englishNameTranslation: "التكوير", numberOfAyahs: 29, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/81.pdf" },
  { number: 82, name: "الانفطار", englishName: "Al-Infitar", englishNameTranslation: "الانفطار", numberOfAyahs: 19, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/82.pdf" },
  { number: 83, name: "المطففين", englishName: "Al-Mutaffifin", englishNameTranslation: "التطفيف", numberOfAyahs: 36, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/83.pdf" },
  { number: 84, name: "الانشقاق", englishName: "Al-Inshiqaq", englishNameTranslation: "الانشقاق", numberOfAyahs: 25, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/84.pdf" },
  { number: 85, name: "البروج", englishName: "Al-Buruj", englishNameTranslation: "البروج", numberOfAyahs: 22, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/85.pdf" },
  { number: 86, name: "الطارق", englishName: "At-Tariq", englishNameTranslation: "الطارق", numberOfAyahs: 17, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/86.pdf" },
  { number: 87, name: "الأعلى", englishName: "Al-A'la", englishNameTranslation: "الأعلى", numberOfAyahs: 19, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/87.pdf" },
  { number: 88, name: "الغاشية", englishName: "Al-Ghashiyah", englishNameTranslation: "الغاشية", numberOfAyahs: 26, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/88.pdf" },
  { number: 89, name: "الفجر", englishName: "Al-Fajr", englishNameTranslation: "الفجر", numberOfAyahs: 30, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/89.pdf" },
  { number: 90, name: "البلد", englishName: "Al-Balad", englishNameTranslation: "البلد", numberOfAyahs: 20, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/90.pdf" },
  { number: 91, name: "الشمس", englishName: "Ash-Shams", englishNameTranslation: "الشمس", numberOfAyahs: 15, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/91.pdf" },
  { number: 92, name: "الليل", englishName: "Al-Lail", englishNameTranslation: "الليل", numberOfAyahs: 21, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/92.pdf" },
  { number: 93, name: "الضحى", englishName: "Ad-Duha", englishNameTranslation: "الضحى", numberOfAyahs: 11, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/93.pdf" },
  { number: 94, name: "الشرح", englishName: "Ash-Sharh", englishNameTranslation: "الانشراح", numberOfAyahs: 8, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/94.pdf" },
  { number: 95, name: "التين", englishName: "At-Tin", englishNameTranslation: "التين", numberOfAyahs: 8, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/95.pdf" },
  { number: 96, name: "العلق", englishName: "Al-Alaq", englishNameTranslation: "اقرأ", numberOfAyahs: 19, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/96.pdf" },
  { number: 97, name: "القدر", englishName: "Al-Qadr", englishNameTranslation: "القدر", numberOfAyahs: 5, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/97.pdf" },
  { number: 98, name: "البينة", englishName: "Al-Bayyinah", englishNameTranslation: "البرية", numberOfAyahs: 8, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/98.pdf" },
  { number: 99, name: "الزلزلة", englishName: "Az-Zalzalah", englishNameTranslation: "الزلزلة", numberOfAyahs: 8, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/99.pdf" },
  { number: 100, name: "العاديات", englishName: "Al-Adiyat", englishNameTranslation: "العاديات", numberOfAyahs: 11, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/100.pdf" },
  { number: 101, name: "القارعة", englishName: "Al-Qari'ah", englishNameTranslation: "القارعة", numberOfAyahs: 11, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/101.pdf" },
  { number: 102, name: "التكاثر", englishName: "At-Takathur", englishNameTranslation: "التكاثر", numberOfAyahs: 8, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/102.pdf" },
  { number: 103, name: "العصر", englishName: "Al-Asr", englishNameTranslation: "العصر", numberOfAyahs: 3, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/103.pdf" },
  { number: 104, name: "الهمزة", englishName: "Al-Humazah", englishNameTranslation: "الهمزة", numberOfAyahs: 9, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/104.pdf" },
  { number: 105, name: "الفيل", englishName: "Al-Fil", englishNameTranslation: "الأصحاب", numberOfAyahs: 5, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/105.pdf" },
  { number: 106, name: "قريش", englishName: "Quraish", englishNameTranslation: "قريش", numberOfAyahs: 4, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/106.pdf" },
  { number: 107, name: "الماعون", englishName: "Al-Ma'un", englishNameTranslation: "الدين", numberOfAyahs: 7, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/107.pdf" },
  { number: 108, name: "الكوثر", englishName: "Al-Kauthar", englishNameTranslation: "الخير الكثير", numberOfAyahs: 3, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/108.pdf" },
  { number: 109, name: "الكافرون", englishName: "Al-Kafirun", englishNameTranslation: "الكافرون", numberOfAyahs: 6, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/109.pdf" },
  { number: 110, name: "النصر", englishName: "An-Nasr", englishNameTranslation: "الفتح", numberOfAyahs: 3, revelationType: "مدنية", startPage: 1, pdfUrl: "/pdfs/110.pdf" },
  { number: 111, name: "المسد", englishName: "Al-Masad", englishNameTranslation: "تّبت", numberOfAyahs: 5, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/111.pdf" },
  { number: 112, name: "الإخلاص", englishName: "Al-Ikhlas", englishNameTranslation: "التوحيد", numberOfAyahs: 4, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/112.pdf" },
  { number: 113, name: "الفلق", englishName: "Al-Falaq", englishNameTranslation: "الفلق", numberOfAyahs: 5, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/113.pdf" },
  { number: 114, name: "الناس", englishName: "An-Nas", englishNameTranslation: "الناس", numberOfAyahs: 6, revelationType: "مكية", startPage: 1, pdfUrl: "/pdfs/114.pdf" }
];

export const DUAS: Dua[] = [
  {
    id: 'm1',
    category: 'Morning',
    title: 'أذكار الصباح',
    arabic: 'أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ، لاَ إِلَهَ إِلاَّ اللَّهُ وَحْدَهُ لاَ شَرِيكَ لَهُ',
    translation: 'أصبحنا وأصبح الملك لله والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',
  },
  {
    id: 'e1',
    category: 'Evening',
    title: 'أذكار المساء',
    arabic: 'أَمْسَيْنَا وَأَمْسَى الْمُلْكُ لِلَّهِ، وَالْحَمْدُ لِلَّهِ',
    translation: 'أمسينا وأمسى الملك لله والحمد لله، لا إله إلا الله وحده لا شريك له، له الملك وله الحمد وهو على كل شيء قدير.',
  },
  {
    id: 's1',
    category: 'Sleep',
    title: 'أذكار النوم',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
    translation: 'باسمك اللهم أموت وأحيا.',
  },
  {
    id: 'g1',
    category: 'General',
    title: 'دعاء المغفرة',
    arabic: 'اللهم اغفر لي خطيئتي وجهلي، وإسرافي في أمري، وما أنت أعلم به مني، اللهم اغفر لي جدي وهزلي؛ وخطئي وعمدي؛ وكل ذلك عندي، اللهم اغفر لي ما قدمت وما أخرت، وما أسررت وما أعلنت، وما أنت أعلم به مني، أنت المقدم، وأنت المؤخر، وأنت على كل شيء قدير',
    translation: 'اللهم اغفر لي ذنوبي كلها دِقّها وجِلّها وأولها وآخرها وعلانيتها وسرها.',
  },
  {
    id: 'g2',
    category: 'General',
    title: 'سؤال موجبات الرحمة',
    arabic: 'اللهم إنا نسألك موجبات رحمتك، وعزائم مغفرتك، والسلامة من كل إثم، والغنيمة من كل بر، والفوز بالجنة، والنجاة من النار',
    translation: 'نسأل الله الجنة ونعوذ به من النار.',
  },
  {
    id: 'g3',
    category: 'General',
    title: 'دعاء العون والاعتصام',
    arabic: 'رب أعني ولا تعن علي، وانصرني ولا تنصر علي، وامكر لي ولا تمكر علي، واهدني ويسر الهدى إلي، وانصرني على من بغى علي، رب اجعلني لك شكارا، لك ذكارا، لك رهابا، لك مطواعا، إليك مخبتا أواها منيبا، رب تقبل توبتي، واغسل حوبتي، وأجب دعوتي، وثبت حجتي، واهد قلبي، وسدد لساني، واسلل سخيمة قلبي',
    translation: 'اللهم اجعلني لك طائعاً ولك شاكراً.',
  },
  {
    id: 'g4',
    category: 'General',
    title: 'صلاح الدين والدنيا',
    arabic: 'اللهم أصلح لي ديني الذي هو عصمة أمري، وأصلح لي دنياي التي فيها معاشي، وأصلح لي آخرتي التي فيها معادي، واجعل الحياة زيادة لي في كل خير، واجعل الموت راحة لي من كل شر',
    translation: 'اللهم اجعل خير عمري آخره وخير عملي خواتمه.',
  },
  {
    id: 'g5',
    category: 'General',
    title: 'الاستعاذة من العجز',
    arabic: 'اللهم إني أعوذ بك من العجز، والكسل، والجبن، والبخل، والهرم، وعذاب القبر، اللهم آت نفسي تقواها، وزكها أنت خير من زكاها، أنت وليها ومولاها، اللهم إني أعوذ بك من علم لا ينفع، ومن قلب لا يخشع، ومن نفس لا تشبع، ومن دعوة لا يستجاب لها',
    translation: 'نعوذ بالله من الهم والحزن والعجز والكسل.',
  }
];

export const STORIES: Story[] = [
  {
    id: 's1',
    title: 'مولد النبي ﷺ: الطفل الذي أضاء الدنيا',
    category: 'النبي محمد ﷺ',
    content: `في صباح يوم مشرق وجميل، كانت الطيور تغرد بسعادة في مدينة مكة. وفي ذلك اليوم، وُلد طفلٌ رائع وجميل جداً، كان وجهه يشبه القمر المنير في ليلة صافية. 

عندما سمع جده "عبد المطلب" بخبر ولادته، فرح فرحاً شديداً لم يشعر به من قبل. أسرع إلى البيت، وحمل حفيده الصغير بحنان بين يديه، ثم ذهب به إلى الكعبة المشرفة وطاف به وهو يبتسم بفخر واعتزاز، واختار له اسماً جميلاً ومميزاً وهو "محمد" ﷺ.

كان محمد ﷺ طفلاً مختلفاً عن بقية الأطفال. كان يحب اللعب والمرح مع أصدقائه، ولكنه لم يكذب أبداً، ولم يتشاجر مع أحد، ولم يؤذِ إنساناً أو حتى عصفوراً صغيراً. كان هادئاً، يبتسم دائماً، ويشارك طعامه مع المحتاجين والفقراء.

بسبب هذه الأخلاق الرائعة، أحبه كل أهل مكة، وعندما كبر قليلاً، أطلقوا عليه لقباً جميلاً وهو "الصادق الأمين"، لأنهم كانوا يثقون به في كل شيء. وقد كبر هذا الطفل الجميل ليصبح أعظم وأرحم إنسان عرفه العالم!

الدرس الجميل يا أصدقائي: أن نكون دائماً صادقين ونقول الحق، ونشارك ألعابنا ونساعد غيرنا، ونتعامل بلطف مع الجميع لنكون محبوبين من الله والناس مثل نبينا الحبيب.`
  },
  {
    id: 's2',
    title: 'في غار حراء: المفاجأة العظيمة من السماء',
    category: 'النبي محمد ﷺ',
    content: `كان نبينا محمد ﷺ يحب الهدوء والتفكير بعيداً عن ضجيج الناس. فكان يصعد إلى مكان مرتفع جداً في الجبل يسمى "غار حراء". هناك، كان يجلس وحده، يتأمل النجوم اللامعة في السماء، ويفكر في عظمة الله الذي خلق هذا الكون الجميل والواسع.

وفي ليلة هادئة جداً ومظلمة، حدث شيء لم يكن يتوقعه أبداً! فجأة، نزل عليه مَلَكٌ عظيم من السماء، يمتلئ بالنور والجمال، واسمه "جبريل" عليه السلام. اقترب المَلَك من النبي ﷺ.

قال المَلَك للنبي بصوت لطيف وقوي: "اقرأ!". فتعجب النبي ﷺ لأنه لم يذهب إلى مدرسة ولم يتعلم القراءة، فقال بصوت يرتجف قليلاً: "ما أنا بقارئ" (يعني أنا لا أعرف القراءة). فضمه المَلَك بحب وقوة، ثم تركه وقال له مرة أخرى: "اقرأ باسم ربك الذي خلق".

شعر النبي ﷺ برهبة كبيرة، وعاد مسرعاً إلى بيته، وقلبه يدق بسرعة. استقبلته زوجته الطيبة الحنونة السيدة "خديجة". عندما أخبرها بما حدث، طمأنته بابتسامة دافئة وقالت: "لا تخف أبداً، أنت إنسان طيب، تصل الرحم، وتساعد الضعفاء، وتطعم الجائع، والله دائماً يحمي الطيبين ولن يتركك أبداً".

الدرس الجميل يا أبطال: أن التأمل في طبيعة الكون يقربنا من الله، وأن العائلة دائماً هي الحضن الدافئ الذي يدعمنا ويساندنا عندما نشعر بالخوف.`
  },
  {
    id: 's3',
    title: 'النداء من فوق الجبل: قصة الشجاعة',
    category: 'النبي محمد ﷺ',
    content: `في يوم من الأيام، قرر النبي ﷺ أن يخبر كل أهل مكة برسالة الإسلام. فصعد بخطوات واثقة على جبل عالٍ ومعروف في مكة اسمه جبل "الصفا". وقف في أعلى الجبل، ونادى بأعلى صوته ليجمع كل الناس من بيوتهم.

تجمع الناس بسرعة، وهم يتساءلون: "ماذا حدث؟ لماذا ينادينا الصادق الأمين؟". ولما حضروا جميعاً، نظر إليهم النبي ﷺ وسألهم سؤالاً ذكياً: "أرأيتم لو أخبرتكم أن هناك جيشاً كبيراً يختبئ خلف هذا الجبل ويريد أن يهاجمكم، هل كنتم ستصدقونني؟".

صاح الجميع بصوت واحد وبلا تردد: "نعم! فأنت لم تكذب علينا أبداً، وما جربنا عليك إلا الصدق". كانوا يثقون به ثقة عمياء.

عندها أخذ النبي ﷺ نفساً عميقاً، وأخبرهم بشجاعة وقوة: "إذن صدقوني الآن، الله واحد لا شريك له، وهو الذي خلقنا، وأنا رسوله إليكم". تفاجأ الناس، وغضب بعضهم بشدة لأنهم لم يريدوا ترك أصنامهم، لكن النبي كان بطلاً شجاعاً ولم يخف من غضبهم وصراخهم، وبدأ نور الإسلام ينتشر من ذلك اليوم.

نتعلم من القصة: الشجاعة في قول الحق حتى لو غضب البعض منا، وأن الصدق يجعل الناس تثق بنا دائماً وتحترمنا.`
  },
  {
    id: 's4',
    title: 'ابتسامة النبي ﷺ: أقوى من الشوك',
    category: 'النبي محمد ﷺ',
    content: `هل تعلمون أن بعض الأشرار في مكة كانوا يغارون جداً من حب الناس للنبي ﷺ؟ لقد فعلوا أشياء سيئة للغاية لإيذائه. كانوا يجمعون الشوك المؤذي والقاسي من الصحراء، ويضعونه في الطريق الذي يمشي فيه النبي ليلاً، ليجرحوا قدميه الشريفتين!

كانت الأشواك تؤلمه وتجرحه، لكن، هل صرخ النبي؟ هل غضب وذهب ليضربهم أو يشتمهم؟ لا أبداً! كان النبي ﷺ يبعد الشوك عن الطريق بهدوء، ويبتسم ويصبر على أذاهم.

لم يكتفِ بالصبر فقط، بل كان يرفع يديه للسماء ويدعو الله لهم قائلاً: "يا رب اهدِ قومي، فهم لا يعرفون الحقيقة". كان يتمنى لهم الخير رغم قسوتهم.

حتى في يوم من الأيام، نزل مَلَك الجبال وعرض على النبي أن يطبق جبلين عظيمين على هؤلاء الأشرار ليعاقبهم، لكن النبي الرحيم رفض بشدة، وقال: "لا، بل أرجو أن يخرج الله من أطفالهم من يعبد الله ولا يشرك به شيئاً". لقد فضل الرحمة على الانتقام.

الدرس الجميل يا أصدقائي: التسامح والصبر يجعلك بطلاً حقيقياً، ومقابلة الإساءة بالابتسامة والدعاء بالخير هي أخلاق الأقوياء فقط.`
  },
  {
    id: 's5',
    title: 'رحلة الهجرة: العنكبوت والحمامة الشجاعة',
    category: 'النبي محمد ﷺ',
    content: `عندما اشتد أذى الأشرار، أمر الله النبي ﷺ أن يترك مكة ويسافر إلى مدينة جميلة وطيبة تسمى "المدينة المنورة"، حيث ينتظره أصدقاؤه المسلمون. وفي منتصف الليل المظلم، خرج النبي بهدوء مع صديقه المخلص "أبو بكر الصديق".

كان الأشرار يبحثون عنهما في كل مكان ليمسكوا بهما. وفي الطريق الصحراوي الطويل، اختبأ النبي وصديقه في كهف صغير ومظلم يسمى "غار ثور" ليرتاحا قليلاً من عناء السفر.

ولكن الأشرار وصلوا إلى باب الكهف! شعر أبو بكر بالخوف على النبي، لكن النبي قال له بهدوء وثقة: "لا تحزن، إن الله معنا". ولحمايتهما، لم يرسل الله جيشاً كبيراً، بل أرسل جنوداً صغاراً جداً!

بأمر من الله، جاء عنكبوتٌ صغير ونسج خيوطه المعقدة بسرعة ومهارة على باب الكهف. ثم جاءت حمامة هادئة، وبنت عشها وباضت هناك كأن المكان لم يدخله أحد منذ سنوات. ولما نظر الأشرار قالوا: "مستحيل أن يكونا بالداخل، انظروا لبيت العنكبوت القديم وعش الحمامة!". وعادوا خائبين، ونجا النبي بفضل الله.

نتعلم من القصة يا أبطال: أن الله يحمي الطيبين دائماً ويرعاهم، وأن أصغر الكائنات وأضعفها قد تقوم بأعظم البطولات إذا أمرها الله!`
  },
  {
    id: 's6',
    title: 'بناء المسجد: الناقة الذكية والعمل الجماعي',
    category: 'النبي محمد ﷺ',
    content: `بعد رحلة طويلة ومتعبة، وصل النبي ﷺ أخيراً إلى "المدينة المنورة". خرج الناس جميعاً لاستقباله وهم ينشدون فرحين، وكانت الابتسامات تملأ الوجوه. أراد كل شخص هناك أن يمسك بحبل ناقة النبي ليجعله ضيفاً في بيته الجميل.

لكن النبي ﷺ كان عادلاً ولطيفاً، فابتسم لهم وقال: "اتركوا ناقتي (جملي) تمشي وتتحرك بحريتها، فالله هو من يخبرها أين تقف". ومشت الناقة والناس يمشون خلفها بترقب، حتى توقفت وبركت في مكان واسع وفارغ.

قرر النبي أن يبني في هذا المكان "المسجد النبوي" ليكون مكاناً للصلاة ولتجمع المسلمين. وبدأ العمل فوراً! ولم يجلس النبي ليستريح في الظل ويأمر الناس بالعمل، بل شمر عن ذراعيه وبدأ يعمل معهم!

كان النبي ﷺ يحمل الحجارة الثقيلة والتراب بيده مع أصحابه. وكانوا أثناء العمل المجهد ينشدون الأناشيد معاً بنشاط وفرح لنسيان التعب. كان مشهداً رائعاً مليئاً بالحب والتعاون.

الدرس الجميل: القائد العظيم هو من يعمل بيده جنباً إلى جنب مع أصدقائه، والتعاون والعمل في فريق يجعل العمل الصعب والممل يصبح ممتعاً وسهلاً!`
  },
  {
    id: 's7',
    title: 'يوم بدر: مطر الخير وملائكة السماء',
    category: 'النبي محمد ﷺ',
    content: `في معركة تسمى "بدر"، كان المسلمون يمرون باختبار صعب جداً. كان عددهم قليلاً، وكانوا يشعرون بالعطش والتعب، بينما كان جيش الأشرار كبيراً جداً ومسلحاً جيداً.

نظر النبي ﷺ إلى أصحابه القليلين، ثم رفع يديه عالياً نحو السماء، وبدأ يدعو ربه بإلحاح ورجاء أن يساعدهم وينصرهم لأنهم يدافعون عن الحق. هل تخمنون ماذا حدث بعد هذا الدعاء الصادق؟

استجاب الله فوراً! أنزل الله مطراً لطيفاً ومنعشاً من السماء، فشرب المسلمون واغتسلوا، وجعل المطر رمال الصحراء متماسكة وقوية تحت أقدامهم لكي لا يغوصوا فيها. ولم يتوقف الأمر عند هذا الحد!

لقد أرسل الله ملائكة من السماء لتقاتل مع المسلمين وتثبت قلوبهم! وبفضل الله، انتصر المسلمون انتصاراً عظيماً. وبعد المعركة، لم يعاقب النبي الأسرى بقسوة، بل طلب منهم أن يعلموا أطفال المسلمين القراءة والكتابة ليعودوا أحراراً إلى بيوتهم.

نتعلم من القصة يا أصدقائي: الدعاء الصادق لله يحقق المعجزات، وأن تعلم القراءة والكتابة شيء غالي ومهم جداً في ديننا، فهو ثمن للحرية.`
  },
  {
    id: 's8',
    title: 'يوم أحد: أهمية الاستماع لكلام القائد',
    category: 'النبي محمد ﷺ',
    content: `في يوم غزوة "أحد"، وضع النبي ﷺ خطة ذكية لحماية المسلمين. اختار مجموعة من أمهر الرماة (الذين يرمون بالأسهم)، وطلب منهم أن يصعدوا ويقفوا فوق جبل صغير لحماية ظهور المسلمين من أي هجوم خلفي.

قال لهم النبي بحزم ووضوح: "لا تنزلوا من على الجبل أبداً مهما حدث، سواء انتصرنا أو خسرنا، ابقوا في أماكنكم". بدأت المعركة، وكان المسلمون ينتصرون بقوة، وبدأ الأشرار يهربون ويتركون أشياءهم وغنائمهم على الأرض.

لما رأى الرماة فوق الجبل أن المعركة انتهت وأن أصدقاءهم يجمعون الغنائم، فرحوا كثيراً، ونسوا كلام النبي وتحذيره الواضح! نزل معظمهم من على الجبل ليشاركوا في جمع الأشياء، وتركوا أماكنهم فارغة.

بسبب هذا الخطأ السريع وعدم الالتزام بالتعليمات، لاحظ قائد فرسان الأعداء الجبل الفارغ، فالتف بسرعة وهاجم المسلمين من الخلف! انقلبت المعركة، وأصيب النبي ﷺ، وحزن الأصحاب كثيراً، لكنهم تعلموا درساً لن ينسوه أبداً عن أهمية طاعة القائد.

الدرس الجميل يا أبطال: الاستماع لكلام من هم أكبر منا وأكثر حكمة (مثل بابا وماما والمعلم) وتنفيذ تعليماتهم بدقة يحمينا من الأخطار والمشاكل المفاجئة.`
  },
  {
    id: 's9',
    title: 'صلح الحديبية: السلام أفضل من الشجار',
    category: 'النبي محمد ﷺ',
    content: `بعد سنوات من مغادرة مكة، اشتاق النبي ﷺ وأصحابه كثيراً لرؤية الكعبة المشرفة والصلاة فيها. فقرروا السفر، ولبسوا ملابس الإحرام البيضاء الجميلة، وأخذوا معهم الهدايا والحيوانات، ولم يحملوا سيوفاً للحرب، بل أرادوا زيارة سلمية.

لكن عندما اقتربوا من مكة، أغلق أهل مكة الأشرار الطريق في وجوههم، ورفضوا بشدة أن يسمحوا لهم بالدخول! كان الموقف متوتراً جداً، وكان من الممكن أن تحدث معركة كبيرة.

بدل أن يغضب النبي ويأمر أصحابه بالقتال والشجار، اختار طريقاً أجمل. جلس وتحدث مع مبعوثي مكة بهدوء وحكمة بالغة. وبعد حوار طويل، اتفقوا على توقيع معاهدة سلام تُعرف بـ "صلح الحديبية"، والتي تنص على أن يعود المسلمون هذا العام ويأتوا في العام القادم.

شعر بعض الأصحاب بالغضب والحزن لأنهم لم يدخلوا مكة، لكن النبي كان يرى المستقبل بنور الله. وبفضل هذا السلام والهدوء المتبادل، أمن الناس على حياتهم، وبدأوا يتحدثون مع المسلمين، فدخل أناس كثيرون جداً في الإسلام حباً في هدوئه وسماحته.

نتعلم من القصة: التحدث بهدوء والتفكير في السلام يحلان المشاكل الكبيرة المعقدة أفضل بكثير من الغضب والصوت العالي والشجار.`
  },
  {
    id: 's10',
    title: 'العودة لمكة: القلب الكبير المسامح',
    category: 'النبي محمد ﷺ',
    content: `مرت السنوات، وأصبح المسلمون قوة كبيرة. وفي يوم عظيم، عاد النبي ﷺ إلى مكة، مدينته التي وُلد فيها، ومعه جيش ضخم جداً وقوي، يتكون من عشرة آلاف مسلم. دخلوا مكة بهدوء تام دون أي قتال أو تدمير.

تجمع أهل مكة، وهم نفس الأشخاص الذين آذوا النبي وطردوه قديماً ووضعوا الشوك في طريقه. وقفوا أمامه وهم يرتجفون من الخوف، يظنون أنه سينتقم منهم ويعاقبهم أشد العقاب على كل ما فعلوه به وبأصحابه.

نظر إليهم النبي ﷺ بعين الرحمة، وسألهم بصوته الحنون الهادئ: "يا معشر قريش، ما تظنون أني فاعل بكم؟" (ماذا تتوقعون أن أفعل بكم اليوم؟). فأجابوه وهم يرجون رحمته: "خيراً، أخٌ كريم، وابن أخٍ كريم".

فابتسم النبي العظيم، صاحب القلب الأكبر في العالم، وقال كلمته الخالدة: "اذهبوا فأنتم الطلقاء!" (يعني أنتم أحرار، لقد سامحتكم). لم يصدقوا أنفسهم، ففرحوا جداً، وبكوا من شدة طيبته وعفوه، ودخلوا جميعاً في الإسلام بحب.

الدرس الجميل يا أصدقائي: التسامح والعفو عن من أخطأ في حقنا عندما نكون قادرين على معاقبته يثبت أننا عظماء حقاً، ويحول الأعداء إلى أصدقاء مقربين.`
  },
  {
    id: 's11',
    title: 'النبي الجد: اللعب وقت الصلاة!',
    category: 'النبي محمد ﷺ',
    content: `هل تعلمون كم كان النبي ﷺ يحب الأطفال الصغار ويحن عليهم؟ كان دائماً يبتسم في وجوههم، ويمسح على رؤوسهم، ويعطيهم الحلوى. وفي يوم من الأيام، حدث موقف عجيب جداً في المسجد!

كان النبي ﷺ يصلي إماماً بالناس، وكان المسجد هادئاً جداً. ولما سجد النبي على الأرض، انطلق حفيده الصغير "الحسن" يركض بسعادة، وركب على ظهر جده النبي وكأنه يركب حصاناً صغيراً ليلعب!

تخيلوا ماذا فعل النبي؟ أطال النبي السجود جداً، وبقي ثابتاً على الأرض لم يتحرك، حتى لا يوقع حفيده الصغير أو يفسد عليه لعبته وفرحته. انتظر الناس طويلاً وهم مستغربون من هذا السجود الطويل.

ولما انتهت الصلاة، سأله الناس بقلق: "يا رسول الله، لقد أطلت السجود حتى ظننا أنه حدث لك شيء؟!". فقال النبي مبتسماً بحنان: "كل ذلك لم يكن، ولكن ابني (حفيدي) ارتحلني (ركب على ظهري)، فكرهت أن أعجله حتى يقضي حاجته من اللعب". 

نتعلم من القصة: اللطف البالغ واللعب مع الصغار واحترام طفولتهم من صفات الأنبياء الكرام، والدين الإسلامي هو دين الرحمة والحب والابتسامة.`
  },
  {
    id: 's12',
    title: 'الجمل الباكي والعصفورة الخائفة',
    category: 'النبي محمد ﷺ',
    content: `في أحد الأيام، دخل النبي ﷺ إلى حديقة كبيرة (بستان) لرجل من أصحابه. وهناك، رأى جملاً ضعيفاً يقف في الزاوية. وعندما رأى الجملُ النبيَّ، بدأ يئن ويُصدر أصواتاً حزينة، وكانت دموعه تنزل بغزارة من عينيه الكبيرتين!

اقترب النبي ﷺ فوراً من الجمل، ومسح بيده الشريفة على رأسه وخلف أذنيه بحنان بالغ حتى هدأ الجمل وسكت. ثم غضب النبي ونادى صاحب الجمل وقال له بحزم: "ألا تتقي الله (تخاف الله) في هذه البهيمة التي ملكك الله إياها؟ فإنه شكا إلي أنك تجيعه وتتعبه في العمل الشاق!".

وفي مرة أخرى، كان النبي يمشي مع أصحابه في السفر، فرأوا عصفورة ترفرف بأجنحتها بقوة وتدور فوق رؤوسهم وهي خائفة وتصدر أصواتاً مزعجة، لأن أحد الأصحاب أخذ فراخها الصغيرة من العش ليلعب بها.

بمجرد أن رآها النبي، فهم حزنها فوراً، فقال بلهجة حازمة: "من فجع هذه بولدها؟ ردوا ولدها إليها!". فأسرع الرجل وأعاد الفراخ إلى العش لتفرح الأم وتطمئن.

الدرس الجميل يا أبطال: الرفق بالحيوانات والطيور، وإطعامها، وعدم إيذائها أو تخويفها، هو أمر عظيم يحبه الله ورسوله، وهو سبب لدخولنا الجنة.`
  },
  {
    id: 's13',
    title: 'الإسراء والمعراج: رحلة إلى السماء',
    category: 'النبي محمد ﷺ',
    content: `تخيلوا معي أن تسافروا من الأرض إلى أعالي السماء، وتعودوا في نفس الليلة! هذا ما حدث بالفعل لنبينا ﷺ في معجزة عظيمة كافأه الله بها بعد سنوات من التعب والحزن.

في تلك الليلة العجيبة، نزل المَلَك جبريل، وأحضر دابة من الجنة سريعة جداً وجميلة لونها أبيض واسمها "البُراق". ركب النبي البراق، وطار به بسرعة البرق من مدينة "مكة" إلى "المسجد الأقصى" في فلسطين، وهناك وجد كل الأنبياء قبله ينتظرونه، فصلى بهم جميعاً ليكون هو إمامهم.

ثم بدأت الرحلة الأروع! طار النبي ﷺ إلى الأعلى، مخترقاً السحب والنجوم، ومر بالسماوات السبع. هناك شاهد الجنة الرائعة الجمال بأنهارها وأشجارها، ورأى الملائكة الكرام، حتى وصل إلى مكان لم يصله أحد قبله ليتحدث إلى الله عز وجل.

وفي هذه الرحلة الجميلة القريبة من الله، أعطانا الله هدية عظيمة وثمينة جداً لجميع المسلمين، وهي "الصلوات الخمس" لنصليها كل يوم، لتكون صلة بيننا وبين ربنا.

نتعلم من القصة يا أصدقائي: أن الصلاة ليست مجرد حركات، بل هي هديتنا الثمينة من السماء، وبها نسافر بأرواحنا لنتحدث إلى الله كل يوم ونشكره على نعمه.`
  },
  {
    id: 's14',
    title: 'القمر ينشق نصفين!',
    category: 'النبي محمد ﷺ',
    content: `في مكة، كان المشركون الأشرار يعاندون النبي ﷺ كثيراً ويرفضون تصديقه، رغم أنهم يعرفون صدقه. وفي ليلة من الليالي، حيث كان القمر بدراً مكتملاً ومنيراً جداً في السماء، قرروا أن يطلبوا منه شيئاً مستحيلاً تماماً.

قالوا له وهم يضحكون ومستعدون للسخرية منه: "إن كنت حقاً نبياً، فاقسم لنا هذا القمر في السماء الساطعة إلى نصفين!". كانوا يظنون أنه سيعجز ولن يستطيع فعل شيء.

لم يرتبك النبي ولم يخف. رفع يديه الطاهرتين إلى السماء بكل هدوء، ودعا ربه القوي القدير أن يظهر لهم معجزة ليؤمنوا. وفجأة... أمام أعين الجميع المفتوحة من الصدمة، حدث المستحيل!

انقسم القمر المنير في كبد السماء إلى نصفين حقيقيين وواضحين! نصف ذهب جهة اليمين، ونصف ذهب جهة اليسار، وبينهما فراغ كبير يظهر منه جبل! تعجب الناس جداً وصرخوا. ولكن، لشدة عناد الأشرار قالوا: "هذا سحر قوي!"، بينما الأخيار فرحوا جداً وازدادوا إيماناً بالله ونبيه.

الدرس الجميل: الله الخالق قادر على فعل أي شيء في هذا الكون مهما كان مستحيلاً في عقولنا، وهو دائماً يعطي الأنبياء القوة والمعجزات ليثبتوا للناس الحقيقة.`
  },
  {
    id: 's15',
    title: 'الكلمة الأخيرة: كلنا متساوون كإخوة',
    category: 'النبي محمد ﷺ',
    content: `في آخر حجة للنبي ﷺ، والتي سُميت "حجة الوداع"، وقف النبي على جبل عرفات أمام آلاف مؤلفة من المسلمين. كان بحر من الناس يرتدون الملابس البيضاء، ينظرون إليه بحب ويستمعون باهتمام شديد ليقول لهم نصائح أخيرة وغالية جداً قبل أن يفارقهم.

أخبرهم بكلام جميل ورائع يُعتبر قاعدة لحياتنا، قال لهم بصوت سمعه الجميع: "يا أيها الناس، ألا إن ربكم واحد، وإن أباكم واحد (يقصد آدم). ألا لا فضل لعربي على أعجمي (أجنبي)، ولا لأبيض على أسود، إلا بالتقوى (بالعمل الصالح والأخلاق)".

لقد علمهم أننا كلنا من طين، لا يوجد شخص أفضل من شخص بلون بشرته أو بشكله أو بماله الكثير، الأفضل عند الله فقط هو من يطيع الله ويصنع الخير ويملك قلباً نقياً.

ثم طلب منهم أن يكونوا لطفاء جداً مع النساء والأمهات، وألا يأخذوا أموال أو أشياء غيرهم أبداً. وفي النهاية، سألهم بحب ودموع في عينيه: "هل بلّغت؟" (هل أوصلت لكم رسالة الله؟) فصاح الجميع بصوت هز الجبال وهم يبكون: "نعم، نشهد أنك قد بلّغت!".

نتعلم من القصة يا أبطال: نحن جميعاً في هذا العالم إخوة متساوون، فلا نتنمر على أحد لشكله، والمميز حقاً فينا هو صاحب القلب الطيب والأخلاق الحسنة والعمل الصالح.`
  },
  {
    id: 's16',
    title: 'سيدنا آدم: أول إنسان خلقه الله',
    category: 'سيدنا آدم عليه السلام',
    content: `في قديم الزمان، قبل أن يكون هناك أي إنسان يمشي على كوكب الأرض، أراد الله سبحانه وتعالى أن يخلق بشراً. فأمر الملائكة أن يجمعوا تراباً من كل مكان في الأرض؛ تراباً أحمر وأبيض وأسود وأصفر. 

من هذا التراب الملون والمختلف، خلق الله بيده الكريمة أول إنسان، وسماه "آدم". كان تمثالاً من طين في البداية، ثم نفخ الله فيه من روحه، فدبت فيه الحياة! فتح آدم عينيه لأول مرة، وعطس، فألهمه الله أن يقول: "الحمد لله"، فرد عليه الله قائلاً: "يرحمك ربك يا آدم".

أراد الله أن يبين للملائكة فضل آدم، فعلمه أسماء كل الأشياء في الكون؛ (هذا عصفور، هذه شجرة، هذا قمر، هذه سحابة). ولما سأل الله الملائكة عن الأسماء لم يعرفوا، لكن آدم ذكرها كلها ببراعة!

أمر الله جميع الملائكة أن يسجدوا لآدم سُجود احترام وتقدير لهذا المخلوق الجديد. فسجدوا جميعاً فوراً طاعة لله، إلا واحداً فقط كان يقف معهم وهو "إبليس" (الشيطان). رفض إبليس بشدة لأنه كان مغروراً وقال بتكبر: "أنا أفضل منه، خلقتني من نار وخلقته من طين!". فطرده الله من رحمته بسبب غروره.

الدرس الجميل يا أصدقائي: التواضع وسماع كلام الله يجعلنا محبوبين ومقربين، أما الغرور والتكبر ورؤية أنفسنا أفضل من الآخرين، فهو يبعدنا عن الله وعن الجنة كالشيطان.`
  },
  {
    id: 's17',
    title: 'آدم وحواء: السكن في الجنة الجميلة',
    category: 'سيدنا آدم عليه السلام',
    content: `بعد أن خلق الله سيدنا آدم، أسكنه في الجنة الرائعة. كانت الجنة مكاناً لا يمكن تخيل جماله! فيها أنهار من عسل ولبن وماء صافٍ، وأشجارها مليئة بألذ الثمار وأطيبها، والعصافير الملونة تغرد بأجمل الألحان في كل مكان.

رغم كل هذا الجمال، كان آدم يمشي وحده في الجنة، فشعر بالوحدة وأنه يحتاج إلى شخص يشاركه هذه السعادة. وبينما هو نائم، خلق الله من ضلعه زوجة جميلة وحنونة، ولما استيقظ وجدها بجانبه، وسماها "حواء".

فرح آدم جداً بحواء، وأصبحا يمشيان معاً، ويلعبان، ويتحدثان، ويأكلان من ثمار الجنة اللذيذة. قال الله لهما بحب ورحمة: "اسكنا في الجنة، وكُلا منها من أي مكان تريدان، واستمتعا بكل شيء فيها".

ولكن الله وضع لهما اختباراً صغيراً واحداً فقط، فأشار إلى شجرة معينة وقال لهما: "لا تقربا هذه الشجرة الواحدة، ولا تأكلا منها شيئاً". وعاش آدم وحواء في الجنة في سعادة غامرة ومطلقة، وهما يطيعان الله.

نتعلم من القصة: الأسرة والأصدقاء هم أجمل هدية من الله لكي لا نشعر بالوحدة، وأن الله يعطينا الكثير من النعم، وعلينا فقط أن نلتزم بقواعده البسيطة لنستمر في سعادتنا.`
  },
  {
    id: 's18',
    title: 'الشجرة الممنوعة: قوة كلمة "أنا آسف"',
    category: 'سيدنا آدم عليه السلام',
    content: `كان آدم وحواء يعيشان بسعادة، لكن إبليس (الشيطان) الشرير كان يغار منهما جداً ويكرههما، لأنه طُرد من الجنة بسببهما. فقرر أن يخدعهما ليخرجهما من الجنة الجميلة.

بدأ الشيطان يقترب منهما، ويوسوس لهما بصوت خفيض وناعم، ويدعي أنه صديق ناصح. قال لهما كذباً: "هل تعرفان لماذا منعكما الله من الأكل من هذه الشجرة؟ لأنكما لو أكلتما منها ستصبحان مثل الملائكة، وتعيشان للأبد ولن تموتا أبداً!".

بقي يوسوس لهما أياماً عديدة ويقسم لهما أنه صادق. وللأسف، نسي آدم وحواء كلام الله وتحذيره، وصدقا كذبة الشيطان، ومدت حواء يدها وأخذت ثمرة من الشجرة، وأكلت منها هي وآدم.

فوراً! تغيّر كل شيء، وسقطت عنهما ملابس الجنة الجميلة. شعرا بالخجل الشديد والخوف، وعرفا أنهما وقعا في خطأ كبير جداً. لم يعاندا، بل بكيا بحرقة وقالا لله بصدق: "ربنا ظلمنا أنفسنا، وإن لم تغفر لنا وترحمنا لنكونن من الخاسرين" (يا رب نحن آسفان جداً، لقد أخطأنا فاغفر لنا). وبطيبة ورحمة لا مثيل لها، تقبل الله اعتذارهما وسامحهما فوراً!

الدرس الجميل يا أبطال: كل إنسان قد يخطئ وينسى، لكن البطل الشاطر هو من لا يستمر في الخطأ ويعاند، بل يعترف بخطئه فوراً، ويقول "أنا آسف" ويطلب السماح من الله ومن الناس.`
  },
  {
    id: 's19',
    title: 'النزول للأرض: بداية المغامرة الكبيرة',
    category: 'سيدنا آدم عليه السلام',
    content: `رغم أن الله سامح آدم وحواء وقبل اعتذارهما، إلا أن حكمة الله كانت تقتضي أن ينزلا من الجنة ليعيشا على كوكب "الأرض". فالأرض كانت خالية وتحتاج لمن يبنيها ويعمرها.

ودّع آدم وحواء الجنة الجميلة وهبطا إلى الأرض الواسعة. كانت الحياة على الأرض مختلفة تماماً عن الجنة السهلة. هنا، يجب عليهما أن يعملا بجد؛ يجب أن يحفرا الأرض ليزرعا البذور وينتظرا حتى تنمو ليأكلا، ويجب أن يبنيا بيوتاً قوية تحميهما من البرد والمطر وحيوانات الغابة.

بدأ آدم وحواء حياتهما الجديدة بنشاط وصبر. عملا معاً، وبدأ الله يرزقهما بالأبناء والبنات، وبدأ عدد البشر يكبر وينتشر في الأرض. كان آدم أباً حنوناً ونبياً يعلم أولاده.

كان آدم دائماً يجمع أولاده حوله ويحكي لهم عن جمال الجنة، ويعلمهم درساً مهماً: "الجنة هي بيتنا الأول الحقيقي، وإذا كنا طيبين، وعملنا الخير، وعبدنا الله ولم نستمع لوسوسة الشيطان، سنعود إليها مرة أخرى جميعاً ونعيش فيها للأبد".

نتعلم من القصة: الدنيا مكان للعمل والاجتهاد والدراسة، وليست مكاناً للراحة الدائمة، وكل تعب وعمل صالح نفعله هنا، هو تذكرة لعودتنا إلى الجنة الجميلة مع عائلتنا.`
  },
  {
    id: 's20',
    title: 'قابيل وهابيل: الغراب المعلم ذو اللون الأسود',
    category: 'سيدنا آدم عليه السلام',
    content: `كبر أبناء سيدنا آدم، وكان من بينهم أخوان مختلفان في الطباع: "قابيل" الذي كان يزرع الأرض، و"هابيل" الذي كان يرعى الأغنام. ولحل خلاف بينهما، طلب الله منهما أن يقدما هدية (قرباناً) ليرى أيهما أصدق.

اختار "هابيل" الطيب أفضل وأسمن وأجمل خروف من قطيعه ليقدمه لله بحب. أما "قابيل" البخيل، فاختار أسوأ ما لديه من الزرع الفاسد والمحترق وقدمه بلا اهتمام. تقبل الله هدية هابيل لأن قلبه نظيف، ورفض هدية قابيل!

بدل أن يتعلم قابيل من خطئه ويحسن عمله، امتلأ قلبه بالغيرة السوداء والحسد الشديد تجاه أخيه الناجح، وقال له بغضب: "لأقتلنك!". رد عليه هابيل بهدوء: "إنما يتقبل الله من المتقين، ولئن مددت يدك لتقتلني، لن أمد يدي لأقتلك لأنني أخاف الله".

لكن الغضب أعمى قابيل، فقام بضرب أخيه الطيب بشدة حتى مات! وقع هابيل على الأرض بلا حراك. نظر قابيل إلى جثة أخيه، وشعر بندم شديد وبكى، ولم يعرف ماذا يفعل به! حينها، أرسل الله غراباً أسود يتعارك مع غراب آخر فقتله، ثم بدأ يحفر في الأرض بمنقاره ليدفن الغراب الميت، ليعلم قابيل كيف يدفن أخاه ويواريه في التراب.

الدرس الجميل يا أصدقائي: الغيرة والحسد والغضب أمراض تجعل الإنسان يفعل أشياء سيئة ومؤذية يندم عليها طوال عمره. علينا أن نحب الخير للجميع ونفرح لنجاح أصدقائنا وإخوتنا.`
  },
  {
    id: 's21',
    title: 'سيدنا نوح: الرجل الصبور جداً جداً',
    category: 'سيدنا نوح عليه السلام',
    content: `مرت مئات السنين بعد وفاة سيدنا آدم، وتغير الناس كثيراً. نسوا عبادة الله الواحد، وبدأوا ينحتون تماثيل صامتة من الحجارة والأخشاب ويسمونها "الأصنام"، وكانوا يعبدونها ويطلبون منها المساعدة!

أرسل الله رجلاً طيباً وصوته هادئ وحنون اسمه "نوح" عليه السلام لينصحهم. كان نوح يذهب إليهم في أسواقهم ومجالسهم، ويقول لهم بلطف: "يا قومي، توقفوا أرجوكم، هذه حجارة لا تتكلم ولا تسمع ولا تنفع، اعبدوا الله العظيم الذي خلقكم ورزقكم".

لكن الناس كانوا قساة القلوب وأشراراً. كانوا يسخرون منه ويضحكون عليه بصوت عالٍ! ولما كان يحاول التحدث إليهم، كانوا يضعون أصابعهم بقوة في آذانهم كي لا يسمعوا صوته، ويغطون وجوههم بملابسهم كي لا يروا وجهه الطيب!

تخيلوا قوة تحمله! ظل سيدنا نوح ينصحهم ويدعوهم ليلاً ونهاراً، في السر والعلن، لمدة 950 سنة كاملة! ولكنه لم ييأس أبداً، ولم يغضب ويتركهم، بل كان صبوراً جداً ومستمراً في عمله بأمل أن يؤمنوا يوماً ما.

نتعلم من القصة يا أبطال: الصبر والإصرار من أعظم وأقوى الصفات، وعلينا ألا نستسلم أبداً أو نحزن عندما نحاول فعل الأشياء الصحيحة والمفيدة حتى لو ضحك علينا الآخرون.`
  },
  {
    id: 's22',
    title: 'بناء السفينة: سفينة خشبية في قلب الصحراء!',
    category: 'سيدنا نوح عليه السلام',
    content: `بعد 950 سنة من الدعوة المستمرة، لم يؤمن مع نوح إلا عدد قليل جداً من الناس. فأخبره الله أنه لن يؤمن أحد آخر منهم، وأمره بأمر عجيب جداً: أن يصنع سفينة خشبية ضخمة هائلة الحجم!

لكن الغريب والمضحك بالنسبة لقومه، أن نوحاً كان يعيش في صحراء جافة، حيث الرمال الحارة ولا يوجد أي بحر أو نهر قريب! بدأ نوح وأصحابه المؤمنون يقطعون الأخشاب الكبيرة، ويصنعون السفينة الضخمة في وسط الرمال.

كان الأشرار من قومه يمرون عليه كل يوم وهم في طريقهم، فيقفون وينظرون إليه ويضحكون بصوت عالٍ ويسخرون منه قائلين: "يا نوح، هل صرت نجاراً بعد أن كنت نبياً؟ وهل ستسير سفينتك الكبيرة هذه على الرمل الجاف؟ أين الماء يا نوح؟".

لكن نوحاً كان جبلاً في الثبات. لم يغضب، ولم يحزن لشتائمهم، بل كان يجمع الخشب ويدق المسامير بقوة وثقة ويقول لهم: "إن تسخروا منا اليوم، فإنا سنسخر منكم غداً". كان متأكداً تماماً أن وعد الله حق، واستمر في البناء بنشاط حتى أكمل أعظم سفينة.

الدرس الجميل يا أصدقائي: لا تهتم لمن يسخر منك ويحبطك وأنت تفعل الصواب وتطيع الله، ولا تتوقف عن حلمك، وثق دائماً أن الله سيدعمك وينجحك في النهاية.`
  },
  {
    id: 's23',
    title: 'المطر الغزير وسفينة النجاة العظيمة',
    category: 'سيدنا نوح عليه السلام',
    content: `عندما انتهى نوح تماماً من بناء السفينة الضخمة وطلاء أخشابها، جاءت العلامة التي وعده الله بها. فجأة، حدث شيء عجيب ومخيف! أظلمت السماء وتحولت غيومها إلى لون أسود كثيف، وبدأت تمطر بغزارة شديدة لم ترَ الأرض مثلها قط!

ولم يكن الماء من السماء فقط، بل انفجرت الأرض وتشققت لتخرج منها عيون الماء الساخن من كل مكان. نادى نوح من آمن معه بسرعة، وقال لهم: "اركبوا فيها باسم الله".

وأيضاً، نفذ نوح أمراً رائعاً من الله للحفاظ على الحياة؛ طلب منه أن يأخذ من كل نوع من أنواع الحيوانات والطيور زوجين (اثنين: ذكراً وأنثى). فتخيلوا المشهد المدهش: أسد ولبؤة يمشون بهدوء، عصفور وعصفورة يطيران للداخل، فيل وفيلة يصعدان، نملتان صغيرتان تزحفان! كلهم دخلوا السفينة بسلام.

وبينما كان الماء يرتفع ويرتفع حتى غطى الأشجار العالية والجبال، أبحرت السفينة الخشبية الضخمة وسط أمواج هادرة وعالية كالجبال. كانت تتمايل بقوة، ولكنها كانت آمنة جداً، ونجا كل من بداخلها بفضل حماية الله.

نتعلم من القصة: الله دائماً ينقذ الأشخاص الطيبين ولو كانوا قليلين، ورعاية الحيوانات وحمايتها من الانقراض والموت أمر مهم جداً وواجب علينا في ديننا الحنيف.`
  },
  {
    id: 's24',
    title: 'الابن العنيد: الجبل العالي لن يحميك!',
    category: 'سيدنا نوح عليه السلام',
    content: `وسط العاصفة المرعبة والأمواج العالية التي تضرب كل شيء وتغرق البيوت، وقف نوح على ظهر سفينته الآمنة يبحث بعينيه. وفجأة، رأى ابنه يصارع الماء بعيداً ويحاول أن يسبح للنجاة.

ناداه نوح بقلب الأب الحنون الخائف المليء بالشفقة، وصرخ بأعلى صوته وسط ضجيج العاصفة: "يا بني، اركب معنا في السفينة، ولا تكن مع الكافرين الأشرار، تعال لتنجو!".

لكن الابن كان مغروراً، يظن أن قوته البدنية ستنقذه، وكان عنيداً جداً. فرد على أبيه قائلاً: "لا أحتاج لسفينتك، سآوي إلى جبل عالٍ أتسلقه وسيعصمني (يحميني) من الماء المرتفع". قال له نوح بحزن: "لا عاصم اليوم من أمر الله إلا من رحم".

ولم يكد نوح يكمل جملته، حتى حالت بينهما موجة ضخمة جداً وعالية كالجبل، وابتلعت الابن العنيد وأغرقته في أعماق الماء المظلم. حزن نوح كثيراً على ابنه، لكنه علم وتأكد أن النجاة تكون بطاعة الله وليس بالقوة العضلية أو العناد والغرور.

الدرس الجميل يا أبطال: سماع كلام الوالدين لأنهما يحباننا أكثر من أي شخص، وطاعة الله، هما طريق النجاة والنجاح الوحيد في الحياة، والعناد لا يجلب إلا الخسارة.`
  },
  {
    id: 's25',
    title: 'حمامة السلام والأرض الجديدة النظيفة',
    category: 'سيدنا نوح عليه السلام',
    content: `استمرت السفينة تبحر لأيام وأيام في محيط واسع لا يظهر فيه أي يابسة، والماء يغطي كل شيء على الأرض. ثم، وبعد أن غرق كل الأشرار الظالمين، أصدر الله أمره العظيم.

قال الله للسماء: "أوقفي المطر فوراً"، وقال للأرض: "اشربي ماءك وابتلعيه". وفي لحظات، هدأت العاصفة تماماً، وتوقفت الرياح، وظهرت الشمس الدافئة من بين السحب لتنير الدنيا. وبدأ الماء ينخفض تدريجياً، حتى رست السفينة الكبيرة بسلام وهدوء على قمة جبل شاهق اسمه جبل "الجودي".

للتأكد من أمان الأرض، أرسل نوح حمامة، فعادت وفي منقارها غصن زيتون أخضر! ففرح الجميع. فتح نوح أبواب السفينة، وخرج المؤمنون والحيوانات وهم يركضون بفرح وسعادة، يشتمون رائحة التراب المبلل، ويشكرون الله على النجاة.

كانت الأرض قد غُسلت بالكامل، وأصبحت نظيفة وجميلة وخضراء تلمع تحت أشعة الشمس. وبدأت حياة جديدة تماماً على كوكب الأرض، حياة مليئة بالسلام والحب، والعمل الصالح، وعبادة الله وحده. 

نتعلم من القصة: بعد كل مشكلة وعاصفة وتعب نمر به، يرسل الله لنا الفرح والسلام والراحة كالشمس المشرقة، وعلينا أن نشكره دائماً على نعمه الكثيرة والمستمرة.`
  },
  {
    id: 's26',
    title: 'سيدنا إبراهيم: الشاب الذكي وتأمل النجوم',
    category: 'سيدنا إبراهيم عليه السلام',
    content: `في مدينة قديمة جداً تسمى "بابل"، وُلد شابٌ ذكي وطيب اسمه "إبراهيم". كان إبراهيم يعيش بين قوم يعبدون الأصنام الحجرية، وكان أبوه يصنع هذه الأصنام بيده. لكن إبراهيم كان يشعر في قلبه أن هذه الحجارة لا يمكن أن تكون آلهة تخلق الكون.

أراد إبراهيم أن يبحث عن الله الحقيقي. وفي ليلة مظلمة وصافية، جلس يتأمل السماء، فرأى كوكباً لامعاً وجميلاً. فقال في نفسه: "هل هذا ربي؟". لكن بعد ساعات قليلة، غاب الكوكب واختفى في الظلام! فقال: "لا أحب الأشياء التي تغيب وتتركني".

ثم في ليلة أخرى، رأى القمر بازغاً منيراً كبيراً يضيء كل شيء، فقال: "هل هذا ربي؟". لكن في الصباح، اختفى القمر أيضاً! وعندما أشرقت الشمس دافئة وكبيرة ومشرقة تملأ الدنيا نوراً فرح وقال: "هذا أكبر! هذا ربي!". 

لكن في المساء، غابت الشمس كما غاب غيرها وحل الظلام. ففهم إبراهيم بعقله الذكي الواعي أن كل هذه الأشياء الجميلة (الكواكب، القمر، الشمس) هي مخلوقات تتغير وتغيب وتتحرك بنظام دقيق، ولا يمكن أن تكون آلهة. وأدرك أن الله هو الخالق العظيم الدائم الذي لا يغيب أبداً، والذي خلق كل هذه الأضواء.

الدرس الجميل يا أصدقائي: التفكير الذكي واستخدام عقولنا في التأمل في جمال السماء والطبيعة والأشجار، يجعلنا نعرف كم أن الله عظيم وقوي ودائم لا ينام ولا يغيب.`
  },
  {
    id: 's27',
    title: 'إبراهيم الشجاع: الفأس والتماثيل المحطمة',
    category: 'سيدنا إبراهيم عليه السلام',
    content: `أراد سيدنا إبراهيم أن يثبت لقومه عملياً، وبطريقة ذكية لا ينسونها، أن هذه التماثيل الحجرية والخشبية التي يعبدونها ضعيفة جداً ولا تضر ولا تنفع ولا تدافع حتى عن نفسها. 

وفي يوم العيد السنوي لقومه، عندما خرج الناس جميعاً خارج المدينة للاحتفال وتركوا المعبد فارغاً، دخل إبراهيم إلى المعبد العظيم. أحضر فأساً ثقيلاً وكبيراً، وبدأ يحطم ويكسر كل الأصنام الصغيرة والمتوسطة، حتى جعلها قطعاً صغيرة من الحطام! ما عدا الصنم الأكبر، تركه كما هو وعلق الفأس الثقيل في رقبته!

لما عاد القوم من احتفالهم ودخلوا المعبد، صُدموا وصرخوا غاضبين: "من فعل هذا بآلهتنا؟". تذكروا إبراهيم الشاب الذي ينتقدهم، فأحضروه وسألوه بغضب: "أأنت فعلت هذا بآلهتنا يا إبراهيم؟".

قال إبراهيم بابتسامة هادئة وذكاء شديد: "بل فعله كبيرهم هذا! فاسألوهم إن كانوا ينطقون". نظر الناس لبعضهم بخجل وقالوا: "أنت تعلم أن هذه الحجارة لا تتكلم!". فقال لهم إبراهيم بقوة: "إذن كيف تعبدون أشياء لا تتكلم، ولا تدافع عن نفسها، ولا تنفعكم بشيء؟". لقد صدم عقولهم ليفكروا.

نتعلم من القصة يا أبطال: الشجاعة في قول الحق هي صفة الأنبياء، واستخدام العقل والذكاء والمواقف العملية لتعليم الآخرين ما هو صحيح بأسلوب مقنع أفضل من مجرد الكلام.`
  },
  {
    id: 's28',
    title: 'النار المخيفة تصبح باردة ولطيفة!',
    category: 'سيدنا إبراهيم عليه السلام',
    content: `عندما أفحمهم إبراهيم بحجته الذكية ولم يستطيعوا الرد عليه، غضب الملك الشرير الجبار "النمرود" وقوم إبراهيم جداً. وبدلاً من أن يعترفوا بخطئهم، قرروا معاقبته بطريقة بشعة؛ قرروا أن يحرقوه!

جمعوا حطباً وأخشاباً كثيرة جداً لأيام طويلة، وأشعلوا ناراً هائلة ومخيفة، كانت ترتفع للسماء، حتى أن الطيور كانت تحترق إذا طارت فوقها من شدة حرارتها. ثم قيدوا سيدنا إبراهيم ووضعوه في آلة لرميه (المنجنيق) وألقوه في قلب النار المستعرة.

وهو في الهواء يسقط نحو النار، لم يصرخ إبراهيم ولم يبكِ. أغمض عينيه، ورفع رأسه للسماء، ودعا الله بيقين وثقة تامة، وقال كلمة واحدة قوية: "حسبي الله ونعم الوكيل" (يعني: يكفيني الله، وأنا أثق بك يا رب لتنقذني، وأفوض أمري إليك).

وفجأة! وبأمر سريع من خالق الكون، قال الله للنار: "يا نار كوني برداً وسلاماً على إبراهيم". في لحظة واحدة، فقدت النار حرارتها وقدرتها على الإحراق! تحولت النار الحارقة والمخيفة إلى هواء بارد ولطيف كالنسيم العليل! لم تحرق من إبراهيم سوى الحبال التي كانت تقيده، وخرج منها يمشي مبتسماً وسليماً تماماً، وسط ذهول وصدمة الجميع.

الدرس الجميل: عندما نثق بالله ثقة مطلقة ونعتمد عليه من كل قلوبنا في كل أمورنا، فإنه يحمينا من أي خطر وينقذنا مهما كان الموقف مرعباً أو مستحيلاً.`
  },
  {
    id: 's29',
    title: 'ماء زمزم: المعجزة العظيمة في الصحراء الجافة',
    category: 'سيدنا إبراهيم عليه السلام',
    content: `استجابة لأمر الله، سافر سيدنا إبراهيم بزوجته الطيبة المؤمنة "هاجر" وابنهما الرضيع الصغير "إسماعيل" مسافة طويلة جداً، حتى وصلوا إلى وادٍ غير ذي زرع، صحراء جافة تماماً في مكة. وهناك تركهم إبراهيم مع القليل من الماء والتمر، وعاد، وهو يدعو الله أن يحفظهم.

بعد أيام قليلة، نفد الماء تماماً، وعطش الطفل الصغير إسماعيل وبدأ يبكي بشدة ويتلوى من العطش. لم تتحمل الأم رؤية طفلها يتألم. انطلقت "هاجر" تجري مسرعة في الصحراء القاحلة، صعدت جبل "الصفا" لتبحث عن ماء أو قافلة، فلم تجد شيئاً. 

نزلت وركضت مسرعة وصعدت جبل "المروة"، وبقيت تركض بين الجبلين ذهاباً وإياباً سبع مرات كاملة، وهي تتصبب عرقاً وقلبها ينفطر على طفلها الباكي، وهي تدعو الله أن يغيثها.

ومن شدة رحمة الله بالأم وتعبها ودعائها، أرسل المَلَك جبريل، فضرب الأرض بجناحه (أو ضرب الطفل الأرض بقدمه)، فانفجر بئر ماء قوي يتدفق بغزارة من تحت أقدام الطفل الصغير! كان هذا هو "ماء زمزم" البارد واللذيذ والمبارك. شربت هاجر وأرضعت طفلها وفرحت، وبسبب هذا الماء، جاءت قبائل من الناس والطيور لتعيش معهم وتُعمر مكة.

نتعلم من القصة يا أصدقائي: الأم تتعب كثيراً جداً وتبذل كل جهدها من أجلنا ويجب أن نحبها ونحترمها، والله الرحيم لا يترك أبداً من يسعى ويعمل ويثق به في أوقات الشدة.`
  },
  {
    id: 's30',
    title: 'بناء الكعبة: بيت الله الحرام المربع الأسود',
    category: 'سيدنا إبراهيم عليه السلام',
    content: `مرت السنوات، وكبر الطفل الصغير إسماعيل وأصبح شاباً قوياً وباراً بوالديه. وفي أحد الأيام، عاد سيدنا إبراهيم إلى مكة، وأخبر ابنه بأن الله أمره ببناء بيت عظيم ومقدس خاص لله في هذا المكان، ليصلي ويطوف فيه الناس. فقال إسماعيل فوراً: "افعل ما أمرك به ربك، وأنا سأساعدك".

بدأ الأب وابنه العمل الجاد بتعاون ومحبة. كان إسماعيل الشاب القوي يذهب ليجمع الحجارة الثقيلة والمناسبة من الجبال المحيطة ويحملها، وكان إبراهيم الخليل يقوم برصها وبناء الجدران لترتفع شيئاً فشيئاً لتشكل "الكعبة المشرفة" بشكلها المربع المهيب.

وبينما هما يعملان ويتصببان عرقاً، كانا يرددان دعاءً جميلاً بخشوع: "ربنا تقبل منا إنك أنت السميع العليم". كانا يعملان عملاً عظيماً، ومع ذلك يسألان الله أن يتقبله منهما بتواضع.

وبعد أن انتهيا من البناء الجميل، أمرهما الله أن يناديا الناس في كل مكان لزيارة الكعبة. ومنذ ذلك اليوم القديم، وحتى وقتنا هذا، يستجيب ملايين المسلمين كل عام، ويسافرون من كل بلاد العالم لزيارة هذا البيت العتيق والطواف حوله في موسم الحج.

الدرس الجميل يا أبطال: التعاون بين الآباء والأبناء في عمل الخير ومساعدة بعضهم يبني أشياء عظيمة تبقى خيراً وأثراً طيباً للأبد، والتواضع عند النجاح من صفات الأنبياء.`
  },
  {
    id: 's31',
    title: 'سيدنا موسى: الطفل الصغير في الصندوق الخشبي',
    category: 'سيدنا موسى عليه السلام',
    content: `في مصر القديمة، كان هناك ملك شرير ومغرور جداً اسمه "فرعون". كان ظالماً وقاسياً، وقد أصدر أمراً بشعاً بقتل كل الأطفال الذكور الذين يولدون من قوم محددين (بني إسرائيل)، لأنه كان يخاف أن يكبر أحدهم ويأخذ ملكه!

ولما وُلد الطفل الجميل "موسى"، خافت عليه أمه خوفاً شديداً وبكت وهي تضمه إلى صدرها. لكن الله الرحيم ألهمها وطمأن قلبها بفكرة عجيبة. أمرها أن تصنع صندوقاً خشبياً (تابوتاً)، وتضع فيه طفلها الرضيع، وتلقيه في مياه نهر النيل العظيم وتتوكل على الله!

نفذت الأم الأمر بقلب يرتجف، وسار الصندوق الخشبي الصغير يطفو بهدوء فوق مياه النيل الزرقاء، تحرسه عناية الله. والعجيب أن الأمواج أخذت الصندوق مباشرة إلى حديقة قصر فرعون نفسه! ألد أعداء هذا الطفل!

التقطت الجواري الصندوق وفتحته أمام زوجة فرعون الطيبة السيدة "آسيا". ولما رأت الطفل الجميل يبتسم بوجه بريء، أحبته حباً شديداً من النظرة الأولى، وطلبت من فرعون ألا يقتله، وقررت أن تربيه في القصر العظيم ليكون كابنها وتغمره بحنانها.

نتعلم من القصة: الله القوي يحفظ الأطفال الطيبين أينما كانوا، ويمكن أن يجعل الأمان والسلام يخرجان من قلب الخطر نفسه، فلا شيء يقف أمام حماية الله.`
  },
  {
    id: 's32',
    title: 'موسى الشاب القوي والرجل الشهم الطيب',
    category: 'سيدنا موسى عليه السلام',
    content: `كبر موسى في قصر فرعون، وكان يأكل من أطيب الطعام ويتعلم أفضل العلوم، حتى صار شاباً يافعاً وقوياً جداً ومفتول العضلات. لكنه، رغم عيشه في القصر، كان دائم الانحياز للحق وللضعفاء المظلومين.

وفي يوم من الأيام، وهو يمشي في المدينة، رأى رجلاً من قومه المستضعفين يتشاجر مع رجل من قوم فرعون الظالمين. فاستنجد الرجل الضعيف بموسى. أسرع موسى ليدافع عنه، وحاول إبعاد الرجل الآخر، فدفعه بقبضته بقوة. ولأن موسى كان قوياً جداً، سقط الرجل الآخر على الأرض ومات بالخطأ!

صُدم موسى وحزن جداً، فهو لم يقصد قتله أبداً، واستغفر الله فوراً بقلب نادم. وعندما علم فرعون بالأمر، أمر بقتل موسى. فهرب موسى ليلاً وسار في الصحراء أياماً طويلة وهو خائف وجائع وتعب، حتى وصل إلى مدينة بعيدة وهادئة تسمى "مدين".

جلس موسى ليستريح تحت شجرة قرب بئر ماء. وهناك رأى رعاة أقوياء يسقون أغنامهم، بينما تقف فتاتان خجولتان بعيداً لا تستطيعان سقي أغنامهما. رغم تعبه الشديد وجوعه، تحركت شهامة موسى، فتقدم بقوته ولطفه، وأبعد الرعاة، وسقى للفتاتين أغنامهما. أحبه والد الفتاتين لشهامته وقوته وأمانته وزوجه إحداهما وعاش معهم بسلام.

الدرس الجميل يا أصدقائي: مساعدة الضعفاء والمحتاجين، حتى ونحن متعبون، من أخلاق الأبطال الحقيقيين والنبلاء، والاعتذار والندم الصادق على الخطأ يغفره الله لنا.`
  },
  {
    id: 's33',
    title: 'عصا موسى السحرية والثعبان الضخم!',
    category: 'سيدنا موسى عليه السلام',
    content: `بعد سنوات من العيش في مدين، أمر الله نبيه موسى أن يعود إلى مصر، ويقف أمام فرعون الشرير الجبار، ليخبره بشجاعة أن يتوقف عن ظلمه وتكبره ويعبد الله الواحد، وأن يطلق سراح المظلومين. 

ولكي يصدق فرعون، أعطى الله موسى معجزات مبهرة. المعجزة الأولى كانت في العصا الخشبية البسيطة التي يتوكأ عليها موسى. عندما يرمي موسى هذه العصا على الأرض، تدب فيها الحياة وتتحول إلى ثعبان حقيقي كبير ومخيف!

وقف موسى أمام فرعون وأراه المعجزة، لكن فرعون المغرور قال: "هذا مجرد سحر!" وجمع أمهر وأكبر السحرة في مصر ليتحدوا موسى في يوم احتفال كبير أمام كل الناس. ألقى السحرة حبالهم وعصيهم، فبدت كأنها ثعابين تتلوى وتخيف الناس.

لكن موسى لم يخف، ألقى عصاه الخشبية بثقة، فتحولت فوراً إلى ثعبان ضخم وحقيقي، هجم على كل حبال السحرة المزيفة وابتلعها كلها في ثوانٍ معدودة! صُدم الجميع. ولأن السحرة خبراء، عرفوا فوراً أن قوة موسى حقيقية ومعجزة إلهية وليست خفة يد، فسقطوا ساجدين ومؤمنين بالله أمام غضب فرعون!

نتعلم من القصة يا أبطال: الحق والصدق دائماً ينتصران على الخداع والكذب مهما بدا الكذب قوياً في البداية، والشجاع الحقيقي هو من يغير رأيه فوراً ويعترف بالحق عندما يعرف الحقيقة كالسحرة.`
  },
  {
    id: 's34',
    title: 'البحر ينقسم نصفين كالجبال العالية!',
    category: 'سيدنا موسى عليه السلام',
    content: `بعد معاندة فرعون، هرب موسى والمؤمنون به ليلاً من مصر متوجهين نحو الشرق. لكن فرعون وجنوده المدججين بالسلاح اكتشفوا هروبهم، فلحقوا بهم بسرعة لقتلهم والقضاء عليهم.

سار المؤمنون حتى وصلوا إلى شاطئ البحر الأحمر الكبير. نظروا خلفهم فرأوا غبار جيش فرعون يقترب، ونظروا أمامهم فوجدوا البحر العميق والأمواج المتلاطمة. صرخ الناس برعب شديد ويأس: "إنّا لمدركون!" (فرعون خلفنا والبحر أمامنا، سيقتلوننا حتماً!). 

في هذه اللحظة المرعبة، وقف موسى بثقة البطل الهادئ المطمئن بوعد ربه، وقال بقوة وثبات: "كلا، إن معي ربي سيهدين" (لن يقدروا علينا، الله سيوجهني وينقذني).

أمره الله أن يضرب البحر بعصاه الخشبية. وما إن لامست العصا سطح الماء، حتى حدثت أعظم المعجزات! انقسم البحر العظيم إلى نصفين، وارتفع الماء يميناً ويساراً كالجبال الشاهقة من الماء الصلب، وأصبح هناك طريق رملي جاف تماماً في المنتصف! ركض موسى وقومه ومروا بسلام. ولما لحق بهم فرعون وجيشه ودخلوا الطريق، عاد البحر لطبيعته وسقطت الجبال المائية عليهم وغرق الأشرار جميعاً!

الدرس الجميل يا أصدقائي: الثقة المطلقة في الله وحسن الظن به تصنع المعجزات وتحمينا من الخوف وقت الشدائد، والله دائماً ينصر الطيبين ويهزم الظالمين في النهاية.`
  },
  {
    id: 's35',
    title: 'قصة البقرة الصفراء وكثرة الأسئلة المزعجة',
    category: 'سيدنا موسى عليه السلام',
    content: `في يوم من الأيام، حدثت جريمة غامضة بين قوم موسى، وقُتل رجل ولم يعرفوا القاتل. فذهبوا لموسى ليحل المشكلة. أمرهم الله، لكي يكتشفوا الحقيقة وتحدث معجزة، بأمر بسيط جداً: أن يذبحوا بقرة ويضربوا الميت بجزء منها ليحيا ويخبرهم بمن قتله.

لو أنهم ذهبوا إلى السوق واشتروا وذبحوا أي بقرة لكان الأمر سهلاً جداً وانتهت المشكلة! لكنهم، بدلاً من الطاعة السريعة، بدأوا يماطلون ويعاندون ويسألون موسى أسئلة كثيرة لا داعي لها: "ادع لنا ربك يبين لنا ما هي؟"، "ما هو لونها؟"، "كيف شكلها بالضبط؟".

كلما سألوا أكثر وعاندوا وشددوا على أنفسهم، شدد الله عليهم، وجعل مواصفات البقرة أصعب ونادرة جداً لتأديبهم. حتى طلب منهم في النهاية بقرة "صفراء فاقع لونها" (لونها أصفر لامع وصافٍ جداً)، تسعد من ينظر إليها، ولم تستخدم في حراثة الأرض أو سقي الزرع.

تعبوا جداً في البحث عن هذه البقرة النادرة، وبحثوا في كل مكان، ولما وجدوها عند شاب يتيم، اضطروا لدفع أموال طائلة من الذهب لشرائها. ولما ذبحوها ونفذوا الأمر، ظهرت المعجزة وعُرف القاتل.

نتعلم من القصة يا أبطال: أن نسمع كلام المعلم والوالدين وننفذ المطلوب منا فوراً ببساطة ودون كثرة أسئلة لا فائدة منها أو عناد ومماطلة، لنرتاح وننجح بسرعة ويسر.`
  },
  {
    id: 's36',
    title: 'سيدنا يوسف: حلم الكواكب الأحد عشر الساجدة',
    category: 'سيدنا يوسف عليه السلام',
    content: `في أرض كنعان، عاش سيدنا يعقوب عليه السلام مع أبنائه الاثني عشر. وكان من بينهم طفل صغير يسمى "يوسف". كان يوسف طفلاً مميزاً، شديد الجمال، ذكياً، ولطيفاً جداً، وكان والده النبي يعقوب يحبه حباً كبيراً وخاصاً.

وفي ليلة من الليالي الهادئة، وهو نائم في فراشه، رأى يوسف الصغير حلماً عجيباً وجميلاً جداً. رأى في منامه أحد عشر كوكباً منيراً في السماء، ومعهم الشمس المشرقة والقمر الساطع، وكلهم ينزلون وينحنون ويسجدون له باحترام شديد!

استيقظ يوسف مندهشاً، وركض إلى والده وقص عليه الحلم. أدرك يعقوب بحكمته ونبوته تفسير الحلم، وفرح جداً لأن ابنه سيكون نبياً وقائداً عظيماً في المستقبل. 

لكنه خاف عليه، فنصحه بحب وعطف: "يا بني، لا تقصص رؤياك على إخوتك فيكيدوا لك كيداً". حذره ألا يخبر أحداً بالحلم، لأن إخوته الكبار كانوا يغارون منه غيرة شديدة بسبب حب أبيهم الزائد له، والغيرة مرض سيء قد يدفع الإنسان لإيذاء من يحب.

الدرس الجميل يا أصدقائي: ليس من الجيد أبداً أن نغار من إخوتنا أو أصدقائنا إذا تميزوا في شيء، ويجب أن نتعلم متى نحتفظ بأسرارنا الجميلة لأنفسنا أحياناً لتجنب المشاكل.`
  },
  {
    id: 's37',
    title: 'في البئر المظلم: القميص الملطخ والدماء المزيفة',
    category: 'سيدنا يوسف عليه السلام',
    content: `كبرت الغيرة السوداء في قلوب إخوة يوسف، فدبروا خطة شريرة للتخلص منه ليخلو لهم حب أبيهم. ذهبوا إلى يعقوب وطلبوا منه، بوجوه بريئة وكلمات معسولة، أن يرسل معهم يوسف ليلعب ويركض في الصحراء الواسعة.

وافق الأب وهو خائف عليه. وبمجرد أن ابتعدوا عن البيت، تحولت قلوبهم للقسوة! نزعوا عنه قميصه الجميل، وحملوه، ورموه بقسوة وبلا رحمة في قاع بئر عميق ومظلم ومهجور! ثم ذبحوا خروفاً، ووضعوا دمه على قميص يوسف ليكون دماً مزيفاً، وعادوا في الليل يبكون كذباً لأبيهم وقالوا: "لقد كنا نلعب فجاء الذئب المتوحش وأكل يوسف!". صُدم الأب وبكى بكاءً مريراً حتى ابيضت عيناه من الحزن.

لكن يوسف الصغير لم يكن وحده خائفاً في قاع البئر البارد. فقد أوحى الله إليه وطمأن قلبه أنه سينجو ويكون ذا شأن عظيم. وبعد أيام، مرت قافلة تجار عطشى يبحثون عن الماء. 

أرسلوا رجلهم ليجلب الماء، فألقى الدلو (الجردل) في البئر، فتعلق به يوسف! فرح الرجل وقال: "يا بشرى، هذا غلام!". أخرجوه من ظلام البئر، وأخذوه معهم ليعيش بعيداً في قصر كبير في مصر كابن للوزير.

نتعلم من القصة يا أبطال: الغيرة والحقد تجعلنا نؤذي من نحب ونكذب كذبات بشعة، لكن الله يكون دائماً مع المظلوم يحميه ويسعده ويدبر له أموره حتى لو كان وحيداً في أعماق الظلام.`
  },
  {
    id: 's38',
    title: 'في السجن المظلم: البطل الصابر والمبتسم',
    category: 'سيدنا يوسف عليه السلام',
    content: `كبر يوسف في قصر وزير مصر (العزيز)، وصار شاباً في غاية الوسامة والجمال، وكان ذكياً وأميناً ومحبوباً. لكن زوجة الوزير أرادت منه أن يخون سيده ويفعل شيئاً سيئاً يغضب الله عز وجل.

لكن يوسف الشهم النبيل، الذي نشأ على طاعة الله، هرب ورفض بشدة وقوة وقال: "معاذ الله! أنا لا أخون من أحسن إلي، وأنا لا أغضب الله أبداً". ولأنه رفض فعل الخطأ وأصر على موقفه النبيل، غضبت منه، وكذبت عليه، فوضعوه في السجن ظلماً وعقاباً له!

ورغم هذا الظلم الكبير، من البئر إلى السجن، لم يبكِ يوسف ولم ييأس ولم يقل "لماذا يحدث لي هذا؟!". بل كان في السجن مثالاً للرجل الصالح؛ كان دائم الابتسامة، هادئاً، يساعد المساجين في مرضهم، ويعلمهم الصلاة وعبادة الله الواحد.

ولأنه كان قريباً من الله، أعطاه الله موهبة تفسير الأحلام. فكان المساجين يقصون عليه أحلامهم، وكان يفسرها لهم ببراعة ودقة. كان السجن المظلم مكاناً ليظهر فيه نور طيبة يوسف وصبره وإيمانه.

الدرس الجميل يا أصدقائي: من الأفضل والأشرف أن نتحمل الصعاب وحتى الظلم على أن نفعل شيئاً سيئاً يغضب الله، وعلينا أن ننشر الأمل ونساعد وننصح من حولنا في أي مكان كنا فيه.`
  },
  {
    id: 's39',
    title: 'حلم الملك الغريب: يوسف الذكي ينقذ مصر',
    category: 'سيدنا يوسف عليه السلام',
    content: `مرت عدة سنوات ويوسف في السجن. وفي يوم من الأيام، استيقظ ملك مصر العظيم مرعوباً وخائفاً من حلم غريب ومتكرر. رأى في منامه سبع بقرات سمينات وقويات تأكلهن سبع بقرات نحيفات وضعيفات! ورأى سبع سنابل قمح خضراء وجميلة، وسبع سنابل أخرى يابسة وميتة!

جمع الملك كل سحرته وعلمائه ووزرائه، لكن لم يعرف أحد أبداً تفسير هذا الحلم العجيب. وهنا تذكر أحد خُدام الملك، الذي كان مسجوناً سابقاً مع يوسف، ذكاء يوسف وقدرته المدهشة على تفسير الأحلام.

أرسلوا إلى يوسف في السجن، فأخبرهم بالتفسير المنقذ: مصر ستزرع وتعيش في خير ومطر وقمح غزير لمدة 7 سنوات. لكن بعدها، ستأتي 7 سنوات جافة وقاسية جداً لا يوجد فيها مطر ولا زرع ويجوع الناس. 

ولم يكتفِ بالتفسير، بل نصحهم بخطة ذكية وعبقرية: يجب تخزين جزء كبير من القمح في السبع سنوات الأولى بداخل سنابله حتى لا يفسد، ليأكلوه في السبع سنوات الجافة. أُعجب الملك جداً بذكاء وحكمة وأمانة يوسف، فأخرجه من السجن معززاً مكرماً، وجعله "عزيز مصر"، الوزير العظيم والمسؤول الأول عن كل الخزائن والطعام في البلاد!

نتعلم من القصة يا أبطال: الذكاء والأمانة وحسن التخطيط يجعلان الإنسان قائداً وناجحاً منقذاً للناس، وبعد كل حزن وسجن وصبر طويل، يأتي الفرح والفرج والنجاح الكبير جداً من الله.`
  },
  {
    id: 's40',
    title: 'اللقاء الجميل: قلب يوسف الكبير والمسامح',
    category: 'سيدنا يوسف عليه السلام',
    content: `جاءت سنوات الجوع والجفاف، وعمّ القحط في كل البلاد المجاورة لمصر، ومنها أرض كنعان حيث يعيش يعقوب وأبناؤه. فاضطر إخوة يوسف للسفر إلى مصر ليطلبوا شراء القمح والطعام من الوزير العظيم.

دخلوا على يوسف في قصره الكبير. عرفهم يوسف فوراً بمجرد رؤيتهم، لكنهم لم يعرفوه أبداً! كيف يعرفونه وقد تركوه طفلاً صغيراً في بئر، وهو الآن رجل مهيب يلبس ثياب الوزراء ويحكم مصر؟!

بدلاً من أن يستغل قوته وسلطته ليأمر بسجنهم وينتقم منهم لأنهم رموه في البئر وحرموه من أبيه، أعطاهم طعاماً كثيراً وعاملهم بكرم. وبعد عدة اختبارات ليعرف مدى تغيرهم، قرر أن يكشف لهم الحقيقة. 

قال لهم بصوت يرتجف من التأثر: "أنا يوسف وهذا أخي!". صُدم الإخوة وخافوا جداً وتوقعوا العقاب الصارم، وبكوا واعتذروا له بشدة وندم. فابتسم يوسف ابتسامة جميلة ودمعت عيناه العطوفة وقال: "لا تثريب عليكم اليوم، يغفر الله لكم" (لا تخافوا ولا تعتبوا على أنفسكم اليوم، لقد سامحتكم جميعاً من كل قلبي). 

وأرسل قميصه لأبيه ليرد له بصره، وعاد الأب يعقوب، واجتمعت العائلة كلها في مصر، وسجدوا ليوسف، ليتحقق حلم الكواكب الجميل في مشهد مليء بالحب والدموع والفرح.

الدرس الجميل يا أصدقائي: القلب الطيب والنبيل يسامح من أساء إليه ولا ينتقم عند المقدرة، والتسامح الجميل يعيد لنا أصدقاءنا وعائلتنا ويجعلنا سعداء وعظماء في الدنيا والآخرة.`
  }

];

