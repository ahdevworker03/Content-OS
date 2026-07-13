# Framework Refactoring Plan

## Purpose

This document is the execution roadmap for evolving the Social Media Content System. It bridges two existing documents:

- **Framework Architecture.md** describes the current system as it exists today — its folder structure, document relationships, workflow phases, and design philosophy.
- **Content System Improvement.md** defines what should change — a prioritized list of improvements organized by importance (Must Do, Should Do, Nice to Have, Skip).

This document translates those improvements into a **phase-based implementation plan**. Each phase explains what will be implemented, which files are affected, why that phase comes at that point in the sequence, and what the expected result is after completion. The document is designed to be executable — a developer or LLM agent should be able to follow it one phase at a time.

---

## Guiding Principles

Every implementation decision during this refactoring must respect these principles:

- **Single Source of Truth** — Every rule, definition, or constraint must live in exactly one document. All other documents reference it rather than duplicating it.
- **Documentation-first approach** — Framework documents are updated before any structural changes are made to the repository. The documents drive the system.
- **Incremental refactoring** — Changes are applied in small, verifiable phases. Each phase must leave the framework in a consistent, usable state.
- **Avoid unnecessary document creation** — New documents are created only when no existing document can reasonably own the responsibility. Consolidation is preferred over proliferation.
- **Preserve existing behavior whenever possible** — The framework's current outputs (carousel structure, export pipeline, content generation prompts) must continue to work throughout the refactoring.
- **Separate framework from production** — The strategy and rules layer (`Content Framework/`) must be clearly separated from the production layer (templates, export scripts, archives). The framework owns content strategy and rules. Production assets (HTML templates, Playwright scripts, future React renderer, automation) consume the framework. Production must never become the source of framework rules.
- **Minimize duplicated rules** — Rules that currently appear in multiple places (especially in AI prompts) must be extracted into a single framework document.
- **Keep the framework AI-friendly** — All documents must remain structured for LLM consumption. Clear headings, explicit relationships, and consistent formatting take priority over narrative prose.
- **Maintain clear document ownership** — Every document must have a well-defined, non-overlapping responsibility. No two documents should claim to own the same decision.
- **Future growth discipline** — New framework documents should only be introduced when they own a distinct responsibility that cannot reasonably belong to an existing document. This prevents unnecessary document proliferation and keeps the framework maintainable as it evolves.

---

## Current State

The framework currently operates as a single, undifferentiated layer where strategy documents, AI prompts, and production artifacts coexist without clear separation.

The `Content Framework/` folder contains eight documents that mix several concerns:

- **Brand identity and tone** (`Brand View.md`) — defines the creator persona, audience, and boundaries.
- **Format-specific rules** (`Carousels.md`, `Reels.md`, `Stories.md`) — define content types and structure per format.
- **Cross-format orchestration** (`Content Format.md`, `Content Pipeline.md`) — handle format selection, distribution balance, and production workflow.
- **AI execution instructions** (`Generating Content Prompts.md`) — encodes reusable rules directly inside LLM prompts rather than referencing framework documents.
- **Operational data** (`Posted Titles.md`) — tracks published titles for duplication prevention.

The production layer (`Carousel Structure/`, `Export Files/`, `Content Posted/`) sits alongside the framework layer with no formal boundary. The carousel HTML template is the only rendering target, and there is no structured content model between the framework documents and the rendered output.

Key problems that the refactoring will address:

- **Overlapping responsibilities** between `Content Format.md` and `Content Pipeline.md` (both touch format selection and workflow).
- **AI prompt dependency** — reusable rules (format constraints, brand voice, platform adaptation) are hardcoded into `Generating Content Prompts.md` rather than living in framework documents.
- **No content lifecycle** — the workflow exists implicitly but is not formally defined.
- **No structured archiving** — published content lacks metadata, standardized folder structure, and cross-referencing with `Posted Titles.md`.
- **No single voice document** — brand voice guidelines are scattered across `Brand View.md` and individual format documents.
- **No framework/production boundary** — production artifacts and strategy documents intermingle without a clear architectural separation.

---

## Target State

After all planned improvements are complete, the framework will have these characteristics:

**Clear separation between framework and production layers.** The `Content Framework/` folder will contain only strategy and rules documents. Templates, export scripts, and archives will be formally recognized as the production layer and will consume framework outputs without embedding framework rules. Production tools will never become the source of strategy decisions.

