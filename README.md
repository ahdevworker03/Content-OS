# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content framework** for a Lebanese Computer Science student who documents his learning journey in public. The framework produces authentic, student-perspective content across Instagram (carousels, reels, stories) and LinkedIn (professional posts).

The system is organized into three top-level directories: **`framework/`** (brand strategy, formats, workflow, prompts, content model, memory), **`content/`** (drafts and published archive), and **`production/`** (renderer, workspace, export pipeline, templates). It is AI-assisted — the framework documents serve as instruction sources for an LLM content generation agent.

Design philosophy: every piece of content originates from a real trigger (a bug, a lecture, a project issue), passes through a consistent brand lens, and is adapted per-format and per-platform rather than copied.

---

## Repository Overview

```
Social Media Content/
├── .opencode/                              # opencode configuration
│   └── skills/                             # Agent skills (canonical writing in Workflow 03; variant adaptation in Workflow 04)
│       ├── lebanese-arabic-writing         # Lebanese Arabic copy for Instagram/Stories/Reels/X
│       ├── student-builder-voice           # Student-builder voice across formats
│       ├── arabic-technical-language       # Arabic prose + English technical terms
│       ├── carousel-copy-polish            # Carousel slide copy polish
│       ├── linkedin-reflection-writing     # LinkedIn reflections (English)
│       ├── content-strategist              # Pre-production consultation skill
│       └── content-reviewer                # Pre-publication review skill
├── framework/                              # Brand strategy, formats, workflow, prompts, model, memory
│   ├── strategy/                           # Creator identity and voice
│   │   ├── Brand View.md                   # Identity, audience, pillars, boundaries
│   │   └── Brand Voice.md                  # Voice, tone, platform rules, language strategy
│   ├── formats/                            # Content format definitions
│   │   ├── Carousels.md                    # Carousel types and structure
│   │   ├── Reels.md                        # Reel types, authenticity rules
│   │   └── Stories.md                      # Story categories, ephemeral content
│   ├── workflow/                           # Planning and production lifecycle
│   │   ├── Content Format.md               # Format-selection guidance
│   │   └── Content Pipeline.md             # Idea-to-archive lifecycle and stage ownership
│   ├── prompts/                            # AI agent workflow prompts
│   │   ├── 01-Idea Discovery.md            # Surface post ideas
│   │   ├── 02-Content Planning.md          # Approve content brief
│   │   ├── 03-Post Content Builder.md      # Write only canonical content to post.md
│   │   ├── 04-Format Adaptation.md         # Create only approved standalone variants
│   │   ├── 05-Render Validation.md         # Validate Carousel rendering where applicable
│   │   ├── 06-Export Assets.md              # Export Carousel assets where applicable
│   │   ├── 07-Archive Published Post.md    # Archive exact published variant
│   │   └── README.md                       # Operational guide
│   ├── model/                              # Canonical content data model
│   │   └── Content Model.md                # Content Item JSON Schema, renderer interface
│   └── memory/                             # Published content index
│       └── Posted Titles.md                # Duplication prevention lookup table
│
├── content/                                # Content lifecycle artifacts
│   ├── ideas/                              # Captured content ideas
│   ├── drafts/                             # Canonical source and approved standalone variants
│   │   ├── post.md                         # Format-neutral canonical content (Workflow 03)
│   │   ├── carousel.md                     # Instagram Carousel adaptation (Workflow 04)
│   │   ├── reel.md                         # Instagram Reel adaptation (when approved)
│   │   ├── story.md                        # Instagram Story adaptation (when approved)
│   │   └── linkedin.md                     # LinkedIn Post adaptation (when approved)
│   └── published/                          # Exact published variants by platform
│       ├── instagram/                      # Variant-specific content/metadata; Carousel JSON/assets only for Carousel
│       ├── linkedin/                       # Standalone LinkedIn post content and metadata
│       └── x/                              # Reserved for future X posts
│
├── production/                             # Render and export tooling
│   ├── renderer/                           # React carousel renderer (Vite + React + TypeScript)
│   │   ├── src/                            # Source: renderer pipeline, Studio, layouts, types, sample data
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
│   ├── architecture/                       # Engine + Studio architecture docs (01, 03)
│   ├── design/                             # Studio design system, UX, polish plans (04–06)
│   └── development/                        # Layout development guide (02)
│
└── README.md                               # This file
```

