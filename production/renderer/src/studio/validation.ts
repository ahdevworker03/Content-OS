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
      if (slide.subtitle.trim() === "") {
        warnings.push({
          severity: "warn",
          message: "Missing subtitle",
          slideIndex: index,
        });
      }
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
      if (slide.badge.trim() === "") {
        warnings.push({
          severity: "warn",
          message: "Missing badge",
          slideIndex: index,
        });
      }
      if (slide.subtitle.trim() === "") {
        warnings.push({
          severity: "warn",
          message: "Missing subtitle",
          slideIndex: index,
        });
      }
      break;
  }

  return warnings;
}

export function validateCarousel(carousel: Carousel): ValidationWarning[] {
  return carousel.slides.flatMap((slide, index) => validateSlide(slide, index));
}
