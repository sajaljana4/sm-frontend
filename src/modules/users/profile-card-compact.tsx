import { EMPLOYMENT_OPTIONS } from "@/constants/user.constants";
import { formatImage } from "@/utils/format-image";
import { UserType } from "@/types/common/user.type";
import Image from "next/image";
import { User } from "lucide-react";
import Link from "next/link";

const formatHeight = (height: number | undefined) => {
  if (!height) return "N/A";
  const totalInches = Math.round(height / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
};

const calculateAge = (dob: string | undefined) => {
  if (!dob) return "N/A";
  const birthDate = new Date(dob);
  const ageDifMs = Date.now() - birthDate.getTime();
  const ageDate = new Date(ageDifMs);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const getEmploymentLabel = (value: string | undefined) => {
  if (!value) return "N/A";
  const option = EMPLOYMENT_OPTIONS.find((o) => o.value === value);
  return option?.label ?? value;
};

function ProfileCardCompact({ user }: { user: UserType }) {
  return (
    <Link href={`/users/${user._id}`}>
      <div className="flex items-center gap-4 bg-white rounded-2xl border border-gray-200 p-3 shadow-sm hover:shadow-md transition-shadow">
        {/* Image */}
        <div className="relative shrink-0 w-28 h-28 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
          {user.profileImages?.[0] ? (
            <Image
              src={formatImage(user.profileImages[0])}
              alt={`${user.firstName} ${user.lastName}`}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-pink-50 to-gray-100 text-gray-300">
              <User className="w-10 h-10 stroke-1" />
            </div>
          )}
          {/* Online indicator */}
          <span className="absolute bottom-1.5 right-1.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white" />
        </div>

        {/* Info */}
        <div className="flex flex-col gap-1 min-w-0 flex-1">
          <h3 className="font-bold text-lg sm:text-xl text-black truncate">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-gray-600 text-sm">
            Age : {calculateAge(user.dob)} Height :{" "}
            {formatHeight(user.physicalInformation?.height)}
          </p>
          <p className="text-gray-600 text-sm truncate">
            {getEmploymentLabel(user.occupation?.employedIn)}
          </p>
          <p className="text-gray-600 text-sm truncate">
            From : {user.address?.city || "Unknown"},{" "}
            {user.address?.state || "Unknown"}.{" "}
            {user.currentLocation?.country || "India"}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ProfileCardCompact;
