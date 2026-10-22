# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content framework** for a Lebanese Computer Science student who documents his learning journey in public. The framework produces authentic, student-perspective content across Instagram Carousels and LinkedIn posts.

The system is organized into four main top-level directories: **`framework/`** (brand strategy, formats, workflows, content model, memory), **`content/`** (ideas, drafts, and published archive), **`production/`** (renderer, workspace, export pipeline), and **`docs/`** (product, architecture, design, and development documentation). It is AI-assisted — the framework documents serve as instruction sources for an LLM content generation agent.

Design philosophy: every piece of content originates from a real trigger (a bug, a lecture, a project issue), passes through a consistent brand lens, is refined through explicit editorial quality gates, and is adapted per-format and per-platform rather than copied.

---

## Repository Overview

```
Social Media Content/
├── .agents/                               # Codex project guidance
│   └── skills/                             # Repository-specific agent skills
│       ├── lebanese-arabic-writing/SKILL.md
│       ├── arabic-technical-language/SKILL.md
│       ├── carousel-copy-polish/SKILL.md
│       ├── content-strategist/SKILL.md
│       ├── content-editor/SKILL.md
│       ├── content-reviewer/SKILL.md
│       └── content-refinement/SKILL.md
├── framework/                              # Brand strategy, formats, workflows, model, memory
│   ├── strategy/                           # Creator identity and voice
│   │   └── Brand Strategy.md               # Creator identity, voice, tone, and platform rules
│   ├── formats/                            # Content format definitions
│   │   ├── Carousels.md                    # Carousel types and structure
│   │   └── linkedin.md                     # LinkedIn post writing and format rules
│   ├── workflows/                          # Lifecycle, numbered workflows, and idea capture rules
│   │   ├── Content Lifecycle.md            # Format selection, lifecycle, stage ownership, editorial gates
│   │   ├── Content Creation Playbook.md    # Plan, create, refine, validate, export, and archive
│   │   └── Content Idea Capture Rules.md   # Manual and automatic idea persistence rules
│   ├── model/                              # Canonical content data model
│   │   └── Content Model.md                # Content Item JSON Schema, renderer interface
│   └── memory/                             # Published content index
│       └── Posted Titles.md                # Duplication prevention lookup table
│
├── content/                                # Content lifecycle artifacts
│   ├── ideas/                              # Captured content ideas
│   ├── drafts/                             # Canonical source and approved standalone variants
│   │   ├── post.md                         # Generated canonical draft (Workflow 03; present when active)
│   │   └── format/
│   │       ├── carousel.md                 # Generated Carousel adaptation (Workflow 04; when approved)
│   │       └── linkedin.md                 # Generated LinkedIn adaptation (Workflow 04; when approved)
│   └── published/                          # Exact published variants by platform
│       ├── instagram/                      # Variant-specific content/metadata; Carousel JSON/assets only for Carousel
│       ├── linkedin/                       # Standalone LinkedIn post content and metadata
│
├── production/                             # Render and export tooling
│   ├── renderer/                           # React carousel renderer + Studio (Vite + React + TypeScript)
│   │   ├── src/
│   │   │   ├── renderer/                   # Renderer engine and its owned models/layouts/components/data
│   │   │   ├── studio/                     # Studio review/edit/export tooling
│   │   │   └── export-view/                # Frozen /export route
│   │   ├── package.json                    # Renderer dependencies and scripts
│   │   └── vite.config.ts                  # Vite config (serves ../workspace as /carousel.json)
│   ├── workspace/                          # Active carousel data
│   │   └── carousel.json                   # Content Model carousel, served as /carousel.json
│   └── export/                             # Playwright PNG export pipeline
│       ├── export-config.js                # Export settings (URL, viewport, selector, output)
│       └── export-slides.js                # Screenshots .slide → PNGs
│
├── docs/                                   # Project documentation by concern
│   ├── product/                            # Product-level docs (roadmap, requirements)
│   ├── architecture/                       # System, renderer, and Studio architecture
│   ├── design/                             # Studio design system and UX guidance
│   └── development/                        # Development guides and implementation plans
│
└── README.md                               # This file
```

---

## Folder-by-Folder Breakdown

### `framework/` — Strategic Core

Five subdirectories organize the framework files by concern:

