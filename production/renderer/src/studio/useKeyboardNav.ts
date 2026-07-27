import { useEffect } from "react";

type UseKeyboardNavOptions = {
  currentIndex: number;
  totalSlides: number;
  onPrev: () => void;
  onNext: () => void;
};

export function useKeyboardNav({
  currentIndex,
  totalSlides,
  onPrev,
  onNext,
}: UseKeyboardNavOptions) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" && currentIndex > 0) {
        onPrev();
      }
      if (e.key === "ArrowRight" && currentIndex < totalSlides - 1) {
        onNext();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, totalSlides, onPrev, onNext]);
}
