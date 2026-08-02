import type { SlideData } from "../types";
import {
  CoverSlide,
  BulletListSlide,
  ArrowListSlide,
  GridSlide,
  BoxListSlide,
  CtaSlide,
} from "../layouts";
import UnsupportedSlide from "./UnsupportedSlide";

type SlideRendererProps = {
  slide: SlideData;
};

export default function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.layout) {
    case "cover":
      return (
        <CoverSlide
          title={slide.title}
          subtitle={slide.subtitle}
          username={slide.username}
        />
      );
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
          footerName={slide.footerName}
          footerHandle={slide.footerHandle}
        />
      );
    case "__unsupported":
      return <UnsupportedSlide layout={slide.originalLayout} />;
  }
}
