# Studio Separation — Final Milestone Plan

## Context

The renderer is frozen (finished): do **not** touch `Slide.tsx`, `layouts/*`, `components/ui/*`,
`components/slide/*`, `index.css`, brand color tokens, or carousel data.

The export pipeline is frozen too (this milestone has nothing to do with exporting):
do **not** touch `src/export/*` or `production/export/*`.

Current couplings to remove:
1. `src/studio/Studio.css` reuses renderer brand tokens (`var(--color-*)`) for all its chrome.
   Because `--color-border` is `transparent`, Studio surfaces have invisible borders and no shadows.
2. `.studio` sets no background, so the editor workspace shows `body`'s brand color (`#1a0f08`).
3. `.studio-preview__slide { --slide-scale: 0.5 }` is redundant — `Preview.tsx` sets it inline
   and `useCarousel.ts` defaults scale to `0.5`.
4. The safe overlay computes geometry in JS from `SAFETY_CONFIG` (`renderer/safety/config.ts`),
   duplicating values that already exist as renderer CSS tokens (`--slide-padding-y/x/bottom`,
   `--slide-scale`). `SAFETY_CONFIG` has no consumers outside the overlay.

## Decisions (confirmed)

- **Studio theme:** neutral dark editor (slate/graphite workspace) so slides stay the visual focus.
- **Token split:** Studio owns colors + borders + shadows; reuses neutral shared tokens
  (spacing, radius, font-size, font-family) from `index.css`.
- **Overlay:** rewrite `src/renderer/safety/` only (treated as Studio tooling); the overlay
  becomes CSS-driven and `config.ts` is **deprecated, not deleted** (kept for future
  safe-area presets). `Slide.tsx`, renderer layouts/CSS, and exported output stay byte-identical.

## Phase A — Studio Theme

1. Create `src/studio/theme.css` — tokens scoped to `.studio`, organized into groups for
   easier maintenance:
   - **Surface** — `--studio-bg` (#16161a workspace), `--studio-bg-surface`, `--studio-bg-elevated`
   - **Border** — `--studio-border`, `--studio-border-strong`
   - **Text** — `--studio-text`, `--studio-text-muted`, `--studio-text-dim`
   - **Accent** — `--studio-accent`, `--studio-bg-active`
   - **Status** — `--studio-warning`, `--studio-danger`
   - **Shadow** — `--studio-shadow-sm`, `--studio-shadow-md`
2. Refactor `src/studio/Studio.css`: replace every `var(--color-*)` with `--studio-*`;
   give `.studio` a workspace `background` + `color`; add real (non-transparent) borders and
   subtle drop shadows on toolbar / sidebar / panels so it reads as an editor.
3. Import `theme.css` in `src/studio/Studio.tsx` (before `Studio.css`).

**Validation:** zero `var(--color-*)` left in Studio CSS; `npm run build` clean; Studio renders
with editor background distinct from slide brand background.

## Phase B — Preview Isolation

The Preview owns exactly three things and nothing else:

1. **Zoom** — the preview scale (25/50/75/100%), set via `--slide-scale` inline style.
2. **Centering** — the slide is centered in the preview viewport.
3. **Scrolling** — the preview viewport scrolls when the slide exceeds it.

Nothing else. No theme paint, no brand chrome, no geometry, no layout overrides.

Tasks:
1. Delete `.studio-preview__slide { --slide-scale: 0.5 }` from `Studio.css` (scale is owned by
   `Preview.tsx` state + inline style).
2. Confirm `.studio-preview` only scales / centers / scrolls.

**Validation:** `--slide-scale` inline matches the selected button at 25/50/75/100%; slide box
= 1080px × scale; centered + scrollable.

## Phase C — Safe Overlay (purely visual)

1. Rewrite `SafetyOverlay.css`:
   - `.safety-overlay` unchanged (`absolute inset 0`, `z-index`, `pointer-events: none`).
   - `.safety-overlay__canvas` and `.safety-overlay__profile-grid` → `inset: 0`.
   - `.safety-overlay__safe-area` →
     `top/right/bottom/left: calc(var(--slide-padding-y) / (var(--slide-padding-x)) /
     (var(--slide-padding-bottom)) * var(--slide-scale))` — equals the `.slide__canvas` content
     box exactly (single source of truth).
   - Crosshair unchanged.
2. Rewrite `SafetyOverlay.tsx`: drop `SAFETY_CONFIG` + JS geometry; render the fixed layers.
3. **Deprecate** `src/renderer/safety/config.ts` — do **not** delete it. The overlay becomes
   CSS-driven today, but the configuration object is kept (unused) for future extensibility,
   e.g. safe-area presets (Instagram / LinkedIn / X / TikTok). Remove the `SAFETY_CONFIG`
   export from `safety/index.ts` so the deprecated module has no consumers; keep the file with
   a deprecation marker.

**Validation:** overlay safe-area coincides with `.slide__canvas` content box at 25/50/75/100%;
no live `SAFETY_CONFIG` references remain; `Slide.tsx`/`index.css` untouched.

## Phase D — Studio QA (verification only)

1. `npm run build` clean.
2. Studio looks like an editor (computed styles + pixel check: workspace bg ≠ slide brand bg;
   surfaces/borders/shadows present).
3. Renderer looks like the brand (slide bg `#1a0f08`, palette unchanged; export PNGs
   byte-identical to pre-milestone captures).
4. Export matches renderer (Studio preview @100% vs `/export` PNG diff, tolerance).
5. **Studio theme changes do not modify exported PNGs** — the exports must be **byte-identical**
   to the pre-milestone captures. If changing Studio CSS changes a PNG, the milestone failed.
6. Overlay never changes exports (slide box identical with overlay on/off; export PNGs contain
   no overlay colors; `ExportView` always `show:false`).

## Do-not-touch

`Slide.tsx`, `layouts/*`, `components/ui/*`, `components/slide/*`, `index.css`,
brand color tokens, carousel data, `src/export/*`, `production/export/*`.
