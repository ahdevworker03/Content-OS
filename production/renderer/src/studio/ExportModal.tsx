import { useCallback, useRef, useState } from "react";
import { toPng } from "html-to-image";
import JSZip from "jszip";
import { jsPDF } from "jspdf";
import SlideRenderer from "../renderer/SlideRenderer";
import { SafetyProvider } from "../renderer/safety";
import type { Carousel } from "../types";

const EXPORT_PIXEL_RATIO = 2;
const SLIDE_SIZE = 1080;
const THUMB_SCALE = 0.18;

type ExportModalProps = {
  carousel: Carousel;
  onClose: () => void;
};

function download(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

export default function ExportModal({ carousel, onClose }: ExportModalProps) {
  const [selected, setSelected] = useState<boolean[]>(() =>
    carousel.slides.map(() => true),
  );
  const [busy, setBusy] = useState<"zip" | "pdf" | null>(null);
  const captureRef = useRef<HTMLDivElement>(null);

  const count = selected.filter(Boolean).length;
  const allSelected = count === carousel.slides.length;

  const toggle = useCallback((index: number) => {
    setSelected((prev) => prev.map((v, i) => (i === index ? !v : v)));
  }, []);

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const next = allSelected ? prev.map(() => false) : prev.map(() => true);
      return next;
    });
  }, [allSelected]);

  const captureNode = useCallback((index: number): Promise<string> => {
    const container = captureRef.current;
    if (!container) return Promise.reject(new Error("Capture container missing"));
    const node = container.querySelector(`[data-slide-index="${index}"] .slide`);
    if (!node) return Promise.reject(new Error(`Slide ${index + 1} not found`));
    return toPng(node as HTMLElement, {
      pixelRatio: EXPORT_PIXEL_RATIO,
      cacheBust: true,
    });
  }, []);

  const captureSelected = useCallback(async (): Promise<{ index: number; dataUrl: string }[]> => {
    const results: { index: number; dataUrl: string }[] = [];
    for (let i = 0; i < carousel.slides.length; i++) {
      if (!selected[i]) continue;
      results.push({ index: i, dataUrl: await captureNode(i) });
    }
    return results;
  }, [carousel.slides.length, selected, captureNode]);

  const handleZip = useCallback(async () => {
    setBusy("zip");
    try {
      const zip = new JSZip();
      const slides = await captureSelected();
      for (const { index, dataUrl } of slides) {
        const blob = await (await fetch(dataUrl)).blob();
        zip.file(`slide-${String(index + 1).padStart(2, "0")}.png`, blob);
      }
      const blob = await zip.generateAsync({ type: "blob" });
      download(blob, "slides.zip");
    } catch (err) {
      console.error("ZIP export failed", err);
    } finally {
      setBusy(null);
    }
  }, [captureSelected]);

  const handlePdf = useCallback(async () => {
    setBusy("pdf");
    try {
      const size = SLIDE_SIZE * EXPORT_PIXEL_RATIO;
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [size, size],
      });
      const slides = await captureSelected();
      for (let i = 0; i < slides.length; i++) {
        if (i > 0) pdf.addPage([size, size]);
        pdf.addImage(slides[i].dataUrl, "PNG", 0, 0, size, size);
      }
      pdf.save("slides.pdf");
    } catch (err) {
      console.error("PDF export failed", err);
    } finally {
      setBusy(null);
    }
  }, [captureSelected]);

  return (
    <div className="studio-modal" onClick={onClose}>
      <div
        className="studio-modal__card studio-export"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Export slides"
      >
        <button
          className="studio-modal__close"
          onClick={onClose}
          type="button"
          aria-label="Close"
          disabled={busy !== null}
        >
          ×
        </button>

        <div className="studio-export__header">
          <span className="studio-export__title">Export Slides</span>
          <label className="studio-export__select-all">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              disabled={busy !== null}
            />
            Select all
          </label>
        </div>

        <div className="studio-export__grid">
          {carousel.slides.map((slide, i) => (
            <label key={i} className="studio-export__item">
              <input
                className="studio-export__checkbox"
                type="checkbox"
                checked={selected[i]}
                onChange={() => toggle(i)}
                disabled={busy !== null}
              />
              <span className="studio-export__number">{i + 1}</span>
              <span className="studio-export__thumb">
                <SafetyProvider value={{ show: false }}>
                  <span
                    className="studio-export__thumb-inner"
                    style={{ "--slide-scale": THUMB_SCALE } as React.CSSProperties}
                  >
                    <SlideRenderer slide={slide} />
                  </span>
                </SafetyProvider>
              </span>
            </label>
          ))}
        </div>

        <div className="studio-export__footer">
          <span className="studio-export__count">
            {count} of {carousel.slides.length} slides selected
          </span>
          <div className="studio-export__actions">
            <button
              className="studio-toolbar__export"
              onClick={handleZip}
              disabled={busy !== null || count === 0}
              type="button"
            >
              {busy === "zip" ? "Exporting…" : "Download ZIP (PNGs)"}
            </button>
            <button
              className="studio-toolbar__export"
              onClick={handlePdf}
              disabled={busy !== null || count === 0}
              type="button"
            >
              {busy === "pdf" ? "Exporting…" : "Download PDF"}
            </button>
          </div>
        </div>
      </div>

      <div className="studio-export__capture" ref={captureRef}>
        {carousel.slides.map((slide, i) => (
          <div
            key={i}
            data-slide-index={i}
            style={{ "--slide-scale": 1 } as React.CSSProperties}
          >
            <SlideRenderer slide={slide} />
          </div>
        ))}
      </div>
    </div>
  );
}