| Subdirectory | File                            | Description |
| ------------ | ------------------------------- | ----------- |
| `strategy/`  | `Brand Strategy.md`             | Creator identity, audience, content boundaries, pillars, voice, tone, style, and platform rules. Owns who the creator is and how they write. |
| `formats/`   | `Carousels.md`                  | Carousel types, structure, renderer layouts, and format constraints. |
|              | `linkedin.md`                   | LinkedIn post structure, voice, reflection, and writing constraints. |
| `workflows/` | `Content Lifecycle.md`          | Trigger-first format selection and the canonical lifecycle from Idea through exact-variant archive, including stage ownership and editorial quality gates. |
|              | `Content Creation Playbook.md`  | Seven stage instructions grouped by planning, creation, editorial refinement, conditional Carousel production, and archiving. |
|              | `Content Idea Capture Rules.md` | Rules for persisting selected ideas and project-agent idea capture. |
| `model/`     | `Content Model.md`              | Structured Carousel contract and renderer interface. The workspace carousel (`production/workspace/carousel.json`) conforms to this model. |
| `memory/`    | `Posted Titles.md`              | Lightweight lookup table of published content. Per-post metadata lives in each post's `metadata.json`. |

### `content/` — Lifecycle Artifacts

**`ideas/`** — Captured ideas, one folder per idea, with a required `idea.json` and optional curated supporting resources. Manual saves follow `framework/model/idea.schema.json`; automatic project-agent capture follows `framework/workflows/Content Idea Capture Rules.md`.

**`drafts/`** — `post.md` is the format-neutral canonical source written and semantically checked by Workflow 03. Workflow 04 creates only approved standalone adaptations in `drafts/format/carousel.md` or `drafts/format/linkedin.md`; it does not create parallel variant files at the `drafts/` root. Carousel alone also produces `production/workspace/carousel.json`. These files are generated workflow artifacts and may not exist when no draft is active.

**`published/`** — Archived published content, one folder per published platform variant under a lowercase platform directory using the canonical convention `content/published/<platform>/<YYYY-MM-DD-slug>/`:

- `content/published/instagram/2026-08-13-portfolio-first-year-cs/`
- `content/published/linkedin/2026-08-13-portfolio-first-year-cs/`

Each archive folder preserves one exact published platform variant in `content.md` plus `metadata.json`. Carousel JSON and exported slide assets are included only for a published Carousel; other variant-specific assets are included only when they were published. Older posts without a recorded publish date use an `unknown-date-` slug prefix (e.g. `content/published/instagram/unknown-date-first-month-in-cs/`). The old `Instagram/Instagram Carousel/Post N/` and `LinkedIn/Post N/` paths were migrated to this convention.

### `production/` — Render and Export Tooling

**`renderer/`** is the React carousel rendering engine and Studio application (Vite + React + TypeScript):

- **`src/renderer/`** — Renderer-owned code. `loadCarousel.ts` loads data; `adapter/mapWorkspaceCarousel.ts` converts the Content Model to renderer models; `SlideRenderer.tsx` dispatches by layout; `config.ts` selects the data source.
- **`src/renderer/models/`** — Renderer-specific typed presentation models, including the discriminated `SlideData` union.
- **`src/renderer/layouts/`** — Reusable slide layout components, including the personal-account layouts.
- **`src/renderer/components/`** — Reusable rendering primitives (`Title`, `Subtitle`, `BulletList`, `Badge`, `Footer`) and the `Slide` canvas.
- **`src/renderer/data/fixtures/sample-carousel.json`** — Stable bundled sample carousel used in sample mode and as a fallback if workspace loading fails.
- **`src/renderer/safety/`** — CSS-driven safety guides: `SafetyProvider` context + `SafetyOverlay` (canvas border, safe area, profile grid, crosshairs). Overlay state is controlled by the Studio; thumbnails and the `/export` route render with guides hidden.
- **`src/studio/`** — The Studio development environment: toolbar, sidebar slide cards, live preview, inspector, export modal, about modal, dev-only debug panel. See `docs/architecture/02-Studio Architecture.md`.
- **`src/export-view/`** — `ExportView.tsx`, the frozen `/export` route used by the Playwright capture pipeline. It renders every slide at full scale with safety guides disabled so screenshots stay byte-identical.
- `package.json` — Dependencies: react, react-dom, react-router-dom, vite, typescript, html-to-image, jspdf, jszip.

**`workspace/`** holds the active carousel's working data:

- `carousel.json` — the approved Content Model carousel (identity, trigger, metadata, `variants` → carousel slides). Vite serves the workspace directory as static assets (`publicDir: "../workspace"`), so the file is available as `/carousel.json`. The renderer uses workspace data by default (`USE_WORKSPACE_DATA = true`): `loadCarousel.ts` fetches `/carousel.json` and `adapter/mapWorkspaceCarousel.ts` maps the Content Model authoring fields into renderer slide types. If loading fails or produces no slides, the bundled sample fixture is used as a fallback.

**`export/`** is the Playwright slide export pipeline:

- `export-config.js` — All settings overridable via CLI (`--url`, `--output`, `--selector`, `--width`, `--height`, `--scale`, `--headless`). Defaults: URL `http://localhost:5173/export`, viewport 1920×1080 @2x, selector `.slide`, output to `extracted-slides/`, pattern `slide-{{n}}.png`
- `export-slides.js` — Launches Chromium headless, navigates to the `/export` route, screenshots each `.slide` as PNG
- `studio-inspect.js` — Development helper for inspecting the Studio DOM from Playwright
- `extracted-slides/` — Output directory for exported PNGs (slide-01, slide-02, …); gitignored and regenerated on each export

The **Studio also exports client-side**: the Export modal (`ExportModal.tsx`) renders selected slides off-screen at 2× resolution via `html-to-image` and downloads them as a ZIP of PNGs or a single multi-page PDF (`jszip`, `jspdf`). This is independent of the Playwright pipeline — it does not touch the `/export` route or `production/export/*`.

Both export paths render whatever `loadCarousel()` loads. Because workspace data is the default, the frozen `/export` route and the Playwright pipeline render and export the approved workspace carousel (`/carousel.json`), not sample data.

### `docs/` — Documentation by Concern

Top-level documentation, split by purpose:

- **`product/`** — Product-level documentation and direction.
- **`architecture/`** — System, renderer, and Studio architecture.
- **`design/`** — Studio design system and UX guidance.
- **`development/`** — Layout development guide and implementation plans.

---

## Editorial and Writing Skills

Repository-specific agent skills live in `.agents/skills/`. The current skill inventory is:

- `content-strategist` — mandatory idea-quality gate. It evaluates trigger, tension, insight, evidence, audience payoff, specificity, differentiation, and format fit, then returns `REJECT`, `DEVELOP`, or `READY`.
- `content-editor` — semantic/editorial repair for canonical meaning: logic, clarity, context, reasoning, specificity, semantic repetition, claim strength, and information sufficiency.
- `lebanese-arabic-writing` — natural Lebanese Arabic phrasing, dialect consistency, and spoken flow for Arabic Instagram content.
- `arabic-technical-language` — Arabic prose with natural English developer terminology and consistent code-mixing.
- `carousel-copy-polish` — archetype-aware Carousel copy refinement: structure, hook, pacing, density, slide flow, specificity, repetition, and CTA fit.
- `content-reviewer` — mandatory final editorial gate for completed variants. It returns `PASS`, `PASS WITH MINOR EDITS`, `REVISE`, or `BLOCK` and routes problems back to the owning layer.
- `content-refinement` — orchestration entry point when the creator explicitly asks to review/refine an idea or draft end-to-end. It coordinates the specialist skills without replacing their ownership.

The default editorial order is:

```text
idea quality
→ meaning and reasoning
→ language and voice
→ format fit
→ final editorial review
```

For an Arabic Instagram Carousel, the refinement chain is:

```text
canonical meaning
→ content-editor
→ lebanese-arabic-writing + arabic-technical-language
→ carousel-copy-polish
→ content-reviewer
```

These are not all optional consultation helpers anymore. `content-strategist` is part of Workflow 01, `content-editor` is mandatory in Workflow 03, and `content-reviewer` is mandatory in Workflow 04. `content-refinement` is used when the creator explicitly requests an end-to-end review/refinement pass.

Review and editing skills must not stop at problem lists when the current sources are sufficient to repair the content. They should return an actionable report and the complete revised artifact or refined direction, while preserving factual boundaries and surfacing genuinely missing source information instead of inventing it.

---

## Production Pipeline

The lifecycle moves from Idea through canonical meaning, editorial quality gates, approved variants, and finally the exact published-variant archive:

