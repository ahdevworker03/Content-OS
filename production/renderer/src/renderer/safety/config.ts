/**
 * @deprecated The safe overlay is now CSS-driven and derives geometry from
 * renderer CSS tokens (--slide-padding-y/x/bottom, --slide-scale), making this
 * module unnecessary. It is kept (unused) for future extensibility, e.g.
 * safe-area presets for Instagram / LinkedIn / X / TikTok.
 */
export const SAFETY_CONFIG = {
  canvasWidth: 1080,
  canvasHeight: 1080,
  safeArea: {
    top: 90,
    bottom: 72,
    left: 80,
    right: 80,
  },
  profileGridSize: 1080,
  visibility: {
    canvas: true,
    safeArea: true,
    profileGrid: true,
    crosshair: true,
  },
  colors: {
    canvasBorder: "rgba(255, 255, 255, 0.2)",
    safeAreaFill: "rgba(59, 130, 246, 0.06)",
    safeAreaBorder: "rgba(59, 130, 246, 0.25)",
    profileGridFill: "rgba(251, 191, 36, 0.06)",
    profileGridBorder: "rgba(251, 191, 36, 0.3)",
    crosshair: "rgba(255, 255, 255, 0.12)",
  },
};
