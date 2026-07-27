import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import BulletList from "../components/ui/BulletList";
import type { BulletItem } from "../types";

type BulletListSlideProps = {
  title: string;
  items: BulletItem[];
  className?: string;
};

export default function BulletListSlide({ title, items, className = "" }: BulletListSlideProps) {
  return (
    <Slide className={`layout-bullet-list ${className}`}>
      <div className="layout-bullet-list__inner">
        <Title as="h2">{title}</Title>
        <BulletList items={items} />
      </div>
    </Slide>
  );
}
