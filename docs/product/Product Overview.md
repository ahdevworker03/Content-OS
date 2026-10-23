## Contents

- [01 — Product Vision](#01--product-vision)
- [02 — Product Principles](#02--product-principles)
- [03 — Core Concepts](#03--core-concepts)
- [04 — Product Workflows](#04--product-workflows)
- [05 — Domain Model](#05--domain-model)

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
- generate Carousels and LinkedIn posts
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

# 02 — Product Principles

## 1. Purpose

This document defines the **principles used to judge product decisions**. It answers four questions about any proposed feature or change:

- Should this feature exist?
- Should this complexity be exposed to the user?
- Does this help the self-service creation loop?
- Does this preserve reliable output?

It is a product decision rulebook, not a technical implementation plan.

---

## 2. Principle 1 — Non-technical users first

The product must be usable by people who are not experts in prompt engineering, copywriting, visual design, content-production tooling, JSON/schema editing, or renderer/layout internals.

Implications:

- use plain language
- avoid exposing workflow numbers
- avoid requiring technical terms
- keep advanced controls optional
- default to guided decisions

---

## 3. Principle 2 — Describe outcomes, not implementation

Users should describe what they want to communicate or change.

Good user requests:

- "Make this more professional."
- "Use a clean dark style."
- "Make slide 3 shorter."
- "Make this carousel more educational."
- "Use my normal brand style."

Bad required user knowledge:

- layout IDs
- JSON fields
- CSS tokens
- workflow prompt numbers
- adapter/renderer details

The system translates outcome-language into structured decisions.

---

## 4. Principle 3 — Structure before generation

The system should understand and plan before producing final content.

Expected order:

```
Capture / ingestion → Qualified READY Idea → Approved Content Brief → Canonical Content
  → Instagram Carousel + LinkedIn Post (current personal Content OS)
  → Design / Rendering where applicable → Review → Export / Publish
```

Reason: this avoids random AI output and preserves content quality. The system establishes canonical meaning before independently adapting it into both fixed current outputs. Carousel slide structure and renderer data belong to Carousel adaptation. This current personal workflow always includes a Carousel; future generalized product configurations are not defined by this rule.

---

## 5. Principle 4 — AI works inside guardrails

AI should produce structured decisions inside known rules.

AI may help with:

- idea clarification
- content brief generation
- copywriting
- slide structure
- layout suggestions
- design direction
- revision requests

AI should not directly own:

- arbitrary DOM/CSS generation
- uncontrolled renderer changes
- hidden publishing actions
- destructive changes without confirmation

AI output should pass through validation and deterministic rendering.

---

## 6. Principle 5 — Content and design are connected

The product should not treat copy and design as separate disconnected steps.

Each slide has a purpose: hook, context, problem, realization, example, takeaway, or CTA.

The system should choose layout and visual emphasis based on slide purpose.

Example: a comparison slide should not use the same structure as a final CTA slide.

---

## 7. Principle 6 — Deterministic rendering is a product feature

Once content and design data are approved, the renderer should produce predictable output.

The user should trust:

- preview matches export
- export does not change wording or layout unexpectedly
- guides never leak into output
- zoom does not affect export
- rendering is repeatable

This principle comes from the existing renderer and Studio architecture.

---

## 8. Principle 7 — Human review remains part of quality

The system should automate generation and validation, but not remove user judgment.

Human review catches:

- tone issues
- awkward phrasing
- dialect problems
- visual balance
- brand fit
- whether the post feels authentic

The user should always be able to review, edit, regenerate, or reject before export/publish.

---

## 9. Principle 8 — Personalization without complexity

The product should learn or store user preferences over time, but avoid forcing setup complexity.

Useful personalization:

- brand identity
- audience
- tone
- language/dialect
- preferred formats
- saved design style
- recurring CTA/footer preferences

Setup must stay lightweight. A user should be able to start with one idea before configuring a full brand profile.

---

## 10. Principle 9 — Guided design freedom

Users should be able to influence visual style without becoming designers.

Allowed direction:

- style presets
- saved brand themes
- natural-language design requests
- simple controls for color, typography, spacing, and tone

Avoid:

- arbitrary free-form canvas editing as the core workflow
- requiring users to understand layout internals
- letting AI generate uncontrolled CSS/React
- turning the product into Figma/Canva too early

Design freedom should be constrained through themes, tokens, layouts, and safe renderer primitives.

---

## 11. Principle 10 — Self-service loop before SaaS complexity

The next product goal is **not** multi-tenancy.

The next goal is: a single user can create, review, edit, validate, and export a carousel entirely through the application.

Postpone until that loop works:

- accounts
- authentication
- workspaces
- teams
- billing
- subscriptions
- tenant-level quotas
- complex publishing integrations
- production-scale AI infrastructure

This principle is strict.

---

## 12. Principle 11 — Keep current architecture valid while evolving it

The current file-based Content OS is not a mistake. It is the working prototype of the product logic.

Current systems may remain while the product evolves:

- framework Markdown
- content files
- workspace carousel JSON
- manual workflows
- Playwright export
- Studio/renderer co-location

Changes should be driven by real product needs, not by trying to prematurely look like a SaaS architecture.

---

## 13. Principle 12 — Advanced power should not block simple use

Advanced controls can exist, but the main workflow must stay simple.

Good:

- advanced layout controls hidden behind an advanced panel
- technical debug tools only in development
- structured data visible only when useful

Bad:

- requiring the user to edit JSON
- requiring layout IDs to create a post
- exposing schema errors as the main UX
- forcing users through setup before creation

---

## 14. Decision Checklist

Use this for any future feature:

1. Does this help the user create better content from an idea?
2. Does it reduce or increase required technical knowledge?
3. Does it keep the self-service loop simpler?
4. Does it preserve deterministic preview/export?
5. Does it keep AI inside structured guardrails?
6. Does it preserve human review before final output?
7. Does it belong now, or is it SaaS complexity too early?
8. Can this be done without exposing internal files, prompts, JSON, or renderer details?
9. Does it respect the current architecture instead of forcing a speculative refactor?
10. Would a low-technical user understand what to do?

---

## 15. Anti-Principles

The product should avoid:

- AI-generated content with no planning
- exposing internal workflow mechanics to users
- arbitrary AI-generated CSS or component code
- premature multi-tenancy
- making the Studio into a full design app too early
- treating export as an afterthought
- removing human review
- optimizing for developer convenience over creator clarity
- adding features because they are technically interesting

---

## 16. Summary

The product should make content creation feel simple while keeping structure, intelligence, validation, and deterministic rendering underneath.

# 03 — Core Concepts

## 1. Purpose

This document defines the **shared product vocabulary** for the Content OS product. It answers, for each core concept:

- what does this concept mean?
- where does it fit in the creation flow?
- what owns it now?
- how might it evolve later?

Using the same language across product, architecture, design, and implementation avoids drift. This is a product document — not a database schema, API spec, or implementation plan.

---

## 2. Concept Map

```
User
  → Workspace
    → Brand
      → Post
        → Content Brief
          → Canonical Content Draft
            → Format / Platform Variants
              → Carousel Content Model (where applicable)
                → Carousel → Slides → Layout + Theme / Design Direction
                  → Preview → Validation → Export (where applicable)
                    → Publication → Archive the exact published variant
```

Layout and Theme / Design Direction are shown together because they are **parallel rendering influences**, not a strict chain: Layout controls slide structure, Theme controls reusable visual styling, and Design Direction is the user/AI style intent that may influence theme selection or overrides. They are combined before preview/rendering.

This is conceptual product vocabulary, not a database model.

---

## 3. User

The **User** is the person creating content.

**Current:** the single creator/operator using the repository and Studio.

**Future:** a person using the self-service product through the application.

A user may eventually create posts, define brand preferences, review and edit generated content, export or publish content, and belong to a workspace.

**Important:** authentication and roles are not defined yet.

---

## 4. Workspace

A **Workspace** is the container for a user's content, brands, posts, assets, and preferences.

**Current:** there is no real product workspace yet — the repository itself acts as the working environment.

**Future:** a workspace may become the product-level container for one user, team, or business.

**Important:** multi-user workspaces are not required now. The next stage may use a simple single-user workspace concept only if needed.

---

## 5. Brand

A **Brand** represents the identity used to shape content and design. It may include name, handle, audience, tone, language/dialect preferences, content pillars, recurring CTA/footer preferences, and design preferences.

**Current:** Abdallah's brand exists in Markdown framework files (Brand View, Brand Voice).

**Future:** brands may become editable product data.

**Important:** a user should be able to create a post before completing a full brand setup.

---

## 6. Post

A **Post** is the main content item the user creates. It represents one idea across approved platforms/formats and progresses from Content Brief to canonical content, standalone variants, applicable assets, publication, and archive.

**Current:** posts exist as files in ideas, drafts, and published archives.

An **Idea** is the raw input before the Content Brief. It may be entered by the user or automatically captured by an agent from real, completed work.

**Future:** posts may become persisted product records.

**Note:** database fields are not defined here.

---

## 7. Content Brief

A **Content Brief** is the planning layer between a qualified Idea and canonical content. For the current personal Content OS, it captures the shared core idea, audience, angle, takeaway, tone, creative direction, constraints, and the inherited required variants: Instagram Carousel and LinkedIn Post. Workflow 02 does not choose or omit either output. Future generalized product behavior is not specified here.

**Purpose:** prevent random generation by forcing structure before writing.

**Current:** created through Workflow 02.

**Future:** generated and edited inside the product application.

### Canonical Content Draft

The **Canonical Content Draft** is the format-neutral written source at `content/drafts/post.md`. It records the core idea, authentic trigger, reasoning, key points, supported examples, claims and factual boundaries, intended takeaway, CTA intent, and wording worth preserving.

Workflow 03 owns this source. It contains no slides, timing, platform captions, LinkedIn paragraph structure, visual directions, or renderer JSON. Workflow 04 independently adapts it into both required current variants.

---

## 8. Content Model

The **Content Model** is the structured contract for Carousel content consumed by the renderer.

**Current:** documented in `framework/model/Content Model.md`, used for Carousel workspace JSON and Carousel archives. It does not replace canonical meaning in `post.md`.

**Important:** the Studio and renderer do not consume the Content Model directly. The Adapter translates Content Model data into Renderer Models.

**Future:** the model may move into code or schema files, but the concept remains the contract between content intelligence and rendering.

---

## 9. Carousel

A **Carousel** is a post format made of ordered slides. It contains a sequence of slides, platform-specific content, visual structure, and exportable assets.

**Current:** the active Carousel variant is stored in `production/workspace/carousel.json`; its adapted Markdown is `content/drafts/format/carousel.md`.

**Future:** multiple carousels may exist as posts or post versions inside the product.

**Important:** a carousel is not just text — it is structured content plus visual intent.

---

## 10. Slide

A **Slide** is one visual unit inside a carousel. A slide has a purpose, copy, layout, visual emphasis, and a position in the sequence.

Common slide purposes: hook, context, problem, realization, example, takeaway, CTA.

**Important:** slide purpose should influence layout and design choice.

---

## 11. Layout

A **Layout** is the structural arrangement used to render a slide. Examples: cover, box list, arrow list, grid, bullet list, final CTA.

**Current:** layouts are React components inside the renderer; each layout receives typed Renderer Models, not raw Content Model data.

**Product meaning:** a normal user should not need to choose layout IDs manually. The system should suggest or select layouts based on slide purpose; advanced controls may expose layout choice later.

---

## 12. Theme

A **Theme** represents reusable visual styling rules: colors, typography, spacing feel, radius feel, border style, background style, and visual tone.

**Current:** styling exists mostly as CSS tokens and Studio/slide design rules.

**Future:** themes may become saved brand or post-level design preferences.

**Important:** themes should be constrained and renderer-safe. The product should not rely on arbitrary AI-generated CSS.

---

## 13. Design Direction

**Design Direction** is the user's or AI's high-level style intent for a specific post — for example: minimal dark technical, clean professional, warm editorial, educational and simple, or bold launch style.

The system may translate a Design Direction into a Theme or theme overrides.

**Important:** Design Direction is user language; Theme is structured design data.

---

## 14. Renderer Models

**Renderer Models** are the canonical presentation/runtime contract used by the Studio and renderer. They include concepts such as `Carousel`, `SlideData`, and typed slide variants.

**Current:** defined in TypeScript under the renderer, produced by the Adapter, and consumed by the Studio and `SlideRenderer`.

**Important:** Renderer Models are not the same as the Content Model. The Adapter separates the two.

---

## 15. Preview

**Preview** is the user-facing rendered view before export.

**Current Studio rule:** preview should match export.

**Product meaning:** the user trusts that what they see is what they will export. Preview is not source data — it is the visual representation of structured content.

---

## 16. Validation

**Validation** checks whether generated or edited content can render safely and meets expected rules. It may check missing required copy, unsupported layouts, too much content, inconsistent structure, and design/rendering problems.

**Current:** validation is advisory in the Studio.

**Future:** validation may become automatic before export, with repair suggestions.

**Important:** validation should help the user, not expose internal schema complexity.

---

## 17. Export

**Export** is the process of producing final assets from approved preview content.

**Current:** PNG export through the Studio modal or the Playwright pipeline; exported assets can be archived.

**Product meaning:** export is the final production step. It must be deterministic, visible, and trustworthy — it should not change content unexpectedly.

---

## 18. Publication

**Publication** means the post has been shared on a platform.

**Current:** publication happens outside the product, manually; the archive records that publishing happened.

**Future:** the product may support publishing integrations, but this is postponed.

**Important:** publishing is different from export. Export creates assets; publication means the content was posted somewhere.

---

## 19. Archive

**Archive** is the permanent record of published content.

**Current:** each published platform variant is stored under `content/published/<platform>/<YYYY-MM-DD-slug>/`, with the exact published copy and metadata. Carousel JSON/assets are included only for a published Carousel; `Posted Titles.md` helps prevent duplication.

**Future:** archive may become a product history/database view.

**Important:** archive should preserve what was actually published.

---

## 20. Version

A **Version** is a saved state of a post or carousel at a point in time.

**Current:** there is no full version system; drafts and archived published folders act as simple lifecycle snapshots.

**Future:** versions may support before/after edits, regeneration history, or rollback.

**Important:** do not implement versioning yet unless the self-service workflow needs it.

---

## 21. Asset

An **Asset** is a generated or uploaded media file used by or produced from a post. Examples: exported slide PNG, PDF, thumbnail, uploaded image/logo, or future video/audio assets.

**Current:** exported carousel PNGs are stored in archive asset folders.

**Future:** assets may be managed by product storage.

**Important:** assets are different from structured content. Content describes what should render; assets are files.

---

## 22. Concept Relationships

- A User works inside a Workspace.
- A Workspace can contain Brands.
- A Brand guides Posts.
- A Post starts from an Idea and receives an approved Content Brief.
- Workflow 03 turns the brief into a canonical Content Draft.
- Workflow 04 adapts the canonical draft into the brief's required standalone variants.
- The Content Model structures Carousel presentation data only.
- Carousel is one possible format/platform variant of a Post.
- A Carousel contains Slides.
- Slides use Layouts.
- Themes style the rendered output.
- Renderer Models are produced by the Adapter for preview/export.
- Validation checks quality and renderability.
- Export creates Assets.
- Publication records where content was shared.
- Archive preserves the final published record.
- Versions may preserve important states over time.

---

## 23. Current vs Future Summary

| Concept       | Current Meaning                                                | Future Meaning                                   |
| ------------- | -------------------------------------------------------------- | ------------------------------------------------ |
| User          | Single creator/operator of the repository + Studio             | Person using the self-service application        |
| Workspace     | No product workspace; repository is the environment            | Product-level container for content/brands/posts |
| Brand         | Markdown framework files (Brand View, Brand Voice)             | Editable product data                            |
| Post          | Files in ideas, drafts, published                              | Persisted product record                         |
| Content Brief | Workflow 02 output: shared direction + fixed Instagram Carousel and LinkedIn Post variants | Generated/edited in the application              |
| Canonical Content Draft | `content/drafts/post.md`, format-neutral substance | Persisted post source                            |
| Content Model | Carousel renderer contract in `framework/model/Content Model.md` | Typed Carousel contract                          |
| Carousel      | Single active carousel in `production/workspace/carousel.json` | Multiple posts/post versions                     |
| Slide         | One unit in a carousel (purpose + copy + layout)               | Same concept, managed per post                   |
| Layout        | Renderer React components                                      | Suggested/selected by the system                 |
| Theme         | CSS tokens + design rules                                      | Saved brand/post design preferences              |
| Preview       | Studio view (matches export)                                   | Product preview (matches export)                 |
| Validation    | Advisory Studio checks                                         | Automatic pre-export checks + repair             |
| Export        | Studio modal / Playwright PNGs                                 | Product export step                              |
| Publication   | Manual, recorded in archive                                    | Possibly publishing integrations (postponed)     |
| Archive       | `content/published/...` + Posted Titles                        | Product history/database view                    |
| Version       | Draft/archive snapshots                                        | Before/after, rollback                           |
| Asset         | Exported PNGs in archive folders                               | Product-managed media files                      |

---

## 24. Non-Goals

This document does not define:

- database schema
- API resources
- UI screen designs
- package structure
- access control
- billing model
- implementation milestones

---

## 25. Summary

The product should use simple user-facing concepts while keeping structured contracts, validation, rendering, and export boundaries clear underneath.

# 04 — Product Workflows

## 1. Purpose

This document defines the **user-facing product workflows** — how a user moves through the product to create, review, edit, validate, export, and eventually archive/publish content. It answers, from the user's perspective:

- what does the user do?
- what does the system do?
- where is human review required?
- where does AI assist?
- where does deterministic rendering/export matter?

This is **not** the internal framework prompt workflow (01–07). It is a product workflow document, not a database design, API spec, or implementation plan.

---

## 2. Workflow Principles

Every flow follows these rules:

- The user describes outcomes; the system handles implementation.
- The system plans before generating.
- AI output must become structured data before rendering.
- The user must be able to review and adjust direction before final generation.
- Preview must match export.
- Export must be deliberate and visible.
- Publishing is separate from export.
- Internal files, schemas, prompts, and terminal commands should stay hidden from normal users.
- The next goal is single-user self-service, not SaaS complexity.

---

## 3. Primary Workflow — Self-Service Carousel Creation

The core next-stage workflow:

```
Dashboard → New Carousel → Describe idea → AI brief → Approve / adjust
  → Write canonical content → Adapt approved Carousel variant
    → Generate/select design → Preview/edit
    → Validate → Export
```

| Step | User action | System responsibility | Output |
|---|---|---|---|
| Dashboard | Open the product | Show current work and entry points | Starting view |
| New Carousel | Start a new post | Begin a new carousel | New carousel context |
| Describe idea | Write the idea naturally | Understand intent and context | Understood idea |
| AI brief | Review the brief | Produce a structured Content Brief | Content Brief |
| Approve / adjust | Accept or change direction | Update the brief | Approved brief |
| Write canonical content | Review/edit the post's substance | Create format-neutral content before adaptation | Canonical Content Draft |
| Adapt Carousel | Create the approved Carousel variant | Adapt canonical content into slide sequence, copy, and Carousel Content Model data | Carousel variant and Content Model data |
| Generate/select design | Choose or accept design | Select layouts/theme per Carousel slide | Design data |
| Preview / edit | Review and edit | Render and reflect edits live | Preview |
| Validate | Run validation | Check renderability and quality | Validation result |
| Export | Confirm export | Produce deterministic assets | Final assets |

This is the core workflow the next product milestone must prove.

---

## 4. Step 1 — Dashboard

The **Dashboard** is the user's starting point.

The user should see:

- existing drafts/posts, if any
- a clear "New Carousel" action
- recent exported/published items, if available later
- simple status of current work

**Current stage:** the Dashboard may be very simple. It does not require accounts or multi-user workspaces. UI details are not designed here.

---

## 5. Step 2 — New Carousel

**New Carousel** is the creation entry point.

The user provides:

- idea or topic
- platform, if needed
- language/dialect, if needed
- optional style direction
- optional audience/context

The system should **not** ask for technical details like layout IDs, JSON fields, workflow prompt numbers, or renderer settings.

---

## 6. Step 3 — Describe Idea

The user describes the idea naturally — a rough thought, a learning moment, a project update, a lesson, a story, a business idea, or a professional insight.

System responsibility:

- understand intent
- identify likely audience
- identify format fit
- detect missing context
- ask one or few clarifying questions only when necessary

**Important:** do not force a long form before value is shown.

---

## 7. Step 4 — AI Brief

The future application turns the raw idea into a concise **Content Brief**, including working title, core idea, audience, angle, takeaway, tone, creative direction, design direction (if useful), and constraints. The current personal Content OS inherits both required variants—Instagram Carousel and LinkedIn Post—rather than asking Workflow 02 to select platforms or formats.

User action: approve, edit, regenerate, or change the shared content direction. A future generalized product may have different platform configuration; the current personal workflow always produces both required variants.

**Important:** the brief is the checkpoint before canonical writing and adaptation. In the current personal Content OS, every produced Post includes both an Instagram Carousel and a LinkedIn Post; future generalized product configurations are not specified by this workflow.

---

## 8. Step 5 — Approve / Adjust Direction

In a future generalized application, the user may accept the brief or change the angle, depth, tone, audience, language/dialect, platform/format configuration, or ask for another version. This does not change the fixed dual-platform outputs in the current personal Content OS.

The system should update the brief, keep changes understandable, and avoid generating final slides until the direction is accepted — unless the user requests a fast draft.

---

## 9. Step 6 — Write Canonical Content and Adapt Approved Variants

The system first creates format-neutral canonical content: trigger, reasoning, key points, supported examples, factual boundaries, takeaway, and CTA intent. The current personal workflow then independently adapts that meaning into both required variants: Instagram Carousel and LinkedIn Post. Carousel slide sequence, slide purpose, copy, and **structured Content Model data** belong to Carousel adaptation. Each platform version is a separate standalone output.

**Important:** canonical meaning must be established before platform/format adaptation. Structured Carousel data is generated for the required Carousel variant; the LinkedIn Post remains a standalone platform artifact.

---

## 10. Step 7 — Generate / Select Design

The system uses slide purpose, content density, user design direction, brand/theme preferences, and available renderer-safe layouts to choose or suggest layout per slide, visual emphasis, theme or theme overrides, and spacing/content-density choices.

**Important:** Layout + Theme / Design Direction are **parallel rendering influences**. The system should not use arbitrary AI-generated CSS/React. Design choices must stay constrained and renderer-safe.

---

## 11. Step 8 — Preview / Edit

The user sees the rendered carousel preview and can navigate slides, edit copy, ask the AI to revise specific parts, change design direction, request slide-level changes, and compare before/after later if supported.

The system should update the preview immediately, keep preview matching export, preserve human control, and avoid exposing raw JSON/schema errors as the normal UX.

**Important:** the current Studio is the existing review/edit tool, but the future Product Application may persist edits and manage multiple posts later.

---

## 12. Step 9 — Validate

The system checks missing required content, unsupported layouts, too much content, layout overflow risk, inconsistent structure, export readiness, and possibly brand/tone issues later.

Validation should explain issues in user language, suggest fixes, allow AI-assisted repair, and avoid exposing internal schema complexity.

**Current Studio validation is advisory.** Future product validation may become stronger before export.

---

## 13. Step 10 — Export

The user chooses all or selected slides, and an output type such as PNG ZIP or PDF, depending on supported options.

The system produces deterministic final assets, ensures preview matches export, keeps guides/tool chrome out of output, shows progress/failure clearly, and avoids changing content during export.

**Export creates assets. Export is not the same as publication.**

---

## 14. Publication Workflow

**Current:** the user publishes manually, outside the product; the archive records that publishing happened.

**Future:** publishing integrations may exist later, but they are postponed until the single-user self-service creation loop works.

**Important:** the product should not silently publish content. Publishing requires explicit user confirmation.

---

## 15. Archive Workflow

**Archive** records what was actually published.

**Current:** stored per published platform variant under `content/published/<platform>/<YYYY-MM-DD-slug>/`. The archive preserves the exact published copy and applicable assets/data; Carousel JSON/assets are included only for a published Carousel. `Posted Titles.md` helps prevent duplication.

**Future:** archive may become a product history view or database-backed record.

**Important:** archive the exact variant that appeared on the platform, not another generated variant or a shared multi-platform package.

---

## 16. Edit Existing Draft Workflow

The user opens a draft, previews it, edits copy or design direction, validates, and exports.

**Clarification:** the current Studio edits are in-memory. The future product may persist draft edits, but persistence infrastructure is not required yet unless the self-service loop needs it.

---

## 17. Regeneration Workflow

The user may request regeneration of the full post, a single slide, the title, tone changes, simplification, making content more professional, design-direction changes, or replacing a layout suggestion.

The system should preserve user-approved parts when requested, show what changed, keep output structured, and keep human review before export.

**Avoid:** destructive overwrite without confirmation, uncontrolled random regeneration, and silently losing previous user edits.

---

## 18. Validation / Repair Workflow

When validation finds an issue, the system explains it in plain language, and the user chooses a manual fix or AI repair. The system updates the structured content/design data, the preview updates, and validation reruns.

**Important:** validation repair should not expose JSON/schema internals unless in advanced/developer mode.

---

## 19. Design Adjustment Workflow

The user can say things like "make it cleaner", "use a darker style", "make this slide less crowded", "make it more educational", or "use my brand style".

The system translates this into design-direction updates, theme/token choices, layout changes, and visual-emphasis changes.

**Important:** design adjustment must stay renderer-safe. Free-form canvas editing is not promised.

---

## 20. Advanced / Developer Workflow

Advanced controls may expose structured data, layout choices, validation details, debug information, and export settings — but advanced mode must **not** be required for normal product use.

The current repository/Studio workflow may remain useful for development and power-user operation, but the self-service product should hide it from normal users.

---

## 21. Current Internal Workflow Mapping

A short continuity mapping between the current internal system and future product UX:

| Current Internal System | Future Product Experience |
|---|---|
| Workflow 01 — Idea Qualification | Qualify captured idea; only READY proceeds |
| Workflow 02 — Content Planning | AI Brief for fixed Instagram Carousel + LinkedIn Post outputs |
| Workflow 03 — Post Content Builder | Write only the Canonical Content Draft |
| Workflow 04 — Format Adaptation | Create approved standalone variants; produce Carousel content/model data only for Carousel |
| Workflow 05 — Render Validation | Preview / Validate Carousel where applicable |
| Workflow 06 — Export Assets | Export Carousel where applicable |
| Manual Publish | Publish the approved platform variant |
| Workflow 07 — Archive Published Post | Archive the exact published variant |

This section exists only to show continuity. The product UX must not expose these workflow numbers to normal users.

---

## 22. Non-Goals

This document does not define database schema, API endpoints, authentication, roles, billing, team workflows, package structure, UI screen layouts, detailed implementation tasks, or social-media scheduling.

---

## 23. Success Criteria

The workflows succeed when a single user can:

- start from an idea
- receive a useful brief
- approve or adjust direction
- generate a complete carousel
- receive sensible layout/theme decisions
- preview the carousel
- edit copy or ask for revisions
- validate the result
- export final assets

**without** opening Markdown files, editing JSON, running internal workflow prompts manually, using a terminal, or understanding renderer internals.

---

## 24. Summary

The product workflow should feel like a simple creation loop for the user, while the system quietly performs planning, structured generation, guarded design selection, deterministic rendering, validation, and export underneath.

# 05 — Domain Model

## 1. Purpose

This document defines the **conceptual product domain objects** for the Content OS product and how they relate. It answers:

- what are the main domain objects?
- how do they relate?
- which objects exist today as files?
- which objects belong to the next self-service stage?
- which objects are postponed future/SaaS concepts?

This is a product domain model — not a database schema, API spec, or implementation plan.

---

## 2. Domain Model Scope

Three scopes:

#### Current scope
The existing single-creator Content OS: framework Markdown, content files, the active workspace carousel JSON, Studio preview/edit/export, and the published archive.

#### Next scope
Single-user self-service carousel creation: the user opens the app, creates a post from an idea, receives an AI brief, generates structured content, previews/edits, validates, and exports.

#### Future scope
Possible SaaS/product expansion: accounts, workspaces, teams, billing, multi-brand management, publishing integrations, and database-backed persistence.

**Important:** future scope is direction only — not a current requirement.

---

## 3. High-Level Domain Map

```
Workspace
  owns Brands
  owns Posts
  owns Assets
  owns Preferences

Brand
  guides Posts
  owns Voice Profile
  owns Design Preferences

Post
  owns or relates to Idea, Content Brief, and Canonical Content Draft
  has approved Platform / Format Variants
  may have applicable Content Model data
  may have Exports and Publication / Archive records
  may have Versions

Carousel
  has Slides
  uses Layouts
  uses Theme / Design Direction
  renders to Preview
  exports to Assets
```

This is conceptual. Do not convert it into database tables.

---

## 4. Entity Classification

| Entity | Current | Next Self-Service | Future SaaS |
|---|---|---|---|
| User | Exists now (single operator) | Needed next (single product user) | Future (authenticated account) |
| Workspace | Repository acts as workspace | Simple conceptual if needed | Future (team/business container) |
| Brand | Exists now (Markdown) | Defaults/project-level | Future (editable product data) |
| Voice Profile | Exists now (voice/skills) | Internal AI input | Future (user/brand preference) |
| Design Preferences | Exists now (tokens/design rules) | Guides AI design | Future (saved brand settings) |
| Post | Exists now (files) | Needed next (primary object) | Future (persisted record) |
| Idea | Exists now (`content/ideas/`) | Needed next (creation input) | Future (persisted) |
| Content Brief | Exists now (planning output) | Needed next (in-app) | Future (persisted) |
| Canonical Content Draft | `content/drafts/post.md`, format-neutral substance | Needed next (canonical writing stage) | Future (persisted post source) |
| Platform / Format Variant | Exists as standalone drafts by platform/format | Needed next (adapt only approved variants) | Future (variant records) |
| Content Model | Exists now (Carousel JSON contract) | Needed for Carousel rendering only | Future (typed Carousel schema) |
| Carousel | Exists now (single active) | Needed next (core format) | Future (multiple versions) |
| Slide | Exists now (in carousel data) | Needed next | Future |
| Layout | Exists now (renderer components) | Needed next (system-selected) | Future (advanced controls) |
| Theme | Exists now (tokens/rules) | Needed next (chosen/inferred) | Future (saved style) |
| Design Direction | Conceptual only | Needed next (user language) | Future (persisted) |
| Renderer Model | Internal only (TS types) | Internal only | Internal only |
| Validation Result | Exists now (advisory) | Needed next (pre-export) | Future (saved with history) |
| Export | Exists now (Playwright/Studio) | Needed next (product step) | Future |
| Asset | Exists now (exported PNGs) | Needed next (generated files) | Future (product storage) |
| Publication Record | Exists now (manual, archive metadata) | Needed next (explicit confirmation) | Future (integrations) |
| Archive Record | Exists now (published folders) | Needed next | Future (history view) |
| Version | Conceptual/snapshot only | Not required unless needed | Future (rollback) |

---

## 5. User

The **User** is the person creating content.

- **Current:** the single repository operator.
- **Next:** the single product user using the application.
- **Future:** may become an authenticated account.

**Important:** authentication, roles, permissions, and user tables are not defined here.

**Relationships:** User works in a Workspace; creates Posts; reviews and approves generated content; exports or publishes content manually.

---

## 6. Workspace

The **Workspace** is the product container for content, brands, assets, and preferences.

- **Current:** the repository acts as the workspace; no real product workspace exists.
- **Next:** a simple single-user workspace may exist conceptually if needed.
- **Future:** may become a team/business container.

**Important:** do not build multi-user workspace logic yet.

**Relationships:** Workspace owns Brands, Posts, Assets, and Preferences.

---

## 7. Brand

The **Brand** is the identity used to guide content and design.

- **Current:** represented through Brand View and Brand Voice Markdown files.
- **Next:** can remain default/project-level preferences.
- **Future:** may become editable product data.

**Relationships:** Brand guides Posts; may own a Voice Profile and Design Preferences; may define audience, tone, language/dialect, and footer/CTA preferences.

**Important:** a full brand setup must not block post creation.

---

## 8. Voice Profile

A **Voice Profile** stores or represents writing preferences: tone, language, dialect, banned phrases, preferred expressions, formality level, recurring CTA style, and audience assumptions.

- **Current:** exists through framework strategy/voice/writing skills.
- **Next:** may be used internally by AI generation.
- **Future:** may become editable user/brand preference.

**Important:** this is a product-level concept, not a schema.

---

## 9. Design Preferences

**Design Preferences** store or represent recurring visual choices: preferred theme, typography direction, color feel, spacing density, slide style, default footer/handle treatment, and platform-safe layout rules.

- **Current:** exists as Studio/slide design rules and CSS tokens.
- **Next:** can guide AI design selection.
- **Future:** may become saved brand-level settings.

**Important:** design preferences must stay constrained and renderer-safe.

---

## 10. Post

The **Post** is the main domain object — one publishable idea or content item. A Post owns or relates to its Idea, Content Brief, Canonical Content Draft, approved Platform / Format Variants, applicable Content Model data, Exports, and Publication / Archive records. It may also have a Carousel, Validation Results, and Versions later.

- **Current:** represented by files in ideas, drafts, and the published archive.
- **Next:** the primary object the self-service product manages.
- **Future:** may become a persisted product record.

**Important:** do not define fields as database columns.

---

## 11. Idea

An **Idea** is raw source material before the Content Brief. It can originate from direct user input, a learning moment, a project update, or completed implementation, debugging, product, client, university, or workflow work captured automatically by an agent.

- **Current representation:** `content/ideas/<YYYY-MM-DD-project-slug>/`, with a required `idea.json` and optional curated supporting resources. The JSON follows `framework/model/idea.schema.json`; automatic capture follows `framework/workflows/Content Idea Capture Rules.md`.
- **Automatic capture boundary:** the project agent preserves raw material only. Content OS later owns qualification, duplicate handling, brand fit, evidence-based refinement, and content planning. In the current personal workflow, the required platform outputs are fixed to Instagram Carousel and LinkedIn Post; capture agents do not choose them.
- **Next:** entered through the product's creation flow.

**Relationships:** Idea becomes Content Brief; Idea belongs to Post.

**Important:** the system should not force a long form before generating value.

---

## 12. Content Brief

The **Content Brief** is the planning checkpoint. It captures working title, core idea, audience, angle, takeaway, tone, shared creative direction, fixed required variants (Instagram Carousel and LinkedIn Post for the current personal Content OS), design direction, and constraints.

- **Current:** output of the internal planning workflow.
- **Next:** generated and edited inside the application.

**Relationships:** created from a qualified READY idea; records both inherited required variants for the current personal workflow; approved before canonical writing.

**Important:** this preserves structure before generation.

---

## 13. Content Model

The **Content Model** is the structured contract for Carousel content consumed by the renderer.

- **Current:** documented in `framework/model/Content Model.md`; used by the workspace Carousel JSON and Carousel archive content JSON.
- **Next:** structured output generated only when a Carousel variant is approved.
- **Future:** may move to code/schema files.

**Relationships:** canonical meaning is held by `content/drafts/post.md`; Workflow 04 creates Carousel structured data for the Adapter when required.

**Important:** the Studio and renderer do not consume the Content Model directly.

---

## 14. Renderer Model

**Renderer Models** are presentation/runtime objects used by the Studio and renderer.

- **Current:** TypeScript types such as `Carousel` and `SlideData`, produced by the Adapter and consumed by `SlideRenderer`.

**Relationships:** produced from the Content Model by the Adapter; used by Preview and Export; not user-facing.

**Important:** Renderer Models are internal product infrastructure. Normal users should not see them.

---

## 15. Carousel

A **Carousel** is a format-specific object. It belongs to a Post, contains ordered Slides, has platform/content constraints, uses Layout + Theme / Design Direction, can be previewed, and can be exported.

- **Current:** single active Carousel variant in `production/workspace/carousel.json`.
- **Next:** the core format in Self-Service Carousel Creation.
- **Future:** multiple carousels may exist as post versions or variants.

---

## 16. Slide

A **Slide** is an ordered unit in a Carousel. It has a sequence position, purpose, copy, layout choice, visual emphasis, and validation state.

**Relationships:** belongs to Carousel; uses Layout; styled by Theme; may be regenerated or edited.

**Important:** slide purpose should influence layout/design.

---

## 17. Layout

A **Layout** is a renderer-safe structure for a slide.

- **Current:** React components in the renderer, selected through typed renderer data.
- **Next:** selected or suggested by the system based on slide purpose.
- **Future:** may become selectable through advanced controls.

**Important:** layout IDs should not be required from normal users.

---

## 18. Theme

A **Theme** is structured visual styling data or a rule-set (colors, typography, spacing, radius, borders, background, tone).

- **Current:** mostly CSS tokens and design rules.
- **Next:** may be chosen by default or inferred from Design Direction.
- **Future:** may become a saved brand/post style.

**Important:** Theme is not arbitrary CSS. It must stay constrained.

---

## 19. Design Direction

**Design Direction** is high-level user/AI style intent — for example minimal dark technical, clean professional, warm editorial, bold launch style, or educational and simple.

**Relationships:** may influence Theme; may influence Layout selection; may be changed through natural-language requests.

**Important:** Design Direction is user language; Theme is structured design data.

---

## 20. Validation Result

A **Validation Result** records issues or readiness checks: missing required content, unsupported layout, too much content, overflow risk, inconsistent structure, export readiness, and brand/tone warnings later.

- **Current:** advisory Studio validation.
- **Next:** pre-export validation with user-friendly repair options.
- **Future:** may become saved with post/version history.

**Important:** validation should help users, not expose schema internals.

---

## 21. Export

**Export** is a production event/process. It produces final assets, should match preview, should not change content, should exclude guides/chrome, and may produce PNG ZIP or PDF.

- **Current:** Studio modal or Playwright pipeline.
- **Next:** a deliberate product export step.

**Relationships:** belongs to a Post or Carousel; creates Assets.

**Important:** Export is not Publication.

---

## 22. Asset

An **Asset** is a file used by or produced from the product — exported slide PNG, ZIP, PDF, thumbnail, uploaded image/logo, or future video/audio assets.

- **Current:** exported PNGs in archive folders.
- **Next:** generated export files.
- **Future:** product-managed storage.

**Important:** Assets are files; Content Model is structured content.

---

## 23. Publication Record

A **Publication Record** means content was shared to a platform.

- **Current:** manual publishing outside the product, recorded by archive metadata.
- **Future:** possible integrations, postponed.

**Relationships:** belongs to a Post; references platform/date/status; may reference exported assets.

**Important:** publishing requires explicit user confirmation — never silent.

---

## 24. Archive Record

An **Archive Record** preserves the exact published platform variant.

- **Current:** one folder per published variant under `content/published/<platform>/<YYYY-MM-DD-slug>/`. It contains exact published copy and metadata; Carousel JSON/assets are included only for Carousel.
- **Future:** product history/database view.

**Relationships:** belongs to a Post and one actual publication; preserves that variant's exact content and applicable assets/data.

**Important:** archive should preserve what was actually published, not an earlier draft.

---

## 25. Version

A **Version** is a saved state of a Post/Carousel.

- **Current:** no full versioning; drafts and archive act as simple lifecycle snapshots.
- **Next:** not required unless self-service editing needs basic preservation.
- **Future:** may support before/after, regeneration history, and rollback.

**Important:** do not implement full versioning yet.

---

## 26. Lifecycle Model

Conceptual lifecycle states:

```
Capture / ingestion → Qualified READY Idea → Approved Content Brief (Instagram Carousel + LinkedIn Post)
  → Canonical Content Draft → Format / Platform Adaptation
  → Render Validation (where applicable) → Export (where applicable)
  → Publish → Archive the exact published variant
```

- Not every state needs to be implemented as a database enum now.
- The current system represents lifecycle through folders and metadata.
- A future product may represent lifecycle as product state.

---

## 27. Ownership and Relationship Summary

- Workspace owns Brands, Posts, Assets, and Preferences.
- Brand guides Posts through Voice Profile and Design Preferences.
- Post owns or relates to Idea, Content Brief, Canonical Content Draft, approved Platform / Format Variants, applicable Content Model data, Exports, and Publication / Archive records.
- Carousel owns Slides.
- Slide uses Layout and Theme / Design Direction.
- Content Model feeds the Adapter.
- Adapter produces Renderer Models.
- Renderer Models power Preview and Export.
- Export creates Assets.
- Publication records external sharing.
- Archive preserves the final published state.
- Version may preserve important states later.

---

## 28. Current File-Based Representation

| Domain Object | Current Representation |
|---|---|
| Brand | Brand View / Brand Voice / writing skills |
| Idea | Raw capture inbox at `content/ideas/<YYYY-MM-DD-project-slug>/` with required `idea.json` and optional curated resources; Workflow 01 qualification precedes Content Planning |
| Post | Groups the related idea, brief, canonical draft, approved variants, applicable Carousel data, exports, and publication/archive records |
| Content Brief | Current planning workflow output; approved before canonical writing |
| Canonical Content Draft | `content/drafts/post.md` |
| Platform / Format Variants | Approved standalone drafts: `content/drafts/format/carousel.md`, `content/drafts/format/linkedin.md` |
| Active Carousel | `production/workspace/carousel.json` |
| Content Model | `framework/model/Content Model.md` |
| Renderer Model | TypeScript types in the renderer |
| Layout | renderer layout components |
| Theme/Design rules | CSS tokens + design docs |
| Export | `production/export/...` and Studio modal |
| Asset | exported PNGs / archive assets |
| Archive Record | `content/published/...` |
| Publication memory | `Posted Titles.md` |

---

## 29. Next Self-Service Domain Scope

**Needed:** simple User context; simple Workspace concept if necessary; Brand/Voice/Design preferences as defaults; Post; Idea input; Content Brief; Canonical Content Draft; approved Platform / Format Variants; applicable Carousel Content Model output; Carousel; Slide; Layout selection; Theme/Design Direction; Validation Result; Export; Asset.

**Not needed yet:** multi-user accounts, team workspaces, billing, subscriptions, role/permission systems, production publishing integrations, full version-control systems, and enterprise asset management.

---

## 30. Postponed SaaS Domain Concepts

Postponed: Account, Authentication Identity, Organization/Team, Role/Permission, Subscription, Billing Plan, Usage Quota, Team Collaboration, Publishing Integration, Webhook/Event system, Enterprise asset library, and Production-scale AI job system.

**Reason:** they do not prove the single-user self-service carousel loop.

---

## 31. Domain Rules

1. A Post starts from an Idea or user prompt.
2. For the current personal Content OS, a Content Brief records both fixed required variants—Instagram Carousel and LinkedIn Post—before canonical writing; Workflow 02 does not select between them.
3. Workflow 03 writes format-neutral content to `content/drafts/post.md` only.
4. Workflow 04 adapts only approved variants and preserves canonical meaning and factual boundaries.
5. Carousel renderer JSON is generated only for an approved Carousel variant.
6. The Adapter is the boundary between Content Model and Renderer Models.
7. Preview and Export must use the same rendered source.
8. Export creates Assets; Publication records external sharing.
9. Archive preserves exactly the variant published, not another generated variant.
10. Layout and Theme / Design Direction both influence rendering.
11. AI may propose, but the user reviews before export/publication.
12. SaaS concepts are postponed until the single-user loop works.

---

## 32. Non-Goals

This document does not define database schema, ORM models, API resources, UI screen layouts, component hierarchy, access-control rules, billing model, implementation milestones, or package structure.

---

## 33. Summary

The domain model should make the product understandable as a set of simple creation objects — Post, Brief, Carousel, Slide, Theme, Export, Archive — while keeping technical contracts like Content Model, Adapter, and Renderer Models clear but mostly internal.
