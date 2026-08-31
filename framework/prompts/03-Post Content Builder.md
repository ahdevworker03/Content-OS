# 03 — Post Content Builder

## Purpose

Transform an approved content brief into a complete, publish-ready content package and its canonical structured data representation. This workflow produces both a human-readable Markdown draft and a machine-readable JSON file that conforms to the Content Model. It is responsible for content creation only — it does not render, export, publish, or archive.

---

## Scope

This workflow begins when an approved content brief is received from Content Planning.

It ends when both output files have been successfully generated and validated.

---

## Required Reading

The following Framework documents must be consulted before producing content:

- `framework/strategy/Brand View.md` — Creator identity, audience, content pillars, boundaries.
- `framework/strategy/Brand Voice.md` — Voice, tone, platform rules, language strategy, rewriting rules, mandatory output package.
- `framework/formats/Carousels.md` — Carousel types, structure, slide sequence, constraints (when format is carousel).
- `framework/formats/Reels.md` — Reel types, structure, authenticity guidelines (when format is reel).
- `framework/formats/Stories.md` — Story types, structure, unpolished standards, and engagement guidelines (when format is story).
- `framework/model/Content Model.md` — Canonical JSON schema that the structured output must conform to.
- `framework/memory/Posted Titles.md` — Published content index for duplication checking.

---

## Required Skills

When creating or polishing content, use the relevant writing skills:

- `student-builder-voice` — always use for all formats and platforms.
- `lebanese-arabic-writing` — use for Arabic Instagram, Stories, Reels, and X content.
- `arabic-technical-language` — use whenever Arabic content includes programming, CS, software, or project terminology.
- `carousel-copy-polish` — use for Instagram carousel drafts before final validation.
- `linkedin-reflection-writing` — use for LinkedIn platform variants.

Skills should improve writing quality without changing the approved content brief, selected format, trigger, core idea, or content boundaries.

---

## Skill Usage Rule

The agent must not generate final publish-ready copy before applying the relevant writing skills for the selected platform and format.

---

## Skill Priority

When multiple writing skills apply, each one controls a specific concern and must not override the others:

- `student-builder-voice` controls identity, authority level, and the student-builder perspective.
- `arabic-technical-language` controls Arabic/English technical terminology.
- `lebanese-arabic-writing` controls Lebanese Arabic flow and natural phrasing.
- `carousel-copy-polish` controls carousel slide structure, hook, flow, and CTA.
- `linkedin-reflection-writing` controls LinkedIn adaptation.

Apply the skill whose concern matches the part being written; do not let one skill's rules contradict another's responsibility.

---

## Inputs

- **Approved content brief** — The confirmed brief from Content Planning, including the selected idea, trigger, format, and creative direction.
- **Framework documents** — As listed in Required Reading.
- **User-provided context** — Optional notes, screenshots, code snippets, project details, technical references, or any other material that grounds the content in real experience.
- **Content Model schema** — The JSON Schema in `framework/model/Content Model.md` that defines the canonical structure for the JSON output.

---

## Outputs

- The workflow produces the draft corresponding to the selected primary format.
- The files listed below are the authoritative outputs of this workflow and must be written directly to the repository.

### Carousel

Two files are mandatory:

- `content/drafts/carousel.md` — A human-readable Markdown draft containing the complete carousel content package:
  - Instagram carousel slide content (Lebanese Arabic).
  - Visual guidance per slide.
  - Instagram caption.
  - LinkedIn adaptation.
- `production/workspace/carousel.json` — The canonical structured JSON representation conforming to the Content Model. This file is consumed by the React renderer.

### Reel

One file is mandatory:

- `content/drafts/reel.md` — A complete Markdown content package containing:
  - Hook.
  - Spoken script.
  - Visual direction.
  - On-screen text.
  - Instagram caption.
  - LinkedIn adaptation (when applicable).

### Story

One file is mandatory:

- `content/drafts/story.md` — A complete Markdown content package containing:
  - Story sequence.
  - Text overlays.
  - Visual guidance.
  - Interactive elements (polls, questions, sliders, etc.) when appropriate.
  - Supporting notes.

