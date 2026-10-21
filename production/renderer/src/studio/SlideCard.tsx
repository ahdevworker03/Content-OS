import SlideRenderer from "../renderer/SlideRenderer";
import { SafetyProvider } from "../renderer/safety";
import type { SlideData } from "../renderer/models";

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
    case "story":
      return "Story";
    case "focus":
      return "Focus";
    case "sequence":
      return "Sequence";
    case "comparison":
      return "Comparison";
    case "evidence":
      return "Evidence";
    case "closing":
      return "Closing";
    case "personal-cover":
      return "Personal Cover";
    case "personal-trigger":
      return "Trigger";
    case "personal-belief":
      return "Belief";
    case "personal-friction":
      return "Friction";
    case "personal-realization":
      return "Realization";
    case "personal-decision":
      return "Decision";
    case "personal-takeaway":
      return "Takeaway";
    case "personal-closing":
      return "Conversation";
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
  }
}

export default function SlideCard({ slide, index, active, onClick }: SlideCardProps) {
  const layout = slideLayoutLabel(slide);
  const title = slide.layout === "__unsupported"
    ? slide.originalLayout
    : slide.layout === "closing" || slide.layout === "personal-closing"
      ? slide.question
      : slide.title;

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
