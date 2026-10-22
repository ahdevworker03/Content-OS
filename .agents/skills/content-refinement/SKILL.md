---
name: content-refinement
description: Use when the user asks to review, refine, strengthen, improve, or make an idea or drafted content worth publishing before approval, especially when quality problems may span strategy, meaning, language, format, or readiness.
---

# Content Refinement

## Purpose

Provide one orchestration entry point for end-to-end content refinement.

This skill owns **routing, order, and repair iteration**. Specialist skills own their own evaluation rules, verdicts, and output contracts.

Core rule:

> When the available sources are sufficient, refinement must produce an improved direction or artifact, not only a list of problems.

---

## When to Use

Use when the creator asks to review or refine an idea or draft across more than one editorial layer, for example:

- review this idea and refine it,
- make this worth posting,
- review this before I approve it,
- improve the meaning and wording,
- make this carousel stronger,
- refine this instead of only criticizing it.

Do not use for simple proofreading, render validation, export, or visual design review.

---

## Routing

Classify the artifact before loading specialists.

### Idea or content direction

Run `content-strategist` first.

- `REJECT` stops that direction.
- `DEVELOP` must be refined from existing evidence and evaluated again before writing.
- `READY` may proceed to planning or canonical writing.

Use the strategist's own required report and refined direction. Do not duplicate its evaluation inside this orchestrator.

### Canonical draft or long-form meaning

Run `content-editor`.

Use it to repair meaning, logic, clarity, context, reasoning, specificity, repetition, and claim strength without inventing facts or evidence.

### Platform or format draft

First confirm that canonical meaning is sound. Then load only the language and format rules needed by that variant, and finish with `content-reviewer`.

For an Arabic Instagram Carousel:

```text
canonical meaning
→ content-editor
→ lebanese-arabic-writing + arabic-technical-language
→ carousel-copy-polish
→ content-reviewer
```

For LinkedIn, use `framework/formats/linkedin.md` directly for platform/format rules, then run `content-reviewer`.

---

## Refinement Invariant

Always preserve this order:

```text
idea quality
→ meaning and reasoning
→ language and voice
→ format fit
→ final editorial review
```

Do not polish weak reasoning into attractive copy.

Do not let a platform rewrite silently change canonical facts, evidence, reasoning, uncertainty, or intended takeaway.

If a variant exposes a substantive semantic, logical, or factual problem, return it to the canonical layer before continuing.

---

## Ownership

- `content-strategist` — idea worthiness, angle, audience value, differentiation, positioning.
- `content-editor` — meaning, logic, clarity, context, reasoning, semantic repair.
- `lebanese-arabic-writing` — Lebanese phrasing, dialect consistency, natural voice.
- `arabic-technical-language` — Arabic/English technical terminology and code mixing.
- `carousel-copy-polish` — Carousel archetype, slide structure, hook, pacing, density, flow, CTA fit.
- `content-reviewer` — independent final quality gate and issue routing.

Do not collapse these responsibilities into one generic rewrite pass.

---

## Execution

1. Identify the current stage and artifact.
2. Load only the specialist skills and format documents required for that stage.
3. Run the owning specialist and preserve its verdict, report structure, and factual boundaries.
4. Apply repairs that the current sources support; do not leave safe, obvious repairs for the creator to perform manually.
5. When `content-reviewer` returns `REVISE`, route each issue to its owning layer, repair it there, then review the resulting artifact again.
6. Use at most two automatic repair-and-review cycles in one refinement request.
7. If a specialist returns a blocking state such as `BLOCK` or `NEEDS SOURCE INPUT`, surface the missing evidence, contradiction, or creator decision instead of inventing a solution.

---

## Completion

Return:

- the relevant specialist verdict or verdicts,
- a concise summary of what materially changed,
- the complete revised artifact or refined direction when the sources support one,
- only the unresolved human decisions that genuinely require creator intent or missing evidence.

The creator remains the final approver.