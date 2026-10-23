<nav
  aria-label="Quick navigation"
  className="flex flex-wrap justify-center gap-x-4 gap-y-2"
>
  {navLinks.map((link) => (
    <a key={link.href} href={link.href}>
      {link.label}
    </a>
  ))}
</nav>
