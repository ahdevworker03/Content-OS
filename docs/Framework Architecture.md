# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content system** for a Lebanese Computer Science student documenting his learning journey in public. The system is designed to produce authentic, student-perspective content across **Instagram** (carousels + reels + stories) and **LinkedIn** (professional posts). The architecture is split into three functional layers:

1. **Strategic Definition** — who the brand is, what it says, how it sounds (`Content Framework/`)
2. **Production & Rendering** — how carousels are visually built and exported (`Carousel Structure/`, `Export Files/`)
3. **Archive** — what has been posted and where (`Content Posted/`)

A fourth layer exists as a **roadmap/improvement plan** in `docs/`.

The system is **AI-assisted**: the `Content Framework/Generating Content Prompts.md` file defines 4 prompt templates (post ideas, post scripts, story ideas, story scripts) that reference the other framework files as instruction sources for an LLM-based content generation agent.

---

## Repository Overview

```
Social Media Content/
├── MovieShelf_Reel_Script.md                # Standalone production script (not part of framework)
│
├── Content Framework/                        # Core brand & content strategy
│   ├── Brand View.md                         # Brand identity, audience, tone, platform strategy
│   ├── Carousels.md                          # Carousel format definition & structure
│   ├── Reels.md                              # Reel format definition & structure
│   ├── Stories.md                            # Story format definition & structure
│   ├── Content Format.md                     # Content distribution logic (format balance)
│   ├── Content Pipeline.md                   # End-to-end workflow: trigger → format → execute
│   ├── Generating Content Prompts.md         # AI prompt templates (4 agents)
│   └── Posted Titles.md                      # Published post titles (duplication prevention)
│
├── Carousel Structure/                       # Render-ready HTML/CSS carousel templates
│   ├── index.html                            # 8-slide carousel example in Lebanese Arabic
│   └── styles.css                            # Complete styling system (1080×1080px)
│
├── Export Files/                             # Automation to export slides as PNGs
│   ├── package.json                          # Node.js project (Playwright dependency)
│   ├── export-slides.js                      # Playwright script → screenshots each .slide div
│   ├── extracted-slides/                     # Output: 8 PNG images (slide-01 to slide-08)
│   └── node_modules/                         # Playwright runtime
│
├── Content Posted/                           # Published content archive
│   ├── Linkedln/                             # LinkedIn posts (English, text-only)
│   └── Instagram/
│       └── Instagram Carousel/               # visual carousel posts (PNG/JPG slides)
│
└── docs/
    ├── Content System Improvement.md         # 10-phase roadmap for system evolution
    └── Framework Architecture.md             # This file
```

---

## Folder-by-Folder Breakdown

### `Content Framework/` — The Strategic Core

This folder contains **8 markdown files** that together define the brand, content types, tone, workflows, and AI-generation instructions. It is the **source of truth** for all content decisions.

| File                            | Role                                                                                                                                                                                                             |
| ------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Brand View.md`                 | Defines the creator identity (Lebanese CS student), audience, core lens, tone, platform language strategy, and content boundaries. The "constitution" of the system.                                             |
| `Carousels.md`                  | Defines 4 carousel types (Educational, Education+Opinion, Project Thinking, Project Documentation). Mandates a 5-slide mandatory structure: Hook → Trigger → Body → Project Bridge → CTA.                        |
| `Reels.md`                      | Defines 3 reel types (Quick Insights, Personal Reflection, Project Clips). Mandates environment authenticity (student setting clips) and "Facepalm" hooks.                                                       |
| `Stories.md`                    | Defines 5 story categories (Learning Journey, Unpolished 20%, Quick Value, Interaction, Project Updates). Emphasizes low-friction, unpolished authenticity.                                                      |
| `Content Format.md`             | Distribution balance guidelines (e.g. 50% educational carousels, 50% quick-tip reels). Introduces the**Trigger-First** content planning logic.                                                                   |
| `Content Pipeline.md`           | Step-by-step workflow: Trigger → Format Selection → Execution Rules. Includes an "Expert Filter" check and "Visual Vibe Check" for quality control.                                                              |
| `Generating Content Prompts.md` | 4 isolated prompt templates for an AI agent. The longest file (654 lines). References all other framework files as @-inputs. Defines the Carousel Production Workflow (7 steps) and Reel/Caption/LinkedIn rules. |
| `Posted Titles.md`              | 5 previously published titles used for duplication prevention by the AI agent. Currently flat text only,**no metadata** (date, format, pillar).                                                                  |

### `Carousel Structure/` — The Visual Template

This folder contains a **single working carousel implementation** in HTML + CSS. It serves as both a template and a rendering target for the export pipeline.

- `index.html`: 8-slide carousel in Lebanese Arabic. Each slide is a `.slide` div inside a `.slide-wrapper`. Slides follow the mandatory structure from `Carousels.md` (Hook → Trigger → Body → Real Moments → Process → Growth → CTA).
- `styles.css`: 449-line design system. 1080×1080px slides. Dark theme (`#1a0f08` background, `#f5a84a` orange accent). Uses Tajawal (Arabic) + Pacifico/Caveat/Nunito/Courier New fonts. RTL layout. Includes: box-l, box-l2, arrow-list, grid4, bullet-row, footer-line components.

