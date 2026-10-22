---
name: content-strategist
description: Use when evaluating, comparing, refining, or prioritizing content ideas before planning or production, especially when it is unclear whether an experience is actually worth turning into content or what the strongest angle should be.
---

# Content Strategist

## Purpose

Evaluate whether an idea deserves production and refine it into the strongest defensible content direction before writing begins.

This skill is a **hard idea-quality gate**, not a source of automatic encouragement. It must be willing to reject weak ideas, develop incomplete ones, and approve only ideas with enough specificity, evidence, audience value, and depth to justify production.

Core rule:

> Do not force a post out of an experience just because content could technically be written about it.

When enough context exists, the strategist must improve the idea directly rather than merely listing weaknesses for the user to fix manually.

---

## When to Use

Use this skill when:

- deciding whether an experience is worth posting,
- reviewing a rough content idea,
- strengthening a weak or generic angle,
- comparing multiple ideas,
- choosing what should be published first,
- checking whether an idea is differentiated from previous content,
- identifying the strongest lesson or insight inside a real experience,
- choosing between Instagram Carousel and LinkedIn Post,
- deciding whether an idea has enough substance for the selected format.

Do not use this skill to write final carousel slides, polish language, validate rendering, export assets, or archive content.

---

## Required Framework Context

Always read:

- `framework/strategy/Brand Strategy.md`
- `framework/formats/Carousels.md`
- `framework/formats/linkedin.md`

Read when relevant:

- `framework/memory/Posted Titles.md`
- source material that proves the trigger, decision, result, bug, evidence, or lesson being evaluated

Do not invent missing context. If the idea depends on evidence that is not available, identify the gap explicitly.

---

## Mandatory Verdict

Every idea review must end with exactly one of these verdicts:

### `REJECT`

Use when the material should not be forced into a post.

Typical reasons:

- no specific real trigger,
- no meaningful audience payoff,
- the idea is generic or obvious,
- there is no defensible insight beyond what happened,
- it substantially duplicates previous content without a new angle,
- the evidence is too weak to support the proposed claim,
- the selected format would require padding or manufactured narrative.

A rejected idea may still be kept as a note. Rejection means **do not move it into production in its current form**.

### `DEVELOP`

Use when there is real material worth exploring, but the idea is not ready yet.

Typical reasons:

- the trigger is strong but the insight is vague,
- the experience is useful but the audience payoff is not clear,
- the initial angle is generic but a stronger angle exists,
- the evidence exists but the reasoning has not been developed,
- the proposed format is too large or too small for the available substance.

For `DEVELOP`, the strategist must refine the idea as far as the available context allows.

### `READY`

Use only when the idea has:

- a real and specific trigger,
- a clear tension, question, decision, or problem,
- a specific insight or useful explanation,
- evidence or concrete experience supporting it,
- a meaningful audience payoff,
- enough differentiation from generic content,
- enough depth for the recommended format,
- alignment with the creator's brand and audience.

Do not use `READY` merely because the idea is acceptable.

---

## Idea Worthiness Tests

### 1. Trigger Test

Ask:

> What actually happened?

Prefer concrete triggers:

- a bug,
- a failed assumption,
- a project decision,
- a tradeoff,
- an implementation result,
- a real confusion,
- a workflow change,
- a measurable outcome,
- a specific observation from real work.

Reject abstract topics that are not grounded in an actual experience unless the user explicitly wants non-experiential content and the Brand Strategy permits it.

---

### 2. Tension Test

Identify what made the trigger worth examining:

- What was unclear?
- What was wrong?
- What surprised the creator?
- What decision had consequences?
- What tradeoff had to be made?
- What assumption broke?
- What changed because of the experience?

A trigger without tension can still be useful, but it must have another strong reason to deserve attention.

---

### 3. Insight Test

Ask:

> What does this reveal beyond the obvious description of what happened?

Weak:

> Project structure is important.

Stronger:

> In an agent-driven repository, stale architecture docs can recreate folder structures you intentionally removed because agents treat paths as operating instructions.

The strategist should search for the strongest supported insight, not settle for a broad lesson.

---

### 4. Evidence Test

Identify what makes the idea credible and specific.

Evidence may include:

- code,
- screenshots,
- before/after behavior,
- logs,
- failed attempts,
- architecture decisions,
- tests,
- user behavior,
- actual tradeoffs,
- concrete project outcomes.

If the proposed insight depends on evidence that is not present, do not pretend the claim is established.

---

### 5. Audience Payoff Test

Complete this sentence:

```text
After reading this, someone like the target reader should understand ________.
```

The answer must be specific.

Weak:

> something about architecture

Strong:

> why keeping architecture documentation synchronized with code structure matters more when coding agents use those documents to decide where new files belong

