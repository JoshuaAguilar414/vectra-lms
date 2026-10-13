import VectraFooter from "@/components/VectraFooter";

export default function AuthShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="vectra-auth-shell">
      <main className="vectra-auth-main">{children}</main>
      <VectraFooter />
    </div>
  );
}
