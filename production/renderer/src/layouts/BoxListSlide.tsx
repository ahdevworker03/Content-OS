import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import type { BoxItem } from "../types";

type BoxListSlideProps = {
  title: string;
  items: BoxItem[];
  className?: string;
};

export default function BoxListSlide({ title, items, className = "" }: BoxListSlideProps) {
  return (
    <Slide className={`layout-box-list ${className}`}>
      <div className="layout-box-list__inner">
        <Title as="h2">{title}</Title>
        <div className="layout-box-list__items">
          {items.map((item, i) => (
            <div key={i} className="layout-box-list__card">
              <h3 className="layout-box-list__heading">{item.heading}</h3>
              <p className="layout-box-list__description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}