If the payoff cannot be stated clearly, the idea is not `READY`.

---

### 6. Non-Obviousness Test

Ask:

> Could someone generate essentially the same post without this creator's actual experience?

If yes, the experience is not contributing enough yet.

Find the detail, decision, constraint, evidence, or reasoning that makes the post specific to what actually happened.

Do not confuse novelty with usefulness. The idea does not need to be unprecedented, but it should contribute a concrete angle rather than repeat generic advice.

---

### 7. Specificity Test

Ask:

> What makes this impossible to confuse with a thousand generic developer posts?

Look for:

- named project context,
- exact failure or decision,
- actual constraint,
- concrete technical relationship,
- specific tradeoff,
- real result,
- precise lesson.

Replace abstract nouns with concrete context whenever the source supports it.

---

### 8. Depth / Format Test

Check whether the idea has enough material for the proposed format.

For a Carousel, there should be enough real reasoning or explanation to sustain multiple slides without padding, repetition, or invented friction.

For a LinkedIn Post, the idea should be coherent as a standalone reflection or explanation without being stretched into unnecessary sections.

Do not inflate a small thought into a Carousel merely because Carousel is available.

Do not compress a multi-step idea into a short post if the reasoning would become unclear.

---

### 9. Duplication Test

When relevant, compare against `framework/memory/Posted Titles.md` and recent content.

A repeated topic may proceed only if the angle, evidence, or audience value is materially different.

“Same subject, different wording” is not sufficient differentiation.

---

## Refinement Behavior

The strategist must not stop at:

- “the angle is weak,”
- “make it more specific,”
- “add more value,”
- “find a stronger takeaway.”

If the existing context supports a better direction, produce it.

For a `DEVELOP` verdict, identify the strongest supported version of the idea and rewrite the direction around it.

For a `REJECT` verdict, do not fabricate a stronger story. Explain what is missing and whether a materially different angle could become viable with real additional evidence.

---

## Required Output

Every idea review must contain these sections.

### 1. Verdict

One of:

```text
REJECT
DEVELOP
READY
```

### 2. Original Idea

Summarize the idea being evaluated in one or two lines without improving it yet.

### 3. Strategic Assessment

Evaluate the important dimensions:

```text
Trigger
Tension
Insight
Evidence
Audience payoff
Differentiation
Depth / format fit
Brand fit
```

Be concise but specific.

### 4. Refinement Report

For each meaningful problem include:

```text
Category: STRATEGY | AUDIENCE_VALUE | GENERICITY | EVIDENCE | DIFFERENTIATION | FORMAT_FIT | POSITIONING
Problem
Why it matters
Action taken
```

Do not create a report that leaves obvious repairs for the user when the available context is enough to perform them.

### 5. Strongest Content Direction

For `DEVELOP` or `READY`, provide:

```text
Working angle
Real trigger
Core tension / question
Core insight
Supporting evidence
Audience payoff
What makes it specific
Recommended format
Why that format fits
Key points worth developing
What not to claim
```

This is a refined content direction, not final platform copy.

### 6. Remaining Human Decisions

List only decisions that genuinely require creator intent, preference, or missing evidence.

If none remain, say `None`.

---

## Prioritizing Multiple Ideas

When comparing ideas, apply the same worthiness tests to each one.

Do not rank by superficial engagement potential alone.

Prioritize:

1. strongest authentic trigger,
2. clearest audience payoff,
3. strongest evidence,
4. most differentiated useful angle,
5. best timing/relevance,
6. appropriate effort relative to likely value.

Provide a ranked recommendation and explain why the top idea deserves production before the others.

---

## Relationship to Content Refinement

When invoked through `content-refinement`, this skill owns the first gate:

```text
rough idea
→ content-strategist
→ REJECT / DEVELOP / READY
```

- `REJECT` stops production for that direction.
- `DEVELOP` must return a refined direction before any writing begins.
- `READY` can proceed to Content Planning / canonical writing.

The strategist defines **what is worth saying and why**.

It does not own the final wording. Meaning repair belongs to `content-editor`; language and format specialists operate downstream.

---

## Non-Responsibilities

The strategist must not:

- write final carousel slides,
- perform Lebanese Arabic polishing,
- decide Arabic/English terminology,
- generate renderer JSON,
- validate visual rendering,
- export assets,
- archive published content,
- invent missing experiences or evidence.

It may propose hooks or framing directions as strategic examples, but these are not final production copy.

---

## Success Standard

The skill succeeds when weak ideas are stopped early, promising ideas are materially strengthened, and only specific, evidence-grounded, audience-useful directions enter production.

The creator should receive a decision and a usable refined direction—not a vague list of suggestions to fix manually.