# Studio Design System

## 1. Purpose

This document defines the visual language of the Carousel Studio. It records the **design principles and reasoning** behind every visual decision, not the implementation. The implementation lives in the token files (`index.css`, `studio/theme.css`, `studio/Studio.css`) and the shared UI primitives; this document exists so that future UI changes remain consistent with the intent behind those choices.

The Studio is a **two-layer visual system**:

- **The slide layer** — the 1080×1080 canvas a viewer sees on Instagram or LinkedIn. It uses a warm, editorial "dark paper" palette and speaks directly to the brand.
- **The tool layer** — the editor chrome around that canvas (toolbar, sidebar, inspector, modals). It uses a neutral, desaturated "dark editor" palette so the tool never competes with the content.

These layers are intentionally different. The tool layer should be invisible; the slide layer should be memorable. Anyone changing either must first understand which layer they are touching.

---

## 2. Design Goals

Every visual decision in the Studio is evaluated against these goals, in priority order:

1. **The slide is the product.** The editor is furniture. Anything that draws attention away from the 1080×1080 canvas is a failure.
2. **Consistency over novelty.** The same thing should look the same everywhere. A title is a title, a button is a button, whether it appears in the toolbar, a modal, or the inspector.
3. **Trust the tokens.** No component hardcodes a color, size, radius, or shadow. Values flow from tokens so a single change propagates everywhere.
4. **Legibility for a bilingual audience.** Content is Arabic (RTL) with embedded English technical terms. The design must make mixed-direction text feel natural, not awkward.
5. **Calm over busy.** Low contrast in the chrome, deliberate contrast in the slide. The editor should feel quiet; the slide should feel warm.
6. **Accessibility by default.** Every interactive element is keyboard-reachable, focus-visible, and meets contrast requirements without special effort.

A proposed change that violates goal 1 or goal 3 should be rejected unless it also updates the tokens and this document.

---

## 3. Visual Philosophy

### Two palettes, one system

The Studio uses **two distinct palettes that share one accent**. The slide layer is warm (deep browns, cream, amber, orange); the tool layer is neutral (near-black grays, cool text, amber accent). The shared accent — a warm amber — is the single thread that ties them together and signals "this is the same application."

**Reasoning:** If the editor used the brand's warm palette, the slide canvas would blend into the surrounding chrome and lose its "framed artwork" quality. If the editor used a palette with a *different* accent, the tool would feel disconnected from the content it edits. Reusing the amber accent gives the chrome a subtle brand signature while the neutral grays keep it visually recessive.

### RTL is the native reading direction

Slides render `right-to-left` because the audience reads Arabic. Labels, handles, and code-like fragments (`→`, usernames, mono text) render `left-to-right` because they are English or symbols. This is not a workaround — it is the model: **prose follows the reader, technical fragments follow the content.**

**Reasoning:** Arabic carousels that fake RTL with manual reversal break the moment an English term appears. Treating direction as a property of *content type* (prose vs. technical fragment) keeps mixed-language text legible without special handling in content authoring.

### The slide is a framed print

The slide has generous internal padding (roughly 80px horizontal, 90px top, 72px bottom) and a subtle corner accent. Content never touches the edge. This gives the canvas a "framed poster" quality and, crucially, reserves space for the social platforms' overlays (like, comment, save icons on Instagram) that sit on top of the image.

### Scale, don't resize

The slide is authored at 1080×1080 and *scaled* for display, never re-laid-out. Everything that depends on the slide's proportions (typography, spacing, safety guides) derives from a single `--slide-scale` value. The editor shows the slide at any zoom while the export captures it at exactly 1× (and 2× for image fidelity).

**Reasoning:** A design system built on relative scaling means one source of truth for size. Changing the slide size, the preview zoom, or the export resolution is a change to one variable, not a redesign.

---

## 4. Color System

### Slide palette (brand)

The slide layer is a warm, low-key "dark paper" scheme. It reads as premium and editorial, and it makes the amber/orange accent pop.

