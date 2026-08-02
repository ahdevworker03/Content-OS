# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content framework** for a Lebanese Computer Science student who documents his learning journey in public. The framework produces authentic, student-perspective content across Instagram (carousels, reels, stories) and LinkedIn (professional posts).

The system is organized into three top-level directories: **`framework/`** (brand strategy, formats, workflow, prompts, content model, memory), **`content/`** (drafts and published archive), and **`production/`** (renderer, workspace, export pipeline, templates). It is AI-assisted — the framework documents serve as instruction sources for an LLM content generation agent.

Design philosophy: every piece of content originates from a real trigger (a bug, a lecture, a project issue), passes through a consistent brand lens, and is adapted per-format and per-platform rather than copied.

---

## Repository Overview

```
Social Media Content/
├── framework/                              # Brand strategy, formats, workflow, prompts, model, memory
│   ├── strategy/                           # Creator identity and voice
│   │   ├── Brand View.md                   # Identity, audience, pillars, boundaries (110 lines)
│   │   └── Brand Voice.md                  # Voice, tone, platform rules, language strategy (335 lines)
│   ├── formats/                            # Content format definitions
│   │   ├── Carousels.md                    # 4 types, 5-slide structure (149 lines)
│   │   ├── Reels.md                        # 3 types, authenticity rules (122 lines)
│   │   └── Stories.md                      # 5 categories, ephemeral content (123 lines)
│   ├── workflow/                           # Planning and production lifecycle
│   │   ├── Content Format.md               # Trigger-First planning (stages 1-3, 104 lines)
│   │   └── Content Pipeline.md             # Full lifecycle (stages 4-8), quality gates (208 lines)
│   ├── prompts/                            # AI agent workflow prompts
│   │   ├── 01-Idea Discovery.md            # Surface post ideas
│   │   ├── 02-Content Planning.md          # Approve content brief
│   │   ├── 03-Post Content Builder.md      # Write content package + JSON
│   │   ├── 04-Render Validation.md         # Validate React rendering
│   │   ├── 05-Export Assets.md             # Export PNG slide images
│   │   ├── 06-Archive Published Post.md    # Archive post and update index
│   │   └── README.md                       # Operational guide
│   ├── model/                              # Canonical content data model
│   │   └── Content Model.md                # JSON Schema (draft 2020-12), renderer interface (373 lines)
│   ├── memory/                             # Published content index
│   │   └── Posted Titles.md                # Duplication prevention lookup table (30 lines)
│
├── content/                                # Content lifecycle artifacts
│   ├── ideas/                              # Future content ideas (empty)
│   ├── drafts/                             # Working drafts (Post Content Builder output)
│   │   ├── carousel.md                     # "Why I Built a Portfolio in My First Year" (152 lines)
│   │   ├── reel.md                         # Empty placeholder
│   │   └── story.md                        # Empty placeholder
│   └── published/                          # Archived published content by platform
│       ├── LinkedIn/                       # content.md + content.json + metadata.json
│       └── Instagram/
│           └── Instagram Carousel/         # assets/ + content.md + content.json + metadata.json
│
├── production/                             # Render and export tooling
│   ├── renderer/                           # React carousel renderer (Vite + React + TypeScript)
│   │   ├── src/                            # TypeScript source
│   │   │   ├── renderer/                   #   JSON loader, mapper, SlideRenderer, safety overlay
│   │   │   ├── studio/                     #   Studio: toolbar, sidebar cards, preview, inspector, export
│   │   │   ├── export/                     #   ExportView (frozen /export route for the Playwright pipeline)
│   │   │   ├── components/                 #   UI primitives + Slide canvas
│   │   │   ├── layouts/                    #   6 slide layout components
│   │   │   ├── types/                      #   Renderer-specific TypeScript types
│   │   │   └── data/                       #   Development carousel JSON (8 slides, canonical format)
│   │   ├── docs/                            # Renderer architecture documentation
│   │   │   ├── 01-Renderer Architecture.md  #   Engine architecture, layers, data flow
│   │   │   └── 02-Layout Development Guide.md #   Layout creation and modification guide
│   │   ├── index.html                      # Vite entry HTML
│   │   └── package.json                    # Deps: react, react-dom, react-router-dom, vite, typescript, html-to-image, jspdf, jszip
│   ├── workspace/                          # Active carousel data
│   │   └── carousel.json                   # Current carousel structured data (Content Model format)
│   ├── export/                             # Playwright PNG export pipeline
│   │   ├── export-config.js                # Config: URL (/export), viewport, selector, output
│   │   ├── export-slides.js                # Screenshots .slide → PNGs
│   │   ├── studio-inspect.js               # Dev helper: inspect Studio DOM (slides, safety state)
│   │   ├── extracted-slides/               # PNG output directory (gitignored, regenerated on export)
│   │   └── package.json                    # Deps: playwright ^1.61.1, http-server ^14.1.1
└── README.md                               # This file
```

---

## Folder-by-Folder Breakdown

### `framework/` — Strategic Core

Six subdirectories organize the nine markdown files by concern:

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

**`ideas/`** — Empty directory reserved for future content idea capture.

