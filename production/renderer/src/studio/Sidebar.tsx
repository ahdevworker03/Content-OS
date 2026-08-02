import type { SlideData } from "../types";
import SlideCard from "./SlideCard";

type SidebarProps = {
  slides: SlideData[];
  currentIndex: number;
  onSelect: (index: number) => void;
};

export default function Sidebar({ slides, currentIndex, onSelect }: SidebarProps) {
  return (
    <nav className="studio-sidebar">
      <div className="studio-sidebar__header">
        Slides ({slides.length})
      </div>
      <ul className="studio-sidebar__list">
        {slides.map((slide, i) => (
          <li key={i}>
            <SlideCard
              slide={slide}
              index={i}
              active={i === currentIndex}
              onClick={() => onSelect(i)}
            />
          </li>
        ))}
      </ul>
    </nav>
  );
}
