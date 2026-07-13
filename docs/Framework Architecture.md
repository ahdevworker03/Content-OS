# Framework Architecture — Social Media Content System

## Executive Summary

This repository contains a **personal brand content framework** for a Lebanese Computer Science student who documents his learning journey in public. The framework produces authentic, student-perspective content across Instagram (carousels, reels, stories) and LinkedIn (professional posts).

The system is built on three functional layers: **strategic definition** (brand identity, format rules, workflow), **production and rendering** (HTML carousel templates and Playwright-based PNG export), and **archiving** (published content organized by platform). It is AI-assisted — the framework documents serve as instruction sources for an LLM content generation agent.

Design philosophy: every piece of content originates from a real trigger (a bug, a lecture, a project issue), passes through a consistent brand lens, and is adapted per-format and per-platform rather than copied.

---

## Repository Overview

```
Social Media Content/
├── Content Framework/                       # Brand strategy, format definitions, workflow, prompts
│   ├── Brand View.md
│   ├── Carousels.md
│   ├── Reels.md
│   ├── Stories.md
│   ├── Content Format.md
│   ├── Content Pipeline.md
│   ├── Generating Content Prompts.md
│   └── Posted Titles.md
│
├── Carousel Structure/                      # HTML/CSS carousel template + design system
│   ├── index.html
│   └── styles.css
│
├── Export Files/                            # Playwright-based slide export pipeline
│   ├── package.json
│   ├── export-slides.js
│   └── extracted-slides/
│
├── Content Posted/                          # Published content archive by platform
│   ├── Linkedln/
│   └── Instagram/
│       └── Instagram Carousel/
│
└── docs/
    ├── Content System Improvement.md        # Roadmap and evolution plan
    └── Framework Architecture.md            # This file
```

---

## Folder-by-Folder Breakdown

### `Content Framework/`

The strategic core of the system. Eight markdown files that together define the brand identity, content types, tone, production workflow, and AI-generation instructions. This folder is the **source of truth** for all content decisions.

