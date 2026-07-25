# Content Pipeline

This document is the sole owner of the complete Content Lifecycle, from trigger to archive.

Format selection — given a trigger, deciding which content format to use — is owned by `Content Format.md`, which provides the detailed rules for the Trigger, Idea, and Format Selection stages.

---

## Content Lifecycle

The full journey from trigger to archive follows these stages:

```
Trigger → Idea → Format Selection → Draft → Review → Final Assets → Published → Archived
```

Stages 1–3 are planning decisions owned by `Content Format.md`. Stages 4–8 are production responsibilities owned by this document.

---

## Stage by Stage

### 1. Trigger

**Purpose:** Capture a real experience that could become content.

**Input:** A daily experience — a bug, a lecture, a conversation, a struggle, or a small win.

**Output:** A raw trigger statement.

**Owner:** `Content Format.md`

---

### 2. Idea

**Purpose:** Validate whether the trigger is worth developing into content.

**Input:** Raw trigger statement.

**Output:** A validated content idea with a clear insight.

**Owner:** `Content Format.md`

---

### 3. Format Selection

**Purpose:** Choose the appropriate format based on the validated idea.

**Input:** Validated content idea.

**Output:** Selected format and target platform.

**Owner:** `Content Format.md`

Once a format is selected, proceed to Draft below.

---

### 4. Draft

**Purpose:** Write the first version of the content in the selected format.

**Input:** Validated content idea with selected format and platform.

**Output:** Complete first draft.

**Process:**
- Follow the format-specific structure defined in the relevant format document:
  - `Carousels.md` for carousel slide sequence and constraints.
  - `Reels.md` for reel hook, structure, pacing, and recording expectations.
  - `Stories.md` for story categories, unpolished standards, and engagement patterns.
- Follow brand voice and writing guidelines defined in `Brand Voice.md`.
- Apply platform-specific adaptation rules defined in `Brand Voice.md` (language, tone, structure per platform).

---

### 5. Review

**Purpose:** Validate the draft against quality criteria before producing final assets.

**Input:** Complete first draft.

**Output:** Approved draft ready for final asset production, or a revision request.

**Quality Gates:**

1. **Trigger authenticity:** Does the content originate from a real, specific experience?
2. **Voice alignment:** Does it sound like a student peer, not a teacher? (Refer to `Brand Voice.md` for full voice rules.)
3. **Format compliance:** Does it follow the structure and constraints of its selected format? (Refer to the relevant format document.)
4. **Visual authenticity:** Does it look grounded in a real learning environment, not over-produced or AI-generated?
5. **Student-centricity:** Does it reflect the student reality — exams, deadlines, real constraints?

If any gate is not passed, the draft returns to the Draft stage with revision notes.

---

### 6. Final Assets

**Purpose:** Produce the publishable assets — visuals, captions, formatted text.

**Input:** Approved draft.

**Output:** Complete, publishable content piece ready for the target platform.

**Process:**
- For carousels: render slide visuals following the structure in `Carousels.md`.
- For reels: record or assemble video clips following `Reels.md` recording and pacing expectations.
- For stories: capture and post in-the-moment content following `Stories.md`.
- For LinkedIn and X posts: format the text using `Brand Voice.md` platform rules.
- Prepare platform-adapted versions as defined in the Mandatory Output Package (`Brand Voice.md`).

---

### 7. Published

**Purpose:** Post the content on the target platform.

**Input:** Complete publishable assets.

**Output:** Published post.

**Process:**
- Post on the target platform following its specific requirements.
- For carousels: export slides and upload to Instagram.
- For reels: upload video with caption to Instagram.
- For LinkedIn: post the formatted text and any visuals.
- For X: post the text or thread.
- For stories: post to Instagram stories.
- Track the published title in `Posted Titles.md` to prevent future duplication.

---

### 8. Archived

**Purpose:** Preserve the published content with metadata for future reference.

