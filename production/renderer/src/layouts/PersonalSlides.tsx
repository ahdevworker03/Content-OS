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

type FrameChrome = {
  headerLabel?: string;
  slideIndex?: number;
  slideCount?: number;
};

function frameChrome(slide: FrameChrome): FrameChrome {
  return {
    headerLabel: slide.headerLabel,
    slideIndex: slide.slideIndex,
    slideCount: slide.slideCount,
  };
}

function PersonalFrame({
  layout,
  leadIn,
  headerLabel,
  slideIndex,
  slideCount,
  children,
  className = "",
}: {
  layout: PersonalLayout;
  leadIn?: string;
  headerLabel?: string;
  slideIndex?: number;
  slideCount?: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Slide className={`personal-layout personal-layout--${layout} ${className}`} headerLabel={headerLabel} slideIndex={slideIndex} slideCount={slideCount}>
      {leadIn && <p className="personal-layout__lead-in">{leadIn}</p>}
      <div className="personal-layout__content">{children}</div>
    </Slide>
  );
}

function isolatePercentages(text: string) {
  return text.split(/(\d+(?:\.\d+)?%)/g).map((part, index) => /^\d+(?:\.\d+)?%$/.test(part) ? <bdi dir="ltr" key={index}>{part}</bdi> : part);
}

export function PersonalCover({ slide }: { slide: CoverSlideData }) {
  return (
    <PersonalFrame layout="cover" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title>{slide.title}</Title>
      {(slide.context || slide.subtitle) && (
        <p className="personal-layout__support">{slide.context || slide.subtitle}</p>
      )}
    </PersonalFrame>
  );
}

export function PersonalStory({ slide }: { slide: StorySlideData }) {
  return (
    <PersonalFrame layout="story" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-layout__body">{slide.body}</p>
      {slide.emphasis && <p className="personal-layout__inset">{slide.emphasis}</p>}
    </PersonalFrame>
  );
}

export function PersonalFocus({ slide }: { slide: FocusSlideData }) {
  return (
    <PersonalFrame layout="focus" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-layout__statement">{slide.statement}</p>
      {slide.note && <p className="personal-layout__support">{slide.note}</p>}
    </PersonalFrame>
  );
}

export function PersonalSequence({ slide }: { slide: SequenceSlideData }) {
  return (
    <PersonalFrame layout="sequence" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <ol className="personal-layout__sequence">
        {slide.items.map((item, index) => <li key={index}>{item}</li>)}
      </ol>
    </PersonalFrame>
  );
}

export function PersonalComparison({ slide }: { slide: ComparisonSlideData }) {
  return (
    <PersonalFrame layout="comparison" leadIn={slide.leadIn} {...frameChrome(slide)}>
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
    <PersonalFrame layout="evidence" leadIn={slide.leadIn} {...frameChrome(slide)}>
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
    <PersonalFrame layout="closing" leadIn={slide.leadIn} {...frameChrome(slide)}>
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
    <PersonalFrame layout="role-cover" {...frameChrome(slide)}>
      {slide.leadIn && <p className="personal-role__cover-context">{slide.leadIn}</p>}
      <Title>{slide.title}</Title>
      {slide.emphasis && <p className="personal-role__emphasis">{slide.emphasis}</p>}
      {slide.context && <p className="personal-role__context">{slide.context}</p>}
    </PersonalFrame>
  );
}

export function PersonalTrigger({ slide }: { slide: PersonalTriggerSlideData }) {
  return (
    <PersonalFrame layout="trigger" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__body">{slide.body}</p>
      {slide.question && <p className="personal-role__question">{slide.question}</p>}
    </PersonalFrame>
  );
}

export function PersonalBelief({ slide }: { slide: PersonalBeliefSlideData }) {
  return (
    <PersonalFrame layout="belief" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__quote">{slide.quote}</p>
    </PersonalFrame>
  );
}

export function PersonalFriction({ slide }: { slide: PersonalFrictionSlideData }) {
  return (
    <PersonalFrame layout="friction" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <ol className="personal-role__steps">
        {slide.items.map((item, index) => <li key={index}>{item}</li>)}
      </ol>
    </PersonalFrame>
  );
}

export function PersonalRealization({ slide }: { slide: PersonalRealizationSlideData }) {
  return (
    <PersonalFrame layout="realization" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      <p className="personal-role__statement">{slide.statement}</p>
      {slide.note && <p className="personal-role__context">{slide.note}</p>}
    </PersonalFrame>
  );
}

export function PersonalDecision({ slide }: { slide: PersonalDecisionSlideData }) {
  return (
    <PersonalFrame layout="decision" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      {slide.context && <p className="personal-role__body">{slide.context.split(/(`[^`]+`)/).map((part, index) => part.startsWith("`") && part.endsWith("`") ? <code dir="ltr" key={index}>{part.slice(1, -1)}</code> : part)}</p>}
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
  const details = slide.detail?.split(/\n\s*\n/).filter(Boolean) ?? [];
  const composition = /[؟?]\s*$/.test(slide.title) ? "reflection" : details.length > 1 ? "segmented" : "explanation";

  return (
    <PersonalFrame layout="takeaway" leadIn={slide.leadIn} className={`personal-layout--takeaway-${composition}`} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.title}</Title>
      {details.length > 0 && (
        <div className="personal-role__details">
          {details.map((detail, index) => {
            const threshold = composition === "segmented" ? detail.match(/^(.*?)\s+(فوق|تحت)\s+(.*)$/) : null;
            return (
              <p className={`personal-role__context${threshold ? " personal-role__threshold" : ""}`} key={index}>
                {threshold ? (
                  <>
                    <span className="personal-role__threshold-label"><bdi dir="ltr">{threshold[1]}</bdi> {threshold[2]}</span>
                    <bdi className="personal-role__threshold-value" dir="ltr">{threshold[3]}</bdi>
                  </>
                ) : isolatePercentages(detail)}
              </p>
            );
          })}
        </div>
      )}
    </PersonalFrame>
  );
}

export function PersonalRoleClosing({ slide }: { slide: PersonalClosingSlideData }) {
  return (
    <PersonalFrame layout="role-closing" leadIn={slide.leadIn} {...frameChrome(slide)}>
      <Title as="h2" size="lg">{slide.question}</Title>
      {slide.signoff && <p className="personal-role__context">{slide.signoff}</p>}
    </PersonalFrame>
  );
}
