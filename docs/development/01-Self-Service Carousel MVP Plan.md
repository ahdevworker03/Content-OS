# 02 — Self-Service Carousel MVP Plan

## 1. Purpose

This file defines the **practical development plan** for the next milestone: proving a single-user self-service carousel creation loop. It connects the product documents to an implementation direction without prescribing detailed code structure.

---

## 2. Target Outcome

A single user can open the app, describe a carousel idea, receive an AI-generated brief, approve or adjust it, generate structured carousel content, receive safe layout/theme decisions, preview/edit the carousel, validate it, and export final assets.

The user should not need to:

- edit Markdown
- edit JSON
- run agent workflow prompts manually
- use a terminal
- understand renderer internals
- understand layout IDs (unless using advanced controls)

---

## 3. Current Assets to Reuse

Reuse before inventing new infrastructure:

- current framework documents as the content-intelligence source
- current Content Model as the authoring/content contract
- current `content/` file lifecycle as temporary persistence
- current `production/workspace/carousel.json` as the active-carousel bridge
- current Adapter (Content Model → Renderer Models)
- current Renderer Models
- current deterministic renderer
- current Studio preview/edit/export surface
- current validation
- current Studio Export Modal
- current Playwright export pipeline

---

## 4. MVP Workflow

```
Dashboard → New Carousel → Describe Idea → AI Brief → Approve / Adjust
  → Generate Content → Generate / Select Design → Preview / Edit
    → Validate → Export
```

| Step | User action | System action | Implementation direction | Output |
|---|---|---|---|---|
| Dashboard | Enter the app | Show starting view | Simple entry screen in current app | Dashboard |
| New Carousel | Start a post | Begin carousel context | Idea form, no technical fields | New carousel |
| Describe Idea | Write the idea | Understand intent | Natural-language input | Understood idea |
| AI Brief | Review brief | Produce Content Brief | Use framework guidance | Content Brief |
| Approve / Adjust | Accept or edit | Update brief | Brief edit/regenerate | Approved brief |
| Generate Content | Trigger | Generate structured content | Produce Content Model data | Structured content |
| Generate / Select Design | Accept design | Choose safe layout/theme | Renderer-safe decisions | Design data |
| Preview / Edit | Review/edit | Render live | Reuse Studio | Preview |
| Validate | Run validation | Check readiness | Human-language validation | Validation result |
| Export | Confirm export | Produce assets | Studio modal / Playwright | Final assets |

---

## 5. Phase 1 — App Entry and Dashboard

**Goal:** create a simple product entry point before the Studio/editor.

**Scope:** a simple Dashboard screen with a clear New Carousel action, showing the current active draft/carousel if available, and a simple status (draft, preview-ready, exported if known). No accounts, no multi-user workspace.

**Implementation direction:** can live inside the current app structure; do not split into `apps/web`; no auth; keep routing minimal.

**Deliverable:** the user can enter the product from a normal starting screen instead of opening directly into the Studio.

---

## 6. Phase 2 — New Carousel / Idea Input

**Goal:** let the user start from natural-language input.

**Scope:** idea/topic input; optional platform; optional language/dialect; optional audience/context; optional design direction; a submit action.

**Avoid asking for:** JSON fields, layout IDs, workflow numbers, renderer settings.

**Deliverable:** the user can describe the post idea without touching framework files.

---

## 7. Phase 3 — AI Brief Generation

**Goal:** turn the raw idea into a structured Content Brief — working title, core idea, audience, angle, takeaway, tone, platform/format, suggested slide structure, design direction, and constraints/risks.

**Implementation direction:** use the existing framework guidance as the intelligence source; keep output structured; allow regeneration or editing before full content generation.

**Deliverable:** the user sees and can approve/adjust a brief before generation.

---

## 8. Phase 4 — Content Generation

**Goal:** generate carousel content from the approved brief — carousel title, slide sequence, slide purpose, slide copy, CTA/footer, and Content Model-compatible structured output.

**Implementation direction:** generated output must become Content Model data; do not generate raw renderer data directly; do not bypass the Adapter; preserve the Content Model → Adapter → Renderer Models boundary.

**Deliverable:** a generated carousel exists as structured Content Model-compatible data.

---

## 9. Phase 5 — Design Planning

**Goal:** generate or select renderer-safe design decisions — layout per slide, visual emphasis, theme/default style, design-direction interpretation, and content-density decisions.

**Implementation direction:** use only supported renderer-safe layouts; do not allow arbitrary AI-generated CSS or React; Design Direction is user language; theme/layout data must remain structured.

**Deliverable:** generated content has safe layout/theme decisions ready for preview.

---

## 10. Phase 6 — Workspace Bridge

**Goal:** bridge generated structured content into the current renderer workflow.

**Scope:** write/update the active carousel data used by the renderer; preserve `production/workspace/carousel.json` as the current active-carousel mechanism; ensure generated data maps through the existing Adapter; keep fallback/dev sample behavior intact.

**Implementation direction:** no database yet; no multi-post persistence yet; no repository restructure; use the simplest file-based bridge that proves the loop.