| Role | Character | Reasoning |
|---|---|---|
| Canvas background | Deep espresso brown (near-black) | Dark enough to make cream text and amber accents glow; warm enough to avoid the "cold terminal" feel of pure black |
| Card background | Lighter brown, one step above canvas | Sits on the canvas as a distinct but harmonious surface |
| Primary text | Cream / off-white | High contrast against the dark canvas without the harshness of pure white |
| Muted text | Warm caramel | Secondary text that is clearly secondary but still warm |
| Dim text | Dark amber/bronze | Reserved for decorative fragments — corner borders, hairlines — not for reading text |
| Accent (primary) | Warm amber/gold | The brand's signature highlight; used for emphasis, labels, icons, active states |
| Accent (secondary) | Deeper orange | Stronger call-to-action moments, accent borders, and filled badges |
| Highlight | Bright amber | The strongest emphasis — the "read this word" marker inside body text |

**Reasoning behind the warmth:** The creator's identity is a student building in public — grounded, honest, warm. A pure black/white scheme would read as corporate and cold; the brown-and-amber scheme reads as handcrafted and human. The palette mirrors the original HTML renderer's values, which were chosen for exactly this warmth.

### Tool palette (editor chrome)

The tool layer is a neutral, desaturated dark editor with a deliberately narrow contrast range.

| Role | Character | Reasoning |
|---|---|---|
| Studio background | Near-black neutral | Provides a calm stage for the slide |
| Surface | Slightly lighter neutral | Panels, toolbar, sidebar — surfaces that hold chrome |
| Elevated | One more step lighter | Cards, modals, floating controls that sit *above* surfaces |
| Borders | Muted gray | Defines structure without shouting; borders are the primary separation mechanism |
| Primary text | Light neutral | Legible labels and values |
| Muted text | Mid gray | Supporting text |
| Dim text | Dark gray | Section headers, hints, inactive meta |
| Accent | Shared warm amber | Interactive emphasis, active states, focus — the bridge to the slide layer |
| Status (warning / danger) | Amber / red | Validation messages; tinted at low opacity as background, full color as text |

**Reasoning:** The chrome uses grays because grays recede. The only colored things in the chrome are the shared amber accent and the validation statuses. This guarantees that when the eye lands on the screen, the warm slide is the focal point and the chrome is context.

### Contrast rules

- **Reading text** (titles, subtitles, body, inputs) must always use the highest-contrast pair available in its layer (cream on espresso for slides; light-neutral on near-black for the editor).
- **Accent text** is acceptable for labels and emphasis but never for long body copy.
- **Dim text** is decorative only. It is never used for content that must be read.
- **Color is never the only signal.** Active selection combines accent color *and* a border/weight change; validation pairs color with an icon/label; focus pairs color with an outline.

---

## 5. Surface Hierarchy

Surfaces are ordered layers that convey depth. Each layer is a small, predictable step above the one below it, so the eye can always tell what "floats" and what "rests."

### Slide layer surfaces

1. **Canvas** (base) — the 1080×1080 slide background.
2. **Card** — content containers on the canvas (bullet boxes, grid cells, list rows, CTA boxes). Cards are a lighter brown and use asymmetric rounding plus an accent edge to feel structured.
3. **Accent card** — a card variant with a stronger accent border/edge for emphasis (summary boxes, final CTA boxes).

### Tool layer surfaces

1. **Studio background** (base) — the page behind everything.
2. **Surface** — the toolbar, sidebar, and inspector backgrounds.
3. **Elevated** — floating controls (zoom pill) and modal cards; these sit above surfaces and cast a shadow.

**Reasoning:** Depth is communicated two ways — a lightness step and (on the tool layer) a shadow. The slide layer deliberately *avoids* shadows: slides are flat prints, and shadows would look like a screen artifact once exported. The tool layer uses shadows because it is a real, layered UI. This split (flat content, shadowed chrome) keeps the two layers visually distinct.

---

## 6. Typography Hierarchy

The system uses four families, each with a fixed role. The rule is **one family per concept**, not per style.

