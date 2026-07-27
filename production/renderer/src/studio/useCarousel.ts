import { useEffect, useState, useCallback } from "react";
import { loadCarousel } from "../renderer/loadCarousel";
import type { Carousel } from "../types";
import type { Scale } from "./types";
import { validateCarousel } from "./validation";
import type { ValidationWarning } from "./types";

export function useCarousel() {
  const [carousel, setCarousel] = useState<Carousel | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [scale, setScale] = useState<Scale>(0.5);
  const [debugOpen, setDebugOpen] = useState(false);
  const [warnings, setWarnings] = useState<ValidationWarning[]>([]);

  useEffect(() => {
    loadCarousel().then((data) => {
      setCarousel(data);
      setWarnings(validateCarousel(data));
    });
  }, []);

  const goTo = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const goNext = useCallback(() => {
    setCurrentIndex((i) => i + 1);
  }, []);

  const goPrev = useCallback(() => {
    setCurrentIndex((i) => i - 1);
  }, []);

  const toggleDebug = useCallback(() => {
    setDebugOpen((o) => !o);
  }, []);

  return {
    carousel,
    currentIndex,
    scale,
    debugOpen,
    warnings,
    currentSlide: carousel?.slides[currentIndex] ?? null,
    totalSlides: carousel?.slides.length ?? 0,
    goTo,
    goNext,
    goPrev,
    setScale,
    toggleDebug,
  };
}
