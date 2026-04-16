import { LoginForm } from "@/components/admin/login-form";

export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-mist px-4">
      <div className="grid max-w-5xl gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="glass-panel gold-ring p-8 sm:p-12">
          <span className="eyebrow">Admin Access</span>
          <h1 className="mt-6 font-serif text-5xl leading-tight text-ink">
            Manage the entire digital presence from one premium control center.
          </h1>
          <p className="mt-5 max-w-xl text-lg leading-8 text-ink/72">
            Publish insights, update practice areas, curate testimonials, review
            inquiries, and manage media in a secure dashboard built for
            professional legal branding.
          </p>
        </div>
        <div className="glass-panel p-8 sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Secure Sign In
          </p>
          <h2 className="mt-4 font-serif text-4xl text-ink">Welcome back</h2>
          <p className="mt-3 text-sm leading-7 text-ink/62">
            Use your administrator credentials to access the content and inquiry
            management system.
          </p>
          <div className="mt-8">
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
