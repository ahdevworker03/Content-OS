import type { ReactNode } from "react";
import { useSafetyContext, SafetyOverlay } from "../../renderer/safety";

type SlideProps = {
  children: ReactNode;
  className?: string;
};

export default function Slide({ children, className = "" }: SlideProps) {
  const { show } = useSafetyContext();

  return (
    <div className={`slide ${className}`}>
      <div className="slide__canvas">
        {children}
        <div className="swipe">→</div>
      </div>
      {show && <SafetyOverlay />}
    </div>
  );
}
