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
│   └── skills/                             # Agent skills (used by Workflow 03 and pre/post production)
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
│   │   ├── Content Format.md               # Trigger-First planning (stages 1-3)
│   │   └── Content Pipeline.md             # Full lifecycle (stages 4-8), quality gates, ownership
│   ├── prompts/                            # AI agent workflow prompts
│   │   ├── 01-Idea Discovery.md            # Surface post ideas
│   │   ├── 02-Content Planning.md          # Approve content brief
│   │   ├── 03-Post Content Builder.md      # Write content package + JSON
│   │   ├── 04-Render Validation.md         # Validate React rendering
│   │   ├── 05-Export Assets.md             # Export slide images
│   │   ├── 06-Archive Published Post.md    # Archive post and update index
│   │   └── README.md                       # Operational guide
│   ├── model/                              # Canonical content data model
│   │   └── Content Model.md                # Content Item JSON Schema, renderer interface
│   └── memory/                             # Published content index
│       └── Posted Titles.md                # Duplication prevention lookup table
│
├── content/                                # Content lifecycle artifacts
│   ├── ideas/                              # Captured content ideas (e.g. migration-series.md)
│   ├── drafts/                             # Working drafts (Post Content Builder output)
│   │   ├── carousel.md                     # Carousel draft (when one is in progress)
│   │   ├── reel.md                         # Reel draft (when one exists)
│   │   └── story.md                        # Story draft (when one exists)
│   └── published/                          # Archived published content by platform
│       ├── instagram/                      # <YYYY-MM-DD-slug>/ — content.md, content.json, metadata.json, assets/
│       ├── linkedin/                       # <YYYY-MM-DD-slug>/ — content.md, content.json, metadata.json
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
| `workflow/`  | `Content Format.md`             | Trigger-First planning logic (stages 1–3: Trigger → Idea → Format Selection).                                                                                                                 |
|              | `Content Pipeline.md`           | Full lifecycle (stages 4–8: Draft → Review → Final Assets → Published → Archived), quality gates, ownership matrix.                                                                           |
| `prompts/`   | `01-Idea Discovery.md` through `06-Archive Published Post.md` | 6 numbered workflow prompts, each with a single responsibility. See `README.md` in this directory for the operational guide.        |
| `model/`     | `Content Model.md`              | Canonical JSON Schema (draft 2020-12) for Content Items — identity, trigger, metadata, platform variants, archive. 6 slide layouts, renderer interface. The workspace carousel (`production/workspace/carousel.json`) conforms to this model.    |
| `memory/`    | `Posted Titles.md`              | Lightweight lookup table of published content. Per-post metadata lives in each post's `metadata.json`. |


### `content/` — Lifecycle Artifacts

**`ideas/`** — Captured content ideas awaiting the next Idea Discovery / Content Planning run (e.g. `migration-series.md`). Not a requirement for any workflow; ideas may also live only in conversation.

**`drafts/`** — Working drafts produced by the Post Content Builder agent. `carousel.md` currently holds an 8-slide carousel draft (Lebanese Arabic) with a LinkedIn adaptation (English). `reel.md` and `story.md` exist as files and are populated when a reel or story draft is generated. A draft file may legitimately be empty until its format is used.

**`published/`** — Archived published content, one folder per post under a lowercase platform directory using the canonical convention `content/published/<platform>/<YYYY-MM-DD-slug>/`:

- `content/published/instagram/2026-08-13-portfolio-first-year-cs/`
- `content/published/linkedin/2026-08-13-portfolio-first-year-cs/`

Each post folder contains `content.md` (human-readable body), `content.json` (canonical Content Model), and `metadata.json` (archive metadata); Instagram carousels additionally include an `assets/` folder with the slide images. Older posts without a recorded publish date use an `unknown-date-` slug prefix (e.g. `content/published/instagram/unknown-date-first-month-in-cs/`). The old `Instagram/Instagram Carousel/Post N/` and `LinkedIn/Post N/` paths were migrated to this convention.

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

Agent skills live in `.opencode/skills/`. Workflow 03 (`03-Post Content Builder.md`) requires the relevant writing skills before final copy is produced:

- `lebanese-arabic-writing` — natural Lebanese Arabic for Instagram, Stories, Reels, and X copy.
- `student-builder-voice` — the student-builder voice across all formats and platforms.
- `arabic-technical-language` — Arabic prose with natural English developer terms.
- `carousel-copy-polish` — tightening carousel slide copy (hooks, one-idea-per-slide, CTAs).
- `linkedin-reflection-writing` — LinkedIn adaptations in English (reflective, not corporate).

Two consultation skills also exist: `content-strategist` (evaluating/prioritising ideas before production) and `content-reviewer` (reviewing drafted content before publishing). They are advisory and sit outside the numbered workflows.

