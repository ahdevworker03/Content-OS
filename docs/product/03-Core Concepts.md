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
          → Content Model
            → Carousel
              → Slides
                → Layout + Theme / Design Direction
                  → Preview
                    → Validation
                      → Export
                        → Publication / Archive
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

A **Post** is the main content item the user creates. It represents one publishable idea across one or more platforms/formats, and may have a title, idea/trigger, platform, format, lifecycle state, content brief, generated content, visual output, exports, and publication/archive metadata.

**Current:** posts exist as files in ideas, drafts, and published archives.

**Future:** posts may become persisted product records.

**Note:** database fields are not defined here.

---

## 7. Content Brief

A **Content Brief** is the planning layer between a raw idea and final content. It captures core idea, audience, platform, format, angle, takeaway, tone, structure direction, and constraints.

**Purpose:** prevent random generation by forcing structure before writing.

**Current:** created through Workflow 02.

**Future:** generated and edited inside the product application.

---

## 8. Content Model

The **Content Model** is the canonical **authoring/content contract**. It defines what a structured content item is before rendering.

**Current:** documented in `framework/model/Content Model.md`, used for generated carousel JSON and archived `content.json`.

**Important:** the Studio and renderer do not consume the Content Model directly. The Adapter translates Content Model data into Renderer Models.

**Future:** the model may move into code or schema files, but the concept remains the contract between content intelligence and rendering.

---

## 9. Carousel

A **Carousel** is a post format made of ordered slides. It contains a sequence of slides, platform-specific content, visual structure, and exportable assets.

**Current:** the active working carousel is stored in `production/workspace/carousel.json`.

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

**Current:** stored under `content/published/<platform>/<YYYY-MM-DD-slug>/`, including content, metadata, structured JSON, and assets where applicable; `Posted Titles.md` helps prevent duplication.

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
- A Post starts from an idea and becomes a Content Brief.
- A Content Brief becomes structured Content Model data.
- Carousel is one format of Post.
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
| Content Brief | Output of Workflow 02                                          | Generated/edited in the application              |
| Content Model | `framework/model/Content Model.md`                             | Typed authoring contract (code/schema)           |
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
