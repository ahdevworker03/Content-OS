import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Badge from "../components/ui/Badge";
import type { GridItem } from "../types";

type GridSlideProps = {
  title: string;
  items: GridItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
  className?: string;
};

export default function GridSlide({ title, items, sectionTag, sectionTagVariant, bigNumber, className = "" }: GridSlideProps) {
  return (
    <Slide className={`layout-grid ${className}`}>
      {bigNumber && <div className="big-number">{bigNumber}</div>}
      <div className="layout-grid__inner">
        {sectionTag && <Badge variant={sectionTagVariant}>{sectionTag}</Badge>}
        <Title as="h2" size="lg">{title}</Title>
        <div className="layout-grid__grid">
          {items.map((item, i) => (
            <div key={i} className="mc">
              <div className="mc-lbl">{item.label}</div>
              <div className="mc-txt">{item.value}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
