type FooterProps = {
  children: string;
  className?: string;
};

export default function Footer({ children, className = "" }: FooterProps) {
  return <p className={`ui-footer ${className}`}>{children}</p>;
}
