import { SignOutButton } from "@/components/admin/sign-out-button";

export function AdminHeader({
  title,
  description,
  action
}: {
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 border-b border-ink/8 pb-8 md:flex-row md:items-end md:justify-between">
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Dashboard
        </p>
        <h1 className="font-serif text-4xl text-ink">{title}</h1>
        <p className="max-w-2xl text-sm leading-7 text-ink/62">{description}</p>
      </div>
      <div className="flex items-center gap-3">
        {action}
        <SignOutButton />
      </div>
    </div>
  );
}
