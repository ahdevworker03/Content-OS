import { Slide } from "../components/slide";
import Title from "../components/ui/Title";
import type { ReactNode } from "react";
import type {
  ClosingSlideData,
  ComparisonSlideData,
  CoverSlideData,
  EvidenceSlideData,
  FocusSlideData,
  PersonalBeliefSlideData,
  PersonalClosingSlideData,
  PersonalCoverSlideData,
  PersonalDecisionSlideData,
  PersonalFrictionSlideData,
  PersonalRealizationSlideData,
  PersonalTakeawaySlideData,
  PersonalTriggerSlideData,
  SequenceSlideData,
  StorySlideData,
} from "../types";
import "./personal-slides.css";

type PersonalLayout =
  | CoverSlideData["layout"]
  | StorySlideData["layout"]
  | FocusSlideData["layout"]
  | SequenceSlideData["layout"]
  | ComparisonSlideData["layout"]
  | EvidenceSlideData["layout"]
  | ClosingSlideData["layout"]
  | "role-cover"
  | "trigger"
  | "belief"
  | "friction"
  | "realization"
  | "decision"
  | "takeaway"
  | "role-closing";

function PersonalFrame({
  layout,
  leadIn,
  children,
}: {
  layout: PersonalLayout;
  leadIn?: string;
  children: ReactNode;
}) {
  return (
    <Slide className={`personal-layout personal-layout--${layout}`}>
      {leadIn && <p className="personal-layout__lead-in">{leadIn}</p>}
      <div className="personal-layout__content">{children}</div>
    </Slide>
  );
}

export function PersonalCover({ slide }: { slide: CoverSlideData }) {
  return (
    <PersonalFrame layout="cover" leadIn={slide.leadIn}>
      <Title>{slide.title}</Title>
      {(slide.context || slide.subtitle) && (
        <p className="personal-layout__support">{slide.context || slide.subtitle}</p>
      )}
    </PersonalFrame>
  );
}

export function PersonalStory({ slide }: { slide: StorySlideData }) {
  return (
    <PersonalFrame layout="story" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-layout__body">{slide.body}</p>
      {slide.emphasis && <p className="personal-layout__inset">{slide.emphasis}</p>}
    </PersonalFrame>
  );
}

export function PersonalFocus({ slide }: { slide: FocusSlideData }) {
  return (
    <PersonalFrame layout="focus" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-layout__statement">{slide.statement}</p>
      {slide.note && <p className="personal-layout__support">{slide.note}</p>}
    </PersonalFrame>
  );
}

export function PersonalSequence({ slide }: { slide: SequenceSlideData }) {
  return (
    <PersonalFrame layout="sequence" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <ol className="personal-layout__sequence">
        {slide.items.map((item, index) => <li key={index}>{item}</li>)}
      </ol>
    </PersonalFrame>
  );
}

export function PersonalComparison({ slide }: { slide: ComparisonSlideData }) {
  return (
    <PersonalFrame layout="comparison" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <div className="personal-layout__comparison">
        {[slide.before, slide.after].map((side, index) => (
          <section key={index}>
            <span>{side.label}</span>
            <p>{side.text}</p>
          </section>
        ))}
      </div>
    </PersonalFrame>
  );
}

export function PersonalEvidence({ slide }: { slide: EvidenceSlideData }) {
  const rawCaption = slide.evidence.caption ?? "";
  const caption = slide.evidence.kind === "diagram"
    ? rawCaption.replace(/\s*conceptual diagram\.?\s*$/i, "").trim() || "رسم مفاهيمي"
    : rawCaption;

  return (
    <PersonalFrame layout="evidence" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      {slide.context && <p className="personal-layout__context">{slide.context}</p>}
      <figure className="personal-layout__evidence">
        {slide.evidence.kind === "code" ? (
          <pre dir="ltr"><code>{slide.evidence.code}</code></pre>
        ) : (
          <img src={slide.evidence.src} alt={slide.evidence.alt} />
        )}
        {caption && <figcaption>{caption}</figcaption>}
      </figure>
    </PersonalFrame>
  );
}

export function PersonalClosing({ slide }: { slide: ClosingSlideData }) {
  return (
    <PersonalFrame layout="closing" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.question}</Title>
      {slide.legacyQuestions?.map((question, index) => (
        <p className="personal-layout__closing-question" key={index}>{question}</p>
      ))}
      {slide.highlight && <p className="personal-layout__inset">{slide.highlight}</p>}
      {slide.cta && <p className="personal-layout__support">{slide.cta}</p>}
      {slide.signoff && <p className="personal-layout__support">{slide.signoff}</p>}
    </PersonalFrame>
  );
}

export function PersonalRoleCover({ slide }: { slide: PersonalCoverSlideData }) {
  return (
    <PersonalFrame layout="role-cover" leadIn={slide.leadIn}>
      <Title>{slide.title}</Title>
      {slide.emphasis && <p className="personal-role__emphasis">{slide.emphasis}</p>}
      {slide.context && <p className="personal-role__context">{slide.context}</p>}
    </PersonalFrame>
  );
}

export function PersonalTrigger({ slide }: { slide: PersonalTriggerSlideData }) {
  return (
    <PersonalFrame layout="trigger" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__body">{slide.body}</p>
      {slide.question && <p className="personal-role__question">{slide.question}</p>}
    </PersonalFrame>
  );
}

export function PersonalBelief({ slide }: { slide: PersonalBeliefSlideData }) {
  return (
    <PersonalFrame layout="belief" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__quote">{slide.quote}</p>
    </PersonalFrame>
  );
}

export function PersonalFriction({ slide }: { slide: PersonalFrictionSlideData }) {
  return (
    <PersonalFrame layout="friction" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <ol className="personal-role__steps">
        {slide.items.map((item, index) => <li key={index}>{item}</li>)}
      </ol>
    </PersonalFrame>
  );
}

export function PersonalRealization({ slide }: { slide: PersonalRealizationSlideData }) {
  return (
    <PersonalFrame layout="realization" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__statement">{slide.statement}</p>
      {slide.note && <p className="personal-role__context">{slide.note}</p>}
    </PersonalFrame>
  );
}

export function PersonalDecision({ slide }: { slide: PersonalDecisionSlideData }) {
  return (
    <PersonalFrame layout="decision" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      {slide.context && <p className="personal-role__body">{slide.context}</p>}
      <figure className="personal-role__evidence">
        {slide.evidence.kind === "code" ? (
          <pre dir="ltr"><code>{slide.evidence.code}</code></pre>
        ) : (
          <img src={slide.evidence.src} alt={slide.evidence.alt} />
        )}
        {slide.evidence.caption && <figcaption>{slide.evidence.caption}</figcaption>}
      </figure>
    </PersonalFrame>
  );
}

export function PersonalTakeaway({ slide }: { slide: PersonalTakeawaySlideData }) {
  return (
    <PersonalFrame layout="takeaway" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.title}</Title>
      {slide.detail && <p className="personal-role__context">{slide.detail}</p>}
    </PersonalFrame>
  );
}

export function PersonalRoleClosing({ slide }: { slide: PersonalClosingSlideData }) {
  return (
    <PersonalFrame layout="role-closing" leadIn={slide.leadIn}>
      <Title as="h2" size="lg">{slide.question}</Title>
      {slide.signoff && <p className="personal-role__context">{slide.signoff}</p>}
    </PersonalFrame>
  );
}
