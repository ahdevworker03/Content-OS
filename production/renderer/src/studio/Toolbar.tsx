type ToolbarProps = {
  dataSource: "development" | "workspace";
  totalSlides: number;
  showSafety: boolean;
  onToggleSafety: () => void;
  onExport: () => void;
};

export default function Toolbar({ dataSource, totalSlides, showSafety, onToggleSafety, onExport }: ToolbarProps) {
  return (
    <header className="studio-toolbar">
      <span className="studio-toolbar__brand">Carousel Studio</span>

      <div className="studio-toolbar__center">
        <span className="studio-toolbar__pill">
          {dataSource === "development" ? "Development JSON" : "Workspace JSON"}
        </span>
        <span className="studio-toolbar__meta">
          v1.0.0
        </span>
        <span className="studio-toolbar__meta">
          {totalSlides} {totalSlides === 1 ? "slide" : "slides"}
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
        <button className="studio-toolbar__export" onClick={onExport} type="button">
          Export
        </button>
      </div>
    </header>
  );
}
