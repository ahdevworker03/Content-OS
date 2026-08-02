import { Slide } from "../components/slide";
import Title from "../components/ui/Title";

type CoverSlideProps = {
  title: string;
  subtitle: string;
  username?: string;
  className?: string;
};

export default function CoverSlide({ title, subtitle, username, className = "" }: CoverSlideProps) {
  return (
    <Slide className={`layout-cover ${className}`}>
      {username && <div className="layout-cover__username">{username}</div>}
      <div className="layout-cover__center">
        <Title size="xl">{title}</Title>
        <div className="layout-cover__subtitle">{subtitle}</div>
      </div>
    </Slide>
  );
}
