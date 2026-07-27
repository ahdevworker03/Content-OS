type BadgeProps = {
  children: string;
  className?: string;
};

export default function Badge({ children, className = "" }: BadgeProps) {
  return <span className={`ui-badge ${className}`}>{children}</span>;
}
