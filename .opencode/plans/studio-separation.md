# Studio UX/UI — Fixes & Enhancements

## Context

The renderer and export pipeline stay frozen. Studio UI bugs/UX gaps reported across
sidebar, header, debug/inspector, zoom, export, and styling. All paths below are
relative to `production/renderer/`.

**Confirmed decisions:**

- **Export:** client-side download modal (PNG ZIP + PDF) in Studio; `/export` route +
  Playwright pipeline untouched (export QA stays byte-identical).
- **Editing:** in-memory only (no writes to JSON files).
- **Color:** amber brand accent (`#f5a84a` / `#e07b20`) on neutral graphite surfaces;
  surfaces stay neutral.
- **Plan file:** replaces the old (temporary) studio-separation plan.

## Phase 1 — Sidebar: slide cards

1. New `src/studio/SlideCard.tsx`: renders a scaled `SlideRenderer` thumbnail
   (`--slide-scale ≈ 0.2`), slide-number overlay, layout pill badge (top-right:
   Cover / Box List / CTA / …), and RTL title with ellipsis + `title` tooltip.
2. Rework `src/studio/Sidebar.tsx` to use cards; widen sidebar to ~260px, item padding
   12–16px; keep active highlight.
3. CSS in `src/studio/Studio.css` (cards, pills, overlays, RTL direction, hover tooltip).

**Validation:** 8 thumbnails render correctly, layout pills present, Arabic titles read
correctly (RTL, no broken punctuation), hover shows full title, build clean.

## Phase 2 — Header hierarchy

1. Rework `src/studio/Toolbar.tsx`: left = brand + project name; center = status
   (`8 slides · Saved`); right = actions.
2. Relabel data-source pill → `Data Source: Local` / `Data Source: Workspace`.
3. Move `v1.0.0` out of header into a small `AboutModal.tsx` (triggered by a
   Settings/ℹ action).
4. CSS updates.

**Validation:** header reads as a product UI (no raw dev strings); version only in
About; build clean.

## Phase 3 — Inspector panel + dev-only debug

1. `src/studio/useCarousel.ts`: add `updateSlide(index, patch)` (merge + re-validate)
   for in-memory edits.
2. New `src/studio/InspectorPanel.tsx` (right sidebar): structured inputs for Title,
   Subtitle, Username, items — bound to live preview. Replaces bottom raw-JSON panel as
   the primary surface.
3. Keep raw JSON behind a dev-only toggle (`import.meta.env.DEV`); `DebugPanel` gated
   so end-users never see it.
4. Move validation warnings into the inspector (or keep as slim bottom strip).

**Validation:** editing a field updates the preview live; raw JSON invisible in a
production build; build clean.

## Phase 4 — Zoom: auto-fit + minimal pill

1. Default = **Fit to Screen** via `ResizeObserver` (scale = min(availW/1080,
   availH/1080)); remove fixed 25/50/75/100 buttons.
2. Minimal zoom pill bottom-right: `− · Fit · +`; optional `Ctrl`+scroll / pinch.
3. Update `src/studio/types.ts` (`Scale` → number + fit mode), `Preview.tsx`,
   `useCarousel.ts`.

**Validation:** slide fits container on resize; zoom pill overrides fit; preview still
centers + scrolls; build clean.

## Phase 5 — Export modal (downloads) ✅

1. Add deps: `html-to-image`, `jszip`, `jspdf` to `package.json`. ✅
2. New `src/studio/ExportModal.tsx`: grid previews with checkboxes + `Select All`;
   buttons **Download ZIP (PNGs)** and **Download PDF**. ✅
3. Capture selected slides off-screen via `html-to-image` at export resolution; `jszip`
   → ZIP; `jspdf` → one 1080×1080 page per slide. ✅ (2160×2160 @ 2×; 7-page PDF verified)
4. `/export` route, `src/export/*`, and `production/export/*` untouched. ✅

**Validation:** modal opens from Export; selection filters output; ZIP contains N PNGs;
PDF has N pages; `/export` page + Playwright captures byte-identical to pre-milestone.

## Phase 6 — Style refinements ✅

1. `src/studio/theme.css`: swap `--studio-accent` → amber `#f5a84a`,
   `--studio-bg-active` → amber tint; surfaces/text/borders stay graphite. ✅
2. Relabel `Safety Off/On` → clearer label (e.g., `Safe Area` / `Layout Guides`). ✅
3. Fullscreen: add subtle top spacing/overlay so the browser "press Esc" banner doesn't
   mask slide content (CSS handled by fullscreen state). ✅ (`.studio:fullscreen { padding-top: 28px }`)
4. Ensure focus rings/active borders use the amber accent. ✅

**Validation:** active highlights amber on neutral surfaces; safety label unambiguous;
fullscreen doesn't hide slide top; build clean.

## Do-not-touch

`Slide.tsx`, `layouts/*`, `components/ui/*`, `components/slide/*`, `index.css`,
brand color tokens, carousel data, `src/export/*`, `production/export/*`. Renderer
layouts and exported PNGs must remain byte-identical.
