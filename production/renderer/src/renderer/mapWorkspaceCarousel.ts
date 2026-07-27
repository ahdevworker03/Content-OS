import type {
  Carousel,
  SlideData,
} from "../types";

type WorkspaceSlide = {
  TYPE_COVER?: true;
  TYPE_BOX_LIST?: true;
  TYPE_GRID_2X2?: true;
  TYPE_BULLET_LIST?: true;
  TYPE_FINAL_CTA?: true;
  TITLE?: string;
  NUMBER?: string;
  LABEL?: string;
  TEASERS?: string[];
  BOX_ITEMS?: { TEXT?: string; ACCENT?: true }[];
  GRID_ITEMS?: { LABEL?: string; TEXT?: string }[];
  BULLET_ITEMS?: { TEXT?: string; ACCENT?: true }[];
  CTA?: string;
  SUMMARY?: string;
  FINAL_BULLET_ROWS?: { TEXT?: string }[];
};

type WorkspaceCarousel = {
  PAGE_TITLE?: string;
  SLIDES?: WorkspaceSlide[];
};

const KNOWN_TYPES = new Set([
  "TYPE_COVER",
  "TYPE_BOX_LIST",
  "TYPE_GRID_2X2",
  "TYPE_BULLET_LIST",
  "TYPE_FINAL_CTA",
]);

function detectLayout(slide: Record<string, unknown>): string {
  if (slide.TYPE_COVER) return "cover";
  if (slide.TYPE_BOX_LIST) return "box-list";
  if (slide.TYPE_GRID_2X2) return "grid";
  if (slide.TYPE_BULLET_LIST) return "bullet-list";
  if (slide.TYPE_FINAL_CTA) return "cta";

  const found = Object.keys(slide).find(
    (k) => k.startsWith("TYPE_") && !KNOWN_TYPES.has(k),
  );
  return found ?? "__unsupported";
}

function mapSlide(slide: WorkspaceSlide): SlideData {
  const layout = detectLayout(slide);

  switch (layout) {
    case "cover":
      return {
        layout: "cover",
        title: slide.TITLE ?? "",
        subtitle: (slide.TEASERS ?? []).join(" "),
      };

    case "box-list":
      return {
        layout: "box-list",
        title: slide.TITLE ?? "",
        items: (slide.BOX_ITEMS ?? []).map((item) => ({
          heading: item.TEXT ?? "",
          description: "",
        })),
      };

    case "grid":
      return {
        layout: "grid",
        title: slide.TITLE ?? "",
        items: (slide.GRID_ITEMS ?? []).map((item) => ({
          label: item.LABEL ?? "",
          value: item.TEXT ?? "",
        })),
      };

    case "bullet-list":
      return {
        layout: "bullet-list",
        title: slide.TITLE ?? "",
        items: (slide.BULLET_ITEMS ?? []).map((item) => ({
          text: item.TEXT ?? "",
          highlight: item.ACCENT ?? false,
        })),
      };

    case "cta":
      return {
        layout: "cta",
        badge: slide.LABEL ?? "",
        title: slide.TITLE ?? "",
        subtitle: slide.CTA ?? "",
      };

    default:
      return {
        layout: "__unsupported",
        originalLayout: layout,
      };
  }
}

export function mapWorkspaceCarousel(raw: WorkspaceCarousel): Carousel {
  const slides: SlideData[] = [];

  if (raw && Array.isArray(raw.SLIDES)) {
    for (const slide of raw.SLIDES) {
      if (slide && typeof slide === "object") {
        slides.push(mapSlide(slide));
      }
    }
  }

  return { slides };
}
