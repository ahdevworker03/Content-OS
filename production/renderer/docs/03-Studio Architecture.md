# Studio Architecture

## 1. Purpose

The Studio is a browser-based authoring and review environment that sits on top of the carousel rendering engine. It loads a carousel, lets a user inspect every slide, edit slide content in memory, verify visual correctness against layout guides, and export the result.

The Studio is **tooling around the renderer, not part of it**. It consumes the rendering pipeline as a black box: it passes typed slide data to the renderer and receives rendered React components back. It performs no rendering of its own, knows nothing about how layouts are drawn, and contains no knowledge of the workspace content schema.

Its job is to answer three questions for a content creator:

1. **Does this carousel render correctly?** — through the Preview, validation warnings, and layout guides.
2. **Is the copy right?** — through the Inspector, which edits slide content in memory.
3. **Can I ship it?** — through the Export Modal and the external Playwright pipeline.

---

## 2. Design Philosophy

### The Studio is a consumer, not a component

The Studio imports the renderer; the renderer never imports the Studio. This single-directional dependency is the foundation of the whole architecture. It guarantees the renderer stays pure, testable, and reusable outside the Studio (for example, in the `/export` route used by the Playwright pipeline).

### Rendering happens in exactly one place

All slide rendering in the Studio flows through `SlideRenderer`. The preview, sidebar thumbnails, and export thumbnails are three different *presentation contexts* of the same rendering function. No component ever renders a slide by hand.

### State is centralised and minimal

The carousel document, current selection, validation results, and edit operations are owned by a single state hook (`useCarousel`). Panels receive state through props and report changes back through callbacks. No panel owns the document; no two panels disagree about which slide is selected.

### Editing is ephemeral

The Studio never persists carousel data. Edits live in component memory and disappear on reload. This makes the Studio a safe scratch space — a creator can iterate on copy freely without any risk of corrupting the source of truth.

### Dev tooling is compiled out

Debug affordances are gated behind the development build. Production builds ship only the authoring surface.

---

## 3. Separation from the Renderer

The renderer is a layered, presentation-only engine: configuration → loader → adapter → typed models → `SlideRenderer` → layouts → UI components. The Studio is one consumer of that pipeline.

```
Renderer (src/renderer/, src/layouts/, src/types/, src/components/)
   ▲
   │  imports: SlideRenderer, types, SafetyProvider, loadCarousel
   │
Studio (src/studio/)
```

The boundaries are enforced by the import graph:

- **No renderer file imports from `studio/`.** The renderer directory is the public API of the engine and knows nothing about the Studio.
- **The Studio only touches renderer entry points** — `SlideRenderer`, the canonical types, `SafetyProvider`, and `loadCarousel`. It never reaches into layout or adapter internals.
- **Types are the contract.** The Studio speaks exclusively in canonical `SlideData` / `Carousel` types. It never sees workspace schema (the adapter absorbs that) and never sees layout implementation details.

Consequences of this separation:

- The renderer can be used without the Studio (the `/export` route, automated testing, future tools).
- The Studio can be extended or replaced without touching a single line of rendering code.
- Layout bugs are renderer bugs; Studio logic can never corrupt rendering output.

---

## 4. Separation from the Export Pipeline

There are two export paths, and the Studio is cleanly isolated from the production one.

### The Playwright pipeline (production/export/)

A headless-browser pipeline drives a separate, frozen route (`/export` → `ExportView`) that renders every slide at full scale with safety guides disabled. The Studio is irrelevant to this path: the route is static, has no UI chrome, and never loads the Studio.

### The Studio Export Modal (in-browser)

The `ExportModal` is a client-side convenience that lives inside the Studio. It renders selected slides in an off-screen capture container and rasterises them in the browser. It shares the same rendering entry point (`SlideRenderer`) but is fully independent of the Playwright tooling and the `/export` route.

The two paths are deliberately independent:

- The Playwright pipeline is the byte-identical **quality baseline** — its output never changes because the Studio was open.
- The Export Modal is a **fast, no-infrastructure convenience** — ZIP and PDF downloads without launching a browser tool.

Neither path modifies the other. The Studio exports the *same carousel data* the Playwright pipeline exports, through the *same renderer*, guaranteeing visual consistency while keeping the pipelines decoupled.

---

## 5. Overall Architecture