| Family | Role | Reasoning |
|---|---|---|
| **Tajawal** (sans) | Arabic prose: titles, subtitles, body | A modern Arabic sans that pairs naturally with Latin sans; the primary reading face |
| **Nunito** (sans) | The creator's name in the CTA footer | A rounded, friendly Latin face that stands apart from body text |
| **Courier New** (mono) | Labels, badges, handles, usernames, arrows, section tags | The "code" voice — signals technical/structural content and provides LTR anchors |
| **Pacifico** (cursive) | Decorative oversized numbers | A handwritten accent that softens an otherwise structured slide |

### Size and weight tiers

The system defines a fixed size scale (from small labels up to large display titles) and a fixed weight scale (regular, medium, semibold, bold). Titles use bold weight; body uses regular; mono labels use bold with wide letter-spacing and uppercase.

**Hierarchy is expressed through size, weight, and family — not through color alone.** A title is large and bold; a label is small, mono, uppercase, and accent-colored; body is regular and cream. The consistent rule: *bigger and bolder = more important; mono + uppercase + accent = a structural label, not prose.*

### Letter-spacing conventions

- **Uppercase mono labels** use wide, deliberate letter-spacing to read as "stamps."
- **Prose** uses default spacing; Arabic text is never letter-spaced (spacing breaks Arabic letter joining).

### Reading direction by role

- **Arabic prose** (title, subtitle, body) is right-aligned and RTL.
- **Technical fragments** (labels, badges, handles, usernames, arrows) are left-aligned and LTR.
- **Numbers** stay LTR even inside RTL context.

**Reasoning:** This is the single most important typographic rule for the audience. Direction is a property of the content's nature, not of the string. Keeping the mapping explicit prevents the classic failure where English terms or numbers get reversed inside Arabic sentences.

---

## 7. Spacing System

Spacing follows a fixed, limited scale with no arbitrary values:

| Step | Use |
|---|---|
| Extra-small | Tight internal gaps, icon padding |
| Small | Gaps between tightly-related items (buttons in a group, list items) |
| Medium | Default padding inside cards/panels; gaps between fields |
| Large | Panel/modal padding; section separation |
| Extra-large | Generous padding for major surfaces |
| 2× extra-large | Separation between distinct regions |
| 3× extra-large | Rare, deliberate "breathing room" moments |

**Reasoning:** A fixed scale eliminates the thousands of slightly-different spacing values that emerge when each developer picks "what looks right." It also creates rhythm: small = related, medium = grouped, large = separated. When in doubt, reuse an existing step rather than adding a new one.

### Slide-specific spacing

The slide canvas has dedicated padding tokens (horizontal, top, bottom) that define the safe content area. The bottom padding is intentionally *smaller* than the top because the slide's footer/swipe indicator anchors to the bottom edge. Slide padding is also the source of truth for the safety guides (see §16).

---

## 8. Border Radius

Radii follow the same fixed, limited scale as spacing, from a tight corner to a generous curve.

| Step | Use |
|---|---|
| Small | Badges, pills, tiny controls (zoom buttons, close buttons, number chips) |
| Medium | Inputs, list items, thumbnails, sidebar items, zoom pill container |
| Large | Cards, modal cards, grid cells |
| Extra-large | Reserved for the largest containers |

### Directional rounding on slides

Slide cards use **asymmetric rounding**: a full curve on the right edge (the reading origin in RTL) and no curve on the left edge, where the accent border sits. This gives cards a "notebook tab" quality and reinforces the RTL flow.

**Reasoning:** Radius conveys *containedness*. Small controls are tight; cards are soft; the largest surfaces are roundest. On the slide, the asymmetric rounding is a deliberate visual echo of the RTL reading direction — content "opens" from the right.

---

## 9. Elevation and Shadows

The slide layer is **flat**. No shadows, ever. It is a print, and shadows would look like rendering artifacts in the exported PNG.

The tool layer uses a **two-level shadow scale**:

