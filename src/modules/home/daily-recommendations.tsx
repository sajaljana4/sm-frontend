"use client";
import { usePromise } from "@/hooks/usePromise";
import { userService } from "@/services/users.service";
import { UserType } from "@/types/common/user.type";
import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import ProfileCard from "../users/profile-card";

function DailyRecommendations() {
  const [visitors, setVisitors] = useState<UserType[]>([]);

  const { runPromise, loading } = usePromise({
    promise: () => userService.getAllUsers({ limit: 12 }),
    onSuccess: (response) => {
      setVisitors(response.data);
    },
  });

  useEffect(() => {
    runPromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && visitors.length === 0) {
    return (
      <div className="bg-linear-to-b from-[#F1FFCA] to-[#F4FDFF] py-16">
        <div className="base-section max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8">Daily Recommendations</h2>
          <div className="flex justify-center py-10">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E93375]"></div>
          </div>
        </div>
      </div>
    );
  }

  if (visitors.length === 0) {
    return null;
  }

  return (
    <div className="bg-[#F1FFCA] py-4">
      <div className="base-section mx-auto px-4 overflow-hidden">
        <h2 className="text-3xl font-bold mb-8">Daily Recommendations</h2>

        <div className="-mx-4 sm:mx-0">
          <Carousel
            data={visitors}
            slidesPerView={{
              320: 1,
              640: 2,
              1024: 3,
              1280: 4,
            }}
            spaceBetween={{
              320: 16,
              640: 20,
              1024: 24,
              1280: 24,
            }}
            enableNavigation={false}
            enablePagination={true}
            renderSlide={(user) => <ProfileCard user={user} />}
          />
        </div>
      </div>
    </div>
  );
}

export default DailyRecommendations;
