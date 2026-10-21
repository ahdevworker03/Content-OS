import { Slide } from "../components/slide";
import Title from "../components/ui/Title";

type CtaSlideProps = {
  badge: string;
  title: string;
  subtitle: string;
  label?: string;
  bulletRows?: string[];
  quote?: string;
  cta?: string;
  className?: string;
};

export default function CtaSlide({
  badge,
  title,
  subtitle,
  label,
  bulletRows,
  quote,
  cta,
  className = "",
}: CtaSlideProps) {
  return (
    <Slide className={`layout-cta ${className}`}>
      <div className="layout-cta__inner">
        {(badge || label) && <div className="s-label">{badge || label}</div>}
        <Title as="h2" size="advice">{title}</Title>
        {bulletRows?.map((row, i) => (
          <div key={i} className="bullet-row">
            <div className="dot-sum" />
            <p className="s-body--medium">{row}</p>
          </div>
        ))}
        {subtitle && !bulletRows && (
          <div className="layout-cta__subtitle">{subtitle}</div>
        )}
        {quote && (
          <div className="box-l final-box">
            <p className="s-body--final">{quote}</p>
          </div>
        )}
        {cta && (
          <div className="box-l2">
            <p className="s-body--final">{cta}</p>
          </div>
        )}
      </div>
    </Slide>
  );
}
