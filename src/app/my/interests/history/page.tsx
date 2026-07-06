"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Clock,
  HeartHandshake,
  HeartOff,
  Send,
  Trash2,
  User,
} from "lucide-react";
import { toast } from "sonner";
import { interestsService } from "@/services/interests.service";
import type { InterestType } from "@/types/interests/response.model";
import type { UserType } from "@/types/common/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ConfirmDialog from "@/components/confirm-dialog";
import { Pagination } from "@/components/pagination";
import { formatImage } from "@/utils/format-image";
import { usePromise } from "@/hooks/usePromise";

const DEFAULT_LIMIT = 10;

const getUser = (value: string | UserType): UserType | null =>
  typeof value === "object" ? value : null;

const calculateAge = (dob: string | undefined) => {
  if (!dob) return null;
  const ageDifMs = Date.now() - new Date(dob).getTime();
  return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
};

const formatSentTime = (iso: string) => {
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60_000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(iso).toLocaleDateString("en-IN", { day: "numeric", month: "short" });
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
    Icon: Clock,
  },
  accepted: {
    label: "Accepted",
    cls: "bg-green-50 text-green-700 border-green-200",
    Icon: HeartHandshake,
  },
  rejected: {
    label: "Declined",
    cls: "bg-gray-100 text-gray-500 border-gray-200",
    Icon: HeartOff,
  },
};

function SentInterestCard({
  interest,
  onDelete,
}: {
  interest: InterestType;
  onDelete: (id: string) => void;
}) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const receiver = getUser(interest.receiver);
  const { Icon, label, cls } = STATUS_CONFIG[interest.status];

  const doDelete = async () => {
    try {
      setDeleting(true);
      const res = await interestsService.deleteInterest(interest._id);
      if (res.statusCode >= 400) throw new Error(res.message);
      onDelete(interest._id);
      toast.success(res.message ?? "Interest withdrawn");
    } catch (error) {
      toast.error((error as Error).message ?? "Failed to withdraw interest");
    } finally {
      setDeleting(false);
      setConfirmOpen(false);
    }
  };

  const fullName = receiver
    ? `${receiver.firstName} ${receiver.lastName}`
    : "Unknown";

  return (
    <>
      <div className="group flex items-center gap-4 rounded-2xl border border-border/60 bg-white px-4 py-3.5 shadow-sm transition-all duration-200 hover:shadow-md">
        {/* Avatar */}
        <Link href={receiver ? `/users/${receiver._id}` : "#"} className="shrink-0">
          <Avatar className="size-14 ring-2 ring-[#E32C6F]/20 ring-offset-2">
            <AvatarImage
              src={
                receiver?.profileImages?.[0]
                  ? formatImage(receiver.profileImages[0])
                  : ""
              }
              alt={fullName}
              className="object-cover"
            />
            <AvatarFallback className="bg-pink-50 text-base font-semibold text-[#E32C6F]">
              {receiver?.firstName?.charAt(0) ?? <User className="size-5" />}
              {receiver?.lastName?.charAt(0) ?? ""}
            </AvatarFallback>
          </Avatar>
        </Link>

        {/* Info */}
        <div className="min-w-0 flex-1">
          <Link
            href={receiver ? `/users/${receiver._id}` : "#"}
            className="block font-semibold text-foreground leading-tight transition-colors group-hover:text-[#E32C6F]"
          >
            {fullName}
          </Link>
          {(receiver?.dob || receiver?.address?.city) && (
            <p className="mt-0.5 text-xs text-muted-foreground truncate">
              {receiver.dob && `Age ${calculateAge(receiver.dob)}`}
              {receiver.dob && receiver.address?.city && " · "}
              {receiver.address?.city}
            </p>
          )}
          <p className="mt-1 text-[11px] text-muted-foreground/60">
            Sent {formatSentTime(interest.createdAt)}
          </p>
        </div>

        {/* Status + action */}
        <div className="flex shrink-0 flex-col items-end gap-2">
          <span className={`flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cls}`}>
            <Icon className="size-3" />
            {label}
          </span>
          {interest.status !== "pending" && (
            <button
              type="button"
              onClick={() => setConfirmOpen(true)}
              className="flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] text-muted-foreground/60 transition-colors hover:text-destructive"
            >
              <Trash2 className="size-3" />
              Withdraw
            </button>
          )}
        </div>
      </div>

      <ConfirmDialog
        open={confirmOpen}
        onOpenChange={(next) => {
          if (!next) setConfirmOpen(false);
        }}
        loading={deleting}
        destructive
        title="Withdraw interest?"
        description={`This will cancel the interest request you sent to ${fullName}. You can always send it again later.`}
        confirmLabel="Yes, withdraw"
        onConfirm={doDelete}
      />
    </>
  );
}

export default function SentInterestsPage() {
  const [interests, setInterests] = useState<InterestType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const { runPromise, loading } = usePromise({
    promise: () => interestsService.getMySentInterests({ skip, limit }),
    onSuccess: (res) => {
      setInterests(res.data);
      setTotalCount(res.totalCount);
    },
  });

  useEffect(() => {
    runPromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit]);

  const handleDelete = (id: string) => {
    setInterests((prev) => prev.filter((i) => i._id !== id));
    setTotalCount((prev) => Math.max(0, prev - 1));
  };

  return (
    <div className="space-y-6 base-page">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Sent Interests</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Profiles you have sent interest to
        </p>
      </div>

      {loading && interests.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#E93375]" />
        </div>
      ) : interests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#E32C6F]/10">
            <Send className="size-7 text-[#E32C6F]" />
          </div>
          <p className="mt-4 font-semibold text-foreground">
            No sent interests
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Start browsing profiles and send interests to connect with people.
          </p>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-2.5">
            {interests.map((interest) => (
              <SentInterestCard
                key={interest._id}
                interest={interest}
                onDelete={handleDelete}
              />
            ))}
          </div>

          <Pagination
            totalCount={totalCount}
            limit={limit}
            setLimit={(l) => {
              setLimit(l);
              setSkip(0);
            }}
            skip={skip}
            setSkip={setSkip}
          />
        </>
      )}
    </div>
  );
}
