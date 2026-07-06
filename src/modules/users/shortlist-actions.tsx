"use client";

import { useState } from "react";
import { Bookmark, BookmarkCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/confirm-dialog";
import { shortlistService } from "@/services/shortlist.service";
import type { ShortlistResponseType } from "@/types/shortlists/response.type";

interface ShortlistActionsProps {
  targetUserId: string;
  initialShortlist: ShortlistResponseType | null;
  targetName?: string;
}

export default function ShortlistActions({
  targetUserId,
  initialShortlist,
  targetName,
}: Readonly<ShortlistActionsProps>) {
  const [shortlist, setShortlist] = useState<ShortlistResponseType | null>(
    initialShortlist,
  );
  const [pending, setPending] = useState(false);
  const [confirmRemove, setConfirmRemove] = useState(false);

  const who = targetName?.trim() || "this profile";

  const doAdd = async () => {
    try {
      setPending(true);
      const res = await shortlistService.addToShortlist(targetUserId);
      if (res.statusCode >= 400) throw new Error(res.message);
      setShortlist(res.data);
      toast.success(res.message ?? "Profile saved to shortlist");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to save profile");
    } finally {
      setPending(false);
    }
  };

  const doRemove = async () => {
    if (!shortlist) return;
    try {
      setPending(true);
      const res = await shortlistService.removeFromShortlist(shortlist._id);
      if (res.statusCode >= 400) throw new Error(res.message);
      setShortlist(null);
      setConfirmRemove(false);
      toast.success(res.message ?? "Removed from shortlist");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to remove from shortlist");
    } finally {
      setPending(false);
    }
  };

  if (!shortlist) {
    return (
      <Button
        variant="outline"
        onClick={doAdd}
        isLoading={pending}
        size={"lg"}
        className="rounded-full border-amber-300 bg-amber-50 px-4 text-amber-700 hover:border-amber-400 hover:bg-amber-100 hover:text-amber-800"
      >
        <Bookmark className="size-3.5" />
        Save Profile
      </Button>
    );
  }

  return (
    <>
      <div className="flex w-fit items-center gap-2 rounded-full border border-amber-200 bg-amber-50 py-1.5 pl-3 pr-1.5">
        <BookmarkCheck className="size-4 shrink-0 text-amber-600" />
        <span className="text-sm font-medium text-amber-700">Profile Saved</span>
        <button
          type="button"
          title="Remove from shortlist"
          onClick={() => setConfirmRemove(true)}
          className="ml-1 flex size-6 items-center justify-center rounded-full text-amber-500 transition-colors hover:bg-amber-200 hover:text-amber-800"
        >
          <Trash2 className="size-3.5" />
        </button>
      </div>

      <ConfirmDialog
        open={confirmRemove}
        onOpenChange={(next) => {
          if (!next) setConfirmRemove(false);
        }}
        loading={pending}
        destructive
        title="Remove from shortlist?"
        description={`${who} will be removed from your personal shortlist. You can always save them again.`}
        confirmLabel="Yes, remove"
        onConfirm={doRemove}
      />
    </>
  );
}
