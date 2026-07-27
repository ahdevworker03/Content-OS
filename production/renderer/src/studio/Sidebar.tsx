import type { SlideData } from "../types";

type SidebarProps = {
  slides: SlideData[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

function slideLabel(slide: SlideData, index: number): { layout: string; title: string } {
  const num = index + 1;

  switch (slide.layout) {
    case "cover":
      return { layout: `#${num} Cover`, title: slide.title };
    case "bullet-list":
      return { layout: `#${num} Bullet List`, title: slide.title };
    case "arrow-list":
      return { layout: `#${num} Arrow List`, title: slide.title };
    case "grid":
      return { layout: `#${num} Grid`, title: slide.title };
    case "box-list":
      return { layout: `#${num} Box List`, title: slide.title };
    case "cta":
      return { layout: `#${num} CTA`, title: slide.title };
    case "__unsupported":
      return { layout: `#${num} Unsupported`, title: slide.originalLayout };
  }
}

export default function Sidebar({ slides, currentIndex, onSelect }: SidebarProps) {
  return (
    <nav className="studio-sidebar">
      <div className="studio-sidebar__header">Slides</div>
      <ul className="studio-sidebar__list">
        {slides.map((slide, i) => {
          const { layout, title } = slideLabel(slide, i);
          return (
            <li key={i}>
              <button
                className={`studio-sidebar__item ${i === currentIndex ? "studio-sidebar__item--active" : ""}`}
                onClick={() => onSelect(i)}
                type="button"
              >
                <span className="studio-sidebar__layout">{layout}</span>
                {title && <span className="studio-sidebar__title">{title}</span>}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