| Level | Use | Reasoning |
|---|---|---|
| Small | Toolbar, sidebar, inspector (surfaces that rest against the page) | A faint 1–2px shadow plus a border gives enough separation |
| Medium | Floating elements — modals, the debug panel | A broader, deeper shadow signals "this floats above everything" |

**Reasoning:** Elevation in the editor is communicated by the *combination* of a shadow and a lightness step. Borders alone feel flat; shadows alone feel muddy on a dark theme. The two small/medium levels are intentionally the only shadow values — more would produce an inconsistent depth language.

Modals also dim the page behind them (a translucent dark scrim) to reinforce "the dialog is the top layer and the page is inert."

---

## 10. Interactive States

Every interactive element has a defined state at rest, on hover, on focus, when active/selected, and when disabled. The states are consistent across buttons, list items, inputs, and checkboxes.

### Rest

Quiet, transparent or surface-toned, with a muted border where the element is a control. Controls do not look loud until they are needed.

### Hover

A gentle step up: background lightens, border brightens, or text shifts toward the accent. Hover never rearranges layout.

### Focus

A visible **accent outline with an offset** appears on keyboard focus (`focus-visible`). Focus is the same color for every element — the amber accent — so the user always knows where the keyboard is.

### Active / selected

The selected state combines three signals (never color alone): the amber accent border, a translucent amber background, and a text/border color shift. This is used for the active sidebar slide, the active zoom mode, and selected export tiles.

### Disabled

Reduced opacity plus a non-interactive cursor. Disabled elements never look clickable.

**Reasoning:** The states map to a simple model — *hover = "you can touch this," focus = "the keyboard is here," active = "this is the current thing," disabled = "not available."* Every control uses the same model, which is what makes the interface feel coherent despite many different components.

---

## 11. Icons

Icons are **typographic glyphs and symbols**, not an icon set: `−`, `+`, `→`, `ⓘ`, `×`, bullet dots, and the swipe arrow. They are rendered as text so they inherit the mono family and scale with the slide.

**Reasoning:** A dedicated icon library is unnecessary overhead for a tool this size, and a custom icon set risks visual drift. Typographic glyphs are always available, always crisp, and always consistent. The mono family is used for structural glyphs (`→`, section tags, labels) to reinforce the "code/technical" voice; geometric glyphs (`×`, `ⓘ`) inherit the surrounding context.

When a new icon is needed, prefer an existing glyph. If none fits, add a glyph — not a raster or a bespoke icon component.

---

## 12. Buttons

Buttons follow a three-tier hierarchy, distinguished by **fill and border**:

| Tier | Appearance | Use |
|---|---|---|
| Primary | Accent border (outline) with transparent fill; fills softly on hover | The main action in a region (e.g., **Export**) |
| Secondary | Muted border with transparent fill; border/text shift to accent on hover | Supporting actions (e.g., **Layout Guides**, **About**) |
| Ghost / icon | No border, minimal chrome; highlight on hover | Dense, repeated controls (zoom `−`/`+`, close `×`, sidebar items) |

A **toggle** is a secondary button whose active state adds the amber fill/border/text combination (see §10).

**Reasoning:** The Studio is an editing tool, so destructive or "primary" actions are rare. An outline primary keeps the chrome calm (no large filled colored blocks) while still making the main action findable. Fill is reserved for the *active* state, which means "selected" always reads as the most visually present control on screen.

Buttons are `font-family: inherit`, so they match surrounding text; they do not impose their own type style.

---

## 13. Forms

Forms appear in two places: the Inspector (structured editing fields) and the Export modal (checkboxes). Both follow the same rules.

### Fields

- Each field is a **label above the control**, with the label in small, uppercase, letter-spaced muted text (the "stamp" style).
- Inputs have a muted border at rest and a **solid accent border on focus** (no outline, since the border itself is the focus indicator and is always visible).
- Textareas are used where content is multi-line (titles, item lists, bodies); inputs where it is a single line (labels, handles, usernames).
- **RTL fields** (Arabic content) set their direction to RTL with plaintext bidi, so the caret and text flow correctly for mixed Arabic/English.

### Checkboxes

