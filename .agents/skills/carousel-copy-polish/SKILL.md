---
name: carousel-copy-polish
description: Use when an Instagram carousel draft needs tighter slide copy, clearer sequencing, stronger hooks, better pacing, less repetition, or a structure that better fits the kind of content being communicated.
---

# Carousel Copy Polish

## Purpose

Polish an existing Instagram carousel so the copy is clear, specific, readable, and structurally appropriate for the content.

This skill owns **carousel presentation quality**. It does not decide whether the underlying idea is worth publishing and it does not repair canonical meaning or factual reasoning.

Core rule:

> Choose the carousel structure from the content archetype. Do not force every post into the same mistake → friction → realization story.

---

## When to Use

Use after a carousel draft exists and the underlying meaning is already sound.

Use it for:

- stronger hooks,
- tighter slide copy,
- slide-by-slide flow,
- pacing,
- one-idea-per-slide discipline,
- reducing overloaded slides,
- removing repetition,
- matching structure to content type,
- improving the ending or CTA,
- making the carousel feel less generic or AI-generated.

Do not use it to:

- discover or validate the original idea,
- change canonical facts or reasoning,
- invent project details or evidence,
- repair factual gaps,
- choose visual design or renderer layout,
- write LinkedIn content.

If the carousel exposes a semantic, logical, or factual problem, route that issue upstream to `content-editor` or the canonical draft instead of hiding it with better copy.

---

## Core Slide Rule

Each slide should do one primary job.

If one slide contains several ideas, split, cut, or prioritize.

Bad:

> I thought the problem was CSS, then checked the API, found missing data, realized validation was wrong, and learned why tests matter.

Better:

```text
Slide:
I thought the problem was CSS.

Next:
Then I checked the API response.

Next:
The data was already wrong before it reached the component.
```

A reader should understand each slide quickly and know why the next slide exists.

---

# 1. Identify the Carousel Archetype First

Before polishing, classify the draft into the archetype that best matches its actual purpose.

Supported default archetypes:

- `debug-story`
- `explainer`
- `comparison`
- `case-study`
- `decision`
- `insight`

These are structural guides, not rigid templates. Use the minimum structure needed to communicate the idea clearly.

If none fits exactly, choose the closest reasoning pattern instead of forcing the draft into a fictional personal-learning story.

---

## Archetype: `debug-story`

Use when a real bug, failed assumption, debugging path, or technical mistake is the center of the post.

Typical flow:

```text
Hook
→ real trigger
→ initial assumption
→ friction / failed attempt
→ diagnosis
→ realization
→ practical takeaway
→ optional peer question
```

Useful when the reader benefits from following the investigation.

Do not manufacture a wrong assumption or dramatic failure if it did not happen.

---

## Archetype: `explainer`

Use when the primary value is understanding a concept, mechanism, or mental model.

Typical flow:

```text
Question / tension
→ simple mental model
→ how it works
→ concrete example
→ important boundary or common confusion
→ practical takeaway
```

The post does not need a personal mistake arc.

Good example direction:

```text
Why does a transaction matter?
→ two database changes belong together
→ one failing should cancel both
→ rental/payment example
→ transaction is not the same as two independent queries
```

Avoid turning the carousel into textbook documentation.

---

## Archetype: `comparison`

Use when the post explains a tradeoff between two approaches, tools, designs, or decisions.

Typical flow:

```text
Context / decision to make
→ option A
→ option B
→ comparison criteria
→ tradeoffs
→ conclusion for this context
→ when the other option may be better
```

Do not frame one option as universally correct when the evidence only supports a contextual choice.

---

## Archetype: `case-study`

Use when the value comes from showing how a real project problem was approached.

Typical flow:

```text
Situation
→ problem
→ constraints
→ approach / implementation
→ evidence
→ result
→ lesson or transferable principle
```

The result should be tied to real project evidence, not generic claims.

---

## Archetype: `decision`

Use when the post explains why a technical or product decision was made.

Typical flow:

