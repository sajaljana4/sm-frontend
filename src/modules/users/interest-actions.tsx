"use client";

import { useState } from "react";
import {
  BadgeCheck,
  Check,
  Clock,
  Heart,
  HeartHandshake,
  HeartOff,
  Undo2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import ConfirmDialog from "@/components/confirm-dialog";
import { interestsService } from "@/services/interests.service";
import type {
  InterestStatusType,
  InterestType,
} from "@/types/interests/response.model";
import type { UserType } from "@/types/common/user.type";

const getId = (value: string | UserType): string =>
  typeof value === "string" ? value : value._id;

type ConfirmAction = null | "send" | "withdraw";
type PendingAction = InterestStatusType | "send" | "withdraw" | null;

interface InterestActionsProps {
  targetUserId: string;
  initialInterest: InterestType | null;
  targetName?: string;
}

export default function InterestActions({
  targetUserId,
  initialInterest,
  targetName,
}: Readonly<InterestActionsProps>) {
  const [interest, setInterest] = useState<InterestType | null>(
    initialInterest,
  );
  const [pending, setPending] = useState<PendingAction>(null);
  const [confirm, setConfirm] = useState<ConfirmAction>(null);

  const who = targetName?.trim() || "this member";
  const busy = pending !== null;

  const doSend = async () => {
    try {
      setPending("send");
      const res = await interestsService.sendInterest(targetUserId);
      if (res.statusCode >= 400) throw new Error(res.message);
      setInterest(res.data);
      setConfirm(null);
      toast.success(res.message ?? "Interest sent!");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to send interest");
    } finally {
      setPending(null);
    }
  };

  const doWithdraw = async () => {
    if (!interest) return;
    try {
      setPending("withdraw");
      const res = await interestsService.deleteInterest(interest._id);
      if (res.statusCode >= 400) throw new Error(res.message);
      setInterest(null);
      setConfirm(null);
      toast.success(res.message ?? "Interest withdrawn");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to withdraw interest");
    } finally {
      setPending(null);
    }
  };

  const handleRespond = async (status: InterestStatusType) => {
    if (!interest) return;
    try {
      setPending(status);
      const res = await interestsService.updateInterest({
        interestId: interest._id,
        body: { status },
      });
      if (res.statusCode >= 400) throw new Error(res.message);
      setInterest(res.data);
      toast.success(
        status === "accepted" ? "Interest accepted!" : "Interest declined",
      );
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong");
    } finally {
      setPending(null);
    }
  };

  // ── State: no relationship yet ──────────────────────────────────
  if (!interest) {
    return (
      <>
        <Button
          size="lg"
          onClick={() => setConfirm("send")}
          className="rounded-full w-full bg-[#E32C6F] px-6 text-white hover:bg-[#c4225e]"
        >
          <Heart className="size-4" /> Send Interest
        </Button>

        <ConfirmDialog
          open={confirm === "send"}
          onOpenChange={(next) => {
            if (!next) setConfirm(null);
          }}
          loading={pending === "send"}
          title="Send Interest?"
          description={`You're about to send an interest to ${who}. They'll be notified and can choose to accept or decline.`}
          confirmLabel="Send Interest"
          onConfirm={doSend}
        />
      </>
    );
  }

  // ── State: accepted ─────────────────────────────────────────────
  if (interest.status === "accepted") {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-green-200 bg-green-50 px-4 py-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-green-100">
          <BadgeCheck className="size-4 text-green-600" />
        </span>
        <div>
          <p className="text-sm font-semibold text-green-700">
            Interest Accepted
          </p>
          <p className="text-xs text-green-600/80">
            You and {who} are now connected
          </p>
        </div>
        <HeartHandshake className="ml-auto size-5 text-green-400" />
      </div>
    );
  }

  // ── State: declined ─────────────────────────────────────────────
  if (interest.status === "rejected") {
    return (
      <div className="flex items-center gap-2.5 rounded-2xl border border-border bg-muted/40 px-4 py-3">
        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-muted">
          <HeartOff className="size-4 text-muted-foreground" />
        </span>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Interest Declined
          </p>
          <p className="text-xs text-muted-foreground">
            {who} chose not to connect at this time
          </p>
        </div>
      </div>
    );
  }

  // ── State: incoming pending (target sent; viewer must respond) ──
  if (getId(interest.sender) === targetUserId) {
    return (
      <div className="w-full rounded-2xl border border-[#E32C6F]/20 bg-[#E32C6F]/5 p-4">
        <div className="mb-3 flex items-center gap-2">
          <Heart className="size-4 text-[#E32C6F]" />
          <p className="text-sm font-semibold text-foreground">
            {who} sent you an interest
          </p>
        </div>
        <p className="mb-4 text-xs text-muted-foreground">
          Respond to let them know if you&apos;d like to connect.
        </p>
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            onClick={() => handleRespond("accepted")}
            isLoading={pending === "accepted"}
            disabled={busy}
            className="rounded-full bg-[#E32C6F] px-5 text-white hover:bg-[#c4225e]"
          >
            <Check className="size-3.5" /> Accept Interest
          </Button>
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleRespond("rejected")}
            isLoading={pending === "rejected"}
            disabled={busy}
            className="rounded-full px-5"
          >
            <X className="size-3.5" /> Decline
          </Button>
        </div>
      </div>
    );
  }

  // ── State: outgoing pending (viewer sent; awaiting response) ────
  return (
    <>
      <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[#E32C6F]/20 bg-[#E32C6F]/5 px-4 py-3">
        <div className="flex items-center gap-2.5">
          <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#E32C6F]/10">
            <Clock className="size-4 text-[#E32C6F]" />
          </span>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Interest Sent
            </p>
            <p className="text-xs text-muted-foreground">
              Waiting for {who} to respond
            </p>
          </div>
        </div>
        <Button
          size="sm"
          variant="outline"
          onClick={() => setConfirm("withdraw")}
          className="shrink-0 rounded-full border-destructive/40 px-4 text-destructive hover:bg-destructive/5 hover:text-destructive"
        >
          <Undo2 className="size-3.5" /> Withdraw Interest
        </Button>
      </div>

      <ConfirmDialog
        open={confirm === "withdraw"}
        onOpenChange={(next) => {
          if (!next) setConfirm(null);
        }}
        loading={pending === "withdraw"}
        destructive
        title="Withdraw your interest?"
        description={`This will cancel the interest request you sent to ${who}. You can always send it again later.`}
        confirmLabel="Yes, withdraw interest"
        onConfirm={doWithdraw}
      />
    </>
  );
}