**Single Source of Truth for all rules.** A new `Brand Voice.md` will own all writing voice and tone guidelines. Format-specific documents will define what makes each format distinct, without duplicating voice rules. Platform-specific rules will be defined within `Brand Voice.md`. `Content Format.md` will own the Trigger-First workflow and format selection logic exclusively. `Content Pipeline.md` will own the production workflow and quality gates exclusively.

**AI prompts will reference, not contain, framework rules.** `Generating Content Prompts.md` will be refactored so that reusable rules are removed from prompt templates and replaced with @-references to framework documents. Prompts will contain only execution instructions specific to the AI agent's task. The framework will be fully understandable without reading any prompt files.

**Formal content lifecycle.** The content journey from trigger to archive will be explicitly defined in `Content Pipeline.md`, with clear stages: Trigger → Idea → Format Selection → Draft → Review → Final Assets → Published → Archived.

**Structured content memory.** Every published post will have a consistent folder-per-post archive structure containing captions, scripts, source files, and exported assets. A metadata schema will track publishing date, platform, pillar, format, tags, and status. `Posted Titles.md` will cross-reference archived content.

**Foundation for structured content.** The framework will define a JSON content model so that all outputs can be generated from structured data. This prepares the system for future React rendering without requiring immediate implementation.

**No overlapping document responsibilities.** Every document will have a single, clearly defined owner. No rule will exist in more than one place. The dependency graph between documents will be explicit and acyclic.

---

## Implementation Phases

### Phase 1: Stabilize Brand Foundation

#### Objective

Create `Brand Voice.md` as the Single Source of Truth for all writing voice, tone, and stylistic rules. Extract voice guidelines from `Brand View.md` so that each document has a distinct, non-overlapping responsibility.

#### Why This Phase Comes Here

`Brand Voice.md` is the root dependency for the entire framework. Every format document, platform rule, and AI prompt will reference it. It must be created and stabilized before any document that depends on voice rules can be refactored. Without it, downstream changes would need to be redone when the voice definition is finalized later.

#### Changes

- Create `Brand Voice.md` with all writing voice, tone, and stylistic guidelines.
- Define the voice attributes, dos and don'ts, and tonal range for the brand.
- Remove voice and tone guidelines from `Brand View.md`.
- Add a reference in `Brand View.md` pointing to `Brand Voice.md` as the voice authority.
- Finalize and lock the core content pillars within `Brand View.md`.

#### Files Affected

- **Create:** `Content Framework/Brand Voice.md`
- **Modify:** `Content Framework/Brand View.md` (remove voice guidelines, add reference to Brand Voice, lock content pillars)
- **Do not touch:** All other framework documents, prompts, templates, archives

#### Expected Result

- `Brand Voice.md` exists and owns all writing voice, tone, and stylistic rules.
- `Brand View.md` owns creator identity, audience, content boundaries, messaging lens, and content pillars — but no longer defines voice.
- The two documents have a clear parent-reference relationship.
- All other documents still function as before (they still contain their duplicated voice rules — those will be removed in later phases).

---

### Phase 2: Define Platform Rules

#### Objective

Define explicit platform-specific rules within `Brand Voice.md` so that platform adaptation logic has a single owner. This includes language strategy, rewriting rules to prevent copy-paste content, and the mandatory output package for every content idea.

#### Why This Phase Comes Here

Platform rules depend on having a stable voice definition (Phase 1). They must be defined before format documents are cleaned up (Phase 3) because format documents currently contain scattered platform-adaptation rules that need a target to point to. Defining platform rules now also informs the format selection logic that will be refined in Phase 4.

#### Changes

- Add platform-specific sections to `Brand Voice.md` for Instagram, LinkedIn, X, and Stories.
- Define explicit rewriting rules per platform (what changes between an Instagram carousel and a LinkedIn post derived from the same idea).
- Define the mandatory output package for every content idea (what assets must be produced for each platform).
- Document the language strategy per platform (Lebanese Arabic vs English, technical term handling).

#### Files Affected

- **Modify:** `Content Framework/Brand Voice.md` (add platform rules section)
- **Do not touch:** All other documents

#### Expected Result

- `Brand Voice.md` is the complete authority on voice and platform adaptation.
- Platform-specific rules exist in exactly one place.
- Format documents still contain their own duplicated platform references (to be removed in Phase 3).
- The mandatory output package is defined and can be referenced by the pipeline later.

