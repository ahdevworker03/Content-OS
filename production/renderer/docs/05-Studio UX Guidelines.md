# Studio UX Guidelines

## 1. Purpose

This document defines how the Studio should *behave from the user's perspective*. It is not about implementation — components, state, or CSS — but about the experience a person has while using the tool.

The Studio's job is to help a content creator see a carousel exactly as it will appear on a social platform, iterate on the copy quickly, and get the slides out as finished assets. Every UX decision — from where a button sits to what happens when an error occurs — should be traceable back to one principle in this document.

This is a living reference. When a new feature or interaction is proposed, the question is not "how do we build it" but "does it fit the principles below?" If it does not, either the feature or the principles need to change — deliberately, not by accident.

---

## 2. User Experience Philosophy

The Studio is a **single-purpose tool**, not a general editor. It does one workflow well and refuses to become a general-purpose design application.

The following principles are ordered by priority. When they conflict, the earlier one wins.

### 2.1 The preview is the source of truth

What the user sees in the preview **is** what they export. There is no hidden rendering path, no approximation, no "looks good here, looks different in the file." The same `SlideRenderer` renders the preview, the sidebar thumbnails, and the exported assets. The moment a user can no longer trust that the preview equals the output, the Studio has failed.

**Consequences:**

- The preview shows the real slide, not a wireframe or a placeholder.
- Export uses the identical rendering as preview — only the capture mechanism differs.
- Safety guides are a preview-only overlay and never appear in exported output.

### 2.2 The Studio is a scratch space, not a source of truth

The carousel data lives in files (`workspace/carousel.json`). The Studio loads it, lets the user experiment, and then discards the experiment. The Studio must feel **safe to fiddle with** — the user should never worry that a bad keystroke has corrupted their content.

**Consequences:**

- Edits are in-memory and never written back to disk without an explicit, separate action.
- There is no "save" gesture because there is nothing to save; the toolbar's "Saved" indicator reflects that the data came from a stable source, not that edits are persisted.
- Closing the page discards edits, which is acceptable *because* that fact is always true and never surprising.

### 2.3 Reveal, don't explain

The Studio prefers showing a user what is happening over telling them. A warning appears next to the field it concerns, not in a dialog they must dismiss. A slide's state is visible in its thumbnail before the user clicks it.

**Consequences:**

- Feedback lives in the context where the user is looking, not in a separate log.
- Explanation text is minimal and only appears where an affordance would otherwise be ambiguous.

### 2.4 Do nothing destructive silently

The Studio has few destructive actions (export overwrites nothing; edits are ephemeral). What destructive actions it has are always reversible or clearly signalled. No action should surprise the user into losing work.

### 2.5 Optimise for the confident user, accommodate the curious one

The primary user knows what a carousel is, wants to check it, tweak copy, and export. They should be able to do all of that with zero instruction. Secondary users — someone exploring, a collaborator, a future maintainer — should be able to understand what they are looking at without reading documentation.

---

## 3. Desktop-First Workflow

The Studio is a **desktop tool**. It is optimised for a keyboard-and-mouse operator with a wide viewport. Touch and small screens are not first-class targets and should not be allowed to distort the desktop experience.

### 3.1 Principles

- **Assume a full-size browser window.** The Studio is used deliberately, at a desk, with room to spare. The three-pane layout (sidebar / preview / inspector) should feel natural and never cramped at typical desktop sizes.
- **Never shrink content to fit a phone.** If the viewport is too small, the layout degrades gracefully (panes narrow, then wrap or clip) rather than hiding essential controls.
- **The slide canvas is the fixed point.** A slide is 1080×1080. That square is the only element the user cares about precisely. Everything else in the UI exists to serve it.
- **Scrolling belongs to lists, not to the work surface.** The sidebar and inspector scroll; the preview stays put and scales the slide to fit.

### 3.2 What desktop-first rules out

- Gesture-dependent interactions (pinch, swipe) as the *only* way to do something.
- Hover-only discoverability for primary actions (hover is fine as an enhancement, never as a requirement).
- Layouts that assume a viewport width of less than ~1024px.

---

## 4. Editing Workflow

The core loop is: **select a slide → inspect its fields → edit → see the change → move on.** The user repeats this for every slide in the carousel.

