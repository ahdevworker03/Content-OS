## Contents

- [Content Format](#content-format)
- [Content Pipeline](#content-pipeline)

# Content Format

This document defines format-selection principles used while planning an approved idea. Workflow 01 selects ideas; Workflow 02 approves the brief, primary format, target platforms, and required variants.

It answers the question: **"Given a trigger, what content format should this become?"**

The complete lifecycle is defined in the [Content Pipeline](#content-pipeline) section: **Idea → Approved Content Brief → Canonical Content Draft → Format / Platform Adaptation → Render Validation (where applicable) → Export (where applicable) → Publish → Archive the exact published variant**. This document provides format-selection guidance only.

---

## Trigger-First Philosophy

Every piece of content originates from a real experience — a bug, a lecture, a conversation, a struggle, or a small win.

For the full definition of the trigger-first principle and its role in brand voice, refer to `Brand Strategy.md`.

Content should never be created from abstract ideas or generic topics. A trigger is what makes content authentic and valuable. Without one, there is nothing to plan.

---

## How to Evaluate a Trigger

Not every daily experience becomes content. A good trigger has:

- **Specificity:** A specific bug, error, or moment is better than a general observation.
- **Learning outcome:** Something was learned or understood because of this trigger.
- **Shareability:** The insight can be explained clearly to a peer.
- **Relevance:** The trigger relates to the content pillars defined in `Brand Strategy.md`.

Triggers that lack specificity or a learning outcome should be noted but not developed into content.

---

## How to Select a Format

Once a trigger is validated, choose between an Instagram Carousel and a LinkedIn post based on the depth and audience of the insight.

### Carousel

Use when:
- The concept requires a structured, multi-slide explanation that guides the reader step by step.
- The reader needs to follow a learning journey, not just see a conclusion.
- The insight has enough depth to fill 5–10 slides grounded in real code or project work.

Refer to [`Carousels.md`](../formats/Carousels.md) for full format rules — structure, slide schema, constraints, and best practices.

### LinkedIn Post

Use when the idea is best expressed as a concise professional reflection grounded in a specific project or learning moment. Keep the student-builder perspective and focus on what changed in the writer’s thinking.

Refer to [`linkedin.md`](../formats/linkedin.md) for LinkedIn structure, voice, examples, and writing constraints.

### Goals of Every Content Piece

Every piece should aim to:

- Document learning authentically.
- Build trust by showing the real struggle.
- Show progress over perfection.
- Start conversations at a peer level.

---

## Relationship to the Content Lifecycle

The planning decisions in this document inform idea evaluation and format selection. Workflow 02 records the approved primary format, target platforms, and required variants in the Content Brief.

The [Content Format](#content-format) section answers only **"which format fits this idea?"** It does not define canonical writing, adaptation, rendering, export, publication, or archive behavior. Those lifecycle stages are owned by the [Content Pipeline](#content-pipeline) section and its numbered workflow prompts.

# Content Pipeline

This document owns the Content OS lifecycle and workflow handoffs. The [Content Format](#content-format) section defines idea and format-selection principles; the numbered prompt for each stage owns execution details.

## Canonical lifecycle

```text
Idea
→ Approved Content Brief
→ Canonical Content Draft
→ Format / Platform Adaptation
→ Render Validation (where applicable)
→ Export (where applicable)
→ Publish
→ Archive the exact published variant
```

Publishing is a manual platform action between Workflow 06 and Workflow 07; it is not a repository-writing workflow.

## Stages and owners

### 1. Idea

An authentic experience, question, or observation is selected for development.

- **Owner:** Workflow 01 — `framework/content-playbook/Content Creation Playbook.md#01--idea-discovery`
- **Output:** selected idea with its trigger and supporting context.

### 2. Approved Content Brief

Planning fixes what the post means, who it serves, how it is framed, and where it will appear.

- **Owner:** Workflow 02 — `framework/content-playbook/Content Creation Playbook.md#02--content-planning`
- **Output:** approved brief with primary format, target platforms, and explicit required variants.

### 3. Canonical Content Draft

The canonical draft records meaning and evidence without format or platform presentation.

- **Owner:** Workflow 03 — `framework/content-playbook/Content Creation Playbook.md#03--post-content-builder`
- **Output:** only `content/drafts/post.md`.
- **Owns:** core idea, trigger, reasoning, key points, supported examples, factual claims/boundaries, intended takeaway, CTA intent, and wording to preserve.

### 4. Format / Platform Adaptation

Each approved variant is written as a standalone artifact. Adaptation changes presentation only; it preserves the canonical meaning and factual boundaries.

- **Owner:** Workflow 04 — `framework/content-playbook/Content Creation Playbook.md#04--format-adaptation`
- **Outputs, only when approved:**
  - Instagram Carousel: `content/drafts/carousel.md` and `production/workspace/carousel.json`.
  - LinkedIn Post: `content/drafts/linkedin.md`.
- LinkedIn content never lives inside another platform's draft.
- Only Carousel produces renderer JSON.

### 5. Render Validation (where applicable)

Validate the adapted Carousel in the React renderer. This stage applies only when an Instagram Carousel variant is approved.

- **Owner:** Workflow 05 — `framework/content-playbook/Content Creation Playbook.md#05--render-validation`
- **Input:** `production/workspace/carousel.json`.
- **Output:** render-ready confirmation or a failure report.

### 6. Export (where applicable)

Export slide assets from a validated Carousel. This stage applies only when Carousel assets are required.

- **Owner:** Workflow 06 — `framework/content-playbook/Content Creation Playbook.md#06--export-assets`
- **Input:** validated carousel workspace data.
- **Output:** exported slide images/package ready for manual publication.

### 7. Publish

The creator publishes the chosen approved variant on its target platform. Publishing remains outside the repository and requires an explicit human action.

### 8. Archive the exact published variant

Archive what appeared on the platform, not automatically the primary format or latest shared package.

- **Owner:** Workflow 07 — `framework/content-playbook/Content Creation Playbook.md#07--archive-published-post`
- **Inputs:** exact published copy, platform, variant format, verified date, URL/identifier, and applicable assets.
- **Output:** a platform-specific archive containing only that variant, accurate metadata, and applicable variant-specific data/assets; update `framework/memory/Posted Titles.md`.
- Carousel JSON and exported slide assets are Carousel-only. A LinkedIn archive uses the standalone LinkedIn post and any LinkedIn assets actually published.

## Adaptation invariant

Format/platform adaptation may change presentation, structure, pacing, hook form, length, language, formatting, and CTA expression. It must not silently change:

- Canonical meaning or reasoning
- Factual claims or supported examples
- Experiences or achievements
- Uncertainty or factual boundaries
- Intended takeaway or CTA intent

Every variant must be traceable to `content/drafts/post.md`. If substantive content needs to change, return to Workflow 03, update the canonical draft, then regenerate affected variants in Workflow 04.

## Quality checks

- The brief names all intended platforms and required variants.
- Canonical claims and examples are supported by the source material.
- Every variant matches the canonical meaning and its platform/format rules.
- Carousel Markdown and JSON agree before render validation.
- Validation and export run only for variants that require them.
- Publication is separate from export.
- Archive copy matches the exact published variant, with no unrelated platform package.

## Production ownership

| Stage | Owner | Responsibility |
|---|---|---|
| Idea | Human / Workflow 01 | Select an authentic experience and context. |
| Brief | Human / Workflow 02 | Approve direction and required variants. |
| Canonical draft | Workflow 03 | Define meaning, evidence, and boundaries in `post.md`. |
| Adaptation | Workflow 04 | Produce only approved standalone variants; generate Carousel JSON only when needed. |
| Render validation | Workflow 05 | Validate the Carousel renderer output when applicable. |
| Export | Workflow 06 | Export Carousel assets when applicable. |
| Publish | Human | Publish the selected variant on the platform. |
| Archive | Workflow 07 | Preserve the exact published variant and update the title index. |

## Production boundary

The renderer and export tools consume Carousel-specific structured presentation data. They do not define canonical meaning, platform strategy, brand voice, or adaptation boundaries; those remain upstream in the brief, canonical draft, and Workflow 04.
