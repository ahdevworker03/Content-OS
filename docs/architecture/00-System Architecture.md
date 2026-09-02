# 00 — System Architecture

## 1. Purpose

This document is the architectural source of truth for the Content OS repository. It governs what each part of the repository is responsible for, how the parts relate to one another, and — just as importantly — which future changes are intentionally **not** being made yet.

It exists so that:

- contributors can place new work in the right area,
- the current, working architecture is not mistaken for the future target,
- speculative restructuring is resisted until a real product need justifies it.

This document describes **current** architecture and the **target** direction. It does not prescribe implementation details, database schemas, APIs, or package choices.

---

## 2. Current System Overview

The repository is currently a **personal, agent-driven Content OS** — a system for producing authentic social-media content from real learning/building moments, built around one creator.

It is several things at once, living together in a single repository:

- **A content-generation framework** — strategy, voice, format, and workflow documents that instruct an LLM agent.
- **A file-based content lifecycle** — ideas, drafts, and published posts stored as files.
- **A Studio application** — a browser tool for previewing, inspecting, editing, and exporting carousel slides.
- **A deterministic carousel renderer** — converts structured carousel data into visual slides.
- **An export pipeline** — produces final PNG slide assets.

All of these currently live in one repository because the product is still a single-creator workflow. This co-location is deliberate, not an accident.

---

## 3. Top-Level Repository Responsibilities

### `.opencode/`
Agent configuration and skills. Holds the writing/consultation skills that shape content quality (voice, Arabic, technical language, carousel copy, LinkedIn reflection, strategy, review).

**Belongs here:** agent skills and any agent tooling.
**Does not belong here:** product application code, renderer code, content artifacts, framework documents.

### `framework/`
The content-intelligence layer — strategy, format rules, workflow prompts, the content model, and published-content memory. See §4.

**Belongs here:** anything that defines *how content is decided and written*.
**Does not belong here:** rendered assets, application code, final content.

### `content/`
The file-based content persistence layer — ideas, drafts, published archive. See §5.

**Belongs here:** content the system produces and archives.
**Does not belong here:** framework rules, renderer code, tooling.

### `production/`
The production/tooling layer — renderer, workspace, export pipeline. See §6.

**Belongs here:** code that transforms structured content into visual/exported output.
**Does not belong here:** brand strategy, content rules, final published content.

### `docs/`
Documentation organized by concern: `product/`, `architecture/`, `design/`, `development/`.

**Belongs here:** documents about the system itself.
**Does not belong here:** framework rules (those live in `framework/`), or content artifacts.

### Root `README.md`
The entry point for a human or agent reading the repository. It describes the structure and how the pieces fit, but is **not** the source of truth for any single subsystem — those live in their own documents.

---

## 4. `framework/` Responsibility

`framework/` is currently the **content-intelligence layer**. It contains everything that decides *what* content to make and *how* it should sound:

- **strategy** — brand identity (`Brand View.md`) and voice (`Brand Voice.md`).
- **format rules** — `Carousels.md`, `Reels.md`, `Stories.md`.
- **planning rules** — `Content Format.md` and `Content Pipeline.md` (the lifecycle).
- **workflow prompts** — `01`–`06`, the agent-executed steps from idea to archive.
- **content model** — `Content Model.md`, the canonical structured contract.
- **published-title memory** — `Posted Titles.md`, the duplication-prevention index.

Much of this is currently expressed as **Markdown** because the system is still file-based and agent-driven. The Markdown documents are the working implementation of the intelligence layer, not just documentation of it.

---

## 5. `content/` Responsibility

`content/` is the current **file-based content persistence layer** for the content lifecycle:

```
ideas → drafts → published
```

- `content/ideas/` — captured content ideas awaiting planning.
- `content/drafts/` — working drafts produced by the content builder.
- `content/published/` — the published archive, one folder per post under `content/published/<platform>/<YYYY-MM-DD-slug>/`.

For the current single-user Content OS, file-based persistence is appropriate and sufficient. It is **not** the permanent persistence architecture for a future SaaS product — that would move to a database. Until then, files remain the source of truth.

---

## 6. `production/` Responsibility

`production/` is the **production/tooling layer**:

- **`production/renderer/`** — the React carousel renderer and the Studio application (see §7).
- **`production/workspace/`** — the active carousel working data (`carousel.json`), served to the renderer.
- **`production/export/`** — the Playwright PNG export pipeline (`export-config.js`, `export-slides.js`).

The production layer transforms structured content into visual output. It does not decide content strategy, brand voice, or format rules — those live in `framework/`.

---

## 7. Studio and Renderer Co-location

The **Studio application** and the **renderer** currently live together under `production/renderer/`. This is intentional for the current stage.

They have different conceptual responsibilities:

**Studio** (user-facing):
- editing and preview
- content inspection
- design controls (layout guides, zoom)
- export interaction (the in-browser Export modal)

**Renderer** (deterministic):
- conversion of structured carousel data into visual slides
- the frozen `/export` route used by the export pipeline

They are already *conceptually* separated in the code (the renderer has no knowledge of the Studio). Physical separation into distinct packages is **postponed** until product growth justifies it — it is not required today.

The current Studio is part of the file-based Content OS: a review/editing environment, primarily in-memory, tied to one active-carousel workflow, and governed by the current Studio architecture/UX documents. These constraints are **current**, not permanent.

A future self-service **Product Application** may persist edits, manage multiple posts, provide AI-assisted editing and design customization, manage user brand preferences, and absorb or replace parts of the current Studio workflow. Current Studio constraints are therefore **not automatically permanent product constraints** — the existing Studio documents remain correct for the current Studio.