---

## Folder-by-Folder Breakdown

### `framework/` — Strategic Core

Six subdirectories organize the framework markdown files by concern:

| Subdirectory | File                            | Description                                                                                                                                                                                   |
| ------------ | ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `strategy/`  | `Brand View.md`                 | Creator identity (Lebanese CS student), target audience, messaging lens, content boundaries, pillars. Owns _who the creator is_.                                                              |
|              | `Brand Voice.md`                | Single Source of Truth for voice, tone, style, platform rules (Instagram/LinkedIn/X/Stories), language strategy. Owns _how the creator writes_.                                               |
| `formats/`   | `Carousels.md`                  | 4 carousel types, mandatory 5-slide structure (Hook → Trigger → Body → Project Bridge → CTA).                                                                                                 |
|              | `Reels.md`                      | 3 reel types, authenticity rules (no staging), visible learning environment required.                                                                                                         |
|              | `Stories.md`                    | 5 story categories, unpolished 24h ephemeral, low-friction interactions.                                                                                                                      |
| `workflow/`  | `Content Format.md`             | Trigger-first format-selection guidance used during brief planning.                                                                                                                           |
|              | `Content Pipeline.md`           | Canonical lifecycle from Idea through exact-variant archive, stage ownership, and quality checks.                                                                                             |
| `prompts/`   | `01-Idea Discovery.md` through `07-Archive Published Post.md` | 7 numbered workflow prompts. `README.md` lists stage ownership and output contracts. |
| `model/`     | `Content Model.md`              | Structured Carousel contract and renderer interface. The workspace carousel (`production/workspace/carousel.json`) conforms to this model.                                                      |
| `memory/`    | `Posted Titles.md`              | Lightweight lookup table of published content. Per-post metadata lives in each post's `metadata.json`. |


### `content/` — Lifecycle Artifacts

**`ideas/`** — Captured ideas, one folder per idea, with a required `idea.json` and optional curated supporting resources. Manual saves follow `framework/model/idea.schema.json`; automatic project-agent capture follows `framework/CONTENT_IDEA_CAPTURE_RULES.md`.

**`drafts/`** — `post.md` is the format-neutral canonical source written by Workflow 03. Workflow 04 creates only approved standalone adaptations in `carousel.md`, `reel.md`, `story.md`, or `linkedin.md`. LinkedIn never lives inside `carousel.md`. Carousel alone also produces `production/workspace/carousel.json`. Draft files may be empty until their workflow is run.

**`published/`** — Archived published content, one folder per published platform variant under a lowercase platform directory using the canonical convention `content/published/<platform>/<YYYY-MM-DD-slug>/`:

- `content/published/instagram/2026-08-13-portfolio-first-year-cs/`
- `content/published/linkedin/2026-08-13-portfolio-first-year-cs/`

Each archive folder preserves one exact published platform variant in `content.md` plus `metadata.json`. Carousel JSON and exported slide assets are included only for a published Carousel; other variant-specific assets are included only when they were published. Older posts without a recorded publish date use an `unknown-date-` slug prefix (e.g. `content/published/instagram/unknown-date-first-month-in-cs/`). The old `Instagram/Instagram Carousel/Post N/` and `LinkedIn/Post N/` paths were migrated to this convention.

### `production/` — Render and Export Tooling

**`renderer/`** is the React carousel rendering engine (Vite + React + TypeScript):

