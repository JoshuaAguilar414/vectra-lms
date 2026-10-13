import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import BrandLockup from "@/components/BrandLockup";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  if (await getCurrentUser()) redirect("/");
  return (
    <AuthShell>
      <div className="narrow">
        <div className="card card-otto">
          <BrandLockup />
          <h1 className="page-title">Welcome back</h1>
          <p className="page-subtitle">
            Sign in with your registered corporate email address. If you have not registered yet, please{" "}
            <a href="/register">click here</a>.
          </p>
          <LoginForm />
        </div>
      </div>
    </AuthShell>
  );
}
