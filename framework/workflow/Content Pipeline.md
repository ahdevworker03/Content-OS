# Content Pipeline

This document owns the Content OS lifecycle and workflow handoffs. `Content Format.md` defines idea and format-selection principles; the numbered prompt for each stage owns execution details.

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

- **Owner:** Workflow 01 — `framework/prompts/01-Idea Discovery.md`
- **Output:** selected idea with its trigger and supporting context.

### 2. Approved Content Brief

Planning fixes what the post means, who it serves, how it is framed, and where it will appear.

- **Owner:** Workflow 02 — `framework/prompts/02-Content Planning.md`
- **Output:** approved brief with primary format, target platforms, and explicit required variants.

### 3. Canonical Content Draft

The canonical draft records meaning and evidence without format or platform presentation.

- **Owner:** Workflow 03 — `framework/prompts/03-Post Content Builder.md`
- **Output:** only `content/drafts/post.md`.
- **Owns:** core idea, trigger, reasoning, key points, supported examples, factual claims/boundaries, intended takeaway, CTA intent, and wording to preserve.

### 4. Format / Platform Adaptation

Each approved variant is written as a standalone artifact. Adaptation changes presentation only; it preserves the canonical meaning and factual boundaries.

- **Owner:** Workflow 04 — `framework/prompts/04-Format Adaptation.md`
- **Outputs, only when approved:**
  - Instagram Carousel: `content/drafts/carousel.md` and `production/workspace/carousel.json`.
  - Instagram Reel: `content/drafts/reel.md`.
  - Instagram Story: `content/drafts/story.md`.
  - LinkedIn Post: `content/drafts/linkedin.md`.
- LinkedIn content never lives inside another platform's draft.
- Only Carousel produces renderer JSON.

### 5. Render Validation (where applicable)

Validate the adapted Carousel in the React renderer. This stage applies only when an Instagram Carousel variant is approved.

- **Owner:** Workflow 05 — `framework/prompts/05-Render Validation.md`
- **Input:** `production/workspace/carousel.json`.
- **Output:** render-ready confirmation or a failure report.

### 6. Export (where applicable)

Export slide assets from a validated Carousel. This stage applies only when Carousel assets are required.

- **Owner:** Workflow 06 — `framework/prompts/06-Export Assets.md`
- **Input:** validated carousel workspace data.
- **Output:** exported slide images/package ready for manual publication.

### 7. Publish

The creator publishes the chosen approved variant on its target platform. Publishing remains outside the repository and requires an explicit human action.

### 8. Archive the exact published variant

Archive what appeared on the platform, not automatically the primary format or latest shared package.

- **Owner:** Workflow 07 — `framework/prompts/07-Archive Published Post.md`
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
