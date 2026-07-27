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
      return <CoverSlide title={slide.title} subtitle={slide.subtitle} />;
    case "bullet-list":
      return <BulletListSlide title={slide.title} items={slide.items} />;
    case "arrow-list":
      return <ArrowListSlide title={slide.title} items={slide.items} />;
    case "grid":
      return <GridSlide title={slide.title} items={slide.items} />;
    case "box-list":
      return <BoxListSlide title={slide.title} items={slide.items} />;
    case "cta":
      return <CtaSlide badge={slide.badge} title={slide.title} subtitle={slide.subtitle} />;
    case "__unsupported":
      return <UnsupportedSlide layout={slide.originalLayout} />;
  }
}
