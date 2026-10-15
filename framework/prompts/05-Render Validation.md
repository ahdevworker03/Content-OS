# 05 — Render Validation

## Purpose

Validate an approved Instagram Carousel variant in the React renderer. This workflow is conditional: run it only when Workflow 02 approved an Instagram Carousel and Workflow 04 produced its canonical renderer JSON.

## Scope

This workflow starts after Carousel adaptation and ends with a render-ready confirmation or a validation report. It validates; it does not edit content, JSON, layouts, or renderer code.

## Required Reading

- `framework/prompts/README.md` — workflow boundaries and global rules.
- `framework/model/Content Model.md` — structure required by `carousel.json`.

## Inputs

- `production/workspace/carousel.json` from Workflow 04.
- The React renderer and its configuration.
- Available schema and rendering validation tools.

## Outputs

One outcome:

- Confirmation that the Carousel is structurally valid and every slide renders; or
- A report listing structural, layout, content-presence, or rendering failures.

Do not update repository content as part of the report.

## Success Criteria

- JSON parses and conforms to the Content Model.
- Only the intended carousel variant is present in the renderer input.
- Every slide renders with supported layouts and required fields.
- Rendered copy matches the canonical Carousel JSON without truncation or missing content.
- No renderer errors or unresolved assets occur.

## Workflow

1. Confirm that an Instagram Carousel is among the approved variants and `carousel.json` exists.
2. Parse the JSON and validate it against `framework/model/Content Model.md`. If this fails, report all detected schema issues and stop.
3. Load the workspace data in the React renderer.
4. Inspect every slide for render errors, missing or truncated text, unsupported layout, and missing required fields.
5. Report render-ready status or the specific failures. Do not repair the draft or JSON.

## Constraints

- Run only for an approved Carousel variant; LinkedIn, Reel, and Story do not require this workflow.
- Never modify `carousel.json`, Markdown variants, or renderer implementation.
- Never rewrite content. Substantive corrections return to Workflow 03; presentation adaptations return to Workflow 04.
- Never export assets; Workflow 06 owns Carousel export.
- Never archive or update `Posted Titles.md`; Workflow 07 owns archiving.

## Completion

Stop after the validation result or complete failure report. Workflow 06 may export a validated Carousel.
