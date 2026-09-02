# Layout Development Guide

## 1. Purpose

A **layout** is a React component that renders a specific slide design. It receives typed renderer models and composes shared UI primitives into a complete 1080×1080 slide.

Every layout has a single responsibility: **arrange visual elements according to a design**. Layouts do not load data, validate input, transform schemas, or contain business logic. They are pure presentation components — given the same props, they always render the same output.

The layout is the final stage in the rendering pipeline before React produces DOM. Everything upstream exists to deliver correctly typed data to the layout. The layout's job is simply to display it.

---

## 2. Renderer Responsibilities

Every layer in the renderer has a clearly defined boundary. A layout sits at the end of this pipeline and depends on every layer above it being correct.

```
Layer               Responsibility                              Knows about
─────────────────────────────────────────────────────────────────────────────
Workspace JSON      Content Model carousel                    Content Model schema
                    (variants[].body.slides, authoring         (workspace schema)
                    fields like subtext, handle, questions)

Adapter             Transforms workspace format to canonical    Both schemas
                    types. Only file that knows both schemas.

Renderer Models     Canonical type definitions                  Its own types only
                    (SlideData discriminated union)

SlideRenderer       Routes slide.layout to the correct          Renderer Models only
                    layout component

Layout              Renders a specific slide design             Renderer Models,
                                                                UI Components

UI Components       Atomic presentational primitives            React only
                    (Title, Subtitle, Badge, Footer,
                    BulletList, Slide canvas)
```

### Where a layout fits

A layout never sees workspace JSON. It never sees the adapter. It receives a fully typed, validated `SlideData` variant from `SlideRenderer`. Its only dependencies are:

- **Renderer Models** — the shape of its props.
- **UI Components** — the building blocks it composes.
- **The Slide wrapper** — the canvas container.

If any layer above the layout fails (invalid data, missing mapping, wrong type), the error surfaces before the layout is ever invoked. The layout operates in a guaranteed-correct environment.

---

## 3. Anatomy of a Layout

Every layout follows the same structural pattern:

```
Props (typed renderer model)
       │
       ▼
Layout Component
       │
       ├── Wraps content in <Slide>
       ├── Composes shared UI primitives
       │     ├── <Title>
       │     ├── <Subtitle>
       │     ├── <Badge>
       │     ├── <BulletList>
       │     └── <Footer>
       ├── Adds layout-specific arrangement (flex, grid, spacing)
       └── Exports as default
```

### What a layout receives

Props are a single `SlideData` variant. For example, `CoverSlideData` contains only `layout`, `title`, and `subtitle`. The layout never receives extra fields, never receives raw JSON, and never receives workspace-format data.

### What a layout does

1. Wraps its content in the `<Slide>` component to get the correct canvas dimensions, background, and border radius.
2. Arranges UI primitives according to the slide design — centering, stacking, creating grids, inserting arrows between items, etc.
3. Passes string values directly to primitives. No transformation, no formatting, no fallback logic beyond simple empty-string checks.

### What a layout does not do

- Does not call `loadCarousel`, `mapWorkspaceCarousel`, or `validateCarousel`.
- Does not fetch data or make API calls.
- Does not import from `renderer/`, `studio/`, or `data/`.
- Does not contain `useEffect`, `useState`, or custom hooks (except the optional `className` prop forwarding).
- Does not transform data — if data needs transformation, it happens in the adapter.

### Why layouts must remain simple

A layout's simplicity is the measure of the architecture's success. Every complexity pushed upstream (into the adapter, the models, the validation) is complexity the layout does not need to handle. If a layout requires branching logic, data transformation, or state management, the architecture has a gap that should be fixed by improving the layers above, not by complicating the layout.

---

## 4. Creating a New Layout

The architecture supports additive growth. A new layout requires changes in a small fixed set of places, each with a specific purpose., each with a specific purpose.

### Step 1: Add a renderer model (if required)

If the new layout introduces a visual pattern not covered by existing models, add a new variant to the `SlideData` discriminated union in `types/index.ts`.

```
Existing: CoverSlideData, BulletListSlideData, GridSlideData, ...
New:      TimelineSlideData
```

Define only the fields the layout needs. No workspace schema leaks here.

