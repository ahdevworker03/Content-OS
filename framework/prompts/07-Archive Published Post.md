# 07 — Archive Published Post

## Purpose

Archive the exact platform variant that was actually published and update the published-title index. A Post may have several variants; each archive entry represents one publication on one platform.

## Scope

This workflow begins after publication. It ends when the exact published variant and its applicable assets/metadata are archived and indexed. It does not create, polish, adapt, or republish content.

## Required Reading

- `framework/prompts/README.md` — workflow boundaries and global rules.
- `framework/memory/Posted Titles.md` — index to update.

## Inputs

- Published platform and format variant.
- Verified publication date and live post URL or platform identifier.
- The exact content that appeared on that platform, and the matching standalone source artifact.
- Applicable variant-specific assets and structured data.
- Accurate title, language, pillar, tags, and content item ID when available.

If the exact published content or required publication details are missing or ambiguous, stop and request them. Never assume the latest draft is identical to what was published.

## Source Artifact by Variant

Use only the standalone artifact for the variant that was published:

| Published variant | Source artifact |
|---|---|
| Instagram Carousel | `content/drafts/carousel.md` |
| Instagram Reel | `content/drafts/reel.md` |
| Instagram Story | `content/drafts/story.md` |
| LinkedIn Post | `content/drafts/linkedin.md` |

The source must match what was published exactly. If the published copy differs from the draft, use the exact published copy supplied or captured from the platform; do not silently archive a different draft.

## Outputs

Create `content/published/<platform>/<YYYY-MM-DD-slug>/` with:

- `content.md` — only the exact published variant, with no other platform's content.
- `metadata.json` — accurate publication and archive metadata, including platform, format, verified date, URL/identifier, archive path, source artifact, title, language, content item ID when known, pillar, tags, assets included, and any relevant notes.
- Variant-specific data/assets only where applicable:
  - **Instagram Carousel:** copy `production/workspace/carousel.json` as `content.json` and include the exported carousel assets.
  - **Instagram Reel:** include any published video or related Reel assets that are available.
  - **Instagram Story:** include any saved Story assets that are available.
  - **LinkedIn Post:** archive the standalone text post and only the LinkedIn assets that were actually published with it. Never include Instagram carousel copy, carousel JSON, or carousel assets.

Do not create empty `assets/` directories. Note missing optional assets when they were relevant to the published variant.

Update `framework/memory/Posted Titles.md` with the published variant's archive path and title.

## Workflow

1. Verify the platform, variant format, published date, live URL/identifier, and exact published copy.
2. Select the matching standalone source artifact from the table above and compare it with the published copy. Stop if it differs and no exact published copy is available.
3. Choose a short lowercase slug derived from the title and check that the dated target directory does not already exist. Never overwrite an archive.
4. Create the archive directory and copy the exact published variant to `content.md` without rewriting, polishing, or adding another platform's content.
5. Add only data and assets applicable to this published variant. Carousel JSON and exported slide assets are Carousel-only.
6. Write complete, accurate `metadata.json`. Do not invent dates, URLs, titles, IDs, or missing asset information.
7. Add one row to the correct platform section in `Posted Titles.md`.
8. Verify that `content.md` matches the exact published copy, files match the variant contract, metadata is accurate, and the index entry is correct. Run `git diff --check`.

## Success Criteria

- The archive describes one actual published platform variant.
- `content.md` exactly matches what appeared on that platform.
- No other platform's copy is included.
- Carousel JSON and slide assets appear only in Carousel archives.
- The archive path uses the verified publication date and does not overwrite an existing entry.
- Metadata and the Posted Titles entry are complete and accurate.

## Constraints

- Never rewrite, polish, regenerate, or translate published content.
- Never archive the primary format automatically when a different variant was published.
- Never include Carousel content or files in a LinkedIn archive.
- Never modify renderer, Studio, export implementation, or published content.
- Only modify the new archive entry and `framework/memory/Posted Titles.md`.

## Completion

Stop after the archive has been verified and the published-title index updated.
