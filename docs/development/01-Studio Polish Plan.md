# Studio Polish Plan

## Goal

Transform the Carousel Studio from a developer-oriented editor into a polished, production-quality application while preserving the frozen renderer and export pipeline.

---

# Scope

The work focuses exclusively on the Studio.

Do not modify:

- Renderer architecture
- Slide layouts
- Slide rendering
- Export rendering
- Carousel data model

All exported slides must remain byte-identical.

---

# Phase 1 — Studio Design System

Goals

- Introduce a Studio-specific typography scale.
- Refine the Studio color palette.
- Improve surface hierarchy.
- Improve spacing.
- Improve shadows.
- Improve borders.
- Strengthen visual consistency.

---

# Phase 2 — Toolbar

Goals

- Simplify the header.
- Remove development-oriented metadata.
- Keep Carousel Studio branding.
- Improve button consistency.
- Update About dialog.

---

# Phase 3 — Sidebar

Goals

- Improve slide cards.
- Increase thumbnail readability.
- Improve spacing.
- Improve active state.
- Improve title presentation.
- Refine navigation experience.

---

# Phase 4 — Inspector

Goals

- Improve layout.
- Improve spacing.
- Improve typography.
- Improve form controls.
- Improve grouping.
- Improve overall editing experience.

---

# Phase 5 — Export Modal

Goals

- Remove transparency issues.
- Improve hierarchy.
- Improve selection feedback.
- Keep PNG as the primary workflow.
- Keep PDF available as a secondary export.
- Improve loading and completion feedback.

---

# Phase 6 — Responsive Design

Desktop

- Three-panel editor.

Tablet

- Overlay side panels.
- Compact toolbar.

Mobile

- Responsive navigation.
- Responsive inspector.
- Responsive toolbar.
- Responsive export modal.
- Maintain a usable editing experience.

---

# Phase 7 — Verification

Validate:

- Build succeeds.
- Desktop UX.
- Tablet UX.
- Mobile UX.
- Export workflow.
- ZIP export.
- PDF export.
- Renderer unchanged.
- Export output unchanged.

---

# Success Criteria

The milestone is complete when the Studio feels like a polished product rather than a development tool, while preserving the renderer, export pipeline, and generated slide output.
