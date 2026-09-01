import { useState } from "react";
import AboutModal from "./AboutModal";

type ToolbarProps = {
  dataSource: "development" | "workspace";
  projectName: string;
  totalSlides: number;
  showSafety: boolean;
  theme: "light" | "dark";
  onToggleTheme: () => void;
  onToggleSafety: () => void;
  onExport: () => void;
};

export default function Toolbar({
  dataSource,
  projectName,
  totalSlides,
  showSafety,
  theme,
  onToggleTheme,
  onToggleSafety,
  onExport,
}: ToolbarProps) {
  const [aboutOpen, setAboutOpen] = useState(false);

  const isDark = theme === "dark";
  const themeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

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
          {showSafety ? "Safe Area" : "Layout Guides"}
        </button>
        <button
          className="studio-toolbar__theme"
          onClick={onToggleTheme}
          type="button"
          aria-label={themeLabel}
          title={themeLabel}
        >
          {isDark ? (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <circle cx="8" cy="8" r="3.25" stroke="currentColor" strokeWidth="1.4" />
              <path
                d="M8 1v1.5M8 13.5V15M1 8h1.5M13.5 8H15M2.8 2.8l1 1M12.2 12.2l1 1M2.8 13.2l1-1M12.2 3.8l1-1"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
              />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M13.5 8.7A5.5 5.5 0 1 1 7.3 2.5 4.5 4.5 0 0 0 13.5 8.7Z"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />
            </svg>
          )}
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
