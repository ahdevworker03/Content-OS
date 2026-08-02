import SlideRenderer from "../renderer/SlideRenderer";
import { SafetyProvider } from "../renderer/safety";
import type { SlideData } from "../types";

const THUMB_SCALE = 0.2;

type SlideCardProps = {
  slide: SlideData;
  index: number;
  active: boolean;
  onClick: () => void;
};

export function slideLayoutLabel(slide: SlideData): string {
  switch (slide.layout) {
    case "cover":
      return "Cover";
    case "bullet-list":
      return "Bullet List";
    case "arrow-list":
      return "Arrow List";
    case "grid":
      return "Grid";
    case "box-list":
      return "Box List";
    case "cta":
      return "CTA";
    case "__unsupported":
      return "Unsupported";
    default:
      return "Slide";
  }
}

export default function SlideCard({ slide, index, active, onClick }: SlideCardProps) {
  const layout = slideLayoutLabel(slide);
  const title = slide.layout === "__unsupported" ? slide.originalLayout : slide.title;

  return (
    <button
      className={`studio-sidebar__item ${active ? "studio-sidebar__item--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      <div className="studio-sidebar__thumb">
        <span className="studio-sidebar__number">{index + 1}</span>
        <span className="studio-sidebar__pill">{layout}</span>
        <SafetyProvider value={{ show: false }}>
          <div className="studio-sidebar__thumb-inner" style={{ "--slide-scale": THUMB_SCALE } as React.CSSProperties}>
            <SlideRenderer slide={slide} />
          </div>
        </SafetyProvider>
      </div>
      {title && (
        <span className="studio-sidebar__title" title={title}>
          {title}
        </span>
      )}
    </button>
  );
}
