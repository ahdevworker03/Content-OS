import { Fragment } from "react";
import type { BulletItem } from "../../types";

type BulletListProps = {
  items: BulletItem[];
  variant?: "secondary" | "primary";
  className?: string;
};

export default function BulletList({ items, variant = "secondary", className = "" }: BulletListProps) {
  return (
    <div className={`box-l${variant === "primary" ? " box-l2" : ""} ${className}`}>
      <p className="ui-bullet-text">
        {items.map((item, i) => (
          <Fragment key={i}>
            {i > 0 && <br />}
            <span className={item.highlight ? "ui-bullet-text__highlight" : ""}>
              • {item.text}
            </span>
          </Fragment>
        ))}
      </p>
    </div>
  );
}
