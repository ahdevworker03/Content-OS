# 02 — Template System and Content-Fit Plan

## 1. Purpose

This plan defines how Content OS will select reusable carousel templates that fit different content structures and writing styles without requiring per-post React or CSS changes.

It extends the existing deterministic renderer. It does not replace the Content Model, Adapter, Studio, or export pipeline.

The immediate problem is that the current personal template was designed around one technical debugging narrative. It works well for that content, but it should not be stretched to fit every future topic, writing style, or slide purpose.

---

## 2. Objective

A user or content agent should be able to create a carousel from a structured content idea and receive a visually appropriate result by selecting:

1. a content archetype,
2. an approved template family,
3. a renderer-safe theme,
4. a supported layout for each slide,
5. a controlled content-density level.

The normal workflow must not require editing CSS, React components, layout IDs, or raw JSON.

---

## 3. Current Assets to Reuse

This work must reuse the current architecture:

- `framework/model/Content Model.md` as the structured carousel contract.
- `production/workspace/carousel.json` as the active-carousel bridge.
- `mapWorkspaceCarousel.ts` as the boundary between workspace data and renderer models.
- Renderer Models and the `SlideData` discriminated union.
- `SlideRenderer.tsx` for layout routing.
- `PersonalSlides.tsx` and scoped personal layout CSS.
- Studio preview, validation, and export.
- Existing Playwright export verification.

The renderer must remain deterministic: the same structured carousel and template selection must produce the same visual output.

---

## 4. Product Decision

Templates are reusable visual systems, not one-off post designs.

A template family owns:

- visual hierarchy,
- typography roles,
- spacing,
- supported slide layouts,
- optional theme variants,
- safe density variants,
- footer treatment,
- validation limits.

A carousel chooses one template family. A slide then chooses a layout supported by that family.

The content agent may choose from approved templates and layouts. It must never generate arbitrary CSS, React, inline positioning, or unreviewed design rules.

---

## 5. Content Archetypes

Content archetype describes what the carousel is trying to communicate. It is not a visual implementation detail.

Initial supported archetypes:

| Archetype     | Purpose                                   | Typical narrative                                    |
| ------------- | ----------------------------------------- | ---------------------------------------------------- |
| `debug-story` | Explain a real bug, diagnosis, and fix    | Hook → trigger → diagnosis → evidence → takeaway     |
| `explainer`   | Teach a concept or system clearly         | Hook → concept → process → example → recap           |
| `comparison`  | Explain a decision, contrast, or tradeoff | Context → option A → option B → criteria → decision  |
| `case-study`  | Document project work and reasoning       | Problem → constraints → decision → evidence → result |
| `insight`     | Share one concise lesson or opinion       | Hook → reasoning → conclusion → discussion           |

An archetype guides content planning. It does not directly render a slide.

---

## 6. Initial Template Families

Start with a small approved set. Do not create a new template for every post.

| Template ID            | Best fit                               | Supported layouts                                                 |
| ---------------------- | -------------------------------------- | ----------------------------------------------------------------- |
| `personal-debug-story` | Real debugging and learning narratives | `cover`, `story`, `sequence`, `evidence`, `focus`, `closing`      |
| `personal-explainer`   | Educational technical content          | `cover`, `focus`, `sequence`, `comparison`, `evidence`, `closing` |
| `personal-comparison`  | Tradeoffs and decisions                | `cover`, `comparison`, `sequence`, `focus`, `evidence`, `closing` |
| `personal-case-study`  | Product and engineering project work   | `cover`, `story`, `focus`, `sequence`, `evidence`, `closing`      |
| `personal-insight`     | Short reflections and opinions         | `cover`, `focus`, `story`, `closing`                              |

The current template becomes the initial implementation of `personal-debug-story` after its typography and layout issues are corrected.

Template families may share React primitives and tokens. They should not duplicate the entire renderer.

---

## 7. Design Data Contract

Add a structured `design` section to the Carousel Body.

Proposed shape:

```json
{
  "type": "carousel",
  "design": {
    "template": "personal-debug-story",
    "theme": "warm-editorial",
    "density": "standard"
  },
  "slides": []
}
```

Definitions:

| Field      | Meaning                                   | Initial values                                                                                                 |
| ---------- | ----------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| `template` | Approved template family                  | `personal-debug-story`, `personal-explainer`, `personal-comparison`, `personal-case-study`, `personal-insight` |
| `theme`    | Approved visual theme within the template | Initially `warm-editorial` only                                                                                |
| `density`  | Default content capacity preference       | `sparse`, `standard`, `dense`                                                                                  |

A slide may later override density only when the selected template explicitly supports it:

```json
{
  "layout": "sequence",
  "density": "dense",
  "items": []
}
```

Do not add per-slide colors, font sizes, margins, or arbitrary style properties to content JSON.

---

## 8. Typography and Density Rules

Typography must be based on shared semantic roles rather than individual slide overrides.

Initial roles:

| Role       | Use                                     |
| ---------- | --------------------------------------- |
| `display`  | Cover and closing hooks                 |
| `headline` | Standard slide titles                   |
| `body`     | Explanations and supporting context     |
| `list`     | Ordered steps and compact comparisons   |
| `evidence` | Code, captions, source labels           |
| `meta`     | Footer, context label, small annotation |

Density adjusts approved layout capacity. It does not make content fit by shrinking text indefinitely.

| Density    | Intended use                                  | Content capacity                                             |
| ---------- | --------------------------------------------- | ------------------------------------------------------------ |
| `sparse`   | Strong idea, quote, decision, visual evidence | Short title and little supporting copy                       |
| `standard` | Default educational or narrative slide        | One title plus concise supporting content                    |
| `dense`    | Lists, comparisons, compact code evidence     | More structured information with smaller approved type scale |

If copy exceeds a layout’s safe capacity, validation must recommend shortening the copy or choosing another layout. It must not silently create unreadable slides.

---

## 9. Template Selection Flow

The content pipeline should make decisions in this order:

```text
Idea / trigger
  → Content brief
  → Content archetype
  → Carousel narrative
  → Template family
  → Slide purpose
  → Supported layout
  → Density decision
  → Validation
  → Studio preview
  → Export
```

Example:

```text
Idea:
“An alert created multiple instances because labels were removed too early.”

Archetype:
debug-story

Template:
personal-debug-story

Slide purposes:
hook → trigger → diagnosis → fix → proof → lesson → closing

Layouts:
cover → story → sequence → evidence → focus → closing
```

The agent should decide the content purpose before choosing a layout. It must not select a layout only because it exists.

---

## 10. Validation Requirements

Validation must evaluate the selected template and layout together.

Initial checks:

- carousel template exists,
- each slide layout is supported by the selected template,
- required fields exist for the chosen layout,
- title length is within the layout’s safe range,
- body, quote, list, and code content fit the selected density,
- sequence items remain within supported count and length,
- evidence slides include approved local evidence,
- footer and safe areas remain visible,
- preview and export remain equivalent.

Warnings should use product language, for example:

> This explanation is too long for the selected slide. Shorten it, choose a denser supported layout, or split it into two slides.

Do not expose implementation terms such as renderer unions, adapter mappings, or CSS selectors to normal users.

---

## 11. Implementation Phases

### Phase 0 — Stabilize the Current Personal Template

**Goal:** establish a reliable baseline before multiplying templates.

**Scope:**

- Restore clear typography hierarchy across the current personal layouts.
- Reduce the footer to a secondary visual role.
- Correct the threshold layout so labels and values remain visually associated.
- Correct dense layouts without reducing readability.
- Export and review representative Arabic, English, and mixed-script slides.

**Acceptance criteria:**

- Supporting copy never visually competes with the slide headline.
- Threshold values are clearly associated with their labels.
- Footer remains readable but never becomes a dominant element.
- Current ten-slide debugging carousel remains readable at phone-size review scale.
- Studio preview and exported PNGs match.

### Phase 1 — Add Template and Density Data

**Goal:** allow a carousel to declare its approved design family.

**Likely code paths to inspect first:**

- `framework/model/Content Model.md`
- Content Model JSON schema
- `production/workspace/carousel.json`
- `production/renderer/src/renderer/adapter/mapWorkspaceCarousel.ts`
- `production/renderer/src/renderer/models/index.ts`
- renderer validation files
- Studio data loading and edit state

**Scope:**

- Add the Carousel Body `design` section.
- Add validated template and density values.
- Preserve compatibility with existing carousel JSON by using a documented default.
- Carry design data through the Adapter into renderer models.

