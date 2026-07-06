"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  loading?: boolean;
  destructive?: boolean;
}

/** Controlled "are you sure?" dialog. Closing is blocked while `loading`. */
export default function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  loading = false,
  destructive = false,
}: Readonly<ConfirmDialogProps>) {
  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        if (loading) return;
        onOpenChange(next);
      }}
    >
      <DialogContent showCloseButton={!loading} className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant="outline"
              size="lg"
              disabled={loading}
              className="rounded-full"
            >
              {cancelLabel}
            </Button>
          </DialogClose>
          <Button
            size="lg"
            onClick={onConfirm}
            isLoading={loading}
            disabled={loading}
            className={cn(
              "rounded-full text-white",
              destructive
                ? "bg-destructive hover:bg-destructive/90"
                : "bg-[#E32C6F] hover:bg-[#c4225e]",
            )}
          >
            {confirmLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