- Checkboxes are native inputs with the **accent color applied to the check mark** (`accent-color`), so selection color stays on-system.
- Selecting a tile that contains a checkbox highlights the whole tile (accent border), not just the box — the click target is large and obvious.

### Warnings

Validation results render as tinted chips (low-opacity status background + full-strength status text). Severity is expressed by color *and* by the fact that the chip is a distinct, bordered shape — never by color alone.

**Reasoning:** Forms in the Inspector are the editing surface, so they must stay visually quiet (labels guide, inputs sit flat) until focus. The "stamp" label style keeps field names scannable in a long list. Consistent accent-on-focus means the user's eye can always find the active field.

---

## 14. Cards

A **card** is a content container on the slide canvas. Cards share a single identity: a card-colored surface, asymmetric rounding, and an accent edge on the left (reading side).

Card variants are:

- **Standard card** — card surface with a secondary-accent left edge (bullet boxes, arrow rows, grid cells, box-list rows).
- **Primary card** — card surface with a primary-accent left edge (summary boxes, the final CTA).
- **Accent card** — a card whose border/edge uses the dim accent for special emphasis (an "accented" box-list row).

**Reasoning:** Every card shares the same geometry so the eye learns "this shape = one unit of content." The variants differ only in *which* accent marks the edge, which encodes emphasis without changing size, spacing, or typography. This lets content authors vary emphasis purely through data (a `variant` or `accent` flag) and never through ad-hoc styling.

---

## 15. Panels

Panels are the editor's structural surfaces: **Toolbar** (top), **Sidebar** (left, slide list), **Inspector** (right, editing), and the dev-only **Debug panel** (bottom).

Each panel:

- Sits on a surface background, separated from its neighbor by a 1px border (never by a gap alone).
- Has a **header row** in small, uppercase, letter-spaced dim text ("Slides (8)", "Inspector", debug toggle).
- Scrolls internally when its content overflows; the panel frame itself never reflows the canvas.

**Reasoning:** Panels are the "frame" around the canvas. The consistent header style and border-based separation make the three-region layout (list | canvas | editor) legible at a glance. The canvas region always sits in the middle and always gets the flexible space; panels are fixed-width. This guarantees the slide stays the visual center regardless of panel content.

---

## 16. Preview Workspace

The preview is the center region and the heart of the Studio. It shows the current slide, auto-fitted to the available space, with a zoom control in the bottom-right.

Principles:

- **Auto-fit by default.** On load and on resize, the slide scales to the largest size that fits the region (`fit = min(availW, availH) / 1080`). The user never opens the tool to a cropped or overflowing slide.
- **Zoom overrides fit.** Manual zoom steps away from fit and is clamped to a sane range (0.1×–3×). The "Fit" control always restores auto-fit.
- **Zoom is visual only.** Changing zoom never alters the slide, the data, or the export output.
- **The zoom pill is a floating elevated control** — a compact `− 77% · Fit +` cluster — so it reads as "tool floating over the canvas," not "part of the slide."
- **The empty state** (no slides) shows a single dim message, centered, matching the surrounding muted type.

### Safety guides

The preview can overlay **safety guides** (canvas border, safe-area rectangle, profile grid, crosshairs) toggled from the toolbar. These are drawn from the slide's own padding tokens and the current scale, so they stay pixel-aligned at any zoom.

**Guides are preview-only.** They never render in thumbnails, in the export route, or in captured output. The reasoning is absolute: guides are a *tool for the author*, not *content for the audience*, and the two must never leak into each other.

---

## 17. Modal Design

Modals (Export, About) share one structure:

- A **dim scrim** over the whole screen, with the modal card centered on top.
- A **card** on the elevated surface, with the large radius, a strong border, and the medium shadow.
- A **close affordance** (`×`) in the top corner.
- Clicking the **scrim closes** the dialog; clicking the **card does not** (event is stopped).
- `Escape` closes the modal (implemented via a key listener).

The Export modal extends the base card with a wider fixed-max width, a header row (title + "Select all"), a scrollable thumbnail grid, and a footer row (count + actions).

