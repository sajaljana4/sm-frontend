"use client";

import { Button } from "@/components/ui/button";

interface ProfileSectionShellProps {
  title: string;
  description: string;
  isLoading?: boolean;
  onSubmit: () => void;
  children: React.ReactNode;
}

/**
 * Shared chrome for every profile settings section: a header (title +
 * description), a divider, the section fields, and a trailing "Save Changes"
 * button. The wrapping <form> wires `onSubmit` (already passed through
 * react-hook-form's handleSubmit) so each section saves independently.
 */
export default function ProfileSectionShell({
  title,
  description,
  isLoading,
  onSubmit,
  children,
}: Readonly<ProfileSectionShellProps>) {
  return (
    <div className="animate-in fade-in-0 duration-300">
      <div className="mb-5">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="h-px w-full bg-border" />

      <form onSubmit={onSubmit} className="space-y-5 pt-6">
        {children}
        <div className="pt-2">
          <Button
            type="submit"
            size="lg"
            isLoading={isLoading}
            className="rounded-full bg-[#E32C6F] px-8 text-white hover:bg-[#c4225e]"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
}
