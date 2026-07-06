import Link from "next/link";
import { UserX } from "lucide-react";
import { profileVisitorService } from "@/services/profile-visitor.service";
import { Button } from "@/components/ui/button";
import UserDetails from "@/modules/users/user-details";
import { userService } from "@/services/users.service";

type UserDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function Page({ params }: UserDetailsPageProps) {
  const { id } = await params;

  const response = await userService.viewProfile(id).catch(() => null);
  const user = response?.data;

  await profileVisitorService.visitProfile(id).catch(() => null);

  if (!user) {
    return (
      <section className="base-section flex min-h-[50vh] items-center justify-center">
        <div className="flex max-w-md flex-col items-center gap-4 text-center">
          <span className="flex size-16 items-center justify-center rounded-full bg-[#E32C6F]/10 text-[#E32C6F]">
            <UserX className="size-8" />
          </span>
          <h1 className="text-xl font-bold text-foreground">
            Profile not found
          </h1>
          <p className="text-muted-foreground">
            This profile may have been removed or is no longer available.
          </p>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-[#E32C6F] px-8 text-white hover:bg-[#c4225e]"
          >
            <Link href="/dashboard">Browse Profiles</Link>
          </Button>
        </div>
      </section>
    );
  }

  return <UserDetails user={user} />;
}

export default Page;
