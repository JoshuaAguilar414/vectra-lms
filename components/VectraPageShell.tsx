import VectraFooter from "@/components/VectraFooter";
import VectraHeader from "@/components/VectraHeader";
import { getBranding } from "@/lib/branding";
import type { SessionUser } from "@/lib/types";

type NavItem = { href: string; label: string };

export default function VectraPageShell({
  items,
  user,
  showSignOut = true,
  children
}: {
  items: NavItem[];
  user?: SessionUser;
  showSignOut?: boolean;
  children: React.ReactNode;
}) {
  const branding = getBranding();

  return (
    <div className="vectra-shell">
      <VectraHeader
        items={items}
        showSignOut={showSignOut}
        logoSrc="/vectra-logo-footer.png"
        logoAlt={branding.logoAlt}
        homeUrl={branding.homeUrl}
        user={user ? {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email
        } : undefined}
      />
      <main className="vectra-main">{children}</main>
      <VectraFooter />
    </div>
  );
}
