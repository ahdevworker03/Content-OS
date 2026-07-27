# Renderer Architecture

## 1. Purpose

The renderer is a rendering engine responsible for transforming structured content into visual social media slides. It consumes a typed data structure — a `Carousel` containing an ordered list of `SlideData` objects — and produces React components that render each slide as a 1080×1080 canvas suitable for social media platforms.

The renderer is **presentation-focused**. It does not generate, modify, validate, or persist content. It takes data in, produces components out, and nothing more. This narrow scope is intentional: it keeps the rendering pipeline predictable, testable, and independent of the content authoring pipeline.

---

## 2. Renderer Architecture

The renderer is organized into a series of layers. Each layer has a single responsibility and communicates with adjacent layers through typed interfaces.

```
Workspace JSON / Dev JSON
          │
          ▼
     Configuration          ─── data source toggle (dev vs. workspace)
          │
          ▼
       Loader               ─── fetches or imports raw JSON
          │
          ▼
    Adapter / Mapper        ─── transforms external schema → canonical types
          │
          ▼
  Renderer Models           ─── typed domain objects (SlideData, Carousel)
          │
          ▼
    SlideRenderer           ─── routes slide data to the correct layout
          │
          ▼
      Layouts               ─── one component per slide layout type
          │
          ▼
   UI Components            ─── shared primitives (Title, Subtitle, Badge, etc.)
          │
          ▼
       Studio               ─── orchestrates the pipeline, provides preview tools
          │
          ▼
     React → Browser
```

### 2.1 Configuration

A single file (`config.ts`) exposes a boolean toggle that determines the data source:

- **Dev mode** (`USE_WORKSPACE_DATA = false`): imports a local `carousel.json` at build time. The dev file already uses the canonical type format, so no transformation is needed.
- **Workspace mode** (`USE_WORKSPACE_DATA = true`): fetches the workspace `carousel.json` at runtime and passes it through the adapter layer.

This layer exists so that the same codebase can be developed against stable local data and later connected to external data without structural changes.

### 2.2 Loader

The loader (`loadCarousel.ts`) is an async function that returns `Promise<Carousel>`. It encapsulates the mechanics of data acquisition — whether that is a Vite static import or a runtime HTTP fetch — and presents a uniform interface to the rest of the system.

The loader exists to isolate data-fetching logic. No other part of the system needs to know whether data came from a file, a network request, or a future API.

### 2.3 Adapter / Mapper

The adapter (`mapWorkspaceCarousel.ts`) is a pure transformation function that converts the workspace JSON format (UPPER_CASE field names, `TYPE_*` boolean layout flags) into the canonical internal format (camelCase, `layout` string discriminator).

