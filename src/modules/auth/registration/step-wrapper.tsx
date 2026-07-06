"use client";

import { cn } from "@/lib/utils";

interface StepWrapperProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function StepWrapper({
  title,
  subtitle,
  children,
  className,
}: Readonly<StepWrapperProps>) {
  return (
    <div className={cn("w-full animate-in fade-in-0 slide-in-from-right-4 duration-300", className)}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
