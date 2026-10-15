# Carousel templates for abdallahhassoun.dev

This folder is a **personal visual layout catalog**. It is not one fixed eight-slide post and is not the default theme for the self-service Content OS product. The [Figma example](https://www.figma.com/design/o0BC0QyfCZPnUyQ8JJNXwu) is a reference for the palette, typography, spacing, and tone.

## What is here

- `types.ts`: presentation-only discriminated union for seven slide compositions.
- `catalog.ts`: agent selection guidance and bounded content validation.
- `CarouselTemplates.tsx`: pure React components, one per composition.
- `carousel.css`: 1080 × 1080 static styles for the personal account.
- `example.ts`: a text-only path based on the reviewed project-structure story.

The "type" is a **visual composition**, not a content pillar or compulsory story stage. A post may use the same composition more than once and skip the rest. There is no required slide count.

## Agent selection contract

1. Work from the real trigger and approved content. Do not manufacture a bug, result, screenshot, or code excerpt.
2. Decide the slide count and content before picking layouts. Choose each layout from `carouselTemplateCatalog` for its actual content shape. Do not generate CSS or JSX.
3. Use `leadIn` only when a short, conversational line adds context. Do not repeat series labels, English story-stage headings, slide counts, or “building in public” on the slides.
4. Use `evidence` only when the actual image or code is provided and approved for display. A text-only story is complete without it.
5. Keep one answerable question at the end when a question fits. Do not add a CTA solely to fill a closing template.
6. Run `validateCarousel`, then visually inspect the 1080 × 1080 preview and export. Character limits are early warnings, not proof that text fits.

## Integration into the existing app

The repository source was not supplied, so this code is an isolated implementation draft. Do not copy it wholesale over existing layouts. First inspect the real `types/index.ts`, `SlideRenderer.tsx`, `src/layouts/`, shared slide primitives, workspace adapter, Studio inspector, and validation path.

Reuse or restyle existing layouts where their data shape fits. Add only the genuinely new presentation variants to the renderer union and map them from the Content Model through the adapter. The layouts should receive renderer data, never workspace JSON. Keep the current preview/export rendering path; the exported PNG should match the Studio preview.

Supply Noto Sans Arabic and IBM Plex Mono in the app's font loading path. Check mixed Arabic/English lines, code direction, long titles, actual image cropping, safety margins, and real mobile viewing size. The example is demonstration data, not a mandated slide sequence.
