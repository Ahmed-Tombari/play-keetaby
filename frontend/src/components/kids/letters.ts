export type DotSpec = {
  x: number;
  y: number;
  r?: number;
};

export type ChevronSpec = {
  x: number;
  y: number;
  rotate: number;
};

export type LetterSpec = {
  id: string;
  name: string;
  arabicName: string;
  viewBox: string;
  /** Ordered guide strokes for hit-detection, from first pen-down to last pen-up. */
  strokes: string[];
  /** Optional dot markers (e.g. Baa, Taa, Thaa, Jim, etc.) */
  dots?: DotSpec[];
  /** Optional custom chevron arrows */
  chevrons?: ChevronSpec[];
  /** Optional: path to reference image */
  imageSrc?: string;
};

export const LETTERS: Record<string, LetterSpec> = {
  // أ - Alif (with Hamza)
  alif: {
    id: "alif",
    name: "alif",
    arabicName: "أَلِف",
    viewBox: "0 0 360 440",
    strokes: [
      // 1. Hamza curve and horizontal sweep
      "M 210 50 C 180 15, 120 40, 140 85 C 150 105, 175 110, 195 115 L 130 125",
      // 2. Vertical main stem (Top to Bottom)
      "M 180 160 L 180 400",
    ],
    dots: [
      // Dot at the start of the hamza loop
      { x: 210, y: 50, r: 14 },
      // Dot at the top of the main stem
      { x: 180, y: 160, r: 14 },
    ],
    chevrons: [
      // Arrow at the end of the hamza's leftward tail
      { x: 130, y: 125, rotate: 180 },
      // Arrow pointing down, near the bottom of the stem
      { x: 180, y: 340, rotate: 90 },
    ],
  },

  // ب - Baa (Boat + 1 Dot Below)
  baa: {
    id: "baa",
    name: "baa",
    arabicName: "بَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 290 120 C 310 260, 250 280, 180 280 C 110 280, 50 260, 70 120",
    ],
    dots: [{ x: 180, y: 335, r: 18 }],
    chevrons: [
      { x: 285, y: 190, rotate: 105 },
      { x: 180, y: 280, rotate: 180 },
      { x: 75, y: 190, rotate: -75 },
    ],
  },

  // ت - Tahaa / Taa (Boat + 2 Dots Above)
  tahaa: {
    id: "tahaa",
    name: "tahaa",
    arabicName: "تَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 290 120 C 310 260, 250 280, 180 280 C 110 280, 50 260, 70 120",
    ],
    dots: [
      { x: 145, y: 70, r: 18 },
      { x: 215, y: 70, r: 18 },
    ],
    chevrons: [
      { x: 285, y: 190, rotate: 105 },
      { x: 180, y: 280, rotate: 180 },
      { x: 75, y: 190, rotate: -75 },
    ],
  },

  // ت - Thaa (alias to tahaa)
  thaa: {
    id: "thaa",
    name: "thaa",
    arabicName: "تَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 290 120 C 310 260, 250 280, 180 280 C 110 280, 50 260, 70 120",
    ],
    dots: [
      { x: 145, y: 70, r: 18 },
      { x: 215, y: 70, r: 18 },
    ],
    chevrons: [
      { x: 285, y: 190, rotate: 105 },
      { x: 180, y: 280, rotate: 180 },
      { x: 75, y: 190, rotate: -75 },
    ],
  },

  // ث - Thaaa (Boat + 3 Dots Above)
  thaaa: {
    id: "thaaa",
    name: "thaaa",
    arabicName: "ثَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 290 120 C 310 260, 250 280, 180 280 C 110 280, 50 260, 70 120",
    ],
    dots: [
      { x: 145, y: 75, r: 16 },
      { x: 215, y: 75, r: 16 },
      { x: 180, y: 35, r: 16 },
    ],
    chevrons: [
      { x: 285, y: 190, rotate: 105 },
      { x: 180, y: 280, rotate: 180 },
      { x: 75, y: 190, rotate: -75 },
    ],
  },

  // ج - Jim (Head + Tail + 1 Dot Inside)
  jim: {
    id: "jim",
    name: "jim",
    arabicName: "جِيم",
    viewBox: "0 0 360 360",
    strokes: [
      "M 260 70 C 220 50, 140 50, 100 80",
      "M 100 80 C 60 120, 60 210, 130 250 C 200 280, 280 250, 270 190 C 260 140, 190 140, 170 170",
    ],
    dots: [{ x: 180, y: 180, r: 20 }],
  },

  // ح - Haa (Head + Tail)
  haa: {
    id: "haa",
    name: "haa",
    arabicName: "حَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 260 70 C 220 50, 140 50, 100 80",
      "M 100 80 C 60 120, 60 210, 130 250 C 200 280, 280 250, 270 190 C 260 140, 190 140, 170 170",
    ],
  },

  // خ - Khaa (Head + Tail + 1 Dot Above)
  khaa: {
    id: "khaa",
    name: "khaa",
    arabicName: "خَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 260 70 C 220 50, 140 50, 100 80",
      "M 100 80 C 60 120, 60 210, 130 250 C 200 280, 280 250, 270 190 C 260 140, 190 140, 170 170",
    ],
    dots: [{ x: 180, y: 30, r: 20 }],
  },

  // د - Daal
  daal: {
    id: "daal",
    name: "daal",
    arabicName: "دَال",
    viewBox: "0 0 360 360",
    strokes: [
      "M 230 80 C 240 130, 220 200, 180 230 C 140 260, 90 250, 70 230",
    ],
  },

  // ذ - Thaal (Daal + 1 Dot Above)
  thaal: {
    id: "thaal",
    name: "thaal",
    arabicName: "ذَال",
    viewBox: "0 0 360 360",
    strokes: [
      "M 230 80 C 240 130, 220 200, 180 230 C 140 260, 90 250, 70 230",
    ],
    dots: [{ x: 210, y: 55, r: 20 }],
  },

  // ر - Raa
  raa: {
    id: "raa",
    name: "raa",
    arabicName: "رَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 210 80 C 220 120, 200 180, 160 230 C 130 265, 80 270, 60 250",
    ],
  },

  // ز - Zaa (Raa + 1 Dot Above)
  zaa: {
    id: "zaa",
    name: "zaa",
    arabicName: "زَاي",
    viewBox: "0 0 360 360",
    strokes: [
      "M 210 80 C 220 120, 200 180, 160 230 C 130 265, 80 270, 60 250",
    ],
    dots: [{ x: 200, y: 55, r: 20 }],
  },

  // س - Sin
  sin: {
    id: "sin",
    name: "sin",
    arabicName: "سِين",
    viewBox: "0 0 360 360",
    strokes: [
      "M 300 130 C 300 170, 270 170, 260 130",
      "M 260 130 C 260 170, 230 170, 220 130",
      "M 220 130 C 200 190, 210 260, 150 270 C 90 280, 60 240, 60 190",
    ],
  },

  // ش - Shin (Sin + 3 Dots Above)
  chin: {
    id: "chin",
    name: "chin",
    arabicName: "شِين",
    viewBox: "0 0 360 360",
    strokes: [
      "M 300 130 C 300 170, 270 170, 260 130",
      "M 260 130 C 260 170, 230 170, 220 130",
      "M 220 130 C 200 190, 210 260, 150 270 C 90 280, 60 240, 60 190",
    ],
    dots: [
      { x: 230, y: 85, r: 16 },
      { x: 290, y: 85, r: 16 },
      { x: 260, y: 55, r: 16 },
    ],
  },

  // ص - Saad
  saad: {
    id: "saad",
    name: "saad",
    arabicName: "صَاد",
    viewBox: "0 0 360 360",
    strokes: [
      "M 220 160 C 240 90, 320 90, 320 140 C 320 180, 270 180, 220 160",
      "M 220 160 C 180 160, 160 180, 120 220 C 80 260, 80 300, 130 300 C 190 300, 220 270, 220 160",
    ],
  },

  // ض - Daad (Saad + 1 Dot Above)
  daad: {
    id: "daad",
    name: "daad",
    arabicName: "ضَاد",
    viewBox: "0 0 360 360",
    strokes: [
      "M 220 160 C 240 90, 320 90, 320 140 C 320 180, 270 180, 220 160",
      "M 220 160 C 180 160, 160 180, 120 220 C 80 260, 80 300, 130 300 C 190 300, 220 270, 220 160",
    ],
    dots: [{ x: 270, y: 65, r: 20 }],
  },

  // ط - Taaa
  taaa: {
    id: "taaa",
    name: "taaa",
    arabicName: "طَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 240 50 L 240 210",
      "M 240 210 C 290 210, 300 260, 250 270 C 200 280, 150 260, 140 220 C 130 180, 160 160, 200 160",
    ],
  },

  // ظ - Thaad (Taaa + 1 Dot Above)
  thaad: {
    id: "thaad",
    name: "thaad",
    arabicName: "ظَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 240 50 L 240 210",
      "M 240 210 C 290 210, 300 260, 250 270 C 200 280, 150 260, 140 220 C 130 180, 160 160, 200 160",
    ],
    dots: [{ x: 275, y: 130, r: 20 }],
  },

  // ع - Ain
  aaa: {
    id: "aaa",
    name: "aaa",
    arabicName: "عَين",
    viewBox: "0 0 360 360",
    strokes: [
      "M 250 80 C 230 40, 160 40, 140 80 C 120 120, 160 150, 190 150",
      "M 190 150 C 150 130, 80 150, 60 200 C 40 260, 110 310, 200 300 C 280 290, 310 240, 310 190",
    ],
  },

  // غ - Ghain (Ain + 1 Dot Above)
  gaa: {
    id: "gaa",
    name: "gaa",
    arabicName: "غَين",
    viewBox: "0 0 360 360",
    strokes: [
      "M 250 80 C 230 40, 160 40, 140 80 C 120 120, 160 150, 190 150",
      "M 190 150 C 150 130, 80 150, 60 200 C 40 260, 110 310, 200 300 C 280 290, 310 240, 310 190",
    ],
    dots: [{ x: 200, y: 30, r: 20 }],
  },

  // ف - Faa
  faa: {
    id: "faa",
    name: "faa",
    arabicName: "فَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 220 160 C 260 90, 310 90, 310 150 C 310 210, 250 240, 190 220",
      "M 190 220 C 150 230, 90 240, 60 210 C 40 180, 80 160, 110 160",
    ],
    dots: [{ x: 260, y: 65, r: 20 }],
  },

  // ق - Qaaf
  kaa: {
    id: "kaa",
    name: "kaa",
    arabicName: "قَاف",
    viewBox: "0 0 360 360",
    strokes: [
      "M 220 150 C 260 80, 310 80, 310 140 C 310 200, 250 230, 190 210",
      "M 190 210 C 140 240, 80 260, 60 200 C 40 150, 80 130, 110 140",
    ],
    dots: [
      { x: 230, y: 55, r: 18 },
      { x: 290, y: 55, r: 18 },
    ],
  },

  // ك - Kaaf
  kaaf: {
    id: "kaaf",
    name: "kaaf",
    arabicName: "كَاف",
    viewBox: "0 0 360 360",
    strokes: [
      "M 240 50 L 240 200 C 240 260, 280 270, 200 270 C 120 270, 100 200, 130 170",
      "M 200 150 C 160 140, 170 170, 200 165 C 230 160, 220 185, 180 190",
    ],
  },

  // ل - Lam
  lam: {
    id: "lam",
    name: "lam",
    arabicName: "لَام",
    viewBox: "0 0 360 360",
    strokes: [
      "M 200 40 L 200 210 C 200 275, 240 285, 160 285 C 80 285, 80 215, 110 180",
    ],
  },

  // م - Meem
  mim: {
    id: "mim",
    name: "mim",
    arabicName: "مِيم",
    viewBox: "0 0 360 360",
    strokes: [
      "M 180 110 C 150 70, 110 90, 110 130 C 110 170, 150 190, 180 170 C 210 150, 210 110, 180 110",
      "M 180 170 L 180 300",
    ],
  },

  // ن - Noun
  noun: {
    id: "noun",
    name: "noun",
    arabicName: "نُون",
    viewBox: "0 0 360 360",
    strokes: [
      "M 270 110 C 280 190, 280 250, 190 260 C 100 270, 70 220, 80 140",
    ],
    dots: [{ x: 180, y: 90, r: 20 }],
  },

  // ه - Haaa
  haaa: {
    id: "haaa",
    name: "haaa",
    arabicName: "هَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 180 70 C 230 70, 260 120, 240 160 C 220 200, 170 210, 140 190 C 110 170, 110 130, 140 110 C 160 95, 185 70, 180 70",
    ],
  },

  // و - Waaw
  waaw: {
    id: "waaw",
    name: "waaw",
    arabicName: "وَاو",
    viewBox: "0 0 360 360",
    strokes: [
      "M 200 80 C 240 80, 260 120, 240 150 C 220 180, 180 180, 160 155 C 140 130, 155 90, 200 80",
      "M 160 155 C 140 200, 120 240, 80 260",
    ],
  },

  // ي - Yaa
  yaa: {
    id: "yaa",
    name: "yaa",
    arabicName: "يَاء",
    viewBox: "0 0 360 360",
    strokes: [
      "M 270 100 C 240 70, 180 70, 160 110 C 140 145, 175 165, 200 160",
      "M 200 160 C 240 155, 290 200, 280 250 C 265 295, 190 305, 130 285 C 80 265, 60 215, 80 175",
    ],
    dots: [
      { x: 150, y: 320, r: 18 },
      { x: 210, y: 320, r: 18 },
    ],
  },
};

/** Ordered list of all 28 Arabic letters */
export const ALL_LETTERS: LetterSpec[] = [
  LETTERS.alif!,
  LETTERS.baa!,
  LETTERS.tahaa!,
  LETTERS.thaaa!,
  LETTERS.jim!,
  LETTERS.haa!,
  LETTERS.khaa!,
  LETTERS.daal!,
  LETTERS.thaal!,
  LETTERS.raa!,
  LETTERS.zaa!,
  LETTERS.sin!,
  LETTERS.chin!,
  LETTERS.saad!,
  LETTERS.daad!,
  LETTERS.taaa!,
  LETTERS.thaad!,
  LETTERS.aaa!,
  LETTERS.gaa!,
  LETTERS.faa!,
  LETTERS.kaa!,
  LETTERS.kaaf!,
  LETTERS.lam!,
  LETTERS.mim!,
  LETTERS.noun!,
  LETTERS.haaa!,
  LETTERS.waaw!,
  LETTERS.yaa!,
];