---

### Phase 3: Clean Format Document Responsibilities

#### Objective

Refine `Carousels.md`, `Reels.md`, and `Stories.md` so that each document owns a single, clear responsibility: defining what its format is for, what types exist, and what structural schema it follows. Remove all voice and platform rules that now belong to `Brand Voice.md`.

#### Why This Phase Comes Here

Format documents depend on `Brand Voice.md` and platform rules (Phases 1–2) being stable. Until the voice and platform authorities exist, format documents have nowhere to point for the rules they currently duplicate. Cleaning them now also unblocks Phase 4, because format selection logic needs format documents with clear, non-overlapping definitions.

#### Changes

- Remove all voice and tone guidelines from `Carousels.md`, `Reels.md`, and `Stories.md`.
- Remove all platform-adaptation rules from these documents.
- Replace removed content with explicit references to `Brand Voice.md`.
- Strengthen each document's format-specific rules: what makes a carousel different from a reel, what authenticity rules apply only to reels, what "unpolished" means specifically for stories.
- Ensure no two format documents claim the same rule.

#### Files Affected

- **Modify:** `Content Framework/Carousels.md`, `Content Framework/Reels.md`, `Content Framework/Stories.md`
- **Do not touch:** `Brand View.md`, `Brand Voice.md`, `Content Format.md`, `Content Pipeline.md`, prompts, templates, archives

#### Expected Result

- Each format document has a single, clearly defined purpose.
- Voice and platform rules are referenced via `Brand Voice.md`, not duplicated.
- Format-specific rules (structures, types, constraints) are sharpened and distinct.
- The framework has three clean format definitions ready for selection logic improvements.

---

### Phase 4: Improve Content Planning Logic

#### Objective

Separate the overlapping responsibilities of `Content Format.md` and `Content Pipeline.md`. Establish `Content Format.md` as the sole owner of Trigger-First workflow and format selection logic. Establish `Content Pipeline.md` as the sole owner of the production workflow, quality gates, and the formal content lifecycle.

#### Why This Phase Comes Here

This phase depends on format documents having clean definitions (Phase 3). Format selection logic cannot be finalized until each format document clearly states what its format is for. Separating these concerns now also unblocks the AI prompt refactoring (Phase 5), because prompts reference both documents and need their responsibilities to be stable.

#### Changes

- Refactor `Content Format.md` to own Trigger-First logic and format selection exclusively.
- Remove workflow sequencing logic from `Content Format.md` that overlaps with `Content Pipeline.md`.
- Move any format selection logic from `Content Pipeline.md` into `Content Format.md`.
- Refactor `Content Pipeline.md` to own the production workflow and quality gates exclusively.
- Define the formal content lifecycle in `Content Pipeline.md`: Trigger → Idea → Format Selection → Draft → Review → Final Assets → Published → Archived.
- Add cross-references between the two documents at their new boundaries.
- Strengthen the Trigger-First workflow throughout both documents.

#### Files Affected

- **Modify:** `Content Framework/Content Format.md`, `Content Framework/Content Pipeline.md`
- **Do not touch:** `Brand View.md`, `Brand Voice.md`, format documents, prompts, templates, archives

#### Expected Result

- `Content Format.md` owns "given a trigger, which format should this become?"
- `Content Pipeline.md` owns "what happens after format selection through to archive?"
- No overlapping responsibilities between the two documents.
- The formal content lifecycle is defined and can be referenced by the archive system (Phase 6).
- Both documents are ready to be referenced by refactored AI prompts (Phase 5).

---

### Phase 5: Refactor AI Prompts

#### Objective

Reduce AI prompt dependency by moving all reusable rules from `Generating Content Prompts.md` into their owning framework documents. Rewrite prompts to use @-references instead of containing rules inline. Prompts should orchestrate the framework rather than define it.

#### Why This Phase Comes Here

AI prompts are the terminal consumer of all framework documents. They cannot be refactored until every document they reference is stable — `Brand Voice.md` (Phase 1–2), format documents (Phase 3), and the pipeline documents (Phase 4). Refactoring prompts earlier would create references to documents still in flux, requiring rework.

#### Changes