- **`src/renderer/`** — Rendering pipeline: `loadCarousel.ts` loads JSON, `mapWorkspaceCarousel.ts` converts the Content Model to renderer models, `SlideRenderer.tsx` dispatches to the correct layout by type, `config.ts` selects the data source.
- **`src/renderer/safety/`** — CSS-driven safety guides: `SafetyProvider` context + `SafetyOverlay` (canvas border, safe area, profile grid, crosshairs). Overlay state is controlled by the Studio; thumbnails and the `/export` route render with guides hidden.
- **`src/studio/`** — The Studio development environment: toolbar, sidebar slide cards, live preview, inspector, export modal, about modal, dev-only debug panel. See `01-Renderer Architecture.md` §7.
- **`src/export/`** — `ExportView.tsx`, the frozen `/export` route used by the Playwright capture pipeline. Renders every slide at full scale with safety guides disabled so screenshots stay byte-identical.
- **`src/components/`** — Reusable UI primitives (`Title`, `Subtitle`, `BulletList`, `Badge`, `Footer`) and `Slide` canvas (1080×1080 with responsive scaling). `Slide` reads the safety context to overlay guides.
- **`src/layouts/`** — 6 layout components (`CoverSlide`, `BulletListSlide`, `ArrowListSlide`, `GridSlide`, `BoxListSlide`, `CtaSlide`).
- **`src/types/`** — Renderer-specific typed models (discriminated union `SlideData`).
- **`src/data/carousel.json`** — Bundled sample carousel (canonical format). Used as a fallback when workspace loading fails or yields no slides, and as the data source in sample mode (`USE_WORKSPACE_DATA = false`).
- `package.json` — Dependencies: react, react-dom, react-router-dom, vite, typescript, html-to-image, jspdf, jszip.

**`workspace/`** holds the active carousel's working data:

- `carousel.json` — the approved Content Model carousel (identity, trigger, metadata, `variants` → carousel slides). Vite serves the workspace directory as static assets (`publicDir: "../workspace"`), so the file is available as `/carousel.json`. The renderer uses workspace data by default (`USE_WORKSPACE_DATA = true`): `loadCarousel.ts` fetches `/carousel.json` and `mapWorkspaceCarousel.ts` maps the Content Model authoring fields into renderer slide types. If loading fails or produces no slides, the bundled sample data is used as a fallback.

**`export/`** is the Playwright slide export pipeline:

- `export-config.js` — All settings overridable via CLI (`--url`, `--output`, `--selector`, `--width`, `--height`, `--scale`, `--headless`). Defaults: URL `http://localhost:5173/export`, viewport 1920×1080 @2x, selector `.slide`, output to `extracted-slides/`, pattern `slide-{{n}}.png`
- `export-slides.js` — Launches Chromium headless, navigates to the `/export` route, screenshots each `.slide` as PNG
- `studio-inspect.js` — Development helper for inspecting the Studio DOM from Playwright
- `extracted-slides/` — Output directory for exported PNGs (slide-01, slide-02, …); gitignored and regenerated on each export

The **Studio also exports client-side**: the Export modal (`ExportModal.tsx`) renders selected slides off-screen at 2× resolution via `html-to-image` and downloads them as a ZIP of PNGs or a single multi-page PDF (`jszip`, `jspdf`). This is independent of the Playwright pipeline — it does not touch the `/export` route or `production/export/*`.

Both export paths render whatever `loadCarousel()` loads. Because workspace data is the default, the frozen `/export` route and the Playwright pipeline render and export the approved workspace carousel (`/carousel.json`), not sample data.

### `docs/` — Documentation by Concern

Top-level documentation, split by purpose:

- **`product/`** — Product-level documentation (requirements, roadmap).
- **`architecture/`** — `01-Renderer Architecture.md`, `03-Studio Architecture.md`.
- **`design/`** — `04-Studio Design System.md`, `05-Studio UX Guidelines.md`, `06-Studio Polish Plan.md`.
- **`development/`** — `02-Layout Development Guide.md`.

(These were previously under `production/renderer/docs/`.)

---

## Writing Skills

Agent skills live in `.opencode/skills/`. Workflow 03 (`03-Post Content Builder.md`) uses `student-builder-voice` for the canonical draft. Workflow 04 applies the relevant platform and format writing skills to approved variants:

