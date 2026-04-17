"use client";

import { useEffect } from "react";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminBottomNav } from "@/components/admin/admin-bottom-nav";

export function AdminShell({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Force light mode for admin dashboard
    document.documentElement.classList.remove("dark");
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f5f8] text-ink">
      <div className="mx-auto flex min-h-screen max-w-[1720px]">
        <AdminSidebar />
        <main className="flex-1 px-4 py-6 pb-24 sm:px-6 lg:px-10 xl:pb-6">{children}</main>
      </div>
      <AdminBottomNav />
    </div>
  );
}
