export type BulletItem = {
  text: string;
  highlight?: boolean;
};

export type GridItem = {
  label: string;
  value: string;
};

export type BoxItem = {
  heading: string;
  description: string;
  accent?: boolean;
};

export type ArrowItem = {
  text: string;
};

export type CtaContent = {
  badge: string;
  title: string;
  subtitle: string;
  label?: string;
  bulletRows?: string[];
  quote?: string;
  cta?: string;
  footerName?: string;
  footerHandle?: string;
};

export type LegacyFooterData = {
  name?: string;
  role?: string;
  handle?: string;
};

type PersonalSlideBase = {
  leadIn?: string;
  /** Retained for legacy Content Model compatibility; the personal footer is fixed. */
  legacyFooter?: LegacyFooterData;
};

export type CoverSlideData = PersonalSlideBase & {
  layout: "cover";
  title: string;
  subtitle: string;
  context?: string;
  username?: string;
};

export type StorySlideData = PersonalSlideBase & {
  layout: "story";
  title: string;
  body: string;
  emphasis?: string;
};

export type FocusSlideData = PersonalSlideBase & {
  layout: "focus";
  title: string;
  statement: string;
  note?: string;
};

export type SequenceSlideData = PersonalSlideBase & {
  layout: "sequence";
  title: string;
  items: string[];
};

export type ComparisonSlideData = PersonalSlideBase & {
  layout: "comparison";
  title: string;
  before: { label: string; text: string };
  after: { label: string; text: string };
};

export type EvidenceSlideData = PersonalSlideBase & {
  layout: "evidence";
  title: string;
  context?: string;
  evidence:
    | { kind: "code"; code: string; language?: string; caption?: string }
    | { kind: "image" | "diagram"; src: string; alt: string; caption?: string };
};

export type ClosingSlideData = PersonalSlideBase & {
  layout: "closing";
  question: string;
  signoff?: string;
  /** Fields retained when adapting legacy final-cta slides. */
  legacyQuestions?: string[];
  highlight?: string;
  cta?: string;
};

export type BulletListSlideData = PersonalSlideBase & {
  layout: "bullet-list";
  title: string;
  items: BulletItem[];
  label?: string;
  summary?: string;
};

export type ArrowListSlideData = PersonalSlideBase & {
  layout: "arrow-list";
  title: string;
  items: ArrowItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
};

export type GridSlideData = PersonalSlideBase & {
  layout: "grid";
  title: string;
  items: GridItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
};

export type BoxListSlideData = PersonalSlideBase & {
  layout: "box-list";
  title: string;
  items: BoxItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  label?: string;
};

export type CtaSlideData = PersonalSlideBase & {
  layout: "cta";
  badge: string;
  title: string;
  subtitle: string;
  label?: string;
  bulletRows?: string[];
  quote?: string;
  cta?: string;
  footerName?: string;
  footerHandle?: string;
};

export type UnsupportedSlideData = PersonalSlideBase & {
  layout: "__unsupported";
  originalLayout: string;
};

export type SlideData =
  | CoverSlideData
  | StorySlideData
  | FocusSlideData
  | SequenceSlideData
  | ComparisonSlideData
  | EvidenceSlideData
  | ClosingSlideData
  | BulletListSlideData
  | ArrowListSlideData
  | GridSlideData
  | BoxListSlideData
  | CtaSlideData
  | UnsupportedSlideData;

export type Carousel = {
  slides: SlideData[];
};