**Why:** The discriminated union gives compile-time exhaustiveness. Adding a variant produces type errors in every file that must handle it — `SlideRenderer`, the adapter, the validator. The compiler guides the developer through every required change.

### Step 2: Create the layout component

Create a new file in `src/layouts/`. Follow the existing patterns:

- Accept props matching the new type variant.
- Render inside `<Slide>`.
- Compose UI primitives for text and common patterns.
- Use layout-specific markup for unique visual arrangements.

Export the component and add it to `src/layouts/index.ts`.

**Why:** Each layout is an independent file. Adding a new layout never modifies an existing layout. The barrel export keeps imports clean.

### Step 3: Register it in SlideRenderer

Add a new `case` to the `switch` in `SlideRenderer.tsx`. TypeScript narrowing ensures you pass only the props valid for this layout.

```
case "timeline":
  return <TimelineSlide title={slide.title} items={slide.items} />;
```

**Why:** `SlideRenderer` is the single routing point. Every layout must be registered here or it cannot be rendered. The exhaustive switch (enabled by the discriminated union) generates a compile error if a variant is unhandled.

### Step 4: Update the workspace adapter

Add a new `layout` branch in `mapWorkspaceCarousel.ts` and a mapping function that transforms the Content Model authoring fields into the new canonical type. The adapter selects the carousel variant from `variants`, reads `variant.body.slides`, and maps `layout` strings (`cover`, `box-list`, `arrow-list`, `grid-2x2`, `bullet-list`, `final-cta`) plus authoring fields (`subtext`, `handle`, `questions`, `highlight`, `footer`, `items`) into renderer `SlideData`.

```
layout: "timeline"  (Content Model) → "timeline" (renderer)

mapping:
  timeline slide → TimelineSlideData
```

**Why:** The adapter is the only file that understands the workspace (Content Model) schema. Without this step, workspace data containing the new layout type would be mapped to `__unsupported`.

### Step 5: Verify validation

The `validateCarousel()` function must handle the new layout. Add a branch for the new variant that checks required fields and produces warnings or errors for missing data.

**Why:** Validation is the developer's safety net during Studio preview. Silently missing fields hide bugs.

### Step 6: Test inside the Studio

Load the new layout in the Studio preview. Verify:

- The slide renders correctly at 1080×1080.
- The preview auto-fits the canvas and zoom (Fit / − / +, Ctrl+scroll) works.
- Navigation prev/next works.
- The Inspector shows correct validation results.
- The Debug panel shows the expected data structure.
- The unsupported path degrades gracefully if the adapter mapping is missing.

**Why:** The Studio is the primary development tool. Every layout should be verified in the same environment where developers will use it.

---

## 5. Modifying an Existing Layout

### Safe changes

These changes affect only the layout component and do not ripple upstream:

| Change                                | What to modify                                |
| ------------------------------------- | --------------------------------------------- |
| Typography (font size, weight, color) | Layout component or shared primitive          |
| Spacing (padding, margin, gap)        | Layout component                              |
| Alignment (centered vs. left-aligned) | Layout component                              |
| Composition (reordering elements)     | Layout component                              |
| Responsive scaling behavior           | Layout component (works with `--slide-scale`) |

### Changes that require upstream updates

| Change                                       | What else to update                                                   |
| -------------------------------------------- | --------------------------------------------------------------------- |
| Adding a new field to a slide                | Renderer model, adapter, validation, the layout props                 |
| Renaming a field in the workspace            | Adapter only                                                          |
| Changing the layout identifier string        | Renderer model, adapter, SlideRenderer, validation                    |
| Adding a new variation of an existing layout | New variant in models, new or modified adapter mapping, new component |

### What should never change

**Renderer models** should not be modified to accommodate workspace quirks. If the workspace schema changes, the adapter absorbs the change. The models represent presentation concepts and should remain stable.

**Mapping responsibilities** belong exclusively in the adapter. A layout should never need to know about the workspace schema.

**Data loading and validation** are handled by the Studio and the loader. Layouts should never import `loadCarousel`, `validateCarousel`, or any function from `renderer/` or `studio/`.

---

## 6. Design Rules

### Rule 1: Presentation only

A layout receives typed data and returns React elements. Nothing more.

