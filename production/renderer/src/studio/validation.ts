import type { Carousel, SlideData } from "../types";
import type { ValidationWarning } from "./types";

function validateSlide(slide: SlideData, index: number): ValidationWarning[] {
  const warnings: ValidationWarning[] = [];

  if (slide.layout === "__unsupported") {
    warnings.push({
      severity: "error",
      message: `Unsupported layout: "${slide.originalLayout}"`,
      slideIndex: index,
    });
    return warnings;
  }

  if ("title" in slide && slide.title.trim() === "") {
    warnings.push({
      severity: "warn",
      message: "Empty title",
      slideIndex: index,
    });
  }

  switch (slide.layout) {
    case "cover":
      if (!slide.title.trim()) {
        warnings.push({ severity: "warn", message: "Missing cover title", slideIndex: index });
      }
      if (slide.subtitle.trim() === "" && !slide.context?.trim()) {
        warnings.push({
          severity: "warn",
          message: "Missing subtitle",
          slideIndex: index,
        });
      }
      break;

    case "story":
      if (!slide.title.trim()) warnings.push({ severity: "warn", message: "Missing story title", slideIndex: index });
      if (!slide.body.trim()) warnings.push({ severity: "warn", message: "Missing story body", slideIndex: index });
      if (slide.body.length > 230) warnings.push({ severity: "warn", message: "Story body may overflow; shorten or split it", slideIndex: index });
      break;

    case "focus":
      if (!slide.title.trim()) warnings.push({ severity: "warn", message: "Missing focus title", slideIndex: index });
      if (!slide.statement.trim()) warnings.push({ severity: "warn", message: "Missing focus statement", slideIndex: index });
      if (slide.statement.length > 145) warnings.push({ severity: "warn", message: "Focus statement may overflow; shorten it", slideIndex: index });
      break;

    case "sequence":
      if (slide.items.length < 2 || slide.items.length > 4) {
        warnings.push({ severity: "warn", message: "Sequence needs two to four items", slideIndex: index });
      }
      slide.items.forEach((item, itemIndex) => {
        if (!item.trim()) warnings.push({ severity: "warn", message: `Sequence item ${itemIndex + 1} is empty`, slideIndex: index });
      });
      break;

    case "comparison":
      if (!slide.before.label.trim() || !slide.before.text.trim()) warnings.push({ severity: "warn", message: "Missing before comparison content", slideIndex: index });
      if (!slide.after.label.trim() || !slide.after.text.trim()) warnings.push({ severity: "warn", message: "Missing after comparison content", slideIndex: index });
      break;

    case "evidence":
      if (slide.evidence.kind === "code") {
        if (!slide.evidence.code.trim()) warnings.push({ severity: "warn", message: "Missing supplied code evidence", slideIndex: index });
        if (slide.evidence.code.split("\n").length > 11) warnings.push({ severity: "warn", message: "Code excerpt exceeds 11 lines", slideIndex: index });
      } else {
        if (!/^\/evidence\/[\w./-]+$/.test(slide.evidence.src) || slide.evidence.src.includes("..")) {
          warnings.push({ severity: "warn", message: "Evidence asset must use a local /evidence/ path", slideIndex: index });
        }
        if (!slide.evidence.alt.trim()) warnings.push({ severity: "warn", message: "Missing evidence image description", slideIndex: index });
        if (slide.evidence.kind === "diagram" && !slide.evidence.caption?.toLowerCase().includes("conceptual")) {
          warnings.push({ severity: "warn", message: "Diagram must be identified as conceptual", slideIndex: index });
        }
      }
      break;

    case "closing":
      if (!slide.question.trim()) warnings.push({ severity: "warn", message: "Missing closing question or thought", slideIndex: index });
      if (slide.question.length > 165) warnings.push({ severity: "warn", message: "Closing question may overflow; shorten it", slideIndex: index });
      break;

    case "personal-cover":
      if (!slide.title.trim()) warnings.push({ severity: "warn", message: "Missing cover title", slideIndex: index });
      break;

    case "personal-trigger":
      if (!slide.body.trim()) warnings.push({ severity: "warn", message: "Missing trigger body", slideIndex: index });
      if (slide.body.length > 210) warnings.push({ severity: "warn", message: "Trigger body may overflow; shorten or split it", slideIndex: index });
      break;

    case "personal-belief":
      if (!slide.quote.trim()) warnings.push({ severity: "warn", message: "Missing belief quote", slideIndex: index });
      break;

    case "personal-friction":
      if (slide.items.length < 2 || slide.items.length > 4) warnings.push({ severity: "warn", message: "Friction needs two to four steps", slideIndex: index });
      slide.items.forEach((item, itemIndex) => {
        if (!item.trim()) warnings.push({ severity: "warn", message: `Friction step ${itemIndex + 1} is empty`, slideIndex: index });
      });
      break;

    case "personal-realization":
      if (!slide.statement.trim()) warnings.push({ severity: "warn", message: "Missing realization statement", slideIndex: index });
      if (slide.statement.length > 145) warnings.push({ severity: "warn", message: "Realization statement may overflow; shorten it", slideIndex: index });
      break;

    case "personal-decision":
      if (slide.evidence.kind === "code" && !slide.evidence.code.trim()) warnings.push({ severity: "warn", message: "Missing supplied code evidence", slideIndex: index });
      if (slide.evidence.kind !== "code" && (!/^\/evidence\/[\w./-]+$/.test(slide.evidence.src) || slide.evidence.src.includes(".."))) warnings.push({ severity: "warn", message: "Evidence asset must use a local /evidence/ path", slideIndex: index });
      if (slide.evidence.kind === "diagram" && !slide.evidence.caption?.toLowerCase().includes("conceptual")) warnings.push({ severity: "warn", message: "Diagram must be identified as conceptual", slideIndex: index });
      break;

    case "personal-takeaway":
      if (!slide.title.trim()) warnings.push({ severity: "warn", message: "Missing takeaway title", slideIndex: index });
      break;

    case "personal-closing":
      if (!slide.question.trim()) warnings.push({ severity: "warn", message: "Missing closing question or thought", slideIndex: index });
      if (slide.question.length > 165) warnings.push({ severity: "warn", message: "Closing question may overflow; shorten it", slideIndex: index });
      break;

    case "bullet-list":
      if (slide.items.length === 0) {
        warnings.push({
          severity: "warn",
          message: "Empty bullet list",
          slideIndex: index,
        });
      }
      break;

    case "arrow-list":
      if (slide.items.length === 0) {
        warnings.push({
          severity: "warn",
          message: "Empty arrow list",
          slideIndex: index,
        });
      }
      break;

    case "grid":
      if (slide.items.length === 0) {
        warnings.push({
          severity: "warn",
          message: "Empty grid items",
          slideIndex: index,
        });
      }
      break;

    case "box-list":
      if (slide.items.length === 0) {
        warnings.push({
          severity: "warn",
          message: "Empty box list",
          slideIndex: index,
        });
      }
      break;

    case "cta":
      if (slide.badge.trim() === "" && (slide.label ?? "").trim() === "") {
        warnings.push({
          severity: "warn",
          message: "Missing badge or label",
          slideIndex: index,
        });
      }
      // subtitle only renders when there are no bulletRows, so a final CTA
      // with questions (bulletRows) does not require a subtitle.
      if (slide.subtitle.trim() === "" && (slide.bulletRows ?? []).length === 0) {
        warnings.push({
          severity: "warn",
          message: "Missing subtitle or bullet rows",
          slideIndex: index,
        });
      }
      break;

    default: {
      const exhaustive: never = slide;
      return warnings.concat({ severity: "error", message: `Unhandled layout: ${String(exhaustive)}`, slideIndex: index });
    }
  }

  return warnings;
}

export function validateCarousel(carousel: Carousel): ValidationWarning[] {
  return carousel.slides.flatMap((slide, index) => validateSlide(slide, index));
}
