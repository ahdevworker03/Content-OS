import type { SlideData } from "../types";
import {
  BulletListSlide,
  ArrowListSlide,
  GridSlide,
  BoxListSlide,
  CtaSlide,
  PersonalCover,
  PersonalStory,
  PersonalFocus,
  PersonalSequence,
  PersonalComparison,
  PersonalEvidence,
  PersonalClosing,
} from "../layouts";
import UnsupportedSlide from "./UnsupportedSlide";

type SlideRendererProps = {
  slide: SlideData;
};

export default function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.layout) {
    case "cover":
      return <PersonalCover slide={slide} />;
    case "story":
      return <PersonalStory slide={slide} />;
    case "focus":
      return <PersonalFocus slide={slide} />;
    case "sequence":
      return <PersonalSequence slide={slide} />;
    case "comparison":
      return <PersonalComparison slide={slide} />;
    case "evidence":
      return <PersonalEvidence slide={slide} />;
    case "closing":
      return <PersonalClosing slide={slide} />;
    case "bullet-list":
      return (
        <BulletListSlide
          title={slide.title}
          items={slide.items}
          label={slide.label}
          summary={slide.summary}
        />
      );
    case "arrow-list":
      return (
        <ArrowListSlide
          title={slide.title}
          items={slide.items}
          sectionTag={slide.sectionTag}
          sectionTagVariant={slide.sectionTagVariant}
          bigNumber={slide.bigNumber}
        />
      );
    case "grid":
      return (
        <GridSlide
          title={slide.title}
          items={slide.items}
          sectionTag={slide.sectionTag}
          sectionTagVariant={slide.sectionTagVariant}
          bigNumber={slide.bigNumber}
        />
      );
    case "box-list":
      return (
        <BoxListSlide
          title={slide.title}
          items={slide.items}
          sectionTag={slide.sectionTag}
          sectionTagVariant={slide.sectionTagVariant}
          label={slide.label}
        />
      );
    case "cta":
      return (
        <CtaSlide
          badge={slide.badge}
          title={slide.title}
          subtitle={slide.subtitle}
          label={slide.label}
          bulletRows={slide.bulletRows}
          quote={slide.quote}
          cta={slide.cta}
        />
      );
    case "__unsupported":
      return <UnsupportedSlide layout={slide.originalLayout} />;
    default: {
      const exhaustive: never = slide;
      return <UnsupportedSlide layout={String(exhaustive)} />;
    }
  }
}
