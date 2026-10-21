type BadgeProps = {
  children: string;
  variant?: "win" | "mac" | "lin" | "cons";
  className?: string;
};

export default function Badge({ children, variant, className = "" }: BadgeProps) {
  const cls = `ui-badge${variant ? ` ui-badge--${variant}` : ""} ${className}`;
  return <span className={cls}>{children}</span>;
}
