import { useCallback, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Preview from "./Preview";
import ValidationPanel from "./ValidationPanel";
import DebugPanel from "./DebugPanel";
import { useCarousel } from "./useCarousel";
import { useKeyboardNav } from "./useKeyboardNav";
import { USE_WORKSPACE_DATA } from "../renderer/config";
import { SafetyProvider } from "../renderer/safety";
import "./theme.css";
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

  const [showSafety, setShowSafety] = useState(false);

  useKeyboardNav({
    currentIndex,
    totalSlides,
    onPrev: goPrev,
    onNext: goNext,
  });

  const navigate = useNavigate();

  const handleExport = useCallback(() => {
    navigate("/export");
  }, [navigate]);

  const handleToggleSafety = useCallback(() => {
    setShowSafety((prev) => !prev);
  }, []);

  const projectName = useMemo(() => {
    if (!carousel) return "";
    const first = carousel.slides[0];
    return "title" in first && first.title ? first.title : "Untitled Carousel";
  }, [carousel]);

  if (!carousel) return null;

  return (
    <SafetyProvider value={{ show: showSafety }}>
      <div className="studio">
        <Toolbar
          dataSource={USE_WORKSPACE_DATA ? "workspace" : "development"}
          projectName={projectName}
          totalSlides={totalSlides}
          showSafety={showSafety}
          onToggleSafety={handleToggleSafety}
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
    </SafetyProvider>
  );
}