**Why:** Mixing presentation with logic makes layouts harder to test, harder to reason about, and harder to reuse.

### Rule 2: No API calls

Layouts never fetch data. All data arrives via props.

**Why:** Data fetching introduces timing dependencies, error states, and side effects. These belong in the Studio or the loader.

### Rule 3: No data loading

Layouts never call `loadCarousel()` or any loader function.

**Why:** The loader is upstream in the pipeline. Invoking it from a layout creates a circular dependency and couples the layout to the data source.

### Rule 4: No mapping

Layouts never call `mapWorkspaceCarousel()` or perform schema translation.

**Why:** Mapping is the adapter's job. If a layout needs transformed data, the transformation belongs in the adapter or a utility layer, not in the layout.

### Rule 5: No business logic

Layouts never validate, compute, filter, sort, or aggregate data.

**Why:** Business logic changes independently of presentation. Keeping it out of layouts means a layout change never risks breaking a business rule, and a business rule change never requires touching a layout.

### Rule 6: Use shared UI components

Every layout should use `Title`, `Subtitle`, `Badge`, `Footer`, `BulletList`, and the `Slide` wrapper. Custom markup should be limited to the layout's unique visual arrangement.

**Why:** Shared components guarantee visual consistency. When the design system evolves (new fonts, colors, spacing), updating the shared component updates every layout automatically.

### Rule 7: Prefer composition over duplication

If two layouts share a visual pattern, extract it into a shared component or utility rather than duplicating markup.

**Why:** Duplication multiplies maintenance. A shared abstraction means one fix propagates everywhere.

### Rule 8: Keep layouts deterministic

Given the same props, a layout must always render the same output. No randomness, no date/time dependence, no external state.

**Why:** Deterministic rendering is required for snapshot testing, export capture, and reproducibility.

### Rule 9: Keep layouts stateless whenever possible

Layouts should not use `useState` or `useReducer`. If state is unavoidable, lift it to the Studio layer.

**Why:** State in layouts makes rendering non-deterministic and couples the layout to runtime behavior that cannot be captured in export.

---

## 7. Common Mistakes

### Parsing workspace JSON inside layouts

```
// ❌ Wrong: layout imports workspace types or adapter
import { mapWorkspaceCarousel } from "../renderer/mapWorkspaceCarousel";
```

A layout should never know the workspace schema exists. If a layout is receiving workspace-format data, the pipeline is broken. Fix the upstream layers instead.

### Creating custom typography instead of using shared components

```
// ❌ Wrong: duplicate styling in every layout
<h1 style={{ fontSize: "32px", fontWeight: 700, color: "#1a1a1a" }}>{title}</h1>

// ✅ Correct: use the shared primitive
<Title>{title}</Title>
```

Custom typography defeats visual consistency. Every text element should use `Title`, `Subtitle`, or another shared primitive. If the existing primitives do not cover a needed style, extend the primitives — not the layout.

### Duplicating existing layouts

Copy-pasting an existing layout and changing a few lines duplicates bugs and multiplies maintenance. If two layouts share significant structure, extract the common arrangement into a shared composition component.

### Adding validation inside layouts

```
// ❌ Wrong: layout decides what to show based on data quality
if (!items || items.length === 0) {
  return <Slide><Title>No items to display</Title></Slide>;
}
```

Validation is the Studio's responsibility. A layout should trust that its input is valid. If invalid data can reach a layout, fix the validation layer.

### Adding application state

```
// ❌ Wrong: layout manages its own state
const [expanded, setExpanded] = useState(false);
```

Layouts render slides. Slides are static canvases. State belongs in the Studio, which manages navigation, scale, and UI toggles. A stateful layout is a sign that the boundary between renderer and Studio has been breached.

### Tight coupling with the Content Model

```
// ❌ Wrong: layout accesses raw workspace fields
slide.subtext   // Content Model workspace field name
```

The renderer models are the contract. A layout should never reference Content Model workspace field names (e.g., `subtext`, `handle`, `questions`) or any external schema. If the layout needs a field that is not in the renderer models, the models need to be extended through the proper channels (new variant, adapter update).

---

## 8. Best Practices

### Keep layouts focused

A layout should fit on one screen. If it grows beyond ~60 lines, it is probably doing too much. Extract repeated patterns into helper components or shared primitives.