**Input:** Published post and its metadata.

**Output:** Archived post with consistent folder-per-post structure.

**Process:**
- Store captions, scripts, source files, and exported assets together.
- Include metadata (publishing date, platform, pillar, format, tags, status).
- Cross-reference with `Posted Titles.md`.

---

## Quality Gates Summary

Five pipeline-owned quality checks applied during the Review stage:

| Gate                  | What It Validates                              |
| --------------------- | ---------------------------------------------- |
| Trigger authenticity  | Content originates from a real, specific trigger |
| Voice alignment       | Student perspective, never authoritative       |
| Format compliance     | Structure and constraints match selected format |
| Visual authenticity   | Looks grounded, not over-produced              |
| Student-centricity    | Reflects student reality (exams, deadlines)    |

All five gates must pass before content moves to Final Assets.

---

## Production Ownership

Every production step is assigned a responsible actor. This matrix defines who does what — it is not a workflow redesign. Steps that currently require human judgement are marked Human. Steps that can be fully delegated are marked AI. Steps planned for future automation are marked Automation.

| Stage            | Step                    | Owner       | Notes |
| ---------------- | ----------------------- | ----------- | ----- |
| **Trigger**      | Capture raw experience | Human       | Real-life moments the creator chooses to document |
| **Idea**         | Validate trigger       | Human       | Decides whether an experience is worth developing |
| **Format Selection** | Choose format      | AI / Human  | AI proposes based on `Content Format.md` rules; Human approves |
| **Draft**        | Generate first draft   | AI          | Uses `Carousels.md`, `Reels.md`, or `Stories.md` + `Brand Voice.md` via `Generating Content Prompts.md` |
|                  | Review draft           | Human       | Validates against quality gates |
| **Final Assets** | Populate carousel template | AI / Automation | AI fills `Carousel Structure/index.html` placeholders; future Automation reads JSON directly |
|                  | Export carousel slides | Automation (future) | Playwright script or similar tool exports to PNG |
|                  | Record reel            | Human       | In-the-moment recording per `Reels.md` |
|                  | Edit reel              | Human       | Trim and basic edits |
|                  | Write caption / format text | AI / Human | AI drafts per platform rules; Human tailors |
| **Published**    | Post on platform       | Human       | Manual upload to Instagram, LinkedIn, X, or Stories |
|                  | Track in Posted Titles | Human       | Add title + archive path to `Posted Titles.md` |
| **Archived**     | Store assets           | Human       | Move final assets into `Content Posted/` per archive structure |
|                  | Write metadata.json    | Human / AI  | Populate metadata fields (dates, tags, pillar) |
|                  | Verify archive         | Human       | Confirm assets are grouped and paths are correct |

### Archive Output Requirements

When archiving, the production workflow must ensure:

- **Carousels:** Rendered slides and source data (`sample-data.json`) are saved together. If visual assets are produced in a carousel format, they are stored in the post's `assets/` subfolder alongside the data file that produced them.
- **Reels:** Video files and caption text are stored together in the post folder.
- **Stories:** Captures (screenshots or exports) and timestamps are grouped in the post folder.
- **LinkedIn / X posts:** Written post (`post.md`) is stored in the post folder. If visual assets are produced in the future, they are archived in an `assets/` subfolder alongside the written post.
- **All formats:** Metadata follows the schema defined during archiving (`id`, `title`, `status`, `published_date`, `platform`, `primary_format`, `content_pillar`, `language`, `tags`, `related_assets`, `notes`).

### Production Layer Boundary

The production layer (`Carousel Structure/`, `templates/`, `Export Files/`, `Content Posted/`) renders and archives content. It never defines:

- brand voice or tone
- platform adaptation rules
- format-specific constraints
- planning or selection logic
- quality gate criteria

All of the above belong to framework documents in `Content Framework/` and are consumed by the production layer via @-references, template placeholders, or data files.