- Audit all four prompt templates for rules that can live in framework documents.
- Extract any reusable rules and ensure they exist in the correct owning document (created in earlier phases).
- Rewrite prompt templates to use @-references to framework documents instead of inline rules.
- Keep only execution instructions specific to each AI agent's task within the prompts.
- Ensure the Post Idea Generator still consults `Posted Titles.md` for duplication prevention.
- Verify all @-references resolve to documents that actually contain the referenced rules.

#### Files Affected

- **Modify:** `Content Framework/Generating Content Prompts.md`
- **Possibly modify:** Owning documents if any extracted rules were missed in earlier phases (minor additions only)
- **Do not touch:** `Brand View.md`, `Brand Voice.md` (unless minor additions needed), templates, archives

#### Expected Result

- `Generating Content Prompts.md` contains only execution instructions.
- All reusable rules live in framework documents, not in prompts.
- The framework is fully understandable without reading the prompts file.
- All four AI agents still function correctly using @-references.
- The prompts file is significantly thinner and easier to maintain.

---

### Phase 6: Improve Archiving and Content Memory

#### Objective

Standardize the archive structure, create a metadata schema for published posts, and cross-reference `Posted Titles.md` with archived content. Fix the `Linkedln/` naming inconsistency and resolve any archive inconsistencies.

#### Why This Phase Comes Here

The archive system depends on the content lifecycle being defined (Phase 4). The metadata schema must reflect the finalized lifecycle stages, format definitions, and platform rules from earlier phases. Archiving changes also depend on the framework being stable, since the archive structure reflects framework definitions. This phase also addresses the "Skip" items from the improvement document.

#### Changes

- Rename `Linkedln/` to `LinkedIn/` in the archive.
- Design and document a metadata schema (publishing date, platform, pillar, format, tags, status).
- Restructure archives to use a folder-per-post organization.
- Preserve captions, scripts, and source files together with exported assets in each post folder.
- Add cross-references from `Posted Titles.md` to archived content.
- Standardize the archive structure across all platforms.
- Resolve any existing archive inconsistencies between posts.

#### Files Affected

- **Modify:** `Content Posted/` (structural reorganization), `Content Framework/Posted Titles.md` (add cross-references)
- **Create:** Metadata files within each archived post folder
- **Do not touch:** All framework strategy documents, prompts, templates, export scripts

#### Expected Result

- Archive follows a consistent folder-per-post structure.
- Every published post has metadata tracking its key attributes.
- `Posted Titles.md` cross-references archived content.
- The `Linkedln/` naming inconsistency is resolved.
- Historical archive inconsistencies are fixed.
- The archive is ready for structured content models (Phase 8).

---

### Phase 7: Improve Production and Template Systems

#### Objective

Parameterize the carousel HTML template for reuse, support multiple templates if needed, and preserve LinkedIn visual assets alongside written posts. This phase implements the production-layer "Should Do" improvements.

#### Why This Phase Comes Here

Production tools consume the framework. They must be improved after the framework layer is stable (Phases 1–6). Changing templates earlier would risk embedding rules that later shift. Now that the framework is clean, templates can be parameterized based on stable format definitions without risk of rework.

#### Changes

- Create a generic carousel template that can be reused for every carousel.
- Parameterize `index.html` using placeholders for content population.
- Support multiple carousel templates if future layouts require them (structure only, not new designs).
- Preserve LinkedIn visual assets alongside written posts in the archive.
- Clearly define responsibility for each production step (AI, Human, or Automation) in the pipeline documentation.

#### Files Affected

- **Modify:** `Carousel Structure/index.html`, `Carousel Structure/styles.css`, `Content Framework/Content Pipeline.md` (add responsibility definitions)
- **Possibly create:** Additional template files if multiple layouts are needed
- **Do not touch:** Framework strategy documents, `Brand Voice.md`, format documents, prompts (unless pipeline doc changes require minor prompt reference updates)

#### Expected Result

- The carousel template is reusable and parameterized.
- Multiple template structures are supported if needed.
- LinkedIn assets are preserved alongside written posts.
- Every production step has a clearly defined owner (AI, Human, or Automation).
- The production layer consumes framework definitions without embedding them.

---

### Phase 8: Prepare Future Automation and Data Models

#### Objective

Define a structured JSON content model and prepare the framework for future React rendering. This phase also implements the "Nice to Have" developer experience improvements.

#### Why This Phase Comes Here

The JSON content model depends on everything being stable: format definitions (Phase 3), content lifecycle (Phase 4), metadata schema (Phase 6), and template structure (Phase 7). The model must reflect the finalized framework, not an in-progress version. Developer experience improvements come last because they optimize a stable system.

