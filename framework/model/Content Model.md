# Content Model

This document defines the canonical structured representation of a content item in the system.

It is the single source of truth for what a content item *is* structurally — independent of any specific framework strategy, platform, format, template, or renderer.

---

## Architectural Principle

The content model is the foundation. Everything else consumes it:

- AI prompts generate data that conforms to this model
- The archive stores data that conforms to this model
- Templates render data that conforms to this model
- Renderers transform model instances into publishable artifacts
- Export pipelines read model instances and produce platform-ready files

The model must never be designed around one implementation.

---

## Definitions

### Content Item

A Content Item represents one atomic piece of content from trigger through archive. Every content piece — Instagram Carousel or LinkedIn post — is a Content Item.

A Content Item contains:

| Component      | Required | Description |
| -------------- | -------- | ----------- |
| identity       | yes      | Stable ID, title, lifecycle state |
| trigger        | yes      | The real experience that originated this item |
| metadata       | yes      | Platform, format, language, pillar, dates, tags |
| variants       | yes      | One or more platform-specific outputs |
| archive        | no       | Storage location and asset list (populated after publishing) |

### Trigger

The real-world experience that started the content. Every Content Item originates from a trigger.

| Field       | Type   | Description |
| ----------- | ------ | ----------- |
| description | string | Raw trigger statement — the bug, lecture, confusion, or moment |
| insight     | string | Validated insight derived from the trigger |
| hook        | string | Hook angle for the content piece |

### Identity

| Field           | Type   | Description |
| --------------- | ------ | ----------- |
| id              | string | Stable unique identifier (e.g. `content-001`) |
| title           | string | Human-readable title |
| lifecycle_stage | string | Current stage: `trigger` \| `idea` \| `format_selection` \| `draft` \| `review` \| `final_assets` \| `published` \| `archived` |

Content Item IDs are platform-neutral because platform-specific outputs are represented inside `variants`.

### Metadata

| Field           | Type     | Description |
| --------------- | -------- | ----------- |
| platform        | string   | Target platform: `instagram` \| `linkedin` |
| primary_format  | string   | Content format: `carousel` \| `post` |
| language        | string   | Primary language code (e.g. `ar`, `en`) |
| content_pillar  | string   | Pillar from Brand Strategy.md this item belongs to |
| tags            | string[] | Descriptive tags for search and categorization |
| created_date    | string   | ISO 8601 date when the item entered production |
| published_date  | string   | ISO 8601 date when published (empty if not yet published) |
| notes           | string   | Internal notes about the item |

### Platform Variant

A Platform Variant is one concrete output of a Content Item adapted for a specific platform and format. A single Content Item can produce multiple variants (e.g. Instagram carousel + LinkedIn post).

| Field    | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| platform | string | yes      | `instagram` \| `linkedin` |
| format   | string | yes      | `carousel` \| `post` |
| language | string | yes      | Language code for this variant |
| body     | Body   | yes      | Format-specific content structure |
| caption  | string | no       | Platform caption / description text |
| cta      | string | no       | Call-to-action for this variant |

### Body

The Body is a discriminated union. Its structure depends on the format field.

#### Carousel Body

```json
{
  "type": "carousel",
  "slides": [
    {
      "layout": "cover | story | focus | sequence | comparison | evidence | closing",
      "number": "SLIDE 1 OF 8",
      "title": "Slide heading",
      "lead_in": "Optional conversational context",
      "context": "Optional supporting context",
      "subtext": "Legacy cover subtitle",
      "body": "Story context",
      "emphasis": "Optional emphasized story line",
      "statement": "Central belief or realization",
      "note": "Optional focus note",
      "items": [
        { "text": "Ordered progression item", "accent": false }
      ],
      "before": { "label": "Before", "text": "Real earlier state" },
      "after": { "label": "After", "text": "Real later state" },
      "evidence": {
        "kind": "image",
        "asset": "evidence/portfolio-cover.png",
        "alt": "Description of supplied screenshot",
        "caption": "Source or explanation"
      },
      "question": "One answerable closing question",
      "signoff": "Optional closing thought"
    }
  ]
}
```

The seven personal-account compositions are selected independently per slide. They may repeat or be omitted; neither a fixed slide count nor a fixed layout order is required. Layout IDs describe visual composition, not content pillars. The renderer applies the personal account style only in this carousel app; it is not a default brand for future Content OS users.

