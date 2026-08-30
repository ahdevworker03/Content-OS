# Prompt System — Operational Guide

## Purpose

The prompt system is the execution layer of the Social Media Content repository. It translates repository strategy, format rules, and workflow definitions into precise instructions for an AI agent that produces content. Every prompt in this directory is a self-contained workflow — it defines what to do, what to read, and what to produce. Together they form a pipeline that covers the full content production lifecycle: from discovering an idea to archiving the published post.

---

## Prompt Architecture

Each workflow prompt lives in its own Markdown file under `framework/prompts/`. Files are numbered to indicate execution order:

| #   | File                           | Responsibility                           |
| --- | ------------------------------ | ---------------------------------------- |
| 01  | `01-Idea Discovery.md`         | Surface post ideas from real experiences |
| 02  | `02-Content Planning.md`       | Select an idea and determine format      |
| 03  | `03-Post Content Builder.md`   | Write the full content package           |
| 04  | `04-Render Validation.md`      | Validate rendering in the React renderer |
| 05  | `05-Export Assets.md`          | Export slide images via Playwright       |
| 06  | `06-Archive Published Post.md` | Record the published post in the archive |

Every prompt has a single responsibility. No prompt performs work that belongs to another. The system relies on clear boundaries between workflows rather than internal orchestration logic.

---

## Global Repository Rules

All workflow outputs must be written directly to the repository files defined by the workflow.

Repository files are the authoritative output of every workflow.

The conversation may summarize completed work, report validation results, or explain decisions, but it must never be treated as the primary location of generated artifacts.

When a workflow specifies one or more output files, the workflow is not complete until those files have been written successfully.

---

## Global Failure Handling

If a workflow cannot proceed because required inputs are missing, invalid, inconsistent, or unavailable:

- Stop the workflow immediately.
- Do not invent or assume missing information.
- Report the blocking issue clearly.
- Wait for the required input before continuing.

A workflow must never silently skip required steps or fabricate data to satisfy its success criteria.

---

## Global Execution Rules

These rules apply to every workflow without exception:

- **Follow repository conventions.** Use the directory structure, naming patterns, and file formats already established in the repository.

- **Respect the Framework documents.** The strategy, format, workflow, model, and memory documents define the rules. Every prompt abides by them.

- **Only execute the requested workflow.** The agent is invoked with a specific workflow. It must not run any other workflow as part of that invocation.

- **Do not perform responsibilities that belong to another workflow.** Each prompt is scoped to its own task. Work that belongs to a different numbered prompt must not be anticipated or performed.

- **Produce the expected outputs only.** Output no files, no chat responses, and no side effects beyond what the workflow specifies.

- **Never modify unrelated files.** Only the files listed in a workflow's outputs may be created or modified.

- **Stop when the workflow is complete.** Once the outputs are produced and any final message is delivered, execution ends.

- **Treat workflow outputs as authoritative.** Outputs produced by one workflow become the official inputs for subsequent workflows and must not be regenerated, reformatted, or modified unless the current workflow explicitly requires it.

---

## Workflow Contract

Every workflow prompt in this directory follows a consistent structure. Each workflow defines:

- **Purpose** — What the workflow achieves and why it exists.
- **Inputs** — What information and files the workflow needs to begin.
- **Outputs** — What the workflow produces.
- **Responsibilities** — What the workflow must do.
- **Success Criteria** — How to confirm the workflow completed correctly.

This contract applies to every workflow. Adding a new workflow means defining all five sections. Updating a workflow means keeping these sections accurate.

---

## Workflow Overview

### 01 — Idea Discovery

**Purpose:** Identify the best content opportunities from real triggers, experiences, or the creator's current learning journey.

**Inputs:** Strategy documents (Brand View, Brand Voice). Format definitions. The posted-titles index for duplication checking. Optional user-provided triggers or context.

**Outputs:** A set of proposed post ideas, each with a core concept, the trigger behind it, a suggested format, a hook angle, and the value it provides to the audience. One idea is recommended as the best next piece of content.

**Responsibilities:**

- Generate ideas grounded in authentic experience.
- Check the posted-titles index to avoid duplication.
- Propose a format and justify the choice.
- Recommend one idea as the strongest candidate.

---

### 02 — Content Planning

**Purpose:** Evaluate the recommended idea from discovery, refine the creative direction, and commit to a specific format and execution plan.

**Inputs:** The selected idea and its evaluation. Strategy documents and format definitions.

**Outputs:** A confirmed content brief that locks in the format, the narrative approach, and any platform-specific adaptations required.

**Responsibilities:**

- Validate the idea against brand and format constraints.
- Make a final format decision.
- Define the creative direction for the content builder.

---

### 03 — Post Content Builder

**Purpose:** Transform the approved brief into a complete, publish-ready content package for the selected primary format.

**Inputs:** The confirmed brief from Content Planning. Strategy documents, format definitions, the Content Model schema, and any user-provided context, notes, or assets.

**Outputs:** A format-specific content package determined by the selected primary format. The workflow writes authentic, trigger-driven content following the brand voice, produces platform-adapted versions where required, and writes the correct draft file:

- **Carousel** — a Markdown draft and the canonical JSON:
  - `content/drafts/carousel.md` — human-readable Markdown draft (slide scripts, visual guidance, platform adaptations, caption).
  - `production/workspace/carousel.json` — structured data conforming to the Content Model, consumed directly by the React renderer.