**`drafts/`** — Working drafts produced by the Post Content Builder agent. Currently houses `carousel.md` — an 8-slide draft for "Why I Built a Portfolio in My First Year" (Lebanese Arabic) with a LinkedIn adaptation (English). `reel.md` and `story.md` exist as empty placeholders for their respective formats. This is the bridge between content creation and the renderer.

**`published/`** — Archives published content by platform. LinkedIn posts each have `content.md` (human-readable body), `content.json` (canonical Content Model), and `metadata.json` (archive metadata). Instagram carousel posts under `Instagram Carousel/` each have image assets in `assets/`, `content.md`, `content.json`, and `metadata.json`.

**Archive improvements:** All posts follow the self-contained per-post structure (`content.md` + `content.json` + `metadata.json`; Instagram posts additionally include `assets/`). Caption text for Instagram was not visible in slide images — left as `PLACEHOLDER`. Some metadata fields (`published_date`, `content_pillar`, `trigger`) remain as `PLACEHOLDER` or `null` due to missing original records.

### `production/` — Render and Export Tooling

**`renderer/`** is the React carousel rendering engine (Vite + React + TypeScript):

- **`src/renderer/`** — Rendering pipeline: `loadCarousel.ts` loads JSON, `mapWorkspaceCarousel.ts` converts the Content Model to renderer models, `SlideRenderer.tsx` dispatches to the correct layout by type, `config.ts` selects the data source.
- **`src/renderer/safety/`** — CSS-driven safety guides: `SafetyProvider` context + `SafetyOverlay` (canvas border, safe area, profile grid, crosshairs). Overlay state is controlled by the Studio; thumbnails and the `/export` route render with guides hidden.
- **`src/studio/`** — The Studio development environment: toolbar, sidebar slide cards, live preview, inspector, export modal, about modal, dev-only debug panel. See `01-Renderer Architecture.md` §7.
- **`src/export/`** — `ExportView.tsx`, the frozen `/export` route used by the Playwright capture pipeline. Renders every slide at full scale with safety guides disabled so screenshots stay byte-identical.
- **`src/components/`** — Reusable UI primitives (`Title`, `Subtitle`, `BulletList`, `Badge`, `Footer`) and `Slide` canvas (1080×1080 with responsive scaling). `Slide` reads the safety context to overlay guides.
- **`src/layouts/`** — 6 layout components (`CoverSlide`, `BulletListSlide`, `ArrowListSlide`, `GridSlide`, `BoxListSlide`, `CtaSlide`).
- **`src/types/`** — Renderer-specific typed models (discriminated union `SlideData`).
- **`src/data/carousel.json`** — Development carousel JSON (8 slides, canonical format, swappable to workspace data via config flag).
- **`docs/`** — Renderer architecture documentation:
  - `01-Renderer Architecture.md` — Engine architecture, layers, data flow, design decisions.
  - `02-Layout Development Guide.md` — Workflow and conventions for adding or modifying layouts.
- **`index.css`** — Design system with CSS variables for colors, spacing, typography, radii, slide dimensions.
- `package.json` — Dependencies: react, react-dom, react-router-dom, vite, typescript, html-to-image, jspdf, jszip.

**`workspace/`** holds the active carousel's working data:

- `carousel.json` — Content Model–shaped JSON (identity, trigger, metadata, platform variants). Loaded at runtime by the renderer via `loadCarousel.ts` → `mapWorkspaceCarousel.ts` when `USE_WORKSPACE_DATA` is `true`.

**`export/`** is the Playwright slide export pipeline:

- `export-config.js` — All settings overridable via CLI (`--url`, `--output`, `--selector`, `--width`, `--height`, `--scale`, `--headless`). Defaults: URL `http://localhost:5173/export`, viewport 1920×1080 @2x, selector `.slide`, output to `extracted-slides/`, pattern `slide-{{n}}.png`
- `export-slides.js` — Launches Chromium headless, navigates to the `/export` route, screenshots each `.slide` as PNG
- `studio-inspect.js` — Development helper for inspecting the Studio DOM from Playwright
- `extracted-slides/` — Output directory for exported PNGs (slide-01, slide-02, …); regenerated on each export, currently empty

The **Studio also exports client-side**: the Export modal (`ExportModal.tsx`) renders selected slides off-screen at 2× resolution via `html-to-image` and downloads them as a ZIP of PNGs or a single multi-page PDF (`jszip`, `jspdf`). This is independent of the Playwright pipeline — it does not touch the `/export` route or `production/export/*`.

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
content/published/<Platform>/<Post>/
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
         <Platform>/<Post>/   Posted Titles.md
           content.md
           content.json
           metadata.json
           assets/
```

---

## Known Gaps

- **`.gitignore`** — Present at root and covers `node_modules/`, `dist/`, `*.tsbuildinfo`, `.DS_Store`, `Thumbs.db`. No `node_modules/` directories are tracked.
- **Metadata completeness** — `published_date`, `content_pillar`, `trigger`, and `created_date` remain `PLACEHOLDER`/`null` for all posts. These were not recorded at publication time.
- **Instagram captions** — Caption text was not visible in slide images; all Instagram posts use `PLACEHOLDER`.
- **Draft placeholders** — `content/drafts/reel.md` and `content/drafts/story.md` are empty placeholders awaiting their first drafts.