The Studio is a shell that owns application-level state and composes five panels plus two modals around the renderer's `SlideRenderer`.

```
┌─────────────────────────────────────────────────────────────────────┐
│                         Studio.tsx (shell)                          │
│  owns: showSafety, exportOpen  ·  wires useCarousel + keyboard nav  │
│  wraps everything in SafetyProvider (guides on/off)                 │
└───────────┬──────────────┬───────────────┬─────────────┬────────────┘
            │              │               │             │
            ▼              ▼               ▼             ▼
      ┌──────────┐  ┌───────────┐  ┌──────────────┐  ┌───────────────┐
      │ Toolbar  │  │ Sidebar   │  │ Preview      │  │ InspectorPanel│
      │ status + │  │ slide     │  │ (current     │  │ per-layout    │
      │ actions  │  │ cards     │  │  slide)      │  │ fields +      │
      └──────────┘  └───────────┘  └──────────────┘  │ warnings      │
                                  │  ┌──────────┐   └──────┬────────┘
                                  │  │DebugPanel│←──────────┤ (DEV only)
                                  │  └──────────┘           │
                                  │                         │
      ┌───────────────────────────▼─────────────────────────▼──────────┐
      │                  SlideRenderer (renderer entry point)          │
      └───────────────────────────┬────────────────────────────────────┘
                                  │
      ┌───────────────────────────▼────────────────────────────────────┐
      │        SafetyProvider (show: true in Preview,                   │
      │        show: false in thumbnails and capture nodes)             │
      └─────────────────────────────────────────────────────────────────┘

      Modals (lazy-loaded, mounted on demand):
        ExportModal  ← opened by Toolbar "Export"   → carousel
        AboutModal   ← opened by Toolbar "ⓘ"        → dataSource
```

The shell is thin by design. It holds only view-level state (guides toggle, export modal visibility) and passes everything else down from `useCarousel`. Panels are pure renderers of props plus small, self-contained local UI state.

---

## 6. Component Hierarchy

```
Studio
├── Toolbar
│   └── AboutModal                 (mounted on demand)
├── Sidebar
│   └── SlideCard × N              (each renders a scaled slide thumbnail)
├── main
│   ├── Preview                    (auto-fit + zoom, renders current slide)
│   └── DebugPanel                 (DEV only)
├── InspectorPanel                 (per-layout fields + validation warnings)
└── ExportModal                    (lazy-loaded, mounted on demand)
    ├── export thumbnail grid      (scaled slides, guides off)
    └── off-screen capture container (full-scale slides, guides off)
```

Data dependencies flow down from the shell:

| Component | Receives | Emits / Owns |
|---|---|---|
| `Toolbar` | `dataSource`, `projectName`, `totalSlides`, `showSafety`, `onToggleSafety`, `onExport` | `aboutOpen` local state |
| `Sidebar` | `slides`, `currentIndex`, `onSelect` | — |
| `SlideCard` | `slide`, `index`, `active`, `onClick` | — |
| `Preview` | `slide` | viewport size, zoom mode, manual scale |
| `InspectorPanel` | `slide`, `slideIndex`, `warnings`, `onUpdate` | field values (via `onUpdate`) |
| `DebugPanel` | `slide`, `isOpen`, `onToggle` | — |
| `ExportModal` | `carousel`, `onClose` | `selected[]`, `busy` state |

Every callback is a plain function from `useCarousel` or the shell. There is no event bus, no shared mutable store beyond React state, and no context-based state management except the `SafetyProvider` (which carries only a `show` boolean).

---

## 7. Responsibilities

### Toolbar

The application's status bar and action bar.