---

## 8. Content Model Boundary

The system has three related but distinct data contracts, arranged in this flow:

```
Content Intelligence
  → Content Model
    → Adapter
      → Renderer Models
        → Studio / Renderer
```

- **`framework/model/Content Model.md`** — the canonical **authoring/content contract**. Content generation writes data that conforms to it; validation checks against it; export and archive store it (`content.json` / `metadata.json`). It is the single source of truth for what a content item *is*.
- **Adapter layer** (`mapWorkspaceCarousel.ts`) — the boundary that understands both schemas. It translates Content Model workspace data into renderer data.
- **Renderer models** (`Carousel`, `SlideData`) — the canonical **presentation/runtime contract** used by the Studio and the renderer.

The Studio and the renderer do **not** consume the Content Model directly — they consume the renderer models after the adapter has translated them.

Today the Content Model is a Markdown document plus an embedded JSON Schema expression. A future implementation may move the schema into code, JSON Schema files, Zod, or similar — but until then, `Content Model.md` remains the single source of truth for the authoring contract.

---

## 9. Current Persistence Model

Current persistence is file-based:

- ideas → Markdown (`content/ideas/…`)
- drafts → Markdown (`content/drafts/…`)
- active carousel → `production/workspace/carousel.json`
- published posts → `content/published/<platform>/<YYYY-MM-DD-slug>/` (`content.md`, `content.json`, `metadata.json`, `assets/`)
- published-content index → `framework/memory/Posted Titles.md`

Note: `production/workspace/carousel.json` is the current **single-active-carousel working mechanism**. It holds exactly one carousel at a time and is not suitable as primary persistence for multi-post or multi-user use. When persistent multi-post management arrives, it will stop being the product's primary persistence mechanism — though it may remain useful as a development fixture, renderer input, test fixture, or debugging tool.

---

## 10. Current Export Architecture

Export is deterministic and separate from content-generation intelligence:

- **Studio preview** — the user-facing "what will this look like" view.
- **`/export` route** — a frozen render of all slides at full scale, guides disabled.
- **Playwright pipeline** (`production/export/`) — headless capture of the `/export` route into PNGs.
- **final PNG assets** — the deliverable slide images.
- **archived assets** — the same PNGs copied into `content/published/…/assets/` on archive.

The export path does not contain content intelligence. It renders whatever structured data it is given; content decisions happen upstream in `framework/`.

---

## 11. Transitional Architecture

The following parts are **transitional** — appropriate for the current stage, but expected to evolve:

- Markdown-based strategy and prompts
- file-based content persistence
- the single global carousel workspace
- Studio/renderer co-location
- the manual, agent-driven workflow (run prompts 01 → 06 by hand)
- the repository-based archive and published-title index

These are not architectural mistakes. They are the simplest correct implementation for a single-creator, agent-assisted workflow. Each will change only when the product genuinely requires it.

---

## 12. Target Self-Service Product Architecture

The target direction is a **self-service creator application**: a user describes a moment, and the product turns it into publishable content without the user touching framework files or terminals.

Conceptual flow:

```
User request
  → product application
    → content planning
      → content generation
        → design planning
          → Content Model
            → renderer
              → preview / edit
                → validation
                  → export / publish
```

In the target, the user should **not** need to interact with:

- Markdown framework files
- JSON files
- agent prompts
- terminal commands
- renderer internals

The intelligence layer stays, but it becomes internal to the product rather than something the user reads and runs manually.

---

## 13. Future Product Boundaries

Likely conceptual boundaries in the future (described, not implemented):

- **Product Application** — the user-facing entry point and workflow orchestration.
- **Content Intelligence** — strategy, voice, planning, and generation (today's `framework/`).
- **Design Intelligence** — visual/design decisions that shape how content looks.
- **Content Model / shared schema** — the canonical contract, likely promoted to typed code.
- **Renderer** — deterministic structured-data → visual-slide conversion.
- **Persistence** — replacing file storage with a proper store.
- **Export / Asset generation** — producing final assets across formats.

No exact packages or frameworks are prescribed here. These boundaries exist to guide evolution, not to mandate an implementation.

---

## 14. Explicitly Postponed Architecture Changes

The following are **intentionally NOT** being implemented yet:

- a separate `apps/web` application
- a separate renderer package
- database-backed persistence
- user accounts
- authentication
- multi-tenancy
- teams / workspaces
- production-scale / multi-user AI orchestration infrastructure
- billing / subscriptions
- publishing integrations

The next self-service milestone is allowed to include **simple single-user AI orchestration** — idea understanding, content planning, content generation, design planning, and structured Content Model generation — because the core loop depends on it.

What remains postponed is the heavy infrastructure around it: distributed job queues, complex background processing, retry infrastructure, tenant-level AI usage quotas, provider abstraction layers, large multi-agent orchestration systems, and AI usage metering/billing.

**Reason:** the next goal is to prove a self-service, single-user carousel-creation workflow first. Multi-user concerns would add complexity before the core loop is validated.

---

## 15. Architectural Evolution Rule

> Do not restructure the repository toward the final SaaS architecture before a real product requirement justifies the change.

Architecture evolves from real product needs, not from speculative future complexity. If a proposed change is only needed "eventually," it does not need to be made now.

---

## 16. Current-to-Target Summary

| | |
|---|---|
| **Current** | Agent-driven Content OS + Studio + deterministic renderer |
| **Target** | Self-service creator application powered by content intelligence + deterministic rendering |

The repository is valid as-is. The target is a direction, not an immediate mandate.
