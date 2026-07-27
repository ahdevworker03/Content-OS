import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import type { GridItem } from "../types";

type GridSlideProps = {
  title: string;
  items: GridItem[];
  className?: string;
};

export default function GridSlide({ title, items, className = "" }: GridSlideProps) {
  return (
    <Slide className={`layout-grid ${className}`}>
      <div className="layout-grid__inner">
        <Title as="h2">{title}</Title>
        <div className="layout-grid__grid">
          {items.map((item, i) => (
            <div key={i} className="layout-grid__cell">
              <span className="layout-grid__label">{item.label}</span>
              <span className="layout-grid__value">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
