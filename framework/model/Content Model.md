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

A Content Item represents one atomic piece of content from trigger through archive. Every content piece — carousel, reel, story, LinkedIn post, X thread — is a Content Item.

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
| platform        | string   | Target platform: `instagram` \| `linkedin` \| `x` |
| primary_format  | string   | Content format: `carousel` \| `reel` \| `story` \| `post` |
| language        | string   | Primary language code (e.g. `ar`, `en`) |
| content_pillar  | string   | Pillar from Brand View.md this item belongs to |
| tags            | string[] | Descriptive tags for search and categorization |
| created_date    | string   | ISO 8601 date when the item entered production |
| published_date  | string   | ISO 8601 date when published (empty if not yet published) |
| notes           | string   | Internal notes about the item |

### Platform Variant

A Platform Variant is one concrete output of a Content Item adapted for a specific platform and format. A single Content Item can produce multiple variants (e.g. Instagram carousel + LinkedIn post).

| Field    | Type   | Required | Description |
| -------- | ------ | -------- | ----------- |
| platform | string | yes      | `instagram` \| `linkedin` \| `x` |
| format   | string | yes      | `carousel` \| `reel` \| `story` \| `post` |
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
      "layout": "cover | box-list | arrow-list | grid-2x2 | bullet-list | final-cta",
      "number": "SLIDE 1 OF 8",
      "section_tag": { "text": "SECTION TAG", "class": "" },
      "subtag": "Optional secondary label",
      "title": "Slide heading",
      "subtext": "Cover subtitle (cover only)",
      "handle": "@handle (cover only)",
      "items": [
        { "text": "Item text", "accent": false },
        { "text": "Accented item", "accent": true }
      ],
      "grid_items": [
        { "label": "Card label", "text": "Card body" }
      ],
      "summary": "Bullet-list summary (bullet-list only)",
      "questions": ["CTA question rows (final-cta only)"],
      "highlight": "Highlighted CTA quote (final-cta only)",
      "cta": "Call to action (final-cta only)",
      "footer": { "name": "Name", "role": "Role", "handle": "@handle" },
      "swipe": "swipe →"
    }
  ]
}
```

Field usage by layout:
- `cover` — `title`, `subtext`, `handle`.
- `box-list` / `arrow-list` — `title`, `section_tag`, `subtag`, `items` (`text`, `accent`).
- `bullet-list` — `title`, `section_tag`/`subtag`, `items`, `summary`.
- `grid-2x2` — `title`, `section_tag`, `grid_items` (`label`, `text`).
- `final-cta` — `title`, `section_tag`, `questions`, `highlight`, `cta`, `footer` (`name`, `role`, `handle`).
- `number` and `swipe` are optional chrome on any slide and are ignored by the renderer.

#### Reel Body

```json
{
  "type": "reel",
  "duration_seconds": 45,
  "hook": "Opening hook text",
  "script": "Spoken script or outline",
  "visual_suggestions": ["IDE screen recording", "terminal close-up"],
  "on_screen_text": ["Key text overlay 1", "Key text overlay 2"]
}
```

#### Story Body

```json
{
  "type": "story",
  "frames": [
    {
      "asset_type": "photo | video | text | talking-head | screen-recording | ai-image",
      "text": "Frame text or spoken line",
      "interaction": { "type": "poll | slider | this-or-that", "options": ["A", "B"] }
    }
  ]
}
```

Stories are represented as `platform: "instagram"` with `format: "story"`.

#### Post Body

```json
{
  "type": "post",
  "content": "Full text content for LinkedIn or X post. Supports markdown formatting.",
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
        "platform": { "type": "string", "enum": ["instagram", "linkedin", "x"] },
        "primary_format": { "type": "string", "enum": ["carousel", "reel", "story", "post"] },
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
          "platform": { "type": "string", "enum": ["instagram", "linkedin", "x"] },
          "format": { "type": "string", "enum": ["carousel", "reel", "story", "post"] },
          "language": { "type": "string" },
          "body": {
            "type": "object",
            "required": ["type"],
            "oneOf": [
              { "$ref": "#/$defs/carousel-body" },
              { "$ref": "#/$defs/reel-body" },
              { "$ref": "#/$defs/story-body" },
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
            "required": ["layout", "number", "title"],
            "additionalProperties": false,
            "properties": {
              "layout": { "type": "string", "enum": ["cover", "box-list", "arrow-list", "grid-2x2", "bullet-list", "final-cta"] },
              "number": { "type": "string" },
              "section_tag": { "type": "object", "properties": { "text": { "type": "string" }, "class": { "type": "string" } } },
              "subtag": { "type": "string" },
              "title": { "type": "string" },
              "subtext": { "type": "string" },
              "handle": { "type": "string" },
              "items": { "type": "array", "items": { "type": "object", "properties": { "text": { "type": "string" }, "accent": { "type": "boolean" } } } },
              "grid_items": { "type": "array", "items": { "type": "object", "properties": { "label": { "type": "string" }, "text": { "type": "string" } } } },
              "summary": { "type": "string" },
              "questions": { "type": "array", "items": { "type": "string" } },
              "highlight": { "type": "string" },
              "cta": { "type": "string" },
              "footer": { "type": "object", "properties": { "name": { "type": "string" }, "role": { "type": "string" }, "handle": { "type": "string" } } },
              "swipe": { "type": "string" }
            }
          }
        }
      },
      "required": ["type", "slides"]
    },
    "reel-body": {
      "type": "object",
      "properties": {
        "type": { "const": "reel" },
        "duration_seconds": { "type": "integer", "maximum": 60 },
        "hook": { "type": "string" },
        "script": { "type": "string" },
        "visual_suggestions": { "type": "array", "items": { "type": "string" } },
        "on_screen_text": { "type": "array", "items": { "type": "string" } }
      },
      "required": ["type"]
    },
    "story-body": {
      "type": "object",
      "properties": {
        "type": { "const": "story" },
        "frames": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "asset_type": { "type": "string", "enum": ["photo", "video", "text", "talking-head", "screen-recording", "ai-image"] },
              "text": { "type": "string" },
              "interaction": {
                "type": "object",
                "properties": {
                  "type": { "type": "string", "enum": ["poll", "slider", "this-or-that"] },
                  "options": { "type": "array", "items": { "type": "string" } }
                }
              }
            },
            "required": ["asset_type"]
          }
        }
      },
      "required": ["type"]
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

Future renderers (not implemented):
- Reel renderer: reads `reel` variant → produces recording instructions
- Story renderer: reads `story` variant → produces frame-by-frame guide
- X renderer: reads `post` (x) variant → produces formatted thread

---

## Serialization

A Content Item is serialized as JSON for:

- AI prompt output (the model produces structured JSON)
- Storage in the archive (`content.json` alongside `metadata.json`)
- Input to renderers (the React renderer consumes the carousel variant's slide data)
- Transfer between automation tools

The JSON Schema in this document is the validation contract. Every Content Item must validate against it.
