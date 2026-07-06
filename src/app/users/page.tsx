"use client";

import { Input } from "@/components/ui/input";
import ProfileCard from "@/modules/users/profile-card";
import { userService } from "@/services/users.service";
import { UserType } from "@/types/common/user.type";
import { Loader2, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const LIMIT = 12;

function Page() {
  const [users, setUsers] = useState<UserType[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [skip, setSkip] = useState(0);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const hasMore = users.length < totalCount;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setUsers([]);
      setSkip(0);
      setTotalCount(0);
      setDebouncedSearch(value);
    }, 400);
  };

  useEffect(() => {
    let cancelled = false;

    const run = async () => {
      setLoading(true);
      try {
        const res = await userService.getAllUsers({
          skip,
          limit: LIMIT,
          search: debouncedSearch || undefined,
        });
        if (!cancelled) {
          setUsers((prev) => (skip === 0 ? (res.data ?? []) : [...prev, ...(res.data ?? [])]));
          setTotalCount(res.totalCount ?? 0);
        }
      } catch {
        // leave existing list intact on error
      } finally {
        if (!cancelled) {
          setLoading(false);
          setInitialLoad(false);
        }
      }
    };

    run();
    return () => {
      cancelled = true;
    };
  }, [skip, debouncedSearch]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          setSkip((prev) => prev + LIMIT);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, [hasMore, loading]);

  return (
    <div className="base-page space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h1 className="text-2xl font-bold">Find Matches</h1>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder="Search by name..."
            value={search}
            onChange={handleSearchChange}
            className="pl-9"
          />
        </div>
      </div>

      {initialLoad ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div key={i} className="w-full aspect-[3/4] rounded-[2rem] bg-gray-100 animate-pulse" />
          ))}
        </div>
      ) : users.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-gray-400">
          <p className="text-lg">No users found</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {users.map((user) => (
            <ProfileCard key={user._id} user={user} />
          ))}
        </div>
      )}

      <div ref={sentinelRef} className="flex justify-center py-4">
        {loading && !initialLoad && (
          <Loader2 className="w-6 h-6 animate-spin text-[#E32C6F]" />
        )}
      </div>
    </div>
  );
}

export default Page;
