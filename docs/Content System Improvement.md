# Content System Improvements

## Must Do

These improvements strengthen the framework itself and should be completed before expanding the system.

### Brand & Strategy

- Create `Brand Voice.md` as the single source of truth for writing voice.
- Finalize and lock the core content pillars.
- Define explicit platform rules for Instagram, LinkedIn, X, and Stories.
- Define platform-specific rewriting rules to prevent copy-paste content.
- Define the mandatory output package for every content idea.

### Framework Architecture

- Separate the framework layer (strategy and rules) from the production layer (templates and export pipeline).
- Establish a **Single Source of Truth** principle where every rule exists in only one document and other documents reference it instead of duplicating it.
- Refine the responsibilities of `Carousels.md`, `Reels.md`, `Stories.md`, `Content Format.md`, and `Content Pipeline.md` to eliminate overlapping responsibilities.
- Strengthen the Trigger-First workflow throughout the framework.
- Reduce AI prompt dependency by moving reusable rules from prompts into framework documents.

### Content Logic

- Build a reusable Hook Library.
- Improve format selection logic (Carousel vs Reel vs Story).
- Define a complete content lifecycle:

  ```
  Trigger
      ↓
  Idea
      ↓
  Format Selection
      ↓
  Draft
      ↓
  Review
      ↓
  Final Assets
      ↓
  Published
      ↓
  Archived
  ```

### Content Memory & Archiving

- Create a metadata schema for every published post.
- Organize archives using a folder-per-post structure.
- Preserve captions, scripts, and source files together with exported assets.
- Cross-reference `Posted Titles.md` with archived content.
- Track publishing date, platform, pillar, format, tags, and publishing status.
- Standardize the archive structure across all platforms.

### Future Extensibility

- Define a structured JSON content model.
- Design the framework so all outputs can be generated from structured data.
- Prepare the framework for a future React rendering system.

---

## Should Do

These improvements enhance workflow and scalability but are not foundational.

- Create a generic carousel template that can be reused for every carousel.
- Parameterize the HTML carousel template using placeholders.
- Support multiple carousel templates if future layouts require them.
- Add X/Twitter support to the framework.
- Preserve LinkedIn visual assets alongside written posts.
- Clearly define responsibility for each production step (AI, Human, or Automation).

---

## Nice to Have

These improvements focus on developer experience and production automation.

- Add npm scripts for serving and exporting.
- Remove hardcoded paths from the export pipeline.
- Improve Playwright configuration.
- Support configurable export settings.
- Add optional CI/CD automation.
- Build automatic rendering directly from JSON.

---

## Skip (Immediate Fixes)

These are corrections rather than architectural improvements.

- Rename `Linkedln/` to `LinkedIn/`.
- Fix archive inconsistencies between existing posts.
- Resolve mismatched archived posts where applicable.
- Clarify external project references that intentionally live outside this repository.
