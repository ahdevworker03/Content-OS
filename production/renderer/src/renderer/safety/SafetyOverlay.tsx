import "../safety/SafetyOverlay.css";

export default function SafetyOverlay() {
  return (
    <div className="safety-overlay">
      <div className="safety-overlay__canvas" />
      <div className="safety-overlay__safe-area" />
      <div className="safety-overlay__profile-grid">
        <div className="safety-overlay__crosshair safety-overlay__crosshair--h" />
        <div className="safety-overlay__crosshair safety-overlay__crosshair--v" />
      </div>
    </div>
  );
}