**Reasoning:** A single modal anatomy means users never have to relearn how to dismiss a dialog. The scrim dims the page so the "top layer" relationship is unambiguous. The close, scrim-click, and Escape paths are all present because different users reach for different dismissals, and a modal that traps the user is the worst kind of surface.

---

## 18. Accessibility Considerations

Accessibility is a constraint on every section above, not an add-on. The commitments:

1. **Visible focus everywhere.** Every button and input shows the accent focus outline/ring on keyboard focus. No focus is ever suppressed.
2. **Color is never the sole signal.** Active, selected, warning, and error states all pair color with a shape, border, weight, or label.
3. **Contrast meets WCAG for reading text.** Body and title text use the highest-contrast pairs; dim text is decorative and never carries meaning.
4. **Semantic roles.** Modals are `role="dialog"` with `aria-modal="true"` and a label; icon-only buttons carry `aria-label`s (close, zoom out, zoom in, about); sidebar slides are buttons with the slide number and title as their accessible content.
5. **Keyboard navigation.** Slides navigate with arrow keys (`←`/`→`); Escape dismisses modals; all interactive controls are focusable and operable without a mouse.
6. **Reduced motion tolerance.** The design uses no gratuitous animation; state changes are instant. Anything added later must respect `prefers-reduced-motion`.
7. **Bidi correctness.** RTL/LTR is set by content role (prose vs. technical fragment) and uses plaintext bidi so mixed Arabic/English never renders in the wrong order.
8. **Disabled states are communicated** both visually (opacity, cursor) and semantically (native `disabled`).

**Reasoning:** The audience includes a wide range of devices and users; the tool is the creator's primary working environment. Accessibility here is not compliance theater — a keyboard-first author must be able to build, navigate, inspect, and export entirely without a mouse, and a screen-reader user must be able to tell what is selected, what is a warning, and what the current slide is.

---

## 19. Responsive Principles

The Studio is a browser tool that must work across viewport sizes. The principles:

1. **The canvas is the flexible region.** The sidebar and inspector have fixed widths; the center preview absorbs all remaining space. When the window shrinks, the slide re-fits; the chrome does not reflow into a stack.
2. **Auto-fit handles the shrink.** Because the slide always auto-fits, no manual breakpoints are needed for the canvas itself — it is continuously responsive, not stepped.
3. **Modals constrain their width** to a max (relative to viewport width) and scroll internally; they never overflow the viewport.
4. **Thumbnail grids wrap.** The export grid uses an auto-fill minimum tile size, so tiles reflow to fit any width.
5. **The slide size is fixed; everything else is fluid.** 1080×1080 is the only fixed dimension. Typography and spacing on the slide scale with the slide; the editor scales with the viewport.

**Reasoning:** The Studio is a *single-purpose* tool (edit a square canvas), so it does not need a full responsive grid. The design instead optimizes one thing — keep the square slide as large and centered as possible — and treats the chrome as fixed framing. This is why auto-fit (a continuous function) replaces breakpoints (a stepped system): a square canvas never benefits from discrete layout jumps.

---

## 20. Summary of Invariants

These rules must survive every future UI change. If a change breaks one of these, it is wrong, regardless of how it looks.

- The **slide** is warm (espresso/cream/amber) and **flat**; the **editor** is neutral gray and **shadowed**.
- The two layers share exactly one color: the **amber accent**.
- **No hardcoded values** in components — colors, sizes, radii, shadows, and spacing come from tokens.
- **RTL prose, LTR technical fragments.** Direction is a content property, never a hack.
- **Slides are scaled, never resized.** 1080×1080 is the only fixed dimension.
- **The slide is the product.** Chrome is recessive; anything that competes with the canvas fails goal 1.
- **Guides never leak into output.** Preview aids and exported content are permanently separated.
- **Color is never the only signal.** Every state is multi-coded.
- **One family per concept** — Tajawal (prose), Courier (technical), Nunito (name), Pacifico (decorative).
- **A fixed, limited scale** for spacing and radius; no arbitrary values.
