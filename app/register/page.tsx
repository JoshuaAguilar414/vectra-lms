import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import AuthShell from "@/components/AuthShell";
import BrandLockup from "@/components/BrandLockup";
import RegisterForm from "@/components/RegisterForm";

export default async function RegisterPage() {
  if (await getCurrentUser()) redirect("/");
  return (
    <AuthShell>
      <div className="narrow">
        <div className="card card-otto">
          <BrandLockup />
          <h1 className="page-title">Registration</h1>
          <p className="page-subtitle">Create your learner account to access assigned training.</p>
          <RegisterForm />
          <p className="reg-footer">
            Already registered? <a href="/login">Sign in</a>
          </p>
        </div>
      </div>
    </AuthShell>
  );
}
