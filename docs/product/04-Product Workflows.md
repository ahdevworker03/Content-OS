# 04 — Product Workflows

## 1. Purpose

This document defines the **user-facing product workflows** — how a user moves through the product to create, review, edit, validate, export, and eventually archive/publish content. It answers, from the user's perspective:

- what does the user do?
- what does the system do?
- where is human review required?
- where does AI assist?
- where does deterministic rendering/export matter?

This is **not** the internal framework prompt workflow (01–06). It is a product workflow document, not a database design, API spec, or implementation plan.

---

## 2. Workflow Principles

Every flow follows these rules:

- The user describes outcomes; the system handles implementation.
- The system plans before generating.
- AI output must become structured data before rendering.
- The user must be able to review and adjust direction before final generation.
- Preview must match export.
- Export must be deliberate and visible.
- Publishing is separate from export.
- Internal files, schemas, prompts, and terminal commands should stay hidden from normal users.
- The next goal is single-user self-service, not SaaS complexity.

---

## 3. Primary Workflow — Self-Service Carousel Creation

The core next-stage workflow:

```
Dashboard → New Carousel → Describe idea → AI brief → Approve / adjust
  → Generate content → Generate/select design → Preview/edit
    → Validate → Export
```

| Step | User action | System responsibility | Output |
|---|---|---|---|
| Dashboard | Open the product | Show current work and entry points | Starting view |
| New Carousel | Start a new post | Begin a new carousel | New carousel context |
| Describe idea | Write the idea naturally | Understand intent and context | Understood idea |
| AI brief | Review the brief | Produce a structured Content Brief | Content Brief |
| Approve / adjust | Accept or change direction | Update the brief | Approved brief |
| Generate content | Trigger generation | Produce structured slide content | Structured content |
| Generate/select design | Choose or accept design | Select layouts/theme per slide | Design data |
| Preview / edit | Review and edit | Render and reflect edits live | Preview |
| Validate | Run validation | Check renderability and quality | Validation result |
| Export | Confirm export | Produce deterministic assets | Final assets |

This is the core workflow the next product milestone must prove.

---

## 4. Step 1 — Dashboard

The **Dashboard** is the user's starting point.

The user should see:

- existing drafts/posts, if any
- a clear "New Carousel" action
- recent exported/published items, if available later
- simple status of current work

**Current stage:** the Dashboard may be very simple. It does not require accounts or multi-user workspaces. UI details are not designed here.

---

## 5. Step 2 — New Carousel

**New Carousel** is the creation entry point.

The user provides:

- idea or topic
- platform, if needed
- language/dialect, if needed
- optional style direction
- optional audience/context

The system should **not** ask for technical details like layout IDs, JSON fields, workflow prompt numbers, or renderer settings.

---

## 6. Step 3 — Describe Idea

The user describes the idea naturally — a rough thought, a learning moment, a project update, a lesson, a story, a business idea, or a professional insight.

System responsibility:

- understand intent
- identify likely audience
- identify format fit
- detect missing context
- ask one or few clarifying questions only when necessary

**Important:** do not force a long form before value is shown.

---

## 7. Step 4 — AI Brief

The system turns the raw idea into a concise **Content Brief**, including working title, core idea, target audience, angle, takeaway, tone, platform/format, suggested slide structure, design direction (if useful), and constraints or risks.

User action: approve, edit, regenerate, or change direction.

**Important:** the brief is the checkpoint before generating the full carousel. This preserves "structure before generation."

---

## 8. Step 5 — Approve / Adjust Direction

The user can accept the brief or change the angle, make it simpler/deeper, change tone, change audience, change language/dialect, change platform/format, or ask for another version.

The system should update the brief, keep changes understandable, and avoid generating final slides until the direction is accepted — unless the user requests a fast draft.

---

## 9. Step 6 — Generate Content

The system creates the carousel title, slide sequence, slide purpose per slide, slide copy, CTA/footer where relevant, and **structured Content Model data**.

**Important:** generated content should be structured, not just plain text. The system should preserve user voice/preferences, brand rules, platform constraints, and Content Model compatibility.

---

## 10. Step 7 — Generate / Select Design

The system uses slide purpose, content density, user design direction, brand/theme preferences, and available renderer-safe layouts to choose or suggest layout per slide, visual emphasis, theme or theme overrides, and spacing/content-density choices.

**Important:** Layout + Theme / Design Direction are **parallel rendering influences**. The system should not use arbitrary AI-generated CSS/React. Design choices must stay constrained and renderer-safe.

---

## 11. Step 8 — Preview / Edit

