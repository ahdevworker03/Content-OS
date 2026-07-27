import SlideRenderer from "../renderer/SlideRenderer";
import type { SlideData } from "../types";
import type { Scale } from "./types";

const SCALES: { label: string; value: Scale }[] = [
  { label: "25%", value: 0.25 },
  { label: "50%", value: 0.5 },
  { label: "75%", value: 0.75 },
  { label: "100%", value: 1 },
];

type PreviewProps = {
  slide: SlideData | null;
  scale: Scale;
  onScaleChange: (scale: Scale) => void;
};

export default function Preview({ slide, scale, onScaleChange }: PreviewProps) {
  return (
    <div className="studio-preview">
      {slide ? (
        <div className="studio-preview__slide" style={{ "--slide-scale": scale } as React.CSSProperties}>
          <SlideRenderer slide={slide} />
        </div>
      ) : (
        <div className="studio-preview__empty">No slides</div>
      )}

      <div className="studio-preview__controls">
        <span className="studio-preview__label">Scale:</span>
        {SCALES.map((s) => (
          <button
            key={s.value}
            className={`studio-preview__scale-btn ${scale === s.value ? "studio-preview__scale-btn--active" : ""}`}
            onClick={() => onScaleChange(s.value)}
            type="button"
          >
            {s.label}
          </button>
        ))}
      </div>
    </div>
  );
}
