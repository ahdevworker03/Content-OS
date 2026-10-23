## Contents

- [Content Format](#content-format)
- [Content Pipeline](#content-pipeline)

# Content Format

This document defines the fixed platform outputs and lifecycle for the current personal Content OS. Every qualified idea produces both an Instagram Carousel and a LinkedIn Post. Workflow 01 qualifies and develops the idea; Workflow 02 plans shared meaning and records the inherited outputs in the brief; Workflow 04 writes each platform adaptation.

It describes how the required formats serve the shared content direction. It is not a per-idea platform/format selection policy.

The complete lifecycle is defined in the [Content Pipeline](#content-pipeline) section: **Capture / ingestion → Qualified READY Idea → Approved Content Brief → Canonical Content Draft → Instagram Carousel + LinkedIn Post adaptation → Carousel validation/export (where applicable) → Publish → Archive the exact published variants**. Editorial quality gates run inside the relevant numbered workflows; they do not add parallel lifecycle stages.

---

## Trigger-First Philosophy

Every piece of content originates from a real experience, system, decision, observation, or implementation trigger.

For the full definition of the trigger-first principle and its role in brand voice, refer to `Brand Strategy.md`.

Content should never be created from abstract ideas or generic topics. A trigger is what makes content authentic and valuable. Without one, there is nothing to plan.

---

## How Workflow 01 Develops a Trigger

Not every daily experience becomes content. A good trigger has:

- **Specificity:** A specific bug, error, or moment is better than a general observation.
- **Audience value:** The trigger reveals something the audience can understand or examine in similar work.
- **Shareability:** The insight can be explained clearly to a peer.
- **Relevance:** The trigger relates to the content pillars defined in `Brand Strategy.md`.

When a captured trigger lacks specificity or a clear learning outcome, Workflow 01 should first clarify and develop it from available evidence. Leave it in `DEVELOP` if useful substance exists but remains unresolved.

Workflow 01 uses `content-strategist` to develop captured material and assign `REJECT`, `DEVELOP`, or `READY`. `DEVELOP` is the normal intermediate state for useful but unfinished ideas; try reasonable evidence-based refinement before using the exceptional `REJECT` verdict. Only `READY` ideas may enter Content Planning.

---

## Fixed Platform Outputs

Every content idea that reaches production in the current personal Content OS produces both required variants. Workflow 02 records these inherited outputs; it does not decide whether either is included.

### Carousel

The Instagram Carousel presents the shared insight in Lebanese Arabic through visual, multi-slide storytelling. Workflow 04 determines the carousel narrative, slide structure and copy based on the canonical content and `Carousels.md` rules; it does not replace the LinkedIn variant.

Refer to [`Carousels.md`](../formats/Carousels.md) for full format rules — structure, slide schema, constraints, and best practices.

### LinkedIn Post

The LinkedIn Post presents the same supported insight in English through professional explanation or reflection grounded in the project, system, decision, or learning moment. Workflow 04 independently adapts its structure and copy; it is not omitted because the Instagram version exists.

Refer to [`linkedin.md`](../formats/linkedin.md) for LinkedIn structure, voice, examples, and writing constraints.

### Goals of Every Content Piece

Every piece should aim to:

- Explain real development work authentically.
- Build trust through concrete evidence and honest limits.
- Give the audience a useful model, question, or tradeoff.
- Start conversations at a peer level.

---

## Relationship to the Content Lifecycle

Workflow 01 does not choose platforms or formats. Workflow 02 locks the shared content direction and records both fixed required variants in the Content Brief. Workflow 04 owns language, voice, structure, and presentation for each.

The [Content Format](#content-format) section explains the two fixed outputs; it does not define a choice between them. This document does not define canonical writing, platform adaptation, rendering, export, publication, or archive behavior. Those lifecycle stages are owned by the [Content Pipeline](#content-pipeline) section and its numbered workflow prompts.

# Content Pipeline

This document owns the Content OS lifecycle and workflow handoffs. The [Content Format](#content-format) section defines idea and format-selection principles; the numbered prompt for each stage owns execution details.

## Canonical lifecycle

```text
Real work
  → automatic/manual capture or optional discovery → content/ideas/ (raw capture inbox)
  → Workflow 01 — Idea Qualification: content-strategist → REJECT / DEVELOP / READY
    └─ only selected READY ideas proceed
  → Approved Content Brief (both outputs fixed)
  → Canonical Content Draft (shared, platform-neutral meaning)
  └─ semantic/editorial gate: content-editor
  → Workflow 04 — Format Adaptation
    ├─ Instagram Carousel (Lebanese Arabic)
    └─ LinkedIn Post (English)
       └─ separate platform adaptation + content-reviewer
  → Render Validation (where applicable)
  → Export (where applicable)
  → Publish
  → Archive the exact published variant
```

The quality gates are internal to the existing stages. They do not create additional numbered workflows or new persistence artifacts.

Publishing is a manual platform action between Workflow 06 and Workflow 07; it is not a repository-writing workflow.

## Stages and owners

### 1. Idea

`content/ideas/` holds raw captured opportunities, not approved publishing ideas. Workflow 01 develops each capture toward its strongest supported direction before assigning a verdict; useful but unfinished material normally remains `DEVELOP`, and `REJECT` is exceptional after reasonable refinement. Optional discovery from recent work is an ingestion path and feeds the same inbox; it is not the mandatory production stage.

- **Capture owner:** automatic/manual ingestion under `framework/workflows/Content Idea Capture Rules.md`; capture remains intentionally moderate and does not decide publishability.
- **Qualification owner:** Workflow 01 — `framework/workflows/Content Creation Playbook.md#01--idea-qualification`
- **Quality gate:** `.agents/skills/content-strategist/SKILL.md`
- **Gate outcome:** `DEVELOP` for promising but incomplete directions, `READY` when strategically mature, or exceptional `REJECT` only after reasonable refinement leaves no worthwhile supported direction. Only `READY` proceeds.
- **Output:** verdict for each evaluated idea; for meaningful `DEVELOP` and `READY`, a refined strategic direction with trigger, strongest defensible angle, evidence, audience payoff, brand/pillar fit, how the shared direction supports both fixed variants, and factual boundaries.

### 2. Approved Content Brief

Planning fixes what both versions mean, who they serve, and how their shared substance is framed.

- **Owner:** Workflow 02 — `framework/workflows/Content Creation Playbook.md#02--content-planning`
- **Input requirement:** one selected idea with a current `READY` verdict and strategic direction from Workflow 01. `REJECT`, unresolved `DEVELOP`, or unqualified ideas return to Workflow 01.
- **Output:** approved shared Content Brief with the fixed required variants: Instagram Carousel and LinkedIn Post.

### 3. Canonical Content Draft

The canonical draft records meaning and evidence without format or platform presentation.

- **Owner:** Workflow 03 — `framework/workflows/Content Creation Playbook.md#03--post-content-builder`
- **Quality gate:** `.agents/skills/content-editor/SKILL.md`
- **Output:** only `content/drafts/post.md` after semantic/editorial repair.
- **Owns:** core idea, trigger, reasoning, key points, supported examples, factual claims/boundaries, intended takeaway, CTA intent, and wording to preserve.
- **Gate rule:** if the editor returns `NEEDS SOURCE INPUT`, Workflow 03 stops instead of inventing missing facts or reasoning.

### 4. Format / Platform Adaptation

Each approved variant is written as a standalone artifact. Adaptation changes presentation only; it preserves the canonical meaning and factual boundaries.

- **Owner:** Workflow 04 — `framework/workflows/Content Creation Playbook.md#04--format-adaptation`
- **Refinement:** apply only the relevant language/format skills for the required variant.
- **Final editorial gate:** `.agents/skills/content-reviewer/SKILL.md`
- **Allowed review outcomes:** `PASS`, `PASS WITH MINOR EDITS`, `REVISE`, `BLOCK`.
- **Required outputs for every qualified content item:**
  - Instagram Carousel: `content/drafts/format/carousel.md` and `production/workspace/carousel.json`.
  - LinkedIn Post: `content/drafts/format/linkedin.md`.
- LinkedIn content never lives inside another platform's draft.
- Only Carousel produces renderer JSON.
- The LinkedIn variant is not ready for publication until its final editorial review is `PASS` or `PASS WITH MINOR EDITS` and required minor edits have been applied. The Carousel also proceeds through Workflow 05 validation before export/publication.

### 5. Render Validation (where applicable)

Validate the required Instagram Carousel in the React renderer after it has passed its editorial gate.

- **Owner:** Workflow 05 — `framework/workflows/Content Creation Playbook.md#05--render-validation`
- **Input:** editorially approved `production/workspace/carousel.json`.
- **Output:** render-ready confirmation or a failure report.

### 6. Export (where applicable)

Export slide assets from a validated Carousel. This stage applies only when Carousel assets are required.

- **Owner:** Workflow 06 — `framework/workflows/Content Creation Playbook.md#06--export-assets`
- **Input:** validated carousel workspace data.
- **Output:** exported slide images/package ready for manual publication.

### 7. Publish

The creator publishes the chosen approved variant on its target platform. Publishing remains outside the repository and requires an explicit human action.

### 8. Archive the exact published variant

Archive exactly the platform variant that appeared, not another generated variant or a shared package.

- **Owner:** Workflow 07 — `framework/workflows/Content Creation Playbook.md#07--archive-published-post`
- **Inputs:** exact published copy, platform, variant format, verified date, URL/identifier, and applicable assets.
- **Output:** a platform-specific archive containing only that variant, accurate metadata, and applicable variant-specific data/assets; update `framework/memory/Posted Titles.md`.
- Carousel JSON and exported slide assets are Carousel-only. A LinkedIn archive uses the standalone LinkedIn post and any LinkedIn assets actually published.

## Adaptation invariant

Format/platform adaptation may change presentation, structure, pacing, hook form, length, language, formatting, and CTA expression. It must not silently change:

- Canonical meaning or reasoning
- Factual claims or supported examples
- Experiences or achievements
- Uncertainty or factual boundaries
- Intended takeaway or CTA intent

Every variant must be traceable to `content/drafts/post.md`. If substantive content needs to change, return to Workflow 03, update the canonical draft through the `content-editor` gate, then regenerate affected variants in Workflow 04.

The final reviewer routes issues by ownership rather than patching them in the wrong layer:

- semantic, logic, or substantive clarity issues → Workflow 03 / `content-editor`
- factual issues → source material and Workflow 03
- language or voice issues → relevant language skill in Workflow 04
- format/pacing issues → relevant format skill in Workflow 04
- genericity or audience-value issues that expose a weak underlying angle → Workflow 01 / `content-strategist`; Workflow 02 returns the brief upstream rather than requalifying the idea

## Quality checks

- Workflow 01 has a `content-strategist` verdict; `DEVELOP` is used for promising unfinished ideas and `REJECT` only after reasonable refinement finds no worthwhile supported direction; only `READY` proceeds.
- The brief records both fixed required outputs: Instagram Carousel and LinkedIn Post.
- Canonical claims and examples are supported by the source material.
- Workflow 03 has passed the canonical draft through `content-editor`; unresolved source gaps are not invented away.
- Every variant matches the canonical meaning and its platform/format rules.
- Every required variant receives a `content-reviewer` verdict before it is considered approval-ready.
- `REVISE` findings are repaired by the owning skill and reviewed again; `BLOCK` findings stop progression.
- Carousel Markdown and JSON agree before render validation.
- Render validation runs for the required Carousel; export follows when Carousel assets are needed.
- Publication is separate from export.
- Archive copy matches the exact published variant, with no unrelated platform package.

## Production ownership

| Stage | Owner | Responsibility |
|---|---|---|
| Capture inbox | Project agents / manual capture | Preserve potentially useful raw material while context is fresh; do not judge publication worthiness. |
| Idea qualification | Workflow 01 + `content-strategist` | Develop captured material first, then qualify its strongest supported direction; use `DEVELOP` normally for unfinished potential and `REJECT` only exceptionally. Only selected `READY` ideas proceed. |
| Brief | Human / Workflow 02 | Approve shared content direction and record both fixed required variants from a `READY` idea. |
| Canonical draft | Workflow 03 + `content-editor` | Define and repair meaning, evidence, reasoning, and boundaries in `post.md`. |
| Adaptation | Workflow 04 + relevant writing/format skills + `content-reviewer` | Produce both fixed standalone variants, refine each presentation independently, run the final editorial gates, and generate the required Carousel JSON. |
| Render validation | Workflow 05 | Validate the editorially approved Carousel renderer output when applicable. |
| Export | Workflow 06 | Export Carousel assets when applicable. |
| Publish | Human | Publish the selected approved variant on the platform. |
| Archive | Workflow 07 | Preserve the exact published variant and update the title index. |

## Refinement entry point

`.agents/skills/content-refinement/SKILL.md` is the orchestration entry point when the creator explicitly asks to review, refine, strengthen, or make an idea/draft approval-ready. It routes work through the specialist skills above and must return an actionable report plus a revised artifact or refined direction when the available evidence supports one. It does not create a separate persistence layer or numbered workflow.

## Production boundary

The renderer and export tools consume Carousel-specific structured presentation data. They do not define canonical meaning, platform strategy, brand voice, or adaptation boundaries; those remain upstream in the brief, canonical draft, Workflow 04, and their editorial quality gates.