```
Idea
  → (01) Idea Quality Gate: content-strategist → REJECT / DEVELOP / READY
  → (02) Approved Content Brief
  → (03) Canonical Content Draft: content/drafts/post.md
       → content-editor semantic/editorial gate
  → (04) Format / Platform Adaptation: approved standalone variants
       Carousel → content/drafts/format/carousel.md + production/workspace/carousel.json
       LinkedIn → content/drafts/format/linkedin.md
       → relevant language/format skills
       → content-reviewer final gate
  → (05) Render Validation (Carousel only, where applicable)
  → (06) Export (Carousel only, where applicable)
  → Publish the selected variant
  → (07) Archive the exact published variant
       content/published/<platform>/<YYYY-MM-DD-slug>/
       content.md + metadata.json; Carousel data/assets only for Carousel
```

---

## System Workflow

1. **Strategy** — `Brand Strategy.md` defines creator identity, audience, pillars, voice, and platform rules as the strategy source influencing all downstream decisions.
2. **Content Lifecycle** — `Content Lifecycle.md` provides format-selection guidance, lifecycle ownership, and editorial gate rules.
3. **Idea Discovery** — Workflow 01 surfaces opportunities from real triggers and requires `content-strategist` to return `READY` before an idea moves forward. `DEVELOP` ideas are refined first; `REJECT` ideas are not forced into production.
4. **Content Planning** — Workflow 02 turns one `READY` idea into an approved brief with primary format, target platforms, and required variants.
5. **Canonical Content** — Workflow 03 writes format-neutral substance to `content/drafts/post.md`, then runs `content-editor` before the canonical draft is accepted.
6. **Format / Platform Adaptation** — Workflow 04 updates only variants approved in the brief at `content/drafts/format/`, applies the relevant language/format skills, and runs `content-reviewer` on every completed variant. Carousel JSON is generated only for Carousel; LinkedIn remains a standalone `linkedin.md` artifact.
7. **Render Validation** — Workflow 05 validates Carousel rendering only after the Carousel has passed the final editorial gate.
8. **Export Assets** — Workflow 06 exports validated Carousel slides through the Studio or Playwright path where applicable.
9. **Publish** — The creator publishes the selected approved variant manually.
10. **Archive** — Workflow 07 archives the exact copy and applicable assets published on that platform and updates `Posted Titles.md`.

---

## Document Relationships

```text
01 Idea Discovery
    → content-strategist: REJECT / DEVELOP / READY
    → 02 Content Planning: Approved Content Brief
    → 03 Post Content Builder: content/drafts/post.md
         → content-editor semantic/editorial gate
    → 04 Format Adaptation: only approved standalone variants
         Instagram Carousel → language skills → carousel-copy-polish
             → content/drafts/format/carousel.md + production/workspace/carousel.json
         LinkedIn Post → content/drafts/format/linkedin.md
         → content-reviewer final gate for every variant
    → 05 Render Validation (Carousel, where applicable)
    → 06 Export Assets (Carousel, where applicable)
    → Manual Publish
    → 07 Archive Published Post: exact published variant + Posted Titles.md
```

The canonical draft owns content meaning and factual boundaries. Workflow 04 may change presentation but must preserve that meaning; substantive semantic, logical, or factual changes return to Workflow 03. Strategic weakness returns to Workflow 01/02. Carousel JSON and assets remain Carousel-specific. A LinkedIn archive contains the standalone LinkedIn publication, not Instagram content.

---

## Known Gaps

- **Variant archive inputs** — Workflow 07 selects the standalone source matching the actual publication; LinkedIn is archived independently from any Instagram variant.
- **Content Item IDs** — the Content Model now prefers platform-neutral IDs (e.g. `content-001`), but existing published/workspace IDs are still platform-specific (`instagram-007`, `linkedin-001`, …) until migrated.
- **Idea persistence** — Workflow 01 supports optional user-requested persistence into `content/ideas/...`. Automatic project-agent capture after completed work is governed separately by `framework/workflows/Content Idea Capture Rules.md`.
- **LinkedIn skill coverage** — there is currently no repository skill under `.agents/skills/` dedicated to LinkedIn writing; LinkedIn behavior is governed by `framework/formats/linkedin.md` until such a skill is intentionally added.
- **Metadata completeness (older posts)** — posts archived before the current convention may lack recorded publish dates (folders use `unknown-date-…`) and may have placeholder pillar/trigger fields.
