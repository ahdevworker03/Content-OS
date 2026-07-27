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
│   │   ├── Brand View.md                   # Identity, audience, pillars, boundaries
│   │   └── Brand Voice.md                  # Voice, tone, platform rules, language strategy
│   ├── formats/                            # Content format definitions
│   │   ├── Carousels.md                    # 4 types, 5-slide structure
│   │   ├── Reels.md                        # 3 types, authenticity rules
│   │   └── Stories.md                      # 5 categories, ephemeral content
│   ├── workflow/                           # Planning and production lifecycle
│   │   ├── Content Format.md               # Trigger-First planning (stages 1-3)
│   │   └── Content Pipeline.md             # Full lifecycle (stages 4-8), quality gates
│   ├── prompts/                            # AI agent prompt templates
│   │   └── Generating Content Prompts.md   # 5 agents, 958 lines
│   ├── model/                              # Canonical content data model
│   │   └── Content Model.md                # JSON Schema, renderer interface
│   ├── memory/                             # Published content index
│   │   └── Posted Titles.md                # Duplication prevention lookup
│   └── docs/                               # System documentation
│       └── 01- Framework Architecture.md   # This file
│
├── content/                                # Content lifecycle artifacts
│   ├── ideas/                              # Future content ideas (empty)
│   ├── drafts/                             # Working drafts (Post Content Builder output)
│   │   └──  carousel.md                    # "This Summer, I'm Building Foundations"
│   └── published/                          # Archived published content by platform
│       ├── LinkedIn/                       # content.md + content.json + metadata.json
│       └── Instagram/
│           └── Instagram Carousel/         # assets/ + content.md + content.json + metadata.json
│
├── production/                             # Render and export tooling
│   ├── renderer/                           # Carousel template engine (reusable)
│   │   ├── template.hbs                    # Handlebars template (6 slide layouts)
│   │   ├── render.js                       # Node.js: template + JSON → HTML
│   │   ├── styles.css                      # 1080×1080 dark theme design system
│   │   └── package.json                    # devDeps: handlebars ^4.7.9
│   ├── workspace/                          # Active carousel data and output
│   │   ├── carousel.json                   # Current carousel structured data
│   │   ├── index.html                      # Rendered HTML output
│   │   └── node_modules/                   # Handlebars runtime dependencies
│   ├── export/                             # Playwright slide export pipeline
│   │   ├── export-config.js                # Config: URL, viewport, selector, output
│   │   ├── export-slides.js                # Screenshots .slide → PNGs
│   │   ├── extracted-slides/               # 7 PNGs (slide-01 through slide-07)
│   │   └── package.json                    # Deps: playwright, http-server
│
└── README.md                               # Project overview
```

---

## Folder-by-Folder Breakdown

### `framework/` — Strategic Core

Seven subdirectories organize the ten markdown files by concern:

| Subdirectory  | File                            | Description                                                                                                                                     |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| `strategy/`   | `Brand View.md`                 | Creator identity (Lebanese CS student), target audience, messaging lens, content boundaries, pillars. Owns _who the creator is_.                |
|               | `Brand Voice.md`                | Single Source of Truth for voice, tone, style, platform rules (Instagram/LinkedIn/X/Stories), language strategy. Owns _how the creator writes_.  |
| `formats/`    | `Carousels.md`                  | 4 carousel types, mandatory 5-slide structure (Hook → Trigger → Body → Project Bridge → CTA).                                                   |
|               | `Reels.md`                      | 3 reel types, authenticity rules (no staging), visible learning environment required.                                                            |
|               | `Stories.md`                    | 5 story categories, unpolished 24h ephemeral, low-friction interactions.                                                                        |
| `workflow/`   | `Content Format.md`             | Trigger-First planning logic (stages 1–3: Trigger → Idea → Format Selection).                                                                   |
|               | `Content Pipeline.md`           | Full lifecycle (stages 4–8: Draft → Review → Final Assets → Published → Archived), quality gates, ownership matrix.                             |
| `prompts/`    | `Generating Content Prompts.md` | 5 AI agents (Post Idea Generator, Post Content Builder, Carousel Renderer, Story Idea Generator, Story Content Builder). Orchestrator file.      |
| `model/`      | `Content Model.md`              | Canonical JSON Schema for Content Items. Defines 6 slide layouts and renderer interface. Forward-looking, not yet consumed.                     |
| `memory/`     | `Posted Titles.md`              | Lightweight lookup table of published content. Prevents duplication. Per-post metadata lives in `metadata.json`.                                |
| `docs/`       | `01- Framework Architecture.md` | This file.                                                                                                                                      |

### `content/` — Lifecycle Artifacts

**`drafts/`** contains working drafts produced by the Post Content Builder agent. Currently houses ` carousel.md` — a 7-slide draft for "This Summer, I'm Building Foundations" (Lebanese Arabic) with a LinkedIn adaptation (English). This is the bridge between content creation and the renderer.

**`published/`** archives published content by platform. LinkedIn posts each have `content.md` (human-readable body), `content.json` (canonical Content Model), and `metadata.json` (archive metadata). Instagram carousel posts under `Instagram Carousel/` each have image assets in `assets/`, `content.md`, `content.json`, and `metadata.json`. All posts follow the self-contained Content Model structure.

### `production/` — Render and Export Tooling

**`renderer/`** is the reusable carousel template engine:
- `template.hbs` — Handlebars template supporting 6 slide layouts via conditionals (`TYPE_COVER`, `TYPE_BOX_LIST`, `TYPE_ARROW_LIST`, `TYPE_GRID_2X2`, `TYPE_BULLET_LIST`, `TYPE_FINAL_CTA`)
- `render.js` — Compiles `template.hbs` + JSON data file, injects shared fields (USERNAME, FOOTER_NAME, FOOTER_HANDLE, SWIPE) into each slide, writes `index.html`
- `styles.css` — 1080×1080px dark theme with RTL, Google Fonts (Tajawal, Nunito, Pacifico, Caveat), section tag color variants, reusable components
- `package.json` — devDependencies: handlebars ^4.7.9

**`workspace/`** holds the active carousel's working files:
- `carousel.json` — ALL CAPS keyed JSON data for the current carousel (7 slides: "This Summer, I'm Building Foundations")
- `index.html` — Rendered output from the template engine
- `node_modules/` — Handlebars runtime

**`export/`** is the Playwright slide export pipeline:
- `export-config.js` — Settings: URL (port 8000), viewport (1920×1080 @2x), selector (`.slide`), output directory, filename pattern
- `export-slides.js` — Launches Chromium headless, navigates to carousel HTML, screenshots each `.slide` as PNG
- `extracted-slides/` — 7 PNGs (slide-01 through slide-07)
- All settings overridable via CLI: `--url`, `--output`, `--selector`, `--width`, `--height`, `--scale`, `--headless`

---

## Production Pipeline

```
content/drafts/ carousel.md
        │  (Post Content Builder agent)
        ▼
