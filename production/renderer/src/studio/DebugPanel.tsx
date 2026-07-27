import type { SlideData } from "../types";

type DebugPanelProps = {
  slide: SlideData | null;
  isOpen: boolean;
  onToggle: () => void;
};

export default function DebugPanel({ slide, isOpen, onToggle }: DebugPanelProps) {
  return (
    <div className="studio-debug">
      <button className="studio-debug__toggle" onClick={onToggle} type="button">
        {isOpen ? "▼" : "▶"} Debug
      </button>
      {isOpen && (
        <pre className="studio-debug__json">
          {JSON.stringify(slide, null, 2)}
        </pre>
      )}
    </div>
  );
}