### `Export Files/` — The Automation Layer

Node.js project using **Playwright** to screenshot each carousel slide as a PNG.

- `package.json`: Minimal — one dependency (`playwright ^1.61.1`).
- `export-slides.js`: Launches Chromium, navigates to `http://127.0.0.1:5500/Carousel%20Structure/index.html` (Live Server URL), locates all `.slide` elements, screenshots each one into `extracted-slides/`.
- `extracted-slides/`: Contains 8 PNG outputs from the last export run.

**Observations**: The Live Server URL is hardcoded. There is no npm script defined for running the export. The export script assumes the `Carousel Structure/` HTML is running locally.

### `Content Posted/` — The Archive

- `Linkedln/` (note the typo: "Linkedln" not "LinkedIn"): 5 English text posts. Each is a self-contained markdown file. Topics progress: introduction → CS breadth → non-technical skills → operating systems → reading errors. These map to the first 5 entries in `Posted Titles.md`.
- `Instagram/Instagram Carousel/`: 5 posts with 6–11 slides each. Post 4 images are processed through Picsart (filename pattern `*-Picsart-AiImageEnhancer.png`). **No markdown or metadata files** — only images. No LinkedIn-level captions or scripts archived here.

### `docs/` — The Roadmap

- `Content System Improvement.md`: 10-phase, 529-line improvement checklist. Proposes: brand voice refinement, platform rules, hook library, format restructuring, rewriting logic, stories support, output packages, archiving, JSON content model, and React rendering. All items are unchecked (todo-style).
- `Framework Architecture.md`: Previously empty — now contains this document.

### Root-level file

- `MovieShelf_Reel_Script.md`: Complete ~55-second reel script for an Instagram Reel about a React project (MovieShelf). Full production notes, Arabic captions, timing check. **Not referenced by any framework file.** It is an executed output, not framework documentation.

---

## Content Framework Architecture

The framework is built around a **Trigger-First model**:

```
Real Experience (bug, lecture, confusion)
       |
       v
  Trigger Identified
       |
       v
  Format Selected (Carousel / Reel / Story)
       |
       v
  Brand Lens Applied ("I learned", student perspective)
       |
       v
  Platform Adaptation (Arabic+English for IG, English for LinkedIn)
       |
       v
  Output (slides / script / caption / post)
```

**Key architectural principles:**

1. **Identity-Constrained**: Every content piece must pass through the `Brand View.md` lens. Content boundaries are explicitly defined (NOT an expert, NOT motivational, NOT abstract theory).
2. **Format-Specific Rules**: Each format (`Carousels.md`, `Reels.md`, `Stories.md`) has its own purpose, structure, and style rules that are distinct from each other.
3. **Trigger-First**: Content originates from a real event. "What happened today?" is the starting question (`Content Pipeline.md:5-6`).
4. **Bilingual by Platform**: Instagram = Lebanese Arabic + English tech terms. LinkedIn = English only. Adaptation is required, translation is forbidden.
5. **Student-Centric Quality Gates**: Expert Filter Check ("Does this sound like a teacher?") and Visual Vibe Check ("Does this look too clean?").

**Content Progression (soft rule):** `Generating Content Prompts.md:132-148` defines a preferred progression from CS fundamentals → web development → advanced topics, to show an evolving journey rather than disconnected posts.

---

