import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Badge from "../components/ui/Badge";
import type { BoxItem } from "../types";

type BoxListSlideProps = {
  title: string;
  items: BoxItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  label?: string;
  className?: string;
};

export default function BoxListSlide({ title, items, sectionTag, sectionTagVariant, label, className = "" }: BoxListSlideProps) {
  return (
    <Slide className={`layout-box-list ${className}`}>
      <div className="layout-box-list__inner">
        {sectionTag && <Badge variant={sectionTagVariant}>{sectionTag}</Badge>}
        {label && <div className="s-label">{label}</div>}
        <Title as="h2" size="md">{title}</Title>
        <div className="layout-box-list__items">
          {items.map((item, i) => (
            <div key={i} className={`layout-box-list__card${item.accent ? " accent-border" : ""}`}>
              <p className="layout-box-list__text">{item.heading}</p>
              {item.description && (
                <p className="layout-box-list__text">{item.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
