import type {
  Carousel,
  SlideData,
} from "../types";

/**
 * Workspace carousel in the Content Model shape produced by Workflow 04.
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
  lead_in?: string;
  context?: string;
  body?: string;
  emphasis?: string;
  statement?: string;
  note?: string;
  before?: { label?: string; text?: string };
  after?: { label?: string; text?: string };
  question?: string;
  signoff?: string;
  evidence?: {
    kind?: string;
    code?: string;
    language?: string;
    asset?: string;
    alt?: string;
    caption?: string;
    conceptual?: boolean;
  };
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

function legacyFooterOf(slide: WorkspaceSlide) {
  const legacy = slide.footer;
  if (!legacy && !slide.handle) return undefined;
  return {
    name: legacy?.name || undefined,
    role: legacy?.role || undefined,
    handle: legacy?.handle || slide.handle || undefined,
  };
}

/** Workspace evidence assets are served from production/workspace/evidence/. */
function evidenceUrl(asset?: string): string {
  const path = asset?.trim().replace(/^\/+/, "");
  return path?.startsWith("evidence/") && !path.split("/").includes("..")
    ? `/${path}`
    : "";
}

function mapSlide(slide: WorkspaceSlide): SlideData {
  const layout = slide.layout ?? "__unsupported";
  const legacyFooter = legacyFooterOf(slide);

  switch (layout) {
    case "cover":
      return {
        layout: "cover",
        title: slide.title ?? "",
        subtitle: slide.subtext ?? "",
        username: slide.handle || undefined,
        context: slide.context || undefined,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "story":
      return {
        layout: "story",
        title: slide.title ?? "",
        body: slide.body ?? "",
        emphasis: slide.emphasis || undefined,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "focus":
      return {
        layout: "focus",
        title: slide.title ?? "",
        statement: slide.statement ?? "",
        note: slide.note || undefined,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "sequence":
      return {
        layout: "sequence",
        title: slide.title ?? "",
        items: (slide.items ?? []).map((item) => item.text ?? ""),
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "comparison":
      return {
        layout: "comparison",
        title: slide.title ?? "",
        before: { label: slide.before?.label ?? "", text: slide.before?.text ?? "" },
        after: { label: slide.after?.label ?? "", text: slide.after?.text ?? "" },
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "evidence": {
      const content = slide.evidence;
      const evidence = content?.kind === "code"
        ? { kind: "code" as const, code: content.code ?? "", language: content.language, caption: content.caption }
        : content?.kind === "diagram"
          ? { kind: "diagram" as const, src: evidenceUrl(content.asset), alt: content.alt ?? "", caption: content.conceptual ? content.caption || "Conceptual diagram" : content.caption }
          : { kind: "image" as const, src: evidenceUrl(content?.asset), alt: content?.alt ?? "", caption: content?.caption };
      return {
        layout: "evidence",
        title: slide.title ?? "",
        context: slide.context || undefined,
        evidence,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };
    }

    case "closing":
      return {
        layout: "closing",
        question: slide.question ?? slide.title ?? "",
        signoff: slide.signoff || undefined,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
      };

    case "cta":
    case "final-cta":
      return {
        layout: "closing",
        question: slide.title ?? "",
        signoff: slide.subtext || undefined,
        legacyQuestions: slide.questions,
        highlight: slide.highlight || undefined,
        cta: slide.cta || undefined,
        leadIn: slide.lead_in || undefined,
        legacyFooter,
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
        legacyFooter,
      };

    case "arrow-list":
      return {
        layout: "arrow-list",
        title: slide.title ?? "",
        // ArrowItem has no accent field; only the text is rendered.
        items: (slide.items ?? []).map((item) => ({ text: item.text ?? "" })),
        sectionTag: sectionTagOf(slide),
        legacyFooter,
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
        legacyFooter,
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
        legacyFooter,
      };

    default:
      // slide.swipe and slide.number have no renderer equivalent — ignored.
      return {
        layout: "__unsupported",
        originalLayout: layout,
        legacyFooter,
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