- Presents **identity**: the Carousel Studio brand and the project name (derived from the first slide's title).
- Presents **context**: the active data source (`Local` vs `Workspace`) and total slide count.
- Exposes the three top-level **actions**:
  - **Layout Guides** — toggles the `SafetyProvider` context that controls whether the safety overlay renders on the preview slide.
  - **About (ⓘ)** — opens the `AboutModal`.
  - **Export** — opens the `ExportModal`.

The Toolbar owns none of the state behind these actions except whether the About modal is open. Everything else is passed in as props. It is the single, uniform entry point for all user-initiated workflows.

### Sidebar

The structural overview and primary navigation surface.

- Renders one `SlideCard` per slide: a scaled live thumbnail, the slide number, a layout-type pill, and the slide title.
- Reflects the **current selection** by highlighting the active card.
- Reports card clicks up through `onSelect`, which the shell routes to `goTo`.

Thumbnails are real renders through `SlideRenderer` with safety guides disabled, so the overview is an exact miniature of the slide — not an approximation.

### Preview

The canonical "what will this actually look like" viewport.

- Renders the **currently selected slide** through `SlideRenderer` inside a 1080×1080 container.
- **Auto-fits** the canvas to the available viewport space, so the full slide is always visible.
- Provides a **zoom pill** (`− / % · Fit / +`) that lets the user inspect the slide beyond fit size; `Ctrl`/`Cmd`+scroll zooms in stepped increments.
- Zoom is purely visual — it never affects the renderer, the data, or other panels.

The Preview is where guides matter: when Layout Guides is enabled, the safety overlay (safe area, profile grid, crosshairs) is drawn over the rendered slide. Guides are a preview-time concern and never appear in thumbnails, capture nodes, or exports.

### Inspector

The editing surface for the selected slide.

- Renders **per-layout structured fields** (title, subtitle, label, item lists, etc.) that map exactly to the fields of the current `SlideData` variant.
- Routes every edit through a single `onUpdate(index, patch)` call, which merges the patch into the carousel document.
- Displays **validation warnings** for the whole carousel with severity levels (`warn` / `error`), so problems surface where the user is already looking.
- Degrades gracefully for unsupported layouts by showing a read-only notice instead of an edit form.

The Inspector is the only panel that mutates carousel content, and it does so purely through the central update function — it never holds its own copy of the slide.

### Export Modal

The in-browser capture and delivery surface.

- Shows a **grid of live thumbnails** with per-slide checkboxes and a Select All toggle.
- Renders the selected slides **off-screen at full scale** (guides off) in a hidden capture container.
- Captures each slide as a high-resolution PNG and packages the results:
  - **Download ZIP (PNGs)** — a `slides.zip` archive of `slide-NN.png` files.
  - **Download PDF** — a multi-page PDF, one slide per page.
- Guards against double-triggering with a `busy` state while a capture is running.

Its scope is strictly delivery. It does not touch the Playwright pipeline, does not modify the `/export` route, and never persists anything.

### About Modal

The identity and environment disclosure.

- Shows the Studio **version** and the **active data source**.
- Is a pure, stateless read of props; it owns no state beyond mounting.

---

## 8. Data Flow: Carousel JSON → Renderer Preview

The path from raw JSON to a rendered slide in the Preview, with the Studio's responsibilities marked:

```
production/workspace/carousel.json  or  src/data/carousel.json
        │
        │  [1] config.ts selects the data source (workspace vs. local dev)
        ▼
     loadCarousel.ts                        ── renderer layer
        │
        │  [2] fetches / imports raw JSON
        │      workspace path → mapWorkspaceCarousel() → canonical Carousel
        │      dev path       → import (already canonical)
        ▼
     canonical Carousel { slides: SlideData[] }    ── the contract
        │
        ▼
     useCarousel.ts                         ── STUDIO STATE ROOT
        │
        │  [3] stores the Carousel in state
        │      runs validateCarousel() → ValidationWarning[]
        │      derives currentSlide = slides[currentIndex]
        ▼
     Studio.tsx (shell)
        │
        │  [4] distributes derived data as props:
        │      slides + currentIndex → Sidebar
        │      currentSlide          → Preview
        │      currentSlide + index + warnings → InspectorPanel
        │      carousel              → ExportModal (on open)
        ▼
     Preview.tsx
        │
        │  [5] measures viewport, computes fit scale, applies --slide-scale
        │      SlideRenderer receives currentSlide
        ▼
     SlideRenderer.tsx                  ── renderer layer
        │
        │  [6] routes slide.layout → layout component
        ▼
     Layout component → UI components → React DOM
```

Key properties of this flow:

- **The Studio enters only at step 3.** Everything before is the renderer's loader/adapter; everything after is the renderer's presentation pipeline.
- **State is derived, not duplicated.** `currentSlide`, `totalSlides`, and `warnings` are computed from the single source of truth in `useCarousel`. No panel recomputes or caches the document.
- **Edits follow the same path.** When the Inspector emits `updateSlide(index, patch)`, the state hook replaces that slide, React re-renders the shell, and the Preview, Sidebar thumbnail, and Export grid all reflect the new data automatically — because they all render from the same updated document.

---

## 9. State Ownership

State is divided into three tiers by lifespan and scope:

### Document state — `useCarousel` (single owner)

| State | Owner | Notes |
|---|---|---|
| `carousel` | `useCarousel` | Loaded once from `loadCarousel()`; mutated only via `updateSlide` |
| `currentIndex` | `useCarousel` | The selected slide; drives every panel |
| `warnings` | `useCarousel` | Recomputed whenever the carousel changes |
| `debugOpen` | `useCarousel` | Debug panel visibility |

This is the **only** owner of carousel content and navigation. Every mutation flows through the hook's callbacks (`goTo`, `goNext`, `goPrev`, `updateSlide`), which guarantees a single update path and consistent derived data.

### View state — the shell and panels (local owners)

| State | Owner | Notes |
|---|---|---|
| `showSafety` | `Studio` | Guides toggle; feeds `SafetyProvider` |
| `exportOpen` | `Studio` | Mounts/unmounts the lazy `ExportModal` |
| `aboutOpen` | `Toolbar` | Local to the Toolbar |
| viewport size, `fit`, `manualScale` | `Preview` | Zoom concerns; purely visual |
| `selected[]`, `busy` | `ExportModal` | Selection and capture progress |

These states are **ephemeral UI state**: they affect how panels present data, never the data itself. Keeping them local prevents unrelated panels from re-rendering and keeps the document store small.

### Cross-cutting context — `SafetyProvider`

A single boolean (`show`) threaded through React context. The shell owns it; the renderer's `Slide` wrapper reads it to decide whether to overlay guides. It exists only to reach into the renderer tree without prop-drilling, and carries no logic.

### Invariants

- There is exactly **one source of truth for the carousel document** (`useCarousel`).
- Panels are **readers**: they receive props and emit callbacks. None writes document state directly.
- Document state and view state never mix — changing the zoom level cannot change content, and editing content cannot reset the zoom.

---

## 10. Interaction Flow

Every user action follows one of a small set of paths.

### Navigation

```
Sidebar card click / ArrowLeft / ArrowRight / goTo / goNext / goPrev
        │
        ▼
   useCarousel.currentIndex (setState)
        │
        ▼
   all panels re-render from the newly derived currentSlide
```

Navigation is a single state change; the Sidebar highlight, Preview, and Inspector all respond because they all derive from `currentIndex`.

### Editing

```
Inspector field change
        │
        ▼
   updateSlide(currentIndex, patch)
        │
        ▼
   useCarousel merges patch → new carousel state → re-validates
        │
        ▼
   Preview + Sidebar thumbnail + Inspector re-render with new copy
```

Editing is a pure in-memory merge. There is no save step, no debounce against a backend, and no persistence.

### Guides toggle

```
Toolbar "Layout Guides" click
        │
        ▼
   Studio sets showSafety → SafetyProvider value flips
        │
        ▼
   Slide wrapper reads context → renders/removes SafetyOverlay
```

Only the Preview slide is affected. Thumbnails and export capture nodes are wrapped in `show: false` providers, so the toggle can never leak into images or downloads.

### Export

```
Toolbar "Export" → ExportModal mounts
        │
        ▼
   select slides → Download ZIP / PDF
        │
        ▼
   hidden capture container renders selected slides at full scale
        │
        ▼
   html-to-image rasterises → jszip / jspdf package → browser download
```

Export is entirely client-side and independent of the Playwright pipeline.

---

## 11. Extension Points

The architecture is additive: new capabilities slot into existing seams without modifying working code.

### New layout support

Adding a layout touches the renderer (new type variant, layout component, `SlideRenderer` case, adapter mapping) and the Studio gains one new branch in the Inspector so the copy can be edited. The Studio needs no other change — Preview, Sidebar thumbnails, and Export all pick up the new layout automatically because they render through `SlideRenderer`.

### New preview tools

The Studio is a standalone consumer of the renderer. A side-by-side diff, a storyboard timeline, or a palette inspector can be added as a new panel receiving the same props (`slide`, `currentIndex`, `carousel`) without touching the renderer or other panels.

### New export formats

The Export Modal's capture step is a clean seam. A new format (e.g. a single long-strip image or an animated preview) reuses the same off-screen capture nodes and packages the pixels differently. Alternatively, a new frozen route can be added alongside `/export` for new headless capture targets.

### Stronger validation

`validateCarousel()` is a standalone module. Cross-slide consistency rules, schema conformance checks, or brand-guideline enforcement are additive to that module; the renderer and panels never change.

### New data sources

`config.ts` chooses between local and workspace data, and `loadCarousel` abstracts the acquisition. A new source (e.g. a CMS API) changes only the loader; the Studio continues to receive canonical types unchanged.

### New render targets

Because rendering always flows through `SlideRenderer` from typed data, alternative targets (static HTML, video frames, print PDFs) reuse the exact same render call and only change how the output is captured.

---

## 12. Architectural Principles

1. **One-directional dependency.** Studio → renderer. The renderer must never know the Studio exists.
2. **Single source of truth.** The carousel document lives in `useCarousel`; everything else derives from it.
3. **Rendering in one place.** All slide visuals — preview, thumbnails, captures — come from `SlideRenderer`.
4. **Props in, callbacks out.** Panels are readers. Mutations flow back through one update function.
5. **Ephemeral editing.** No persistence, no write-back to JSON, no server round-trip.
6. **View state stays local.** Zoom, selection checkboxes, modal visibility never mix with document state.
7. **Dev tooling is build-gated.** Debug surfaces exist only in development builds.
8. **Export is disposable.** The Playwright baseline is byte-identical; Studio exports never alter it.
9. **Additive growth.** Every extension point preserves existing behaviour.
10. **The type system is the contract.** The canonical `SlideData` discriminated union guarantees panels and renderer agree on what exists.

---

## 13. What the Studio Owns

- **Authoring state** — the in-memory carousel document, current selection, and validation results (`useCarousel`).
- **Navigation** — linear slide navigation (sidebar, arrows, programmatic), never URL-based.
- **View orchestration** — which panels exist, what the guides toggle does, when modals open.
- **Editing surface** — the per-layout Inspector fields and the single update path that feeds them.
- **Advisory validation** — warning reporting that informs but never blocks.
- **Dev tooling** — the JSON debug panel, compiled out of production builds.
- **Client-side export** — the Export Modal's in-browser capture, ZIP, and PDF delivery.
- **Preview ergonomics** — auto-fit and zoom, purely visual.
- **The `SafetyProvider` value** — whether guides appear in the preview.

The Studio owns **no rendering logic**, **no schema translation**, and **no persistence**.

## 14. What the Renderer Owns

- **Configuration** — the data-source toggle.
- **Loading** — acquiring raw JSON from the chosen source.
- **Schema translation** — the adapter that converts workspace format to canonical types; the only code that knows both schemas.
- **The canonical models** — `SlideData` and `Carousel` as the typed contract.
- **Routing** — `SlideRenderer` dispatching each layout to its component.
- **Layouts** — one component per slide design, composing UI primitives.
- **UI primitives** — the atomic presentational components.
- **The `Slide` canvas** — the 1080×1080 container and its background.
- **The safety overlay** — reading the context and drawing guides; it renders on demand but never decides when.

The renderer owns **no UI chrome**, **no authoring state**, and **no export or capture logic**.

## 15. What the Export System Owns

- **The frozen `/export` route** — a static, stable capture target with no UI chrome, full-scale slides, and guides disabled.
- **The Playwright pipeline** — headless-browser navigation, slide discovery, and PNG capture (`production/export/`).
- **Output packaging** — the on-disk `slide-NN.png` files that constitute the official export.
- **Byte-identical QA baseline** — the guarantee that captures never vary based on editor state.
- **CLI configuration** — viewport, selector, output directory, and scale, all overridable per run.

The export system owns **no rendering** (it delegates to `SlideRenderer`), **no authoring**, and **no Studio UI**. Its client-side sibling (the Export Modal) shares the same renderer and data but is a Studio feature, not an export-pipeline component.

---

## Summary

The Studio is a thin, state-centralising shell around a pure rendering engine. It loads a canonical carousel, presents it through Toolbar, Sidebar, Preview, Inspector, and two modals, and enables in-memory editing, advisory validation, guide-assisted review, and client-side export — all without persisting data, without coupling to the renderer, and without touching the Playwright export baseline. Every slide visual is a direct call into `SlideRenderer`, every mutation flows through one state hook, and every extension point preserves the existing architecture by remaining additive.
