type FooterProps = {
  children: string;
  className?: string;
  branded?: boolean;
};

export default function Footer({ children, className = "", branded = false }: FooterProps) {
  if (!branded) return <p className={`ui-footer ${className}`}>{children}</p>;

  return (
    <footer className={`ui-footer ui-footer--branded ${className}`}>
      <img className="ui-footer__avatar" src="/assets/profile.jpg" alt="" />
      <span className="ui-footer__handle">{children}</span>
    </footer>
  );
}
