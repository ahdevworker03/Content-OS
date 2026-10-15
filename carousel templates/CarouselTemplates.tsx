import type { ReactNode } from "react";
import type {
  PersonalSlide,
  CoverSlide,
  StorySlide,
  FocusSlide,
  SequenceSlide,
  ComparisonSlide,
  EvidenceSlide,
  ClosingSlide,
} from "./types.ts";
import "./carousel.css";

const HANDLE = "abdallahhassoun.dev";

function Shell({
  leadIn,
  variant,
  children,
}: {
  leadIn?: string;
  variant: PersonalSlide["template"];
  children: ReactNode;
}) {
  return (
    <article className={`ah-slide ah-slide--${variant}`} dir="rtl">
      {leadIn && <p className="ah-slide__lead-in">{leadIn}</p>}
      <div className="ah-slide__content">{children}</div>
      <footer className="ah-slide__footer" dir="ltr">{HANDLE}</footer>
    </article>
  );
}

export function CoverTemplate({ slide }: { slide: CoverSlide }) {
  return <Shell leadIn={slide.leadIn} variant="cover">
    <h1>{slide.title}</h1>
    {slide.context && <p className="ah-slide__support">{slide.context}</p>}
  </Shell>;
}

export function StoryTemplate({ slide }: { slide: StorySlide }) {
  return <Shell leadIn={slide.leadIn} variant="story">
    <h2>{slide.title}</h2>
    <p className="ah-slide__body">{slide.body}</p>
    {slide.emphasis && <p className="ah-slide__inset">{slide.emphasis}</p>}
  </Shell>;
}

export function FocusTemplate({ slide }: { slide: FocusSlide }) {
  return <Shell leadIn={slide.leadIn} variant="focus">
    <h2>{slide.title}</h2>
    <p className="ah-slide__statement">{slide.statement}</p>
    {slide.note && <p className="ah-slide__support">{slide.note}</p>}
  </Shell>;
}

export function SequenceTemplate({ slide }: { slide: SequenceSlide }) {
  return <Shell leadIn={slide.leadIn} variant="sequence">
    <h2>{slide.title}</h2>
    <ul className="ah-slide__sequence">
      {slide.items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </Shell>;
}

export function ComparisonTemplate({ slide }: { slide: ComparisonSlide }) {
  return <Shell leadIn={slide.leadIn} variant="comparison">
    <h2>{slide.title}</h2>
    <div className="ah-slide__comparison">
      <section><span>{slide.before.label}</span><p>{slide.before.text}</p></section>
      <section><span>{slide.after.label}</span><p>{slide.after.text}</p></section>
    </div>
  </Shell>;
}

export function EvidenceTemplate({ slide }: { slide: EvidenceSlide }) {
  return <Shell leadIn={slide.leadIn} variant="evidence">
    <h2>{slide.title}</h2>
    {slide.context && <p className="ah-slide__body">{slide.context}</p>}
    <figure className="ah-slide__evidence">
      {slide.evidence.kind === "image"
        ? <img src={slide.evidence.src} alt={slide.evidence.alt} />
        : <pre dir="ltr"><code>{slide.evidence.code}</code></pre>}
      {slide.evidence.caption && <figcaption>{slide.evidence.caption}</figcaption>}
    </figure>
  </Shell>;
}

export function ClosingTemplate({ slide }: { slide: ClosingSlide }) {
  return <Shell leadIn={slide.leadIn} variant="closing">
    <h2>{slide.question}</h2>
    {slide.signoff && <p className="ah-slide__support">{slide.signoff}</p>}
  </Shell>;
}

/** Render presentation data only, after the existing workspace adapter has mapped it. */
export function PersonalCarouselSlide({ slide }: { slide: PersonalSlide }) {
  switch (slide.template) {
    case "cover": return <CoverTemplate slide={slide} />;
    case "story": return <StoryTemplate slide={slide} />;
    case "focus": return <FocusTemplate slide={slide} />;
    case "sequence": return <SequenceTemplate slide={slide} />;
    case "comparison": return <ComparisonTemplate slide={slide} />;
    case "evidence": return <EvidenceTemplate slide={slide} />;
    case "closing": return <ClosingTemplate slide={slide} />;
    default: {
      const impossible: never = slide;
      throw new Error(`Unsupported personal carousel template: ${String(impossible)}`);
    }
  }
}
