import * as React from "react";
import { cn } from "@/lib/utils";
import { Label } from "./label";

interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
}

function Input({ label, error, className, type, ...props }: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <Label className="mb-2" htmlFor={props.id}>
          {label}
        </Label>
      )}
      <input
        type={type}
        data-slot="input"
        className={cn(
          "h-9 w-full min-w-0 rounded-4xl border border-input bg-input/30 px-3 py-1 text-base transition-colors outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-[3px] aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
          error
            ? "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20"
            : "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
          className,
        )}
        {...props}
      />
      {error && <p className="text-destructive mt-1 text-sm">{error}</p>}
    </div>
  );
}

export { Input };
