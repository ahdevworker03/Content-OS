## Contents

### Plan

- [01 — Idea Discovery](#01--idea-discovery)
- [02 — Content Planning](#02--content-planning)

### Create

- [03 — Post Content Builder](#03--post-content-builder)
- [04 — Format Adaptation](#04--format-adaptation)

### Validate and export (Carousel only, when approved)

- [05 — Render Validation](#05--render-validation)
- [06 — Export Assets](#06--export-assets)

### Archive

- [07 — Archive Published Post](#07--archive-published-post)

# 01 — Idea Discovery

## Purpose

Discover, evaluate, refine, and recommend high-potential content ideas grounded in real work and aligned with the creator's brand strategy. This workflow identifies content opportunities from current systems, decisions, projects, technical discoveries, and relevant learning context. It is responsible for idea generation, refinement, and selection only — it does not plan content, write content, render, export, or archive.

---

## Scope

This workflow begins with user context, ongoing work, recent learning, project activity, or previously identified opportunities.

It ends only when one or more recommended content ideas have passed the idea-quality gate and received a `READY` verdict from `content-strategist`.

---

## Required Reading

- `framework/strategy/Brand Strategy.md` — Creator identity, audience, content pillars, boundaries.
- `framework/memory/Posted Titles.md` — Published content index for duplication checking.
- `.agents/skills/content-strategist/SKILL.md` — Mandatory idea-quality gate.

`framework/strategy/Brand Strategy.md` should only be consulted if voice or platform considerations materially affect whether an idea is worth pursuing. Production and renderer documents are not required for idea discovery.

---

## Inputs

- **Current user context** — What the creator is building, investigating, deciding, studying, or trying to understand.
- **Recent projects** — Active or recently completed project work that could generate authentic content.
- **Learning experiences** — Lectures, tutorials, books, or courses the creator is currently engaged with.
- **Technical discoveries** — Bugs solved, concepts understood, tools learned, or workflows improved.
- **User notes** — Any thoughts, observations, or reflections the user provides.
- **Screenshots and code snippets** — Visual or code-based material that documents real experiences.
- **Questions the user recently explored** — Topics the creator investigated out of curiosity or necessity.
- **Previously published content** — Existing posts to reference for continuity or to identify gaps.
- **Framework strategy documents** — Brand View (required) and Brand Voice (when needed).

---

## Outputs

The workflow produces one or more evaluated content ideas. Every idea must receive one strategist verdict:

- `REJECT` — there is no sufficiently valuable post in the available material; do not force one.
- `DEVELOP` — there is useful material, but the angle, evidence, audience value, or reasoning still needs refinement.
- `READY` — the idea is specific, authentic, useful, sufficiently supported, differentiated, and ready for Content Planning.

For every `DEVELOP` or `READY` idea, the strategist must provide a refined content direction containing, at minimum:

- **Working angle/title** — A descriptive direction for the proposed content.
- **Core idea** — One sentence summarising what the content is actually about.
- **Authentic trigger** — The real experience that inspired the idea.
- **Core tension/question** — What was surprising, unclear, difficult, consequential, or worth examining.
- **Core insight** — The non-generic idea the experience supports.
- **Supporting evidence** — Existing project details, code, screenshots, decisions, results, or other source-supported material.
- **Audience problem** — What the audience struggles with that this content addresses.
- **Expected audience payoff** — What the audience will understand, question, or be able to apply.
- **Specificity/differentiation** — What makes the idea dependent on this real experience rather than generic developer advice.
- **Suggested content pillar** — The pillar from Brand View this idea belongs to.
- **Suggested primary format** — Instagram Carousel or LinkedIn post.
- **Recommended platforms** — Which platforms the content should target.
- **Why the format fits** — Why the idea has the right depth and structure for that format.
- **What not to claim** — Important factual or certainty boundaries.
- **Notes for Content Planning** — Context, warnings, or observations that will help Workflow 02 evaluate the idea.

Only a `READY` idea becomes official input for Content Planning.

**Optional persistence.** By default, recommendations are delivered in the conversation. If the user asks to save a selected idea, create `content/ideas/<YYYY-MM-DD-project-slug>/idea.json`, with optional curated supporting resources beside it. Follow `framework/model/idea.schema.json`; see `framework/workflows/Content Idea Capture Rules.md` for capture guidance. This manual, user-driven discovery and saving flow is separate from automatic project-agent capture after completed and verified work.

---

## Success Criteria

Idea Discovery is successful when all of the following are true:

- **Every idea is grounded in authentic experience.** No hypothetical or fabricated topics.
- **Every idea has a strategist verdict.** No candidate proceeds by default.
- **Only `READY` proceeds.** `DEVELOP` ideas are refined first; `REJECT` ideas are not forced into production.
- **Every `READY` idea aligns with Brand View.** The content fits the creator's identity, audience, and pillars.
- **Duplicate topics have been avoided.** The posted-titles index was checked and no near-duplicate was selected without a substantially different angle.
- **The trigger is specific and consequential enough to explain.** The post is not built around a vague observation.
- **The insight is more than a description of what happened.** There is a clear, defensible idea worth communicating.
- **The evidence supports the insight.** The idea does not depend on invented facts, outcomes, or conclusions.
- **The audience payoff is explicit.** The reader gains a useful model, tradeoff, question, or lesson.
- **The suggested format matches the depth of the topic.** A shallow observation is not inflated into a Carousel, and a deep concept is not reduced to a brief post.
- **The rationale for selecting the idea is clear.** The reason this specific experience deserves content is explicit.

---

## Workflow

1. **Gather current context.** Collect all available input from the user — their current projects, learning focus, recent discoveries, and any notes or material they have shared.
2. **Review recent work and context.** Identify systems, decisions, bugs, breakthroughs, confusions, tradeoffs, or concepts that could anchor authentic content.
3. **Consult Brand View.** Confirm the creator's identity, audience, pillars, and boundaries.
4. **Check previously published topics.** Read `framework/memory/Posted Titles.md`. Avoid near-duplicates unless the angle is substantially different.
5. **Identify potential content opportunities.** List the strongest real triggers without forcing every activity into a post.
6. **Run the `content-strategist` gate.** Evaluate trigger, tension, insight, evidence, audience payoff, non-obviousness, specificity, depth/format fit, duplication, and brand fit.
7. **Handle the verdict.** For `REJECT`, explain why and stop developing that idea. For `DEVELOP`, use the strategist's refinement report to strengthen the angle from existing evidence, then evaluate again. Do not invent missing substance. For `READY`, keep the strategist's refined direction as the official idea package.
8. **Prioritize READY ideas.** If more than one idea is `READY`, identify the strongest one based on audience value, distinctiveness, evidence, timing, and effort versus impact.
9. **Select the idea or ideas to move into Content Planning.** Only ideas with a current `READY` verdict may proceed to Workflow 02.
10. **Save ideas if requested (optional).** If the user wants a selected idea saved, create its own folder at `content/ideas/<YYYY-MM-DD-project-slug>/` with a required `idea.json` and optional curated supporting resources. Use the date and a short, lowercase, hyphen-separated project/topic slug. Follow `framework/model/idea.schema.json` and `framework/workflows/Content Idea Capture Rules.md`; keep format, platform, and brand recommendations in the conversation for Content Planning rather than adding fields outside the schema. If the user did not ask to save, deliver the recommendations in conversation only and skip this step.

---

## Constraints

- Never invent experiences, projects, achievements, emotions, evidence, or outcomes.
- Never move a `REJECT` or unresolved `DEVELOP` idea into Workflow 02.
- Never approve an idea only because it can be turned into content.
- Never duplicate previously published content without a substantially different angle.
- Never begin canonical writing, slide writing, or platform adaptation here.
- Never make production decisions about rendering, export, or archiving.
- Persistence in this manual workflow is optional and user-directed. When saving, use the idea folder and `idea.json` representation defined by `framework/model/idea.schema.json`; automatic project-agent capture remains a separate behavior governed by `framework/workflows/Content Idea Capture Rules.md`.

---

## Completion

This workflow ends only after at least one selected idea has a `READY` verdict and a refined direction suitable for Content Planning, or after reporting that no candidate is currently ready. No further workflows are executed automatically. The agent stops.

# 02 — Content Planning

## Purpose

Turn one `READY` idea into an approved Content Brief that fixes the idea, audience, primary format, target platforms, and every required variant before canonical writing begins.

## Scope

This workflow starts with a `READY` idea from Workflow 01 and ends with one approved Content Brief. It makes planning decisions only. It does not write canonical content, adapt variants, render, export, publish, or archive.

## Required Reading

- `framework/strategy/Brand Strategy.md` — creator identity, audience, pillars, boundaries, platform voice, and language rules.
- Relevant format rules only when needed to choose or constrain a format.
- The latest `content-strategist` report/refined direction for the selected idea.

## Inputs

- One selected idea with a current `READY` verdict.
- Its refined trigger, tension, insight, supporting evidence, audience payoff, format recommendation, and factual boundaries.
- User context and supporting material.
- Relevant earlier planning decisions, if this continues an existing idea or series.

If the idea is `REJECT`, `DEVELOP`, or lacks a strategist verdict, return it to Workflow 01. Do not plan around an unvalidated idea.

## Output — Approved Content Brief

Produce exactly one narrative brief with:

- Working title
- Core idea
- Trigger
- Audience problem
- Key insight
- Intended outcome
- Content pillar
- **Primary format** — the main format for this content item.
- **Target platforms** — every platform this item is intended for.
- **Required variants** — each approved platform and format pair, such as Instagram Carousel and LinkedIn Post.
- Creative direction
- Supporting context and evidence
- Required references
- Factual/uncertainty boundaries
- Constraints
- Notes for the Post Content Builder

The required variants must be explicit and compatible with the primary format and platform rules. A target platform without a corresponding required variant is incomplete.

## Workflow

1. Confirm the selected idea has a current `READY` verdict and review the strategist's refined direction.
2. Check fit with Brand View, Brand Voice, the audience, and existing published titles without weakening the validated core angle.
3. Define the audience problem, key insight, outcome, content pillar, evidence, and factual boundaries.
4. Choose the **primary format** using the validated depth/format recommendation as input.
5. Choose **target platforms** and list each **required variant** as a platform/format pair.
6. Set the shared creative direction and constraints. Resolve strategy decisions here; do not delegate them to later workflows.
7. Review the brief for completeness and approve it for Workflow 03.

## Success Criteria

- The source idea has a current `READY` verdict.
- The trigger is authentic and specific.
- The validated insight, evidence, audience payoff, and factual boundaries remain intact.
- The idea aligns with the brand, audience, and an established content pillar.
- Primary format, target platforms, and required variants are all explicit.
- Each required variant has a clear role and follows the platform strategy.
- The brief defines the meaning, intended takeaway, evidence, and boundaries needed by the canonical draft.
- No creative or strategic decisions remain for Workflow 03 or Workflow 04.

## Constraints

- Do not weaken or replace the validated core idea without returning it to Workflow 01 for strategic reevaluation.
- Do not write the canonical draft or any platform/format copy.
- Do not generate structured data, slides, visuals, or assets.
- Do not render, export, publish, or archive.
- Do not leave required fields blank or use unresolved placeholders.

## Completion

Stop after the approved brief is complete. The next stage is Workflow 03 — Post Content Builder.

# 03 — Post Content Builder

## Purpose

Turn an approved Content Brief into the format-neutral canonical written content. Workflow 03 owns the substance and meaning that every approved variant will carry, including the semantic/editorial quality of that meaning before adaptation begins.

## Scope

This workflow starts with an approved Content Brief and ends with one canonical draft at `content/drafts/post.md` that has passed the `content-editor` gate. It does not produce format or platform variants.

## Required Reading

- The approved Content Brief.
- `framework/strategy/Brand Strategy.md` — identity, audience, pillars, boundaries, core voice, and factual boundaries.
- `framework/memory/Posted Titles.md` — check for duplication and relevant prior work.
- User-provided source material and references named by the brief.
- `.agents/skills/content-editor/SKILL.md` — mandatory semantic/editorial gate.

Do not read format rules, renderer schemas, or platform-specific writing skills here. Those belong to Workflow 04.

## Inputs

- One approved Content Brief with a clear core idea, trigger, intended outcome, evidence, and factual constraints.
- The source material and references named by the brief.

If the brief is missing, not approved, or leaves a substantive decision unresolved, stop and report what Workflow 02 must clarify. Do not fill the gap by making a new planning decision.

## Output

Write only `content/drafts/post.md`. Use clear prose or structured notes under these headings, omitting a heading only when the brief and sources provide no relevant material:

```markdown
# Canonical Content

## Core Idea
## Trigger
## Reasoning
## Key Points
## Supported Examples and Sources
## Claims, Uncertainty, and Factual Boundaries
## Intended Takeaway
## CTA Intent
## Wording to Preserve
```

Record what the content means, including the creator's supported perspective and important wording. Keep source references beside the claims or examples they support. This is canonical source material, not publish-ready copy.

## Required Editorial Gate

After the first canonical draft exists, run `content-editor` against the complete draft and its approved sources.

The editor must evaluate meaning, logic, clarity, context, reasoning, specificity, semantic repetition, claim strength, and information sufficiency.

Handle its verdict as follows:

- `READY` — no meaningful semantic/editorial issue remains; continue to completion.
- `READY WITH EDITS` — apply the editor's complete revised artifact to `content/drafts/post.md`, then verify factual traceability again.
- `NEEDS SOURCE INPUT` — stop and surface the missing information or unresolved creator decision. Do not invent a repair.

The editor's revision report is diagnostic evidence; the complete revised artifact is the source for the corrected canonical draft when edits are supported.

## Workflow

1. Confirm the brief is approved and complete enough to write. If not, stop and report the missing decision or information.
2. Read the brief and its named supporting source material in full. Record what each source supports, including conflicting evidence, uncertainty, and limits; do not infer missing facts.
3. Build the canonical draft using the output headings. Preserve the brief's core idea, authentic trigger, reasoning, intended takeaway, CTA intent, and wording worth keeping. Include only relevant, supported examples and identify their sources.
4. Keep the draft format-neutral. Do not choose a platform, language, format, hook, slide sequence, paragraph structure, or visual treatment. Keep source language where practical; translation and platform rewriting belong to Workflow 04.
5. Check each substantive statement against the brief or its sources, and confirm the key points support the approved insight and takeaway. Retain uncertainty instead of strengthening a claim.
6. Run `content-editor` on the complete draft. Apply all supported semantic/editorial repairs from its revised artifact. If it returns `NEEDS SOURCE INPUT`, stop and report the unresolved input rather than fabricating it.
7. Re-check the edited draft against the brief and supporting sources. Confirm the edit did not add facts, evidence, achievements, certainty, or a new strategic angle.
8. Write the final editor-checked version to `content/drafts/post.md`, then stop.

## Success Criteria

- Every substantive point is traceable to the brief or supporting source material.
- The trigger, reasoning, supported examples, and uncertainty are preserved.
- The draft has passed the `content-editor` semantic/editorial gate.
- No unresolved `NEEDS SOURCE INPUT` issue remains.
- Meaning, logic, context, and claim strength are sufficient for Workflow 04 to adapt without inventing substance.
- No format or platform decision is introduced or changed.
- `content/drafts/post.md` is the only output written by this workflow.

## Constraints

- Do not create carousel slides, layouts, captions, LinkedIn paragraph structure, visual directions, or renderer JSON.
- Do not translate or restructure content for a target platform.
- Do not invent facts, claims, examples, experiences, achievements, evidence, or certainty while editing.
- Do not use `content-editor` to override a strategic decision from Workflow 02; strategic problems return upstream.
- Do not modify the approved brief or supporting source files.
- Do not render, export, publish, or archive.

## Change Control

Workflow 04 may change presentation only. If adaptation or final review exposes a missing, conflicting, or weak substantive point, return the proposed change to this canonical stage, run the `content-editor` gate again, update `post.md`, then regenerate affected variants.

## Completion

Stop only after `content/drafts/post.md` has passed the editor gate and factual traceability check. Workflow 04 owns all approved format/platform adaptations.

# 04 — Format Adaptation

## Purpose

Adapt the approved canonical content into exactly the format/platform variants listed in the Content Brief, refine each variant with the relevant language/format skills, and pass each variant through the final `content-reviewer` quality gate without changing canonical meaning or factual boundaries.

## Scope

This workflow starts after Workflow 03 has produced an editor-checked `content/drafts/post.md`. It ends when every required variant is written to its standalone output and has a final `content-reviewer` verdict of `PASS` or `PASS WITH MINOR EDITS` with all required minor edits applied. It does not plan new variants, silently revise canonical substance, render, export, publish, or archive.

## Required Reading

- The approved Content Brief, especially Primary format, Target platforms, and Required variants.
- `content/drafts/post.md` — canonical meaning and factual source.
- `framework/strategy/Brand Strategy.md` — creator identity, audience, pillars, boundaries, platform voice, language, and adaptation rules.
- Format rules for each required variant:
  - `framework/formats/Carousels.md`
  - `framework/formats/linkedin.md`
- `framework/model/Content Model.md` only when an Instagram Carousel variant is required, to write its renderer JSON.
- `framework/memory/Posted Titles.md` for title/duplication context when relevant.
- `.agents/skills/content-reviewer/SKILL.md` — mandatory final editorial gate.

Do not read or use rules for variants that the brief did not approve.

## Required Skills

Apply only the relevant writing skills for each required variant:

- `lebanese-arabic-writing` — Arabic Instagram variants.
- `arabic-technical-language` — Arabic copy containing technical terms.
- `carousel-copy-polish` — Instagram Carousel; identify the content archetype before polishing structure.
- LinkedIn Post — follow `framework/formats/linkedin.md` directly; no dedicated LinkedIn skill is required.
- `content-reviewer` — mandatory final quality gate for every completed variant.

`content-editor` is not a routine adaptation skill. Use it only when review exposes a semantic, logic, or substantive clarity problem that must return to Workflow 03.

`content-refinement` is the orchestration entry point when the creator explicitly asks to review/refine an idea or draft end-to-end; it does not replace the stage ownership defined here.

Use the repository skill files under `.agents/skills/<skill-name>/SKILL.md`. Skills may improve presentation but may not override the brief or the adaptation invariant below.

## Inputs

- Approved Content Brief.
- Editor-checked `content/drafts/post.md`.
- Brand strategy and voice documents.
- Relevant format rules and writing skills.
- Supporting references explicitly approved by the brief.

## Outputs

Generate only the variants explicitly listed under Required variants. Write each to its standalone file:

| Approved variant | Output |
|---|---|
| Instagram Carousel | `content/drafts/format/carousel.md` — including an Instagram post caption |
| LinkedIn Post | `content/drafts/format/linkedin.md` |

For Instagram Carousel only, also write `production/workspace/carousel.json` in the Content Model format. It must contain the approved carousel variant for the renderer and must not embed LinkedIn post copy. No other variant generates renderer JSON.

Update the existing files at the listed `content/drafts/format/` paths in place. Do not create parallel `content/drafts/carousel.md` or `content/drafts/linkedin.md` files. Each Markdown variant contains only the platform/format package it represents. LinkedIn is a standalone artifact and never lives inside `carousel.md`.

## Adaptation Invariant

Adaptation may change presentation: structure, pacing, hook form, length, language, formatting, and CTA expression.

It must not silently change:

- Canonical meaning or reasoning
- Factual claims or supported examples
- Experiences or achievements
- Uncertainty or factual boundaries
- Intended takeaway
- The approved CTA intent

Every variant must be traceable to `post.md`. A platform-specific example may be used only when it already exists in the canonical draft or is explicitly supported by an approved reference. Do not strengthen claims, make plans sound completed, or introduce new evidence.

If a variant or final review appears to need a substantive change, stop and return that issue to Workflow 03. Update the canonical draft through `content-editor` first, then regenerate affected variants. Do not patch canonical meaning inside an adaptation.

## Final Review Routing

After a variant has been adapted and polished, run `content-reviewer` against the complete variant, the Content Brief, `content/drafts/post.md`, Brand Strategy, and the relevant format rules.

Handle the reviewer verdict as follows:

- `PASS` — variant is editorially ready.
- `PASS WITH MINOR EDITS` — apply all supported minor edits and verify the final artifact still matches `post.md`.
- `REVISE` — classify each issue and route it to the owning skill/layer, repair the artifact, then review again.
- `BLOCK` — stop progression. Resolve the missing fact, contradiction, unsupported claim, or creator decision at the owning upstream stage before continuing.

Issue ownership:

- `SEMANTIC`, `LOGIC`, or substantive `CLARITY` → Workflow 03 / `content-editor`.
- `FACTUAL` → approved sources and Workflow 03.
- `LANGUAGE` or `VOICE` → the relevant language skill or format rules in Workflow 04.
- `FORMAT`, pacing, density, hook, or carousel flow → `carousel-copy-polish` or the relevant format rules.
- `GENERICITY` or `AUDIENCE_VALUE` that reveals a weak underlying angle → Workflow 01/02 / `content-strategist`.
- `REPETITION` → repair at the layer where the repeated meaning originated.

Use at most two automatic repair-and-review cycles for one variant in one execution. If a blocking issue remains, surface it instead of endlessly rewriting or inventing a solution.

## Workflow

1. Read the brief and editor-checked canonical draft. Confirm the brief's Required variants are explicit and the canonical draft covers their intended substance. If either is incomplete, stop and report the gap.
2. Read the platform voice rules and only the relevant format rules and skills.
3. Create each approved variant as an independent adaptation. Keep the primary format as the depth anchor; rewrite structure and wording for each secondary platform.
4. For every variant, check its claims, examples, uncertainty, CTA intent, and takeaway against `post.md`.
5. If an Instagram Carousel is required, identify the best-fitting content archetype using `carousel-copy-polish`, then plan its narrative and slide count from the approved canonical content. For each slide, first state its purpose, then choose the one supported visual layout that fits that purpose, and then write the slide copy. Available personal-account layout IDs are `cover`, `story`, `focus`, `sequence`, `comparison`, `evidence`, and `closing`; use the field definitions in `framework/model/Content Model.md`.
6. Apply the relevant language and format rules. For Arabic Instagram copy, use `lebanese-arabic-writing` and `arabic-technical-language`, then `carousel-copy-polish`. For LinkedIn, follow `framework/formats/linkedin.md` directly. Do not use presentation rules to alter unsupported meaning.
7. Update `content/drafts/format/carousel.md` and the matching `production/workspace/carousel.json` when Carousel is required. Write an Instagram caption in natural Lebanese Arabic as part of the standalone Markdown draft, and store the same text in the Instagram variant's `caption` field in JSON. The caption should complement the slides, preserve their factual boundaries, and end with the approved discussion CTA when one exists. Include the selected layout on each JSON slide and keep the slide copy and layout-specific fields aligned between Markdown and JSON. Layouts may repeat or be omitted. There is no required seven- or eight-slide count or fixed layout order; choose only compositions the content earns.
8. Use `evidence` only for supplied, approved code or a local screenshot/image, or for a supplied diagram explicitly identified as conceptual. Image and diagram assets must be placed under `production/workspace/evidence/` and referenced as `evidence/<filename>`. Do not create fake proof or infer evidence from copy.
9. Run `content-reviewer` on each completed variant. Apply `PASS WITH MINOR EDITS` changes directly when they stay within the adaptation boundary. For `REVISE`, route each issue to its owning skill/layer, repair, and review again. For `BLOCK`, stop until the upstream issue is resolved.
10. After any Carousel review repair, update both `content/drafts/format/carousel.md` and `production/workspace/carousel.json` so Markdown, JSON slide copy, layout fields, and caption remain synchronized.
11. Do not write React, TSX, CSS, or per-post renderer code. Layout components are installed once in the renderer; ordinary carousel work changes only the Markdown and workspace JSON.
12. Check that no unapproved variant was generated, all expected outputs exist, each standalone draft contains only its own variant, and every required variant has a final acceptable reviewer verdict.

## Success Criteria

- Exactly the approved variants were generated.
- The canonical source entering adaptation had already passed `content-editor`.
- Each variant follows its platform language, voice, and format rules.
- Each variant preserves the canonical meaning and factual boundaries.
- Platform adaptations are independently structured, not copied or mechanically translated.
- Every completed variant received a `content-reviewer` verdict.
- No variant with unresolved `REVISE` or `BLOCK` status proceeds to rendering/publication.
- All supported reviewer repairs were applied by the correct owning skill/layer rather than patched arbitrarily.
- LinkedIn is a standalone `content/drafts/format/linkedin.md` artifact governed directly by `framework/formats/linkedin.md`.
- `carousel.json` exists only when a Carousel variant is required and represents Carousel content only.
- Carousel Markdown and JSON agree on all slide text and layout fields.
- The Instagram caption is present in Markdown and matches the Instagram variant's JSON `caption` field.
- Every carousel slide has a purpose and a supported, content-fitting `layout` selection.
- Carousel narrative structure follows the actual content archetype rather than a forced mistake/realization sequence.
- No fixed layout order or slide count was imposed, and no React/CSS was generated for the post.

## Constraints

- Do not change Workflow 02's primary format, target platforms, or required variants.
- Do not change the substance of `post.md` or silently introduce new source material.
- Do not resolve semantic, factual, or strategic reviewer findings inside a platform rewrite; route them upstream.
- Do not generate a variant that is not approved in the brief.
- Do not force a cover/body/closing sequence or a mistake/realization narrative when the approved content does not call for it.
- Do not render, validate in the renderer, export, publish, or archive before the final editorial gate passes.
- Do not modify the renderer, Studio, or export implementation.

## Completion

Stop only after all approved variants are written, synchronized where applicable, and have a final `PASS` or `PASS WITH MINOR EDITS` verdict with required minor edits applied. Workflow 05 performs render validation where applicable.

# 05 — Render Validation

## Purpose

Validate an approved Instagram Carousel variant in the React renderer. This workflow is conditional: run it only when Workflow 02 approved an Instagram Carousel, Workflow 04 produced its canonical renderer JSON, and the Carousel passed the final editorial gate.

## Scope

This workflow starts after Carousel adaptation and editorial approval and ends with a render-ready confirmation or a validation report. It validates; it does not edit content, JSON, layouts, or renderer code.

## Required Reading

- `framework/workflows/Content Creation Playbook.md` — workflow boundaries and global rules.
- `framework/model/Content Model.md` — structure required by `carousel.json`.

## Inputs

- Editorially approved `production/workspace/carousel.json` from Workflow 04.
- The React renderer and its configuration.
- Available schema and rendering validation tools.

## Outputs

One outcome:

- Confirmation that the Carousel is structurally valid and every slide renders; or
- A report listing structural, layout, content-presence, or rendering failures.

Do not update repository content as part of the report.

## Success Criteria

- Workflow 04's final content-review gate passed for the Carousel.
- JSON parses and conforms to the Content Model.
- Only the intended carousel variant is present in the renderer input.
- Every slide renders with supported layouts and required fields.
- Rendered copy matches the canonical Carousel JSON without truncation or missing content.
- No renderer errors or unresolved assets occur.

## Workflow

1. Confirm that an Instagram Carousel is among the approved variants, its final `content-reviewer` verdict is acceptable, and `carousel.json` exists.
2. Parse the JSON and validate it against `framework/model/Content Model.md`. If this fails, report all detected schema issues and stop.
3. Load the workspace data in the React renderer.
4. Inspect every slide for render errors, missing or truncated text, unsupported layout, and missing required fields.
5. Report render-ready status or the specific failures. Do not repair the draft or JSON.

## Constraints

- Run only for an editorially approved Carousel variant; LinkedIn does not require this workflow.
- Never modify `carousel.json`, Markdown variants, or renderer implementation.
- Never rewrite content. Substantive corrections return to Workflow 03; presentation adaptations return to Workflow 04 and must pass review again.
- Never export assets; Workflow 06 owns Carousel export.
- Never archive or update `Posted Titles.md`; Workflow 07 owns archiving.

## Completion

Stop after the validation result or complete failure report. Workflow 06 may export a validated Carousel.

# 06 — Export Assets

## Purpose

Create publish-ready slide assets from the validated React carousel. This workflow exports every carousel slide as an image through one of two supported mechanisms: the Studio Export Modal (in-browser export producing a ZIP of PNGs or PDF) or the Playwright export pipeline (headless export baseline using the frozen `/export` route). It is responsible for asset export only — it does not create content, validate rendering, modify the renderer, or archive published posts.

---

## Scope

This workflow begins after the Render Validation workflow has confirmed that the carousel is render-ready.

It ends when all slide images have been successfully exported and verified, or when an export report has been produced describing all detected failures.

---

## Required Reading

- `framework/workflows/Content Creation Playbook.md` — This playbook defines workflow boundaries and execution rules.

No other Framework documents are required for this workflow. Strategy, format, brand, and content model documents are not consulted during export.

---

## Inputs

- **Validated React renderer application** — The renderer in `production/renderer/` that has already been confirmed render-ready by Workflow 05.
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

- **Render Validation completed.** Workflow 05 confirmed the carousel is render-ready before export began.
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

1. **Confirm the carousel has already passed Render Validation.** Verify that Workflow 05 completed successfully and the carousel is confirmed render-ready. If validation has not been performed or failed, stop and report the missing prerequisite.

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
- Never perform rendering validation or content validation. Validation belongs to Workflow 05.
- Never archive exported assets or update the posted-titles index. Archiving belongs to Workflow 07.
- Never update repository files outside the configured export directory.
- Never silently ignore export failures. Every failure must be reported.

---

## Completion

This workflow ends immediately after either:

- confirming that all PNG assets were successfully exported and are ready for publishing, or
- producing a complete export report describing all detected failures.

No further workflows are executed automatically. The agent stops.

# 07 — Archive Published Post

## Purpose

Archive the exact platform variant that was actually published and update the published-title index. A Post may have several variants; each archive entry represents one publication on one platform.

## Scope

This workflow begins after publication. It ends when every intended published variant for the content item and its applicable assets/metadata are archived and indexed, then that item's source drafts are cleared. It does not create, polish, adapt, or republish content.

## Required Reading

- `framework/workflows/Content Creation Playbook.md` — workflow boundaries and global rules.
- `framework/memory/Posted Titles.md` — index to update.

## Inputs

- Published platform and format variant.
- Verified publication date and live post URL or platform identifier.
- The exact content that appeared on that platform, and the matching standalone source artifact.
- Applicable variant-specific assets and structured data.
- Accurate title, language, pillar, tags, and content item ID when available.

If the exact published content or required publication details are missing or ambiguous, stop and request them. Never assume the latest draft is identical to what was published.

## Source Artifact by Variant

Use only the standalone artifact for the variant that was published:

| Published variant | Source artifact |
|---|---|
| Instagram Carousel | `content/drafts/format/carousel.md` |
| LinkedIn Post | `content/drafts/format/linkedin.md` |

The source must match what was published exactly. If the published copy differs from the draft, use the exact published copy supplied or captured from the platform; do not silently archive a different draft.

## Outputs

Create `content/published/<platform>/<YYYY-MM-DD-slug>/` with:

- `content.md` — only the exact published variant, with no other platform's content.
- `metadata.json` — accurate publication and archive metadata, including platform, format, verified date, URL/identifier, archive path, source artifact, title, language, content item ID when known, pillar, tags, assets included, and any relevant notes.
- Variant-specific data/assets only where applicable:
  - **Instagram Carousel:** copy `production/workspace/carousel.json` as `content.json` and include the exported carousel assets.
  - **LinkedIn Post:** archive the standalone text post and only the LinkedIn assets that were actually published with it. Never include Instagram carousel copy, carousel JSON, or carousel assets.

Do not create empty `assets/` directories. Note missing optional assets when they were relevant to the published variant.

Update `framework/memory/Posted Titles.md` with the published variant's archive path and title.

## Workflow

1. Verify the platform, variant format, published date, live URL/identifier, and exact published copy.
2. Select the matching standalone source artifact from the table above and compare it with the published copy. Stop if it differs and no exact published copy is available.
3. Choose a short lowercase slug derived from the title and check that the dated target directory does not already exist. Never overwrite an archive.
4. Create the archive directory and copy the exact published variant to `content.md` without rewriting, polishing, or adding another platform's content.
5. Add only data and assets applicable to this published variant. Carousel JSON and exported slide assets are Carousel-only.
6. Write complete, accurate `metadata.json`. Do not invent dates, URLs, titles, IDs, or missing asset information.
7. Add one row to the correct platform section in `Posted Titles.md`.
8. Verify that `content.md` matches the exact published copy, files match the variant contract, metadata is accurate, and the index entry is correct. Run `git diff --check`.
9. After all intended platform variants for this content item have been archived and verified, clear that item's source drafts from `content/drafts/` (the canonical draft and its format variants). Preserve drafts for any other content item that is not fully archived; do not clear the workspace after archiving only one of several intended variants.

## Success Criteria

- The archive describes one actual published platform variant.
- `content.md` exactly matches what appeared on the platform.
- No other platform's copy is included.
- Carousel JSON and slide assets appear only in Carousel archives.
- The archive path uses the verified publication date and does not overwrite an existing entry.
- Metadata and the Posted Titles entry are complete and accurate.

## Constraints

- Never rewrite, polish, regenerate, or translate published content.
- Never archive the primary format automatically when a different variant was published.
- Never include Carousel content or files in a LinkedIn archive.
- Never modify renderer, Studio, export implementation, or published content.
- During archiving, modify only the new archive entry, `framework/memory/Posted Titles.md`, and—after every intended variant is safely archived—the source drafts for that content item.

## Completion

Stop after all intended variants have been verified and indexed, and their source drafts have been cleared.