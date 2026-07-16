/**
 * Export configuration for the carousel slide exporter.
 *
 * All values have defaults. Override via CLI arguments:
 *   node export-slides.js --url http://localhost:8080 --output my-slides
 *
 * Or by editing this file directly.
 */
module.exports = {
  /** URL of the carousel HTML page to render. */
  url: "http://localhost:8000/Carousel%20Structure/index.html",

  /** Playwright browser launch options. */
  browser: {
    headless: true,
  },

  /** Page viewport settings. */
  viewport: {
    width: 1920,
    height: 1080,
    deviceScaleFactor: 2,
  },

  /** Wait timeout in ms after page load before scanning for slides. */
  waitAfterLoad: 1000,

  /** Wait timeout in ms between scrolling to a slide and capturing it. */
  waitBetweenSlides: 300,

  /** CSS selector for slide elements. */
  slideSelector: ".slide",

  /** Output directory for exported slide images. */
  outputDir: "extracted-slides",

  /** Output filename pattern. {{n}} is replaced with the 0-padded slide number. */
  outputPattern: "slide-{{n}}.png",

  /** Starting number for slide counting (1-indexed). */
  startIndex: 1,

  /** Number of digits to pad (e.g. 2 → 01, 02, … | 3 → 001, 002, …). */
  padDigits: 2,
};