### 4.1 The loop must be tight

- Editing is **direct and immediate**. Typing in the inspector updates the preview live, with no "apply" button and no round-trip delay.
- Every editable field is editable in one place: the inspector. There is no editing inside the preview, and no second editor hidden elsewhere.
- The loop must never require the user to remember a shortcut or menu path. Point, click, type, done.

### 4.2 What is editable

The Studio edits **text content** — titles, subtitles, labels, list items, CTA copy. It is not a layout editor: the user cannot move elements, change colors, or redesign a slide from the Studio. That boundary is intentional and should be respected rather than gradually eroded.

If a future feature wants visual editing, it should be justified against §2.1 and §2.2 first — it must not break "preview equals output" and must not imply a persistence model that does not exist.

### 4.3 Edit scope follows selection

The inspector always reflects the **currently selected slide**, and only that slide. There is no multi-slide editing, no "apply to all" in the inspector, and no cross-slide operation hidden behind a subtle control. Multi-slide operations (select many, export many) belong to the export modal, where their scope is explicit.

### 4.4 Edits never break the preview

Editing must never put the Studio into a state where the preview can't render. Empty strings are legal and render as empty; unsupported layouts degrade to a visible "unsupported" state rather than crashing. The user can always see *something*, and can always undo by typing again.

---

## 5. Navigation Principles

Navigation answers one question constantly: **"where am I, and how do I get to the slide I want?"**

### 5.1 Navigation is linear and predictable

Slides are an ordered list. Navigation moves through that list. There is no branching, no tabs, no hidden slide groups. The user always knows that "next" means the next slide in the carousel.

### 5.2 Three ways to navigate, one mental model

The Studio offers three navigation mechanisms, all expressing the same single index:

| Mechanism | Use | Feel |
|---|---|---|
| Sidebar cards | Jump to any slide, read the list | Browsing |
| Arrow keys | Step through in order | Reviewing |
| Current-index state | Programmatic "go to" | (Internal) |

None of these is a separate navigational space. Clicking a card, pressing an arrow, and being told "go to slide 3" all land on the same place and keep the sidebar and inspector in sync.

### 5.3 State is always visible

- The current slide is highlighted in the sidebar.
- The inspector header names the slide and its layout.
- The toolbar shows the total slide count.

The user should be able to answer "where am I" by glancing at any pane, without moving focus.

### 5.4 Navigation must not lose context

Moving between slides preserves everything the user is not editing: zoom level persists, the safety-guide toggle persists, the selection of slides in the export modal persists. Only the *subject* of inspection changes.

---

## 6. Sidebar Behavior

The sidebar is the **map** of the carousel. It is the place the user looks to understand the shape of the whole thing.

### 6.1 Show the whole carousel at a glance

- One card per slide, in order, numbered.
- Each card shows a **thumbnail** (a real mini-render of the slide, not an icon), the layout type as a small pill, and the title (truncated with a tooltip, not clipped silently).
- The count is always visible in the header.

### 6.2 The active slide is unambiguous

The selected card is visually distinct (accent border and background). Exactly one card is active at any time. There is no "hover preview" state that competes with "selected" — hover is a lighter hint, selection is definitive.

### 6.3 Clicking is committing

Clicking a card selects that slide — it does not open a menu, start a rename, or require a double-click. Single click selects. There is no ambiguity about what a click does.

### 6.4 The sidebar scrolls independently

The sidebar is a list and may scroll if there are many slides. The preview does not scroll to follow; the sidebar does not auto-scroll to the active card if the user has scrolled away (or, if it does, it does so without yanking focus). The user's position in the list is their own.

---

## 7. Inspector Behavior

The inspector is where the user's hands are, most of the time. It must feel like a **form**, not a control panel.

### 7.1 It is the mirror of the selected slide

The inspector shows **exactly the fields of the current slide's layout**, nothing more. A cover slide shows title/subtitle/username; a CTA shows its badge/title/CTA/footer fields. Fields that don't apply are not shown (never greyed-out as a group of irrelevancies).

### 7.2 Fields are labelled and self-explanatory

Every input has a visible label. Labels use plain words ("Title", "Subtitle", "Items") rather than internal field names (`slide_title`, `items[].text`). The user should never need the content model to understand what to type.

