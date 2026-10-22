---
name: content-editor
description: Use when drafted content is unclear, logically weak, ambiguous, repetitive in meaning, missing context, semantically empty, or technically understandable but does not clearly express the intended idea.
---

# Content Editor

## Purpose

Edit drafted content so the meaning is clear, logically connected, specific, and worth reading without changing what is true.

This skill owns **semantic and editorial repair**. It does not stop at identifying problems. When enough information exists, it must provide the corrected wording and a complete revised artifact that can replace the current draft.

The core question is:

> Does this content clearly say something meaningful, and does every conclusion follow from the evidence and context provided?

---

## When to Use

Use this skill when a draft has problems such as:

- a sentence is grammatically valid but does not make clear sense,
- the intended meaning and the written meaning differ,
- reasoning jumps from one point to another,
- important context is missing,
- vague words hide the actual idea,
- multiple sentences repeat the same meaning,
- a statement sounds important but says very little,
- a conclusion is stronger than the evidence supports,
- transitions do not explain why one idea leads to the next,
- the reader cannot tell what changed, why it mattered, or what they should understand.

Do not use this skill primarily for dialect, Arabic/English terminology, carousel pacing, visual layout, or content strategy. Those belong to their dedicated skills.

---

## Editorial Boundary

The editor may improve:

- meaning expression,
- logic,
- clarity,
- context,
- reasoning,
- specificity,
- sentence relationships,
- semantic repetition,
- claim precision,
- information sufficiency,
- transitions.

The editor must not invent:

- experiences,
- results,
- technical facts,
- project details,
- evidence,
- emotions,
- achievements,
- causes that were not established by the source material.

If fixing a problem requires new facts, report the missing information instead of fabricating it.

If editing a format/platform variant would change canonical meaning, factual claims, evidence, or reasoning, return that issue to the canonical draft rather than silently changing the variant.

---

## Core Review Tests

### 1. Meaning Test

For each important sentence, determine what it actually claims.

Check:

- Is that the intended meaning?
- Is the subject clear?
- Are references such as “this”, “that”, “the problem”, or “it” unambiguous?
- Could a reasonable reader understand the sentence differently?
- Is the statement precise enough to carry useful information?

Rewrite ambiguous wording when the intended meaning is supported by context.

### 2. Logic Test

Check whether the reasoning forms a complete chain:

```text
experience / evidence
→ observation
→ reasoning
→ conclusion
```

Do not accept an unexplained jump such as:

```text
API bug
→ architecture is important
```

The draft must explain the relationship or reduce the conclusion.

### 3. Information Sufficiency Test

The reader should be able to understand:

- what happened,
- what was expected,
- what was different,
- why it mattered,
- what was learned or decided.

Add missing connective context only when it is already supported by the source material.

### 4. Empty-Sentence Test

Challenge sentences such as:

- “This changed how I think.”
- “I understood the topic more deeply.”
- “This showed me the importance of structure.”
- “I learned a valuable lesson.”

Ask what specifically changed, became clearer, mattered, or was learned. Replace empty abstraction with the concrete meaning available in the draft.

### 5. Semantic Repetition Test

Detect repeated **ideas**, not only repeated words.

Two differently worded sentences that communicate the same insight should be merged, differentiated, or one removed.

### 6. Claim-Strength Test

Match certainty to evidence.

Replace unsupported universal claims with narrower statements grounded in the actual experience. Never upgrade a personal observation into a general rule without support.

---

## Editing Process

1. Identify the central meaning the draft is trying to communicate.
2. Map the reasoning from trigger/evidence to takeaway or conclusion.
3. Mark semantic, logic, clarity, context, repetition, and claim-strength problems.
4. Repair every issue that can be resolved from existing context.
5. Preserve factual boundaries and wording that carries important meaning.
6. Re-read the revised draft as one continuous argument, not isolated sentences.
7. Produce the revision report and the complete revised artifact.

Do not merely recommend that the user “make this clearer” or “add more context” when the existing context is sufficient to perform the edit directly.

---

## Required Output

Every content-editing response must contain these sections.

### Editorial Verdict

Use one:

- `READY` — no meaningful semantic/editorial issue remains.
- `READY WITH EDITS` — the editor repaired non-blocking issues.
- `NEEDS SOURCE INPUT` — at least one important issue cannot be repaired without information that is not present.

### Intended Meaning

State in a few lines what the content is actually trying to communicate. This acts as the semantic reference for the edit.

### Revision Report

For each meaningful issue include:

```text
Category: SEMANTIC | LOGIC | CLARITY | CONTEXT | REPETITION | CLAIM_STRENGTH
Location: sentence / paragraph / slide / section
Problem: what is wrong
Why it matters: how it affects understanding
Change: what was changed or what source information is missing
```

Do not create issue entries for trivial punctuation or cosmetic edits unless they affect meaning.

### Revised Artifact

Provide the **complete revised content**, not only replacement fragments.

The user should be able to approve, copy, or save the revised artifact without manually applying the report line by line.

### Remaining Human Decisions

Include only decisions that genuinely require the creator's intent, missing evidence, or preference. If none remain, say `None`.

---

## Relationship to Other Skills

Typical Arabic carousel refinement order:

```text
canonical meaning
→ content-editor
→ lebanese-arabic-writing + arabic-technical-language
→ carousel-copy-polish
→ content-reviewer
```

Responsibilities remain separate:

- `content-editor` — meaning, logic, clarity, reasoning.
- `lebanese-arabic-writing` — Lebanese phrasing and natural spoken voice.
- `arabic-technical-language` — Arabic/English technical terminology.
- `carousel-copy-polish` — carousel structure, pacing, slide-copy fit.
- `content-reviewer` — independent publication-quality judgment.

Do not duplicate those downstream responsibilities inside this skill.

---

## Success Standard

A successful edit leaves the reader able to answer:

- What happened or what is being argued?
- Why does each point lead to the next?
- What exactly became clearer, changed, or matters?
- Which claims are facts, observations, or personal conclusions?
- What useful idea remains after removing polished but empty wording?

The final result should require substantially less word-by-word correction by the creator while remaining faithful to the source material.
