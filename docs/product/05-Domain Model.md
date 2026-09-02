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
  starts from Idea
  has Content Brief
  has Content Model
  may have Carousel
  may have Versions
  may have Exports
  may have Publication Record
  may be Archived

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
| Content Model | Exists now (Markdown + JSON) | Needed next (structured output) | Future (typed schema) |
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

The **Post** is the main domain object — one publishable idea or content item. A Post may include an Idea, a Content Brief, Content Model data, one or more format variants, a Carousel, Validation Results, Exports, Publication/Archive metadata, and Versions later.

- **Current:** represented by files in ideas, drafts, and the published archive.
- **Next:** the primary object the self-service product manages.
- **Future:** may become a persisted product record.

**Important:** do not define fields as database columns.

---

## 11. Idea

An **Idea** is the raw starting input from the user — a rough thought, learning moment, project update, story, lesson, professional insight, or business message.

- **Current:** may be stored in `content/ideas/`.
- **Next:** entered through the product's creation flow.

**Relationships:** Idea becomes Content Brief; Idea belongs to Post.

**Important:** the system should not force a long form before generating value.

---

## 12. Content Brief

The **Content Brief** is the planning checkpoint. It captures working title, core idea, audience, angle, takeaway, tone, platform/format, suggested slide structure, design direction, and risks/constraints.

- **Current:** output of the internal planning workflow.
- **Next:** generated and edited inside the application.

**Relationships:** created from Idea; approved before full content generation; guides Content Model generation.

**Important:** this preserves structure before generation.

---

## 13. Content Model

The **Content Model** is the canonical authoring/content contract.

- **Current:** documented in `framework/model/Content Model.md`; used by the workspace carousel JSON and archive content JSON.
- **Next:** structured output generated by the product workflow.
- **Future:** may move to code/schema files.

**Relationships:** generated from an approved Content Brief; consumed by the Adapter; archived as the content source of truth.

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

- **Current:** single active carousel in `production/workspace/carousel.json`.
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

An **Archive Record** preserves the final published state.

- **Current:** folder under `content/published/<platform>/<YYYY-MM-DD-slug>/`, including content, structured JSON, metadata, and assets.
- **Future:** product history/database view.

**Relationships:** belongs to a Post; references a Publication Record; preserves the final Content Model and assets.

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
Idea → Brief → Draft → Review → Validated → Exported → Published → Archived
```

- Not every state needs to be implemented as a database enum now.
- The current system represents lifecycle through folders and metadata.
- A future product may represent lifecycle as product state.

---

## 27. Ownership and Relationship Summary

- Workspace owns Brands, Posts, Assets, and Preferences.
- Brand guides Posts through Voice Profile and Design Preferences.
- Post owns Idea, Content Brief, Content Model, Carousel, Exports, and Publication/Archive records.
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
| Idea | `content/ideas/...` |
| Draft/Post | `content/drafts/...` |
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

**Needed:** simple User context; simple Workspace concept if necessary; Brand/Voice/Design preferences as defaults; Post; Idea input; Content Brief; Content Model output; Carousel; Slide; Layout selection; Theme/Design Direction; Validation Result; Export; Asset.

**Not needed yet:** multi-user accounts, team workspaces, billing, subscriptions, role/permission systems, production publishing integrations, full version-control systems, and enterprise asset management.

---

## 30. Postponed SaaS Domain Concepts

Postponed: Account, Authentication Identity, Organization/Team, Role/Permission, Subscription, Billing Plan, Usage Quota, Team Collaboration, Publishing Integration, Webhook/Event system, Enterprise asset library, and Production-scale AI job system.

**Reason:** they do not prove the single-user self-service carousel loop.

---

## 31. Domain Rules

1. A Post starts from an Idea or user prompt.
2. A Content Brief should exist before full generation, unless a fast draft is requested.
3. Generated content should become Content Model data before rendering.
4. The Adapter is the boundary between Content Model and Renderer Models.
5. Preview and Export must use the same rendered source.
6. Export creates Assets; Publication records external sharing.
7. Archive preserves the final published state.
8. Layout and Theme / Design Direction both influence rendering.
9. AI may propose, but the user reviews before export/publication.
10. SaaS concepts are postponed until the single-user loop works.

---

## 32. Non-Goals

This document does not define database schema, ORM models, API resources, UI screen layouts, component hierarchy, access-control rules, billing model, implementation milestones, or package structure.

---

## 33. Summary

The domain model should make the product understandable as a set of simple creation objects — Post, Brief, Carousel, Slide, Theme, Export, Archive — while keeping technical contracts like Content Model, Adapter, and Renderer Models clear but mostly internal.