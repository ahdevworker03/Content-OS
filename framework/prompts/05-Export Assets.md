# 05 — Export Assets

## Purpose

Create publish-ready slide assets from the validated React carousel. This workflow exports every carousel slide as an image through one of two supported mechanisms: the Studio Export Modal (in-browser export producing a ZIP of PNGs or PDF) or the Playwright export pipeline (headless export baseline using the frozen `/export` route). It is responsible for asset export only — it does not create content, validate rendering, modify the renderer, or archive published posts.

---

## Scope

This workflow begins after the Render Validation workflow has confirmed that the carousel is render-ready.

It ends when all slide images have been successfully exported and verified, or when an export report has been produced describing all detected failures.

---

## Required Reading

- `framework/prompts/README.md` — Prompt system architecture, workflow boundaries, global execution rules.

No other Framework documents are required for this workflow. Strategy, format, brand, and content model documents are not consulted during export.

---

## Inputs

- **Validated React renderer application** — The renderer in `production/renderer/` that has already been confirmed render-ready by workflow 04.
- **`production/workspace/carousel.json`** — The canonical structured data that the renderer consumes to display each slide.
- **Export configuration** — Settings that control the export process: viewport dimensions, output directory, file naming pattern, CSS selector for slide capture, scale factor, and headless mode.
- **Export mechanism** — One of the two supported paths:
  - **Studio Export Modal** — In-browser export producing a ZIP of PNGs or PDF, using the same renderer output. The normal manual path.
  - **Playwright export pipeline** — The headless export scripts and dependencies in `production/export/` that automate slide capture against the frozen `/export` route. The automation and regression-sensitive baseline.

---

## Outputs

The workflow produces a complete export package consisting of:

- One image for every carousel slide (PNG files, or a ZIP of PNGs or a PDF via the Studio Export Modal).
- All images saved in the configured export directory using the configured naming convention.
- A confirmation that the export completed successfully.

If export fails, the workflow produces an export report describing every detected issue, including which slides failed, what error occurred, and any configuration problems.

The selected export mechanism must preserve the rendered slide output. The workflow does not modify `carousel.json`. It does not modify the renderer.

---

## Success Criteria

Export is successful when all of the following are true:

- **Render Validation completed.** Workflow 04 confirmed the carousel is render-ready before export began.
- **React renderer successfully started.** The renderer launched and is serving the carousel content.
- **Carousel loaded successfully.** `carousel.json` was loaded without errors and all slides are displayed.
- **Selected export mechanism preserved rendered slide output.** The Studio Export Modal or Playwright pipeline captured the rendered slides without altering layout or content.
- **Every slide exported.** The selected mechanism captured every slide in the carousel, with no slides skipped.
- **Export files created successfully.** Each captured slide produced a valid file on disk (PNG, or within the ZIP or PDF package).
- **No missing slide images.** The number of exported images matches the number of slides in the carousel.
- **Images follow the configured naming convention.** File names match the pattern defined in the export configuration.
- **Images saved in the configured output directory.** All files are written to the expected location.
- **No export execution failures.** The selected mechanism completed without browser crashes, navigation errors, timeout issues, or missing files.
- **Export package confirmed ready for publishing.** All images are visually complete and can be uploaded to the target platform.

---

## Workflow

1. **Confirm the carousel has already passed Render Validation.** Verify that workflow 04 completed successfully and the carousel is confirmed render-ready. If validation has not been performed or failed, stop and report the missing prerequisite.

2. **Launch the React renderer if it is not already running.** Start the renderer application with the export configuration. Ensure the renderer is serving the carousel and accessible to the selected export mechanism.

3. **Load `production/workspace/carousel.json`.** Confirm that the renderer has loaded the canonical data and all slides are present and displayed.

4. **Select the export mechanism.** Use the Studio Export Modal (the normal manual path, producing a ZIP of PNGs or PDF from the in-browser renderer output) or the Playwright export pipeline (the headless automation and baseline path, executing `production/export/export-slides.js` against the frozen `/export` route). If both are available, the Studio Export Modal is the primary manual path and Playwright remains the automation/baseline path. Do not use both for the same export unless explicitly required.

5. **Capture every carousel slide individually.** For each slide in the carousel, capture the rendered output as a separate image. Ensure each slide is fully rendered before capture and no partial or transitional states are captured. The selected mechanism must preserve the rendered slide output exactly.

6. **Save each slide using the configured naming convention.** Write each captured image to the export directory (or into the ZIP/PDF package). Use the file naming pattern specified in the export configuration so that slide order is preserved.

7. **Verify that every expected image was created.** Confirm that the number of exported files matches the number of slides. Check that each file is valid and has non-zero file size.

8. **Produce the outcome.** If all slides were exported successfully, confirm that the export package is complete and ready for publishing. If any slide failed, or if the selected mechanism encountered errors, produce an export report describing every issue. Do not re-export failed slides automatically — report the failures.

---

## Constraints

- Never modify `carousel.json`. Content data is read-only during export.
- Never rewrite content or adjust slide text, layout, or structure.
- Never modify renderer components, layouts, or configuration.
- Never redesign or reorder slides.
- Never export before Render Validation has confirmed the carousel is render-ready.
- The selected export mechanism must preserve rendered slide output.
- Never perform rendering validation or content validation. Validation belongs to workflow 04.
- Never archive exported assets or update the posted-titles index. Archiving belongs to workflow 06.
- Never update repository files outside the configured export directory.
- Never silently ignore export failures. Every failure must be reported.

---

## Completion

This workflow ends immediately after either:

- confirming that all PNG assets were successfully exported and are ready for publishing, or
- producing a complete export report describing all detected failures.

No further workflows are executed automatically. The agent stops.
