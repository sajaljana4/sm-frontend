import { userService } from "@/services/users.service";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProfileCardCompact from "../users/profile-card-compact";

async function PartnerFindingSection() {
  const { data } = await userService.getAllUsers({ limit: 12 });

  if (!data || data.length === 0) return null;

  // Filter users to ensure they have valid _id
  const validUsers = data.filter((user) => user && user._id);

  if (validUsers.length === 0) return null;

  return (
    <div className="bg-[#E8FBFD]">
      <div className="base-section px-4">
        <h2 className="text-3xl font-bold mb-8">Find Your Partner</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {validUsers.map((user) => (
            <ProfileCardCompact key={user._id} user={user} />
          ))}
        </div>

        <div className="flex justify-center mt-5">
          <Link href="/users">
            <Button size={"lg"} className="bg-[#E32C6F] cursor-pointer">
              View More Profiles
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PartnerFindingSection;