The user sees the rendered carousel preview and can navigate slides, edit copy, ask the AI to revise specific parts, change design direction, request slide-level changes, and compare before/after later if supported.

The system should update the preview immediately, keep preview matching export, preserve human control, and avoid exposing raw JSON/schema errors as the normal UX.

**Important:** the current Studio is the existing review/edit tool, but the future Product Application may persist edits and manage multiple posts later.

---

## 12. Step 9 — Validate

The system checks missing required content, unsupported layouts, too much content, layout overflow risk, inconsistent structure, export readiness, and possibly brand/tone issues later.

Validation should explain issues in user language, suggest fixes, allow AI-assisted repair, and avoid exposing internal schema complexity.

**Current Studio validation is advisory.** Future product validation may become stronger before export.

---

## 13. Step 10 — Export

The user chooses all or selected slides, and an output type such as PNG ZIP or PDF, depending on supported options.

The system produces deterministic final assets, ensures preview matches export, keeps guides/tool chrome out of output, shows progress/failure clearly, and avoids changing content during export.

**Export creates assets. Export is not the same as publication.**

---

## 14. Publication Workflow

**Current:** the user publishes manually, outside the product; the archive records that publishing happened.

**Future:** publishing integrations may exist later, but they are postponed until the single-user self-service creation loop works.

**Important:** the product should not silently publish content. Publishing requires explicit user confirmation.

---

## 15. Archive Workflow

**Archive** records what was actually published.

**Current:** stored under `content/published/<platform>/<YYYY-MM-DD-slug>/`, including content, structured JSON, metadata, and assets where applicable; `Posted Titles.md` helps prevent duplication.

**Future:** archive may become a product history view or database-backed record.

**Important:** archive should preserve the final published state, not an earlier draft.

---

## 16. Edit Existing Draft Workflow

The user opens a draft, previews it, edits copy or design direction, validates, and exports.

**Clarification:** the current Studio edits are in-memory. The future product may persist draft edits, but persistence infrastructure is not required yet unless the self-service loop needs it.

---

## 17. Regeneration Workflow

The user may request regeneration of the full post, a single slide, the title, tone changes, simplification, making content more professional, design-direction changes, or replacing a layout suggestion.

The system should preserve user-approved parts when requested, show what changed, keep output structured, and keep human review before export.

**Avoid:** destructive overwrite without confirmation, uncontrolled random regeneration, and silently losing previous user edits.

---

## 18. Validation / Repair Workflow

When validation finds an issue, the system explains it in plain language, and the user chooses a manual fix or AI repair. The system updates the structured content/design data, the preview updates, and validation reruns.

**Important:** validation repair should not expose JSON/schema internals unless in advanced/developer mode.

---

## 19. Design Adjustment Workflow

The user can say things like "make it cleaner", "use a darker style", "make this slide less crowded", "make it more educational", or "use my brand style".

The system translates this into design-direction updates, theme/token choices, layout changes, and visual-emphasis changes.

**Important:** design adjustment must stay renderer-safe. Free-form canvas editing is not promised.

---

## 20. Advanced / Developer Workflow

Advanced controls may expose structured data, layout choices, validation details, debug information, and export settings — but advanced mode must **not** be required for normal product use.

The current repository/Studio workflow may remain useful for development and power-user operation, but the self-service product should hide it from normal users.

---

## 21. Current Internal Workflow Mapping

A short continuity mapping between the current internal system and future product UX:

| Current Internal System | Future Product Experience |
|---|---|
| Workflow 01 — Idea Discovery | Describe Idea / capture idea |
| Workflow 02 — Content Planning | AI Brief |
| Workflow 03 — Post Content Builder | Generate Content |
| Workflow 04 — Render Validation | Preview / Validate |
| Workflow 05 — Export Assets | Export |
| Workflow 06 — Archive Published Post | Archive |

This section exists only to show continuity. The product UX must not expose these workflow numbers to normal users.

---

## 22. Non-Goals

This document does not define database schema, API endpoints, authentication, roles, billing, team workflows, package structure, UI screen layouts, detailed implementation tasks, or social-media scheduling.

---

## 23. Success Criteria

The workflows succeed when a single user can:

- start from an idea
- receive a useful brief
- approve or adjust direction
- generate a complete carousel
- receive sensible layout/theme decisions
- preview the carousel
- edit copy or ask for revisions
- validate the result
- export final assets

**without** opening Markdown files, editing JSON, running internal workflow prompts manually, using a terminal, or understanding renderer internals.

---

## 24. Summary

The product workflow should feel like a simple creation loop for the user, while the system quietly performs planning, structured generation, guarded design selection, deterministic rendering, validation, and export underneath.