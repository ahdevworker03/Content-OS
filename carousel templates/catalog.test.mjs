import assert from "node:assert/strict";
import test from "node:test";
import { validateCarousel, canUseEvidence } from "./catalog.ts";
import { projectStructureExample } from "./example.ts";

test("existing text-only story does not require evidence or a fixed slide count", () => {
  assert.deepEqual(validateCarousel(projectStructureExample), []);
});

test("real evidence requires content and an accessible description", () => {
  const emptyImage = {
    id: "proof",
    template: "evidence",
    title: "من المشروع",
    evidence: { kind: "image", src: "", alt: "" },
  };
  assert.equal(canUseEvidence(emptyImage), false);
  assert.match(validateCarousel({ slides: [{ id: "start", template: "cover", title: "بداية" }, emptyImage] }).join(" "), /image source is empty/);
});

test("sequence and duplicate IDs are reported before rendering", () => {
  const issues = validateCarousel({
    slides: [
      { id: "same", template: "cover", title: "بداية" },
      { id: "same", template: "sequence", title: "الخطوات", items: ["واحدة"] },
    ],
  });
  assert.ok(issues.some(issue => issue.includes("duplicated")));
  assert.ok(issues.some(issue => issue.includes("two to four")));
});