The selected format determines which output files are produced.

Only Carousel content generates `production/workspace/carousel.json`.

---

## Success Criteria

The workflow is successful when all of the following are true:

- **Brand Voice followed** — Writing aligns with the voice attributes, tonal range, writing style guidelines, and platform rules defined in Brand Voice.md.
- **Content matches approved brief** — The selected idea, trigger, format, and creative direction from the brief are preserved.
- **Required fields complete** — For Carousel content, all mandatory fields in the Content Model are populated with meaningful values.
- **No duplicate titles** — The post title does not appear in `framework/memory/Posted Titles.md`. If a similar topic exists, the angle must be substantially different.
- **Platform adaptations included** — Platform-specific versions follow the Platform Rewriting Rules in Brand Voice.md (language, tone, structure per platform).
- **Content grounded in real experience** — The trigger is authentic, and the content does not fabricate experiences, projects, achievements, or emotions.
- **Format-specific draft created** — The appropriate draft file (`carousel.md`, `reel.md`, or `story.md`) has been written to `content/drafts/`.
- **Content Model valid** — When the selected format is Carousel, the JSON output validates against the Content Model schema.
- **Markdown and JSON remain consistent** — For Carousel content, the Markdown draft and JSON represent the same content without divergence.

---

## Workflow

1. **Understand the brief.** Read the approved content brief to identify the selected idea, trigger, insight, format, target platforms, and any creative direction provided.

2. **Read the required Framework documents.** Consult the documents listed in Required Reading. Apply their rules during content creation. Do not read documents that are not required for this workflow.

3. **Check for duplication.** Search `framework/memory/Posted Titles.md` for the proposed title and topic. If a near-duplicate exists, adjust the angle to make it substantially different, or flag the issue.

4. **Write the Markdown draft for the selected format.** Produce the complete content package following the format-specific structure and the brand voice rules.

5. **Branch by the selected primary format.**

   **Carousel:**
   - Read `framework/formats/Carousels.md`.
   - Write the slide sequence (Hook → Trigger → Body → Project Bridge → CTA), visual guidance per slide, LinkedIn adaptation, and Instagram caption to `content/drafts/carousel.md`.
   - Generate the JSON representation into `production/workspace/carousel.json`. Transform the content into structured JSON that conforms to the Content Model schema, mapping every piece of content to its corresponding field and populating all required blocks (identity, trigger, metadata, variants).
   - Validate consistency: cross-check the Markdown draft and the JSON output. The slide content, platform adaptations, and captions must match. The JSON must be the structured equivalent of what the Markdown expresses in human-readable form.

   **Reel:**
   - Read `framework/formats/Reels.md`.
   - Write the hook, spoken script, visual suggestions, on-screen text, and caption to `content/drafts/reel.md`.
   - Do not generate carousel JSON.

   **Story:**
   - Read `framework/formats/Stories.md`.
   - Write the story sequence, text overlays, visual guidance, interactive elements, and supporting notes to `content/drafts/story.md`.
   - Do not generate carousel JSON.

---

## Constraints

- Do not invent facts, experiences, projects, achievements, or emotions. All content must originate from the approved brief and any user-provided context.
- Do not render slides, export assets, or produce images. This workflow produces text and structured data only.
- Do not modify the React renderer, template files, or any production tooling.
- Do not archive content or update the posted-titles index. Those responsibilities belong to workflow 06.
- Do not modify files outside the format-specific output files defined by this workflow.
- Always write the generated content directly into the corresponding draft file. Do not leave the final content only in the conversation.
- Preserve consistency between the Markdown draft and the JSON file. They are two representations of the same content and must not diverge.
- Assume the provided Content Brief has been approved. Do not revisit strategic decisions unless the brief is incomplete or internally inconsistent.

---

## Completion

This workflow ends immediately after the required output files for the selected format have been successfully written and validated against the success criteria.

- **Carousel:** `content/drafts/carousel.md` and `production/workspace/carousel.json`
- **Reel:** `content/drafts/reel.md`
- **Story:** `content/drafts/story.md`

No further action is taken.