Field usage by layout:
- `cover` — `title`, optional `context` or legacy `subtext`.
- `story` — `title`, `body`, optional `emphasis`.
- `focus` — `title`, `statement`, optional `note`.
- `sequence` — `title`, two to four ordered `items` (`text`).
- `comparison` — `title`, `before` and `after` (`label`, `text`) describing a genuine contrast.
- `evidence` — `title`, optional `context`, and supplied `evidence`: `code` with `code`, or `image` / `diagram` with a workspace asset path and accessible `alt`. Diagrams require `conceptual: true` and a caption identifying them as conceptual. Local assets live under `production/workspace/evidence/` and JSON references them as `evidence/<filename>`.
- `closing` — `question`, optional `signoff`.
- Legacy `box-list`, `arrow-list`, `bullet-list`, `grid` / `grid-2x2`, `cta`, and `final-cta` values remain accepted during migration. `final-cta` maps to `closing`, retaining its footer and question data in the renderer model.
- `number`, `swipe`, and generic section labels are not rendered in the personal slide artwork. The footer is the fixed `abdallahhassoun.dev` handle.

#### Post Body

```json
{
  "type": "post",
  "content": "Full text content for LinkedIn post. Supports markdown formatting.",
  "structure": "opening-insight | context | reflection | lesson | discussion"
}
```

### Archive

| Field | Type | Description |
| ----- | ---- | ----------- |
| path  | string | Relative path under `content/published/` (e.g. `LinkedIn/Post 1/`) |
| assets | string[] | List of asset filenames relative to the post folder |
| metadata_file | string | Filename of the metadata file (default: `metadata.json`) |

---

## JSON Schema Expression

