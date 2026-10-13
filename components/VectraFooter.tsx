import VectraNotifyForm from "@/components/VectraNotifyForm";
import { getBranding } from "@/lib/branding";

const MARKET = "https://marketplace.vectra-intl.com";

const EXPLORE_LINKS = [
  { label: "Solutions", href: `${MARKET}/pages/solutions?view=solutions` },
  { label: "Marketplace", href: `${MARKET}/pages/marketplace?view=marketplace` },
  { label: "Resources", href: `${MARKET}/pages/resources?view=resources` },
  { label: "Case studies", href: `${MARKET}/#cases` },
  { label: "FAQ", href: `${MARKET}/pages/faq?view=faq` }
];

const START_HERE_LINKS = [
  { label: "Talk to an expert", href: `${MARKET}/pages/contact?view=contact-us` },
  { label: "Request a demo", href: `${MARKET}/pages/contact?view=contact-us` },
  { label: "Readiness assessment", href: `${MARKET}/pages/contact?view=contact-us` },
  { label: "Build a capability path", href: `${MARKET}/pages/contact?view=contact-us` },
  { label: "Client portal", href: `${MARKET}/account` }
];

const COMPANY_LINKS = [
  { label: "About VECTRA", href: `${MARKET}/pages/about-us?view=about-us` },
  { label: "Why VECTRA", href: `${MARKET}/pages/why-partner-with-us?view=why-partner` },
  { label: "Experts", href: `${MARKET}/pages/experts?view=experts` },
  { label: "Associates", href: `${MARKET}/pages/associates?view=associates` },
  { label: "Interns", href: `${MARKET}/pages/interns?view=interns` },
  { label: "Careers", href: `${MARKET}/pages/careers?view=careers` },
  { label: "Our values and pledges", href: `${MARKET}/pages/about-us?view=about-us#values` },
  { label: "Contact us", href: `${MARKET}/pages/contact?view=contact-us` }
];

const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/vectra-international",
    path: "M4.98 3.5A2.48 2.48 0 1 1 2.5 6a2.48 2.48 0 0 1 2.48-2.5ZM3 8.75h3.96V21H3V8.75Zm6.22 0H13v1.67h.06c.54-1.02 1.86-2.1 3.83-2.1 4.1 0 4.86 2.7 4.86 6.21V21h-3.96v-5.54c0-1.32-.02-3.02-1.84-3.02-1.84 0-2.12 1.44-2.12 2.92V21H9.22V8.75Z"
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/@vectrainternational",
    path: "M23.5 6.2a3.03 3.03 0 0 0-2.13-2.15C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.37.45A3.03 3.03 0 0 0 .5 6.2 31.8 31.8 0 0 0 0 12a31.8 31.8 0 0 0 .5 5.8 3.03 3.03 0 0 0 2.13 2.15C4.5 20.4 12 20.4 12 20.4s7.5 0 9.37-.45a3.03 3.03 0 0 0 2.13-2.15A31.8 31.8 0 0 0 24 12a31.8 31.8 0 0 0-.5-5.8ZM9.75 15.57V8.43L15.84 12l-6.09 3.57Z"
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/vectrainternational",
    path: "M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4Zm10 1.8H7A2.2 2.2 0 0 0 4.8 7v10A2.2 2.2 0 0 0 7 19.2h10A2.2 2.2 0 0 0 19.2 17V7A2.2 2.2 0 0 0 17 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8Zm4.55-3.15a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z"
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/vectrainternational",
    path: "M14.5 9.5V7.8c0-.7.5-1.3 1.6-1.3h1.4V3.6h-2.4C12.4 3.6 11 5.2 11 7.6v1.9H8.6V13H11v8h3.5v-8h2.3l.6-3.5h-2.9Z"
  },
  {
    label: "X",
    href: "https://twitter.com/vectraintl",
    path: "M17.6 3.2h3.1l-6.8 7.8 8 10.8h-6.3l-4.9-6.4-5.6 6.4H2l7.3-8.3L1.6 3.2h6.4l4.4 5.8 5.2-5.8Zm-1.1 16.5h1.7L7.6 4.9H5.8l10.7 14.8Z"
  }
] as const;

function FooterLinkList({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="vectra-footer-links">
      {links.map((link) => (
        <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
          {link.label}
        </a>
      ))}
    </div>
  );
}

export default function VectraFooter() {
  const branding = getBranding();
  const year = new Date().getFullYear();

  return (
    <footer className="vectra-footer">
      <div className="vectra-footer-inner">
        <div className="vectra-footer-top">
          <div className="vectra-footer-brand">
            <a href={MARKET} target="_blank" rel="noopener noreferrer" className="vectra-footer-logo-link">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/vectra-logo-footer.png?v=6"
                alt={branding.logoAlt}
                className="vectra-footer-logo"
                width={157}
                height={42}
              />
            </a>
            <p className="vectra-footer-tagline">
              Your partner for business resilience and operational capability building through an
              ecosystem of integrated solutions.
            </p>
            <p className="vectra-footer-contact">
              <a href="tel:+3226206118">+32 2 620 61 18</a>
              <a href="tel:+32495239088">+32 495 239088</a>
              <a href="mailto:info@vectra-intl.com">info@vectra-intl.com</a>
            </p>
            <p className="vectra-footer-address">
              <a
                href="https://www.google.com/maps/search/?api=1&query=Chauss%C3%A9e%20de%20Wavre%201517B%2C%201160%20Brussels%2C%20Belgium"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chaussée de Wavre 1517B
                <br />
                1160 Brussels, Belgium
              </a>
            </p>
          </div>

          <div className="vectra-footer-nav">
            <nav className="vectra-footer-col" aria-label="Explore">
              <h3 className="vectra-footer-heading">Explore</h3>
              <FooterLinkList links={EXPLORE_LINKS} />
            </nav>

            <nav className="vectra-footer-col" aria-label="Start here">
              <h3 className="vectra-footer-heading">Start here</h3>
              <FooterLinkList links={START_HERE_LINKS} />
            </nav>

            <nav className="vectra-footer-col" aria-label="Company">
              <h3 className="vectra-footer-heading">Company</h3>
              <FooterLinkList links={COMPANY_LINKS} />
            </nav>

            <div className="vectra-footer-col vectra-footer-col--follow">
              <h3 className="vectra-footer-heading">Follow us</h3>
              <nav className="vectra-footer-social" aria-label={`${branding.clientName} on social media`}>
                {SOCIAL_LINKS.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${branding.clientName} on ${item.label}`}
                  >
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path fill="currentColor" d={item.path} />
                    </svg>
                  </a>
                ))}
              </nav>

              <h3 className="vectra-footer-heading vectra-footer-heading--notify">
                Website upgrade notice
              </h3>
              <p className="vectra-footer-notify-copy">
                VECTRA International is moving this website from WordPress to Shopify. This is a
                one-time go-live notice, not an email list. Enter your email if you want to know when
                the new site is live.
              </p>
              <VectraNotifyForm />
            </div>
          </div>
        </div>

        <div className="vectra-footer-bottom">
          <span>
            © {year} {branding.clientName} | All rights reserved.
          </span>
          <span className="vectra-footer-legal">
            <a href="https://vectra-intl.com/cookie-policy/" target="_blank" rel="noopener noreferrer">
              Cookie policy
            </a>
            <a href="https://vectra-intl.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
              Privacy policy
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
