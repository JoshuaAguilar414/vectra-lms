"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import UserMenu from "@/components/UserMenu";

type NavItem = { href: string; label: string; external?: boolean };
type HeaderUser = { firstName: string; lastName: string; email: string };

const MARKET = "https://marketplace.vectra-intl.com";

const MARKET_NAV: NavItem[] = [
  { label: "How We Help", href: `${MARKET}/pages/solutions?view=solutions`, external: true },
  { label: "Marketplace", href: `${MARKET}/pages/marketplace?view=marketplace`, external: true },
  { label: "Resources", href: `${MARKET}/pages/resources?view=resources`, external: true },
  { label: "FAQ", href: `${MARKET}/pages/faq?view=faq`, external: true }
];

function NavLink({
  item,
  className,
  onClick
}: {
  item: NavItem;
  className?: string;
  onClick?: () => void;
}) {
  if (item.external) {
    return (
      <a
        href={item.href}
        className={className}
        target="_blank"
        rel="noopener noreferrer"
        onClick={onClick}
      >
        {item.label}
      </a>
    );
  }
  return (
    <Link href={item.href} className={className} onClick={onClick}>
      {item.label}
    </Link>
  );
}

export default function VectraHeader({
  items = [],
  user,
  showSignOut = true,
  logoSrc = "/vectra-logo-footer.png",
  logoAlt = "VECTRA International",
  homeUrl = "https://marketplace.vectra-intl.com/"
}: {
  items?: NavItem[];
  user?: HeaderUser;
  showSignOut?: boolean;
  logoSrc?: string;
  logoAlt?: string;
  homeUrl?: string;
}) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const navItems = items.length > 0 ? items : MARKET_NAV;

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setMenuOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header className={`vectra-header${menuOpen ? " vectra-header-open" : ""}`}>
      <div className="vectra-header-inner">
        <div className="vectra-util">
          <a
            className="vectra-util-link"
            href={`${MARKET}/pages/careers?view=careers`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                fill="currentColor"
                d="M9 4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2h3a2 2 0 0 1 2 2v3h-2V6H4v12h16v-3h2v3a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5Zm2 0h2v1h-2V4Zm7.5 7.5 1.4 1.4L15.3 17H13v-2.3l4.5-4.2Z"
              />
            </svg>
            Join us
          </a>

          {showSignOut && user ? (
            <div className="vectra-util-user">
              <UserMenu user={user} />
            </div>
          ) : (
            <Link className="vectra-util-link" href="/login">
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-4 0-7.5 2-7.5 4.5V20h15v-1.5C19.5 16 16 14 12 14Z"
                />
              </svg>
              Log In
            </Link>
          )}
        </div>

        <nav className="vectra-nav" aria-label="Primary">
          <a
            href={homeUrl}
            className="vectra-nav-logo"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMenuOpen(false)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`${logoSrc}?v=6`} alt={logoAlt} width={161} height={43} />
          </a>

          <div className="vectra-menu">
            {navItems.map((item) => (
              <NavLink
                key={item.href + item.label}
                item={item}
                className={`vectra-menu-link${
                  !item.external && pathname === item.href ? " active" : ""
                }`}
                onClick={() => setMenuOpen(false)}
              />
            ))}
          </div>

          <div className="vectra-nav-end">
            <a
              className="vectra-contact-link"
              href={`${MARKET}/pages/contact?view=contact-us`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Talk to an Expert
              <svg viewBox="0 0 16 9" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M11.2 0 10.1 1.1 12.5 3.5H0v1.6h12.5l-2.4 2.4L11.2 8.6 16 4.3z"
                />
              </svg>
            </a>

            <button
              type="button"
              className="vectra-nav-toggle"
              aria-expanded={menuOpen}
              aria-controls="vectra-header-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((value) => !value)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 3.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M1 10.5H13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </nav>
      </div>

      {menuOpen && (
        <button
          type="button"
          className="vectra-header-backdrop"
          aria-label="Close menu"
          onClick={() => setMenuOpen(false)}
        />
      )}

      <div
        id="vectra-header-menu"
        className={`vectra-nav-panel${menuOpen ? " open" : ""}`}
        aria-label="Mobile menu"
      >
        {navItems.map((item) => (
          <NavLink
            key={`panel-${item.href}-${item.label}`}
            item={item}
            className={`vectra-nav-panel-link${
              !item.external && pathname === item.href ? " active" : ""
            }`}
            onClick={() => setMenuOpen(false)}
          />
        ))}
        {showSignOut && user && (
          <div className="vectra-nav-panel-user">
            <UserMenu user={user} variant="panel" />
          </div>
        )}
        <a
          className="vectra-contact-link vectra-contact-link--panel"
          href={`${MARKET}/pages/contact?view=contact-us`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
        >
          Talk to an Expert
        </a>
      </div>
    </header>
  );
}