- `lebanese-arabic-writing` — natural Lebanese Arabic for Instagram, Stories, Reels, and X copy.
- `student-builder-voice` — the student-builder voice across all formats and platforms.
- `arabic-technical-language` — Arabic prose with natural English developer terms.
- `carousel-copy-polish` — tightening carousel slide copy (hooks, one-idea-per-slide, CTAs).
- `linkedin-reflection-writing` — LinkedIn adaptations in English (reflective, not corporate).

Two consultation skills also exist: `content-strategist` (evaluating/prioritising ideas before production) and `content-reviewer` (reviewing drafted content before publishing). They are advisory and sit outside the numbered workflows.

---

## Production Pipeline

The lifecycle moves from Idea through canonical meaning and approved variants to the exact published-variant archive:

```
Idea
  → (02) Approved Content Brief
  → (03) Canonical Content Draft: content/drafts/post.md
  → (04) Format / Platform Adaptation: approved standalone variants
       Carousel → carousel.md + production/workspace/carousel.json
       Reel → reel.md | Story → story.md | LinkedIn → linkedin.md
  → (05) Render Validation (Carousel only, where applicable)
  → (06) Export (Carousel only, where applicable)
  → Publish the selected variant
  → (07) Archive the exact published variant
       content/published/<platform>/<YYYY-MM-DD-slug>/
       content.md + metadata.json; Carousel data/assets only for Carousel
```

---

## System Workflow

1. **Strategy** — `Brand View.md` (identity, audience, pillars) and `Brand Voice.md` (voice, platform rules) are co-root documents influencing all downstream decisions.
2. **Content Planning** — `Content Format.md` provides format-selection guidance. Workflow 02 records the approved primary format, target platforms, and required variants in the brief.
3. **Idea Discovery** — `01-Idea Discovery.md` surfaces content opportunities from real triggers.
4. **Content Planning** — `02-Content Planning.md` evaluates the idea and produces an approved brief.
5. **Canonical Content** — Workflow 03 writes only format-neutral substance to `content/drafts/post.md`.
6. **Format / Platform Adaptation** — Workflow 04 creates only the variants approved in the brief. Carousel JSON is generated only for Carousel; LinkedIn is a standalone `linkedin.md`.
7. **Render Validation** — Workflow 05 validates Carousel rendering where applicable.
8. **Export Assets** — Workflow 06 exports validated Carousel slides through the Studio or Playwright path where applicable.
9. **Publish** — The creator publishes the selected approved variant manually.
10. **Archive** — Workflow 07 archives the exact copy and applicable assets published on that platform and updates `Posted Titles.md`.

---

## Document Relationships

```text
01 Idea Discovery
    → 02 Content Planning: Approved Content Brief
    → 03 Post Content Builder: content/drafts/post.md
    → 04 Format Adaptation: only approved standalone variants
         Instagram Carousel → carousel.md + production/workspace/carousel.json
         Instagram Reel → reel.md
         Instagram Story → story.md
         LinkedIn Post → linkedin.md
    → 05 Render Validation (Carousel, where applicable)
    → 06 Export Assets (Carousel, where applicable)
    → Manual Publish
    → 07 Archive Published Post: exact published variant + Posted Titles.md
```

The canonical draft owns content meaning and factual boundaries. Workflow 04 may change presentation but must preserve that meaning; substantive changes return to Workflow 03. Carousel JSON and assets remain Carousel-specific. A LinkedIn archive contains the standalone LinkedIn publication, not Instagram content.

---

## Known Gaps

- **Variant archive inputs** — Workflow 07 selects the standalone source matching the actual publication; LinkedIn is archived independently from any Instagram variant.
- **Content Item IDs** — the Content Model now prefers platform-neutral IDs (e.g. `content-001`), but existing published/workspace IDs are still platform-specific (`instagram-007`, `linkedin-001`, …) until migrated.
- **Idea persistence** — `content/ideas/` exists, but Workflow 01 does not yet write recommended ideas there; persistence is optional and may be added later.
- **Skill duplication** — the writing skills overlap on voice and Arabic rules. Acceptable for now; may be consolidated only if it becomes a maintenance issue.
- **Metadata completeness (older posts)** — posts archived before the current convention may lack recorded publish dates (folders use `unknown-date-…`) and may have placeholder pillar/trigger fields.
