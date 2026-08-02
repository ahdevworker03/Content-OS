import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import BulletList from "../components/ui/BulletList";
import type { BulletItem } from "../types";

type BulletListSlideProps = {
  title: string;
  items: BulletItem[];
  label?: string;
  summary?: string;
  className?: string;
};

export default function BulletListSlide({ title, items, label, summary, className = "" }: BulletListSlideProps) {
  return (
    <Slide className={`layout-bullet-list ${className}`}>
      <div className="layout-bullet-list__inner">
        {label && <div className="s-label">{label}</div>}
        <Title as="h2" size="experience">{title}</Title>
        <BulletList items={items} />
        {summary && (
          <div className="layout-bullet-list__summary flex-1 d-flex items-center">
            <div className="box-l2">
              <p className="s-body--summary">{summary}</p>
            </div>
          </div>
        )}
      </div>
    </Slide>
  );
}
