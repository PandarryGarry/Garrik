"use client";

import { cn } from "@ui/utils/cn";
import { Loader2 } from "lucide-react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export function Button({ 
  children, className, variant = "primary", isLoading, disabled, ...props 
}: ButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition focus:outline-none focus:ring-2 disabled:opacity-50";
  const variants = {
    primary: "bg-stone-900 hover:bg-stone-800 text-white shadow-lg shadow-stone-900/10 focus:ring-stone-900/20",
    secondary: "bg-white hover:bg-stone-50 text-stone-700 border border-stone-200 focus:ring-stone-200",
  };

  return (
    <button 
      className={cn(base, variants[variant], className)} 
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="animate-spin" size={18} aria-hidden="true" />}
      {children}
    </button>
  );
}

