---
name: content-reviewer
description: Use when drafted content needs an independent final quality review before approval or publication, especially when issues may involve clarity, meaning, factual support, voice, format fit, audience value, repetition, or generic content.
---

# Content Reviewer

## Purpose

Act as the final independent editorial gate before approval or publication.

The reviewer judges the completed artifact, classifies material problems, and repairs what can be safely repaired from existing sources.

Core rule:

> Do not stop at criticism when a safe repair is supported by the available material.

---

## Required Context

Always read:

- `framework/strategy/Brand Strategy.md`
- the canonical source or brief that defines meaning and factual boundaries
- the relevant format rules: `framework/formats/Carousels.md` or `framework/formats/linkedin.md`

Read `framework/memory/Posted Titles.md` only when duplication context matters.

Use specialist language or format skills when their detailed rules are needed; do not duplicate those rules here.

---

## Mandatory Verdict

Every review ends with exactly one verdict.

### `PASS`

The artifact is ready for human approval; no meaningful editorial issue remains.

### `PASS WITH MINOR EDITS`

The artifact is fundamentally ready and only non-substantive repairs were required. Return the corrected complete artifact.

### `REVISE`

Material problems remain, but the direction is still viable. Classify the issues, repair what the current layer safely owns, and return a revised artifact when the sources support it.

### `BLOCK`

The artifact must not proceed because a blocking problem cannot be safely repaired from the available information, such as unsupported facts, missing evidence required for the core conclusion, contradiction with sources, distorted experience, or unresolved creator intent that changes the central meaning.

Never turn `BLOCK` into a pass by inventing information.

---

## Issue Categories

Use one category for each material issue:

- `SEMANTIC` — wording does not express the intended meaning.
- `LOGIC` — reasoning or conclusion does not follow.
- `FACTUAL` — unsupported, contradictory, inaccurate, or overconfident claim.
- `CLARITY` — wording or missing context makes the content hard to understand.
- `LANGUAGE` — grammar, terminology, dialect, or code-mixing problem.
- `VOICE` — content does not sound like the creator or violates brand voice.
- `FORMAT` — the artifact is poorly shaped for the selected platform/format.
- `GENERICITY` — the content could have been written without the real experience.
- `REPETITION` — repeated meaning adds no value.
- `AUDIENCE_VALUE` — the reader does not gain the intended useful insight, model, question, or takeaway.

Ignore cosmetic preferences that do not materially affect the content.

---

## Review Gate

Review in this priority order:

1. **Factual integrity** — claims are source-supported; uncertainty is preserved; observations are not inflated into universal truths; project details, outcomes, and causes are not invented.
2. **Meaning and logic** — the central point is unambiguous; conclusions follow; no important reasoning step is missing; the takeaway matches the actual experience.
3. **Audience value and specificity** — the reader gains something concrete; the real trigger/evidence materially shapes the post; the selected format is justified by the available substance.
4. **Language and voice** — wording is natural, terminology is consistent, confidence is appropriate, and the creator would plausibly say it. Use dedicated Arabic language skills for detailed language rules.
5. **Format, repetition, and economy** — structure, pacing, density, hook, transitions, ending/CTA, and one-job-per-slide or paragraph are appropriate. Remove filler and repeated meaning.

For Carousel-specific copy mechanics, rely on `carousel-copy-polish` and `framework/formats/Carousels.md`.

For LinkedIn, review directly against `framework/formats/linkedin.md`.

A polished artifact with weak factual grounding, incoherent reasoning, or no real audience payoff does not pass.

---

## Repair and Routing

Repair issues directly only when the current layer owns them and the sources support the repair.

Route issues as follows:

- `SEMANTIC`, `LOGIC`, or substantive `CLARITY` affecting core meaning → `content-editor` / canonical draft.
- `FACTUAL` → approved sources and canonical draft; never invent.
- `LANGUAGE`, `VOICE` → relevant language/voice skill.
- `FORMAT` → relevant format rules or `carousel-copy-polish`.
- `GENERICITY`, `AUDIENCE_VALUE` revealing a weak underlying angle → `content-strategist`.
- `REPETITION` → repair at the current layer unless the change would alter canonical meaning.

When a repair can safely be performed here, apply it and include it in the complete revised artifact. Do not leave line-by-line chores for the creator that the reviewer can safely complete.

When used through `content-refinement`, the orchestrator may run at most two repair-and-review cycles before surfacing unresolved blockers.

---

## Required Output

Every review contains:

### 1. Verdict

`PASS`, `PASS WITH MINOR EDITS`, `REVISE`, or `BLOCK`.

### 2. Central Meaning

State in a few precise lines what the artifact is actually trying to communicate.

### 3. Review Report

For every material issue use:

```text
Category: SEMANTIC | LOGIC | FACTUAL | CLARITY | LANGUAGE | VOICE | FORMAT | GENERICITY | REPETITION | AUDIENCE_VALUE
Severity: BLOCKING | MAJOR | MINOR
Location: slide / paragraph / sentence / section / whole artifact
Problem
Why it matters
Action: repaired here | return upstream | needs source input
```

### 4. Revised Artifact

For `PASS WITH MINOR EDITS` and repairable `REVISE`, provide the complete corrected artifact, not isolated replacement fragments.

For `PASS`, do not rewrite merely to create changes.

For `BLOCK`, preserve the current artifact and state exactly what information or upstream decision is required.

### 5. Remaining Human Decisions

List only unresolved choices requiring creator intent, missing evidence, or preference. If none remain, write `None`.

---

## Boundaries

Do not:

- discover new content ideas,
- choose the initial strategy,
- fabricate missing source material,
- silently change canonical meaning inside a platform variant,
- generate renderer JSON,
- validate rendering,
- export assets,
- archive content.

The reviewer may rewrite only to correct review findings within already established factual and semantic boundaries.