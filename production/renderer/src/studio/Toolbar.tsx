import { useState } from "react";
import AboutModal from "./AboutModal";

type ToolbarProps = {
  dataSource: "development" | "workspace";
  projectName: string;
  totalSlides: number;
  showSafety: boolean;
  onToggleSafety: () => void;
  onExport: () => void;
};

export default function Toolbar({
  dataSource,
  projectName,
  totalSlides,
  showSafety,
  onToggleSafety,
  onExport,
}: ToolbarProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <header className="studio-toolbar">
      <div className="studio-toolbar__brand">
        <span className="studio-toolbar__name">Carousel Studio</span>
        <span className="studio-toolbar__project" title={projectName}>
          {projectName}
        </span>
      </div>

      <div className="studio-toolbar__center">
        <span className="studio-toolbar__pill">
          Data Source: {dataSource === "workspace" ? "Workspace" : "Local"}
        </span>
        <span className="studio-toolbar__meta">
          {totalSlides} {totalSlides === 1 ? "slide" : "slides"} · Saved
        </span>
      </div>

      <div className="studio-toolbar__actions">
        <button
          className={`studio-toolbar__safety ${showSafety ? "studio-toolbar__safety--active" : ""}`}
          onClick={onToggleSafety}
          type="button"
        >
          {showSafety ? "Safety On" : "Safety Off"}
        </button>
        <button
          className="studio-toolbar__info"
          onClick={() => setAboutOpen(true)}
          type="button"
          aria-label="About"
          title="About"
        >
          ⓘ
        </button>
        <button className="studio-toolbar__export" onClick={onExport} type="button">
          Export
        </button>
      </div>

      {aboutOpen && <AboutModal dataSource={dataSource} onClose={() => setAboutOpen(false)} />}
    </header>
  );
}
