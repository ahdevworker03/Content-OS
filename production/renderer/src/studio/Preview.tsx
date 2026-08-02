import { useCallback, useEffect, useRef, useState } from "react";
import SlideRenderer from "../renderer/SlideRenderer";
import type { SlideData } from "../types";

const SLIDE_SIZE = 1080;
const MIN_SCALE = 0.1;
const MAX_SCALE = 3;

type PreviewProps = {
  slide: SlideData | null;
};

export default function Preview({ slide }: PreviewProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });
  const [fit, setFit] = useState(true);
  const [manualScale, setManualScale] = useState(1);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const ro = new ResizeObserver((entries) => {
      const rect = entries[0].contentRect;
      setViewport({ width: rect.width, height: rect.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fitScale =
    viewport.width > 0 && viewport.height > 0
      ? Math.min(viewport.width / SLIDE_SIZE, viewport.height / SLIDE_SIZE)
      : 1;

  const scale = fit ? fitScale : manualScale;
  const percent = Math.round(scale * 100);

  const zoomBy = useCallback((factor: number) => {
    setFit(false);
    setManualScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor)));
  }, []);

  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      const factor = e.deltaY > 0 ? 0.9 : 1.1;
      setFit(false);
      setManualScale((s) => Math.min(MAX_SCALE, Math.max(MIN_SCALE, s * factor)));
    },
    [],
  );

  return (
    <div className="studio-preview" ref={viewportRef} onWheel={handleWheel}>
      {slide ? (
        <div className="studio-preview__slide" style={{ "--slide-scale": scale } as React.CSSProperties}>
          <SlideRenderer slide={slide} />
        </div>
      ) : (
        <div className="studio-preview__empty">No slides</div>
      )}

      <div className="studio-preview__zoom">
        <button
          className="studio-preview__zoom-btn"
          onClick={() => zoomBy(0.8)}
          type="button"
          aria-label="Zoom out"
        >
          −
        </button>
        <button
          className={`studio-preview__zoom-fit ${fit ? "studio-preview__zoom-fit--active" : ""}`}
          onClick={() => setFit(true)}
          type="button"
          title="Fit to screen"
        >
          {fit ? `${percent}% · Fit` : `${percent}%`}
        </button>
        <button
          className="studio-preview__zoom-btn"
          onClick={() => zoomBy(1.25)}
          type="button"
          aria-label="Zoom in"
        >
          +
        </button>
      </div>
    </div>
  );
}
