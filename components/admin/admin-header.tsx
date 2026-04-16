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
    <div className="flex flex-col gap-3 border-b border-ink/8 pb-6 sm:pb-8 md:flex-row md:items-end md:justify-between">
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-gold">Dashboard</p>
        <h1 className="font-serif text-3xl text-ink sm:text-4xl">{title}</h1>
        <p className="max-w-xl text-sm leading-6 text-ink/55">{description}</p>
      </div>
      <div className="flex items-center gap-2">
        {action}
        <SignOutButton />
      </div>
    </div>
  );
}
