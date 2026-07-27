import type { BulletItem } from "../../types";

type BulletListProps = {
  items: BulletItem[];
  className?: string;
};

export default function BulletList({ items, className = "" }: BulletListProps) {
  return (
    <ul className={`ui-bullet-list ${className}`}>
      {items.map((item, i) => (
        <li
          key={i}
          className={item.highlight ? "ui-bullet-list__item--highlight" : ""}
        >
          {item.text}
        </li>
      ))}
    </ul>
  );
}
