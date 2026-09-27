/**
 * Each letter is drawn as a set of "tube" strokes: a thick black stroke with a
 * slightly thinner fill stroke on top, which produces the outlined look of a
 * writing worksheet. Strokes must be traced in order, following the arrows.
 * Coordinates follow the uploaded worksheet drawings 1:1.
 */
export type LetterSpec = {
  id: string;
  name: string;
  viewBox: string;
  /** Ordered guide strokes, from first pen-down to last pen-up. */
  strokes: string[];
  /** Optional per-stroke tube thickness (defaults to 46). */
  widths?: number[];
  /** Decorative dots (above or below the letter body). */
  dots?: Array<{ cx: number; cy: number }>;
  /** Outer radius of the decorative dots (defaults to 20). */
  dotR?: number;
  /** Worksheet arrow positions along each stroke, from 0 (start) to 1 (end). */
  guideArrows?: number[][];
  /** Treat every body path as one uninterrupted pen-down sequence. */
  continuousBody?: boolean;
};

export const LETTERS: Record<string, LetterSpec> = {
  alif: {
    id: "alif",
    name: "ألف",
    viewBox: "0 0 347 597",
    strokes: [
      // One continuous hamza: begin at the upper-right dot, follow the broad
      // open C-shaped head around its top and left edge, sweep diagonally into
      // the lower-right corner, then finish leftward along the straight base.
      "M176 48 C 151 37, 128 42, 119 61 C 108 84, 115 108, 133 122 C 148 134, 169 136, 196 133 L197 147 C 168 148, 137 148, 106 148",
      // The long alif body, traced from its top start point downward.
      "M163 212 L176 512",
    ],
    widths: [28, 56],
  },
  baa: {
    id: "baa",
    name: "باء",
    viewBox: "0 0 438 570",
    strokes: ["M352 190 C 372 290, 300 330, 215 330 C 130 330, 55 295, 70 215"],
    widths: [56],
    dots: [{ cx: 218, cy: 412 }],
    dotR: 30,
  },
  taa: {
    id: "taa",
    name: "تاء",
    viewBox: "0 0 432 578",
    strokes: ["M345 190 C 368 285, 295 325, 212 325 C 128 325, 52 292, 66 215"],
    widths: [56],
    dots: [
      { cx: 176, cy: 182 },
      { cx: 246, cy: 182 },
    ],
    dotR: 30,
  },
  thaa: {
    id: "thaa",
    name: "ثاء",
    viewBox: "0 0 402 595",
    strokes: ["M340 200 C 362 295, 290 340, 205 340 C 120 340, 45 305, 58 228"],
    widths: [55],
    dots: [
      { cx: 196, cy: 175 },
      { cx: 162, cy: 240 },
      { cx: 232, cy: 240 },
    ],
    dotR: 28,
  },
  jim: {
    id: "jim",
    name: "جيم",
    viewBox: "0 0 318 599",
    strokes: [
      // Reference upper sweep: a shallow left-to-right arc ending in the rounded tip.
      "M52 198 C 94 173, 126 178, 166 195 C 208 213, 246 226, 288 225",
      // Reference lower stroke: cross beneath the upper sweep, then form the deep open bowl.
      "M288 225 C 271 231, 256 240, 243 246 C 184 237, 136 253, 91 287 C 48 320, 34 364, 43 407 C 54 459, 101 486, 160 487 C 204 488, 245 477, 276 458",
    ],
    widths: [43, 47],
    dots: [{ cx: 157, cy: 352 }],
    dotR: 27,
    guideArrows: [[0.03, 0.98], [0.03, 0.48, 0.98]],
    continuousBody: true,
  },
  haa: {
    id: "haa",
    name: "حاء",
    viewBox: "0 0 318 599",
    strokes: [
      // Same worksheet body as جيم, without a dot.
      "M52 198 C 94 173, 126 178, 166 195 C 208 213, 246 226, 288 225",
      "M288 225 C 271 231, 256 240, 243 246 C 184 237, 136 253, 91 287 C 48 320, 34 364, 43 407 C 54 459, 101 486, 160 487 C 204 488, 245 477, 276 458",
    ],
    widths: [43, 47],
    guideArrows: [[0.03, 0.98], [0.03, 0.48, 0.98]],
    continuousBody: true,
  },
  khaa: {
    id: "khaa",
    name: "خاء",
    viewBox: "0 0 318 599",
    strokes: [
      // Same worksheet body as جيم, with its dot moved above.
      "M52 198 C 94 173, 126 178, 166 195 C 208 213, 246 226, 288 225",
      "M288 225 C 271 231, 256 240, 243 246 C 184 237, 136 253, 91 287 C 48 320, 34 364, 43 407 C 54 459, 101 486, 160 487 C 204 488, 245 477, 276 458",
    ],
    widths: [43, 47],
    dots: [{ cx: 157, cy: 106 }],
    dotR: 27,
    guideArrows: [[0.03, 0.98], [0.03, 0.48, 0.98]],
    continuousBody: true,
  },
  daal: {
    id: "daal",
    name: "دال",
    viewBox: "0 0 327 593",
    strokes: ["M170 175 C 250 250, 280 302, 265 352 C 245 400, 130 402, 62 392"],
    widths: [54],
  },
  thaal: {
    id: "thaal",
    name: "ذال",
    viewBox: "0 0 290 593",
    strokes: ["M150 212 C 225 282, 250 326, 235 366 C 215 406, 115 410, 58 404"],
    widths: [52],
    dots: [{ cx: 133, cy: 116 }],
    dotR: 28,
  },
  raa: {
    id: "raa",
    name: "راء",
    viewBox: "0 0 276 592",
    strokes: ["M172 120 C 205 200, 200 300, 140 360 C 106 394, 80 400, 62 402"],
    widths: [50],
  },
  zay: {
    id: "zay",
    name: "زاي",
    viewBox: "0 0 276 592",
    strokes: ["M172 190 C 205 268, 200 366, 140 424 C 106 456, 80 462, 62 464"],
    widths: [50],
    dots: [{ cx: 148, cy: 112 }],
    dotR: 26,
  },
  sin: {
    id: "sin",
    name: "سين",
    viewBox: "0 0 430 570",
    strokes: [
      "M382 190 C 410 220, 407 285, 382 307 C 356 329, 322 312, 315 278 L305 225 C 300 196, 270 194, 265 225 L265 283 C 265 317, 236 328, 220 298 L205 255 C 196 227, 176 226, 178 257 L188 321 C 199 385, 163 425, 108 429 C 54 433, 22 394, 27 337 C 30 302, 39 273, 54 252",
    ],
    widths: [46],
    guideArrows: [[0.03, 0.23, 0.42, 0.64, 0.96]],
  },
  shin: {
    id: "shin",
    name: "شين",
    viewBox: "0 0 430 570",
    strokes: [
      "M382 190 C 410 220, 407 285, 382 307 C 356 329, 322 312, 315 278 L305 225 C 300 196, 270 194, 265 225 L265 283 C 265 317, 236 328, 220 298 L205 255 C 196 227, 176 226, 178 257 L188 321 C 199 385, 163 425, 108 429 C 54 433, 22 394, 27 337 C 30 302, 39 273, 54 252",
    ],
    widths: [46],
    dots: [
      { cx: 287, cy: 96 },
      { cx: 253, cy: 148 },
      { cx: 321, cy: 148 },
    ],
    dotR: 24,
    guideArrows: [[0.03, 0.23, 0.42, 0.64, 0.96]],
  },
  saad: {
    id: "saad",
    name: "صاد",
    viewBox: "0 0 430 570",
    // Identical to daad's worksheet shape, but with no dot.
    strokes: [
      // The worksheet's right-hand teardrop, flowing back into the join.
      "M227 306 C 250 262, 283 218, 327 206 C 374 193, 409 226, 410 266 C 411 307, 373 333, 329 334 C 289 335, 252 324, 227 306",
      // Join, tall shoulder, and the broad left bowl.
      "M227 306 C 206 316, 196 301, 190 272 L181 236 C 173 205, 151 205, 154 239 L170 321 C 182 384, 153 422, 104 425 C 53 429, 24 390, 29 338 C 32 306, 40 280, 52 261",
    ],
    widths: [39, 43],
    guideArrows: [[0.04, 0.5, 0.96], [0.04, 0.5, 0.96]],
    continuousBody: true,
  },
  daad: {
    id: "daad",
    name: "ضاد",
    viewBox: "0 0 430 570",
    strokes: [
      // The worksheet's right-hand teardrop, flowing back into the join.
      "M227 306 C 250 262, 283 218, 327 206 C 374 193, 409 226, 410 266 C 411 307, 373 333, 329 334 C 289 335, 252 324, 227 306",
      // Join, tall shoulder, and the broad left bowl.
      "M227 306 C 206 316, 196 301, 190 272 L181 236 C 173 205, 151 205, 154 239 L170 321 C 182 384, 153 422, 104 425 C 53 429, 24 390, 29 338 C 32 306, 40 280, 52 261",
    ],
    widths: [39, 43],
    dots: [{ cx: 346, cy: 130 }],
    dotR: 24,
    guideArrows: [[0.04, 0.5, 0.96], [0.04, 0.5, 0.96]],
    continuousBody: true,
  },
  taah: {
    id: "taah",
    name: "طاء",
    viewBox: "0 0 330 597",
    strokes: [
      "M92 150 L92 412",
      "M92 412 C 117 372, 136 330, 170 306 C 205 281, 254 292, 280 328 C 307 365, 297 407, 261 433 C 213 466, 119 459, 43 430",
    ],
    widths: [42, 42],
    guideArrows: [[0.03, 0.98], [0.04, 0.38, 0.7, 0.97]],
    continuousBody: true,
  },
  thaah: {
    id: "thaah",
    name: "ظاء",
    viewBox: "0 0 330 597",
    strokes: [
      "M92 150 L92 412",
      "M92 412 C 117 372, 136 330, 170 306 C 205 281, 254 292, 280 328 C 307 365, 297 407, 261 433 C 213 466, 119 459, 43 430",
    ],
    widths: [42, 42],
    dots: [{ cx: 211, cy: 251 }],
    dotR: 25,
    guideArrows: [[0.03, 0.98], [0.04, 0.38, 0.7, 0.97]],
    continuousBody: true,
  },
  ain: {
    id: "ain",
    name: "عين",
    viewBox: "0 0 300 570",
    strokes: [
      "M212 122 C 150 92, 70 118, 72 180 C 74 226, 120 246, 166 240",
      "M238 240 C 150 230, 60 266, 62 350 C 64 432, 176 462, 252 420",
    ],
    widths: [46, 46],
    continuousBody: true,
  },
  ghain: {
    id: "ghain",
    name: "غين",
    viewBox: "0 0 300 620",
    strokes: [
      "M212 182 C 150 152, 70 178, 72 240 C 74 286, 120 306, 166 300",
      "M238 300 C 150 290, 60 326, 62 410 C 64 492, 176 522, 252 480",
    ],
    widths: [46, 46],
    dots: [{ cx: 142, cy: 82 }],
    dotR: 26,
    continuousBody: true,
  },
  faa: {
    id: "faa",
    name: "فاء",
    viewBox: "0 0 400 595",
    strokes: [
      // One continuous spiral: rounded head first, then the long left sweep.
      "M334 211 C 307 181, 264 180, 236 207 C 205 237, 210 286, 244 310 C 273 330, 312 324, 338 302 C 352 282, 350 247, 334 211 C 355 252, 354 303, 338 335 C 309 393, 222 412, 139 402 C 76 394, 39 363, 42 320 C 44 293, 48 273, 55 260",
    ],
    widths: [42],
    dots: [{ cx: 292, cy: 119 }],
    dotR: 25,
    guideArrows: [[0.03, 0.22, 0.43, 0.68, 0.97]],
  },
  qaf: {
    id: "qaf",
    name: "قاف",
    viewBox: "0 0 325 595",
    strokes: [
      // Continuous rounded spiral and broad tail from the supplied worksheet.
      "M272 217 C 247 181, 201 171, 166 198 C 130 226, 130 279, 164 309 C 195 336, 238 335, 270 309 C 285 286, 284 249, 272 217 C 291 258, 291 310, 277 344 C 254 401, 192 430, 126 421 C 69 413, 36 380, 36 333 C 36 308, 39 286, 43 272",
    ],
    widths: [42],
    dots: [
      { cx: 174, cy: 126 },
      { cx: 244, cy: 126 },
    ],
    dotR: 26,
    guideArrows: [[0.03, 0.22, 0.43, 0.68, 0.97]],
  },
  kaf: {
    id: "kaf",
    name: "كاف",
    viewBox: "0 0 352 598",
    strokes: [
      // long descending stroke: down the right side, round the bottom bowl, up left
      "M305 155 L305 350 Q305 425 190 425 Q57 425 57 305",
      // the small zigzag hamza inside the bowl
      "M215 255 L152 282 L205 318 L150 337",
    ],
    widths: [46, 26],
  },
  lam: {
    id: "lam",
    name: "لام",
    viewBox: "0 0 293 593",
    strokes: ["M247 95 L247 355 Q247 455 152 455 Q57 455 57 305"],
    widths: [50],
  },
  meem: {
    id: "meem",
    name: "ميم",
    viewBox: "0 0 293 590",
    strokes: [
      // the round head, traced anti-clockwise from the left
      "M105 258 C 98 148, 265 140, 265 238 C 265 318, 145 330, 106 268",
      // the tail dropping straight down
      "M96 288 Q62 300 62 458",
    ],
    widths: [48, 48],
    continuousBody: true,
  },
  nun: {
    id: "nun",
    name: "نون",
    viewBox: "0 0 315 593",
    strokes: [
      "M258 230 C 258 306, 250 372, 190 390 C 120 410, 60 382, 52 302 C 46 252, 52 234, 58 224",
    ],
    widths: [50],
    dots: [{ cx: 155, cy: 175 }],
    dotR: 26,
  },
  hah: {
    id: "hah",
    name: "هاء",
    // haa-2.png worksheet, numbered 1..6: ONE continuous stroke.
    // 1 start at the little beak (upper left) and arch over the top to the right,
    // 2 down the right side, 3 round the bottom-right of the bowl,
    // 4 back left underneath and up the left side of the inner oval,
    // 5 over the oval top and down the crossing curve to the base,
    // 6 finally run left along the flat base to the tail tip.
    viewBox: "0 0 361 587",
    strokes: [
      "M150 292 C 160 266, 190 246, 222 246 C 264 246, 301 277, 321 314 C 338 348, 340 386, 321 408 C 306 426, 285 431, 262 430 C 236 431, 211 424, 192 410 C 171 394, 162 370, 167 343 C 172 315, 190 298, 211 299 C 234 300, 246 325, 244 353 C 242 382, 250 408, 262 424 C 220 430, 120 434, 20 423",
    ],
    widths: [26],
    guideArrows: [[0.04, 0.22, 0.4, 0.58, 0.76, 0.95]],
  },
  waw: {
    id: "waw",
    name: "واو",
    // waaw-2.png worksheet: ONE bold circular head with a single teardrop
    // counter, tail flowing from the head's right side down and hooking left.
    // Single continuous stroke: start at the right of the head, trace the
    // loop clockwise (bottom -> left -> top -> right), then descend the tail.
    viewBox: "0 0 273 595",
    strokes: [
      "M212 212 C 212 257, 175 294, 130 294 C 85 294, 48 257, 48 212 C 48 167, 85 130, 130 130 C 175 130, 212 167, 212 212 C 216 260, 213 330, 200 375 C 188 415, 155 440, 115 450 C 90 456, 65 457, 48 450",
    ],
    widths: [62],
    guideArrows: [[0.16, 0.48, 0.88]],
  },
  yaa: {
    id: "yaa",
    name: "ياء",
    viewBox: "0 0 329 595",
    strokes: [
      "M272 158 C 232 136, 178 158, 186 194 C 194 228, 248 226, 268 250",
      "M268 250 C 286 300, 230 346, 150 346 C 80 346, 48 312, 52 262 C 54 232, 60 216, 66 206",
    ],
    widths: [44, 46],
    dots: [
      { cx: 128, cy: 430 },
      { cx: 200, cy: 430 },
    ],
    dotR: 26,
    continuousBody: true,
  },
};