### 7.3 Inputs are natural for their content

- Short text → single-line input.
- Paragraphs / multi-line copy → textarea with room to breathe.
- Lists → a stacked list of inputs, one per item, preserving order.

The text inputs respect content direction (the copy is RTL, so inputs render and align right-to-left where appropriate).

### 7.4 Warnings live in the inspector

Validation feedback (see §13) appears at the top of the inspector, near the fields that caused it. A warning names the problem in a human sentence, not a rule ID.

### 7.5 The inspector never blocks the user

Warnings are advisory. They do not prevent editing, do not lock fields, and do not block export. The user can always keep working and can always see *why* the tool thinks something is wrong.

---

## 8. Preview Behavior

The preview is the heart of the Studio. Everything else serves it.

### 8.1 Always show the real slide

The preview renders the actual current slide at its true 1080×1080 aspect ratio. The slide is scaled to fit, but its proportions and content are never distorted, cropped, or stylised.

### 8.2 Auto-fit is the default

On load and whenever the window changes, the preview **fits the slide to the available space** — the largest scale that keeps the whole square visible. The user never has to hunt for a missing "reset" when they first open the tool.

### 8.3 Empty state is calm

If there are no slides, the preview shows a single quiet "No slides" message. It does not show a broken layout, a spinner that never ends, or a wall of stack traces.

### 8.4 The preview is not a navigation surface

The preview displays the selected slide. It does not respond to clicks as navigation, does not offer on-canvas editing, and does not have hidden click targets. The one exception — the zoom pill — is explicitly a preview control and is visually separated from the slide.

---

## 9. Zoom Behavior

Zoom is a **viewing aid**, never an editing aid. It changes how closely the user inspects the slide, and nothing else.

### 9.1 Fit is the home position

The zoom control is anchored around a **Fit** state: the slide is scaled to the viewport. The pill shows the current percentage and, when fitting, is labelled "Fit". Clicking Fit always returns to this home position, from any zoom level.

### 9.2 Zoom is bounded and gentle

- Zoom in and out step smoothly (small, predictable factors), never jumping from 10% to 200% in one click.
- Zoom is clamped to a sane range (roughly 10% to 300%). The user cannot zoom so far out the slide disappears, nor so far in they get lost.
- The pill always shows the real current percentage.

### 9.3 Zoom is visually obvious

The zoom control lives in a fixed corner of the preview (bottom-right), does not overlap the slide's focal point, and its three controls (−, percentage/Fit, +) are self-explanatory. There is a keyboard path for power users, but the buttons are the primary, discoverable interface.

### 9.4 Zoom never affects output

Zooming in does not make the export larger; zooming out does not make it smaller. Export is always captured at the slide's true resolution. The user should never be able to accidentally export a low-resolution slide by zooming out. (See §11.)

---

## 10. Export Workflow

Export is the moment of truth. It must be **deliberate, transparent, and error-free**.

### 10.1 Export is a separate, focused step

Export is not a toolbar side-effect; it opens a dedicated modal. The modal is the only place where "what am I exporting?" is answered, and it is where the user commits.

### 10.2 The user chooses exactly what to export

- The modal shows every slide as a thumbnail, with a per-slide checkbox.
- "Select all" toggles the whole set.
- The count of selected slides is always visible.
- The export actions are disabled until there is at least one selected slide.

The user never has to guess whether "export" means "this slide" or "everything" — the selection is visible and editable.

### 10.3 Formats are explicit

The two outputs — **ZIP of PNGs** and **PDF** — are labelled by what they produce, not by internal names. The user understands the difference without reading documentation.

### 10.4 Export gives feedback for its duration

Exporting many slides takes a moment. During that time the buttons show a busy state and the modal does not silently accept further clicks. When it finishes, the file downloads. The user is never left wondering whether anything happened.

### 10.5 Export is always full fidelity

Exported slides are captured at the true 1080×1080 resolution (at the appropriate pixel ratio), never at the on-screen zoom. Safety guides and Studio chrome are never captured. What comes out is the slide, exactly, and nothing else.

### 10.6 Failure is visible, not silent

If export fails, the user learns about it (see §14). It does not fail quietly while appearing to have succeeded.

