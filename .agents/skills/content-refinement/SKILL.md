---
name: content-refinement
description: Use when the user asks to review, refine, strengthen, improve, or make an idea or drafted content worth publishing before approval, especially when quality problems may involve strategy, meaning, language, format, or overall readiness.
---

# Content Refinement

## Purpose

Act as the single editorial entry point for turning a rough idea or draft into a stronger, approval-ready content artifact.

This skill **orchestrates existing specialist skills**. It does not replace them or duplicate their rules.

Core rule:

> Never stop at identifying problems when the available context is sufficient to improve the idea or content directly.

Every refinement must produce both an actionable report and the best revised artifact or direction supported by the source material.

---

## When to Use

Use when the user asks things such as:

- review this idea and refine it,
- make this idea worth posting,
- turn this into real content,
- review this content before I approve it,
- improve the meaning or clarity,
- make this carousel stronger,
- check whether this is worth publishing,
- refine this draft instead of only criticizing it.

Do not use for simple proofreading, rendering validation, export, or visual design review.

---

## First Decision: What Is Being Refined?

Classify the input before loading specialist skills.

### Idea / content direction

Use `content-strategist` first.

Goal: decide whether the underlying idea deserves production and find its strongest defensible angle.

Expected strategist outcome:

- `REJECT` — no worthwhile post should be forced from the material.
- `DEVELOP` — there is useful material, but the angle/value/reasoning needs refinement.
- `READY` — the idea is specific, authentic, useful, differentiated, and sufficiently supported.

If `DEVELOP`, refine the direction before moving into writing.

If `REJECT`, explain why and do not manufacture a post merely to produce output.

### Canonical draft or long-form meaning

Use `content-editor`.

Goal: repair meaning, logic, clarity, context, reasoning, specificity, semantic repetition, and claim strength while preserving factual boundaries.

### Format/platform draft

Use the relevant writing and format skills only after the meaning is sound.

For an Arabic Instagram carousel, use:

```text
canonical meaning
→ content-editor
→ lebanese-arabic-writing + arabic-technical-language
→ carousel-copy-polish
→ content-reviewer
```

For other formats, load only the skills relevant to that format and language.

---

## Refinement Invariant

Always refine in this order:

```text
idea quality
→ meaning and reasoning
→ language and voice
→ format fit
→ final editorial review
```

Do not polish weak reasoning into attractive copy.

Do not shorten or stylize a sentence before confirming what it actually means.

Do not let a format rewrite silently change canonical facts, evidence, reasoning, or intended takeaway.

If a platform draft exposes a substantive problem in canonical meaning, return that issue upstream to the canonical draft.

---

## Specialist Responsibilities

Use each skill for its own concern:

- `content-strategist` — idea worthiness, angle, audience value, differentiation, positioning.
- `content-editor` — meaning, logic, clarity, context, reasoning, semantic repair.
- `lebanese-arabic-writing` — Lebanese phrasing, dialect consistency, natural spoken voice.
- `arabic-technical-language` — natural Arabic/English technical terminology and code mixing.
- `carousel-copy-polish` — slide structure, pacing, hook, density, flow, carousel copy fit.
- `content-reviewer` — independent final quality judgment before approval/publication.

Do not collapse these roles into one generic rewrite pass.

---

## Required Output Behavior

A refinement response must be **corrective, not merely diagnostic**.

When enough information exists, produce:

### 1. Refinement Verdict

Use the verdict appropriate to the stage being reviewed, for example:

- idea: `REJECT`, `DEVELOP`, `READY`
- edited draft: `READY`, `READY WITH EDITS`, `NEEDS SOURCE INPUT`
- final review: `PASS`, `PASS WITH MINOR EDITS`, `REVISE`, `BLOCK`

### 2. Core Meaning / Strongest Angle

State what the idea or content should fundamentally communicate.

This becomes the reference point for all downstream editing.

### 3. Refinement Report

For each meaningful issue include:

```text
Category
Location or scope
Problem
Why it matters
Action taken
```

Use categories appropriate to the stage, such as:

- STRATEGY
- AUDIENCE_VALUE
- GENERICITY
- SEMANTIC
- LOGIC
- FACTUAL
- CLARITY
- LANGUAGE
- VOICE
- FORMAT
- REPETITION

### 4. Revised Artifact or Refined Direction

Do not make the user manually apply the report.

- For an idea: provide the refined content direction, including trigger, tension, insight, evidence, audience payoff, and recommended format.
- For a draft: provide the complete revised draft.
- For a carousel: provide the complete revised slide copy.

Preserve source-supported facts and uncertainty.

### 5. Remaining Human Decisions

List only decisions that genuinely require creator intent, missing evidence, or preference.

If none remain, say `None`.

---

## Review-and-Repair Loop

When a final reviewer returns `REVISE`:

1. classify each issue,
2. route it to the owning skill,
3. repair the artifact,
4. review again.

Use at most two automatic repair cycles in one refinement request. If a blocking issue still remains after that, surface the unresolved decision or missing source information instead of endlessly rewriting.

A `BLOCK` caused by missing facts, unsupported claims, or contradictory source material must never be solved by invention.

---

## Approval Standard

The result is ready for human approval only when:

- the idea itself is worth publishing,
- the meaning is specific and coherent,
- conclusions follow from the available evidence,
- the language sounds natural for the intended audience,
- the selected format strengthens rather than distorts the idea,
- generic or empty statements have been removed,
- the user receives a complete revised artifact rather than a list of chores.

The goal is to reduce manual word-by-word correction while keeping the creator, not the agent, as the final approver.