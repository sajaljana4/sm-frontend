import { UserType } from "@/types/common/user.type";
import Image from "next/image";
import { formatImage } from "@/utils/format-image";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";
import Link from "next/link";

const calculateAge = (dob: string | undefined) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const formatHeight = (height: number | undefined) => {
  if (!height) return "N/A";
  const totalInches = Math.round(height / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
};

function ProfileCard({ user }: { user: UserType }) {
  return (
    <Link href={`/users/${user._id}`} className="w-full h-full">
      <div className="flex flex-col gap-4 py-4 w-full">
        <div className="w-full aspect-square relative rounded-[2rem] overflow-hidden shadow-sm bg-gray-100">
          {user.profileImages?.[0] ? (
            <Image
              src={formatImage(user.profileImages[0])}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-linear-to-br from-pink-50 to-gray-100 text-gray-300">
              <User className="w-16 h-16 stroke-1" />
            </div>
          )}
        </div>

        <div className="flex flex-col gap-1.5 px-2">
          <h3 className="font-bold text-2xl text-black truncate">
            {user.firstName} {user.lastName}
          </h3>

          <p className="text-gray-700 text-[15px]">
            Age : {calculateAge(user.dob)} Height :{" "}
            {formatHeight(user.physicalInformation?.height)}
          </p>

          <p className="text-gray-700 text-[15px] truncate">
            From : {user.address?.city ? `${user.address?.city}, ` : ""}
            {user.address?.state ? `${user.address?.state}, ` : ""}
            {user.currentLocation?.country}
          </p>

          <div className="mt-2">
            <Button
              variant="outline"
              className="bg-white text-[#E93375] hover:bg-pink-50 hover:text-[#E93375] border-transparent rounded-xl font-medium px-6 py-5 shadow-sm"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProfileCard;