---

## 11. Modal Behavior

Modals are rare and purposeful. The Studio uses two (About, Export); the rules below govern them and any future modal.

### 11.1 A modal is a temporary interruption, not a destination

A modal asks one focused question or exposes one focused tool. When the user is done, they return to the Studio exactly where they were — same slide selected, same zoom, same layout.

### 11.2 Closing is always available and obvious

- A visible close button (×) in a consistent corner.
- Clicking the backdrop closes the modal.
- Escape closes the modal.

All three should work. Closing must not depend on finding a subtle affordance.

### 11.3 A modal never loses work

Closing a modal discards only the modal's own transient state (e.g., an in-progress export selection), never the Studio's state. Where losing that transient state would be meaningful, the modal makes it obvious or prevents accidental dismissal while busy (e.g., an export in progress blocks the close button).

### 11.4 One modal at a time, focus contained

A modal dims the Studio behind it. Keyboard focus stays within the modal. The user is not left tabbing into hidden controls behind the overlay.

---

## 12. Keyboard Interactions

Keyboard support exists for **efficiency**, not as an alternative hidden interface. Every keyboard action has a visible, discoverable equivalent.

### 12.1 Arrow keys navigate slides

Left and right arrows step through the carousel (previous/next). They wrap nowhere — at the ends the keys do nothing, matching the visual fact that there is no previous/next slide. This is the fastest way to review a carousel, and it mirrors the sidebar's ordering.

### 12.2 Modifier+scroll zooms

`Ctrl`/`Cmd`+scroll zooms the preview, matching the user's muscle memory from image editors and browsers. Plain scroll does *not* zoom (it scrolls the preview area), so casual scrolling never surprises the user with an unwanted zoom.

### 12.3 Escape closes

Escape closes the active modal. It does nothing when no modal is open.

### 12.4 Accessibility is a floor, not an afterthought

- Focus is visible (a clear focus outline on interactive elements).
- Controls have accessible names (`aria-label`, titles) for screen readers.
- Every interactive element is reachable by keyboard, and every keyboard-reachable element is visibly interactive.

The Studio does not need to be a screen-reader showcase, but it must never be a keyboard trap.

---

## 13. Feedback Principles

The user should always know **what happened, what is happening, and what they can do next** — without being interrupted.

### 13.1 Immediate feedback

Every action produces an immediate, visible result:

- Typing → the preview updates as you type.
- Selecting a slide → the card highlights, the preview and inspector change.
- Toggling a control → the control's state changes visibly (e.g., "Layout Guides" ↔ "Safe Area").
- Starting an export → the button enters a busy state.

There is no "dead" action where the user clicks and nothing appears to happen.

### 13.2 Continuous feedback

Long-running work shows progress. The export buttons change to an "Exporting…" state for the duration. There is no long operation with zero feedback.

### 13.3 Status is readable, not chatty

The toolbar shows at-a-glance status: data source, slide count, saved state. These are passive indicators, not announcements. The user reads them when they want, and they never pop up to demand attention.

### 13.4 Feedback is in context

Warnings appear in the inspector next to the slide they describe. The zoom percentage lives in the zoom pill. The export count lives in the export modal footer. Feedback never requires the user to look somewhere unrelated to where they were acting.

---

## 14. Error Handling Philosophy

Errors fall into two families, and they are handled very differently.

### 14.1 Advisory errors are shown, not enforced

Content problems — an empty title, a missing subtitle, an unsupported layout — are **advisory**. They surface as warnings in the inspector with a clear severity (warn/error) and a human message. They do not block rendering, editing, or export. The user is trusted to decide.

### 14.2 Unsupported content degrades gracefully

If a slide's layout is not one the renderer knows, the Studio does not crash. The slide renders a visible "unsupported" state, the sidebar and inspector label it as such, and the rest of the carousel keeps working. The user can see what is wrong and, in the source data, fix it.

### 14.3 Operational failures are loud and truthful

If the tool itself fails — data can't load, export throws — it must not fail silently. The user sees a clear indication that something went wrong, with enough information to act. A silent "nothing happened" is the worst possible failure mode.

### 14.4 Never blame the user for a system failure

