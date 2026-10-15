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
5. If an Instagram Carousel is required, write `carousel.md` and the matching renderer JSON. Confirm slide copy in Markdown matches the JSON. Keep all other variants out of both carousel artifacts.
6. Check that no unapproved variant was generated, all expected outputs exist, and each standalone draft contains only its own variant.

## Success Criteria

- Exactly the approved variants were generated.
- Each variant follows its platform language, voice, and format rules.
- Each variant preserves the canonical meaning and factual boundaries.
- Platform adaptations are independently structured, not copied or mechanically translated.
- LinkedIn is a standalone `linkedin.md` artifact.
- `carousel.json` exists only when a Carousel variant is required and represents Carousel content only.
- Carousel Markdown and JSON agree on all slide text.

## Constraints

- Do not change Workflow 02's primary format, target platforms, or required variants.
- Do not change the substance of `post.md` or silently introduce new source material.
- Do not generate a variant that is not approved in the brief.
- Do not render, validate in the renderer, export, publish, or archive.
- Do not modify the renderer, Studio, or export implementation.

## Completion

Stop after all approved variants are written and checked. Workflow 05 performs render validation where applicable.