**Deliverable:** the generated carousel can load in the current Studio/renderer.

---

## 11. Phase 7 — Preview / Edit

**Goal:** reuse the current Studio for review and editing.

**Scope:** preview the generated carousel; edit slide copy; navigate slides; keep preview matching export; keep existing Studio safety/guide behavior.

**Important:** the current Studio edits are in-memory. Do not add persistence unless the MVP cannot work without it.

**Deliverable:** the user can review and adjust the generated carousel visually.

---

## 12. Phase 8 — Validation / Repair

**Goal:** make validation useful in product language.

**Scope:** show missing copy, unsupported layout, too much content, overflow/rendering risk, and export readiness; optional AI-assisted repair.

**Implementation direction:** validation should explain problems in human language; do not expose JSON/schema complexity to normal users; repair must update structured content/design data, not random UI state.

**Deliverable:** the user can see whether the carousel is ready and fix issues before export.

---

## 13. Phase 9 — Export

**Goal:** preserve deterministic export.

**Scope:** export selected or all slides; PNG ZIP as primary; PDF as secondary if already supported; keep guides/chrome out of output; show loading/failure state.

**Implementation direction:** do not modify the frozen renderer/export behavior unnecessarily; preview must match export; export must not change content.

**Deliverable:** the user gets final assets from the generated carousel.

---

## 14. Phase 10 — Archive / Publication Recording

**Goal:** keep publication separate from export.

**Scope:** export creates assets; publication remains manual/outside the product for now; archive may record the final published state.

**Implementation direction:** do not add publishing integrations; do not silently publish; the current archive structure may remain.

**Deliverable:** published content can still be archived without turning export into publishing.

---

## 15. What Must Stay Hidden from Normal Users

Normal users should not see or need: internal workflow numbers, Markdown framework files, raw Content Model JSON, Renderer Models, Adapter details, layout IDs as required input, terminal commands, Playwright export details, or schema errors as primary UX.

Advanced/developer mode may expose some of these later, but not in the normal flow.

---

## 16. Explicit Non-Goals

This milestone does not include:

- user accounts
- authentication
- roles/permissions
- billing
- subscriptions
- teams
- multi-user workspaces
- database-backed persistence
- publishing integrations
- scheduling
- analytics
- collaboration
- package splitting
- full version history
- enterprise asset management

**Reason:** none of these prove the single-user self-service carousel creation loop.

---

## 17. Technical Guardrails

1. Do not bypass the Content Model.
2. Do not bypass the Adapter.
3. Do not make layouts consume Content Model fields directly.
4. Do not make layouts stateful or data-loading.
5. Do not introduce arbitrary AI-generated CSS/React.
6. Do not break preview/export equivalence.
7. Do not let Studio chrome or safety guides leak into export.
8. Do not persist edits silently.
9. Do not restructure the repo before a real product need.
10. Do not expose internal complexity to normal users.

---

## 18. Testing / Verification

Must verify:

- the app builds
- the existing Studio still works
- renderer output is unchanged unless intentionally changed
- the generated carousel loads
- the Adapter maps generated Content Model data correctly
- unsupported layouts degrade gracefully
- preview updates after edits
- validation shows useful messages
- export ZIP works
- export PDF works if supported
- exported assets do not include guides/chrome
- preview and export still match
- no user flow requires Markdown/JSON/terminal

This is not a full test strategy — only what this milestone must prove.

---

## 19. Completion Criteria

The milestone is complete when a user can:

- start from the app
- create a carousel from an idea
- approve or adjust an AI brief
- generate structured content
- receive safe layout/theme choices
- preview the result
- edit content
- validate readiness
- export assets

**without** leaving the product flow or touching internal files manually.

---

## 20. Risks

| Risk | Mitigation |
|---|---|
| Turning the MVP into SaaS infrastructure | Keep the non-goals list; ship the single-user loop only |
| Bypassing the Content Model/Adapter boundary | Enforce guardrails; route generation through the Content Model |
| Making the Studio responsible for too much | Studio stays a review/edit/export surface; orchestration lives in the product flow |
| Making AI output uncontrolled | Keep AI inside structured guardrails; require structured output |
| Creating a generic chatbot instead of a structured workflow | Keep Structure-before-generation; the brief is a checkpoint |
| Adding persistence too early | Reuse the file-based bridge; add persistence only when the loop needs it |
| Weakening deterministic export | Do not change frozen renderer/export behavior; preview must equal export |
| Exposing internal complexity to users | Keep advanced internals hidden; human-language validation |

---

## 21. Implementation Order

1. Dashboard shell
2. New Carousel / idea form
3. AI Brief generation path
4. Brief approval/editing
5. Content generation to Content Model
6. Design planning/layout selection
7. Workspace bridge
8. Studio preview/edit integration
9. Validation/repair polish
10. Export verification
11. Archive/publication handoff

This is an order of work, not a detailed task breakdown.

---

## 22. Summary

The MVP should prove the simplest complete self-service loop while reusing the current Content OS, Content Model, Adapter, Studio, renderer, and export pipeline. The product should become easier for the user without making the architecture heavier than needed.