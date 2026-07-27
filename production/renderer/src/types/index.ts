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
};

export type ArrowItem = {
  text: string;
};

export type CtaContent = {
  badge: string;
  title: string;
  subtitle: string;
};

export type CoverSlideData = {
  layout: "cover";
  title: string;
  subtitle: string;
};

export type BulletListSlideData = {
  layout: "bullet-list";
  title: string;
  items: BulletItem[];
};

export type ArrowListSlideData = {
  layout: "arrow-list";
  title: string;
  items: ArrowItem[];
};

export type GridSlideData = {
  layout: "grid";
  title: string;
  items: GridItem[];
};

export type BoxListSlideData = {
  layout: "box-list";
  title: string;
  items: BoxItem[];
};

export type CtaSlideData = {
  layout: "cta";
  badge: string;
  title: string;
  subtitle: string;
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