---

## Production Pipeline

The end-to-end pipeline moves from idea to published archive through six workflows:

```
User Context / Learning Activity
        │  (01) Idea Discovery
        ▼
Content Idea
        │  (02) Content Planning
        ▼
Approved Content Brief
        │  (03) Post Content Builder
        ▼
content/drafts/carousel.md  ───  production/workspace/carousel.json
        │  (04) Render Validation                       │
        ▼                                               │
Render Confirmation (Studio preview)                    │
        │  (05) Export Assets ────── Studio Export modal (ZIP/PDF, in-browser)
        ▼                                               │
production/export/*.png  (Playwright /export route)     │
        │  (06) Archive Published Post                  │
        ▼                                               ▼
content/published/<platform>/<YYYY-MM-DD-slug>/
  content.md  content.json  metadata.json  assets/
```

---

## System Workflow

1. **Strategy** — `Brand View.md` (identity, audience, pillars) and `Brand Voice.md` (voice, platform rules) are co-root documents influencing all downstream decisions.
2. **Content Planning** — `Content Format.md` owns trigger-first planning (stages 1–3). `Carousels.md`, `Reels.md`, `Stories.md` define format purposes for selection.
3. **Idea Discovery** — `01-Idea Discovery.md` surfaces content opportunities from real triggers.
4. **Content Planning** — `02-Content Planning.md` evaluates the idea and produces an approved brief.
5. **Content Creation** — `03-Post Content Builder.md` transforms the brief into a Markdown draft and canonical JSON.
6. **Render Validation** — `04-Render Validation.md` confirms the JSON renders correctly in the React carousel renderer.
7. **Export Assets** — `05-Export Assets.md` captures every slide as a PNG. Two paths: the Playwright pipeline screenshots the `/export` route (`production/export/export-slides.js`), or the Studio's Export modal downloads a ZIP of PNGs / a PDF directly in the browser.
8. **Archive Published Post** — `06-Archive Published Post.md` creates a self-contained archive under `content/published/` and updates the memory index.
9. **Repurposing** — Each carousel produces Instagram (Lebanese Arabic) and LinkedIn (English) outputs, governed by platform rewriting rules in `Brand Voice.md`.
10. **Continuous Improvement** — `Posted Titles.md` prevents idea duplication. Metadata gaps (missing dates, pillars, tags, Instagram titles/captions) tracked for future improvement.

---

## Document Relationships

```
framework/strategy/
  Brand View.md  ──────────►  Brand Voice.md
                                │
        ├─── framework/formats/ ◄─────┘
        │     Carousels.md, Reels.md, Stories.md
        │
        └─── framework/workflow/
              Content Pipeline.md ◄──────┘
                      │
                      ▼
              Content Format.md  ──►  formats/
                      │
                      ▼
              Content Pipeline.md
                      │
                      ▼
               framework/prompts/
               01-Idea Discovery.md
                       │
                       ▼
               02-Content Planning.md
                       │
                       ▼
               03-Post Content Builder.md
                       │
               ┌───────┴────────────────┐
               ▼                        ▼
         content/drafts/         production/workspace/
          carousel.md             carousel.json
               │                        │
               └────────┬───────────────┘
                        ▼
                04-Render Validation.md
                        │
                        ▼
                 05-Export Assets.md
                         │
                 ┌───────┴──────────┐
                 ▼                  ▼
         Studio Export modal   production/export/*.png
         (ZIP / PDF, browser)  (Playwright /export route)
                 │                  │
                 ▼                  ▼
                 06-Archive Published Post.md
                        │
               ┌────────┴───────────┐
               ▼                    ▼
         content/published/   framework/memory/
         <platform>/<YYYY-MM-DD-slug>/   Posted Titles.md
           content.md
           content.json
           metadata.json
           assets/
```

---

## Known Gaps

- **Reel/Story archive guidance** — Workflow 06 inputs are still carousel-centric (`carousel.md`/`carousel.json`/PNG assets). A clearer Reel/Story archive branch is still needed.
- **Content Item IDs** — the Content Model now prefers platform-neutral IDs (e.g. `content-001`), but existing published/workspace IDs are still platform-specific (`instagram-007`, `linkedin-001`, …) until migrated.
- **Idea persistence** — `content/ideas/` exists, but Workflow 01 does not yet write recommended ideas there; persistence is optional and may be added later.
- **Skill duplication** — the writing skills overlap on voice and Arabic rules. Acceptable for now; may be consolidated only if it becomes a maintenance issue.
- **Metadata completeness (older posts)** — posts archived before the current convention may lack recorded publish dates (folders use `unknown-date-…`) and may have placeholder pillar/trigger fields.