| File                            | Description                                                                                                                                                                                                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Brand View.md`                 | Defines the creator identity (Lebanese CS student), target audience, core messaging lens, tone guidelines, platform language strategy, and content boundaries (what the brand is NOT). Exists to keep every content piece consistent with the "student-in-public" identity. |
| `Carousels.md`                  | Defines 4 carousel types and mandates a 5-slide structure (Hook → Trigger → Body → Project Bridge → CTA). Exists to ensure all carousel content follows a repeatable, scannable format.                                                                                     |
| `Reels.md`                      | Defines 3 reel types with environment authenticity rules (student-setting clips) and hook patterns. Exists to distinguish quick-format content from deep-dive carousels.                                                                                                    |
| `Stories.md`                    | Defines 5 story categories focused on daily, unpolished, low-friction engagement. Exists to keep stories intentional rather than noisy.                                                                                                                                     |
| `Content Format.md`             | Distribution balance guidelines across all formats and introduces the**Trigger-First** planning logic. Exists as the bridge between content ideas and format selection.                                                                                                     |
| `Content Pipeline.md`           | Step-by-step workflow from trigger identification through format selection to quality control (Expert Filter Check, Visual Vibe Check). Exists to make the content production process repeatable.                                                                           |
| `Generating Content Prompts.md` | Four isolated LLM prompt templates (Post Idea Generator, Post Script Builder, Story Idea Generator, Story Script Builder). References other framework documents as @-inputs. Exists to encode the entire framework into AI-executable instructions.                         |
| `Posted Titles.md`              | List of previously published titles for duplication prevention. Exists to help the AI agent avoid repeating ideas.                                                                                                                                                          |

---

### `Carousel Structure/`

A working HTML/CSS carousel implementation that serves as both a visual template and a rendering target for the export pipeline. `index.html` contains an 8-slide carousel in Lebanese Arabic following the carousel schema. `styles.css` is a 1080×1080px dark-theme design system with RTL layout support and reusable component classes. This is the **only physical template** in the system — new carousels are produced by populating its structure.

### `Export Files/`

A Node.js project using Playwright to screenshot each `.slide` element from the carousel HTML into individual PNG files. `export-slides.js` navigates to the locally served HTML, locates all `.slide` divs, and saves them to `extracted-slides/`. The pipeline requires a running Live Server instance and produces platform-ready carousel images.

### `Content Posted/`

Archive of published content organized by platform. LinkedIn posts are stored as text-only markdown files. Instagram carousels are stored as numbered PNG/JPG slide sequences grouped by post. Note: the LinkedIn folder has a naming inconsistency (`Linkedln/` instead of `LinkedIn/`).

### `docs/`

Contains `Content System Improvement.md` — a 10-phase, todo-style roadmap for evolving the framework (brand voice refinement, platform rules, hook library, JSON content model, React rendering). All items are currently unchecked.

---

## System Workflow

The framework operates across six phases that connect the documents into a cohesive system:

### 1. Strategy

`Brand View.md` defines the foundational identity and boundaries. It influences every downstream document — content format rules, tone, language strategy, and platform roles. All other decisions must be compatible with this layer.

### 2. Content Planning

`Content Format.md` provides distribution balance guidelines and the **Trigger-First** logic ("What happened today?"). `Carousels.md`, `Reels.md`, and `Stories.md` define what each format is for, so the right format can be matched to the right idea. `Content Pipeline.md` formalises the selection flow.

### 3. Content Creation

`Generating Content Prompts.md` encodes the planning and format documents into AI-executable instructions. Its four agents handle separate responsibilities:

- **Post Idea Generator** produces 3 ideas using Brand View, format docs, Pipeline, and Posted Titles (duplication prevention).
- **Post Script Builder** transforms a selected idea into publishable content, following a 7-step carousel workflow.
- **Story Idea Generator** and **Story Script Builder** handle the lighter story track.

### 4. Repurposing

Content is adapted per-platform rather than translated. A single carousel generates two outputs: an Instagram version (Lebanese Arabic + English technical terms) and a LinkedIn version (English only, professional framing). Reels produce an Instagram-only output. This repurposing logic is defined in both `Content Format.md` and `Generating Content Prompts.md`.

### 5. Publishing

Carousels are rendered through the `Carousel Structure/` HTML template, then exported to PNGs via the Playwright script in `Export Files/`. LinkedIn posts are published as text. The human-in-the-loop handles final upload and posting.

### 6. Continuous Improvement

`docs/Content System Improvement.md` tracks planned evolutions (hook library, JSON content model, React rendering layer). `Posted Titles.md` provides a lightweight feedback loop by preventing idea duplication.

---

## Document Relationships

The framework documents form a directed information flow:

```
Brand View.md
  │
  ├──► Carousels.md      (format rules must align with brand identity)
  ├──► Reels.md          (authenticity rules derived from brand tone)
  ├──► Stories.md        (unpolished mandate from brand boundaries)
  ├──► Content Format.md (platform language strategy from brand)
  └──► Content Pipeline.md (quality gates reflect brand voice)
         │
         ▼
   Content Format.md  ◄──►  Carousels.md, Reels.md, Stories.md
   (distribution balance, trigger-first logic connects to all format docs)
         │
         ▼
   Content Pipeline.md  (references Brand View, Content Format, and format docs)
         │
         ▼
   Generating Content Prompts.md
   (consumes ALL framework docs as @-inputs; encodes them into 4 agent prompts)
         │
         ▼
   Posted Titles.md  (consulted by Post Idea Generator for duplication prevention)
```

Key relationships:

- `Brand View.md` is the root dependency — every other document inherits constraints from it.
- `Content Format.md` sits between planning and execution, connecting to all three format-specific documents.
- `Content Pipeline.md` is the procedural hub that sequences planning, format selection, and quality checks.
- `Generating Content Prompts.md` is the terminal consumer — it references every other document and produces the executable output.
- `Posted Titles.md` is only consumed by the Post Idea Generator agent and does not influence other documents.
- The `Carousel Structure/` HTML and `Export Files/` pipeline are downstream of the framework documents but have no reverse feedback into them.

---
