import { hasPage, isStaffUser } from "@/lib/auth";
import type { SessionUser } from "@/lib/types";
import { STAFF_PAGES } from "@/lib/role-catalog";
import VectraPageShell from "@/components/VectraPageShell";

export default function Shell({ user, children }: { user: SessionUser; children: React.ReactNode }) {
  const items = isStaffUser(user)
    ? STAFF_PAGES
        .filter((page) => hasPage(user, page.key))
        .map((page) => ({ href: page.href, label: page.label }))
    : [
        { href: "/dashboard", label: "Overview" },
        { href: "/dashboard/courses", label: "My courses" }
      ];

  return (
    <VectraPageShell items={items} user={user}>
      {children}
    </VectraPageShell>
  );
}
