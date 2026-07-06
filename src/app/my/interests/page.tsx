"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Check,
  Clock,
  HeartHandshake,
  HeartOff,
  Send,
  User,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { interestsService } from "@/services/interests.service";
import type { InterestStatusType, InterestType } from "@/types/interests/response.model";
import type { UserType } from "@/types/common/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/pagination";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatImage } from "@/utils/format-image";
import { usePromise } from "@/hooks/usePromise";

const DEFAULT_LIMIT = 10;

type FilterTab = "all" | InterestStatusType;

const TABS: { value: FilterTab; label: string }[] = [
  { value: "all", label: "All" },
  { value: "pending", label: "Pending" },
  { value: "accepted", label: "Accepted" },
  { value: "rejected", label: "Rejected" },
];

const getUser = (value: string | UserType): UserType | null =>
  typeof value === "object" ? value : null;

const calculateAge = (dob: string | undefined) => {
  if (!dob) return null;
  const ageDifMs = Date.now() - new Date(dob).getTime();
  return Math.abs(new Date(ageDifMs).getUTCFullYear() - 1970);
};

const STATUS_CONFIG = {
  pending: {
    label: "Pending",
    cls: "bg-amber-50 text-amber-700 border-amber-200",
  },
  accepted: {
    label: "Accepted",
    cls: "bg-green-50 text-green-700 border-green-200",
  },
  rejected: {
    label: "Declined",
    cls: "bg-gray-100 text-gray-500 border-gray-200",
  },
};

function InterestCard({
  interest,
  onUpdate,
}: {
  interest: InterestType;
  onUpdate: (updated: InterestType) => void;
}) {
  const [pending, setPending] = useState<InterestStatusType | null>(null);
  const sender = getUser(interest.sender);
  const cfg = STATUS_CONFIG[interest.status];
  const busy = pending !== null;

  const handleRespond = async (status: InterestStatusType) => {
    try {
      setPending(status);
      const res = await interestsService.updateInterest({
        interestId: interest._id,
        body: { status },
      });
      if (res.statusCode >= 400) throw new Error(res.message);
      onUpdate(res.data);
      toast.success(
        status === "accepted" ? "Interest accepted!" : "Interest declined",
      );
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong");
    } finally {
      setPending(null);
    }
  };

  const senderName = sender
    ? `${sender.firstName} ${sender.lastName}`
    : "Unknown";

  return (
    <div className="flex items-start gap-4 rounded-2xl border border-border/60 bg-white p-4 shadow-sm">
      <Link href={sender ? `/users/${sender._id}` : "#"} className="shrink-0">
        <Avatar className="size-16 rounded-xl">
          <AvatarImage
            src={
              sender?.profileImages?.[0]
                ? formatImage(sender.profileImages[0])
                : ""
            }
            alt={senderName}
            className="object-cover"
          />
          <AvatarFallback className="rounded-xl bg-pink-50 text-lg font-semibold text-[#E32C6F]">
            {sender?.firstName?.charAt(0) ?? <User className="size-5" />}
            {sender?.lastName?.charAt(0) ?? ""}
          </AvatarFallback>
        </Avatar>
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div>
            <Link
              href={sender ? `/users/${sender._id}` : "#"}
              className="font-semibold text-foreground transition-colors hover:text-[#E32C6F]"
            >
              {senderName}
            </Link>
            {sender?.dob && (
              <p className="text-sm text-muted-foreground">
                Age: {calculateAge(sender.dob)}
                {sender.address?.city ? ` • ${sender.address.city}` : ""}
              </p>
            )}
          </div>
          <span
            className={`shrink-0 rounded-full border px-2.5 py-0.5 text-xs font-medium ${cfg.cls}`}
          >
            {cfg.label}
          </span>
        </div>

        {interest.status === "pending" && (
          <div className="mt-3 flex flex-wrap gap-2">
            <Button
              size="sm"
              onClick={() => handleRespond("accepted")}
              isLoading={pending === "accepted"}
              disabled={busy}
              className="rounded-full bg-[#E32C6F] px-4 text-white hover:bg-[#c4225e]"
            >
              <Check className="size-3.5" /> Accept
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleRespond("rejected")}
              isLoading={pending === "rejected"}
              disabled={busy}
              className="rounded-full px-4"
            >
              <X className="size-3.5" /> Decline
            </Button>
          </div>
        )}

        {interest.status === "accepted" && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-green-600">
            <HeartHandshake className="size-4" />
            <span>You are now connected</span>
          </div>
        )}

        {interest.status === "rejected" && (
          <div className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
            <HeartOff className="size-4" />
            <span>You rejected this interest</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MyInterestsPage() {
  const [interests, setInterests] = useState<InterestType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);
  const [activeTab, setActiveTab] = useState<FilterTab>("all");

  const { runPromise, loading } = usePromise({
    promise: () =>
      interestsService.getMyInterests({
        skip,
        limit,
        status: activeTab === "all" ? undefined : activeTab,
      }),
    onSuccess: (res) => {
      setInterests(res.data);
      setTotalCount(res.totalCount);
    },
  });

  useEffect(() => {
    runPromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit, activeTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value as FilterTab);
    setSkip(0);
  };

  const handleUpdate = (updated: InterestType) => {
    setInterests((prev) =>
      prev.map((i) => (i._id === updated._id ? updated : i)),
    );
  };

  return (
    <div className="space-y-4 base-page">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Interests</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            People who have shown interest in your profile
          </p>
        </div>
        <Link href="/my/interests/history">
          <Button variant="outline" className="shrink-0 rounded-full bg-[#E32C6F] text-white hover:bg-[#c4225e] hover:text-white">
            <Send className="size-4" />
            My Sent Interests
          </Button>
        </Link>
      </div>

      <Tabs value={activeTab} onValueChange={handleTabChange}>
        <TabsList className="w-100">
          {TABS.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {loading && interests.length === 0 ? (
        <div className="flex items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-[#E93375]" />
        </div>
      ) : interests.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-16 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#E32C6F]/10">
            <Clock className="size-7 text-[#E32C6F]" />
          </div>
          <p className="mt-4 font-semibold text-foreground">No interests yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            When someone shows interest in your profile, it will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            {interests.map((interest) => (
              <InterestCard
                key={interest._id}
                interest={interest}
                onUpdate={handleUpdate}
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
