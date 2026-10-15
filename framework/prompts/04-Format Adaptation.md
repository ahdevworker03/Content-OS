# 04 — Format Adaptation

## Purpose

Adapt the approved canonical content into exactly the format/platform variants listed in the Content Brief, without changing its meaning or factual boundaries.

## Scope

This workflow starts after Workflow 03 has produced `content/drafts/post.md`. It ends when every required variant is written to its standalone output. It does not plan new variants, revise canonical substance, render, export, publish, or archive.

## Required Reading

- The approved Content Brief, especially Primary format, Target platforms, and Required variants.
- `content/drafts/post.md` — canonical meaning and factual source.
- `framework/strategy/Brand View.md` — identity, audience, pillars, and boundaries.
- `framework/strategy/Brand Voice.md` — platform voice, language, and adaptation rules.
- Format rules for each required variant:
  - `framework/formats/Carousels.md`
  - `framework/formats/Reels.md`
  - `framework/formats/Stories.md`
- `framework/model/Content Model.md` only when an Instagram Carousel variant is required, to write its renderer JSON.
- `framework/memory/Posted Titles.md` for title/duplication context when relevant.

Do not read or use rules for variants that the brief did not approve.

## Required Skills

Apply only the relevant writing skills for the required variants:

- `student-builder-voice` — all variants.
- `lebanese-arabic-writing` — Arabic Instagram variants.
- `arabic-technical-language` — Arabic copy containing technical terms.
- `carousel-copy-polish` — Instagram Carousel.
- `linkedin-reflection-writing` — LinkedIn Post.

Use the repository skill files under `.opencode/skills/<skill-name>/SKILL.md`. Skills may improve presentation but may not override the brief or the adaptation invariant below.

## Inputs

- Approved Content Brief.
- `content/drafts/post.md`.
- Brand strategy and voice documents.
- Relevant format rules and writing skills.
- Supporting references explicitly approved by the brief.

## Outputs

Generate only the variants explicitly listed under Required variants. Write each to its standalone file:

| Approved variant | Output |
|---|---|
| Instagram Carousel | `content/drafts/carousel.md` |
| Instagram Reel | `content/drafts/reel.md` |
| Instagram Story | `content/drafts/story.md` |
| LinkedIn Post | `content/drafts/linkedin.md` |

For Instagram Carousel only, also write `production/workspace/carousel.json` in the Content Model format. It must contain the approved carousel variant for the renderer and must not embed LinkedIn post copy. No other variant generates renderer JSON.

Each Markdown variant contains only the platform/format package it represents. LinkedIn is a standalone artifact and never lives inside `carousel.md`, `reel.md`, or `story.md`.

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

If a variant appears to need a substantive change, stop and return the proposed change to Workflow 03. Update the canonical draft first, then regenerate affected variants. Do not patch the meaning inside an adaptation.

## Workflow

1. Read the brief and canonical draft. Confirm the brief's Required variants are explicit and the canonical draft covers their intended substance. If either is incomplete, stop and report the gap.
2. Read the platform voice rules and only the relevant format rules and skills.
3. Create each approved variant as an independent adaptation. Keep the primary format as the depth anchor; rewrite structure and wording for each secondary platform.
4. For every variant, check its claims, examples, uncertainty, CTA intent, and takeaway against `post.md`.
5. If an Instagram Carousel is required, plan its narrative and slide count from the approved canonical content. For each slide, first state its purpose, then choose the one supported visual layout that fits that purpose, and then write the slide copy. Available personal-account layout IDs are `cover`, `story`, `focus`, `sequence`, `comparison`, `evidence`, and `closing`; use the field definitions in `framework/model/Content Model.md`.
6. Write `carousel.md` and the matching `production/workspace/carousel.json`. Include the selected layout on each JSON slide and keep the slide copy and layout-specific fields aligned between Markdown and JSON. Layouts may repeat or be omitted. There is no required seven- or eight-slide count or fixed layout order; choose only compositions the content earns.
7. Use `evidence` only for supplied, approved code or a local screenshot/image, or for a supplied diagram explicitly identified as conceptual. Image and diagram assets must be placed under `production/workspace/evidence/` and referenced as `evidence/<filename>`. Do not create fake proof or infer evidence from copy.
8. Do not write React, TSX, CSS, or per-post renderer code. Layout components are installed once in the renderer; ordinary carousel work changes only the Markdown and workspace JSON.
9. Check that no unapproved variant was generated, all expected outputs exist, and each standalone draft contains only its own variant.

## Success Criteria

- Exactly the approved variants were generated.
- Each variant follows its platform language, voice, and format rules.
- Each variant preserves the canonical meaning and factual boundaries.
- Platform adaptations are independently structured, not copied or mechanically translated.
- LinkedIn is a standalone `linkedin.md` artifact.
- `carousel.json` exists only when a Carousel variant is required and represents Carousel content only.
- Carousel Markdown and JSON agree on all slide text.
- Every carousel slide has a purpose and a supported, content-fitting `layout` selection.
- No fixed layout order or slide count was imposed, and no React/CSS was generated for the post.

## Constraints

- Do not change Workflow 02's primary format, target platforms, or required variants.
- Do not change the substance of `post.md` or silently introduce new source material.
- Do not generate a variant that is not approved in the brief.
- Do not force a cover/body/closing sequence when the approved content does not call for it; the template catalog is a set of reusable compositions, not a mandatory sequence.
- Do not render, validate in the renderer, export, publish, or archive.
- Do not modify the renderer, Studio, or export implementation.

## Completion

Stop after all approved variants are written and checked. Workflow 05 performs render validation where applicable.
