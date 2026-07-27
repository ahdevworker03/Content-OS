type TitleProps = {
  as?: "h1" | "h2" | "h3";
  children: string;
  className?: string;
};

export default function Title({ as: Tag = "h1", children, className = "" }: TitleProps) {
  return <Tag className={`ui-title ${className}`}>{children}</Tag>;
}