Error messages describe *what is wrong* and *what to do*, not *what the user did wrong*. An empty title is "Empty title", not "You forgot to enter a title." A failed export is "ZIP export failed", not "Your selection was invalid."

### 14.5 The Studio is never bricked

No single error may take down the whole tool. A bad slide degrades to unsupported; a bad export leaves the modal open and recoverable; a missing data source shows an empty state. The user can always keep working on everything else.

---

## 15. Responsive Behavior

The Studio is desktop-first (see §3), but it should never break at the edges of that assumption.

### 15.1 Fixed panes, fluid center

The sidebar and inspector have fixed widths; the preview takes the remaining space. As the window grows, the preview grows (and the slide auto-fits larger); as it shrinks, the preview shrinks first. The slide square is always fully visible, scaled down if necessary.

### 15.2 Degrade with dignity

If the viewport becomes genuinely too small, the Studio should degrade cleanly — panes narrow, content clips or scrolls — rather than overlapping, collapsing, or hiding essential controls without replacement. Essential controls (select, edit, export, zoom) remain reachable at every size where the tool is plausibly used.

### 15.3 The slide never distorts

Responsive behaviour never stretches or squashes the 1080×1080 canvas. The slide is scaled proportionally or not shown; it is never fitted by changing its aspect ratio.

---

## 16. Future UX Considerations

The following are anticipated directions. When they arrive, they should be judged against the principles above, not bolted on.

### 16.1 Side-by-side comparison

A future "compare" mode (two slides, or before/after a copy edit) fits the philosophy: it is a viewing aid, not a new source of truth, and must not imply a persistence model. It should live in the preview area and never complicate the export path.

### 16.2 Visual editing of layouts

Editing slide *layout* (not just text) is the most tempting extension and the most dangerous. It risks violating "preview equals output" (§2.1) and "scratch space, not source of truth" (§2.2) if it implies changes are saved. Any visual editor must produce the same canonical data a text edit would, and must remain ephemeral until an explicit export/commit path exists.

### 16.3 Undo / redo

Ephemeral in-memory edits make undo a natural future fit. It should be scoped to the editing session, keyboard-driven, and never imply persistence. It belongs to the inspector's edit flow, not to a global history.

### 16.4 Live collaboration

Collaboration would require a persistence and conflict model the Studio deliberately does not have today. It is a larger philosophical change than a feature — it redefines §2.2 — and should be treated as such if ever considered.

### 16.5 Accessibility hardening

Keyboard support and focus visibility exist as a floor. Future work can deepen screen-reader semantics (landmarks, live regions for validation) without changing the interaction model — it is an enhancement to §12, not a new paradigm.

### 16.6 Mobile / touch

The Studio is desktop-first by design. Supporting touch would mean re-litigating §3 and §4, not just adding breakpoints. If mobile support ever becomes a goal, it should be a deliberate product decision with its own guidelines, not a CSS retrofit.

---

## 17. Decision Checklist

Before changing any interaction, ask:

1. Does the preview still equal the output? (§2.1)
2. Is it still obvious that edits are ephemeral? (§2.2)
3. Does the primary loop (select → inspect → edit → see → move on) get tighter, or looser? (§4.1)
4. Is feedback shown in context, without a modal in the way? (§13)
5. Does any error leave the Studio bricked or silently broken? (§14)
6. Is there a visible, discoverable way to do whatever a new keyboard shortcut does? (§12)
7. Does export remain deliberate, transparent, and full-fidelity? (§10)
8. Am I adding a new source of truth instead of a viewing aid? (§2.2, §9, §16)

If a change fails one of these, it fails the Studio's design intent — reconsider the change, not the checklist.

---

## Summary

The Studio is a focused, desktop-first tool whose entire reason for being is: *show the slide truthfully, let the user iterate on the copy without fear, and get the assets out cleanly.* Every guideline here flows from those three ideas.

- **Truth** — the preview is the export; zoom is a viewing aid; guides never leak into output.
- **Safety** — edits are ephemeral; nothing destructive is silent; errors degrade, never brick.
- **Clarity** — one mental model of navigation; one place to edit; feedback in context; status readable at a glance; export deliberate and transparent.

When future UX decisions arise, they should be judged by whether they reinforce truth, safety, and clarity — and anything that does not should not ship.
