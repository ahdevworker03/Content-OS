import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import Subtitle from "../components/ui/Subtitle";

type CoverSlideProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export default function CoverSlide({ title, subtitle, className = "" }: CoverSlideProps) {
  return (
    <Slide className={`layout-cover ${className}`}>
      <div className="layout-cover__inner">
        <Subtitle className="layout-cover__eyebrow">Cover</Subtitle>
        <Title>{title}</Title>
        <Subtitle className="layout-cover__subtitle">{subtitle}</Subtitle>
      </div>
    </Slide>
  );
}
