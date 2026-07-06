"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, MapPin, Trash2, User } from "lucide-react";
import { toast } from "sonner";
import { shortlistService } from "@/services/shortlist.service";
import type { ShortlistResponseType } from "@/types/shortlists/response.type";
import type { UserType } from "@/types/common/user.type";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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

function ShortlistRow({
  shortlist,
  onRemove,
}: {
  shortlist: ShortlistResponseType;
  onRemove: (id: string) => void;
}) {
  const [removing, setRemoving] = useState(false);
  const user = getUser(shortlist.shortlistedUser);
  const userName =
    user?.fullName ?? (user ? `${user.firstName} ${user.lastName}` : "Unknown");
  const age = calculateAge(user?.dob);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const smId = (user as any)?.smId as string | undefined;

  const handleRemove = async () => {
    try {
      setRemoving(true);
      const res = await shortlistService.removeFromShortlist(shortlist._id);
      if (res.statusCode >= 400) throw new Error(res.message);
      onRemove(shortlist._id);
      toast.success("Removed from shortlist");
    } catch (error) {
      toast.error((error as Error).message ?? "Something went wrong");
    } finally {
      setRemoving(false);
    }
  };

  return (
    <div className="flex items-center gap-4 px-5 py-4">
      {/* Avatar + name */}
      <Link
        href={user ? `/users/${user._id}` : "#"}
        className="flex min-w-0 flex-1 items-center gap-3"
      >
        <Avatar className="size-10 shrink-0">
          <AvatarImage
            src={
              user?.profileImages?.[0]
                ? formatImage(user.profileImages[0])
                : ""
            }
            alt={userName}
            className="object-cover"
          />
          <AvatarFallback className="bg-pink-50 text-sm font-semibold text-[#E32C6F]">
            {user?.firstName?.charAt(0) ?? <User className="size-4" />}
            {user?.lastName?.charAt(0) ?? ""}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-foreground transition-colors group-hover:text-[#E32C6F]">
            {userName}
          </p>
          {smId && (
            <p className="truncate text-xs text-muted-foreground">{smId}</p>
          )}
        </div>
      </Link>

      {/* Meta */}
      <div className="flex shrink-0 items-center gap-2">
        {age && (
          <span className="rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground">
            {age} yrs
          </span>
        )}

        {user?.address?.city && (
          <span className="hidden items-center gap-1 text-xs text-muted-foreground sm:flex">
            <MapPin className="size-3 shrink-0" />
            {user.address.city}
          </span>
        )}

        {user?.religion && (
          <span className="hidden rounded-full border border-border px-2.5 py-0.5 text-xs text-foreground lg:inline-flex">
            {user.religion}
          </span>
        )}

        <Button
          size="icon"
          variant="ghost"
          onClick={handleRemove}
          isLoading={removing}
          className="size-8 shrink-0 rounded-lg text-muted-foreground/40 hover:bg-red-50 hover:text-red-500"
          aria-label="Remove from shortlist"
        >
          {!removing && <Trash2 className="size-4" />}
        </Button>
      </div>
    </div>
  );
}

export default function MyShortlistsPage() {
  const [shortlists, setShortlists] = useState<ShortlistResponseType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [limit, setLimit] = useState(DEFAULT_LIMIT);

  const { runPromise, loading } = usePromise({
    promise: () => shortlistService.getMyShortlists({ skip, limit }),
    onSuccess: (res) => {
      setShortlists(res.data ?? []);
      setTotalCount(res.totalCount ?? 0);
    },
  });

  useEffect(() => {
    runPromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip, limit]);

  const handleRemove = (id: string) => {
    setShortlists((prev) => prev.filter((s) => s._id !== id));
    setTotalCount((prev) => prev - 1);
  };

  return (
    <div className="space-y-6 base-page">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Shortlists</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Profiles you have saved to your shortlist
        </p>
      </div>

      {loading && shortlists.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <div className="h-7 w-7 animate-spin rounded-full border-2 border-border border-t-[#E32C6F]" />
        </div>
      ) : shortlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-white py-20 text-center">
          <div className="flex size-14 items-center justify-center rounded-full bg-[#E32C6F]/10">
            <Bookmark className="size-6 text-[#E32C6F]" />
          </div>
          <p className="mt-4 text-sm font-semibold text-foreground">
            No shortlisted profiles yet
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Profiles you shortlist will appear here.
          </p>
        </div>
      ) : (
        <>
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-sm">
            <div className="divide-y divide-border">
              {shortlists.map((shortlist) => (
                <ShortlistRow
                  key={shortlist._id}
                  shortlist={shortlist}
                  onRemove={handleRemove}
                />
              ))}
            </div>
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
