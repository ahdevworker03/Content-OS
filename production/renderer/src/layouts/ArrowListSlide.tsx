import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import type { ArrowItem } from "../types";

type ArrowListSlideProps = {
  title: string;
  items: ArrowItem[];
  className?: string;
};

export default function ArrowListSlide({ title, items, className = "" }: ArrowListSlideProps) {
  return (
    <Slide className={`layout-arrow-list ${className}`}>
      <div className="layout-arrow-list__inner">
        <Title as="h2">{title}</Title>
        <div className="layout-arrow-list__items">
          {items.map((item, i) => (
            <div key={i} className="layout-arrow-list__row">
              {i > 0 && <span className="layout-arrow-list__arrow">→</span>}
              <span className="layout-arrow-list__text">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
