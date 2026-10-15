import type { ReactNode } from "react";
import { useSafetyContext, SafetyOverlay } from "../../renderer/safety";
import Footer from "../ui/Footer";

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
        <Footer className="slide__footer">abdallahhassoun.dev</Footer>
      </div>
      {show && <SafetyOverlay />}
    </div>
  );
}
