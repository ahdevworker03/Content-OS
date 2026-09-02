# 01 — Product Vision

## 1. Purpose

This document defines **what the product is**, **who it is for**, and **what it should become**. It defines product direction and user outcomes.

It does **not** define database schemas, APIs, package structure, renderer internals, or Studio architecture. Those live in the architecture documents. It is also not a roadmap — it describes the next stage and long-term direction, not a task list.

---

## 2. Product Definition

The product is evolving from an agent-driven Content OS into a **self-service content-creation application**.

The core idea: a user should be able to describe what they want to communicate, and the system should help turn that idea into structured, polished, visually consistent social content — without technical knowledge of prompts, Markdown, JSON, renderer internals, terminal commands, or layout implementation.

This is not a generic AI text generator. It combines:

- content understanding
- structured planning
- writing intelligence
- design intelligence
- deterministic rendering
- human review/editing
- export

---

## 3. Problem

Many creators know *what* they want to say, but struggle with the *how*:

- how to structure a strong carousel
- how to write effective prompts
- how to understand design systems
- how to choose layouts
- how to keep content visually consistent
- how to avoid jumping between multiple tools

Generic AI content tools make this worse in specific ways:

- output can be unstructured
- tone can feel generic
- design and writing are disconnected
- users often need to prompt well to get good results
- generated content is often not ready to publish

The product exists to close that gap: turn an idea into structured, on-brand, publish-ready content.

---

## 4. Target User

The primary user is a **creator, student, professional, freelancer, small business owner, or subject-matter expert** who has ideas or experiences to share, but does not want to become an expert in:

- copywriting
- prompt engineering
- visual design
- carousel layout
- content-production tooling

The product should be usable by people with little technical knowledge. It is **not** limited to developers or students — the current single-creator workflow is the *first* use case, not the final market.

---

## 5. Core User Promise

> **Describe what you want to communicate. The system helps turn it into a polished, editable, publish-ready post.**

Supporting promises:

- You describe the idea, not the implementation.
- The system helps structure the content before writing.
- The system generates content that follows your voice and preferences.
- The system chooses or suggests suitable layouts.
- You can review and edit before export.
- You do not need to understand the internal content model or renderer.
- Final output is deterministic and exportable.

---

## 6. Product Experience

The target experience:

1. User opens the product.
2. User describes an idea or what they want to communicate.
3. The system understands the intent.
4. The system produces a concise content brief.
5. The user approves or adjusts the direction.
6. The system generates the post.
7. The system selects suitable visual structure and layouts.
8. The user previews the result.
9. The user edits content, or asks the AI to revise specific parts.
10. The user adjusts visual style using simple controls or natural-language instructions.
11. The system validates the result automatically.
12. The user exports the final content.

**Principle:** the complexity stays inside the system. The user should not be exposed to workflow numbers, schemas, JSON, Markdown source files, internal layout identifiers (unless using advanced controls), or terminal export commands.

---

## 7. What Makes the Product Different

#### Structured before generated
The system understands and plans the content before producing final slides.

#### Content and design are connected
Visual structure is chosen based on the role and purpose of each slide.

#### AI with guardrails
AI produces structured decisions inside known rules, not arbitrary uncontrolled output.

#### Deterministic rendering
Once content and design structure are approved, the renderer produces predictable output.

#### Human control
The user always reviews and can edit before export.

#### Personalization
Over time, the system learns the user's brand, tone, language, audience, and recurring design preferences.

---

## 8. Simplicity Principle

> **The user describes outcomes; the system handles implementation details.**

The user should be able to say:

- "Make this more professional."
- "Use a minimal dark style."
- "Make slide 3 shorter."
- "Make the carousel more educational."
- "Use my normal brand style."

The user should **not** need to say:

- use layout X
- modify JSON field Y
- change CSS token Z
- run prompt 03
- regenerate renderer data

Advanced controls may exist later, but they should never be required for normal use.

---

## 9. Design Freedom Without Design Expertise

Users should be able to:

- choose a preset style
- use their saved brand style
- describe a style in natural language
- make simple adjustments to colors, typography, spacing, and visual tone

The system translates those choices into constrained design rules and tokens.

The product should provide **guided** design freedom — it is not Figma or Canva, and it does not offer arbitrary free-form canvas design. The renderer stays structured and predictable.

---

## 10. Current Product Stage

Today the product is an **agent-driven Content OS**: a file-based content lifecycle, manual workflow prompts, the current Studio, a deterministic carousel renderer, and an export system — a working single-creator process.

This already proves the content-generation and rendering workflow end to end. But the user still must:

- interact with an agent manually
- run workflow prompts
- work with repository files
- use the current single-carousel workspace

**The product is not self-service yet.**

---

## 11. Next Product Stage

The immediate goal is **Self-Service Carousel Creation**: a single user can create a complete carousel from an idea entirely through the application, without directly editing repository files or manually running agent workflow prompts.

Expected flow:

```
Dashboard → New Carousel → Describe idea → AI brief → Approve / adjust
  → Generate content → Generate/select design → Studio/editor
    → Review/edit → Validate → Export
```

This is the next milestone. It does **not** include multi-tenancy, billing, subscriptions, team management, or complex publishing integrations.

---

## 12. Long-Term Direction

Long-term, the product may become a **multi-user SaaS** where users can:

- create accounts
- create and manage workspaces
- define brands
- store voice and design preferences
- create multiple posts
- manage drafts and published content
- generate carousels, reels, stories, and other formats
- reuse brand and design systems
- collaborate
- export or publish content

These are **long-term directions, not current requirements**. The product must first prove the single-user self-service creation loop.

---

## 13. Product Boundaries

For now, the product is **not**:

- a general-purpose graphic design application
- a full video editor
- a social-media scheduling platform
- a marketing analytics suite
- an unrestricted AI agent playground
- a generic chatbot
- a replacement for Figma or Canva

Its focus is narrow:

> Helping people turn ideas into structured, polished, editable social content with minimal production knowledge.

---

## 14. Success Definition

The next stage succeeds when a user can:

- open the application
- describe a post idea
- get a useful content direction
- generate a complete carousel
- receive sensible layouts and design
- edit specific content visually
- make simple design adjustments
- validate the result
- export final assets

**without** opening Markdown files, editing JSON, running agent prompts manually, using a terminal, or understanding renderer internals.

That is the core success test.

---

## 15. Vision Summary

| | |
|---|---|
| **Current** | Agent-driven Content OS + Studio + deterministic renderer |
| **Next** | Self-service carousel creator |
| **Long-term** | Multi-user content-creation platform — content intelligence, design intelligence, and deterministic rendering working together behind a simple user experience |
