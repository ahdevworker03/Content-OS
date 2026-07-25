# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content framework** for a Lebanese Computer Science student who documents his learning journey in public. The framework produces authentic, student-perspective content across Instagram (carousels, reels, stories) and LinkedIn (professional posts).

The system is built on three functional layers: **strategic definition** (brand identity, format rules, workflow), **production and rendering** (Handlebars carousel templates + Playwright-based PNG export), and **archiving** (published content organized by platform). It is AI-assisted — the framework documents serve as instruction sources for an LLM content generation agent.

Design philosophy: every piece of content originates from a real trigger (a bug, a lecture, a project issue), passes through a consistent brand lens, and is adapted per-format and per-platform rather than copied.

---

## Repository Overview

```
Social Media Content/
├── Content Framework/                       # Brand strategy, format definitions, workflow, prompts, content model
│   ├── Brand View.md
│   ├── Brand Voice.md
│   ├── Carousels.md
│   ├── Reels.md
│   ├── Stories.md
│   ├── Content Format.md
│   ├── Content Pipeline.md
│   ├── Generating Content Prompts.md
│   ├── Posted Titles.md
│   └── Content Model.md
│
├── Carousel Structure/                      # Carousel render pipeline: template → data → HTML → CSS
│   ├── template.hbs                         # Handlebars template (6 slide layouts: cover, box-list, arrow-list, grid-2x2, bullet-list, final-cta)
│   ├── render.js                            # Node.js script: compiles template.hbs + JSON data → index.html
│   ├── summer-building-foundations.json     # Current carousel data (ALL CAPS keys for Handlebars)
│   ├── index.html                           # Rendered output (populated by render.js)
│   ├── styles.css                           # Design system: 1080×1080px, dark theme, RTL, Google Fonts
│   ├── sample-data.json                     # Reference data (lowercase keys, documentation style)
│   └── package.json                         # devDependencies: handlebars ^4.7.9
│
├── templates/                               # Reusable template structures for future variants
│   └── carousel/
│       └── schema.json                      # Descriptive data model (version 1.0, documentation-only)
│
├── Export Files/                            # Playwright-based slide export pipeline
│   ├── package.json
│   ├── export-config.js
│   ├── export-slides.js
│   ├── extracted-slides/                    # 7 PNG files (slide-01.png through slide-07.png)
│   └── package-lock.json
│
├── Content Posted/                          # Published content archive by platform
│   ├── LinkedIn/                            # 5 posts (post.md + metadata.json each)
│   └── Instagram/
│       └── Instagram Carousel/              # 5 posts (assets/ + metadata.json each)
│
├── Draft Carousel - Refined.md              # Approved draft: "This Summer, I'm Building Foundations"
│
└── docs/
    └── 01- Framework Architecture.md        # This file
```

Note on missing items: `docs/Content System Improvement.md`, `docs/Framework Refactoring Plan.md`, and `.github/workflows/export.yml` are referenced in earlier planning but do not exist in the current codebase.

---

## Folder-by-Folder Breakdown

### `Content Framework/`

The strategic core of the system. Ten markdown files that together define the brand identity, voice, content types, planning logic, production workflow, AI-generation instructions, and canonical content model. This folder is the **source of truth** for all content decisions.