**Exclusions:**

- no database,
- no user accounts,
- no arbitrary CSS in JSON,
- no Studio redesign,
- no new templates yet.

**Acceptance criteria:**

- Existing workspace carousel still loads without requiring edits.
- Invalid template or density values produce clear validation warnings.
- Design data is available to the renderer through typed models.

### Phase 2 — Create a Template Registry

**Goal:** centralize the approved template capabilities.

A registry should define:

- template ID,
- supported layouts,
- available themes,
- supported density levels per layout,
- copy limits or validation rules,
- default visual token set.

The registry is the source of truth for what an agent or Studio can choose. It prevents template support rules from being duplicated across prompts, validation, and layout CSS.

**Acceptance criteria:**

- A template’s supported layouts are defined in one place.
- Validation reads from the registry.
- Unsupported template/layout combinations fail clearly.
- Adding a future template does not require changing unrelated templates.

### Phase 3 — Separate Shared Tokens from Template Styles

**Goal:** give each family a consistent visual system without duplicating layouts.

**Scope:**

- Move typography roles, spacing, and footer treatment into template-scoped tokens.
- Keep layout markup semantic and reusable.
- Apply template classes or data attributes at the carousel/slide root.
- Keep personal-account styling scoped to personal templates.

**Constraints:**

- Do not make layouts consume raw workspace JSON.
- Do not introduce arbitrary inline style values.
- Do not break current layout IDs or adapter boundaries.
- Do not create a second renderer pipeline.

**Acceptance criteria:**

- Changing one template’s typography does not unintentionally alter another template.
- Shared layouts can render under approved template styles.
- The current template remains visually stable after token extraction.

### Phase 4 — Add the First Additional Template

**Goal:** prove that the model works for a genuinely different content structure.

Recommended first addition: `personal-explainer`.

It should support educational content with concise concepts, structured steps, a comparison when useful, and evidence.

**Required verification:**

- one Arabic carousel,
- one English carousel,
- one mixed Arabic/English technical carousel,
- short and long safe-limit fixtures,
- Studio preview,
- exported PNGs,
- phone-size contact sheet review.

Do not add the remaining template families until this phase proves that the registry and token model are sufficient.

### Phase 5 — Connect Design Planning to the Self-Service Flow

**Goal:** make template choice part of the planned product workflow.

The design-planning stage should receive:

- content archetype,
- audience,
- platform,
- format,
- design direction,
- evidence availability,
- slide purposes,
- copy length.

It should return structured template, layout, and density decisions only from the approved registry.

**Acceptance criteria:**

- a normal user never needs to choose JSON fields or layout IDs,
- the design planner cannot select unsupported combinations,
- validation can explain and repair an unsuitable choice,
- preview and export stay deterministic.

---

## 12. Non-Goals

This plan does not include:

- Figma or Canva-style free-form editing,
- AI-generated CSS, React, or arbitrary positioning,
- a template marketplace,
- user-created templates,
- brand management for multiple businesses,
- database persistence,
- multi-user workspaces,
- publishing integrations,
- rewriting all existing layouts,
- replacing the Content Model or Adapter.

---

## 13. Risks and Controls

| Risk                                       | Control                                                                      |
| ------------------------------------------ | ---------------------------------------------------------------------------- |
| Too many templates create maintenance debt | Begin with the current template and one additional family only               |
| Content data becomes a styling API         | Restrict design JSON to approved template, theme, layout, and density values |
| AI chooses visually invalid layouts        | Validate every choice against the template registry                          |
| Dense text becomes unreadable              | Enforce content limits and warn instead of auto-shrinking indefinitely       |
| Template work breaks existing carousels    | Keep a backward-compatible default template and export regression fixtures   |
| Different preview and export results       | Verify every template through both Studio and Playwright export              |

---

## 14. Completion Criteria

This work is successful when:

1. A new carousel can select an approved template without code changes.
2. The selected template only permits safe layouts and density choices.
3. The renderer receives typed design data through the existing Content Model → Adapter → Renderer Models boundary.
4. Invalid content-template combinations are caught before export.
5. A second template proves that the system supports genuinely different carousel structures.
6. Existing personal debugging carousels still render and export correctly.
7. Normal users do not see renderer internals, raw JSON, layout IDs, or CSS controls.