### Reuse components whenever possible

Before writing custom markup, check whether an existing UI primitive or another layout's pattern covers the need. The `BulletList` component, for example, handles highlights, spacing, and list styling. Do not reimplement it.

### Prefer configuration over duplication

If a layout has minor variations (e.g., left-aligned vs. centered title), consider making alignment a prop rather than creating a separate layout. But avoid over-engineering — if the variation is a fundamentally different visual design, a separate layout is correct.

### Maintain visual consistency

Every layout uses the same `Slide` wrapper, the same typography primitives, and the same spacing scale. This ensures that any carousel feels cohesive even when its slides use different layouts.

### Keep renderer models stable

Renderer models represent presentation concepts. Once a model stabilises, changes should be rare. New requirements should be met by adding new variants, not by modifying existing ones.

### Extend through composition instead of modification

The open-closed principle applies: layouts should be open for extension (new layouts can be added) but closed for modification (existing layouts should not need to change when adding new ones). If adding a feature requires changing every existing layout, the architecture needs rethinking.

---

## 9. Development Checklist

Use this checklist whenever creating or modifying a layout.

### New layout checklist

| #   | Step                                                         | Done |
| --- | ------------------------------------------------------------ | ---- |
| 1   | Renderer model added to `types/index.ts` (if new concept)    | □    |
| 2   | New type variant added to `SlideData` union                  | □    |
| 3   | Layout component created in `src/layouts/`                   | □    |
| 4   | Component exported from `src/layouts/index.ts`               | □    |
| 5   | Case added to `SlideRenderer.tsx` switch                     | □    |
| 6   | TypeScript compiles without errors                           | □    |
| 7   | Workspace adapter updated in `mapWorkspaceCarousel.ts`       | □    |
| 8   | Validation rules added in `validation.ts`                    | □    |
| 9   | Studio preview renders correctly                             | □    |
| 10  | Auto-fit + zoom (Fit / − / +, Ctrl+scroll) verified          | □    |
| 11  | Navigation (prev/next/sidebar) works                         | □    |
| 12  | Inspector shows correct validation results                   | □    |
| 13  | Debug panel shows expected data structure                    | □    |
| 14  | No architectural rules violated (see Section 6)              | □    |
| 15  | Sample data added to `src/data/carousel.json` (for dev mode) | □    |

### Existing layout modification checklist

| #   | Step                                                                  | Done |
| --- | --------------------------------------------------------------------- | ---- |
| 1   | Change is limited to layout component (not models/adapter/validation) | □    |
| 2   | Shared UI components used where possible                              | □    |
| 3   | No business logic, data loading, or mapping added                     | □    |
| 4   | No state added                                                        | □    |
| 5   | Visual consistency maintained with other layouts                      | □    |
| 6   | Studio preview verified at auto-fit and zoom levels                   | □    |
| 7   | TypeScript compiles without errors                                    | □    |

### Architectural violation checklist

If the answer to any of these is "yes", the approach is wrong:

| Question                                                                                               | OK? |
| ------------------------------------------------------------------------------------------------------ | --- |
| Does the layout import from `renderer/` or `studio/`?                                                  | No  |
| Does the layout call `fetch` or any async function?                                                    | No  |
| Does the layout reference Content Model workspace field names (`subtext`, `handle`, `questions`, ...)? | No  |
| Does the layout contain `useState` or `useEffect`?                                                     | No  |
| Does the layout validate or transform its input?                                                       | No  |
| Does the layout duplicate markup from another layout?                                                  | No  |
| Does the layout contain business logic?                                                                | No  |
| Does the layout hardcode colors, fonts, or spacing instead of using shared components?                 | No  |

---

## Summary

A layout is a presentation-only component with a single file, a single responsibility, and a single place in the pipeline. Its props are typed by the renderer models, its building blocks are the shared UI primitives, and its output is always a 1080×1080 slide inside the `Slide` wrapper.

Creating a layout means touching the models, the component, the router, the adapter, and the validator — in that order, each step guided by the compiler. Modifying a layout means changing only the component, unless the data model itself is evolving.

The architecture is designed so that layouts are the simplest part of the system. If a layout feels complex, the complexity belongs upstream. Push it there.