The following JSON Schema formalizes the content model. Every Content Item in the system must conform to this schema.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "content-model.schema.json",
  "title": "Social Media Content Model",
  "description": "Canonical structured representation of a content item. Supports all formats and platforms.",
  "type": "object",
  "required": ["identity", "trigger", "metadata", "variants"],
  "properties": {
    "identity": {
      "type": "object",
      "required": ["id", "title", "lifecycle_stage"],
      "properties": {
        "id": { "type": "string", "pattern": "^[a-z]+-[0-9]{3}$", "description": "e.g. content-001" },
        "title": { "type": "string" },
        "lifecycle_stage": { "type": "string", "enum": ["trigger", "idea", "format_selection", "draft", "review", "final_assets", "published", "archived"] }
      }
    },
    "trigger": {
      "type": "object",
      "required": ["description", "insight"],
      "properties": {
        "description": { "type": "string" },
        "insight": { "type": "string" },
        "hook": { "type": "string" }
      }
    },
    "metadata": {
      "type": "object",
      "required": ["platform", "primary_format", "language"],
      "properties": {
        "platform": { "type": "string", "enum": ["instagram", "linkedin"] },
        "primary_format": { "type": "string", "enum": ["carousel", "post"] },
        "language": { "type": "string" },
        "content_pillar": { "type": "string" },
        "tags": { "type": "array", "items": { "type": "string" } },
        "created_date": { "type": "string", "format": "date" },
        "published_date": { "type": "string", "format": "date" },
        "notes": { "type": "string" }
      }
    },
    "variants": {
      "type": "array",
      "minItems": 1,
      "items": {
        "type": "object",
        "required": ["platform", "format", "language", "body"],
        "properties": {
          "platform": { "type": "string", "enum": ["instagram", "linkedin"] },
          "format": { "type": "string", "enum": ["carousel", "post"] },
          "language": { "type": "string" },
          "body": {
            "type": "object",
            "required": ["type"],
            "oneOf": [
              { "$ref": "#/$defs/carousel-body" },
              { "$ref": "#/$defs/post-body" }
            ]
          },
          "caption": { "type": "string" },
          "cta": { "type": "string" }
        }
      }
    },
    "archive": {
      "type": "object",
      "properties": {
        "path": { "type": "string" },
        "assets": { "type": "array", "items": { "type": "string" } },
        "metadata_file": { "type": "string", "default": "metadata.json" }
      }
    }
  },
  "$defs": {
    "carousel-body": {
      "type": "object",
      "properties": {
        "type": { "const": "carousel" },
        "slides": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["layout"],
            "additionalProperties": false,
            "properties": {
              "layout": { "type": "string", "enum": ["cover", "story", "focus", "sequence", "comparison", "evidence", "closing", "box-list", "arrow-list", "grid", "grid-2x2", "bullet-list", "cta", "final-cta"] },
              "number": { "type": "string" },
              "section_tag": { "type": "object", "properties": { "text": { "type": "string" }, "class": { "type": "string" } } },
              "subtag": { "type": "string" },
              "title": { "type": "string" },
              "subtext": { "type": "string" },
              "handle": { "type": "string" },
              "lead_in": { "type": "string" },
              "context": { "type": "string" },
              "body": { "type": "string" },
              "emphasis": { "type": "string" },
              "statement": { "type": "string" },
              "note": { "type": "string" },
              "items": { "type": "array", "items": { "type": "object", "properties": { "text": { "type": "string" }, "accent": { "type": "boolean" } } } },
              "grid_items": { "type": "array", "items": { "type": "object", "properties": { "label": { "type": "string" }, "text": { "type": "string" } } } },
              "before": { "type": "object", "required": ["label", "text"], "properties": { "label": { "type": "string" }, "text": { "type": "string" } } },
              "after": { "type": "object", "required": ["label", "text"], "properties": { "label": { "type": "string" }, "text": { "type": "string" } } },
              "evidence": {
                "oneOf": [
                  { "type": "object", "required": ["kind", "code"], "properties": { "kind": { "const": "code" }, "code": { "type": "string", "minLength": 1 }, "language": { "type": "string" }, "caption": { "type": "string" } } },
                  { "type": "object", "required": ["kind", "asset", "alt"], "properties": { "kind": { "const": "image" }, "asset": { "type": "string", "pattern": "^evidence/(?!.*\\.\\.)[^\\s]+$" }, "alt": { "type": "string", "minLength": 1 }, "caption": { "type": "string" } } },
                  { "type": "object", "required": ["kind", "asset", "alt", "conceptual", "caption"], "properties": { "kind": { "const": "diagram" }, "asset": { "type": "string", "pattern": "^evidence/(?!.*\\.\\.)[^\\s]+$" }, "alt": { "type": "string", "minLength": 1 }, "conceptual": { "const": true }, "caption": { "type": "string", "pattern": "[Cc]onceptual" } } }
                ]
              },
              "question": { "type": "string" },
              "signoff": { "type": "string" },
              "summary": { "type": "string" },
              "questions": { "type": "array", "items": { "type": "string" } },
              "highlight": { "type": "string" },
              "cta": { "type": "string" },
              "footer": { "type": "object", "properties": { "name": { "type": "string" }, "role": { "type": "string" }, "handle": { "type": "string" } } },
              "swipe": { "type": "string" }
            },
            "allOf": [
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "cover" } } }, "then": { "required": ["title"] } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "story" } } }, "then": { "required": ["title", "body"] } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "focus" } } }, "then": { "required": ["title", "statement"] } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "sequence" } } }, "then": { "required": ["title", "items"], "properties": { "items": { "minItems": 2, "maxItems": 4 } } } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "comparison" } } }, "then": { "required": ["title", "before", "after"] } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "evidence" } } }, "then": { "required": ["title", "evidence"] } },
              { "if": { "required": ["layout"], "properties": { "layout": { "const": "closing" } } }, "then": { "required": ["question"] } }
            ]
          }
        }
      },
      "required": ["type", "slides"]
    },
    "post-body": {
      "type": "object",
      "properties": {
        "type": { "const": "post" },
        "content": { "type": "string" },
        "structure": { "type": "string", "enum": ["opening-insight", "context", "reflection", "lesson", "discussion"] }
      },
      "required": ["type", "content"]
    }
  }
}
```

---

## Renderer Interface

A renderer consumes a Platform Variant and produces a publishable artifact.

The interface is:

```
Input:  PlatformVariant (from a Content Item's variants array)
Output: Publishable artifact (HTML string, text, file set, or render instructions)

The renderer must not require framework knowledge.
It receives already-resolved content — all brand, voice, platform, and format
decisions have been applied before the variant reaches the renderer.
```

### Renderer Contract

1. A renderer receives exactly one `PlatformVariant` object.
2. It selects the appropriate template or output format based on `variant.format` and `variant.platform`.
3. It never reads framework documents (Brand View, Brand Voice, format docs, pipeline).
4. It never applies brand rules, platform rules, or format rules — those are resolved upstream.
5. The output is a complete, publishable artifact ready for the target platform.

### Current Renderers

| Renderer | Input Variant Format | Output |
| -------- | -------------------- | ------ |
| React Carousel Renderer (`production/renderer/`) | `carousel` | Rendered 1080×1080 slides in the Studio preview |
| Playwright Export Pipeline (`production/export/export-slides.js`) | React DOM (via the `/export` route) | PNG slide images |
| Studio Export Modal (`production/renderer/src/studio/ExportModal.tsx`) | React DOM (in-browser) | ZIP of PNGs or multi-page PDF |
| LinkedIn Post (manual) | `post` (linkedin) | Text post |


---

## Serialization

A Content Item is serialized as JSON for:

- AI prompt output (the model produces structured JSON)
- Storage in the archive (`content.json` alongside `metadata.json`)
- Input to renderers (the React renderer consumes the carousel variant's slide data)
- Transfer between automation tools

The JSON Schema in this document is the validation contract. Every Content Item must validate against it.
