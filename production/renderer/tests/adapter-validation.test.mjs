import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import test from "node:test";
import ts from "typescript";

const here = path.dirname(fileURLToPath(import.meta.url));

async function loadTsModule(entryPoint) {
  const source = await readFile(entryPoint, "utf8");
  const result = ts.transpileModule(source, { compilerOptions: { target: ts.ScriptTarget.ES2020, module: ts.ModuleKind.ESNext } });
  return import(`data:text/javascript;base64,${Buffer.from(result.outputText).toString("base64")}`);
}

const { mapWorkspaceCarousel } = await loadTsModule(path.join(here, "../src/renderer/mapWorkspaceCarousel.ts"));
const { validateCarousel } = await loadTsModule(path.join(here, "../src/studio/validation.ts"));
const fixture = JSON.parse(await readFile(path.join(here, "fixtures/personal-workspace-carousel.json"), "utf8"));
const contentModel = await readFile(path.join(here, "../../../framework/model/Content Model.md"), "utf8");

test("maps all seven approved workspace layout IDs and local conceptual evidence assets", () => {
  const carousel = mapWorkspaceCarousel(fixture);
  assert.deepEqual(carousel.slides.map((slide) => slide.layout), ["cover", "story", "focus", "sequence", "comparison", "evidence", "closing"]);
  assert.equal(carousel.slides[5].evidence.kind, "diagram");
  assert.equal(carousel.slides[5].evidence.src, "/evidence/project-structure-decision-conceptual.svg");
  assert.match(carousel.slides[5].evidence.caption, /Conceptual diagram/);
  assert.deepEqual(validateCarousel(carousel), []);
});

test("Content Model schema declares the seven layouts and evidence variants", () => {
  const schemaMarkdown = contentModel.split("## JSON Schema Expression")[1];
  const schemaText = schemaMarkdown.match(/```json\s*([\s\S]*?)```/)?.[1];
  assert.ok(schemaText, "embedded Content Model JSON Schema exists");
  const schema = JSON.parse(schemaText);
  const carousel = schema.$defs["carousel-body"].properties.slides.items;
  const layouts = carousel.properties.layout.enum;
  for (const layout of ["cover", "story", "focus", "sequence", "comparison", "evidence", "closing"]) assert.ok(layouts.includes(layout));
  assert.ok(carousel.properties.evidence.oneOf.some((variant) => variant.properties.kind.const === "diagram"));
});

test("maps supplied code and explicitly conceptual diagrams", () => {
  const carousel = mapWorkspaceCarousel({ variants: [{ format: "carousel", body: { type: "carousel", slides: [
    { layout: "evidence", title: "Code", evidence: { kind: "code", code: "return <PersonalCover slide={slide} />;", language: "tsx" } },
    { layout: "evidence", title: "Diagram", evidence: { kind: "diagram", asset: "evidence/renderer-pipeline-conceptual.svg", alt: "Conceptual view of the selected layout passing through the renderer layers", conceptual: true } },
  ] } }] });
  assert.deepEqual(carousel.slides[0].evidence, { kind: "code", code: "return <PersonalCover slide={slide} />;", language: "tsx", caption: undefined });
  assert.equal(carousel.slides[1].evidence.caption, "Conceptual diagram");
  assert.deepEqual(validateCarousel(carousel), []);
});

test("preserves legacy layouts, maps final-cta to closing, and retains footer data", () => {
  const carousel = mapWorkspaceCarousel({ variants: [{ format: "carousel", body: { type: "carousel", slides: [
    { layout: "cover", title: "Legacy cover", subtext: "Old subtitle", handle: "@old.handle" },
    { layout: "box-list", title: "Legacy", items: [{ text: "One" }], handle: "@old.handle" },
    { layout: "arrow-list", title: "Legacy arrows", items: [{ text: "One" }] },
    { layout: "bullet-list", title: "Legacy bullets", items: [{ text: "One" }] },
    { layout: "grid-2x2", title: "Legacy grid", grid_items: [{ label: "A", text: "B" }] },
    { layout: "cta", title: "Legacy CTA", subtext: "Legacy sign-off", footer: { name: "Old CTA name", handle: "@legacy" } },
    { layout: "final-cta", title: "Question?", questions: ["One?", "Two?"], footer: { name: "Old name", handle: "@old.handle" } },
    { layout: "future-layout", title: "Unsupported", footer: { role: "Author" } },
  ] } }] });
  assert.equal(carousel.slides[0].layout, "cover");
  assert.equal(carousel.slides[0].legacyFooter.handle, "@old.handle");
  assert.equal(carousel.slides[1].layout, "box-list");
  assert.equal(carousel.slides[1].legacyFooter.handle, "@old.handle");
  assert.equal(carousel.slides[2].layout, "arrow-list");
  assert.equal(carousel.slides[3].layout, "bullet-list");
  assert.equal(carousel.slides[4].layout, "grid");
  assert.equal(carousel.slides[5].layout, "closing");
  assert.equal(carousel.slides[5].question, "Legacy CTA");
  assert.equal(carousel.slides[5].signoff, "Legacy sign-off");
  assert.equal(carousel.slides[5].legacyFooter.handle, "@legacy");
  assert.equal(carousel.slides[6].layout, "closing");
  assert.deepEqual(carousel.slides[6].legacyQuestions, ["One?", "Two?"]);
  assert.deepEqual(carousel.slides[6].legacyFooter, { name: "Old name", role: undefined, handle: "@old.handle" });
  assert.equal(carousel.slides[7].layout, "__unsupported");
  assert.equal(carousel.slides[7].legacyFooter.role, "Author");
  assert.deepEqual(validateCarousel(carousel).filter((warning) => warning.severity === "error").map((warning) => warning.message), ['Unsupported layout: "future-layout"']);
});

test("warns when required fields or safe local evidence are missing", () => {
  const carousel = mapWorkspaceCarousel({ variants: [{ format: "carousel", body: { type: "carousel", slides: [
    { layout: "story", title: "No body" },
    { layout: "sequence", title: "Too short", items: [{ text: "One" }] },
    { layout: "comparison", title: "No contrast", before: { label: "Before", text: "" }, after: { label: "", text: "Later" } },
    { layout: "evidence", title: "Unsafe", evidence: { kind: "image", asset: "../private.png", alt: "" } },
    { layout: "evidence", title: "Unlabeled diagram", evidence: { kind: "diagram", asset: "evidence/portfolio-cover.png", alt: "Diagram", conceptual: false } },
    { layout: "closing", question: "" },
  ] } }] });
  const messages = validateCarousel(carousel).map((warning) => warning.message);
  assert.ok(messages.includes("Missing story body"));
  assert.ok(messages.includes("Sequence needs two to four items"));
  assert.ok(messages.includes("Missing before comparison content"));
  assert.ok(messages.includes("Evidence asset must use a local /evidence/ path"));
  assert.ok(messages.includes("Diagram must be identified as conceptual"));
  assert.ok(messages.includes("Missing closing question or thought"));
});
