import type { PersonalCarousel, PersonalSlide } from "./types.ts";

export const carouselTemplateCatalog = {
  cover: {
    useWhen: "A specific moment or tension opens the post.",
    avoidWhen: "The title is generic or promises a lesson the post does not show.",
  },
  story: {
    useWhen: "One event needs a little context and optionally one emphasized line.",
    avoidWhen: "The body needs several steps or visual proof.",
  },
  focus: {
    useWhen: "One decision or realization should get most of the visual weight.",
    avoidWhen: "The statement merely repeats the title.",
  },
  sequence: {
    useWhen: "Two to four events or actions need to be read in order.",
    avoidWhen: "The items are unrelated tips assembled to fill a slide.",
  },
  comparison: {
    useWhen: "A genuine before and after can be stated in the creator's own terms.",
    avoidWhen: "There was no real change or one side is invented for symmetry.",
  },
  evidence: {
    useWhen: "A real screenshot or code excerpt makes the claim easier to understand.",
    avoidWhen: "No real artifact is available or its details cannot be shown safely.",
  },
  closing: {
    useWhen: "A concrete takeaway or one answerable question ends the post.",
    avoidWhen: "It repeats several points or asks multiple engagement questions.",
  },
} as const;

export type TemplateName = keyof typeof carouselTemplateCatalog;

export function validateCarousel(carousel: PersonalCarousel): string[] {
  const issues: string[] = [];
  if (!carousel.slides.length) issues.push("The carousel has no slides.");
  if (carousel.slides[0]?.template !== "cover") {
    issues.push("Start with a cover that gives the post a specific entry point.");
  }

  const ids = new Set<string>();
  carousel.slides.forEach((slide, index) => {
    const at = `Slide ${index + 1}`;
    if (!slide.id.trim() || ids.has(slide.id)) issues.push(`${at}: id is empty or duplicated.`);
    ids.add(slide.id);
    if (slide.leadIn && slide.leadIn.length > 48) issues.push(`${at}: lead-in is too long.`);

    const requireText = (value: string, field: string, limit: number) => {
      if (!value.trim()) issues.push(`${at}: ${field} is empty.`);
      if (value.length > limit) issues.push(`${at}: ${field} may overflow; shorten or split it.`);
    };

    switch (slide.template) {
      case "cover":
        requireText(slide.title, "title", 115);
        break;
      case "story":
        requireText(slide.title, "title", 110);
        requireText(slide.body, "body", 230);
        break;
      case "focus":
        requireText(slide.title, "title", 95);
        requireText(slide.statement, "statement", 145);
        break;
      case "sequence":
        requireText(slide.title, "title", 100);
        if (slide.items.length < 2 || slide.items.length > 4) {
          issues.push(`${at}: sequence needs two to four items.`);
        }
        slide.items.forEach((item, itemIndex) =>
          requireText(item, `item ${itemIndex + 1}`, 110),
        );
        break;
      case "comparison":
        requireText(slide.title, "title", 100);
        requireText(slide.before.text, "before", 135);
        requireText(slide.after.text, "after", 135);
        break;
      case "evidence":
        requireText(slide.title, "title", 100);
        if (slide.evidence.kind === "image") {
          requireText(slide.evidence.src, "image source", 2000);
          requireText(slide.evidence.alt, "image description", 180);
        } else {
          requireText(slide.evidence.code, "code", 750);
          if (slide.evidence.code.split("\n").length > 11) {
            issues.push(`${at}: code excerpt has more than 11 lines.`);
          }
        }
        break;
      case "closing":
        requireText(slide.question, "question", 165);
        break;
      default: {
        const impossible: never = slide;
        issues.push(`${at}: unsupported template ${String(impossible)}.`);
      }
    }
  });

  return issues;
}

/** Selection is editorial. This guard prevents the agent from inventing evidence. */
export function canUseEvidence(slide: PersonalSlide): boolean {
  return slide.template === "evidence" &&
    (slide.evidence.kind === "image"
      ? Boolean(slide.evidence.src.trim() && slide.evidence.alt.trim())
      : Boolean(slide.evidence.code.trim()));
}
