import { useEffect, useState, useCallback } from "react";
import { loadCarousel } from "../renderer/loadCarousel";
import type { Carousel, SlideData } from "../types";
import { validateCarousel } from "./validation";
import type { ValidationWarning } from "./types";

export function useCarousel() {
  const [carousel, setCarousel] = useState<Carousel | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [debugOpen, setDebugOpen] = useState(false);
  const [warnings, setWarnings] = useState<ValidationWarning[]>([]);

  useEffect(() => {
    loadCarousel().then((data) => {
      setCarousel(data);
    });
  }, []);

  useEffect(() => {
    if (carousel) setWarnings(validateCarousel(carousel));
  }, [carousel]);

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

  const updateSlide = useCallback((index: number, patch: Partial<SlideData>) => {
    setCarousel((prev) => {
      if (!prev) return prev;
      const slides = prev.slides.map((slide, i) =>
        i === index ? ({ ...slide, ...patch } as SlideData) : slide,
      );
      return { ...prev, slides };
    });
  }, []);

  return {
    carousel,
    currentIndex,
    debugOpen,
    warnings,
    currentSlide: carousel?.slides[currentIndex] ?? null,
    totalSlides: carousel?.slides.length ?? 0,
    goTo,
    goNext,
    goPrev,
    toggleDebug,
    updateSlide,
  };
}
