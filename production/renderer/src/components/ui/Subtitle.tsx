type SubtitleProps = {
  children: string;
  className?: string;
};

export default function Subtitle({ children, className = "" }: SubtitleProps) {
  return <p className={`ui-subtitle ${className}`}>{children}</p>;
}
