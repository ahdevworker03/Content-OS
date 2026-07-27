import type { ReactNode } from "react";

type SlideProps = {
  children: ReactNode;
  className?: string;
};

export default function Slide({ children, className = "" }: SlideProps) {
  return (
    <div className={`slide ${className}`}>
      <div className="slide__canvas">{children}</div>
    </div>
  );
}
