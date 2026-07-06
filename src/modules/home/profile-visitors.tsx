"use client";
import { usePromise } from "@/hooks/usePromise";
import { useEffect, useState } from "react";
import Carousel from "@/components/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatImage } from "@/utils/format-image";
import { profileVisitorService } from "@/services/profile-visitor.service";
import { ProfileVisitorType } from "@/types/profile-visitors/response.type";
import Link from "next/link";

function ProfileVisitors() {
  const [profileVisitors, setProfileVisitors] = useState<ProfileVisitorType[]>(
    [],
  );

  const { runPromise, loading } = usePromise({
    promise: profileVisitorService.getMyProfileVisitors,
    onSuccess: (response) => {
      setProfileVisitors(response.data);
    },
  });

  useEffect(() => {
    runPromise();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading && profileVisitors.length === 0) {
    return (
      <section className="base-section max-w-6xl mx-auto py-12 px-4">
        <h2 className="text-2xl font-bold mb-8">Profile Visitors</h2>
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E93375]"></div>
        </div>
      </section>
    );
  }

  if (profileVisitors.length === 0) {
    return null;
  }

  return (
    <section className="base-section mx-auto overflow-hidden">
      <h2 className="text-2xl font-bold mb-4 text-center sm:text-left">
        Profile Visitors
      </h2>
      <div className="-mx-4 sm:mx-0">
        <Carousel
          data={profileVisitors}
          slidesPerView={{
            320: 2,
            640: 3,
            1024: 5,
            1280: 6,
          }}
          spaceBetween={{
            320: 16,
            640: 20,
            1024: 15,
            1280: 15,
          }}
          enableNavigation={false}
          enablePagination={true}
          renderSlide={(profileVisitor) => {
            const user = profileVisitor.user;
            return (
              <Link href={`/users/${user._id}`}>
                <div className="flex flex-col items-center gap-4 py-4">
                  <div className="rounded-full p-1 border-2 border-[#E93375] shadow-sm transition-transform hover:scale-105">
                    <Avatar className="h-20 w-20 md:h-28 md:w-28">
                      <AvatarImage
                        src={
                          user.profileImages?.[0]
                            ? formatImage(user.profileImages[0])
                            : ""
                        }
                        alt={`${user.firstName} ${user.lastName}`}
                        className="object-cover"
                      />
                      <AvatarFallback className="text-2xl h-20 w-20 md:h-28 md:w-28 sm:text-3xl font-semibold bg-pink-50 text-[#E93375]">
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <h3 className="font-semibold text-center truncate w-full">
                    {user.firstName} {user.lastName}
                  </h3>
                </div>
              </Link>
            );}}
        />
      </div>
    </section>
  );
}

export default ProfileVisitors;
