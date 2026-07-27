import type { ValidationWarning } from "./types";

type ValidationPanelProps = {
  warnings: ValidationWarning[];
};

export default function ValidationPanel({ warnings }: ValidationPanelProps) {
  if (warnings.length === 0) return null;

  return (
    <div className="studio-validation">
      <div className="studio-validation__header">
        Validation ({warnings.length} {warnings.length === 1 ? "warning" : "warnings"})
      </div>
      <ul className="studio-validation__list">
        {warnings.map((w, i) => (
          <li
            key={i}
            className={`studio-validation__item studio-validation__item--${w.severity}`}
          >
            <span className="studio-validation__badge">{w.severity === "error" ? "!" : "?"}</span>
            <span>Slide #{w.slideIndex + 1}:</span>
            <span>{w.message}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
