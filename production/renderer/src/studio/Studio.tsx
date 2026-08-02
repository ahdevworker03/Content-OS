import { lazy, Suspense, useCallback, useMemo, useState } from "react";
import Sidebar from "./Sidebar";
import Toolbar from "./Toolbar";
import Preview from "./Preview";
import InspectorPanel from "./InspectorPanel";
import DebugPanel from "./DebugPanel";
import { useCarousel } from "./useCarousel";
import { useKeyboardNav } from "./useKeyboardNav";
import { USE_WORKSPACE_DATA } from "../renderer/config";
import { SafetyProvider } from "../renderer/safety";
import "./theme.css";
import "./Studio.css";

const ExportModal = lazy(() => import("./ExportModal"));

export default function Studio() {
  const {
    carousel,
    currentIndex,
    debugOpen,
    warnings,
    currentSlide,
    totalSlides,
    goTo,
    goNext,
    goPrev,
    toggleDebug,
    updateSlide,
  } = useCarousel();

  const [showSafety, setShowSafety] = useState(false);
  const [exportOpen, setExportOpen] = useState(false);

  useKeyboardNav({
    currentIndex,
    totalSlides,
    onPrev: goPrev,
    onNext: goNext,
  });

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
          onExport={() => setExportOpen(true)}
        />

        <div className="studio__body">
          <Sidebar
            slides={carousel.slides}
            currentIndex={currentIndex}
            onSelect={goTo}
          />

          <main className="studio__main">
            <Preview slide={currentSlide} />

            {import.meta.env.DEV && (
              <div className="studio__panels">
                <DebugPanel
                  slide={currentSlide}
                  isOpen={debugOpen}
                  onToggle={toggleDebug}
                />
              </div>
            )}
          </main>

          <InspectorPanel
            slide={currentSlide}
            slideIndex={currentIndex}
            warnings={warnings}
            onUpdate={updateSlide}
          />
        </div>
      </div>

      {exportOpen && (
        <Suspense fallback={null}>
          <ExportModal carousel={carousel} onClose={() => setExportOpen(false)} />
        </Suspense>
      )}
    </SafetyProvider>
  );
}
