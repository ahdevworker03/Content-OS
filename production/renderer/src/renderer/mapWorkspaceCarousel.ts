import type {
  Carousel,
  SlideData,
} from "../types";

/**
 * Workspace carousel in the Content Model shape produced by Workflow 03.
 *
 * The carousel slides live inside the carousel platform variant:
 *   variants[].body.slides
 *
 * Each slide uses lowercase layout names and lowercase snake_case fields
 * (title, subtext, handle, section_tag, items[].text/accent, summary,
 * questions, highlight, cta, footer).
 */
type WorkspaceItem = { text?: string; accent?: boolean };
type WorkspaceFooter = { name?: string; role?: string; handle?: string };

type WorkspaceSlide = {
  layout?: string;
  number?: string;
  title?: string;
  subtext?: string;
  handle?: string;
  section_tag?: { text?: string; class?: string };
  subtag?: string;
  items?: WorkspaceItem[];
  summary?: string;
  questions?: string[];
  highlight?: string;
  cta?: string;
  footer?: WorkspaceFooter;
  swipe?: string;
  grid_items?: { label?: string; text?: string }[];
};

type WorkspaceCarousel = {
  variants?: Array<{
    format?: string;
    body?: {
      type?: string;
      slides?: WorkspaceSlide[];
    };
  }>;
};

/** Extract the section tag text from the Content Model slide's section_tag object. */
function sectionTagOf(slide: WorkspaceSlide): string | undefined {
  return slide.section_tag?.text?.trim() || undefined;
}

function mapSlide(slide: WorkspaceSlide): SlideData {
  const layout = slide.layout ?? "__unsupported";

  switch (layout) {
    case "cover":
      return {
        layout: "cover",
        title: slide.title ?? "",
        subtitle: slide.subtext ?? "",
        username: slide.handle || undefined,
      };

    case "box-list":
      return {
        layout: "box-list",
        title: slide.title ?? "",
        items: (slide.items ?? []).map((item) => ({
          heading: item.text ?? "",
          description: "",
          accent: item.accent ?? false,
        })),
        sectionTag: sectionTagOf(slide),
        label: slide.subtag || undefined,
      };

    case "arrow-list":
      return {
        layout: "arrow-list",
        title: slide.title ?? "",
        // ArrowItem has no accent field; only the text is rendered.
        items: (slide.items ?? []).map((item) => ({ text: item.text ?? "" })),
        sectionTag: sectionTagOf(slide),
      };

    case "bullet-list":
      return {
        layout: "bullet-list",
        title: slide.title ?? "",
        items: (slide.items ?? []).map((item) => ({
          text: item.text ?? "",
          highlight: item.accent ?? false,
        })),
        // BulletListSlide has no sectionTag — the tag renders as the label.
        label: slide.subtag || sectionTagOf(slide),
        summary: slide.summary || undefined,
      };

    case "final-cta":
      return {
        layout: "cta",
        badge: sectionTagOf(slide) ?? "",
        title: slide.title ?? "",
        // subtitle is not rendered while bulletRows are present.
        subtitle: "",
        bulletRows: slide.questions,
        quote: slide.highlight || undefined,
        cta: slide.cta || undefined,
        footerName: slide.footer
          ? [slide.footer.name, slide.footer.role].filter(Boolean).join(" · ") || undefined
          : undefined,
        footerHandle: slide.footer?.handle || undefined,
      };

    case "grid":
    case "grid-2x2":
      return {
        layout: "grid",
        title: slide.title ?? "",
        items: (slide.grid_items ?? []).map((item) => ({
          label: item.label ?? "",
          value: item.text ?? "",
        })),
        sectionTag: sectionTagOf(slide),
      };

    default:
      // slide.swipe and slide.number have no renderer equivalent — ignored.
      return {
        layout: "__unsupported",
        originalLayout: layout,
      };
  }
}

export function mapWorkspaceCarousel(raw: WorkspaceCarousel): Carousel {
  const carouselVariant = (raw.variants ?? []).find(
    (v) => v.format === "carousel" || v.body?.type === "carousel",
  );
  const slides = carouselVariant?.body?.slides ?? [];
  return { slides: slides.map(mapSlide) };
}