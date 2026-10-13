import { getBranding } from "@/lib/branding";

export default function BrandLockup({ showProductName = true }: { showProductName?: boolean }) {
  const branding = getBranding();

  return (
    <div className="brand-lockup">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        className="brand-lockup-logo"
        src={branding.logoSrc}
        alt={branding.logoAlt}
        width={220}
        height={63}
      />
    </div>
  );
}