#### Changes

- Define a structured JSON content model that can represent all content types.
- Design the model so all outputs can be generated from structured data.
- Prepare the framework for a future React rendering system (define the interface, do not implement the renderer).
- Add npm scripts for serving and exporting in `Export Files/`.
- Remove hardcoded paths from `export-slides.js`.
- Improve Playwright configuration for configurability.
- Support configurable export settings.
- Add optional CI/CD automation configuration.

#### Files Affected

- **Create:** JSON content model schema (location TBD — could be a new framework document or an addition to an existing one)
- **Modify:** `Export Files/package.json`, `Export Files/export-slides.js`, Playwright configuration
- **Do not touch:** Framework strategy documents (unless the JSON model is added to one), archives, templates

#### Expected Result

- A JSON content model exists that can represent all content types.
- The framework is prepared for future React rendering (interface defined, renderer not built).
- Export pipeline has npm scripts and no hardcoded paths.
- Playwright is configured for flexible, configurable exports.
- Optional CI/CD automation is available.
- The system is ready for future extensibility without further architectural changes.

---

## Validation Checklist

After every phase, verify:

- [ ] **No duplicated rules** — Every rule exists in exactly one document. Check format documents, pipeline, and prompts for accidental duplication.
- [ ] **Document relationships remain valid** — References between documents point to the correct owning document. A reference to voice rules goes to `Brand Voice.md`, not `Brand View.md`.
- [ ] **Single Source of Truth maintained** — For any given decision (voice, format selection, workflow step), there is exactly one document that owns it.
- [ ] **Cross-references updated** — When a rule moves from one document to another, all documents that referenced the old location now reference the new one.
- [ ] **Architecture remains consistent** — The directed information flow still functions. No circular references introduced.
- [ ] **AI prompts still align with framework** — `Generating Content Prompts.md` @-references resolve to documents that actually contain the referenced rules.
- [ ] **Archive structure still works** — Published content can be stored and retrieved. `Posted Titles.md` cross-references are valid.
- [ ] **Production outputs unchanged** — A carousel generated after the change produces the same visual result as before (unless the change intentionally modifies output).
- [ ] **Framework/production separation clear** — No framework rule lives in a production file. No production configuration lives in a framework document.
- [ ] **New documents have clear ownership** — Any newly created document has a single, well-defined responsibility that doesn't overlap with existing documents.
- [ ] **Phase inputs were available** — All dependencies from earlier phases were completed before starting this phase.
- [ ] **Phase outputs are complete** — All expected results for this phase are met before moving to the next phase.

---

## Definition of Done

The refactoring is considered successfully completed when all of the following conditions are met:

- **Every document has a clear owner.** Each framework document owns a distinct, well-defined responsibility. No document's purpose is ambiguous or overlaps with another.
- **Every rule has a single source of truth.** Any given rule, constraint, or definition exists in exactly one document. All other documents reference it rather than restating it.
- **No overlapping document responsibilities remain.** `Content Format.md` and `Content Pipeline.md` have clearly separated concerns. Format documents do not duplicate voice rules. Platform rules are owned in one place.
- **AI prompts orchestrate the framework instead of defining it.** `Generating Content Prompts.md` contains only execution instructions. All reusable rules have been extracted into framework documents and are consumed via @-references.
- **The framework is understandable without reading prompt files.** A new contributor can understand the content strategy, format rules, and production workflow by reading only the framework documents. The prompts are an execution layer, not a knowledge source.
- **Production tools consume the framework without influencing it.** Templates, export scripts, and any future automation read from framework definitions but never embed strategy decisions. The architectural boundary between framework and production is clean.
- **The dependency graph is respected.** No document references a document that depends on it. The flow from Brand Voice through format documents, pipeline, prompts, and archives is acyclic and traceable.
- **The archive system is consistent.** All published content follows the folder-per-post structure with metadata. `Posted Titles.md` cross-references archived posts. Historical inconsistencies are resolved.
- **Backward compatibility is preserved.** The framework still produces the same content types through the same high-level workflow. Existing content in the archive remains accessible.
- **All eight phases are complete.** Each phase's expected results have been achieved and validated before moving to the next.
- **The JSON content model is defined.** Structured data representation exists for all content types, preparing the system for future React rendering without requiring its implementation.
