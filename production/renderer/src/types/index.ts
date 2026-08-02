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

export type CoverSlideData = {
  layout: "cover";
  title: string;
  subtitle: string;
  username?: string;
};

export type BulletListSlideData = {
  layout: "bullet-list";
  title: string;
  items: BulletItem[];
  label?: string;
  summary?: string;
};

export type ArrowListSlideData = {
  layout: "arrow-list";
  title: string;
  items: ArrowItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
};

export type GridSlideData = {
  layout: "grid";
  title: string;
  items: GridItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  bigNumber?: string;
};

export type BoxListSlideData = {
  layout: "box-list";
  title: string;
  items: BoxItem[];
  sectionTag?: string;
  sectionTagVariant?: "win" | "mac" | "lin" | "cons";
  label?: string;
};

export type CtaSlideData = {
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

export type UnsupportedSlideData = {
  layout: "__unsupported";
  originalLayout: string;
};

export type SlideData =
  | CoverSlideData
  | BulletListSlideData
  | ArrowListSlideData
  | GridSlideData
  | BoxListSlideData
  | CtaSlideData
  | UnsupportedSlideData;

export type Carousel = {
  slides: SlideData[];
};
