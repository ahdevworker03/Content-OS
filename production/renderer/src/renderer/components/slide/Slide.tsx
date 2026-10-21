import type { ReactNode } from "react";
import { useSafetyContext, SafetyOverlay } from "../../safety";
import Footer from "../ui/Footer";

type SlideProps = {
  children: ReactNode;
  className?: string;
  headerLabel?: string;
  slideIndex?: number;
  slideCount?: number;
};

export default function Slide({
  children,
  className = "",
  headerLabel,
  slideIndex,
  slideCount,
}: SlideProps) {
  const { show } = useSafetyContext();

  return (
    <div className={`slide ${className}`}>
      <div className="slide__canvas">
        {headerLabel && slideIndex && slideCount && (
          <header className="slide__header">
            <span>{headerLabel}</span>
            <span className="slide__count">{String(slideIndex).padStart(2, "0")} / {String(slideCount).padStart(2, "0")}</span>
          </header>
        )}
        {children}
        <Footer className="slide__footer" branded={Boolean(headerLabel)}>abdallahhassoun.dev</Footer>
      </div>
      {show && <SafetyOverlay />}
    </div>
  );
}
