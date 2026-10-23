---
name: content-strategist
description: Use when evaluating, comparing, refining, or prioritizing content ideas before planning or production, especially when it is unclear whether an experience is actually worth turning into content or what the strongest angle should be.
---

# Content Strategist

## Purpose

Act as Workflow 01's editorial qualification gate for raw captured ideas, normally loaded from `content/ideas/` with their curated evidence. A manually supplied raw idea is also valid input. The capture inbox is intentionally moderately noisy; do not narrow its threshold or assume capture implies approval.

The strategist decides whether an idea deserves production and, when the available evidence allows it, refines the idea into its strongest defensible direction.

Core rule:

> Do not force a post out of an experience merely because content can be written about it.

---

## Required Context

Always read:

- `framework/strategy/Brand Strategy.md`

Read when relevant:

- `framework/memory/Posted Titles.md`
- a captured `idea.json` and its curated resources
- source material supporting the trigger, decision, bug, result, evidence, or lesson

Workflow 01 may recommend a format and platforms but does not apply their writing rules. Workflow 02 owns the approved brief and variants; Workflow 04 owns actual language and platform adaptation.

Never invent missing experiences, results, evidence, or certainty.

---

## Mandatory Verdict

Every idea review ends with exactly one verdict.

### `REJECT`

The available material should not move into production in its current direction.

Use when there is no sufficiently valuable, distinct, supportable post in the available material, including a routine activity without insight, generic/duplicate direction, unsupported conclusion, insufficient audience value, or conflict with brand boundaries. Do not force the capture into content.

### `DEVELOP`

There is real material worth using, but the direction is not ready.

Use when potentially useful content exists but the angle, evidence, audience payoff, insight, overlap, or uncertainty needs work. Refine only from existing evidence. A DEVELOP idea cannot proceed to Workflow 02 until reevaluated and marked READY.

### `READY`

Use only when the complete idea-quality gate below passes. `READY` means the direction is authentic, specific, useful, sufficiently supported, differentiated, aligned with the brand, clear about audience payoff, and bounded by evidence. Only a selected READY idea is an official Workflow 02 input.

---

## Idea-Quality Gate

Evaluate these dimensions together:

1. **Trigger** — What specifically happened, was decided, observed, questioned, or discovered? Prefer concrete project events, bugs, tradeoffs, failures, implementation results, or real observations over abstract topics.
   Is this trigger real and specific, and does it contain a useful idea rather than merely activity?
2. **Tension** — What made the trigger worth examining: confusion, broken assumption, surprise, consequence, constraint, decision, or tradeoff?
3. **Insight** — What does the experience reveal beyond merely describing what happened? Reject generic lessons when the source supports a more precise idea.
4. **Evidence** — What source-supported detail makes the direction credible: code, screenshots, logs, tests, before/after behavior, failed attempts, decisions, measurements, or concrete outcomes? If the core claim requires missing evidence, the idea is not `READY`.
5. **Audience payoff** — Complete: `After reading this, the target reader should understand ______.` The answer must be specific and useful.
6. **Specificity and differentiation** — Could essentially the same post be written without this creator's actual experience? If yes, strengthen the angle from real constraints, evidence, or reasoning. Check `Posted Titles.md` when duplication matters.
   If similar material exists, establish whether this angle is genuinely distinct; do not treat duplicate captures as separate posts.
7. **Depth and format fit** — The idea must contain enough real substance for the proposed format without padding, repetition, fake friction, or compression that destroys the reasoning.
8. **Brand fit** — The direction must fit the creator's audience, positioning, pillars, and factual boundaries.
9. **Overlap and backlog value** — Consolidate heavily overlapping captures into one content direction where appropriate. When several ideas are READY, recommend the next candidate using audience value, distinctiveness, evidence, timing/relevance, and effort/value; do not default to newest.

For every assessment, state what must not be claimed because the available evidence or certainty does not support it, and whether enough substance exists to proceed.

A topic does not need to be unprecedented. It does need a concrete, useful angle that the actual experience materially contributes to.

---

## Refinement Behavior

Do not stop at comments such as:

- make it more specific,
- add more value,
- find a stronger takeaway,
- the angle is weak.

When the existing context supports a stronger direction, produce that direction directly.

For `DEVELOP`, strengthen the idea from the available trigger, evidence, constraints, and reasoning. For `REJECT`, explain the blocking weakness without fabricating a better story.

This skill defines **what is worth saying and why**. It does not write final platform copy.

---

## Required Output

Every idea review contains:

### 1. Verdict

`REJECT`, `DEVELOP`, or `READY`.

### 2. Original Idea

Summarize the direction being evaluated without improving it yet.

### 3. Strategic Assessment

Assess, concisely and specifically:

```text
Trigger
Tension
Insight
Evidence
Audience payoff
Specificity / differentiation
Depth / format fit
Brand fit
```

### 4. Refinement Report

For each material issue use:

```text
Category: STRATEGY | AUDIENCE_VALUE | GENERICITY | EVIDENCE | DIFFERENTIATION | FORMAT_FIT | POSITIONING
Problem
Why it matters
Action taken
```

### 5. Strongest Content Direction

For `DEVELOP` or `READY`, provide:

```text
Working angle/title
Core idea
Real trigger
Core tension / question
Core insight
Supporting evidence
Audience problem
Audience payoff
What makes it specific
Content pillar
Recommended format
Recommended platforms
Why that format fits
Key points worth developing
Factual/uncertainty boundaries
What not to claim
Notes for Content Planning
```

This is a strategic direction for planning, not publish-ready copy. Never write hooks, carousel slides, LinkedIn paragraphs, captions, CTAs, or platform-language content here.

### 6. Remaining Human Decisions

List only decisions that require creator intent, preference, or genuinely missing evidence. If none remain, write `None`.

---

## Prioritizing Multiple Ideas

Apply the same gate to each candidate. Prioritize, in order:

1. authentic and consequential trigger,
2. audience payoff,
3. evidence strength,
4. useful differentiation,
5. timing/relevance,
6. effort relative to likely value.

Do not rank by superficial engagement potential alone.

---

## Boundaries

Do not:

- write final Carousel or LinkedIn copy,
- perform language polishing,
- generate renderer JSON,
- validate rendering,
- export or archive content,
- invent evidence or experiences.

When invoked through `content-refinement`, this skill owns the first gate only. Downstream meaning repair belongs to `content-editor`; language and format specialists own presentation; `content-reviewer` owns the final editorial gate.
