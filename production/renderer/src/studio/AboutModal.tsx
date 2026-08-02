import { useEffect } from "react";

type AboutModalProps = {
  dataSource: "development" | "workspace";
  onClose: () => void;
};

export default function AboutModal({ dataSource, onClose }: AboutModalProps) {
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <div className="studio-modal" onClick={onClose}>
      <div
        className="studio-modal__card"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <button className="studio-modal__close" onClick={onClose} type="button" aria-label="Close">
          ×
        </button>
        <div className="studio-modal__brand">Carousel Studio</div>
        <div className="studio-modal__row">
          <span className="studio-modal__label">Version</span>
          <span className="studio-modal__value">1.0.0</span>
        </div>
        <div className="studio-modal__row">
          <span className="studio-modal__label">Data source</span>
          <span className="studio-modal__value">
            {dataSource === "workspace" ? "Workspace" : "Local"}
          </span>
        </div>
      </div>
    </div>
  );
}
