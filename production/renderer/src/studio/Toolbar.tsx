type ToolbarProps = {
  dataSource: "development" | "workspace";
  totalSlides: number;
  onExport: () => void;
};

export default function Toolbar({ dataSource, totalSlides, onExport }: ToolbarProps) {
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

      <button className="studio-toolbar__export" onClick={onExport} type="button">
        Export
      </button>
    </header>
  );
}
