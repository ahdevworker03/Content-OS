import { Slide } from "../components/slide";
import Title from "../components/ui/Title";

type CoverSlideProps = {
  title: string;
  subtitle: string;
  className?: string;
};

export default function CoverSlide({ title, subtitle, className = "" }: CoverSlideProps) {
  return (
    <Slide className={`layout-cover ${className}`}>
      <div className="layout-cover__center">
        <Title size="xl">{title}</Title>
        <div className="layout-cover__subtitle">{subtitle}</div>
      </div>
    </Slide>
  );
}
