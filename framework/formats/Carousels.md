# Carousels

Carousels are a visual format for making a technical or product idea easy to follow.
They can explain a system, a decision, a tradeoff, a pattern, or a real development experience.

## What Problems a Carousel Solves

Carousels transform a real problem or idea into a shareable, structured narrative.
They are chosen when the reader needs to follow the reasoning, not just see the conclusion.

Carousels are best for:

- Concepts and system behavior
- Technical or product explanations
- Comparisons and tradeoffs
- Decisions and thought processes
- Debugging patterns
- Reflections when the experience itself adds value

---

## What Defines a Good Carousel

A good carousel respects the reader's time. Every slide must advance the narrative; remove any slide that only repeats or pads.

- The trigger must be specific enough to anchor an entire carousel. A generic trigger produces a generic carousel.
- The explanation must be grounded in real code, project work, supplied evidence, or an approved source. Hypothetical examples weaken the format.
- Each slide introduces exactly one idea. A slide that tries to do two things does neither.
- Use project context or evidence when it proves the point; do not force a personal project update into a broader explanation.
- The CTA invites peer discussion, not feedback for the creator.

## Personal Account Renderer Layouts

For the `abdallahhassoun.dev` carousel renderer, each slide selects one Content Model `layout`: `cover`, `story`, `focus`, `sequence`, `comparison`, `evidence`, or `closing`. Choose after deciding what the slide must do. Reuse or omit compositions as needed; this is not a fixed slide sequence or count. These styles apply to this personal account and are not a default theme for other Content OS users. Workflow 04 and the Content Model define the authoring fields.

Use `evidence` only for supplied, approved code or a local image/screenshot. A diagram must be supplied and identified as conceptual. Renderer assets live under `production/workspace/evidence/` and are referenced with paths such as `evidence/screenshot.png`. Never invent proof.

---

## 1) Educational Documentation

### Purpose

Explain a concept from the perspective of a developer working through it.

### Structure (Mandatory)

1. **Slide 1: Hook** (The "Facepalm" or "Aha!" moment)
2. **Slide 2: The Trigger** (The specific bug, lecture, or project feature that forced me to learn this)
3. **Slides 3-X: Body** (Explain the system, decision, or concept with concrete reasoning)
4. **Slide X-1: Evidence or context** (A real project example, supplied evidence, or a concise limitation when it helps)
5. **Slide X: Community CTA** (Beginner-friendly question: "What part of this is still confusing?")

### Possible ideas

- Programming fundamentals
- Computer Science basics
- Operating systems
- Linux concepts
- Git and GitHub
- Web development basics
- Databases
- API concepts
- Authentication
- CRUD
- State and props
- Browser behavior
- Deployment basics
- Development tools
- Software engineering fundamentals

### Format Constraints

- Every slide must serve the narrative progression. Remove any slide that does not advance the explanation.
- The concept must be supported by real code, project work, supplied evidence, or an approved source — no hypothetical examples.
- Use a project example when it improves the explanation; do not make the post an update about the creator unless that is the intended subject.
- The CTA must invite peer discussion, not feedback-for-the-creator.

For writing style, tone, and voice guidelines — including plain language, jargon handling, and teaching tone — refer to `Brand Strategy.md`.

### What to Avoid

- A carousel that explains a concept without showing it in your own code.
- Slide sequences that repeat the same point — each slide should introduce new information or a new perspective.
- Starting without a trigger. Carousels must originate from a real learning moment.
- For voice-related constraints (teaching tone, over-explanation, jargon), refer to `Brand Strategy.md`.

---

## 2) Education + Personal Opinion

### Purpose

Explain a topic with practical context when that context adds value.

### What these posts should do

- Explain the relevant concept, system behavior, or tradeoff
- Show why it matters in practical work
- Add personal context only when it clarifies the reasoning
- Compare expectations and reality when the contrast teaches something useful

### Structure

Follow the same structure (Hook → Trigger or problem → Body → Evidence or context → CTA). The body should prioritize the explanation; personal reaction is optional.

### Distinction from Educational Documentation

This type adds context when it improves the explanation. It is not a requirement to center feelings, progress, or the creator's story.

---

## 3) Project Thinking and Product Building

### Purpose

Document how I think about problems as a developer who builds and studies.

### What to include

- The problem I was trying to solve
- The approaches I considered and why I chose one
- What I learned from the implementation
- What I would do differently next time

### Structure

This type does not require a full Hook → Trigger → Body → Project Bridge → CTA sequence. A simpler structure works:

1. **Context:** What problem I was working on
2. **Thought process:** How I approached it
3. **Outcome:** What happened and what I learned

### Constraint

The thinking must be visible, not abstract. Include code snippets, architecture sketches, or decision logs. If the thinking cannot be shown, it is not ready for this format.

---

## 4) Project Documentation

### Purpose

Document the progress of my own project in public.

### Format Guidelines

- Grounded in actual work — show real commits, real decisions, real tradeoffs.
- The progress or problem must be visible, not abstract. Include screenshots, code diffs, or architecture sketches.
- Follow the same mandatory structure (Hook → Trigger → Body → Project Bridge → CTA) with the project as context.
- For writing style and tone, refer to `Brand Strategy.md`.

### Distinction from Project Thinking

Project Documentation shows what happened in the project. Project Thinking shows how the decision was made. The same project moment can be two different carousels — one documenting the feature, another explaining the reasoning behind it.
