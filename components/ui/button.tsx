import Link from "next/link";
import * as React from "react";

import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary" | "ghost";
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold transition duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2";

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        baseStyles,
        variant === "primary" &&
          "bg-slate-900 text-white shadow-gold hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90",
        variant === "secondary" &&
          "border border-gold/25 bg-white text-slate-900 hover:border-gold hover:bg-gold/5 dark:bg-[#273443] dark:text-white",
        variant === "ghost" && "bg-transparent text-slate-900 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}

type LinkButtonProps = React.ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

export function LinkButton({
  className,
  variant = "primary",
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        baseStyles,
        variant === "primary" &&
          "bg-slate-900 text-white shadow-gold hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-white/90",
        variant === "secondary" &&
          "border border-gold/25 bg-white text-slate-900 hover:border-gold hover:bg-gold/5 dark:bg-[#273443] dark:text-white",
        variant === "ghost" && "bg-transparent text-slate-900 hover:bg-slate-900/5 dark:text-white dark:hover:bg-white/10",
        className
      )}
      {...props}
    />
  );
}