production/workspace/carousel.json
        │  (structured data)
        ▼
production/renderer/render.js
        │  (Handlebars: template.hbs + data → HTML)
        ▼
production/workspace/index.html
        │  (linked to styles.css)
        ▼
production/export/export-slides.js
        │  (Playwright: screenshots .slide → PNGs)
        ▼
production/export/extracted-slides/*.png
        │  (platform-ready assets)
        ▼
content/published/Instagram/ (manual upload)
content/published/LinkedIn/  (manual post)
```

---

## System Workflow

1. **Strategy** — `Brand View.md` (identity, audience, pillars) and `Brand Voice.md` (voice, platform rules) are co-root documents.
2. **Content Planning** — `Content Format.md` owns trigger-first planning (stages 1–3). Format docs define purpose for selection.
3. **Content Creation** — `Generating Content Prompts.md` orchestrates 5 AI agents.
4. **Carousel Render Pipeline** — Draft → JSON → Handlebars → HTML → Playwright → PNGs.
5. **Repurposing** — `Brand Voice.md` owns platform rewriting rules. Instagram (Lebanese Arabic) + LinkedIn (English).
6. **Publishing** — Human-in-the-loop uploads and posts final assets.
7. **Continuous Improvement** — `Posted Titles.md` prevents duplication. Metadata gaps tracked for improvement.

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
              Generating Content Prompts.md
                      │            (5 agents)
              ┌───────┼────────────────┐
              ▼       ▼                ▼
        content/drafts/          framework/memory/
         carousel.md             Posted Titles.md
              │
              ▼
        production/workspace/
        carousel.json  →  index.html
              │
              ▼
        production/renderer/
        template.hbs + render.js + styles.css
              │
              ▼
        production/export/
        export-slides.js → extracted-slides/*.png
              │
              ▼
        content/published/
        LinkedIn/  Instagram/

        framework/model/
        Content Model.md  (forward-looking)
```