```text
Decision
→ context
→ constraints
→ alternatives
→ tradeoffs
→ chosen direction
→ why it fits now
→ what would make the decision change later
```

This archetype is especially useful for architecture and product-engineering content.

Do not rewrite it into “I was wrong, then I learned” unless that is actually the story.

---

## Archetype: `insight`

Use when one concise observation is the main value and there is not enough depth for a full case study or explainer.

Typical flow:

```text
Specific observation
→ evidence / real context
→ why it matters
→ consequence or application
→ concise takeaway
```

Keep these carousels shorter. Do not inflate a small insight into eight slides merely because carousels often have eight slides.

---

# 2. Hook Rules

The hook must match the archetype.

A hook does not always need to ask “What happened?”. It may instead make the reader ask:

- Why did they choose that?
- What is the difference?
- How does this work?
- What went wrong?
- Why does this matter?

Good `debug-story` hook:

> I thought this was a CSS problem. It wasn’t.

Good `decision` hook:

> I kept Studio and Renderer in one package on purpose.

Good `comparison` hook:

> Both structures worked. Only one fit the project I actually had.

Good `explainer` hook:

> I only understood transactions when two database changes had to succeed together.

Bad generic hooks:

- 5 tips every developer should know
- Why clean code matters
- Things programmers need to learn
- My coding journey
- Important lessons from software development

If the hook could fit hundreds of unrelated programming accounts, rewrite it.

---

# 3. Specificity Rules

Prefer concrete project language over abstract labels.

Vague:

- problem
- issue
- project
- code
- challenge
- concept
- feature
- thing

More useful:

- rental details dashboard
- API response
- vehicle status
- Prisma migration
- TypeScript type error
- CSS grid
- authentication flow
- repository structure
- renderer adapter

Specificity must come from the source material. Never invent specificity to make copy sound stronger.

---

# 4. Flow Rules

A carousel should feel like one sequence, not several related thoughts placed next to each other.

For every adjacent pair of slides, ask:

> Why does this slide need to come after the previous one?

Good flow has a visible relationship such as:

- cause → consequence,
- question → explanation,
- option → tradeoff,
- evidence → conclusion,
- context → decision,
- attempt → result.

If two slides have no clear relationship, reorder, bridge, merge, or remove one.

Do not invent transitions that imply reasoning absent from the canonical content.

---

# 5. Text Density

Default target per slide:

```text
1 primary idea
1–3 short lines
no unnecessary paragraph
```

This is a readability target, not a rigid line-count law.

A technical slide may need slightly more text if shortening it would remove necessary meaning.

When a slide is overloaded, ask:

- Can one detail be removed?
- Is one sentence only repeating the previous slide?
- Should this become two slides?
- Is this detail necessary for the audience payoff?

Do not shorten content until it becomes vague.

---

# 6. Repetition Check

Detect repeated **meaning**, not only repeated wording.

Common repetition:

- the hook restated as the takeaway,
- the same lesson phrased differently on two slides,
- project context repeated without adding evidence,
- the same technical explanation given twice,
- several slides saying “I realized…” without distinct meaning.

Merge, differentiate, or remove repeated slides.

---

# 7. Technical Explanation Rule

Carousels may explain technical concepts, but should not become documentation.

Bad:

> A database transaction is a sequence of operations performed as a single logical unit of work, ensuring ACID properties...

Better:

> I understood transactions when two database changes had to succeed together.
> If one failed, both needed to roll back.

Keep technical explanation tied to the post's actual purpose and audience.

---

# 8. Takeaway Rules

The ending should match the archetype.

A debugging story may end with a changed debugging habit.

A decision post may end with the condition under which the decision should change.

A comparison may end with the criteria that determined the choice.

An explainer may end with the simplest usable mental model.

A case study may end with a transferable principle.

Avoid broad motivational endings such as:

- Consistency is the key to success.
- Clean code is always important.
- Never stop learning.
- Every bug is a lesson.

The takeaway should be narrower than the evidence, never broader.

---

# 9. CTA Rules

A CTA is optional.

