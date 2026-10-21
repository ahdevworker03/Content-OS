type TitleProps = {
  as?: "h1" | "h2" | "h3";
  children: string;
  size?: "xl" | "lg" | "md" | "sm" | "experience" | "advice";
  className?: string;
};

export default function Title({ as: Tag = "h1", children, size = "xl", className = "" }: TitleProps) {
  return <Tag className={`ui-title ui-title--${size} ${className}`}>{children}</Tag>;
}
