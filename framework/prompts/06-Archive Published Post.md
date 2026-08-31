# 06 — Archive Published Post

## Purpose

Archive a published post into the repository. This workflow preserves every artifact required to reproduce, reference, and manage the published content in the future. It performs repository maintenance only — it does not create content, render slides, or export assets.

---

## Scope

This workflow begins after the content has been successfully published to its destination platform.

It ends after the repository archive has been updated and the memory index has been refreshed.

---

## Required Reading

- `framework/prompts/README.md` — Prompt system architecture, workflow boundaries, global execution rules.
- `framework/memory/Posted Titles.md` — Published content index that must be updated with the new entry.

No other Framework documents are required for this workflow. Strategy, format, brand, and renderer documentation are not consulted during archiving.

---

## Inputs

- **Published platform** — The platform the content was published on (Instagram, LinkedIn, X, or Stories).
- **Published post URL** — The URL of the live post, or an identifier if no public URL exists.
- **Primary format** — The selected format: `carousel`, `reel`, or `story`.
- **Source draft** — The format-specific Markdown draft produced during content creation:
  - Carousel: `content/drafts/carousel.md`
  - Reel: `content/drafts/reel.md`
  - Story: `content/drafts/story.md`
- **Structured data (Carousel only)** — `production/workspace/carousel.json`, the canonical structured data used during rendering. Not required for Reel or Story.
- **Assets (format-dependent)** — Carousel: the exported PNG/PDF slide images from the Export Assets workflow. Reel: any video/script/thumbnail assets, if manually provided. Story: any screenshot/story assets, if manually provided.
- **Publication metadata** — Information required for the archive: publish date, content pillar, tags, language, format, and any platform-specific identifiers.

---

## Outputs

### Archive Directory

A complete, self-contained archive entry under:

`content/published/<platform>/<YYYY-MM-DD-slug>/`

For example:

`content/published/
    instagram/
        2026-07-28-react-state-machine/`

Conventions for the archive path:

- `<platform>` is lowercase: `instagram`, `linkedin`, or `x`.
- `<YYYY-MM-DD-slug>` starts with the published date, followed by a short, descriptive, lowercase, hyphen-separated slug derived from the content title.
- The directory must never overwrite an existing archive directory. If the target path already exists, stop and report the conflict.
- All archived artifacts are preserved exactly — content, metadata, JSON, assets, and captions are never regenerated or edited.

The archive contains:

- `content.md` — Human-readable post body copied from the format-specific Markdown draft.
- `content.json` — Structured data copied from `production/workspace/carousel.json` (Carousel only; not produced for Reel or Story).
- `metadata.json` — Generated archive metadata including: content item ID, title, platform, primary format, published date, archive path, source draft path, assets included, and notes for missing optional assets.
- `assets/` — Carousel: the exported PNG/PDF slide images. Reel/Story: any manually provided video, script, thumbnail, or screenshot assets, when available.

Archive contents depend on the primary format:

- **Carousel** — `content.md`, `content.json`, `assets/` (exported slides), `metadata.json`.
- **Reel** — `content.md`, `metadata.json`, plus `assets/` only if video/script/thumbnail assets were provided.
- **Story** — `content.md`, `metadata.json`, plus `assets/` only if screenshot/story assets were provided.

### Memory Index Update

An entry added to `framework/memory/Posted Titles.md` recording the post title and archive path.

---

## Success Criteria

The workflow is successful when all of the following are true:

- **Archive directory created.** The platform- and post-specific directory exists under `content/published/`.
- **Correct platform location used.** The directory is nested under the correct lowercase platform folder matching the published destination.
- **Markdown copied successfully.** `content.md` is present in the archive directory and matches the source draft for the selected format.
- **Structured data handled per format.** For Carousel, `content.json` is present and matches `production/workspace/carousel.json`. For Reel and Story, `content.json` is not required.
- **Assets handled per format.** For Carousel, all exported slide images are present in `assets/` and the count matches the carousel. For Reel/Story, any provided assets are copied; missing optional assets are noted in `metadata.json` and are not a failure.
- **Metadata generated successfully.** `metadata.json` contains all required fields with accurate values, including primary format and asset notes.
- **Posted Titles updated.** The index includes the new entry with title and archive path.
- **Archive complete and self-contained.** Every file needed to understand and reproduce this post exists within the archive directory. No references point outside it.

---

## Workflow

1. **Verify publication details.** Confirm the platform, post URL, publish date, and any platform-specific identifiers. If details are missing or ambiguous, flag them before proceeding.

2. **Create the archive directory.** Determine the canonical path `content/published/<platform>/<YYYY-MM-DD-slug>/`. Use the lowercase platform folder (`instagram`, `linkedin`, or `x`). Generate a date-prefixed slug from the published date (ISO 8601 `YYYY-MM-DD`) and a short, descriptive, lowercase, hyphen-separated slug derived from the content title. Never overwrite an existing archive directory — if the target path already exists, stop and report the conflict.

3. **Copy the format-specific Markdown draft.** Copy the source draft for the selected format into the archive directory as `content.md`: `content/drafts/carousel.md` for Carousel, `content/drafts/reel.md` for Reel, or `content/drafts/story.md` for Story. Preserve the file exactly — do not edit, reformat, or truncate.

4. **Branch by primary format.**

   **Carousel:**
   - Copy `production/workspace/carousel.json` into the archive directory as `content.json`. Preserve the file exactly.
   - Create the `assets/` subdirectory and copy every exported PNG/PDF slide image into it, preserving the original file names so slide order is maintained.

   **Reel:**
   - Copy any manually provided video, script, or thumbnail assets into an `assets/` subdirectory, if available.
   - Do not require `production/workspace/carousel.json`. Do not require exported carousel PNGs.

   **Story:**
   - Copy any manually provided screenshot or story assets into an `assets/` subdirectory, if available.
   - Do not require `production/workspace/carousel.json`. Do not require exported carousel PNGs.

   If Reel or Story assets were not provided, note this in `metadata.json` instead of treating it as a failure.

5. **Generate `metadata.json`.** Create the metadata file with all required fields: content item ID, title, platform, primary format, published date, archive path, source draft path, assets included, and any platform-specific identifiers. Use ISO 8601 dates. Include a note listing any optional assets that were expected but not provided (e.g. Reel/Story assets). Do not leave required fields empty.

6. **Update Posted Titles.** Add a new row to `framework/memory/Posted Titles.md` with the post title and its archive path, following the existing table format.

7. **Verify archive completeness.** Confirm that all files expected for the selected format are present: `content.md`, `metadata.json`, `content.json` for Carousel, and any provided assets in `assets/`. Verify that the Posted Titles entry is correctly formatted.

---

## Constraints

- Never modify published content. The archive is a snapshot, not an editor.
- Never regenerate content, JSON, or exported assets. Copy existing files only.
- Never overwrite an existing archive entry. If a post with the same identifier already exists, flag the conflict and stop.
- Never update repository files outside the archive directory and Posted Titles index.
- Never leave optional metadata fields empty if the information is available.
- Never skip the verification step. An incomplete archive is not a successful archive.
- Carousel assets are expected after export. Reel and Story assets are optional or manually provided depending on how the item was published.
- Missing Reel or Story assets must be noted in `metadata.json` — they are not a workflow failure.
- `content.json` is only required for Carousel. Reel and Story archives do not require it.

---

## Completion

This workflow ends immediately after:

- the archive has been successfully created,
- Posted Titles has been updated,
- and archive completeness has been verified.

No further workflows are executed automatically. The agent stops.