- **Reel** — a Markdown content package only:
  - `content/drafts/reel.md` — hook, spoken script, visual suggestions, on-screen text, and caption.
- **Story** — a Markdown content package only:
  - `content/drafts/story.md` — story sequence, text overlays, visual guidance, interactive elements, and supporting notes.

The selected primary format determines which draft file is written. Only Carousel produces the canonical JSON consumed by the React renderer; Reel and Story produce Markdown content packages only.

**Responsibilities:**

- Write authentic, trigger-driven content following the brand voice.
- Produce the correct format-specific content package.
- Include platform-adapted versions where required.
- Provide visual guidance without designing slides.
- Generate canonical JSON only for Carousel, because the current renderer consumes carousel data only.

---

### 04 — Render Validation

**Purpose:** Validate that the structured carousel data renders correctly through the React renderer and is ready for export.

**Inputs:** The `production/workspace/carousel.json` file from Post Content Builder. The React renderer application and its configuration.

**Outputs:** A confirmed rendering validation — confirmation that every slide renders without error, or a report of rendering issues that must be resolved before export.

**Responsibilities:**

- Read the canonical JSON from `production/workspace/carousel.json`.
- Launch the React renderer and load the carousel data.
- Verify that every slide is rendered correctly.
- Preserve the approved content exactly — do not modify the JSON or the renderer.
- Report any rendering errors, missing content, or structural issues.
- Confirm that the carousel is ready for export.

---

### 05 — Export Assets

**Purpose:** Generate publish-ready PNG assets from the validated carousel using the Playwright export pipeline.

**Inputs:** The `production/workspace/carousel.json` file. The React renderer. Playwright export configuration (viewport, output directory, file naming, selector).

**Outputs:** A complete set of PNG images, one per carousel slide, saved to `production/export/`.

**Responsibilities:**

- Launch the React renderer if it is not already running.
- Execute the Playwright export pipeline against the rendered carousel.
- Capture every slide as a high-resolution PNG.
- Verify that all slides were exported and no assets are missing.
- Use the export configuration exactly as provided.
- Produce files that are ready for manual upload to the platform.

---

### 06 — Archive Published Post

**Purpose:** Record the published post in the permanent archive and update the memory index. This workflow maintains the repository after publication.

**Inputs:** The final published post content, its platform metadata, the exported PNG assets, and the URL or identifier of the live post.

**Outputs:** A per-post archive directory under `content/published/<Platform>/<Post>/` containing:

- `content.md` — human-readable post body.
- `content.json` — structured data conforming to the Content Model.
- `metadata.json` — archive metadata (published date, platform, URL, content pillar, trigger).
- `assets/` — the exported PNG slide images.
  An updated entry in `framework/memory/Posted Titles.md` for duplication prevention.

**Responsibilities:**

- Create the platform-specific archive directory with the correct naming convention.
- Write all post artifacts — content, structured data, metadata, and assets — into the archive.
- Update the posted-titles index with the new post's title and metadata.
- Preserve every artifact needed for future reference, cross-linking, and idea discovery.

---

## Workflow Dependencies

Every workflow prompt explicitly declares which Framework documents must be consulted before execution. Workflows should only load the documents they require and should avoid reading unrelated documentation. The documents they may reference include:

| Document         | Location                                 | Purpose                                        |
| ---------------- | ---------------------------------------- | ---------------------------------------------- |
| Brand View       | `framework/strategy/Brand View.md`       | Creator identity, audience, content pillars    |
| Brand Voice      | `framework/strategy/Brand Voice.md`      | Voice, tone, platform rules, language strategy |
| Carousels        | `framework/formats/Carousels.md`         | Carousel types, structure, constraints         |
| Reels            | `framework/formats/Reels.md`             | Reel types, authenticity guidelines            |
| Stories          | `framework/formats/Stories.md`           | Story categories, engagement patterns          |
| Content Format   | `framework/workflow/Content Format.md`   | Trigger-first planning logic                   |
| Content Pipeline | `framework/workflow/Content Pipeline.md` | Full lifecycle, quality gates                  |
| Content Model    | `framework/model/Content Model.md`       | Canonical data schema                          |
| Posted Titles    | `framework/memory/Posted Titles.md`      | Published content index                        |

A workflow should only load the documents it actually needs. No workflow is required to read every document. The file references in each prompt specify exactly what that workflow should consult.

---

## Execution Philosophy

- **One AI agent executes all workflows.** The same agent handles every stage of the pipeline. Different prompts activate different behaviors in that agent.

- **Different prompts invoke different workflows.** The prompt file provided at invocation determines which workflow runs. The agent does not decide which workflow to execute.

- **Prompts are modular.** Each prompt is independent, self-contained, and replaceable. Changing one workflow does not require changes to others as long as the input-output contract is preserved.

- **Each workflow has a clear start and end.** Execution begins when the prompt is loaded and ends when the specified outputs are produced. No workflow runs indefinitely or crosses into another workflow's territory.

- **Outputs from one workflow become inputs for the next.** The pipeline is sequential. Discovered ideas feed into planning, the content brief feeds into writing, the draft feeds into rendering, the rendered output feeds into export, and the published post feeds into archiving. This chain of handoffs defines the content production lifecycle.
