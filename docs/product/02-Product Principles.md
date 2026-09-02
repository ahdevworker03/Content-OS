# 02 — Product Principles

## 1. Purpose

This document defines the **principles used to judge product decisions**. It answers four questions about any proposed feature or change:

- Should this feature exist?
- Should this complexity be exposed to the user?
- Does this help the self-service creation loop?
- Does this preserve reliable output?

It is a product decision rulebook, not a technical implementation plan.

---

## 2. Principle 1 — Non-technical users first

The product must be usable by people who are not experts in prompt engineering, copywriting, visual design, content-production tooling, JSON/schema editing, or renderer/layout internals.

Implications:

- use plain language
- avoid exposing workflow numbers
- avoid requiring technical terms
- keep advanced controls optional
- default to guided decisions

---

## 3. Principle 2 — Describe outcomes, not implementation

Users should describe what they want to communicate or change.

Good user requests:

- "Make this more professional."
- "Use a clean dark style."
- "Make slide 3 shorter."
- "Make this carousel more educational."
- "Use my normal brand style."

Bad required user knowledge:

- layout IDs
- JSON fields
- CSS tokens
- workflow prompt numbers
- adapter/renderer details

The system translates outcome-language into structured decisions.

---

## 4. Principle 3 — Structure before generation

The system should understand and plan before producing final content.

Expected order:

```
Idea → brief → content structure → slide copy → layout/design decisions → rendered preview
```

Reason: this avoids random AI output and preserves content quality. The system should not jump directly from a vague prompt to final slides, unless the user explicitly asks for a fast draft.

---

## 5. Principle 4 — AI works inside guardrails

AI should produce structured decisions inside known rules.

AI may help with:

- idea clarification
- content brief generation
- copywriting
- slide structure
- layout suggestions
- design direction
- revision requests

AI should not directly own:

- arbitrary DOM/CSS generation
- uncontrolled renderer changes
- hidden publishing actions
- destructive changes without confirmation

AI output should pass through validation and deterministic rendering.

---

## 6. Principle 5 — Content and design are connected

The product should not treat copy and design as separate disconnected steps.

Each slide has a purpose: hook, context, problem, realization, example, takeaway, or CTA.

The system should choose layout and visual emphasis based on slide purpose.

Example: a comparison slide should not use the same structure as a final CTA slide.

---

## 7. Principle 6 — Deterministic rendering is a product feature

Once content and design data are approved, the renderer should produce predictable output.

The user should trust:

- preview matches export
- export does not change wording or layout unexpectedly
- guides never leak into output
- zoom does not affect export
- rendering is repeatable

This principle comes from the existing renderer and Studio architecture.

---

## 8. Principle 7 — Human review remains part of quality

The system should automate generation and validation, but not remove user judgment.

Human review catches:

- tone issues
- awkward phrasing
- dialect problems
- visual balance
- brand fit
- whether the post feels authentic

The user should always be able to review, edit, regenerate, or reject before export/publish.

---

## 9. Principle 8 — Personalization without complexity

The product should learn or store user preferences over time, but avoid forcing setup complexity.

Useful personalization:

- brand identity
- audience
- tone
- language/dialect
- preferred formats
- saved design style
- recurring CTA/footer preferences

Setup must stay lightweight. A user should be able to start with one idea before configuring a full brand profile.

---

## 10. Principle 9 — Guided design freedom

Users should be able to influence visual style without becoming designers.

Allowed direction:

- style presets
- saved brand themes
- natural-language design requests
- simple controls for color, typography, spacing, and tone

Avoid:

- arbitrary free-form canvas editing as the core workflow
- requiring users to understand layout internals
- letting AI generate uncontrolled CSS/React
- turning the product into Figma/Canva too early

Design freedom should be constrained through themes, tokens, layouts, and safe renderer primitives.

---

## 11. Principle 10 — Self-service loop before SaaS complexity

The next product goal is **not** multi-tenancy.

The next goal is: a single user can create, review, edit, validate, and export a carousel entirely through the application.

Postpone until that loop works:

- accounts
- authentication
- workspaces
- teams
- billing
- subscriptions
- tenant-level quotas
- complex publishing integrations
- production-scale AI infrastructure

This principle is strict.

---

## 12. Principle 11 — Keep current architecture valid while evolving it

The current file-based Content OS is not a mistake. It is the working prototype of the product logic.

Current systems may remain while the product evolves:

- framework Markdown
- content files
- workspace carousel JSON
- manual workflows
- Playwright export
- Studio/renderer co-location

Changes should be driven by real product needs, not by trying to prematurely look like a SaaS architecture.

---

## 13. Principle 12 — Advanced power should not block simple use

Advanced controls can exist, but the main workflow must stay simple.

Good:

- advanced layout controls hidden behind an advanced panel
- technical debug tools only in development
- structured data visible only when useful

Bad:

- requiring the user to edit JSON
- requiring layout IDs to create a post
- exposing schema errors as the main UX
- forcing users through setup before creation

---

## 14. Decision Checklist

Use this for any future feature:

1. Does this help the user create better content from an idea?
2. Does it reduce or increase required technical knowledge?
3. Does it keep the self-service loop simpler?
4. Does it preserve deterministic preview/export?
5. Does it keep AI inside structured guardrails?
6. Does it preserve human review before final output?
7. Does it belong now, or is it SaaS complexity too early?
8. Can this be done without exposing internal files, prompts, JSON, or renderer details?
9. Does it respect the current architecture instead of forcing a speculative refactor?
10. Would a low-technical user understand what to do?

---

## 15. Anti-Principles

The product should avoid:

- AI-generated content with no planning
- exposing internal workflow mechanics to users
- arbitrary AI-generated CSS or component code
- premature multi-tenancy
- making the Studio into a full design app too early
- treating export as an afterthought
- removing human review
- optimizing for developer convenience over creator clarity
- adding features because they are technically interesting

---

## 16. Summary

The product should make content creation feel simple while keeping structure, intelligence, validation, and deterministic rendering underneath.