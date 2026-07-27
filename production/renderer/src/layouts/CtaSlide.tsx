import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";
import Badge from "../components/ui/Badge";
import Footer from "../components/ui/Footer";
import type { CtaContent } from "../types";

type CtaSlideProps = CtaContent & {
  className?: string;
};

export default function CtaSlide({ badge, title, subtitle, className = "" }: CtaSlideProps) {
  return (
    <Slide className={`layout-cta ${className}`}>
      <div className="layout-cta__inner">
        <Badge>{badge}</Badge>
        <Title>{title}</Title>
        <Subtitle className="layout-cta__subtitle">{subtitle}</Subtitle>
        <Footer className="layout-cta__footer">Get started today →</Footer>
      </div>
    </Slide>
  );
}
