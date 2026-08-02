import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Badge from "../components/ui/Badge";
import type { ArrowItem } from "../types";

type ArrowListSlideProps = {
  title: string;
  items: ArrowItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
  className?: string;
};

export default function ArrowListSlide({ title, items, sectionTag, sectionTagVariant, bigNumber, className = "" }: ArrowListSlideProps) {
  return (
    <Slide className={`layout-arrow-list ${className}`}>
      {bigNumber && <div className="big-number">{bigNumber}</div>}
      <div className="layout-arrow-list__inner">
        {sectionTag && <Badge variant={sectionTagVariant}>{sectionTag}</Badge>}
        <Title as="h2" size="lg">{title}</Title>
        <div className="layout-arrow-list__items">
          {items.map((item, i) => (
            <div key={i} className="arrow-item">
              <div className="ar-text">{item.text}</div>
              <div className="arrow-icon">→</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