This layer is the **only file in the system that understands both schemas**. The renderer models remain entirely unaware of the workspace schema. This is the most important architectural boundary in the system — see [Section 6](#6-the-adapter-layer).

### 2.4 Renderer Models

The models are defined in `types/index.ts` as a set of TypeScript types and interfaces. The core type is `SlideData`, a discriminated union keyed on the `layout` property:

```
SlideData = CoverSlideData
          | BulletListSlideData
          | ArrowListSlideData
          | GridSlideData
          | BoxListSlideData
          | CtaSlideData
          | UnsupportedSlideData
```

Each variant carries only the fields its layout needs. The `Carousel` type is simply `{ slides: SlideData[] }`.

The discriminated union pattern gives the renderer exhaustive type safety. Every `switch` on `slide.layout` is checked at compile time; adding a new variant produces errors in every branch that needs updating.

### 2.5 SlideRenderer

`SlideRenderer.tsx` is a pure routing component. It receives a single `SlideData` object, switches on `slide.layout`, and delegates to the appropriate layout component. TypeScript narrowing guarantees that each branch receives only the props valid for that layout variant.

This component exists to separate routing logic from presentation. Layouts never need to know about each other or about the routing mechanism.

### 2.6 Layouts

Each layout type has a dedicated component file in `src/layouts/`. Layouts compose UI primitives into a full slide visual. They are responsible for:

- Arranging primitives (Title, Subtitle, Badge, BulletList, etc.) according to the layout design.
- Accepting only the props their layout requires.
- Allowing an optional `className` for Studio-level customization.

Layouts exist as separate components because each visual arrangement is distinct. Keeping them isolated makes it trivial to add, remove, or modify a layout without touching unrelated code.

### 2.7 UI Components

Shared primitives live in `src/components/ui/`. These are small, presentational components that accept simple string props and optional class names:

- `Title` — styled heading at configurable level (h1/h2/h3)
- `Subtitle` — muted paragraph text
- `Badge` — small uppercase pill label
- `Footer` — small dimmed text
- `BulletList` — unordered list with highlight support

A base `Slide` wrapper in `src/components/slide/` provides the 1080×1080 canvas container, gradient background, and border radius. All layouts render inside this wrapper.

These primitives exist to prevent duplication. Layouts share common visual elements; centralising them ensures consistent styling and reduces maintenance.

### 2.8 Studio

The Studio is described in detail in [Section 7](#7-the-studio). Architecturally, it is the consumer of the rendering pipeline. It loads data, manages navigation state, and renders the `SlideRenderer` inside a scaled preview container.

---

## 3. Design Philosophy

### Separation of concerns

Every directory and module has a single kind of responsibility. Data loading, type definition, layout rendering, UI primitives, and studio tooling each live in their own layer. This prevents the system from becoming entangled and allows each concern to be understood in isolation.

### Single responsibility

No component does more than one thing. `SlideRenderer` routes but does not render. Layouts arrange but do not fetch data. Primitives display but do not manage state. This makes every piece of the system predictable and easy to test.

### Renderer independence

The renderer knows nothing about the Studio, the workspace, or the data source. It receives typed data and produces React components. It has no side effects, no external dependencies beyond React, and no awareness of the context in which it is used. This allows the renderer to be reused in other contexts — automated testing, alternative preview tools, or server-side rendering — without modification.

### Strong typing

The use of a discriminated union for `SlideData` and an exhaustive `switch` in `SlideRenderer` means that layout mismatches are caught at compile time. Adding a new layout produces type errors everywhere it needs handling. This eliminates an entire class of runtime bugs.

### Composition over duplication

Layouts share visual primitives rather than duplicating markup. The `Slide` wrapper, `Title`, `Subtitle`, `Badge`, `Footer`, and `BulletList` are defined once and composed by each layout. This keeps styles consistent and reduces the surface area for bugs.

### Adapter pattern

A single translation layer (`mapWorkspaceCarousel.ts`) bridges the external workspace schema and the internal canonical schema. This ensures that changes to the external format never propagate into the renderer models or layouts. The architectural benefits are detailed in [Section 6](#6-the-adapter-layer).

### Presentation separated from content

The renderer never modifies the data it receives. It is a pure transformation from `Carousel` to React elements. Content authoring, validation, and persistence are handled by other systems. This separation means the renderer can be developed and tested independently of the content pipeline.

### Extensibility

The architecture is inherently additive. New layouts can be added by creating a new type variant, a new layout component, a new adapter mapping, and new validation rules — all without altering existing code. The discriminated union ensures the compiler guides the developer through every required change.

---

## 4. Data Flow

The complete rendering pipeline transforms raw JSON into rendered React DOM. Every transformation has a specific purpose.

```
production/workspace/carousel.json  or  src/data/carousel.json
         │
         │  [1] Configuration selects data source
         │
         ▼
      config.ts
         │
         │  USE_WORKSPACE_DATA = true   → fetch workspace JSON
         │  USE_WORKSPACE_DATA = false  → import dev JSON at build time
         │
         ▼
    loadCarousel.ts
         │
         │  [2] Returns Promise<Carousel>
         │      - workspace path: raw JSON → mapWorkspaceCarousel() → Carousel
         │      - dev path:       JSON import → cast as Carousel
         │
         ▼
   mapWorkspaceCarousel.ts   (workspace path only)
         │
         │  [3] Pure transformation:
         │      - TYPE_COVER → "cover", TYPE_BULLET_LIST → "bullet-list", etc.
         │      - UPPER_CASE fields → camelCase fields
         │      - unknown TYPE_* → "__unsupported" (graceful degradation)
         │
         ▼
   Renderer Models (types/index.ts)
         │
         │  [4] Data is now a typed Carousel { slides: SlideData[] }
         │
         ▼
      useCarousel.ts  (Studio hook)
         │
         │  [5] Stores Carousel in state
         │      Runs validateCarousel() → ValidationWarning[]
         │      Manages current slide index, scale, debug toggle
         │
         ▼
      Studio.tsx
         │
         │  [6] Passes currentSlide (SlideData) to Preview
         │
         ▼
      Preview.tsx
         │
         │  [7] Applies CSS scale transform
         │      Renders SlideRenderer inside scaled container
         │
         ▼
    SlideRenderer.tsx
         │
         │  [8] switch (slide.layout):
         │      dispatches to correct layout component
         │      TypeScript narrowing ensures correct props
         │
         ▼
   Layout Component  (e.g., CoverSlide, GridSlide, ...)
         │
         │  [9] Composes UI primitives into full slide
         │      Wraps content in Slide (1080×1080 canvas)
         │
         ▼
   UI Components  (Title, Subtitle, Badge, Footer, BulletList)
         │
         │  [10] Render styled HTML elements
         │
         ▼
   React Virtual DOM
         │
         ▼
   Browser DOM
```

### Transformation Purposes

| Step | What happens | Why |
|---|---|---|
| 1 | Config selects data source | Allows development against local data and integration against workspace data without code changes |
| 2 | Loader fetches or imports data | Isolates I/O from the rest of the system |
| 3 | Adapter transforms schema | Prevents workspace schema from leaking into the renderer models |
| 4 | Data is typed | Catches structural mismatches at compile time |
| 5 | State hook manages carousel | Centralises navigation state, validation, and UI state |
| 6 | Studio orchestrates rendering | Keeps the renderer pure — it never calls setState or manages UI |
| 7 | Preview scales the canvas | Allows the 1080×1080 canvas to fit the browser viewport at any zoom level |
| 8 | SlideRenderer routes to layout | Isolates routing logic from presentation logic |
| 9 | Layout composes primitives | Each layout is self-contained and independent |
| 10 | Primitives render HTML | Smallest reusable units; consistent styling across all layouts |

---

## 5. Folder Responsibilities

```
src/
├── renderer/        Pipeline: config, loader, adapter, router
├── layouts/         Layout components (one per slide type)
├── components/
│   ├── slide/       Base canvas wrapper
│   └── ui/          Reusable presentation primitives
├── studio/          Development tools: preview, validation, debug, navigation
├── types/           Canonical type definitions (SlideData, Carousel)
├── data/            Sample carousel JSON (canonical format)
├── main.tsx         Entry point
├── App.tsx          Root component
└── index.css        Global styles and design tokens
```

### `src/renderer/`

The core rendering pipeline. Every file in this directory is part of the data-to-component transformation chain. No file here imports from `studio/` or `layouts/`. This directory is the public API of the rendering engine.

| File | Responsibility |
|---|---|
| `config.ts` | Data source selection toggle |
| `loadCarousel.ts` | Async data acquisition, error handling |
| `mapWorkspaceCarousel.ts` | Schema translation (adapter) |
| `SlideRenderer.tsx` | Layout routing |
| `UnsupportedSlide.tsx` | Graceful fallback for unknown layouts |

### `src/layouts/`

One file per layout type. Each component receives exactly the props its layout requires (enforced by the discriminated union in `SlideRenderer`). Layouts are independent of each other and unaware of the routing mechanism.

### `src/components/slide/`

The `Slide` wrapper component that provides the 1080×1080 canvas container. Any component that renders a full slide must be wrapped in `Slide` to receive the correct dimensions, background, and border radius.

### `src/components/ui/`

Atomic UI primitives shared across layouts. These are pure presentational components with no state, no side effects, and no knowledge of the renderer or the data model.

### `src/studio/`

A development environment — not part of the renderer. Manages state, provides navigation, validation reporting, JSON inspection, and scale controls. The studio imports and orchestrates the renderer but does not contain rendering logic.

### `src/types/`

The canonical type definitions for the entire renderer. These types are the contract between the data layer and the presentation layer. No other system module imports types from outside this file.

### `src/data/`

A sample `carousel.json` file in the canonical format. Used during development when `USE_WORKSPACE_DATA` is `false`. This file is not part of the renderer's runtime logic; it is a development convenience.

---

## 6. The Adapter Layer

The adapter (`mapWorkspaceCarousel.ts`) is the single most important architectural boundary in the renderer. Understanding why it exists is key to understanding the entire architecture.

### Why the renderer never consumes the Content Model directly

The workspace JSON format uses a schema that is optimised for content authoring — it uses `TYPE_*` boolean flags, UPPER_CASE field names, and conditional field presence based on type. The canonical renderer schema is optimised for presentation — it uses a `layout` string discriminator, camelCase field names, and typed item arrays per layout.

If the renderer consumed the workspace schema directly:

- Every layout component would need to handle both naming conventions.
- Layout components would need to detect type flags and switch rendering accordingly.
- A schema change in the workspace format would require changes across every layout.
- Testing would require workspace-format fixtures everywhere.

The adapter prevents all of this. It is the **only file in the system that understands both schemas**. Everything upstream speaks workspace; everything downstream speaks canonical.

### Why only one file understands both schemas

Centralising the translation in a single file means:

- **The translation logic is testable in isolation.** A change to the mapping can be verified with a single unit test file.
- **The workspace schema is documented implicitly.** The adapter file is a living specification of which workspace fields map to which canonical fields.
- **Adding a new layout requires a single change to the adapter.** One new `case` in `detectLayout` and one mapping function. No other file needs to know about the workspace format.

### Why this makes future schema changes easier

When the workspace schema changes (and it will), the scope of required changes is bounded:

- If a field is renamed in the workspace format, only the adapter changes.
- If a new field is added that maps to an existing canonical field, only the adapter changes.
- If a new layout type is added, the adapter gains a new branch; the renderer models gain a new variant; the renderer gains a new layout component. The change is additive, not invasive.

### Why renderer models remain stable

The canonical types (`SlideData`, `Carousel`, and the item types) are designed once and evolve slowly. They represent the presentation semantics of a slide, not the authoring semantics of the workspace. The adapter absorbs all workspace schema churn so the models never need to change unless a genuinely new presentation concept is introduced.

### Architectural benefits summarised

| Benefit | Mechanism |
|---|---|
| Schema isolation | Workspace format never appears outside `mapWorkspaceCarousel.ts` |
| Testability | Adapter can be unit-tested with workspace fixtures |
| Graceful degradation | Unknown layouts mapped to `UnsupportedSlideData` instead of crashing |
| Additive growth | New layout types added to adapter + models + layouts independently |
| Bounded change | Workspace schema changes affect exactly one file |

---

## 7. The Studio

The Studio is a browser-based development environment that provides tooling around the rendering engine. It is **not part of the renderer** — it imports and orchestrates the renderer but does not perform rendering itself.

### Role in the architecture

The Studio is a consumer of the renderer, not a component of it. This separation means:

- The renderer has no dependency on the Studio.
- The renderer can be used independently (e.g., from Playwright in the export pipeline).
- The Studio can be replaced, extended, or removed without affecting the rendering pipeline.

### Responsibilities

**Preview**

Renders the current slide at configurable zoom levels (25%, 50%, 75%, 100%). The preview applies a CSS scale transform to the 1080×1080 canvas so it fits the browser viewport. The zoom control is purely visual — it does not affect the renderer or the data.

**Validation**

On carousel load, the Studio runs `validateCarousel()` which checks every slide for structural issues: empty titles, missing items, unsupported layouts. Validation results are displayed in a dedicated panel with severity levels (warn / error). Validation is client-side and advisory — it does not block rendering.

**Debugging**

A collapsible JSON inspector (`DebugPanel`) displays the raw canonical data for the currently selected slide. This allows developers to inspect the exact data structure reaching the renderer without opening browser developer tools.

**Navigation**

The Studio provides three navigation mechanisms:

- **Sidebar**: a clickable list of all slides showing layout type and title.
- **Arrow keys**: keyboard shortcuts for previous/next slide.
- **Go to / Go next / Go prev**: programmatic navigation methods exposed by the `useCarousel` hook.

Navigation is managed by simple index state. There is no routing library — slide navigation is linear and does not involve URL paths.

**Inspection**

The `useCarousel` hook exposes the entire carousel state layout, validation warnings, and navigation controllers. The `Toolbar` displays the current data source (dev or workspace) and total slide count. A placeholder export button signals future export functionality.

### What the Studio does not do

- It does not perform rendering — the `SlideRenderer` and layout components handle that.
- It does not modify carousel data.
- It does not persist state or save changes.
- It does not transform or validate the workspace format — the adapter handles that before data reaches the Studio.

---

## 8. Export Readiness

The renderer's responsibility ends at producing React components. It does not capture, save, or transmit rendered output. This boundary exists because rendering and export are architecturally separate concerns.

### How the renderer prepares for export

The renderer provides a pure, deterministic pipeline from data to components. This makes it straightforward for an export system to:

1. **Supply data**: pass a `Carousel` object to `SlideRenderer` for each slide.
2. **Render to DOM**: mount the resulting components in a headless browser or rendering context.
3. **Capture output**: screenshot each slide canvas at 1080×1080 pixels.

Because the renderer has no side effects and no dependencies on the Studio, the export pipeline can reuse it without modification. The same `SlideRenderer` that powers the Studio preview also powers the export capture.

### The export boundary

The data flow for export will mirror the development data flow, but with the Studio replaced by an automated capture script:

```
Carousel → SlideRenderer → Layout → UI Components → React → Headless Browser → Image
```

The export pipeline will:

- Provide its own data source (not the Studio's).
- Iterate through all slides programmatically.
- Capture each slide canvas to an image file.
- Handle batching, retries, and output naming.

These details belong to the export system's architecture document. The renderer's responsibility is simply to produce correct, consistent output for any valid `Carousel` input.

---

## 9. Extending the Renderer

The architecture is designed for additive growth. Here is how common extension scenarios map to the existing structure:

### Additional layouts

1. Add a new variant to the `SlideData` discriminated union in `types/index.ts`.
2. Create a new layout component in `src/layouts/`.
3. Add a new `case` in `SlideRenderer.tsx`.
4. Add a mapping branch in `mapWorkspaceCarousel.ts`.
5. Add validation rules in `validation.ts`.

The compiler enforces exhaustiveness — every step is guided by type errors.

### New themes

The renderer currently uses CSS custom properties defined in `index.css`. A theming system could be introduced by:

- Moving design tokens into a theme configuration object.
- Passing theme data via React context.
- Allowing layout components to read theme values from context.

The separation between UI primitives and layouts means theme changes propagate consistently.

### Alternative render targets

Because `SlideRenderer` accepts typed data and produces React elements, alternative targets are possible:

- **Static HTML**: render to string with `ReactDOMServer.renderToStaticMarkup`.
- **PDF**: use a headless browser to render and capture each slide.
- **Video frames**: export each slide as an image frame for video assembly.

The renderer's output (React elements) is the same regardless of target. Only the capture mechanism changes.

### Improved validation

The `validateCarousel()` function is a standalone module. Enhancements — schema conformance checks, cross-slide consistency rules, style guide enforcement — are additive to the validation module without touching the renderer.

### Additional preview tools

The Studio is a standalone consumer of the renderer. Additional tools — side-by-side comparison, split-panel diffing, slide timelining — can be added to the Studio without modifying the renderer.

---

## Summary

The renderer is a layered, type-safe, presentation-only engine. It transforms structured data into visual slides through a pipeline of configurable, independently testable stages. The adapter layer insulates the renderer from schema changes in the content model. The Studio provides development tooling without coupling to the renderer. The architecture prioritises separation of concerns, strong typing, and additive extensibility — every new capability can be added without modifying existing, working code.
