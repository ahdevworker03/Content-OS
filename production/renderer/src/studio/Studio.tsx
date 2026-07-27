import { useCallback } from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Preview from "./Preview";
import ValidationPanel from "./ValidationPanel";
import DebugPanel from "./DebugPanel";
import { useCarousel } from "./useCarousel";
import { useKeyboardNav } from "./useKeyboardNav";
import { USE_WORKSPACE_DATA } from "../renderer/config";
import "./Studio.css";

export default function Studio() {
  const {
    carousel,
    currentIndex,
    scale,
    debugOpen,
    warnings,
    currentSlide,
    totalSlides,
    goTo,
    goNext,
    goPrev,
    setScale,
    toggleDebug,
  } = useCarousel();

  useKeyboardNav({
    currentIndex,
    totalSlides,
    onPrev: goPrev,
    onNext: goNext,
  });

  const handleExport = useCallback(() => {
    alert("Export integration coming in Phase 6");
  }, []);

  if (!carousel) return null;

  return (
    <div className="studio">
      <Toolbar
        dataSource={USE_WORKSPACE_DATA ? "workspace" : "development"}
        totalSlides={totalSlides}
        onExport={handleExport}
      />

      <div className="studio__body">
        <Sidebar
          slides={carousel.slides}
          currentIndex={currentIndex}
          onSelect={goTo}
        />

        <main className="studio__main">
          <Preview
            slide={currentSlide}
            scale={scale}
            onScaleChange={setScale}
          />

          <div className="studio__panels">
            <ValidationPanel warnings={warnings} />
            <DebugPanel
              slide={currentSlide}
              isOpen={debugOpen}
              onToggle={toggleDebug}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
