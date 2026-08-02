import { useEffect, useState } from "react";
import { loadCarousel } from "../renderer/loadCarousel";
import SlideRenderer from "../renderer/SlideRenderer";
import { SafetyProvider } from "../renderer/safety";
import type { Carousel } from "../types";

export default function ExportView() {
  const [carousel, setCarousel] = useState<Carousel | null>(null);

  useEffect(() => {
    loadCarousel().then(setCarousel);
  }, []);

  if (!carousel) return null;

  return (
    <SafetyProvider value={{ show: false }}>
      <div className="export">
        {carousel.slides.map((slide, i) => (
          <div key={i} style={{ "--slide-scale": 1 } as React.CSSProperties}>
            <SlideRenderer slide={slide} />
          </div>
        ))}
      </div>
    </SafetyProvider>
  );
}