| File                            | Description                                                                                                                                                                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Brand View.md`                 | Defines the creator identity (Lebanese CS student), target audience, core messaging lens, content boundaries, and content pillars. Owns _who the creator is_ and _what the brand covers_. Exists to keep every content piece consistent with the "student-in-public" identity. |
| `Brand Voice.md`                | Single Source of Truth for all writing voice, tone, stylistic rules, platform rules, and language strategy. Owns _how the creator writes and adapts content per platform_. All other documents reference this for voice and platform guidance.                                 |
| `Carousels.md`                  | Defines 4 carousel types and mandates a 5-slide structure (Hook → Trigger → Body → Project Bridge → CTA). Exists to ensure all carousel content follows a repeatable, scannable format.                                                                                     |
| `Reels.md`                      | Defines 3 reel types with environment authenticity rules (student-setting clips) and hook patterns. Exists to distinguish quick-format content from deep-dive carousels.                                                                                                    |
| `Stories.md`                    | Defines 5 story categories focused on daily, unpolished, low-friction engagement. Exists to keep stories intentional rather than noisy.                                                                                                                                     |
| `Content Format.md`             | Owns the Trigger-First planning logic and format selection — given a trigger, which format should this become? Exists as the bridge between content ideas and format selection.                                                                                              |
| `Content Pipeline.md`           | Owns the complete Content Lifecycle (Trigger → Idea → Format Selection → Draft → Review → Final Assets → Published → Archived) and production responsibility matrix. Exists to make the content production process repeatable and clearly owned.                              |
| `Generating Content Prompts.md` | Five isolated AI prompt templates (Post Idea Generator, Post Content Builder, Carousel Renderer, Story Idea Generator, Story Content Builder) that consume framework documents via @-references. Exists to orchestrate the framework into AI-executable instructions without embedding framework rules. |
| `Posted Titles.md`              | Searchable index of published content with archive path references. Exists to prevent idea duplication and provide a lightweight lookup table for the Post Idea Generator.                                                                                                   |
| `Content Model.md`              | Canonical structured content model defining the shape of every content item — identity, trigger, metadata, platform variants, bodies, archive. Defines the JSON schema and renderer interface that future tooling will consume. Prepares the system for structured data generation.                  |

---

### `Carousel Structure/`

A complete carousel render pipeline rather than a static template. `template.hbs` is the reusable Handlebars template supporting 6 slide layouts (`TYPE_COVER`, `TYPE_BOX_LIST`, `TYPE_ARROW_LIST`, `TYPE_GRID_2X2`, `TYPE_BULLET_LIST`, `TYPE_FINAL_CTA`) with conditional blocks. `render.js` reads `template.hbs` + a JSON data file (currently `summer-building-foundations.json`), injects shared fields (USERNAME, FOOTER_NAME, FOOTER_HANDLE, SWIPE) into each slide, and writes `index.html`. The design system (`styles.css`) is a 1080×1080px dark-theme layout with RTL support, Google Fonts (Tajawal, Nunito, Pacifico, Caveat), section tag color variants (win/mac/lin/cons), and reusable component classes. `sample-data.json` preserves the original "Confusion is Learning" carousel as lowercased reference documentation.

The pipeline: **Draft markdown → structured JSON → Handlebars render → HTML → Playwright export → PNGs**.

### `Export Files/`

A Node.js project using Playwright to screenshot each `.slide` element from the carousel HTML into individual PNG files. `export-slides.js` reads its settings from `export-config.js`, which controls URL, slide selector, viewport dimensions (1920×1080 @2x), output directory, and filename pattern. All settings can be overridden via CLI arguments (`--url`, `--output`, `--selector`, `--width`, `--height`, `--scale`, `--headless`). Run `npm run serve` to start the local server (http-server on port 8000), then `npm run export` to export slides. The pipeline currently produces 7 platform-ready carousel images in `extracted-slides/`.

### `Content Posted/`

Archive of published content organized by platform. LinkedIn contains 5 posts, each with `post.md` (markdown body) and `metadata.json`. Instagram contains 5 carousel posts under `Instagram Carousel/`, each with image assets in an `assets/` subfolder and `metadata.json`. Note: all 10 posts have empty `published_date`, `content_pillar`, and `tags` fields across their metadata files. Instagram posts have empty `title` fields and no caption files. Carousel source data (JSON) is not archived alongside assets.

### `templates/`

Contains `carousel/schema.json` — a descriptive data model document (not a formal JSON Schema). It defines version 1.0 of the data structure for populating a carousel template: `meta` (title, lang, direction, username, footer fields) and a `slides` array with type, number, section_tag, label, title, teasers, items, grid_items, summary, quote, cta, and swipe fields.

### Root-level files

`Draft Carousel - Refined.md` is the approved 7-slide draft for the "This Summer, I'm Building Foundations" carousel (Lebanese Arabic + English LinkedIn adaptation). This file is the output of the Post Content Builder agent and the input to the Carousel Renderer agent.

### `docs/`

Contains only `01- Framework Architecture.md` (this file). The previously referenced `Content System Improvement.md` and `Framework Refactoring Plan.md` do not exist.

---

## System Workflow

The framework operates across six phases that connect the documents into a cohesive system:

### 1. Strategy

`Brand View.md` defines the foundational identity and boundaries — who the creator is, what the brand covers, and what it is not. `Brand Voice.md` defines the brand voice, platform rules, and language strategy — how the creator writes and adapts content per platform. Both documents influence every downstream decision.

### 2. Content Planning

`Content Format.md` owns the **Trigger-First** planning logic ("Given a trigger, what format should this become?") and provides format selection rules. `Carousels.md`, `Reels.md`, and `Stories.md` define what each format is for, so the right format can be matched to the right idea. Stages 1–3 of the Content Lifecycle (Trigger → Idea → Format Selection) are planned here.

### 3. Content Creation

`Generating Content Prompts.md` orchestrates the framework documents into AI-executable instructions via @-references. It does not contain framework rules — it only provides execution logic. Its five agents handle separate responsibilities:

- **Post Idea Generator** produces 3 ideas using Brand View, Brand Voice, format docs, Pipeline, and Posted Titles (duplication prevention).
- **Post Content Builder** transforms a selected idea into a full draft (`Draft Carousel.md`), following a 7-step carousel workflow and referencing Brand Voice for language and platform rules.
- **Carousel Renderer** consumes the draft and populates the Handlebars template with structured JSON data, generating the final `index.html`.
- **Story Idea Generator** and **Story Content Builder** handle the lighter story track.

### 4. Carousel Render Pipeline

The production pipeline converts draft content to publishable assets:

1. **Draft** → `Draft Carousel - Refined.md` (Post Content Builder output)
2. **Structure** → `summer-building-foundations.json` (structured JSON with ALL CAPS keys)
3. **Template** → `template.hbs` → compiled via Handlebars in `render.js`
4. **HTML** → `index.html` (populated with content, linked to `styles.css`)
5. **Export** → `export-slides.js` (Playwright screenshots each `.slide` to PNG)
6. **Assets** → `extracted-slides/slide-01.png` through `slide-07.png`

### 5. Repurposing

Content is adapted per-platform rather than translated. Platform rewriting rules are owned by `Brand Voice.md` (Platform Rewriting Rules section). A single carousel generates two outputs: an Instagram version (Lebanese Arabic + English technical terms) and a LinkedIn version (English only, professional framing). Reels produce an Instagram-only output.

### 6. Publishing

Carousels are rendered through the `Carousel Structure/` pipeline, then exported to PNGs via the Playwright script in `Export Files/`. LinkedIn posts are published as text. The human-in-the-loop handles final upload and posting.

### 7. Continuous Improvement

`Posted Titles.md` provides a lightweight feedback loop by preventing idea duplication. The system tracks its own metadata completeness gaps (empty date/pillar/tags fields) as opportunities for improvement.

---

## Document Relationships

The framework documents form a directed information flow:

```
Brand View.md  ──────────►  Brand Voice.md
(creator identity,          (voice, platform rules, language strategy)
 audience, pillars)                │
       │                           │
       ├──► Carousels.md     ◄─────┘ (format rules reference voice/platform)
       ├──► Reels.md         ◄─────┘ (authenticity rules reference voice)
       ├──► Stories.md       ◄─────┘ (unpolished mandate references voice)
       └──► Content Pipeline.md ◄──┘ (quality gates reflect brand voice)
              │
              ▼
        Content Format.md  ──►  Carousels.md, Reels.md, Stories.md
        (trigger-first logic, format selection, planning stages 1–3)
              │
              ▼
        Content Pipeline.md   (lifecycle stages 4–8, ownership matrix,
         references Brand View, Brand Voice, Content Format, format docs)
              │
              ▼
        Generating Content Prompts.md
        (consumes framework docs via @-references; orchestrates 5 agents)
         ├──► Posted Titles.md  (consulted by Post Idea Generator)
         └──► Draft Carousel - Refined.md
                │
                ▼
              Carousel Structure/
         ├── summer-building-foundations.json
         ├── template.hbs + render.js  →  index.html
         └── styles.css
                │
                ▼
              Export Files/
         ├── export-config.js
         └── export-slides.js  →  extracted-slides/*.png
                │
                ▼
              Content Posted/  (archive)

        Content Model.md     (canonical JSON schema and renderer interface;
         forward-looking definition, not yet consumed by framework docs)
```

Key relationships:

- `Brand View.md` and `Brand Voice.md` are co-root documents — identity and voice are separate concerns that both influence downstream documents.
- `Content Format.md` owns planning (stages 1–3). `Content Pipeline.md` owns production through archive (stages 4–8). No overlap.
- `Generating Content Prompts.md` is the orchestrator — it references framework documents via @-references and produces AI-executable instructions. It does not define framework rules. Its five agents cover idea generation, content building, carousel rendering, and story production.
- `Content Model.md` defines the canonical JSON schema and renderer interface for all content types. It is a forward-looking definition that prepares the system for structured data generation. It is not yet consumed by other framework documents.
- `Posted Titles.md` is only consumed by the Post Idea Generator agent and does not influence other documents.
- The production layer (`Carousel Structure/`, `templates/`, `Export Files/`, `Content Posted/`) is downstream of the framework documents. It consumes structured data and never defines brand, format, or platform rules.
- `Draft Carousel - Refined.md` is the bridge between the Post Content Builder agent and the Carousel Renderer agent.
