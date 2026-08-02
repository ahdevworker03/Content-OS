import { BrowserRouter, Routes, Route } from "react-router-dom";
import Studio from "./studio/Studio";
import ExportView from "./export/ExportView";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Studio />} />
        <Route path="/export" element={<ExportView />} />
      </Routes>
    </BrowserRouter>
  );
}