Do not force a question if the carousel already ends naturally.

When a CTA fits, keep it peer-level and connected to the content.

Good:

- What would make you split these into separate packages?
- Which tradeoff would matter most in your project?
- Did a bug ever expose a wrong assumption like this?

Avoid engagement farming:

- Like and follow for more
- Save this post
- Comment “DEBUG”
- Share this with a developer friend

---

# 10. Arabic Carousel Rules

For Arabic Instagram carousels:

- use `lebanese-arabic-writing` for dialect and natural phrasing,
- use `arabic-technical-language` for technical terminology,
- keep slide copy concise,
- preserve the selected archetype,
- do not convert a decision/explainer into a fake learning story merely to sound personal.

This skill should not duplicate detailed Arabic rules owned by those skills.

---

# 11. English Carousel Rules

For English carousels:

- keep sentences simple,
- avoid corporate LinkedIn tone,
- avoid textbook language,
- use project-specific details,
- preserve uncertainty and contextual claims,
- do not force first-person reflection when the archetype is primarily explanatory or comparative.

---

# 12. Remove or Rewrite

Remove or rewrite:

- generic advice,
- motivational filler,
- unsupported expert claims,
- unnecessary definitions,
- repeated ideas,
- tutorial-style intros,
- “in this post”,
- “every developer”,
- “best practice” when unsupported,
- “ultimate guide”,
- “top tips”,
- engagement bait,
- invented drama,
- fake wrong assumptions,
- forced realization language.

Preserve:

- real project context,
- real uncertainty,
- actual tradeoffs,
- evidence,
- specific technical details,
- small honest conclusions,
- the canonical meaning.

---

# 13. Required Polishing Process

1. Confirm the canonical meaning is already sound.
2. Identify the carousel archetype.
3. Check whether the current slide order fits that archetype.
4. Identify the strongest archetype-appropriate hook.
5. Remove generic or redundant slides.
6. Split overloaded slides.
7. Tighten each slide to one primary job.
8. Strengthen transitions without inventing reasoning.
9. Verify evidence, tradeoffs, and takeaway are in the right places.
10. Remove or improve the CTA if it is forced.
11. Re-read the carousel as one continuous sequence.
12. Produce the complete revised carousel copy.

Do not return only a list of copy problems when enough context exists to repair them.

---

# 14. Required Output

When used as part of refinement, return:

### Archetype

State the selected archetype and why it fits.

### Copy Verdict

Use one:

- `READY`
- `READY WITH EDITS`
- `RETURN UPSTREAM`

Use `RETURN UPSTREAM` when the problem is semantic, logical, factual, or strategic rather than copy-level.

### Copy Revision Report

For each meaningful issue:

```text
Category: HOOK | FLOW | DENSITY | REPETITION | SPECIFICITY | FORMAT | CTA
Location
Problem
Why it matters
Change
```

### Revised Carousel

Provide the complete revised slide copy, not only fragments.

### Remaining Human Decisions

List only decisions that require creator intent or missing source information. If none remain, say `None`.

---

# Full Carousel Checklist

Before accepting the carousel, confirm:

- the archetype matches the actual content,
- the structure fits that archetype,
- the hook creates the right kind of curiosity,
- every slide has one primary job,
- slide order is logical,
- no slide exists only to fill a template slot,
- project details are specific and source-supported,
- repeated meaning has been removed,
- technical explanation is understandable without becoming documentation,
- the takeaway is proportional to the evidence,
- the CTA is natural or intentionally omitted,
- the copy does not distort canonical meaning,
- the carousel does not sound like a generic AI-generated programming post.

---

## Success Standard

The polished carousel should feel like the clearest visual sequence for **this specific idea**, not like the idea was squeezed into a reusable social-media formula.

A debugging story may feel like an investigation.
A decision may feel like a tradeoff.
An explainer may feel like a mental model becoming clear.
A comparison may feel like criteria leading to a choice.
A case study may feel like evidence leading to a result.
An insight may be short and direct.

The format should serve the meaning, not control it.