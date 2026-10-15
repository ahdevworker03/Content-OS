/** Presentation data only. Map the app's Content Model through its adapter first. */
export type LeadIn = string | undefined;

type Base = {
  id: string;
  leadIn?: LeadIn;
};

export type CoverSlide = Base & {
  template: "cover";
  title: string;
  context?: string;
};

export type StorySlide = Base & {
  template: "story";
  title: string;
  body: string;
  emphasis?: string;
};

export type FocusSlide = Base & {
  template: "focus";
  title: string;
  statement: string;
  note?: string;
};

export type SequenceSlide = Base & {
  template: "sequence";
  title: string;
  items: string[];
};

export type ComparisonSlide = Base & {
  template: "comparison";
  title: string;
  before: { label: string; text: string };
  after: { label: string; text: string };
};

export type EvidenceSlide = Base & {
  template: "evidence";
  title: string;
  context?: string;
  evidence:
    | { kind: "image"; src: string; alt: string; caption?: string }
    | { kind: "code"; code: string; language?: string; caption?: string };
};

export type ClosingSlide = Base & {
  template: "closing";
  question: string;
  signoff?: string;
};

export type PersonalSlide =
  | CoverSlide
  | StorySlide
  | FocusSlide
  | SequenceSlide
  | ComparisonSlide
  | EvidenceSlide
  | ClosingSlide;

export type PersonalCarousel = { slides: PersonalSlide[] };