## Export/Connection Flow

The production pipeline connects framework → render → export:

```
Content Framework/            Carousel Structure/          Export Files/
┌──────────────────┐         ┌──────────────────┐         ┌──────────────────┐
│ Carousels.md      │         │ index.html        │         │ package.json      │
│ (structure rules) │─────→   │ (populated with   │─────→   │ export-slides.js   │
│ Content Pipeline  │         │  carousel content)│         │ (Playwright       │
│ Generating        │         │ styles.css        │         │  screenshots)     │
│ Content Prompts   │         └──────────────────┘         │ extracted-slides/ │
└──────────────────┘                                       │ (PNG output)     │
                                                           └──────────────────┘
```

The flow described in `Generating Content Prompts.md` (Step 1–7, lines 290–410):

1. Build the story (Trigger → Problem → Confusion → Discovery → Lesson)
2. Create master script in English
3. Translate to Lebanese Arabic
4. Read existing carousel structure (the HTML)
5. Populate the structure (fill placeholders)
6. Implement fully (replace HTML placeholders)
7. Pre-output compliance check

**The export pipeline is manual**: developer runs Live Server on the HTML → runs `node export-slides.js` → PNGs appear in `extracted-slides/`.

**Missing connections**:

- No automated path from "content idea" to "populated HTML carousel" — the AI generates text, but human must manually insert it into the HTML.
- No automated path from carousel HTML to "posted to Instagram" — PNGs are exported but need manual upload.
- LinkedIn posts are text-only markdown files with no connection to the visual carousel pipeline.
- The Instagram carousel archive (PNG files) has no metadata linking it back to `Posted Titles.md` or the framework documents.

---

## Final Mental Model of the System

```
                         ┌─────────────────────────────┐
                         │      Brand Identity         │
                         │   (Brand View.md)           │
                         │   Lebanese CS Student       │
                         │   Learning in Public        │
                         └─────────────┬───────────────┘
                                       │
                         ┌─────────────▼───────────────┐
                         │   Content Trigger           │
                         │   (real bug / lecture /     │
                         │    confusion / project)      │
                         └─────────────┬───────────────┘
                                       │
                    ┌──────────────────┼──────────────────┐
                    │                  │                  │
         ┌──────────▼──────┐  ┌───────▼───────┐  ┌──────▼──────┐
         │   Carousel      │  │   Reel        │  │   Story     │
         │ (deep dive)     │  │ (quick tip)   │  │ (daily)     │
         └──────────┬──────┘  └───────┬───────┘  └──────┬──────┘
                    │                  │                  │
         ┌──────────▼──────┐  ┌───────▼───────┐  ┌──────▼──────┐
         │ HTML + CSS      │  │ Script +      │  │ Frame-by-   │
         │ Carousel        │  │ Visual Plan   │  │ frame plan  │
         └──────────┬──────┘  └───────┬───────┘  └──────┬──────┘
                    │                  │                  │
         ┌──────────▼──────┐  ┌───────▼───────┐         │
         │ Playwright      │  │ Manual        │         │
         │ Export → PNGs   │  │ Recording     │         │
         └──────────┬──────┘  └───────┬───────┘         │
                    │                  │                  │
                    └──────────────────┼──────────────────┘
                                       │
                         ┌─────────────▼───────────────┐
                         │   Dual-Platform Output       │
                         │   Instagram (Arabic)         │
                         │   LinkedIn (English)          │
                         └─────────────┬───────────────┘
                                       │
                         ┌─────────────▼───────────────┐
                         │   Archive                   │
                         │   Content Posted/           │
                         │   (LinkedIn: .md, IG: .png) │
                         └─────────────────────────────┘
```

The system is **content-strategy-first, production-second**. The heavy investment is in defining brand, tone, and workflow rules (8 framework files + 1 prompt file). The production pipeline is minimal (HTML → Playwright → PNGs). The archive is basic (text or images, no metadata).

The most sophisticated piece is `Generating Content Prompts.md` (654 lines), which acts as the **bridge between human strategy and AI execution**. It encodes the entire framework into prompt instructions, making the AI agent a disciplined content producer within the brand's boundaries.

The system is **designed for a single creator** managing both strategy and execution. It is not a multi-user CMS or a fully automated pipeline — it is a structured but human-in-the-loop content operation.
